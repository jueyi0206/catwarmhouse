/* ===========================================================
   日日暖暖中途貓窩 官方網站 — 共用程式
   -----------------------------------------------------------
   這個檔負責三件事：
   1. 手機版的選單開關
   2. 把 data/cats.js 裡的貓咪資料畫成卡片
   3. 單隻貓的詳細頁內容

   資料來源是 window.CAT_DATA（定義在 data/cats.js）。
   要新增或修改貓咪，改 data/cats.js 就好，不用動這個檔。
   =========================================================== */

/* ---------- 1. 手機選單 ---------- */
function initNav() {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // 點選單裡的連結後把選單收起來
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') nav.classList.remove('open');
  });
}

/* ---------- 毛色分類 ----------
   「等家的貓咪」頁用毛色篩選。這六類跟篩選鈕、cats.js 的 colorType 必須一致，
   要增減分類的話三個地方要一起改：
   1. 下面這個 COLORS　2. cats.html 的篩選鈕　3. cats.js 每隻貓的 colorType */
var COLORS = ['黑貓', '白貓', '賓士貓', '三花貓', '橘貓', '虎斑貓'];

/* ---------- 把一隻貓畫成一張卡片 ---------- */
function catCard(cat) {
  // 照片：有填 photo 就用照片，沒填就顯示一個貓咪圖示佔位
  var photo = cat.photo
    ? '<img src="images/' + cat.photo + '" alt="' + cat.name + '">'
    : '<span aria-hidden="true">🐈</span>';

  // 第二行小字：性別・花色・年齡，空的欄位自動跳過
  var meta = [cat.sex, cat.color, cat.age].filter(function (v) {
    return v && v !== '待確認' && v !== '年齡不詳';
  }).join('・');

  // 標籤顯示毛色分類。等家的貓咪一律都是等家中，所以不顯示狀態。
  var tag = cat.colorType
    ? '<span class="tag tag-color">' + cat.colorType + '</span>'
    : '';

  return '' +
    '<a class="cat-card" href="cat.html?id=' + cat.id + '">' +
      '<div class="cat-photo">' + photo + '</div>' +
      '<div class="cat-body">' +
        tag +
        '<h3>' + cat.name + '</h3>' +
        (meta ? '<p class="cat-meta">' + meta + '</p>' : '') +
        '<p class="cat-desc">' + (cat.personality || '') + '</p>' +
      '</div>' +
    '</a>';
}

/* ---------- 2. 貓咪列表 ---------- */
/* 用法：在頁面放 <div id="cat-list" data-limit="4"></div>
   data-limit 可省略，省略就全部顯示（首頁用 4 隻，列表頁不限）。*/
function initCatList() {
  var box = document.getElementById('cat-list');
  if (!box || !window.CAT_DATA) return;

  var all = window.CAT_DATA.cats || [];
  var limit = parseInt(box.dataset.limit, 10);

  function render(filter) {
    // filter 是毛色分類（黑貓、白貓…），'all' 代表全部
    var list = all.filter(function (c) {
      return filter === 'all' ? true : c.colorType === filter;
    });
    if (limit) list = list.slice(0, limit);

    box.innerHTML = list.length
      ? list.map(catCard).join('')
      : '<p class="lead">目前沒有這個毛色的貓咪在等家。<br>' +
        '<a href="cats.html">看看全部的貓咪 →</a></p>';
  }

  // 篩選鈕（有放 .filters 的頁面才會啟用）
  var bar = document.querySelector('.filters');
  if (bar) {
    bar.addEventListener('click', function (e) {
      if (e.target.tagName !== 'BUTTON') return;
      bar.querySelectorAll('button').forEach(function (b) {
        b.classList.remove('on');
      });
      e.target.classList.add('on');
      render(e.target.dataset.filter);
    });
  }

  render('all');
}

/* ---------- 統計數字 ---------- */
function initStats() {
  if (!window.CAT_DATA) return;
  var cats = window.CAT_DATA.cats || [];

  var map = {
    'stat-wait':    cats.length,                               // 等家的貓咪一律都是等家中
    'stat-adopted': (window.CAT_DATA.adopted || []).length
  };

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = map[id];
  });
}

