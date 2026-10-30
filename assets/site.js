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
   公益商品要不要出現在網站上

   true  ＝ 正常顯示
   false ＝ 整個藏起來（選單、首頁那張卡片、頁尾的連結都不見）

   名稱還沒定案、或還不確定要不要做的時候，改成 false 就好，
   頁面本身不會被刪掉，改回 true 隨時可以放出來。
   （直接輸入 shop.html 的網址還是進得去，只是沒有任何地方連到它。）
   =========================================================== */
var 顯示公益商品 = true;

function applyShopSwitch() {
  if (顯示公益商品) return;
  // 選單、頁尾裡的連結（整個項目一起藏）
  document.querySelectorAll('a[href="shop.html"]').forEach(function (a) {
    var box = a.closest('li') || a.closest('.card') || a;
    box.style.display = 'none';
  });
  // 沒有連結、但講的是公益商品的區塊，在 HTML 標了 data-shop
  document.querySelectorAll('[data-shop]').forEach(function (el) {
    el.style.display = 'none';
  });
}

var HERO_V = '?v=998d7668';

// 貓咪照片的版本號。照片換新的時候檔名不變（cream-1.jpg 永遠叫 cream-1.jpg），
// 沒有版本號的話，看過的人會一直看到瀏覽器快取裡的舊圖。
// 數字一樣由 tools/更新版本號.py 自動換掉。
var PHOTO_V = '?v=f963cac9';
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
    ? '<img src="images/' + first + PHOTO_V + '" alt="' + cat.name + '" loading="lazy">'
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

  // 手機版一次先放這麼多隻，其餘按「看更多」才出來。
  // 貓多了以後整頁會長到捲不完（35 隻要捲 25 個畫面），所以分批放。
  // 電腦版排得下，一次全部列出來，不受影響。
  var 每批 = 12;
  var 窄螢幕 = window.matchMedia('(max-width: 760px)');
  var 已顯示 = 每批;
  var 目前篩選 = 'all';

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

  // 「看更多」按鈕放在格子外面，不然它會變成格子裡的一格
  function 更多列() {
    var el = document.getElementById('cat-more');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cat-more';
      el.className = 'more-row';
      box.parentNode.insertBefore(el, box.nextSibling);
      el.addEventListener('click', function (e) {
        if (!e.target.closest || !e.target.closest('button')) return;
        已顯示 += 每批;
        render(目前篩選, true);
        // 焦點移到這批第一隻，用鍵盤或讀螢幕軟體的人才知道跑到哪了
        var 卡片 = box.children[已顯示 - 每批];
        if (卡片 && 卡片.focus) 卡片.focus({ preventScroll: true });
      });
    }
    return el;
  }

  function render(filter, 接著看) {
    if (filter !== undefined) 目前篩選 = filter;
    if (!接著看) 已顯示 = 每批;   // 換篩選就從頭數

    // filter 是毛色分類（黑貓、白貓…），'all' 代表全部
    var list = all.filter(function (c) {
      return 目前篩選 === 'all' ? true : c.colorType === 目前篩選;
    });
    if (limit) list = list.slice(0, limit);

    // 首頁那種已經寫死數量的、還有電腦版，都一次列完
    var 全列 = !!limit || !窄螢幕.matches;
    var 這次顯示 = 全列 ? list : list.slice(0, 已顯示);

    box.innerHTML = 這次顯示.length
      ? 這次顯示.map(catCard).join('')
      : '<p class="lead">目前沒有這個毛色的貓咪在等家。<br>' +
        '<a href="cats.html">看看全部的貓咪 →</a></p>';

    var 剩下 = list.length - 這次顯示.length;
    更多列().innerHTML = 剩下 > 0
      ? '<button class="btn-ghost" type="button">看更多貓咪（還有 ' + 剩下 + ' 隻）</button>'
      : '';

    setHero(目前篩選);
  }

  // 轉橫、改視窗大小時，手機版和電腦版的規則不一樣，要重排一次
  var 換排版 = function () { render(目前篩選, false); };
  if (窄螢幕.addEventListener) 窄螢幕.addEventListener('change', 換排版);
  else if (窄螢幕.addListener) 窄螢幕.addListener(換排版);

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

