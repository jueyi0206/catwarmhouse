# -*- coding: utf-8 -*-
"""
更新網頁引用 CSS／JS 時的版本號（避免瀏覽器用到舊的快取檔）。

為什麼需要這個：
    瀏覽器會把 .css 和 .js 暫存起來（GitHub Pages 預設存 10 分鐘），
    所以改完程式推上去之後，使用者有可能拿到「新的 HTML ＋ 舊的 JS」，
    畫面就會壞掉（例如篩選鈕消失）。
    解法是在網址後面加一段版本號，例如 assets/site.js?v=a1b2c3d4，
    內容一變版本號就變，瀏覽器就知道要重新抓。

什麼時候要跑：
    改過 assets/ 或 data/ 裡的檔案之後，推上 GitHub 之前跑一次。

怎麼跑（在專案資料夾開終端機）：
    python tools/更新版本號.py

版本號是檔案內容的 hash，內容沒變就不會變，
所以沒改到的檔案，使用者的快取會繼續沿用，不會白白重抓。
"""
import hashlib
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def file_hash(path):
    """取檔案內容的前 8 碼 hash 當版本號。"""
    with open(path, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


def check_font():
    """順便檢查網站有沒有字沒收進精簡字型裡。

    精簡字型的代價是「加了新字可能要重做」，所以這裡自動幫忙盯著：
    有缺字就提醒該跑 tools/產生字型.py，沒缺字就不用管。
    缺字不會讓網站壞掉，只是那幾個字會用電腦內建的字型顯示。
    """
    font_path = os.path.join("assets", "fonts", "huninn-subset.woff2")
    if not os.path.exists(font_path):
        return
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        return

    try:
        have = set()
        f = TTFont(font_path, lazy=True)
        for table in f["cmap"].tables:
            have.update(table.cmap.keys())
        f.close()
    except Exception:
        return

    import glob as _glob
    import re as _re

    need = set()
    for pat in ("*.html", "data/*.js"):
        for path in _glob.glob(pat):
            s = io.open(path, encoding="utf-8", errors="replace").read()
            if path.endswith(".html"):
                s = _re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", s, flags=_re.S | _re.I)
                s = _re.sub(r"<[^>]+>", " ", s)
            need.update(s)

    def is_chinese(c):
        """只看中文字與中文標點。
        emoji（🐾 這類）本來就不該收進中文字型，電腦會用自己的 emoji 字型顯示，
        所以不算缺字。"""
        o = ord(c)
        return (0x3000 <= o <= 0x303F      # 中文標點
                or 0x3400 <= o <= 0x4DBF   # 擴充 A 區
                or 0x4E00 <= o <= 0x9FFF   # 常用漢字
                or 0xFF00 <= o <= 0xFF65)  # 全形英數標點

    missing = sorted(c for c in need if is_chinese(c) and ord(c) not in have)
    if missing:
        print()
        print("⚠️  有 " + str(len(missing)) + " 個字不在精簡字型裡：")
        print("    " + "".join(missing[:60]) + ("…" if len(missing) > 60 else ""))
        print("    這幾個字會用電腦內建的字型顯示（不會壞，只是看起來不一樣）。")
        print("    想讓它們也用圓體，跑一次：python tools/產生字型.py")
    else:
        print()
        print("字型檢查：網站用到的字都有收錄，不用重做字型。")


def main():
    os.chdir(ROOT)

    # 要加版本號的檔案：CSS、JS、字型，還有圖片
    # 圖片也要，因為換圖時常常沿用同一個檔名（例如重做設計稿後換掉 step-5.jpg），
    # 沒有版本號的話使用者會繼續看到舊圖。
    targets = {}
    for folder in ("assets", "data", "assets/fonts", "images"):
        if not os.path.isdir(folder):
            continue
        for name in sorted(os.listdir(folder)):
            if name.endswith((".css", ".js", ".woff2", ".jpg", ".jpeg", ".png", ".webp", ".svg")):
                rel = folder + "/" + name
                targets[rel] = file_hash(rel)

    if not targets:
        print("找不到要處理的檔案")
        return

    # 字型是在 CSS 裡用 url() 引用的，HTML 看不到，所以先處理 CSS。
    # 順序很重要：先把字型版本號寫進 CSS，CSS 的 hash 才會跟著變，
    # 這樣瀏覽器重抓 CSS 時就會看到新的字型網址。
    for css in [p for p in targets if p.endswith(".css")]:
        s = io.open(css, encoding="utf-8").read()
        new = s
        for font in [p for p in targets if p.endswith(".woff2")]:
            name = os.path.basename(font)
            new = re.sub(
                r'(url\("fonts/' + re.escape(name) + r')(\?v=[0-9a-f]+)?(")',
                lambda m: m.group(1) + "?v=" + targets[font] + m.group(3),
                new,
            )
        if new != s:
            io.open(css, "w", encoding="utf-8").write(new)
            targets[css] = file_hash(css)       # 內容變了，重算一次

    pattern = re.compile(
        r'((?:src|href)=")(' + "|".join(re.escape(p) for p in targets) + r')(\?v=[0-9a-f]+)?(")'
    )

    changed = 0
    for name in sorted(os.listdir(".")):
        if not name.endswith(".html"):
            continue
        s = io.open(name, encoding="utf-8").read()
        new = pattern.sub(
            lambda m: m.group(1) + m.group(2) + "?v=" + targets[m.group(2)] + m.group(4), s
        )
        if new != s:
            io.open(name, "w", encoding="utf-8").write(new)
            changed += 1

    print("版本號：")
    for path, h in targets.items():
        print("  " + path.ljust(28) + " v=" + h)
    print()
    print("更新了 " + str(changed) + " 個網頁")

    check_font()


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
