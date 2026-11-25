(()=>{var Qd=Object.create;var Kl=Object.defineProperty;var Kd=Object.getOwnPropertyDescriptor;var Zd=Object.getOwnPropertyNames;var Jd=Object.getPrototypeOf,eh=Object.prototype.hasOwnProperty;var Ft=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var th=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Zd(t))!eh.call(e,i)&&i!==n&&Kl(e,i,{get:()=>t[i],enumerable:!(r=Kd(t,i))||r.enumerable});return e};var cr=(e,t,n)=>(n=e!=null?Qd(Jd(e)):{},th(t||!e||!e.__esModule?Kl(n,"default",{value:e,enumerable:!0}):n,e));var us=Ft(G=>{"use strict";var dr=Symbol.for("react.element"),nh=Symbol.for("react.portal"),rh=Symbol.for("react.fragment"),ih=Symbol.for("react.strict_mode"),ah=Symbol.for("react.profiler"),oh=Symbol.for("react.provider"),lh=Symbol.for("react.context"),sh=Symbol.for("react.forward_ref"),uh=Symbol.for("react.suspense"),ch=Symbol.for("react.memo"),dh=Symbol.for("react.lazy"),Zl=Symbol.iterator;function hh(e){return e===null||typeof e!="object"?null:(e=Zl&&e[Zl]||e["@@iterator"],typeof e=="function"?e:null)}var ts={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ns=Object.assign,rs={};function zn(e,t,n){this.props=e,this.context=t,this.refs=rs,this.updater=n||ts}zn.prototype.isReactComponent={};zn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};zn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function is(){}is.prototype=zn.prototype;function Ma(e,t,n){this.props=e,this.context=t,this.refs=rs,this.updater=n||ts}var Aa=Ma.prototype=new is;Aa.constructor=Ma;ns(Aa,zn.prototype);Aa.isPureReactComponent=!0;var Jl=Array.isArray,as=Object.prototype.hasOwnProperty,La={current:null},os={key:!0,ref:!0,__self:!0,__source:!0};function ls(e,t,n){var r,i={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)as.call(t,r)&&!os.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var s=Array(l),c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:dr,type:e,key:a,ref:o,props:i,_owner:La.current}}function ph(e,t){return{$$typeof:dr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ra(e){return typeof e=="object"&&e!==null&&e.$$typeof===dr}function fh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var es=/\/+/g;function Pa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?fh(""+e.key):t.toString(36)}function oi(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case dr:case nh:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Pa(o,0):r,Jl(i)?(n="",e!=null&&(n=e.replace(es,"$&/")+"/"),oi(i,t,n,"",function(c){return c})):i!=null&&(Ra(i)&&(i=ph(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(es,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",Jl(e))for(var l=0;l<e.length;l++){a=e[l];var s=r+Pa(a,l);o+=oi(a,t,n,s,i)}else if(s=hh(e),typeof s=="function")for(e=s.call(e),l=0;!(a=e.next()).done;)a=a.value,s=r+Pa(a,l++),o+=oi(a,t,n,s,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ai(e,t,n){if(e==null)return e;var r=[],i=0;return oi(e,r,"","",function(a){return t.call(n,a,i++)}),r}function gh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ge={current:null},li={transition:null},mh={ReactCurrentDispatcher:Ge,ReactCurrentBatchConfig:li,ReactCurrentOwner:La};function ss(){throw Error("act(...) is not supported in production builds of React.")}G.Children={map:ai,forEach:function(e,t,n){ai(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ai(e,function(){t++}),t},toArray:function(e){return ai(e,function(t){return t})||[]},only:function(e){if(!Ra(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};G.Component=zn;G.Fragment=rh;G.Profiler=ah;G.PureComponent=Ma;G.StrictMode=ih;G.Suspense=uh;G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mh;G.act=ss;G.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ns({},e.props),i=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=La.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)as.call(t,s)&&!os.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){l=Array(s);for(var c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:dr,type:e.type,key:i,ref:a,props:r,_owner:o}};G.createContext=function(e){return e={$$typeof:lh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:oh,_context:e},e.Consumer=e};G.createElement=ls;G.createFactory=function(e){var t=ls.bind(null,e);return t.type=e,t};G.createRef=function(){return{current:null}};G.forwardRef=function(e){return{$$typeof:sh,render:e}};G.isValidElement=Ra;G.lazy=function(e){return{$$typeof:dh,_payload:{_status:-1,_result:e},_init:gh}};G.memo=function(e,t){return{$$typeof:ch,type:e,compare:t===void 0?null:t}};G.startTransition=function(e){var t=li.transition;li.transition={};try{e()}finally{li.transition=t}};G.unstable_act=ss;G.useCallback=function(e,t){return Ge.current.useCallback(e,t)};G.useContext=function(e){return Ge.current.useContext(e)};G.useDebugValue=function(){};G.useDeferredValue=function(e){return Ge.current.useDeferredValue(e)};G.useEffect=function(e,t){return Ge.current.useEffect(e,t)};G.useId=function(){return Ge.current.useId()};G.useImperativeHandle=function(e,t,n){return Ge.current.useImperativeHandle(e,t,n)};G.useInsertionEffect=function(e,t){return Ge.current.useInsertionEffect(e,t)};G.useLayoutEffect=function(e,t){return Ge.current.useLayoutEffect(e,t)};G.useMemo=function(e,t){return Ge.current.useMemo(e,t)};G.useReducer=function(e,t,n){return Ge.current.useReducer(e,t,n)};G.useRef=function(e){return Ge.current.useRef(e)};G.useState=function(e){return Ge.current.useState(e)};G.useSyncExternalStore=function(e,t,n){return Ge.current.useSyncExternalStore(e,t,n)};G.useTransition=function(){return Ge.current.useTransition()};G.version="18.3.1"});var hr=Ft((Hf,cs)=>{"use strict";cs.exports=us()});var ws=Ft(ie=>{"use strict";function Fa(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(0<si(i,t))e[r]=t,e[n]=i,n=r;else break e}}function xt(e){return e.length===0?null:e[0]}function ci(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,a=i>>>1;r<a;){var o=2*(r+1)-1,l=e[o],s=o+1,c=e[s];if(0>si(l,n))s<i&&0>si(c,l)?(e[r]=c,e[s]=n,r=s):(e[r]=l,e[o]=n,r=o);else if(s<i&&0>si(c,n))e[r]=c,e[s]=n,r=s;else break e}}return t}function si(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(ds=performance,ie.unstable_now=function(){return ds.now()}):(za=Date,hs=za.now(),ie.unstable_now=function(){return za.now()-hs});var ds,za,hs,Mt=[],$t=[],vh=1,dt=null,He=3,di=!1,vn=!1,fr=!1,gs=typeof setTimeout=="function"?setTimeout:null,ms=typeof clearTimeout=="function"?clearTimeout:null,ps=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Da(e){for(var t=xt($t);t!==null;){if(t.callback===null)ci($t);else if(t.startTime<=e)ci($t),t.sortIndex=t.expirationTime,Fa(Mt,t);else break;t=xt($t)}}function Ia(e){if(fr=!1,Da(e),!vn)if(xt(Mt)!==null)vn=!0,Ua(Wa);else{var t=xt($t);t!==null&&Ha(Ia,t.startTime-e)}}function Wa(e,t){vn=!1,fr&&(fr=!1,ms(gr),gr=-1),di=!0;var n=He;try{for(Da(t),dt=xt(Mt);dt!==null&&(!(dt.expirationTime>t)||e&&!xs());){var r=dt.callback;if(typeof r=="function"){dt.callback=null,He=dt.priorityLevel;var i=r(dt.expirationTime<=t);t=ie.unstable_now(),typeof i=="function"?dt.callback=i:dt===xt(Mt)&&ci(Mt),Da(t)}else ci(Mt);dt=xt(Mt)}if(dt!==null)var a=!0;else{var o=xt($t);o!==null&&Ha(Ia,o.startTime-t),a=!1}return a}finally{dt=null,He=n,di=!1}}var hi=!1,ui=null,gr=-1,vs=5,ys=-1;function xs(){return!(ie.unstable_now()-ys<vs)}function Ba(){if(ui!==null){var e=ie.unstable_now();ys=e;var t=!0;try{t=ui(!0,e)}finally{t?pr():(hi=!1,ui=null)}}else hi=!1}var pr;typeof ps=="function"?pr=function(){ps(Ba)}:typeof MessageChannel<"u"?(Na=new MessageChannel,fs=Na.port2,Na.port1.onmessage=Ba,pr=function(){fs.postMessage(null)}):pr=function(){gs(Ba,0)};var Na,fs;function Ua(e){ui=e,hi||(hi=!0,pr())}function Ha(e,t){gr=gs(function(){e(ie.unstable_now())},t)}ie.unstable_IdlePriority=5;ie.unstable_ImmediatePriority=1;ie.unstable_LowPriority=4;ie.unstable_NormalPriority=3;ie.unstable_Profiling=null;ie.unstable_UserBlockingPriority=2;ie.unstable_cancelCallback=function(e){e.callback=null};ie.unstable_continueExecution=function(){vn||di||(vn=!0,Ua(Wa))};ie.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):vs=0<e?Math.floor(1e3/e):5};ie.unstable_getCurrentPriorityLevel=function(){return He};ie.unstable_getFirstCallbackNode=function(){return xt(Mt)};ie.unstable_next=function(e){switch(He){case 1:case 2:case 3:var t=3;break;default:t=He}var n=He;He=t;try{return e()}finally{He=n}};ie.unstable_pauseExecution=function(){};ie.unstable_requestPaint=function(){};ie.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=He;He=e;try{return t()}finally{He=n}};ie.unstable_scheduleCallback=function(e,t,n){var r=ie.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}return i=n+i,e={id:vh++,callback:t,priorityLevel:e,startTime:n,expirationTime:i,sortIndex:-1},n>r?(e.sortIndex=n,Fa($t,e),xt(Mt)===null&&e===xt($t)&&(fr?(ms(gr),gr=-1):fr=!0,Ha(Ia,n-r))):(e.sortIndex=i,Fa(Mt,e),vn||di||(vn=!0,Ua(Wa))),e};ie.unstable_shouldYield=xs;ie.unstable_wrapCallback=function(e){var t=He;return function(){var n=He;He=t;try{return e.apply(this,arguments)}finally{He=n}}}});var bs=Ft((jf,ks)=>{"use strict";ks.exports=ws()});var Ed=Ft(st=>{"use strict";var yh=hr(),ot=bs();function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Mu=new Set,Dr={};function An(e,t){er(e,t),er(e+"Capture",t)}function er(e,t){for(Dr[e]=t,e=0;e<t.length;e++)Mu.add(t[e])}var Ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),co=Object.prototype.hasOwnProperty,xh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ss={},Ts={};function wh(e){return co.call(Ts,e)?!0:co.call(Ss,e)?!1:xh.test(e)?Ts[e]=!0:(Ss[e]=!0,!1)}function kh(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function bh(e,t,n,r){if(t===null||typeof t>"u"||kh(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function qe(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Ne={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ne[e]=new qe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ne[t]=new qe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ne[e]=new qe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ne[e]=new qe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ne[e]=new qe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ne[e]=new qe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ne[e]=new qe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ne[e]=new qe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ne[e]=new qe(e,5,!1,e.toLowerCase(),null,!1,!1)});var rl=/[\-:]([a-z])/g;function il(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(rl,il);Ne[t]=new qe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(rl,il);Ne[t]=new qe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(rl,il);Ne[t]=new qe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ne[e]=new qe(e,1,!1,e.toLowerCase(),null,!1,!1)});Ne.xlinkHref=new qe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ne[e]=new qe(e,1,!1,e.toLowerCase(),null,!0,!0)});function al(e,t,n,r){var i=Ne.hasOwnProperty(t)?Ne[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(bh(t,n,i,r)&&(n=null),r||i===null?wh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Gt=yh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,pi=Symbol.for("react.element"),Fn=Symbol.for("react.portal"),Dn=Symbol.for("react.fragment"),ol=Symbol.for("react.strict_mode"),ho=Symbol.for("react.profiler"),Au=Symbol.for("react.provider"),Lu=Symbol.for("react.context"),ll=Symbol.for("react.forward_ref"),po=Symbol.for("react.suspense"),fo=Symbol.for("react.suspense_list"),sl=Symbol.for("react.memo"),Qt=Symbol.for("react.lazy"),Ru=Symbol.for("react.offscreen"),Cs=Symbol.iterator;function mr(e){return e===null||typeof e!="object"?null:(e=Cs&&e[Cs]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,Oa;function Tr(e){if(Oa===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Oa=t&&t[1]||""}return`
`+Oa+e}var ja=!1;function Xa(e,t){if(!e||ja)return"";ja=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,l=a.length-1;1<=o&&0<=l&&i[o]!==a[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==a[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==a[l]){var s=`
`+i[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=l);break}}}finally{ja=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Tr(e):""}function Sh(e){switch(e.tag){case 5:return Tr(e.type);case 16:return Tr("Lazy");case 13:return Tr("Suspense");case 19:return Tr("SuspenseList");case 0:case 2:case 15:return e=Xa(e.type,!1),e;case 11:return e=Xa(e.type.render,!1),e;case 1:return e=Xa(e.type,!0),e;default:return""}}function go(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Dn:return"Fragment";case Fn:return"Portal";case ho:return"Profiler";case ol:return"StrictMode";case po:return"Suspense";case fo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Lu:return(e.displayName||"Context")+".Consumer";case Au:return(e._context.displayName||"Context")+".Provider";case ll:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sl:return t=e.displayName||null,t!==null?t:go(e.type)||"Memo";case Qt:t=e._payload,e=e._init;try{return go(e(t))}catch{}}return null}function Th(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return go(t);case 8:return t===ol?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function dn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function zu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ch(e){var t=zu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function fi(e){e._valueTracker||(e._valueTracker=Ch(e))}function Bu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=zu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Oi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function mo(e,t){var n=t.checked;return fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Es(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=dn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Nu(e,t){t=t.checked,t!=null&&al(e,"checked",t,!1)}function vo(e,t){Nu(e,t);var n=dn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?yo(e,t.type,n):t.hasOwnProperty("defaultValue")&&yo(e,t.type,dn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function _s(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function yo(e,t,n){(t!=="number"||Oi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Cr=Array.isArray;function $n(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function xo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ps(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(Cr(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:dn(n)}}function Fu(e,t){var n=dn(t.value),r=dn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ms(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Du(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Du(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var gi,Iu=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(gi=gi||document.createElement("div"),gi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=gi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ir(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Eh=["Webkit","ms","Moz","O"];Object.keys(Pr).forEach(function(e){Eh.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Pr[t]=Pr[e]})});function Wu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Pr.hasOwnProperty(e)&&Pr[e]?(""+t).trim():t+"px"}function Uu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Wu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var _h=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ko(e,t){if(t){if(_h[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function bo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var So=null;function ul(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var To=null,qn=null,Qn=null;function As(e){if(e=ni(e)){if(typeof To!="function")throw Error(S(280));var t=e.stateNode;t&&(t=ma(t),To(e.stateNode,e.type,t))}}function Hu(e){qn?Qn?Qn.push(e):Qn=[e]:qn=e}function Ou(){if(qn){var e=qn,t=Qn;if(Qn=qn=null,As(e),t)for(e=0;e<t.length;e++)As(t[e])}}function ju(e,t){return e(t)}function Xu(){}var Va=!1;function Vu(e,t,n){if(Va)return e(t,n);Va=!0;try{return ju(e,t,n)}finally{Va=!1,(qn!==null||Qn!==null)&&(Xu(),Ou())}}function Wr(e,t){var n=e.stateNode;if(n===null)return null;var r=ma(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var Co=!1;if(Ot)try{Bn={},Object.defineProperty(Bn,"passive",{get:function(){Co=!0}}),window.addEventListener("test",Bn,Bn),window.removeEventListener("test",Bn,Bn)}catch{Co=!1}var Bn;function Ph(e,t,n,r,i,a,o,l,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(f){this.onError(f)}}var Mr=!1,ji=null,Xi=!1,Eo=null,Mh={onError:function(e){Mr=!0,ji=e}};function Ah(e,t,n,r,i,a,o,l,s){Mr=!1,ji=null,Ph.apply(Mh,arguments)}function Lh(e,t,n,r,i,a,o,l,s){if(Ah.apply(this,arguments),Mr){if(Mr){var c=ji;Mr=!1,ji=null}else throw Error(S(198));Xi||(Xi=!0,Eo=c)}}function Ln(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Gu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ls(e){if(Ln(e)!==e)throw Error(S(188))}function Rh(e){var t=e.alternate;if(!t){if(t=Ln(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return Ls(i),e;if(a===r)return Ls(i),t;a=a.sibling}throw Error(S(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=a;break}if(l===r){o=!0,r=i,n=a;break}l=l.sibling}if(!o){for(l=a.child;l;){if(l===n){o=!0,n=a,r=i;break}if(l===r){o=!0,r=a,n=i;break}l=l.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==r)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function Yu(e){return e=Rh(e),e!==null?$u(e):null}function $u(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=$u(e);if(t!==null)return t;e=e.sibling}return null}var qu=ot.unstable_scheduleCallback,Rs=ot.unstable_cancelCallback,zh=ot.unstable_shouldYield,Bh=ot.unstable_requestPaint,ve=ot.unstable_now,Nh=ot.unstable_getCurrentPriorityLevel,cl=ot.unstable_ImmediatePriority,Qu=ot.unstable_UserBlockingPriority,Vi=ot.unstable_NormalPriority,Fh=ot.unstable_LowPriority,Ku=ot.unstable_IdlePriority,ha=null,zt=null;function Dh(e){if(zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(ha,e,void 0,(e.current.flags&128)===128)}catch{}}var Tt=Math.clz32?Math.clz32:Uh,Ih=Math.log,Wh=Math.LN2;function Uh(e){return e>>>=0,e===0?32:31-(Ih(e)/Wh|0)|0}var mi=64,vi=4194304;function Er(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Er(l):(a&=o,a!==0&&(r=Er(a)))}else o=n&~i,o!==0?r=Er(o):a!==0&&(r=Er(a));if(r===0)return 0;if(t!==0&&t!==r&&(t&i)===0&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Tt(t),i=1<<n,r|=e[n],t&=~i;return r}function Hh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Oh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Tt(a),l=1<<o,s=i[o];s===-1?((l&n)===0||(l&r)!==0)&&(i[o]=Hh(l,t)):s<=t&&(e.expiredLanes|=l),a&=~l}}function _o(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Zu(){var e=mi;return mi<<=1,(mi&4194240)===0&&(mi=64),e}function Ga(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ei(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Tt(t),e[t]=n}function jh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Tt(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function dl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Tt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ne=0;function Ju(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ec,hl,tc,nc,rc,Po=!1,yi=[],nn=null,rn=null,an=null,Ur=new Map,Hr=new Map,Zt=[],Xh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zs(e,t){switch(e){case"focusin":case"focusout":nn=null;break;case"dragenter":case"dragleave":rn=null;break;case"mouseover":case"mouseout":an=null;break;case"pointerover":case"pointerout":Ur.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hr.delete(t.pointerId)}}function vr(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=ni(t),t!==null&&hl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Vh(e,t,n,r,i){switch(t){case"focusin":return nn=vr(nn,e,t,n,r,i),!0;case"dragenter":return rn=vr(rn,e,t,n,r,i),!0;case"mouseover":return an=vr(an,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return Ur.set(a,vr(Ur.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Hr.set(a,vr(Hr.get(a)||null,e,t,n,r,i)),!0}return!1}function ic(e){var t=wn(e.target);if(t!==null){var n=Ln(t);if(n!==null){if(t=n.tag,t===13){if(t=Gu(n),t!==null){e.blockedOn=t,rc(e.priority,function(){tc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ri(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Mo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);So=r,n.target.dispatchEvent(r),So=null}else return t=ni(n),t!==null&&hl(t),e.blockedOn=n,!1;t.shift()}return!0}function Bs(e,t,n){Ri(e)&&n.delete(t)}function Gh(){Po=!1,nn!==null&&Ri(nn)&&(nn=null),rn!==null&&Ri(rn)&&(rn=null),an!==null&&Ri(an)&&(an=null),Ur.forEach(Bs),Hr.forEach(Bs)}function yr(e,t){e.blockedOn===t&&(e.blockedOn=null,Po||(Po=!0,ot.unstable_scheduleCallback(ot.unstable_NormalPriority,Gh)))}function Or(e){function t(i){return yr(i,e)}if(0<yi.length){yr(yi[0],e);for(var n=1;n<yi.length;n++){var r=yi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(nn!==null&&yr(nn,e),rn!==null&&yr(rn,e),an!==null&&yr(an,e),Ur.forEach(t),Hr.forEach(t),n=0;n<Zt.length;n++)r=Zt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Zt.length&&(n=Zt[0],n.blockedOn===null);)ic(n),n.blockedOn===null&&Zt.shift()}var Kn=Gt.ReactCurrentBatchConfig,Yi=!0;function Yh(e,t,n,r){var i=ne,a=Kn.transition;Kn.transition=null;try{ne=1,pl(e,t,n,r)}finally{ne=i,Kn.transition=a}}function $h(e,t,n,r){var i=ne,a=Kn.transition;Kn.transition=null;try{ne=4,pl(e,t,n,r)}finally{ne=i,Kn.transition=a}}function pl(e,t,n,r){if(Yi){var i=Mo(e,t,n,r);if(i===null)Ja(e,t,r,$i,n),zs(e,r);else if(Vh(i,e,t,n,r))r.stopPropagation();else if(zs(e,r),t&4&&-1<Xh.indexOf(e)){for(;i!==null;){var a=ni(i);if(a!==null&&ec(a),a=Mo(e,t,n,r),a===null&&Ja(e,t,r,$i,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Ja(e,t,r,null,n)}}var $i=null;function Mo(e,t,n,r){if($i=null,e=ul(r),e=wn(e),e!==null)if(t=Ln(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Gu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $i=e,null}function ac(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Nh()){case cl:return 1;case Qu:return 4;case Vi:case Fh:return 16;case Ku:return 536870912;default:return 16}default:return 16}}var en=null,fl=null,zi=null;function oc(){if(zi)return zi;var e,t=fl,n=t.length,r,i="value"in en?en.value:en.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return zi=i.slice(e,1<r?1-r:void 0)}function Bi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xi(){return!0}function Ns(){return!1}function lt(e){function t(n,r,i,a,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(a):a[l]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?xi:Ns,this.isPropagationStopped=Ns,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xi)},persist:function(){},isPersistent:xi}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gl=lt(lr),ti=fe({},lr,{view:0,detail:0}),qh=lt(ti),Ya,$a,xr,pa=fe({},ti,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ml,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xr&&(xr&&e.type==="mousemove"?(Ya=e.screenX-xr.screenX,$a=e.screenY-xr.screenY):$a=Ya=0,xr=e),Ya)},movementY:function(e){return"movementY"in e?e.movementY:$a}}),Fs=lt(pa),Qh=fe({},pa,{dataTransfer:0}),Kh=lt(Qh),Zh=fe({},ti,{relatedTarget:0}),qa=lt(Zh),Jh=fe({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),ep=lt(Jh),tp=fe({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),np=lt(tp),rp=fe({},lr,{data:0}),Ds=lt(rp),ip={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ap={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},op={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=op[e])?!!t[e]:!1}function ml(){return lp}var sp=fe({},ti,{key:function(e){if(e.key){var t=ip[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Bi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ap[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ml,charCode:function(e){return e.type==="keypress"?Bi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),up=lt(sp),cp=fe({},pa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Is=lt(cp),dp=fe({},ti,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ml}),hp=lt(dp),pp=fe({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),fp=lt(pp),gp=fe({},pa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),mp=lt(gp),vp=[9,13,27,32],vl=Ot&&"CompositionEvent"in window,Ar=null;Ot&&"documentMode"in document&&(Ar=document.documentMode);var yp=Ot&&"TextEvent"in window&&!Ar,lc=Ot&&(!vl||Ar&&8<Ar&&11>=Ar),Ws=" ",Us=!1;function sc(e,t){switch(e){case"keyup":return vp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function uc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var In=!1;function xp(e,t){switch(e){case"compositionend":return uc(t);case"keypress":return t.which!==32?null:(Us=!0,Ws);case"textInput":return e=t.data,e===Ws&&Us?null:e;default:return null}}function wp(e,t){if(In)return e==="compositionend"||!vl&&sc(e,t)?(e=oc(),zi=fl=en=null,In=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return lc&&t.locale!=="ko"?null:t.data;default:return null}}var kp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!kp[e.type]:t==="textarea"}function cc(e,t,n,r){Hu(r),t=qi(t,"onChange"),0<t.length&&(n=new gl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Lr=null,jr=null;function bp(e){kc(e,0)}function fa(e){var t=Hn(e);if(Bu(t))return e}function Sp(e,t){if(e==="change")return t}var dc=!1;Ot&&(Ot?(ki="oninput"in document,ki||(Qa=document.createElement("div"),Qa.setAttribute("oninput","return;"),ki=typeof Qa.oninput=="function"),wi=ki):wi=!1,dc=wi&&(!document.documentMode||9<document.documentMode));var wi,ki,Qa;function Os(){Lr&&(Lr.detachEvent("onpropertychange",hc),jr=Lr=null)}function hc(e){if(e.propertyName==="value"&&fa(jr)){var t=[];cc(t,jr,e,ul(e)),Vu(bp,t)}}function Tp(e,t,n){e==="focusin"?(Os(),Lr=t,jr=n,Lr.attachEvent("onpropertychange",hc)):e==="focusout"&&Os()}function Cp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return fa(jr)}function Ep(e,t){if(e==="click")return fa(t)}function _p(e,t){if(e==="input"||e==="change")return fa(t)}function Pp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Et=typeof Object.is=="function"?Object.is:Pp;function Xr(e,t){if(Et(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!co.call(t,i)||!Et(e[i],t[i]))return!1}return!0}function js(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Xs(e,t){var n=js(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=js(n)}}function pc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?pc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function fc(){for(var e=window,t=Oi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Oi(e.document)}return t}function yl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Mp(e){var t=fc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&pc(n.ownerDocument.documentElement,n)){if(r!==null&&yl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Xs(n,a);var o=Xs(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ap=Ot&&"documentMode"in document&&11>=document.documentMode,Wn=null,Ao=null,Rr=null,Lo=!1;function Vs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Lo||Wn==null||Wn!==Oi(r)||(r=Wn,"selectionStart"in r&&yl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Rr&&Xr(Rr,r)||(Rr=r,r=qi(Ao,"onSelect"),0<r.length&&(t=new gl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Wn)))}function bi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Un={animationend:bi("Animation","AnimationEnd"),animationiteration:bi("Animation","AnimationIteration"),animationstart:bi("Animation","AnimationStart"),transitionend:bi("Transition","TransitionEnd")},Ka={},gc={};Ot&&(gc=document.createElement("div").style,"AnimationEvent"in window||(delete Un.animationend.animation,delete Un.animationiteration.animation,delete Un.animationstart.animation),"TransitionEvent"in window||delete Un.transitionend.transition);function ga(e){if(Ka[e])return Ka[e];if(!Un[e])return e;var t=Un[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in gc)return Ka[e]=t[n];return e}var mc=ga("animationend"),vc=ga("animationiteration"),yc=ga("animationstart"),xc=ga("transitionend"),wc=new Map,Gs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pn(e,t){wc.set(e,t),An(t,[e])}for(Si=0;Si<Gs.length;Si++)Ti=Gs[Si],Ys=Ti.toLowerCase(),$s=Ti[0].toUpperCase()+Ti.slice(1),pn(Ys,"on"+$s);var Ti,Ys,$s,Si;pn(mc,"onAnimationEnd");pn(vc,"onAnimationIteration");pn(yc,"onAnimationStart");pn("dblclick","onDoubleClick");pn("focusin","onFocus");pn("focusout","onBlur");pn(xc,"onTransitionEnd");er("onMouseEnter",["mouseout","mouseover"]);er("onMouseLeave",["mouseout","mouseover"]);er("onPointerEnter",["pointerout","pointerover"]);er("onPointerLeave",["pointerout","pointerover"]);An("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));An("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));An("onBeforeInput",["compositionend","keypress","textInput","paste"]);An("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));An("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));An("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _r="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lp=new Set("cancel close invalid load scroll toggle".split(" ").concat(_r));function qs(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Lh(r,t,void 0,e),e.currentTarget=null}function kc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],s=l.instance,c=l.currentTarget;if(l=l.listener,s!==a&&i.isPropagationStopped())break e;qs(i,l,c),a=s}else for(o=0;o<r.length;o++){if(l=r[o],s=l.instance,c=l.currentTarget,l=l.listener,s!==a&&i.isPropagationStopped())break e;qs(i,l,c),a=s}}}if(Xi)throw e=Eo,Xi=!1,Eo=null,e}function le(e,t){var n=t[Fo];n===void 0&&(n=t[Fo]=new Set);var r=e+"__bubble";n.has(r)||(bc(t,e,2,!1),n.add(r))}function Za(e,t,n){var r=0;t&&(r|=4),bc(n,e,r,t)}var Ci="_reactListening"+Math.random().toString(36).slice(2);function Vr(e){if(!e[Ci]){e[Ci]=!0,Mu.forEach(function(n){n!=="selectionchange"&&(Lp.has(n)||Za(n,!1,e),Za(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ci]||(t[Ci]=!0,Za("selectionchange",!1,t))}}function bc(e,t,n,r){switch(ac(t)){case 1:var i=Yh;break;case 4:i=$h;break;default:i=pl}n=i.bind(null,t,n,e),i=void 0,!Co||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Ja(e,t,n,r,i){var a=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===i||s.nodeType===8&&s.parentNode===i))return;o=o.return}for(;l!==null;){if(o=wn(l),o===null)return;if(s=o.tag,s===5||s===6){r=a=o;continue e}l=l.parentNode}}r=r.return}Vu(function(){var c=a,f=ul(n),m=[];e:{var p=wc.get(e);if(p!==void 0){var v=gl,x=e;switch(e){case"keypress":if(Bi(n)===0)break e;case"keydown":case"keyup":v=up;break;case"focusin":x="focus",v=qa;break;case"focusout":x="blur",v=qa;break;case"beforeblur":case"afterblur":v=qa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Fs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Kh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=hp;break;case mc:case vc:case yc:v=ep;break;case xc:v=fp;break;case"scroll":v=qh;break;case"wheel":v=mp;break;case"copy":case"cut":case"paste":v=np;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Is}var y=(t&4)!==0,L=!y&&e==="scroll",h=y?p!==null?p+"Capture":null:p;y=[];for(var u=c,d;u!==null;){d=u;var g=d.stateNode;if(d.tag===5&&g!==null&&(d=g,h!==null&&(g=Wr(u,h),g!=null&&y.push(Gr(u,g,d)))),L)break;u=u.return}0<y.length&&(p=new v(p,x,null,n,f),m.push({event:p,listeners:y}))}}if((t&7)===0){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&n!==So&&(x=n.relatedTarget||n.fromElement)&&(wn(x)||x[jt]))break e;if((v||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=c,x=x?wn(x):null,x!==null&&(L=Ln(x),x!==L||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=c),v!==x)){if(y=Fs,g="onMouseLeave",h="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(y=Is,g="onPointerLeave",h="onPointerEnter",u="pointer"),L=v==null?p:Hn(v),d=x==null?p:Hn(x),p=new y(g,u+"leave",v,n,f),p.target=L,p.relatedTarget=d,g=null,wn(f)===c&&(y=new y(h,u+"enter",x,n,f),y.target=d,y.relatedTarget=L,g=y),L=g,v&&x)t:{for(y=v,h=x,u=0,d=y;d;d=Nn(d))u++;for(d=0,g=h;g;g=Nn(g))d++;for(;0<u-d;)y=Nn(y),u--;for(;0<d-u;)h=Nn(h),d--;for(;u--;){if(y===h||h!==null&&y===h.alternate)break t;y=Nn(y),h=Nn(h)}y=null}else y=null;v!==null&&Qs(m,p,v,y,!1),x!==null&&L!==null&&Qs(m,L,x,y,!0)}}e:{if(p=c?Hn(c):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var w=Sp;else if(Hs(p))if(dc)w=_p;else{w=Cp;var C=Tp}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(w=Ep);if(w&&(w=w(e,c))){cc(m,w,n,f);break e}C&&C(e,p,c),e==="focusout"&&(C=p._wrapperState)&&C.controlled&&p.type==="number"&&yo(p,"number",p.value)}switch(C=c?Hn(c):window,e){case"focusin":(Hs(C)||C.contentEditable==="true")&&(Wn=C,Ao=c,Rr=null);break;case"focusout":Rr=Ao=Wn=null;break;case"mousedown":Lo=!0;break;case"contextmenu":case"mouseup":case"dragend":Lo=!1,Vs(m,n,f);break;case"selectionchange":if(Ap)break;case"keydown":case"keyup":Vs(m,n,f)}var T;if(vl)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else In?sc(e,n)&&(k="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(lc&&n.locale!=="ko"&&(In||k!=="onCompositionStart"?k==="onCompositionEnd"&&In&&(T=oc()):(en=f,fl="value"in en?en.value:en.textContent,In=!0)),C=qi(c,k),0<C.length&&(k=new Ds(k,e,null,n,f),m.push({event:k,listeners:C}),T?k.data=T:(T=uc(n),T!==null&&(k.data=T)))),(T=yp?xp(e,n):wp(e,n))&&(c=qi(c,"onBeforeInput"),0<c.length&&(f=new Ds("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=T))}kc(m,t)})}function Gr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qi(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=Wr(e,n),a!=null&&r.unshift(Gr(e,a,i)),a=Wr(e,t),a!=null&&r.push(Gr(e,a,i))),e=e.return}return r}function Nn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Qs(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var l=n,s=l.alternate,c=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&c!==null&&(l=c,i?(s=Wr(n,a),s!=null&&o.unshift(Gr(n,s,l))):i||(s=Wr(n,a),s!=null&&o.push(Gr(n,s,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Rp=/\r\n?/g,zp=/\u0000|\uFFFD/g;function Ks(e){return(typeof e=="string"?e:""+e).replace(Rp,`
`).replace(zp,"")}function Ei(e,t,n){if(t=Ks(t),Ks(e)!==t&&n)throw Error(S(425))}function Qi(){}var Ro=null,zo=null;function Bo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var No=typeof setTimeout=="function"?setTimeout:void 0,Bp=typeof clearTimeout=="function"?clearTimeout:void 0,Zs=typeof Promise=="function"?Promise:void 0,Np=typeof queueMicrotask=="function"?queueMicrotask:typeof Zs<"u"?function(e){return Zs.resolve(null).then(e).catch(Fp)}:No;function Fp(e){setTimeout(function(){throw e})}function eo(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Or(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Or(t)}function on(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Js(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var sr=Math.random().toString(36).slice(2),Rt="__reactFiber$"+sr,Yr="__reactProps$"+sr,jt="__reactContainer$"+sr,Fo="__reactEvents$"+sr,Dp="__reactListeners$"+sr,Ip="__reactHandles$"+sr;function wn(e){var t=e[Rt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[jt]||n[Rt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Js(e);e!==null;){if(n=e[Rt])return n;e=Js(e)}return t}e=n,n=e.parentNode}return null}function ni(e){return e=e[Rt]||e[jt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Hn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function ma(e){return e[Yr]||null}var Do=[],On=-1;function fn(e){return{current:e}}function se(e){0>On||(e.current=Do[On],Do[On]=null,On--)}function ae(e,t){On++,Do[On]=e.current,e.current=t}var hn={},Ve=fn(hn),Je=fn(!1),Cn=hn;function tr(e,t){var n=e.type.contextTypes;if(!n)return hn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function et(e){return e=e.childContextTypes,e!=null}function Ki(){se(Je),se(Ve)}function eu(e,t,n){if(Ve.current!==hn)throw Error(S(168));ae(Ve,t),ae(Je,n)}function Sc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(S(108,Th(e)||"Unknown",i));return fe({},n,r)}function Zi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||hn,Cn=Ve.current,ae(Ve,e),ae(Je,Je.current),!0}function tu(e,t,n){var r=e.stateNode;if(!r)throw Error(S(169));n?(e=Sc(e,t,Cn),r.__reactInternalMemoizedMergedChildContext=e,se(Je),se(Ve),ae(Ve,e)):se(Je),ae(Je,n)}var It=null,va=!1,to=!1;function Tc(e){It===null?It=[e]:It.push(e)}function Wp(e){va=!0,Tc(e)}function gn(){if(!to&&It!==null){to=!0;var e=0,t=ne;try{var n=It;for(ne=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}It=null,va=!1}catch(i){throw It!==null&&(It=It.slice(e+1)),qu(cl,gn),i}finally{ne=t,to=!1}}return null}var jn=[],Xn=0,Ji=null,ea=0,ht=[],pt=0,En=null,Wt=1,Ut="";function yn(e,t){jn[Xn++]=ea,jn[Xn++]=Ji,Ji=e,ea=t}function Cc(e,t,n){ht[pt++]=Wt,ht[pt++]=Ut,ht[pt++]=En,En=e;var r=Wt;e=Ut;var i=32-Tt(r)-1;r&=~(1<<i),n+=1;var a=32-Tt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Wt=1<<32-Tt(t)+i|n<<i|r,Ut=a+e}else Wt=1<<a|n<<i|r,Ut=e}function xl(e){e.return!==null&&(yn(e,1),Cc(e,1,0))}function wl(e){for(;e===Ji;)Ji=jn[--Xn],jn[Xn]=null,ea=jn[--Xn],jn[Xn]=null;for(;e===En;)En=ht[--pt],ht[pt]=null,Ut=ht[--pt],ht[pt]=null,Wt=ht[--pt],ht[pt]=null}var at=null,it=null,ue=!1,St=null;function Ec(e,t){var n=ft(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function nu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,at=e,it=on(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,at=e,it=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=En!==null?{id:Wt,overflow:Ut}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ft(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,at=e,it=null,!0):!1;default:return!1}}function Io(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Wo(e){if(ue){var t=it;if(t){var n=t;if(!nu(e,t)){if(Io(e))throw Error(S(418));t=on(n.nextSibling);var r=at;t&&nu(e,t)?Ec(r,n):(e.flags=e.flags&-4097|2,ue=!1,at=e)}}else{if(Io(e))throw Error(S(418));e.flags=e.flags&-4097|2,ue=!1,at=e}}}function ru(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;at=e}function _i(e){if(e!==at)return!1;if(!ue)return ru(e),ue=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Bo(e.type,e.memoizedProps)),t&&(t=it)){if(Io(e))throw _c(),Error(S(418));for(;t;)Ec(e,t),t=on(t.nextSibling)}if(ru(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){it=on(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}it=null}}else it=at?on(e.stateNode.nextSibling):null;return!0}function _c(){for(var e=it;e;)e=on(e.nextSibling)}function nr(){it=at=null,ue=!1}function kl(e){St===null?St=[e]:St.push(e)}var Up=Gt.ReactCurrentBatchConfig;function wr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var r=n.stateNode}if(!r)throw Error(S(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var l=i.refs;o===null?delete l[a]:l[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function Pi(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function iu(e){var t=e._init;return t(e._payload)}function Pc(e){function t(h,u){if(e){var d=h.deletions;d===null?(h.deletions=[u],h.flags|=16):d.push(u)}}function n(h,u){if(!e)return null;for(;u!==null;)t(h,u),u=u.sibling;return null}function r(h,u){for(h=new Map;u!==null;)u.key!==null?h.set(u.key,u):h.set(u.index,u),u=u.sibling;return h}function i(h,u){return h=cn(h,u),h.index=0,h.sibling=null,h}function a(h,u,d){return h.index=d,e?(d=h.alternate,d!==null?(d=d.index,d<u?(h.flags|=2,u):d):(h.flags|=2,u)):(h.flags|=1048576,u)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function l(h,u,d,g){return u===null||u.tag!==6?(u=so(d,h.mode,g),u.return=h,u):(u=i(u,d),u.return=h,u)}function s(h,u,d,g){var w=d.type;return w===Dn?f(h,u,d.props.children,g,d.key):u!==null&&(u.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Qt&&iu(w)===u.type)?(g=i(u,d.props),g.ref=wr(h,u,d),g.return=h,g):(g=Hi(d.type,d.key,d.props,null,h.mode,g),g.ref=wr(h,u,d),g.return=h,g)}function c(h,u,d,g){return u===null||u.tag!==4||u.stateNode.containerInfo!==d.containerInfo||u.stateNode.implementation!==d.implementation?(u=uo(d,h.mode,g),u.return=h,u):(u=i(u,d.children||[]),u.return=h,u)}function f(h,u,d,g,w){return u===null||u.tag!==7?(u=Tn(d,h.mode,g,w),u.return=h,u):(u=i(u,d),u.return=h,u)}function m(h,u,d){if(typeof u=="string"&&u!==""||typeof u=="number")return u=so(""+u,h.mode,d),u.return=h,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case pi:return d=Hi(u.type,u.key,u.props,null,h.mode,d),d.ref=wr(h,null,u),d.return=h,d;case Fn:return u=uo(u,h.mode,d),u.return=h,u;case Qt:var g=u._init;return m(h,g(u._payload),d)}if(Cr(u)||mr(u))return u=Tn(u,h.mode,d,null),u.return=h,u;Pi(h,u)}return null}function p(h,u,d,g){var w=u!==null?u.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return w!==null?null:l(h,u,""+d,g);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case pi:return d.key===w?s(h,u,d,g):null;case Fn:return d.key===w?c(h,u,d,g):null;case Qt:return w=d._init,p(h,u,w(d._payload),g)}if(Cr(d)||mr(d))return w!==null?null:f(h,u,d,g,null);Pi(h,d)}return null}function v(h,u,d,g,w){if(typeof g=="string"&&g!==""||typeof g=="number")return h=h.get(d)||null,l(u,h,""+g,w);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case pi:return h=h.get(g.key===null?d:g.key)||null,s(u,h,g,w);case Fn:return h=h.get(g.key===null?d:g.key)||null,c(u,h,g,w);case Qt:var C=g._init;return v(h,u,d,C(g._payload),w)}if(Cr(g)||mr(g))return h=h.get(d)||null,f(u,h,g,w,null);Pi(u,g)}return null}function x(h,u,d,g){for(var w=null,C=null,T=u,k=u=0,O=null;T!==null&&k<d.length;k++){T.index>k?(O=T,T=null):O=T.sibling;var F=p(h,T,d[k],g);if(F===null){T===null&&(T=O);break}e&&T&&F.alternate===null&&t(h,T),u=a(F,u,k),C===null?w=F:C.sibling=F,C=F,T=O}if(k===d.length)return n(h,T),ue&&yn(h,k),w;if(T===null){for(;k<d.length;k++)T=m(h,d[k],g),T!==null&&(u=a(T,u,k),C===null?w=T:C.sibling=T,C=T);return ue&&yn(h,k),w}for(T=r(h,T);k<d.length;k++)O=v(T,h,k,d[k],g),O!==null&&(e&&O.alternate!==null&&T.delete(O.key===null?k:O.key),u=a(O,u,k),C===null?w=O:C.sibling=O,C=O);return e&&T.forEach(function(K){return t(h,K)}),ue&&yn(h,k),w}function y(h,u,d,g){var w=mr(d);if(typeof w!="function")throw Error(S(150));if(d=w.call(d),d==null)throw Error(S(151));for(var C=w=null,T=u,k=u=0,O=null,F=d.next();T!==null&&!F.done;k++,F=d.next()){T.index>k?(O=T,T=null):O=T.sibling;var K=p(h,T,F.value,g);if(K===null){T===null&&(T=O);break}e&&T&&K.alternate===null&&t(h,T),u=a(K,u,k),C===null?w=K:C.sibling=K,C=K,T=O}if(F.done)return n(h,T),ue&&yn(h,k),w;if(T===null){for(;!F.done;k++,F=d.next())F=m(h,F.value,g),F!==null&&(u=a(F,u,k),C===null?w=F:C.sibling=F,C=F);return ue&&yn(h,k),w}for(T=r(h,T);!F.done;k++,F=d.next())F=v(T,h,k,F.value,g),F!==null&&(e&&F.alternate!==null&&T.delete(F.key===null?k:F.key),u=a(F,u,k),C===null?w=F:C.sibling=F,C=F);return e&&T.forEach(function(J){return t(h,J)}),ue&&yn(h,k),w}function L(h,u,d,g){if(typeof d=="object"&&d!==null&&d.type===Dn&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case pi:e:{for(var w=d.key,C=u;C!==null;){if(C.key===w){if(w=d.type,w===Dn){if(C.tag===7){n(h,C.sibling),u=i(C,d.props.children),u.return=h,h=u;break e}}else if(C.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Qt&&iu(w)===C.type){n(h,C.sibling),u=i(C,d.props),u.ref=wr(h,C,d),u.return=h,h=u;break e}n(h,C);break}else t(h,C);C=C.sibling}d.type===Dn?(u=Tn(d.props.children,h.mode,g,d.key),u.return=h,h=u):(g=Hi(d.type,d.key,d.props,null,h.mode,g),g.ref=wr(h,u,d),g.return=h,h=g)}return o(h);case Fn:e:{for(C=d.key;u!==null;){if(u.key===C)if(u.tag===4&&u.stateNode.containerInfo===d.containerInfo&&u.stateNode.implementation===d.implementation){n(h,u.sibling),u=i(u,d.children||[]),u.return=h,h=u;break e}else{n(h,u);break}else t(h,u);u=u.sibling}u=uo(d,h.mode,g),u.return=h,h=u}return o(h);case Qt:return C=d._init,L(h,u,C(d._payload),g)}if(Cr(d))return x(h,u,d,g);if(mr(d))return y(h,u,d,g);Pi(h,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,u!==null&&u.tag===6?(n(h,u.sibling),u=i(u,d),u.return=h,h=u):(n(h,u),u=so(d,h.mode,g),u.return=h,h=u),o(h)):n(h,u)}return L}var rr=Pc(!0),Mc=Pc(!1),ta=fn(null),na=null,Vn=null,bl=null;function Sl(){bl=Vn=na=null}function Tl(e){var t=ta.current;se(ta),e._currentValue=t}function Uo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Zn(e,t){na=e,bl=Vn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ze=!0),e.firstContext=null)}function mt(e){var t=e._currentValue;if(bl!==e)if(e={context:e,memoizedValue:t,next:null},Vn===null){if(na===null)throw Error(S(308));Vn=e,na.dependencies={lanes:0,firstContext:e}}else Vn=Vn.next=e;return t}var kn=null;function Cl(e){kn===null?kn=[e]:kn.push(e)}function Ac(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Cl(t)):(n.next=i.next,i.next=n),t.interleaved=n,Xt(e,r)}function Xt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Kt=!1;function El(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Lc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ht(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ln(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Z&2)!==0){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Xt(e,n)}return i=r.interleaved,i===null?(t.next=t,Cl(r)):(t.next=i.next,i.next=t),r.interleaved=t,Xt(e,n)}function Ni(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dl(e,n)}}function au(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ra(e,t,n,r){var i=e.updateQueue;Kt=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var s=l,c=s.next;s.next=null,o===null?a=c:o.next=c,o=s;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=s))}if(a!==null){var m=i.baseState;o=0,f=c=s=null,l=a;do{var p=l.lane,v=l.eventTime;if((r&p)===p){f!==null&&(f=f.next={eventTime:v,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=e,y=l;switch(p=t,v=n,y.tag){case 1:if(x=y.payload,typeof x=="function"){m=x.call(v,m,p);break e}m=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=y.payload,p=typeof x=="function"?x.call(v,m,p):x,p==null)break e;m=fe({},m,p);break e;case 2:Kt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[l]:p.push(l))}else v={eventTime:v,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=v,s=m):f=f.next=v,o|=p;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;p=l,l=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(f===null&&(s=m),i.baseState=s,i.firstBaseUpdate=c,i.lastBaseUpdate=f,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Pn|=o,e.lanes=o,e.memoizedState=m}}function ou(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(S(191,i));i.call(r)}}}var ri={},Bt=fn(ri),$r=fn(ri),qr=fn(ri);function bn(e){if(e===ri)throw Error(S(174));return e}function _l(e,t){switch(ae(qr,t),ae($r,e),ae(Bt,ri),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:wo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=wo(t,e)}se(Bt),ae(Bt,t)}function ir(){se(Bt),se($r),se(qr)}function Rc(e){bn(qr.current);var t=bn(Bt.current),n=wo(t,e.type);t!==n&&(ae($r,e),ae(Bt,n))}function Pl(e){$r.current===e&&(se(Bt),se($r))}var he=fn(0);function ia(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var no=[];function Ml(){for(var e=0;e<no.length;e++)no[e]._workInProgressVersionPrimary=null;no.length=0}var Fi=Gt.ReactCurrentDispatcher,ro=Gt.ReactCurrentBatchConfig,_n=0,pe=null,be=null,Ee=null,aa=!1,zr=!1,Qr=0,Hp=0;function Oe(){throw Error(S(321))}function Al(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Et(e[n],t[n]))return!1;return!0}function Ll(e,t,n,r,i,a){if(_n=a,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Fi.current=e===null||e.memoizedState===null?Vp:Gp,e=n(r,i),zr){a=0;do{if(zr=!1,Qr=0,25<=a)throw Error(S(301));a+=1,Ee=be=null,t.updateQueue=null,Fi.current=Yp,e=n(r,i)}while(zr)}if(Fi.current=oa,t=be!==null&&be.next!==null,_n=0,Ee=be=pe=null,aa=!1,t)throw Error(S(300));return e}function Rl(){var e=Qr!==0;return Qr=0,e}function Lt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ee===null?pe.memoizedState=Ee=e:Ee=Ee.next=e,Ee}function vt(){if(be===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var t=Ee===null?pe.memoizedState:Ee.next;if(t!==null)Ee=t,be=e;else{if(e===null)throw Error(S(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},Ee===null?pe.memoizedState=Ee=e:Ee=Ee.next=e}return Ee}function Kr(e,t){return typeof t=="function"?t(e):t}function io(e){var t=vt(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=be,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var l=o=null,s=null,c=a;do{var f=c.lane;if((_n&f)===f)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(l=s=m,o=r):s=s.next=m,pe.lanes|=f,Pn|=f}c=c.next}while(c!==null&&c!==a);s===null?o=r:s.next=l,Et(r,t.memoizedState)||(Ze=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,pe.lanes|=a,Pn|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ao(e){var t=vt(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Et(a,t.memoizedState)||(Ze=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function zc(){}function Bc(e,t){var n=pe,r=vt(),i=t(),a=!Et(r.memoizedState,i);if(a&&(r.memoizedState=i,Ze=!0),r=r.queue,zl(Dc.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Ee!==null&&Ee.memoizedState.tag&1){if(n.flags|=2048,Zr(9,Fc.bind(null,n,r,i,t),void 0,null),_e===null)throw Error(S(349));(_n&30)!==0||Nc(n,t,i)}return i}function Nc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Fc(e,t,n,r){t.value=n,t.getSnapshot=r,Ic(t)&&Wc(e)}function Dc(e,t,n){return n(function(){Ic(t)&&Wc(e)})}function Ic(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Et(e,n)}catch{return!0}}function Wc(e){var t=Xt(e,1);t!==null&&Ct(t,e,1,-1)}function lu(e){var t=Lt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Kr,lastRenderedState:e},t.queue=e,e=e.dispatch=Xp.bind(null,pe,e),[t.memoizedState,e]}function Zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=pe.updateQueue,t===null?(t={lastEffect:null,stores:null},pe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Uc(){return vt().memoizedState}function Di(e,t,n,r){var i=Lt();pe.flags|=e,i.memoizedState=Zr(1|t,n,void 0,r===void 0?null:r)}function ya(e,t,n,r){var i=vt();r=r===void 0?null:r;var a=void 0;if(be!==null){var o=be.memoizedState;if(a=o.destroy,r!==null&&Al(r,o.deps)){i.memoizedState=Zr(t,n,a,r);return}}pe.flags|=e,i.memoizedState=Zr(1|t,n,a,r)}function su(e,t){return Di(8390656,8,e,t)}function zl(e,t){return ya(2048,8,e,t)}function Hc(e,t){return ya(4,2,e,t)}function Oc(e,t){return ya(4,4,e,t)}function jc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xc(e,t,n){return n=n!=null?n.concat([e]):null,ya(4,4,jc.bind(null,t,e),n)}function Bl(){}function Vc(e,t){var n=vt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Gc(e,t){var n=vt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Al(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Yc(e,t,n){return(_n&21)===0?(e.baseState&&(e.baseState=!1,Ze=!0),e.memoizedState=n):(Et(n,t)||(n=Zu(),pe.lanes|=n,Pn|=n,e.baseState=!0),t)}function Op(e,t){var n=ne;ne=n!==0&&4>n?n:4,e(!0);var r=ro.transition;ro.transition={};try{e(!1),t()}finally{ne=n,ro.transition=r}}function $c(){return vt().memoizedState}function jp(e,t,n){var r=un(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},qc(e))Qc(t,n);else if(n=Ac(e,t,n,r),n!==null){var i=$e();Ct(n,e,r,i),Kc(n,t,r)}}function Xp(e,t,n){var r=un(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(qc(e))Qc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,l=a(o,n);if(i.hasEagerState=!0,i.eagerState=l,Et(l,o)){var s=t.interleaved;s===null?(i.next=i,Cl(t)):(i.next=s.next,s.next=i),t.interleaved=i;return}}catch{}n=Ac(e,t,i,r),n!==null&&(i=$e(),Ct(n,e,r,i),Kc(n,t,r))}}function qc(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function Qc(e,t){zr=aa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Kc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,dl(e,n)}}var oa={readContext:mt,useCallback:Oe,useContext:Oe,useEffect:Oe,useImperativeHandle:Oe,useInsertionEffect:Oe,useLayoutEffect:Oe,useMemo:Oe,useReducer:Oe,useRef:Oe,useState:Oe,useDebugValue:Oe,useDeferredValue:Oe,useTransition:Oe,useMutableSource:Oe,useSyncExternalStore:Oe,useId:Oe,unstable_isNewReconciler:!1},Vp={readContext:mt,useCallback:function(e,t){return Lt().memoizedState=[e,t===void 0?null:t],e},useContext:mt,useEffect:su,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Di(4194308,4,jc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Di(4194308,4,e,t)},useInsertionEffect:function(e,t){return Di(4,2,e,t)},useMemo:function(e,t){var n=Lt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Lt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=jp.bind(null,pe,e),[r.memoizedState,e]},useRef:function(e){var t=Lt();return e={current:e},t.memoizedState=e},useState:lu,useDebugValue:Bl,useDeferredValue:function(e){return Lt().memoizedState=e},useTransition:function(){var e=lu(!1),t=e[0];return e=Op.bind(null,e[1]),Lt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=pe,i=Lt();if(ue){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),_e===null)throw Error(S(349));(_n&30)!==0||Nc(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,su(Dc.bind(null,r,a,e),[e]),r.flags|=2048,Zr(9,Fc.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Lt(),t=_e.identifierPrefix;if(ue){var n=Ut,r=Wt;n=(r&~(1<<32-Tt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Qr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Hp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Gp={readContext:mt,useCallback:Vc,useContext:mt,useEffect:zl,useImperativeHandle:Xc,useInsertionEffect:Hc,useLayoutEffect:Oc,useMemo:Gc,useReducer:io,useRef:Uc,useState:function(){return io(Kr)},useDebugValue:Bl,useDeferredValue:function(e){var t=vt();return Yc(t,be.memoizedState,e)},useTransition:function(){var e=io(Kr)[0],t=vt().memoizedState;return[e,t]},useMutableSource:zc,useSyncExternalStore:Bc,useId:$c,unstable_isNewReconciler:!1},Yp={readContext:mt,useCallback:Vc,useContext:mt,useEffect:zl,useImperativeHandle:Xc,useInsertionEffect:Hc,useLayoutEffect:Oc,useMemo:Gc,useReducer:ao,useRef:Uc,useState:function(){return ao(Kr)},useDebugValue:Bl,useDeferredValue:function(e){var t=vt();return be===null?t.memoizedState=e:Yc(t,be.memoizedState,e)},useTransition:function(){var e=ao(Kr)[0],t=vt().memoizedState;return[e,t]},useMutableSource:zc,useSyncExternalStore:Bc,useId:$c,unstable_isNewReconciler:!1};function kt(e,t){if(e&&e.defaultProps){t=fe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ho(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:fe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xa={isMounted:function(e){return(e=e._reactInternals)?Ln(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=$e(),i=un(e),a=Ht(r,i);a.payload=t,n!=null&&(a.callback=n),t=ln(e,a,i),t!==null&&(Ct(t,e,i,r),Ni(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=$e(),i=un(e),a=Ht(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=ln(e,a,i),t!==null&&(Ct(t,e,i,r),Ni(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=$e(),r=un(e),i=Ht(n,r);i.tag=2,t!=null&&(i.callback=t),t=ln(e,i,r),t!==null&&(Ct(t,e,r,n),Ni(t,e,r))}};function uu(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Xr(n,r)||!Xr(i,a):!0}function Zc(e,t,n){var r=!1,i=hn,a=t.contextType;return typeof a=="object"&&a!==null?a=mt(a):(i=et(t)?Cn:Ve.current,r=t.contextTypes,a=(r=r!=null)?tr(e,i):hn),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=xa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function cu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&xa.enqueueReplaceState(t,t.state,null)}function Oo(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},El(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=mt(a):(a=et(t)?Cn:Ve.current,i.context=tr(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Ho(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&xa.enqueueReplaceState(i,i.state,null),ra(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function ar(e,t){try{var n="",r=t;do n+=Sh(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function oo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function jo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var $p=typeof WeakMap=="function"?WeakMap:Map;function Jc(e,t,n){n=Ht(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){sa||(sa=!0,Jo=r),jo(e,t)},n}function ed(e,t,n){n=Ht(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){jo(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){jo(e,t),typeof r!="function"&&(sn===null?sn=new Set([this]):sn.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function du(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new $p;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=uf.bind(null,e,t,n),t.then(e,e))}function hu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function pu(e,t,n,r,i){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ht(-1,1),t.tag=2,ln(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var qp=Gt.ReactCurrentOwner,Ze=!1;function Ye(e,t,n,r){t.child=e===null?Mc(t,null,n,r):rr(t,e.child,n,r)}function fu(e,t,n,r,i){n=n.render;var a=t.ref;return Zn(t,i),r=Ll(e,t,n,r,a,i),n=Rl(),e!==null&&!Ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vt(e,t,i)):(ue&&n&&xl(t),t.flags|=1,Ye(e,t,r,i),t.child)}function gu(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!Ol(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,td(e,t,a,r,i)):(e=Hi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Xr,n(o,r)&&e.ref===t.ref)return Vt(e,t,i)}return t.flags|=1,e=cn(a,r),e.ref=t.ref,e.return=t,t.child=e}function td(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Xr(a,r)&&e.ref===t.ref)if(Ze=!1,t.pendingProps=r=a,(e.lanes&i)!==0)(e.flags&131072)!==0&&(Ze=!0);else return t.lanes=e.lanes,Vt(e,t,i)}return Xo(e,t,n,r,i)}function nd(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ae(Yn,rt),rt|=n;else{if((n&1073741824)===0)return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ae(Yn,rt),rt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,ae(Yn,rt),rt|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,ae(Yn,rt),rt|=r;return Ye(e,t,i,n),t.child}function rd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Xo(e,t,n,r,i){var a=et(n)?Cn:Ve.current;return a=tr(t,a),Zn(t,i),n=Ll(e,t,n,r,a,i),r=Rl(),e!==null&&!Ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vt(e,t,i)):(ue&&r&&xl(t),t.flags|=1,Ye(e,t,n,i),t.child)}function mu(e,t,n,r,i){if(et(n)){var a=!0;Zi(t)}else a=!1;if(Zn(t,i),t.stateNode===null)Ii(e,t),Zc(t,n,r),Oo(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var s=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=mt(c):(c=et(n)?Cn:Ve.current,c=tr(t,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||s!==c)&&cu(t,o,r,c),Kt=!1;var p=t.memoizedState;o.state=p,ra(t,r,o,i),s=t.memoizedState,l!==r||p!==s||Je.current||Kt?(typeof f=="function"&&(Ho(t,n,f,r),s=t.memoizedState),(l=Kt||uu(t,n,l,r,p,s,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Lc(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:kt(t.type,l),o.props=c,m=t.pendingProps,p=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=mt(s):(s=et(n)?Cn:Ve.current,s=tr(t,s));var v=n.getDerivedStateFromProps;(f=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||p!==s)&&cu(t,o,r,s),Kt=!1,p=t.memoizedState,o.state=p,ra(t,r,o,i);var x=t.memoizedState;l!==m||p!==x||Je.current||Kt?(typeof v=="function"&&(Ho(t,n,v,r),x=t.memoizedState),(c=Kt||uu(t,n,c,r,p,x,s)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,x,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,x,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),o.props=r,o.state=x,o.context=s,r=c):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Vo(e,t,n,r,a,i)}function Vo(e,t,n,r,i,a){rd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&tu(t,n,!1),Vt(e,t,a);r=t.stateNode,qp.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=rr(t,e.child,null,a),t.child=rr(t,null,l,a)):Ye(e,t,l,a),t.memoizedState=r.state,i&&tu(t,n,!0),t.child}function id(e){var t=e.stateNode;t.pendingContext?eu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&eu(e,t.context,!1),_l(e,t.containerInfo)}function vu(e,t,n,r,i){return nr(),kl(i),t.flags|=256,Ye(e,t,n,r),t.child}var Go={dehydrated:null,treeContext:null,retryLane:0};function Yo(e){return{baseLanes:e,cachePool:null,transitions:null}}function ad(e,t,n){var r=t.pendingProps,i=he.current,a=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ae(he,i&1),e===null)return Wo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},(r&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=o):a=ba(o,r,0,null),e=Tn(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Yo(n),t.memoizedState=Go,e):Nl(t,o));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Qp(e,t,o,r,l,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,l=i.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=cn(i,s),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?a=cn(l,a):(a=Tn(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?Yo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Go,r}return a=e.child,e=a.sibling,r=cn(a,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Nl(e,t){return t=ba({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Mi(e,t,n,r){return r!==null&&kl(r),rr(t,e.child,null,n),e=Nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qp(e,t,n,r,i,a,o){if(n)return t.flags&256?(t.flags&=-257,r=oo(Error(S(422))),Mi(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=ba({mode:"visible",children:r.children},i,0,null),a=Tn(a,i,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,(t.mode&1)!==0&&rr(t,e.child,null,o),t.child.memoizedState=Yo(o),t.memoizedState=Go,a);if((t.mode&1)===0)return Mi(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,a=Error(S(419)),r=oo(a,r,void 0),Mi(e,t,o,r)}if(l=(o&e.childLanes)!==0,Ze||l){if(r=_e,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(r.suspendedLanes|o))!==0?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,Xt(e,i),Ct(r,e,i,-1))}return Hl(),r=oo(Error(S(421))),Mi(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=cf.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,it=on(i.nextSibling),at=t,ue=!0,St=null,e!==null&&(ht[pt++]=Wt,ht[pt++]=Ut,ht[pt++]=En,Wt=e.id,Ut=e.overflow,En=t),t=Nl(t,r.children),t.flags|=4096,t)}function yu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Uo(e.return,t,n)}function lo(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function od(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Ye(e,t,r.children,n),r=he.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&yu(e,n,t);else if(e.tag===19)yu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ae(he,r),(t.mode&1)===0)t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ia(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),lo(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ia(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}lo(t,!0,n,null,a);break;case"together":lo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ii(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Vt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Pn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=cn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=cn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Kp(e,t,n){switch(t.tag){case 3:id(t),nr();break;case 5:Rc(t);break;case 1:et(t.type)&&Zi(t);break;case 4:_l(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ae(ta,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ae(he,he.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?ad(e,t,n):(ae(he,he.current&1),e=Vt(e,t,n),e!==null?e.sibling:null);ae(he,he.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return od(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ae(he,he.current),r)break;return null;case 22:case 23:return t.lanes=0,nd(e,t,n)}return Vt(e,t,n)}var ld,$o,sd,ud;ld=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};$o=function(){};sd=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,bn(Bt.current);var a=null;switch(n){case"input":i=mo(e,i),r=mo(e,r),a=[];break;case"select":i=fe({},i,{value:void 0}),r=fe({},r,{value:void 0}),a=[];break;case"textarea":i=xo(e,i),r=xo(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Qi)}ko(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Dr.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var s=r[c];if(l=i?.[c],r.hasOwnProperty(c)&&s!==l&&(s!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&l[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(a||(a=[]),a.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(a=a||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(a=a||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Dr.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&le("scroll",e),a||l===s||(a=[])):(a=a||[]).push(c,s))}n&&(a=a||[]).push("style",n);var c=a;(t.updateQueue=c)&&(t.flags|=4)}};ud=function(e,t,n,r){n!==r&&(t.flags|=4)};function kr(e,t){if(!ue)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function je(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Zp(e,t,n){var r=t.pendingProps;switch(wl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(t),null;case 1:return et(t.type)&&Ki(),je(t),null;case 3:return r=t.stateNode,ir(),se(Je),se(Ve),Ml(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(_i(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,St!==null&&(nl(St),St=null))),$o(e,t),je(t),null;case 5:Pl(t);var i=bn(qr.current);if(n=t.type,e!==null&&t.stateNode!=null)sd(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(S(166));return je(t),null}if(e=bn(Bt.current),_i(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Rt]=t,r[Yr]=a,e=(t.mode&1)!==0,n){case"dialog":le("cancel",r),le("close",r);break;case"iframe":case"object":case"embed":le("load",r);break;case"video":case"audio":for(i=0;i<_r.length;i++)le(_r[i],r);break;case"source":le("error",r);break;case"img":case"image":case"link":le("error",r),le("load",r);break;case"details":le("toggle",r);break;case"input":Es(r,a),le("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},le("invalid",r);break;case"textarea":Ps(r,a),le("invalid",r)}ko(n,a),i=null;for(var o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="children"?typeof l=="string"?r.textContent!==l&&(a.suppressHydrationWarning!==!0&&Ei(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(a.suppressHydrationWarning!==!0&&Ei(r.textContent,l,e),i=["children",""+l]):Dr.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&le("scroll",r)}switch(n){case"input":fi(r),_s(r,a,!0);break;case"textarea":fi(r),Ms(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Qi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Du(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Rt]=t,e[Yr]=r,ld(e,t,!1,!1),t.stateNode=e;e:{switch(o=bo(n,r),n){case"dialog":le("cancel",e),le("close",e),i=r;break;case"iframe":case"object":case"embed":le("load",e),i=r;break;case"video":case"audio":for(i=0;i<_r.length;i++)le(_r[i],e);i=r;break;case"source":le("error",e),i=r;break;case"img":case"image":case"link":le("error",e),le("load",e),i=r;break;case"details":le("toggle",e),i=r;break;case"input":Es(e,r),i=mo(e,r),le("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=fe({},r,{value:void 0}),le("invalid",e);break;case"textarea":Ps(e,r),i=xo(e,r),le("invalid",e);break;default:i=r}ko(n,i),l=i;for(a in l)if(l.hasOwnProperty(a)){var s=l[a];a==="style"?Uu(e,s):a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Iu(e,s)):a==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Ir(e,s):typeof s=="number"&&Ir(e,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Dr.hasOwnProperty(a)?s!=null&&a==="onScroll"&&le("scroll",e):s!=null&&al(e,a,s,o))}switch(n){case"input":fi(e),_s(e,r,!1);break;case"textarea":fi(e),Ms(e);break;case"option":r.value!=null&&e.setAttribute("value",""+dn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?$n(e,!!r.multiple,a,!1):r.defaultValue!=null&&$n(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Qi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return je(t),null;case 6:if(e&&t.stateNode!=null)ud(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(S(166));if(n=bn(qr.current),bn(Bt.current),_i(t)){if(r=t.stateNode,n=t.memoizedProps,r[Rt]=t,(a=r.nodeValue!==n)&&(e=at,e!==null))switch(e.tag){case 3:Ei(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ei(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Rt]=t,t.stateNode=r}return je(t),null;case 13:if(se(he),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ue&&it!==null&&(t.mode&1)!==0&&(t.flags&128)===0)_c(),nr(),t.flags|=98560,a=!1;else if(a=_i(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(S(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(S(317));a[Rt]=t}else nr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;je(t),a=!1}else St!==null&&(nl(St),St=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(he.current&1)!==0?Se===0&&(Se=3):Hl())),t.updateQueue!==null&&(t.flags|=4),je(t),null);case 4:return ir(),$o(e,t),e===null&&Vr(t.stateNode.containerInfo),je(t),null;case 10:return Tl(t.type._context),je(t),null;case 17:return et(t.type)&&Ki(),je(t),null;case 19:if(se(he),a=t.memoizedState,a===null)return je(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)kr(a,!1);else{if(Se!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=ia(e),o!==null){for(t.flags|=128,kr(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ae(he,he.current&1|2),t.child}e=e.sibling}a.tail!==null&&ve()>or&&(t.flags|=128,r=!0,kr(a,!1),t.lanes=4194304)}else{if(!r)if(e=ia(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),kr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!ue)return je(t),null}else 2*ve()-a.renderingStartTime>or&&n!==1073741824&&(t.flags|=128,r=!0,kr(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ve(),t.sibling=null,n=he.current,ae(he,r?n&1|2:n&1),t):(je(t),null);case 22:case 23:return Ul(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(rt&1073741824)!==0&&(je(t),t.subtreeFlags&6&&(t.flags|=8192)):je(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function Jp(e,t){switch(wl(t),t.tag){case 1:return et(t.type)&&Ki(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ir(),se(Je),se(Ve),Ml(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Pl(t),null;case 13:if(se(he),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));nr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(he),null;case 4:return ir(),null;case 10:return Tl(t.type._context),null;case 22:case 23:return Ul(),null;case 24:return null;default:return null}}var Ai=!1,Xe=!1,ef=typeof WeakSet=="function"?WeakSet:Set,R=null;function Gn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ge(e,t,r)}else n.current=null}function qo(e,t,n){try{n()}catch(r){ge(e,t,r)}}var xu=!1;function tf(e,t){if(Ro=Yi,e=fc(),yl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,l=-1,s=-1,c=0,f=0,m=e,p=null;t:for(;;){for(var v;m!==n||i!==0&&m.nodeType!==3||(l=o+i),m!==a||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(v=m.firstChild)!==null;)p=m,m=v;for(;;){if(m===e)break t;if(p===n&&++c===i&&(l=o),p===a&&++f===r&&(s=o),(v=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=v}n=l===-1||s===-1?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(zo={focusedElem:e,selectionRange:n},Yi=!1,R=t;R!==null;)if(t=R,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,R=e;else for(;R!==null;){t=R;try{var x=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var y=x.memoizedProps,L=x.memoizedState,h=t.stateNode,u=h.getSnapshotBeforeUpdate(t.elementType===t.type?y:kt(t.type,y),L);h.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var d=t.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(g){ge(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,R=e;break}R=t.return}return x=xu,xu=!1,x}function Br(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&qo(t,n,a)}i=i.next}while(i!==r)}}function wa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Qo(e){var t=e.ref;if(t!==null){var n=e.stateNode;e.tag,e=n,typeof t=="function"?t(e):t.current=e}}function cd(e){var t=e.alternate;t!==null&&(e.alternate=null,cd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Rt],delete t[Yr],delete t[Fo],delete t[Dp],delete t[Ip])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function dd(e){return e.tag===5||e.tag===3||e.tag===4}function wu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ko(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Qi));else if(r!==4&&(e=e.child,e!==null))for(Ko(e,t,n),e=e.sibling;e!==null;)Ko(e,t,n),e=e.sibling}function Zo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Zo(e,t,n),e=e.sibling;e!==null;)Zo(e,t,n),e=e.sibling}var ze=null,bt=!1;function qt(e,t,n){for(n=n.child;n!==null;)hd(e,t,n),n=n.sibling}function hd(e,t,n){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(ha,n)}catch{}switch(n.tag){case 5:Xe||Gn(n,t);case 6:var r=ze,i=bt;ze=null,qt(e,t,n),ze=r,bt=i,ze!==null&&(bt?(e=ze,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ze.removeChild(n.stateNode));break;case 18:ze!==null&&(bt?(e=ze,n=n.stateNode,e.nodeType===8?eo(e.parentNode,n):e.nodeType===1&&eo(e,n),Or(e)):eo(ze,n.stateNode));break;case 4:r=ze,i=bt,ze=n.stateNode.containerInfo,bt=!0,qt(e,t,n),ze=r,bt=i;break;case 0:case 11:case 14:case 15:if(!Xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&((a&2)!==0||(a&4)!==0)&&qo(n,t,o),i=i.next}while(i!==r)}qt(e,t,n);break;case 1:if(!Xe&&(Gn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ge(n,t,l)}qt(e,t,n);break;case 21:qt(e,t,n);break;case 22:n.mode&1?(Xe=(r=Xe)||n.memoizedState!==null,qt(e,t,n),Xe=r):qt(e,t,n);break;default:qt(e,t,n)}}function ku(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ef),t.forEach(function(r){var i=df.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function wt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:ze=l.stateNode,bt=!1;break e;case 3:ze=l.stateNode.containerInfo,bt=!0;break e;case 4:ze=l.stateNode.containerInfo,bt=!0;break e}l=l.return}if(ze===null)throw Error(S(160));hd(a,o,i),ze=null,bt=!1;var s=i.alternate;s!==null&&(s.return=null),i.return=null}catch(c){ge(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)pd(t,e),t=t.sibling}function pd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(wt(t,e),At(e),r&4){try{Br(3,e,e.return),wa(3,e)}catch(y){ge(e,e.return,y)}try{Br(5,e,e.return)}catch(y){ge(e,e.return,y)}}break;case 1:wt(t,e),At(e),r&512&&n!==null&&Gn(n,n.return);break;case 5:if(wt(t,e),At(e),r&512&&n!==null&&Gn(n,n.return),e.flags&32){var i=e.stateNode;try{Ir(i,"")}catch(y){ge(e,e.return,y)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&a.type==="radio"&&a.name!=null&&Nu(i,a),bo(l,o);var c=bo(l,a);for(o=0;o<s.length;o+=2){var f=s[o],m=s[o+1];f==="style"?Uu(i,m):f==="dangerouslySetInnerHTML"?Iu(i,m):f==="children"?Ir(i,m):al(i,f,m,c)}switch(l){case"input":vo(i,a);break;case"textarea":Fu(i,a);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var v=a.value;v!=null?$n(i,!!a.multiple,v,!1):p!==!!a.multiple&&(a.defaultValue!=null?$n(i,!!a.multiple,a.defaultValue,!0):$n(i,!!a.multiple,a.multiple?[]:"",!1))}i[Yr]=a}catch(y){ge(e,e.return,y)}}break;case 6:if(wt(t,e),At(e),r&4){if(e.stateNode===null)throw Error(S(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(y){ge(e,e.return,y)}}break;case 3:if(wt(t,e),At(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Or(t.containerInfo)}catch(y){ge(e,e.return,y)}break;case 4:wt(t,e),At(e);break;case 13:wt(t,e),At(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Il=ve())),r&4&&ku(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(Xe=(c=Xe)||f,wt(t,e),Xe=c):wt(t,e),At(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&(e.mode&1)!==0)for(R=e,f=e.child;f!==null;){for(m=R=f;R!==null;){switch(p=R,v=p.child,p.tag){case 0:case 11:case 14:case 15:Br(4,p,p.return);break;case 1:Gn(p,p.return);var x=p.stateNode;if(typeof x.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(y){ge(r,n,y)}}break;case 5:Gn(p,p.return);break;case 22:if(p.memoizedState!==null){Su(m);continue}}v!==null?(v.return=p,R=v):Su(m)}f=f.sibling}e:for(f=null,m=e;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,c?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(l=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=Wu("display",o))}catch(y){ge(e,e.return,y)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(y){ge(e,e.return,y)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:wt(t,e),At(e),r&4&&ku(e);break;case 21:break;default:wt(t,e),At(e)}}function At(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(dd(n)){var r=n;break e}n=n.return}throw Error(S(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Ir(i,""),r.flags&=-33);var a=wu(e);Zo(e,a,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=wu(e);Ko(e,l,o);break;default:throw Error(S(161))}}catch(s){ge(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function nf(e,t,n){R=e,fd(e,t,n)}function fd(e,t,n){for(var r=(e.mode&1)!==0;R!==null;){var i=R,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Ai;if(!o){var l=i.alternate,s=l!==null&&l.memoizedState!==null||Xe;l=Ai;var c=Xe;if(Ai=o,(Xe=s)&&!c)for(R=i;R!==null;)o=R,s=o.child,o.tag===22&&o.memoizedState!==null?Tu(i):s!==null?(s.return=o,R=s):Tu(i);for(;a!==null;)R=a,fd(a,t,n),a=a.sibling;R=i,Ai=l,Xe=c}bu(e,t,n)}else(i.subtreeFlags&8772)!==0&&a!==null?(a.return=i,R=a):bu(e,t,n)}}function bu(e){for(;R!==null;){var t=R;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Xe||wa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Xe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:kt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&ou(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ou(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Or(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}Xe||t.flags&512&&Qo(t)}catch(p){ge(t,t.return,p)}}if(t===e){R=null;break}if(n=t.sibling,n!==null){n.return=t.return,R=n;break}R=t.return}}function Su(e){for(;R!==null;){var t=R;if(t===e){R=null;break}var n=t.sibling;if(n!==null){n.return=t.return,R=n;break}R=t.return}}function Tu(e){for(;R!==null;){var t=R;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{wa(4,t)}catch(s){ge(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(s){ge(t,i,s)}}var a=t.return;try{Qo(t)}catch(s){ge(t,a,s)}break;case 5:var o=t.return;try{Qo(t)}catch(s){ge(t,o,s)}}}catch(s){ge(t,t.return,s)}if(t===e){R=null;break}var l=t.sibling;if(l!==null){l.return=t.return,R=l;break}R=t.return}}var rf=Math.ceil,la=Gt.ReactCurrentDispatcher,Fl=Gt.ReactCurrentOwner,gt=Gt.ReactCurrentBatchConfig,Z=0,_e=null,we=null,Be=0,rt=0,Yn=fn(0),Se=0,Jr=null,Pn=0,ka=0,Dl=0,Nr=null,Ke=null,Il=0,or=1/0,Dt=null,sa=!1,Jo=null,sn=null,Li=!1,tn=null,ua=0,Fr=0,el=null,Wi=-1,Ui=0;function $e(){return(Z&6)!==0?ve():Wi!==-1?Wi:Wi=ve()}function un(e){return(e.mode&1)===0?1:(Z&2)!==0&&Be!==0?Be&-Be:Up.transition!==null?(Ui===0&&(Ui=Zu()),Ui):(e=ne,e!==0||(e=window.event,e=e===void 0?16:ac(e.type)),e)}function Ct(e,t,n,r){if(50<Fr)throw Fr=0,el=null,Error(S(185));ei(e,n,r),((Z&2)===0||e!==_e)&&(e===_e&&((Z&2)===0&&(ka|=n),Se===4&&Jt(e,Be)),tt(e,r),n===1&&Z===0&&(t.mode&1)===0&&(or=ve()+500,va&&gn()))}function tt(e,t){var n=e.callbackNode;Oh(e,t);var r=Gi(e,e===_e?Be:0);if(r===0)n!==null&&Rs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Rs(n),t===1)e.tag===0?Wp(Cu.bind(null,e)):Tc(Cu.bind(null,e)),Np(function(){(Z&6)===0&&gn()}),n=null;else{switch(Ju(r)){case 1:n=cl;break;case 4:n=Qu;break;case 16:n=Vi;break;case 536870912:n=Ku;break;default:n=Vi}n=bd(n,gd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function gd(e,t){if(Wi=-1,Ui=0,(Z&6)!==0)throw Error(S(327));var n=e.callbackNode;if(Jn()&&e.callbackNode!==n)return null;var r=Gi(e,e===_e?Be:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=ca(e,r);else{t=r;var i=Z;Z|=2;var a=vd();(_e!==e||Be!==t)&&(Dt=null,or=ve()+500,Sn(e,t));do try{lf();break}catch(l){md(e,l)}while(!0);Sl(),la.current=a,Z=i,we!==null?t=0:(_e=null,Be=0,t=Se)}if(t!==0){if(t===2&&(i=_o(e),i!==0&&(r=i,t=tl(e,i))),t===1)throw n=Jr,Sn(e,0),Jt(e,r),tt(e,ve()),n;if(t===6)Jt(e,r);else{if(i=e.current.alternate,(r&30)===0&&!af(i)&&(t=ca(e,r),t===2&&(a=_o(e),a!==0&&(r=a,t=tl(e,a))),t===1))throw n=Jr,Sn(e,0),Jt(e,r),tt(e,ve()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(S(345));case 2:xn(e,Ke,Dt);break;case 3:if(Jt(e,r),(r&130023424)===r&&(t=Il+500-ve(),10<t)){if(Gi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){$e(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=No(xn.bind(null,e,Ke,Dt),t);break}xn(e,Ke,Dt);break;case 4:if(Jt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Tt(r);a=1<<o,o=t[o],o>i&&(i=o),r&=~a}if(r=i,r=ve()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*rf(r/1960))-r,10<r){e.timeoutHandle=No(xn.bind(null,e,Ke,Dt),r);break}xn(e,Ke,Dt);break;case 5:xn(e,Ke,Dt);break;default:throw Error(S(329))}}}return tt(e,ve()),e.callbackNode===n?gd.bind(null,e):null}function tl(e,t){var n=Nr;return e.current.memoizedState.isDehydrated&&(Sn(e,t).flags|=256),e=ca(e,t),e!==2&&(t=Ke,Ke=n,t!==null&&nl(t)),e}function nl(e){Ke===null?Ke=e:Ke.push.apply(Ke,e)}function af(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Et(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Jt(e,t){for(t&=~Dl,t&=~ka,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Tt(t),r=1<<n;e[n]=-1,t&=~r}}function Cu(e){if((Z&6)!==0)throw Error(S(327));Jn();var t=Gi(e,0);if((t&1)===0)return tt(e,ve()),null;var n=ca(e,t);if(e.tag!==0&&n===2){var r=_o(e);r!==0&&(t=r,n=tl(e,r))}if(n===1)throw n=Jr,Sn(e,0),Jt(e,t),tt(e,ve()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,xn(e,Ke,Dt),tt(e,ve()),null}function Wl(e,t){var n=Z;Z|=1;try{return e(t)}finally{Z=n,Z===0&&(or=ve()+500,va&&gn())}}function Mn(e){tn!==null&&tn.tag===0&&(Z&6)===0&&Jn();var t=Z;Z|=1;var n=gt.transition,r=ne;try{if(gt.transition=null,ne=1,e)return e()}finally{ne=r,gt.transition=n,Z=t,(Z&6)===0&&gn()}}function Ul(){rt=Yn.current,se(Yn)}function Sn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Bp(n)),we!==null)for(n=we.return;n!==null;){var r=n;switch(wl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ki();break;case 3:ir(),se(Je),se(Ve),Ml();break;case 5:Pl(r);break;case 4:ir();break;case 13:se(he);break;case 19:se(he);break;case 10:Tl(r.type._context);break;case 22:case 23:Ul()}n=n.return}if(_e=e,we=e=cn(e.current,null),Be=rt=t,Se=0,Jr=null,Dl=ka=Pn=0,Ke=Nr=null,kn!==null){for(t=0;t<kn.length;t++)if(n=kn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}kn=null}return e}function md(e,t){do{var n=we;try{if(Sl(),Fi.current=oa,aa){for(var r=pe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}aa=!1}if(_n=0,Ee=be=pe=null,zr=!1,Qr=0,Fl.current=null,n===null||n.return===null){Se=1,Jr=t,we=null;break}e:{var a=e,o=n.return,l=n,s=t;if(t=Be,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,f=l,m=f.tag;if((f.mode&1)===0&&(m===0||m===11||m===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=hu(o);if(v!==null){v.flags&=-257,pu(v,o,l,a,t),v.mode&1&&du(a,c,t),t=v,s=c;var x=t.updateQueue;if(x===null){var y=new Set;y.add(s),t.updateQueue=y}else x.add(s);break e}else{if((t&1)===0){du(a,c,t),Hl();break e}s=Error(S(426))}}else if(ue&&l.mode&1){var L=hu(o);if(L!==null){(L.flags&65536)===0&&(L.flags|=256),pu(L,o,l,a,t),kl(ar(s,l));break e}}a=s=ar(s,l),Se!==4&&(Se=2),Nr===null?Nr=[a]:Nr.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=Jc(a,s,t);au(a,h);break e;case 1:l=s;var u=a.type,d=a.stateNode;if((a.flags&128)===0&&(typeof u.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(sn===null||!sn.has(d)))){a.flags|=65536,t&=-t,a.lanes|=t;var g=ed(a,l,t);au(a,g);break e}}a=a.return}while(a!==null)}xd(n)}catch(w){t=w,we===n&&n!==null&&(we=n=n.return);continue}break}while(!0)}function vd(){var e=la.current;return la.current=oa,e===null?oa:e}function Hl(){(Se===0||Se===3||Se===2)&&(Se=4),_e===null||(Pn&268435455)===0&&(ka&268435455)===0||Jt(_e,Be)}function ca(e,t){var n=Z;Z|=2;var r=vd();(_e!==e||Be!==t)&&(Dt=null,Sn(e,t));do try{of();break}catch(i){md(e,i)}while(!0);if(Sl(),Z=n,la.current=r,we!==null)throw Error(S(261));return _e=null,Be=0,Se}function of(){for(;we!==null;)yd(we)}function lf(){for(;we!==null&&!zh();)yd(we)}function yd(e){var t=kd(e.alternate,e,rt);e.memoizedProps=e.pendingProps,t===null?xd(e):we=t,Fl.current=null}function xd(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Zp(n,t,rt),n!==null){we=n;return}}else{if(n=Jp(n,t),n!==null){n.flags&=32767,we=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Se=6,we=null;return}}if(t=t.sibling,t!==null){we=t;return}we=t=e}while(t!==null);Se===0&&(Se=5)}function xn(e,t,n){var r=ne,i=gt.transition;try{gt.transition=null,ne=1,sf(e,t,n,r)}finally{gt.transition=i,ne=r}return null}function sf(e,t,n,r){do Jn();while(tn!==null);if((Z&6)!==0)throw Error(S(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(jh(e,a),e===_e&&(we=_e=null,Be=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Li||(Li=!0,bd(Vi,function(){return Jn(),null})),a=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||a){a=gt.transition,gt.transition=null;var o=ne;ne=1;var l=Z;Z|=4,Fl.current=null,tf(e,n),pd(n,e),Mp(zo),Yi=!!Ro,zo=Ro=null,e.current=n,nf(n,e,i),Bh(),Z=l,ne=o,gt.transition=a}else e.current=n;if(Li&&(Li=!1,tn=e,ua=i),a=e.pendingLanes,a===0&&(sn=null),Dh(n.stateNode,r),tt(e,ve()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(sa)throw sa=!1,e=Jo,Jo=null,e;return(ua&1)!==0&&e.tag!==0&&Jn(),a=e.pendingLanes,(a&1)!==0?e===el?Fr++:(Fr=0,el=e):Fr=0,gn(),null}function Jn(){if(tn!==null){var e=Ju(ua),t=gt.transition,n=ne;try{if(gt.transition=null,ne=16>e?16:e,tn===null)var r=!1;else{if(e=tn,tn=null,ua=0,(Z&6)!==0)throw Error(S(331));var i=Z;for(Z|=4,R=e.current;R!==null;){var a=R,o=a.child;if((R.flags&16)!==0){var l=a.deletions;if(l!==null){for(var s=0;s<l.length;s++){var c=l[s];for(R=c;R!==null;){var f=R;switch(f.tag){case 0:case 11:case 15:Br(8,f,a)}var m=f.child;if(m!==null)m.return=f,R=m;else for(;R!==null;){f=R;var p=f.sibling,v=f.return;if(cd(f),f===c){R=null;break}if(p!==null){p.return=v,R=p;break}R=v}}}var x=a.alternate;if(x!==null){var y=x.child;if(y!==null){x.child=null;do{var L=y.sibling;y.sibling=null,y=L}while(y!==null)}}R=a}}if((a.subtreeFlags&2064)!==0&&o!==null)o.return=a,R=o;else e:for(;R!==null;){if(a=R,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:Br(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,R=h;break e}R=a.return}}var u=e.current;for(R=u;R!==null;){o=R;var d=o.child;if((o.subtreeFlags&2064)!==0&&d!==null)d.return=o,R=d;else e:for(o=u;R!==null;){if(l=R,(l.flags&2048)!==0)try{switch(l.tag){case 0:case 11:case 15:wa(9,l)}}catch(w){ge(l,l.return,w)}if(l===o){R=null;break e}var g=l.sibling;if(g!==null){g.return=l.return,R=g;break e}R=l.return}}if(Z=i,gn(),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot(ha,e)}catch{}r=!0}return r}finally{ne=n,gt.transition=t}}return!1}function Eu(e,t,n){t=ar(n,t),t=Jc(e,t,1),e=ln(e,t,1),t=$e(),e!==null&&(ei(e,1,t),tt(e,t))}function ge(e,t,n){if(e.tag===3)Eu(e,e,n);else for(;t!==null;){if(t.tag===3){Eu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sn===null||!sn.has(r))){e=ar(n,e),e=ed(t,e,1),t=ln(t,e,1),e=$e(),t!==null&&(ei(t,1,e),tt(t,e));break}}t=t.return}}function uf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=$e(),e.pingedLanes|=e.suspendedLanes&n,_e===e&&(Be&n)===n&&(Se===4||Se===3&&(Be&130023424)===Be&&500>ve()-Il?Sn(e,0):Dl|=n),tt(e,t)}function wd(e,t){t===0&&((e.mode&1)===0?t=1:(t=vi,vi<<=1,(vi&130023424)===0&&(vi=4194304)));var n=$e();e=Xt(e,t),e!==null&&(ei(e,t,n),tt(e,n))}function cf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),wd(e,n)}function df(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(S(314))}r!==null&&r.delete(t),wd(e,n)}var kd;kd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Je.current)Ze=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Ze=!1,Kp(e,t,n);Ze=(e.flags&131072)!==0}else Ze=!1,ue&&(t.flags&1048576)!==0&&Cc(t,ea,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ii(e,t),e=t.pendingProps;var i=tr(t,Ve.current);Zn(t,n),i=Ll(null,t,r,e,i,n);var a=Rl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,et(r)?(a=!0,Zi(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,El(t),i.updater=xa,t.stateNode=i,i._reactInternals=t,Oo(t,r,e,n),t=Vo(null,t,r,!0,a,n)):(t.tag=0,ue&&a&&xl(t),Ye(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ii(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=pf(r),e=kt(r,e),i){case 0:t=Xo(null,t,r,e,n);break e;case 1:t=mu(null,t,r,e,n);break e;case 11:t=fu(null,t,r,e,n);break e;case 14:t=gu(null,t,r,kt(r.type,e),n);break e}throw Error(S(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:kt(r,i),Xo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:kt(r,i),mu(e,t,r,i,n);case 3:e:{if(id(t),e===null)throw Error(S(387));r=t.pendingProps,a=t.memoizedState,i=a.element,Lc(e,t),ra(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=ar(Error(S(423)),t),t=vu(e,t,r,n,i);break e}else if(r!==i){i=ar(Error(S(424)),t),t=vu(e,t,r,n,i);break e}else for(it=on(t.stateNode.containerInfo.firstChild),at=t,ue=!0,St=null,n=Mc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(nr(),r===i){t=Vt(e,t,n);break e}Ye(e,t,r,n)}t=t.child}return t;case 5:return Rc(t),e===null&&Wo(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,Bo(r,i)?o=null:a!==null&&Bo(r,a)&&(t.flags|=32),rd(e,t),Ye(e,t,o,n),t.child;case 6:return e===null&&Wo(t),null;case 13:return ad(e,t,n);case 4:return _l(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=rr(t,null,r,n):Ye(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:kt(r,i),fu(e,t,r,i,n);case 7:return Ye(e,t,t.pendingProps,n),t.child;case 8:return Ye(e,t,t.pendingProps.children,n),t.child;case 12:return Ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,o=i.value,ae(ta,r._currentValue),r._currentValue=o,a!==null)if(Et(a.value,o)){if(a.children===i.children&&!Je.current){t=Vt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var l=a.dependencies;if(l!==null){o=a.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(a.tag===1){s=Ht(-1,n&-n),s.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?s.next=s:(s.next=f.next,f.next=s),c.pending=s}}a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Uo(a.return,n,t),l.lanes|=n;break}s=s.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(S(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Uo(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Ye(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Zn(t,n),i=mt(i),r=r(i),t.flags|=1,Ye(e,t,r,n),t.child;case 14:return r=t.type,i=kt(r,t.pendingProps),i=kt(r.type,i),gu(e,t,r,i,n);case 15:return td(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:kt(r,i),Ii(e,t),t.tag=1,et(r)?(e=!0,Zi(t)):e=!1,Zn(t,n),Zc(t,r,i),Oo(t,r,i,n),Vo(null,t,r,!0,e,n);case 19:return od(e,t,n);case 22:return nd(e,t,n)}throw Error(S(156,t.tag))};function bd(e,t){return qu(e,t)}function hf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,n,r){return new hf(e,t,n,r)}function Ol(e){return e=e.prototype,!(!e||!e.isReactComponent)}function pf(e){if(typeof e=="function")return Ol(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ll)return 11;if(e===sl)return 14}return 2}function cn(e,t){var n=e.alternate;return n===null?(n=ft(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Hi(e,t,n,r,i,a){var o=2;if(r=e,typeof e=="function")Ol(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Dn:return Tn(n.children,i,a,t);case ol:o=8,i|=8;break;case ho:return e=ft(12,n,t,i|2),e.elementType=ho,e.lanes=a,e;case po:return e=ft(13,n,t,i),e.elementType=po,e.lanes=a,e;case fo:return e=ft(19,n,t,i),e.elementType=fo,e.lanes=a,e;case Ru:return ba(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Au:o=10;break e;case Lu:o=9;break e;case ll:o=11;break e;case sl:o=14;break e;case Qt:o=16,r=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=ft(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Tn(e,t,n,r){return e=ft(7,e,r,t),e.lanes=n,e}function ba(e,t,n,r){return e=ft(22,e,r,t),e.elementType=Ru,e.lanes=n,e.stateNode={isHidden:!1},e}function so(e,t,n){return e=ft(6,e,null,t),e.lanes=n,e}function uo(e,t,n){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ff(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ga(0),this.expirationTimes=Ga(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ga(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function jl(e,t,n,r,i,a,o,l,s){return e=new ff(e,t,n,l,s),t===1?(t=1,a===!0&&(t|=8)):t=0,a=ft(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},El(a),e}function gf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Sd(e){if(!e)return hn;e=e._reactInternals;e:{if(Ln(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(et(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(et(n))return Sc(e,n,t)}return t}function Td(e,t,n,r,i,a,o,l,s){return e=jl(n,r,!0,e,i,a,o,l,s),e.context=Sd(null),n=e.current,r=$e(),i=un(n),a=Ht(r,i),a.callback=t??null,ln(n,a,i),e.current.lanes=i,ei(e,i,r),tt(e,r),e}function Sa(e,t,n,r){var i=t.current,a=$e(),o=un(i);return n=Sd(n),t.context===null?t.context=n:t.pendingContext=n,t=Ht(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ln(i,t,o),e!==null&&(Ct(e,i,o,a),Ni(e,i,o)),o}function da(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function _u(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Xl(e,t){_u(e,t),(e=e.alternate)&&_u(e,t)}function mf(){return null}var Cd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Vl(e){this._internalRoot=e}Ta.prototype.render=Vl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));Sa(e,t,null,null)};Ta.prototype.unmount=Vl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Mn(function(){Sa(null,e,null,null)}),t[jt]=null}};function Ta(e){this._internalRoot=e}Ta.prototype.unstable_scheduleHydration=function(e){if(e){var t=nc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Zt.length&&t!==0&&t<Zt[n].priority;n++);Zt.splice(n,0,e),n===0&&ic(e)}};function Gl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ca(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Pu(){}function vf(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var c=da(o);a.call(c)}}var o=Td(t,r,e,0,null,!1,!1,"",Pu);return e._reactRootContainer=o,e[jt]=o.current,Vr(e.nodeType===8?e.parentNode:e),Mn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=da(s);l.call(c)}}var s=jl(e,0,!1,null,null,!1,!1,"",Pu);return e._reactRootContainer=s,e[jt]=s.current,Vr(e.nodeType===8?e.parentNode:e),Mn(function(){Sa(t,s,n,r)}),s}function Ea(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i=="function"){var l=i;i=function(){var s=da(o);l.call(s)}}Sa(t,o,e,i)}else o=vf(n,t,e,i,r);return da(o)}ec=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Er(t.pendingLanes);n!==0&&(dl(t,n|1),tt(t,ve()),(Z&6)===0&&(or=ve()+500,gn()))}break;case 13:Mn(function(){var r=Xt(e,1);if(r!==null){var i=$e();Ct(r,e,1,i)}}),Xl(e,1)}};hl=function(e){if(e.tag===13){var t=Xt(e,134217728);if(t!==null){var n=$e();Ct(t,e,134217728,n)}Xl(e,134217728)}};tc=function(e){if(e.tag===13){var t=un(e),n=Xt(e,t);if(n!==null){var r=$e();Ct(n,e,t,r)}Xl(e,t)}};nc=function(){return ne};rc=function(e,t){var n=ne;try{return ne=e,t()}finally{ne=n}};To=function(e,t,n){switch(t){case"input":if(vo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=ma(r);if(!i)throw Error(S(90));Bu(r),vo(r,i)}}}break;case"textarea":Fu(e,n);break;case"select":t=n.value,t!=null&&$n(e,!!n.multiple,t,!1)}};ju=Wl;Xu=Mn;var yf={usingClientEntryPoint:!1,Events:[ni,Hn,ma,Hu,Ou,Wl]},br={findFiberByHostInstance:wn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},xf={bundleType:br.bundleType,version:br.version,rendererPackageName:br.rendererPackageName,rendererConfig:br.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Yu(e),e===null?null:e.stateNode},findFiberByHostInstance:br.findFiberByHostInstance||mf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Sr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Sr.isDisabled&&Sr.supportsFiber))try{ha=Sr.inject(xf),zt=Sr}catch{}var Sr;st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yf;st.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gl(t))throw Error(S(200));return gf(e,t,null,n)};st.createRoot=function(e,t){if(!Gl(e))throw Error(S(299));var n=!1,r="",i=Cd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=jl(e,1,!1,null,null,n,!1,r,i),e[jt]=t.current,Vr(e.nodeType===8?e.parentNode:e),new Vl(t)};st.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=Yu(t),e=e===null?null:e.stateNode,e};st.flushSync=function(e){return Mn(e)};st.hydrate=function(e,t,n){if(!Ca(t))throw Error(S(200));return Ea(null,e,t,!0,n)};st.hydrateRoot=function(e,t,n){if(!Gl(e))throw Error(S(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",o=Cd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Td(t,null,e,1,n??null,i,!1,a,o),e[jt]=t.current,Vr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Ta(t)};st.render=function(e,t,n){if(!Ca(t))throw Error(S(200));return Ea(null,e,t,!1,n)};st.unmountComponentAtNode=function(e){if(!Ca(e))throw Error(S(40));return e._reactRootContainer?(Mn(function(){Ea(null,null,e,!1,function(){e._reactRootContainer=null,e[jt]=null})}),!0):!1};st.unstable_batchedUpdates=Wl;st.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ca(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return Ea(e,t,n,!1,r)};st.version="18.3.1-next-f1338f8080-20240426"});var Yl=Ft((Vf,Pd)=>{"use strict";function _d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_d)}catch(e){console.error(e)}}_d(),Pd.exports=Ed()});var Ad=Ft($l=>{"use strict";var Md=Yl();$l.createRoot=Md.createRoot,$l.hydrateRoot=Md.hydrateRoot;var Gf});var Rd=Ft(_a=>{"use strict";var wf=hr(),kf=Symbol.for("react.element"),bf=Symbol.for("react.fragment"),Sf=Object.prototype.hasOwnProperty,Tf=wf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cf={key:!0,ref:!0,__self:!0,__source:!0};function Ld(e,t,n){var r,i={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Sf.call(t,r)&&!Cf.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:kf,type:e,key:a,ref:o,props:i,_owner:Tf.current}}_a.Fragment=bf;_a.jsx=Ld;_a.jsxs=Ld});var Bd=Ft((qf,zd)=>{"use strict";zd.exports=Rd()});var De=cr(hr()),Vd=cr(Ad()),mn=cr(Yl());var H=cr(Bd(),1),z=cr(hr(),1);if(typeof document<"u"&&!document.getElementById("tactile-glass-ui-styles")){let e=document.createElement("style");e.id="tactile-glass-ui-styles",e.textContent=`:root {
  /* ==========================================================================
     LAYER 1: FOUNDATION PRIMITIVES
     ========================================================================== */

  /* 1.1 Spacing Scale (Strict 4px grid, with 2px micro-step for compact insets) */
  --space-2: 2px;
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-28: 28px;
  --space-32: 32px;
  --space-36: 36px;
  --space-40: 40px;
  --space-48: 48px;
  --space-56: 56px;
  --space-64: 64px;
  --space-80: 80px;
  --space-96: 96px;

  /* 1.2 Border Radii
     - sm (8px): Inline code tags
     - md (12px): Sidebar navigation items and icon boxes
     - lg (16px): Major containers (.stage-block, .settings-panel, .doc-code-box)
     - xl..3xl: Optical WebGL glass component hulls (Prompt, Card, Audio)
     - full (9999px): Capsule buttons, shell actions, reset buttons, badges, and pills */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 28px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* 1.3 Surfaces, Borders & Text Hierarchy (3-Tier Z-Axis Elevation: Canvas -> Surface -> Elevated)
     - bg-canvas (Z0): Root page and transparent WebGL stage backdrop
     - bg-surface / hover / active (Z1): Primary containers and controls sitting directly on canvas (inspector panels, code blocks, shell buttons, sidebar items, and mobile nav pills)
     - bg-elevated / hover / active (Z2): Nested elements sitting inside a surface (sidebar icon boxes, inspector Reset buttons, version badge, inline code tags, segmented state track, and prompt pills)
     - border-subtle: Delicate 1px structural outline for the stage block
     - text-primary / secondary / muted: 3-tier typographic contrast hierarchy */
  --bg-canvas: #141517;
  --bg-surface: rgba(27, 30, 33, 0.88);
  --bg-surface-hover: rgba(32, 36, 42, 0.92);
  --bg-surface-active: rgba(42, 47, 55, 0.96);
  --bg-elevated: rgba(255, 255, 255, 0.08);
  --bg-elevated-hover: rgba(255, 255, 255, 0.14);
  --bg-elevated-active: rgba(255, 255, 255, 0.20);
  --border-subtle: rgba(255, 255, 255, 0.04);

  --text-primary: #ffffff;
  --text-secondary: #9da0a6;
  --text-muted: #71757e;
  --focus-ring-color: rgba(255, 255, 255, 0.40);

  /* 1.4 Typography Scale
     - xs (11px): Badges, slider values, compact labels
     - sm (12px): Sidebar navigation, shell buttons, code snippets, timecodes, site footer
     - md (14px): Body descriptions (.stage-subtitle, .doc-section-desc), panel headers, brand title
     - base (16px): Primary interactive component labels (Button, Tabs, Prompt, Card brand)
     - lg (20px): Documentation section headings (H2) and audio track title
     - xl (24px): Embossed credit card number groups
     - 2xl (36px): Active component page heading (H1)
     - display: Fluid container-responsive hero typography (Tactile Heading) */
  --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'SF Pro', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 36px;
  --font-size-display: clamp(var(--space-32), 11.5cqw, var(--space-80));

  /* Font Weights
     - regular (400): Body copy, descriptions, inactive nav items, slider labels, code, card number, footer
     - medium (500): All headings (H1, H2, brand, panel headers), active nav item, shell action buttons, badges, tabs, prompt pills, slider values, footer author
     - semibold (600): Primary button CTA, audio track title & timecodes, card metadata
     - extrabold (800): Hero display typography (Tactile Heading) */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-extrabold: 800;

  /* Line Heights & Letter Spacing
     - line-height-none (1.0): Hero display typography (Tactile Heading & Hero Stage)
     - line-height-tight (16px): Compact numeric rows (.audio-time-row)
     - line-height-snug (24px): Monospace code blocks (.code-panel-pre)
     - line-height-relaxed (1.5): Body copy, subtitles, descriptions, and prompt textarea
     - line-height-2xl (44px): Active component page heading (.stage-title)
     - letter-spacing-tighter (-0.04em): Active component page heading (.stage-title)
     - letter-spacing-display (-0.025em): Hero display typography (Tactile Heading & Hero Stage)
     - letter-spacing-tight (-0.015em): Section headings (.doc-section-title) & primary button CTA (.btn-label)
     - letter-spacing-snug (-0.01em): Brand title, panel headers, and audio track title
     - letter-spacing-wide (0.04em): Segmented state pill labels (.state-btn)
     - letter-spacing-wider (0.08em): Credit card metadata values (.credit-card-value)
     - letter-spacing-widest (0.10em): Embossed credit card number (.credit-card-number)
     - letter-spacing-ultra (0.22em): Credit card bank wordmark (.credit-card-bank-name) */
  --line-height-none: 1.0;
  --line-height-tight: var(--space-16);
  --line-height-snug: var(--space-24);
  --line-height-relaxed: 1.5;
  --line-height-2xl: 44px;
  --letter-spacing-tighter: -0.04em;
  --letter-spacing-display: -0.025em;
  --letter-spacing-tight: -0.015em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-wide: 0.04em;
  --letter-spacing-wider: 0.08em;
  --letter-spacing-widest: 0.10em;
  --letter-spacing-ultra: 0.22em;

  /* 1.5 Iconography (Strict 4px grid) */
  --icon-sm: var(--space-16);
  --icon-md: var(--space-20);
  --icon-lg: var(--space-24);

  /* ==========================================================================
     LAYER 2: SEMANTIC SHELL & COMPONENT TOKENS
     ========================================================================== */

  /* 2.1 Shell Layout & Controls
     - control-h-sm (32px): Icon-only copy buttons inside code blocks
     - control-h-md (40px): Shell action buttons (Copy Prompt, SKILL.md, GitHub), Reset buttons, and mobile nav pills */
  --sidebar-nav-w: 220px;
  --sidebar-settings-w: 304px;
  --inspector-label-w: 88px;
  --inspector-value-w: var(--space-36);
  --heading-max-w: 920px;
  --subtitle-max-w: 680px;
  --perspective-3d: 1000px;
  --control-h-sm: var(--space-32);
  --control-h-md: var(--space-40);

  /* 2.2 Tactile Button (Unified 56px height) */
  --btn-h: var(--space-56);
  --btn-radius: var(--radius-2xl);
  --btn-pad-h: var(--space-32);

  /* 2.3 Tactile Switch (Unified 104x56px hull + molded 48px optical glass thumb dome) */
  --switch-w: 104px;
  --switch-h: var(--space-56);
  --switch-pad: var(--space-4);
  --switch-thumb-size: var(--space-48);
  --switch-travel: var(--space-48);

  /* 2.4 Tactile Tabs (Unified 56px hull + molded 48px optical glass capsule indicator) */
  --tabs-h: var(--space-56);
  --tabs-item-h: var(--space-48);

  /* 2.5 Tactile Prompt Input */
  --prompt-box-w: 580px;
  --prompt-box-radius: var(--radius-xl);
  --prompt-box-pad: var(--space-20);
  --prompt-pill-h: var(--space-40);
  --prompt-submit-size: var(--space-40);
  --prompt-textarea-min-h: var(--space-48);
  --prompt-textarea-max-h: 160px;

  /* 2.6 Tactile Credit Card (ISO/IEC 7810 ID-1 ratio ~1.586) */
  --card-w: 444px;
  --card-radius: var(--radius-xl);
  --card-pad: var(--space-24);
  --card-network-w: var(--space-48);
  --card-network-circle-size: var(--space-32);
  --card-icon-muted: rgba(255, 255, 255, 0.55);
  --card-text: rgba(255, 255, 255, 0.92);
  --card-network-left-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 100%);
  --card-network-right-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%);

  /* 2.7 Tactile Spatial Audio Player (480x304px) */
  --audio-w: 480px;
  --audio-radius: var(--radius-3xl);
  --audio-pad-top: var(--space-28);
  --audio-pad-h: var(--space-32);
  --audio-pad-bottom: var(--space-48);
  --audio-btn-sec-size: var(--space-56);
  --audio-btn-play-size: var(--space-80);
  --audio-like-btn-size: var(--space-36);
  --audio-transport-offset: -40px;
  --audio-scale: 1;

  /* 2.8 Tactile Background (Full-section / Hero Optical Glass Panel) */
  --bg-panel-min-h: 360px;
  --bg-panel-radius: var(--radius-lg);
  --bg-panel-pad: var(--space-32);
}

@media (max-width: 640px) {
  :root {
    --font-size-2xl: 28px;
    --line-height-2xl: 36px;
  }
}

/* ==========================================================================
   STANDALONE COMPONENT STRUCTURAL RULES (Tactile Glass UI)
   ========================================================================== */

.tactile-glass-fx {
  position: relative;
  display: inline-flex;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.tactile-btn {
  position: relative;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  color: var(--text-primary);
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
  font-family: var(--font-sans);
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;
  height: var(--btn-h);
  border-radius: var(--btn-radius);
  padding: 0 var(--btn-pad-h);
  gap: var(--space-12);
  -webkit-tap-highlight-color: transparent;
}

.tactile-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tactile-btn .btn-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  letter-spacing: var(--letter-spacing-tight);
  white-space: nowrap;
  transition: font-size 0.2s ease;
}

.tactile-btn .btn-icon {
  width: var(--icon-md);
  height: var(--icon-md);
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;
  flex-shrink: 0;
}

.tactile-btn:hover .btn-icon {
  transform: translateX(var(--space-2));
}

.tactile-btn.btn-circle {
  width: var(--btn-h);
  height: var(--btn-h);
  padding: 0;
  justify-content: center;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  background: transparent;
  aspect-ratio: 1 / 1;
}

.tactile-btn.btn-circle:hover .btn-icon {
  transform: scale(1.12);
}

.tactile-switch {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--switch-w);
  height: var(--switch-h);
  border-radius: calc(var(--switch-h) / 2);
  -webkit-tap-highlight-color: transparent;
}

.tactile-switch:focus-visible {
  outline: var(--space-2) solid var(--focus-ring-color);
  outline-offset: var(--space-2);
}

.tactile-switch:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tactile-switch .switch-thumb {
  position: absolute;
  border-radius: var(--radius-full);
  background: transparent;
  box-shadow: none;
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  top: var(--switch-pad);
  left: var(--switch-pad);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.tactile-switch.active .switch-thumb,
.tactile-switch[aria-checked="true"] .switch-thumb {
  transform: translateX(var(--switch-travel));
}

.tactile-tabs {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: var(--tabs-h);
  padding: var(--space-4);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  user-select: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.tactile-tabs .tabs-indicator {
  position: absolute;
  left: 0;
  top: var(--space-4);
  height: var(--tabs-item-h);
  border-radius: var(--radius-full);
  background: transparent;
  box-shadow: none;
  border: none;
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.tactile-tabs .tab-item {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-12);
  height: var(--tabs-item-h);
  padding: 0 var(--space-24);
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  outline: none;
  transition: color 0.15s ease;
  box-sizing: border-box;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.tactile-tabs .tab-item:hover,
.tactile-tabs .tab-item.active {
  color: var(--text-primary);
}

.tactile-tabs .tab-item:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  color: var(--text-muted);
}

.tactile-tabs .tab-item:focus-visible {
  outline: var(--space-2) solid var(--focus-ring-color);
  outline-offset: var(--space-2);
}

.tactile-prompt-box {
  position: relative;
  pointer-events: auto;
  width: min(100%, var(--prompt-box-w));
  border-radius: var(--prompt-box-radius);
  padding: var(--prompt-box-pad);
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  user-select: none;
}

.prompt-body {
  width: 100%;
}

.prompt-textarea {
  width: 100%;
  min-height: var(--prompt-textarea-min-h);
  max-height: var(--prompt-textarea-max-h);
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  caret-color: var(--text-primary);
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.prompt-textarea::placeholder {
  color: var(--text-muted);
}

.prompt-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
}

.prompt-pills-row {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
}

.prompt-mention-btn {
  width: var(--prompt-pill-h);
  height: var(--prompt-pill-h);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: none;
  outline: none;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.prompt-mention-btn:hover {
  background: var(--bg-elevated-hover);
  color: var(--text-primary);
}

.prompt-mention-btn:active {
  background: var(--bg-elevated-active);
  transform: scale(0.95);
}

.prompt-pill {
  height: var(--prompt-pill-h);
  padding: 0 var(--space-16);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.prompt-pill:hover {
  background: var(--bg-elevated-hover);
  color: var(--text-primary);
}

.prompt-pill:active {
  background: var(--bg-elevated-active);
  transform: scale(0.97);
}

.prompt-submit-btn {
  width: var(--prompt-submit-size);
  height: var(--prompt-submit-size);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
}

.prompt-submit-btn:hover {
  background: var(--bg-elevated-hover);
  transform: scale(1.04);
}

.prompt-submit-btn:active {
  background: var(--bg-elevated-active);
  transform: scale(0.94);
}

.prompt-submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.prompt-submit-icon {
  width: var(--icon-sm);
  height: var(--icon-sm);
  stroke: currentColor;
  stroke-width: 2.2;
  fill: none;
}

.tactile-heading-container {
  display: flex;
  flex-direction: column;
  max-width: var(--heading-max-w);
}

.tactile-heading-badge {
  margin-bottom: var(--space-16);
  display: inline-flex;
  align-items: center;
}

.display-heading,
.tactile-heading-title {
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-weight: var(--font-weight-extrabold);
  letter-spacing: var(--letter-spacing-display);
  line-height: var(--line-height-none);
  width: 100%;
  user-select: none;
  font-size: var(--font-size-display);
  text-wrap: balance;
  margin: 0;
}

.tactile-heading-subtitle {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--text-secondary);
  max-width: var(--subtitle-max-w);
  margin-top: var(--space-16);
}

.tactile-glass-word {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  line-height: inherit;
  border: none;
  background: transparent;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.tactile-card.tactile-credit-card {
  position: relative;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  pointer-events: auto;
  overflow: visible;
  aspect-ratio: 1.5857;
  width: min(100%, var(--card-w));
  height: auto;
  padding: var(--card-pad);
  border-radius: var(--card-radius);
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.credit-card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.credit-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.credit-card-contactless {
  width: var(--icon-lg);
  height: var(--icon-lg);
  color: var(--card-icon-muted);
  transition: color 0.2s ease;
}

.tactile-card:hover .credit-card-contactless {
  color: var(--card-text);
}

.credit-card-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.credit-card-bank-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-ultra);
  color: var(--card-text);
}

.credit-card-tier {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  color: var(--card-icon-muted);
  text-transform: uppercase;
  margin-top: var(--space-4);
}

.credit-card-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: var(--font-mono);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-widest);
  color: var(--card-text);
  margin: var(--space-8) 0;
  user-select: all;
}

.credit-card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.credit-card-field {
  display: flex;
  flex-direction: column;
}

.credit-card-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wider);
  color: var(--card-text);
  text-transform: uppercase;
}

.credit-card-network {
  display: flex;
  align-items: center;
  position: relative;
  width: var(--card-network-w);
  height: var(--card-network-circle-size);
}

.network-circle {
  width: var(--card-network-circle-size);
  height: var(--card-network-circle-size);
  border-radius: var(--radius-full);
  position: absolute;
  border: none;
  backdrop-filter: blur(var(--space-2));
}

.network-circle-left {
  left: 0;
  background: var(--card-network-left-bg);
}

.network-circle-right {
  right: 0;
  background: var(--card-network-right-bg);
  mix-blend-mode: screen;
}

.tactile-audio-player {
  position: relative;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  pointer-events: auto;
  overflow: visible;
  aspect-ratio: 480 / 304;
  width: min(100%, var(--audio-w));
  height: auto;
  padding: var(--audio-pad-top) var(--audio-pad-h) var(--audio-pad-bottom);
  border-radius: var(--audio-radius);
  transform-style: flat;
  transform: perspective(var(--perspective-3d)) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.tactile-audio-player .audio-spectrum-front {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.tactile-audio-player .audio-player-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.tactile-audio-player .audio-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-16);
  width: 100%;
}

.tactile-audio-player .audio-track-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-snug);
  color: var(--text-primary);
}

.tactile-audio-player .audio-like-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-like-btn-size);
  height: var(--audio-like-btn-size);
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.15s ease, transform 0.15s ease;
}

