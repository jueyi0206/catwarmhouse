# -*- coding: utf-8 -*-
"""
在照片上蓋笑臉，順便把照片處理成網站要的樣子。

為什麼要這個：
    「找到家的貓」那一頁的照片是從官方 FB／IG 整理來的，
    裡面常有領養人入鏡。貓窩的規矩是領養人的臉和姓名要蓋起來，
    但手機 app 一張一張蓋，大小位置都會不一樣，整頁看起來很亂。
    這支程式用同一套笑臉，位置和大小都講得出來，不滿意重跑就好。

    順便做掉三件每次都要做的事：
      1. 轉正方向（手機照片常常是橫躺的）
      2. 縮小尺寸（原檔 3～5MB，手機會載很久）
      3. 清掉 EXIF／GPS（手機照片記錄了拍攝地點，不清掉等於公開貓窩地址）

怎麼用：
    python tools/蓋笑臉.py 原圖.jpg --臉 48%,22%,14% --輸出 images/cats/xxx-1.jpg

    --臉 可以給好幾次，一個人臉一次。三個數字是「中心 x、中心 y、直徑」，
    可以用百分比（照圖的寬度算）或像素。例如：
        --臉 48%,22%,14%      ← 中心在寬的 48%、高的 22%，直徑是寬的 14%
        --臉 620,300,180      ← 直接給像素

    其他選項：
        --寬 1000       輸出寬度（預設 1000）
        --正方形        裁成正方形（貓咪卡片用）
        --預覽          只輸出一張標了格線的圖，用來對位置，不會存成品

為什麼不自動偵測人臉：
    自動偵測會漏（側臉、戴口罩、背對鏡頭），而漏掉一張就是把人臉公開出去，
    代價太大。寧可每張都用眼睛確認過，位置用講的。
"""
import argparse
import io
import os
import sys

from PIL import Image, ImageDraw, ImageOps


def 解析臉(值, 寬, 高):
    """把 '48%,22%,14%' 或 '620,300,180' 轉成像素的 (中心x, 中心y, 直徑)。"""
    部分 = [v.strip() for v in 值.split(",")]
    if len(部分) != 3:
        raise ValueError("--臉 要給三個數字：中心x,中心y,直徑（例如 48%,22%,14%）")

    def 換算(v, 基準):
        if v.endswith("%"):
            return float(v[:-1]) / 100.0 * 基準
        return float(v)

    # 直徑一律照「寬度」算，這樣同一個百分比在不同比例的圖上大小才一致
    return 換算(部分[0], 寬), 換算(部分[1], 高), 換算(部分[2], 寬)


def 畫笑臉(img, cx, cy, 直徑):
    """畫一個貼紙感的笑臉：黃底、深咖啡色線條，配合網站插畫的風格。"""
    d = ImageDraw.Draw(img)
    r = 直徑 / 2.0
    框 = (cx - r, cy - r, cx + r, cy + r)

    線寬 = max(2, int(直徑 * 0.045))
    d.ellipse(框, fill=(253, 192, 107), outline=(74, 29, 12), width=線寬)

    # 眼睛：兩個圓點
    眼r = 直徑 * 0.055
    眼y = cy - 直徑 * 0.10
    for 偏 in (-直徑 * 0.19, 直徑 * 0.19):
        d.ellipse((cx + 偏 - 眼r, 眼y - 眼r, cx + 偏 + 眼r, 眼y + 眼r),
                  fill=(74, 29, 12))

    # 嘴巴：下半圓的一段弧
    嘴 = (cx - 直徑 * 0.26, cy - 直徑 * 0.12,
          cx + 直徑 * 0.26, cy + 直徑 * 0.30)
    d.arc(嘴, start=20, end=160, fill=(74, 29, 12), width=線寬)

    # 腮紅，跟網站插畫同一個粉色
    腮r = 直徑 * 0.075
    for 偏 in (-直徑 * 0.30, 直徑 * 0.30):
        d.ellipse((cx + 偏 - 腮r, cy + 直徑 * 0.02 - 腮r * 0.7,
                   cx + 偏 + 腮r, cy + 直徑 * 0.02 + 腮r * 0.7),
                  fill=(252, 186, 176))


def 畫格線(img):
    """預覽用：每 10% 畫一條線並標百分比，用來講位置。"""
    d = ImageDraw.Draw(img)
    w, h = img.size
    for i in range(1, 10):
        x, y = w * i / 10.0, h * i / 10.0
        d.line((x, 0, x, h), fill=(255, 0, 0), width=1)
        d.line((0, y, w, y), fill=(255, 0, 0), width=1)
        d.text((x + 3, 3), str(i * 10) + "%", fill=(255, 0, 0))
        d.text((3, y + 3), str(i * 10) + "%", fill=(255, 0, 0))


def main():
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("來源")
    ap.add_argument("--臉", action="append", default=[])
    ap.add_argument("--輸出")
    ap.add_argument("--寬", type=int, default=1000)
    ap.add_argument("--正方形", action="store_true")
    ap.add_argument("--預覽", action="store_true")
    a = ap.parse_args()

    img = Image.open(a.來源)
    img = ImageOps.exif_transpose(img)        # 轉正方向
    img = img.convert("RGB")                  # 轉檔時順便丟掉 EXIF／GPS

    if a.正方形:
        w, h = img.size
        邊 = min(w, h)
        img = img.crop(((w - 邊) // 2, (h - 邊) // 2,
                        (w - 邊) // 2 + 邊, (h - 邊) // 2 + 邊))

    w, h = img.size
    for 值 in a.臉:
        cx, cy, 直徑 = 解析臉(值, w, h)
        畫笑臉(img, cx, cy, 直徑)

    if a.寬 and img.size[0] > a.寬:
        img = img.resize((a.寬, int(a.寬 * img.size[1] / img.size[0])),
                         Image.LANCZOS)

    if a.預覽:
        畫格線(img)
        out = os.path.splitext(a.來源)[0] + "_預覽.jpg"
    else:
        if not a.輸出:
            print("要存成品的話請給 --輸出，或加 --預覽 先對位置")
            return
        out = a.輸出

    os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
    # 存檔不帶 exif 參數 = 原本的 EXIF／GPS 不會被寫進去
    img.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    print("存好了：" + out + "　" + str(img.size[0]) + "x" + str(img.size[1]) +
          "　" + str(round(os.path.getsize(out) / 1024)) + " KB")
    if a.預覽:
        print("紅線是 10% 一格，看好人臉在哪一格，再用 --臉 x%,y%,直徑% 蓋上去")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