/* ---------- YouTube 影片：點一下才載入 ----------
   直接放 YouTube 的 iframe 會有兩個問題：
   1. 播放器很肥，手機開頁面會變慢
   2. 一進頁面就載入 Google 的追蹤程式，訪客還沒按播放就被追蹤了
   所以這裡先顯示一張封面圖（優先用貓咪自己的照片），
   訪客點了才真的載入 YouTube，而且用 youtube-nocookie 網域。 */

function ytId(url) {
  if (!url) return '';
  var m = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // 也允許直接填 11 碼的影片 ID
  return /^[A-Za-z0-9_-]{11}$/.test(url) ? url : '';
}

function videoBlock(item) {
  var id = ytId(item.video);
  if (!id) return '';
  // Shorts 是直式影片，播放框要跟著直式，不然左右會是一片黑
  var isShort = /\/shorts\//.test(String(item.video));
  // 封面優先用貓咪自己的照片；沒照片才用 YouTube 縮圖。
  // YouTube 縮圖先抓高畫質版（1280×720），抓不到時 onerror 自動退回標準版，
  // 因為標準版只有 480×360，放進直式框會糊。
  var yt = 'https://img.youtube.com/vi/' + id + '/';
  var cover = item.photo
    ? '<img class="video-cover" src="images/' + item.photo + '" alt="">'
    : '<img class="video-cover" src="' + yt + 'maxresdefault.jpg" alt="" ' +
      'onerror="this.onerror=null;this.src=\'' + yt + 'hqdefault.jpg\'">';
  return '' +
    '<h3>影片</h3>' +
    '<div class="video-embed' + (isShort ? ' is-short' : '') + '" data-yt="' + id + '">' +
      cover +
      '<button class="video-play" type="button" aria-label="播放影片">▶</button>' +
      '<span class="video-note">點一下播放（會連到 YouTube）</span>' +
    '</div>';
}

// 整頁共用一個點擊處理，之後新增的影片也會自動生效
document.addEventListener('click', function (e) {
  var box = e.target.closest ? e.target.closest('.video-embed') : null;
  if (!box || box.dataset.loaded) return;
  box.dataset.loaded = '1';
  box.innerHTML =
    '<iframe src="https://www.youtube-nocookie.com/embed/' + box.dataset.yt +
    '?autoplay=1&rel=0" title="影片" frameborder="0" allowfullscreen ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>';
});

/* ---------- 3. 單隻貓的詳細頁 ---------- */
function initCatDetail() {
  var box = document.getElementById('cat-detail');
  if (!box || !window.CAT_DATA) return;

  // 從網址取得 ?id=xxx
  var id = new URLSearchParams(location.search).get('id');
  var all = (window.CAT_DATA.cats || []).concat(window.CAT_DATA.adopted || []);
  var cat = all.filter(function (c) { return c.id === id; })[0];

  if (!cat) {
    box.innerHTML =
      '<h1>找不到這隻貓</h1>' +
      '<p class="lead">這個連結可能過期了，或這隻貓咪已經找到家了。</p>' +
      '<p><a class="btn" href="cats.html">看看其他等家的貓咪</a></p>';
    return;
  }

  document.title = cat.name + '｜日日暖暖中途貓窩';

  // 已經找到家的貓才顯示狀態標籤；等家中的改顯示毛色分類
  var tag = cat.status === 'home'
    ? '<span class="tag tag-done">已找到家</span>'
    : (cat.colorType ? '<span class="tag tag-color">' + cat.colorType + '</span>' : '');

  var photo = cat.photo
    ? '<img src="images/' + cat.photo + '" alt="' + cat.name + '">'
    : '<span aria-hidden="true" style="font-size:5rem">🐈</span>';

  // 資料表：空的欄位不顯示，避免一整排「待確認」
  var rows = [
    ['性別',     cat.sex],
    ['年齡',     cat.age],
    ['花色',     cat.color],
    ['特徵',     cat.feature],
    ['個性',     cat.personality],
    ['適合的家', cat.fit],
    ['健康狀況', cat.health]
  ].filter(function (r) { return r[1]; });

  box.innerHTML = '' +
    '<p><a href="cats.html">← 回到等家的貓咪</a></p>' +
    '<div class="cols" style="align-items:start">' +
      '<div class="cat-photo" style="border-radius:var(--radius)">' + photo + '</div>' +
      '<div>' +
        tag +
        '<h1 style="margin-top:.2em">' + cat.name + '</h1>' +
        '<div class="card">' +
          rows.map(function (r) {
            return '<p style="margin:.3em 0"><b>' + r[0] + '</b>｜' + r[1] + '</p>';
          }).join('') +
        '</div>' +
        (cat.story && cat.story !== '待貓窩提供'
          ? '<h3>牠的故事</h3><p>' + cat.story + '</p>' : '') +
        videoBlock(cat) +
        '<p class="btn-row" style="margin-top:24px">' +
          '<a class="btn" href="adopt.html">先看領養流程</a>' +
          '<a class="btn-ghost" href="https://www.facebook.com/profile.php?id=100063882136906" target="_blank" rel="noopener">到 FB 私訊詢問</a>' +
        '</p>' +
        // 註：cats.js 的 confirmed 是內部備註，刻意不顯示在網頁上，
        //     資料確認狀況統一看「進度.html」。
      '</div>' +
    '</div>';
}

