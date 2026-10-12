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


def main():
    os.chdir(ROOT)

    # 要加版本號的檔案：自己的 CSS 與 JS
    targets = {}
    for folder in ("assets", "data"):
        if not os.path.isdir(folder):
            continue
        for name in sorted(os.listdir(folder)):
            if name.endswith((".css", ".js")):
                rel = folder + "/" + name
                targets[rel] = file_hash(rel)

    if not targets:
        print("找不到要處理的檔案")
        return

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
        print("  " + path.ljust(22) + " v=" + h)
    print()
    print("更新了 " + str(changed) + " 個網頁")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