.tactile-audio-player .audio-like-btn:hover,
.tactile-audio-player .audio-like-btn[aria-pressed="true"] {
  color: var(--text-primary);
}

.tactile-audio-player .audio-like-btn:hover {
  transform: scale(1.08);
}

.tactile-audio-player .audio-like-btn:active {
  transform: scale(0.94);
}

.tactile-audio-player .audio-like-btn svg {
  width: var(--icon-md);
  height: var(--icon-md);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-audio-player .audio-timeline-group {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 100%;
  pointer-events: auto;
}

.tactile-audio-player .audio-progress-hit {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--space-4);
  padding: var(--space-8) 0;
  margin: calc(var(--space-8) * -1) 0;
  box-sizing: content-box;
  cursor: pointer;
  outline: none;
  pointer-events: auto;
  touch-action: none;
}

.tactile-audio-player .audio-progress-track {
  position: relative;
  width: 100%;
  height: var(--space-4);
  border-radius: var(--radius-full);
  background: var(--bg-elevated-hover);
  overflow: hidden;
  pointer-events: none;
}

.tactile-audio-player .audio-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: var(--radius-full);
  background: var(--text-primary);
  pointer-events: none;
}

.tactile-audio-player .audio-time-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--space-16);
  line-height: var(--line-height-tight);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  pointer-events: none;
}

