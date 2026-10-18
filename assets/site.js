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
   分類清單寫在 data/cats.js 的「_毛色分類」，篩選鈕會照著自動產生。
   以後要再細分，改資料檔那一行就好，這個檔不用動。 */
/* 「等家的貓咪」頁首橫幅：換成目前篩選的毛色場景。
   用的是 cats.js 裡的「_毛色主題」對應表，跟單隻貓頁的背景同一套，
   所以點進去之後畫面是連貫的。 */
/* 橫幅用 WebP，檔案大約只有 JPG 的一半（同樣畫質），手機上差很多。
   WebP 是 2020 年後的瀏覽器才全面支援，所以這裡先問瀏覽器認不認得，
   不認得就退回 JPG（兩種檔案都有，只會下載其中一種）。
   只問一次，答案記起來。 */
// ?v= 的數字由 tools/更新版本號.py 自動換掉（見下面 HERO_V 那一行）
/* ===========================================================
   義賣小舖要不要出現在網站上

   true  ＝ 正常顯示
   false ＝ 整個藏起來（選單、首頁那張卡片、頁尾的連結都不見）

   名稱還沒定案、或還不確定要不要做的時候，改成 false 就好，
   頁面本身不會被刪掉，改回 true 隨時可以放出來。
   （直接輸入 shop.html 的網址還是進得去，只是沒有任何地方連到它。）
   =========================================================== */
var 顯示義賣小舖 = true;

function applyShopSwitch() {
  if (顯示義賣小舖) return;
  // 選單、頁尾裡的連結（整個項目一起藏）
  document.querySelectorAll('a[href="shop.html"]').forEach(function (a) {
    var box = a.closest('li') || a.closest('.card') || a;
    box.style.display = 'none';
  });
  // 沒有連結、但講的是義賣的區塊，在 HTML 標了 data-shop
  document.querySelectorAll('[data-shop]').forEach(function (el) {
    el.style.display = 'none';
  });
}

var HERO_V = '?v=998d7668';
// 手機版和電腦版的橫幅是兩張不同的圖，這裡記住現在是哪一種螢幕
var heroWide = window.matchMedia('(min-width: 761px)');
var _heroExt = null;
function heroExt() {
  if (_heroExt) return _heroExt;
  try {
    var c = document.createElement('canvas');
    _heroExt = c.toDataURL('image/webp').indexOf('data:image/webp') === 0 ? '.webp' : '.jpg';
  } catch (e) {
    _heroExt = '.jpg';
  }
  return _heroExt;
}