/* ===========================================================
   以下三區分別對應三個頁面，如果決定不要某一頁，
   把對應的那一區連同 HTML 檔、data 檔一起刪掉就好，不影響其他功能。
   =========================================================== */

/* ---------- 4. 最新消息（news.html、首頁） ---------- */
function initNews() {
  var box = document.getElementById('news-list');
  if (!box || !window.NEWS_DATA) return;

  var limit = parseInt(box.dataset.limit, 10);
  var list = (window.NEWS_DATA.news || []).slice();
  list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });   // 新的在前
  if (limit) list = list.slice(0, limit);

  box.innerHTML = list.length ? list.map(function (n) {
    return '' +
      '<article class="news-item' + (n.demo ? ' is-demo' : '') + '">' +
        '<div class="news-head">' +
          '<time>' + n.date + '</time>' +
          (n.category ? '<span class="chip">' + n.category + '</span>' : '') +
        '</div>' +
        '<h3>' + n.title + '</h3>' +
        '<p>' + (n.body || '') + '</p>' +
        (n.link ? '<p><a href="' + n.link + '" target="_blank" rel="noopener">看臉書原文 →</a></p>' : '') +
      '</article>';
  }).join('') : '<p class="lead">目前沒有消息。</p>';
}

/* ---------- 5. 義賣商品（shop.html） ---------- */
var SHOP_STATUS = {
  on:   { text: '販售中', cls: 'tag-ok'   },
  soon: { text: '準備中', cls: 'tag-wait' },
  out:  { text: '已售完', cls: 'tag-done' }
};

function initShop() {
  var box = document.getElementById('shop-list');
  if (!box || !window.SHOP_DATA) return;

  var howto = document.getElementById('shop-howto');
  if (howto && window.SHOP_DATA.howto) howto.textContent = window.SHOP_DATA.howto;

  var items = window.SHOP_DATA.items || [];
  box.innerHTML = items.length ? items.map(function (it) {
    var s = SHOP_STATUS[it.status] || SHOP_STATUS.soon;
    var photo = it.photo
      ? '<img src="images/' + it.photo + '" alt="' + it.name + '">'
      : '<span aria-hidden="true">🎁</span>';
    return '' +
      '<div class="cat-card" style="cursor:default">' +
        '<div class="cat-photo">' + photo + '</div>' +
        '<div class="cat-body">' +
          '<span class="tag ' + s.cls + '">' + s.text + '</span>' +
          '<h3>' + it.name + '</h3>' +
          (it.price ? '<p class="price">' + it.price + '</p>' : '') +
          '<p class="cat-desc">' + (it.desc || '') + '</p>' +
          (it.link ? '<p style="margin-top:10px"><a href="' + it.link + '" target="_blank" rel="noopener">前往購買 →</a></p>' : '') +
        '</div>' +
      '</div>';
  }).join('') : '<p class="lead">目前沒有義賣商品。</p>';
}

