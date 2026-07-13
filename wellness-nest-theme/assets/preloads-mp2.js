
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.LxWgrnBi.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.DcTGukvj.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.BUdrMALT.js","/cdn/shopifycloud/checkout-web/assets/c1/browser-legacy.B5EisdPQ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts-legacy.CY_GQoxP.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-utilities-legacy.CBeN-2FF.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal-legacy.C9tVSkv5.js","/cdn/shopifycloud/checkout-web/assets/c1/phone-phoneCountryCode-legacy.PlLE_7nj.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-shared-legacy.BFr9xImS.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-unactionable-errors-legacy.DIgFZFjT.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-ShopPayCheckoutSessionQuery-legacy.D7RUnfeU.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors-legacy.B8UnqABw.js","/cdn/shopifycloud/checkout-web/assets/c1/FullScreenBackground-legacy.Cg2HH8zE.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon-legacy.Bfupgm8k.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon-legacy.BW3R3WiF.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.CtXFf1Z_.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.DZaAL38t.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer-legacy.BXzwu4Fi.js","/cdn/shopifycloud/checkout-web/assets/c1/CrossBorderConsolidation-legacy.D2nSx88L.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.CUnfj0oH.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.Jx72dolO.js","/cdn/shopifycloud/checkout-web/assets/c1/AmazonPayButton-legacy.CUOVIKDn.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSubscribeMessenger-legacy.h2beOT19.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.uUnE1HE3.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine-legacy.DHFXBCAc.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.a5q0EYLO.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy.BDwn73eA.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.9rKzvHAw.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.Cn11SfbK.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useReplaceShopPayInHistory-legacy.DN_J0u2R.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress-legacy.BnZKZ8_P.js","/cdn/shopifycloud/checkout-web/assets/c1/paypal-express-usePayPalPaymentErrorHandler-legacy.BfX_kHzS.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText-legacy.CdVHc3l0.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.yTqoUPQE.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.CsQgaVxY.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.Eevz5W0K.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.JMbrv6P8.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.CvJMOc69.js","/cdn/shopifycloud/checkout-web/assets/c1/FloatingPayButton-legacy.DLE8mWGD.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.CX5708Vp.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-get-negotiation-input-legacy.DPyTZoVW.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants-legacy.B-3b03RO.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.DQZPdhtL.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.DTMKKy5O.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions-legacy.COcYZkeQ.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.WCGK2_m-.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.DhUNahbL.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options-legacy.OsMSoqwt.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.CdRPh95I.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.xigI5uzy.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension-legacy.C6SYr9OU.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions-legacy.DasE14gJ.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets-legacy.kjiJFm0J.js","/cdn/shopifycloud/checkout-web/assets/c1/esm-browser-v4-legacy.On_frbc2.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner-legacy.Zv0UWdRK.js","/cdn/shopifycloud/checkout-web/assets/c1/Page-legacy.D2Pbn4IV.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0658/6377/8456/files/trusted_by_2_000__satisfied_customer__1580_x_1080_px_-removebg-preview_x320.png?v=1753298211","https://cdn.shopify.com/s/files/1/0658/6377/8456/files/trusted_by_2_000_satisfied_customer_1880_x_1080_px_2000_x_400_px_2000x.png?v=1753298325"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  