
(function () {
  'use strict';

  // ===== Gallery: thumbnail click → swap main image =====
  var mainImg = document.getElementById('aapMainImg');
  var thumbs = document.querySelectorAll('.aap-thumb');
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () {
      thumbs.forEach(function (x) { x.classList.remove('is-active'); });
      t.classList.add('is-active');
      if (mainImg) mainImg.src = t.getAttribute('data-src');
      t.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    });
  });

  // ===== Gallery: scroll arrows =====
  var strip = document.getElementById('aapThumbs');
  var arrowL = document.querySelector('.aap-thumb-arrow--left');
  var arrowR = document.querySelector('.aap-thumb-arrow--right');
  if (strip && arrowL && arrowR) {
    var step = function () {
      var first = strip.querySelector('.aap-thumb');
      return first ? (first.offsetWidth + 8) * 3 : 240;
    };
    arrowL.addEventListener('click', function () {
      strip.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    arrowR.addEventListener('click', function () {
      strip.scrollBy({ left: step(), behavior: 'smooth' });
    });
    var updateArrows = function () {
      var canScroll = strip.scrollWidth > strip.clientWidth + 4;
      arrowL.style.visibility = canScroll ? 'visible' : 'hidden';
      arrowR.style.visibility = canScroll ? 'visible' : 'hidden';
    };
    updateArrows();
    window.addEventListener('resize', updateArrows);
  }

  // ===== Buy-now: skip cart page, go straight to /checkout =====
  // AJAX POST to /cart/add.js, then redirect. Falls back to normal submit on error.
  // Supports BOTH section-file variants: id="aapProductForm" OR class="ap-variant-form"
  var pForm = document.getElementById('aapProductForm')
             || document.querySelector('form.ap-variant-form[action="/cart/add"]')
             || document.querySelector('form[action="/cart/add"]');
  if (pForm) {
    pForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = pForm.querySelector('.aap-atc') || pForm.querySelector('.ap-cta') || pForm.querySelector('button[type="submit"]');
      var btnTextEl = btn ? (btn.querySelector('.aap-atc-text') || btn.querySelector('.ap-cta-text') || btn) : null;
      var origHTML = btnTextEl ? btnTextEl.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.8';
        if (btnTextEl) btnTextEl.innerHTML = 'ADDING...';
      }
      var fd = new FormData(pForm);
      fetch('/cart/add.js', {
        method: 'POST',
        body: fd,
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(function (r) {
        if (!r.ok) return r.text().then(function(t){ throw new Error('add-to-cart HTTP ' + r.status + ': ' + t); });
        return r.json();
      })
      .then(function () {
        window.location.href = '/checkout';
      })
      .catch(function (err) {
        console.error('Buy-now failed:', err);
        if (btn) {
          btn.disabled = false;
          btn.style.opacity = '';
          if (btnTextEl) btnTextEl.innerHTML = origHTML;
        }
        // Fallback: classic submit lands on cart page (better than nothing)
        pForm.submit();
      });
    });
  }

  // ===== Purchase Mode Toggle & Tier Selector =====
  var tiers = document.querySelectorAll('.aap-tier');
  var stickyPrice = document.getElementById('aapStickyPrice');
  var priceNew = document.getElementById('aapPriceNew');
  var priceOld = document.getElementById('aapPriceOld');
  var toggleBtns = document.querySelectorAll('.aap-toggle-btn');
  var aapQuantity = document.getElementById('aapQuantity');
  var aapSellingPlan = document.getElementById('aapSellingPlan');

  var currentMode = 'sub'; // 'otp' or 'sub'

  function updateAllTiers() {
    tiers.forEach(function (tier) {
      var prefix = currentMode === 'sub' ? 'sub' : 'otp';
      var price = tier.getAttribute('data-' + prefix + '-price');
      var oldPrice = tier.getAttribute('data-' + prefix + '-compare');
      var saveText = tier.getAttribute('data-' + prefix + '-save');

      var priceEl = tier.querySelector('.aap-tier-price');
      var oldEl = tier.querySelector('.aap-tier-old');
      var saveEl = tier.querySelector('.aap-tier-save');

      if (priceEl && price) priceEl.textContent = price;
      if (oldEl && oldPrice) oldEl.textContent = oldPrice;
      if (saveEl && saveText) saveEl.textContent = saveText;
    });
  }

  function selectTier(el) {
    tiers.forEach(function (x) { x.classList.remove('is-selected'); });
    el.classList.add('is-selected');
    var input = el.querySelector('input[type="radio"]');
    if (input) input.checked = true;

    // Update quantity
    var qty = el.getAttribute('data-qty');
    if (aapQuantity && qty) aapQuantity.value = qty;

    // Update selling plan
    var sellingPlanId = el.getAttribute('data-selling-plan-id');
    if (aapSellingPlan) {
      aapSellingPlan.value = currentMode === 'sub' ? sellingPlanId : '';
    }

    // Update price display
    var prefix = currentMode === 'sub' ? 'sub' : 'otp';
    var price = el.getAttribute('data-' + prefix + '-price');
    var oldVal = el.getAttribute('data-' + prefix + '-compare');
    if (price) {
      if (stickyPrice) stickyPrice.textContent = price;
      if (priceNew) priceNew.textContent = price;
    }
    if (oldVal && priceOld) {
      priceOld.textContent = oldVal;
    }
  }

  tiers.forEach(function (t) {
    t.addEventListener('click', function () { selectTier(t); });
  });

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.getAttribute('data-mode');
      if (mode === currentMode) return;
      currentMode = mode;
      toggleBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      updateAllTiers();
      var selected = document.querySelector('.aap-tier.is-selected') || tiers[0];
      if (selected) selectTier(selected);
    });
  });

  // Initial setup
  updateAllTiers();
  var initialSelected = document.querySelector('.aap-tier.is-selected') || tiers[0];
  if (initialSelected) selectTier(initialSelected);

  // ===== Sticky mobile CTA visibility =====
  var sticky = document.getElementById('aapSticky');
  var buybox = document.querySelector('.aap-buybox');
  if (sticky && buybox) {
    function onScroll() {
      if (window.innerWidth >= 768) { sticky.style.display = 'none'; return; }
      var r = buybox.getBoundingClientRect();
      sticky.style.display = r.bottom < 0 ? 'flex' : 'none';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
  // Sticky mobile CTA — submit selected variant + redirect to /checkout.
  var stickyBtn = document.getElementById('aapStickyBtn');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var form = document.getElementById('aapProductForm');
      if (form) form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    });
  }

  // ===== FAQ: close-others accordion =====
  var faqs = document.querySelectorAll('.aap-faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (x) { if (x !== d) x.open = false; });
    });
  });

  // ===== Testimonials: pagination dots (mobile) =====
  var reviewsRow = document.getElementById('aapReviews');
  var dotsHost = document.getElementById('aapReviewDots');
  if (reviewsRow && dotsHost) {
    var reviews = reviewsRow.querySelectorAll('.aap-review');
    // Build dots
    dotsHost.innerHTML = '';
    reviews.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to review ' + (i + 1));
      if (i === 0) b.classList.add('is-active');
      b.addEventListener('click', function () {
        reviews[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      });
      dotsHost.appendChild(b);
    });
    // Update active dot on scroll
    function updateDots() {
      if (window.innerWidth >= 768) return;
      var dots = dotsHost.querySelectorAll('button');
      var midpoint = reviewsRow.scrollLeft + reviewsRow.clientWidth / 2;
      var activeIdx = 0;
      reviews.forEach(function (r, i) {
        if (r.offsetLeft <= midpoint) activeIdx = i;
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === activeIdx);
      });
    }
    reviewsRow.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', updateDots);
    updateDots();
  }


  // === aap-buynow anchor → trigger form submit (skip /cart) ===
  document.querySelectorAll('.aap-buynow').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var form = document.getElementById('aapProductForm');
      if (!form) return; // let normal anchor scroll happen
      e.preventDefault();
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
    });
  });

})();