function setHero(filter) {
  var hero = document.getElementById('cats-hero');
  if (!hero) return;
  var themes = (window.CAT_DATA && window.CAT_DATA['_毛色主題']) || {};
  var name = (filter && filter !== 'all' && themes[filter]) ? themes[filter] : 'all';
  if (hero.dataset.now === name) return;
  hero.dataset.now = name;
  // 路徑要用網頁本身算出來的絕對網址。
  // 直接寫 "images/hero/..." 的話，瀏覽器會當成相對於 style.css 的位置
  // （變成 assets/images/hero/...），圖就找不到了。
  var base = new URL('images/hero/', location.href).href;
  var ext = heroExt();
  // 橫幅換新圖時檔名不變，沒有版本號的話使用者會繼續看到快取裡的舊圖
  var v = HERO_V;
  // 只設定「這個螢幕用得到」的那一張。
  // 兩張都設的話，瀏覽器連另一個版面的圖也會一起抓下來（白白多下載一張）。
  var suffix = heroWide.matches ? '-d' : '-m';
  var prop   = heroWide.matches ? '--hero-d' : '--hero-m';
  hero.style.setProperty(prop, 'url("' + base + name + suffix + ext + v + '")');

  // 標題那條色帶的顏色。只有夜晚是深色插畫，用深色的條配白字；
  // 其餘七張淺色插畫用白色的條配深藍字。
  var dark = (name === 'night');
  hero.style.setProperty('--hero-ink', dark ? '#FFFFFF' : '#26314A');
  hero.style.setProperty('--hero-band',
    dark ? 'rgba(16, 24, 48, .42)' : 'rgba(255, 255, 255, .38)');


  // 底紋的顏色也跟著換，呼應該主題的場景
  var TONE = {
    all:    '#8FA6C8',   // 預設的藍灰
    night:  '#6E7CAE',   // 夜空的藍紫
    snow:   '#9CBBDC',   // 雪地的淡藍
    piano:  '#A3A8B6',   // 鋼琴的灰
    garden: '#D7A08F',   // 花園的暖粉
    autumn: '#C89A69',   // 秋天的褐
    sunset: '#E2A271',   // 夕陽的橘
    forest: '#8FA89A'    // 晨霧森林的灰綠
  };
  var paw = document.querySelector('.paw-bg');
  if (paw) {
    var layer = paw.querySelector('.paw-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'paw-layer';
      paw.insertBefore(layer, paw.firstChild);
    }
    // 直接換整張圖，不是改顏色——改顏色時瀏覽器不一定會重繪遮罩
    var pawUrl = new URL('images/paws/' + (TONE[name] ? name : 'all') + '.svg', location.href).href;
    layer.style.setProperty('--paw-art', 'url("' + pawUrl + '")');
  }

  // 轉成橫的、或把視窗拉寬拉窄跨過分界時，換成另一個版面的圖
  if (!hero.dataset.watching) {
    hero.dataset.watching = '1';
    var relayout = function () { hero.dataset.now = ''; setHero(hero.dataset.filter || 'all'); };
    if (heroWide.addEventListener) heroWide.addEventListener('change', relayout);
    else heroWide.addListener(relayout);
  }
  hero.dataset.filter = filter || 'all';

  // 重播一次淡入，讓換場景看得出來
  hero.classList.remove('is-in');
  void hero.offsetWidth;
  hero.classList.add('is-in');
}

function colorList() {
  var list = window.CAT_DATA && window.CAT_DATA._毛色分類;
  return (list && list.length) ? list : [];
}

/* 檢查資料有沒有填到清單外的毛色——打錯字的話篩選鈕會選不到那隻貓，
   在瀏覽器的 Console（F12）會看到提醒。 */
function checkColorTypes(cats) {
  var ok = colorList();
  if (!ok.length) return;
  var bad = cats.filter(function (c) {
    return c.colorType && ok.indexOf(c.colorType) < 0;
  });
  if (bad.length) {
    console.warn('[日日暖暖] 這些貓的毛色不在分類清單裡，篩選鈕會選不到：',
      bad.map(function (c) { return c.name + '（' + c.colorType + '）'; }).join('、'),
      '\n可用的分類：' + ok.join('、') +
      '\n改 data/cats.js 最上面的「_毛色分類」可以新增分類。');
  }
}

/* ---------- 取得一隻貓的照片清單 ----------
   新寫法是 photos: ["a.jpg", "b.jpg", "c.jpg"]，
   舊的 photo: "a.jpg" 也還能用，會當成只有一張。 */
function photosOf(cat) {
  if (cat.photos && cat.photos.length) return cat.photos.filter(Boolean);
  return cat.photo ? [cat.photo] : [];
}

/* ---------- 把一隻貓畫成一張卡片 ---------- */
function catCard(cat) {
  // 照片：有填 photo 就用照片，沒填就顯示一個貓咪圖示佔位
  // 列表只放第一張，點進去才看到全部
  var first = photosOf(cat)[0];
  var photo = first
    ? '<img src="images/' + first + '" alt="' + cat.name + '" loading="lazy">'
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

  checkColorTypes(all);

  // 篩選鈕照資料檔的分類清單自動產生。
  // 只顯示「真的有貓」的分類，免得點進去都是空的。
  var bar = document.getElementById('cat-filters');
  if (bar) {
    var used = colorList().filter(function (c) {
      return all.some(function (cat) { return cat.colorType === c; });
    });
    bar.innerHTML =
      '<button class="on" data-filter="all">全部</button>' +
      used.map(function (c) {
        return '<button data-filter="' + c + '">' + c + '</button>';
      }).join('');

    // 滑鼠移到篩選鈕上（或用鍵盤 tab 到它）就先把那張橫幅抓下來，
    // 真的點下去時圖已經在快取裡，換場景是瞬間的。
    // 只抓一次，而且是在使用者「看起來要點了」才抓，不會一開始就下載八張。
    var warmed = {};
    bar.addEventListener('mouseover', warm);
    bar.addEventListener('focusin', warm);
    function warm(e) {
      var btn = e.target.closest ? e.target.closest('button[data-filter]') : null;
      if (!btn) return;
      var f = btn.dataset.filter;
      var themes = (window.CAT_DATA && window.CAT_DATA['_毛色主題']) || {};
      var name = (f && f !== 'all' && themes[f]) ? themes[f] : 'all';
      if (warmed[name]) return;
      warmed[name] = true;
      var suffix = heroWide.matches ? '-d' : '-m';
      new Image().src = new URL('images/hero/' + name + suffix + heroExt() + HERO_V, location.href).href;
    }
  }

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

    setHero(filter);
  }

  // 篩選鈕（有放 .filters 的頁面才會啟用）
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