.tactile-audio-player .audio-controls-dock {
  position: absolute;
  left: 50%;
  bottom: var(--audio-transport-offset);
  transform: translateX(-50%) scale(var(--audio-scale));
  transform-origin: 50% 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.tactile-audio-player .audio-transport-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-btn-sec-size);
  height: var(--audio-btn-sec-size);
  border-radius: var(--radius-full);
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
}

.tactile-audio-player .audio-transport-btn svg {
  width: var(--icon-md);
  height: var(--icon-md);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-audio-player .audio-play-btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-btn-play-size);
  height: var(--audio-btn-play-size);
  margin: 0 calc(var(--space-4) * -1);
  border-radius: var(--radius-full);
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
}

.tactile-audio-player .audio-play-btn svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-background {
  position: relative;
  width: 100%;
  min-height: var(--bg-panel-min-h);
  padding: var(--bg-panel-pad);
  border-radius: var(--bg-panel-radius);
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  pointer-events: auto;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
`,document.head.appendChild(e)}if(typeof document<"u"&&!document.getElementById("tactile-glass-ui-styles")){let e=document.createElement("style");e.id="tactile-glass-ui-styles",e.textContent=`:root {
  /* ==========================================================================
     LAYER 1: FOUNDATION PRIMITIVES
     ========================================================================== */

  /* 1.1 Spacing Scale (Strict 4px grid, with 2px micro-step for compact insets) */
  --space-2: 2px;
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-28: 28px;
  --space-32: 32px;
  --space-36: 36px;
  --space-40: 40px;
  --space-48: 48px;
  --space-56: 56px;
  --space-64: 64px;
  --space-80: 80px;
  --space-96: 96px;

  /* 1.2 Border Radii
     - sm (8px): Inline code tags
     - md (12px): Sidebar navigation items and icon boxes
     - lg (16px): Major containers (.stage-block, .settings-panel, .doc-code-box)
     - xl..3xl: Optical WebGL glass component hulls (Prompt, Card, Audio)
     - full (9999px): Capsule buttons, shell actions, reset buttons, badges, and pills */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 28px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* 1.3 Surfaces, Borders & Text Hierarchy (3-Tier Z-Axis Elevation: Canvas -> Surface -> Elevated)
     - bg-canvas (Z0): Root page and transparent WebGL stage backdrop
     - bg-surface / hover / active (Z1): Primary containers and controls sitting directly on canvas (inspector panels, code blocks, shell buttons, sidebar items, and mobile nav pills)
     - bg-elevated / hover / active (Z2): Nested elements sitting inside a surface (sidebar icon boxes, inspector Reset buttons, version badge, inline code tags, segmented state track, and prompt pills)
     - border-subtle: Delicate 1px structural outline for the stage block
     - text-primary / secondary / muted: 3-tier typographic contrast hierarchy */
  --bg-canvas: #141517;
  --bg-surface: rgba(27, 30, 33, 0.88);
  --bg-surface-hover: rgba(32, 36, 42, 0.92);
  --bg-surface-active: rgba(42, 47, 55, 0.96);
  --bg-elevated: rgba(255, 255, 255, 0.08);
  --bg-elevated-hover: rgba(255, 255, 255, 0.14);
  --bg-elevated-active: rgba(255, 255, 255, 0.20);
  --border-subtle: rgba(255, 255, 255, 0.04);

  --text-primary: #ffffff;
  --text-secondary: #9da0a6;
  --text-muted: #71757e;
  --focus-ring-color: rgba(255, 255, 255, 0.40);

  /* 1.4 Typography Scale
     - xs (11px): Badges, slider values, compact labels
     - sm (12px): Sidebar navigation, shell buttons, code snippets, timecodes, site footer
     - md (14px): Body descriptions (.stage-subtitle, .doc-section-desc), panel headers, brand title
     - base (16px): Primary interactive component labels (Button, Tabs, Prompt, Card brand)
     - lg (20px): Documentation section headings (H2) and audio track title
     - xl (24px): Embossed credit card number groups
     - 2xl (36px): Active component page heading (H1)
     - display: Fluid container-responsive hero typography (Tactile Heading) */
  --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'SF Pro', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 36px;
  --font-size-display: clamp(var(--space-32), 11.5cqw, var(--space-80));

  /* Font Weights
     - regular (400): Body copy, descriptions, inactive nav items, slider labels, code, card number, footer
     - medium (500): All headings (H1, H2, brand, panel headers), active nav item, shell action buttons, badges, tabs, prompt pills, slider values, footer author
     - semibold (600): Primary button CTA, audio track title & timecodes, card metadata
     - extrabold (800): Hero display typography (Tactile Heading) */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-extrabold: 800;

  /* Line Heights & Letter Spacing
     - line-height-none (1.0): Hero display typography (Tactile Heading & Hero Stage)
     - line-height-tight (16px): Compact numeric rows (.audio-time-row)
     - line-height-snug (24px): Monospace code blocks (.code-panel-pre)
     - line-height-relaxed (1.5): Body copy, subtitles, descriptions, and prompt textarea
     - line-height-2xl (44px): Active component page heading (.stage-title)
     - letter-spacing-tighter (-0.04em): Active component page heading (.stage-title)
     - letter-spacing-display (-0.025em): Hero display typography (Tactile Heading & Hero Stage)
     - letter-spacing-tight (-0.015em): Section headings (.doc-section-title) & primary button CTA (.btn-label)
     - letter-spacing-snug (-0.01em): Brand title, panel headers, and audio track title
     - letter-spacing-wide (0.04em): Segmented state pill labels (.state-btn)
     - letter-spacing-wider (0.08em): Credit card metadata values (.credit-card-value)
     - letter-spacing-widest (0.10em): Embossed credit card number (.credit-card-number)
     - letter-spacing-ultra (0.22em): Credit card bank wordmark (.credit-card-bank-name) */
  --line-height-none: 1.0;
  --line-height-tight: var(--space-16);
  --line-height-snug: var(--space-24);
  --line-height-relaxed: 1.5;
  --line-height-2xl: 44px;
  --letter-spacing-tighter: -0.04em;
  --letter-spacing-display: -0.025em;
  --letter-spacing-tight: -0.015em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-wide: 0.04em;
  --letter-spacing-wider: 0.08em;
  --letter-spacing-widest: 0.10em;
  --letter-spacing-ultra: 0.22em;

  /* 1.5 Iconography (Strict 4px grid) */
  --icon-sm: var(--space-16);
  --icon-md: var(--space-20);
  --icon-lg: var(--space-24);

  /* ==========================================================================
     LAYER 2: SEMANTIC SHELL & COMPONENT TOKENS
     ========================================================================== */

  /* 2.1 Shell Layout & Controls
     - control-h-sm (32px): Icon-only copy buttons inside code blocks
     - control-h-md (40px): Shell action buttons (Copy Prompt, SKILL.md, GitHub), Reset buttons, and mobile nav pills */
  --sidebar-nav-w: 220px;
  --sidebar-settings-w: 304px;
  --inspector-label-w: 88px;
  --inspector-value-w: var(--space-36);
  --heading-max-w: 920px;
  --subtitle-max-w: 680px;
  --perspective-3d: 1000px;
  --control-h-sm: var(--space-32);
  --control-h-md: var(--space-40);

  /* 2.2 Tactile Button (Unified 56px height) */
  --btn-h: var(--space-56);
  --btn-radius: var(--radius-2xl);
  --btn-pad-h: var(--space-32);

  /* 2.3 Tactile Switch (Unified 104x56px hull + molded 48px optical glass thumb dome) */
  --switch-w: 104px;
  --switch-h: var(--space-56);
  --switch-pad: var(--space-4);
  --switch-thumb-size: var(--space-48);
  --switch-travel: var(--space-48);

  /* 2.4 Tactile Tabs (Unified 56px hull + molded 48px optical glass capsule indicator) */
  --tabs-h: var(--space-56);
  --tabs-item-h: var(--space-48);

  /* 2.5 Tactile Prompt Input */
  --prompt-box-w: 580px;
  --prompt-box-radius: var(--radius-xl);
  --prompt-box-pad: var(--space-20);
  --prompt-pill-h: var(--space-40);
  --prompt-submit-size: var(--space-40);
  --prompt-textarea-min-h: var(--space-48);
  --prompt-textarea-max-h: 160px;

  /* 2.6 Tactile Credit Card (ISO/IEC 7810 ID-1 ratio ~1.586) */
  --card-w: 444px;
  --card-radius: var(--radius-xl);
  --card-pad: var(--space-24);
  --card-network-w: var(--space-48);
  --card-network-circle-size: var(--space-32);
  --card-icon-muted: rgba(255, 255, 255, 0.55);
  --card-text: rgba(255, 255, 255, 0.92);
  --card-network-left-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 100%);
  --card-network-right-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%);

  /* 2.7 Tactile Spatial Audio Player (480x304px) */
  --audio-w: 480px;
  --audio-radius: var(--radius-3xl);
  --audio-pad-top: var(--space-28);
  --audio-pad-h: var(--space-32);
  --audio-pad-bottom: var(--space-48);
  --audio-btn-sec-size: var(--space-56);
  --audio-btn-play-size: var(--space-80);
  --audio-like-btn-size: var(--space-36);
  --audio-transport-offset: -40px;
  --audio-scale: 1;

  /* 2.8 Tactile Background (Full-section / Hero Optical Glass Panel) */
  --bg-panel-min-h: 360px;
  --bg-panel-radius: var(--radius-lg);
  --bg-panel-pad: var(--space-32);
}