/* ---------- 6. 養貓小知識（tips.html、tip.html） ---------- */
function initTipList() {
  var box = document.getElementById('tip-list');
  if (!box || !window.TIPS_DATA) return;

  var limit = parseInt(box.dataset.limit, 10);
  var list = (window.TIPS_DATA.tips || []);
  if (limit) list = list.slice(0, limit);

  box.innerHTML = list.length ? list.map(function (t) {
    return '' +
      '<a class="cat-card" href="tip.html?id=' + t.id + '">' +
        '<div class="cat-body">' +
          (t.category ? '<span class="chip">' + t.category + '</span>' : '') +
          '<h3>' + t.title + '</h3>' +
          '<p class="cat-desc">' + (t.summary || '') + '</p>' +
          (t.draft ? '<p class="draft-note">草稿・內容待查證</p>' : '') +
        '</div>' +
      '</a>';
  }).join('') : '<p class="lead">文章準備中。</p>';
}

function initTipDetail() {
  var box = document.getElementById('tip-detail');
  if (!box || !window.TIPS_DATA) return;

  var id = new URLSearchParams(location.search).get('id');
  var tip = (window.TIPS_DATA.tips || []).filter(function (t) { return t.id === id; })[0];

  if (!tip) {
    box.innerHTML = '<h1>找不到這篇文章</h1>' +
      '<p><a class="btn" href="tips.html">回到養貓小知識</a></p>';
    return;
  }

  document.title = tip.title + '｜日日暖暖中途貓窩';

  box.innerHTML = '' +
    '<p><a href="tips.html">← 回到養貓小知識</a></p>' +
    (tip.category ? '<span class="chip">' + tip.category + '</span>' : '') +
    '<h1>' + tip.title + '</h1>' +
    (tip.summary ? '<p class="lead">' + tip.summary + '</p>' : '') +
    '<div class="article">' +
      (tip.body || []).map(function (p) { return '<p>' + p + '</p>'; }).join('') +
    '</div>' +
    (tip.sources && tip.sources.length
      ? '<div class="card"><h3>資料來源</h3><ul>' +
        tip.sources.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
        '</ul></div>'
      : '') +
    (tip.draft
      ? '<div class="todo"><p>這篇是草稿，內容尚未依照三級來源制度查證，<b>不能對外公開</b>。</p></div>'
      : '');
}

/* ---------- 7. 小遊戲（games.html、養貓小知識頁） ---------- */
function initGames() {
  var box = document.getElementById('game-list');
  if (!box || !window.GAMES_DATA) return;

  var limit = parseInt(box.dataset.limit, 10);
  var list = (window.GAMES_DATA.games || []);
  if (limit) list = list.slice(0, limit);

  box.innerHTML = list.length ? list.map(function (g) {
    var cover = g.cover
      ? '<img src="images/' + g.cover + '" alt="' + g.name + '">'
      : '<span aria-hidden="true">🎮</span>';
    return '' +
      '<a class="cat-card" href="' + g.url + '" target="_blank" rel="noopener">' +
        '<div class="cat-photo">' + cover + '</div>' +
        '<div class="cat-body">' +
          '<h3>' + g.name + ' ↗</h3>' +
          '<p class="cat-desc">' + (g.desc || '') + '</p>' +
          (g.note ? '<p class="draft-note" style="color:var(--ink-soft);font-weight:400">' + g.note + '</p>' : '') +
        '</div>' +
      '</a>';
  }).join('') : '<p class="lead">目前沒有遊戲。</p>';
}

/* ---------- 啟動 ---------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initCatList();
  initStats();
  initCatDetail();
  initNews();
  initShop();
  initTipList();
  initTipDetail();
  initGames();
});