/* ---------- 底紋 ----------
   淡淡的貓掌、愛心、小魚鋪在內容後面，整個網站的頁面都有。
   「等家的貓咪」那一頁會跟著選的毛色換顏色（在 setHero 裡處理），
   其他頁面用預設的藍灰色那張。

   為什麼圖是用 JS 設定的：寫在 CSS 裡的話，相對路徑會被當成
   相對於 style.css 的位置（變成 assets/images/...），圖就找不到了。 */
function initPaw() {
  document.querySelectorAll('.paw-bg').forEach(function (box) {
    if (box.querySelector(':scope > .paw-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'paw-layer';
    layer.style.setProperty('--paw-art',
      'url("' + new URL('images/paws/all.svg', location.href).href + '")');
    box.insertBefore(layer, box.firstChild);
  });
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

  box.className = 'cat-grid';
  box.innerHTML = list.map(adoptedCard).join('');
}

/* 一隻貓一則故事：照片在左、文字在右，手機上則是上下排。
   故事是從官方 FB／IG 的貼文整理的，所以每一則都要附原文連結。 */
/* 「2025-10-24 來到貓窩 → 2026-05-03 找到家」這種日期字串。
   跨年的話後面那個也寫年份，不然看起來像倒退回去。 */
function homeDateLine(cat) {
  if (!cat.homeDate) return '';
  function 寫(v, 全年) {
    var d = v.split('-');
    return (全年 ? d[0] + ' 年 ' : '') + (+d[1]) + ' 月 ' + (+d[2]) + ' 日';
  }
  if (!cat.inDate) return 寫(cat.homeDate, true) + '　找到家';
  var 跨年 = cat.inDate.slice(0, 4) !== cat.homeDate.slice(0, 4);
  return 寫(cat.inDate, true) + ' 來到貓窩　→　' + 寫(cat.homeDate, 跨年) + ' 找到家';
}

/* 出處連結：一隻貓常常有好幾篇貼文 */
function sourceLine(cat) {
  var list = (cat.sources || []).filter(function (o) { return o.url; });
  if (!list.length && cat.source) {
    list = [{ label: '原文在' + (cat.sourceName || '官方社群'), url: cat.source }];
  }
  if (!list.length) return '';
  return '<p class="story-src">出處：' + list.map(function (o) {
    return '<a href="' + o.url + '" target="_blank" rel="noopener">' + o.label + '</a>';
  }).join('　') + '</p>';
}

/* 「找到家的貓」清單上的一張卡片。
   故事很長，全部攤在同一頁會捲不完，所以這裡只放照片、名字、
   日期和開頭一句，點進去才看完整的故事（cat.html?id=…）。 */
function adoptedCard(cat) {
  var first = photosOf(cat)[0];
  var photo = first
    ? '<img src="images/' + first + PHOTO_V + '" alt="" loading="lazy">'
    : '<span aria-hidden="true">🐈</span>';

  // 開頭一句當摘要：切到第一個句號為止，太長就截斷
  var story = cat.story || '';
  if (typeof story !== 'string') story = story[0] || '';
  var cut = story.indexOf('。');
  var teaser = cut > 0 ? story.slice(0, cut + 1) : story;
  if (teaser.length > 46) teaser = teaser.slice(0, 46) + '…';

  return '' +
    '<a class="cat-card" href="cat.html?id=' + cat.id + '">' +
      '<div class="cat-photo">' + photo + '</div>' +
      '<div class="cat-body">' +
        (cat.homeDate ? '<span class="tag tag-done">已找到家</span>' : '') +
        '<h3>' + cat.name + '</h3>' +
        '<p class="cat-meta">' + homeDateLine(cat) + '</p>' +
        '<p class="cat-desc">' + teaser + '</p>' +
      '</div>' +
    '</a>';
}

/* ---------- 找到家的貓：一排小縮圖 ----------
   放在「等家的貓咪」頁尾，只有照片和名字，點了連到完整的故事頁。
   用法：<div id="adopted-strip" data-limit="6"></div> */
function initAdoptedStrip() {
  var box = document.getElementById('adopted-strip');
  if (!box || !window.CAT_DATA) return;

  var list = (window.CAT_DATA.adopted || []).slice().sort(function (a, b) {
    return (b.homeDate || '').localeCompare(a.homeDate || '');
  });
  var limit = parseInt(box.dataset.limit, 10);
  if (limit) list = list.slice(0, limit);
  if (!list.length) return;

  box.className = 'home-strip';
  box.innerHTML = list.map(function (cat) {
    var first = photosOf(cat)[0];
    var photo = first
      ? '<img src="images/' + first + PHOTO_V + '" alt="" loading="lazy">'
      : '<span aria-hidden="true">🐈</span>';
    return '<a class="home-chip" href="cat.html?id=' + cat.id + '">' +
             '<span class="home-photo">' + photo + '</span>' +
             '<span class="home-name">' + cat.name + '</span>' +
           '</a>';
  }).join('');

  dragToScroll(box);
  markOverflow(box);
  window.addEventListener('resize', function () { markOverflow(box); });
  box.addEventListener('scroll', function () { markOverflow(box); });
}

/* 一排放不下的時候，右邊顯示一塊漸層當提示；滑到底就收起來。
   （手機看得到捲軸、電腦看不到，不提示的話沒人知道後面還有。） */
function markOverflow(box) {
  var more = box.scrollWidth - box.clientWidth - box.scrollLeft > 8;
  // 提示的漸層貼在外層容器上。
  // 本來想用 CSS 的 :has() 讓外層自己判斷，但實測瀏覽器不會跟著重算，
  // 所以直接把 class 加在外層。
  var wrap = box.parentElement;
  if (wrap && wrap.classList.contains('home-strip-wrap')) {
    wrap.classList.toggle('has-more', more);
  }
}

/* 電腦沒有手指可以滑，所以讓滑鼠可以直接拖著跑。
   拖超過 4 像素就當成「在拖」，放開時不要觸發連結，
   不然每次拖完都會跳走。 */
function dragToScroll(box) {
  var down = false, moved = false, startX = 0, startLeft = 0;

  box.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') return;        // 手機維持原本的滑動
    down = true; moved = false;
    startX = e.clientX;
    startLeft = box.scrollLeft;
  });

  box.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 4) {
      moved = true;
      box.classList.add('is-dragging');
      box.setPointerCapture(e.pointerId);
    }
    if (moved) box.scrollLeft = startLeft - dx;
  });

  function end() {
    down = false;
    box.classList.remove('is-dragging');
    // 放開之後才把「剛剛在拖」的狀態清掉，click 才攔得到
    setTimeout(function () { moved = false; }, 0);
  }
  box.addEventListener('pointerup', end);
  box.addEventListener('pointercancel', end);

  box.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); }
  }, true);
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
    ? '<img src="images/' + src + PHOTO_V + '" alt="' + alt + '" loading="lazy">'
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
  var 已送養 = cat.status === 'home';

  // 故事可以是一段字串，也可以是好幾段（已送養的貓多半是好幾段）
  var story = cat.story || '';
  if (typeof story === 'string') story = (story && story !== '待貓窩提供') ? [story] : [];
  var storyHtml = story.length
    ? '<h3>' + (已送養 ? '牠的故事' : '牠的故事') + '</h3>' +
      story.map(function (t) { return '<p>' + t + '</p>'; }).join('')
    : '';

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
    (已送養
      ? '<p><a href="adopted.html">← 回到找到家的貓</a></p>'
      : '<p><a href="cats.html">← 回到等家的貓咪</a></p>') +
    '<div class="cols" style="align-items:start">' +
      photo +
      '<div>' +
        tag +
        '<h1 style="margin-top:.2em">' + cat.name + '</h1>' +
        (已送養 && cat.homeDate
          ? '<p class="story-date">' + homeDateLine(cat) + '</p>' : '') +
        (rows.length
          ? '<div class="card">' +
              rows.map(function (r) {
                return '<p style="margin:.3em 0"><b>' + r[0] + '</b>｜' + r[1] + '</p>';
              }).join('') +
            '</div>'
          : '') +
        storyHtml +
        videoBlock(cat) +
        (已送養 ? sourceLine(cat) : '') +
        (已送養
          ? '<p class="btn-row" style="margin-top:24px">' +
              '<a class="btn" href="cats.html">看看等家的貓咪</a>' +
              '<a class="btn-ghost" href="adopted.html">其他找到家的貓</a>' +
            '</p>'
          : '<p class="btn-row" style="margin-top:24px">' +
              '<a class="btn" href="adopt.html">先看領養流程</a>' +
              '<a class="btn-ghost" href="https://www.facebook.com/profile.php?id=100063882136906" target="_blank" rel="noopener">到 FB 私訊詢問</a>' +
            '</p>') +
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
    var linkBtn = '';
    if (n.link) {
      var defaultLabel = '查看詳情 →';
      if (n.link.indexOf('instagram.com') > -1) {
        defaultLabel = '前往 Instagram 查看詳情 →';
      } else if (n.link.indexOf('facebook.com') > -1) {
        defaultLabel = '前往 Facebook 查看原文 →';
      } else if (n.link.indexOf('accupass.com') > -1) {
        defaultLabel = '前往 Accupass 活動頁 →';
      }
      var label = n.linkText || defaultLabel;
      linkBtn = '<p class="news-action"><a class="news-link-btn" href="' + n.link + '" target="_blank" rel="noopener">' + label + '</a></p>';
    }

    var eventBox = '';
    if (n.event) {
      eventBox = '<div class="news-event-box">' +
        (n.event.time ? '<div class="news-event-row"><span class="news-event-icon">📅</span><strong>活動時間：</strong><span>' + n.event.time + '</span></div>' : '') +
        (n.event.location ? '<div class="news-event-row"><span class="news-event-icon">📍</span><strong>活動地點：</strong><span>' + n.event.location + '</span></div>' : '') +
        (n.event.fee ? '<div class="news-event-row"><span class="news-event-icon">🎫</span><strong>入場方式：</strong><span>' + n.event.fee + '</span></div>' : '') +
        (n.event.notes ? '<div class="news-event-row"><span class="news-event-icon">💡</span><strong>溫馨提醒：</strong><span>' + n.event.notes + '</span></div>' : '') +
      '</div>';
    }

    return '' +
      '<article class="news-item' + (n.demo ? ' is-demo' : '') + (n.featured ? ' is-featured' : '') + '">' +
        '<div class="news-head">' +
          '<time>' + n.date + '</time>' +
          (n.category ? '<span class="chip">' + n.category + '</span>' : '') +
          (n.featured ? '<span class="chip chip-accent">近期焦點活動</span>' : '') +
        '</div>' +
        '<h3>' + n.title + '</h3>' +
        eventBox +
        '<p class="news-body">' + (n.body || '').replace(/\n/g, '<br>') + '</p>' +
        linkBtn +
      '</article>';
  }).join('') : '<p class="lead">目前沒有消息。</p>';
}

