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

    棚拍背景不是平的——中間亮、四周暗（暗角），所以不能只取左右兩點內插，
    那樣補出來的區域會偏暗，接上去就是一條明顯的色帶。
    改成把畫面切成網格，每一格取一個背景色，貓蓋住的格子再從鄰居補回來，
    最後放大成整張圖，暗角的明暗變化就還原得出來。

    取樣有兩道保險，因為貓常常碰到畫面邊緣：
    1. 貓的框往外推一點再排除，偵測框通常會比實際的貓小一圈
    2. 只採用「顏色跟背景接近」的像素，這樣黑貓的毛和白貓的毛都會被排掉
    """
    W, H = im.size
    x0, y0, x1, y1 = box
    m = int(min(W, H) * 0.04)
    x0, y0 = max(0, x0 - m), max(0, y0 - m)
    x1, y1 = min(W, x1 + m), min(H, y1 + m)
    px = im.load()

    邊 = ([px[x, y] for x in range(0, W, 7) for y in (1, H - 2)] +
          [px[x, y] for y in range(0, H, 7) for x in (1, W - 2)])
    底色 = tuple(sorted(c[i] for c in 邊)[len(邊) // 2] for i in range(3))

    def 像背景(c):
        return max(abs(c[i] - 底色[i]) for i in range(3)) < 50

    GW = 24
    GH = max(2, round(GW * H / W))
    格 = [[None] * GW for _ in range(GH)]
    for j in range(GH):
        for i in range(GW):
            ax, bx = i * W // GW, (i + 1) * W // GW
            ay, by = j * H // GH, (j + 1) * H // GH
            sx = max(1, (bx - ax) // 7)
            sy = max(1, (by - ay) // 7)
            v = [px[x, y] for x in range(ax, bx, sx) for y in range(ay, by, sy)
                 if not (x0 <= x < x1 and y0 <= y < y1) and 像背景(px[x, y])]
            if len(v) >= 6:
                格[j][i] = tuple(sorted(c[k] for c in v)[len(v) // 2] for k in range(3))

    for _ in range(GW + GH):            # 貓蓋住的格子，從上下左右的鄰居補回來
        空 = [(j, i) for j in range(GH) for i in range(GW) if 格[j][i] is None]
        if not 空:
            break
        for j, i in 空:
            鄰 = [格[b][a] for b, a in ((j - 1, i), (j + 1, i), (j, i - 1), (j, i + 1))
                  if 0 <= b < GH and 0 <= a < GW and 格[b][a]]
            if 鄰:
                格[j][i] = tuple(round(sum(c[k] for c in 鄰) / len(鄰)) for k in range(3))
    小 = Image.new("RGB", (GW, GH), 底色)
    d = 小.load()
    for j in range(GH):
        for i in range(GW):
            d[i, j] = 格[j][i] or 底色
    return 小.resize((W, H), Image.BICUBIC)


def 延伸成正方形(im, box):
    """把畫面補成正方形，貓置中。先鋪一張背景估計圖，再把原圖貼上去，
    所以不管貓怎麼靠邊、佔多滿，都不會有填不到的空白。"""
    W, H = im.size
    x0, y0, x1, y1 = box
    S = int(max(x1 - x0, y1 - y0) * (1 + 邊距 * 2))
    # 不要憑空生出太多背景：每邊最多補 8%。
    # 貓碰到原圖邊緣時，那個方向本來就被拍斷了，補再多也只是空白，
    # 而且補越多越容易跟原圖對不起來，出現一條或一塊色差。
    S = min(S, int(W / 0.84), int(H / 0.84))
    # 貓已經被拍斷在某一邊時，那個方向不補背景——
    # 那邊本來就沒有貓可以露出來，補了只是加空白，
    # 而且那一側取不到背景樣本，補出來的顏色容易跟原圖對不起來。
    安全 = int(min(W, H) * 0.05)      # 跟背景取樣用的安全邊界一致
    if x0 <= 安全 or x1 >= W - 安全:
        S = min(S, W)
    if y0 <= 安全 or y1 >= H - 安全:
        S = min(S, H)
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
    ox, oy = sx0 - (L - 左補), sy0 - (T - 上補)
    canvas.paste(im.crop((sx0, sy0, sx1, sy1)), (ox, oy))

    # 原圖跟補出來的背景交界處，就算顏色估得再準也會有一點點落差，
    # 在背景區域做局部柔化把那條抹掉（貓身上不會動到）
    直縫 = [x for x in (ox, ox + (sx1 - sx0)) if 0 < x < S]
    橫縫 = [y for y in (oy, oy + (sy1 - sy0)) if 0 < y < S]
    if 直縫 or 橫縫:
        bp = bg.load()
        底色 = bp[min(L + 2, bg.width - 1), min(T + 2, bg.height - 1)]
        canvas = 柔化接縫(canvas, 直縫, 橫縫, 底色)
    return canvas


def 柔化接縫(canvas, 直縫, 橫縫, 底色):
    S = canvas.size[0]
    r = max(8, S // 24)
    糊 = canvas.filter(ImageFilter.GaussianBlur(r / 1.6))
    罩 = Image.new("L", (S, S), 0)
    md, px = 罩.load(), canvas.load()

    def 像背景(c):
        return max(abs(c[i] - 底色[i]) for i in range(3)) < 55

    for sx in 直縫:
        for x in range(max(0, sx - r), min(S, sx + r)):
            w = int(255 * (1 - abs(x - sx) / r))
            for y in range(S):
                if 像背景(px[x, y]) and w > md[x, y]:
                    md[x, y] = w
    for sy in 橫縫:
        for y in range(max(0, sy - r), min(S, sy + r)):
            w = int(255 * (1 - abs(y - sy) / r))
            for x in range(S):
                if 像背景(px[x, y]) and w > md[x, y]:
                    md[x, y] = w
    罩 = 罩.filter(ImageFilter.GaussianBlur(r / 4))
    return Image.composite(糊, canvas, 罩)


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
