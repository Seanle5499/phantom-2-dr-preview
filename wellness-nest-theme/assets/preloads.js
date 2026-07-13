
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.LxWgrnBi.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.ByUGHuGk.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.BNBj0YWP.js","/cdn/shopifycloud/checkout-web/assets/c1/browser-legacy.CW9FRmOm.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts-legacy.C9Jds7SR.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-utilities-legacy.BFdwvjJz.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal-legacy._RFHoc7M.js","/cdn/shopifycloud/checkout-web/assets/c1/phone-phoneCountryCode-legacy.BNRvDLoM.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-shared-legacy.DIyTaPhv.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-unactionable-errors-legacy.Pi8yNHB2.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-ShopPayCheckoutSessionQuery-legacy.CRxTmHta.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors-legacy.DdCeV5Di.js","/cdn/shopifycloud/checkout-web/assets/c1/FullScreenBackground-legacy.CqFml-sj.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon-legacy.Bfupgm8k.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon-legacy.BW3R3WiF.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.CtXFf1Z_.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.CkensCZy.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer-legacy.BjRS8A3y.js","/cdn/shopifycloud/checkout-web/assets/c1/CrossBorderConsolidation-legacy.DrDEdQPf.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.9xsJkkfE.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.BqoXS4Ew.js","/cdn/shopifycloud/checkout-web/assets/c1/AmazonPayButton-legacy.BqmISrVr.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSubscribeMessenger-legacy.RRq7FYsL.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.DyFb8iLr.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine-legacy.C5B5ePw5.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.sO9G8xyi.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy._qvRH86l.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.Bpgp75eG.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.DGnHYXBW.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useReplaceShopPayInHistory-legacy.DX1PCYUV.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress-legacy.B-71yXDW.js","/cdn/shopifycloud/checkout-web/assets/c1/paypal-express-usePayPalPaymentErrorHandler-legacy.CiXMkiG_.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText-legacy.OXsUi8HM.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.CwwEQKvr.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.BSznWw4E.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.BLQlilap.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.KjRUgYNL.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.D0Bhq01j.js","/cdn/shopifycloud/checkout-web/assets/c1/FloatingPayButton-legacy.D6bIH6iv.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.DsiY9KmX.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-get-negotiation-input-legacy.8ESqMN65.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants-legacy.NSsBLwNu.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.DqdGxZe-.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.EC9ZXGWS.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions-legacy.CVNNYCwU.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.Cr8xhzzj.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.DXqJS4Oc.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options-legacy.DR_enM7G.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.BELPrasR.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.DmSP5_Ab.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension-legacy.D3LF5LVm.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions-legacy.Co0e1wtk.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets-legacy.Cd5Xmh3H.js","/cdn/shopifycloud/checkout-web/assets/c1/esm-browser-v4-legacy.On_frbc2.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner-legacy.CthMhW-F.js","/cdn/shopifycloud/checkout-web/assets/c1/Page-legacy.C-D02LEP.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0939/8075/4222/files/bloomin-new_x320.png?v=1755960809"];

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
  