/* ---------- 5. 公益商品（shop.html） ---------- */
var SHOP_STATUS = {
  on:   { text: '送養會現場限定', cls: 'tag-ok'   },
  soon: { text: '準備中',         cls: 'tag-wait' },
  out:  { text: '已售完',         cls: 'tag-done' }
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
      ? '<img src="images/' + it.photo + PHOTO_V + '" alt="' + it.name + '" loading="lazy">'
      : '<span aria-hidden="true">🎁</span>';
    return '' +
      '<div class="cat-card" style="cursor:default">' +
        '<div class="cat-photo">' + photo + '</div>' +
        '<div class="cat-body">' +
          '<span class="tag ' + s.cls + '">' + s.text + '</span>' +
          '<h3>' + it.name + '</h3>' +
          (it.price ? '<p class="price">' + it.price + '</p>' : '') +
          '<p class="cat-desc">' + (it.desc || '') + '</p>' +
          (it.link ? '<p style="margin-top:10px"><a href="' + it.link + '" target="_blank" rel="noopener">查看詳情 →</a></p>' : '') +
        '</div>' +
      '</div>';
  }).join('') : '<p class="lead">目前尚無商品資訊。</p>';
}

/* ---------- 6. 養貓小知識（tips.html、tip.html、首頁） ----------
   每一篇有兩種型態（寫在 data/tips.js 的 type）：
   handbook＝圖解手冊（一頁一張圖，進去是翻頁閱讀器）
   article ＝文字文章（進去是一般文章版面） */
