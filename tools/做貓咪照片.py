# -*- coding: utf-8 -*-
"""照 tools/首圖裁切.json 產生 images/cats/*.jpg

用法：
  python tools/做貓咪照片.py            全部重做
  python tools/做貓咪照片.py cream      只重做奶油
  python tools/做貓咪照片.py --預覽      另外輸出 _預覽.jpg，畫出卡片 4:3 會切到哪裡

設定檔每隻貓一個陣列，第一筆就是卡片的首圖：
  "cream": [ {"素材":"734","cx":0.50,"cy":0.42,"zoom":1.00}, ... ]
  cx/cy   裁切中心在原圖的位置（0~1）
  zoom    1.0 = 盡可能大的正方形；小於 1 會往外拉（貓變小、看得更完整）
          大於 1 會裁更近（貓變大）
原圖唯讀，不會被改到。
"""
import json, os, sys
from PIL import Image, ImageOps, ImageFilter, ImageDraw

ROOT = "E:/貓咪"
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG  = os.path.join(HERE, "tools", "首圖裁切.json")
OUT  = os.path.join(HERE, "images", "cats")
CARD = 3 / 4          # 卡片是 aspect-ratio 4/3，上下各切掉 (1-3/4)/2 = 12.5%


def 素材表():
    lib = json.load(open(ROOT + "/_channel/素材庫.json", encoding="utf-8"))
    return {x["id"]: x for x in lib["items"]}


def 浮水印高度(im):
    """OPPO 的浮水印燒在下緣，這些尺寸一定有"""
    W, H = im.size
    if (W, H) in ((1477, 1108), (1108, 1477)):
        return 170
    px = im.load()
    for y in range(max(0, H - 200), H - 20):
        if sum(1 for x in range(int(W * .02), int(W * .40), 2)
               if min(px[x, y]) > 235) > 25:
            return H - y + 12
    return 0


def 裁一張(path, cx, cy, zoom):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    W, H = im.size
    可用高 = H - 浮水印高度(im)
    s = int(min(W, 可用高) / max(zoom, .01))
    s = min(s, W, 可用高)                      # 不能超出原圖
    l = max(0, min(W - s, int(W * cx - s / 2)))
    t = max(0, min(可用高 - s, int(H * cy - s / 2)))
    out = im.crop((l, t, l + s, t + s)).resize((800, 800), Image.LANCZOS)
    return out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=3))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    預覽 = "--預覽" in sys.argv
    lib = 素材表()
    cfg = json.load(open(CFG, encoding="utf-8"))
    n = 0
    for cid, 清單 in cfg.items():
        if args and cid not in args:
            continue
        for i, c in enumerate(清單, 1):
            src = os.path.join(ROOT, lib[c["素材"]]["file"])
            im = 裁一張(src, c.get("cx", .5), c.get("cy", .42), c.get("zoom", 1.0))
            im.save(os.path.join(OUT, f"{cid}-{i}.jpg"),
                    quality=82, optimize=True, subsampling=1)   # 不帶 EXIF
            n += 1
            if 預覽 and i == 1:
                p = im.copy()
                d = ImageDraw.Draw(p, "RGBA")
                邊 = int(800 * (1 - CARD) / 2)
                d.rectangle([0, 0, 800, 邊], fill=(255, 0, 0, 90))
                d.rectangle([0, 800 - 邊, 800, 800], fill=(255, 0, 0, 90))
                p.save(os.path.join(OUT, f"{cid}-1_預覽.jpg"), quality=80)
    print(f"做好 {n} 張" + ("（另有 _預覽.jpg，紅色是卡片會切掉的部分）" if 預覽 else ""))


if __name__ == "__main__":
    main()