@media (max-width: 640px) {
  :root {
    --font-size-2xl: 28px;
    --line-height-2xl: 36px;
  }
}

/* ==========================================================================
   STANDALONE COMPONENT STRUCTURAL RULES (Tactile Glass UI)
   ========================================================================== */

.tactile-glass-fx {
  position: relative;
  display: inline-flex;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.tactile-btn {
  position: relative;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  color: var(--text-primary);
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
  font-family: var(--font-sans);
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;
  height: var(--btn-h);
  border-radius: var(--btn-radius);
  padding: 0 var(--btn-pad-h);
  gap: var(--space-12);
  -webkit-tap-highlight-color: transparent;
}

.tactile-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tactile-btn .btn-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  letter-spacing: var(--letter-spacing-tight);
  white-space: nowrap;
  transition: font-size 0.2s ease;
}

.tactile-btn .btn-icon {
  width: var(--icon-md);
  height: var(--icon-md);
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;
  flex-shrink: 0;
}

.tactile-btn:hover .btn-icon {
  transform: translateX(var(--space-2));
}

.tactile-btn.btn-circle {
  width: var(--btn-h);
  height: var(--btn-h);
  padding: 0;
  justify-content: center;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  background: transparent;
  aspect-ratio: 1 / 1;
}

.tactile-btn.btn-circle:hover .btn-icon {
  transform: scale(1.12);
}

