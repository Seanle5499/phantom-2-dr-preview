window.codebase = window.codebase || {};
// var scripts_url = 'http://localhost:3010';
var scripts_url = 'https://scripts.conversion.io';
// var server_url = 'http://localhost:4000/api/v1';
var server_url = 'https://api.conversion.io/api/v1';
var browser = (function () {
  var userAgent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  var cachedResult = null;
  function match(pattern, index = 1) {
    var result = userAgent.match(pattern);
    return (result && result.length > index && result[index]) || '';
  }
  const browserPatterns = [
    { name: 'Edge', key: 'edge', regex: /edg([ea]|ios)\/(\d+(\.\d+)?)/i },
    {
      name: 'Opera',
      key: 'opera',
      regex: /(?:opera|opr|opios)[\/](\d+(\.\d+)?)/i,
    },
    {
      name: 'Chrome',
      key: 'chrome',
      regex: /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i,
    },
    { name: 'Safari', key: 'safari', regex: /version\/(\d+(\.\d+)?).*safari/i },
    {
      name: 'Firefox',
      key: 'firefox',
      regex: /(?:firefox|iceweasel|fxios)[\/](\d+(\.\d+)?)/i,
    },
    {
      name: 'Samsung Internet',
      key: 'samsungBrowser',
      regex: /SamsungBrowser\/(\d+(\.\d+)?)/i,
    },
    {
      name: 'Internet Explorer',
      key: 'msie',
      regex: /(?:msie |rv:)(\d+(\.\d+)?)/i,
    },
  ];
  const osPatterns = [
    { name: 'Windows', key: 'windows', regex: /windows nt (\d+\.\d+)/i },
    { name: 'MacOS', key: 'mac', regex: /mac os x (\d+([_\.]\d+)?)/i },
    { name: 'Android', key: 'android', regex: /android[ \/](\d+(\.\d+)?)/i },
    { name: 'iOS', key: 'ios', regex: /os (\d+([_\.]\d+)*) like mac os x/i },
  ];
  function detectBrowser() {
    if (cachedResult) return cachedResult;
    for (let browser of browserPatterns) {
      let version = match(browser.regex, 1);
      if (version) {
        cachedResult = { name: browser.name, version, [browser.key]: true };
        return cachedResult;
      }
    }
    cachedResult = { name: 'Unknown', version: '0' };
    return cachedResult;
  }
  function detectOS() {
    for (let os of osPatterns) {
      let version = match(os.regex, 1).replace(/_/g, '.');
      if (version) {
        return { name: os.name, version, [os.key]: true };
      }
    }
    return { name: 'Unknown', version: '0' };
  }

  function isModernBrowser(browser) {
    const version = parseFloat(browser.version);
    return (
      (browser.chrome && version >= 20) ||
      (browser.firefox && version >= 20) ||
      (browser.safari && version >= 6) ||
      (browser.edge && version >= 10) ||
      (browser.opera && version >= 10)
    );
  }
  function BrowserDetector() {
    const browser = detectBrowser();
    const os = detectOS();
    return {
      ...browser,
      ...os,
      modern: isModernBrowser(browser),
    };
  }
  return BrowserDetector();
})();
(async function (w, d, c) {
  'use strict';
  if (typeof w.codebase === 'object' && w.codebase.iid) {
    // c.log("Conversion APP running");
  } else {
    c.log(
      '%c Conversion APP is not running because iid is not set, please check the snippet or remove it from the page if you are not using it.',
      'background: red; color: #fff; padding: 4px; border-radius: 4px;',
    );
    return;
  }
  // Prevent double execution of the script
  if (w.codebase._initialized) {
    c.warn('Conversion APP already initialized, skipping duplicate execution');
    return;
  }
  w.codebase._initialized = true;

  // generate random id for api call versionining
  if (!w.codebase.apiCallId) {
    w.codebase.apiCallId = Math.floor(Math.random() * 1000000);
  }
  // let scripts_url = new URL(document.currentScript.src).origin;
  // const apiUrl = scripts_url.includes('conversion.io')
  //   ? `${scripts_url.replace('scripts', 'api')}/api/v1`
  //   : 'https://codebase-ab-testing-server-nhnpr.ondigitalocean.app/api/v1';
  let apiUrl = server_url;

  // Cache to prevent duplicate API calls
  let dataCache = null;

  async function loadData() {
    if (!window.codebase.iid) return;

    // Return cached data if available
    if (dataCache) {
      return dataCache;
    }

    try {
      const response = await fetch(`${apiUrl}/test/${window.codebase.iid}`);
      if (!response.ok) {
        return {
          config: null,
          data: null,
        };
      }
      const data = await response.json();
      const { config, ...rest } = data;
      const result = {
        config,
        data: rest,
      };

      // Cache the result
      dataCache = result;
      return result;
    } catch (error) {
      return {
        config: null,
        data: null,
      };
    }
  }
  const {
    config = {
      doNotTrackUser: false,
      goalsEnabled: true,
      isPreview: false,
      liveEventListenersSet: false,
      logDomain: '',
      optedOut: false,
      storage: 'default',
    },
    data,
  } = await loadData();
  if (!data) {
    c.error('Conversion App - Error loading data for:', window.codebase.iid);
    return;
  }
  var Script = {
    version: '3.0.0',
    revision: 1,
    tempEventStorage: [],
    previewCombinations: [],
    formerlyPushedGoals: [],
    mutationObservers: [],
    /** Bumped in resetMutationObservers so waitForElementOnce callbacks never run after a full Script reset. */
    _waitOnceEpoch: 0,
    intersectionObservers: [],
    pollIntvs: [],
    activePages: [],
    activeExperiments: {},
    pingedGoals: [],
    isReInited: false,
    spaRouteObserverInitialized: false,
    eventHandlers: {},
    projectData: {},
    firedInteractions: (w.__codebaseFiredInteractions = w.__codebaseFiredInteractions || new Set()),
    ...config,
    init: function (projectData) {
      // Experiments that have their own page_targeting use it directly for URL/page matching
      const experimentsWithPageTargeting = new Set(
        projectData.experiments
          .filter((exp) => exp.page_targeting && exp.page_targeting.iid)
          .map((exp) => exp.iid),
      );

      // Build one page entry per experiment from its page_targeting
      const pageTargetingPages = projectData.experiments
        .filter((exp) => exp.page_targeting && exp.page_targeting.iid)
        .map((exp) => {
          const pt = exp.page_targeting;
          const relatedGoals = (projectData.goals || [])
            .filter((goal) => goal.pages && goal.pages.some((p) => p.iid === pt.iid))
            .map((goal) => goal.iid);
          return {
            ...pt,
            experiments: [exp.iid],
            goals: relatedGoals,
            conditionsMatchType: exp.pages_match_type || 'OR',
          };
        });

      // Shared pages as fallback for experiments that have no page_targeting
      const usedPageIds = new Set();
      projectData.experiments.forEach((exp) => {
        if (experimentsWithPageTargeting.has(exp.iid)) return;
        if (exp.pages) {
          exp.pages.forEach((page) => {
            if (page) usedPageIds.add(typeof page === 'string' ? page : page.iid);
          });
        }
      });
      const sharedPages = (projectData.pages || [])
        .filter((page) => usedPageIds.has(page.iid))
        .map((page) => {
          const relatedExperiments = projectData.experiments
            .filter(
              (exp) =>
                !experimentsWithPageTargeting.has(exp.iid) &&
                exp.pages &&
                exp.pages.some((p) => (typeof p === 'string' ? p : p.iid) === page.iid),
            )
            .map((exp) => exp.iid);
          const relatedGoals = (projectData.goals || [])
            .filter((goal) => goal.pages && goal.pages.some((p) => p.iid === page.iid))
            .map((goal) => goal.iid);
          return {
            ...page,
            experiments: relatedExperiments,
            goals: relatedGoals,
          };
        })
        .filter((page) => page.experiments.length > 0);

      const pages = [...pageTargetingPages, ...sharedPages];

      this.projectData = {
        ...projectData,
        iid: w.codebase.iid,
        pages,
      };
      this.handleEditor();
      this.handleDebugMode();
      this.handlePreview();
      this.handleQaTool();
      this.handleSetBucketing();
      this.handleOptOut();
      this.handleDoNotTrack();
      if (System.logEnabled) {
        const style1 = 'background-color: #009955; border: 2px solid #009955; color: white;';
        c.groupCollapsed(
          '%cConversion APP # Initiated SNIPPET with Revision',
          style1,
          this.revision,
        );
        // c.log("snippetVersion", this.version);
        // c.log("revision", this.revision);
        c.log('goalsEnabled', this.goalsEnabled);
        c.log('isPreview', this.isPreview);
        c.log('optedOut', this.optedOut);
        c.log(
          'active',
          this.active,
          this.active
            ? '✅ New users can be bucketed'
            : '⏸️ Paused - Only existing users see variations',
        );
        // c.log("trackerUrl", this.logDomain);
        // VB: changes cookie to localStorage
        c.log('storage', Storage.getStorage(this.projectData.storage, true));
        // c.log("storage", Storage.getStorage("localStorage", true));
        // VB: changes cookie to localStorage
        c.groupEnd();
      }
    },
    isNotABot: function () {
      const isBot = /bot|google|crawler|spider|robot|crawling/i.test(navigator.userAgent);
      isBot && System.log('info', 0, 'Rated as Bot - Exiting');
      return !isBot;
    },
    generalPrerequisitesMet: function (silent) {
      if (!this.projectData.rules) return true;

      const result = System.jsConditionReturnsTrue(this.projectData.rules);

      if (!silent) {
        System.log('info', 0, `General Prerequisite Rules ${result ? 'met' : 'NOT met'}`);
      }

      return result;
    },
    trackingPrerequisitesMet: function (silent) {
      if (!this.projectData.rules_tracking) return true;
      const result = System.jsConditionReturnsTrue(this.projectData.rules_tracking);

      if (!silent) {
        System.log('info', 0, `Tracking Prerequisite Rules ${result ? 'met' : 'NOT met'}`);
      }

      return result;
    },
    resetMutationObservers: function () {
      this._waitOnceEpoch = (this._waitOnceEpoch || 0) + 1;
      this.mutationObservers.forEach((observer) => observer.disconnect());
      this.mutationObservers = [];
    },

    resetIntersectionObservers: function () {
      this.intersectionObservers.forEach((observer) => observer.disconnect());
      this.intersectionObservers = [];
    },

    resetPollingIntervals: function () {
      this.pollIntvs.forEach((interval) => clearInterval(interval));
      this.pollIntvs = [];
    },
    run: function () {
      User.init();
      // Reset observers and intervals
      ['resetMutationObservers', 'resetIntersectionObservers', 'resetPollingIntervals'].forEach(
        (method) => this[method](),
      );
      // Check prerequisites before proceeding
      Project.runHelperJs();
      Project.runDefaultJs();
      if (!this.generalPrerequisitesMet() || !this.isNotABot()) return;
      if (this.optedOut || this.doNotTrackUser) return;
      // Handle tracking if prerequisites are met
      if (this.trackingPrerequisitesMet()) this.handleTempEvents();
      // Execute core logic
      this.applyAntiFlicker();
      this.main();
      this.removeAntiFlicker();
      this.fireHandler('lifecycleEnd');
    },
    handleTempEvents: function () {
      var tempEvents = Script.tempEventStorage;
      if (tempEvents.length) {
        System.log('info', 1, 'Previously saved events are sent', tempEvents);
        tempEvents.forEach(function (event) {
          EventQueue.add(event);
        });
      }
    },
    handleDebugMode: function () {
      if (!this.projectData.debug) return;
      if (this.projectData.restrict_debug) {
        const urlParam = Tools.getUrlParameter(System.urlParamPrefix + 'show_debug');
        const storageKey = System.storagePrefix + 'show_debug';

        if (urlParam) {
          urlParam === 'true'
            ? Storage.set('sessionStorage', storageKey, 'true', true)
            : Storage.remove('sessionStorage', storageKey, true);
        }

        if (Storage.get('sessionStorage', storageKey, true) !== 'true') return;
      }
      System.enableLog();
    },
    handlePreview: function () {
      const storageKey = System.storagePrefix + 'preview_combs';
      let previewCombinationFormUrlJson = Tools.getUrlParameter(System.urlParamPrefix + 'preview');
      if (previewCombinationFormUrlJson) {
        if (!previewCombinationFormUrlJson.startsWith('[')) {
          previewCombinationFormUrlJson = `["${previewCombinationFormUrlJson
            .split(',')
            .join('","')}"]`;
        }
        Storage.set(Script.storage, storageKey, previewCombinationFormUrlJson);
      }
      try {
        const previewCombinationsJson = Storage.get(Script.storage, storageKey, true);
        this.previewCombinations = JSON.parse(previewCombinationsJson || '[]');

        if (this.previewCombinations.length) {
          this.setPreviewMode();
        }
      } catch (e) {
        c.error('PREVIEW: Unable to parse the Preview Input');
      }
    },
    setEditorMode: function (editorToken) {
      const eas = [
        {
          type: 'js',
          url: `${scripts_url}/conversionassetsv3/conversion-editor.js`,
        },
        {
          type: 'css',
          url: `${scripts_url}/conversionassetsv3/conversion-editor.css`,
        },
      ];
      eas.forEach((asset) => {
        const loadMethod = asset.type === 'js' ? Tools.loadExternalJs : Tools.loadExternalCss;
        loadMethod(asset.url);
      });
    },
    handleMessage: function (event) {
      const storageKey = System.storagePrefix + 'editor';
      const url = new URL(window.location.href);
      const getTokenFromUrl = Tools.getUrlParameter(storageKey);
      if (!System.allowedOrigins.includes(event.origin)) return;
      const { type, token } = event.data;
      if (type === 'AUTH_TOKEN') {
        if (token) {
          Storage.set('sessionStorage', storageKey, token);
          this.setEditorMode(token);
          return;
        }
        url.searchParams.delete(storageKey);
        window.history.replaceState({}, '', url);
      }
    },
    handleEditor: function () {
      const editorKey = System.storagePrefix + 'editor';
      const debugKey = System.urlParamPrefix + 'debug';
      const url = new URL(window.location.href);
      const getTokenFromUrl = Tools.getUrlParameter(editorKey);
      if (getTokenFromUrl) {
        Storage.set('sessionStorage', editorKey, getTokenFromUrl, true);
        Storage.remove(Script.storage, debugKey);
        url.searchParams.delete(editorKey);
        url.searchParams.delete(debugKey);
        window.history.replaceState({}, '', url);
      }

      const editorToken = Storage.get('sessionStorage', editorKey, true);
      if (editorToken) {
        Storage.remove(Script.storage, debugKey);
        this.setEditorMode(editorToken);
        return;
      }
      window.addEventListener('message', this.handleMessage.bind(this));
    },
    handleQaTool: function () {
      const storageKey = System.storagePrefix + 'debug';
      const qaTokenFromUrl = Tools.getUrlParameter(System.urlParamPrefix + 'debug');
      if (qaTokenFromUrl) {
        Storage.set(Script.storage, storageKey, qaTokenFromUrl);
      }
      const qaToken = Storage.get(Script.storage, storageKey);
      if (qaToken) {
        this.isQaMode = true;
        this.setQaMode(qaToken);
      }
    },
    handleSetBucketing: function () {
      const setBucketingFromUrl = Tools.getUrlParameter(System.urlParamPrefix + 'set_bucketing');

      if (setBucketingFromUrl) {
        try {
          const bucketArr = JSON.parse(setBucketingFromUrl);
          if (Array.isArray(bucketArr)) {
            const bucketObj = bucketArr.reduce((acc, item) => {
              const [key, value] = item.split('_');
              acc[key] = value;
              return acc;
            }, {});
            // console.log(bucketObj, "bucketObj");
            Storage.set('cookie', System.storagePrefix + 'exps', JSON.stringify(bucketObj));
          }
        } catch (e) {
          console.error('Error parsing bucketing data:', e);
        }
      }
    },
    setPreviewMode: function () {
      this.isPreview = true;
      this.goalsEnabled = false;
    },
    setQaMode: function (qaToken) {
      if (!qaToken || qaToken === undefined || qaToken === null) return;
      Tools.domLoaded(() => {
        const loadAssets = [
          {
            type: 'js',
            url: `${scripts_url}/conversionassetsv3/abtestingqatool.js`,
          },
          {
            type: 'css',
            url: `${scripts_url}/conversionassetsv3/conversion-editor.css`,
          },
        ];
        loadAssets.forEach((asset) => {
          const loadMethod = asset.type === 'js' ? Tools.loadExternalJs : Tools.loadExternalCss;
          loadMethod(asset.url);
        });
      });
    },
    getVariationsOfExperiment: function (experiment) {
      return experiment.variations?.map((t) => ({
        iid: t.iid,
        name: t.name,
        experiment: experiment.iid,
      }));
    },
    getUrlTypeDescription: function (url_type, conditionMatches) {
      const matchNotMatchedText = conditionMatches ? 'matched' : 'not matched';
      switch (url_type) {
        case 'destination_redirect':
          return 'should redirect to';
        case 'substring':
          return `${matchNotMatchedText} the sub string`;
        case 'simple':
          return `${matchNotMatchedText} the simple string`;
        case 'regex':
          return `${matchNotMatchedText} the regular expression`;
        default:
          return url_type;
      }
    },
    getVariationIdToPreviewByExperiment: function (experiment) {
      if (!Script.isPreview) return false;
      for (let previewCombination of this.previewCombinations) {
        let [combinationExperimentId, combinationVariationId] = previewCombination.split('_');

        if (
          combinationExperimentId === experiment.data.iid &&
          experiment.variationIdExists(combinationVariationId)
        ) {
          if (!experiment.silent) {
            System.log('info', 2, 'Starting Preview Mode', combinationVariationId);
          }
          this.setPreviewMode();
          return combinationVariationId;
        }

        if (combinationExperimentId === experiment.data.iid) {
          c.error(
            `PREVIEW: Variation ${combinationVariationId} does not exist for Experiment ${combinationExperimentId}`,
          );
        }
      }

      return false;
    },
    handleOptOut: function () {
      const urlParam = Tools.getUrlParameter(System.urlParamPrefix + 'opt_out');
      const storageKey = System.storagePrefix + 'opt_out';

      if (urlParam) {
        const actionMessage =
          urlParam === 'true'
            ? 'You have successfully opted out of Conversion APP for this domain.'
            : urlParam === 'false'
              ? 'You have successfully opted in for Conversion APP for this domain.'
              : null;

        if (actionMessage) {
          urlParam === 'true'
            ? Storage.set(Script.storage, storageKey, 'true')
            : Storage.remove(Script.storage, storageKey);

          alert(actionMessage);
        }
      }
      this.optedOut = Storage.get(Script.storage, storageKey) === 'true';
    },
    handleDoNotTrack: function () {
      if (this.projectData.adhere_dnt && navigator.doNotTrack == 1) {
        this.doNotTrackUser = true;
      }
    },
    applyAntiFlicker: function () {
      var _self = this;
      if (!this.projectData.use_antiflicker) return;

      const html = d.getElementsByTagName('HTML')[0];
      html.style.visibility = 'hidden';

      setTimeout(this.removeAntiFlicker.bind(this), 2000);
    },
    removeAntiFlicker: function () {
      if (!this.projectData.use_antiflicker) return;

      const html = d.getElementsByTagName('HTML')[0];
      html.style.visibility = 'visible';
    },
    fireHandler: function (handler) {
      Script.eventHandlers[handler]?.();
    },
    getProjectData: function () {
      return this.projectData;
    },
    prepareEvent: function (senderObj, variationIdsContext) {
      var eventObj = {
        type: senderObj.data.type,
      };
      eventObj.value = 0;
      if (senderObj.data.hasOwnProperty('value')) {
        eventObj.value = senderObj.data.value;
      }
      if (senderObj.className === 'goal') {
        eventObj.goal = {};
        eventObj.goal.iid = senderObj.data.iid;
        eventObj.goal.variations = variationIdsContext;
      }
      return eventObj;
    },
    getExperimentsVariationIds: function () {
      if (!Project.hasOwnProperty('data')) return [];
      return Project.data.experiments.flatMap((exp) => exp.variations.map((v) => v.iid));
    },

    getCleanedUserBucket: function () {
      const cleanedUserExperimentsBucket = User.getExperimentsBucket();
      const cleanedUserBucket = {};
      const allVariationIds = this.getExperimentsVariationIds();

      for (const expId in cleanedUserExperimentsBucket) {
        const varId = cleanedUserExperimentsBucket[expId];
        if (varId !== 0 && allVariationIds.includes(varId)) {
          cleanedUserBucket[expId] = varId;
        }
      }
      return cleanedUserBucket;
    },
    getCleanedUserBucketVariationIds: function () {
      return Object.values(this.getCleanedUserBucket());
    },
    sendEvents: function (eventUser, events) {
      var postObj = {
        projectId: this.projectData.iid,
        source: 'codebase-snippet',
        snippetVersion: this.version,
        user: eventUser,
        events: events,
      };
      var postUrl = this.logDomain;
      if (postUrl && postUrl !== '') {
        var request = new XMLHttpRequest();
        request.open('POST', postUrl, true);
        request.send(JSON.stringify(postObj));
      }
    },
    processEvents: function (events) {
      const client_id = Tools.getCookie('_ga');
      const eventUser = {
        experimentsBucket: this.getCleanedUserBucket(),
        attributes: { ...User.attributes, client_id },
      };

      if (Object.keys(eventUser.experimentsBucket).length === 0) {
        EventQueue.clear();
        return;
      }

      const integrationEvents = [];
      const eventsToSend = [];

      events.forEach((event) => {
        (event.type === 'integration' ? integrationEvents : eventsToSend).push(event);
      });

      if (eventsToSend.length) {
        this.sendEvents(eventUser, eventsToSend);
      }

      if (integrationEvents.length) {
        integrationEvents.forEach((event) => {
          const experiment = new Experiment(
            Script.getExperimentById(event.data.experimentId),
            true,
          );
          const variation = new Variation(event.data.variationId, true);
          const integration = Script.getIntegrationByTypeAndId(
            event.integration.type,
            event.integration.iid,
          );
          if (integration) {
            integration.run(Project, experiment, variation);
          }
        });
      }
      EventQueue.removeEventsFromQueue(events);
    },
    getGoalByApiName: function (apiName) {
      var goals = this.projectData.goals;
      for (var i = 0; i < goals.length; i++) {
        var goal = goals[i];
        if (goal.api_name === apiName) {
          return goal;
        }
      }
      return false;
    },
    getGoalById: function (goalId) {
      // goalId = parseInt(goalId);
      var goals = this.projectData.goals;
      for (var i = 0; i < goals.length; i++) {
        var goal = goals[i];
        if (goal.iid === goalId) {
          return goal;
        }
      }
      return false;
    },
    getPageByApiName: function (apiName) {
      var pages = this.projectData.pages;
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (page.api_name === apiName) {
          return page;
        }
      }
      return false;
    },
    getPageById: function (pageId) {
      // pageId = parseInt(pageId);
      var pages = this.projectData.pages;
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (page.iid === pageId) {
          return page;
        }
      }
      return false;
    },
    getAudienceById: function (audienceId) {
      var audiences = this.projectData.audiences;
      for (var i = 0; i < audiences.length; i++) {
        var audience = audiences[i];
        if (audience.iid === audienceId) {
          return audience;
        }
      }
    },
    getExperimentById: function (experimentId) {
      // experimentId = parseInt(experimentId);
      var experiments = this.projectData.experiments;
      for (var i = 0; i < experiments.length; i++) {
        var experiment = experiments[i];
        if (experiment.iid === experimentId) {
          return experiment;
        }
      }
      return false;
    },
    getExperimentByVariationId: function (variationId) {
      var experiments = this.projectData.experiments;
      for (var i = 0; i < experiments.length; i++) {
        var variations = experiments[i].variations;
        for (var j = 0; j < variations.length; j++) {
          var variation = variations[j];
          if (variation.iid === variationId) {
            return experiments[i];
          }
        }
      }
      return false;
    },
    getVariationById: function (variationId) {
      var experiments = this.projectData.experiments;
      for (var i = 0; i < experiments.length; i++) {
        var variations = experiments[i].variations;
        for (var j = 0; j < variations.length; j++) {
          var variation = variations[j];
          if (variation.iid === variationId) {
            return variation;
          }
        }
      }
      return false;
    },
    getIntegrationByTypeAndId: function (type, id) {
      var integrations = Script.projectData[type + '_integrations'];
      for (var i = 0; i < integrations.length; i++) {
        if (integrations[i].iid === id) {
          return new Integration(integrations[i]);
        }
      }
      return false;
    },
    carriesExperiment: function (experimentIdLookup) {
      // experimentIdLookup = parseInt(experimentIdLookup);
      var experiments = this.projectData.experiments;
      for (var i = 0; i < experiments.length; i++) {
        if (experiments[i].iid === experimentIdLookup) {
          return true;
        }
      }
      return false;
    },
    getActiveClickGoals: function () {
      return Script.activePages.flatMap((pageId) => {
        const page = this.getPageById(pageId);
        return page.goals
          .map((goalId) => this.getGoalById(goalId))
          .filter((goal) => goal.type === 'click');
      });
    },
    describeAudienceRule: function (cond, isMatch) {
      const type = cond.type || '';
      const rulesValue = cond.rules_value || '';
      const rule = cond.rules_js || '';
      const metaData = cond?.metadata?.operator || 'equals';

      if (type === 'device_type') {
        return {
          ruleDescription: metaData,
          currentValue: User.attributes.device_type,
          rulesApplied: rulesValue.toLowerCase() === 'all' ? 'All Devices' : rulesValue,
        };
      }
      if (type === 'visitor_type') {
        return {
          ruleDescription: metaData,
          currentValue: User.attributes.visitor_type,
          rulesApplied: rulesValue.toLowerCase() === 'all' ? 'All Visitors' : rulesValue,
        };
      }
      if (type === 'ip_geolocation') {
        return {
          ruleDescription: metaData,
          currentValue: User.geoLocation,
          rulesApplied: rulesValue,
        };
      }
      if (type === 'url_param') {
        const key = (cond.metadata && cond.metadata.key) || '';
        const expectedValue =
          cond.metadata && cond.metadata.value !== undefined ? cond.metadata.value : rulesValue;
        if (!key) {
          return {
            ruleDescription: metaData,
            currentValue: 'All Traffics',
            rulesApplied: 'All Traffics',
          };
        }
        const actualParamValue = Tools.getUrlParameter(key);
        let currentValue;
        if (actualParamValue !== null) {
          currentValue = `${key}=${actualParamValue}`;
        } else {
          const availableParams = new URLSearchParams(w.location.search);
          const paramList = [];
          availableParams.forEach((val, k) => paramList.push(`${k}=${val}`));
          currentValue = paramList.join(', ');
        }
        return {
          ruleDescription: metaData,
          currentValue: currentValue,
          rulesApplied: `${key}=${expectedValue}`,
        };
      }

      // js_code or legacy fallback: use rules_js string
      let ruleDescription = 'Custom Script';
      let currentValue = isMatch ? 'True' : 'False';
      let rulesApplied = rule;

      if (rule.includes('window.innerWidth')) {
        const matches = rule.match(/window\.innerWidth\s*([<>=!]+)\s*(\d+)/);
        if (matches) {
          rulesApplied = rule;
        }
        ruleDescription = 'Custom Script';
        currentValue = window.innerWidth;
      }

      return { ruleDescription, currentValue, rulesApplied };
    },
    checkPageTargetings: function ({ page_targeting, pages_match_type, currentUrl }) {
      if (!page_targeting || !page_targeting.conditions) {
        return { matches: false, conditions: [] };
      }

      const evaluatedConditions = page_targeting.conditions.map((condBlock) => {
        const evaluatedGroups = (condBlock.conditionGroups || []).map((group) => {
          const evaluatedConds = (group.conditions || []).map((cond) => {
            // Urltargeting reads `type` for include/exclude; new schema uses `matchType`
            const utData = { ...cond, type: cond.matchType };
            const matchResult = new Urltargeting(utData).matches(currentUrl, utData);
            const status = matchResult;
            return {
              ...cond,
              status,
              logic: `${cond.matchType} ${cond.url_type}`,
              value: cond.url,
              actualValue: new Urltargeting(utData).actualValue(currentUrl, utData),
              ruleValue: cond.url,
            };
          });

          const groupMatches =
            group.matchType === 'OR'
              ? evaluatedConds.some((c) => c.status)
              : evaluatedConds.every((c) => c.status);

          return { ...group, conditions: evaluatedConds, groupMatches };
        });
        const blockMatches =
          condBlock.matchType === 'OR'
            ? evaluatedGroups.some((g) => g.groupMatches)
            : evaluatedGroups.every((g) => g.groupMatches);

        return { ...condBlock, conditionGroups: evaluatedGroups, groupMatches: blockMatches };
      });
      // Top-level condition blocks are combined using pages_match_type from the experiment
      const overallMatch =
        pages_match_type === 'OR'
          ? evaluatedConditions.some((c) => c.groupMatches)
          : evaluatedConditions.every((c) => c.groupMatches);
      return { matches: overallMatch, conditions: evaluatedConditions };
    },
    checkAudienceTargetings: async function ({
      audience_targeting,
      audiences_match_type,
      experimentId,
    }) {
      if (!audience_targeting || !audience_targeting.conditions) {
        return { matches: false, conditions: [] };
      }
      const evaluatedConditions = await Promise.all(
        audience_targeting.conditions.map(async (condBlock) => {
          const evaluatedGroups = await Promise.all(
            (condBlock.conditionGroups || []).map(async (group) => {
              const evaluatedConds = await Promise.all(
                (group.conditions || []).map(async (cond) => {
                  let isMatch = false;
                  if (cond.type === 'device_type') {
                    isMatch =
                      (cond.rules_value || '').toLowerCase() === 'all' ||
                      User.attributes.device_type === (cond.rules_value || '').toLowerCase();
                  } else if (cond.type === 'visitor_type') {
                    isMatch =
                      (cond.rules_value || '').toLowerCase() === 'all' ||
                      User.attributes.visitor_type === (cond.rules_value || '').toLowerCase();
                  } else if (cond.type === 'ip_geolocation') {
                    if (!User.geoLocation) await User.setGeoLocation();
                    const userCountry = (User.geoLocation || '').toLowerCase().trim();
                    const ruleCountries = (cond.rules_value || '')
                      .toLowerCase()
                      .split(',')
                      .map((c) => c.trim());
                    isMatch = ruleCountries.includes(userCountry);
                  } else if (cond.type === 'url_param') {
                    const { key, value } = cond?.metadata || {};
                    if (!key) {
                      isMatch = true;
                    } else {
                      const actualParamValue = Tools.getUrlParameter(key);
                      const expectedValue = value !== undefined ? value : cond?.rules_value || '';
                      isMatch =
                        actualParamValue !== null &&
                        String(actualParamValue).toLowerCase() ===
                          String(expectedValue).toLowerCase();
                    }
                  } else {
                    isMatch = await System.jsConditionReturnsTrueAsync(
                      cond.rules_js || '',
                      experimentId,
                    );
                  }
                  if (cond.metadata?.operator === 'not_equals') {
                    isMatch = !isMatch;
                  }
                  const { ruleDescription, currentValue, rulesApplied } = this.describeAudienceRule(
                    cond,
                    isMatch,
                  );
                  return {
                    ...cond,
                    status: isMatch,
                    logic: ruleDescription,
                    value: rulesApplied,
                    actualValue: currentValue,
                  };
                }),
              );

              const groupMatches =
                group.matchType === 'OR'
                  ? evaluatedConds.some((c) => c.status)
                  : evaluatedConds.every((c) => c.status);

              return { ...group, conditions: evaluatedConds, groupMatches };
            }),
          );

          const blockMatches =
            condBlock.matchType === 'AND'
              ? evaluatedGroups.every((g) => g.groupMatches)
              : evaluatedGroups.some((g) => g.groupMatches);

          return { ...condBlock, conditionGroups: evaluatedGroups, groupMatches: blockMatches };
        }),
      );

      // Top-level condition blocks combined using audiences_match_type from the experiment
      const overallMatch =
        audiences_match_type === 'OR'
          ? evaluatedConditions.some((c) => c.groupMatches)
          : evaluatedConditions.every((c) => c.groupMatches);
      return { matches: overallMatch, conditions: evaluatedConditions };
    },
    initSpaRouteObserver: function () {
      if (!this.projectData?.is_spa || this.spaRouteObserverInitialized) return;
      this.spaRouteObserverInitialized = true;

      let lastUrl = w.location.href;
      const reInitOnRouteChange = () => {
        const currentUrl = w.location.href;
        if (currentUrl === lastUrl) return;
        lastUrl = currentUrl;
        if (w.codebase && typeof w.codebase.reInit === 'function') {
          w.codebase.reInit({
            resetStates: true,
          });
          return;
        }
        Script.run();
      };

      ['pushState', 'replaceState'].forEach((methodName) => {
        if (!w.history || typeof w.history[methodName] !== 'function') return;
        const originalMethod = w.history[methodName];
        w.history[methodName] = function () {
          const result = originalMethod.apply(this, arguments);
          setTimeout(reInitOnRouteChange, 0);
          return result;
        };
      });

      w.addEventListener('popstate', reInitOnRouteChange);
      w.addEventListener('hashchange', reInitOnRouteChange);

      if (w.codebaseSpaUrlPollInterval) {
        clearInterval(w.codebaseSpaUrlPollInterval);
      }
      w.codebaseSpaUrlPollInterval = setInterval(reInitOnRouteChange, 100);
    },
  };
  var Storage = {
    getStorage: function (defaultStorage, force) {
      if (force) {
        return defaultStorage;
      }
      if (Script.storage !== 'default') {
        return Script.storage;
      }
      if (defaultStorage === 'default') {
        return 'localStorage';
      }
      return defaultStorage;
    },
    encode: function (e) {
      return (e = Script.projectData.encode_storage_values ? encodeURIComponent(e) : e);
    },
    decode: function (e) {
      return Script.projectData.encode_storage_values && 'null' === (e = decodeURIComponent(e))
        ? null
        : e;
    },
    useTempStorage: function (key) {
      // Debug token must always reach actual storage so shouldNotRun() can read it
      if (key === System.urlParamPrefix + 'debug') return false;
      // In QA/debug mode, experiment buckets must also reach actual storage
      if (Script.isQaMode && key === User.storageKeyExps) return false;
      return (
        key !== 'codebase_tracking_consent' &&
        key !== 'codebase_redirect' &&
        !Script.trackingPrerequisitesMet(true)
      );
    },
    set: function (storage, key, value, force, days) {
      storage = this.getStorage(storage, force);
      if (this.useTempStorage(key)) {
        w['codebaseTempStorage'] = w['codebaseTempStorage'] || {};
        w.codebaseTempStorage[storage] = w.codebaseTempStorage[storage] || {};
        w.codebaseTempStorage[storage][key] = value;
        return;
      }
      if (storage === 'cookie') {
        if (days) {
          return Tools.setCookie(key, value, days);
        }
        return Tools.setCookie(key, value);
      } else if (storage === 'localStorage') {
        return localStorage.setItem(key, value);
      }
      sessionStorage.setItem(key, value);
    },
    get: function (storage, key, force) {
      storage = this.getStorage(storage, force);
      if (this.useTempStorage(key)) {
        if (
          w.hasOwnProperty('codebaseTempStorage') &&
          w.codebaseTempStorage.hasOwnProperty(storage) &&
          w.codebaseTempStorage[storage].hasOwnProperty(key)
        ) {
          return w.codebaseTempStorage[storage][key];
        }
        return false;
      }
      if (storage === 'cookie') {
        return Tools.getCookie(key);
      } else if (storage === 'localStorage') {
        return localStorage.getItem(key);
      }
      return sessionStorage.getItem(key);
    },
    remove: function (storage, key, force) {
      storage = this.getStorage(storage, force);
      if (storage === 'cookie') {
        return Tools.removeCookie(key);
      } else if (storage === 'localStorage') {
        return localStorage.removeItem(key);
      } else if (storage === 'temp') {
        delete w[key];
      }
      sessionStorage.removeItem(key);
    },
  };
  var formerPushedCalls = [];
  var Api = {
    init: function () {
      this.initEventsApi();
      this.initQueuedEvents();
      if (typeof w.CustomEvent === 'function') {
        var apiReadyEvent = new CustomEvent('ConversionAPPApiReady');
        d.dispatchEvent(apiReadyEvent);
      }
    },
    initQueuedEvents: function () {
      (async () => {
        const schedule = w.__codebaseQueue || [];
        window.__codebaseQueue = new Proxy([], {
          set(t, p, v) {
            isNaN(+p) ||
              (async () => w.codebase.push(v))().catch((e) => {
                /* add some shadow error-logging */
                // console.log("error", e);
              });
            return Reflect.set(t, p, null);
          },
        });
        for (const event of schedule) {
          w.codebase.push(event);
        }
      })().catch(() => {});
    },
    initEventsApi: function () {
      w.codebase = {
        iid: w.codebase.iid,
        _initialized: true,
        scriptsUrl: scripts_url,
        apiUrl: apiUrl,
        push: function (event) {
          if (event.eventType === 'custom' || event.eventType === 'revenue') {
            var goalData = Script.getGoalByApiName(event.eventName);
            if (goalData) {
              var goal = new Goal(goalData);
              var value = 0;
              if (event.hasOwnProperty('eventValue')) {
                value = event.eventValue;
              }
              goal.trigger(value);
            }
          } else if (event.eventType === 'forceVariation') {
            System.forcedVariations[event.experimentId] = event.variationId;
          } else if (event.eventType === 'activatePage') {
            var pageData = false;
            if (event.hasOwnProperty('pageId')) {
              pageData = Script.getPageById(event.pageId);
            } else {
              pageData = Script.getPageByApiName(event.pageApiName);
            }
            if (!pageData) {
              System.log('error', 0, [
                'API (activatePage)',
                'Page (#' + event.pageId + ') is not available',
              ]);
              return;
            }
            var page = new Page(pageData, Project.data.iid);
            page.run();
          } else if (event.eventType === 'deactivatePage') {
            var pageData = false;
            if (event.hasOwnProperty('pageId')) {
              pageData = Script.getPageById(event.pageId);
            } else {
              pageData = Script.getPageByApiName(event.pageApiName);
            }
            if (!pageData) {
              System.log('error', 0, [
                'API (deactivatePage)',
                'Page (#' + event.pageId + ') is not available',
              ]);
              return;
            }
            var page = new Page(pageData, Project.data.iid);
            page.setInactive();
          } else if (event.eventType === 'addListener') {
            if (event.listener.type === 'lifecycleEnd') {
              Script.eventHandlers['lifecycleEnd'] = event.listener.handler;
            }
          } else if (event.eventType === 'enableTrackingConsent') {
            var alreadySet = Storage.get(Script.storage, System.storagePrefix + 'tracking_consent');
            Storage.set(Script.storage, System.storagePrefix + 'tracking_consent', '1');
            System.log('info', 0, ['enableTrackingConsent']);
            if (w.hasOwnProperty('codebaseTempStorage')) {
              for (const [storage, entry] of Object.entries(w.codebaseTempStorage)) {
                for (const [key, value] of Object.entries(entry)) {
                  Storage.set(storage, key, value);
                }
              }
            }
            if (!alreadySet) {
              w.codebase.reInit({
                resetStates: true,
              });
            }
          } else if (event.eventType === 'disableTrackingConsent') {
            Storage.set(Script.storage, System.storagePrefix + 'tracking_consent', '0');
            System.log('info', 0, ['disableTrackingConsent']);
          } else if (event.eventType === 'interaction') {
            // Track in memory only — clears on every page refresh, so the
            // audience gate requires the event to be re-fired each time.
            w.__codebaseFiredInteractions.add(event.eventName);
            System.log('info', 0, ['interaction fired', event.eventName]);
            // Reinit the full experiment cycle so audiences that were gated on
            // this interaction event now get a fresh evaluation pass.
            w.codebase.reInit({
              resetStates: true,
            });
          }
        },
        // CONVERSION APIS
        get: function (type, argument) {
          if (type === 'tools') {
            return Tools;
          } else if (type === 'checkPageTargetings') {
            return Script.checkPageTargetings(argument);
          } else if (type === 'checkAudienceTargetings') {
            return Script.checkAudienceTargetings(argument);
          } else if (type === 'storage') {
            return Storage;
          } else if (type === 'activePageIds') {
            return Script.activePages;
          } else if (type === 'activeExperimentIds') {
            return Script.activeExperiments;
          } else if (type === 'pingedGoals') {
            return Script.pingedGoals;
          } else if (type === 'pages') {
            return Script.projectData.pages;
          } else if (type === 'experiments') {
            return !argument ? Script.projectData.experiments : Script.getExperimentById(argument);
          } else if (type === 'apiUrl') {
            return apiUrl;
          } else if (type === 'scriptsUrl') {
            return scripts_url;
          } else if (type === 'goals') {
            return Script.projectData.goals;
          } else if (type === 'variationById' && argument) {
            return Script.getVariationById(argument);
          } else if (type === 'variationsOfExperiment' && argument) {
            return Script.getVariationsOfExperiment(argument);
          } else if (type === 'goalById' && argument) {
            return Script.getGoalById(argument);
          } else if (type === 'trackingConsentEnabled') {
            var val = Storage.get(Script.storage, System.storagePrefix + 'tracking_consent');
            if (val === '0') return false;
            if (val === '1') return true;
            return val;
          } else if (type === 'deviceType') {
            return User.attributes.device_type;
          } else if (type === 'storagePrefix') {
            return System.storagePrefix;
          } else if (type === 'debugKey') {
            return System.urlParamPrefix + 'debug';
          } else if (type === 'forceVariant' && argument) {
            return System.forcedVariations[argument];
          } else if (type === 'storageKeyExps') {
            return User.storageKeyExps;
          } else if (type === 'storageKeyExcludedExperiments') {
            return User.storageKeyExcludedExperiments;
          } else if (type === 'storageType') {
            return Storage.getStorage(Script.storage, false);
          } else if (type === 'active') {
            return Script.projectData.active;
          }
          console.error('"' + type + '" is not known by API');
        },
        set: function (type, value) {
          if (type === 'active') {
            Script.projectData.active = value;
            System.log(
              'info',
              false,
              `Script active status changed to: ${value}`,
              value
                ? '✅ New users can be bucketed'
                : '⏸️ Paused - Only existing users see variations',
            );
            return true;
          }
          console.error('"' + type + '" setter is not known by API');
          return false;
        },
        getTools: function () {
          return Tools;
        },
        reInit: function (config) {
          System.log('info', false, 'Re-Initiated PROJECT');
          Script.isReInited = true;
          if (config && config.hasOwnProperty('resetStates') && config.resetStates) {
            Script.activePages = [];
            Script.activeExperiments = [];
            Script.pingedGoals = [];
          }
          if (Project.hasOwnProperty('data') && Project.data.is_spa) {
            var userBucket = User.getExperimentsBucket();
            if (Object.keys(userBucket).length) {
              for (var experimentId in userBucket) {
                var experiment = new Experiment(Script.getExperimentById(experimentId), true);
                experiment.init();
              }
            }
          }
          Script.run();
        },
      };
    },
    handleFormerlyPushedCalls: function () {
      for (var i = 0; i < formerPushedCalls.length; i++) {
        var pushedCall = formerPushedCalls[i];
        if (pushedCall.eventType === 'forceVariation') {
          w.codebase.push(pushedCall);
        } else {
          Script.formerlyPushedGoals.push(pushedCall);
        }
      }
    },
  };
  var System = {
    urlParamPrefix: 'codebase_',
    storagePrefix: 'codebase_',
    allowedOrigins: [
      'http://localhost:3000',
      'https://accelerated.cc',
      'https://app.conversion.io',
    ],
    logEnabled: false,
    forcedVariations: {},
    init: function () {},
    enableLog: function () {
      this.logEnabled = true;
    },
    log: function (type, nesting, message, argument) {
      if (!this.logEnabled) {
        return false;
      }
      var outputPrefix = 'Conversion APP #';
      var nestingStepChars = '----';
      if (nesting === false) {
        nestingStepChars = '';
      }
      var outputNestingSteps = nestingStepChars;
      for (var i = 0; i < nesting; i++) {
        outputNestingSteps += nestingStepChars;
      }
      if (!argument) {
        argument = ' ';
      }
      if (type === 'info') {
        const style1 = 'background-color: #009955; border: 2px solid #009955; color: white;';
        const style2 = 'color: #777;';
        c.log(`%c${outputPrefix}%c${outputNestingSteps} ${message}`, style1, style2, argument);
      } else if (type === 'attention') {
        c.log(
          `%c${outputPrefix}%c${outputNestingSteps} ${message}`,
          'background-color: #00ff8d; border: 2px solid #00ff8d; color: #000;',
          'color: #000;',
          argument,
        );
      } else if (type === 'error') {
        const senderObj = message[0];
        if (typeof senderObj === 'object') {
          message = `ERROR on ${senderObj.className.toUpperCase()} ${
            senderObj.data.iid
          }: ${message[1]}`;
        } else {
          message = `ERROR on ${senderObj}: ${message[1]}`;
        }
        c.error(`${outputPrefix}${outputNestingSteps}${message}`, argument);
      }
    },
    evalJs: function (js) {
      var codebaseTools = Tools;
      w.codebaseIgnoreDomMutations = true;
      if (js.includes('.conversionredirect(')) {
        const match = js.match(/\.conversionredirect\(["'](.*?)["']\)/);
        if (match) {
          const url = codebaseTools.buildRedirectUrl(match[1]);
          const urlParams = new URLSearchParams(url);
          const codebaseEditor =
            urlParams.get('codebase_editor') || sessionStorage.getItem('codebase_editor');
          if (!codebaseEditor) {
            codebaseTools.redirect(url);
          }
        }
      } else {
        eval(js);
        setTimeout(function () {
          w.codebaseIgnoreDomMutations = false;
        }, 100);
      }
    },
    applyJs: function (senderObj, silent) {
      var js = senderObj.data.jscode;
      var redirectUrl = senderObj.data.redirect_url;
      if (redirectUrl) {
        js = `\n.conversionredirect('${redirectUrl}')`;
      }
      if (!js || !js.length) {
        return false;
      }
      if (!silent) {
        System.log('info', 2, 'Applying JS');
      }
      try {
        System.evalJs(js);
      } catch (err) {
        System.log('error', 2, [senderObj, err.message]);
      }
    },
    applyCustomJs: function (e) {
      if (!e || !e.length) return;
      System.log('info', false, 'Applying JS');
      try {
        System.evalJs(e);
      } catch (e) {
        System.log('error', false, [e.message]);
      }
    },
    applyResetJs: function (senderObj) {
      const js = senderObj.data.reset_js;
      if (!js || !js.length) {
        return false;
      }
      System.log(
        'info',
        0,
        `Applying RESET JS of ${senderObj.className.toUpperCase()} "${senderObj.data.name}"`,
        senderObj.data.iid,
      );
      try {
        System.evalJs(js);
      } catch (err) {
        System.log('error', 0, [err.message]);
      }
    },
    applyCss: function (senderObj) {
      var css = senderObj.data.csscode;
      if (!css || !css.length) {
        return false;
      }
      System.log('info', false, 'Applying CSS');
      var h = d.head || d.getElementsByTagName('head')[0],
        s = d.createElement('style');
      //   s.type = "text/css";
      s.className = 'codebase-css';
      s.dataset.codebaseCssType = senderObj.className;
      s.dataset.codebaseCssTypeId = senderObj.data.iid;
      if (s.styleSheet) {
        s.styleSheet.cssText = css;
      } else {
        s.appendChild(d.createTextNode(css));
      }
      h.appendChild(s);
    },
    applyResetCss: function (senderObj) {
      const selector = `style.codebase-css[data-codebase-css-type="${senderObj.className}"][data-codebase-css-type-id="${senderObj.data.iid}"]`;
      d.querySelectorAll(selector).forEach((elem) => elem.remove());
    },
    detachCss: function () {
      var list = d.getElementsByClassName('codebase-css');
      for (var i = list.length - 1; 0 <= i; i--) {
        if (list[i] && list[i].parentElement) {
          list[i].parentElement.removeChild(list[i]);
        }
      }
    },
    jsConditionReturnsTrue: function (expression, experimentId) {
      if (expression === 'null' || expression === '') {
        return true;
      }
      var result = false;
      try {
        var codebaseTools = Tools;
        var jsConditionFn = new Function(
          'User',
          'Tools',
          'codebaseTools',
          'experimentId',
          expression,
        );
        result = jsConditionFn(User, Tools, codebaseTools, experimentId);
      } catch (err) {
        System.log('error', false, ['JS RULE', err.message]);
      }
      return result;
    },
    jsConditionReturnsTrueAsync: async function (expression, experimentId) {
      if (!expression || expression === 'null') {
        return true;
      }

      try {
        const codebaseTools = Tools;
        const jsConditionFn = new Function(
          'User',
          'Tools',
          'codebaseTools',
          'experimentId',
          expression,
        );

        const result = jsConditionFn(User, Tools, codebaseTools, experimentId);

        if (result instanceof Promise) {
          const finalResult = await result;
          return finalResult;
        }
        return !!result;
      } catch (err) {
        return false;
      }
    },
    getCurrentUrl: function () {
      return w.location.href;
    },
    parseUrl: function (url) {
      var parser = d.createElement('a'),
        searchObject = {},
        queries,
        split,
        i;
      parser.href = url;
      queries = parser.search.replace('^?', '').split('&');
      for (var i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
      }
      var pathname = parser.pathname;
      if (pathname.substring(-1) === '/') {
        pathname = pathname.substring(0, pathname.length - 1);
      }
      return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash,
      };
    },
    addLiveEventListeners: function (selector, event, handler) {
      if (Script.liveEventListenersSet) {
        return false;
      }
      d.querySelector('html').addEventListener(
        event,
        function (evt) {
          var target = evt.target;
          while (target != null) {
            var isMatch = target.matches
              ? target.matches(selector)
              : target.msMatchesSelector(selector);
            if (isMatch) {
              handler(target);
              return;
            }
            target = target.parentElement;
          }
        },
        true,
      );
      Script.liveEventListenersSet = true;
    },
    isInteger: function (value) {
      var x;
      if (isNaN(value)) {
        return false;
      }
      x = parseFloat(value);
      return (x | 0) === x;
    },
  };
  System.init();
  var EventQueue = {
    storageKey: System.storagePrefix + 'queue',
    batchSize: 10,
    processingInterval: 1000,
    isProcessing: false,

    init: function () {
      var _self = this;
      Tools.domLoaded(function () {
        if (w.codebaseEventQueueInterv) {
          clearInterval(w.codebaseEventQueueInterv);
        }
        w.codebaseEventQueueInterv = setInterval(function () {
          if (!_self.isProcessing) {
            _self.process();
          }
        }, _self.processingInterval);
      });
      _self.cleanup();
    },

    add: function (event) {
      if (!Script.trackingPrerequisitesMet(true)) {
        Script.tempEventStorage.push(event);
        return;
      }

      function createLockId() {
        return Math.random().toString(36).substring(2, 15);
      }

      event.timestamp = Math.floor(Date.now() / 1000);
      event.lockId = createLockId();
      this.addItemToJson(event);
    },

    get: function () {
      var sItem = Storage.get('cookie', this.storageKey);
      return sItem ? JSON.parse(sItem) : [];
    },

    clear: function () {
      this.updateStorage([]);
    },

    process: function () {
      if (this.isProcessing) return false;
      this.isProcessing = true;

      try {
        const allEvents = this.get();
        if (!allEvents || allEvents.length === 0) return false;

        const eventsToHandle = [];
        const eventsUpdateSet = [];
        const currentTimestamp = Math.floor(Date.now() / 1000);
        let processedCount = 0;

        for (let i = 0; i < allEvents.length && processedCount < this.batchSize; ++i) {
          const event = allEvents[i];
          if (typeof event !== 'object') continue;

          let minDiffTimeSec = 0.5;

          if (event.type === 'bucketing') {
            const variationId = event.value;
            const variationToCheck = new Variation(variationId, true);
            if (variationToCheck.data !== false && variationToCheck.hasRedirect()) {
              minDiffTimeSec = 2;
            }
          }

          const triggeredTimeDiffSec = currentTimestamp - event.timestamp;

          if (triggeredTimeDiffSec > minDiffTimeSec) {
            if (!event.hasOwnProperty('locked')) {
              event.locked = currentTimestamp;
              eventsToHandle.push(event);
              processedCount++;
            } else {
              const lockTimeDiffSec = currentTimestamp - event.locked;
              if (lockTimeDiffSec >= minDiffTimeSec + 2) {
                event.locked = currentTimestamp;
                eventsToHandle.push(event);
                processedCount++;
              }
            }
          }

          eventsUpdateSet.push(event);
        }

        this.updateStorage(eventsUpdateSet);

        if (eventsToHandle.length > 0) {
          Script.processEvents(eventsToHandle);
        } else {
          return false;
        }
      } finally {
        this.isProcessing = false;
      }
    },
    removeEventsFromQueue: function (events) {
      const handledLockedIds = new Set(events.map((e) => e.lockId));
      const eventsUpdateSet = this.get().filter((event) => !handledLockedIds.has(event.lockId));
      this.updateStorage(eventsUpdateSet);
    },

    doesItemExist: function (events, event) {
      return events.some((existing) => {
        if (
          typeof existing !== 'object' ||
          existing.timestamp !== event.timestamp ||
          existing.type !== event.type
        )
          return false;

        switch (event.type) {
          case 'bucketing':
            return existing.value === event.value;
          case 'integration':
            return (
              existing.integration.iid === event.integration.iid &&
              existing.data.variationId === event.data.variationId
            );
          default:
            return existing.goal.iid === event.goal.iid;
        }
      });
    },

    addItemToJson: function (event) {
      var events = this.get();
      if (!this.doesItemExist(events, event)) {
        events.push(event);
        this.updateStorage(events);
      }
    },

    updateStorage: function (events) {
      if (!events || events.length === 0) {
        Storage.remove(Script.storage, this.storageKey);
        return;
      }
      var secsInDays = (1 / (24 * 60 * 60)) * 30;
      Storage.set(Script.storage, this.storageKey, JSON.stringify(events), false, secsInDays);
    },

    cleanup: function () {
      const allEvents = this.get();
      if (allEvents.length === 0) return false;

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const eventsUpdateSet = allEvents.filter(
        (event) =>
          typeof event === 'object' &&
          currentTimestamp - event.timestamp <= 3600 &&
          currentTimestamp - (event.locked || 0) <= 3600,
      );

      this.updateStorage(eventsUpdateSet);
    },
  };
  var Tools = {
    maxCookieLifetime: 90,
    generateUUID: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    customCookieDomain: ''.length > 0 ? '' : null,
    cookieCache: new Map(),
    cookieCacheTimeout: 5000,
    cookieCacheLastUpdate: 0,

    init: function () {
      this.updateCookieCache();
    },

    updateCookieCache: function () {
      const now = Date.now();
      if (now - this.cookieCacheLastUpdate < 1000) return;

      this.cookieCache.clear();
      this.cookieCacheLastUpdate = now;

      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=');
        if (eqPos > 0) {
          const name = cookie.substring(0, eqPos).trim();
          const value = cookie.substring(eqPos + 1);
          this.cookieCache.set(name, { value, timestamp: now });
        }
      });
    },

    setCookie: function (name, value, days, ignoreDomain) {
      days = days !== undefined ? days : this.maxCookieLifetime;
      ignoreDomain = ignoreDomain !== undefined ? ignoreDomain : false;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = date.toUTCString();
      const rootDomain = this.getRootDomain();
      // NEW CODE
      let cookieToSet = `${name}=${value}; expires=${expires}; SameSite=Lax; path=/; Secure`;
      if (rootDomain && rootDomain !== 'only_current' && !ignoreDomain) {
        const domainPart = rootDomain.startsWith('.') ? rootDomain : `.${rootDomain}`;
        cookieToSet += `; domain=${domainPart}`;
      }
      document.cookie = cookieToSet;
      if (!document.cookie.includes(name)) {
        console.warn(
          `Cookie "${name}" failed to write. This is likely due to a Domain mismatch or Privacy API restriction.`,
        );
      }
      const now = Date.now();
      this.cookieCache.set(name, { value, timestamp: now });
      this.cookieCacheLastUpdate = now;
    },
    getCookie: function (name) {
      const cached = this.cookieCache.get(name);
      const now = Date.now();

      if (cached && now - cached.timestamp < this.cookieCacheTimeout) {
        return cached.value;
      }

      if (now - this.cookieCacheLastUpdate > this.cookieCacheTimeout) {
        this.updateCookieCache();
      }

      const updated = this.cookieCache.get(name);
      return updated ? updated.value : null;
    },
    removeCookie: function (name) {
      const rootDomain = this.getRootDomain();
      const cookieToRemove = `${name}=; SameSite=Lax; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

      document.cookie = cookieToRemove;
      if (rootDomain) {
        document.cookie = `${cookieToRemove} domain=${rootDomain};`;
      }

      this.cookieCache.delete(name);
      this.cookieCacheLastUpdate = Date.now();
    },
    parseUrl: function () {
      var url = window.location.hostname;
      if (url.indexOf('.') === -1) return false;

      var regexParse = /([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$/;
      var urlParts = regexParse.exec(url);
      if (!urlParts) return false;

      return {
        domain: urlParts[1],
        tld: urlParts[2],
        subdomain: url.replace(urlParts[1] + '.' + urlParts[2], '').slice(0, -1),
      };
    },
    getRootDomain: function () {
      if (this.customCookieDomain) return this.customCookieDomain;
      var parsedUrl = this.parseUrl();
      return parsedUrl ? '.' + parsedUrl.domain + '.' + parsedUrl.tld : false;
    },
    updateUrlParameter: function (name, value, url, removeKey = false) {
      return this.addUrlParameter(
        name,
        value,
        this.removeUrlParameter(name, url, removeKey),
        removeKey,
      );
    },
    addUrlParameter: function (name, value, url, removeKey = false) {
      if (!url) {
        url = window.location.href;
      }
      const urlParts = url.split('?');
      const baseUrl = urlParts[0];
      const query = urlParts[1] || '';

      // Remove any existing entry for this key, then re-add if not removing
      let params = query.split('&').filter((param) => {
        const [key] = param.split('=');
        return key && key !== name;
      });

      if (!removeKey) {
        params.push(`${name}=${value}`);
      }

      const newQuery = params.join('&');
      return newQuery ? `${baseUrl}?${newQuery}` : baseUrl;
    },
    removeUrlParameter: function (name, url, removeKey = false) {
      if (!url) {
        url = window.location.href;
      }
      const urlParts = url.split('?');
      if (urlParts.length < 2) return url;
      const baseUrl = urlParts[0];
      const query = urlParts[1];
      const newQuery = query
        .split('&')
        .filter((param) => {
          const [key] = param.split('=');
          return removeKey ? key !== name : true;
        })
        .map((param) => {
          if (!removeKey && param.startsWith(name + '=')) {
            return name + '=';
          }
          return param;
        })
        .filter(Boolean)
        .join('&');

      return newQuery ? `${baseUrl}?${newQuery}` : baseUrl;
    },
    getUrlParameter: function (name, url) {
      if (!url) {
        url = w.location.href;
      }
      name = name.replace(/[[]]/g, '$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace('+', ' '));
    },
    poll: function (
      pollingFn,
      callbackFn,
      callbackFnOnFail = () => {},
      timeoutMs = 10000,
      timeoutAfterDomReadyMs = 2000,
    ) {
      const result = pollingFn();
      if (result === true) {
        callbackFn();
        return true;
      }

      const interval = setInterval(() => {
        if (pollingFn() === true) {
          clearInterval(interval);
          callbackFn();
        }
      }, 50);

      Script.pollIntvs.push(interval);

      const cleanup = () => {
        clearInterval(interval);
        callbackFnOnFail();
      };

      setTimeout(cleanup, timeoutMs);
      this.domLoaded(() => setTimeout(cleanup, timeoutAfterDomReadyMs));
    },
    //   pollingFn,
    //   callbackFn,
    //   callbackFnOnFail,
    //   maxPollCount = 100,
    //   intervalMs = 50
    // ) {
    //   if (!callbackFnOnFail) {
    //     callbackFnOnFail = function () {};
    //   }
    //   let count = 0;
    //   let result = pollingFn();
    //   if (result === true) {
    //     callbackFn();
    //     return true;
    //   }
    //   const i = setInterval(function () {
    //     result = pollingFn();
    //     count++;
    //     if (result === true) {
    //       clearInterval(i);
    //       callbackFn();
    //     } else if (count >= maxPollCount) {
    //       clearInterval(i);
    //       callbackFnOnFail();
    //     }
    //   }, intervalMs);
    //   Script.pollIntvs.push(i);
    // },
    // poll: function (pollingFn, callbackFn) {
    //   let result = pollingFn();
    //   if (result === true) {
    //     callbackFn();
    //     return true;
    //   }
    //   const i = setInterval(function () {
    //     result = pollingFn();
    //     if (result === true) {
    //       clearInterval(i);
    //       callbackFn();
    //     }
    //   }, 50);

    //   Script.pollIntvs.push(i);
    //   // setTimeout(function () {
    //   //   clearInterval(i);
    //   //   callbackFnOnFail();
    //   // }, timeoutMs);
    //   // this.domLoaded(function () {
    //   //   setTimeout(function () {
    //   //     clearInterval(i);
    //   //     callbackFnOnFail();
    //   //   }, timeoutAfterDomReadyMs);
    //   // });
    // },
    buildRedirectUrl: function (newUrl, keepQueryParameters) {
      function parseQueryStr(str) {
        if (!str || typeof str !== 'string') return false;

        const query = {};
        const params = new URLSearchParams(str);

        for (const [key, value] of params.entries()) {
          if (key in query) {
            query[key] = Array.isArray(query[key]) ? [...query[key], value] : [query[key], value];
          } else {
            query[key] = value;
          }
        }

        return Object.keys(query).length ? query : false;
      }
      function buildQueryStr(queryObj) {
        const entries = Object.entries(queryObj);
        if (entries.length === 0) return '';

        const params = entries.map(([key, val]) => `${key}=${val}`).join('&');
        return `?${params}`;
      }
      if (newUrl.charAt(0) === '?') {
        newUrl = w.location.protocol + '//' + w.location.hostname + w.location.pathname + newUrl;
      }
      var currentUrl = w.location.href;
      var redirectUrl = newUrl;
      if (keepQueryParameters) {
        var currentUrlHash = '';
        if (w.location.hash) {
          currentUrlHash = w.location.hash;
        }
        var newUrlHash = '';
        if (newUrl.indexOf('#') > -1) {
          newUrlHash = newUrl.split('#');
          newUrlHash = '#' + newUrlHash[1];
        }
        var redirectUrlHash = currentUrlHash;
        if (newUrlHash.length > 0) {
          redirectUrlHash = newUrlHash;
        }
        var currentQueryParameters = parseQueryStr(w.location.search.replace('?', ''));
        var newUrlSplitted = newUrl.replace(newUrlHash, '').split('?');
        var newUrlWithoutQuery = newUrlSplitted;
        var newQueryParameters = false;
        if (newUrlSplitted.length > 1) {
          newUrlWithoutQuery = newUrlSplitted[0];
          newQueryParameters = parseQueryStr(newUrlSplitted[1]);
        }
        var redirectQueryParameters = currentQueryParameters || {};
        if (currentQueryParameters && newQueryParameters) {
          for (var key in currentQueryParameters) {
            if (currentQueryParameters.hasOwnProperty(key)) {
              if (newQueryParameters.hasOwnProperty(key)) {
                redirectQueryParameters[key] = newQueryParameters[key];
                delete newQueryParameters[key];
              }
            }
          }
        }
        if (newQueryParameters) {
          for (var key in newQueryParameters) {
            redirectQueryParameters[key] = newQueryParameters[key];
          }
        }
        redirectUrl = newUrlWithoutQuery + buildQueryStr(redirectQueryParameters) + redirectUrlHash;
      }
      return redirectUrl;
    },
    redirect: function (url, keepQueryParameters, preventLoops) {
      if (typeof keepQueryParameters === 'undefined') {
        keepQueryParameters = true;
      }
      if (typeof preventLoops === 'undefined') {
        preventLoops = true;
      }
      var waitBetweenRedirectsInSecs = 2;
      if (preventLoops === false) {
        waitBetweenRedirectsInSecs = 0;
      }
      var redirectUrl = this.buildRedirectUrl(url, keepQueryParameters);
      if (w.location.href === redirectUrl) {
        return false;
      }
      var lastRedirect = Storage.get('sessionStorage', 'codebase_redirect');
      if (lastRedirect) {
        var secsSinceLastRedirect = (Date.now() - lastRedirect) / 1000;
        if (secsSinceLastRedirect < waitBetweenRedirectsInSecs) {
          return false;
        }
      }
      const dateNow = Date.now();
      Storage.set('sessionStorage', 'codebase_redirect', dateNow);
      setTimeout(function () {
        const urlObj = new URL(redirectUrl);
        const params = new URLSearchParams(urlObj.search);
        if (urlObj.host !== window.location.host) {
          params.set('codebase_redirect', dateNow);
          redirectUrl = redirectUrl.split('?')[0] + '?' + params.toString();
        }
        w.location.replace(redirectUrl);
      }, 5);
    },
    domLoaded: function (callbackFn) {
      if (d.readyState === 'complete' || d.readyState === 'interactive') {
        callbackFn();
      } else {
        d.addEventListener('DOMContentLoaded', callbackFn, { once: true });
      }
    },
    domChanged: function (callbackFn) {
      this.waitForElement('body', (bodyElem) => {
        const MutationObserver = w.MutationObserver || w.WebKitMutationObserver;
        const observer = new MutationObserver(() => {
          if (!w.codebaseIgnoreDomMutations) {
            callbackFn();
          }
        });
        observer.observe(bodyElem, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      });
    },
    waitForElement: function (selector, fn, additionalData) {
      const handledElems = new WeakSet();
      const MutationObserver = w.MutationObserver || w.WebKitMutationObserver;

      const check = () => {
        const elements = d.querySelectorAll(selector);
        elements.forEach((element) => {
          if (!handledElems.has(element)) {
            handledElems.add(element);
            fn.call(element, element, additionalData);
          }
        });
      };

      const observer = new MutationObserver(check);
      Script.mutationObservers.push(observer);
      observer.observe(d.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      check();
    },
    /**
     * Like waitForElement, but disconnects after the first successful match.
     * Use for one-shot DOM work (e.g. changesets) so each mutation on the page
     * does not re-run querySelector for every pending selector forever.
     */
    waitForElementOnce: function (selector, fn, additionalData) {
      const MutationObserver = w.MutationObserver || w.WebKitMutationObserver;
      const myEpoch = Script._waitOnceEpoch;
      let observer = null;
      let rafId = null;
      let timeoutId = null;

      const disconnect = () => {
        if (observer) {
          observer.disconnect();
          const idx = Script.mutationObservers.indexOf(observer);
          if (idx !== -1) Script.mutationObservers.splice(idx, 1);
          observer = null;
        }
        if (rafId != null) {
          w.cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (timeoutId != null) {
          w.clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      const runMatch = (element) => {
        if (Script._waitOnceEpoch !== myEpoch) {
          disconnect();
          return;
        }
        try {
          fn.call(element, element, additionalData);
        } catch (err) {
          if (System.logEnabled) {
            c.warn('Conversion APP # Visual changeset / waitForElementOnce apply failed', selector, err);
          }
        } finally {
          disconnect();
        }
      };

      let firstHit = null;
      try {
        firstHit = d.querySelector(selector);
      } catch (e) {
        return;
      }
      if (firstHit) {
        if (Script._waitOnceEpoch === myEpoch) {
          runMatch(firstHit);
        } else {
          disconnect();
        }
        return;
      }

      const flush = () => {
        rafId = null;
        if (Script._waitOnceEpoch !== myEpoch) {
          disconnect();
          return;
        }
        let el = null;
        try {
          el = d.querySelector(selector);
        } catch (e) {
          disconnect();
          return;
        }
        if (el) runMatch(el);
      };

      const scheduleFlush = () => {
        if (rafId != null) return;
        rafId = w.requestAnimationFrame(flush);
      };

      if (!d.documentElement) {
        return;
      }

      observer = new MutationObserver(scheduleFlush);
      Script.mutationObservers.push(observer);
      observer.observe(d.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      timeoutId = w.setTimeout(() => {
        if (Script._waitOnceEpoch !== myEpoch) {
          disconnect();
          return;
        }
        disconnect();
      }, 60000);
    },
    elementIsInView: function (selector, fn, persistentObserving) {
      if (!('IntersectionObserver' in w)) {
        System.log('error', 2, [
          'Helper "elementIsInView"',
          'IntersectionObserver is not supported',
        ]);
        return;
      }

      const handledElems = new WeakSet();

      const startObserving = () => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fn.call(entry.target, entry.target);
              if (!persistentObserving) {
                observer.unobserve(entry.target);
              }
            }
          });
        });

        d.querySelectorAll(selector).forEach((element) => {
          if (!handledElems.has(element)) {
            handledElems.add(element);
            observer.observe(element);
          }
        });

        Script.intersectionObservers.push(observer);
      };

      this.domLoaded(startObserving);
      this.domChanged(startObserving);
    },
    urlChanged: function (mode, callbackFn) {
      if (mode === 'polling') {
        let oldUrl = w.location.href;
        if (w.codebaseUrlChangeInterv) {
          clearInterval(w.codebaseUrlChangeInterv);
        }
        w.codebaseUrlChangeInterv = setInterval(() => {
          const currentUrl = w.location.href;
          if (currentUrl !== oldUrl) {
            oldUrl = currentUrl;
            callbackFn();
          }
        }, 10);
      } else if (mode === 'history') {
        w.history.pushState = new Proxy(w.history.pushState, {
          apply: (target, thisArg, argArray) => {
            setTimeout(callbackFn, 1);
            return target.apply(thisArg, argArray);
          },
        });
      }
    },
    getSetBucketingUrlExtension: function () {
      const userBucket = User.getExperimentsBucket();
      const entries = Object.entries(userBucket);

      if (entries.length === 0) return null;

      const expVarArr = entries.map(([expId, varId]) => `"${expId}_${varId}"`);
      return `[${expVarArr.join(',')}]`;
    },
    loadExternalCss: function (url) {
      var styleTag = d.createElement('link');
      styleTag.media = 'all';
      styleTag.rel = 'stylesheet';
      styleTag.type = 'text/css';
      styleTag.href = url;
      d.head.appendChild(styleTag);
    },
    loadExternalJs: function (url, callback) {
      var scriptTag = d.createElement('script');
      scriptTag.src = url;
      scriptTag.onload = callback;
      scriptTag.onreadystatechange = callback;
      d.head.appendChild(scriptTag);
    },
    checkForDataLayerEntry: function (entrySpecs, callbackFn) {
      this.poll(() => {
        if (typeof w.dataLayer === 'undefined') return false;

        return w.dataLayer.some((entry) =>
          entrySpecs.every(([key, value]) => entry.hasOwnProperty(key) && entry[key] === value),
        );
      }, callbackFn);
    },
  };
  Tools.init();

  var User = {
    storageKeyExps: System.storagePrefix + 'exps',
    storageKeyExcludedExperiments: System.storagePrefix + 'excludedExperiments',
    geoLocation: false,
    uuid: null,
    attributes: {
      device_type: 'other',
      visitor_type: 'new',
      'html-lang': '',
      url: '',
    },
    setUUID: function () {
      const storageKey = System.storagePrefix + 'uuid';
      let uuid = Storage.get(Script.storage, storageKey);
      if (!uuid) {
        uuid = Tools.generateUUID();
        Storage.set(Script.storage, storageKey, uuid);
      }
      this.uuid = uuid;
    },
    init: function () {
      this.setUUID();
      this.setVisits();
      this.setBrowser();
      this.setGeoLocation();
      this.setInitialAttributes();
      if (!this._resizeListenerSet) {
        this._resizeListenerSet = true;
        w.addEventListener('resize', () => {
          this.attributes.device_type = this.getDeviceType();
        });
      }
    },
    getExperimentsBucket() {
      // VB: changes cookie to localStorage
      const experimentsBucketStr = Storage.get(Script.storage, this.storageKeyExps);
      // VB: changes cookie to localStorage
      return experimentsBucketStr ? JSON.parse(experimentsBucketStr) : {};
    },
    setExperimentToBucket(experimentId, variationId, forceUpdate = false) {
      const experimentsBucket = this.getExperimentsBucket();
      if (experimentId in experimentsBucket && !forceUpdate) return false;
      experimentsBucket[experimentId] = variationId;
      // VB: changes cookie to localStorage
      // console.log(experimentsBucket, "experimentsBucket");
      // console.log(
      //   Script.storage,
      //   "Script.storage",
      //   this.storageKeyExps,
      //   "this.storageKeyExps"
      // );
      Storage.set(Script.storage, this.storageKeyExps, JSON.stringify(experimentsBucket));
      // VB: changes cookie to localStorage
      if (variationId !== 0) {
        const bucketing = {
          className: 'bucketing',
          data: { type: 'bucketing', value: variationId },
        };
        System.log('info', 0, 'Triggering BUCKETING Event', bucketing.data);
        EventQueue.add(Script.prepareEvent(bucketing));
      }
    },
    removeExperimentFromBucket(experimentId) {
      const experimentsBucket = this.getExperimentsBucket();
      if (!(experimentId in experimentsBucket)) return false;

      // Remove the experiment from the bucket
      delete experimentsBucket[experimentId];

      // Save updated bucket back to storage
      Storage.set(Script.storage, this.storageKeyExps, JSON.stringify(experimentsBucket));

      System.log(
        'info',
        false,
        `Removed experiment "${experimentId}" from bucket due to corrupted variation ID`,
      );

      return true;
    },
    setVisits() {
      // Check prerequisites
      if (!Script.generalPrerequisitesMet(true)) return;

      // Prevent double-counting on re-initialization
      if (Script.isReInited) return;

      // Prevent race conditions
      if (this._settingVisits) return;
      this._settingVisits = true;

      try {
        const storageKeySessionCheck = `${System.storagePrefix}session_check`;
        const storageKeyUvs = `${System.storagePrefix}uvs`;
        const unixNow = Math.floor(Date.now() / 1000);
        // Load existing data with error handling
        let uvs = null;
        try {
          const storedData = Storage.get(Script.storage, storageKeyUvs);
          if (storedData) {
            uvs = JSON.parse(storedData);

            // Validate the loaded data structure
            if (uvs && typeof uvs === 'object') {
              uvs = {
                first: typeof uvs.first === 'number' ? uvs.first : unixNow,
                last: typeof uvs.last === 'number' ? uvs.last : unixNow,
                sessions: typeof uvs.sessions === 'number' ? uvs.sessions : 0,
                pageviews: typeof uvs.pageviews === 'number' ? uvs.pageviews : 0,
                pageviewsSession:
                  typeof uvs.pageviewsSession === 'number' ? uvs.pageviewsSession : 0,
              };
            } else {
              uvs = null;
            }
          }
        } catch (error) {
          console.error('Failed to parse stored visits data:', error);
          uvs = null;
        }

        // Initialize default data if needed
        if (!uvs) {
          uvs = {
            first: unixNow,
            last: unixNow,
            sessions: 0,
            pageviews: 0,
            pageviewsSession: 0,
          };
        }

        // Update last visit time
        uvs.last = unixNow;

        // Session detection - always use sessionStorage for accurate session tracking
        const isNewSession = !Storage.get('sessionStorage', storageKeySessionCheck, true);

        if (isNewSession) {
          // New session detected
          uvs.sessions++;
          uvs.pageviewsSession = 1;
          Storage.set('sessionStorage', storageKeySessionCheck, '1', true);
        } else {
          // Same session
          uvs.pageviewsSession++;
        }

        // Always increment total pageviews
        uvs.pageviews++;

        // Store the visits object
        this.visits = uvs;

        // Save to storage
        Storage.set(Script.storage, storageKeyUvs, JSON.stringify(uvs));
      } finally {
        // Always release the lock
        this._settingVisits = false;
      }
    },
    getVariationIdOfExperiment(experiment) {
      const experimentId = experiment.data.iid;
      const experimentBucket = this.getExperimentsBucket();
      return experimentBucket[experimentId] || false;
    },
    setBrowser() {
      this.browser = browser;
      this.browser.desktop = !this.browser.mobile && !this.browser.tablet;
    },
    setGeoLocation: async function () {
      // Persist result across IIFE re-executions (e.g. SPA script re-injection)
      if (window.__cbGeoLocation !== undefined) {
        this.geoLocation = window.__cbGeoLocation;
        return;
      }
      if (this.geoLocation) return;
      // Persist the in-flight promise on window so concurrent calls across re-runs share it
      if (window.__cbGeoLocationPromise) {
        return window.__cbGeoLocationPromise.then(() => {
          this.geoLocation = window.__cbGeoLocation;
        });
      }
      window.__cbGeoLocationPromise = (async () => {
        try {
          // const res = await fetch('http://ip-api.com/json/?fields=country');
          // const data = await res.json();
          // this.geoLocation = window.__cbGeoLocation = data.country || '';
        } catch (e) {
          this.geoLocation = window.__cbGeoLocation = '';
        }
        window.__cbGeoLocationPromise = null;
      })();
      return window.__cbGeoLocationPromise;
    },
    getDeviceType: function () {
      const width = w.innerWidth;

      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';

      if (this.browser.mobile) return 'mobile';
      if (this.browser.tablet) return 'tablet';
      if (this.browser.desktop) return 'desktop';

      return 'desktop';
    },
    setInitialAttributes: function () {
      this.attributes.user_agent = w.navigator.userAgent;

      if (User.hasOwnProperty('visits') && User.visits.sessions > 1) {
        this.attributes.visitor_type = 'returning';
      }
      this.attributes.device_type = this.getDeviceType();
      this.attributes['html-lang'] = d.querySelector('html[lang]')?.getAttribute('lang') || '';
    },
  };
  var Project = {
    init: function (data) {
      this.className = 'project';
      this.data = data;
      if (System.logEnabled) {
        const style1 = 'background-color: #009955; border: 2px solid #009955; color: white;';
        c.groupCollapsed(
          '%cConversion APP # Initiated PROJECT "' + this.data.name + '"',
          style1,
          this.data.iid,
        );
      }
      this.runCodes();
      if (System.logEnabled) {
        c.groupEnd();
      }
    },
    runCodes: function () {
      System.detachCss();
      System.applyJs(this);
      System.applyCss(this);
    },
    runDefaultJs: function () {
      System.applyCustomJs(Script.getProjectData().js);
    },
    runHelperJs: function () {
      System.applyCustomJs(Script.getProjectData().helper_js);
    },
    runIntegrations: function (experiment, variation, isNewBucketing, redirectPageTargeting) {
      var integrations = {
        default: Script.projectData.default_integrations,
        custom: Script.projectData.custom_integrations,
      };
      if (experiment?.data?.personalization) return;

      const isSplitTest = experiment?.data?.test_type === 'split-test';
      const isBaseline = variation.data.baseline;

      if (isSplitTest) {
        // Baseline (control) stays on the origin page — fire integration immediately.
        // Non-baseline variations only fire when the user is already on a destination URL.
        if (!isBaseline) {
          const metaRules = variation.data.metadata_1;
          if (!Array.isArray(metaRules) || !metaRules.length) return;

          const currentUrl = new Urltargeting({}).removePreviewParams(System.getCurrentUrl());
          const simplify = (url) => new Urltargeting({}).simplifyUrl(url);

          // Find the first rule whose destination URL (by host+pathname) matches
          // the current URL — meaning the user has already been redirected here.
          const matchingRule = metaRules.find(
            (rule) =>
              rule.destination_url && simplify(currentUrl) === simplify(rule.destination_url),
          );

          if (!matchingRule) return;

          const { iid: ruleIid, redirect_type } = matchingRule;

          if (redirect_type === 'one_time') {
            // Fire only once per session for this rule.
            const intFiredKey = `${System.storagePrefix}split_int_${ruleIid}`;
            if (Storage.get('sessionStorage', intFiredKey, true)) return;
            Storage.set('sessionStorage', intFiredKey, '1', true);
          }
          // For every_time: no gate — fire on every page load of the destination.
        }
      } else {
        // Original AB-test logic: hold off until the destination-redirect has
        // actually occurred (codebase_redirect is set in sessionStorage).
        const destinationRedirectUrl =
          redirectPageTargeting?.filter((target) => target.url_type === 'destination_redirect') ??
          [];
        var lastRedirect = Storage.get('sessionStorage', 'codebase_redirect');
        if (destinationRedirectUrl.length > 0 && !isBaseline && !lastRedirect) {
          return;
        }
      }

      for (var type in integrations) {
        if (integrations.hasOwnProperty(type)) {
          integrations[type].forEach(function (integrationData) {
            var integration = new Integration(integrationData);
            const jsCode = integration.data.jscode;
            // Prepare the integration event object upfront
            var integrationEvent = {
              type: 'integration',
              integration: {
                type: type,
                iid: integration.data.iid,
              },
              data: {
                experimentId: experiment.data.iid,
                isBaseline: variation?.data?.baseline,
                experimentName: experiment.data.name,
                variationName: variation.data.name,
                variationId: variation.data.iid,
                userId: User.uuid,
              },
            };
            // Determine if the integration should run directly or be queued
            var runDirectly = true;
            // Check if integration should run synchronously
            if (
              integration.data.run_synchronously ||
              experiment.data.integrations_run_mode === 'sync'
            ) {
              runDirectly = true;
            }
            // Handle 'userBucketed' hook case for new bucketing
            if (integration.data.used_hook === 'userBucketed' && isNewBucketing) {
              if (runDirectly) {
                integration.run(Project, experiment, variation);
              } else {
                EventQueue.add(integrationEvent);
              }
            } else {
              // Handle non-'userBucketed' hook or when bucketing is not new
              if (runDirectly) {
                integration.run(Project, experiment, variation);
              } else {
                EventQueue.add(integrationEvent);
              }
            }
          });
        }
      }
    },
  };
  class Experiment {
    constructor(data, silent = false) {
      this.className = 'experiment';
      this.data = typeof data === 'string' ? Script.getExperimentById(data) : data;
      this.silent = silent;
      this.variationId = false;
      this.metadata = this.getMetadata();
    }
    init() {
      if (!this.data) return false;
      if (!this.silent && !this.shouldNotRun()) {
        const additionalInfo = Script.isPreview ? ' (Preview)' : '';
        System.log(
          'info',
          false,
          `Initiated EXPERIMENT ${
            this.data.name
          } (${this.data.status?.toUpperCase()}) ${additionalInfo}`,
          // this.data.iid
        );
      }
      this.variationId = User.getVariationIdOfExperiment(this);
      if (this.variationId !== false && !this.variationIdExists(this.variationId)) {
        // Variation ID is corrupted (variation was deleted)
        System.log(
          'warn',
          false,
          `Corrupted variation ID "${this.variationId}" found for experiment "${this.data.name}". Cleaning up and allowing re-bucketing.`,
        );
        // Remove the corrupted variation from storage
        User.removeExperimentFromBucket(this.data.iid);
        // Reset variationId to allow re-bucketing
        this.variationId = false;
      }
      if (Script.projectData.is_spa) this.reset();
      if (Script.isPreview) {
        const previewVariationId = Script.getVariationIdToPreviewByExperiment(this);
        if (previewVariationId) {
          this.variationId = previewVariationId;
        } else {
          return false;
        }
      }
      return true;
    }
    reset() {
      delete Script.activeExperiments[this.data.iid];
      System.applyResetJs(this);
      System.applyResetCss(this);
      if (this.variationId) new Variation(this.variationId, true).reset();
    }
    getMetadata() {
      return Object.fromEntries(
        [...Array(3).keys()]
          .map((i) => [`metadata_key_exp_${i + 1}`, this.data[`metadata_${i + 1}`] ?? ''])
          .filter(([key]) => Project.data[key]),
      );
    }
    // shouldNotRun() {
    //   if (Script.isPreview) return false;
    //   const storageKey = System.storagePrefix + 'debug';
    //   const debugToken = Storage.get(Script.storage, storageKey);
    //   const checkExperiment = debugToken ? debugToken.split('_').includes(this.data.iid) : false;
    //   return this.data.qaMode && !checkExperiment;
    // }
    shouldNotRun() {
      if (Script.isPreview) return false;

      const exclusionKey = User.storageKeyExcludedExperiments;
      const excludedExperiments = Storage.get('sessionStorage', exclusionKey, true);
      const excludedExperimentIds = excludedExperiments ? JSON.parse(excludedExperiments) : [];

      // Exclusion list always wins
      if (excludedExperimentIds.includes(this.data.iid)) return true;

      // Live experiments always run regardless of qaMode
      if (!this.data.status || this.data.status === 'live') return false;

      // Non-live (preview, paused, etc.): check for permitted access paths

      // Allow if already bucketed — returning user who was previously exposed
      const experimentsBucket = User.getExperimentsBucket();
      if (experimentsBucket[this.data.iid]) return false;

      // Allow if cId explicitly targets this experiment
      const cId = Tools.getUrlParameter('cId');
      if (cId && cId.split('_')[0] === this.data.iid) return false;

      // Allow if a valid debug token is present
      const storageKey = System.urlParamPrefix + 'debug';
      const debugToken = Storage.get(Script.storage, storageKey);
      const checkExperiment = debugToken
        ? debugToken === 'true' || debugToken.split('_').includes(this.data.iid)
        : false;

      return !checkExperiment;
    }
    run() {
      Script.activeExperiments[this.data.iid] = this.variationId;
      // console.log(this.data.test_type, 'this.data.test_type');
      if (this.data.test_type === 'split-test') return;
      System.applyJs(this);
      System.applyCss(this);
    }
    environmentsPassed(silent) {
      return (
        this.data.environments.length === 0 ||
        this.data.environments.some((env) => new Environment(env).matches(silent))
      );
    }
    async audiencesPassedAsync(silent) {
      if (Script.isPreview) {
        System.log('info', 3, 'Skipping, because Preview Mode is active');
        return true;
      }
      const interactionEvent = this.data.audience_targeting?.interaction_data?.event;
      if (interactionEvent && !w.__codebaseFiredInteractions.has(interactionEvent)) {
        return false;
      }
      if (this.data.audience_targeting) {
        const audData = {
          ...this.data.audience_targeting,
          conditionsMatchType: this.data.audiences_match_type || 'AND',
        };
        // console.log(await new Audience(audData, this.data.iid).rulesPassed(silent), 'audData');
        return await new Audience(audData, this.data.iid).rulesPassed(silent);
      }

      if (!this.data.audiences || this.data.audiences.length === 0) return true;

      if (this.data.audiences_match_type === 'any') {
        for (const aud of this.data.audiences) {
          const passed = await new Audience(aud, this.data.iid).rulesPassed?.(silent);
          if (passed) return true;
        }
        return false;
      } else {
        for (const aud of this.data.audiences) {
          const passed = await new Audience(aud, this.data.iid).rulesPassed?.(silent);
          if (!passed) return false;
        }
        return true;
      }
    }
    trafficAllocationPassed() {
      return Math.random() < this.data.traffic_allocation / 100;
    }
    chooseVariation() {
      const forcedVariationId = System.forcedVariations[this.data.iid];
      if (forcedVariationId) {
        System.log('info', 1, 'Forced Variation ID', forcedVariationId);
        return forcedVariationId;
      }
      const varsDicerArr = this.data.variations.flatMap((varObj) =>
        Array(Math.round(varObj.traffic_allocation)).fill(varObj.iid),
      );

      return varsDicerArr[Math.floor(Math.random() * varsDicerArr.length)];
    }
    getVariationData(variationId) {
      return this.data.variations.find((varObj) => varObj.iid === variationId) || false;
    }
    variationIdExists(variationIdSearch) {
      return this.data.variations.some((varObj) => varObj.iid === variationIdSearch);
    }
    passesExclusionGroups() {
      if (!Project.data.exclusion_groups.length || Script.isPreview) {
        if (Script.isPreview)
          System.log('info', 2, 'Skipping EXCLUSION GROUP LOOKUP due to Previewing');
        return true;
      }
      let passed = true;
      Project.data.exclusion_groups.forEach((group) => {
        System.log('info', 2, `Initiated EXCLUSION GROUP LOOKUP "${group.name}"`, group.iid);
        const groupExpIds = group.exclusion_group_entries.map((entry) => entry.experiment_id);
        if (!groupExpIds.includes(this.data.iid)) return;
        const experimentsBucket = User.getExperimentsBucket();
        let pickedExperimentId = Object.keys(experimentsBucket).find(
          (expId) => groupExpIds.includes(expId) && Script.carriesExperiment(expId),
        );
        const matchingEntries = group.exclusion_group_entries.filter((entry) => {
          const expToCheck = Script.getExperimentById(entry.experiment_id);
          return expToCheck && new Experiment(expToCheck, true).audiencesPassedAsync(true);
        });
        if (!pickedExperimentId) {
          const diceArr = matchingEntries.flatMap((entry) =>
            Array(entry.traffic).fill(entry.experiment_id),
          );
          pickedExperimentId = diceArr[Math.floor(Math.random() * diceArr.length)];
        }
        if (pickedExperimentId !== this.data.iid) passed = false;
      });

      if (passed) System.log('info', 2, 'EXCLUSION GROUP passed');
      return passed;
    }
  }
  class Variation {
    constructor(variationId, silent = false) {
      this.className = 'variation';
      this.data = Script.getVariationById(variationId);
      this.experiment = Script.getExperimentByVariationId(variationId);
      this.metadata = this.getMetadata();
      if (!silent) {
        System.log(
          'info',
          false,
          `Initiated VARIATION : "${this.data.name}" (${this.data.iid}) for experiment ${this.experiment.name}`,
        );
      }
    }
    getMetadata() {
      const metadata = {};
      for (let i = 1; i <= 3; i++) {
        const key = Project.data[`metadata_key_var_${i}`];
        if (!key) continue;
        metadata[key] = this.data[`metadata_${i}`] ?? '';
      }
      return metadata;
    }
    run() {
      try {
        this.runCodes();
      } finally {
        // Always apply visual changesets for the selected variation,
        // including baseline/reference variations.
        // this.runVisualChanges();
        this.runVisualChangesV2();
      }
    }
    runCodes() {
      if (this.experiment?.test_type === 'split-test') {
        this.runSplitTest();
        return;
      }
      System.applyJs(this);
      System.applyCss(this);
    }
    runSplitTest() {
      System.log(
        'info',
        false,
        `Split-test check for VARIATION "${this.data.name}" (${this.data.iid})`,
      );

      const metaRules = this.data.metadata_1;
      if (!Array.isArray(metaRules) || !metaRules.length) {
        System.log('info', false, 'Split-test: no redirect rules found in metadata_1');
        return;
      }

      const buildDestinationUrlForVariation = (rule) => {
        if (!rule) return '';
        const {
          origin_url,
          destination_url,
          replace_type,
          find_in_page_url,
          replace_in_page_url,
          query_parameters = [],
        } = rule;
        let baseUrl;
        if (replace_type === 'matching_text' && find_in_page_url && destination_url) {
          baseUrl = destination_url.replace(find_in_page_url, replace_in_page_url ?? '');
        } else {
          baseUrl = destination_url ?? '';
        }
        if (!query_parameters?.length) return baseUrl;
        try {
          const url = new URL(baseUrl);
          query_parameters.forEach(({ parameter, value }) => {
            if (parameter) url.searchParams.set(parameter, value ?? '');
          });
          return url.toString();
        } catch {
          const params = query_parameters
            .filter(({ parameter }) => parameter)
            .map(
              ({ parameter, value }) =>
                `${encodeURIComponent(parameter)}=${encodeURIComponent(value ?? '')}`,
            )
            .join('&');
          const separator = baseUrl.includes('?') ? '&' : '?';
          return params ? `${baseUrl}${separator}${params}` : baseUrl;
        }
      };

      const currentUrl = new Urltargeting({}).removePreviewParams(System.getCurrentUrl());

      System.log(
        'info',
        false,
        `Split-test: evaluating ${metaRules.length} rule(s) against URL "${currentUrl}"`,
      );

      for (const rule of metaRules) {
        const { origin_url, redirect_condition, redirect_type, iid } = rule;
        // Check if the current URL matches the rule's origin condition.
        // Condition value encodes both the url_type and matchType, e.g.
        // "substring_include", "substring_exclude", "simple_include",
        // "simple_exclude", "regex_include", "regex_exclude".
        const [condType, condMatch] = (redirect_condition || '').split('_');
        let condResult = false;
        if (condType === 'substring') {
          condResult = currentUrl.includes(origin_url);
        } else if (condType === 'simple') {
          condResult =
            new Urltargeting({}).simplifyUrl(currentUrl) ===
            new Urltargeting({}).simplifyUrl(origin_url);
        } else if (condType === 'regex') {
          try {
            condResult = new RegExp(origin_url).test(currentUrl);
          } catch {}
        }
        // "exclude" conditions pass when the raw result is false
        const matches = condMatch === 'exclude' ? !condResult : condResult;
        if (!matches) {
          System.log(
            'info',
            false,
            `Split-test: rule "${iid}" skipped — origin_url "${origin_url}" did not match (${redirect_condition})`,
          );
          continue;
        }

        // one_time: redirect only once per session per rule
        if (redirect_type === 'one_time') {
          const oneTimeKey = `${System.storagePrefix}split_redirect_${iid}`;
          if (Storage.get('sessionStorage', oneTimeKey, true)) {
            System.log(
              'info',
              false,
              `Split-test: rule "${iid}" skipped — already redirected this session (one_time)`,
            );
            continue;
          }
          Storage.set('sessionStorage', oneTimeKey, '1', true);
        }

        const destinationUrl = buildDestinationUrlForVariation(rule);
        if (!destinationUrl) continue;

        System.log('info', false, `Split-test redirect`, {
          origin_url,
          destination_url: destinationUrl,
          redirect_type,
          redirect_condition,
        });
        // keepQueryParameters=false: destination URL is already fully built
        // preventLoops=false for every_time so it fires on every matching page load
        Tools.redirect(destinationUrl, false, redirect_type !== 'every_time');
        break;
      }
    }
    reset() {
      System.applyResetJs(this);
      System.applyResetCss(this);
    }
    runVisualChangesV2() {
      if (!this.data?.changesets) return;
    
      const parseChangeSets = (raw) => {
        try {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          return Array.isArray(parsed) ? parsed : [];
        } catch (_) {
          return [];
        }
      };
    
      const toDomInsertPosition = (entry) => {
        // V2 chain-set: action = before|after|replace
        if (entry?.action === "before") return "beforebegin";
        if (entry?.action === "after") return "afterend";
        // Legacy fallback
        const legacyMap = {
          before: "beforebegin",
          after: "afterend",
          prepend: "afterbegin",
          append: "beforeend",
        };
        return legacyMap[entry?.action] || "beforeend";
      };
    
      const safeInsertPosition = (elem, position) => {
        // HTML/BODY cannot use beforebegin/afterend
        if (
          (elem.tagName === "HTML" || elem.tagName === "BODY") &&
          (position === "beforebegin" || position === "afterend")
        ) {
          return position === "beforebegin" ? "afterbegin" : "beforeend";
        }
        return position;
      };

      const upsertPersistentStyleTag = (rulesText) => {
        const selector = `style.codebase-css[data-codebase-css-type="${this.className}"][data-codebase-css-type-id="${this.data?.iid}"][data-codebase-css-source="changesets-v2"]`;
        d.querySelectorAll(selector).forEach((elem) => elem.remove());
        if (!rulesText) return;

        const h = d.head || d.getElementsByTagName("head")[0];
        if (!h) return;

        const styleElem = d.createElement("style");
        styleElem.className = "codebase-css";
        styleElem.dataset.codebaseCssType = this.className;
        styleElem.dataset.codebaseCssTypeId = this.data?.iid;
        styleElem.dataset.codebaseCssSource = "changesets-v2";
        styleElem.appendChild(d.createTextNode(rulesText));
        h.appendChild(styleElem);
      };

      const buildPersistentStyleRules = (entries) =>
        entries
          .filter((entry) => {
            if (!entry || !entry.selector) return false;
            if (String(entry.type || "").toLowerCase() !== "style") return false;
            if (!entry.property) return false;
            if (entry.value == null || entry.value === "") return false;
            return true;
          })
          .map(
            (entry) =>
              `${entry.selector} { ${entry.property}: ${String(entry.value)} !important; }`,
          )
          .join("\n");
    
      const applyEntry = (entry) => {
        if (!entry || !entry.selector) return;
    
        // V2 full-body snapshot support
        if (entry.selector === "__vvveb_body__" && entry.html != null) {
          document.body.innerHTML = String(entry.html);
          return;
        }
    
        // Normalize type + field names across old/new formats
        const type = String(entry.type || "").toLowerCase();
        const attrName = entry.attribute || entry.property; // new: attribute, old: property
        const contentHtml = entry.html;
        const contentValue = entry.value;
    
        Tools.waitForElementOnce(entry.selector, (elem) => {
          if (!elem) return;

          switch (type) {
            case "content":
              if (contentHtml != null) elem.innerHTML = String(contentHtml);
              else if (contentValue != null) elem.textContent = String(contentValue);
              break;
    
            case "style":
              if (!entry.property) return;
              if (contentValue == null || contentValue === "") {
                elem.style.removeProperty(entry.property);
              } else {
                // Keep behavior close to V2 editor apply path
                elem.style.setProperty(entry.property, String(contentValue), "important");
              }
              break;
    
            case "attribute":
              if (!attrName) return;
              if (contentValue == null) elem.removeAttribute(attrName);
              else elem.setAttribute(attrName, String(contentValue));
              break;
    
            case "insert": {
              const pos = safeInsertPosition(elem, toDomInsertPosition(entry));
              const html = entry.html ?? entry.value ?? "";
              if (html) elem.insertAdjacentHTML(pos, String(html));
              break;
            }
    
            case "remove":
              // V2 treats remove as hide
              elem.style.display = "none";
              break;
    
            case "reorder": {
              // V2: move selector element relative to targetSelector
              if (!entry.targetSelector) return;
              Tools.waitForElementOnce(entry.targetSelector, (targetElem) => {
                if (
                  !targetElem ||
                  !targetElem.parentNode ||
                  !elem.isConnected ||
                  !targetElem.isConnected
                ) {
                  return;
                }
                if (entry.action === "before") {
                  targetElem.parentNode.insertBefore(elem, targetElem);
                } else {
                  targetElem.parentNode.insertBefore(elem, targetElem.nextSibling);
                }
              });
              break;
            }
    
            // Legacy compatibility
            case "insertadjacenthtml":
              if (entry.property) {
                const pos = safeInsertPosition(elem, entry.property);
                elem.insertAdjacentHTML(pos, String(contentValue ?? ""));
              }
              break;
    
            case "insertadjacentelement":
              if (entry.property && entry.value) {
                Tools.waitForElementOnce(entry.value, (anchorElem) => {
                  if (anchorElem) anchorElem.insertAdjacentElement(entry.property, elem);
                });
              }
              break;
    
            default:
              break;
          }
        });
      };
    
      const changeSets = parseChangeSets(this.data.changesets);
      if (!changeSets.length) return;

      upsertPersistentStyleTag(buildPersistentStyleRules(changeSets));
    
      changeSets.forEach(applyEntry);
    }
    // runVisualChanges() {
    //   /*
    //   Old changesets handler (legacy format):
    //   if (!this.data.changesets) return;
    //   const changeSets = JSON.parse(this.data.changesets);
    //   changeSets.forEach(({ selector, changes }) => {
    //     const composedChanges = Object.entries(changes).flatMap(([attribute, value]) =>
    //       typeof value === 'object'
    //         ? Object.entries(value).map(([property, val]) => ({
    //             attribute,
    //             property,
    //             value: val,
    //           }))
    //         : [{ attribute, property: '', value }],
    //     );
    //     Tools.waitForElement(selector, (elem) => {
    //       composedChanges.forEach(({ attribute, property, value }) => {
    //         if (['className', 'href', 'src', 'innerHTML', '_id'].includes(attribute)) {
    //           elem[attribute] = value;
    //         } else if (attribute === 'style') {
    //           elem.style[property] = value;
    //         } else if (attribute === 'insertAdjacentHTML') {
    //           elem.insertAdjacentHTML(property, `<div>${value}</div>`);
    //         } else if (attribute === 'insertAdjacentElement') {
    //           Tools.waitForElement(value, (anchorElem) => {
    //             anchorElem.insertAdjacentElement(property, elem);
    //           });
    //         }
    //       });
    //     });
    //   });
    //   */
    //   if (!this.data.changesets) return;
    //   let changeSets = [];
    //   try {
    //     changeSets =
    //       typeof this.data.changesets === 'string'
    //         ? JSON.parse(this.data.changesets)
    //         : this.data.changesets;
    //   } catch (e) {
    //     return;
    //   }
    //   if (!Array.isArray(changeSets)) return;
    //   changeSets.forEach(({ selector, type, property, value, action, html }) => {
    //     if (!selector || !type) return;

    //     Tools.waitForElement(selector, (elem) => {
    //       if (type === 'content') {
    //         elem.innerHTML = value ?? '';
    //       } else if (type === 'style' && property) {
    //         elem.style[property] = value ?? '';
    //       } else if (type === 'attribute' && property) {
    //         elem.setAttribute(property, value ?? '');
    //       } else if (type === 'insert') {
    //         const actionMap = {
    //           before: 'beforebegin',
    //           after: 'afterend',
    //           prepend: 'afterbegin',
    //           append: 'beforeend',
    //         };
    //         let position = actionMap[action] || 'beforeend';
    //         // HTML/BODY cannot accept beforebegin/afterend reliably in all browsers.
    //         if (
    //           (elem.tagName === 'HTML' || elem.tagName === 'BODY') &&
    //           (position === 'beforebegin' || position === 'afterend')
    //         ) {
    //           position = position === 'beforebegin' ? 'afterbegin' : 'beforeend';
    //         }
    //         elem.insertAdjacentHTML(position, `${html ?? value ?? ''}`);
    //       } else if (type === 'insertAdjacentHTML' && property) {
    //         elem.insertAdjacentHTML(property, `${value ?? ''}`);
    //       } else if (type === 'insertAdjacentElement' && property && value) {
    //         Tools.waitForElement(value, (anchorElem) => {
    //           anchorElem.insertAdjacentElement(property, elem);
    //         });
    //       }
    //     });
    //   });
    // }
    hasRedirect() {
      return (
        (this.data.redirect_url !== '' && this.data.redirect_url !== null) ||
        this.data.jscode.includes('.redirect(')
      );
    }
  }
  class Environment {
    constructor(data) {
      this.data = data;
    }
    matches(silent = false) {
      const result = this.data.rules_js ? System.jsConditionReturnsTrue(this.data.rules_js) : true;

      if (!silent && result) {
      }

      return result;
    }
  }
  class Page {
    constructor(data, experimentId) {
      this.data = typeof data === 'string' ? Script.getPageById(data) : data;
      this.experimentId = experimentId;
    }
    matches(silent = false, skipJsCheck = false) {
      const currentUrl = System.getCurrentUrl();
      const { urltargetings, rules_js, conditions, newSchema, conditionsMatchType } = this.data;
      let resultRules =
        !skipJsCheck && rules_js
          ? System.jsConditionReturnsTrue(rules_js, this.experimentId)
          : true;

      if (newSchema && conditions && conditions.length > 0) {
        const evaluateTargetBlock = (targetBlock) => {
          if (!targetBlock.conditionGroups || targetBlock.conditionGroups.length === 0) return true;

          const targetBlockMatchType = targetBlock.matchType || 'AND';

          const evaluateGroup = (group) => {
            const matchType = group.matchType || 'OR';
            if (!group.conditions || group.conditions.length === 0) return true;

            const evaluateInner = (c) => {
              let matchResult = false;
              const setUrl = c.url;
              const urlType = c.url_type;
              // const cleanedUrl = new Urltargeting({}).removePreviewParams(currentUrl);
              const targetUrl = currentUrl;

              if (urlType === 'simple') {
                matchResult =
                  new Urltargeting({}).simplifyUrl(targetUrl) ===
                  new Urltargeting({}).simplifyUrl(setUrl);
              } else if (urlType === 'exact') {
                matchResult =
                  new Urltargeting({}).removeLastSlash(targetUrl) ===
                  new Urltargeting({}).removeLastSlash(setUrl);
              } else if (urlType === 'substring') {
                matchResult = targetUrl.includes(setUrl);
              } else if (urlType === 'regex') {
                matchResult = new RegExp(setUrl).test(targetUrl);
              } else if (urlType === 'destination_redirect') {
                matchResult = targetUrl.includes(setUrl);
              }

              if (c.matchType === 'exclude') {
                return !matchResult;
              }
              return matchResult;
            };

            return matchType === 'AND'
              ? group.conditions.every(evaluateInner)
              : group.conditions.some(evaluateInner);
          };

          return targetBlockMatchType === 'OR'
            ? targetBlock.conditionGroups.some(evaluateGroup)
            : targetBlock.conditionGroups.every(evaluateGroup);
        };
        // conditionsMatchType (pages_match_type) controls how multiple outer condition blocks combine

        const conditionMatches =
          conditionsMatchType === 'AND'
            ? conditions.every(evaluateTargetBlock)
            : conditions.some(evaluateTargetBlock);
        // console.log(conditionMatches, 'conditionMatches', resultRules, 'resultRules');
        return conditionMatches && resultRules;
      }

      let resultUrls = urltargetings && urltargetings.length === 0;
      if (urltargetings) {
        for (const urlTargetingData of urltargetings) {
          const urlTargeting = new Urltargeting(urlTargetingData);
          const urlMatch = urlTargeting.matches(currentUrl);

          if (urlMatch === 'include') {
            resultUrls = true;
          } else if (urlMatch) {
            resultUrls = false;
            break;
          }
        }
      }
      return resultUrls && resultRules;
    }
    isActive() {
      return Script.activePages.includes(this.data.iid);
    }
    setActive() {
      if (!this.isActive()) {
        Script.activePages.push(this.data.iid);
      }
    }
    setInactive() {
      if (this.data.deactivation_mode === 'persistent') {
        System.log(
          'info',
          false,
          `Not deactivating persistent PAGE "${this.data.name}"`,
          this.data.iid,
        );
        return;
      }
      const index = Script.activePages.indexOf(this.data.iid);
      if (index !== -1) {
        Script.activePages.splice(index, 1);
        System.log('info', false, `Deactivated PAGE "${this.data.name}"`, this.data.iid);

        if (this.data.deactivation_mode === 'reset') {
          this.data.experiments.forEach((expId) => {
            new Experiment(Script.getExperimentById(expId), true).init();
          });
        }
      }
    }
    run(skipJsCheck = false) {
      if (this.isActive() && !this.matches(false)) {
        this.setInactive();
        return;
      }
      const timeoutMs = this.data.poll_on_rules ? 2000 : 0;
      Tools.poll(
        () => this.matches(false),
        () => {
          if (this.isActive()) {
            System.log(
              'info',
              false,
              `Ignoring triggered PAGE "${this.data.name}" because it is already active`,
              this.data.iid,
            );
            return;
          }
          this.setActive();
          System.log('info', false, `Initiated PAGE "${this.data.name}"`, this.data.iid);
          this.applyGoals();
          this.data.experiments.forEach((expId) => {
            const experiment = new Experiment(Script.getExperimentById(expId));
            if (experiment.shouldNotRun()) return;
            if (!experiment.init()) return;

            // System.log("info", 2, "Initiated ENVIRONMENTS LOOKUP");
            Tools.poll(
              () => experiment.environmentsPassed(),
              () => {
                System.log('info', false, 'Initiated AUDIENCES LOOKUP');
                // Use a shared reference to hold the async result
                const pollState = { audiencesPassed: false };
                // Evaluate async condition
                experiment.audiencesPassedAsync().then((result) => {
                  pollState.audiencesPassed = result;
                  // console.log(result, 'result', experiment.data, 'experiment.data.name');
                  Tools.poll(
                    () => result === true,
                    () => {
                      Tools.poll(
                        () => experiment.passesExclusionGroups(),
                        () => {
                          let isNewBucketing = false;
                          const cId = Tools.getUrlParameter('cId');
                          const forcedExperimentIdForPreview = cId ? cId.split('_')[0] : null;
                          const forceVariationForPreview = cId ? cId.split('_')[1] : null;
                          if (
                            forcedExperimentIdForPreview &&
                            forcedExperimentIdForPreview === experiment.data.iid
                          ) {
                            experiment.variationId = forceVariationForPreview;
                            User.setExperimentToBucket(
                              experiment.data.iid,
                              experiment.variationId,
                              true,
                            );
                            isNewBucketing = true;
                          }

                          if (experiment.variationId === false) {
                            // If script is inactive, don't bucket new users
                            if (!Script.projectData.active) {
                              System.log(
                                'info',
                                false,
                                `Skipping new bucketing for experiment "${experiment.data.name}" because script is paused (active: false)`,
                              );
                              return;
                            }

                            if (!experiment.trafficAllocationPassed()) {
                              experiment.variationId = 0;
                            } else {
                              experiment.variationId = experiment.chooseVariation();
                              isNewBucketing = true;
                            }
                            User.setExperimentToBucket(experiment.data.iid, experiment.variationId);

                            if (experiment.variationId === 0) return;
                          }
                          const redirectPageTargeting = Project.data.pages
                            .filter((page) => page.experiments.includes(experiment.data.iid))
                            ?.flatMap((page) => page.urltargetings);
                          const variation = new Variation(experiment.variationId, false);

                          setTimeout(() => {
                            Project.runIntegrations(
                              experiment,
                              variation,
                              isNewBucketing,
                              redirectPageTargeting,
                            );
                          }, 1);
                          experiment.run();
                          variation.run();
                        },
                      );
                    },
                  );
                });
              },
            );
          });
        },
        () => {},
        timeoutMs,
        timeoutMs,
      );
    }
    applyGoals() {
      Tools.domLoaded(() => {
        setTimeout(() => {
          this.data.goals.forEach((goalId) => {
            const goal = new Goal(Script.getGoalById(goalId));
            if (goal.data.type === 'pageview') {
              goal.trigger();
            }
          });
        }, 500);
      });
    }
  }
  class Urltargeting {
    constructor(data) {
      this.data = data;
    }
    simplifyUrl(url) {
      const urlParts = System.parseUrl(url);
      return urlParts.host + urlParts.pathname;
    }
    removeLastSlash(url) {
      return url.endsWith('/') ? url.slice(0, -1) : url;
    }
    removePreviewParams(url) {
      const paramsToRemove = [
        System.urlParamPrefix + 'preview',
        System.urlParamPrefix + 'qa_token',
        System.urlParamPrefix + 'debug',
        'cId',
      ];
      if (paramsToRemove.some((param) => Tools.getUrlParameter(param, url))) {
        let urlObj = new URL(url);
        let params = new URLSearchParams(urlObj.search);
        paramsToRemove.forEach((param) => params.delete(param));
        urlObj.search = params.toString();
        url = urlObj.toString();
      }
      return url;
    }
    actualValue(currentUrl, urlTargetingData) {
      const { url_type, url: setUrl } = urlTargetingData || this.data;
      // currentUrl = this.removePreviewParams(currentUrl);
      let currentValue = null;
      if (url_type === 'simple') {
        currentValue = currentUrl;
      } else if (url_type === 'exact') {
        currentValue = this.removeLastSlash(currentUrl);
      } else if (url_type === 'substring') {
        const urlObj = new URL(currentUrl);
        currentValue = currentUrl.includes(setUrl) ? setUrl : urlObj.pathname;
      } else if (url_type === 'regex') {
        const match = currentUrl.match(new RegExp(setUrl));
        currentValue = match && match[0] ? match[0] : currentUrl || '';
      } else if (url_type === 'destination_redirect') {
        currentValue = currentUrl;
      }
      return currentValue;
    }
    matches(currentUrl, urlTargetingData) {
      const { type, url_type, url: setUrl } = urlTargetingData || this.data;
      // currentUrl = this.removePreviewParams(currentUrl);
      let matchResult = false;

      if (url_type === 'simple') {
        return currentUrl === setUrl && type === 'include'
          ? true
          : currentUrl !== setUrl && type === 'exclude'
            ? true
            : false;
      } else if (url_type === 'exact') {
        matchResult = this.removeLastSlash(currentUrl) === this.removeLastSlash(setUrl);
      } else if (url_type === 'substring') {
        matchResult =
          currentUrl.includes(setUrl) && type === 'include'
            ? true
            : !currentUrl.includes(setUrl) && type === 'exclude'
              ? true
              : false;
      } else if (url_type === 'regex') {
        matchResult =
          new RegExp(setUrl).test(currentUrl) && type === 'include'
            ? true
            : !new RegExp(setUrl).test(currentUrl) && type === 'exclude'
              ? true
              : false;
      } else if (url_type === 'destination_redirect') {
        matchResult = currentUrl.includes(setUrl);
      }
      return matchResult;
    }
  }
  class Audience {
    constructor(data, experimentId) {
      this.data = typeof data === 'string' ? Script.getAudienceById(data) : data;
      this.experimentId = experimentId;
    }
    // TODO FOR WHEN DIFFERENT AUDIENCE RULES ARE PASSED
    async rulesPassed(silent = false) {
      // If this audience is gated on an interaction event, return false until
      // the user fires it. The interaction handler calls reInit() which triggers
      // a fresh rulesPassed() evaluation where this gate will pass.
      const { interaction_data } = this.data;
      if (interaction_data?.event && !w.__codebaseFiredInteractions.has(interaction_data.event)) {
        return false;
      }

      let result = false;
      const { newSchema, conditions, rules_js, conditionsMatchType = 'AND' } = this.data;

      if (newSchema && conditions && conditions.length > 0) {
        // conditionsMatchType (audiences_match_type) controls how multiple outer blocks combine:
        // AND = all blocks must pass, OR = any block can pass
        const isOuterOR = conditionsMatchType === 'OR';
        let outerResult = !isOuterOR; // AND starts true, OR starts false
        for (const targetBlock of conditions) {
          if (!targetBlock.conditionGroups || targetBlock.conditionGroups.length === 0) continue;

          const targetBlockMatchType = targetBlock.matchType || 'AND';
          let blockResult = targetBlockMatchType === 'OR' ? false : true;

          for (const group of targetBlock.conditionGroups) {
            const matchType = group.matchType || 'OR';
            if (!group.conditions || group.conditions.length === 0) {
              if (targetBlockMatchType === 'OR') {
                blockResult = true;
                break;
              } else {
                continue;
              }
            }

            const evaluateInner = async (c) => {
              let conditionResult = false;
              if (c.type === 'device_type') {
                conditionResult =
                  String(c.rules_value).toLowerCase().trim() === 'all' ||
                  String(c.rules_value)
                    .toLowerCase()
                    .split(',')
                    .map((s) => s.trim())
                    .includes(String(User.attributes.device_type).toLowerCase());
              } else if (c.type === 'visitor_type') {
                conditionResult =
                  String(c.rules_value).toLowerCase().trim() === 'all' ||
                  String(c.rules_value)
                    .toLowerCase()
                    .split(',')
                    .map((s) => s.trim())
                    .includes(String(User.attributes.visitor_type).toLowerCase());
              } else if (c.type === 'url_param') {
                if (c.rules_js) {
                  conditionResult = await System.jsConditionReturnsTrueAsync(
                    c.rules_js,
                    this.experimentId,
                  );
                } else {
                  const { key, value } = c?.metadata || {};
                  if (!key) {
                    conditionResult = true;
                  } else {
                    const actualParamValue = Tools.getUrlParameter(key);
                    const expectedValue = value !== undefined ? value : c?.rules_value || '';
                    conditionResult =
                      actualParamValue !== null &&
                      String(actualParamValue).toLowerCase() ===
                        String(expectedValue).toLowerCase();
                  }
                }
              } else {
                if (c.rules_js) {
                  conditionResult = await System.jsConditionReturnsTrueAsync(
                    c.rules_js,
                    this.experimentId,
                  );
                } else {
                  conditionResult = true;
                }
              }
              if (c.metadata?.operator === 'not_equals') {
                conditionResult = !conditionResult;
              }
              return conditionResult;
            };

            let groupResult = matchType === 'AND' ? true : false;
            if (matchType === 'AND') {
              for (const c of group.conditions) {
                if (!(await evaluateInner(c))) {
                  groupResult = false;
                  break;
                }
              }
            } else {
              for (const c of group.conditions) {
                if (await evaluateInner(c)) {
                  groupResult = true;
                  break;
                }
              }
            }

            if (targetBlockMatchType === 'OR') {
              if (groupResult) {
                blockResult = true;
                break;
              }
            } else {
              if (!groupResult) {
                blockResult = false;
                break;
              }
            }
          }

          if (isOuterOR) {
            if (blockResult) {
              outerResult = true;
              break;
            }
          } else {
            if (!blockResult) {
              outerResult = false;
              break;
            }
          }
        }
        result = outerResult;
      } else {
        result = await System.jsConditionReturnsTrueAsync(rules_js, this.experimentId);
      }

      const audience = Script.getAudienceById(this.data.iid) || this.data;
      if (!silent && result) {
        System.log(
          'info',
          false,
          `AUDIENCE "${audience.name}" is matching`,
          // this.data.iid
        );
      }
      return result;
    }
  }
  var GoalStorage = {
    storageKey: System.storagePrefix + 'tgoals',
    add: function (goal) {
      const goalId = goal.data.iid;
      const variationIds = Script.getCleanedUserBucketVariationIds();
      const triggeredGoals = this.getAll();

      if (!triggeredGoals[goalId]) {
        triggeredGoals[goalId] = variationIds;
      } else {
        const existing = new Set(triggeredGoals[goalId]);
        variationIds.forEach((varId) => existing.add(varId));
        triggeredGoals[goalId] = Array.from(existing);
      }

      Storage.set('localStorage', this.storageKey, JSON.stringify(triggeredGoals));
    },
    getAll: function () {
      var jsonObj = Storage.get('localStorage', this.storageKey);
      if (!jsonObj) {
        return {};
      }
      var tgoals = JSON.parse(jsonObj);
      return tgoals;
    },
    getUntriggeredVariationIds: function (goal) {
      const goalId = goal.data.iid;
      const variationIds = Object.values(Script.getCleanedUserBucket());
      const triggeredGoals = this.getAll();

      if (!triggeredGoals[goalId]) {
        return variationIds;
      }

      const triggered = new Set(triggeredGoals[goalId]);
      return variationIds.filter((varId) => !triggered.has(varId));
    },
  };
  class Goal {
    constructor(data) {
      this.className = 'goal';
      this.data = typeof data === 'string' ? Script.getGoalById(data) : data;
    }
    trigger(value) {
      if (value) {
        this.data.value = value;
      }
      Script.pingedGoals.push({
        _id: this.data.iid,
        time: Date.now(),
        value: value || null,
      });
      if (!Script.goalsEnabled) {
        return false;
      }
      System.log(
        'info',
        false,
        `Triggered GOAL "${this.data.name}" (${this.data.type})`,
        this.data.iid,
      );
      if (this.data.counting_method === 'one') {
        const untriggeredVariationIds = GoalStorage.getUntriggeredVariationIds(this);
        if (untriggeredVariationIds.length) {
          this.send();
        }
      } else {
        this.send();
      }
      GoalStorage.add(this);
    }
    send() {
      let variationIdsContext = Script.getCleanedUserBucketVariationIds();
      if (this.data.counting_method === 'one') {
        variationIdsContext = GoalStorage.getUntriggeredVariationIds(this);
      }
      EventQueue.add(Script.prepareEvent(this, variationIdsContext));
    }
  }
  class Integration {
    constructor(data) {
      this.className = 'integration';
      this.data = data;
    }
    runCode(project, experiment, variation) {
      const { jscode } = this.data;
      const projectId = project.data.iid;
      const projectName = project.data.name;
      const experimentId = experiment.data.iid;
      const experimentName = experiment.data.name;
      const variationId = variation.data.iid;
      const variationName = variation.data.name;
      const isBaseline = variation.data.baseline;
      const user_id = User.uuid;
      const clientId = User.uuid;
      let evalResult = false;
      try {
        eval(jscode);
        evalResult = 'done';
      } catch (err) {
        evalResult = err.message;
      }
      return evalResult;
    }
    run(project, experiment, variation) {
      if (!Script.goalsEnabled) {
        System.log('info', false, 'Skipping INTEGRATION because goals are disabled');
        return false;
      }
      if (experiment.data.personalization) {
        System.log('info', false, 'Skipping INTEGRATION because experiment is personalization.');
        return false;
      }
      if (experiment.data.qaMode) {
        System.log('info', false, 'Skipping INTEGRATION because experiment is QA mode.');
        return false;
      }
      let intervCount = 0;
      const intervMax = 20;
      const intervalName = `integrationJsInterval_${this.data.name.replace(
        /[^A-Za-z0-9]/g,
        '',
      )}_${experiment.data.iid}_${experiment.data.name}`;
      System.log('info', false, intervalName, 'Interval Name');
      Tools.domLoaded(() => {
        if (w[intervalName]) {
          System.log('info', false, 'Clearing interval', intervalName);
          clearInterval(w[intervalName]);
          return;
        }
        w[intervalName] = setInterval(() => {
          System.log('info', false, 'Running INTEGRATION', intervalName, this.data.name);

          const result = this.runCode(project, experiment, variation);
          if (result === 'done' || intervCount >= intervMax) {
            System.log('info', false, 'Clearing interval', intervalName);
            clearInterval(w[intervalName]);
            if (result !== 'done') {
              System.log('error', false, [this, result]);
            }
          }
          intervCount++;
        }, 100);
        // Run once immediately after DOM is loaded
        if (this.runCode(project, experiment, variation) === 'done') {
          clearInterval(w[intervalName]);
        }
      });
    }
  }
  Api.init();
  Script.init({
    ...data,
  });
  EventQueue.init();
  Api.handleFormerlyPushedCalls();
  Script.main = function () {
    Project.init(Script.getProjectData());
    d.dispatchEvent(new CustomEvent('codebase_initialized'));
    const triggers = {
      direct: [],
      url_change_history: [],
      url_change_polling: [],
      dom_change: [],
      callback: [],
      polling: [],
      api: [],
    };
    Project.data.pages.forEach((pageData) => {
      const page = new Page(pageData, Project.data.iid);
      triggers[page.data.trigger].push(page);
    });
    Object.keys(triggers).forEach((trigger) => {
      triggers[trigger].forEach((page) => {
        page.run();
        if (trigger === 'url_change_history' || trigger === 'url_change_polling') {
          Tools.urlChanged(trigger.replace('url_change_', ''), () => page.run());
        } else if (trigger === 'dom_change') {
          Tools.domChanged(() => page.run());
        } else if (trigger === 'callback') {
          const activate = (shouldActivate) =>
            shouldActivate === false ? page.setInactive() : page.run();
          const pageInfo = { iid: page.data.iid };
          const codebaseTools = Tools;
          eval(
            `(function(activate, page, codebaseTools) { ${page.data.trigger_js} })(activate, pageInfo, codebaseTools)`,
          );
        }
      });
    });
    // Push previously set goals
    Script.formerlyPushedGoals.forEach((pushedCall) => w.codebase.push(pushedCall));
    // Setup click listener for codebase goals if not already set
    if (!w.codebaseClickListener) {
      w.codebaseClickListener = true;
      d.addEventListener(
        'click',
        (e) => {
          const clickedElem = e.target;
          const clickGoals = Script.getActiveClickGoals();
          const activeGoalIds = clickGoals.map((goal) => goal.iid);

          clickGoals.forEach((goal) => {
            if (clickedElem.closest(goal.css_selector)) {
              new Goal(goal).trigger();
            }
          });
          if (clickedElem.hasAttribute('data-codebase-clickgoals')) {
            const goalIdsFormAttr = clickedElem.getAttribute('data-codebase-clickgoals').split(',');
            goalIdsFormAttr.forEach((goalId) => {
              if (activeGoalIds.includes(goalId)) {
                new Goal(Script.getGoalById(goalId)).trigger();
              }
            });
          }
        },
        true,
      );
    }
  };
  if (Script.projectData.is_spa) {
    Script.initSpaRouteObserver();
  }
  if (!Script.projectData.run_only_on_reinit) {
    // console.log("Running main script");
    // STEP 1: Run the main script
    Script.run();
  }
})(window, document, console);
// # sourceURL=conversion.js
