# -*- coding: utf-8 -*-
"""
幫每隻貓產生一個「真的寫好內容」的網頁：cat/<id>.html，順便重做 sitemap.xml。

為什麼需要這個（2026-11-23）：
    原本每隻貓都共用 cat.html?id=xxx，打開後才由 site.js 把名字、照片填進去。
    人看起來沒差，但：
      1. FB、LINE 的分享預覽不會跑程式，貼丹丹的連結只會出現「貓咪介紹」，
         沒有丹丹的照片和名字。
      2. Google 要等程式跑完才讀得到內容，比較慢、也不保證。
      3. sitemap.xml 裡一隻貓都沒有，Google 只能自己慢慢找。
    這支程式把每隻貓的名字、介紹、照片直接寫進 HTML 的 <head> 和內文，
    畫面還是由 site.js 照原樣畫（所以長相跟以前一模一樣）。

什麼時候要跑：
    不用自己跑。tools/更新版本號.py 最後會自動呼叫這支，
    改完 data/cats.js 照平常跑一次更新版本號就好。

做了什麼：
    - 以 cat.html 當樣板，每隻（沒有 hide 的）貓產生 cat/<id>.html
    - 貓已經不在資料裡（或改成 hide）的舊頁面會刪掉
    - sitemap.xml：保留原本的主要頁面，再加上每隻貓、每篇養貓小知識
    - 舊網址 cat.html?id=xxx 還是能用（site.js 會自動轉到新網址）

需要 node（讀 data/*.js 用）。
"""
import html
import io
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://catwarmhouse.org/"
OUT_DIR = "cat"


def load_js(path, var):
    """用 node 讀 data/*.js 裡的 window.XXX，轉成 Python 資料。"""
    code = ("global.window={};require(%s);process.stdout.write(JSON.stringify(window[%s]))"
            % (json.dumps(os.path.abspath(path)), json.dumps(var)))
    out = subprocess.run(["node", "-e", code], capture_output=True, check=True)
    return json.loads(out.stdout.decode("utf-8"))


def esc(s):
    return html.escape(str(s or ""), quote=True)


def story_list(cat):
    st = cat.get("story") or []
    if isinstance(st, str):
        st = [st] if st and st != "待貓窩提供" else []
    return [s for s in st if s]


NOT_YET = re.compile(r"^(待確認|待貓窩確認|待貓窩補充|待貓窩提供|年齡不詳|待補)$")


def ok(v):
    return v and not NOT_YET.match(str(v).strip())


def describe(cat):
    """給 Google 和分享預覽看的一句話介紹（150 字內）。"""
    home = cat.get("status") == "home"
    if home:
        st = story_list(cat)
        text = (st[0] if st else cat["name"] + "已經找到永遠的家。")
        text = "【已找到家】" + text
    else:
        bits = []
        for k in ("sex", "age", "color"):
            if ok(cat.get(k)):
                bits.append(str(cat[k]))
        text = "高雄日日暖暖中途貓窩等家中的貓咪" + cat["name"]
        if bits:
            text += "（" + "、".join(bits) + "）"
        text += "。"
        if ok(cat.get("personality")):
            text += "個性：" + str(cat["personality"]) + "。"
        st = story_list(cat)
        if st:
            text += st[0]
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:150] + ("…" if len(text) > 150 else "")


def body_html(cat):
    """搜尋引擎讀得到的內文。site.js 載入後會整塊換成原本的漂亮版面。"""
    home = cat.get("status") == "home"
    parts = ['<div class="cat-sheet">']
    parts.append('<p><a href="%s">← 回到%s</a></p>'
                 % ("adopted.html" if home else "cats.html",
                    "找到家的貓" if home else "等家的貓咪"))
    photos = [p for p in (cat.get("photos") or ([cat["photo"]] if cat.get("photo") else [])) if p]
    if photos:
        parts.append('<img src="images/%s" alt="%s" style="max-width:100%%">'
                     % (esc(photos[0]), esc(cat["name"])))
    if home:
        parts.append('<span class="tag tag-done">已找到家</span>')
    parts.append("<h1>%s</h1>" % esc(cat["name"]))
    rows = [("性別", "sex"), ("年齡", "age"), ("花色", "color"),
            ("特徵", "feature"), ("個性", "personality"), ("健康狀況", "health")]
    rows = [(t, cat.get(k)) for t, k in rows if ok(cat.get(k))]
    if rows:
        parts.append('<div class="card">' + "".join(
            "<p><b>%s</b>｜%s</p>" % (t, esc(v)) for t, v in rows) + "</div>")
    st = story_list(cat)
    if st:
        parts.append("<h3>牠的故事</h3>" + "".join("<p>%s</p>" % esc(s) for s in st))
    parts.append("</div>")
    return "\n    ".join(parts)