.tactile-switch {
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--switch-w);
  height: var(--switch-h);
  border-radius: calc(var(--switch-h) / 2);
  -webkit-tap-highlight-color: transparent;
}

.tactile-switch:focus-visible {
  outline: var(--space-2) solid var(--focus-ring-color);
  outline-offset: var(--space-2);
}

.tactile-switch:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tactile-switch .switch-thumb {
  position: absolute;
  border-radius: var(--radius-full);
  background: transparent;
  box-shadow: none;
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  top: var(--switch-pad);
  left: var(--switch-pad);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.tactile-switch.active .switch-thumb,
.tactile-switch[aria-checked="true"] .switch-thumb {
  transform: translateX(var(--switch-travel));
}

.tactile-tabs {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: var(--tabs-h);
  padding: var(--space-4);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  user-select: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.tactile-tabs .tabs-indicator {
  position: absolute;
  left: 0;
  top: var(--space-4);
  height: var(--tabs-item-h);
  border-radius: var(--radius-full);
  background: transparent;
  box-shadow: none;
  border: none;
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.tactile-tabs .tab-item {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-12);
  height: var(--tabs-item-h);
  padding: 0 var(--space-24);
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  outline: none;
  transition: color 0.15s ease;
  box-sizing: border-box;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.tactile-tabs .tab-item:hover,
.tactile-tabs .tab-item.active {
  color: var(--text-primary);
}

.tactile-tabs .tab-item:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  color: var(--text-muted);
}

.tactile-tabs .tab-item:focus-visible {
  outline: var(--space-2) solid var(--focus-ring-color);
  outline-offset: var(--space-2);
}

.tactile-prompt-box {
  position: relative;
  pointer-events: auto;
  width: min(100%, var(--prompt-box-w));
  border-radius: var(--prompt-box-radius);
  padding: var(--prompt-box-pad);
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  user-select: none;
}

.prompt-body {
  width: 100%;
}

.prompt-textarea {
  width: 100%;
  min-height: var(--prompt-textarea-min-h);
  max-height: var(--prompt-textarea-max-h);
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  caret-color: var(--text-primary);
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.prompt-textarea::placeholder {
  color: var(--text-muted);
}

.prompt-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
}

.prompt-pills-row {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
}

.prompt-mention-btn {
  width: var(--prompt-pill-h);
  height: var(--prompt-pill-h);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: none;
  outline: none;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.prompt-mention-btn:hover {
  background: var(--bg-elevated-hover);
  color: var(--text-primary);
}

.prompt-mention-btn:active {
  background: var(--bg-elevated-active);
  transform: scale(0.95);
}

.prompt-pill {
  height: var(--prompt-pill-h);
  padding: 0 var(--space-16);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.prompt-pill:hover {
  background: var(--bg-elevated-hover);
  color: var(--text-primary);
}

.prompt-pill:active {
  background: var(--bg-elevated-active);
  transform: scale(0.97);
}

.prompt-submit-btn {
  width: var(--prompt-submit-size);
  height: var(--prompt-submit-size);
  border-radius: var(--radius-full);
  background: var(--bg-elevated);
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, opacity 0.2s ease;
}

.prompt-submit-btn:hover {
  background: var(--bg-elevated-hover);
  transform: scale(1.04);
}

.prompt-submit-btn:active {
  background: var(--bg-elevated-active);
  transform: scale(0.94);
}

.prompt-submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.prompt-submit-icon {
  width: var(--icon-sm);
  height: var(--icon-sm);
  stroke: currentColor;
  stroke-width: 2.2;
  fill: none;
}

.tactile-heading-container {
  display: flex;
  flex-direction: column;
  max-width: var(--heading-max-w);
}

.tactile-heading-badge {
  margin-bottom: var(--space-16);
  display: inline-flex;
  align-items: center;
}

.display-heading,
.tactile-heading-title {
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-weight: var(--font-weight-extrabold);
  letter-spacing: var(--letter-spacing-display);
  line-height: var(--line-height-none);
  width: 100%;
  user-select: none;
  font-size: var(--font-size-display);
  text-wrap: balance;
  margin: 0;
}

.tactile-heading-subtitle {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--text-secondary);
  max-width: var(--subtitle-max-w);
  margin-top: var(--space-16);
}

.tactile-glass-word {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  line-height: inherit;
  border: none;
  background: transparent;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.tactile-card.tactile-credit-card {
  position: relative;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  pointer-events: auto;
  overflow: visible;
  aspect-ratio: 1.5857;
  width: min(100%, var(--card-w));
  height: auto;
  padding: var(--card-pad);
  border-radius: var(--card-radius);
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.credit-card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.credit-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.credit-card-contactless {
  width: var(--icon-lg);
  height: var(--icon-lg);
  color: var(--card-icon-muted);
  transition: color 0.2s ease;
}

.tactile-card:hover .credit-card-contactless {
  color: var(--card-text);
}

.credit-card-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.credit-card-bank-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-ultra);
  color: var(--card-text);
}

.credit-card-tier {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wider);
  color: var(--card-icon-muted);
  text-transform: uppercase;
  margin-top: var(--space-4);
}

.credit-card-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: var(--font-mono);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-widest);
  color: var(--card-text);
  margin: var(--space-8) 0;
  user-select: all;
}

.credit-card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.credit-card-field {
  display: flex;
  flex-direction: column;
}

.credit-card-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wider);
  color: var(--card-text);
  text-transform: uppercase;
}

.credit-card-network {
  display: flex;
  align-items: center;
  position: relative;
  width: var(--card-network-w);
  height: var(--card-network-circle-size);
}

.network-circle {
  width: var(--card-network-circle-size);
  height: var(--card-network-circle-size);
  border-radius: var(--radius-full);
  position: absolute;
  border: none;
  backdrop-filter: blur(var(--space-2));
}

.network-circle-left {
  left: 0;
  background: var(--card-network-left-bg);
}

.network-circle-right {
  right: 0;
  background: var(--card-network-right-bg);
  mix-blend-mode: screen;
}

.tactile-audio-player {
  position: relative;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  pointer-events: auto;
  overflow: visible;
  aspect-ratio: 480 / 304;
  width: min(100%, var(--audio-w));
  height: auto;
  padding: var(--audio-pad-top) var(--audio-pad-h) var(--audio-pad-bottom);
  border-radius: var(--audio-radius);
  transform-style: flat;
  transform: perspective(var(--perspective-3d)) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.tactile-audio-player .audio-spectrum-front {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.tactile-audio-player .audio-player-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.tactile-audio-player .audio-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-16);
  width: 100%;
}

.tactile-audio-player .audio-track-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-snug);
  color: var(--text-primary);
}

.tactile-audio-player .audio-like-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-like-btn-size);
  height: var(--audio-like-btn-size);
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.15s ease, transform 0.15s ease;
}

.tactile-audio-player .audio-like-btn:hover,
.tactile-audio-player .audio-like-btn[aria-pressed="true"] {
  color: var(--text-primary);
}

.tactile-audio-player .audio-like-btn:hover {
  transform: scale(1.08);
}

.tactile-audio-player .audio-like-btn:active {
  transform: scale(0.94);
}

.tactile-audio-player .audio-like-btn svg {
  width: var(--icon-md);
  height: var(--icon-md);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-audio-player .audio-timeline-group {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 100%;
  pointer-events: auto;
}

.tactile-audio-player .audio-progress-hit {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--space-4);
  padding: var(--space-8) 0;
  margin: calc(var(--space-8) * -1) 0;
  box-sizing: content-box;
  cursor: pointer;
  outline: none;
  pointer-events: auto;
  touch-action: none;
}

.tactile-audio-player .audio-progress-track {
  position: relative;
  width: 100%;
  height: var(--space-4);
  border-radius: var(--radius-full);
  background: var(--bg-elevated-hover);
  overflow: hidden;
  pointer-events: none;
}

.tactile-audio-player .audio-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: var(--radius-full);
  background: var(--text-primary);
  pointer-events: none;
}

.tactile-audio-player .audio-time-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--space-16);
  line-height: var(--line-height-tight);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  pointer-events: none;
}

.tactile-audio-player .audio-controls-dock {
  position: absolute;
  left: 50%;
  bottom: var(--audio-transport-offset);
  transform: translateX(-50%) scale(var(--audio-scale));
  transform-origin: 50% 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.tactile-audio-player .audio-transport-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-btn-sec-size);
  height: var(--audio-btn-sec-size);
  border-radius: var(--radius-full);
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
}

.tactile-audio-player .audio-transport-btn svg {
  width: var(--icon-md);
  height: var(--icon-md);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-audio-player .audio-play-btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--audio-btn-play-size);
  height: var(--audio-btn-play-size);
  margin: 0 calc(var(--space-4) * -1);
  border-radius: var(--radius-full);
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
}

.tactile-audio-player .audio-play-btn svg {
  width: var(--icon-lg);
  height: var(--icon-lg);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
}