function tipTypeLabel(t) {
  if (t.type === 'handbook') return '圖解手冊・' + (t.pages || []).length + ' 頁';
  return '文章';
}

function tipCoverImg(t, alt) {
  return t.cover
    ? '<img src="images/' + t.cover + PHOTO_V + '" alt="' + (alt || '') + '" loading="lazy">'
    : '<span aria-hidden="true">📖</span>';
}

function tipLabels(t, featured) {
  return '<div class="tip-labels">' +
    (featured ? '<span class="tip-badge">精選</span>' : '') +
    (t.category ? '<span class="chip">' + t.category + '</span>' : '') +
    '<span class="tip-type">' + tipTypeLabel(t) + '</span>' +
  '</div>';
}

// 依上架日期排，新的在前面
function tipsSorted() {
  return (window.TIPS_DATA.tips || []).slice().sort(function (a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });
}

function tipCard(t) {
  return '' +
    '<a class="cat-card tip-card" href="tip.html?id=' + t.id + '">' +
      '<div class="cat-photo tip-cover">' + tipCoverImg(t) + '</div>' +
      '<div class="cat-body">' +
        tipLabels(t) +
        '<h3>' + t.title + '</h3>' +
        '<p class="cat-desc">' + (t.summary || '') + '</p>' +
        (t.draft ? '<p class="draft-note">草稿・內容待查證</p>' : '') +
      '</div>' +
    '</a>';
}

