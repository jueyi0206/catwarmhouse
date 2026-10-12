# -*- coding: utf-8 -*-
"""
產生網站用的中文圓體（精簡版）。

用的字型是「jf open 粉圓體」，justfont 開源、SIL OFL 授權，可以免費商用。
原檔有一萬兩千多字、4.7 MB，直接放上網手機會載很久，
所以這支工具只把「網站實際用到的字」留下來，做成幾百 KB 的精簡檔。

什麼時候要跑：
    網站加了新文字（新貓咪的名字、新消息、新文章）之後。
    沒跑也不會壞 —— 沒收錄到的字會用電腦內建的字型顯示，
    只是那幾個字看起來跟其他字不一樣。

怎麼跑（在專案資料夾開終端機）：
    python tools/產生字型.py

跑完記得接著跑：
    python tools/更新版本號.py
"""
import io
import os
import re
import sys
import glob
import tempfile
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_URL = "https://cdn.jsdelivr.net/gh/justfont/open-huninn-font@2.1/font/jf-openhuninn-2.1.ttf"
OUT_DIR = os.path.join(ROOT, "assets", "fonts")
OUT_NAME = "huninn-subset.woff2"

# 保險字：網站現在沒用到，但以後很可能會用到的字。
#
# 為什麼要收這些：
#     精簡字型的代價，是「網站加了新字就得重跑這支工具」。
#     所以這裡先把日常會用到的字都收進來，之後新增貓咪名字、
#     寫消息、寫文章，絕大多數情況都已經涵蓋，不必重跑。
#     多收這些字大約只多幾十 KB，很划算。
EXTRA = (
    # 數字、時間
    "零一二三四五六七八九十百千萬億兩半第幾"
    "年月日時分秒週星期今明昨去前後初末旬早晚上下午夜晨昏"
    "春夏秋冬季節晴雨陰天氣冷熱暖涼溫濕乾"
    # 代詞、連接、語氣
    "我你妳他她牠它們的了在和與或但也都還又再就才把被給讓從到向對於"
    "是有無不沒很太最更好壞大小多少高低新舊快慢長短輕重深淺"
    "可以能會要想請謝麻煩歡迎希望需要應該必須建議提醒"
    "這那哪什麼怎為何誰因所以如果雖然但是而且或者還是"
    # 常用動詞
    "吃喝睡玩跑跳抱摸叫看聽聞走站坐躺趴爬鑽躲找等待"
    "做用做成做完開關進出回來去帶送收拿放換洗擦整理準備"
    "說告訴問答寫讀學教知道了解認識記得忘記覺得喜歡討厭"
    "幫忙支持參加加入分享留言回覆聯絡詢問申請填寫確認同意"
    # 貓咪、送養相關
    "貓咪犬狗公母幼成老年紀隻個歲天週月前後左右裡外上下"
    "健康結紮絕育疫苗驅蟲血檢醫院獸醫治療照顧復原狀況穩定虛弱"
    "親人害羞活潑安靜黏人膽小怕生愛撒嬌乖巧調皮溫柔兇凶哈氣"
    "黑白橘灰黃棕褐銀藍乳牛三花虎斑賓士玳瑁長毛短毛花色"
    "領養送養認養中途收容救援絕育流浪街貓家庭環境適合條件"
    "飼料罐頭肉泥零食貓砂盆尿尿便便玩具逗貓棒抓板籠子外出籠"
    "窗戶陽台紗窗防墜網門鎖安全危險注意小心"
    "原飼主棄養走失協尋送出回家新家主人家人孩子小孩"
    # 地名、聯絡
    "高雄台臺南北中東西部市區鄉鎮里路街巷弄號樓之"
    "電話信箱地址網站粉專社群臉書限時動態貼文私訊訊息"
    # 網站常見詞
    "首頁關於我們最新消息活動公告流程介紹說明注意事項"
    "照片影片故事分類篩選全部更多繼續開始結束完成取消"
    "志工物資捐助義賣助養支持幫助愛心謝謝感謝"
)


def collect_chars():
    """把網站上會顯示的文字都掃一遍，收集用到的字。"""
    chars = set()
    patterns = ["*.html", "data/*.js", "assets/*.js", "assets/*.css"]
    files = []
    for pat in patterns:
        files.extend(glob.glob(os.path.join(ROOT, pat)))

    for path in sorted(files):
        try:
            s = io.open(path, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        if path.endswith(".html"):
            # 去掉標籤，只留看得到的文字（順便把註解也收進來，不差那幾個字）
            s = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", s, flags=re.S | re.I)
            s = re.sub(r"<[^>]+>", " ", s)
        chars.update(s)

    chars.update(EXTRA)
    # 基本的英數與標點一定要留
    chars.update(
        "0123456789"
        "abcdefghijklmnopqrstuvwxyz"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        " .,:;!?'\"()[]{}<>/\\|-_=+*&%$#@~`^"
        "，。、；：！？「」『』（）【】《》〈〉—…・～／＋－×÷＝"
    )
    # 控制字元不用收
    return {c for c in chars if ord(c) > 31}


def get_source_font():
    """原始字型檔放在系統暫存區，第一次跑會下載，之後重複使用。"""
    cache = os.path.join(tempfile.gettempdir(), "jf-openhuninn-2.1.ttf")
    if os.path.exists(cache) and os.path.getsize(cache) > 1000000:
        print("使用已下載的字型檔：" + cache)
        return cache
    print("下載字型原檔（約 4.7 MB，只會下載這一次）…")
    urllib.request.urlretrieve(FONT_URL, cache)
    print("下載完成")
    return cache


def main():
    from fontTools import subset

    chars = collect_chars()
    print("網站用到的字：" + str(len(chars)) + " 個")

    src = get_source_font()
    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, OUT_NAME)

    args = [
        src,
        "--text=" + "".join(sorted(chars)),
        "--flavor=woff2",
        "--output-file=" + out,
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        "--name-IDs=1,2,3,4,5,6,13,14",   # 保留字型名稱與授權資訊
    ]
    subset.main(args)

    size_kb = os.path.getsize(out) / 1024.0
    src_mb = os.path.getsize(src) / 1048576.0
    print()
    print("完成：assets/fonts/" + OUT_NAME)
    print("  原檔 %.1f MB → 精簡後 %.0f KB" % (src_mb, size_kb))
    print()
    print("接著請跑：python tools/更新版本號.py")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
