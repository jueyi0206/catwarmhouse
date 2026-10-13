# -*- coding: utf-8 -*-
"""
把長條設計稿自動切成一條一條的橫幅。

為什麼不能直接「找空白橫線來切」：
    設計稿的數字圓圈、標題膠囊，是刻意畫得比卡片高、突出到卡片外的。
    照卡片邊界切，圓圈的頭就會被削掉；
    固定多留一點又不知道該留多少——每一條突出的幅度還不一樣
    （這張圖是 6 到 16 像素不等）。

這支工具分兩步，所以不用猜：
    1. 先在圖片右側掃描找出卡片之間的「間隙」，得到每條的大致範圍。
       右側只有底色和手寫小字，最乾淨，不會被突出的圓圈干擾。
    2. 再從左側（數字圓圈那一區）往上下找，看這一條的內容實際延伸到哪裡，
       自動決定要留多少邊。

    換一張設計稿也能直接用，不必重新調參數。

怎麼跑（在專案資料夾開終端機）：
    python tools/切設計稿.py "設計稿/認養流程_設計稿_v3.jpg" step

    第一個參數：設計稿檔案
    第二個參數：輸出檔名開頭（會產生 step-1.jpg、step-2.jpg… 放進 images/）
    第三個參數（可省略）：要跳過開頭幾條。
        長圖最上面通常是標題區，不是步驟，填 1 就會跳過它。

跑完記得接著跑：
    python tools/更新版本號.py
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images")

MIN_BAND_HEIGHT = 150     # 一條橫幅至少這麼高
MIN_GAP_ROWS = 15         # 間隙至少這麼寬；更窄的是壓縮雜訊，不算
OUT_WIDTH = 1100          # 輸出寬度


def main(src, prefix, skip=0):
    import numpy as np
    from PIL import Image

    im = Image.open(src).convert("RGB")
    arr = np.asarray(im).astype(np.int16)
    H, W = arr.shape[:2]

    # 背景色要逐列算：設計稿底色常是漸層（上面偏白、下面偏藍），
    # 用單一個背景色去比，中段的背景會被誤判成「有東西」。
    # 左右邊緣一定是背景，拿那裡的中位數當這一列的背景色。
    edge = np.concatenate([arr[:, 4:26], arr[:, W - 26:W - 4]], axis=1)
    bg_rows = np.median(edge, axis=1)
    diff = np.abs(arr - bg_rows[:, None, :]).sum(axis=2)
    has_ink = diff > 20

    # ---- 第一步：右側找間隙，得到大致範圍 ----
    probe = has_ink[:, int(W * 0.86):int(W * 0.90)].sum(axis=1)
    blank = probe < 1

    gaps = []
    y = 0
    while y < H:
        if blank[y]:
            a = y
            while y < H and blank[y]:
                y += 1
            if y - a >= MIN_GAP_ROWS:
                gaps.append((a, y))
        else:
            y += 1

    rough = [(gaps[i][1], gaps[i + 1][0]) for i in range(len(gaps) - 1)]
    rough = [b for b in rough if b[1] - b[0] >= MIN_BAND_HEIGHT]
    if not rough:
        print("找不到橫幅，可能這張圖的版面不同，需要調整參數")
        return
    print("在右側找到 %d 條（大致範圍）" % len(rough))
    if skip:
        print("依指定跳過前 %d 條（通常是標題區，不是步驟）" % skip)
        rough = rough[skip:]

    # ---- 第二步：左側量出真正的上下界 ----
    left = has_ink[:, int(W * 0.04):int(W * 0.22)].sum(axis=1)

    bands = []
    for idx, (top, bot) in enumerate(rough):
        # 往上找時不可以越過上一條的底部，否則會帶到它的圓角
        ceiling = rough[idx - 1][1] + 2 if idx > 0 else 0
        t = top
        while t > ceiling and t > top - 60:
            if left[max(t - 2, 0):t + 2].sum() == 0:
                break
            t -= 1
        # 下緣不用找：圓圈只突出卡片的上緣，往下找會吃到下一條的圓圈
        b = min(bot + 3, H - 1)
        bands.append((t, b, top, bot))

    os.makedirs(OUT_DIR, exist_ok=True)
    total = 0.0
    sizes = []
    print()
    for i, (t, b, top, bot) in enumerate(bands, 1):
        crop = im.crop((40, max(t - 3, 0), W - 40, min(b + 3, H)))
        crop.thumbnail((OUT_WIDTH, 9999), Image.LANCZOS)
        path = os.path.join(OUT_DIR, "%s-%d.jpg" % (prefix, i))
        crop.save(path, "JPEG", quality=88, optimize=True, progressive=True)
        kb = os.path.getsize(path) / 1024.0
        total += kb
        sizes.append((crop.width, crop.height))
        print("  %s-%d.jpg  卡片 y=%d~%d　含突出 y=%d~%d（上面多留 %d px）  →  %dx%d  %.0f KB"
              % (prefix, i, top, bot, t, b, top - t, crop.width, crop.height, kb))

    print()
    print("共 %d 條，合計 %.0f KB" % (len(bands), total))
    print("HTML 要用的尺寸：", sizes)
    print()
    print("接著請跑：python tools/更新版本號.py")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    skip = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    main(sys.argv[1], sys.argv[2], skip)
