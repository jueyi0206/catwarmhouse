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
  "_最後更新": "2026-11-25",

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
      "age": "1歲+",
      "color": "白色長毛",
      "colorType": "白貓",
      "feature": "亮顏小王子",
      "personality": "個性溫潤親人，善討摸不喜抱，被摸會瞇眼、尾巴豎直",
      "health": "疫苗 ☑、節育 ☑",
      "story": "待貓窩提供",
      "photos": ["cats/cream-1.jpg", "cats/cream-2.jpg", "cats/cream-3.jpg"],
      "video": "https://www.youtube.com/shorts/Bq_afoAB8ng",
      "confirmed": "2026-10-30"
    },
    {
      "id": "chienchien",
      "name": "錢錢",
      "status": "wait",
      "sex": "公",
      "age": "2歲",
      "color": "橘虎斑",
      "colorType": "橘貓",
      "feature": "天真憨厚暖男",
      "personality": "性情穩定、親切直率溫和；對人超黏、會翻肚；跟其他貓相處不來，適合當獨生子",
      "health": "疫苗 ☑、節育 ☑",
      "story": "待貓窩提供",
      "photos": ["cats/chienchien-1.jpg", "cats/chienchien-2.jpg", "cats/chienchien-3.jpg"],
      "video": "https://www.youtube.com/shorts/C0uIE9S-S30",
      "confirmed": "2026-10-30"
    },
    {
      "id": "sher",
      "name": "雪兒",
      "status": "wait",
      "sex": "母",
      "age": "5歲+",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "超霸氣白雪女王",
      "personality": "只認肉泥，其餘免談；愛吃肉泥、在箱子裡偶爾會哈氣",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/sher-1.jpg", "cats/sher-2.jpg", "cats/sher-3.jpg"],
      "video": "https://www.youtube.com/shorts/tz7MHrf1ybk",
      "confirmed": "2026-10-30"
    },
    {
      "id": "panmao",
      "name": "胖毛",
      "status": "wait",
      "sex": "公",
      "age": "7歲",
      "color": "棕虎斑、白胸",
      "colorType": "虎斑貓",
      "feature": "貓界馬東石",
      "personality": "自成喜感，走路有風，力大無窮；會像人一樣坐著、會翻肚",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/panmao-1.jpg", "cats/panmao-2.jpg", "cats/panmao-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "jill",
      "name": "吉兒",
      "status": "wait",
      "sex": "母",
      "age": "5歲+",
      "color": "淡三花（灰＋奶油＋白）",
      "colorType": "三花貓",
      "feature": "細緻暖心小名媛",
      "personality": "親人，獨特唯美，送養會躺著給人摸",
      "health": "疫苗 ☑、節育 ☑、貓愛滋",
      "story": "",
      "photos": ["cats/jill-1.jpg", "cats/jill-2.jpg", "cats/jill-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "jinbao",
      "name": "進寶",
      "status": "wait",
      "sex": "母",
      "age": "2歲",
      "color": "黑貓",
      "colorType": "黑貓",
      "feature": "性感零極限美模",
      "personality": "嗆辣親柔並存，帥美魅力兼容；脾氣古怪情緒切換快，偶爾討摸享受、低吼時請勿靠近",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/jinbao-1.jpg", "cats/jinbao-2.jpg", "cats/jinbao-3.jpg"],
      "video": "https://www.youtube.com/shorts/6IAKYtvc5WA",
      "confirmed": "2026-10-30"
    },
    {
      "id": "pianpian",
      "name": "片片",
      "status": "wait",
      "sex": "公",
      "age": "2歲",
      "color": "白底黑",
      "colorType": "賓士貓",
      "feature": "熱情小里長",
      "personality": "貼心主動、親人、不挑食",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/pianpian-1.jpg", "cats/pianpian-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "doudou",
      "name": "兜兜",
      "status": "wait",
      "sex": "公",
      "age": "8-9個月",
      "color": "白底灰虎斑",
      "colorType": "虎斑貓",
      "feature": "樂活小跟班",
      "personality": "喜歡跟大貓玩，擅模仿，快樂踢踢",
      "health": "疫苗 ☑",
      "story": "",
      "photos": ["cats/doudou-1.jpg", "cats/doudou-2.jpg", "cats/doudou-3.jpg"],
      "video": "https://www.youtube.com/shorts/5JEbxS2Q43Y",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaoling",
      "name": "小玲",
      "status": "wait",
      "sex": "母",
      "age": "5歲+",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "歐風古典俏美貓",
      "personality": "甜膩美聲，甜蜜翻滾撩人計",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaoling-1.jpg", "cats/xiaoling-2.jpg", "cats/xiaoling-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "knight",
      "name": "小騎士",
      "status": "wait",
      "sex": "公",
      "age": "4個月",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "正義勇敢小虎斑",
      "personality": "會照顧同胎，可親近喜摸額頭",
      "health": "疫苗 ☑",
      "story": "",
      "photos": ["cats/knight-1.jpg", "cats/knight-2.jpg", "cats/knight-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "liuhai",
      "name": "瀏海",
      "status": "wait",
      "sex": "公",
      "age": "6歲",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "健體美顏型男",
      "personality": "貴族氣質，易親近最佳陪伴",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/liuhai-1.jpg", "cats/liuhai-2.jpg", "cats/liuhai-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "atai",
      "name": "阿泰",
      "status": "wait",
      "sex": "公",
      "age": "3歲+",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "頑皮肥嫩哥",
      "personality": "看似笨拙其實古靈精怪",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/atai-1.jpg", "cats/atai-2.jpg", "cats/atai-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "dama",
      "name": "大媽",
      "status": "wait",
      "sex": "母",
      "age": "7歲+",
      "color": "玳瑁",
      "colorType": "玳瑁貓",
      "feature": "嫻靜婉約淑女",
      "personality": "優雅內向，性情穩定",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/dama-1.jpg", "cats/dama-2.jpg", "cats/dama-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "dangdang",
      "name": "噹噹",
      "status": "wait",
      "sex": "母",
      "age": "3歲+",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "快閃女飛俠",
      "personality": "敏感、機靈，胃口好",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/dangdang-1.jpg", "cats/dangdang-2.jpg", "cats/dangdang-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaokuan",
      "name": "小寬",
      "status": "wait",
      "sex": "公",
      "age": "10歲+",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "街頭遊俠",
      "personality": "多次手術歷劫歸來，親人淘氣",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaokuan-1.jpg", "cats/xiaokuan-2.jpg", "cats/xiaokuan-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "beier",
      "name": "貝兒",
      "status": "wait",
      "sex": "母",
      "age": "4歲+",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "微甜系美貓",
      "personality": "娃娃般的身形，迷人討喜",
      "health": "疫苗 ☑、節育 ☑、貓愛滋",
      "story": "",
      "photos": ["cats/beier-1.jpg", "cats/beier-2.jpg", "cats/beier-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "queen",
      "name": "小皇后",
      "status": "wait",
      "sex": "母",
      "age": "4個月",
      "color": "橘色",
      "colorType": "橘貓",
      "feature": "小清新母橘貓",
      "personality": "極內向，需靠食物驅動靠近",
      "health": "疫苗 ☑",
      "story": "",
      "photos": ["cats/queen-1.jpg", "cats/queen-2.jpg", "cats/queen-3.jpg"],
      "video": "https://www.youtube.com/shorts/ceK8QjwIC34",
      "confirmed": "2026-10-30"
    },
    {
      "id": "shasha",
      "name": "莎莎",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "健身美少女",
      "personality": "好惡分明，恣意搞笑",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/shasha-1.jpg", "cats/shasha-2.jpg", "cats/shasha-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "chocolate",
      "name": "巧克力",
      "status": "wait",
      "sex": "公",
      "age": "7歲+",
      "color": "黑貓",
      "colorType": "黑貓",
      "feature": "正韓系歐巴代表",
      "personality": "精實高挑，溫文儒雅不做怪",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/chocolate-1.jpg", "cats/chocolate-2.jpg", "cats/chocolate-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "zhuzhu",
      "name": "竹竹",
      "status": "wait",
      "sex": "公",
      "age": "2歲",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "元氣福相貓",
      "personality": "討喜圓臉，享受久摸，快樂翻滾",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/zhuzhu-1.jpg", "cats/zhuzhu-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "rourou",
      "name": "肉肉",
      "status": "wait",
      "sex": "公",
      "age": "10歲+",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "溫順大媽寶",
      "personality": "暖心愛撒嬌，最愛叔叔姨姨",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/rourou-1.jpg", "cats/rourou-2.jpg", "cats/rourou-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "damiao",
      "name": "大喵",
      "status": "wait",
      "sex": "公",
      "age": "10歲+",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "貓界李榮浩",
      "personality": "眼神無辜，個性木訥耿直",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/damiao-1.jpg", "cats/damiao-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "pipi",
      "name": "皮皮",
      "status": "wait",
      "sex": "母",
      "age": "4歲+",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "微潤系美貓",
      "personality": "享受美好距離，喜歡湯罐，角落生活",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/pipi-1.jpg", "cats/pipi-2.jpg", "cats/pipi-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaohu",
      "name": "小虎",
      "status": "wait",
      "sex": "公",
      "age": "6歲",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "白短襪文青男",
      "personality": "睡到自然醒，再默默清盤，是日常",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaohu-1.jpg", "cats/xiaohu-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "baitou",
      "name": "白頭",
      "status": "wait",
      "sex": "公",
      "age": "4歲+",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "深藏不露攀爬高手",
      "personality": "斯文外貌，聰明白身，身手矯捷",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/baitou-1.jpg", "cats/baitou-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaozhi",
      "name": "小智",
      "status": "wait",
      "sex": "公",
      "age": "5歲+",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "敦厚呆萌小哥",
      "personality": "溫和但怕生，不挑嘴好照顧",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaozhi-1.jpg", "cats/xiaozhi-2.jpg", "cats/xiaozhi-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "baobao",
      "name": "寶寶",
      "status": "wait",
      "sex": "公",
      "age": "5歲",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "特級隱士",
      "personality": "專注觀察，保持距離美感",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/baobao-1.jpg", "cats/baobao-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "mile",
      "name": "米樂",
      "status": "wait",
      "sex": "母",
      "age": "4歲",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "閃電秘密客",
      "personality": "膽小、機警，擅觀察",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/mile-1.jpg", "cats/mile-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "quanquan",
      "name": "圈圈",
      "status": "wait",
      "sex": "母",
      "age": "1-2歲",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "輕柔小媽咪",
      "personality": "靦腆文靜，腳步輕快，性格溫潤",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/quanquan-1.jpg", "cats/quanquan-2.jpg", "cats/quanquan-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "mimi",
      "name": "大咪",
      "status": "wait",
      "sex": "公",
      "age": "10歲+",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "清秀美貓",
      "personality": "友善乖巧、親人，喜安靜自居",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/mimi-1.jpg", "cats/mimi-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaomeinu",
      "name": "小美女",
      "status": "wait",
      "sex": "母",
      "age": "7歲+",
      "color": "黑白（乳牛）",
      "colorType": "賓士貓",
      "feature": "冷豔誘人美貓",
      "personality": "有耐心不躁動，眼神直勾心底",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaomeinu-1.jpg", "cats/xiaomeinu-2.jpg", "cats/xiaomeinu-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "audi",
      "name": "奧迪",
      "status": "wait",
      "sex": "公",
      "age": "5歲+",
      "color": "黑白（賓士）",
      "colorType": "賓士貓",
      "feature": "鼻涕大叔",
      "personality": "慵懶肥帥，強勁拳擊手",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/audi-1.jpg", "cats/audi-2.jpg", "cats/audi-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "xiaoya",
      "name": "小牙",
      "status": "wait",
      "sex": "母",
      "age": "4歲+",
      "color": "黑白（賓士）",
      "colorType": "賓士貓",
      "feature": "害羞小媽咪",
      "personality": "慢熱、細膩，喜歡被摸頭",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/xiaoya-1.jpg", "cats/xiaoya-2.jpg", "cats/xiaoya-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "meimei",
      "name": "美美",
      "status": "wait",
      "sex": "母",
      "age": "6歲",
      "color": "白底虎斑",
      "colorType": "虎斑貓",
      "feature": "優雅仕女",
      "personality": "胃口極佳，窈窕身形，不老妹妹頭",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/meimei-1.jpg", "cats/meimei-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "debbie",
      "name": "黛比",
      "status": "wait",
      "sex": "母",
      "age": "4歲",
      "color": "玳瑁",
      "colorType": "玳瑁貓",
      "feature": "搖滾獨立女貓",
      "personality": "有邊界感，觀察力強",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/debbie-1.jpg", "cats/debbie-2.jpg", "cats/debbie-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "heitou",
      "name": "黑頭",
      "status": "wait",
      "sex": "公",
      "age": "4歲+",
      "color": "虎斑",
      "colorType": "虎斑貓",
      "feature": "熱力大頑童",
      "personality": "愛說話、裝忙，聞香衝第一",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/heitou-1.jpg", "cats/heitou-2.jpg", "cats/heitou-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "bruce",
      "name": "布魯斯",
      "status": "wait",
      "sex": "公",
      "age": "4歲+",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "正氣大哥",
      "personality": "身軀纖長、頭頂小山髮片，喜咬塑膠袋",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/bruce-1.jpg", "cats/bruce-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "bruno",
      "name": "布魯諾",
      "status": "wait",
      "sex": "公",
      "age": "3歲",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "貼心小隨扈",
      "personality": "純白萌貓，奶裡奶氣、喜跟在腳邊蹭頭討摸",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/bruno-1.jpg", "cats/bruno-2.jpg", "cats/bruno-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "naitang",
      "name": "奶糖",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "異瞳極美貓",
      "personality": "少見異色雙瞳，靈活快閃、不易捉摸",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/naitang-2.jpg", "cats/naitang-1.jpg", "cats/naitang-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "guotang",
      "name": "果糖",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "溫柔內斂美貓",
      "personality": "斜分頭、富含仙氣，喜歡乾飼料",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/guotang-2.jpg", "cats/guotang-1.jpg", "cats/guotang-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "bingtang",
      "name": "冰糖",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "特級甜蜜尤物",
      "personality": "妙鼻貼黑鼻心特色，喜翻滾偷咬撒嬌",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/bingtang-1.jpg", "cats/bingtang-2.jpg", "cats/bingtang-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "heimeigui",
      "name": "黑玫瑰",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "蒙面 I 型俠女",
      "personality": "進食緩慢、擅長角落觀察、極度機警",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/heimeigui-1.jpg", "cats/heimeigui-2.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "heimuer",
      "name": "黑木耳",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "頑皮傻妞",
      "personality": "白帶脖圍圍巾，著迷玩具、進食快速",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/heimuer-1.jpg", "cats/heimuer-2.jpg", "cats/heimuer-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "heizhenzhu",
      "name": "黑珍珠",
      "status": "wait",
      "sex": "母",
      "age": "4歲",
      "color": "黑貓",
      "colorType": "黑貓",
      "feature": "珠光少女",
      "personality": "光澤毛色、身手敏捷，給罐頭就給摸",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/heizhenzhu-1.jpg", "cats/heizhenzhu-2.jpg", "cats/heizhenzhu-3.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "heizuanshi",
      "name": "黑鑽石",
      "status": "wait",
      "sex": "母",
      "age": "3歲",
      "color": "賓士貓",
      "colorType": "賓士貓",
      "feature": "逗趣嘟嘟小嘴貓",
      "personality": "可愛嘟嘟嘴，睡前會討摸、清盤徹底、喝水量多",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/heizuanshi-1.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "brook",
      "name": "布魯克",
      "status": "wait",
      "sex": "公",
      "age": "3歲",
      "color": "白貓",
      "colorType": "白貓",
      "feature": "傲嬌小童",
      "personality": "頭頂黑斑點，活動力極強、喜爬高、愛催飯",
      "health": "疫苗 ☑、節育 ☑",
      "story": "",
      "photos": ["cats/brook-1.jpg"],
      "video": "",
      "confirmed": "2026-10-30"
    },
    {
      "id": "qiufeng",
      "name": "秋楓",
      "status": "wait",
      "sex": "公",
      "age": "2個月",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "秋天的寶貝",
      "personality": "食量佳、活動力強、容易緊張",
      "health": "",
      "story": "",
      "photos": [
        "cats/qiufeng-1.jpg",
        "cats/qiufeng-2.jpg",
        "cats/qiufeng-3.jpg"
      ],
      "video": "",
      "confirmed": ""
    },
    {
      "id": "qiumei",
      "name": "秋妹",
      "status": "wait",
      "sex": "母",
      "age": "2個月",
      "color": "虎斑帶白",
      "colorType": "虎斑貓",
      "feature": "秋天的寶貝",
      "personality": "食量佳、較為膽小、喜歡趴臥姿",
      "health": "",
      "story": "",
      "photos": [
        "cats/qiumei-1.jpg",
        "cats/qiumei-2.jpg",
        "cats/qiumei-3.jpg"
      ],
      "video": "",
      "confirmed": ""
    }
  ],

  "_已找到家名單說明": "下面這一區是「找到家的貓」頁面的資料來源。雛形階段刻意留空，因為成功案例名單必須由貓窩提供，不能由瑞億或 Claude 推測。拿到名單後照 cats 的格式加進來，status 填 home。",
  // 找到家的貓。貓咪送養後，把牠整段從上面的 cats 搬過來，
  // status 改成 "home"，並加一個 source 欄位放資料出處
  // （從官方 FB／IG 整理來的，要附上原貼文連結）：
  //   "source": "https://www.facebook.com/…"
    "adopted": [
    {
      "id": "ponkan",
      "name": "椪柑",
      "status": "home",
      "colorType": "橘貓",
      "homeDate": "2026-11-03",
      "story": [
        "椪柑最早是在市郊的路邊被路人救援的，輾轉來到日日暖暖。小小一隻橘貓，不論在貓窩還是送養會現場，都是最受矚目的那一個。",
        "後來牠有機會到一間友善動物餐廳託養駐點。才去兩天，搞怪逗趣的本性就原形畢露，吸引了不少新舊客人的目光——這麼高調求關注的孩子，也終於等到了很棒的家人。",
        "到新家之後，椪柑已經開始跟原本的貓同伴打鬧、玩在一起了。謝謝牠一路都很陽光的個性，為自己帶來了幸福，也讓照顧過牠的每個人一起擁有了喜樂。"
      ],
      "photos": ["adopted/ponkan-1.jpg", "adopted/ponkan-2.jpg"],
      "sources": [
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DfSBVCVEmf8/" }
      ],
      "confirmed": ""
    },
    {
      "id": "corona",
      "name": "可樂娜",
      "status": "home",
      "colorType": "三花貓",
      "homeDate": "2026-11-01",
      "story": [
        "花貓在貓圈子裡可說是顏值頂天的代表，不論在哪總是令人眼睛為之一亮。可樂娜還在流浪的時候，可能也是這樣被盯上，而後被救援、安置到日日暖暖來。",
        "到了貓窩或送養會，她的詢問度一直居高不下。關心的人多、約看的也不少，反而讓貓窩有些著急——怎麼還沒等到適合的家呢？",
        "但往往最好的安排，是出乎預料的。才剛把認養平台的資料更新上去，下一秒就跳出了訊息。想認養的家人積極卻不失禮貌地詢問、約看，也配合外地場地的訪視，對於再次見面同樣有計劃地安排。真的非常謝謝這家人對認養貓孩的重視與承諾。",
        "如今可樂娜已經到了台中的新家，適應得很好，跟在貓窩時一樣穩定——緩緩步伐，靜靜探索，乖乖吃喝，穩穩陪伴。"
      ],
      "photos": ["adopted/corona-1.jpg", "adopted/corona-3.jpg", "adopted/corona-2.jpg"],
      "sources": [
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DfSJloQElHT/" }
      ],
      "confirmed": ""
    },
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
      "photos": ["adopted/zhizhi-1.jpg", "adopted/zhizhi-2.jpg", "adopted/zhizhi-3.jpg"],
      "sources": [
        { "label": "新入住（官方 IG）", "url": "https://www.instagram.com/p/DaYFC_jIDXZ/" },
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DbyG4JuFH6G/" }
      ],
      "confirmed": ""
    },
    {
      "id": "shu",
      "name": "小曙",
      "status": "home",
      "inDate": "2025-10-24",
      "homeDate": "2026-05-03",
      "story": [
        "小曙是在鳳山被誘捕到的小小孩。那麼小的孩子，身邊又沒有貓媽媽，原本要被原放，所幸被好心人中途攔截救援，找到日日暖暖協助安置。來的時候大約一個多月、剛斷奶，吃喝都正常，驅蟲檢查也做了，整理過後充滿活力。",
        "剛入住時，她超小的 V 臉窩在砂盆邊，志工們笑說很像在遛達的小老鼠，於是為她起名「小曙」，同諧音讀音ㄕㄨˇ——預表著原本可能流浪的她，意外被發現、被救援安置，如同生命重見曙光。當初那位救援人從停下腳步救助、直到送養的期間，也一直關心著她。",
        "暖編還另外稱她「光速小妞」。平常很不容易捕捉到她的日常身影，常常一秒就飛出鏡頭外；志工為了找她找到心急如焚，回頭又發現她早就靜悄悄地偷溜出來吃乾乾，或是躲在其他大貓身旁——都不知道她什麼時候把貓窩探得這麼熟門熟路。",
        "現在的認養家人跟小曙一樣年紀輕輕。剛開始貓窩有諸多考慮，求學、就業、未來規劃總是變數很多；但懂事的他們理解這份擔憂，多花了不少時間與貓窩認識了解，還常撥空從外縣市大老遠騎車來貓窩陪小曙、跟她熟悉。看過這些互動細節之後，貓窩決定放心讓小曙跟著這對有為青年回家。"
      ],
      "photos": ["adopted/shu-1.jpg", "adopted/shu-3.jpg", "adopted/shu-2.jpg"],
      "photoCaptions": ["", "", "送養日，跟新家人一起回家"],
      "sources": [
        { "label": "新入住（官方 IG）", "url": "https://www.instagram.com/p/DQKIcH7kq8j/" },
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DX4eTCvksr2/" }
      ],
      "confirmed": ""
    },
    {
      "id": "huihui",
      "name": "灰灰",
      "status": "home",
      "homeDate": "2026-03-24",
      "story": [
        "灰灰因為受傷生病被救援到貓窩，前前後後住了十三個月。生澀的牠依然乖乖接受餵藥治療，有時候緊張到揮右拳；不到半年就恢復良好、拆下頭套，也開始放風跟其他貓室友一起玩。",
        "在暖男里長貓「獨眼」的帶動下，灰灰越來越親人。突然有一天，牠竟然主動來排隊討摸，開始會在人類腳邊兜圈——志工們又驚又喜，牠就這樣順利（自動？）加入了親善迎賓團。",
        "灰白毛色的分佈少見得像高級精品配色，炯炯雙眼、身長腿長、翹臀短尾，原本就不太像流浪貓的牠，恢復健康後更難掩那股翹臀美男子的光芒。性格脾氣以及吃喝拉也都很讓人放心——雖然偶爾也會被抓包頑皮去偷打女貓。",
        "牠的轉變意外地快。這次是貓窩原本的認養家人再次認養，之前他們帶回了大橘貓孩 HAPPY 黑鼻，這次帶回灰灰，讓兩隻繼續稱兄道弟。謝謝他們看見日暖大貓孩們的好。"
      ],
      "photos": ["adopted/huihui-1.jpg", "adopted/huihui-2.jpg"],
      "photoCaptions": ["", "送養日，跟新家人一起回家"],
      "sources": [
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DWQRZRgEdg_/" }
      ],
      "confirmed": ""
    },
    {
      "id": "lanlan",
      "name": "嵐嵐",
      "status": "home",
      "homeDate": "2026-03-22",
      "story": [
        "嵐嵐是約莫半年前在台中屯區某大學周邊拾獲的小貓。小巧的她喜歡窩在角落觀察情勢，會特地找美美貓姐姐或小玲貓姐姐當防護；後來熟悉了房間，就在裡面自由奔跑，但從不追趕其他貓同伴，自己開心玩這樣。偶爾也會攀上門、或凳上桌子看著房外的大家，似乎在偷學其他貓同伴的各種招數。",
        "嵐嵐也喜歡趴在志工身上，當起稱職的有聲呼嚕暖暖包——小小一隻，呼嚕聲可是氣很足呢。用餐時很有自己的想法，常吃個幾口就又開始四處跑，非得來回吃個好幾次，把吃飼料當串場活動。",
        "她是貓窩大家的掌上明珠，每天都要被每個志工抱到才行，實在是討喜又令人感到幸福的孩子。祝福嵐嵐平安快樂長大，像她的名字一樣，始終是輕柔舒爽的山嵐——接下來這份日常中的幸福感，就要讓給新家人去體驗了。"
      ],
      "photos": ["adopted/lanlan-1.jpg", "adopted/lanlan-2.jpg", "adopted/lanlan-3.jpg"],
      "sources": [
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DWNWTI2lPjY/" }
      ],
      "confirmed": ""
    },
    {
      "id": "koria",
      "name": "可麗亞",
      "status": "home",
      "homeDate": "2026-02-16",
      "story": [
        "伶俐小精靈可麗亞，終於等到守護她的家人了——還在舊曆年到新家領了紅包過年。當初她是嗅到愛媽食物袋就自動出現的兩個月大小小孩，被隔離住在小房間的時間特別長，直到捱過、戰勝了體內的病毒，才出來和貓室友們交朋友。",
        "她親人也親貓（但抱不住），尤其喜歡看志工洗碗，常常一副準備把流理台當泳池的樣子。她不怕水，會主動去喝水、還玩冰塊，而且總是保持自身的乾淨和規矩。",
        "在多人詢問之後，可麗亞等到了氣質相近、從互動細節就看得出打從心底尊重貓咪的媽媽。可以放心交出去了，一起祝福她嶄新的家貓生活。"
      ],
      "photos": ["adopted/koria-1.jpg", "adopted/koria-2.jpg", "adopted/koria-3.jpg"],
      "photoCaptions": ["", "", "送養日，跟新家人一起回家"],
      "sources": [
        { "label": "送養日（官方 IG）", "url": "https://www.instagram.com/p/DU19ahgEuhs/" }
      ],
      "confirmed": ""
    },
    {
      "id": "nuanguo",
      "name": "暖果",
      "status": "home",
      "inDate": "2025-06-20",
      "homeDate": "2025-09-06",
      "story": [
        "暖果是「暖暖包一家」的孩子之一。這一家是在鐵皮屋被發現的，當時小貓們還在喝奶，因為開始會蹦蹦跳跳跑出來玩，才被注意到；貓媽媽自己也還很小，是位超小媽咪。安置到志工家後，大家為溫柔的媽媽取名「暖暖」，小貓們也就跟著「冠母姓」，成了暖暖一家。",
        "在代養志工的細心照顧下，四隻小橘裡最橘的暖果，被新家人一眼相中。牠親近人的適應力很快、活動力也很好；剛到新家時，為了不讓牠太緊張，暖暖媽媽還特地過去陪了幾天。",
        "現在的暖果已經和家裡原本的貓姊姊相處得很好，也有了新名字「文財」，是全家人的心肝寶貝，尤其最受阿嬤疼愛。"
      ],
      "photos": ["adopted/nuanguo-1.jpg", "adopted/nuanguo-2.jpg", "adopted/nuanguo-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02kyGpWUQobp2uVz1TMV8LSD9aruhdy7ZPa1epAgtcUC3YjuKww3K2gghEJtPu131gl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "nuannuan",
      "name": "暖糖、暖陽、暖風、暖果",
      "status": "home",
      "homeDate": "",
      "story": [
        "暖暖一家是在鐵皮屋被發現的。那時小貓們都還在哺乳階段，因為開始會碰碰跳跳跑出來玩，才讓人注意到。貓媽媽本身也還很小，是位超小媽咪；當時這一家被要求在幾天內離開，在夥伴協助誘捕後，來到日日暖暖的志工家安置。",
        "剛安頓下來的牠們還很膽小，常常互相疊在一起才有安全感，但對人都很溫和。尤其是小媽媽，帶著孩子在外流浪、哺乳，仍然那麼溫柔，實在少見，於是大家為她取名「暖暖」，小貓們也順勢「冠母姓」，分別叫暖糖、暖陽、暖風、暖果。",
        "在志工家接受檢查、預防針和親人訓練之後，暖暖包一家的寶貝們在那年的七、八月也陸續等到家了，換到更好的生活空間，讓幸福加倍延續，真好 ❤️",
        "下一個延續日日暖暖幸福的故事，也許就從你開始。"
      ],
      "photos": ["adopted/nuannuan-1.jpg", "adopted/nuannuan-2.jpg", "adopted/nuannuan-3.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid029Egf5Uh2qsw46cdZKtdSSmkhDybCYCPZD3eihptm7wEEb64kNGuQTHj6cPtuBDd3l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；2026-11-23 瑞億更正：標題只放四隻寶貝暖糖、暖陽、暖風、暖果（媽媽暖暖不列），內文改用瑞億提供的文案；新入住貼文標註「於 7–8 月已送養」，找到家的確切日期不詳；找到家的日期不詳"
    },
    {
      "id": "happy",
      "name": "HAPPY 黑鼻",
      "status": "home",
      "homeDate": "2025-07-07",
      "story": [
        "HAPPY 是貓窩「暖男團」的一員，溫和好脾氣，好像任何事只要睡一覺就能過去。牠原本在外過著有一餐沒一餐的日子，愛媽餵食時，常看見牠緩緩走來、擔心害怕地找東西吃。後來發現牠身形非常乾扁、似乎還有口炎，於是先送醫檢查，再和原本放養牠的人家溝通後，來到日日暖暖安置。",
        "在外面時，大家依特徵叫牠「黑鼻」，到了貓窩便順著諧音取名 HAPPY，希望牠從此不再挨餓、感到安全，健康快樂。剛入住時，內向安靜的牠在各個角落躲了好久；直到有一天自己走出來蹭人、待在志工腳邊，那一刻大家都好開心。後來牠常喜歡坐在人的腳邊，貓窩到處都是牠的小床，總是睡到翻肚。",
        "HAPPY 的脾氣好到不可思議，從沒對人哈氣，也沒吼過貓室友；小貓把牠的尾巴當逗貓棒，牠也只是甩頭走開。這樣穩定的成貓很受喜愛，卻一直沒等到準備好照顧牠一輩子的人。最後，牠遇見了積極把環境準備周全的爸爸媽媽，到家後也主動回報生活細節——黑鼻 HAPPY，這次真的擁有了快樂。"
      ],
      "photos": ["adopted/happy-3.jpg", "adopted/happy-1.jpg", "adopted/happy-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0AfghUjBuqMa1s5iH3xbayfn9Tah8X9LZcroEaqrZGgAcK9WrWkWX2RGxDJp3PKT8l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "mengmeng",
      "name": "夢夢",
      "status": "home",
      "inDate": "2024-04-11",
      "homeDate": "2025-05-03",
      "story": [
        "夢夢和好朋友冰冰一起來到貓窩，兩隻都有很特別的外貌：冰冰戴著半面罩，夢夢則像戴著一整片黑紗臉罩，連窩著的時候都帶點婀娜，因此被稱為貓窩的性感寶貝。牠們原本生活在不友善的工廠環境，夢夢那時已經是位小媽咪，還曾把被丟出去的小貓一隻隻叼回來。",
        "從流浪、生病、生產到隔離，夢夢都經歷過；牠住過奶媽家、代養志工家，也出差過送養會，貓生相當奔波。但牠好像忘了自己曾經那麼辛苦，始終保持俏麗小媽咪的樣子，把孩子片片、年年照顧得很好，自己也依然很少女，常用甜甜的眼神要人陪、要人摸，有時還要志工在旁邊陪著才肯吃飯。",
        "夢夢和新家人的緣分來得出其不意。見面之前，家人透過與貓窩的溝通和生活紀錄一點一點認識牠，直到家訪、最後確認，終於歡喜地把夢夢帶回家。"
      ],
      "photos": ["adopted/mengmeng-3.jpg", "adopted/mengmeng-1.jpg", "adopted/mengmeng-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0Gsy9v6RJgtmYEDfvS88Vaakw8RRRii7n86Pf96fArhZcM1mSM4MZjhKkTsQyistil&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaodoujiang",
      "name": "小豆漿",
      "status": "home",
      "inDate": "2025-03-11",
      "homeDate": "2025-03-27",
      "story": [
        "小豆漿是一隻突然出現在街頭餵養區、豆漿店附近的小橘白貓。牠不定期出現了兩三次，找不到母貓的蹤影，店門前又人來人往；決定救援的那天，牠還正和客人的大狗對峙著，愛媽一步一步引牠轉向，才吃到為牠準備的晚餐。",
        "帶回檢查、驅蟲時，牠被稱讚是無敵天使貓，連洗澡都很穩定。才安置一晚，就開始打呼嚕、頂頭貼貼討抱；在貓窩見人就打招呼，大聲呼嚕討摸像一種儀式，看到志工摸別的室友，還會一再大聲提醒「不要忘了我」。",
        "幸運的小豆漿很快就遇到現在的爸爸媽媽。從言談和訊息中，都感受得到家人滿滿的期待與細心。"
      ],
      "photos": ["adopted/xiaodoujiang-1.jpg", "adopted/xiaodoujiang-2.jpg", "adopted/xiaodoujiang-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02CayB62N6QzjLfLWyWYdHte8BsBHkYTGgPscEp4s8rMJVcxZDu1DqsvYfLNXCKSH9l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "niannian",
      "name": "年年",
      "status": "home",
      "inDate": "2024-12-27",
      "homeDate": "2025-03-15",
      "story": [
        "年年是夢夢的孩子，和哥哥片片一起從奶媽家來到貓窩。牠適應力超強，帶回來才半天就露出調皮的本性，喜歡黏人、愛踢踢，從奶媽家到貓窩，一直都是好照顧又討喜的小皮蛋，每天都有自己的快樂舞台。",
        "確定認養後，熱力十足的媽媽雖然住得遠，仍積極透過照片和影片認識年年的個性與生活，還跟許多親友分享這位即將回家的新成員。接牠回家那天，年年第一次搭高鐵，等車時用興奮的叫聲代替緊張，接著就自己先累睡了——牠就是只要有人在，就能很快安心適應新環境的孩子。",
        "新家裡還有一位貓姊姊，將成為年年的枕頭和墊背。謝謝合作的餐廳協助推薦，讓年年遇到每天都充滿正能量的家庭。"
      ],
      "photos": ["adopted/niannian-2.jpg", "adopted/niannian-1.jpg", "adopted/niannian-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid037BeLMM8XVP1E2sXVRCx1kwMgTW8ceTtSqeFAFYxzvNVgQkzFsMjvj6ZmaNTv67iLl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "qlo",
      "name": "強運庫洛",
      "status": "home",
      "homeDate": "2025-03-11",
      "story": [
        "庫洛（QLO）是一隻被遺棄後救回安置的小黑貓，名副其實的強運寶貝——來到貓窩不到一個月，就遇見經人介紹來到日日暖暖的新家人。",
        "爸爸媽媽很用心、也很有效率地為牠準備好一切。現在的庫洛有一間舒適寬敞的大房間和細心鋪好的床，到新家兩天就適應良好，一早還會呼嚕，看來睡得很滿意。",
        "這個才四個月大的孩子，能在安全溫暖的家裡平安長大，是日日暖暖最開心、也最重要的事。"
      ],
      "photos": ["adopted/qlo-1.jpg", "adopted/qlo-2.jpg", "adopted/qlo-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02y8LKttyo9tfNFXoiNpr5u4v8rWc9cdWtXK7PBDGMD3cbP4cF5wdFXEFJq3SLHBTNl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "qiuqiu",
      "name": "球球",
      "status": "home",
      "homeDate": "2025-02-12",
      "story": [
        "大約兩年前的某一天，一隻疑似走失的貓咪跟著志工回來了，只好先暫時安置在貓窩，同時幫牠尋找原本的主人。一直沒有消息，而牠誰都不跟、就只跟著這位志工，志工夫妻覺得或許這就是緣分，決定等新居安定後收編牠，並為親人的牠取名「球球」。",
        "球球在貓窩一待就是將近兩年，從入住起就沒有任何適應問題，睡到翻肚翻白眼是日常。一開始還會迎賓，後來懶懶的牠自己換了工作：每次有物資送來，牠都熱心地上前驗收，於是自封為總務長；整理倉儲時，牠更把那裡當成秘境，總是很有策略地跟著鑽進去，有一次還被不知情的志工關在裡面一整個下午。",
        "志工夫妻為了尋找適合的住處、回到中部發展，花了不少時間克服生活上的難題，這段期間仍一起照顧貓窩的孩子們，也始終把球球放在心上。今年過年，球球淡定地搭著爸爸的車回到台中，到新家也毫無適應問題，從此在熱鬧的家庭裡幸福生活。"
      ],
      "photos": ["adopted/qiuqiu-2.jpg", "adopted/qiuqiu-3.jpg", "adopted/qiuqiu-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02ovjVWfLy9FGCAWMVPA2MMKoeWBPyiz3PZ8Awd8rnRm47Bwc3BfUZDacyMSutpoFvl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；由志工夫妻收編"
    },
    {
      "id": "daban",
      "name": "大斑",
      "status": "home",
      "homeDate": "2025-01-12",
      "story": [
        "大斑有一身天然時尚的灰可可色與白色紋路，剛好形成自帶雍容感的頸圍、充滿氣勢的「單肩包手」，再穿上一雙不對稱的白襪，因此被封為貓界的 Coco Chanel。牠不走甜膩路線，但偶爾也會用可愛的眼神示好，尤其看到肉泥點心時，還會露出謎之微笑。",
        "認養人到貓窩看了好幾次，最後選定了大斑。貓窩再次提醒：大斑很乖，但不是黏人的類型喔。認養媽媽輕鬆地說：「沒關係啊，就讓她自在。」這句話很風趣，卻也很打動人，因為她是真心接受這個孩子原本的樣子。",
        "大斑是 2025 年元月的第一則送養好消息。謝謝認養夥伴的介紹，讓大斑遇到願意愛牠的好家人；希望很快就能聽到大斑從人頭上偷偷出手的消息——那是牠願意與人更靠近一步的表示。"
      ],
      "photos": ["adopted/daban-2.jpg", "adopted/daban-3.jpg", "adopted/daban-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02LmvYuRhwtdFvSt6Ekke7MfBXh9JrY1qZFjP1bNip4H1sF37dRCwAp1SKWMHSkxTAl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "tiantian",
      "name": "甜甜",
      "status": "home",
      "homeDate": "2024-12-23",
      "story": [
        "甜甜斷奶後從奶媽家來到貓窩，耳朵大大的很招財，可摸可抱，也能自己滾貓砂玩得很開心；剛來那天，貓哥哥貓姊姊們都還去關心這位新來的小生物。奶媽說她從小就聰明伶俐、學得很快，跟人也很親近。",
        "在貓窩，甜甜是動靜皆宜的好同伴：跟小貓一起玩，也敢去找大貓挑戰，自己也能自得其樂。貓窩沒有一個角落她沒探索過，連平常不能進去的倉儲室，她都能趁志工進出時偷偷跟進去。玩累了，就跑到人身邊踏踏、呼嚕到睡著；胃口好不挑食，不怕水還愛喝水，心情好時還會配合拍幾張形象照。",
        "這個人氣寶貝終於在今年遇到爸爸。爸爸常在百忙中抽空來看她，等了好一段時間，終於在聖誕節前把甜甜接回家。相信為貓窩帶來溫暖與活力的甜甜，也會為爸爸的生活注入一股力量。"
      ],
      "photos": ["adopted/tiantian-2.jpg", "adopted/tiantian-3.jpg", "adopted/tiantian-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02XToNGXwdUcWERVYZ72oSLMkUyA3wvjUxmGvZo5QVzU6pvnSbzCLUKoU8idkZJqiZl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaokeai",
      "name": "小可愛",
      "status": "home",
      "homeDate": "2024-11-26",
      "story": [
        "小可愛是在年後突然出現在貓窩附近餵養區的成貓，憑著超強的親人本事，讓愛媽很好照顧。",
        "來到貓窩後，牠也適應得很好，很快就找到了永遠溫暖的家。成貓的穩定性很好，就像小可愛一樣，是暖心又保有美好距離的陪伴。"
      ],
      "photos": ["adopted/xiaokeai-2.jpg", "adopted/xiaokeai-3.jpg", "adopted/xiaokeai-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid07wf8ZU62V774mE3HYZyQmQdLwxUHrsa6SXZr46WPScvvMzbLgeyCFj614u7nqsaql&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "qiangqiang",
      "name": "強強",
      "status": "home",
      "inDate": "2024-04-22",
      "homeDate": "2024-11-22",
      "story": [
        "強強原本是一隻走失的貓，志工協助尋獲後，牠沒有再回到原本的家。既然是被我們找到，就當作跟日日暖暖有緣——親人又穩定的牠被帶回安置，取名「強強」，希望牠勇敢堅強、快樂地面對這個世界。",
        "大頭可愛的強強很懂人，很快就能和人拉近距離，喜歡跟人說話，偶爾也會耍點小聰明跟貓室友爭寵；貓友送來新玩具時，也是牠最先上前嘗鮮。",
        "強強遇到了命中注定的家人。爸爸媽媽有相當豐富的養貓經驗，小哥哥更是對牠愛護有加，相信強強的加入，會為這個家帶來更多快樂。"
      ],
      "photos": ["adopted/qiangqiang-1.jpg", "adopted/qiangqiang-2.jpg", "adopted/qiangqiang-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02ST5ngGUfztjp95v3pg6JEp2DVu2RBWJxKg6yRR8onLFjLyaqbmaNQtDdRyVLVcCWl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "brad",
      "name": "布萊德（多多）",
      "status": "home",
      "homeDate": "2024-09-17",
      "story": [
        "日日暖暖曾花將近一個月的時間，協助安置、照顧住在洗衣店樓上的貓咪家族。在多數孩子都還很怕生的時候，布萊德以天生像戴著耳機客服的出眾造型，加上圓潤俏皮的臉龐脫穎而出，成為這一家第一隻找到家的孩子。",
        "牠趕在中秋節前回到新家，也有了新名字「多多」。謝謝媽媽認養這個寶貝，期待新家人比我們更懂牠，讓牠的生活有個新的開始——就像牠的新名字一樣，從此擁有多而又多的愛。"
      ],
      "photos": ["adopted/brad-1.jpg", "adopted/brad-3.jpg", "adopted/brad-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02TA37EGWA8xJ6DrfCb8YQVMy1EL4BaKjxD5DupA8Z3DDTKL1Nux1u4dNa7MUrCktEl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "dongdong",
      "name": "動動",
      "status": "home",
      "inDate": "2024-05-14",
      "homeDate": "2024-08-31",
      "story": [
        "動動是在志工平常經過的區域被發現的，一個小小的頭在牆角邊東張西望，隔天清晨還早早出來覓食，就這樣被順利誘捕了。剛來時牠很焦慮激動，在籠子裡來來回回「動次動次」，鼻子都撞得紅通通，於是大家叫牠「動動」。",
        "第三天起，動動就開始給摸給抱了，只是要先給牠一首歌的時間放電。隔離一陣子後放風，牠特別喜歡找貓哥哥貓姊姊玩，常興奮地飛撲大貓；也很享受跟人互動，一被抱起來就呼嚕回應，常被志工當成肩膀上的小物捧著。",
        "在貓窩住了三個月，動動遇到一眼就認定牠的爸爸。家訪後，爸爸挑了不用加班的日子火速來接，一開門就是滿臉期待，很像去幼兒園接孩子的心情。到了新家的動動果然立刻「動」起來四處探索，也讓爸爸很快體驗到呼嚕小屁孩的魅力。"
      ],
      "photos": ["adopted/dongdong-2.jpg", "adopted/dongdong-3.jpg", "adopted/dongdong-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02w6AjhcMef9imkFhD7hJJBSzXwE9TcFHiivPUpTX1ZiojDYjDpLJuKbXLeo59iGKGl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "taotao",
      "name": "桃桃",
      "status": "home",
      "inDate": "2024-04-14",
      "homeDate": "2024-05-05",
      "story": [
        "在餵食街貓的路上，路燈照著路邊的停車格，隱約看見車底下有個小小的影子。這裡車流量大，觀察時小貓還衝出來，差點被機車撞上。花了整晚等待、幾次差點讓牠溜掉，最後在打開引擎蓋的那一刻才把牠撈出來，於是取名「桃桃」——差點逃掉的淘氣小孩。",
        "三個月大的桃桃，就醫檢查和安置的過程都很乖，是個親人的小可愛。小巧又呆萌，一舉一動都討喜，很愛討抱，自己也能玩得很起勁，玩到滾進盆子裡。",
        "來到貓窩大約兩週，桃桃就被認養了。新家人確定後，以飛快的速度準備好居家環境，非常謝謝認養人讓日日暖暖最小的寶貝有了安心的託付，我們期待和認養夥伴一起看著她快樂長大。"
      ],
      "photos": ["adopted/taotao-2.jpg", "adopted/taotao-3.jpg", "adopted/taotao-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02RJ2aCbRx8xEYztsbeZdDknWFh3t3gfLVLqfbwVr76FU9YWvpTGvBy4ju2iNcaExil&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "mimi2024",
      "name": "蜜蜜",
      "status": "home",
      "inDate": "2023-11-28",
      "homeDate": "2024-03-24",
      "story": [
        "蜜蜜是志工撿到的、疑似走失的小幼貓，大約兩個月大時來到貓窩。因為長得很像蜜袋鼯，又剛好是女孩，就取名「蜜蜜」，看著看著真的有種甜蜜的感覺。",
        "在貓窩不到半年，蜜蜜跟著貓哥哥貓姊姊一起長大，從爬不上籠子，到可以從這一籠跳到那一籠；她參加過送養會，也是貓窩迎賓團的一員。外型討喜、親人好照顧，領悟力和學習力都很強。",
        "蜜蜜的爸爸媽媽確定認養後，在整理住家環境的那段期間，只要工作有空檔就來貓窩看她，提前建立關係，好讓蜜蜜回家時至少對他們感到熟悉。終於等到接她回家的日子，貓窩的大家和爸爸媽媽一起期待，這位小美女慢慢長成大美女。"
      ],
      "photos": ["adopted/mimi2024-2.jpg", "adopted/mimi2024-3.jpg", "adopted/mimi2024-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L2Zsvy5RL8ZVK2usFXhye7Ca6LmzL5Kq1X3BWjW9h6G6h1QTGrq54Gc2rJrjUtzyl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "yanmai",
      "name": "燕麥、小麥",
      "status": "home",
      "homeDate": "2024-02-14",
      "story": [
        "燕麥和小麥是「金色三麥」中的兩姊妹，三隻同胎小貓在小年夜一起住進貓窩過年，漂亮的棕色紋路和小巧的模樣，一入住就在志工群裡引起轟動。",
        "弟弟蕎麥先到新家後，緊接著燕麥和小麥也在情人節當天一起回家，讓認養媽媽多了兩位小情人。一動一靜的兩姊妹能在同一個家庭一起長大，真的是很棒的事。",
        "謝謝認養人接下日日暖暖的託付，一起愛護她們，看著她們從小女娃長成小美人。"
      ],
      "photos": ["adopted/yanmai-3.jpg", "adopted/yanmai-1.jpg", "adopted/yanmai-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0r2wWLfnwRPBma69RC31KqJczzMtXBb63LXeATtNSKRzG8f6wpAPAkFNFQUxxp6BYl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；金色三麥，兩姊妹一起到新家"
    },
    {
      "id": "qiaomai",
      "name": "蕎麥",
      "status": "home",
      "homeDate": "2024-02-13",
      "story": [
        "蕎麥是「金色三麥」裡唯一的男生，和燕麥、小麥兩姊妹在小年夜一起住進貓窩過年。",
        "認養他的是日日暖暖原本的認養家庭夥伴，彼此的條件都早已熟悉，所以這位小弟弟在一週內就完成了醫院檢查、回到貓窩、再到新家的行程。",
        "蕎麥是日日暖暖交給這個家庭的第三隻寶貝。他們總是妥善用心地照顧、陪伴，耐心等待每個孩子一點一滴的改變與成長，真的非常、非常謝謝他們的信任。"
      ],
      "photos": ["adopted/qiaomai-c.jpg", "adopted/qiaomai-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02yK36qzaoyY1teLnXHHCdhWo4qKnQBkSmDiZXJetJjJoxnGWBFMKe2FvvsPD6yVdYl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；金色三麥"
    },
    {
      "id": "xinxiaoxiaoju",
      "name": "新小小橘",
      "status": "home",
      "homeDate": "",
      "story": [
        "新小小橘是一隻有著閃電尾巴的小橘貓，來到日日暖暖後，直接到合作的寵物餐廳駐點，讓客人一邊用餐、一邊認識牠。",
        "很快地，新小小橘就找到了家，邁向屬於牠的幸福之路。"
      ],
      "photos": ["adopted/xinxiaoxiaoju-1.jpg", "adopted/xinxiaoxiaoju-2.jpg", "adopted/xinxiaoxiaoju-3.jpg"],
      "sources": [],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；找到家的日期不詳（貼文只寫「更新，已找到家」）；找到家的日期不詳；原貼文連結沒抓到，可用貓名在粉專搜尋"
    },
    {
      "id": "lucky",
      "hide": true,            // 還沒有照片，先不上架（2026-11-20）
      "name": "Lucky",
      "status": "home",
      "inDate": "2023-12-04",
      "homeDate": "2023-12-09",
      "story": [
        "Lucky 是在人車鼎沸的路口被救援的孩子，那是連行人每天走過都覺得危險的區域。意外讓牠受到很大的驚嚇，所幸順利救援安置；除了右眼有點霧化，看起來反而是很有立體感的藍眼睛，其他都很健康，還有點肉肉的，於是取名 Lucky，希望牠也成為大家的小幸運。",
        "性情穩定的 Lucky 在日日暖暖只短暫停留。一家友善寵物美容店的老闆娘點名要帶牠回去，之後牠就是店貓了。出發那天早上，志工一邊稱讚牠、恭喜牠，牠也像在回應似的，可以毫無防備地讓人摸摸，好像也很開心。",
        "吃完早餐，Lucky 就出發去新家，一路上都很乖巧安定。Lucky 為自己帶來了幸運，未來也一定會為這家友善的店帶來更多愛與幸運。"
      ],
      "photos": [],
      "sources": [],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；原貼文連結沒抓到，可用貓名在粉專搜尋"
    },
    {
      "id": "heibao",
      "name": "黑寶",
      "status": "home",
      "inDate": "2023-08-20",
      "homeDate": "2023-11-26",
      "story": [
        "黑寶是賓士貓一家五口裡的小黑貓，和貓爸爸一樣個性溫馴。剛來貓窩時，牠沒有對志工或貓室友哈氣，只是緊張地躲在大貓身後；在外流浪時，也是由粉紅鼻的賓士成貓像哥哥一樣護著圓圓大眼的牠。",
        "比較適應之後，黑寶開始放籠出來玩，唯一讓志工擔心的是，全黑的牠總會躲到隱密處睡覺，非常難找。好在牠很快就和大貓們處得融洽，也成為小小迎賓貓之一，膽子大了，就在志工看得到的地方睡覺。剪指甲、擦臉、餵藥這些貓咪不喜歡的事，牠雖然緊張，也都乖乖配合，還能被抱著很久，是讓人融化的極品貓。",
        "在 11 月的送養會上，黑寶等到了想疼愛牠一輩子的家人。聽說全家人，尤其是爸爸，都對牠心心念念，很想趕快接回家；家裡還有位貓哥哥作伴。黑寶的新名字叫「墨墨」，接下來得到的疼愛，一定會加倍再加倍。"
      ],
      "photos": ["adopted/heibao-2.jpg", "adopted/heibao-1.jpg", "adopted/heibao-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0vTUWYjfYAG8b8DSUy4pmC7xc55UuSW6dErJckCTL976AybXQ6Y7XmXdjukFNo7jxl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "jikuai",
      "name": "雞塊弟",
      "status": "home",
      "homeDate": "2023-10-15",
      "story": [
        "雞塊弟非常聰明，也很幸運地從黏鼠板上逃脫，接著就像命中注定一樣，跟著志工來到貓窩。檢查後所幸沒有嚴重的傷害。",
        "好玩又好摸的雞塊很快就和大家熱情地當起朋友，雖然偶爾會搗蛋、玩得太瘋，但跟人互動很好，是會聽話的孩子，所以很快就加入了迎賓貓團隊。某天牠配合志工玩了一下造型拍照，當晚就被預定認養，迎賓訓練才剛開始不久，就算牠表現優異、提早結業了。",
        "相信有雞塊加入的家庭，會得到很多有趣的陪伴。家裡還有一位貓姊姊，希望牠們很快就成為彼此的玩伴。"
      ],
      "photos": ["adopted/jikuai-2.jpg", "adopted/jikuai-3.jpg", "adopted/jikuai-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02ibLk2WBT562zum2j5zP2we6HDkUhkN6MrLhLVVo7kvtGckw7q9iuVRiv127aryDdl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "guagua",
      "name": "小呱呱",
      "status": "home",
      "homeDate": "2023-09-01",
      "story": [
        "七、八月的貓窩，常接到臨時通報、協助救援，小橘貓呱呱就是其中之一。那是颱風天，志工遇到平時餵牠飼料的愛心店員，才知道之前尋求過其他救援管道都沒有下文，只好先在原地半餵養照顧著。知道有中途能來協助，店員非常高興，也超給力地一起幫忙，附近一家友善的麵包店還願意讓牠暫住一晚。",
        "隔天由日日暖暖帶去醫院檢查，最後，由當晚一起協助的店員收編。從救援那天起，她就積極和家人商量，確定可以認養後，又在下班後積極準備環境和用品，每天關心牠的情況，還給了牠可愛的名字「呱呱」。",
        "呱呱是風雨中的幸運小貓，在很短的時間內被救援，也有了新家。願我們都像呱呱的認養人一樣，珍惜並擁有與貓咪突然相遇的緣分。"
      ],
      "photos": ["adopted/guagua-2.jpg", "adopted/guagua-3.jpg", "adopted/guagua-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid024v3hYMaGEZWhuN48w5gSNqkoW2Ub4gwnJdnaWdddPqmhM8xrWaQ1j9eE5uUu4EeZl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "chengcheng",
      "name": "橙橙",
      "status": "home",
      "homeDate": "2023-06-16",
      "story": [
        "橙橙是貓窩志工就地餵養的孩子，從街頭帶回後，就直接到合作的寵物餐廳安置、等待送養。牠小時候和同胎兄弟一起被發現時，已經找不到貓媽媽；後來兄弟在過馬路時沒能躲過機車，先去了天堂，橙橙在原地坐了好幾天，之後才獨自在附近繞來繞去，直到遇上新的愛媽。這樣的經歷讓牠性格非常敏感，卻也讓人感受到牠的陪伴格外體貼。",
        "橙橙親人也親貓、伶俐溫和，胃口很好，貓室友經過時，牠總會伸手出去，像在打招呼想一起玩。受歡迎的橘貓詢問度很高，但可能因為已經是大孩子，一直沒遇到有緣人。直到一位小姊姊在餐廳注意到牠，去了幾次看到牠還在等家，便趕緊約家人一起來認識。這次，橙橙難得沒有躲開陌生人；媽媽也關心家裡從小帶大的原貓會有什麼感受、該怎麼照應，這份用心讓我們很放心。",
        "家人特地選在小姊姊剛放暑假時，來完成最重要的大事——帶橙橙回家，還給了牠新名字「蘇打」，家裡還有哥哥和兩位貓同伴一起期待著。敏感又聰明的橙橙知道自己要被帶走，還一直在抓板上耍賴不肯出來。非常謝謝這個家庭接力我們對橙橙的愛，繼續、而且加倍地愛牠。"
      ],
      "photos": ["adopted/chengcheng-2.jpg", "adopted/chengcheng-3.jpg", "adopted/chengcheng-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0UrmGkhgapJ4aMpMVDDmcZAY9XRSkm2AuJ9vGM4NwuaGSSm984LfrHh4ZnawXVe2gl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "caihong",
      "name": "彩虹、小神童",
      "status": "home",
      "homeDate": "2023-06-04",
      "story": [
        "彩虹是一位被救援的孕貓，好美的三花俏媽咪，剛入住時最大的休閒是啃紙箱邊邊，比吃正餐還積極。她在貓窩生下寶寶後，就到奶媽家去坐月子。",
        "彩虹的孩子裡，有一隻白底虎斑有著可愛的後腦勺和超可愛的髮流，而且很聰明，很早就學會用貓砂、吃罐頭，被大家稱為「小神童」。由日日暖暖引介認養的一家人雖然沒有養貓經驗，卻在家訪後只用了三天半就完成所有環境強化；全家總動員準備迎接新成員，兩位小哥哥早已取好名字「小饅頭」，還做筆記、用 App 查哪些植物要避免、哪些東西要小心。",
        "在小饅頭回家的這一天，彩虹媽咪和她的四個寶貝全數送養完成。很開心這些孩子都能在有愛的家庭中長大。"
      ],
      "photos": ["adopted/caihong-2.jpg", "adopted/caihong-3.jpg", "adopted/caihong-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0331R5rbVJXWndgJGJzkfibrbmtrZ3YXcCqTWTgFriyCUHrkGJowyUQXMUWwBGJ54el&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；彩虹媽咪跟四個寶貝同一天全數送養完成；小神童的新家人取名「小饅頭」，另外三隻寶貝貼文沒寫名字"
    },
    {
      "id": "dapang",
      "name": "大胖",
      "status": "home",
      "homeDate": "2023-05-07",
      "story": [
        "大胖是從三民區救援的橘色成貓，天然呆萌。牠先在寄養家庭住過一段時間，但和原本的貓相處不來，性情好的大胖也常被嚇得炸毛，於是來到貓窩，另外為牠找個家。",
        "因為流浪過、也曾被欺負過，大胖很怕生、會哈氣，慢熱的時候還會露出呆滯的表情，但溫馴討喜的本性還是不時展現。開始放風後，牠喜歡在房間裡爬高，所有籠頂都是牠的遊樂場，肉肉的大孩子也跑得很快活。",
        "這個還在慢慢學習再次信任人類的寶貝，終於在四月等到願意用愛陪伴牠的家人，有了一個 Happy Ending。"
      ],
      "photos": ["adopted/dapang-1.jpg", "adopted/dapang-2.jpg", "adopted/dapang-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid037hZuEsvms2cmKbqNniV9oUgZsF1dAG1fE14WfUefVckbEHwr8JJatu6et9gXboudl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "fenyuan",
      "name": "粉圓",
      "status": "home",
      "homeDate": "2023-04-02",
      "story": [
        "粉圓被救援時已經懷孕。為了保全牠和肚子裡的小生命，志工費了不少功夫，才把防禦心極強的牠帶回安置。牠前後在貓窩順利生下兩胎，孩子們都和媽媽一樣有著讓人忍不住多看幾眼的美貌，也都在小貓階段就順利等到有緣人。",
        "粉圓雖然不親人，但很親貓，或許是媽媽的天性，對新來的小貓特別友善。在貓窩安全的環境裡，牠也一天天進步，會讓熟悉的志工偷摸圓圓的屁股幾下，也會喵喵叫提醒大家該開飯了。",
        "更棒的是，認養牠好朋友雞蛋的家人，為了不讓雞蛋孤單，也樂意把粉圓一起帶回家，還有一位遠端就對粉圓一見鍾情的乾媽跟著期待。爸爸媽媽行動力十足，很快就把一切準備好。街貓為了生存必須非常警戒，即使不像萌寵那樣親暱，牠們同樣是值得被愛的生命。"
      ],
      "photos": ["adopted/fenyuan-2.jpg", "adopted/fenyuan-3.jpg", "adopted/fenyuan-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0aBAzMoR2h7fawsvvhJ7rR2MEfWpTXJfFV41NHWreT3g5kBXbKJh9GFrVtBFYsWsRl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；跟好朋友雞蛋一起生活"
    },
    {
      "id": "jidan",
      "name": "雞蛋",
      "status": "home",
      "homeDate": "2023-03-24",
      "story": [
        "雞蛋是第一批入住貓窩的元老級貓孩之一，在貓窩待了兩年。她本性溫和，有感情緊密的貓姐妹淘，但和人類始終保持著距離的美感；多數志工都和她互動了一年，才稍微拉近距離，能聊聊天、拍拍照。",
        "顏值擔當的橘貓雞蛋，從小雞蛋長成大雞蛋，兩年來不乏有人青睞詢問，卻因為極為怕生，送養的機會越來越渺茫。這次有家人預約來看她，她還是溜去躲起來；沒想到幾十天後，貓窩收到了要認養雞蛋的訊息。我們再三說明、確認，妹妹很肯定地回覆：「他們願意花時間跟雞蛋培養感情。」",
        "之後很快就約好家訪、準備接貓，弟弟妹妹還不斷謝謝貓窩把雞蛋照顧得那麼好。謝謝他們願意愛雞蛋原本的樣子，這樣互信的關係是貓窩很珍惜的。希望雞蛋因為這麼可愛懂事的家人，慢慢重拾對人類的信任與愛。"
      ],
      "photos": ["adopted/jidan-2.jpg", "adopted/jidan-3.jpg", "adopted/jidan-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0o5NXPWk6nhNGV3campCvr631o2QoFtitZwfyU8VYaqWr4PQDCTGo1g7vMUci8g8ul&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "jinbao-ju",
      "name": "金寶",
      "status": "home",
      "homeDate": "2023-03-04",
      "story": [
        "金寶是那一年人氣最旺的「橘三寶」的大哥。三寶裡較文靜的牠，平時很保護元寶妹妹，常和她窩在一起；吃飯時如果弟弟妹妹先把頭卡進碗裡，金寶都會讓牠們先吃，是少見不爭不搶的好哥哥。",
        "要帶回家那天，金寶大概知道要和妹妹分開了，第一次見牠氣噗噗的，比平常還難抱出籠。好在爸爸媽媽很有耐心地等牠，鬧了點小脾氣後，牠終究敵不過逗貓棒和小鈴鐺，第一次搭火車，順利回到台南的新家。",
        "橘三寶陸續各奔幸福，貓窩的志工們都好為金寶開心——不爭寵的牠，默默的可愛終於被看見了。"
      ],
      "photos": ["adopted/jinbao-ju-2.jpg", "adopted/jinbao-ju-3.jpg", "adopted/jinbao-ju-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid08pfCL7Yn311s98H6nEHvPkuc5QiDhUK1aPYFunH2QNEvBTTLjLFckLaucw5NVyx9l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；橘三寶的大哥"
    },
    {
      "id": "hanji",
      "name": "憨吉",
      "status": "home",
      "homeDate": "2023-03-04",
      "story": [
        "憨吉差一點就被丟到廢棄工廠，幸好被愛爸搶救回來。那時牠大約才兩、三個月大，完全不怕生，很愛找人、找貓說話。",
        "志工們都希望這麼討喜的孩子，能趁小盡快遇到好家庭，一直保持對人的友善與信任。就像牠的名字一樣，憨吉真的憨憨的，卻充滿吉利好運——來貓窩還不到一個月，就有了新家人。",
        "爸爸媽媽來帶憨吉時那份喜悅、期待牠成為家中一份子的神情，也深深感染了我們。憨吉的新家在林園，好大一間，真讓人羨慕。"
      ],
      "photos": ["adopted/hanji-2.jpg", "adopted/hanji-3.jpg", "adopted/hanji-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02HD5aSLbhim56wAcQtyLMCRBY5gbhxhL4AduLqQWLnXcjiknGCJigJa8r9BfLvQzrl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "shanshan",
      "name": "珊珊",
      "status": "home",
      "inDate": "2023-01-31",
      "homeDate": "2023-02-28",
      "story": [
        "珊珊是貓窩愛媽在餵養區照顧多年的女孩，當初為了辨識，只簡單叫她「三斑」。她和之前送出的斑斑是好姐妹，每晚九點半後，就會看到牠們在十字路口的紅綠燈柱旁坐得好好的，等愛媽送餐來；珊珊在街頭時就很親人，許多人常在路口駐足，陪她玩到不想離開。",
        "後來因為周邊環境要整治，無法讓牠們繼續在那裡生活，於是先把珊珊帶回貓窩安置。聰明的她知道自己住進了安全的地方，變得比以往更好動、更愛撒嬌，偶爾挑嘴的本性也沒變。",
        "有福氣的珊珊在貓窩待了快一個月，就找到了新家。認養的家人同時領養了珊珊和樂樂，在街頭時有好姐妹作伴，到了新家也有兄弟陪著她。"
      ],
      "photos": ["adopted/shanshan-1.jpg", "adopted/shanshan-3.jpg", "adopted/shanshan-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02PqwFSYHVJ3A3sQ5exYz1U5XLJSJHB4S1xSFLpuSnWYahjFCgSPLLpytcr9y7ezPXl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaoyouzi",
      "name": "小柚子",
      "status": "home",
      "homeDate": "2022-12-18",
      "story": [
        "愛媽在公園餵食時，聽見草叢裡有細細的喵喵聲，直覺又有小貓走失了。肚子餓的小柚子為了食物，就這樣被誘捕回來，先回到貓窩安置、等新家。",
        "小柚子正值適合親人訓練的年紀，稚嫩的牠很討人疼，非常乖巧不躁動，好照顧；剛開始吃副食就食量驚人，真的是會長大的孩子。放籠讓牠自由活動後，牠很喜歡和大貓窩在一起，也有樣學樣地跟著大貓翻箱倒櫃，很快就融入了貓圈。帶去市集時也不太抗拒人，詢問度因此更高。",
        "很慶幸接牠回家的是一位心智成熟的年輕夥伴，有行動力也準備得很周全。相信有小柚子一起陪伴成長，未來每一天都會更踏實幸福。"
      ],
      "photos": ["adopted/xiaoyouzi-c.jpg", "adopted/xiaoyouzi-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02uCQsyvr9eaqWVcXvFWNHN5e96FenLptZQnMG8rTS7m1AYGEuYW2QbJrQG14SYbzgl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "joy",
      "name": "Joy",
      "status": "home",
      "homeDate": "2022-11-26",
      "story": [
        "Joy 剛到貓窩時還不到五個月大，那時的她一臉憂鬱哀傷，所以取名 Joy，意思是「喜樂小女孩」。後來她真的太喜樂了，能吃又好動，從不挑食，哪裡有香味就往哪裡去，吃完自己的，還想去挖別隻貓的餐盤。",
        "她和幾個月前送出的小橘皮是好朋友，敢跟公貓們一起比賽玩逗貓棒、比跳台攀岩，比完的獎勵是梳毛和摸屁屁，這就是她維持好身材的秘訣。Joy 從憂鬱臉蛻變成可愛的卡通臉，舉手投足都是性感的小黑妞模樣；她其實很聰明、直覺很強，和志工熟了還會任性回嘴，每當有人想帶走她、特別注意她時，她好像早有預感，先溜得不見蹤影。",
        "終於，這次她和小哥哥有了緣分，被順利接回家。小哥哥把那一年雙十一的預算都投資在她身上，希望這個喜樂小女孩永遠健康快樂，成為家人的心頭好。"
      ],
      "photos": ["adopted/joy-1.jpg", "adopted/joy-2.jpg", "adopted/joy-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid029LULvz3zD5nbdjZFtMHrC8Y8CMZW6kZReCf1KFQDTLXz9fnBnCZS3f91UcAnS1F4l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaojupi",
      "name": "小橘皮",
      "status": "home",
      "homeDate": "2022-07-23",
      "story": [
        "小橘皮是從路邊的加水站探出頭來的，好小好小一隻，鮮明的橘黃色和細細又無力的喵喵聲，讓愛爸一眼就發現了牠。看得出餓了很久，於是被帶回貓窩。",
        "長相無害的小橘皮在貓窩的貓際關係很好，很少和其他貓不合。牠獨立不黏人，但很溫馴，從沒對人哈氣過，不喜歡被抱時也只是露出無奈的表情；很愛吃也很會吃。因為性格穩定，被志工們訓練成隨時能上鏡的專業貓模；只要逗貓棒一出現，就會以女子單貓的身份熱烈參賽，幾乎讓人忘了牠曾是加水站邊那隻無力的小貓。",
        "一位新來不久的志工姊姊，從見到牠起就心心念念要帶牠回家。這麼人見人愛的小橘皮，在貓窩住了一年，終於也去了新家。"
      ],
      "photos": ["adopted/xiaojupi-2.jpg", "adopted/xiaojupi-3.jpg", "adopted/xiaojupi-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02MufhvCRAw2db1AYzmFr9b4o6su4gP4FrEmm1sqZA7A7AQTy6XWWPJFPetkjMMXffl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "shasha2022",
      "name": "傻傻",
      "status": "home",
      "homeDate": "2022-07-04",
      "story": [
        "傻傻剛入住時就非常親人、不怕生，就算是第一次摸貓的新手，也能從牠身上得到滿滿的成就感和歡樂。牠很快成為稱職討喜的迎賓貓，萌萌又黏人，擄獲了不少人的心；新來的貓弟弟有點怕生時，牠也總是熱情地想去歡迎。",
        "傻傻其實一點也不傻，反而太聰明了。要去新家的前一晚，貓窩剛好動員大掃除，牠已經察覺事情不太對勁，連吃晚餐都比平常小心，也沒去串門子；隔天要抱牠時，還不肯給抱。",
        "好不容易順利到了新家，牠一開始仍躲著不現身。但我們對有著「狗靈魂」的傻傻很有信心，相信牠很快就會適應，恢復成繞著人兜圈討摸的樣子，成為家人的快樂，就像牠總讓來到貓窩的人感到喜樂那樣。"
      ],
      "photos": ["adopted/shasha2022-1.jpg", "adopted/shasha2022-2.jpg", "adopted/shasha2022-3.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0Y1UNBmMXyh3rjv1e5ouzNXKs93fVrY6UfGqPE7VtiQJsiLVt9biveus8QrZM12o1l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "wuhuaguo",
      "name": "無花果",
      "status": "home",
      "homeDate": "2022-05-14",
      "story": [
        "無花果從小跟著媽媽流浪。來到貓窩後，有很長一段時間，牠總是一溜煙地急速快閃，像在逃命一樣。",
        "開始關籠進行親人訓練後，看著牠一天天長大，甚至長得很肥，有時翻身都有點吃力。很愛亂咬、有點小調皮的牠，其實是個聰明受教的孩子，聽得懂志工的話，漸漸咬得不那麼用力，只是偷咬一下要人陪牠玩；也能好好地讓人修指甲、乖乖等開飯，享受被抱著的安穩。",
        "終於，無花果也等到了陪伴牠一輩子的家人，貓窩的大家都好開心——尤其是最常被牠抓傷的那位志工。"
      ],
      "photos": ["adopted/wuhuaguo-1.jpg", "adopted/wuhuaguo-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02FSe8oUJCkTyMp3aAqfWhExT9pTrEL9FWveeQJLq77NDkJnJUTAwX9tuDEt1HACAnl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "mimi-guifei",
      "name": "咪咪小貴妃",
      "status": "home",
      "homeDate": "2022-05-02",
      "story": [
        "咪咪是從果菜市場被抱回來的。剛入住時非常畏縮膽小，還因為太緊張，把自己弄得像剛刷完油漆一樣，志工整晚幫她擦身體，後來又帶去好好洗了個澡才完全處理乾淨，成了第一隻一入住就享有貴族服務的貓孩。",
        "有很長一段時間，看到她都是同一個姿勢，讓人擔心她會不會腳麻。後來她從動也不動，到開始四處悠閒地逛逛；某天突然主動輕輕偷打志工一下，接著在有人的時候，也能忘我地側躺翻肚睡覺，甚至開始耍點小性子，偶爾兇一下其他調皮的小貓。",
        "就在她最肥美的時期，被爸爸一見鍾情，也讓原本猶豫的媽媽終於下定決心。從這天起，咪咪有了永遠陪伴她的家人，是名副其實的小貴妃了。"
      ],
      "photos": ["adopted/mimi-guifei-c.jpg", "adopted/mimi-guifei-1.jpg", "adopted/mimi-guifei-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0C71gZN3xBR98hr7utUiaztFjGwg6KTtWZ9xSn8UfFagUM9HFGGuDFvxLhyLtr8otl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaoxiannv",
      "name": "小仙女",
      "status": "home",
      "homeDate": "2022-04-10",
      "story": [
        "小仙女是日日暖暖入住編號 1 號的貓，驚豔群芳、高不可攀，一直是貓窩裡最難親近的那一位。",
        "認養她的是一家寵物沙龍。當初我們一再和爸爸媽媽確認，甚至「告誡」他們：這個寶貝真的很不親人，要很有耐心喔。經過詳細的討論，他們仍然毫無疑慮。得知這個消息的那一刻，全貓窩的志工都高興極了，這是那年四月貓窩最令人尖叫的好消息。",
        "沙龍說，小仙女是他們認養的第一隻隱藏版店貓，不是來顧店的，是來當仙女的。我們對小仙女很有信心，她絕對是貓界最美的店貓。"
      ],
      "photos": ["adopted/xiaoxiannv-3.jpg", "adopted/xiaoxiannv-1.jpg", "adopted/xiaoxiannv-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02i5JqkmdRmcppoB4nNKGFaVFVLWaszjzeF66VjBhiQ4mhFBNU9WLk1nbAoABdP8mzl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；日日暖暖入住編號 1 號"
    },
    {
      "id": "maodou",
      "name": "毛豆",
      "status": "home",
      "homeDate": "2022-03-20",
      "story": [
        "毛豆是個令人愛不釋手的撒嬌寶貝，喜歡看水流動，也喜歡跟前跟後地「幫忙」整理。",
        "認養牠的家人是養貓新手，來貓窩和牠互動了幾次後，帶著忐忑又期待的心情把牠抱回家試住。毛豆在新家適應得很好，第二天就能無憂無慮地睡在小姊姊身旁。",
        "渾身散發幸福感的毛豆，也就這樣幸福地定居下來了。"
      ],
      "photos": [
        "adopted/maodou-1.jpg",
        "adopted/maodou-2.jpg",
        "adopted/maodou-3.jpg"
      ],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02UNofHba7iofZjQLf1Fs4PDPRDwgnU5EgHLyyDpRasKSkGpBnttgbjDkoaTYMSmDsl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "pibao",
      "name": "皮寶",
      "status": "home",
      "homeDate": "2022-02-22",
      "story": [
        "皮寶的適應力很好，性情安定又好親近，不論是住在志工家，或是搬回貓窩，都只要一兩天就能吃好、睡好、上廁所也順利，是少數可以讓志工抱著玩很久的寶貝。",
        "牠還沒完全養成迎賓貓，就先被認養了。家訪後的當天晚上，新家人就通知已經準備好牠的小窩，效率快到大家還來不及幫皮寶做心理建設，只能一直恭喜牠要去住新家了。",
        "相信這次就是皮寶一直到老的家。謝謝家人，聽說還有阿公，跟我們一起愛牠。"
      ],
      "photos": ["adopted/pibao-c.jpg", "adopted/pibao-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02WaUJMHDZ9S7B6HM2LrLDQZy7orAdJFN1VtfnYHCBErjk7gG2WBbpg48PuWfCHvKXl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaoheidou",
      "name": "小黑豆",
      "status": "home",
      "homeDate": "2022-02-15",
      "story": [
        "小黑豆是在貓窩出生的小小屁孩。",
        "一個有豐富養貓經驗的家庭，在粉專上對這隻小可愛一見鍾情，和我們聯繫、更深入認識後，就很快地安排配合。那時小黑豆剛好去做結紮手術，家人常常關心她什麼時候可以出院；她一回到貓窩，還來不及跟大家說完再見，家人就喜孜孜地來「迎娶」了。",
        "之後問候這個寶貝，媽咪說她已經在小哥哥腳邊睡翻了，到新家完全沒有適應上的問題。謝謝這家人那麼熱情的愛。"
      ],
      "photos": ["adopted/xiaoheidou-3.jpg", "adopted/xiaoheidou-1.jpg", "adopted/xiaoheidou-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02z4B5cp4gqgjdg5JVxHz9xqkuWM6sfWtxYS9Rwc6Ka7ZprbkpRuaXxmF9czwzimcJl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "kuluo",
      "name": "酷羅",
      "status": "home",
      "homeDate": "2022-02-15",
      "story": [
        "酷羅是貓窩的「憨哥」，幾度遷徙，終於找到了歸宿。因為先天體質的關係，牠的行為反應都很淡定緩慢，總是傻傻憨憨的，從來沒有傷害過人或貓，在貓界也是很難和別人起爭執的和事貓。",
        "認養的家人很用心，願意先把牠帶回去試照顧幾天，看看能不能和家裡原本的貓相處。討喜的酷羅很快就被原家貓弟弟接納，自己也對三層樓的房子很滿意，就這樣住下來了。",
        "好開心有這份緣分，謝謝認養夥伴和我們一起愛牠。"
      ],
      "photos": ["adopted/kuluo-2.jpg", "adopted/kuluo-1.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K74APeWv26ocX3DpmBnXrvtbbtSh262nHKdoZRvtHLYWP4ggaUTJzR7WEytzjnV3l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "yongge",
      "name": "勇哥、小戴",
      "status": "home",
      "homeDate": "2021-12-18",
      "story": [
        "勇哥是個肥肥的小頑童，剛來貓窩時就很討喜，玩著玩著也變得調皮起來。我們原本還有點擔心，少了腳爪又這麼皮的牠，會不會不容易找到家。",
        "小戴則極度親人、好照顧，每天自己踏踏當作健身。",
        "一位貓孩新手媽咪長期關注、來互動了幾次之後，發現了勇哥有多逗趣，也和黏人的小戴特別投緣，於是決定把兩隻一起帶回家，讓牠們互相作伴。貓窩的志工們真的好為牠們倆開心。"
      ],
      "photos": ["adopted/yongge-c.jpg", "adopted/yongge-1.jpg", "adopted/yongge-2.jpg"],
      "sources": [
        {
          "label": "送養日（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0pjUcFrumkoyHj5otRT3v5vbrRpDfzDSCvNX2SavL3jmkKK2A6TvqLArFpHCD7CPvl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；同一位媽咪一起帶回家"
    },
    {
      "id": "huahua",
      "name": "花花",
      "status": "home",
      "homeDate": "2021-09-22",
      "story": [
        "花花是貓窩的模範一姐。",
        "這天，爸爸媽媽和小姊姊一起來接花花回家，家裡還有貓同伴等著牠。貓窩的大家很開心，也很不捨，突然有種嫁女兒的心情。",
        "真的很謝謝有這樣一個家庭，和我們一起繼續愛著花花。"
      ],
      "photos": ["adopted/huahua-c.jpg", "adopted/huahua-1.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0PVjWXWCSpJnUrva9qnDFawwKNnGm2wvHjVxNamtqNWTfReXCbWB9BeJMtaY5Zd48l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "xiaoke",
      "name": "小可",
      "status": "home",
      "homeDate": "2021-07-24",
      "story": [
        "愛撒嬌的小可來貓窩沒多久，就圈粉無數。",
        "她遇到了愛她的新爸爸——一見面，她就立刻翹高屁屁，表示很滿意。即使工作繁忙，爸爸還是很用心地為小可準備好需要的一切；小可也融化了原本有點怕貓的媽媽的心。",
        "這個小妞一到新家，就很識相地跑去家裡的財位睡覺。謝謝這對爸爸媽媽和我們一起愛她。"
      ],
      "photos": ["adopted/xiaoke-c.jpg", "adopted/xiaoke-1.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0yFynAJiBa74XkYhhYU5BAuP9aru3nwVCyi9eC2X4qv3zZkQXQHZkwF4JAgyn8QWwl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "jiujiu",
      "name": "啾啾",
      "status": "home",
      "homeDate": "2021-06-13",
      "story": [
        "啾啾是貓窩可人的小妞。",
        "到了新家，她適應得還不錯，很快就找到喜歡窩著的沙發小角落；家裡還有狗哥哥和貓姊姊陪著她。謝謝這個新家庭和我們一起愛她。"
      ],
      "photos": ["adopted/jiujiu-2.jpg", "adopted/jiujiu-1.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid028ULxDxdS5wroXGkQXp1qZEVVeQ3LxQbZhNqqcfGPjEzfYk9i4qQyPy5JTPwDmHEYl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "oreo",
      "name": "Oreo、小饅頭",
      "status": "home",
      "homeDate": "2021-05-26",
      "story": [
        "Oreo 和小饅頭剛來貓窩不久，一個月內就一起找到了新家。",
        "新家有一間大房間，讓牠們倆可以盡情奔跑、跳躍、玩耍，也很開心牠們能繼續作伴、一起長大。謝謝新爸媽和我們一起愛牠們。"
      ],
      "photos": ["adopted/oreo-1.jpg", "adopted/oreo-2.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0qwUoCY4Czz6yw4xG4oiKU7JpZ2RMFxJhs48w1nr6CkHAAiZrfGubMxrFp7sSY6C7l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；兩隻一起到新家"
    },
    {
      "id": "ludan",
      "name": "滷蛋、貢丸",
      "status": "home",
      "homeDate": "2021-05-08",
      "story": [
        "滷蛋和貢丸是一對兄妹，一起被帶到了新家。",
        "很開心兄妹倆可以繼續作伴，繼續一起打打鬧鬧地玩耍。謝謝新爸媽和我們一起愛牠們。"
      ],
      "photos": ["adopted/ludan-1.jpg", "adopted/ludan-2.jpg", "adopted/ludan-3.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0hahNN8RjoociodgcNsUQkkRJNXUh5B1x116tCPEJkfqxBKfLohVu93QQWX7QV1ZEl&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；兄妹一起到新家"
    },
    {
      "id": "panghu",
      "name": "胖虎",
      "status": "home",
      "homeDate": "2021-04-18",
      "story": [
        "胖虎被接到駁二附近的新家，即將成為一隻文青貓。",
        "到新家兩天，牠就開始會撒嬌了，適應得很好。謝謝胖虎的新媽咪和我們一起愛牠。"
      ],
      "photos": ["adopted/panghu-1.jpg", "adopted/panghu-2.jpg", "adopted/panghu-3.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02v6weYeWr2xQpAVi1KEsk5B2qKU4UK6sn5TRe1jxMmRzxuTUB47LSotqcBstuG9aml&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    },
    {
      "id": "dandan",
      "name": "丹丹",
      "status": "home",
      "inDate": "2025-08-03",
      "homeDate": "2025-12",          // 只知道「12 月中旬」，沒有確切日期
      "story": [
        "在旅運中心附近停車位置被捕獲的小幼貓，可能是在找媽媽，叫聲很大而被附近住戶發現，通報我們。",
        "志工們出動，沒花太多時間就把牠接回貓窩。因為牠叫聲很宏亮、丹田相當夠力，於是起名為「丹丹」。",
        "2025 年 12 月中旬，丹丹寶貝也等到家了，換到更好的生活空間，讓幸福加倍延續，真好 ❤️",
        "下一個延續日日暖暖幸福的故事，也許就從你開始。"
      ],
      "photos": ["adopted/dandan-1.jpg", "adopted/dandan-2.jpg", "adopted/dandan-3.jpg"],
      "sources": [
        {
          "label": "新入住貼文（官方 FB）",
          "url": "https://www.facebook.com/story.php?story_fbid=1257489766390416&id=100063882136906"
        }
      ],
      "confirmed": "2026-11-23 瑞億提供文案（含 2025/12 中旬找到家）；照片由瑞億提供；送養貼文連結還沒找到"
    },
    {
      "id": "kiki",
      "hide": true,            // 還沒有照片，先不上架（2026-11-20）
      "name": "小黑（Kiki）",
      "status": "home",
      "homeDate": "2021-03-08",
      "story": [
        "小黑（Kiki）原本是一隻街貓。",
        "被接到新家一段時間後，牠已經可以和家裡原本的貓咪成員好好相處。謝謝小主人用愛與耐心，等待牠慢慢適應。"
      ],
      "photos": [],
      "sources": [],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認；原貼文連結沒抓到，可用貓名在粉專搜尋"
    },
    {
      "id": "ningmeng",
      "name": "檸檬",
      "status": "home",
      "homeDate": "2021-02-15",
      "story": [
        "檸檬住進新家的頭幾天，家人每天都在找牠躲到哪裡去了，真的是在玩躲貓貓。",
        "謝謝新家人用耐心陪牠熟悉新環境。"
      ],
      "photos": ["adopted/ningmeng-2.jpg", "adopted/ningmeng-1.jpg"],
      "sources": [
        {
          "label": "原貼文（官方 FB）",
          "url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0PkUdCs629XYTPFWCdyW6YCTszBTGYg9bXU7tnpR9rpPGgX365p9uiYndyMyjcxK7l&id=100063882136906"
        }
      ],
      "confirmed": "⚠️ 2026-11-20 從官方 FB 整理：故事依官方貼文改寫、照片是 FB 縮圖（人臉已用笑臉遮住），待貓窩確認"
    }
  ]
};