.tactile-background {
  position: relative;
  width: 100%;
  min-height: var(--bg-panel-min-h);
  padding: var(--bg-panel-pad);
  border-radius: var(--bg-panel-radius);
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  pointer-events: auto;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
`,document.head.appendChild(e)}var Ef=Object.defineProperty,_f=(e,t,n)=>t in e?Ef(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,U=(e,t,n)=>_f(e,typeof t!="symbol"?t+"":t,n),Te={refraction:4,thickness:8,bevelWidth:2,frost:2,dispersion:88,sheen:12,lightAngle:24,darkness:0,rim:16,fluidBright:36,fluidSpeed:80,fluidScale:24,fluidAuraWidth:8,fluidCenter:32,auroraFlow:100,hoverBright:264,lightTrack:100,clickWave:100},Pe={refraction:2,thickness:8,bevelWidth:2,frost:16,dispersion:80,sheen:40,lightAngle:24,darkness:0,rim:48,fluidBright:48,fluidSpeed:80,fluidScale:16,fluidAuraWidth:12,fluidCenter:0,auroraFlow:0,hoverBright:256,lightTrack:100,clickWave:96},Fe={refraction:72,thickness:16,bevelWidth:4,frost:80,dispersion:0,sheen:16,lightAngle:24,darkness:24,rim:40,fluidBright:32,fluidSpeed:0,fluidScale:4,fluidAuraWidth:32,fluidCenter:96,auroraFlow:0,hoverBright:144,lightTrack:100,clickWave:96},Me={refraction:2,thickness:8,bevelWidth:2,frost:8,dispersion:80,sheen:24,lightAngle:24,darkness:0,rim:48,fluidBright:40,fluidSpeed:80,fluidScale:8,fluidAuraWidth:12,fluidCenter:0,auroraFlow:64,hoverBright:256,lightTrack:100,clickWave:96};var Ae={refraction:88,thickness:72,bevelWidth:3,frost:4,dispersion:96,sheen:12,lightAngle:24,darkness:0,rim:16,fluidBright:24,fluidSpeed:64,fluidScale:16,fluidAuraWidth:16,fluidCenter:0,auroraFlow:100,hoverBright:200,lightTrack:100,clickWave:96},Le={refraction:80,thickness:48,bevelWidth:2,frost:40,dispersion:80,sheen:24,lightAngle:24,angle:24,darkness:0,rim:16,fluidBright:80,fluidSpeed:80,fluidScale:8,fluidAuraWidth:2,fluidCenter:8,auroraFlow:0,hoverBright:96,lightTrack:100,clickWave:96};var Re={refraction:80,thickness:88,bevelWidth:0,frost:0,dispersion:96,sheen:0,lightAngle:0,angle:0,darkness:0,rim:0,fluidBright:12,fluidSpeed:40,fluidScale:48,fluidAuraWidth:64,fluidCenter:12,auroraFlow:100,hoverBright:128,lightTrack:100,clickWave:56},Pf=`#version 300 es
  in vec2 a_pos;
  out vec2 v_uv;
  void main() {
    v_uv = (a_pos + 1.0) * 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`,Mf=`#version 300 es
  precision highp float;
  in vec2 v_uv;
  out vec4 fragColor;

  uniform vec2 u_resolution;
  uniform sampler2D u_src;
  uniform float u_srcComposite;
  uniform sampler2D u_textMask;
  uniform float u_isText;
  uniform float u_isAudioDeck;
  uniform vec4 u_switchThumb;
  uniform vec4 u_rect;
  uniform float u_radius;
  uniform float u_useBackdrop;
  uniform vec4 u_tilt;
  uniform vec3 u_bgColor;

  // Glass optic parameters
  uniform float u_refraction;
  uniform float u_thickness;
  uniform float u_bevelWidth;
  uniform float u_frost;
  uniform float u_dispersion;
  uniform float u_sheen;
  uniform float u_lightAngle;
  uniform float u_darkness;
  uniform float u_rim;
  uniform float u_time;

  // Fluid caustic uniforms
  uniform float u_fluidBright;
  uniform float u_fluidSpeed;
  uniform float u_fluidScale;
  uniform float u_fluidAuraWidth;
  uniform float u_fluidCenter;
  uniform float u_auroraFlow;

  // Interactivity uniforms
  uniform vec2 u_mousePos;
  uniform float u_hoverStrength;
  uniform float u_lightTrack;
  uniform float u_hoverBright;
  uniform vec2 u_clickPos;
  uniform float u_clickTime;
  uniform float u_clickWave;


  float smax(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return max(a, b) + h * h * k * 0.25;
  }

  float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
  }

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    vec2 u = max(-q, 0.0);
    float inner = -(u.x * u.y) / max(length(u), 1e-4);
    return inner + length(max(q, 0.0)) - r;
  }

  float opSmoothUnion(float d1, float d2, float k) {
    vec2 u = max(vec2(k - d1, k - d2), vec2(0.0));
    return max(k, min(d1, d2)) - length(u);
  }

  float sdAudioDeck(vec2 p, vec2 b, float r) {
    float s = b.x / 240.0;
    float dCard = sdRoundRect(p, b, r);
    float dPlay = length(p - vec2(0.0, -b.y)) - 40.0 * s;
    float dPrev = length(p - vec2(-64.0 * s, -b.y)) - 28.0 * s;
    float dNext = length(p - vec2(64.0 * s, -b.y)) - 28.0 * s;
    float dBridge = length(p - vec2(clamp(p.x, -64.0 * s, 64.0 * s), -b.y)) - 9.0 * s;
    float dBtns = opSmoothUnion(opSmoothUnion(dPlay, min(dPrev, dNext), 2.0 * s), dBridge, 2.0 * s);
    return opSmoothUnion(dCard, dBtns, 2.0 * s);
  }

  float evalLensSDF(vec2 p, vec2 b, float r) {
    if (u_isAudioDeck > 0.5) {
      return sdAudioDeck(p, b, r);
    }
    return sdRoundRect(p, b, r);
  }

  // Domain-Warped Silky Fluid Caustic Field (Deep S-curls, soft rounded crests, zero straight sticks or grid tears)
  float getCausticWave(vec2 p, float t, float frostAmt, float dispOffset) {
    p *= 0.95;

    // 1. Primary S-curve vortex warp (tight enough to curve visibly inside edge auras)
    float w1 = sin(p.x * 1.85 + p.y * 0.55 + t * 0.62) * 0.62 +
               cos(p.y * 1.95 - p.x * 0.65 - t * 0.48) * 0.58;
    vec2 pWarp = p + vec2(
      cos(w1 * 2.25 + p.y * 1.15 + t * 0.45),
      sin(w1 * 2.25 - p.x * 1.15 - t * 0.35)
    ) * 0.56;

    // 2. Secondary swirl modulation so waves bend into flowing S-ribbons instead of straight sticks or square grids
    float swirl = sin(pWarp.y * 1.75 - pWarp.x * 1.25 + t * 0.52) * 0.75;
    float w2 = sin(pWarp.x * 2.05 + pWarp.y * 1.35 - t * 0.58 + swirl) * 0.58 +
               cos(pWarp.y * 2.30 - pWarp.x * 0.95 + t * 0.50 - swirl * 0.6) * 0.42;

    float w2_disp = w2 + dispOffset;
    // Intrinsic optical softness (0.022) eliminates hard laser "sticks" and prevents razor tears on refracted text
    float wAbs = sqrt(w2_disp * w2_disp + 0.022 + frostAmt * frostAmt * 0.045);
    float width = 0.11 + frostAmt * 0.16;
    float ridge = width / (pow(wAbs, 1.50) + width);
    float halo = exp(-wAbs * 1.65) * 0.50;
    return ridge * 0.68 + halo;
  }

  // Interactively warps fluid coordinate field based on cursor presence and click splash
  vec2 warpFluid(vec2 p, vec2 pSurf, vec2 mouseNorm, float hoverAmt, vec2 clickNorm, float clickDt, float clickAmt) {
    // 1. Smooth fingertip displacement: zero displacement at exact touch point, smooth outward swell
    if (hoverAmt > 0.001) {
      vec2 dMouse = pSurf - mouseNorm;
      float rMouse = length(dMouse);
      float radius = 0.90;
      float mouseInf = smoothstep(radius, 0.0, rMouse);
      
      vec2 push = dMouse * (mouseInf * 0.70);
      vec2 swirl = vec2(-dMouse.y, dMouse.x) * (mouseInf * 0.45);
      
      p += (push + swirl) * hoverAmt;
    }
    
    // 2. Click impulse: physical liquid undulation / splash wave expanding from tap point
    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {
      vec2 dClick = pSurf - clickNorm;
      float rClick = length(dClick);
      float waveSpeed = 2.8;
      float waveFront = clickDt * waveSpeed;
      float waveWidth = 0.35 + clickDt * 0.30;
      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));
      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);
      
      vec2 waveDir = rClick > 1e-4 ? dClick / rClick : vec2(0.0);
      float splashDisplacement = ring * sin((rClick - waveFront) * 7.5) * decay * (clickAmt * 0.50);
      p += waveDir * splashDisplacement;
    }
    
    return p;
  }

  float getFluidExcitation(vec2 pSurf, vec2 mouseNorm, float hoverAmt, float hoverBright, vec2 clickNorm, float clickDt, float clickAmt) {
    float glow = 0.0;
    float brightScale = hoverBright * 0.01;
    
    // Faint bioluminescent / caustic awakening directly under the finger
    if (hoverAmt > 0.001) {
      float rMouse = length(pSurf - mouseNorm);
      float mouseInf = smoothstep(0.85, 0.0, rMouse);
      glow += mouseInf * hoverAmt * (brightScale * 0.45);
    }
    
    // Fluid splash glow expanding with the liquid wave
    if (clickAmt > 0.001 && clickDt >= 0.0 && clickDt < 0.90) {
      float rClick = length(pSurf - clickNorm);
      float waveFront = clickDt * 2.8;
      float waveWidth = 0.35 + clickDt * 0.30;
      float ring = smoothstep(waveWidth, 0.0, abs(rClick - waveFront));
      float decay = (1.0 - clickDt / 0.90) * exp(-clickDt * 2.2);
      glow += ring * decay * clickAmt * (brightScale * 0.70);
    }
    
    return glow;
  }

  vec4 sampleBackdropRGBA(vec2 uv) {
    if (u_srcComposite < -0.5) {
      return vec4(0.0);
    }
    vec2 uvSafe = 1.0 - abs(1.0 - abs(uv));
    if (u_srcComposite > 1.5) {
      vec4 s = texture(u_src, vec2(uvSafe.x, 1.0 - uvSafe.y));
      return vec4(s.rgb * s.a, s.a);
    }
    if (u_srcComposite > 0.5) {
      vec4 s = texture(u_src, uvSafe);
      return vec4(s.rgb + u_bgColor * (1.0 - s.a), 1.0);
    }
    vec2 uvTex = vec2(uvSafe.x, 1.0 - uvSafe.y);
    return vec4(mix(u_bgColor, vec3(1.0), texture(u_src, uvTex).a), 1.0);
  }

  vec4 sampleFrostedRGBA(vec2 uv, float frostAmt) {
    if (u_srcComposite < -0.5) {
      return vec4(0.0);
    }
    vec4 centerCol = sampleBackdropRGBA(uv);
    if (frostAmt <= 0.01) return centerCol;

    // Real GPU Frosted Glass Diffusion (Golden-Angle Fermat Spiral Blur)
    vec2 texel = 1.0 / u_resolution;
    float radius = frostAmt * 40.0;
    
    vec4 accumCol = centerCol * 0.20;
    float totalW = 0.20;

    for (int i = 1; i <= 10; i++) {
      float fi = float(i);
      float r = sqrt(fi / 10.0) * radius;
      float theta = fi * 2.3999632;
      vec2 offset = vec2(cos(theta), sin(theta)) * r * texel;
      
      float w = exp(-0.5 * (r * r) / max(radius * radius * 0.4, 1.0));
      accumCol += sampleBackdropRGBA(uv + offset) * w;
      totalW += w;
    }

    return accumCol / totalW;
  }

  vec4 renderSingleGlassLens(vec2 screenPx, vec4 rect, float radius, bool isThumb, out float outBaseAlpha) {
    outBaseAlpha = 1.0;
    vec2 center = rect.xy + rect.zw * 0.5;
    vec2 localPx = screenPx - center;
    vec2 halfSize = rect.zw * 0.5;

    // Interactive 3D Perspective Raycast projection for tilted surfaces
    if (!isThumb && u_tilt.w > 0.5) {
      float d = u_tilt.w;
      float rx = u_tilt.x;
      float ry = u_tilt.y;
      float sc = max(u_tilt.z, 0.001);

      float cosX = cos(rx), sinX = sin(rx);
      float cosY = cos(ry), sinY = sin(ry);

      // Plane normal in CSS 3D camera coordinates (Rotate around Y then around X)
      vec3 N = vec3(sinY, -cosY * sinX, cosY * cosX);

      // WebGL localPx has Y up, CSS 3D camera has Y down
      vec3 V = vec3(localPx.x, -localPx.y, -d);
      float denom = dot(V, N);
      if (abs(denom) > 1e-5) {
        float tHit = (-d * N.z) / denom;
        vec3 P = vec3(tHit * V.x, tHit * V.y, d * (1.0 - tHit));

        // Inverse RotateX (by -rx)
        vec3 P1 = vec3(P.x, P.y * cosX + P.z * sinX, -P.y * sinX + P.z * cosX);
        // Inverse RotateY (by -ry)
        vec3 P0 = vec3(P1.x * cosY - P1.z * sinY, P1.y, P1.x * sinY + P1.z * cosY);

        // Scale and convert back to WebGL localPx (Y up)
        localPx = vec2(P0.x, -P0.y) / sc;
      }
    }

    float coverage = 0.0;
    vec2 norm = vec2(0.0);
    float distIn = 0.0;

    if (u_isText > 0.5) {
      vec2 textUV = (screenPx - rect.xy) / rect.zw;
      if (textUV.x < 0.0 || textUV.x > 1.0 || textUV.y < 0.0 || textUV.y > 1.0) {
        return vec4(0.0);
      }
      vec2 maskUV = vec2(textUV.x, 1.0 - textUV.y);
      vec4 tData = texture(u_textMask, maskUV);
      coverage = tData.a;
      if (coverage <= 0.005) return vec4(0.0);

      distIn = tData.r * 32.0;

      // 32-bit floating point continuous normal from GPU hardware bilinear central difference
      vec2 texel = 1.0 / rect.zw;
      vec2 step = texel * 1.5;
      float d_r  = texture(u_textMask, maskUV + vec2(step.x, 0.0)).r;
      float d_l  = texture(u_textMask, maskUV - vec2(step.x, 0.0)).r;
      float d_t  = texture(u_textMask, maskUV + vec2(0.0, step.y)).r;
      float d_b  = texture(u_textMask, maskUV - vec2(0.0, step.y)).r;
      float d_tr = texture(u_textMask, maskUV + vec2(step.x, step.y)).r;
      float d_tl = texture(u_textMask, maskUV + vec2(-step.x, step.y)).r;
      float d_br = texture(u_textMask, maskUV + vec2(step.x, -step.y)).r;
      float d_bl = texture(u_textMask, maskUV + vec2(-step.x, -step.y)).r;

      float dx = -( (d_tr + 2.0 * d_r + d_br) - (d_tl + 2.0 * d_l + d_bl) );
      float dy = -( (d_tr + 2.0 * d_t + d_tl) - (d_br + 2.0 * d_b + d_bl) );

      norm = vec2(dx, dy);
      float nLen = length(norm);
      if (nLen > 1e-4) norm /= nLen;
      else norm = vec2(0.0);

      // Smooth 3D dome profile: 2D normal tilt smoothly decays to 0 at the top of the bevel/apex,
      // completely eliminating medial axis crease lines, harsh step cliffs, and rectangular offset cutouts!
      float bVal = max(u_bevelWidth, 0.5);
      float strokeRad = max(bVal * 1.2, 4.0);
      float domeTilt = cos(clamp(distIn / strokeRad, 0.0, 1.0) * 1.5707963);
      norm *= domeTilt;
    } else if (isThumb) {
      float sdf = length(localPx) - radius;
      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);
      if (coverage <= 0.0) return vec4(0.0);
      float rLen = length(localPx);
      norm = rLen > 1e-4 ? localPx / rLen : vec2(0.0, 1.0);
      distIn = -sdf;
    } else {
      float effRad = min(radius, min(halfSize.x, halfSize.y));
      float sdf = evalLensSDF(localPx, halfSize, effRad);
      coverage = 1.0 - smoothstep(-0.75, 0.75, sdf);
      if (coverage <= 0.0) return vec4(0.0);

      // Analytical Normal from smooth SDF for outer border & bevel
      float eps = 1.0;
      float dx = evalLensSDF(localPx + vec2(eps, 0.0), halfSize, effRad) -
                 evalLensSDF(localPx - vec2(eps, 0.0), halfSize, effRad);
      float dy = evalLensSDF(localPx + vec2(0.0, eps), halfSize, effRad) -
                 evalLensSDF(localPx - vec2(0.0, eps), halfSize, effRad);
      float gLen = length(vec2(dx, dy));
      norm = gLen > 1e-4 ? vec2(dx, dy) / gLen : vec2(0.0);

      distIn = -sdf;
    }

    bool isFullBleed = (!isThumb && u_isText < 0.5 && radius <= 0.01 && u_bevelWidth <= 0.01);
    if (isFullBleed) {
      coverage = 1.0;
    }

    // 1. Edge Bevel Refraction strictly on perimeter (distIn < bWidthVal)
    float bWidthVal = max(u_bevelWidth, 0.5);
    float bevelSlope = 0.0;
    if (u_bevelWidth > 0.01 && distIn < bWidthVal) {
      float t = distIn / bWidthVal;
      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.15) * clamp(u_bevelWidth, 0.0, 1.0);
    }
    float edgeTaper = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);
    float thicknessScale = 0.35 + (u_thickness * 0.01) * 1.3;
    float bevelRefr = (u_refraction * 0.001) * thicknessScale;
    vec2 dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);
    if (u_isText > 0.5) {
      float bRad = max(u_bevelWidth * 1.2, 4.0);
      float t = clamp(distIn / bRad, 0.0, 1.0);
      bevelSlope = (1.0 - t) / max(sqrt(max(1.0 - (1.0 - t) * (1.0 - t), 0.001)), 0.2) * clamp(u_bevelWidth * 0.4 + 0.6, 0.0, 1.5);
      dispBevel = norm * (bevelSlope * 0.85 * bevelRefr);
    } else if (u_isAudioDeck > 0.5) {
      // Subtle molded-glass refraction along the outer Boolean union arc of the transport buttons
      float s = halfSize.x / 240.0;
      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);
      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);
      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);
      float dPlay = length(pPlay) - 40.0 * s;
      float dPrev = length(pPrev) - 28.0 * s;
      float dNext = length(pNext) - 28.0 * s;
      float dSec = min(dPrev, dNext);
      vec2 nPlay = length(pPlay) > 1e-4 ? pPlay / length(pPlay) : vec2(0.0, 1.0);
      vec2 nSec = dPrev < dNext
        ? (length(pPrev) > 1e-4 ? pPrev / length(pPrev) : vec2(0.0, 1.0))
        : (length(pNext) > 1e-4 ? pNext / length(pNext) : vec2(0.0, 1.0));
      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);
      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;
      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;
      float playEdge = smoothstep(-1.0 * s, 1.0 * s, -dPlay) * exp(-max(-dPlay, 0.0) / (3.2 * s)) * playMask;
      float secEdge = smoothstep(-1.0 * s, 1.0 * s, -dSec) * exp(-max(-dSec, 0.0) / (2.8 * s)) * secMask;
      dispBevel += (nPlay * playEdge * 0.45 + nSec * secEdge * 0.35) * bevelRefr;
    } else if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5) {
      vec2 pThumb = localPx - u_switchThumb.xy;
      vec2 halfThumb = u_switchThumb.zw;
      float capRad = min(halfThumb.x, halfThumb.y);
      float segHalf = max(halfThumb.x - capRad, 0.0);
      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);
      float dThumb = length(qExact) - capRad;
      if (dThumb < 2.0) {
        vec2 pNorm = qExact / max(capRad, 1.0);
        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);
        float thumbTaper = smoothstep(-0.75, 0.75, -dThumb);
        float thumbBevel = pow(r2, mix(2.0, 0.8, clamp(u_bevelWidth / 15.0, 0.0, 1.0)));
        dispBevel += pNorm * (thumbBevel * 0.65 * bevelRefr * thumbTaper);
      }
    }
    float contourFactor = (1.0 - smoothstep(0.0, bWidthVal * 1.25, distIn)) * clamp(u_bevelWidth, 0.0, 1.0);

    // 2. Liquid Surface & Dome Refraction across element body (100% continuous, zero creases, zero ovals)
    float btnHeight = max(halfSize.y * 2.0, 1.0);
    float frostVal = u_frost * 0.01;
    float fluidT = u_time * (u_fluidSpeed * 0.01);
    float fluidSc = 0.40 + u_fluidScale * 0.04;

    vec2 localMouse = isThumb ? (u_mousePos - u_switchThumb.xy) : u_mousePos;
    vec2 localClick = isThumb ? (u_clickPos - u_switchThumb.xy) : u_clickPos;
    vec2 pPhys = (localPx / btnHeight) * 1.15;
    vec2 mouseNorm = (localMouse / btnHeight) * 1.15;
    vec2 clickNorm = (localClick / btnHeight) * 1.15;
    float fluidPull = u_hoverStrength * (u_lightTrack * 0.01);
    float hoverGlow = u_hoverStrength;
    float clickAmt = u_clickWave * 0.01;
    float clickDt = u_time - u_clickTime;

    // Physical surface coordinate on the button (unrefracted by glass)
    vec2 pSurf = (localPx / btnHeight) * fluidSc;
    vec2 pSurf_warped = warpFluid(pSurf, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);

    // Dynamic 2D isotropic fluid gradient refraction: wave crests naturally refract light in 2D
    float epsF = 0.04;
    float gradFrost = max(frostVal, 0.28);
    float fDx = getCausticWave(pSurf_warped + vec2(epsF, 0.0), fluidT, gradFrost, 0.0) -
                getCausticWave(pSurf_warped - vec2(epsF, 0.0), fluidT, gradFrost, 0.0);
    float fDy = getCausticWave(pSurf_warped + vec2(0.0, epsF), fluidT, gradFrost, 0.0) -
                getCausticWave(pSurf_warped - vec2(0.0, epsF), fluidT, gradFrost, 0.0);
    vec2 fluidGrad = vec2(fDx, fDy) / (2.0 * epsF);
    fluidGrad /= (1.0 + length(fluidGrad) * 0.22);

    // Smooth exponential rim aura decay: tight, seamless falloff hugging the bevel chamfer
    // Tightly confined to the bevel edge, with delicate exponential fade onto the immediate perimeter (2-4px)
    float rimDist = max(distIn - bWidthVal, 0.0);
    float auraWidth = max(u_fluidAuraWidth, 1.0);
    float auraDecay = exp(-rimDist / max(auraWidth * 0.65, 0.75)) * (1.0 - smoothstep(0.0, auraWidth * 2.0, rimDist));
    float fluidPresence = max(contourFactor, auraDecay);

    // Liquid refraction ripples are focused strictly where fluid is present (bevel + aura)
    // The central core remains 100% pure optical dome magnification without soapy fluid turbulence!
    float centerFluidFactor = clamp(u_fluidCenter * 0.01, 0.0, 1.0);
    float refrFluidWeight = mix(centerFluidFactor, 1.0, fluidPresence);

    float fluidBend = (u_refraction * 0.0004) * (0.35 + (u_thickness * 0.01) * 0.95);
    vec2 dispFluid = fluidGrad * (fluidBend * refrFluidWeight);

    // Gentle isotropic convex glass magnification (smooth C-infinity dome profile)
    vec2 dispDome = vec2(0.0);
    float domeBend = (u_thickness * 0.00015) * (u_refraction * 0.01);
    if (u_isText > 0.5) {
      dispDome = -norm * (domeBend * 3.5);
    } else {
      vec2 pIso = localPx / (halfSize.y * 1.5);
      float domeProfile = 1.0 / (1.0 + dot(pIso, pIso) * 0.35);
      dispDome = -pIso * (domeProfile * domeBend);
    }

    // Total displacement: strictly tapered to zero at boundary
    vec2 disp = (dispBevel + dispFluid + dispDome) * edgeTaper;

    // Prismatic dispersion spread factor on the bevel chamfer and perimeter
    float dispSpread = (u_dispersion * 0.01) * (contourFactor * 0.85 + 0.15);

    // 3. Chromatic Background Refraction (smooth spectral split without negative delta)
    vec4 bgSample = sampleFrostedRGBA(v_uv - disp, frostVal);
    vec3 bgSpectral = bgSample.rgb;
    float bgAlpha = bgSample.a;

    if (dispSpread > 0.0005 && bgAlpha > 0.001) {
      vec2 dR = disp * (1.0 - dispSpread * 0.85);
      vec2 dY = disp * (1.0 - dispSpread * 0.40);
      vec2 dC = disp * (1.0 + dispSpread * 0.40);
      vec2 dB = disp * (1.0 + dispSpread * 0.85);

      vec4 sR_bg = sampleFrostedRGBA(v_uv - dR, frostVal);
      vec4 sY_bg = sampleFrostedRGBA(v_uv - dY, frostVal);
      vec4 sC_bg = sampleFrostedRGBA(v_uv - dC, frostVal);
      vec4 sB_bg = sampleFrostedRGBA(v_uv - dB, frostVal);

      float rEdge = sR_bg.r * 0.60 + sY_bg.r * 0.40;
      float gEdge = sY_bg.g * 0.35 + bgSample.g * 0.30 + sC_bg.g * 0.35;
      float bEdge = sC_bg.b * 0.40 + sB_bg.b * 0.60;
      bgSpectral = vec3(rEdge, gEdge, bEdge);
      bgAlpha = (sR_bg.a + sY_bg.a + bgSample.a + sC_bg.a + sB_bg.a) * 0.20;
    }

    vec2 hitPxG = (v_uv - (dispBevel + dispDome + dispFluid * 0.25) * edgeTaper) * u_resolution;

    // Interactive fluid coordinate for the element body
    vec2 pG_raw = (hitPxG - center) / btnHeight * fluidSc;
    vec2 pG_warped = warpFluid(pG_raw, pPhys, mouseNorm, fluidPull, clickNorm, clickDt, clickAmt);
    
    // Pure fluid caustic field
    float fG_body = getCausticWave(pG_warped, fluidT, frostVal, 0.0);

    // Dynamic polar border beam orbiting the perimeter (for buttons and prompt box)
    float beamSpeed = u_fluidSpeed * 0.015;
    float aspect = halfSize.x / max(halfSize.y, 1.0);
    float theta = atan(localPx.y * aspect, localPx.x);
    float beamPhase = theta - u_time * beamSpeed;

    // Smooth traveling wave along the rim
    // Dynamic comet crest that sweeps along the border beam
    float cosB = cos(beamPhase);
    float beamHead = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 3.5);
    float beamGlow = pow(clamp(cosB * 0.5 + 0.5, 0.0, 1.0), 1.8) * 0.35;
    float beamProfile = beamHead * 1.5 + beamGlow;
    float flowAmt = clamp(u_auroraFlow * 0.01, 0.0, 1.0);
    float flowMod = mix(1.0, beamProfile * 1.4 + 0.08, flowAmt);

    // Dynamic rainbow polar aurora chromatic phase (border beam style)
    // Seamless 2pi-periodic spectrum without branch-cut seams across the negative X axis
    vec3 polarRainbow = 0.55 + 0.45 * cos(beamPhase + vec3(0.0, 2.0944, 4.1888));
    vec3 auroraColor = polarRainbow;

    if (u_isText > 0.5) {
      // Smooth continuous spectral gradient across the word with slow organic breathing drift
      float xSpan = (localPx.x / max(halfSize.x, 1.0)) * 0.5 + 0.5;
      float slowDrift = u_time * (u_fluidSpeed * 0.0035);
      float textPhase = xSpan * 3.14159265 * 1.35 + slowDrift;
      auroraColor = 0.55 + 0.45 * cos(textPhase + vec3(0.0, 2.0944, 4.1888));

      // Organic liquid caustic shimmer: gentle luminous wave breathing through the living fluid
      float waveShimmer = 0.82 + 0.28 * cos(xSpan * 4.71239 - u_time * (u_fluidSpeed * 0.008));
      flowMod = mix(1.0, waveShimmer * 1.25, flowAmt);
    }

    // Edge fluid mask (confined to bevel & tight edge aura; Center Clarity drives pure colorless refraction on panels)
    float edgeFluidMask = fluidPresence * flowMod;
    float fluidMask = u_isText > 0.5 ? mix(centerFluidFactor, 1.0, edgeFluidMask) : edgeFluidMask;

    float dispFactor = clamp(u_dispersion * 0.01, 0.0, 1.0);
    vec3 causticTint = mix(vec3(1.0), auroraColor, dispFactor);

    // Fluid illumination on the glass rim
    float fluidGlow = getFluidExcitation(pPhys, mouseNorm, hoverGlow, u_hoverBright, clickNorm, clickDt, clickAmt);
    if (u_isText > 0.5 && hoverGlow > 0.001) {
      // For typography: bathe the entire word in luminous caustic glow, with gentle focus on the cursor
      float xDist = abs(pPhys.x - mouseNorm.x);
      float textHoverFalloff = exp(-xDist * 0.5);
      float wordAmbientHover = hoverGlow * (u_hoverBright * 0.01) * 0.45;
      fluidGlow = max(fluidGlow, wordAmbientHover * (0.60 + 0.40 * textHoverFalloff));
    }
    float fluidEdgeFade = isFullBleed ? 1.0 : smoothstep(0.0, 1.8, distIn);
    float causticBrightScale = (u_fluidBright * 0.01) + fluidGlow;
    float totalFluidFactor = causticBrightScale * fluidEdgeFade * fluidMask;

    // Caustic highlight: monochromatic wave modulated by iridescent aurora tint
    vec3 causticEmission = causticTint * (fG_body * totalFluidFactor * edgeTaper);
    if (dispSpread > 0.0005) {
      vec3 prismAccent = 0.55 + 0.45 * cos(beamPhase * 2.0 + vec3(0.0, 2.0944, 4.1888));
      causticEmission += (prismAccent - 0.45) * (fG_body * totalFluidFactor * edgeTaper * clamp(u_dispersion * 0.012, 0.0, 1.0) * (1.0 + contourFactor * 1.5));
    }

    // Smoked Glass Absorption Tint (obsidian glass)
    float absorptionScale = 0.5 + (u_thickness * 0.01) * 0.8;
    float darkFactor = clamp((u_darkness * 0.01) * absorptionScale, 0.0, 0.95);
    float bevelThickness = 1.0 - bevelSlope * 0.35;
    float darkAtten = darkFactor * bevelThickness * 0.85;
    vec3 obsidianTint = u_bgColor * 0.45;

    // Clean, crisp achromatic specular gleam strictly on the contour facing light
    vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));
    float lightAlign = dot(norm, lightDir2D);

    float textFade = u_isText > 0.5 ? smoothstep(0.08, 0.85, coverage) : 1.0;
    float bevelPeak = smoothstep(0.0, 1.0, distIn) * (1.0 - smoothstep(1.0, bWidthVal + 1.2, distIn)) * textFade;
    float mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 16.0) * bevelPeak * (u_sheen * 0.01) * 1.5;
    float backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 8.0) * bevelPeak * (u_rim * 0.01) * 0.7;
    float edgeRim = pow(clamp(1.0 - distIn / 2.5, 0.0, 1.0), 2.0) * edgeTaper * (0.35 + 0.5 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;

    if (u_isText > 0.5) {
      // Single continuous physical glass bevel highlight:
      // Organic exponential profile hugging the outer perimeter with zero double-contours or square cutouts
      float gleamWidth = max(u_bevelWidth * 1.4, 2.4);
      float gleamFalloff = exp(-distIn / gleamWidth) * edgeTaper * textFade;
      mainGleam = pow(clamp(lightAlign, 0.0, 1.0), 14.0) * gleamFalloff * (u_sheen * 0.01) * 1.8;
      backGleam = pow(clamp(-lightAlign, 0.0, 1.0), 7.0) * gleamFalloff * (u_rim * 0.01) * 0.75;
      edgeRim = pow(clamp(1.0 - distIn / max(u_bevelWidth * 1.6, 2.8), 0.0, 1.0), 1.6) * edgeTaper *
                (0.35 + 0.55 * clamp(lightAlign * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.85 * textFade;
    }

    // Prismatic chromatic sheen on the bevel gleam
    float prismAngle = dot(vec2(-norm.y, norm.x), lightDir2D);
    vec3 gleamColor = vec3(1.0);
    if (u_dispersion > 1.0) {
      float gleamDisp = (u_dispersion * 0.01) * 0.55;
      gleamColor = vec3(
        1.0 + prismAngle * gleamDisp * 0.65,
        1.0 - abs(prismAngle) * gleamDisp * 0.35,
        1.0 - prismAngle * gleamDisp * 0.65
      );
    }

    vec3 lensCol = vec3(0.0);
    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {
      float domTransparency = 1.0 - bgAlpha;
      float absorbAlpha = darkAtten * 0.75;
      outBaseAlpha = clamp(bgAlpha + absorbAlpha * domTransparency, 0.0, 1.0);

      vec3 baseCol = bgSpectral * (1.0 - absorbAlpha) + (u_bgColor * 0.35) * (absorbAlpha * domTransparency);
      vec3 opticalEmit = causticEmission * (1.0 - darkAtten * 0.65);

      if (u_isText > 0.5) {
        float bRad = max(u_bevelWidth * 1.2, 4.0);
        float strokeDome = cos(clamp(distIn / bRad, 0.0, 1.0) * 1.5707963);
        float glyphFresnel = (0.045 + 0.095 * strokeDome) * (0.45 + (u_refraction * 0.01) * 0.55) * (0.45 + frostVal * 0.55) * (1.0 - darkAtten * 0.7) * textFade;
        opticalEmit += mix(vec3(1.0), auroraColor, dispFactor * 0.40) * (glyphFresnel * domTransparency);
      } else if (!isFullBleed) {
        float bevelFresnel = contourFactor * (0.04 + (u_refraction * 0.01) * 0.06) * (0.5 + (u_thickness * 0.01) * 0.5) * edgeTaper;
        float frostVeil = (frostVal * 0.03 + (u_sheen * 0.01) * 0.012) * (1.0 - darkAtten * 0.7) * edgeTaper;
        opticalEmit += (vec3(bevelFresnel) * gleamColor + vec3(frostVeil)) * domTransparency;
      }

      lensCol = baseCol + opticalEmit + (mainGleam + backGleam) * gleamColor + vec3(edgeRim);
    } else {
      outBaseAlpha = 1.0;
      vec3 baseSample = bgSpectral + causticEmission;
      lensCol = mix(baseSample, obsidianTint, darkAtten);
      lensCol += (mainGleam + backGleam) * gleamColor + vec3(edgeRim);
    }

    if (u_isAudioDeck > 0.5) {
      // Convex molded-glass dome relief along the mutual Boolean union boundary of the transport buttons
      float s = halfSize.x / 240.0;
      vec2 pPlay = localPx - vec2(0.0, -halfSize.y);
      vec2 pPrev = localPx - vec2(-64.0 * s, -halfSize.y);
      vec2 pNext = localPx - vec2(64.0 * s, -halfSize.y);
      float rPlay = length(pPlay);
      float rPrev = length(pPrev);
      float rNext = length(pNext);
      float dPlay = rPlay - 40.0 * s;
      float dPrev = rPrev - 28.0 * s;
      float dNext = rNext - 28.0 * s;
      float dSec = min(dPrev, dNext);

      vec2 nPlay = rPlay > 1e-4 ? pPlay / rPlay : vec2(0.0, 1.0);
      vec2 nSec = dPrev < dNext
        ? (rPrev > 1e-4 ? pPrev / rPrev : vec2(0.0, 1.0))
        : (rNext > 1e-4 ? pNext / rNext : vec2(0.0, 1.0));

      float innerTransition = smoothstep(1.5 * s, bWidthVal, distIn);
      float playMask = smoothstep(1.0 * s, 5.0 * s, distIn + dPlay) * smoothstep(0.0, 4.0 * s, dSec) * innerTransition;
      float secMask = smoothstep(1.0 * s, 5.0 * s, distIn + dSec) * smoothstep(0.0, 4.0 * s, dPlay) * innerTransition;
      float distPlay = -dPlay;
      float distSec = -dSec;
      float playTaper = smoothstep(-0.8 * s, 0.8 * s, distPlay) * clamp(rPlay / (40.0 * s), 0.0, 1.0);
      float secTaper = smoothstep(-0.8 * s, 0.8 * s, distSec) * clamp(min(rPrev, rNext) / (28.0 * s), 0.0, 1.0);

      float playSheenProf = playTaper * (1.0 - smoothstep(1.0 * s, bWidthVal + 1.2 * s, max(distPlay, 0.0))) * playMask;
      float secSheenProf = secTaper * (1.0 - smoothstep(1.0 * s, bWidthVal * 0.85 + 1.2 * s, max(distSec, 0.0))) * secMask;
      float playRimProf = playTaper * pow(clamp(1.0 - max(distPlay, 0.0) / (2.5 * s), 0.0, 1.0), 2.0) * playMask;
      float secRimProf = secTaper * pow(clamp(1.0 - max(distSec, 0.0) / (2.2 * s), 0.0, 1.0), 2.0) * secMask;

      float alignPlay = dot(nPlay, lightDir2D);
      float alignSec = dot(nSec, lightDir2D);

      float playGleam = (pow(clamp(alignPlay, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.85 +
                         pow(clamp(-alignPlay, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.35) * playSheenProf;
      float secGleam = (pow(clamp(alignSec, 0.0, 1.0), 8.0) * (u_sheen * 0.01) * 0.72 +
                        pow(clamp(-alignSec, 0.0, 1.0), 6.0) * (u_rim * 0.01) * 0.28) * secSheenProf;

      float playEdgeRim = playRimProf * (0.25 + 0.55 * clamp(alignPlay * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.48;
      float secEdgeRim = secRimProf * (0.22 + 0.50 * clamp(alignSec * 0.5 + 0.5, 0.0, 1.0)) * (u_rim * 0.01) * 0.40;

      vec2 nDome = dPlay < dSec ? nPlay : nSec;
      float domePrism = dot(vec2(-nDome.y, nDome.x), lightDir2D);
      vec3 domeGleamColor = vec3(1.0);
      if (u_dispersion > 1.0) {
        float gDisp = (u_dispersion * 0.01) * 0.55;
        domeGleamColor = vec3(
          1.0 + domePrism * gDisp * 0.65,
          1.0 - abs(domePrism) * gDisp * 0.35,
          1.0 - domePrism * gDisp * 0.65
        );
      }

      lensCol += (playGleam + secGleam) * domeGleamColor + vec3(playEdgeRim + secEdgeRim);
    }

    return vec4(lensCol, coverage);
  }

  vec4 renderGlassLens(vec2 screenPx, vec4 rect, float radius) {
    float baseAlpha = 1.0;
    vec4 lens = renderSingleGlassLens(screenPx, rect, radius, false, baseAlpha);
    if (u_switchThumb.z > 0.5 && u_switchThumb.w > 0.5 && lens.a > 0.0) {
      vec2 trackCenter = rect.xy + rect.zw * 0.5;
      vec2 thumbCenter = trackCenter + u_switchThumb.xy;
      vec2 halfThumb = u_switchThumb.zw;
      float capRad = min(halfThumb.x, halfThumb.y);
      float segHalf = max(halfThumb.x - capRad, 0.0);
      vec2 pThumb = screenPx - thumbCenter;
      vec2 qExact = vec2(pThumb.x - clamp(pThumb.x, -segHalf, segHalf), pThumb.y);
      float dThumb = length(qExact) - capRad;
      if (dThumb <= 2.0) {
        float distThumb = -dThumb;
        float thumbTaper = smoothstep(-0.75, 0.75, distThumb);

        // Normalized radial coordinates from capsule medial axis: r in [0, 1], r2 = r^2 in [0, 1]
        vec2 pNorm = qExact / max(capRad, 1.0);
        float r2 = clamp(dot(pNorm, pNorm), 0.0, 1.0);
        vec2 nThumb = length(qExact) > 1e-4 ? qExact / length(qExact) : vec2(0.0, 1.0);

        float frostVal = u_frost * 0.01;
        float sheenAmt = u_sheen * 0.01;
        float rimAmt = u_rim * 0.01;

        // Smooth C-infinity bevel cushion: flatter central plateau, gentler bevel closer to the perimeter
        float domeExp = mix(1.85, 0.85, clamp(u_bevelWidth / 15.0, 0.0, 1.0));
        float smoothDome = pow(r2, domeExp);
        float softEdge = pow(r2, 4.8);

        vec2 lightDir2D = vec2(cos(u_lightAngle), sin(u_lightAngle));
        float alignSmooth = dot(pNorm, lightDir2D);
        float alignEdge = dot(nThumb, lightDir2D);

        // Delicate 3D bevel lighting (less bulging/puffy, more refined flat-topped glass lens)
        float darkFade = 1.0 - clamp(u_darkness * 0.01, 0.0, 0.9);
        float primaryGlow = pow(clamp(alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.2) * sheenAmt * 0.28;
        float counterGlow = pow(clamp(-alignSmooth * 0.5 + 0.5, 0.0, 1.0), 2.4) * rimAmt * 0.20;
        float ambientDome = (sheenAmt * 0.09 + rimAmt * 0.09 + frostVal * 0.04) * darkFade;
        // Soft achromatic frosted glass base fill so the interior is evenly translucent
        float innerTranslucentFill = (0.05 + frostVal * 0.07 + sheenAmt * 0.04) * darkFade;
        float domeCushion = (primaryGlow + counterGlow + ambientDome) * smoothDome + innerTranslucentFill;

        // Delicate outer glass rim at r -> 1
        float dirRim = 0.45 + 0.55 * max(pow(clamp(alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2),
                                         pow(clamp(-alignEdge * 0.5 + 0.5, 0.0, 1.0), 2.2) * 0.85);
        float edgeHighlight = softEdge * dirRim * (rimAmt * 0.24 + sheenAmt * 0.12);

        // Subtle chromatic dispersion flare on the bevel (driven by Dispersion slider)
        float domePrism = dot(vec2(-pNorm.y, pNorm.x), lightDir2D);
        vec3 domeGleamColor = vec3(1.0);
        if (u_dispersion > 1.0) {
          float gDisp = (u_dispersion * 0.01) * 0.25;
          domeGleamColor = vec3(
            1.0 + domePrism * gDisp * 0.50,
            1.0 - abs(domePrism) * gDisp * 0.22,
            1.0 - domePrism * gDisp * 0.50
          );
        }

        // Purely additive optical glass dome over the transparent refracted capsule (zero opaque darkening!)
        lens.rgb += ((domeCushion + edgeHighlight) * domeGleamColor) * thumbTaper;
      }
    }
    if (u_srcComposite < -0.5 || u_srcComposite > 1.5) {
      float coverage = lens.a;
      vec3 clampedRGB = clamp(lens.rgb, 0.0, 1.0);
      float lightPeak = max(clampedRGB.r, max(clampedRGB.g, clampedRGB.b));
      float finalAlpha = clamp(baseAlpha + lightPeak * (1.0 - baseAlpha), 0.0, 1.0) * coverage;
      return vec4(clampedRGB * coverage, finalAlpha);
    }
    return vec4(lens.rgb * lens.a, lens.a);
  }

  void main() {
    if (u_useBackdrop > 0.5) {
      float a = texture(u_src, vec2(v_uv.x, 1.0 - v_uv.y)).a;
      fragColor = vec4(vec3(a), a);
      return;
    }
    vec2 screenPx = v_uv * u_resolution;
    fragColor = renderGlassLens(screenPx, u_rect, u_radius);
  }
`;function Nd(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.error("TactileGlassEngine: Shader compile error",e.getShaderInfoLog(r)),r}function Af(e){let t=e.createProgram();return e.attachShader(t,Nd(e,e.VERTEX_SHADER,Pf)),e.attachShader(t,Nd(e,e.FRAGMENT_SHADER,Mf)),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)||console.error("TactileGlassEngine: Program link error",e.getProgramInfoLog(t)),t}function Fd(e){let t=e.trim();if(!t||t==="transparent")return null;if(t.startsWith("#")){let r=t.slice(1);if(r.length===3)return[parseInt(r[0]+r[0],16)/255,parseInt(r[1]+r[1],16)/255,parseInt(r[2]+r[2],16)/255];if(r.length>=6)return[parseInt(r.slice(0,2),16)/255,parseInt(r.slice(2,4),16)/255,parseInt(r.slice(4,6),16)/255]}let n=t.match(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);return n?(n[4]!==void 0?parseFloat(n[4]):1)<=.01?null:[Math.min(255,Math.max(0,parseFloat(n[1])))/255,Math.min(255,Math.max(0,parseFloat(n[2])))/255,Math.min(255,Math.max(0,parseFloat(n[3])))/255]:null}function Lf(e){if(typeof window<"u"&&typeof document<"u"){let t=e?.parentElement||document.body;for(;t;){let i=window.getComputedStyle(t).backgroundColor,a=Fd(i);if(a)return a;t=t.parentElement}let n=window.getComputedStyle(document.documentElement).getPropertyValue("--bg-canvas"),r=Fd(n);if(r)return r}return[0,0,0]}function Dd(e,t,n,r,i){let a=0;n[0]=0,r[0]=-1/0,r[1]=1/0;for(let o=1;o<i;o++){let l=(e[o]+o*o-(e[n[a]]+n[a]*n[a]))/(2*o-2*n[a]);for(;l<=r[a];)a--,l=(e[o]+o*o-(e[n[a]]+n[a]*n[a]))/(2*o-2*n[a]);a++,n[a]=o,r[a]=l,r[a+1]=1/0}a=0;for(let o=0;o<i;o++){for(;r[a+1]<o;)a++;t[o]=(o-n[a])*(o-n[a])+e[n[a]]}}function Rf(e,t,n){let r=new Float32Array(t*n),i=Math.max(t,n),a=new Float32Array(i),o=new Int32Array(i),l=new Float32Array(i+1);for(let s=0;s<t;s++){for(let c=0;c<n;c++)a[c]=e[c*t+s]?1e9:0;Dd(a,a,o,l,n);for(let c=0;c<n;c++)r[c*t+s]=a[c]}for(let s=0;s<n;s++){let c=s*t;for(let f=0;f<t;f++)a[f]=r[c+f];Dd(a,a,o,l,t);for(let f=0;f<t;f++)r[c+f]=Math.sqrt(a[f])}return r}function zf(e,t,n,r,i,a,o,l){e.clearRect(0,0,t,n),e.font=i,"letterSpacing"in e&&(e.letterSpacing=a&&a!=="normal"?a:"0px"),e.textBaseline="alphabetic",e.textAlign="left",e.fillStyle="#ffffff",e.fillText(r,o,l);let s=e.getImageData(0,0,t,n).data,c=t*n,f=new Uint8Array(c);for(let u=0;u<c;u++)f[u]=s[u*4+3]>=128?1:0;let m=Rf(f,t,n),p=new Float32Array(c);for(let u=0;u<c;u++){let d=m[u],g=s[u*4+3];g===0?p[u]=0:d<=2?p[u]=Math.max(0,d-1+g/255):p[u]=d}let v=new Float32Array(c),x=new Float32Array(c),y=6/16,L=4/16,h=1/16;for(let u=0;u<n;u++){let d=u*t;for(let g=0;g<t;g++){let w=Math.max(0,g-2),C=Math.max(0,g-1),T=Math.min(t-1,g+1),k=Math.min(t-1,g+2);v[d+g]=p[d+g]*y+(p[d+C]+p[d+T])*L+(p[d+w]+p[d+k])*h}}for(let u=0;u<n;u++){let d=u*t,g=Math.max(0,u-2)*t,w=Math.max(0,u-1)*t,C=Math.min(n-1,u+1)*t,T=Math.min(n-1,u+2)*t;for(let k=0;k<t;k++)x[d+k]=v[d+k]*y+(v[w+k]+v[C+k])*L+(v[g+k]+v[T+k])*h}for(let u=0;u<c;u++){let d=u*4;s[d+3]===0?(s[d]=0,s[d+1]=0,s[d+2]=0,s[d+3]=0):(s[d]=Math.min(255,Math.round(x[u]*8)),s[d+1]=0,s[d+2]=0)}return s}var Ql=class{constructor(){U(this,"glCanvas",null),U(this,"gl",null),U(this,"prog",null),U(this,"quadBuf",null),U(this,"bgTexture",null),U(this,"compositeCanvas",null),U(this,"compositeCtx",null),U(this,"compositeTexture",null),U(this,"textMaskCanvas",null),U(this,"textMaskCtx",null),U(this,"textMaskTextures",new Map),U(this,"uSrc",null),U(this,"uSrcComposite",null),U(this,"uTextMask",null),U(this,"uIsText",null),U(this,"uResolution",null),U(this,"uRect",null),U(this,"uRadius",null),U(this,"uUseBackdrop",null),U(this,"uTilt",null),U(this,"uBgColor",null),U(this,"uRefraction",null),U(this,"uThickness",null),U(this,"uBevelWidth",null),U(this,"uFrost",null),U(this,"uDispersion",null),U(this,"uSheen",null),U(this,"uLightAngle",null),U(this,"uDarkness",null),U(this,"uRim",null),U(this,"uTime",null),U(this,"uFluidBright",null),U(this,"uFluidSpeed",null),U(this,"uFluidScale",null),U(this,"uFluidAuraWidth",null),U(this,"uFluidCenter",null),U(this,"uAuroraFlow",null),U(this,"uMousePos",null),U(this,"uHoverStrength",null),U(this,"uLightTrack",null),U(this,"uHoverBright",null),U(this,"uClickPos",null),U(this,"uClickTime",null),U(this,"uClickWave",null),U(this,"uIsAudioDeck",null),U(this,"uSwitchThumb",null),U(this,"instances",new Map),U(this,"animId",null),U(this,"startTime",performance.now()),U(this,"isTabVisible",!0),U(this,"handleVisibilityChange",()=>{this.isTabVisible=!document.hidden,this.isTabVisible?this.instances.size>0&&!this.animId&&this.startLoop():this.stopLoop()}),typeof window<"u"&&document.addEventListener("visibilitychange",this.handleVisibilityChange)}initGL(){if(this.gl)return!0;if(typeof window>"u")return!1;this.glCanvas=document.createElement("canvas"),this.glCanvas.width=512,this.glCanvas.height=256;let t=this.glCanvas.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"high-performance"});if(!t)return!1;this.gl=t,this.prog=Af(t),this.quadBuf=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.quadBuf),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);let n=t.getAttribLocation(this.prog,"a_pos");return t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),this.uSrc=t.getUniformLocation(this.prog,"u_src"),this.uSrcComposite=t.getUniformLocation(this.prog,"u_srcComposite"),this.uTextMask=t.getUniformLocation(this.prog,"u_textMask"),this.uIsText=t.getUniformLocation(this.prog,"u_isText"),this.uResolution=t.getUniformLocation(this.prog,"u_resolution"),this.uRect=t.getUniformLocation(this.prog,"u_rect"),this.uRadius=t.getUniformLocation(this.prog,"u_radius"),this.uUseBackdrop=t.getUniformLocation(this.prog,"u_useBackdrop"),this.uTilt=t.getUniformLocation(this.prog,"u_tilt"),this.uBgColor=t.getUniformLocation(this.prog,"u_bgColor"),this.uRefraction=t.getUniformLocation(this.prog,"u_refraction"),this.uThickness=t.getUniformLocation(this.prog,"u_thickness"),this.uBevelWidth=t.getUniformLocation(this.prog,"u_bevelWidth"),this.uFrost=t.getUniformLocation(this.prog,"u_frost"),this.uDispersion=t.getUniformLocation(this.prog,"u_dispersion"),this.uSheen=t.getUniformLocation(this.prog,"u_sheen"),this.uLightAngle=t.getUniformLocation(this.prog,"u_lightAngle"),this.uDarkness=t.getUniformLocation(this.prog,"u_darkness"),this.uRim=t.getUniformLocation(this.prog,"u_rim"),this.uTime=t.getUniformLocation(this.prog,"u_time"),this.uFluidBright=t.getUniformLocation(this.prog,"u_fluidBright"),this.uFluidSpeed=t.getUniformLocation(this.prog,"u_fluidSpeed"),this.uFluidScale=t.getUniformLocation(this.prog,"u_fluidScale"),this.uFluidAuraWidth=t.getUniformLocation(this.prog,"u_fluidAuraWidth"),this.uFluidCenter=t.getUniformLocation(this.prog,"u_fluidCenter"),this.uAuroraFlow=t.getUniformLocation(this.prog,"u_auroraFlow"),this.uMousePos=t.getUniformLocation(this.prog,"u_mousePos"),this.uHoverStrength=t.getUniformLocation(this.prog,"u_hoverStrength"),this.uLightTrack=t.getUniformLocation(this.prog,"u_lightTrack"),this.uHoverBright=t.getUniformLocation(this.prog,"u_hoverBright"),this.uClickPos=t.getUniformLocation(this.prog,"u_clickPos"),this.uClickTime=t.getUniformLocation(this.prog,"u_clickTime"),this.uClickWave=t.getUniformLocation(this.prog,"u_clickWave"),this.uIsAudioDeck=t.getUniformLocation(this.prog,"u_isAudioDeck"),this.uSwitchThumb=t.getUniformLocation(this.prog,"u_switchThumb"),this.bgTexture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.bgTexture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),!0}register(t){this.instances.set(t.id,t),this.gl||this.initGL(),this.instances.size===1&&this.startLoop()}unregister(t){this.instances.delete(t);let n=this.textMaskTextures.get(t);n&&this.gl&&this.gl.deleteTexture(n.tex),this.textMaskTextures.delete(t),this.instances.size===0&&this.stopLoop()}startLoop(){if(this.animId!==null)return;let t=()=>{this.renderFrame(),this.instances.size>0&&this.isTabVisible?this.animId=requestAnimationFrame(t):this.animId=null};this.animId=requestAnimationFrame(t)}stopLoop(){this.animId!==null&&(cancelAnimationFrame(this.animId),this.animId=null)}getTime(){return(performance.now()-this.startTime)*.001}renderFrame(){let t=this.gl,n=this.glCanvas,r=this.prog;if(!t||!n||!r)return;let i=this.getTime(),a=new Map;this.instances.forEach(l=>{l.visible&&a.set(l,l.canvas.getBoundingClientRect())});let o=Array.from(this.instances.values()).sort((l,s)=>{let c=l.canvas.parentElement,f=s.canvas.parentElement;if(c&&c.contains(s.canvas))return-1;if(f&&f.contains(l.canvas))return 1;let m=l.canvas.width*l.canvas.height,p=s.canvas.width*s.canvas.height;return m!==p?p-m:0});o.forEach((l,s)=>{var c;if(!l.visible)return;let{canvas:f,ctx:m}=l,p=f.width,v=f.height;if(p<=0||v<=0)return;(n.width<p||n.height<v)&&(n.width=Math.max(n.width,p),n.height=Math.max(n.height,v)),t.viewport(0,0,p,v),t.useProgram(r);let x=Math.min(window.devicePixelRatio||1,2),y=a.get(l)||f.getBoundingClientRect(),L=p*v,h;for(let P=s-1;P>=0;P--){let I=o[P];if(!I.visible||I.canvas.width<=0||I.canvas.height<=0)continue;if((c=I.canvas.parentElement)!=null&&c.contains(f)){h=I;break}let E=a.get(I),X=I.canvas.width*I.canvas.height;if(E&&X>L*1.5&&y.right>E.left&&y.left<E.right&&y.bottom>E.top&&y.top<E.bottom){h=I;break}}if(t.activeTexture(t.TEXTURE0),h&&h.canvas.width>0&&h.canvas.height>0)if(this.compositeCanvas||(this.compositeCanvas=document.createElement("canvas"),this.compositeCtx=this.compositeCanvas.getContext("2d"),this.compositeTexture=t.createTexture()),(this.compositeCanvas.width!==p||this.compositeCanvas.height!==v)&&(this.compositeCanvas.width=p,this.compositeCanvas.height=v),this.compositeCtx&&this.compositeTexture){let P=a.get(h)||h.canvas.getBoundingClientRect(),I=Math.round((y.left-P.left)*x),E=Math.round((y.top-P.top)*x);this.compositeCtx.clearRect(0,0,p,v),this.compositeCtx.drawImage(h.canvas,I,E,p,v,0,0,p,v),t.bindTexture(t.TEXTURE_2D,this.compositeTexture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,this.compositeCanvas),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,2)}else t.bindTexture(t.TEXTURE_2D,this.bgTexture),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,-1);else t.bindTexture(t.TEXTURE_2D,this.bgTexture),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,-1);this.uSrc&&t.uniform1i(this.uSrc,0),l.curHover+=(l.targetHover-l.curHover)*.12,l.curMouseX+=(l.targetMouseX-l.curMouseX)*.14,l.curMouseY+=(l.targetMouseY-l.curMouseY)*.14;let u=l.getParams();if(!l.textMask&&!l.isAudioDeck){let P=u.frost>1?Math.round(u.frost*.25*10)/10:0,I=P>0?`blur(${P}px)`:"";f.style.backdropFilter!==I&&(f.style.backdropFilter=I,f.style.webkitBackdropFilter=I)}let d=Lf(f);this.uBgColor&&t.uniform3f(this.uBgColor,d[0],d[1],d[2]);let g=l.getRect?l.getRect():null,w=g?g[0]:0,C=g?g[1]:0,T=g?g[2]:p,k=g?g[3]:v;if(t.uniform2f(this.uResolution,p,v),t.uniform4f(this.uRect,w,C,T,k),t.uniform1f(this.uRadius,u.radius??k*.5),t.uniform1f(this.uUseBackdrop,0),this.uIsAudioDeck&&t.uniform1f(this.uIsAudioDeck,l.isAudioDeck?1:0),this.uSwitchThumb){let P=l.getSwitchThumb?l.getSwitchThumb():null;if(P){let I=P[2],E=P.length>=4?P[3]:P[2];t.uniform4f(this.uSwitchThumb,P[0],P[1],I,E)}else t.uniform4f(this.uSwitchThumb,0,0,0,0)}if(l.textMask){this.textMaskCanvas||(this.textMaskCanvas=document.createElement("canvas"),this.textMaskCtx=this.textMaskCanvas.getContext("2d",{willReadFrequently:!0}));let P=l.textFont||`800 ${Math.round(v*.72)}px sans-serif`,I=l.textLetterSpacing||"normal",E=`${l.textMask}_${p}_${v}_${P}_${I}`,X=this.textMaskTextures.get(l.id);if(X||(X={tex:t.createTexture(),key:""},this.textMaskTextures.set(l.id,X)),X.key!==E&&this.textMaskCtx){X.key=E,(this.textMaskCanvas.width!==p||this.textMaskCanvas.height!==v)&&(this.textMaskCanvas.width=p,this.textMaskCanvas.height=v),this.textMaskCtx.font=P,"letterSpacing"in this.textMaskCtx&&(this.textMaskCtx.letterSpacing=I!=="normal"?I:"0px");let A=this.textMaskCtx.measureText(l.textMask),ee=A.actualBoundingBoxLeft??0,ye=A.actualBoundingBoxRight??A.width,q=A.actualBoundingBoxAscent??v*.36,N=A.actualBoundingBoxDescent??v*.1,Y=Math.round(p*.5-(ye-ee)*.5),oe=Math.round(v*.5+(q-N)*.5),Q=zf(this.textMaskCtx,p,v,l.textMask,P,I,Y,oe);t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,X.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,p,v,0,t.RGBA,t.UNSIGNED_BYTE,Q)}else t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,X.tex);this.uTextMask&&t.uniform1i(this.uTextMask,1),this.uIsText&&t.uniform1f(this.uIsText,1)}else this.uIsText&&t.uniform1f(this.uIsText,0);if(l.tilt&&(Math.abs(l.tilt.rotX)>.001||Math.abs(l.tilt.rotY)>.001||Math.abs(l.tilt.scale-1)>.001)){let P=l.tilt.rotX*Math.PI/180,I=l.tilt.rotY*Math.PI/180,E=l.tilt.scale||1,X=(l.tilt.focalLength||1e3)*x;this.uTilt&&t.uniform4f(this.uTilt,P,I,E,X)}else this.uTilt&&t.uniform4f(this.uTilt,0,0,1,0);t.uniform1f(this.uTime,i),t.uniform1f(this.uRefraction,u.refraction),t.uniform1f(this.uThickness,u.thickness),t.uniform1f(this.uBevelWidth,u.bevelWidth*x),t.uniform1f(this.uFrost,u.frost),t.uniform1f(this.uDispersion,u.dispersion),t.uniform1f(this.uSheen,u.sheen);let O=u.lightAngle??u.angle??24;t.uniform1f(this.uLightAngle,O*Math.PI/180),t.uniform1f(this.uDarkness,u.darkness),t.uniform1f(this.uRim,u.rim);let F=u.causticBright??u.fluidBright,K=u.causticSpeed??u.fluidSpeed,J=u.causticScale??u.fluidScale;t.uniform1f(this.uFluidBright,F),t.uniform1f(this.uFluidSpeed,K),t.uniform1f(this.uFluidScale,J),t.uniform1f(this.uFluidAuraWidth,(u.fluidAuraWidth??4)*x),t.uniform1f(this.uFluidCenter,u.fluidCenter??0),t.uniform1f(this.uAuroraFlow,u.auroraFlow??75),t.uniform2f(this.uMousePos,l.curMouseX,l.curMouseY),t.uniform1f(this.uHoverStrength,l.curHover),t.uniform1f(this.uLightTrack,u.lightTrack),t.uniform1f(this.uHoverBright,u.hoverBright),t.uniform2f(this.uClickPos,l.clickPos[0],l.clickPos[1]),t.uniform1f(this.uClickTime,l.clickTime),t.uniform1f(this.uClickWave,u.clickWave),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLES,0,6),m.clearRect(0,0,p,v),m.drawImage(n,0,n.height-v,p,v,0,0,p,v)})}teardown(){this.stopLoop(),this.gl&&this.prog&&(this.textMaskTextures.forEach(t=>{var n;(n=this.gl)==null||n.deleteTexture(t.tex)}),this.textMaskTextures.clear(),this.gl.deleteProgram(this.prog),this.quadBuf&&this.gl.deleteBuffer(this.quadBuf),this.bgTexture&&this.gl.deleteTexture(this.bgTexture),this.compositeTexture&&this.gl.deleteTexture(this.compositeTexture),this.gl=null,this.prog=null,this.compositeTexture=null,this.compositeCanvas=null,this.compositeCtx=null),typeof window<"u"&&document.removeEventListener("visibilitychange",this.handleVisibilityChange)}},ql=null;function Rn(){return ql||(ql=new Ql),ql}var Id=({children:e,refraction:t,thickness:n,bevelWidth:r,frost:i,dispersion:a,sheen:o,lightAngle:l,darkness:s,rim:c,fluidBrightness:f,fluidSpeed:m,fluidScale:p,fluidAuraWidth:v,fluidCenter:x,auroraFlow:y,causticBrightness:L,causticSpeed:h,causticScale:u,hoverBrightness:d,trackCursorLight:g=!0,lightTrackingStrength:w,clickShockwave:C=!0,shockwaveStrength:T,overlayZIndex:k=2,className:O="",style:F,...K})=>{let J=(0,z.useId)(),P=(0,z.useRef)(null),I=(0,z.useRef)(null),E=Te,X=(0,z.useRef)({radius:20,refraction:t??E.refraction,thickness:n??E.thickness,bevelWidth:r??E.bevelWidth,frost:i??E.frost,dispersion:a??E.dispersion,sheen:o??E.sheen,lightAngle:l??E.lightAngle,darkness:s??E.darkness,rim:c??E.rim,fluidBright:f??E.fluidBright,fluidSpeed:m??E.fluidSpeed,fluidScale:p??E.fluidScale,fluidAuraWidth:v??E.fluidAuraWidth,fluidCenter:x??E.fluidCenter,auroraFlow:y??E.auroraFlow,hoverBright:d??E.hoverBright,lightTrack:g?w??E.lightTrack:0,clickWave:C?T??E.clickWave:0});return(0,z.useEffect)(()=>{X.current={...X.current,refraction:t??E.refraction,thickness:n??E.thickness,bevelWidth:r??E.bevelWidth,frost:i??E.frost,dispersion:a??E.dispersion,sheen:o??E.sheen,lightAngle:l??E.lightAngle,darkness:s??E.darkness,rim:c??E.rim,fluidBright:L??f??E.fluidBright,fluidSpeed:h??m??E.fluidSpeed,fluidScale:u??p??E.fluidScale,fluidAuraWidth:v??E.fluidAuraWidth,fluidCenter:x??E.fluidCenter,auroraFlow:y??E.auroraFlow,causticBright:L??f??E.fluidBright,causticSpeed:h??m??E.fluidSpeed,causticScale:u??p??E.fluidScale,hoverBright:d??E.hoverBright,lightTrack:g?w??E.lightTrack:0,clickWave:C?T??E.clickWave:0}},[t,n,r,i,a,o,l,s,c,f,m,p,v,x,y,L,h,u,d,g,w,C,T]),(0,z.useEffect)(()=>{let A=P.current,ee=I.current;if(!A||!ee)return;let ye=ee.getContext("2d",{alpha:!0});if(!ye)return;let q=Rn(),N={id:J,canvas:ee,ctx:ye,getParams:()=>{if(!A)return X.current;let M=Math.min(window.devicePixelRatio||1,2),b=window.getComputedStyle(A),B=parseFloat(b.borderRadius),_=Math.min(A.offsetWidth,A.offsetHeight)*.5*M,W=!isNaN(B)&&B>=0?B*M:_;return X.current.radius=Math.min(W,_),X.current},getSwitchThumb:()=>{if(!A)return null;let M=A.querySelector(".switch-thumb, [data-switch-thumb], .tabs-indicator, [data-tabs-indicator]");if(!M)return null;let b=Math.min(window.devicePixelRatio||1,2),B=A.getBoundingClientRect(),_=M.getBoundingClientRect();if(_.width<=0||_.height<=0)return null;let W=(_.left+_.width*.5-(B.left+B.width*.5))*b,ce=(B.top+B.height*.5-(_.top+_.height*.5))*b,ke=_.width*.5*b,$=_.height*.5*b;return[W,ce,ke,$]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},Y=()=>{let M=Math.min(window.devicePixelRatio||1,2),b=Math.round(A.offsetWidth*M),B=Math.round(A.offsetHeight*M);(ee.width!==b||ee.height!==B)&&(ee.width=b,ee.height=B)};Y();let oe=null;typeof ResizeObserver<"u"&&(oe=new ResizeObserver(()=>Y()),oe.observe(A));let Q=null;typeof IntersectionObserver<"u"&&(Q=new IntersectionObserver(([M])=>{N.visible=M.isIntersecting}),Q.observe(A));let V=M=>{let b=A.getBoundingClientRect(),B=b.left+b.width*.5,_=b.top+b.height*.5,W=Math.min(window.devicePixelRatio||1,2);N.targetMouseX=(M.clientX-B)*W,N.targetMouseY=(_-M.clientY)*W},me=M=>{N.targetHover=1,V(M)},xe=M=>{N.targetHover=1,V(M)},D=()=>{N.targetHover=0},j=M=>{V(M),N.clickPos=[N.targetMouseX,N.targetMouseY],N.clickTime=q.getTime()};return A.addEventListener("pointerenter",me),A.addEventListener("pointermove",xe),A.addEventListener("pointerleave",D),A.addEventListener("pointerdown",j),q.register(N),()=>{q.unregister(J),A.removeEventListener("pointerenter",me),A.removeEventListener("pointermove",xe),A.removeEventListener("pointerleave",D),A.removeEventListener("pointerdown",j),oe&&oe.disconnect(),Q&&Q.disconnect()}},[J]),(0,H.jsxs)("div",{ref:P,className:`tactile-glass-fx ${O}`.trim(),style:{position:"relative",display:"inline-flex",overflow:"hidden",WebkitTapHighlightColor:"transparent",...F},...K,children:[(0,H.jsx)("canvas",{ref:I,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:k}}),(0,H.jsx)("div",{style:{position:"relative",zIndex:k+1,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e})]})},Bf=({children:e,size:t="xl",shape:n="pill",className:r="",refraction:i=Te.refraction,thickness:a=Te.thickness,bevelWidth:o=Te.bevelWidth,frost:l=Te.frost,dispersion:s=Te.dispersion,sheen:c=Te.sheen,lightAngle:f=Te.lightAngle,darkness:m=Te.darkness,rim:p=Te.rim,fluidBrightness:v=Te.fluidBright,fluidSpeed:x=Te.fluidSpeed,fluidScale:y=Te.fluidScale,fluidAuraWidth:L=Te.fluidAuraWidth,fluidCenter:h=Te.fluidCenter,auroraFlow:u=Te.auroraFlow,causticBrightness:d,causticSpeed:g,causticScale:w,fluidDispersion:C,hoverBrightness:T=Te.hoverBright,trackCursorLight:k=!0,lightTrackingStrength:O=Te.lightTrack,clickShockwave:F=!0,shockwaveStrength:K=Te.clickWave,onClick:J,...P})=>{let I=(0,z.useId)(),E=(0,z.useRef)(null),X=(0,z.useRef)(null),A=C!==void 0?C:s,ee=(0,z.useRef)({radius:20,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:A,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:v,fluidSpeed:x,fluidScale:y,fluidAuraWidth:L,fluidCenter:h,auroraFlow:u,hoverBright:T,lightTrack:k?O:0,clickWave:F?K:0});(0,z.useEffect)(()=>{ee.current={...ee.current,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:A,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:d??v,fluidSpeed:g??x,fluidScale:w??y,fluidAuraWidth:L,fluidCenter:h,auroraFlow:u,causticBright:d??v,causticSpeed:g??x,causticScale:w??y,hoverBright:T,lightTrack:k?O:0,clickWave:F?K:0}},[i,a,o,l,A,c,f,m,p,v,x,y,L,h,u,d,g,w,T,k,O,F,K]),(0,z.useEffect)(()=>{let q=E.current,N=X.current;if(!q||!N)return;let Y=N.getContext("2d",{alpha:!0});if(!Y)return;let oe=Rn(),Q={id:I,canvas:N,ctx:Y,getParams:()=>{let B=N.height;return ee.current.radius=B*.5,ee.current},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},V=()=>{let B=Math.min(window.devicePixelRatio||1,2),_=Math.round(q.offsetWidth*B),W=Math.round(q.offsetHeight*B);(N.width!==_||N.height!==W)&&(N.width=_,N.height=W)};V();let me=new ResizeObserver(V);me.observe(q);let xe=B=>{let _=q.getBoundingClientRect(),W=_.left+_.width*.5,ce=_.top+_.height*.5,ke=Math.min(window.devicePixelRatio||1,2);Q.targetMouseX=(B.clientX-W)*ke,Q.targetMouseY=(ce-B.clientY)*ke},D=B=>{Q.targetHover=1,xe(B)},j=B=>{Q.targetHover=1,xe(B)},M=()=>{Q.targetHover=0},b=B=>{xe(B),Q.clickPos=[Q.targetMouseX,Q.targetMouseY],Q.clickTime=oe.getTime()};return q.addEventListener("pointerenter",D),q.addEventListener("pointermove",j),q.addEventListener("pointerleave",M),q.addEventListener("pointerdown",b),oe.register(Q),()=>{oe.unregister(I),me.disconnect(),q.removeEventListener("pointerenter",D),q.removeEventListener("pointermove",j),q.removeEventListener("pointerleave",M),q.removeEventListener("pointerdown",b)}},[I]);let ye=n==="circle";return(0,H.jsxs)("button",{ref:E,type:"button",onClick:J,className:`tactile-btn ${ye?"btn-circle":""} ${r}`.trim(),...P,children:[(0,H.jsx)("canvas",{ref:X,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,H.jsx)("span",{className:"btn-label",style:{position:"relative",zIndex:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:ye?0:"var(--space-12)"},children:e})]})},Wd=Bf;var Ud=({checked:e,defaultChecked:t=!1,onChange:n,size:r="xl",className:i="",disabled:a=!1,refraction:o=Pe.refraction,refractionOff:l=Fe.refraction,thickness:s=Pe.thickness,thicknessOff:c=Fe.thickness,bevelWidth:f=Pe.bevelWidth,bevelWidthOff:m=Fe.bevelWidth,frost:p=Pe.frost,frostOff:v=Fe.frost,dispersion:x=Pe.dispersion,dispersionOff:y=Fe.dispersion,sheen:L=Pe.sheen,sheenOff:h=Fe.sheen,lightAngle:u=Pe.lightAngle,darkness:d=Pe.darkness,darknessOff:g=Fe.darkness,rim:w=Pe.rim,rimOff:C=Fe.rim,fluidBrightness:T=Pe.fluidBright,fluidBrightnessOff:k=Fe.fluidBright,fluidSpeed:O=Pe.fluidSpeed,fluidSpeedOff:F=Fe.fluidSpeed,fluidScale:K=Pe.fluidScale,fluidScaleOff:J=Fe.fluidScale,fluidAuraWidth:P=Pe.fluidAuraWidth,fluidAuraWidthOff:I=Fe.fluidAuraWidth,fluidCenter:E=Pe.fluidCenter,fluidCenterOff:X=Fe.fluidCenter,auroraFlow:A=Pe.auroraFlow,auroraFlowOff:ee=Fe.auroraFlow,hoverBrightness:ye=Pe.hoverBright,hoverBrightnessOff:q=Fe.hoverBright,trackCursorLight:N=!0,lightTrackingStrength:Y=Pe.lightTrack,lightTrackingStrengthOff:oe=Fe.lightTrack,clickShockwave:Q=!0,shockwaveStrength:V=Pe.clickWave,shockwaveStrengthOff:me=Fe.clickWave,...xe})=>{let D=(0,z.useId)(),[j,M]=(0,z.useState)(t),b=e!==void 0?e:j,B=(0,z.useRef)(null),_=(0,z.useRef)(null),W=(0,z.useRef)(null),ce=(0,z.useRef)({radius:16,refraction:b?o:l,thickness:b?s:c,bevelWidth:b?f:m,frost:b?p:v,dispersion:b?x:y,sheen:b?L:h,lightAngle:u,darkness:b?d:g,rim:b?w:C,fluidBright:b?T:k,fluidSpeed:b?O:F,fluidScale:b?K:J,fluidAuraWidth:b?P:I,fluidCenter:b?E:X,auroraFlow:b?A:ee,hoverBright:b?ye:q,lightTrack:N?b?Y:oe:0,clickWave:Q?b?V:me:0});(0,z.useEffect)(()=>{ce.current={...ce.current,refraction:b?o:l,thickness:b?s:c,bevelWidth:b?f:m,frost:b?p:v,dispersion:b?x:y,sheen:b?L:h,lightAngle:u,darkness:b?d:g,rim:b?w:C,fluidBright:b?T:k,fluidSpeed:b?O:F,fluidScale:b?K:J,fluidAuraWidth:b?P:I,fluidCenter:b?E:X,auroraFlow:b?A:ee,hoverBright:b?ye:q,lightTrack:N?b?Y:oe:0,clickWave:Q?b?V:me:0}},[b,o,l,s,c,f,m,p,v,x,y,L,h,u,d,g,w,C,T,k,O,F,K,J,P,I,E,X,A,ee,ye,q,N,Y,oe,Q,V,me]);let ke=()=>{if(a)return;let $=!b;e===void 0&&M($),n?.($)};return(0,z.useEffect)(()=>{let $=B.current,te=_.current;if(!$||!te)return;let _t=$.getContext("2d",{alpha:!0});if(!_t)return;let de=Rn(),re={id:D,canvas:$,ctx:_t,getParams:()=>{let Ce=$.height;return ce.current.radius=Ce*.5,ce.current},getSwitchThumb:()=>{let Ce=W.current;if(!Ce||!te)return null;let ct=Math.min(window.devicePixelRatio||1,2),Nt=te.getBoundingClientRect(),Pt=Ce.getBoundingClientRect();if(Pt.width<=0||Pt.height<=0)return null;let ii=(Pt.left+Pt.width*.5-(Nt.left+Nt.width*.5))*ct,Yd=(Nt.top+Nt.height*.5-(Pt.top+Pt.height*.5))*ct,$d=Pt.width*.5*ct,qd=Pt.height*.5*ct;return[ii,Yd,$d,qd]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},Ie=()=>{let Ce=Math.min(window.devicePixelRatio||1,2),ct=Math.round(te.offsetWidth*Ce),Nt=Math.round(te.offsetHeight*Ce);($.width!==ct||$.height!==Nt)&&($.width=ct,$.height=Nt)};Ie();let We=new ResizeObserver(Ie);We.observe(te);let ut=Ce=>{let ct=te.getBoundingClientRect(),Nt=ct.left+ct.width*.5,Pt=ct.top+ct.height*.5,ii=Math.min(window.devicePixelRatio||1,2);re.targetMouseX=(Ce.clientX-Nt)*ii,re.targetMouseY=(Pt-Ce.clientY)*ii},Ue=Ce=>{re.targetHover=1,ut(Ce)},nt=Ce=>{re.targetHover=1,ut(Ce)},yt=()=>{re.targetHover=0},Yt=Ce=>{ut(Ce),re.clickPos=[re.targetMouseX,re.targetMouseY],re.clickTime=de.getTime()};return te.addEventListener("pointerenter",Ue),te.addEventListener("pointermove",nt),te.addEventListener("pointerleave",yt),te.addEventListener("pointerdown",Yt),de.register(re),()=>{de.unregister(D),We.disconnect(),te.removeEventListener("pointerenter",Ue),te.removeEventListener("pointermove",nt),te.removeEventListener("pointerleave",yt),te.removeEventListener("pointerdown",Yt)}},[D]),(0,H.jsxs)("button",{ref:_,type:"button",role:"switch","aria-checked":b,disabled:a,onClick:ke,onKeyDown:$=>{($.key===" "||$.key==="Enter")&&($.preventDefault(),ke())},className:`tactile-switch ${b?"active":""} ${i}`.trim(),...xe,children:[(0,H.jsx)("canvas",{ref:B,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,H.jsx)("span",{ref:W,className:"switch-thumb"})]})},Hd=({items:e,value:t,defaultValue:n,onChange:r,size:i="xl",className:a="",refraction:o=Me.refraction,thickness:l=Me.thickness,bevelWidth:s=Me.bevelWidth,frost:c=Me.frost,dispersion:f=Me.dispersion,sheen:m=Me.sheen,lightAngle:p=Me.lightAngle,darkness:v=Me.darkness,rim:x=Me.rim,fluidBrightness:y=Me.fluidBright,fluidSpeed:L=Me.fluidSpeed,fluidScale:h=Me.fluidScale,fluidAuraWidth:u=Me.fluidAuraWidth,fluidCenter:d=Me.fluidCenter,auroraFlow:g=Me.auroraFlow,hoverBrightness:w=Me.hoverBright,trackCursorLight:C=!0,lightTrackingStrength:T=Me.lightTrack,clickShockwave:k=!0,shockwaveStrength:O=Me.clickWave,...F})=>{var K;let J=(0,z.useId)(),P=(0,z.useRef)(null),I=(0,z.useRef)(null),E=(0,z.useRef)(null),X=(0,z.useRef)(new Map),A=(0,z.useMemo)(()=>e.map(D=>typeof D=="string"?{value:D,label:D}:D),[e]),ee=n??((K=A[0])==null?void 0:K.value)??"",[ye,q]=(0,z.useState)(ee),N=t!==void 0?t:ye,[Y,oe]=(0,z.useState)({left:0,width:0,ready:!1}),Q=(0,z.useRef)({radius:16,refraction:o,thickness:l,bevelWidth:s,frost:c,dispersion:f,sheen:m,lightAngle:p,darkness:v,rim:x,fluidBright:y,fluidSpeed:L,fluidScale:h,fluidAuraWidth:u,fluidCenter:d,auroraFlow:g,hoverBright:w,lightTrack:C?T:0,clickWave:k?O:0});(0,z.useEffect)(()=>{Q.current={...Q.current,refraction:o,thickness:l,bevelWidth:s,frost:c,dispersion:f,sheen:m,lightAngle:p,darkness:v,rim:x,fluidBright:y,fluidSpeed:L,fluidScale:h,fluidAuraWidth:u,fluidCenter:d,auroraFlow:g,hoverBright:w,lightTrack:C?T:0,clickWave:k?O:0}},[o,l,s,c,f,m,p,v,x,y,L,h,u,d,g,w,C,T,k,O]);let V=(0,z.useCallback)(()=>{let D=X.current.get(N);D&&oe({left:D.offsetLeft,width:D.offsetWidth,ready:!0})},[N]);(0,z.useEffect)(()=>{V()},[V,A]),(0,z.useEffect)(()=>{let D=E.current,j=P.current;if(!D||!j)return;let M=D.getContext("2d",{alpha:!0});if(!M)return;let b=Rn(),B={id:J,canvas:D,ctx:M,getParams:()=>{let de=D.height;return Q.current.radius=de*.5,Q.current},getSwitchThumb:()=>{let de=I.current;if(!de||!j)return null;let re=Math.min(window.devicePixelRatio||1,2),Ie=j.getBoundingClientRect(),We=de.getBoundingClientRect();if(We.width<=0||We.height<=0)return null;let ut=(We.left+We.width*.5-(Ie.left+Ie.width*.5))*re,Ue=(Ie.top+Ie.height*.5-(We.top+We.height*.5))*re,nt=We.width*.5*re,yt=We.height*.5*re;return[ut,Ue,nt,yt]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},_=()=>{let de=Math.min(window.devicePixelRatio||1,2),re=Math.round(j.offsetWidth*de),Ie=Math.round(j.offsetHeight*de);re>0&&Ie>0&&(D.width!==re||D.height!==Ie)&&(D.width=re,D.height=Ie)};_();let W=null;typeof ResizeObserver<"u"&&(W=new ResizeObserver(()=>{V(),_()}),W.observe(j));let ce=de=>{let re=j.getBoundingClientRect(),Ie=re.left+re.width*.5,We=re.top+re.height*.5,ut=Math.min(window.devicePixelRatio||1,2);B.targetMouseX=(de.clientX-Ie)*ut,B.targetMouseY=(We-de.clientY)*ut},ke=de=>{B.targetHover=1,ce(de)},$=de=>{B.targetHover=1,ce(de)},te=()=>{B.targetHover=0},_t=de=>{ce(de),B.clickPos=[B.targetMouseX,B.targetMouseY],B.clickTime=b.getTime()};return j.addEventListener("pointerenter",ke),j.addEventListener("pointermove",$),j.addEventListener("pointerleave",te),j.addEventListener("pointerdown",_t),b.register(B),()=>{b.unregister(J),W&&W.disconnect(),j.removeEventListener("pointerenter",ke),j.removeEventListener("pointermove",$),j.removeEventListener("pointerleave",te),j.removeEventListener("pointerdown",_t)}},[J,V]);let me=(D,j)=>{j||(t===void 0&&q(D),r?.(D))},xe=D=>{var j,M;let b=A.filter(_=>!_.disabled);if(b.length<=1)return;let B=b.findIndex(_=>_.value===N);if(D.key==="ArrowRight"){D.preventDefault();let _=b[(B+1)%b.length];me(_.value),(j=X.current.get(_.value))==null||j.focus()}else if(D.key==="ArrowLeft"){D.preventDefault();let _=b[(B-1+b.length)%b.length];me(_.value),(M=X.current.get(_.value))==null||M.focus()}};return(0,H.jsxs)("div",{ref:P,role:"tablist","aria-label":F["aria-label"]||"Tabs",onKeyDown:xe,className:`tactile-tabs ${a}`.trim(),...F,children:[(0,H.jsx)("canvas",{ref:E,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,H.jsx)("span",{ref:I,"data-tabs-indicator":!0,"aria-hidden":"true",className:"tabs-indicator",style:{transform:`translateX(${Y.left}px)`,width:`${Y.width}px`,opacity:Y.ready?1:0}}),A.map(D=>{let j=D.value===N;return(0,H.jsxs)("button",{ref:M=>{M?X.current.set(D.value,M):X.current.delete(D.value)},type:"button",role:"tab","aria-selected":j,disabled:D.disabled,tabIndex:j?0:-1,onClick:()=>me(D.value,D.disabled),className:`tab-item ${j?"active":""}`.trim(),children:[D.icon&&(0,H.jsx)("span",{style:{display:"inline-flex",flexShrink:0},children:D.icon}),(0,H.jsx)("span",{children:D.label})]},D.value)})]})};var Od=({value:e,defaultValue:t="",placeholder:n="Ask anything, @ to mention, / for actions",onChange:r,onSubmit:i,onMentionClick:a,agentLabel:o="Agent",modeLabel:l,onAgentClick:s,onModeClick:c,className:f="",refraction:m=Ae.refraction,thickness:p=Ae.thickness,bevelWidth:v=Ae.bevelWidth,frost:x=Ae.frost,dispersion:y=Ae.dispersion,sheen:L=Ae.sheen,lightAngle:h=Ae.lightAngle,darkness:u=Ae.darkness,rim:d=Ae.rim,fluidBrightness:g=Ae.fluidBright,fluidSpeed:w=Ae.fluidSpeed,fluidScale:C=Ae.fluidScale,fluidAuraWidth:T=Ae.fluidAuraWidth,fluidCenter:k=Ae.fluidCenter,auroraFlow:O=Ae.auroraFlow,hoverBrightness:F=Ae.hoverBright,trackCursorLight:K=!0,lightTrackingStrength:J=Ae.lightTrack,clickShockwave:P=!0,shockwaveStrength:I=Ae.clickWave})=>{let E=(0,z.useId)(),X=(0,z.useRef)(null),A=(0,z.useRef)(null),ee=(0,z.useRef)(null),[ye,q]=(0,z.useState)(t),N=e!==void 0?e:ye,Y=(0,z.useRef)({radius:24,refraction:m,thickness:p,bevelWidth:v,frost:x,dispersion:y,sheen:L,lightAngle:h,darkness:u,rim:d,fluidBright:g,fluidSpeed:w,fluidScale:C,fluidAuraWidth:T,fluidCenter:k,auroraFlow:O,hoverBright:F,lightTrack:K?J:0,clickWave:P?I:0});(0,z.useEffect)(()=>{Y.current={...Y.current,refraction:m,thickness:p,bevelWidth:v,frost:x,dispersion:y,sheen:L,lightAngle:h,darkness:u,rim:d,fluidBright:g,fluidSpeed:w,fluidScale:C,fluidAuraWidth:T,fluidCenter:k,auroraFlow:O,hoverBright:F,lightTrack:K?J:0,clickWave:P?I:0}},[m,p,v,x,y,L,h,u,d,g,w,C,T,k,O,F,K,J,P,I]),(0,z.useEffect)(()=>{let _=X.current,W=A.current;if(!_||!W)return;let ce=W.getContext("2d",{alpha:!0});if(!ce)return;let ke=Rn(),$={id:E,canvas:W,ctx:ce,getParams:()=>Y.current,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,curHover:0,targetHover:0,clickPos:[-999,-999],clickTime:-999,visible:!0},te=()=>{if(!_||!W)return;let Ue=_.getBoundingClientRect(),nt=Math.min(window.devicePixelRatio||1,2),yt=Math.round(Ue.width*nt),Yt=Math.round(Ue.height*nt);(W.width!==yt||W.height!==Yt)&&(W.width=yt,W.height=Yt),Y.current.radius=Math.min(24*nt,Math.min(yt,Yt)*.5)};te();let _t=new ResizeObserver(()=>{te()});_t.observe(_);let de=Ue=>{$.targetHover=1,ut(Ue)},re=Ue=>{$.targetHover=1,ut(Ue)},Ie=()=>{$.targetHover=0},We=Ue=>{ut(Ue),$.clickPos=[$.targetMouseX,$.targetMouseY],$.clickTime=ke.getTime()},ut=Ue=>{if(!_)return;let nt=_.getBoundingClientRect(),yt=Math.min(window.devicePixelRatio||1,2),Yt=nt.left+nt.width*.5,Ce=nt.top+nt.height*.5;$.targetMouseX=(Ue.clientX-Yt)*yt,$.targetMouseY=(Ce-Ue.clientY)*yt};return _.addEventListener("pointerenter",de),_.addEventListener("pointermove",re),_.addEventListener("pointerleave",Ie),_.addEventListener("pointerdown",We),ke.register($),()=>{ke.unregister(E),_t.disconnect(),_.removeEventListener("pointerenter",de),_.removeEventListener("pointermove",re),_.removeEventListener("pointerleave",Ie),_.removeEventListener("pointerdown",We)}},[E]);let oe=()=>{let _=ee.current;if(_){_.style.height="auto";let W=parseFloat(window.getComputedStyle(_).maxHeight)||160;_.style.height=`${Math.min(_.scrollHeight,W)}px`}},Q=_=>{let W=_.target.value;e===void 0&&q(W),r?.(W),oe()},V=_=>{_.key==="Enter"&&!_.shiftKey&&(_.preventDefault(),B())},[me,xe]=(0,z.useState)(0),D=[{label:o,placeholder:n},{label:"Plan",placeholder:"Plan architecture, @ to mention, / for actions"},{label:"Ask",placeholder:"Ask a question, @ to mention, / for actions"}],j=D[me%D.length],M=()=>{var _;if(a){a();return}(_=ee.current)==null||_.focus()},b=()=>{if(s){s();return}xe(_=>(_+1)%D.length)},B=()=>{N.trim()&&(i?.(N),e===void 0&&(q(""),requestAnimationFrame(()=>oe())))};return(0,H.jsxs)("div",{ref:X,className:`tactile-prompt-box ${f}`.trim(),children:[(0,H.jsx)("canvas",{ref:A,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,H.jsxs)("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:"var(--space-16)",width:"100%"},children:[(0,H.jsx)("div",{className:"prompt-body",children:(0,H.jsx)("textarea",{ref:ee,value:N,onChange:Q,onKeyDown:V,placeholder:j.placeholder,rows:1,className:"prompt-textarea"})}),(0,H.jsxs)("div",{className:"prompt-bottom-bar",children:[(0,H.jsxs)("div",{className:"prompt-pills-row",children:[(0,H.jsx)("button",{type:"button",onClick:M,"aria-label":"Add context",className:"prompt-mention-btn",children:(0,H.jsxs)("svg",{className:"prompt-submit-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,H.jsx)("path",{d:"M5 12h14"}),(0,H.jsx)("path",{d:"M12 5v14"})]})}),(0,H.jsx)("button",{type:"button",onClick:b,className:"prompt-pill",children:(0,H.jsx)("span",{className:"prompt-pill-label",children:j.label})}),l&&(0,H.jsx)("button",{type:"button",onClick:c,className:"prompt-pill",children:(0,H.jsx)("span",{className:"prompt-pill-label",children:l})})]}),(0,H.jsx)("button",{type:"button",onClick:B,"aria-label":"Submit prompt",disabled:!N.trim(),className:"prompt-submit-btn",children:(0,H.jsxs)("svg",{className:"prompt-submit-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,H.jsx)("path",{d:"m5 12 7-7 7 7"}),(0,H.jsx)("path",{d:"M12 19V5"})]})})]})]})]})};var Nf=({children:e,cycleWords:t,className:n="",style:r,onClick:i,refraction:a=Le.refraction,thickness:o=Le.thickness,bevelWidth:l=Le.bevelWidth,frost:s=Le.frost,dispersion:c=Le.dispersion,sheen:f=Le.sheen,lightAngle:m=Le.lightAngle,darkness:p=Le.darkness,rim:v=Le.rim,fluidBrightness:x=Le.fluidBright,fluidSpeed:y=Le.fluidSpeed,fluidScale:L=Le.fluidScale,fluidAuraWidth:h=Le.fluidAuraWidth,fluidCenter:u=Le.fluidCenter,auroraFlow:d=Le.auroraFlow,hoverBrightness:g=Le.hoverBright,trackCursorLight:w=!0,lightTrackingStrength:C=Le.lightTrack,clickShockwave:T=!0,shockwaveStrength:k=Le.clickWave,...O})=>{let F=(0,z.useId)(),K=(0,z.useRef)(null),J=(0,z.useRef)(null),[P,I]=(0,z.useState)(0),E=t&&t.length>0?t[P%t.length]:e,X=typeof E=="string"?E:String(E??""),A=(0,z.useRef)({radius:0,refraction:a,thickness:o,bevelWidth:l,frost:s,dispersion:c,sheen:f,lightAngle:m,darkness:p,rim:v,fluidBright:x,fluidSpeed:y,fluidScale:L,fluidAuraWidth:h,fluidCenter:u,auroraFlow:d,hoverBright:g,lightTrack:w?C:0,clickWave:T?k:0}),ee=(0,z.useRef)(null);(0,z.useEffect)(()=>{A.current={...A.current,refraction:a,thickness:o,bevelWidth:l,frost:s,dispersion:c,sheen:f,lightAngle:m,darkness:p,rim:v,fluidBright:x,fluidSpeed:y,fluidScale:L,fluidAuraWidth:h,fluidCenter:u,auroraFlow:d,hoverBright:g,lightTrack:w?C:0,clickWave:T?k:0}},[a,o,l,s,c,f,m,p,v,x,y,L,h,u,d,g,w,C,T,k]),(0,z.useEffect)(()=>{let N=K.current,Y=J.current;if(!N||!Y)return;let oe=Y.getContext("2d",{alpha:!0});if(!oe)return;let Q=Rn(),V={id:F,canvas:Y,ctx:oe,textMask:X,getParams:()=>A.current,curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0};ee.current=V;let me=()=>{let W=Math.min(window.devicePixelRatio||1,2),ce=16,ke=Math.round((N.offsetWidth+ce*2)*W),$=Math.round((N.offsetHeight+ce*2)*W);(Y.width!==ke||Y.height!==$)&&(Y.width=ke,Y.height=$);let te=window.getComputedStyle(N),_t=parseFloat(te.fontSize)*W;V.textFont=`${te.fontWeight} ${_t}px ${te.fontFamily}`,V.textLetterSpacing=te.letterSpacing||"normal",V.textMask=X};me();let xe=null;typeof ResizeObserver<"u"&&(xe=new ResizeObserver(()=>me()),xe.observe(N));let D=null;typeof IntersectionObserver<"u"&&(D=new IntersectionObserver(([W])=>{V.visible=W.isIntersecting}),D.observe(N));let j=W=>{let ce=N.getBoundingClientRect(),ke=ce.left+ce.width*.5,$=ce.top+ce.height*.5,te=Math.min(window.devicePixelRatio||1,2);V.targetMouseX=(W.clientX-ke)*te,V.targetMouseY=($-W.clientY)*te},M=W=>{V.targetHover=1,j(W)},b=W=>{V.targetHover=1,j(W)},B=()=>{V.targetHover=0},_=W=>{j(W),V.clickPos=[V.targetMouseX,V.targetMouseY],V.clickTime=Q.getTime()};return N.addEventListener("pointerenter",M),N.addEventListener("pointermove",b),N.addEventListener("pointerleave",B),N.addEventListener("pointerdown",_),Q.register(V),()=>{Q.unregister(F),N.removeEventListener("pointerenter",M),N.removeEventListener("pointermove",b),N.removeEventListener("pointerleave",B),N.removeEventListener("pointerdown",_),xe&&xe.disconnect(),D&&D.disconnect()}},[F,X]);let ye=N=>{t&&t.length>1&&I(Y=>Y+1),i&&i(N)},q=!!(t&&t.length>1)||!!i;return(0,H.jsxs)("span",{ref:K,className:`tactile-glass-word ${n}`.trim(),style:{position:"relative",display:"inline-flex",alignItems:"baseline",justifyContent:"center",verticalAlign:"baseline",margin:0,padding:0,lineHeight:"inherit",border:"none",background:"transparent",userSelect:"none",cursor:q?"pointer":"default",WebkitTapHighlightColor:"transparent",...r},onClick:ye,...O,children:[(0,H.jsx)("canvas",{ref:J,"aria-hidden":"true",style:{position:"absolute",inset:"calc(var(--space-16) * -1)",width:"calc(100% + var(--space-32))",height:"calc(100% + var(--space-32))",pointerEvents:"none",zIndex:2}}),(0,H.jsx)("span",{style:{opacity:0,pointerEvents:"none",userSelect:"none",fontWeight:"inherit",letterSpacing:"inherit"},children:E})]})},jd=({level:e="h1",size:t="hero",align:n="center",title:r,highlight:i,highlightCycle:a,subtitle:o,badge:l,wordProps:s,className:c="",children:f,...m})=>{let p=e,v=()=>{if(!r)return null;if(!i&&(!a||a.length===0))return r;let x=[];if(Array.isArray(i)?x.push(...i):typeof i=="string"&&x.push(i),a&&a.length>0&&!x.includes(a[0])&&x.push(a[0]),x.length===0)return r;let y=new RegExp(`(${x.map(L=>L.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})`,"gi");return r.split(y).map((L,h)=>x.find(u=>u.toLowerCase()===L.toLowerCase())?(0,H.jsx)(Nf,{cycleWords:a&&a.length>0?a:void 0,...s,children:L},h):(0,H.jsx)(z.default.Fragment,{children:L},h))};return(0,H.jsxs)("div",{className:`tactile-heading-container ${c}`.trim(),style:{display:"flex",flexDirection:"column",maxWidth:"var(--heading-max-w)",alignItems:n==="left"?"flex-start":n==="right"?"flex-end":"center",textAlign:n},children:[l&&(0,H.jsx)("div",{className:"tactile-heading-badge",style:{marginBottom:"var(--space-16)",display:"inline-flex",alignItems:"center"},children:l}),(0,H.jsx)(p,{className:"tactile-heading-title display-heading",style:{fontFamily:"var(--font-sans)",color:"var(--text-primary)",fontSize:t==="sm"?"var(--font-size-xl)":t==="md"?"var(--font-size-2xl)":"var(--font-size-display)",fontWeight:"var(--font-weight-extrabold)",lineHeight:t==="md"?"var(--line-height-2xl)":"var(--line-height-none)",letterSpacing:"var(--letter-spacing-display)",textAlign:n,margin:0},...m,children:f||v()}),o&&(0,H.jsx)("p",{className:"tactile-heading-subtitle",style:{fontSize:"var(--font-size-md)",color:"var(--text-secondary)",maxWidth:"var(--subtitle-max-w)",marginTop:t==="sm"?"var(--space-8)":t==="md"?"var(--space-12)":"var(--space-16)",textAlign:n},children:o})]})};var Xd=({children:e,radius:t,className:n="",style:r,refraction:i=Re.refraction,thickness:a=Re.thickness,bevelWidth:o=Re.bevelWidth,frost:l=Re.frost,dispersion:s=Re.dispersion,sheen:c=Re.sheen,lightAngle:f=Re.lightAngle,darkness:m=Re.darkness,rim:p=Re.rim,fluidBrightness:v=Re.fluidBright,fluidSpeed:x=Re.fluidSpeed,fluidScale:y=Re.fluidScale,fluidAuraWidth:L=Re.fluidAuraWidth,fluidCenter:h=Re.fluidCenter,auroraFlow:u=Re.auroraFlow,hoverBrightness:d=Re.hoverBright,trackCursorLight:g=!0,lightTrackingStrength:w=Re.lightTrack,clickShockwave:C=!0,shockwaveStrength:T=Re.clickWave,...k})=>{let O=(0,z.useId)(),F=(0,z.useRef)(null),K=(0,z.useRef)(null),J=(0,z.useRef)({radius:t??16,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:s,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:v,fluidSpeed:x,fluidScale:y,fluidAuraWidth:L,fluidCenter:h,auroraFlow:u,hoverBright:d,lightTrack:g?w:0,clickWave:C?T:0});return(0,z.useEffect)(()=>{J.current={...J.current,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:s,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:v,fluidSpeed:x,fluidScale:y,fluidAuraWidth:L,fluidCenter:h,auroraFlow:u,hoverBright:d,lightTrack:g?w:0,clickWave:C?T:0}},[i,a,o,l,s,c,f,m,p,v,x,y,L,h,u,d,g,w,C,T]),(0,z.useEffect)(()=>{let P=F.current,I=K.current;if(!P||!I)return;let E=I.getContext("2d",{alpha:!0});if(!E)return;let X=Rn(),A={id:O,canvas:I,ctx:E,getParams:()=>{let M=Math.min(window.devicePixelRatio||1,2),b=Math.min(I.width,I.height)*.5,B=parseFloat(window.getComputedStyle(P).borderRadius),_=t!==void 0?t:Number.isFinite(B)?B:16;return J.current.radius=Math.min(_*M,b),J.current},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},ee=()=>{let M=Math.min(window.devicePixelRatio||1,2),b=Math.round(P.offsetWidth*M),B=Math.round(P.offsetHeight*M);(I.width!==b||I.height!==B)&&(I.width=b,I.height=B)};ee();let ye=new ResizeObserver(ee);ye.observe(P);let q=null;typeof IntersectionObserver<"u"&&(q=new IntersectionObserver(([M])=>{A.visible=M.isIntersecting}),q.observe(P));let N=M=>{let b=P.getBoundingClientRect(),B=b.left+b.width*.5,_=b.top+b.height*.5,W=Math.min(window.devicePixelRatio||1,2);A.targetMouseX=(M.clientX-B)*W,A.targetMouseY=(_-M.clientY)*W},Y=M=>{if(!(M instanceof Element)||M===P)return!1;let b=M.closest("button, a, [role='button'], [role='switch'], [role='tab'], .tactile-card, .tactile-prompt-box, .tactile-audio-player");return!!(b&&P.contains(b))},oe=M=>{if(N(M),Y(M.target)){A.targetHover=0;return}A.targetHover=1},Q=M=>{if(N(M),Y(M.target)){A.targetHover=0;return}A.targetHover=1},V=M=>{M.pointerType!=="touch"&&(A.targetHover=0)},me=M=>{Y(M.target)||(N(M),A.targetHover=1,A.clickPos=[A.targetMouseX,A.targetMouseY],A.clickTime=X.getTime())},xe=M=>{let b=M.touches[0];if(b){if(N(b),Y(M.target)){A.targetHover=0;return}A.targetHover=1}},D=M=>{let b=M.touches[0];if(!b)return;N(b);let B=document.elementFromPoint(b.clientX,b.clientY);if(!B||!P.contains(B)||Y(B)){A.targetHover=0;return}A.targetHover=1},j=()=>{A.targetHover=0};return P.addEventListener("pointerenter",oe),P.addEventListener("pointermove",Q),P.addEventListener("pointerleave",V),P.addEventListener("pointercancel",V),P.addEventListener("pointerdown",me),P.addEventListener("touchstart",xe,{passive:!0}),P.addEventListener("touchmove",D,{passive:!0}),P.addEventListener("touchend",j,{passive:!0}),P.addEventListener("touchcancel",j,{passive:!0}),X.register(A),()=>{X.unregister(O),ye.disconnect(),q&&q.disconnect(),P.removeEventListener("pointerenter",oe),P.removeEventListener("pointermove",Q),P.removeEventListener("pointerleave",V),P.removeEventListener("pointercancel",V),P.removeEventListener("pointerdown",me),P.removeEventListener("touchstart",xe),P.removeEventListener("touchmove",D),P.removeEventListener("touchend",j),P.removeEventListener("touchcancel",j)}},[O,t]),(0,H.jsxs)("div",{ref:F,className:`tactile-background ${n}`.trim(),style:{position:"relative",width:"100%",minHeight:"var(--bg-panel-min-h)",padding:"var(--bg-panel-pad)",borderRadius:t!==void 0?`${t}px`:"var(--bg-panel-radius)",border:"none",background:"transparent",outline:"none",boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",WebkitTapHighlightColor:"transparent",...r},...k,children:[(0,H.jsx)("canvas",{ref:K,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,borderRadius:"inherit"}}),(0,H.jsx)("div",{style:{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:e})]})};var Qe=e=>document.getElementById(e),Gd=matchMedia("(prefers-reduced-motion: reduce)"),Ff=[{value:"market",label:"\u0420\u044B\u043D\u043E\u043A \u043E\u0431\u043B\u0438\u0433\u0430\u0446\u0438\u0439"},{value:"chat",label:"\u0421\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0430"}];function Df(){if(Gd.matches||navigator.connection?.saveData)return!1;let e=document.createElement("canvas").getContext("webgl2",{failIfMajorPerformanceCaveat:!0});return e?(e.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}function ur(e,t){let n=document.createElement("div");return n.id=t,e.before(n),n}function If(){if(!Df())return;let e=ur(document.querySelector(".nav nav"),"optical-nav"),t=ur(Qe("themeToggle"),"optical-switch"),n=ur(Qe("pageTitle"),"optical-heading"),r=ur(Qe("newChat"),"optical-action"),i=ur(Qe("askForm"),"optical-prompt"),a=document.createElement("div");document.body.append(a);let o,l=(0,Vd.createRoot)(a);function s(){let[y,L]=(0,De.useState)(""),u=Qe("chat").classList.contains("hide")?"market":"chat",d=Qe("pageTitle").textContent,g=Qe("chatEngine"),w=Qe("newChat").disabled;function C(){document.querySelector("[data-tab=market]").click(),openSearch(),Qe("query").focus()}(0,De.useLayoutEffect)(()=>{document.body.classList.add("optical");let k=i.querySelector("textarea");k&&(k.maxLength=2e3,k.setAttribute("aria-label","\u0412\u043E\u043F\u0440\u043E\u0441 \u0430\u0433\u0435\u043D\u0442\u0443"),i.querySelector(".prompt-mention-btn").setAttribute("aria-label","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u044B\u043F\u0443\u0441\u043A"),i.querySelector(".prompt-submit-btn").setAttribute("aria-label","\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441"))});let T=Qe("market-material");return De.default.createElement(De.default.Fragment,null,u==="market"&&T&&(0,mn.createPortal)(De.default.createElement(Xd,{radius:22,frost:3,dispersion:12,fluidBrightness:28,className:"market-background"}),T),(0,mn.createPortal)(De.default.createElement(Hd,{"aria-label":"\u0420\u0430\u0437\u0434\u0435\u043B\u044B",dispersion:18,items:Ff,value:u,onChange:k=>document.querySelector('[data-tab="'+k+'"]').click()}),e),(0,mn.createPortal)(De.default.createElement(Ud,{checked:document.documentElement.dataset.theme==="dark","aria-label":"\u0422\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430",onChange:()=>Qe("themeToggle").click()}),t),(0,mn.createPortal)(De.default.createElement(jd,{wordProps:{dispersion:16,fluidBrightness:64},level:"h1",size:"sm",title:d,highlight:d.split(" ").at(-1)}),n),u==="chat"&&(0,mn.createPortal)(De.default.createElement(Wd,{disabled:w,onClick:()=>{Qe("newChat").click(),L(""),i.querySelector("textarea")?.focus()}},"\u041D\u043E\u0432\u044B\u0439 \u0434\u0438\u0430\u043B\u043E\u0433"),r),u==="chat"&&(0,mn.createPortal)(De.default.createElement(Od,{dispersion:20,value:y,onChange:k=>L(k.slice(0,2e3)),placeholder:"\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u043E\u0431 \u043E\u0431\u043B\u0438\u0433\u0430\u0446\u0438\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u2026",agentLabel:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u044B\u043F\u0443\u0441\u043A",onMentionClick:C,onAgentClick:C,modeLabel:g.selectedOptions[0]?.text,onModeClick:()=>{g.disabled||(g.value=g.value==="auto"?"archive":"auto",g.dispatchEvent(new Event("change")))},onSubmit:k=>{w||!k.trim()||state.id&&!data||(L(""),ask(k.trim()))}}),i),o&&(0,mn.createPortal)(De.default.createElement(Id,{refraction:48,thickness:24,bevelWidth:3,frost:4,dispersion:32,className:"optical-risk"},De.default.createElement("strong",{role:"heading","aria-level":"2"},De.default.createElement("span",{className:"signal-dot","aria-hidden":"true"}),o.nextElementSibling?.textContent)),o))}function c(){l.render(De.default.createElement(s,null))}function f(){let y=document.querySelector("#bondRadar h2,#bondRadar h3");y&&o?.nextElementSibling!==y?o=ur(y,"optical-risk-title"):y||(o=null),c()}let m=new MutationObserver(f);m.observe(Qe("detail"),{childList:!0});let p=new MutationObserver(c);p.observe(Qe("marketHome"),{childList:!0});let v=new MutationObserver(c);v.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),window.addEventListener("radar-view",c);function x(){let y=i.querySelector("textarea")?.value;y!==void 0&&(Qe("question").value=y),m.disconnect(),p.disconnect(),v.disconnect(),window.removeEventListener("radar-view",c),l.unmount(),document.body.classList.remove("optical");for(let L of[e,t,n,r,i,o,a])L?.remove()}Gd.addEventListener("change",x,{once:!0}),f()}If();})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