/* ---------- 找到家的貓 ----------
   用法：在頁面放 <div id="adopted-list"></div>
   資料來自 data/cats.js 的 adopted（貓咪送養後整段搬過去）。
   名單還是空的時候，保留頁面上原本寫的「整理中」那張卡片。 */
function initAdoptedList() {
  var box = document.getElementById('adopted-list');
  if (!box || !window.CAT_DATA) return;

  var list = window.CAT_DATA.adopted || [];
  if (!list.length) return;        // 空的就不要蓋掉「整理中」的訊息

  // 新的排前面。沒填日期的排最後，不會把有日期的擠掉。
  list = list.slice().sort(function (a, b) {
    return (b.homeDate || '').localeCompare(a.homeDate || '');
  });

  box.className = 'story-list';
  box.innerHTML = list.map(storyCard).join('');
}

/* 一隻貓一則故事：照片在左、文字在右，手機上則是上下排。
   故事是從官方 FB／IG 的貼文整理的，所以每一則都要附原文連結。 */
function storyCard(cat) {
  var first = photosOf(cat)[0];
  var photo = first
    ? '<img src="images/' + first + '" alt="' + cat.name + '" loading="lazy">'
    : '<span aria-hidden="true">🐈</span>';

  // 日期：有入住日就寫成「來到貓窩 → 找到家」，看得出等了多久
  function 寫日期(v, 全年) {
    var d = v.split('-');
    return (全年 ? d[0] + ' 年 ' : '') + (+d[1]) + ' 月 ' + (+d[2]) + ' 日';
  }
  var date = '';
  if (cat.homeDate) {
    date = cat.inDate
      ? 寫日期(cat.inDate, true) + ' 來到貓窩　→　' +
        寫日期(cat.homeDate, false) + ' 找到家'
      : 寫日期(cat.homeDate, true) + '　找到家';
    date = '<p class="story-date">' + date + '</p>';
  }

  // 故事可以是一段字串，也可以是好幾段（陣列）
  var story = cat.story || '';
  if (typeof story === 'string') story = story ? [story] : [];
  var body = story.map(function (t) { return '<p>' + t + '</p>'; }).join('');

  // 出處。sources 是清單（一隻貓常常有好幾篇貼文）；
  // 舊的寫法只有一個 source，也還能用。
  var list = cat.sources || (cat.source
    ? [{ label: '原文在' + (cat.sourceName || '官方社群'), url: cat.source }]
    : []);
  var src = list.length
    ? '<p class="story-src">出處：' + list.map(function (o) {
        return '<a href="' + o.url + '" target="_blank" rel="noopener">' +
               o.label + '</a>';
      }).join('　') + '</p>'
    : '';

  return '' +
    '<article class="story">' +
      '<div class="story-photo">' + photo + '</div>' +
      '<div class="story-body">' +
        date +
        '<h3>' + cat.name + '</h3>' +
        body +
        src +
      '</div>' +
    '</article>';
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
  // 封面用影片自己在 YouTube 上的縮圖——影片的封面就該是影片的畫面。
  // （想換成別張圖的話，在 cats.js 填 videoCover，例如 "cats/sher-1.jpg"）
  // YouTube 縮圖先抓高畫質版（1280×720），抓不到時 onerror 自動退回標準版，
  // 因為標準版只有 480×360，放進直式框會糊。
  var yt = 'https://img.youtube.com/vi/' + id + '/';
  var cover = item.videoCover
    ? '<img class="video-cover" src="images/' + item.videoCover + '" alt="">'
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

/* ---------- 單隻貓頁的照片拼貼 ----------
   照片張數不同，排法就不同，原則是「不擁擠、活潑」：
   0 張：一個空相框放貓咪圖示
   1 張：一張大的，微微歪
   2 張：一左上、一右下，交疊一點（照概念圖）
   3 張：左邊一張大的，右邊上下兩張小的
   4～5 張：上面照 3 張的排法，其餘排在下面一列小相框
   相框是 images/frame-scallop.svg（波浪郵票邊）。 */
function framed(src, alt, cls) {
  var inner = src
    ? '<img src="images/' + src + '" alt="' + alt + '" loading="lazy">'
    : '<span class="pf-empty" aria-hidden="true">🐈</span>';
  return '<figure class="pf-item ' + (cls || '') + '">' + inner + '</figure>';
}

function photoCollage(cat) {
  var list = photosOf(cat);
  var n = list.length;
  var alt = function (i) { return cat.name + (n > 1 ? '的照片 ' + (i + 1) : ''); };
  var hearts = '<span class="pf-heart h1" aria-hidden="true"></span>' +
               '<span class="pf-heart h2" aria-hidden="true"></span>';

  if (n <= 1) {
    return '<div class="pf pf-1">' + framed(list[0], alt(0), 'a') + hearts + '</div>';
  }
  if (n === 2) {
    return '<div class="pf pf-2">' +
      framed(list[0], alt(0), 'a') + framed(list[1], alt(1), 'b') + hearts + '</div>';
  }
  var main = '<div class="pf pf-3">' +
    framed(list[0], alt(0), 'a') + framed(list[1], alt(1), 'b') +
    framed(list[2], alt(2), 'c') + hearts + '</div>';
  if (n === 3) return main;

  // 第 4、5 張排在下面一列，太多會擠，最多放到 5 張
  var rest = list.slice(3, 5).map(function (src, i) {
    return framed(src, alt(i + 3), 'r' + (i % 2));
  }).join('');
  return main + '<div class="pf-row">' + rest + '</div>';
}

// 手機沒有滑鼠：點一下照片 = 電腦上滑鼠移過去的效果（擺正、放大、浮上來）。
// 點同一張會收回，點別張就換那張，點照片以外的地方全部收回。
document.addEventListener('click', function (e) {
  var item = e.target.closest ? e.target.closest('.pf-item') : null;
  var active = document.querySelectorAll('.pf-item.is-active');
  for (var i = 0; i < active.length; i++) {
    if (active[i] !== item) active[i].classList.remove('is-active');
  }
  if (item) item.classList.toggle('is-active');
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

  // 依毛色套用背景主題（白貓→雪地、黑貓→夜晚…）。
  // 對應表寫在 data/cats.js 的「_毛色主題」，背景圖本身寫在 style.css。
  var themes = window.CAT_DATA['_毛色主題'] || {};
  if (cat.colorType && themes[cat.colorType]) {
    document.body.classList.add('theme-' + themes[cat.colorType]);
  }

  // 已經找到家的貓才顯示狀態標籤；等家中的改顯示毛色分類
  var tag = cat.status === 'home'
    ? '<span class="tag tag-done">已找到家</span>'
    : (cat.colorType ? '<span class="tag tag-color">' + cat.colorType + '</span>' : '');

  var photo = photoCollage(cat);

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

  // 整段內容包在一張半透明白卡片裡（.cat-sheet），
  // 不管背後是雪地還是黑夜，字都讀得清楚。
  box.innerHTML = '<div class="cat-sheet">' +
    '<p><a href="cats.html">← 回到等家的貓咪</a></p>' +
    '<div class="cols" style="align-items:start">' +
      photo +
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
  initAdoptedList();
  applyShopSwitch();
  initStats();
  initCatDetail();
  initNews();
  initShop();
  initTipList();
  initTipDetail();
  initGames();
});
