// 日日暖暖中途貓窩 — 貓咪資料
// 用記事本或 VS Code 打開這個檔就能改。只改下面大括號裡的內容，
// 不要動第一行的 window.CAT_DATA = 和最後一行的分號。
// 欄位意義與操作步驟請看同資料夾的「貓咪資料怎麼改.md」。
// video 欄位：貼 YouTube 網址就會在那隻貓的介紹頁出現影片，留空就不顯示。
// confirmed 欄位：這筆資料最後跟貓窩核對的日期，純內部用，不會顯示在網頁上。
//                 還沒核對過的就留空。
//
// colorType 欄位：「等家的貓咪」那一頁的毛色篩選用，只能填這六個其中一個：
//                 黑貓 / 白貓 / 賓士貓 / 三花貓 / 橘貓 / 虎斑貓
//                 不屬於這六類的貓（例如玳瑁、乳牛）就留空，
//                 牠還是會出現在「全部」裡面，只是不會被篩選鈕選到。
//                 要新增分類的話跟 Claude 說，篩選鈕要一起改。

window.CAT_DATA = {
  "_說明": "這是全站貓咪資料的唯一來源。新增、修改、下架貓咪都只改這個檔，網頁會自動更新。欄位意義與操作步驟請看同資料夾的『貓咪資料怎麼改.md』。",
  "_狀態可用值": "wait=等家中（放在『等家的貓咪』頁）/ home=已找到家（放在『找到家的貓』頁）。網頁上不顯示狀態標籤，因為等家的貓咪一律都是等家中。",
  "_最後更新": "2026-10-12",

  // 「等家的貓咪」頁的毛色篩選鈕，就是照這個清單產生的。
  // 要新增、改名、調順序，改這一行就好，網頁會自動跟著變。
  // 注意：改完之後，每隻貓的 colorType 要填成一模一樣的字，不然會對不上。
  // （乳牛貓歸在賓士貓，不另外分一類。）
  "_毛色分類": ["黑貓", "白貓", "賓士貓", "三花貓", "玳瑁貓", "橘貓", "虎斑貓"],

  // 每個毛色在「單隻貓介紹頁」用哪一種背景主題。
  // 左邊是毛色，右邊是主題代號（背景圖寫在 assets/style.css）。
  // 新增毛色分類時，可以直接沿用現有的主題，例如 "灰貓": "snow"。
  "_毛色主題": {
    "黑貓":   "night",    // 夜晚：星空、月亮、夜裡的屋頂
    "白貓":   "snow",     // 雪地：雪花、雪人、冬天的小屋
    "賓士貓": "piano",    // 黑白：鋼琴琴鍵、音符（像穿燕尾服）
    "三花貓": "garden",   // 花園：三色的花、春天
    "玳瑁貓": "autumn",   // 秋天：落葉、楓葉（玳瑁的顏色像秋天）
    "橘貓":   "sunset",   // 夕陽：橘子、暖陽、黃昏
    "虎斑貓": "forest"    // 森林：綠意、樹林、草地
  },

  "cats": [
    {
      "id": "cream",
      "name": "奶油",
      "status": "wait",
      "sex": "公",
      "age": "年齡不詳",
      "color": "白色長毛",
      "colorType": "白貓",
      "feature": "耳朵往後捲、頭頂一小撮灰毛",
      "personality": "個性溫潤、親人，被摸會瞇眼、尾巴豎直",
      "fit": "待貓窩確認",
      "health": "已結紮；疫苗等醫療資訊以貓窩公告為準",
      "story": "待貓窩提供",
      "photos": ["cats/cream-1.jpg", "cats/cream-2.jpg"],
      "video": "",
      "confirmed": "2026-10-11"
    },
    {
      "id": "chienchien",
      "name": "錢錢",
      "status": "wait",
      "sex": "公",
      "age": "年齡不詳",
      "color": "橘虎斑",
      "colorType": "橘貓",
      "feature": "淺橘斑紋",
      "personality": "對人超黏、會翻肚",
      "fit": "適合獨貓家庭（跟其他貓相處不來）",
      "health": "結紮與疫苗狀況待貓窩確認",
      "story": "待貓窩提供",
      "photos": ["cats/chienchien-1.jpg", "cats/chienchien-2.jpg"],
      "video": "https://www.youtube.com/shorts/C0uIE9S-S30",
      "confirmed": "2026-10-02"
    },
    {
      "id": "sher",
      "name": "雪兒",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "頭頂一撮灰黑斑",
      "personality": "愛吃肉泥；在箱子裡偶爾會哈氣",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/sher-1.jpg", "cats/sher-2.jpg"],
      "video": "https://www.youtube.com/shorts/tz7MHrf1ybk",
      "confirmed": ""
    },
    {
      "id": "panmao",
      "name": "胖毛",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "棕虎斑、白胸",
      "colorType": "虎斑貓",
      "feature": "體型大隻",
      "personality": "會像人一樣坐著、會翻肚",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/panmao-1.jpg", "cats/panmao-2.jpg"],
      "video": "",
      "confirmed": ""
    },
    {
      "id": "jill",
      "name": "吉兒",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "淡三花（灰＋奶油＋白）",
      "colorType": "三花貓",
      "feature": "",
      "personality": "送養會上會躺著給人摸",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/jill-1.jpg"],
      "video": "",
      "confirmed": ""
    },
    {
      "id": "jinbao",
      "name": "進寶",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "黑貓",
      "colorType": "黑貓",
      "feature": "黃綠色眼睛",
      "personality": "待貓窩補充",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/jinbao-1.jpg", "cats/jinbao-2.jpg", "cats/jinbao-3.jpg"],
      "video": "",
      "confirmed": ""
    },
    {
      "id": "pianpian",
      "name": "片片",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "白底黑",
      "colorType": "賓士貓",
      "feature": "眼睛很大",
      "personality": "待貓窩補充",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/pianpian-1.jpg"],
      "video": "",
      "confirmed": ""
    },
    {
      "id": "doudou",
      "name": "兜兜",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "白底灰虎斑",
      "colorType": "虎斑貓",
      "feature": "",
      "personality": "待貓窩補充",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photos": ["cats/doudou-1.jpg"],
      "video": "",
      "confirmed": "2026-10-13 毛色確認"
    }
  ],

  "_已找到家名單說明": "下面這一區是「找到家的貓」頁面的資料來源。雛形階段刻意留空，因為成功案例名單必須由貓窩提供，不能由瑞億或 Claude 推測。拿到名單後照 cats 的格式加進來，status 填 home。",
  // 找到家的貓。貓咪送養後，把牠整段從上面的 cats 搬過來，
  // status 改成 "home"，並加一個 source 欄位放資料出處
  // （從官方 FB／IG 整理來的，要附上原貼文連結）：
  //   "source": "https://www.facebook.com/…"
    "adopted": [
    {
      "id": "zhizhi",
      "name": "梔梔",
      "status": "home",
      "colorType": "虎斑貓",
      "inDate": "2026-07-04",
      "homeDate": "2026-08-08",
      "story": [
        "六月底、七月初那幾天，高雄連續下了好幾天豪大雨。志工大哥在附近停車場的一隅發現一隻孤單的小貓，見到人就怯生生地往停放的車輛底盤下躲。那條巷弄平常只有一隻老貓會跳進公寓某個樓層覓食，沒有其他貓咪的身影，也沒有愛媽在定點餵食——志工決定把她誘捕安置，之後再幫她找個家。",
        "接下來幾天只能趁雨勢轉小的空檔，試探性地投餵乾糧和罐頭，確認她還沒離開。豪雨過後開始設籠誘捕，連續等了兩天，改良了一下環境再設一次。直到凌晨將近天亮時去查看，籠門終於關上了。懷著忐忑的心掀開蓋布，裡面是一雙閃亮而驚怯的小眼睛，頭頂有虎斑貓咪特有的那個明顯的 M 標記。",
        "檢查、驅蟲、安置之後，大家熱烈討論名字，最後叫她梔梔，取自梔子花的發想。梔子花的花語是「守候的愛」——是她先帶著愛躲在停車場，像是知道會有愛貓的人在風雨中等她。",
        "安置後還不到一個月，梔梔來不及去當送養會的紅牌，就先等到新家了。新家人是由認養夥伴轉介而來，已經有相當的養貓經驗，環境也早就準備好，等著迎接她。"
      ],
      "photos": ["adopted/zhizhi-1.jpg"],
      "sources": [
        { "label": "新入住（官方 IG）", "url": "https://www.instagram.com/p/DaYFC_jIDXZ/" },
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DbyG4JuFH6G/" }
      ],
      "confirmed": "⚠️ 照片是從 IG 截圖裁下來的，畫質一般，之後換成原圖"
    }
  ]
};