def make_page(tpl, cat):
    cid = cat["id"]
    url = SITE + OUT_DIR + "/" + cid + ".html"
    name = cat["name"]
    home = cat.get("status") == "home"
    title = name + ("｜找到家的貓" if home else "｜等家的貓咪") + "｜日日暖暖中途貓窩"
    desc = describe(cat)
    photos = [p for p in (cat.get("photos") or ([cat["photo"]] if cat.get("photo") else [])) if p]
    img = SITE + "images/" + photos[0] if photos else SITE + "images/logo-share.jpg"

    s = tpl
    # 所有相對網址（images/、assets/、site.js 組出來的連結）都以網站根目錄為準
    s = s.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="/">', 1)
    s = re.sub(r"<title>.*?</title>", "<title>%s</title>" % esc(title), s, 1)
    s = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + esc(desc), s, 1)
    s = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1) + url, s, 1)
    s = re.sub(r'(<link rel="canonical" href=")[^"]*', lambda m: m.group(1) + url, s, 1)
    s = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + esc(title), s, 1)
    s = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + esc(desc), s, 1)
    s = re.sub(r'(<meta property="og:image" content=")[^"]*', lambda m: m.group(1) + esc(img), s, 1)
    if photos:
        # 貓咪照片尺寸不一，不寫死 1200x630，讓 FB 自己量
        s = re.sub(r'<meta property="og:image:(width|height)" content="\d+">\n', "", s)
    # 跳到主要內容：有 <base> 之後 "#main" 會跳回首頁，改成本頁網址
    s = s.replace('href="#main"', 'href="%s/%s.html#main"' % (OUT_DIR, cid), 1)
    s = s.replace("<body>", '<body data-cat-id="%s">' % esc(cid), 1)
    s = re.sub(r"\s*<!-- 這一頁的內容由 assets/site.js.*?-->", "", s, 1, flags=re.S)
    s = s.replace('<div class="wrap section" id="cat-detail"></div>',
                  "<!-- 這個檔案是 tools/產生貓咪頁.py 自動產生的，不要手改；改 data/cats.js 再跑 tools/更新版本號.py -->\n"
                  '  <div class="wrap section" id="cat-detail">\n    %s\n  </div>' % body_html(cat), 1)
    if 'id="cat-detail">\n' not in s:
        raise SystemExit("cat.html 的樣板跟預期不一樣，沒辦法產生貓咪頁")
    return s


def main():
    os.chdir(ROOT)
    data = load_js("data/cats.js", "CAT_DATA")
    cats = [c for c in data.get("cats", []) + data.get("adopted", []) if not c.get("hide")]
    tpl = io.open("cat.html", encoding="utf-8").read()

    os.makedirs(OUT_DIR, exist_ok=True)
    want = set()
    changed = 0
    for c in cats:
        fn = os.path.join(OUT_DIR, c["id"] + ".html")
        want.add(c["id"] + ".html")
        new = make_page(tpl, c)
        old = io.open(fn, encoding="utf-8").read() if os.path.exists(fn) else None
        if new != old:
            io.open(fn, "w", encoding="utf-8", newline="\n").write(new)
            changed += 1
    removed = 0
    for fn in os.listdir(OUT_DIR):
        if fn.endswith(".html") and fn not in want:
            os.remove(os.path.join(OUT_DIR, fn))
            removed += 1

    # ---- sitemap.xml：保留主要頁面，重列貓咪頁與小知識 ----
    sm = io.open("sitemap.xml", encoding="utf-8").read() if os.path.exists("sitemap.xml") else ""
    keep = [b for b in re.findall(r"  <url>.*?</url>", sm, flags=re.S)
            if "/cat/" not in b and "tip.html?id=" not in b]
    urls = []
    for c in cats:
        urls.append("  <url>\n    <loc>%s%s/%s.html</loc>\n    <priority>%s</priority>\n  </url>"
                    % (SITE, OUT_DIR, c["id"], "0.6" if c.get("status") == "home" else "0.8"))
    try:
        tips = load_js("data/tips.js", "TIPS_DATA").get("tips", [])
    except Exception:
        tips = []
    for t in tips:
        if not t.get("hide"):
            urls.append("  <url>\n    <loc>%stip.html?id=%s</loc>\n    <priority>0.6</priority>\n  </url>"
                        % (SITE, esc(t["id"])))
    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(keep + urls) + "\n</urlset>\n")
    if out != sm:
        io.open("sitemap.xml", "w", encoding="utf-8", newline="\n").write(out)

    print("貓咪頁：共 %d 隻，更新 %d 頁，刪掉 %d 頁；sitemap 共 %d 個網址"
          % (len(cats), changed, removed, len(keep) + len(urls)))


if __name__ == "__main__":
    main()
