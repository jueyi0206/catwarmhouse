# -*- coding: utf-8 -*-
"""把 _去背用/沙龍照 的照片裁成網站用的 800x800。

這些照片是純色背景的棚拍，所以可以自動找出貓在哪裡，
再把畫面補成正方形——補出來的部分用邊緣的顏色延伸，
看不出接縫，而且**整隻貓一定不會被切到**。

用法：
  python tools/沙龍照裁切.py              全部做
  python tools/沙龍照裁切.py 吉兒          只做吉兒
  python tools/沙龍照裁切.py --檢查        只印出偵測結果，不存檔
"""
import os, sys, json, re
from PIL import Image, ImageOps, ImageFilter, ImageChops

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(HERE, "_去背用", "沙龍照")
OUT  = os.path.join(HERE, "images", "cats")
邊距 = 0.07          # 貓的四周留多少空白（佔貓本身大小的比例）


def 找貓(im):
    """用邊緣強度找出貓的範圍。

    不能用「跟背景顏色不一樣」來找，因為白貓的顏色跟米色背景很接近；
    但貓身上一定有毛的紋理和輪廓，背景是平的，所以改看邊緣。
    背景的漸層本身也會有一點邊緣值，所以先扣掉整排的中位數當基準。
    """
    g = im.convert("L").resize((320, 320))
    e = g.filter(ImageFilter.GaussianBlur(1)).filter(ImageFilter.FIND_EDGES)
    e = e.filter(ImageFilter.MaxFilter(5))          # 把斷掉的邊連起來
    # FIND_EDGES 在圖片最外圈會產生假的強邊，會把偵測範圍撐成整張，所以切掉外圈
    邊 = 6
    e = e.crop((邊, 邊, 320 - 邊, 320 - 邊))
    N = 320 - 邊 * 2
    px = e.load()
    行 = [sum(px[x, y] for x in range(N)) for y in range(N)]
    列 = [sum(px[x, y] for y in range(N)) for x in range(N)]

    def 範圍(v):
        底 = sorted(v)[len(v) // 5]                 # 第 20 百分位當背景基準
        高 = [max(0, s - 底) for s in v]
        門檻 = max(高) * 0.18
        idx = [i for i, s in enumerate(高) if s > 門檻]
        if not idx:
            return 0, len(v) - 1
        return idx[0], idx[-1]

    y0, y1 = 範圍(行)
    x0, x1 = 範圍(列)
    W, H = im.size
    k = 320.0
    return (int((x0 + 邊) * W / k), int((y0 + 邊) * H / k),
            int((x1 + 1 + 邊) * W / k), int((y1 + 1 + 邊) * H / k))


def 延伸成正方形(im, box):
    """把畫面補成正方形，貓置中。補出來的部分用邊緣像素拉開，接縫看不出來。"""
    W, H = im.size
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    S = int(max(w, h) * (1 + 邊距 * 2))
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    L, T = cx - S // 2, cy - S // 2           # 這個方框在原圖上的位置（可能超出去）
    canvas = Image.new("RGB", (S, S))
    # 先把原圖能用的部分貼進去
    sx0, sy0 = max(0, L), max(0, T)
    sx1, sy1 = min(W, L + S), min(H, T + S)
    inner = im.crop((sx0, sy0, sx1, sy1))
    ox, oy = sx0 - L, sy0 - T
    canvas.paste(inner, (ox, oy))
    iw, ih = inner.size
    # 上下左右不足的地方，用最邊邊那一排像素拉開來填
    if oy > 0:
        canvas.paste(inner.crop((0, 0, iw, 1)).resize((iw, oy)), (ox, 0))
    if oy + ih < S:
        canvas.paste(inner.crop((0, ih - 1, iw, ih)).resize((iw, S - oy - ih)), (ox, oy + ih))
    band = canvas.crop((ox, 0, ox + iw, S))
    if ox > 0:
        canvas.paste(band.crop((0, 0, 1, S)).resize((ox, S)), (0, 0))
    if ox + iw < S:
        canvas.paste(band.crop((iw - 1, 0, iw, S)).resize((S - ox - iw, S)), (ox + iw, 0))
    return canvas


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    只檢查 = "--檢查" in sys.argv
    名對照 = {}
    s = open(os.path.join(HERE, "data", "cats.js"), encoding="utf-8").read()
    blk = s[s.index('"cats": ['):s.index('"_已找到家名單說明"')]
    for cid, nm in re.findall(r'"id":\s*"([^"]+)",\s*\n\s*"name":\s*"([^"]+)"', blk):
        名對照[nm] = cid

    n = 0
    for f in sorted(os.listdir(SRC)):
        if not f.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        貓名, _, 序 = os.path.splitext(f)[0].rpartition("_")
        if args and 貓名 not in args:
            continue
        cid = 名對照.get(貓名)
        if not cid:
            print("  ⚠ 網站上沒有這隻貓，跳過：", f)
            continue
        im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, f))).convert("RGB")
        box = 找貓(im)
        W, H = im.size
        占比 = (box[2] - box[0]) * (box[3] - box[1]) / (W * H)
        if 只檢查:
            print(f"  {f:<16} {W}x{H}  貓占畫面 {占比:.0%}  框 {box}")
            continue
        out = 延伸成正方形(im, box).resize((800, 800), Image.LANCZOS)
        out = out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=50, threshold=3))
        out.save(os.path.join(OUT, f"{cid}-{序}.jpg"),
                 quality=84, optimize=True, subsampling=1)     # 不帶 EXIF
        n += 1
    if not 只檢查:
        print(f"做好 {n} 張")


if __name__ == "__main__":
    main()
