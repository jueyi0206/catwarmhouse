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


def 背景圖(im, box):
    """猜出「如果沒有貓，這張背景長什麼樣」，做成一張同尺寸的圖。

    棚拍背景是平順的漸層，只要知道每一列左右兩邊的背景色就能重建，
    中間用內插補，橫向的明暗變化也還原得出來。

    取樣有兩道保險，因為貓常常碰到畫面邊緣：
    1. 貓的框往外推一點再排除，偵測框通常會比實際的貓小一圈
    2. 只採用「顏色跟背景接近」的像素，這樣黑貓的毛和白貓的毛都會被排掉
    """
    W, H = im.size
    x0, y0, x1, y1 = box
    m = int(min(W, H) * 0.04)
    x0, x1 = max(0, x0 - m), min(W, x1 + m)
    px = im.load()

    邊 = ([px[x, y] for x in range(0, W, 7) for y in (1, H - 2)] +
          [px[x, y] for y in range(0, H, 7) for x in (1, W - 2)])
    底色 = tuple(sorted(c[i] for c in 邊)[len(邊) // 2] for i in range(3))

    def 像背景(c):
        return max(abs(c[i] - 底色[i]) for i in range(3)) < 50

    左欄 = list(range(0, x0, 3))
    右欄 = list(range(x1, W, 3))
    兩側 = [[None] * H, [None] * H]
    for y in range(H):
        for i, 欄 in enumerate((左欄, 右欄)):
            v = [px[x, y] for x in 欄 if 像背景(px[x, y])]
            if len(v) >= 3:
                兩側[i][y] = tuple(sorted(c[k] for c in v)[len(v) // 2] for k in range(3))

    for col in 兩側:                       # 取不到的列，用上下最近的有效列補
        最近 = None
        for y in range(H):
            if col[y]: 最近 = col[y]
            elif 最近: col[y] = 最近
        最近 = None
        for y in range(H - 1, -1, -1):
            if col[y]: 最近 = col[y]
            elif 最近: col[y] = 最近

    兩欄 = Image.new("RGB", (2, H), 底色)
    d = 兩欄.load()
    for y in range(H):
        左, 右 = 兩側[0][y] or 兩側[1][y] or 底色, 兩側[1][y] or 兩側[0][y] or 底色
        d[0, y], d[1, y] = 左, 右
    return 兩欄.resize((W, H), Image.BILINEAR)


def 延伸成正方形(im, box):
    """把畫面補成正方形，貓置中。先鋪一張背景估計圖，再把原圖貼上去，
    所以不管貓怎麼靠邊、佔多滿，都不會有填不到的空白。"""
    W, H = im.size
    x0, y0, x1, y1 = box
    S = int(max(x1 - x0, y1 - y0) * (1 + 邊距 * 2))
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    L, T = cx - S // 2, cy - S // 2           # 方框在原圖上的位置（可能超出去）

    bg = 背景圖(im, box)
    # 背景圖本身整張都是背景，所以可以安全地用邊緣像素往外補
    左補, 上補 = max(0, -L), max(0, -T)
    右補, 下補 = max(0, L + S - W), max(0, T + S - H)
    if 左補 or 右補 or 上補 or 下補:
        大 = Image.new("RGB", (W + 左補 + 右補, H + 上補 + 下補))
        大.paste(bg, (左補, 上補))
        if 左補:
            大.paste(bg.crop((0, 0, 1, H)).resize((左補, H)), (0, 上補))
        if 右補:
            大.paste(bg.crop((W - 1, 0, W, H)).resize((右補, H)), (左補 + W, 上補))
        if 上補:
            帶 = 大.crop((0, 上補, 大.width, 上補 + 1))
            大.paste(帶.resize((大.width, 上補)), (0, 0))
        if 下補:
            帶 = 大.crop((0, 上補 + H - 1, 大.width, 上補 + H))
            大.paste(帶.resize((大.width, 下補)), (0, 上補 + H))
        bg, L, T = 大, L + 左補, T + 上補
        im = im.copy()
    else:
        左補 = 上補 = 0

    canvas = bg.crop((L, T, L + S, T + S))
    # 把原圖有貓的那塊貼回去
    sx0, sy0 = max(0, L - 左補), max(0, T - 上補)
    sx1, sy1 = min(W, L - 左補 + S), min(H, T - 上補 + S)
    canvas.paste(im.crop((sx0, sy0, sx1, sy1)),
                 (sx0 - (L - 左補), sy0 - (T - 上補)))
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
