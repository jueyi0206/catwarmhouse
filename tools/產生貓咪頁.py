# -*- coding: utf-8 -*-
"""
幫每隻貓、每篇養貓小知識產生「真的寫好內容」的網頁：
cat/<id>.html、tip/<id>.html，順便重做 sitemap.xml。

為什麼需要這個（2026-11-23）：
    原本每隻貓都共用 cat.html?id=xxx（小知識共用 tip.html?id=xxx），
    打開後才由 site.js 把名字、照片填進去。人看起來沒差，但：
      1. FB、LINE 的分享預覽不會跑程式，貼丹丹的連結只會出現「貓咪介紹」，
         沒有丹丹的照片和名字。
      2. Google 要等程式跑完才讀得到內容，比較慢、也不保證。
      3. sitemap.xml 裡一隻貓都沒有，Google 只能自己慢慢找。
    這支程式把名字、介紹、照片直接寫進 HTML 的 <head> 和內文，
    畫面還是由 site.js 照原樣畫（所以長相跟以前一模一樣）。

什麼時候要跑：
    不用自己跑。tools/更新版本號.py 最後會自動呼叫這支，
    改完 data/cats.js、data/tips.js 照平常跑一次更新版本號就好。

做了什麼：
    - 以 cat.html 當樣板，每隻（沒有 hide 的）貓產生 cat/<id>.html
    - 以 tip.html 當樣板，每篇小知識產生 tip/<id>.html（草稿 draft 不做，還不能公開）
      封面是 .webp 的，另存一張 share.jpg 給分享預覽用（有些平台不吃 webp）
    - 已經不在資料裡（或改成 hide）的舊頁面會刪掉
    - sitemap.xml：保留原本的主要頁面，再加上每隻貓、每篇小知識
    - 舊網址 cat.html?id=xxx、tip.html?id=xxx 還是能用（site.js 會自動轉到新網址）

需要 node（讀 data/*.js 用）。
"""
import html
import io
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://catwarmhouse.org/"
OUT_DIR = "cat"
TIP_DIR = "tip"


def load_js(path, var):
    """用 node 讀 data/*.js 裡的 window.XXX，轉成 Python 資料。"""
    code = ("global.window={};require(%s);process.stdout.write(JSON.stringify(window[%s]))"
            % (json.dumps(os.path.abspath(path)), json.dumps(var)))
    out = subprocess.run(["node", "-e", code], capture_output=True, check=True)
    return json.loads(out.stdout.decode("utf-8"))


def esc(s):
    return html.escape(str(s or ""), quote=True)


def short(text, n=150):
    text = re.sub(r"<[^>]+>", "", str(text or ""))
    text = re.sub(r"\s+", " ", text).strip()
    return text[:n] + ("…" if len(text) > n else "")


# ---------------- 共用：把樣板換成這一頁 ----------------
def fill_head(tpl, rel, title, desc, img, img_is_default):
    """把樣板（cat.html／tip.html）的 <head> 換成這一頁自己的標題、介紹、分享圖。"""
    url = SITE + rel
    s = tpl
    # 所有相對網址（images/、assets/、site.js 組出來的連結）都以網站根目錄為準
    s = s.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="/">', 1)
    s = re.sub(r"<title>.*?</title>", lambda m: "<title>%s</title>" % esc(title), s, 1)
    for pat, val in ((r'(<meta name="description" content=")[^"]*', esc(desc)),
                     (r'(<meta property="og:url" content=")[^"]*', url),
                     (r'(<link rel="canonical" href=")[^"]*', url),
                     (r'(<meta property="og:title" content=")[^"]*', esc(title)),
                     (r'(<meta property="og:description" content=")[^"]*', esc(desc)),
                     (r'(<meta property="og:image" content=")[^"]*', esc(img))):
        s = re.sub(pat, lambda m, v=val: m.group(1) + v, s, 1)
    if not img_is_default:
        # 照片尺寸不一，不寫死 1200x630，讓 FB 自己量
        s = re.sub(r'<meta property="og:image:(width|height)" content="\d+">\n', "", s)
    # 跳到主要內容：有 <base> 之後 "#main" 會跳回首頁，改成本頁網址
    s = s.replace('href="#main"', 'href="%s#main"' % rel, 1)
    return s