// 頁面最上面的大卡片（featured: true 的那一篇）
function tipFeature(t) {
  var href = 'tip.html?id=' + t.id + '&' + PHOTO_V.slice(1);
  return '' +
    '<article class="tip-feature">' +
      '<a class="tip-feature-cover" href="' + href + '">' + tipCoverImg(t, t.title + ' 封面') + '</a>' +
      '<div class="tip-feature-body">' +
        tipLabels(t, true) +
        '<h2>' + t.title + '</h2>' +
        (t.subtitle ? '<p class="tip-sub">' + t.subtitle + '</p>' : '') +
        '<p>' + (t.summary || '') + '</p>' +
        '<div class="btn-row">' +
          '<a class="btn" href="' + href + '">' + (t.type === 'handbook' ? '開始閱讀' : '閱讀文章') + '</a>' +
          (t.pdf ? '<a class="btn-ghost" href="' + t.pdf + '" target="_blank" rel="noopener">下載 PDF</a>' : '') +
        '</div>' +
      '</div>' +
    '</article>';
}

function initTipList() {
  var box = document.getElementById('tip-list');
  if (!box || !window.TIPS_DATA) return;

  var all = tipsSorted();
  var limit = parseInt(box.dataset.limit, 10);

  // 首頁：只放最新的幾篇
  if (limit) {
    box.innerHTML = all.length
      ? all.slice(0, limit).map(tipCard).join('')
      : '<p class="lead">文章準備中。</p>';
    return;
  }

  var featBox = document.getElementById('tip-featured');
  var bar = document.getElementById('tip-filters');
  var more = document.getElementById('tip-more');
  var feat = all.filter(function (t) { return t.featured; })[0];

  // 分類篩選鈕：照文章裡出現過的分類自動產生，至少兩種分類才顯示
  var cats = [];
  all.forEach(function (t) {
    if (t.category && cats.indexOf(t.category) < 0) cats.push(t.category);
  });

  function render(f) {
    var showFeat = feat && f === 'all';
    if (featBox) featBox.innerHTML = showFeat ? tipFeature(feat) : '';
    var list = all.filter(function (t) {
      if (showFeat && t === feat) return false;
      return f === 'all' || t.category === f;
    });
    box.innerHTML = list.map(tipCard).join('');
    box.hidden = !list.length;
    if (more) more.hidden = list.length >= 3;
  }

  if (bar && cats.length >= 2) {
    bar.innerHTML = '<button class="on" data-filter="all">全部</button>' +
      cats.map(function (c) { return '<button data-filter="' + c + '">' + c + '</button>'; }).join('');
    bar.hidden = false;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button[data-filter]') : null;
      if (!btn) return;
      [].forEach.call(bar.querySelectorAll('button'), function (b) { b.classList.toggle('on', b === btn); });
      render(btn.dataset.filter);
    });
  }

  if (!all.length) {
    box.innerHTML = '<p class="lead">文章準備中。</p>';
    return;
  }
  render('all');
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
  var isBook = tip.type === 'handbook';

  box.innerHTML = '' +
    '<p><a href="tips.html">← 回到養貓小知識</a></p>' +
    tipLabels(tip) +
    '<h1 class="tip-h1">' + tip.title + '</h1>' +
    (tip.subtitle ? '<p class="tip-sub">' + tip.subtitle + '</p>' : '') +
    (tip.summary ? '<p class="lead">' + tip.summary + '</p>' : '') +
    (isBook
      ? handbookHTML(tip)
      : '<div class="article">' +
          (tip.body || []).map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        '</div>') +
    (tip.sources && tip.sources.length
      ? '<div class="card"><h3>資料來源</h3><ul>' +
        tip.sources.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
        '</ul></div>'
      : '') +
    (tip.draft
      ? '<div class="todo"><p>這篇是草稿，內容尚未依照三級來源制度查證，<b>不能對外公開</b>。</p></div>'
      : '') +
    '<div class="card tip-cta">' +
      '<h3>準備好了嗎？</h3>' +
      '<p>貓窩裡還有很多貓咪在等一個家。領養前有任何疑問，都歡迎私訊官方臉書。</p>' +
      '<div class="btn-row">' +
        '<a class="btn" href="cats.html">看看等家的貓咪</a>' +
        '<a class="btn-ghost" href="adopt.html">領養流程</a>' +
      '</div>' +
    '</div>';

  if (isBook) initHandbook(box.querySelector('.hb'), tip);
}

