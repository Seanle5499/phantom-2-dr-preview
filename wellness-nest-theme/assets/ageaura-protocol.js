
(function(){
  'use strict';

  var wrap = document.querySelector('.app-wrap');
  if (!wrap) return;

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

  /* ============ TIERS (BUNDLE SELECTION) ============ */
  var tiers = wrap.querySelectorAll('.app-tier');
  var priceNew  = document.getElementById('appPriceNew');
  var priceOld  = document.getElementById('appPriceOld');
  var priceSave = document.getElementById('appPriceSave');
  var stickyPrice = document.getElementById('appStickyPrice');

  function selectTier(tier){
    tiers.forEach(function(t){ t.classList.remove('is-selected'); });
    tier.classList.add('is-selected');
    var radio = tier.querySelector('input[type=radio]');
    if (radio) radio.checked = true;
    var p   = tier.getAttribute('data-price');
    var po  = tier.getAttribute('data-compare');
    var pct = tier.getAttribute('data-save-pct');
    if (priceNew && p)   priceNew.textContent  = p;
    if (priceOld && po)  priceOld.textContent  = po;
    if (priceSave && pct) priceSave.textContent = 'SAVE ' + pct + '%';
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

  function addBundleToCart(redirect){
    var tier = getSelectedTier();
    if (!tier) return;
    var itemsAttr = tier.getAttribute('data-items');
    if (!itemsAttr) { showToast('Bundle not configured', true); return; }
    var parsed;
    try { parsed = JSON.parse(itemsAttr); } catch(e) { showToast('Bundle parse error', true); return; }

    var atc = document.getElementById('appATC');
    if (atc) { atc.classList.add('is-loading'); atc.querySelector('.app-atc-text').textContent = 'ADDING...'; }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {'Content-Type':'application/json', 'Accept':'application/json'},
      body: JSON.stringify({ items: parsed })
    })
    .then(function(r){ return r.json().then(function(b){ return {ok:r.ok, body:b}; }); })
    .then(function(res){
      if (atc) { atc.classList.remove('is-loading'); atc.querySelector('.app-atc-text').textContent = 'CLAIM YOUR PROTOCOL'; }
      if (!res.ok) {
        showToast(res.body && res.body.description ? res.body.description : 'Could not add bundle', true);
        return;
      }
      showToast('Protocol added to cart ✓');
      if (redirect) {
        setTimeout(function(){ window.location.href = '/checkout'; }, 600);
      } else {
        setTimeout(function(){ window.location.href = '/checkout'; }, 800);
      }
    })
    .catch(function(){
      if (atc) { atc.classList.remove('is-loading'); atc.querySelector('.app-atc-text').textContent = 'CLAIM YOUR PROTOCOL'; }
      showToast('Network error — try again', true);
    });
  }

  var atcBtn   = document.getElementById('appATC');
  var stickyBtn = document.getElementById('appStickyBtn');
  var buyNowBtn = document.getElementById('appBuyNow');

  if (atcBtn)    atcBtn.addEventListener('click',    function(e){ e.preventDefault(); addBundleToCart(true);  });
  if (stickyBtn) stickyBtn.addEventListener('click', function(e){ e.preventDefault(); addBundleToCart(true);  });
  if (buyNowBtn) buyNowBtn.addEventListener('click', function(e){
    e.preventDefault();
    addBundleToCart(true);  // add selected tier, then jump to /checkout
  });

  /* Initial sync */
  var initial = wrap.querySelector('.app-tier.is-selected') || tiers[0];
  if (initial) selectTier(initial);

})();
