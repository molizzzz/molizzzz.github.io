/* ==========================================================================
   计算机网络实验一 · 静态网页制作
   全站交互脚本（原生 JavaScript，无任何第三方依赖）
   功能：
     1. 明/暗主题切换（记忆在 localStorage）
     2. 导航栏自动高亮当前页
     3. 自动检测并显示当前网页的 HTTP 协议版本  ← 对应实验要求第 3 条
     4. 全屏封面页：页头随滚动由透明转为毛玻璃
     5. 返回顶部按钮
     6. 页脚年份自动更新
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. 明 / 暗主题切换 ---------- */
  var THEME_KEY = 'lab1-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      // 跟随操作系统的深色偏好
      saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);

    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ---------- 2. 导航栏高亮当前页 ---------- */
  function initNavHighlight() {
    // 取当前路径最后一段文件名，例如 "index.html"、"hometown.html"
    var last = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(function (link) {
      var target = link.getAttribute('href');
      if (target === last) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- 3. 检测 HTTP 协议版本 ---------- */

  // 把浏览器给出的 nextHopProtocol 转成人能读懂的名称
  function formatProtocol(proto) {
    switch (proto) {
      case 'h3':          return 'HTTP/3（基于 QUIC / UDP）';
      case 'hq':          return 'HTTP/2 over QUIC（实验性）';
      case 'h2':          return 'HTTP/2（基于 TCP）';
      case 'http/1.1':    return 'HTTP/1.1（基于 TCP）';
      case 'http/1.0':    return 'HTTP/1.0（基于 TCP）';
      default:            return proto ? proto : '未知';
    }
  }

  function detectHttpVersion() {
    // 本地双击打开时是 file:// 协议，不经过 HTTP，因此没有版本号
    if (location.protocol === 'file:') {
      return 'file:// 本地文件（未经过 HTTP）';
    }

    try {
      var entries = performance.getEntriesByType('navigation');
      var nav = entries && entries[0];
      // nextHopProtocol 表示本次导航实际协商使用的协议，如 "h2"、"h3"、"http/1.1"
      if (nav && nav.nextHopProtocol) {
        return formatProtocol(nav.nextHopProtocol);
      }
    } catch (e) { /* 老旧浏览器不支持，忽略 */ }

    // 兜底：从地址栏协议判断
    return location.protocol === 'https:'
      ? 'HTTPS（版本号无法读取，通常为 HTTP/2 或 HTTP/3）'
      : 'HTTP ' + location.protocol.replace(':', '');
  }

  function initHttpBadge() {
    var badge = document.querySelector('.http-badge');
    if (!badge) return;
    badge.textContent = '当前页面协议：' + detectHttpVersion();
  }

  /* ---------- 4. 返回顶部 ---------- */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 320);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 5. 全屏封面页：页头由透明转为毛玻璃 ---------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    // 只有带全屏封面的页面（<body class="has-hero">）才有这个效果
    if (!header || !document.body.classList.contains('has-hero')) return;

    function update() {
      // 临界点：封面刚好滚过页头时切换；提前 40px 触发，
      // 让 0.3s 的过渡动画在正文到达前就播完
      var threshold = window.innerHeight - header.offsetHeight - 40;
      header.classList.toggle('scrolled', window.scrollY > threshold);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- 6. 页脚年份 ---------- */
  function initYear() {
    document.querySelectorAll('.js-year').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- 统一初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavHighlight();
    initHttpBadge();
    initHeaderScroll();
    initToTop();
    initYear();
  });
})();
