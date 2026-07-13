(() => {
var Pr=Object.defineProperty;var Lr=(R,h,J)=>h in R?Pr(R,h,{enumerable:!0,configurable:!0,writable:!0,value:J}):R[h]=J;var ct=(R,h,J)=>Lr(R,typeof h!="symbol"?h+"":h,J);(function(){"use strict";var R,h,J,G,dt,_t,ut,ft,Te,Me,Pe,pt,fe={},pe=[],bn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,oe=Array.isArray;function U(e,t){for(var n in t)e[n]=t[n];return e}function Le(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Ee(e,t,n){var r,o,a,i={};for(a in t)a=="key"?r=t[a]:a=="ref"?o=t[a]:i[a]=t[a];if(arguments.length>2&&(i.children=arguments.length>3?R.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(a in e.defaultProps)i[a]===void 0&&(i[a]=e.defaultProps[a]);return ge(e,i,r,o,null)}function ge(e,t,n,r,o){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o??++J,__i:-1,__u:0};return o==null&&h.vnode!=null&&h.vnode(a),a}function $(e){return e.children}function W(e,t){this.props=e,this.context=t}function X(e,t){if(t==null)return e.__?X(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?X(e):null}function yn(e){if(e.__P&&e.__d){var t=e.__v,n=t.__e,r=[],o=[],a=U({},t);a.__v=t.__v+1,h.vnode&&h.vnode(a),Oe(e.__P,a,t,e.__n,e.__P.namespaceURI,32&t.__u?[n]:null,r,n??X(t),!!(32&t.__u),o),a.__v=t.__v,a.__.__k[a.__i]=a,vt(r,a,o),t.__e=t.__=null,a.__e!=n&&gt(a)}}function gt(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),gt(e)}function Ae(e){(!e.__d&&(e.__d=!0)&&G.push(e)&&!he.__r++||dt!=h.debounceRendering)&&((dt=h.debounceRendering)||_t)(he)}function he(){try{for(var e,t=1;G.length;)G.length>t&&G.sort(ut),e=G.shift(),t=G.length,yn(e)}finally{G.length=he.__r=0}}function ht(e,t,n,r,o,a,i,s,_,d,u){var l,f,p,y,S,w,g,b=r&&r.__k||pe,L=t.length;for(_=vn(n,t,b,_,L),l=0;l<L;l++)(p=n.__k[l])!=null&&(f=p.__i!=-1&&b[p.__i]||fe,p.__i=l,w=Oe(e,p,f,o,a,i,s,_,d,u),y=p.__e,p.ref&&f.ref!=p.ref&&(f.ref&&Re(f.ref,null,p),u.push(p.ref,p.__c||y,p)),S==null&&y!=null&&(S=y),(g=!!(4&p.__u))||f.__k===p.__k?_=mt(p,_,e,g):typeof p.type=="function"&&w!==void 0?_=w:y&&(_=y.nextSibling),p.__u&=-7);return n.__e=S,_}function vn(e,t,n,r,o){var a,i,s,_,d,u=n.length,l=u,f=0;for(e.__k=new Array(o),a=0;a<o;a++)(i=t[a])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?i=e.__k[a]=ge(null,i,null,null,null):oe(i)?i=e.__k[a]=ge($,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?i=e.__k[a]=ge(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):e.__k[a]=i,_=a+f,i.__=e,i.__b=e.__b+1,s=null,(d=i.__i=$n(i,n,_,l))!=-1&&(l--,(s=n[d])&&(s.__u|=2)),s==null||s.__v==null?(d==-1&&(o>u?f--:o<u&&f++),typeof i.type!="function"&&(i.__u|=4)):d!=_&&(d==_-1?f--:d==_+1?f++:(d>_?f--:f++,i.__u|=4))):e.__k[a]=null;if(l)for(a=0;a<u;a++)(s=n[a])!=null&&!(2&s.__u)&&(s.__e==r&&(r=X(s)),wt(s,s));return r}function mt(e,t,n,r){var o,a;if(typeof e.type=="function"){for(o=e.__k,a=0;o&&a<o.length;a++)o[a]&&(o[a].__=e,t=mt(o[a],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=X(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function me(e,t){return t=t||[],e==null||typeof e=="boolean"||(oe(e)?e.some(function(n){me(n,t)}):t.push(e)),t}function $n(e,t,n,r){var o,a,i,s=e.key,_=e.type,d=t[n],u=d!=null&&(2&d.__u)==0;if(d===null&&s==null||u&&s==d.key&&_==d.type)return n;if(r>(u?1:0)){for(o=n-1,a=n+1;o>=0||a<t.length;)if((d=t[i=o>=0?o--:a++])!=null&&!(2&d.__u)&&s==d.key&&_==d.type)return i}return-1}function bt(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||bn.test(t)?n:n+"px"}function be(e,t,n,r,o){var a,i;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||bt(e.style,t,"");if(n)for(t in n)r&&n[t]==r[t]||bt(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")a=t!=(t=t.replace(ft,"$1")),i=t.toLowerCase(),t=i in e||t=="onFocusOut"||t=="onFocusIn"?i.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+a]=n,n?r?n.u=r.u:(n.u=Te,e.addEventListener(t,a?Pe:Me,a)):e.removeEventListener(t,a?Pe:Me,a);else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function yt(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=Te++;else if(t.t<n.u)return;return n(h.event?h.event(t):t)}}}function Oe(e,t,n,r,o,a,i,s,_,d){var u,l,f,p,y,S,w,g,b,L,E,O,q,F,H,D=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(_=!!(32&n.__u),a=[s=t.__e=n.__e]),(u=h.__b)&&u(t);e:if(typeof D=="function")try{if(g=t.props,b=D.prototype&&D.prototype.render,L=(u=D.contextType)&&r[u.__c],E=u?L?L.props.value:u.__:r,n.__c?w=(l=t.__c=n.__c).__=l.__E:(b?t.__c=l=new D(g,E):(t.__c=l=new W(g,E),l.constructor=D,l.render=kn),L&&L.sub(l),l.state||(l.state={}),l.__n=r,f=l.__d=!0,l.__h=[],l._sb=[]),b&&l.__s==null&&(l.__s=l.state),b&&D.getDerivedStateFromProps!=null&&(l.__s==l.state&&(l.__s=U({},l.__s)),U(l.__s,D.getDerivedStateFromProps(g,l.__s))),p=l.props,y=l.state,l.__v=t,f)b&&D.getDerivedStateFromProps==null&&l.componentWillMount!=null&&l.componentWillMount(),b&&l.componentDidMount!=null&&l.__h.push(l.componentDidMount);else{if(b&&D.getDerivedStateFromProps==null&&g!==p&&l.componentWillReceiveProps!=null&&l.componentWillReceiveProps(g,E),t.__v==n.__v||!l.__e&&l.shouldComponentUpdate!=null&&l.shouldComponentUpdate(g,l.__s,E)===!1){t.__v!=n.__v&&(l.props=g,l.state=l.__s,l.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(x){x&&(x.__=t)}),pe.push.apply(l.__h,l._sb),l._sb=[],l.__h.length&&i.push(l);break e}l.componentWillUpdate!=null&&l.componentWillUpdate(g,l.__s,E),b&&l.componentDidUpdate!=null&&l.__h.push(function(){l.componentDidUpdate(p,y,S)})}if(l.context=E,l.props=g,l.__P=e,l.__e=!1,O=h.__r,q=0,b)l.state=l.__s,l.__d=!1,O&&O(t),u=l.render(l.props,l.state,l.context),pe.push.apply(l.__h,l._sb),l._sb=[];else do l.__d=!1,O&&O(t),u=l.render(l.props,l.state,l.context),l.state=l.__s;while(l.__d&&++q<25);l.state=l.__s,l.getChildContext!=null&&(r=U(U({},r),l.getChildContext())),b&&!f&&l.getSnapshotBeforeUpdate!=null&&(S=l.getSnapshotBeforeUpdate(p,y)),F=u!=null&&u.type===$&&u.key==null?$t(u.props.children):u,s=ht(e,oe(F)?F:[F],t,n,r,o,a,i,s,_,d),l.base=t.__e,t.__u&=-161,l.__h.length&&i.push(l),w&&(l.__E=l.__=null)}catch(x){if(t.__v=null,_||a!=null)if(x.then){for(t.__u|=_?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;a[a.indexOf(s)]=null,t.__e=s}else{for(H=a.length;H--;)Le(a[H]);Ie(t)}else t.__e=n.__e,t.__k=n.__k,x.then||Ie(t);h.__e(x,t,n)}else a==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):s=t.__e=wn(n.__e,t,n,r,o,a,i,_,d);return(u=h.diffed)&&u(t),128&t.__u?void 0:s}function Ie(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(Ie))}function vt(e,t,n){for(var r=0;r<n.length;r++)Re(n[r],n[++r],n[++r]);h.__c&&h.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(a){a.call(o)})}catch(a){h.__e(a,o.__v)}})}function $t(e){return typeof e!="object"||e==null||e.__b>0?e:oe(e)?e.map($t):U({},e)}function wn(e,t,n,r,o,a,i,s,_){var d,u,l,f,p,y,S,w=n.props||fe,g=t.props,b=t.type;if(b=="svg"?o="http://www.w3.org/2000/svg":b=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),a!=null){for(d=0;d<a.length;d++)if((p=a[d])&&"setAttribute"in p==!!b&&(b?p.localName==b:p.nodeType==3)){e=p,a[d]=null;break}}if(e==null){if(b==null)return document.createTextNode(g);e=document.createElementNS(o,b,g.is&&g),s&&(h.__m&&h.__m(t,a),s=!1),a=null}if(b==null)w===g||s&&e.data==g||(e.data=g);else{if(a=a&&R.call(e.childNodes),!s&&a!=null)for(w={},d=0;d<e.attributes.length;d++)w[(p=e.attributes[d]).name]=p.value;for(d in w)p=w[d],d=="dangerouslySetInnerHTML"?l=p:d=="children"||d in g||d=="value"&&"defaultValue"in g||d=="checked"&&"defaultChecked"in g||be(e,d,null,p,o);for(d in g)p=g[d],d=="children"?f=p:d=="dangerouslySetInnerHTML"?u=p:d=="value"?y=p:d=="checked"?S=p:s&&typeof p!="function"||w[d]===p||be(e,d,p,w[d],o);if(u)s||l&&(u.__html==l.__html||u.__html==e.innerHTML)||(e.innerHTML=u.__html),t.__k=[];else if(l&&(e.innerHTML=""),ht(t.type=="template"?e.content:e,oe(f)?f:[f],t,n,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":o,a,i,a?a[0]:n.__k&&X(n,0),s,_),a!=null)for(d=a.length;d--;)Le(a[d]);s||(d="value",b=="progress"&&y==null?e.removeAttribute("value"):y!=null&&(y!==e[d]||b=="progress"&&!y||b=="option"&&y!=w[d])&&be(e,d,y,w[d],o),d="checked",S!=null&&S!=e[d]&&be(e,d,S,w[d],o))}return e}function Re(e,t,n){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(o){h.__e(o,n)}}function wt(e,t,n){var r,o;if(h.unmount&&h.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||Re(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){h.__e(a,t)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&wt(r[o],t,n||typeof e.type!="function");n||Le(e.__e),e.__c=e.__=e.__e=void 0}function kn(e,t,n){return this.constructor(e,n)}function We(e,t,n){var r,o,a,i;t==document&&(t=document.documentElement),h.__&&h.__(e,t),o=(r=!1)?null:t.__k,a=[],i=[],Oe(t,e=t.__k=Ee($,null,[e]),o||fe,fe,t.namespaceURI,o?null:t.firstChild?R.call(t.childNodes):null,a,o?o.__e:t.firstChild,r,i),vt(a,e,i)}function kt(e){function t(n){var r,o;return this.getChildContext||(r=new Set,(o={})[t.__c]=this,this.getChildContext=function(){return o},this.componentWillUnmount=function(){r=null},this.shouldComponentUpdate=function(a){this.props.value!=a.value&&r.forEach(function(i){i.__e=!0,Ae(i)})},this.sub=function(a){r.add(a);var i=a.componentWillUnmount;a.componentWillUnmount=function(){r&&r.delete(a),i&&i.call(a)}}),n.children}return t.__c="__cC"+pt++,t.__=e,t.Provider=t.__l=(t.Consumer=function(n,r){return n.children(r)}).contextType=t,t}R=pe.slice,h={__e:function(e,t,n,r){for(var o,a,i;t=t.__;)if((o=t.__c)&&!o.__)try{if((a=o.constructor)&&a.getDerivedStateFromError!=null&&(o.setState(a.getDerivedStateFromError(e)),i=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,r||{}),i=o.__d),i)return o.__E=o}catch(s){e=s}throw e}},J=0,W.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=U({},this.state),typeof e=="function"&&(e=e(U({},n),this.props)),e&&U(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Ae(this))},W.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ae(this))},W.prototype.render=$,G=[],_t=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ut=function(e,t){return e.__v.__b-t.__v.__b},he.__r=0,ft=/(PointerCapture)$|Capture$/i,Te=0,Me=yt(!1),Pe=yt(!0),pt=0;var Fe;function N(e,t){return h.__a&&h.__a(t),e}(Fe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:void 0)!=null&&Fe.__PREACT_DEVTOOLS__&&Fe.__PREACT_DEVTOOLS__.attachPreact("10.29.0",h,{Fragment:$,Component:W});var ee,k,Ue,St,ae=0,xt=[],C=h,Ct=C.__b,Nt=C.__r,Dt=C.diffed,Tt=C.__c,Mt=C.unmount,Pt=C.__;function ye(e,t){C.__h&&C.__h(k,e,ae||t),ae=0;var n=k.__H||(k.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function z(e){return ae=1,Sn(Ot,e)}function Sn(e,t,n){var r=ye(ee++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Ot(void 0,t),function(s){var _=r.__N?r.__N[0]:r.__[0],d=r.t(_,s);_!==d&&(r.__N=[d,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.__f)){var o=function(s,_,d){if(!r.__c.__H)return!0;var u=r.__c.__H.__.filter(function(f){return f.__c});if(u.every(function(f){return!f.__N}))return!a||a.call(this,s,_,d);var l=r.__c.props!==s;return u.some(function(f){if(f.__N){var p=f.__[0];f.__=f.__N,f.__N=void 0,p!==f.__[0]&&(l=!0)}}),a&&a.call(this,s,_,d)||l};k.__f=!0;var a=k.shouldComponentUpdate,i=k.componentWillUpdate;k.componentWillUpdate=function(s,_,d){if(this.__e){var u=a;a=void 0,o(s,_,d),a=u}i&&i.call(this,s,_,d)},k.shouldComponentUpdate=o}return r.__N||r.__}function ie(e,t){var n=ye(ee++,3);!C.__s&&At(n.__H,t)&&(n.__=e,n.u=t,k.__H.__h.push(n))}function ze(e){return ae=5,Z(function(){return{current:e}},[])}function Z(e,t){var n=ye(ee++,7);return At(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function ve(e,t){return ae=8,Z(function(){return e},t)}function Lt(e){var t=k.context[e.__c],n=ye(ee++,9);return n.c=e,t?(n.__==null&&(n.__=!0,t.sub(k)),t.props.value):e.__}function xn(){for(var e;e=xt.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some($e),t.__h.some(He),t.__h=[]}catch(n){t.__h=[],C.__e(n,e.__v)}}}C.__b=function(e){k=null,Ct&&Ct(e)},C.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Pt&&Pt(e,t)},C.__r=function(e){Nt&&Nt(e),ee=0;var t=(k=e.__c).__H;t&&(Ue===k?(t.__h=[],k.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.some($e),t.__h.some(He),t.__h=[],ee=0)),Ue=k},C.diffed=function(e){Dt&&Dt(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(xt.push(t)!==1&&St===C.requestAnimationFrame||((St=C.requestAnimationFrame)||Cn)(xn)),t.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Ue=k=null},C.__c=function(e,t){t.some(function(n){try{n.__h.some($e),n.__h=n.__h.filter(function(r){return!r.__||He(r)})}catch(r){t.some(function(o){o.__h&&(o.__h=[])}),t=[],C.__e(r,n.__v)}}),Tt&&Tt(e,t)},C.unmount=function(e){Mt&&Mt(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.some(function(r){try{$e(r)}catch(o){t=o}}),n.__H=void 0,t&&C.__e(t,n.__v))};var Et=typeof requestAnimationFrame=="function";function Cn(e){var t,n=function(){clearTimeout(r),Et&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);Et&&(t=requestAnimationFrame(n))}function $e(e){var t=k,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),k=t}function He(e){var t=k;e.__c=e.__(),k=t}function At(e,t){return!e||e.length!==t.length||t.some(function(n,r){return n!==e[r]})}function Ot(e,t){return typeof t=="function"?t(e):t}const Q=(e,{general:{font1:t,font2:n,font3:r}},o)=>{const a=e==="font1"?t:e==="font2"?n:e==="font3"?r:e;return o&&a==="inherit"?"Arial, sans-serif":a},Nn=({mode:e,onEnd:t,date:n})=>`| mode: ${e},${e==="date"?` endDate: ${n},`:""} onEnd: ${t}`,Be=({widgetId:e,shouldShow:t,cause:n,timer:r})=>{console.log("%cGSC Countdown Timer App",`color: white; background: rgb(69,32,94);
        background: linear-gradient(111deg, rgba(69,32,94,1) 0%, rgba(177,39,39,1) 50%, rgba(252,176,69,1) 100%); font-size: 12px; font-weight: 600; border-radius: 6px; padding: 5px 10px;`,`ID: ${e??"N/A"} | show: ${t?"✅":"⛔"} | (${n}) ${r?Nn(r):""}`)};var Dn=0;function c(e,t,n,r,o,a){t||(t={});var i,s,_=t;if("ref"in _)for(s in _={},t)s=="ref"?i=t[s]:_[s]=t[s];var d={type:e,props:_,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Dn,__i:-1,__u:0,__source:o,__self:a};if(typeof e=="function"&&(i=e.defaultProps))for(s in i)_[s]===void 0&&(_[s]=i[s]);return h.vnode&&h.vnode(d),d}const M="https://assets.getsitecontrol.com/shopify-apps/shared/icons",Tn={copy:`${M}/basics/copy-filled.svg`,"copy-outlined":`${M}/basics/copy-regular.svg`,bag:`${M}/shopping-discounts/tote-bag-filled.svg`,basket:`${M}/shopping-discounts/basket-shopping-filled.svg`,tag:`${M}/shopping-discounts/tag-filled.svg`,discount:`${M}/shopping-discounts/ticket-simple-percent-filled.svg`,"discount-star":`${M}/shopping-discounts/badge-percent-filled.svg`,"timer-solid":`${M}/clocks-timers/alarm-clock-filled.svg`,"timer-outline-5":`${M}/clocks-timers/alarm-clock-regular.svg`,"timer-solid-square":`${M}/clocks-timers/clock-square-filled.svg`,"timer-outline-square":`${M}/clocks-timers/clock-square-regular.svg`,"timer-solid-circle":`${M}/clocks-timers/clock-filled.svg`,"timer-outline-circle":`${M}/clocks-timers/clock-regular.svg`},It=e=>{const t=e.url||(e.type?Tn[e.type]:null);return t?e.mask!==!1?c("span",{className:"gta-icon gta-icon--url",style:{display:"inline-block",width:"1em",height:"1em",backgroundColor:e.color||"currentColor",maskImage:`url(${t})`,WebkitMaskImage:`url(${t})`,maskSize:"contain",maskRepeat:"no-repeat",maskPosition:"center"}}):c("img",{className:"gta-icon gta-icon--img",src:t,alt:"",style:{display:"inline-block",width:"1em",height:"1em",objectFit:"contain"}}):null},je="gsc-timer",Rt=e=>e instanceof Date&&!Number.isNaN(e.getTime());class se{static loadData(t){const n={endDate:null,closeDate:null,hash:null};try{const r=localStorage.getItem(`${je}-${t}`),o=JSON.parse(r??"{}"),a=new Date(o.endDate);Rt(a)&&(n.endDate=a);const i=new Date(o.closeDate);Rt(i)&&(n.closeDate=i),typeof o.hash=="string"&&(n.hash=o.hash)}catch{}return n}static saveData(t,n){try{const r=this.loadData(n);localStorage.setItem(`${je}-${n}`,JSON.stringify({...r,endDate:t.endDate.toISOString(),hash:t.hash}))}catch{}}static setCloseDate(t,n){try{const r=this.loadData(n);r&&localStorage.setItem(`${je}-${n}`,JSON.stringify({...r,closeDate:t.toISOString()}))}catch{}}}const Wt=new Map().set("DM Sans, sans-serif","DM Sans").set("Space Grotesk, sans-serif","Space Grotesk").set("Inter, sans-serif","Inter").set("Eczar, serif","Eczar").set("Work Sans, sans-serif","Work Sans").set("Manrope, sans-serif","Manrope").set("Fira Sans, sans-serif","Fira Sans").set("PT Serif, serif","PT Serif, serif").set("Cardo, serif","Cardo").set("Lora, serif","Lora").set("Libre Franklin, sans-serif","Libre Franklin").set("Playfair Display, serif","Playfair Display").set("Roboto, sans-serif","Roboto").set("Roboto Mono, monospace","Roboto Mono").set("Anek Telugu, sans-serif","Anek Telugu").set("Quicksand, sans-serif","Quicksand").set("Cormorant, serif","Cormorant").set("Alegreya, serif","Alegreya").set("Poppins, sans-serif","Poppins").set("Oswald, sans-serif","Oswald").set("Raleway, sans-serif","Raleway").set("Lato, sans-serif","Lato").set("Fraunces, serif","Fraunces").set("Montserrat, sans-serif","Montserrat").set("Anton, sans-serif","Anton").set("Outfit, sans-serif","Outfit").set("Radley, sans-serif","Radley").set("Josefin Sans, sans-serif","Josefin Sans").set("Merriweather, serif","Merriweather").set("Lobster, sans-serif","Lobster").set("Dancing Script, cursive","Dancing Script").set("Pacifico, cursive","Pacifico").set("Italianno, cursive","Italianno").set("Old Standard TT, serif","Old Standard TT").set("Space Mono, monospace","Space Mono").set("Tenor Sans, sans-serif","Tenor Sans").set("Prata, serif","Prata").set("Sacramento, cursive","Sacramento").set("Chakra Petch, sans-serif","Chakra Petch").set("Pixelify Sans, sans-serif","Pixelify Sans").set("Satisfy, cursive","Satisfy").set("Amatic SC, cursive","Amatic SC").set("Alfa Slab One, cursive","Alfa Slab One").set("Righteous, cursive","Righteous").set("Yellowtail, cursive","Yellowtail").set("Bungee, cursive","Bungee").set("Silkscreen, cursive","Silkscreen").set("Rubik Bubbles, cursive","Rubik Bubbles").set("Luckiest Guy, cursive","Luckiest Guy").set("Squada One, cursive","Squada One").set("Special Elite, cursive","Special Elite").set("Matemasie, cursive","Matemasie").set("Fascinate Inline, cursive","Fascinate Inline").set("Honk, cursive","Honk").set("Nabla, cursive","Nabla").set("Rubic Dirt, system-ui","Rubic Dirt").set("Raleway Dots, sans-serif","Raleway Dots").set("Love Ya Like A Sister, cursive","Love Ya Like A Sister").set("Italiana, sans-serif","Italiana").set("Rye, serif","Rye").set("Tomorrow, sans-serif","Tomorrow").set("Chewy, system-ui","Chewy").set("Six Caps, sans-serif","Six Caps").set("Londrina Solid, sans-serif","Londrina Solid").set("Antonio, sans-serif","Antonio").set("Squada One, sans-serif","Squada One").set("Cabin Sketch, sans-serif","Cabin Sketch").set("Rubik Scribble, system-ui","Rubik Scribble").set("Freckle Face, system-ui","Freckle Face").set("Sancreek, serif","Sancreek").set("Stint Ultra Condensed, serif","Stint Ultra Condensed").set("Tourney, sans-serif","Tourney").set("Alumni Sans Inline One, sans-serif","Alumni Sans Inline One").set("Creepster, system-ui","Creepster").set("Eater, system-ui","Eater").set("Griffy, system-ui","Griffy").set("Mountains of Christmas, serif","Mountains of Christmas").set("Codystar, sans-serif","Codystar").set("Festive, cursive","Festive"),Mn=e=>{const t=[...new Set(e)].reduce((r,o)=>{if(Wt.has(o)){const a=`${Wt.get(o).replace(/ +/g,"+")}:400,500,600,700,800,900`;return[...r,a]}return r},[]);if(t.length===0)return null;const n=document.createElement("link");return n.rel="stylesheet",n.href=`https://fonts.googleapis.com/css?family=${t.join("|")}`,n},Pn=()=>{const{settings:e}=A(),{font1:t,font2:n,font3:r}=e.general;ie(()=>{const o=Mn([t,n,r]);return o&&document.head.appendChild(o),()=>{o&&document.head.removeChild(o)}},[t,n,r])},Ft="background: transparent",Ut=(e,t)=>e&&parseInt(t)>0?`backdrop-filter: blur(${t}); -webkit-backdrop-filter: blur(${t});`:"",Ln=({color:e,blur:t,enabled:n})=>{const r=Ft;return n?{backgroundStyle:`
    background-color: ${e||"transparent"};
    ${Ut(!0,t)}`,overlayStyle:r}:{backgroundStyle:"",overlayStyle:r}},En=({enabled:e,source:t,src:n,bgColor:r,overlayColor:o,blur:a})=>{let i=Ft;if(!e)return{backgroundStyle:"",overlayStyle:i};const s=t==="color",_=!!n;return i=`background: ${s?"transparent":o};`,{backgroundStyle:`
    background: ${s?r:_?`url(${n}) center / cover no-repeat`:"transparent"};
    ${Ut(s,a)}`,overlayStyle:i}},An=e=>"source"in e,we=e=>An(e)?En(e):Ln(e),v=e=>`${(e==null?void 0:e.top)||"0"} ${(e==null?void 0:e.right)||"0"} ${(e==null?void 0:e.bottom)||"0"} ${(e==null?void 0:e.left)||"0"}`,zt=e=>({justify:e.endsWith("left")?"flex-start":e.endsWith("center")?"center":"flex-end",align:e.startsWith("top")?"flex-start":e.startsWith("center")?"center":"flex-end"}),Ht=e=>{switch(e){case"left":return"flex-start";case"center":return"center";case"right":return"flex-end";default:return"initial"}},On=(e,t)=>{const{general:n,content:r,section:o,type:a}=e,i=zt((o==null?void 0:o.contentDesktopPosition)||"center-center"),s=zt((o==null?void 0:o.contentMobilePosition)||"center-center");return`
    .gta-widget.${t} {
      --gta-font1: ${n.font1};
      --gta-font2: ${n.font2};
      --gta-font3: ${n.font3};
      --gta-banner-desktop-ratio: ${(o==null?void 0:o.desktopHeight)||"100%"};
      --gta-banner-mobile-ratio: ${(o==null?void 0:o.mobileHeight)||"100%"};

      --gta-banner-justify-content: ${i.justify};
      --gta-banner-align-items: ${i.align};

      --gta-content-direction: ${a==="bar"?"row":"column"};
      --gta-content-wrap: ${a==="bar"?"wrap":"nowrap"};
      --gta-content-desktop-width: ${r.desktopWidth};
      --gta-content-mobile-width: 100%;
      --gta-content-desktop-gap: ${r.desktopGap};
      --gta-content-mobile-gap: ${r.mobileGap};
    }

    @media screen and (max-width: ${n.breakpoint}) {
      .gta-widget.${t} {
        --gta-banner-justify-content: ${s.justify};
        --gta-banner-align-items: ${s.align};
      }
    }
  `},ke=({title:e,body:t})=>c("div",{className:"gta-block__error",children:[c("div",{className:"gta-block__error-title",children:e}),c("div",{className:"gta-block__error-body",children:t})]});function In(e,t){for(var n in t)e[n]=t[n];return e}function Bt(e,t){for(var n in e)if(n!=="__source"&&!(n in t))return!0;for(var r in t)if(r!=="__source"&&e[r]!==t[r])return!0;return!1}function jt(e,t){this.props=e,this.context=t}(jt.prototype=new W).isPureReactComponent=!0,jt.prototype.shouldComponentUpdate=function(e,t){return Bt(this.props,e)||Bt(this.state,t)};var Gt=h.__b;h.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),Gt&&Gt(e)};var Rn=h.__e;h.__e=function(e,t,n,r){if(e.then){for(var o,a=t;a=a.__;)if((o=a.__c)&&o.__c)return t.__e==null&&(t.__e=n.__e,t.__k=n.__k),o.__c(e,t)}Rn(e,t,n,r)};var qt=h.unmount;function Vt(e,t,n){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),e.__c.__H=null),(e=In({},e)).__c!=null&&(e.__c.__P===n&&(e.__c.__P=t),e.__c.__e=!0,e.__c=null),e.__k=e.__k&&e.__k.map(function(r){return Vt(r,t,n)})),e}function Yt(e,t,n){return e&&n&&(e.__v=null,e.__k=e.__k&&e.__k.map(function(r){return Yt(r,t,n)}),e.__c&&e.__c.__P===t&&(e.__e&&n.appendChild(e.__e),e.__c.__e=!0,e.__c.__P=n)),e}function Ge(){this.__u=0,this.o=null,this.__b=null}function Jt(e){var t=e.__&&e.__.__c;return t&&t.__a&&t.__a(e)}function Se(){this.i=null,this.l=null}h.unmount=function(e){var t=e.__c;t&&(t.__z=!0),t&&t.__R&&t.__R(),t&&32&e.__u&&(e.type=null),qt&&qt(e)},(Ge.prototype=new W).__c=function(e,t){var n=t.__c,r=this;r.o==null&&(r.o=[]),r.o.push(n);var o=Jt(r.__v),a=!1,i=function(){a||r.__z||(a=!0,n.__R=null,o?o(_):_())};n.__R=i;var s=n.__P;n.__P=null;var _=function(){if(!--r.__u){if(r.state.__a){var d=r.state.__a;r.__v.__k[0]=Yt(d,d.__c.__P,d.__c.__O)}var u;for(r.setState({__a:r.__b=null});u=r.o.pop();)u.__P=s,u.forceUpdate()}};r.__u++||32&t.__u||r.setState({__a:r.__b=r.__v.__k[0]}),e.then(i,i)},Ge.prototype.componentWillUnmount=function(){this.o=[]},Ge.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=Vt(this.__b,n,r.__O=r.__P)}this.__b=null}var o=t.__a&&Ee($,null,e.fallback);return o&&(o.__u&=-33),[Ee($,null,t.__a?null:e.children),o]};var Zt=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};(Se.prototype=new W).__a=function(e){var t=this,n=Jt(t.__v),r=t.l.get(e);return r[0]++,function(o){var a=function(){t.props.revealOrder?(r.push(o),Zt(t,e,r)):o()};n?n(a):a()}},Se.prototype.render=function(e){this.i=null,this.l=new Map;var t=me(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},Se.prototype.componentDidUpdate=Se.prototype.componentDidMount=function(){var e=this;this.l.forEach(function(t,n){Zt(e,n,t)})};var Wn=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Fn=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Un=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,zn=/[A-Z0-9]/g,Hn=typeof document<"u",Bn=function(e){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(e)};W.prototype.isReactComponent=!0,["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(W.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});var Qt=h.event;h.event=function(e){return Qt&&(e=Qt(e)),e.persist=function(){},e.isPropagationStopped=function(){return this.cancelBubble},e.isDefaultPrevented=function(){return this.defaultPrevented},e.nativeEvent=e};var jn={configurable:!0,get:function(){return this.class}},Kt=h.vnode;h.vnode=function(e){typeof e.type=="string"&&function(t){var n=t.props,r=t.type,o={},a=r.indexOf("-")==-1;for(var i in n){var s=n[i];if(!(i==="value"&&"defaultValue"in n&&s==null||Hn&&i==="children"&&r==="noscript"||i==="class"||i==="className")){var _=i.toLowerCase();i==="defaultValue"&&"value"in n&&n.value==null?i="value":i==="download"&&s===!0?s="":_==="translate"&&s==="no"?s=!1:_[0]==="o"&&_[1]==="n"?_==="ondoubleclick"?i="ondblclick":_!=="onchange"||r!=="input"&&r!=="textarea"||Bn(n.type)?_==="onfocus"?i="onfocusin":_==="onblur"?i="onfocusout":Un.test(i)&&(i=_):_=i="oninput":a&&Fn.test(i)?i=i.replace(zn,"-$&").toLowerCase():s===null&&(s=void 0),_==="oninput"&&o[i=_]&&(i="oninputCapture"),o[i]=s}}r=="select"&&(o.multiple&&Array.isArray(o.value)&&(o.value=me(n.children).forEach(function(d){d.props.selected=o.value.indexOf(d.props.value)!=-1})),o.defaultValue!=null&&(o.value=me(n.children).forEach(function(d){d.props.selected=o.multiple?o.defaultValue.indexOf(d.props.value)!=-1:o.defaultValue==d.props.value}))),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",jn)):n.className&&(o.class=o.className=n.className),t.props=o}(e),e.$$typeof=Wn,Kt&&Kt(e)};var Xt=h.__r;h.__r=function(e){Xt&&Xt(e),e.__c};var en=h.diffed;h.diffed=function(e){en&&en(e);var t=e.props,n=e.__e;n!=null&&e.type==="textarea"&&"value"in t&&t.value!==n.value&&(n.value=t.value==null?"":t.value)};const Gn=e=>{if(!/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))return e;let t;return t=e.substring(1).split(""),t.length==3&&(t=[t[0],t[0],t[1],t[1],t[2],t[2]]),t="0x"+t.join(""),"rgba("+[+t>>16&255,+t>>8&255,+t&255].join(",")+",1)"},qe=e=>{const t=/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(\.\d+)?)\s*\)$/.exec(Gn(e));if(!t)return null;const n=parseInt(t[1],10),r=parseInt(t[2],10),o=parseInt(t[3],10),a=parseFloat(t[4]);return{r:n,g:r,b:o,a,rgb:`rgb(${n}, ${r}, ${o})`}},qn=(e,t)=>{let n;return function(...r){const o=this;n&&clearTimeout(n),n=setTimeout(()=>{e.apply(o,r)},t)}},Ve=e=>{if(!e||typeof e!="string")return null;const t=e.split("/");return t.length>1?t.pop():null},tn=(e,t=window.location.origin)=>{if(e.includes(":")||e.startsWith("/")||e.startsWith("./"))return e;let n;try{n=new URL(e).toString()}catch{try{n=new URL(`//${e}`,t).toString(),n===`https://${e}`&&(n=new URL(e,t).toString())}catch{n="#"}}return n};var P=(e=>(e.Home="home",e.Collection="collection",e.Product="product",e.Cart="cart",e.Account="account",e.SearchResults="searchresults",e.Page="page",e.Article="article",e.Password="password",e))(P||{});const ce=class ce{};ct(ce,"apply",async({pages:{home:t,products:n,collections:r,password:o,cart:a,other:i}})=>{const s=ce.getMetaPage(),{product_tags:_=[],product_collections:d=[]}=window.GSC_COUNTDOWN_META||{},{pageType:u,resourceId:l}=s;if(u===P.Home&&t)return[!0,"home"];if(u===P.Password&&o)return[!0,"password"];if(u===P.Cart&&a)return[!0,"cart"];if(u===P.Product){if(!n.enabled)return[!1,"products_disabled"];if(n.mode==="all")return[!0,"all_products"];if(n.mode==="tags"){const f=n.tags.map(p=>p.toLowerCase().trim());return[(_||[]).some(p=>f.includes(p.toLowerCase().trim())),"product_tags"]}if(n.mode==="specific")return[n.specificProducts.some(f=>Ve(f.id)===(l==null?void 0:l.toString())),"specific_products"];if(n.mode==="productsInCollections"){const f=(d||[]).map(p=>p.id.toString());return[n.productsInCollections.some(p=>f.includes(Ve(p.id))),"product_in_collections"]}}return r.enabled&&u===P.Collection?r.enabled?r.mode==="all"?[!0,"all_collections"]:[r.items.some(f=>Ve(f.id)===(l==null?void 0:l.toString())),"specific_collection"]:[!1,"collections_disabled"]:i&&![P.Home,P.Password,P.Collection,P.Product,P.Cart].includes(u)?[!0,"other_page"]:[!1,"not_matched"]}),ct(ce,"getMetaPage",()=>{var n;const t=(n=window.ShopifyAnalytics)==null?void 0:n.meta.page;return t?(t.pageType||(window.document.location.pathname==="/cart"?t.pageType=P.Cart:window.document.location.pathname==="/account"&&(t.pageType=P.Account),t.pageType="page"),t):{pageType:"page"}});let Ye=ce;const nn=kt(void 0),A=()=>Lt(nn),rn=e=>{try{let t=e==null?void 0:e.settings;if(typeof(e==null?void 0:e.settings)=="string"&&(t=JSON.parse((e==null?void 0:e.settings)||"")),t&&typeof t=="object"&&"content"in t)return(e==null?void 0:e.platform)==="Preview"&&(t={...t,general:{...t.general,breakpoint:e.isMobilePreview?"9999px":"1px"}}),t}catch{}return null},Vn=({children:e,bootstrap:t})=>{var d,u,l;const[n,r]=N(z(rn(t)),"settings"),[o,a]=N(z(!1),"show"),i=N(Z(()=>(n==null?void 0:n.content.backgroundClick)||{enabled:!1,target:"_self",url:""},[n==null?void 0:n.content.backgroundClick]),"backgroundClick"),s=(t==null?void 0:t.platform)==="Preview"||!1,_=(d=window.Shopify)==null?void 0:d.designMode;return ie(()=>r(rn(t)),[t]),ie(()=>{if(n){if(!s&&(n==null?void 0:n.enabled)===!1){a(!1),Be({widgetId:n.key,shouldShow:!1,cause:"widget_disabled"});return}if(s||_||!n.targeting){a(!0),Be({widgetId:n.key,shouldShow:!0,cause:s?"is_preview":_?"is_theme_editor":"no_targeting",timer:n.timer});return}Ye.apply(n.targeting).then(([f,p])=>{a(f),Be({widgetId:n.key,shouldShow:f,cause:`targeting: ${p}`,timer:n.timer})})}},[n,s,_]),(u=window.Shopify)!=null&&u.designMode&&!(t!=null&&t.widgetId)?c(ke,{title:"Paste the Widget ID for the timer to appear.",body:"Widget will be hidden on the storefront."}):(l=window.Shopify)!=null&&l.designMode&&n&&n.type!=="bar"&&n.enabled===!1?c(ke,{title:"Enable widget in App admin",body:"Widget will be hidden on the storefront."}):!n||!o?null:c(nn.Provider,{value:{bootstrap:t||{},isPreview:(t==null?void 0:t.platform)==="Preview",settings:n,backgroundClick:i,previewLocale:(t==null?void 0:t.previewLocale)||null},children:e})},xe=864e5,Je=["00","00","00","00","00"],Yn=e=>{const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour12:!1,weekday:"short",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date),n={};for(const s of t)s.type!=="literal"&&(n[s.type]=s.value);const r=Number(n.hour),o=Number(n.minute),a=Number(n.second),i={Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6}[n.weekday]??0;return{hours:r,minutes:o,seconds:a,weekday:i}},on=({hours:e,minutes:t,seconds:n})=>{const r=new Date;return r.setHours(r.getHours()+e),r.setMinutes(r.getMinutes()+t),r.setSeconds(r.getSeconds()+n),r},le=e=>e.toString().padStart(2,"0"),Ze=(e,t="d:h:m:s")=>{const n=t.includes("d")?Math.floor(e%xe/36e5):Math.floor(e/36e5),r=t.includes("h")?Math.floor(e%(1e3*60*60)/(1e3*60)):Math.floor(e/(1e3*60));let o=Math.floor(e%(1e3*60)/1e3);const a=Math.floor(e%1e3/10);return t==="s:ms"&&(o=Math.floor(e/1e3)),[Math.floor(e/xe),n>999?999:n,r>999?999:r,o,a].map(le)},Qe=(e,t)=>{if(e.includes("d"))return 0;const n=e.split(":")[0];let r=0;if(n==="h"?r=1e3*60*60:n==="m"?r=1e3*60:n==="s"&&(r=1e3),r===0)return 0;const o=Math.floor(t/r);return o<=999?0:(o-999)*r},an=kt(void 0),Ke=()=>Lt(an),Jn=({children:e})=>{const{isPreview:t,bootstrap:{widgetId:n},settings:{timer:r,type:o,content:{items:a}}}=A(),i=a.find(x=>x.type==="timer").unitFormat||"d:h:m:s",s=JSON.stringify(r),[_,d]=N(z(0),"timerDep"),u=ve(()=>{d(x=>x+1)},[]),l=N(ze(),"timerRef"),f=N(ze(null),"rafRef"),p=N(ze(null),"previewDailyStartRef"),[y,S]=N(z(Je),"labels"),[w,g]=N(z(!1),"show"),[b,L]=N(z(!1),"isClosed"),[E,O]=N(z(null),"themeError"),q=ve((x=!1)=>{const T=se.loadData(n);if(T.endDate&&(new Date().getTime()-T.endDate.getTime()>xe||!x)){const B=on(r);se.saveData({endDate:B,hash:s},n),u()}},[n,r,s,u]),F=ve(()=>{clearInterval(l.current),f.current&&cancelAnimationFrame(f.current);const{mode:x,onEnd:T}=r;x==="evergreen"&&(["restart","wait_one_day"].includes(T)||t)&&q(T==="wait_one_day"&&!t),(T==="none"||T==="restart")&&g(!0),T==="hide"&&g(!1)},[r,t,q]);ie(()=>{let x=new Date(r.date),T=null;const B=se.loadData(n);B!=null&&B.closeDate&&(T=new Date(B.closeDate)),r.mode==="evergreen"&&(!B.endDate||B.hash!==s?(x=on(r),se.saveData({endDate:x,hash:s},n)):x=B.endDate);const V=i.includes("ms"),j={current:0};let te=-1;const K=()=>{var pn,gn,hn;if(b)return;if(r.mode==="daily"){if(t){O(null),g(!0);const _e=(r.daily.startHours||0)*3600+(r.daily.startMinutes||0)*60,Y=(r.daily.endHours||0)*3600+(r.daily.endMinutes||0)*60,ne=Math.max(0,Y-_e)*1e3;p.current||(p.current=Date.now());const lt=Date.now()-p.current,Ne=Math.max(0,ne-lt);j.current||(j.current=Qe(i,Ne));const re=Math.max(0,Ne-j.current),De=Math.floor(re%(1e3*60)/1e3);(V||De!==te)&&(S(Ze(re,i)),te=De),V&&f.current!==void 0&&(f.current=requestAnimationFrame(K));return}const de=((pn=r.daily)==null?void 0:pn.tz)||"UTC",{hours:Ce,minutes:Cr,seconds:Nr,weekday:Dr}=Yn(de),mn=(r.daily.startHours||0)*3600+(r.daily.startMinutes||0)*60,it=(r.daily.endHours||0)*3600+(r.daily.endMinutes||0)*60,st=Ce*3600+Cr*60+Nr,Tr=Array.isArray(r.daily.repeatDays)?r.daily.repeatDays.includes(Dr):!1,Mr=it>mn&&st>=mn&&st<it;if(Tr&&Mr){O(null);const _e=new Date().getMilliseconds();let Y=(it-st)*1e3-_e;Y<0&&(Y=0),j.current||(j.current=Qe(i,Y));const ue=Math.max(0,Y-j.current);g(!0);const ne=Math.floor(ue%(1e3*60)/1e3);(V||ne!==te)&&(S(Ze(ue,i)),te=ne),V&&f.current!==void 0&&(f.current=requestAnimationFrame(K));return}if(S(Je),(gn=window.Shopify)!=null&&gn.designMode){const _e=le(r.daily.startHours||0),Y=le(r.daily.startMinutes||0),ue=le(r.daily.endHours||0),ne=le(r.daily.endMinutes||0),lt=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Ne=Array.isArray(r.daily.repeatDays)?r.daily.repeatDays.slice().sort((re,De)=>re-De).map(re=>lt[re]||"").filter(Boolean).join(", "):"";O({title:"Daily timer is not within active hours or days",body:`Active hours & days: ${_e}:${Y} — ${ue}:${ne}, ${de}, ${Ne}`}),g(!0)}else O(null),g(!1);V&&f.current!==void 0&&(f.current=requestAnimationFrame(K));return}const at=x.getTime()-new Date().getTime();if(at>0){g(!0),j.current||(j.current=Qe(i,at));const de=Math.max(0,at-j.current),Ce=Math.floor(de%(1e3*60)/1e3);(V||Ce!==te)&&(S(Ze(de,i)),te=Ce),V&&f.current!==void 0&&(f.current=requestAnimationFrame(K));return}S(Je),F(),((hn=window.Shopify)!=null&&hn.designMode||t)&&g(!0)};return(o!=="bar"||!T||new Date().getTime()-T.getTime()>xe)&&(V?f.current=requestAnimationFrame(K):(l.current=window.setInterval(K,500),K())),()=>{clearInterval(l.current),f.current&&(cancelAnimationFrame(f.current),f.current=null)}},[F,r,s,i,n,t,_,o,b]);const H=ve(()=>{r.mode==="daily"&&o==="bar"||se.setCloseDate(new Date,n),g(!1),L(!0)},[n,r.mode,o]),D=N(Z(()=>({show:w,labels:y,close:H,themeError:E}),[y,w,H,E]),"value");return c(an.Provider,{value:D,children:e})};function sn(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=sn(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function m(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=sn(e))&&(r&&(r+=" "),r+=t);return r}const ln="https://shopify-apps.getsitectrl.com/collect",cn=async(e,t)=>{var i,s;let n=!1;const r=(i=window.Shopify)==null?void 0:i.shop,o=(s=window.Shopify)==null?void 0:s.designMode;if(!r||o)return;const a=JSON.stringify({app:"countdown",shop:r,metrics:[{widget:e,type:t,value:1}]});try{if(typeof window.navigator.sendBeacon=="function"){const _=new Blob([a],{type:"application/json"});n=window.navigator.sendBeacon(ln,_)}n||await fetch(ln,{method:"POST",headers:{"Content-Type":"application/json"},body:a})}catch(_){console.error("Failed to send metric:",_)}},Zn=qn(cn,250),Qn=(e,t)=>{const[n,r]=N(z(!1),"shown");ie(()=>{t&&e&&!n&&(r(!0),Xe(t,"view",!0))},[e,n,t])},Xe=async(e,t,n=!1)=>{n?cn(e,t):Zn(e,t)},Kn=({border:e,background:t,radius:n,padding:r,margin:o},a,i)=>{const{backgroundStyle:s,overlayStyle:_}=we(t);return`
  .gta-banner.${i} {
    border: ${e.enabled?`${e.size} solid ${e.color}`:"initial"};
    margin: ${v(o==null?void 0:o.desktop)};
    padding: ${v(r.desktop)};
    ${n.enabled?`border-radius: ${n.value};`:""}
    ${s}
  }

  div[id*="gsc_countdown_timer"]:has(.gta-banner) {
    width: 100%;
  }

  .gta-banner__overlay.${i} {
    ${_}
  }

  @media screen and (max-width: ${a}) {
    .gta-banner.${i} {
      margin: ${v(o==null?void 0:o.mobile)};
      padding: ${v(r.mobile)};
    }
  }
`},Xn=({children:e})=>{const{settings:{section:t,general:{breakpoint:n}},bootstrap:{blockId:r}}=A();return t?c($,{children:[c("style",{children:Kn(t,n,r)}),c("div",{className:`gta-banner ${r}`,children:[c("div",{className:`gta-banner__content-wrap ${r}`,children:e}),c("div",{className:`gta-banner__overlay ${r}`,children:[c("div",{})," "]})]})]}):null},er=(e,t)=>{const n=e.toLowerCase();if(t.includes(n))return n;const r=n.split("-")[0];return t.find(o=>o.startsWith(r))||null},tr=(e,t)=>`${e}.${t}`,nr=e=>Object.keys(e.locales||{}),rr=(e,t,n,r,o)=>{var a;if(!t||!e.locales)return o;const i=tr(n,r);return((a=e.locales[t])==null?void 0:a[i])||o},or=(e,t,n)=>{const r=nr(e);if(r.length===0)return null;if(n&&r.includes(n))return n;const o=t();return o?er(o,r):null},dn=()=>{const e=new Date;return e.setUTCHours(0,0,0,0),e.setDate(e.getDate()+1),e.toISOString()};dn(),dn();const ar=()=>{var t;const e=(t=window.Shopify)==null?void 0:t.locale;return e?e.split("-")[0].toLowerCase():null},I=(e,t,n,r,o)=>Z(()=>{const a=or(e,ar,o);return rr(e,a,t,n,r)},[e,t,n,r,o]),ir=(e,t,n)=>{const{background:r,border:o}=e;return`
  .gta-content__button-container.${e.id} {
    width: ${e.width==="full"?"100%":"auto"};
  }

  .gta-content__button.${e.id} {
    font-family: ${Q(e.fontFamily,t,n)};
    font-size: ${e.desktopFontSize};
    font-weight: ${e.fontWeight};
    color: ${e.textColor};
    box-sizing: border-box;
    padding: ${v(e.padding.desktop)};
    margin: ${e.margin?v(e.margin.desktop):"unset"};
    background: ${r.enabled?r.color:"transparent"};
    border: ${o.enabled?`${o.size} solid ${o.color}`:"none"};
    width: ${e.width==="full"?"100%":"auto"};
    text-transform: ${e.textTransform};
    letter-spacing: ${e.desktopLetterSpacing};
    ${e.radius.enabled?`border-radius: ${e.radius.value};`:""}

    ${r.enabled&&parseInt(r.blur)>0?`backdrop-filter: blur(${r.blur}); -webkit-backdrop-filter: blur(${r.blur});`:""}
  }

  .gta-content__button.${e.id}:hover {
    color: ${e.textColor} !important;
    border: ${o.enabled&&`${o.size} solid ${o.color}`} !important;
  }

  @media screen and (max-width: ${t.general.breakpoint}) {
    .gta-content__button.${e.id} {
      font-size: ${e.mobileFontSize};
      letter-spacing: ${e.mobileLetterSpacing};
      padding: ${v(e.padding.mobile)};
      margin: ${e.margin?v(e.margin.mobile):"unset"};
    }
  }
`},et=e=>{const{settings:t,isPreview:n,previewLocale:r,bootstrap:{selectedItemId:o,onItemSelect:a}}=A(),i=I(t,e.id,"label",e.label,r),s=I(t,e.id,"url",e.href,r);if(!e.label)return null;const _=()=>{n?a==null||a(e.id):Xe(t.key,"openUrl",e.target!=="_blank")};return c("div",{className:m("gta-content__button-container",e.id,{"gta--selectable":n,"gta--selected":o===e.id}),children:[c("style",{children:ir(e,t,n)}),c("a",{...!n&&{href:tn(s)},onClick:_,target:e.target,className:m("gta-content__button",e.id),children:i})]})},sr=({color:e,onClick:t})=>c("button",{onClick:t,className:"gta-content__close-btn","aria-label":"Close timer bar",children:c("svg",{viewBox:"0 0 16 16",fill:"none",children:[c("path",{d:"M14 2L2 14ZM14 14L2 2Z",fill:"black",style:"fill:black;fill-opacity:1;"}),c("path",{d:"M14 2L2 14M14 14L2 2",stroke:e,style:`stroke:${e};stroke-opacity:1;`,"stroke-width":"2"})]})}),lr=()=>t=>fetch(`/discount/${encodeURI(t)}`,{redirect:"manual"}),cr=()=>{const[e,t]=N(z(!1),"isCopying");return{isCopying:e,copyToClipboard:async({text:r,options:{waitForAnimations:o}})=>{if(t(!0),o){const a=()=>{Promise.all(o.getAnimations({subtree:!0}).map(i=>i.finished)).finally(()=>t(!1))};o.addEventListener("animationstart",a,{once:!0})}await(navigator==null?void 0:navigator.clipboard.writeText(r)),o||t(!1)}}},dr=(e,t,n)=>{const{background:r,border:o}=e,a=t.content.background;let i;"source"in a?i=a.source==="color"?a.bgColor:"green":i=a.color;const s=qe(e.textColor),_=qe(r.color),d=qe(i),u=a.enabled&&(d==null?void 0:d.a)!==0,l=r.enabled&&(_==null?void 0:_.a)!==0;let f=u?i:"green";return l&&(s==null?void 0:s.rgb)!==(_==null?void 0:_.rgb)&&(f=r.color),`
  .gta-coupon.${e.id} {
    font-family: ${Q(e.fontFamily,t,n)};
    font-size: ${e.desktopFontSize};
    font-weight: ${e.fontWeight};
    text-transform: ${e.textTransform};
    color: ${e.textColor};
    padding: ${v(e.padding.desktop)};
    margin: ${e.margin?v(e.margin.desktop):"unset"};
    background-color: ${r.enabled?r.color:"transparent"};
    border: ${o.enabled?`${o.size} dashed ${o.color}`:"none"};
    ${e.radius.enabled?`border-radius: ${e.radius.value};`:""}
    gap: .25em;
  }

  @media screen and (max-width: ${t.general.breakpoint}) {
    .gta-coupon.${e.id} {
      font-size: ${e.mobileFontSize};
      padding: ${v(e.padding.mobile)};
      margin: ${e.margin?v(e.margin.mobile):"unset"};
      gap: ${parseInt(e.mobileFontSize)*.25}px;
    }
  }

  .${e.id} .gta-coupon__checkmark-icon {
    stroke: ${f};
  }

  .${e.id} .gta-coupon__checkmark {
    background-color: ${e.textColor};
  }

  .${e.id} .gta-icon {
    display: block !important;
  }
`},tt=e=>{const{settings:t,isPreview:n,previewLocale:r,bootstrap:{selectedItemId:o,onItemSelect:a}}=A(),i=lr(),{isCopying:s,copyToClipboard:_}=cr(),d=I(t,e.id,"label",e.label,r),u=I(t,e.id,"code",e.code,r);if(!e.code)return null;const l=async f=>{const p=f.currentTarget;f.stopPropagation();try{await _({text:u,options:{waitForAnimations:p}}),await i(u),Xe(t.key,"applyDiscount")}catch(y){console.log("Coupon code error",y)}};return c($,{children:[c("style",{children:dr(e,t,n)}),c("button",{type:"button",onClick:n?()=>a==null?void 0:a(e.id):l,className:m("gta-content__coupon gta-coupon",e.id,{"gta--selectable":n,"gta--selected":o===e.id,"gta-coupon--animating":s}),children:[e.icon.enabled&&It(e.icon),e.label?d:u,c("div",{className:"gta-coupon__checkmark"}),c("svg",{className:"gta-coupon__checkmark-icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"10 11 32 32",children:c("path",{fill:"none",d:"M14.1 27.2l7.1 7.2 16.7-16.8"})})]})]})},_r=(e,t,n)=>`
  .gta-content__text.${e.id} {
    width: ${t.type==="bar"?"auto":"100%"};
    text-align: ${t.content.align};
    font-family: ${Q(e.fontFamily,t,n)};
    font-size: ${e.desktopFontSize};
    font-weight: ${e.fontWeight};
    line-height: ${e.desktopLineHeight??e.lineHeight};
    color: ${e.color};
    text-transform: ${e.textTransform};
    letter-spacing: ${e.desktopLetterSpacing};
    padding: ${v(e.padding.desktop)};
    box-sizing: border-box;
  }

  @media screen and (max-width: ${t.general.breakpoint}) {
    .gta-content__text.${e.id} {
      font-size: ${e.mobileFontSize};
      letter-spacing: ${e.mobileLetterSpacing};
      padding: ${v(e.padding.mobile)};
      line-height: ${e.mobileLineHeight??e.lineHeight};
      ${t.type==="bar"?"text-align: center;":""}
    }
  }
`,nt=e=>{const{settings:t,isPreview:n,previewLocale:r,bootstrap:{selectedItemId:o,onItemSelect:a}}=A(),i=I(t,e.id,"value",e.value,r);return c($,{children:[c("style",{children:_r(e,t,n)}),c("div",{...n&&{onClick:()=>a==null?void 0:a(e.id)},className:m("gta-content__text",e.id,{"gta--selectable":n,"gta--selected":o===e.id}),children:i})]})},ur=({id:e,digits:t,labels:n,border:r,radius:o,background:a,layout:i,separator:s,desktopWidth:_,mobileWidth:d,padding:u,margin:l},f,p,y)=>`
  .gta-content__timer.${e} {
    display: inline-flex;
    vertical-align: middle;

    border: ${r.enabled&&i==="stacked"?`${r.size} solid ${r.color}`:"unset"};
    background: ${i==="stacked"&&a.enabled?a.color:"unset"};
    width: ${_};
    margin: ${v(l==null?void 0:l.desktop)};
    padding: ${v(u.desktop)};
    box-sizing: border-box;

    ${i==="stacked"&&o.enabled?`border-radius: ${o.value};`:""}
    ${a.enabled&&i==="stacked"&&parseInt(a.blur)>0?`backdrop-filter: blur(${a.blur});`:""}
    -webkit-backdrop-filter: none;
  }

  .gta-timer__wrapper.${e} {
    gap: ${s.enabled?"6px":"12px"};
  }

  .gta-timer__unit.${e} {
    border: ${r.enabled&&i==="separate"?`${r.size} solid ${r.color}`:"unset"};
    background: ${i==="separate"&&a.enabled?a.color:"unset"};
    ${y?`gap: ${y};`:""}

    ${a.enabled&&i==="separate"&&parseInt(a.blur)>0?`backdrop-filter: blur(${a.blur});`:""}
    -webkit-backdrop-filter: none;

    ${i==="separate"&&o.enabled?`border-radius: ${o.value};`:""}
  }

  .gta-timer__unit-value.${e} {
    color: ${t.color};
    font-size: ${t.fontSize};
    font-family: ${Q(t.fontFamily,f,p)};
    font-weight: ${t.fontWeight};
  }

  .gta-timer__unit-label.${e} {
    color: ${n.color};
    font-size: ${n.fontSize};
    font-family: ${Q(n.fontFamily,f,p)};
    font-weight: ${n.fontWeight};
    text-transform: ${n.textTransform};
    line-height: ${y?"1":"2"};
  }

  .gta-timer__separator.${e} {
    color: ${s.color};
    padding-bottom: 5px;
  }

  @media screen and (max-width: ${f.general.breakpoint}) {
    .gta-content__timer.${e} {
      width: ${d};
      margin: ${v(l==null?void 0:l.mobile)};
      padding: ${v(u.mobile)};
    }
  }
`,fr=({id:e,fontSize:t,digits:n,padding:r},o,a)=>`
  .gta-content__timer-text.${e} {
    display: inline-block;
    white-space: nowrap;
    margin: 0;
    padding: ${v(r.desktop)};

    font-size: ${t.desktop};
    font-family: ${Q(n.fontFamily,o,a)};
    font-weight: ${n.fontWeight}; 
    color: ${n.color};
  }

  .gta-timer-text__unit-value.${e} {   
    min-width: 2ch;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .gta-timer-text__separator.${e} {
    margin-inline: 0.15ch;
  }

  @media screen and (max-width: ${o.general.breakpoint}) {
    .gta-content__timer-text.${e} {
      font-size: ${t.mobile};
      margin: 0;
      padding: ${v(r.mobile)};
    }
  }
`,pr=e=>{switch(e.split(":").length){case 4:return 500;case 3:return 370;case 2:return 240;default:return 240}},rt=e=>{const{settings:t,isPreview:n,previewLocale:r,bootstrap:{selectedItemId:o,onItemSelect:a}}=A(),{view:i="custom",labels:s,unitFormat:_="d:h:m:s"}=e,d=t.type==="embed",u=e.separator.enabled,l=d?!1:s.enabled,{labels:[f,p,y,S,w]}=Ke(),g=_.includes("d"),b=_.includes("h"),L=_!=="s:ms",E=_.includes("ms"),O=e.digits.gap||null,q=I(t,e.id,"labels.days",s.days,r),F=I(t,e.id,"labels.hours",s.hours,r),H=I(t,e.id,"labels.minutes",s.minutes,r),D=I(t,e.id,"labels.seconds",s.seconds,r),x=I(t,e.id,"labels.milliseconds",s.milliseconds??"ms",r),T=s.enabled?x:"";return i==="text"?c($,{children:[c("style",{children:fr(e,t,n)}),c("p",{...n&&{onClick:()=>a==null?void 0:a(e.id)},className:m("gta-content__timer-text",e.id,{"gta--selectable":n,"gta--selected":o===e.id}),children:[g&&c($,{children:[c("span",{className:m("gta-timer-text__unit-value",e.id),"data-timer-days":!0,children:[f,s.enabled&&q]}),c("span",{className:m("gta-timer-text__separator",e.id),children:u&&":"})]}),b&&c($,{children:[c("span",{className:m("gta-timer-text__unit-value",e.id),"data-timer-hours":!0,children:[p,s.enabled&&F]}),c("span",{className:m("gta-timer-text__separator",e.id),children:u&&":"})]}),L&&c($,{children:[c("span",{className:m("gta-timer-text__unit-value",e.id),"data-timer-minutes":!0,children:[y,s.enabled&&H]}),c("span",{className:m("gta-timer-text__separator",e.id),children:u&&":"})]}),c("span",{className:m("gta-timer-text__unit-value",e.id),"data-timer-seconds":!0,children:[S,s.enabled&&D]}),E&&c($,{children:[c("span",{className:m("gta-timer-text__separator",e.id),children:u&&":"}),c("span",{className:m("gta-timer-text__unit-value",e.id),"data-timer-milliseconds":!0,children:[w,s.enabled&&T]})]})]})]}):c($,{children:[c("style",{children:ur(e,t,n,O)}),c("div",{...n&&{onClick:()=>a==null?void 0:a(e.id)},className:m("gta-content__timer",e.id,{"gta--selectable":n,"gta--selected":o===e.id}),children:c("svg",{class:"gta-timer__svg",height:"100%",viewBox:`0 0 ${pr(_)} ${u?108:118}`,preserveAspectRatio:"xMinYMin meet",children:c("foreignObject",{width:"99.9%",height:"100%",xmlns:"http://www.w3.org/1999/xhtml",children:c("div",{className:m("gta-timer__wrapper",e.id),children:[g&&c($,{children:[c("div",{className:m("gta-timer__unit",e.id),children:[c("h4",{className:m("gta-timer__unit-value",e.id),"data-timer-days":!0,children:f}),l&&c("div",{className:m("gta-timer__unit-label",e.id),children:q})]}),u&&c("div",{className:m("gta-timer__separator",e.id),children:":"})]}),b&&c($,{children:[c("div",{className:m("gta-timer__unit",e.id),children:[c("h4",{className:m("gta-timer__unit-value",e.id),"data-timer-hours":!0,children:p}),l&&c("div",{className:m("gta-timer__unit-label",e.id),children:F})]}),u&&c("div",{className:m("gta-timer__separator",e.id),children:":"})]}),L&&c($,{children:[c("div",{className:m("gta-timer__unit",e.id),children:[c("h4",{className:m("gta-timer__unit-value",e.id),"data-timer-minutes":!0,children:y}),l&&c("div",{className:m("gta-timer__unit-label",e.id),children:H})]}),u&&c("div",{className:m("gta-timer__separator",e.id),children:":"})]}),c("div",{className:m("gta-timer__unit",e.id),children:[c("h4",{className:m("gta-timer__unit-value",e.id),"data-timer-seconds":!0,children:S}),l&&c("div",{className:m("gta-timer__unit-label",e.id),children:D})]}),E&&c($,{children:[u&&c("div",{className:m("gta-timer__separator",e.id),children:":"}),c("div",{className:m("gta-timer__unit",e.id),children:[c("h4",{className:m("gta-timer__unit-value",e.id),"data-timer-milliseconds":!0,children:w}),l&&c("div",{className:m("gta-timer__unit-label",e.id),children:T})]})]})]})})})})]})},gr=({content:{background:e,padding:t,border:n,radius:r},general:{breakpoint:o},bar:a,key:i},s,_)=>{const{backgroundStyle:d,overlayStyle:u}=we(e);return`
  .gta-widget.gta-bar.${i} {
    position: ${a.sticky?"sticky":"relative"};
    top: ${a.position==="top"?"0":"unset"};
    bottom: ${a.position==="bottom"?"0":"unset"};
    right: 0;
    left: 0;
    z-index: 90;
    width: 100%;
  }

  .gta-content__container.${s} {
    display: grid;
    grid-template-columns: ${a.closeButton.enabled?"40px 1fr 40px":"1fr"};
    border: ${n.enabled?`${n.size} solid ${n.color}`:"initial"};
    ${r.enabled?`border-radius: ${r.value};`:""}
    ${_?"background-color: #fff1e3;":`${d}`}
  }

  .gta-bar .gta-block__error {
    ${_?"padding: 4px;":""}
  }

  .gta-content__overlay.${s} {
    ${u}
  }

  .gta-bar__close-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gta-content.${s} {
    display: flex;
    padding: ${v(t.desktop)};
    justify-content: ${a.justify};
    align-items: center;
  }

  .gta-content__bar-texts.${s} {
    display: flex;
    flex-flow: column nowrap;
  }

  @media screen and (max-width: ${o}) {
    .gta-content__container.${s} {
      display: grid;
      grid-template-columns: ${a!=null&&a.closeButton.enabled?"28px 1fr 28px":"1fr"};
    }

    .gta-content.${s} {
      justify-content: center;
      align-items: center;
      padding: ${v(t.mobile)};
    }

    .gta-bar__close-btn-container {
      justify-content: flex-start;
      align-items: flex-start;
      padding: 8px 8px 0 0;
    }
  }
`},hr=({onClick:e})=>{const{settings:t,bootstrap:{blockId:n,onItemSelect:r},isPreview:o,backgroundClick:a}=A(),{close:i,themeError:s}=Ke(),{content:{items:_}}=t,d=_.filter(g=>g.enabled===void 0||g.enabled),u=t.bar.closeButton.enabled,l=d.filter(g=>g.type==="text"),f=d.find(g=>g.type==="timer"),p=d.find(g=>g.type==="button"),y=d.find(g=>g.type==="coupon"),S=[...new Set(d.map(g=>g.type))],w=g=>{if(g.stopPropagation(),o){r==null||r("close");return}i()};return c($,{children:[c("style",{children:gr(t,n,!!s)}),c("div",{className:m("gta-content__container",n,{"gta--clickable":a.enabled&&!o}),onClick:e,children:[u&&c("div",{children:" "}),c("div",{className:m("gta-content",n),children:s?c(ke,{title:s.title,body:s.body}):c($,{children:S.map(g=>g==="text"&&l.length>0?c("div",{className:m("gta-content__bar-texts",n),children:l.map(b=>c(nt,{...b}))}):g==="timer"?f&&c(rt,{...f}):g==="button"?p&&c(et,{...p}):y&&c(tt,{...y}))})}),t.content.background.enabled&&c("div",{className:`gta-content__overlay ${n}`,children:[c("div",{})," "]}),u&&c("div",{className:"gta-bar__close-btn-container",children:c(sr,{onClick:w,color:t.bar.closeButton.color})})]})]})},mr=".gta-banner{display:flex;position:relative;box-sizing:border-box;overflow:hidden}.gta-banner__overlay,.gta-content__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.gta-content__overlay{z-index:-1}.gta-banner__content-wrap{position:relative;display:flex;width:100%;justify-content:var(--gta-banner-justify-content);align-items:var(--gta-banner-align-items)}.gta-content__button{display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;text-decoration:none!important;text-align:center;cursor:pointer;transition:color .2s ease,background-color .2s ease,opacity .2s ease}.gta-content__button:hover{text-decoration:none!important;opacity:.9}.gta-timer__wrapper{display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;margin:0;padding:0;overflow:visible;direction:ltr}.gta-timer__svg{display:block;width:100%;height:auto;margin:0}.gta-timer__separator{font-family:serif;font-size:44px}.gta-timer__unit{display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;width:160px;max-width:160px;overflow:hidden;aspect-ratio:1}.gta-timer__unit-value{line-height:1;text-align:center;letter-spacing:0;margin-block-start:0;margin-block-end:0}.gta--selected{outline:1.7px dashed #005fd3;outline-offset:2px}.gta--selectable:hover{outline:1.7px dashed #005fd3;outline-offset:2px;cursor:pointer}.gta--clickable{cursor:pointer}.gta-content__close-btn{background-color:transparent;border:none;padding:0;cursor:pointer;width:16px;height:16px;line-height:0!important;transition:all .2s}.gta-content__close-btn>svg{width:16px;height:16px}.gta-content__close-btn:hover{transform:rotate(90deg);filter:opacity(.7)}.gta-coupon{box-sizing:border-box;width:fit-content;display:flex;align-items:center;gap:.3em;line-height:1;cursor:pointer;position:relative;overflow:hidden}.gta-coupon.gta-coupon--animating{pointer-events:none}.gta-coupon__checkmark{display:none;border-radius:50%;width:1rem;height:1rem;position:absolute;left:50%;transform:translate(-50%);background-color:#fff}.gta-coupon__checkmark-icon{display:inline;width:1.2em;height:1.2em;stroke:green;stroke-width:2;position:absolute;left:50%;transform:translate(-50%)}.gta-coupon__checkmark-icon path{vector-effect:none;transform-origin:80% 80%;stroke-dasharray:48;stroke-dashoffset:48}.gta-coupon--animating .gta-coupon__checkmark{display:flex;align-items:center;justify-content:center;animation:gta-ripple 1.55s ease-out forwards}.gta-coupon--animating .gta-coupon__checkmark-icon path{animation:gta-stroke .3s cubic-bezier(.65,0,.45,1) .3s forwards,gta-scale .3s ease-in-out .4s both,gta-strokeOpacity .3s ease-in-out 1s forwards}@keyframes gta-ripple{0%{transform:translate(-50%);opacity:0}10%{opacity:1}40%{transform:translate(-50%) scale(50);opacity:1}70%{transform:translate(-50%) scale(50);opacity:1}to{transform:translate(-50%) scale(50);opacity:0}}@keyframes gta-stroke{to{stroke-dashoffset:0}}@keyframes gta-strokeOpacity{to{opacity:0}}@keyframes gta-scale{to{transform:none}50%{transform:scale(1.15)}}",br=({type:e,general:{breakpoint:t}},n)=>`
    .gta-banner.${n}::before {
      content: "";
      padding-bottom: var(--gta-banner-desktop-ratio);
    }

    @media screen and (max-width: ${t}) {
      .gta-banner.${n}::before {
        padding-bottom: var(--gta-banner-mobile-ratio);
      }
    }

    .gta-content__container.${n} {
      ${e==="banner"?"width: var(--gta-content-desktop-width);":""}
      max-width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }

    .gta-content.${n} {
      display: flex;
      flex-flow: var(--gta-content-direction) var(--gta-content-wrap);
      gap: var(--gta-content-desktop-gap);
      box-sizing: border-box;

      ${e==="block"?"width: var(--gta-content-desktop-width);":""}
      max-width: 100%;
    }

    @media screen and (max-width: ${t}) {
      .gta-content__container.${n} {
        ${e==="banner"?"width: var(--gta-content-mobile-width);":""}
        max-width: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
      }

      .gta-content.${n} {
        ${e==="block"?"width: var(--gta-content-mobile-width);":""}
        gap: var(--gta-content-mobile-gap);
      }

      .gta-content__close-btn {
        top: 4px;
        right: 4px;
        transform: translate(0, 0);
      }

      .gta-content__close-btn:hover {
        transform: translate(0, 0) rotate(90deg);
      }
    }
  `,yr=()=>{const{settings:e,bootstrap:{blockId:t}}=A(),n=N(Z(()=>On(e,t),[e,t]),"configStyle");let r=e.userCss;try{r=atob(e.userCss)}catch{}return c($,{children:[c("style",{children:n}),c("style",{children:mr}),c("style",{children:br(e,t)}),c("style",{children:r})]})},vr={button:et,text:nt,timer:rt,coupon:tt},$r=({type:e,content:{align:t,background:n,padding:r,margin:o,border:a,radius:i},general:{breakpoint:s}},_)=>{const{backgroundStyle:d,overlayStyle:u}=we(n);return`
  .gta-content__container.${_} {
    display: flex;
    overflow: hidden;
    padding: ${v(r.desktop)};
    margin: ${v(o==null?void 0:o.desktop)};
    ${e==="block"?`justify-content: ${Ht(t)};`:""}
    border: ${a.enabled?`${a.size} solid ${a.color}`:"initial"};
    ${i.enabled?`border-radius: ${i.value};`:""}
    ${d}
  }

  .gta-content__overlay.${_} {
    ${u}
  }

  .gta-content.${_} {
    ${e==="banner"?"flex: 1;":""}
    align-items: ${Ht(t)};
  }

  @media screen and (max-width: ${s}) {
    .gta-content__container.${_} {
      padding: ${v(r.mobile)};
      margin: ${v(o==null?void 0:o.mobile)};
  }
`},_n=()=>{const{settings:e,bootstrap:{blockId:t}}=A();return c($,{children:[c("style",{children:$r(e,t)}),c("div",{className:m("gta-content__container",t),children:[e.content.background.enabled&&c("div",{className:`gta-content__overlay ${t}`,children:[c("div",{})," "]}),c("div",{className:m("gta-content",t),children:e.content.items.filter(n=>n.enabled===void 0||n.enabled).map(n=>vr[n.type](n))})]})]})},un={button:et,text:nt,timer:rt,coupon:tt},wr=(e,t,n)=>{var u;const{content:{background:r,padding:o,margin:a,border:i,radius:s},general:{breakpoint:_}}=t,{backgroundStyle:d}=we(r);return`
  .gta-content__container.${e.id} {
    overflow: hidden;
    padding: ${v(o.desktop)};
    margin: ${v(a==null?void 0:a.desktop)};
    border: ${i.enabled?`${i.size} solid ${i.color}`:"initial"};
    ${s.enabled?`border-radius: ${s.value};`:""}
    ${d}
  }

  @media screen and (max-width: ${_}) {
    .gta-content__container.${e.id} {
      padding: ${v(o.mobile)};
      margin: ${v(a==null?void 0:a.mobile)};
    }
  }

  .gta-content__text.${e.id} {
    text-align: ${e.align};
    font-family: ${Q(e.fontFamily,t,n)};
    font-size: ${e.desktopFontSize};
    font-weight: ${e.fontWeight};
    line-height: ${e.desktopLineHeight??e.lineHeight};
    color: ${e.color};
    text-transform: ${e.textTransform};
    letter-spacing: ${e.desktopLetterSpacing};
    box-sizing: border-box;
    
    display: inline-block;
    width: 100%;
  }
  
  .gta-content__text.${e.id} > * {
    vertical-align: middle;
  } 

  .gta-content__text.${e.id} > svg,
  .gta-content__text.${e.id} > .gta-icon {
    color: ${(u=e.icon)==null?void 0:u.color};
    height: 1em;
    width: 1em;
    margin-right: .3em;
  } 


  .gta-content__text > .gta-content__coupon {
    display: inline-flex;
  }

  @media screen and (max-width: ${t.general.breakpoint}) {
    .gta-content__text.${e.id} {
      font-size: ${e.mobileFontSize};
      letter-spacing: ${e.mobileLetterSpacing};
      line-height: ${e.mobileLineHeight??e.lineHeight};
    }
  }
`},kr=()=>{var _;const{settings:e,isPreview:t,previewLocale:n,bootstrap:{selectedItemId:r,onItemSelect:o}}=A(),a=N(Z(()=>e.content.items.reduce((d,u)=>({...d,[u.type]:u}),{}),[e]),"ITEMS: Record<string, CountdownContentItem>"),i=a.text,s=I(e,i.id,"value",i.value,n);return c("div",{className:m("gta-content__container",i.id),children:[c("style",{children:wr(i,e,t)}),c("div",{className:m("gta-content__text",i.id,{"gta--selectable":t,"gta--selected":r===i.id}),children:[((_=i.icon)==null?void 0:_.enabled)&&It(i.icon),s.split(/({{Timer}}|{{Coupon}})/gi).map(d=>{switch(d){case"{{Timer}}":return a.timer.enabled?un.timer(a.timer):null;case"{{Coupon}}":return a.coupon.enabled?un.coupon(a.coupon):null;default:return c("span",{...t&&{onClick:()=>o==null?void 0:o(i.id)},children:d})}})]})]})},Sr=()=>{const{settings:{type:e,bar:t,key:n},bootstrap:{blockId:r,onItemSelect:o},backgroundClick:a,isPreview:i}=A(),{show:s,themeError:_}=Ke();if(Pn(),Qn(s,n),!s)return null;const d=u=>{var f;const l=u.target;if(i&&["gta-content","gta-content__overlay","gta-content__container","gta-banner__overlay"].some(p=>l.classList.contains(p))){o==null||o(null);return}i||(f=window.Shopify)!=null&&f.designMode||a.enabled&&!["button","a"].includes(l.tagName.toLowerCase())&&window.open(tn(a.url),a.target)};return c($,{children:[c(yr,{}),e==="bar"&&t?c(hr,{onClick:d}):c("div",{className:m("gta-widget",r,{"gta--clickable":a.enabled&&!i}),onClick:d,children:_?c(ke,{title:_.title,body:_.body}):e==="block"?c(_n,{}):e==="embed"?c(kr,{}):c(Xn,{children:c(_n,{})})})]})},ot=({bootstrap:e})=>c(Vn,{bootstrap:e,children:c(Jn,{children:c(Sr,{})})}),xr="GSC_COUNTDOWN_RUNTIME";window[xr]=(e,t)=>{We(c(ot,{bootstrap:t}),e)},function(){window.GSC_COUNTDOWN_INITIAL_RENDERED||(fn(),window.GSC_COUNTDOWN_INITIAL_RENDERED=!0),window.GSC_COUNTDOWN_RENDER_INTERVAL=setInterval(()=>{fn()},1e3)}();function fn(){Array.isArray(window.GSC_COUNTDOWN_WIDGETS)&&(window.GSC_COUNTDOWN_WIDGETS.forEach(e=>{var t,n;if(e.enabled){if(e.bar&&!window.GSC_COUNTDOWN_INITIAL_RENDERED)try{const r=document.createElement("div");r.className=`gta-widget gta-bar ${e.key}`,e.bar.position==="top"?(t=document.querySelector("body"))==null||t.prepend(r):(n=document.querySelector("body"))==null||n.append(r),We(c(ot,{bootstrap:{platform:"Runtime",blockId:e.key,widgetId:e.key,settings:e}}),r)}catch(r){console.log(r)}try{document.querySelectorAll(`.gta-block__root.${e.key}`).forEach(o=>{o.children.length>0||We(c(ot,{bootstrap:{platform:"Runtime",settings:e,blockId:e.key,widgetId:e.key}}),o)})}catch(r){console.log(r)}}}),window.GSC_COUNTDOWN_INITIAL_RENDERED=!0)}})();
})()