/* 圖解手冊閱讀器
   一頁一張圖：左右按鈕、鍵盤方向鍵、手機左右滑都可以翻頁。
   支援「橫向全畫面」模式：手機直立鎖定時自動 90 度旋轉鋪滿全螢幕。
   網址會記住看到第幾頁（tip.html?id=xxx#p5），可以直接分享某一頁。 */
function handbookPage(tip, i, small) {
  var n = (i + 1 < 10 ? '0' : '') + (i + 1);
  return 'images/' + tip.dir + (small ? 't' : 'p') + n + '.webp' + PHOTO_V;
}

function handbookHTML(tip) {
  var pages = tip.pages || [];
  return '' +
    '<div class="hb">' +
      '<div class="hb-stage">' +
        '<img class="hb-img" src="' + handbookPage(tip, 0) + '" alt="" width="1600" height="900">' +
        '<button class="hb-nav hb-prev" type="button" aria-label="上一頁">‹</button>' +
        '<button class="hb-nav hb-next" type="button" aria-label="下一頁">›</button>' +
        '<button class="hb-fs-enter" type="button" aria-label="橫向全畫面閱讀">⛶ 橫向全畫面</button>' +
        '<button class="hb-fs-exit" type="button" aria-label="結束全畫面">✕ 結束全畫面</button>' +
        '<span class="hb-fs-count">1 / ' + pages.length + '</span>' +
      '</div>' +
      '<div class="hb-bar">' +
        '<div class="hb-pager">' +
          '<button class="hb-step hb-prev" type="button" aria-label="上一頁">‹</button>' +
          '<span class="hb-count" aria-live="polite">1 / ' + pages.length + '</span>' +
          '<button class="hb-step hb-next" type="button" aria-label="下一頁">›</button>' +
          '<span class="hb-hint">左右滑動可以翻頁</span>' +
        '</div>' +
        '<div class="hb-tools">' +
          '<button class="hb-tool hb-tool-primary hb-fs-btn" type="button">⛶ 橫向全畫面</button>' +
          '<a class="hb-tool hb-zoom" href="' + handbookPage(tip, 0) + '" target="_blank" rel="noopener">看原圖</a>' +
          (tip.pdf ? '<a class="hb-tool" href="' + tip.pdf + '" target="_blank" rel="noopener">下載 PDF</a>' : '') +
        '</div>' +
      '</div>' +
      '<div class="hb-note">' +
        '<h2 class="hb-title"></h2>' +
        '<p class="hb-text"></p>' +
      '</div>' +
      '<h3 class="hb-toc-title">本冊目錄</h3>' +
      '<ol class="hb-thumbs">' +
        pages.map(function (p, i) {
          return '<li><button type="button" data-i="' + i + '">' +
            '<img src="' + handbookPage(tip, i, true) + '" alt="" loading="lazy" width="480" height="270">' +
            '<span><b>' + (i + 1) + '</b>' + p.title + '</span>' +
          '</button></li>';
        }).join('') +
      '</ol>' +
    '</div>';
}

