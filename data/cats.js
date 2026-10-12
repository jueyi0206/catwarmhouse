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
      "photo": "",
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
      "photo": "",
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
      "photo": "",
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
      "photo": "",
      "video": "",
      "confirmed": ""
    },
    {
      "id": "jill",
      "name": "吉兒",
      "status": "wait",
      "sex": "待確認",
      "age": "待確認",
      "color": "稀釋三花（灰＋奶油＋白）",
      "colorType": "三花貓",
      "feature": "",
      "personality": "送養會上會躺著給人摸",
      "fit": "待貓窩確認",
      "health": "待貓窩確認",
      "story": "",
      "photo": "",
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
      "photo": "",
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
      "photo": "",
      "video": "",
      "confirmed": ""
    }
  ],

  "_已找到家名單說明": "下面這一區是「找到家的貓」頁面的資料來源。雛形階段刻意留空，因為成功案例名單必須由貓窩提供，不能由瑞億或 Claude 推測。拿到名單後照 cats 的格式加進來，status 填 home。",
  "adopted": []
};
