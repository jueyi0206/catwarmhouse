# -*- coding: utf-8 -*-
"""把 PDF 手冊（簡報、懶人包）轉成「養貓小知識」圖解手冊用的圖片。

用法：
  python tools/手冊轉圖片.py <PDF 路徑> <資料夾名>
  例：python tools/手冊轉圖片.py "喵星人大學新生手冊-修訂版_輕量.pdf" freshman

會在 images/tips/<資料夾名>/ 產生：
  p01.webp …  每頁大圖 1600 寬（閱讀器主畫面）
  t01.webp …  縮圖 480 寬（下方縮圖列）
  cover.webp  第一頁 960 寬（列表卡片封面）

為什麼不直接把 PDF 放上網站：
  ・PDF 動輒 10MB 以上，手機要整份下載完才看得到第一頁；
    轉成圖片後一頁 100～200KB，翻到哪頁才載入哪頁。
  ・倉庫是公開的，.gitignore 刻意排除 *.pdf（曾經誤傳過 18.5MB 的 PDF）。
  ・PDF 本身放在外部空間，網站只放「下載 PDF」連結。

轉完之後：到 data/tips.js 新增一篇 type 為 "handbook" 的資料，
pages 要照頁數填，每頁寫標題與文字重點（照圖上寫的抄）。
然後照常跑 python tools/產生字型.py 與 python tools/更新版本號.py。
"""
import io, os, sys

try:
    import pymupdf
except ImportError:
    import fitz as pymupdf
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def 轉一頁(doc, page):
    """頁面如果整頁就是一張圖（常見於 AI 做的簡報），直接取原圖，畫質最好；
    否則用 200 dpi 把頁面畫成圖。"""
    imgs = page.get_images()
    if len(imgs) == 1 and not page.get_text().strip():
        info = doc.extract_image(imgs[0][0])
        return Image.open(io.BytesIO(info["image"])).convert("RGB")
    pix = page.get_pixmap(dpi=200)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")


def 縮(im, w):
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return
    pdf, name = sys.argv[1], sys.argv[2]
    out = os.path.join(HERE, "images", "tips", name)
    os.makedirs(out, exist_ok=True)
    doc = pymupdf.open(pdf)
    總 = 0
    for i, page in enumerate(doc, 1):
        im = 轉一頁(doc, page)
        大 = os.path.join(out, "p%02d.webp" % i)
        小 = os.path.join(out, "t%02d.webp" % i)
        縮(im, 1600).save(大, "WEBP", quality=80, method=6)
        縮(im, 480).save(小, "WEBP", quality=72, method=6)
        if i == 1:
            縮(im, 960).save(os.path.join(out, "cover.webp"), "WEBP", quality=80, method=6)
        總 += os.path.getsize(大) + os.path.getsize(小)
    print("完成：%d 頁 → images/tips/%s/（共 %d KB）" % (doc.page_count, name, 總 // 1024))
    print("下一步：到 data/tips.js 新增這篇，pages 要填 %d 筆。" % doc.page_count)


if __name__ == "__main__":
    main()