def fill_body(s, box_id, data_attr, item_id, inner):
    s = s.replace("<body>", '<body %s="%s">' % (data_attr, esc(item_id)), 1)
    s = re.sub(r"\s*<!-- 這一頁的內容由 assets/site.js.*?-->", "", s, 1, flags=re.S)
    empty = '<div class="wrap section" id="%s"></div>' % box_id
    if empty not in s:
        raise SystemExit("樣板跟預期不一樣（找不到 %s），沒辦法產生網頁" % empty)
    return s.replace(empty,
                     "<!-- 這個檔案是 tools/產生貓咪頁.py 自動產生的，不要手改；改 data/ 再跑 tools/更新版本號.py -->\n"
                     '  <div class="wrap section" id="%s">\n    %s\n  </div>' % (box_id, inner), 1)


def write_pages(folder, pages):
    """pages：{檔名: 內容}。寫入有變的，刪掉不在清單裡的。回傳（更新數, 刪除數）。"""
    os.makedirs(folder, exist_ok=True)
    changed = removed = 0
    for fn, new in pages.items():
        path = os.path.join(folder, fn)
        old = io.open(path, encoding="utf-8").read() if os.path.exists(path) else None
        if new != old:
            io.open(path, "w", encoding="utf-8", newline="\n").write(new)
            changed += 1
    for fn in os.listdir(folder):
        if fn.endswith(".html") and fn not in pages:
            os.remove(os.path.join(folder, fn))
            removed += 1
    return changed, removed


# ---------------- 貓咪：cat/<id>.html ----------------
NOT_YET = re.compile(r"^(待確認|待貓窩確認|待貓窩補充|待貓窩提供|年齡不詳|待補)$")


def ok(v):
    return v and not NOT_YET.match(str(v).strip())


def story_list(cat):
    st = cat.get("story") or []
    if isinstance(st, str):
        st = [st] if st and st != "待貓窩提供" else []
    return [s for s in st if s]


def photos_of(cat):
    return [p for p in (cat.get("photos") or ([cat["photo"]] if cat.get("photo") else [])) if p]


def describe(cat):
    """給 Google 和分享預覽看的一句話介紹（150 字內）。"""
    st = story_list(cat)
    if cat.get("status") == "home":
        return short("【已找到家】" + (st[0] if st else cat["name"] + "已經找到永遠的家。"))
    bits = [str(cat[k]) for k in ("sex", "age", "color") if ok(cat.get(k))]
    text = "高雄日日暖暖中途貓窩等家中的貓咪" + cat["name"]
    if bits:
        text += "（" + "、".join(bits) + "）"
    text += "。"
    if ok(cat.get("personality")):
        text += "個性：" + str(cat["personality"]) + "。"
    if st:
        text += st[0]
    return short(text)


def cat_body(cat):
    """搜尋引擎讀得到的內文。site.js 載入後會整塊換成原本的漂亮版面。"""
    home = cat.get("status") == "home"
    parts = ['<div class="cat-sheet">',
             '<p><a href="%s">← 回到%s</a></p>'
             % ("adopted.html" if home else "cats.html", "找到家的貓" if home else "等家的貓咪")]
    photos = photos_of(cat)
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


def make_cat_page(tpl, cat):
    rel = OUT_DIR + "/" + cat["id"] + ".html"
    home = cat.get("status") == "home"
    title = cat["name"] + ("｜找到家的貓" if home else "｜等家的貓咪") + "｜日日暖暖中途貓窩"
    photos = photos_of(cat)
    img = SITE + "images/" + photos[0] if photos else SITE + "images/logo-share.jpg"
    s = fill_head(tpl, rel, title, describe(cat), img, not photos)
    return fill_body(s, "cat-detail", "data-cat-id", cat["id"], cat_body(cat))


