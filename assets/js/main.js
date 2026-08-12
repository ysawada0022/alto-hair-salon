/**
 * ALTO - hair salon
 * main.js
 * -------------------------------------------------------
 * 1. no-js クラスの除去
 * 2. ヘッダーのスクロール制御
 * 3. ドロワーメニュー
 * 4. ページトップボタン
 * 5. Swiper（ヒーロー / お知らせ / お客様の声）
 * 6. ギャラリーの絞り込み
 * 7. AOS（スクロールアニメーション）
 * 8. 予約フォームのバリデーション
 */
(function () {
  'use strict';

  // 二重読み込み時に処理が重複しないようにする
  if (window.altoInitialized) return;
  window.altoInitialized = true;

  document.body.classList.remove('no-js');

  /* ------------------------------------------------------
     2. header
     ------------------------------------------------------ */
  var header = document.getElementById('js-header');
  var pagetop = document.getElementById('js-pagetop');

  function onScroll() {
    var scrolled = window.scrollY > 60;

    if (header && !header.classList.contains('header--solid')) {
      header.classList.toggle('header--scrolled', scrolled);
    }
    if (pagetop) {
      pagetop.classList.toggle('pagetop--show', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------
     3. drawer
     ------------------------------------------------------ */
  var drawerToggle = document.getElementById('js-drawer-toggle');
  var gnav = document.getElementById('js-gnav');

  function closeDrawer() {
    if (!drawerToggle || !gnav) return;
    drawerToggle.classList.remove('drawer-toggle--open');
    drawerToggle.setAttribute('aria-expanded', 'false');
    drawerToggle.setAttribute('aria-label', 'メニューを開く');
    gnav.classList.remove('header__nav--open');
    document.body.classList.remove('is-locked');
  }

  if (drawerToggle && gnav) {
    drawerToggle.addEventListener('click', function () {
      var isOpen = gnav.classList.toggle('header__nav--open');
      drawerToggle.classList.toggle('drawer-toggle--open', isOpen);
      drawerToggle.setAttribute('aria-expanded', String(isOpen));
      drawerToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.classList.toggle('is-locked', isOpen);
    });

    // ナビ内のリンクを押したら閉じる
    gnav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeDrawer();
    });

    // Esc キーで閉じる
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeDrawer();
    });

    // PC 幅に戻したときの状態リセット
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) closeDrawer();
    });
  }

  /* ------------------------------------------------------
     4. pagetop
     ------------------------------------------------------ */
  if (pagetop) {
    pagetop.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------
     5. Swiper
     ------------------------------------------------------ */
  if (typeof Swiper !== 'undefined') {
    if (document.getElementById('js-hero-slider')) {
      new Swiper('#js-hero-slider', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 1600,
        allowTouchMove: false,
        autoplay: { delay: 5500, disableOnInteraction: false }
      });
    }

    if (document.getElementById('js-news-slider')) {
      new Swiper('#js-news-slider', {
        loop: true,
        direction: 'vertical',
        height: 28,
        autoHeight: false,
        speed: 700,
        autoplay: { delay: 4000, disableOnInteraction: false }
      });
    }

    if (document.getElementById('js-voice-slider')) {
      new Swiper('#js-voice-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 700,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.voice-slider .swiper-pagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
    }
  }

  /* ------------------------------------------------------
     6. gallery filter
     ------------------------------------------------------ */
  var gallery = document.getElementById('js-gallery');

  if (gallery) {
    var filterButtons = gallery.querySelectorAll('.gallery__filter-btn');
    var galleryItems = gallery.querySelectorAll('.gallery__item');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.dataset.filter;

        filterButtons.forEach(function (other) {
          other.classList.toggle('gallery__filter-btn--active', other === button);
        });

        galleryItems.forEach(function (item) {
          var isMatch = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('gallery__item--hidden', !isMatch);
        });

        if (typeof AOS !== 'undefined') AOS.refresh();
      });
    });
  }

  /* ------------------------------------------------------
     7. AOS
     ------------------------------------------------------ */
  if (typeof AOS === 'undefined') {
    // CDN が読み込めなかった場合は属性を外して確実に表示する
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
  } else {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* ------------------------------------------------------
     8. reservation form (Bootstrap validation)
     ------------------------------------------------------ */
  var form = document.getElementById('js-reserve-form');

  if (form) {
    var result = document.getElementById('js-form-result');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        var invalid = form.querySelector(':invalid');
        if (invalid) invalid.focus();
        return;
      }

      // デモサイトのため送信は行わず、完了メッセージのみ表示する
      form.classList.remove('was-validated');
      form.reset();

      if (result) {
        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
})();