function initHandbook(root, tip) {
  if (!root) return;
  var pages = tip.pages || [];
  var total = pages.length;
  var stage = root.querySelector('.hb-stage');
  var img = root.querySelector('.hb-img');
  var count = root.querySelector('.hb-count');
  var fsCount = root.querySelector('.hb-fs-count');
  var zoom = root.querySelector('.hb-zoom');
  var title = root.querySelector('.hb-title');
  var text = root.querySelector('.hb-text');
  var strip = root.querySelector('.hb-thumbs');
  var thumbs = strip.querySelectorAll('button');
  var prevs = root.querySelectorAll('.hb-prev');
  var nexts = root.querySelectorAll('.hb-next');
  var fsBtns = root.querySelectorAll('.hb-fs-enter, .hb-fs-btn');
  var fsExit = root.querySelector('.hb-fs-exit');
  var now = -1;
  var isFs = false;

  img.addEventListener('load', function () { img.classList.remove('is-loading'); });

  function syncRotation() {
    if (!isFs) {
      stage.classList.remove('is-rotated');
      return;
    }
    // 手機直立時（高 > 寬），自動將全畫面容器順時針轉 90 度鋪滿全螢幕
    var portrait = window.innerHeight > window.innerWidth;
    stage.classList.toggle('is-rotated', portrait);
  }

  function enterFs() {
    isFs = true;
    stage.classList.add('is-fs');
    document.body.classList.add('hb-lock');
    syncRotation();
    // 若瀏覽器支援原生全螢幕＋鎖定橫向（如 Android Chrome），一併嘗試啟用
    var req = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (req) {
      try {
        var p = req.call(stage);
        if (p && p.then) {
          p.then(function () {
            if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock('landscape').catch(function () {});
            }
            syncRotation();
          }).catch(function () {});
        }
      } catch (e) {}
    }
  }

  function exitFs() {
    if (!isFs) return;
    isFs = false;
    stage.classList.remove('is-fs', 'is-rotated', 'ui-hidden');
    document.body.classList.remove('hb-lock');
    var docFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (docFs) {
      var ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) { try { ex.call(document); } catch (e) {} }
    }
  }

  [].forEach.call(fsBtns, function (b) { b.addEventListener('click', enterFs); });
  fsExit.addEventListener('click', exitFs);
  window.addEventListener('resize', syncRotation);
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && isFs) {
      // 若使用者按系統返回鍵退出了原生全螢幕，一併結束全畫面狀態
      exitFs();
    } else {
      syncRotation();
    }
  });

  function go(i, first) {
    i = Math.max(0, Math.min(total - 1, i));
    if (i === now) return;
    now = i;
    var src = handbookPage(tip, i);
    if (img.getAttribute('src') !== src) {
      img.classList.add('is-loading');
      img.src = src;
    }
    img.alt = '第 ' + (i + 1) + ' 頁：' + pages[i].title;
    count.textContent = (i + 1) + ' / ' + total;
    fsCount.textContent = (i + 1) + ' / ' + total;
    zoom.href = src;
    title.textContent = 'p.' + (i + 1) + '　' + pages[i].title;
    text.textContent = pages[i].text || '';
    [].forEach.call(prevs, function (b) { b.disabled = i === 0; });
    [].forEach.call(nexts, function (b) { b.disabled = i === total - 1; });
    [].forEach.call(thumbs, function (b, k) {
      if (k === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    // 縮圖列捲到目前這頁（只捲縮圖列本身，不要讓整個頁面跳動）
    var cur = thumbs[i];
    if (cur && strip.scrollTo) {
      strip.scrollTo({
        left: cur.parentNode.offsetLeft - (strip.clientWidth - cur.offsetWidth) / 2,
        behavior: first ? 'auto' : 'smooth'
      });
    }
    // 先載好前後頁，翻頁時不用等
    [i - 1, i + 1].forEach(function (k) {
      if (k >= 0 && k < total) new Image().src = handbookPage(tip, k);
    });
    if (history.replaceState) history.replaceState(null, '', '#p' + (i + 1));
  }

  [].forEach.call(prevs, function (b) { b.addEventListener('click', function () { go(now - 1); }); });
  [].forEach.call(nexts, function (b) { b.addEventListener('click', function () { go(now + 1); }); });
  strip.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-i]') : null;
    if (b) go(parseInt(b.dataset.i, 10));
  });

  // 點擊圖片：未全畫面時直接進入橫向全畫面；全畫面下則切換顯示／隱藏控制鈕
  img.addEventListener('click', function () {
    if (isFs) stage.classList.toggle('ui-hidden');
    else enterFs();
  });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape' && isFs) { exitFs(); return; }
    if (e.key === 'ArrowLeft') go(now - 1);
    if (e.key === 'ArrowRight') go(now + 1);
  });

  // 手機滑動翻頁（自動適應 90 度旋轉全畫面與一般模式）
  var sx = 0, sy = 0, touching = false;
  stage.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { touching = false; return; }
    touching = true;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (!touching) return;
    touching = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - sx, dy = t.clientY - sy;
    if (stage.classList.contains('is-rotated')) {
      // 順時針轉 90 度時，使用者把手機橫拿左右滑＝螢幕原始座標的上下滑 (dy)
      if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        go(now + (dy < 0 ? 1 : -1));
      }
    } else {
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        go(now + (dx < 0 ? 1 : -1));
      }
    }
  }, { passive: true });

  var m = /^#p(\d+)$/.exec(location.hash);
  go(m ? parseInt(m[1], 10) - 1 : 0, true);
}

/* ---------- 7. 小遊戲（games.html） ---------- */
function initGames() {
  var box = document.getElementById('game-list');
  if (!box || !window.GAMES_DATA) return;

  var limit = parseInt(box.dataset.limit, 10);
  var list = (window.GAMES_DATA.games || []);
  if (limit) list = list.slice(0, limit);

  box.innerHTML = list.length ? list.map(function (g) {
    var cover = g.cover
      ? '<img src="images/' + g.cover + PHOTO_V + '" alt="' + g.name + '">'
      : '<span aria-hidden="true">' + (g.icon || '🎮') + '</span>';
    return '' +
      '<a class="cat-card" href="' + g.url + '" target="_blank" rel="noopener">' +
        '<div class="cat-photo">' + cover + '</div>' +
        '<div class="cat-body">' +
          '<span class="tag tag-ok">網頁遊戲・免下載</span>' +
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
  initPaw();
  initCatList();
  initAdoptedList();
  initAdoptedStrip();
  applyShopSwitch();
  initStats();
  initCatDetail();
  initNews();
  initShop();
  initTipList();
  initTipDetail();
  initGames();
});