# ---------------- 養貓小知識：tip/<id>.html ----------------
def tip_share_image(t):
    """分享預覽圖。封面是 .webp 的另存一張 share.jpg（LINE 等平台不一定吃 webp）。"""
    cover = t.get("cover")
    if not cover or not os.path.exists(os.path.join("images", cover)):
        return None
    if not cover.lower().endswith(".webp"):
        return cover
    src = os.path.join("images", cover)
    dst_rel = os.path.dirname(cover).rstrip("/") + "/share.jpg"
    dst = os.path.join("images", dst_rel)
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
        from PIL import Image
        Image.open(src).convert("RGB").save(dst, "JPEG", quality=88)
    return dst_rel


def tip_body(t):
    parts = ['<p><a href="tips.html">← 回到養貓小知識</a></p>',
             '<h1 class="tip-h1">%s</h1>' % esc(t["title"])]
    if t.get("subtitle"):
        parts.append('<p class="tip-sub">%s</p>' % esc(t["subtitle"]))
    if t.get("summary"):
        parts.append('<p class="lead">%s</p>' % esc(t["summary"]))
    if t.get("type") == "handbook":
        for i, pg in enumerate(t.get("pages") or []):
            parts.append("<h2>%d. %s</h2><p>%s</p>" % (i + 1, esc(pg.get("title")), esc(pg.get("text"))))
    else:
        parts += ["<p>%s</p>" % esc(short(x, 100000)) for x in (t.get("body") or [])]
    return "\n    ".join(parts)


def make_tip_page(tpl, t):
    rel = TIP_DIR + "/" + t["id"] + ".html"
    title = t["title"] + "｜養貓小知識｜日日暖暖中途貓窩"
    desc = short(t.get("summary") or t.get("subtitle") or t["title"])
    share = tip_share_image(t)
    img = SITE + "images/" + share if share else SITE + "images/logo-share.jpg"
    s = fill_head(tpl, rel, title, desc, img, not share)
    s = s.replace('<meta property="og:type" content="website">',
                  '<meta property="og:type" content="article">', 1)
    return fill_body(s, "tip-detail", "data-tip-id", t["id"], tip_body(t))


# ---------------- 主程式 ----------------
def main():
    os.chdir(ROOT)
    data = load_js("data/cats.js", "CAT_DATA")
    cats = [c for c in data.get("cats", []) + data.get("adopted", []) if not c.get("hide")]
    tpl = io.open("cat.html", encoding="utf-8").read()
    c1, r1 = write_pages(OUT_DIR, {c["id"] + ".html": make_cat_page(tpl, c) for c in cats})

    # 養貓小知識：草稿（draft）還不能對外公開，不做網頁、不進 sitemap
    try:
        tips = load_js("data/tips.js", "TIPS_DATA").get("tips", [])
    except Exception:
        tips = []
    tips = [t for t in tips if not t.get("hide") and not t.get("draft")]
    tip_tpl = io.open("tip.html", encoding="utf-8").read()
    c2, r2 = write_pages(TIP_DIR, {t["id"] + ".html": make_tip_page(tip_tpl, t) for t in tips})

    # ---- sitemap.xml：保留主要頁面，重列貓咪頁與小知識 ----
    sm = io.open("sitemap.xml", encoding="utf-8").read() if os.path.exists("sitemap.xml") else ""
    keep = [b for b in re.findall(r"  <url>.*?</url>", sm, flags=re.S)
            if "/cat/" not in b and "/tip/" not in b and "tip.html?id=" not in b]
    urls = []
    for c in cats:
        urls.append("  <url>\n    <loc>%s%s/%s.html</loc>\n    <priority>%s</priority>\n  </url>"
                    % (SITE, OUT_DIR, c["id"], "0.6" if c.get("status") == "home" else "0.8"))
    for t in tips:
        urls.append("  <url>\n    <loc>%s%s/%s.html</loc>\n    <priority>0.7</priority>\n  </url>"
                    % (SITE, TIP_DIR, t["id"]))
    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(keep + urls) + "\n</urlset>\n")
    if out != sm:
        io.open("sitemap.xml", "w", encoding="utf-8", newline="\n").write(out)

    print("貓咪頁：%d 隻（更新 %d、刪掉 %d）；小知識頁：%d 篇（更新 %d、刪掉 %d）；sitemap 共 %d 個網址"
          % (len(cats), c1, r1, len(tips), c2, r2, len(keep) + len(urls)))


if __name__ == "__main__":
    main()
