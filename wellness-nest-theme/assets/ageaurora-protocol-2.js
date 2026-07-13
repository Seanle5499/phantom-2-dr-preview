
(function(){
  'use strict';

  var wrap = document.querySelector('.app-wrap');
  if (!wrap) return;

  /* ============ CONFIG ============ */
  var VARIANTS = {
    nmn:      51260550644027,
    urolithin: 51260952871227,
    peptides:  51260960244027
  };

  // Selling plan IDs from Recharge (10% off at each cadence)
  var SELLING_PLANS = {
    // combo qty => { nmn, urolithin, peptides }
    1: { nmn: 9862316347, urolithin: 9862218043, peptides: 9862414651 },  // 5 weeks
    3: { nmn: 9862349115, urolithin: 9862250811, peptides: 9862447419 },  // 14 weeks
    9: { nmn: 9862381883, urolithin: 9862283579, peptides: 9862480187 }   // 24 weeks
  };

  /* ============ GALLERY ============ */
  var mainImg = document.getElementById('appMainImg');
  var thumbs  = wrap.querySelectorAll('.app-thumb');
  var thumbsRow = document.getElementById('appThumbs');

  thumbs.forEach(function(btn){
    btn.addEventListener('click', function(){
      var src = btn.getAttribute('data-src');
      if (src && mainImg) mainImg.src = src;
      thumbs.forEach(function(b){ b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });

  var leftArrow  = wrap.querySelector('.app-thumb-arrow--left');
  var rightArrow = wrap.querySelector('.app-thumb-arrow--right');
  if (leftArrow && thumbsRow)  leftArrow.addEventListener('click', function(){ thumbsRow.scrollBy({left:-200,behavior:'smooth'}); });
  if (rightArrow && thumbsRow) rightArrow.addEventListener('click', function(){ thumbsRow.scrollBy({left: 200,behavior:'smooth'}); });

  /* ============ PURCHASE MODE TOGGLE ============ */
  var currentMode = 'otp'; // 'sub' or 'otp'
  var toggleBtns = wrap.querySelectorAll('.app-toggle-btn');

  toggleBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var mode = btn.getAttribute('data-mode');
      if (mode === currentMode) return;
      currentMode = mode;
      toggleBtns.forEach(function(b){ b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      updateAllTiers();
      var selected = wrap.querySelector('.app-tier.is-selected') || tiers[0];
      if (selected) selectTier(selected);
    });
  });

  /* ============ TIERS (BUNDLE SELECTION) ============ */
  var tiers = wrap.querySelectorAll('.app-tier');
  var priceNew  = document.getElementById('appPriceNew');
  var priceOld  = document.getElementById('appPriceOld');
  var priceSave = document.getElementById('appPriceSave');
  var stickyPrice = document.getElementById('appStickyPrice');

  function updateAllTiers(){
    tiers.forEach(function(tier){
      var prefix = currentMode === 'sub' ? 'sub' : 'otp';
      var price  = tier.getAttribute('data-' + prefix + '-price');
      var compare = tier.getAttribute('data-' + prefix + '-compare');
      var save   = tier.getAttribute('data-' + prefix + '-save');
      var cadence = tier.getAttribute('data-sub-cadence') || '';

      var priceEl = tier.querySelector('.app-tier-price');
      var oldEl   = tier.querySelector('.app-tier-old');
      var saveEl  = tier.querySelector('.app-tier-save');
      var cadEl   = tier.querySelector('.app-tier-cadence');

      if (priceEl && price) priceEl.textContent = price;
      if (oldEl && compare) oldEl.textContent = compare;
      if (saveEl && save)   saveEl.textContent = 'Save ' + save;
      if (cadEl) cadEl.textContent = currentMode === 'sub' ? 'Delivered ' + cadence : '';
    });
  }

  function selectTier(tier){
    tiers.forEach(function(t){ t.classList.remove('is-selected'); });
    tier.classList.add('is-selected');
    var radio = tier.querySelector('input[type=radio]');
    if (radio) radio.checked = true;

    var prefix = currentMode === 'sub' ? 'sub' : 'otp';
    var p   = tier.getAttribute('data-' + prefix + '-price');
    var po  = tier.getAttribute('data-' + prefix + '-compare');
    var save = tier.getAttribute('data-' + prefix + '-save');

    if (priceNew && p)   priceNew.textContent  = p;
    if (priceOld && po)  priceOld.textContent  = po;
    if (priceSave && save) priceSave.textContent = 'SAVE ' + save;
    if (stickyPrice && p) stickyPrice.textContent = p;
  }

  tiers.forEach(function(tier){
    tier.addEventListener('click', function(e){
      if (e.target.tagName === 'A') return;
      selectTier(tier);
    });
  });

  /* ============ ADD BUNDLE TO CART ============ */
  function getSelectedTier(){
    return wrap.querySelector('.app-tier.is-selected') || tiers[0];
  }

  function showToast(msg, isError){
    var existing = document.querySelector('.app-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.className = 'app-toast';
    t.textContent = msg;
    if (isError) t.style.background = '#b94a4a';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('is-show'); });
    setTimeout(function(){
      t.classList.remove('is-show');
      setTimeout(function(){ t.remove(); }, 250);
    }, 2200);
  }

  function buildCartItems(tier){
    var qty = parseInt(tier.getAttribute('data-qty'), 10) || 1;
    var items = [];

    ['peptides', 'nmn', 'urolithin'].forEach(function(key){
      var item = { id: VARIANTS[key], quantity: qty };

      // Attach selling plan for subscription mode
      if (currentMode === 'sub') {
        var plans = SELLING_PLANS[qty];
        if (plans && plans[key]) {
          item.selling_plan = plans[key];
        }
      }

      items.push(item);
    });

    return items;
  }

  function addBundleToCart(){
    var tier = getSelectedTier();
    if (!tier) return;

    var items = buildCartItems(tier);

    var atc = document.getElementById('appATC');
    if (atc) { atc.classList.add('is-loading'); atc.querySelector('.app-atc-text').textContent = 'ADDING...'; }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {'Content-Type':'application/json', 'Accept':'application/json'},
      body: JSON.stringify({ items: items })
    })
    .then(function(r){ return r.json().then(function(b){ return {ok:r.ok, body:b}; }); })
    .then(function(res){
      if (atc) { atc.classList.remove('is-loading'); atc.querySelector('.app-atc-text').textContent = 'CLAIM YOUR PROTOCOL'; }
      if (!res.ok) {
        showToast(res.body && res.body.description ? res.body.description : 'Could not add bundle', true);
        return;
      }
      showToast('Protocol added to cart ✓');
      setTimeout(function(){ window.location.href = '/checkout'; }, 800);
    })
    .catch(function(){
      if (atc) { atc.classList.remove('is-loading'); atc.querySelector('.app-atc-text').textContent = 'CLAIM YOUR PROTOCOL'; }
      showToast('Network error — try again', true);
    });
  }

  var atcBtn   = document.getElementById('appATC');
  var stickyBtn = document.getElementById('appStickyBtn');
  var buyNowBtn = document.getElementById('appBuyNow');

  if (atcBtn)    atcBtn.addEventListener('click',    function(e){ e.preventDefault(); addBundleToCart(); });
  if (stickyBtn) stickyBtn.addEventListener('click', function(e){ e.preventDefault(); addBundleToCart(); });
  if (buyNowBtn) buyNowBtn.addEventListener('click', function(e){ e.preventDefault(); addBundleToCart(); });

  /* ============ STICKY BAR: scroll-triggered + dropdown sync ============ */
  var sticky       = document.getElementById('appSticky');
  var stickySelect = document.getElementById('appStickySelect');

  // --- Show/hide sticky when main CTA scrolls out of view ---
  if (sticky && atcBtn && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          sticky.classList.remove('is-visible');
        } else {
          // only show when CTA is ABOVE viewport (scrolled past)
          if (entry.boundingClientRect.top < 0) {
            sticky.classList.add('is-visible');
          } else {
            sticky.classList.remove('is-visible');
          }
        }
      });
    }, { threshold: 0 });
    observer.observe(atcBtn);
  }

  // --- Build dropdown option labels with prices ---
  function updateStickyDropdown(){
    if (!stickySelect) return;
    var prefix = currentMode === 'sub' ? 'sub' : 'otp';
    tiers.forEach(function(tier){
      var qty = tier.getAttribute('data-qty');
      var opt = stickySelect.querySelector('option[value="' + qty + '"]');
      if (!opt) return;
      var title = tier.querySelector('.app-tier-title').textContent.trim();
      var price = tier.getAttribute('data-' + prefix + '-price');
      opt.textContent = title + ' — ' + price;
    });
    // sync selected value with main widget
    var selectedTier = wrap.querySelector('.app-tier.is-selected');
    if (selectedTier) {
      stickySelect.value = selectedTier.getAttribute('data-qty');
    }
  }

  // --- When dropdown changes, sync back to main widget ---
  if (stickySelect) {
    stickySelect.addEventListener('change', function(){
      var qty = stickySelect.value;
      tiers.forEach(function(tier){
        if (tier.getAttribute('data-qty') === qty) {
          selectTier(tier);
        }
      });
    });
  }

  // --- Patch selectTier to also sync dropdown ---
  var _origSelectTier = selectTier;
  selectTier = function(tier){
    _origSelectTier(tier);
    updateStickyDropdown();
  };

  // --- Patch toggle to also update dropdown labels ---
  var _origToggleHandler = null;
  toggleBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      // mode already updated by the earlier handler; just refresh dropdown
      setTimeout(updateStickyDropdown, 10);
    });
  });

  /* ============ INITIAL SYNC ============ */
  updateAllTiers();
  var initial = wrap.querySelector('.app-tier.is-selected') || tiers[0];
  if (initial) selectTier(initial);
  updateStickyDropdown();

})();
