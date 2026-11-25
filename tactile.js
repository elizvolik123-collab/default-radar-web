(()=>{var $d=Object.create;var Ql=Object.defineProperty;var qd=Object.getOwnPropertyDescriptor;var Qd=Object.getOwnPropertyNames;var Kd=Object.getPrototypeOf,Zd=Object.prototype.hasOwnProperty;var Nt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Jd=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Qd(t))!Zd.call(e,i)&&i!==n&&Ql(e,i,{get:()=>t[i],enumerable:!(r=qd(t,i))||r.enumerable});return e};var ur=(e,t,n)=>(n=e!=null?$d(Kd(e)):{},Jd(t||!e||!e.__esModule?Ql(n,"default",{value:e,enumerable:!0}):n,e));var ss=Nt(V=>{"use strict";var cr=Symbol.for("react.element"),eh=Symbol.for("react.portal"),th=Symbol.for("react.fragment"),nh=Symbol.for("react.strict_mode"),rh=Symbol.for("react.profiler"),ih=Symbol.for("react.provider"),ah=Symbol.for("react.context"),oh=Symbol.for("react.forward_ref"),lh=Symbol.for("react.suspense"),sh=Symbol.for("react.memo"),uh=Symbol.for("react.lazy"),Kl=Symbol.iterator;function ch(e){return e===null||typeof e!="object"?null:(e=Kl&&e[Kl]||e["@@iterator"],typeof e=="function"?e:null)}var es={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ts=Object.assign,ns={};function Ln(e,t,n){this.props=e,this.context=t,this.refs=ns,this.updater=n||es}Ln.prototype.isReactComponent={};Ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function rs(){}rs.prototype=Ln.prototype;function Pa(e,t,n){this.props=e,this.context=t,this.refs=ns,this.updater=n||es}var Ma=Pa.prototype=new rs;Ma.constructor=Pa;ts(Ma,Ln.prototype);Ma.isPureReactComponent=!0;var Zl=Array.isArray,is=Object.prototype.hasOwnProperty,Aa={current:null},as={key:!0,ref:!0,__self:!0,__source:!0};function os(e,t,n){var r,i={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)is.call(t,r)&&!as.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var s=Array(l),c=0;c<l;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:cr,type:e,key:a,ref:o,props:i,_owner:Aa.current}}function dh(e,t){return{$$typeof:cr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function La(e){return typeof e=="object"&&e!==null&&e.$$typeof===cr}function hh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Jl=/\/+/g;function _a(e,t){return typeof e=="object"&&e!==null&&e.key!=null?hh(""+e.key):t.toString(36)}function ai(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case cr:case eh:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+_a(o,0):r,Zl(i)?(n="",e!=null&&(n=e.replace(Jl,"$&/")+"/"),ai(i,t,n,"",function(c){return c})):i!=null&&(La(i)&&(i=dh(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Jl,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",Zl(e))for(var l=0;l<e.length;l++){a=e[l];var s=r+_a(a,l);o+=ai(a,t,n,s,i)}else if(s=ch(e),typeof s=="function")for(e=s.call(e),l=0;!(a=e.next()).done;)a=a.value,s=r+_a(a,l++),o+=ai(a,t,n,s,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ii(e,t,n){if(e==null)return e;var r=[],i=0;return ai(e,r,"","",function(a){return t.call(n,a,i++)}),r}function ph(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ve={current:null},oi={transition:null},fh={ReactCurrentDispatcher:Ve,ReactCurrentBatchConfig:oi,ReactCurrentOwner:Aa};function ls(){throw Error("act(...) is not supported in production builds of React.")}V.Children={map:ii,forEach:function(e,t,n){ii(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ii(e,function(){t++}),t},toArray:function(e){return ii(e,function(t){return t})||[]},only:function(e){if(!La(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};V.Component=Ln;V.Fragment=th;V.Profiler=rh;V.PureComponent=Pa;V.StrictMode=nh;V.Suspense=lh;V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fh;V.act=ls;V.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ts({},e.props),i=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=Aa.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)is.call(t,s)&&!as.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){l=Array(s);for(var c=0;c<s;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:cr,type:e.type,key:i,ref:a,props:r,_owner:o}};V.createContext=function(e){return e={$$typeof:ah,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ih,_context:e},e.Consumer=e};V.createElement=os;V.createFactory=function(e){var t=os.bind(null,e);return t.type=e,t};V.createRef=function(){return{current:null}};V.forwardRef=function(e){return{$$typeof:oh,render:e}};V.isValidElement=La;V.lazy=function(e){return{$$typeof:uh,_payload:{_status:-1,_result:e},_init:ph}};V.memo=function(e,t){return{$$typeof:sh,type:e,compare:t===void 0?null:t}};V.startTransition=function(e){var t=oi.transition;oi.transition={};try{e()}finally{oi.transition=t}};V.unstable_act=ls;V.useCallback=function(e,t){return Ve.current.useCallback(e,t)};V.useContext=function(e){return Ve.current.useContext(e)};V.useDebugValue=function(){};V.useDeferredValue=function(e){return Ve.current.useDeferredValue(e)};V.useEffect=function(e,t){return Ve.current.useEffect(e,t)};V.useId=function(){return Ve.current.useId()};V.useImperativeHandle=function(e,t,n){return Ve.current.useImperativeHandle(e,t,n)};V.useInsertionEffect=function(e,t){return Ve.current.useInsertionEffect(e,t)};V.useLayoutEffect=function(e,t){return Ve.current.useLayoutEffect(e,t)};V.useMemo=function(e,t){return Ve.current.useMemo(e,t)};V.useReducer=function(e,t,n){return Ve.current.useReducer(e,t,n)};V.useRef=function(e){return Ve.current.useRef(e)};V.useState=function(e){return Ve.current.useState(e)};V.useSyncExternalStore=function(e,t,n){return Ve.current.useSyncExternalStore(e,t,n)};V.useTransition=function(){return Ve.current.useTransition()};V.version="18.3.1"});var dr=Nt((Wf,us)=>{"use strict";us.exports=ss()});var xs=Nt(re=>{"use strict";function Na(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,i=e[r];if(0<li(i,t))e[r]=t,e[n]=i,n=r;else break e}}function yt(e){return e.length===0?null:e[0]}function ui(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length,a=i>>>1;r<a;){var o=2*(r+1)-1,l=e[o],s=o+1,c=e[s];if(0>li(l,n))s<i&&0>li(c,l)?(e[r]=c,e[s]=n,r=s):(e[r]=l,e[o]=n,r=o);else if(s<i&&0>li(c,n))e[r]=c,e[s]=n,r=s;else break e}}return t}function li(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(cs=performance,re.unstable_now=function(){return cs.now()}):(Ra=Date,ds=Ra.now(),re.unstable_now=function(){return Ra.now()-ds});var cs,Ra,ds,Pt=[],Yt=[],gh=1,ct=null,We=3,ci=!1,gn=!1,pr=!1,fs=typeof setTimeout=="function"?setTimeout:null,gs=typeof clearTimeout=="function"?clearTimeout:null,hs=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Fa(e){for(var t=yt(Yt);t!==null;){if(t.callback===null)ui(Yt);else if(t.startTime<=e)ui(Yt),t.sortIndex=t.expirationTime,Na(Pt,t);else break;t=yt(Yt)}}function Da(e){if(pr=!1,Fa(e),!gn)if(yt(Pt)!==null)gn=!0,Wa(Ia);else{var t=yt(Yt);t!==null&&Ua(Da,t.startTime-e)}}function Ia(e,t){gn=!1,pr&&(pr=!1,gs(fr),fr=-1),ci=!0;var n=We;try{for(Fa(t),ct=yt(Pt);ct!==null&&(!(ct.expirationTime>t)||e&&!ys());){var r=ct.callback;if(typeof r=="function"){ct.callback=null,We=ct.priorityLevel;var i=r(ct.expirationTime<=t);t=re.unstable_now(),typeof i=="function"?ct.callback=i:ct===yt(Pt)&&ui(Pt),Fa(t)}else ui(Pt);ct=yt(Pt)}if(ct!==null)var a=!0;else{var o=yt(Yt);o!==null&&Ua(Da,o.startTime-t),a=!1}return a}finally{ct=null,We=n,ci=!1}}var di=!1,si=null,fr=-1,ms=5,vs=-1;function ys(){return!(re.unstable_now()-vs<ms)}function za(){if(si!==null){var e=re.unstable_now();vs=e;var t=!0;try{t=si(!0,e)}finally{t?hr():(di=!1,si=null)}}else di=!1}var hr;typeof hs=="function"?hr=function(){hs(za)}:typeof MessageChannel<"u"?(Ba=new MessageChannel,ps=Ba.port2,Ba.port1.onmessage=za,hr=function(){ps.postMessage(null)}):hr=function(){fs(za,0)};var Ba,ps;function Wa(e){si=e,di||(di=!0,hr())}function Ua(e,t){fr=fs(function(){e(re.unstable_now())},t)}re.unstable_IdlePriority=5;re.unstable_ImmediatePriority=1;re.unstable_LowPriority=4;re.unstable_NormalPriority=3;re.unstable_Profiling=null;re.unstable_UserBlockingPriority=2;re.unstable_cancelCallback=function(e){e.callback=null};re.unstable_continueExecution=function(){gn||ci||(gn=!0,Wa(Ia))};re.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ms=0<e?Math.floor(1e3/e):5};re.unstable_getCurrentPriorityLevel=function(){return We};re.unstable_getFirstCallbackNode=function(){return yt(Pt)};re.unstable_next=function(e){switch(We){case 1:case 2:case 3:var t=3;break;default:t=We}var n=We;We=t;try{return e()}finally{We=n}};re.unstable_pauseExecution=function(){};re.unstable_requestPaint=function(){};re.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=We;We=e;try{return t()}finally{We=n}};re.unstable_scheduleCallback=function(e,t,n){var r=re.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}return i=n+i,e={id:gh++,callback:t,priorityLevel:e,startTime:n,expirationTime:i,sortIndex:-1},n>r?(e.sortIndex=n,Na(Yt,e),yt(Pt)===null&&e===yt(Yt)&&(pr?(gs(fr),fr=-1):pr=!0,Ua(Da,n-r))):(e.sortIndex=i,Na(Pt,e),gn||ci||(gn=!0,Wa(Ia))),e};re.unstable_shouldYield=ys;re.unstable_wrapCallback=function(e){var t=We;return function(){var n=We;We=t;try{return e.apply(this,arguments)}finally{We=n}}}});var ks=Nt((Hf,ws)=>{"use strict";ws.exports=xs()});var Cd=Nt(ot=>{"use strict";var mh=dr(),it=ks();function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Pu=new Set,Fr={};function Pn(e,t){Zn(e,t),Zn(e+"Capture",t)}function Zn(e,t){for(Fr[e]=t,e=0;e<t.length;e++)Pu.add(t[e])}var Ht=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),uo=Object.prototype.hasOwnProperty,vh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bs={},Ss={};function yh(e){return uo.call(Ss,e)?!0:uo.call(bs,e)?!1:vh.test(e)?Ss[e]=!0:(bs[e]=!0,!1)}function xh(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function wh(e,t,n,r){if(t===null||typeof t>"u"||xh(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function $e(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Be={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Be[e]=new $e(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Be[t]=new $e(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Be[e]=new $e(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Be[e]=new $e(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Be[e]=new $e(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Be[e]=new $e(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Be[e]=new $e(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Be[e]=new $e(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Be[e]=new $e(e,5,!1,e.toLowerCase(),null,!1,!1)});var nl=/[\-:]([a-z])/g;function rl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(nl,rl);Be[t]=new $e(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(nl,rl);Be[t]=new $e(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(nl,rl);Be[t]=new $e(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Be[e]=new $e(e,1,!1,e.toLowerCase(),null,!1,!1)});Be.xlinkHref=new $e("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Be[e]=new $e(e,1,!1,e.toLowerCase(),null,!0,!0)});function il(e,t,n,r){var i=Be.hasOwnProperty(t)?Be[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(wh(t,n,i,r)&&(n=null),r||i===null?yh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Vt=mh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,hi=Symbol.for("react.element"),Bn=Symbol.for("react.portal"),Nn=Symbol.for("react.fragment"),al=Symbol.for("react.strict_mode"),co=Symbol.for("react.profiler"),Mu=Symbol.for("react.provider"),Au=Symbol.for("react.context"),ol=Symbol.for("react.forward_ref"),ho=Symbol.for("react.suspense"),po=Symbol.for("react.suspense_list"),ll=Symbol.for("react.memo"),qt=Symbol.for("react.lazy"),Lu=Symbol.for("react.offscreen"),Ts=Symbol.iterator;function gr(e){return e===null||typeof e!="object"?null:(e=Ts&&e[Ts]||e["@@iterator"],typeof e=="function"?e:null)}var pe=Object.assign,Ha;function Sr(e){if(Ha===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ha=t&&t[1]||""}return`
`+Ha+e}var Oa=!1;function ja(e,t){if(!e||Oa)return"";Oa=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,l=a.length-1;1<=o&&0<=l&&i[o]!==a[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==a[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==a[l]){var s=`
`+i[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=l);break}}}finally{Oa=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Sr(e):""}function kh(e){switch(e.tag){case 5:return Sr(e.type);case 16:return Sr("Lazy");case 13:return Sr("Suspense");case 19:return Sr("SuspenseList");case 0:case 2:case 15:return e=ja(e.type,!1),e;case 11:return e=ja(e.type.render,!1),e;case 1:return e=ja(e.type,!0),e;default:return""}}function fo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Nn:return"Fragment";case Bn:return"Portal";case co:return"Profiler";case al:return"StrictMode";case ho:return"Suspense";case po:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Au:return(e.displayName||"Context")+".Consumer";case Mu:return(e._context.displayName||"Context")+".Provider";case ol:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ll:return t=e.displayName||null,t!==null?t:fo(e.type)||"Memo";case qt:t=e._payload,e=e._init;try{return fo(e(t))}catch{}}return null}function bh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fo(t);case 8:return t===al?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function cn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ru(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Sh(e){var t=Ru(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function pi(e){e._valueTracker||(e._valueTracker=Sh(e))}function zu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ru(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Hi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function go(e,t){var n=t.checked;return pe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Cs(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=cn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Bu(e,t){t=t.checked,t!=null&&il(e,"checked",t,!1)}function mo(e,t){Bu(e,t);var n=cn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?vo(e,t.type,n):t.hasOwnProperty("defaultValue")&&vo(e,t.type,cn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Es(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function vo(e,t,n){(t!=="number"||Hi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Tr=Array.isArray;function Gn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+cn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function yo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return pe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function _s(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(Tr(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:cn(n)}}function Nu(e,t){var n=cn(t.value),r=cn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ps(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Fu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function xo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Fu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fi,Du=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(fi=fi||document.createElement("div"),fi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=fi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Dr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var _r={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Th=["Webkit","ms","Moz","O"];Object.keys(_r).forEach(function(e){Th.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),_r[t]=_r[e]})});function Iu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||_r.hasOwnProperty(e)&&_r[e]?(""+t).trim():t+"px"}function Wu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Iu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Ch=pe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function wo(e,t){if(t){if(Ch[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function ko(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bo=null;function sl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var So=null,Yn=null,$n=null;function Ms(e){if(e=ti(e)){if(typeof So!="function")throw Error(k(280));var t=e.stateNode;t&&(t=ga(t),So(e.stateNode,e.type,t))}}function Uu(e){Yn?$n?$n.push(e):$n=[e]:Yn=e}function Hu(){if(Yn){var e=Yn,t=$n;if($n=Yn=null,Ms(e),t)for(e=0;e<t.length;e++)Ms(t[e])}}function Ou(e,t){return e(t)}function ju(){}var Xa=!1;function Xu(e,t,n){if(Xa)return e(t,n);Xa=!0;try{return Ou(e,t,n)}finally{Xa=!1,(Yn!==null||$n!==null)&&(ju(),Hu())}}function Ir(e,t){var n=e.stateNode;if(n===null)return null;var r=ga(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var To=!1;if(Ht)try{Rn={},Object.defineProperty(Rn,"passive",{get:function(){To=!0}}),window.addEventListener("test",Rn,Rn),window.removeEventListener("test",Rn,Rn)}catch{To=!1}var Rn;function Eh(e,t,n,r,i,a,o,l,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(f){this.onError(f)}}var Pr=!1,Oi=null,ji=!1,Co=null,_h={onError:function(e){Pr=!0,Oi=e}};function Ph(e,t,n,r,i,a,o,l,s){Pr=!1,Oi=null,Eh.apply(_h,arguments)}function Mh(e,t,n,r,i,a,o,l,s){if(Ph.apply(this,arguments),Pr){if(Pr){var c=Oi;Pr=!1,Oi=null}else throw Error(k(198));ji||(ji=!0,Co=c)}}function Mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Vu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function As(e){if(Mn(e)!==e)throw Error(k(188))}function Ah(e){var t=e.alternate;if(!t){if(t=Mn(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return As(i),e;if(a===r)return As(i),t;a=a.sibling}throw Error(k(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=a;break}if(l===r){o=!0,r=i,n=a;break}l=l.sibling}if(!o){for(l=a.child;l;){if(l===n){o=!0,n=a,r=i;break}if(l===r){o=!0,r=a,n=i;break}l=l.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function Gu(e){return e=Ah(e),e!==null?Yu(e):null}function Yu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Yu(e);if(t!==null)return t;e=e.sibling}return null}var $u=it.unstable_scheduleCallback,Ls=it.unstable_cancelCallback,Lh=it.unstable_shouldYield,Rh=it.unstable_requestPaint,me=it.unstable_now,zh=it.unstable_getCurrentPriorityLevel,ul=it.unstable_ImmediatePriority,qu=it.unstable_UserBlockingPriority,Xi=it.unstable_NormalPriority,Bh=it.unstable_LowPriority,Qu=it.unstable_IdlePriority,da=null,Rt=null;function Nh(e){if(Rt&&typeof Rt.onCommitFiberRoot=="function")try{Rt.onCommitFiberRoot(da,e,void 0,(e.current.flags&128)===128)}catch{}}var St=Math.clz32?Math.clz32:Ih,Fh=Math.log,Dh=Math.LN2;function Ih(e){return e>>>=0,e===0?32:31-(Fh(e)/Dh|0)|0}var gi=64,mi=4194304;function Cr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Cr(l):(a&=o,a!==0&&(r=Cr(a)))}else o=n&~i,o!==0?r=Cr(o):a!==0&&(r=Cr(a));if(r===0)return 0;if(t!==0&&t!==r&&(t&i)===0&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-St(t),i=1<<n,r|=e[n],t&=~i;return r}function Wh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Uh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-St(a),l=1<<o,s=i[o];s===-1?((l&n)===0||(l&r)!==0)&&(i[o]=Wh(l,t)):s<=t&&(e.expiredLanes|=l),a&=~l}}function Eo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ku(){var e=gi;return gi<<=1,(gi&4194240)===0&&(gi=64),e}function Va(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Jr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-St(t),e[t]=n}function Hh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-St(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function cl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-St(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var ee=0;function Zu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ju,dl,ec,tc,nc,_o=!1,vi=[],tn=null,nn=null,rn=null,Wr=new Map,Ur=new Map,Kt=[],Oh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rs(e,t){switch(e){case"focusin":case"focusout":tn=null;break;case"dragenter":case"dragleave":nn=null;break;case"mouseover":case"mouseout":rn=null;break;case"pointerover":case"pointerout":Wr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ur.delete(t.pointerId)}}function mr(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=ti(t),t!==null&&dl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function jh(e,t,n,r,i){switch(t){case"focusin":return tn=mr(tn,e,t,n,r,i),!0;case"dragenter":return nn=mr(nn,e,t,n,r,i),!0;case"mouseover":return rn=mr(rn,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return Wr.set(a,mr(Wr.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Ur.set(a,mr(Ur.get(a)||null,e,t,n,r,i)),!0}return!1}function rc(e){var t=yn(e.target);if(t!==null){var n=Mn(t);if(n!==null){if(t=n.tag,t===13){if(t=Vu(n),t!==null){e.blockedOn=t,nc(e.priority,function(){ec(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Li(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Po(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);bo=r,n.target.dispatchEvent(r),bo=null}else return t=ti(n),t!==null&&dl(t),e.blockedOn=n,!1;t.shift()}return!0}function zs(e,t,n){Li(e)&&n.delete(t)}function Xh(){_o=!1,tn!==null&&Li(tn)&&(tn=null),nn!==null&&Li(nn)&&(nn=null),rn!==null&&Li(rn)&&(rn=null),Wr.forEach(zs),Ur.forEach(zs)}function vr(e,t){e.blockedOn===t&&(e.blockedOn=null,_o||(_o=!0,it.unstable_scheduleCallback(it.unstable_NormalPriority,Xh)))}function Hr(e){function t(i){return vr(i,e)}if(0<vi.length){vr(vi[0],e);for(var n=1;n<vi.length;n++){var r=vi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(tn!==null&&vr(tn,e),nn!==null&&vr(nn,e),rn!==null&&vr(rn,e),Wr.forEach(t),Ur.forEach(t),n=0;n<Kt.length;n++)r=Kt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Kt.length&&(n=Kt[0],n.blockedOn===null);)rc(n),n.blockedOn===null&&Kt.shift()}var qn=Vt.ReactCurrentBatchConfig,Gi=!0;function Vh(e,t,n,r){var i=ee,a=qn.transition;qn.transition=null;try{ee=1,hl(e,t,n,r)}finally{ee=i,qn.transition=a}}function Gh(e,t,n,r){var i=ee,a=qn.transition;qn.transition=null;try{ee=4,hl(e,t,n,r)}finally{ee=i,qn.transition=a}}function hl(e,t,n,r){if(Gi){var i=Po(e,t,n,r);if(i===null)Za(e,t,r,Yi,n),Rs(e,r);else if(jh(i,e,t,n,r))r.stopPropagation();else if(Rs(e,r),t&4&&-1<Oh.indexOf(e)){for(;i!==null;){var a=ti(i);if(a!==null&&Ju(a),a=Po(e,t,n,r),a===null&&Za(e,t,r,Yi,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Za(e,t,r,null,n)}}var Yi=null;function Po(e,t,n,r){if(Yi=null,e=sl(r),e=yn(e),e!==null)if(t=Mn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Vu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Yi=e,null}function ic(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zh()){case ul:return 1;case qu:return 4;case Xi:case Bh:return 16;case Qu:return 536870912;default:return 16}default:return 16}}var Jt=null,pl=null,Ri=null;function ac(){if(Ri)return Ri;var e,t=pl,n=t.length,r,i="value"in Jt?Jt.value:Jt.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Ri=i.slice(e,1<r?1-r:void 0)}function zi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yi(){return!0}function Bs(){return!1}function at(e){function t(n,r,i,a,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(a):a[l]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?yi:Bs,this.isPropagationStopped=Bs,this}return pe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=yi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=yi)},persist:function(){},isPersistent:yi}),t}var ar={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fl=at(ar),ei=pe({},ar,{view:0,detail:0}),Yh=at(ei),Ga,Ya,yr,ha=pe({},ei,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yr&&(yr&&e.type==="mousemove"?(Ga=e.screenX-yr.screenX,Ya=e.screenY-yr.screenY):Ya=Ga=0,yr=e),Ga)},movementY:function(e){return"movementY"in e?e.movementY:Ya}}),Ns=at(ha),$h=pe({},ha,{dataTransfer:0}),qh=at($h),Qh=pe({},ei,{relatedTarget:0}),$a=at(Qh),Kh=pe({},ar,{animationName:0,elapsedTime:0,pseudoElement:0}),Zh=at(Kh),Jh=pe({},ar,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ep=at(Jh),tp=pe({},ar,{data:0}),Fs=at(tp),np={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ip={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ap(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ip[e])?!!t[e]:!1}function gl(){return ap}var op=pe({},ei,{key:function(e){if(e.key){var t=np[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=zi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?rp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gl,charCode:function(e){return e.type==="keypress"?zi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?zi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),lp=at(op),sp=pe({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ds=at(sp),up=pe({},ei,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gl}),cp=at(up),dp=pe({},ar,{propertyName:0,elapsedTime:0,pseudoElement:0}),hp=at(dp),pp=pe({},ha,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),fp=at(pp),gp=[9,13,27,32],ml=Ht&&"CompositionEvent"in window,Mr=null;Ht&&"documentMode"in document&&(Mr=document.documentMode);var mp=Ht&&"TextEvent"in window&&!Mr,oc=Ht&&(!ml||Mr&&8<Mr&&11>=Mr),Is=" ",Ws=!1;function lc(e,t){switch(e){case"keyup":return gp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Fn=!1;function vp(e,t){switch(e){case"compositionend":return sc(t);case"keypress":return t.which!==32?null:(Ws=!0,Is);case"textInput":return e=t.data,e===Is&&Ws?null:e;default:return null}}function yp(e,t){if(Fn)return e==="compositionend"||!ml&&lc(e,t)?(e=ac(),Ri=pl=Jt=null,Fn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return oc&&t.locale!=="ko"?null:t.data;default:return null}}var xp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Us(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!xp[e.type]:t==="textarea"}function uc(e,t,n,r){Uu(r),t=$i(t,"onChange"),0<t.length&&(n=new fl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ar=null,Or=null;function wp(e){wc(e,0)}function pa(e){var t=Wn(e);if(zu(t))return e}function kp(e,t){if(e==="change")return t}var cc=!1;Ht&&(Ht?(wi="oninput"in document,wi||(qa=document.createElement("div"),qa.setAttribute("oninput","return;"),wi=typeof qa.oninput=="function"),xi=wi):xi=!1,cc=xi&&(!document.documentMode||9<document.documentMode));var xi,wi,qa;function Hs(){Ar&&(Ar.detachEvent("onpropertychange",dc),Or=Ar=null)}function dc(e){if(e.propertyName==="value"&&pa(Or)){var t=[];uc(t,Or,e,sl(e)),Xu(wp,t)}}function bp(e,t,n){e==="focusin"?(Hs(),Ar=t,Or=n,Ar.attachEvent("onpropertychange",dc)):e==="focusout"&&Hs()}function Sp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pa(Or)}function Tp(e,t){if(e==="click")return pa(t)}function Cp(e,t){if(e==="input"||e==="change")return pa(t)}function Ep(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ct=typeof Object.is=="function"?Object.is:Ep;function jr(e,t){if(Ct(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!uo.call(t,i)||!Ct(e[i],t[i]))return!1}return!0}function Os(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function js(e,t){var n=Os(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Os(n)}}function hc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?hc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function pc(){for(var e=window,t=Hi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Hi(e.document)}return t}function vl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function _p(e){var t=pc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&hc(n.ownerDocument.documentElement,n)){if(r!==null&&vl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=js(n,a);var o=js(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Pp=Ht&&"documentMode"in document&&11>=document.documentMode,Dn=null,Mo=null,Lr=null,Ao=!1;function Xs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ao||Dn==null||Dn!==Hi(r)||(r=Dn,"selectionStart"in r&&vl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&jr(Lr,r)||(Lr=r,r=$i(Mo,"onSelect"),0<r.length&&(t=new fl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Dn)))}function ki(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var In={animationend:ki("Animation","AnimationEnd"),animationiteration:ki("Animation","AnimationIteration"),animationstart:ki("Animation","AnimationStart"),transitionend:ki("Transition","TransitionEnd")},Qa={},fc={};Ht&&(fc=document.createElement("div").style,"AnimationEvent"in window||(delete In.animationend.animation,delete In.animationiteration.animation,delete In.animationstart.animation),"TransitionEvent"in window||delete In.transitionend.transition);function fa(e){if(Qa[e])return Qa[e];if(!In[e])return e;var t=In[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in fc)return Qa[e]=t[n];return e}var gc=fa("animationend"),mc=fa("animationiteration"),vc=fa("animationstart"),yc=fa("transitionend"),xc=new Map,Vs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function hn(e,t){xc.set(e,t),Pn(t,[e])}for(bi=0;bi<Vs.length;bi++)Si=Vs[bi],Gs=Si.toLowerCase(),Ys=Si[0].toUpperCase()+Si.slice(1),hn(Gs,"on"+Ys);var Si,Gs,Ys,bi;hn(gc,"onAnimationEnd");hn(mc,"onAnimationIteration");hn(vc,"onAnimationStart");hn("dblclick","onDoubleClick");hn("focusin","onFocus");hn("focusout","onBlur");hn(yc,"onTransitionEnd");Zn("onMouseEnter",["mouseout","mouseover"]);Zn("onMouseLeave",["mouseout","mouseover"]);Zn("onPointerEnter",["pointerout","pointerover"]);Zn("onPointerLeave",["pointerout","pointerover"]);Pn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Pn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Pn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Pn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Pn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Pn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function $s(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Mh(r,t,void 0,e),e.currentTarget=null}function wc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],s=l.instance,c=l.currentTarget;if(l=l.listener,s!==a&&i.isPropagationStopped())break e;$s(i,l,c),a=s}else for(o=0;o<r.length;o++){if(l=r[o],s=l.instance,c=l.currentTarget,l=l.listener,s!==a&&i.isPropagationStopped())break e;$s(i,l,c),a=s}}}if(ji)throw e=Co,ji=!1,Co=null,e}function ae(e,t){var n=t[No];n===void 0&&(n=t[No]=new Set);var r=e+"__bubble";n.has(r)||(kc(t,e,2,!1),n.add(r))}function Ka(e,t,n){var r=0;t&&(r|=4),kc(n,e,r,t)}var Ti="_reactListening"+Math.random().toString(36).slice(2);function Xr(e){if(!e[Ti]){e[Ti]=!0,Pu.forEach(function(n){n!=="selectionchange"&&(Mp.has(n)||Ka(n,!1,e),Ka(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ti]||(t[Ti]=!0,Ka("selectionchange",!1,t))}}function kc(e,t,n,r){switch(ic(t)){case 1:var i=Vh;break;case 4:i=Gh;break;default:i=hl}n=i.bind(null,t,n,e),i=void 0,!To||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Za(e,t,n,r,i){var a=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===i||s.nodeType===8&&s.parentNode===i))return;o=o.return}for(;l!==null;){if(o=yn(l),o===null)return;if(s=o.tag,s===5||s===6){r=a=o;continue e}l=l.parentNode}}r=r.return}Xu(function(){var c=a,f=sl(n),m=[];e:{var p=xc.get(e);if(p!==void 0){var v=fl,y=e;switch(e){case"keypress":if(zi(n)===0)break e;case"keydown":case"keyup":v=lp;break;case"focusin":y="focus",v=$a;break;case"focusout":y="blur",v=$a;break;case"beforeblur":case"afterblur":v=$a;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Ns;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=qh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=cp;break;case gc:case mc:case vc:v=Zh;break;case yc:v=hp;break;case"scroll":v=Yh;break;case"wheel":v=fp;break;case"copy":case"cut":case"paste":v=ep;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Ds}var x=(t&4)!==0,A=!x&&e==="scroll",h=x?p!==null?p+"Capture":null:p;x=[];for(var u=c,d;u!==null;){d=u;var g=d.stateNode;if(d.tag===5&&g!==null&&(d=g,h!==null&&(g=Ir(u,h),g!=null&&x.push(Vr(u,g,d)))),A)break;u=u.return}0<x.length&&(p=new v(p,y,null,n,f),m.push({event:p,listeners:x}))}}if((t&7)===0){e:{if(p=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",p&&n!==bo&&(y=n.relatedTarget||n.fromElement)&&(yn(y)||y[Ot]))break e;if((v||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,v?(y=n.relatedTarget||n.toElement,v=c,y=y?yn(y):null,y!==null&&(A=Mn(y),y!==A||y.tag!==5&&y.tag!==6)&&(y=null)):(v=null,y=c),v!==y)){if(x=Ns,g="onMouseLeave",h="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(x=Ds,g="onPointerLeave",h="onPointerEnter",u="pointer"),A=v==null?p:Wn(v),d=y==null?p:Wn(y),p=new x(g,u+"leave",v,n,f),p.target=A,p.relatedTarget=d,g=null,yn(f)===c&&(x=new x(h,u+"enter",y,n,f),x.target=d,x.relatedTarget=A,g=x),A=g,v&&y)t:{for(x=v,h=y,u=0,d=x;d;d=zn(d))u++;for(d=0,g=h;g;g=zn(g))d++;for(;0<u-d;)x=zn(x),u--;for(;0<d-u;)h=zn(h),d--;for(;u--;){if(x===h||h!==null&&x===h.alternate)break t;x=zn(x),h=zn(h)}x=null}else x=null;v!==null&&qs(m,p,v,x,!1),y!==null&&A!==null&&qs(m,A,y,x,!0)}}e:{if(p=c?Wn(c):window,v=p.nodeName&&p.nodeName.toLowerCase(),v==="select"||v==="input"&&p.type==="file")var w=kp;else if(Us(p))if(cc)w=Cp;else{w=Sp;var b=bp}else(v=p.nodeName)&&v.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(w=Tp);if(w&&(w=w(e,c))){uc(m,w,n,f);break e}b&&b(e,p,c),e==="focusout"&&(b=p._wrapperState)&&b.controlled&&p.type==="number"&&vo(p,"number",p.value)}switch(b=c?Wn(c):window,e){case"focusin":(Us(b)||b.contentEditable==="true")&&(Dn=b,Mo=c,Lr=null);break;case"focusout":Lr=Mo=Dn=null;break;case"mousedown":Ao=!0;break;case"contextmenu":case"mouseup":case"dragend":Ao=!1,Xs(m,n,f);break;case"selectionchange":if(Pp)break;case"keydown":case"keyup":Xs(m,n,f)}var T;if(ml)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else Fn?lc(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(oc&&n.locale!=="ko"&&(Fn||S!=="onCompositionStart"?S==="onCompositionEnd"&&Fn&&(T=ac()):(Jt=f,pl="value"in Jt?Jt.value:Jt.textContent,Fn=!0)),b=$i(c,S),0<b.length&&(S=new Fs(S,e,null,n,f),m.push({event:S,listeners:b}),T?S.data=T:(T=sc(n),T!==null&&(S.data=T)))),(T=mp?vp(e,n):yp(e,n))&&(c=$i(c,"onBeforeInput"),0<c.length&&(f=new Fs("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=T))}wc(m,t)})}function Vr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function $i(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=Ir(e,n),a!=null&&r.unshift(Vr(e,a,i)),a=Ir(e,t),a!=null&&r.push(Vr(e,a,i))),e=e.return}return r}function zn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function qs(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var l=n,s=l.alternate,c=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&c!==null&&(l=c,i?(s=Ir(n,a),s!=null&&o.unshift(Vr(n,s,l))):i||(s=Ir(n,a),s!=null&&o.push(Vr(n,s,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ap=/\r\n?/g,Lp=/\u0000|\uFFFD/g;function Qs(e){return(typeof e=="string"?e:""+e).replace(Ap,`
`).replace(Lp,"")}function Ci(e,t,n){if(t=Qs(t),Qs(e)!==t&&n)throw Error(k(425))}function qi(){}var Lo=null,Ro=null;function zo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bo=typeof setTimeout=="function"?setTimeout:void 0,Rp=typeof clearTimeout=="function"?clearTimeout:void 0,Ks=typeof Promise=="function"?Promise:void 0,zp=typeof queueMicrotask=="function"?queueMicrotask:typeof Ks<"u"?function(e){return Ks.resolve(null).then(e).catch(Bp)}:Bo;function Bp(e){setTimeout(function(){throw e})}function Ja(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Hr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Hr(t)}function an(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Zs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var or=Math.random().toString(36).slice(2),Lt="__reactFiber$"+or,Gr="__reactProps$"+or,Ot="__reactContainer$"+or,No="__reactEvents$"+or,Np="__reactListeners$"+or,Fp="__reactHandles$"+or;function yn(e){var t=e[Lt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ot]||n[Lt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Zs(e);e!==null;){if(n=e[Lt])return n;e=Zs(e)}return t}e=n,n=e.parentNode}return null}function ti(e){return e=e[Lt]||e[Ot],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function ga(e){return e[Gr]||null}var Fo=[],Un=-1;function pn(e){return{current:e}}function oe(e){0>Un||(e.current=Fo[Un],Fo[Un]=null,Un--)}function ie(e,t){Un++,Fo[Un]=e.current,e.current=t}var dn={},je=pn(dn),Ke=pn(!1),Sn=dn;function Jn(e,t){var n=e.type.contextTypes;if(!n)return dn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ze(e){return e=e.childContextTypes,e!=null}function Qi(){oe(Ke),oe(je)}function Js(e,t,n){if(je.current!==dn)throw Error(k(168));ie(je,t),ie(Ke,n)}function bc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(k(108,bh(e)||"Unknown",i));return pe({},n,r)}function Ki(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||dn,Sn=je.current,ie(je,e),ie(Ke,Ke.current),!0}function eu(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=bc(e,t,Sn),r.__reactInternalMemoizedMergedChildContext=e,oe(Ke),oe(je),ie(je,e)):oe(Ke),ie(Ke,n)}var Dt=null,ma=!1,eo=!1;function Sc(e){Dt===null?Dt=[e]:Dt.push(e)}function Dp(e){ma=!0,Sc(e)}function fn(){if(!eo&&Dt!==null){eo=!0;var e=0,t=ee;try{var n=Dt;for(ee=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Dt=null,ma=!1}catch(i){throw Dt!==null&&(Dt=Dt.slice(e+1)),$u(ul,fn),i}finally{ee=t,eo=!1}}return null}var Hn=[],On=0,Zi=null,Ji=0,dt=[],ht=0,Tn=null,It=1,Wt="";function mn(e,t){Hn[On++]=Ji,Hn[On++]=Zi,Zi=e,Ji=t}function Tc(e,t,n){dt[ht++]=It,dt[ht++]=Wt,dt[ht++]=Tn,Tn=e;var r=It;e=Wt;var i=32-St(r)-1;r&=~(1<<i),n+=1;var a=32-St(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,It=1<<32-St(t)+i|n<<i|r,Wt=a+e}else It=1<<a|n<<i|r,Wt=e}function yl(e){e.return!==null&&(mn(e,1),Tc(e,1,0))}function xl(e){for(;e===Zi;)Zi=Hn[--On],Hn[On]=null,Ji=Hn[--On],Hn[On]=null;for(;e===Tn;)Tn=dt[--ht],dt[ht]=null,Wt=dt[--ht],dt[ht]=null,It=dt[--ht],dt[ht]=null}var rt=null,nt=null,se=!1,bt=null;function Cc(e,t){var n=pt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function tu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,rt=e,nt=an(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,rt=e,nt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Tn!==null?{id:It,overflow:Wt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=pt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,rt=e,nt=null,!0):!1;default:return!1}}function Do(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Io(e){if(se){var t=nt;if(t){var n=t;if(!tu(e,t)){if(Do(e))throw Error(k(418));t=an(n.nextSibling);var r=rt;t&&tu(e,t)?Cc(r,n):(e.flags=e.flags&-4097|2,se=!1,rt=e)}}else{if(Do(e))throw Error(k(418));e.flags=e.flags&-4097|2,se=!1,rt=e}}}function nu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;rt=e}function Ei(e){if(e!==rt)return!1;if(!se)return nu(e),se=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!zo(e.type,e.memoizedProps)),t&&(t=nt)){if(Do(e))throw Ec(),Error(k(418));for(;t;)Cc(e,t),t=an(t.nextSibling)}if(nu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){nt=an(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}nt=null}}else nt=rt?an(e.stateNode.nextSibling):null;return!0}function Ec(){for(var e=nt;e;)e=an(e.nextSibling)}function er(){nt=rt=null,se=!1}function wl(e){bt===null?bt=[e]:bt.push(e)}var Ip=Vt.ReactCurrentBatchConfig;function xr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var l=i.refs;o===null?delete l[a]:l[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function _i(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ru(e){var t=e._init;return t(e._payload)}function _c(e){function t(h,u){if(e){var d=h.deletions;d===null?(h.deletions=[u],h.flags|=16):d.push(u)}}function n(h,u){if(!e)return null;for(;u!==null;)t(h,u),u=u.sibling;return null}function r(h,u){for(h=new Map;u!==null;)u.key!==null?h.set(u.key,u):h.set(u.index,u),u=u.sibling;return h}function i(h,u){return h=un(h,u),h.index=0,h.sibling=null,h}function a(h,u,d){return h.index=d,e?(d=h.alternate,d!==null?(d=d.index,d<u?(h.flags|=2,u):d):(h.flags|=2,u)):(h.flags|=1048576,u)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function l(h,u,d,g){return u===null||u.tag!==6?(u=lo(d,h.mode,g),u.return=h,u):(u=i(u,d),u.return=h,u)}function s(h,u,d,g){var w=d.type;return w===Nn?f(h,u,d.props.children,g,d.key):u!==null&&(u.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===qt&&ru(w)===u.type)?(g=i(u,d.props),g.ref=xr(h,u,d),g.return=h,g):(g=Ui(d.type,d.key,d.props,null,h.mode,g),g.ref=xr(h,u,d),g.return=h,g)}function c(h,u,d,g){return u===null||u.tag!==4||u.stateNode.containerInfo!==d.containerInfo||u.stateNode.implementation!==d.implementation?(u=so(d,h.mode,g),u.return=h,u):(u=i(u,d.children||[]),u.return=h,u)}function f(h,u,d,g,w){return u===null||u.tag!==7?(u=bn(d,h.mode,g,w),u.return=h,u):(u=i(u,d),u.return=h,u)}function m(h,u,d){if(typeof u=="string"&&u!==""||typeof u=="number")return u=lo(""+u,h.mode,d),u.return=h,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case hi:return d=Ui(u.type,u.key,u.props,null,h.mode,d),d.ref=xr(h,null,u),d.return=h,d;case Bn:return u=so(u,h.mode,d),u.return=h,u;case qt:var g=u._init;return m(h,g(u._payload),d)}if(Tr(u)||gr(u))return u=bn(u,h.mode,d,null),u.return=h,u;_i(h,u)}return null}function p(h,u,d,g){var w=u!==null?u.key:null;if(typeof d=="string"&&d!==""||typeof d=="number")return w!==null?null:l(h,u,""+d,g);if(typeof d=="object"&&d!==null){switch(d.$$typeof){case hi:return d.key===w?s(h,u,d,g):null;case Bn:return d.key===w?c(h,u,d,g):null;case qt:return w=d._init,p(h,u,w(d._payload),g)}if(Tr(d)||gr(d))return w!==null?null:f(h,u,d,g,null);_i(h,d)}return null}function v(h,u,d,g,w){if(typeof g=="string"&&g!==""||typeof g=="number")return h=h.get(d)||null,l(u,h,""+g,w);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case hi:return h=h.get(g.key===null?d:g.key)||null,s(u,h,g,w);case Bn:return h=h.get(g.key===null?d:g.key)||null,c(u,h,g,w);case qt:var b=g._init;return v(h,u,d,b(g._payload),w)}if(Tr(g)||gr(g))return h=h.get(d)||null,f(u,h,g,w,null);_i(u,g)}return null}function y(h,u,d,g){for(var w=null,b=null,T=u,S=u=0,H=null;T!==null&&S<d.length;S++){T.index>S?(H=T,T=null):H=T.sibling;var L=p(h,T,d[S],g);if(L===null){T===null&&(T=H);break}e&&T&&L.alternate===null&&t(h,T),u=a(L,u,S),b===null?w=L:b.sibling=L,b=L,T=H}if(S===d.length)return n(h,T),se&&mn(h,S),w;if(T===null){for(;S<d.length;S++)T=m(h,d[S],g),T!==null&&(u=a(T,u,S),b===null?w=T:b.sibling=T,b=T);return se&&mn(h,S),w}for(T=r(h,T);S<d.length;S++)H=v(T,h,S,d[S],g),H!==null&&(e&&H.alternate!==null&&T.delete(H.key===null?S:H.key),u=a(H,u,S),b===null?w=H:b.sibling=H,b=H);return e&&T.forEach(function(Q){return t(h,Q)}),se&&mn(h,S),w}function x(h,u,d,g){var w=gr(d);if(typeof w!="function")throw Error(k(150));if(d=w.call(d),d==null)throw Error(k(151));for(var b=w=null,T=u,S=u=0,H=null,L=d.next();T!==null&&!L.done;S++,L=d.next()){T.index>S?(H=T,T=null):H=T.sibling;var Q=p(h,T,L.value,g);if(Q===null){T===null&&(T=H);break}e&&T&&Q.alternate===null&&t(h,T),u=a(Q,u,S),b===null?w=Q:b.sibling=Q,b=Q,T=H}if(L.done)return n(h,T),se&&mn(h,S),w;if(T===null){for(;!L.done;S++,L=d.next())L=m(h,L.value,g),L!==null&&(u=a(L,u,S),b===null?w=L:b.sibling=L,b=L);return se&&mn(h,S),w}for(T=r(h,T);!L.done;S++,L=d.next())L=v(T,h,S,L.value,g),L!==null&&(e&&L.alternate!==null&&T.delete(L.key===null?S:L.key),u=a(L,u,S),b===null?w=L:b.sibling=L,b=L);return e&&T.forEach(function(le){return t(h,le)}),se&&mn(h,S),w}function A(h,u,d,g){if(typeof d=="object"&&d!==null&&d.type===Nn&&d.key===null&&(d=d.props.children),typeof d=="object"&&d!==null){switch(d.$$typeof){case hi:e:{for(var w=d.key,b=u;b!==null;){if(b.key===w){if(w=d.type,w===Nn){if(b.tag===7){n(h,b.sibling),u=i(b,d.props.children),u.return=h,h=u;break e}}else if(b.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===qt&&ru(w)===b.type){n(h,b.sibling),u=i(b,d.props),u.ref=xr(h,b,d),u.return=h,h=u;break e}n(h,b);break}else t(h,b);b=b.sibling}d.type===Nn?(u=bn(d.props.children,h.mode,g,d.key),u.return=h,h=u):(g=Ui(d.type,d.key,d.props,null,h.mode,g),g.ref=xr(h,u,d),g.return=h,h=g)}return o(h);case Bn:e:{for(b=d.key;u!==null;){if(u.key===b)if(u.tag===4&&u.stateNode.containerInfo===d.containerInfo&&u.stateNode.implementation===d.implementation){n(h,u.sibling),u=i(u,d.children||[]),u.return=h,h=u;break e}else{n(h,u);break}else t(h,u);u=u.sibling}u=so(d,h.mode,g),u.return=h,h=u}return o(h);case qt:return b=d._init,A(h,u,b(d._payload),g)}if(Tr(d))return y(h,u,d,g);if(gr(d))return x(h,u,d,g);_i(h,d)}return typeof d=="string"&&d!==""||typeof d=="number"?(d=""+d,u!==null&&u.tag===6?(n(h,u.sibling),u=i(u,d),u.return=h,h=u):(n(h,u),u=lo(d,h.mode,g),u.return=h,h=u),o(h)):n(h,u)}return A}var tr=_c(!0),Pc=_c(!1),ea=pn(null),ta=null,jn=null,kl=null;function bl(){kl=jn=ta=null}function Sl(e){var t=ea.current;oe(ea),e._currentValue=t}function Wo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Qn(e,t){ta=e,kl=jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Qe=!0),e.firstContext=null)}function gt(e){var t=e._currentValue;if(kl!==e)if(e={context:e,memoizedValue:t,next:null},jn===null){if(ta===null)throw Error(k(308));jn=e,ta.dependencies={lanes:0,firstContext:e}}else jn=jn.next=e;return t}var xn=null;function Tl(e){xn===null?xn=[e]:xn.push(e)}function Mc(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Tl(t)):(n.next=i.next,i.next=n),t.interleaved=n,jt(e,r)}function jt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Qt=!1;function Cl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ac(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ut(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function on(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,($&2)!==0){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,jt(e,n)}return i=r.interleaved,i===null?(t.next=t,Tl(r)):(t.next=i.next,i.next=t),r.interleaved=t,jt(e,n)}function Bi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cl(e,n)}}function iu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function na(e,t,n,r){var i=e.updateQueue;Qt=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var s=l,c=s.next;s.next=null,o===null?a=c:o.next=c,o=s;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=s))}if(a!==null){var m=i.baseState;o=0,f=c=s=null,l=a;do{var p=l.lane,v=l.eventTime;if((r&p)===p){f!==null&&(f=f.next={eventTime:v,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,x=l;switch(p=t,v=n,x.tag){case 1:if(y=x.payload,typeof y=="function"){m=y.call(v,m,p);break e}m=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=x.payload,p=typeof y=="function"?y.call(v,m,p):y,p==null)break e;m=pe({},m,p);break e;case 2:Qt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[l]:p.push(l))}else v={eventTime:v,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=v,s=m):f=f.next=v,o|=p;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;p=l,l=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(f===null&&(s=m),i.baseState=s,i.firstBaseUpdate=c,i.lastBaseUpdate=f,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);En|=o,e.lanes=o,e.memoizedState=m}}function au(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(k(191,i));i.call(r)}}}var ni={},zt=pn(ni),Yr=pn(ni),$r=pn(ni);function wn(e){if(e===ni)throw Error(k(174));return e}function El(e,t){switch(ie($r,t),ie(Yr,e),ie(zt,ni),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:xo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=xo(t,e)}oe(zt),ie(zt,t)}function nr(){oe(zt),oe(Yr),oe($r)}function Lc(e){wn($r.current);var t=wn(zt.current),n=xo(t,e.type);t!==n&&(ie(Yr,e),ie(zt,n))}function _l(e){Yr.current===e&&(oe(zt),oe(Yr))}var de=pn(0);function ra(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var to=[];function Pl(){for(var e=0;e<to.length;e++)to[e]._workInProgressVersionPrimary=null;to.length=0}var Ni=Vt.ReactCurrentDispatcher,no=Vt.ReactCurrentBatchConfig,Cn=0,he=null,xe=null,Te=null,ia=!1,Rr=!1,qr=0,Wp=0;function Ue(){throw Error(k(321))}function Ml(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ct(e[n],t[n]))return!1;return!0}function Al(e,t,n,r,i,a){if(Cn=a,he=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ni.current=e===null||e.memoizedState===null?jp:Xp,e=n(r,i),Rr){a=0;do{if(Rr=!1,qr=0,25<=a)throw Error(k(301));a+=1,Te=xe=null,t.updateQueue=null,Ni.current=Vp,e=n(r,i)}while(Rr)}if(Ni.current=aa,t=xe!==null&&xe.next!==null,Cn=0,Te=xe=he=null,ia=!1,t)throw Error(k(300));return e}function Ll(){var e=qr!==0;return qr=0,e}function At(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?he.memoizedState=Te=e:Te=Te.next=e,Te}function mt(){if(xe===null){var e=he.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=Te===null?he.memoizedState:Te.next;if(t!==null)Te=t,xe=e;else{if(e===null)throw Error(k(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},Te===null?he.memoizedState=Te=e:Te=Te.next=e}return Te}function Qr(e,t){return typeof t=="function"?t(e):t}function ro(e){var t=mt(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=xe,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var l=o=null,s=null,c=a;do{var f=c.lane;if((Cn&f)===f)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(l=s=m,o=r):s=s.next=m,he.lanes|=f,En|=f}c=c.next}while(c!==null&&c!==a);s===null?o=r:s.next=l,Ct(r,t.memoizedState)||(Qe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,he.lanes|=a,En|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function io(e){var t=mt(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Ct(a,t.memoizedState)||(Qe=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Rc(){}function zc(e,t){var n=he,r=mt(),i=t(),a=!Ct(r.memoizedState,i);if(a&&(r.memoizedState=i,Qe=!0),r=r.queue,Rl(Fc.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Te!==null&&Te.memoizedState.tag&1){if(n.flags|=2048,Kr(9,Nc.bind(null,n,r,i,t),void 0,null),Ce===null)throw Error(k(349));(Cn&30)!==0||Bc(n,t,i)}return i}function Bc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=he.updateQueue,t===null?(t={lastEffect:null,stores:null},he.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Nc(e,t,n,r){t.value=n,t.getSnapshot=r,Dc(t)&&Ic(e)}function Fc(e,t,n){return n(function(){Dc(t)&&Ic(e)})}function Dc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ct(e,n)}catch{return!0}}function Ic(e){var t=jt(e,1);t!==null&&Tt(t,e,1,-1)}function ou(e){var t=At();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qr,lastRenderedState:e},t.queue=e,e=e.dispatch=Op.bind(null,he,e),[t.memoizedState,e]}function Kr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=he.updateQueue,t===null?(t={lastEffect:null,stores:null},he.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Wc(){return mt().memoizedState}function Fi(e,t,n,r){var i=At();he.flags|=e,i.memoizedState=Kr(1|t,n,void 0,r===void 0?null:r)}function va(e,t,n,r){var i=mt();r=r===void 0?null:r;var a=void 0;if(xe!==null){var o=xe.memoizedState;if(a=o.destroy,r!==null&&Ml(r,o.deps)){i.memoizedState=Kr(t,n,a,r);return}}he.flags|=e,i.memoizedState=Kr(1|t,n,a,r)}function lu(e,t){return Fi(8390656,8,e,t)}function Rl(e,t){return va(2048,8,e,t)}function Uc(e,t){return va(4,2,e,t)}function Hc(e,t){return va(4,4,e,t)}function Oc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function jc(e,t,n){return n=n!=null?n.concat([e]):null,va(4,4,Oc.bind(null,t,e),n)}function zl(){}function Xc(e,t){var n=mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ml(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Vc(e,t){var n=mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ml(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Gc(e,t,n){return(Cn&21)===0?(e.baseState&&(e.baseState=!1,Qe=!0),e.memoizedState=n):(Ct(n,t)||(n=Ku(),he.lanes|=n,En|=n,e.baseState=!0),t)}function Up(e,t){var n=ee;ee=n!==0&&4>n?n:4,e(!0);var r=no.transition;no.transition={};try{e(!1),t()}finally{ee=n,no.transition=r}}function Yc(){return mt().memoizedState}function Hp(e,t,n){var r=sn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},$c(e))qc(t,n);else if(n=Mc(e,t,n,r),n!==null){var i=Ye();Tt(n,e,r,i),Qc(n,t,r)}}function Op(e,t,n){var r=sn(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if($c(e))qc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,l=a(o,n);if(i.hasEagerState=!0,i.eagerState=l,Ct(l,o)){var s=t.interleaved;s===null?(i.next=i,Tl(t)):(i.next=s.next,s.next=i),t.interleaved=i;return}}catch{}n=Mc(e,t,i,r),n!==null&&(i=Ye(),Tt(n,e,r,i),Qc(n,t,r))}}function $c(e){var t=e.alternate;return e===he||t!==null&&t===he}function qc(e,t){Rr=ia=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Qc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,cl(e,n)}}var aa={readContext:gt,useCallback:Ue,useContext:Ue,useEffect:Ue,useImperativeHandle:Ue,useInsertionEffect:Ue,useLayoutEffect:Ue,useMemo:Ue,useReducer:Ue,useRef:Ue,useState:Ue,useDebugValue:Ue,useDeferredValue:Ue,useTransition:Ue,useMutableSource:Ue,useSyncExternalStore:Ue,useId:Ue,unstable_isNewReconciler:!1},jp={readContext:gt,useCallback:function(e,t){return At().memoizedState=[e,t===void 0?null:t],e},useContext:gt,useEffect:lu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Fi(4194308,4,Oc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fi(4194308,4,e,t)},useInsertionEffect:function(e,t){return Fi(4,2,e,t)},useMemo:function(e,t){var n=At();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=At();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Hp.bind(null,he,e),[r.memoizedState,e]},useRef:function(e){var t=At();return e={current:e},t.memoizedState=e},useState:ou,useDebugValue:zl,useDeferredValue:function(e){return At().memoizedState=e},useTransition:function(){var e=ou(!1),t=e[0];return e=Up.bind(null,e[1]),At().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=he,i=At();if(se){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),Ce===null)throw Error(k(349));(Cn&30)!==0||Bc(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,lu(Fc.bind(null,r,a,e),[e]),r.flags|=2048,Kr(9,Nc.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=At(),t=Ce.identifierPrefix;if(se){var n=Wt,r=It;n=(r&~(1<<32-St(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=qr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Wp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Xp={readContext:gt,useCallback:Xc,useContext:gt,useEffect:Rl,useImperativeHandle:jc,useInsertionEffect:Uc,useLayoutEffect:Hc,useMemo:Vc,useReducer:ro,useRef:Wc,useState:function(){return ro(Qr)},useDebugValue:zl,useDeferredValue:function(e){var t=mt();return Gc(t,xe.memoizedState,e)},useTransition:function(){var e=ro(Qr)[0],t=mt().memoizedState;return[e,t]},useMutableSource:Rc,useSyncExternalStore:zc,useId:Yc,unstable_isNewReconciler:!1},Vp={readContext:gt,useCallback:Xc,useContext:gt,useEffect:Rl,useImperativeHandle:jc,useInsertionEffect:Uc,useLayoutEffect:Hc,useMemo:Vc,useReducer:io,useRef:Wc,useState:function(){return io(Qr)},useDebugValue:zl,useDeferredValue:function(e){var t=mt();return xe===null?t.memoizedState=e:Gc(t,xe.memoizedState,e)},useTransition:function(){var e=io(Qr)[0],t=mt().memoizedState;return[e,t]},useMutableSource:Rc,useSyncExternalStore:zc,useId:Yc,unstable_isNewReconciler:!1};function wt(e,t){if(e&&e.defaultProps){t=pe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Uo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:pe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ya={isMounted:function(e){return(e=e._reactInternals)?Mn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ye(),i=sn(e),a=Ut(r,i);a.payload=t,n!=null&&(a.callback=n),t=on(e,a,i),t!==null&&(Tt(t,e,i,r),Bi(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ye(),i=sn(e),a=Ut(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=on(e,a,i),t!==null&&(Tt(t,e,i,r),Bi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ye(),r=sn(e),i=Ut(n,r);i.tag=2,t!=null&&(i.callback=t),t=on(e,i,r),t!==null&&(Tt(t,e,r,n),Bi(t,e,r))}};function su(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!jr(n,r)||!jr(i,a):!0}function Kc(e,t,n){var r=!1,i=dn,a=t.contextType;return typeof a=="object"&&a!==null?a=gt(a):(i=Ze(t)?Sn:je.current,r=t.contextTypes,a=(r=r!=null)?Jn(e,i):dn),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ya,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function uu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ya.enqueueReplaceState(t,t.state,null)}function Ho(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Cl(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=gt(a):(a=Ze(t)?Sn:je.current,i.context=Jn(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Uo(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&ya.enqueueReplaceState(i,i.state,null),na(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function rr(e,t){try{var n="",r=t;do n+=kh(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function ao(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Oo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Gp=typeof WeakMap=="function"?WeakMap:Map;function Zc(e,t,n){n=Ut(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){la||(la=!0,Zo=r),Oo(e,t)},n}function Jc(e,t,n){n=Ut(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Oo(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Oo(e,t),typeof r!="function"&&(ln===null?ln=new Set([this]):ln.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function cu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Gp;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=lf.bind(null,e,t,n),t.then(e,e))}function du(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function hu(e,t,n,r,i){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ut(-1,1),t.tag=2,on(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=i,e)}var Yp=Vt.ReactCurrentOwner,Qe=!1;function Ge(e,t,n,r){t.child=e===null?Pc(t,null,n,r):tr(t,e.child,n,r)}function pu(e,t,n,r,i){n=n.render;var a=t.ref;return Qn(t,i),r=Al(e,t,n,r,a,i),n=Ll(),e!==null&&!Qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Xt(e,t,i)):(se&&n&&yl(t),t.flags|=1,Ge(e,t,r,i),t.child)}function fu(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!Hl(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,ed(e,t,a,r,i)):(e=Ui(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:jr,n(o,r)&&e.ref===t.ref)return Xt(e,t,i)}return t.flags|=1,e=un(a,r),e.ref=t.ref,e.return=t,t.child=e}function ed(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(jr(a,r)&&e.ref===t.ref)if(Qe=!1,t.pendingProps=r=a,(e.lanes&i)!==0)(e.flags&131072)!==0&&(Qe=!0);else return t.lanes=e.lanes,Xt(e,t,i)}return jo(e,t,n,r,i)}function td(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ie(Vn,tt),tt|=n;else{if((n&1073741824)===0)return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ie(Vn,tt),tt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,ie(Vn,tt),tt|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,ie(Vn,tt),tt|=r;return Ge(e,t,i,n),t.child}function nd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function jo(e,t,n,r,i){var a=Ze(n)?Sn:je.current;return a=Jn(t,a),Qn(t,i),n=Al(e,t,n,r,a,i),r=Ll(),e!==null&&!Qe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Xt(e,t,i)):(se&&r&&yl(t),t.flags|=1,Ge(e,t,n,i),t.child)}function gu(e,t,n,r,i){if(Ze(n)){var a=!0;Ki(t)}else a=!1;if(Qn(t,i),t.stateNode===null)Di(e,t),Kc(t,n,r),Ho(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var s=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=gt(c):(c=Ze(n)?Sn:je.current,c=Jn(t,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||s!==c)&&uu(t,o,r,c),Qt=!1;var p=t.memoizedState;o.state=p,na(t,r,o,i),s=t.memoizedState,l!==r||p!==s||Ke.current||Qt?(typeof f=="function"&&(Uo(t,n,f,r),s=t.memoizedState),(l=Qt||su(t,n,l,r,p,s,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Ac(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:wt(t.type,l),o.props=c,m=t.pendingProps,p=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=gt(s):(s=Ze(n)?Sn:je.current,s=Jn(t,s));var v=n.getDerivedStateFromProps;(f=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||p!==s)&&uu(t,o,r,s),Qt=!1,p=t.memoizedState,o.state=p,na(t,r,o,i);var y=t.memoizedState;l!==m||p!==y||Ke.current||Qt?(typeof v=="function"&&(Uo(t,n,v,r),y=t.memoizedState),(c=Qt||su(t,n,c,r,p,y,s)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),o.props=r,o.state=y,o.context=s,r=c):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return Xo(e,t,n,r,a,i)}function Xo(e,t,n,r,i,a){nd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&eu(t,n,!1),Xt(e,t,a);r=t.stateNode,Yp.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=tr(t,e.child,null,a),t.child=tr(t,null,l,a)):Ge(e,t,l,a),t.memoizedState=r.state,i&&eu(t,n,!0),t.child}function rd(e){var t=e.stateNode;t.pendingContext?Js(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Js(e,t.context,!1),El(e,t.containerInfo)}function mu(e,t,n,r,i){return er(),wl(i),t.flags|=256,Ge(e,t,n,r),t.child}var Vo={dehydrated:null,treeContext:null,retryLane:0};function Go(e){return{baseLanes:e,cachePool:null,transitions:null}}function id(e,t,n){var r=t.pendingProps,i=de.current,a=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),ie(de,i&1),e===null)return Io(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},(r&1)===0&&a!==null?(a.childLanes=0,a.pendingProps=o):a=ka(o,r,0,null),e=bn(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Go(n),t.memoizedState=Vo,e):Bl(t,o));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return $p(e,t,o,r,l,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,l=i.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=un(i,s),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?a=un(l,a):(a=bn(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?Go(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Vo,r}return a=e.child,e=a.sibling,r=un(a,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Bl(e,t){return t=ka({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Pi(e,t,n,r){return r!==null&&wl(r),tr(t,e.child,null,n),e=Bl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function $p(e,t,n,r,i,a,o){if(n)return t.flags&256?(t.flags&=-257,r=ao(Error(k(422))),Pi(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=ka({mode:"visible",children:r.children},i,0,null),a=bn(a,i,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,(t.mode&1)!==0&&tr(t,e.child,null,o),t.child.memoizedState=Go(o),t.memoizedState=Vo,a);if((t.mode&1)===0)return Pi(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,a=Error(k(419)),r=ao(a,r,void 0),Pi(e,t,o,r)}if(l=(o&e.childLanes)!==0,Qe||l){if(r=Ce,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=(i&(r.suspendedLanes|o))!==0?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,jt(e,i),Tt(r,e,i,-1))}return Ul(),r=ao(Error(k(421))),Pi(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=sf.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,nt=an(i.nextSibling),rt=t,se=!0,bt=null,e!==null&&(dt[ht++]=It,dt[ht++]=Wt,dt[ht++]=Tn,It=e.id,Wt=e.overflow,Tn=t),t=Bl(t,r.children),t.flags|=4096,t)}function vu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wo(e.return,t,n)}function oo(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function ad(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Ge(e,t,r.children,n),r=de.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vu(e,n,t);else if(e.tag===19)vu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ie(de,r),(t.mode&1)===0)t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ra(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),oo(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ra(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}oo(t,!0,n,null,a);break;case"together":oo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Di(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Xt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),En|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function qp(e,t,n){switch(t.tag){case 3:rd(t),er();break;case 5:Lc(t);break;case 1:Ze(t.type)&&Ki(t);break;case 4:El(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;ie(ea,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ie(de,de.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?id(e,t,n):(ie(de,de.current&1),e=Xt(e,t,n),e!==null?e.sibling:null);ie(de,de.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return ad(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ie(de,de.current),r)break;return null;case 22:case 23:return t.lanes=0,td(e,t,n)}return Xt(e,t,n)}var od,Yo,ld,sd;od=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Yo=function(){};ld=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,wn(zt.current);var a=null;switch(n){case"input":i=go(e,i),r=go(e,r),a=[];break;case"select":i=pe({},i,{value:void 0}),r=pe({},r,{value:void 0}),a=[];break;case"textarea":i=yo(e,i),r=yo(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=qi)}wo(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Fr.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var s=r[c];if(l=i?.[c],r.hasOwnProperty(c)&&s!==l&&(s!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&l[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(a||(a=[]),a.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(a=a||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(a=a||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Fr.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&ae("scroll",e),a||l===s||(a=[])):(a=a||[]).push(c,s))}n&&(a=a||[]).push("style",n);var c=a;(t.updateQueue=c)&&(t.flags|=4)}};sd=function(e,t,n,r){n!==r&&(t.flags|=4)};function wr(e,t){if(!se)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function He(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Qp(e,t,n){var r=t.pendingProps;switch(xl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return He(t),null;case 1:return Ze(t.type)&&Qi(),He(t),null;case 3:return r=t.stateNode,nr(),oe(Ke),oe(je),Pl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ei(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,bt!==null&&(tl(bt),bt=null))),Yo(e,t),He(t),null;case 5:_l(t);var i=wn($r.current);if(n=t.type,e!==null&&t.stateNode!=null)ld(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return He(t),null}if(e=wn(zt.current),Ei(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Lt]=t,r[Gr]=a,e=(t.mode&1)!==0,n){case"dialog":ae("cancel",r),ae("close",r);break;case"iframe":case"object":case"embed":ae("load",r);break;case"video":case"audio":for(i=0;i<Er.length;i++)ae(Er[i],r);break;case"source":ae("error",r);break;case"img":case"image":case"link":ae("error",r),ae("load",r);break;case"details":ae("toggle",r);break;case"input":Cs(r,a),ae("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},ae("invalid",r);break;case"textarea":_s(r,a),ae("invalid",r)}wo(n,a),i=null;for(var o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="children"?typeof l=="string"?r.textContent!==l&&(a.suppressHydrationWarning!==!0&&Ci(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(a.suppressHydrationWarning!==!0&&Ci(r.textContent,l,e),i=["children",""+l]):Fr.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ae("scroll",r)}switch(n){case"input":pi(r),Es(r,a,!0);break;case"textarea":pi(r),Ps(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=qi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Lt]=t,e[Gr]=r,od(e,t,!1,!1),t.stateNode=e;e:{switch(o=ko(n,r),n){case"dialog":ae("cancel",e),ae("close",e),i=r;break;case"iframe":case"object":case"embed":ae("load",e),i=r;break;case"video":case"audio":for(i=0;i<Er.length;i++)ae(Er[i],e);i=r;break;case"source":ae("error",e),i=r;break;case"img":case"image":case"link":ae("error",e),ae("load",e),i=r;break;case"details":ae("toggle",e),i=r;break;case"input":Cs(e,r),i=go(e,r),ae("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=pe({},r,{value:void 0}),ae("invalid",e);break;case"textarea":_s(e,r),i=yo(e,r),ae("invalid",e);break;default:i=r}wo(n,i),l=i;for(a in l)if(l.hasOwnProperty(a)){var s=l[a];a==="style"?Wu(e,s):a==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Du(e,s)):a==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Dr(e,s):typeof s=="number"&&Dr(e,""+s):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Fr.hasOwnProperty(a)?s!=null&&a==="onScroll"&&ae("scroll",e):s!=null&&il(e,a,s,o))}switch(n){case"input":pi(e),Es(e,r,!1);break;case"textarea":pi(e),Ps(e);break;case"option":r.value!=null&&e.setAttribute("value",""+cn(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Gn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Gn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=qi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return He(t),null;case 6:if(e&&t.stateNode!=null)sd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=wn($r.current),wn(zt.current),Ei(t)){if(r=t.stateNode,n=t.memoizedProps,r[Lt]=t,(a=r.nodeValue!==n)&&(e=rt,e!==null))switch(e.tag){case 3:Ci(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ci(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Lt]=t,t.stateNode=r}return He(t),null;case 13:if(oe(de),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(se&&nt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Ec(),er(),t.flags|=98560,a=!1;else if(a=Ei(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(k(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(k(317));a[Lt]=t}else er(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;He(t),a=!1}else bt!==null&&(tl(bt),bt=null),a=!0;if(!a)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(de.current&1)!==0?we===0&&(we=3):Ul())),t.updateQueue!==null&&(t.flags|=4),He(t),null);case 4:return nr(),Yo(e,t),e===null&&Xr(t.stateNode.containerInfo),He(t),null;case 10:return Sl(t.type._context),He(t),null;case 17:return Ze(t.type)&&Qi(),He(t),null;case 19:if(oe(de),a=t.memoizedState,a===null)return He(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)wr(a,!1);else{if(we!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=ra(e),o!==null){for(t.flags|=128,wr(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ie(de,de.current&1|2),t.child}e=e.sibling}a.tail!==null&&me()>ir&&(t.flags|=128,r=!0,wr(a,!1),t.lanes=4194304)}else{if(!r)if(e=ra(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),wr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!se)return He(t),null}else 2*me()-a.renderingStartTime>ir&&n!==1073741824&&(t.flags|=128,r=!0,wr(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=me(),t.sibling=null,n=de.current,ie(de,r?n&1|2:n&1),t):(He(t),null);case 22:case 23:return Wl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(tt&1073741824)!==0&&(He(t),t.subtreeFlags&6&&(t.flags|=8192)):He(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Kp(e,t){switch(xl(t),t.tag){case 1:return Ze(t.type)&&Qi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return nr(),oe(Ke),oe(je),Pl(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return _l(t),null;case 13:if(oe(de),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));er()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(de),null;case 4:return nr(),null;case 10:return Sl(t.type._context),null;case 22:case 23:return Wl(),null;case 24:return null;default:return null}}var Mi=!1,Oe=!1,Zp=typeof WeakSet=="function"?WeakSet:Set,P=null;function Xn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ge(e,t,r)}else n.current=null}function $o(e,t,n){try{n()}catch(r){ge(e,t,r)}}var yu=!1;function Jp(e,t){if(Lo=Gi,e=pc(),vl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,l=-1,s=-1,c=0,f=0,m=e,p=null;t:for(;;){for(var v;m!==n||i!==0&&m.nodeType!==3||(l=o+i),m!==a||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(v=m.firstChild)!==null;)p=m,m=v;for(;;){if(m===e)break t;if(p===n&&++c===i&&(l=o),p===a&&++f===r&&(s=o),(v=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=v}n=l===-1||s===-1?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ro={focusedElem:e,selectionRange:n},Gi=!1,P=t;P!==null;)if(t=P,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,P=e;else for(;P!==null;){t=P;try{var y=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var x=y.memoizedProps,A=y.memoizedState,h=t.stateNode,u=h.getSnapshotBeforeUpdate(t.elementType===t.type?x:wt(t.type,x),A);h.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var d=t.stateNode.containerInfo;d.nodeType===1?d.textContent="":d.nodeType===9&&d.documentElement&&d.removeChild(d.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(g){ge(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,P=e;break}P=t.return}return y=yu,yu=!1,y}function zr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&$o(t,n,a)}i=i.next}while(i!==r)}}function xa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function qo(e){var t=e.ref;if(t!==null){var n=e.stateNode;e.tag,e=n,typeof t=="function"?t(e):t.current=e}}function ud(e){var t=e.alternate;t!==null&&(e.alternate=null,ud(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Lt],delete t[Gr],delete t[No],delete t[Np],delete t[Fp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function cd(e){return e.tag===5||e.tag===3||e.tag===4}function xu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||cd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=qi));else if(r!==4&&(e=e.child,e!==null))for(Qo(e,t,n),e=e.sibling;e!==null;)Qo(e,t,n),e=e.sibling}function Ko(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ko(e,t,n),e=e.sibling;e!==null;)Ko(e,t,n),e=e.sibling}var Re=null,kt=!1;function $t(e,t,n){for(n=n.child;n!==null;)dd(e,t,n),n=n.sibling}function dd(e,t,n){if(Rt&&typeof Rt.onCommitFiberUnmount=="function")try{Rt.onCommitFiberUnmount(da,n)}catch{}switch(n.tag){case 5:Oe||Xn(n,t);case 6:var r=Re,i=kt;Re=null,$t(e,t,n),Re=r,kt=i,Re!==null&&(kt?(e=Re,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Re.removeChild(n.stateNode));break;case 18:Re!==null&&(kt?(e=Re,n=n.stateNode,e.nodeType===8?Ja(e.parentNode,n):e.nodeType===1&&Ja(e,n),Hr(e)):Ja(Re,n.stateNode));break;case 4:r=Re,i=kt,Re=n.stateNode.containerInfo,kt=!0,$t(e,t,n),Re=r,kt=i;break;case 0:case 11:case 14:case 15:if(!Oe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&((a&2)!==0||(a&4)!==0)&&$o(n,t,o),i=i.next}while(i!==r)}$t(e,t,n);break;case 1:if(!Oe&&(Xn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ge(n,t,l)}$t(e,t,n);break;case 21:$t(e,t,n);break;case 22:n.mode&1?(Oe=(r=Oe)||n.memoizedState!==null,$t(e,t,n),Oe=r):$t(e,t,n);break;default:$t(e,t,n)}}function wu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Zp),t.forEach(function(r){var i=uf.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function xt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:Re=l.stateNode,kt=!1;break e;case 3:Re=l.stateNode.containerInfo,kt=!0;break e;case 4:Re=l.stateNode.containerInfo,kt=!0;break e}l=l.return}if(Re===null)throw Error(k(160));dd(a,o,i),Re=null,kt=!1;var s=i.alternate;s!==null&&(s.return=null),i.return=null}catch(c){ge(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)hd(t,e),t=t.sibling}function hd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(xt(t,e),Mt(e),r&4){try{zr(3,e,e.return),xa(3,e)}catch(x){ge(e,e.return,x)}try{zr(5,e,e.return)}catch(x){ge(e,e.return,x)}}break;case 1:xt(t,e),Mt(e),r&512&&n!==null&&Xn(n,n.return);break;case 5:if(xt(t,e),Mt(e),r&512&&n!==null&&Xn(n,n.return),e.flags&32){var i=e.stateNode;try{Dr(i,"")}catch(x){ge(e,e.return,x)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&a.type==="radio"&&a.name!=null&&Bu(i,a),ko(l,o);var c=ko(l,a);for(o=0;o<s.length;o+=2){var f=s[o],m=s[o+1];f==="style"?Wu(i,m):f==="dangerouslySetInnerHTML"?Du(i,m):f==="children"?Dr(i,m):il(i,f,m,c)}switch(l){case"input":mo(i,a);break;case"textarea":Nu(i,a);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var v=a.value;v!=null?Gn(i,!!a.multiple,v,!1):p!==!!a.multiple&&(a.defaultValue!=null?Gn(i,!!a.multiple,a.defaultValue,!0):Gn(i,!!a.multiple,a.multiple?[]:"",!1))}i[Gr]=a}catch(x){ge(e,e.return,x)}}break;case 6:if(xt(t,e),Mt(e),r&4){if(e.stateNode===null)throw Error(k(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(x){ge(e,e.return,x)}}break;case 3:if(xt(t,e),Mt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hr(t.containerInfo)}catch(x){ge(e,e.return,x)}break;case 4:xt(t,e),Mt(e);break;case 13:xt(t,e),Mt(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Dl=me())),r&4&&wu(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(Oe=(c=Oe)||f,xt(t,e),Oe=c):xt(t,e),Mt(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&(e.mode&1)!==0)for(P=e,f=e.child;f!==null;){for(m=P=f;P!==null;){switch(p=P,v=p.child,p.tag){case 0:case 11:case 14:case 15:zr(4,p,p.return);break;case 1:Xn(p,p.return);var y=p.stateNode;if(typeof y.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(x){ge(r,n,x)}}break;case 5:Xn(p,p.return);break;case 22:if(p.memoizedState!==null){bu(m);continue}}v!==null?(v.return=p,P=v):bu(m)}f=f.sibling}e:for(f=null,m=e;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,c?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(l=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=Iu("display",o))}catch(x){ge(e,e.return,x)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(x){ge(e,e.return,x)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:xt(t,e),Mt(e),r&4&&wu(e);break;case 21:break;default:xt(t,e),Mt(e)}}function Mt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(cd(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Dr(i,""),r.flags&=-33);var a=xu(e);Ko(e,a,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=xu(e);Qo(e,l,o);break;default:throw Error(k(161))}}catch(s){ge(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ef(e,t,n){P=e,pd(e,t,n)}function pd(e,t,n){for(var r=(e.mode&1)!==0;P!==null;){var i=P,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Mi;if(!o){var l=i.alternate,s=l!==null&&l.memoizedState!==null||Oe;l=Mi;var c=Oe;if(Mi=o,(Oe=s)&&!c)for(P=i;P!==null;)o=P,s=o.child,o.tag===22&&o.memoizedState!==null?Su(i):s!==null?(s.return=o,P=s):Su(i);for(;a!==null;)P=a,pd(a,t,n),a=a.sibling;P=i,Mi=l,Oe=c}ku(e,t,n)}else(i.subtreeFlags&8772)!==0&&a!==null?(a.return=i,P=a):ku(e,t,n)}}function ku(e){for(;P!==null;){var t=P;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Oe||xa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Oe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:wt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&au(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}au(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Hr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}Oe||t.flags&512&&qo(t)}catch(p){ge(t,t.return,p)}}if(t===e){P=null;break}if(n=t.sibling,n!==null){n.return=t.return,P=n;break}P=t.return}}function bu(e){for(;P!==null;){var t=P;if(t===e){P=null;break}var n=t.sibling;if(n!==null){n.return=t.return,P=n;break}P=t.return}}function Su(e){for(;P!==null;){var t=P;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{xa(4,t)}catch(s){ge(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(s){ge(t,i,s)}}var a=t.return;try{qo(t)}catch(s){ge(t,a,s)}break;case 5:var o=t.return;try{qo(t)}catch(s){ge(t,o,s)}}}catch(s){ge(t,t.return,s)}if(t===e){P=null;break}var l=t.sibling;if(l!==null){l.return=t.return,P=l;break}P=t.return}}var tf=Math.ceil,oa=Vt.ReactCurrentDispatcher,Nl=Vt.ReactCurrentOwner,ft=Vt.ReactCurrentBatchConfig,$=0,Ce=null,ve=null,ze=0,tt=0,Vn=pn(0),we=0,Zr=null,En=0,wa=0,Fl=0,Br=null,qe=null,Dl=0,ir=1/0,Ft=null,la=!1,Zo=null,ln=null,Ai=!1,en=null,sa=0,Nr=0,Jo=null,Ii=-1,Wi=0;function Ye(){return($&6)!==0?me():Ii!==-1?Ii:Ii=me()}function sn(e){return(e.mode&1)===0?1:($&2)!==0&&ze!==0?ze&-ze:Ip.transition!==null?(Wi===0&&(Wi=Ku()),Wi):(e=ee,e!==0||(e=window.event,e=e===void 0?16:ic(e.type)),e)}function Tt(e,t,n,r){if(50<Nr)throw Nr=0,Jo=null,Error(k(185));Jr(e,n,r),(($&2)===0||e!==Ce)&&(e===Ce&&(($&2)===0&&(wa|=n),we===4&&Zt(e,ze)),Je(e,r),n===1&&$===0&&(t.mode&1)===0&&(ir=me()+500,ma&&fn()))}function Je(e,t){var n=e.callbackNode;Uh(e,t);var r=Vi(e,e===Ce?ze:0);if(r===0)n!==null&&Ls(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ls(n),t===1)e.tag===0?Dp(Tu.bind(null,e)):Sc(Tu.bind(null,e)),zp(function(){($&6)===0&&fn()}),n=null;else{switch(Zu(r)){case 1:n=ul;break;case 4:n=qu;break;case 16:n=Xi;break;case 536870912:n=Qu;break;default:n=Xi}n=kd(n,fd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function fd(e,t){if(Ii=-1,Wi=0,($&6)!==0)throw Error(k(327));var n=e.callbackNode;if(Kn()&&e.callbackNode!==n)return null;var r=Vi(e,e===Ce?ze:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=ua(e,r);else{t=r;var i=$;$|=2;var a=md();(Ce!==e||ze!==t)&&(Ft=null,ir=me()+500,kn(e,t));do try{af();break}catch(l){gd(e,l)}while(!0);bl(),oa.current=a,$=i,ve!==null?t=0:(Ce=null,ze=0,t=we)}if(t!==0){if(t===2&&(i=Eo(e),i!==0&&(r=i,t=el(e,i))),t===1)throw n=Zr,kn(e,0),Zt(e,r),Je(e,me()),n;if(t===6)Zt(e,r);else{if(i=e.current.alternate,(r&30)===0&&!nf(i)&&(t=ua(e,r),t===2&&(a=Eo(e),a!==0&&(r=a,t=el(e,a))),t===1))throw n=Zr,kn(e,0),Zt(e,r),Je(e,me()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:vn(e,qe,Ft);break;case 3:if(Zt(e,r),(r&130023424)===r&&(t=Dl+500-me(),10<t)){if(Vi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ye(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Bo(vn.bind(null,e,qe,Ft),t);break}vn(e,qe,Ft);break;case 4:if(Zt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-St(r);a=1<<o,o=t[o],o>i&&(i=o),r&=~a}if(r=i,r=me()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*tf(r/1960))-r,10<r){e.timeoutHandle=Bo(vn.bind(null,e,qe,Ft),r);break}vn(e,qe,Ft);break;case 5:vn(e,qe,Ft);break;default:throw Error(k(329))}}}return Je(e,me()),e.callbackNode===n?fd.bind(null,e):null}function el(e,t){var n=Br;return e.current.memoizedState.isDehydrated&&(kn(e,t).flags|=256),e=ua(e,t),e!==2&&(t=qe,qe=n,t!==null&&tl(t)),e}function tl(e){qe===null?qe=e:qe.push.apply(qe,e)}function nf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ct(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zt(e,t){for(t&=~Fl,t&=~wa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-St(t),r=1<<n;e[n]=-1,t&=~r}}function Tu(e){if(($&6)!==0)throw Error(k(327));Kn();var t=Vi(e,0);if((t&1)===0)return Je(e,me()),null;var n=ua(e,t);if(e.tag!==0&&n===2){var r=Eo(e);r!==0&&(t=r,n=el(e,r))}if(n===1)throw n=Zr,kn(e,0),Zt(e,t),Je(e,me()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,vn(e,qe,Ft),Je(e,me()),null}function Il(e,t){var n=$;$|=1;try{return e(t)}finally{$=n,$===0&&(ir=me()+500,ma&&fn())}}function _n(e){en!==null&&en.tag===0&&($&6)===0&&Kn();var t=$;$|=1;var n=ft.transition,r=ee;try{if(ft.transition=null,ee=1,e)return e()}finally{ee=r,ft.transition=n,$=t,($&6)===0&&fn()}}function Wl(){tt=Vn.current,oe(Vn)}function kn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Rp(n)),ve!==null)for(n=ve.return;n!==null;){var r=n;switch(xl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qi();break;case 3:nr(),oe(Ke),oe(je),Pl();break;case 5:_l(r);break;case 4:nr();break;case 13:oe(de);break;case 19:oe(de);break;case 10:Sl(r.type._context);break;case 22:case 23:Wl()}n=n.return}if(Ce=e,ve=e=un(e.current,null),ze=tt=t,we=0,Zr=null,Fl=wa=En=0,qe=Br=null,xn!==null){for(t=0;t<xn.length;t++)if(n=xn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}xn=null}return e}function gd(e,t){do{var n=ve;try{if(bl(),Ni.current=aa,ia){for(var r=he.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ia=!1}if(Cn=0,Te=xe=he=null,Rr=!1,qr=0,Nl.current=null,n===null||n.return===null){we=1,Zr=t,ve=null;break}e:{var a=e,o=n.return,l=n,s=t;if(t=ze,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,f=l,m=f.tag;if((f.mode&1)===0&&(m===0||m===11||m===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=du(o);if(v!==null){v.flags&=-257,hu(v,o,l,a,t),v.mode&1&&cu(a,c,t),t=v,s=c;var y=t.updateQueue;if(y===null){var x=new Set;x.add(s),t.updateQueue=x}else y.add(s);break e}else{if((t&1)===0){cu(a,c,t),Ul();break e}s=Error(k(426))}}else if(se&&l.mode&1){var A=du(o);if(A!==null){(A.flags&65536)===0&&(A.flags|=256),hu(A,o,l,a,t),wl(rr(s,l));break e}}a=s=rr(s,l),we!==4&&(we=2),Br===null?Br=[a]:Br.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var h=Zc(a,s,t);iu(a,h);break e;case 1:l=s;var u=a.type,d=a.stateNode;if((a.flags&128)===0&&(typeof u.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ln===null||!ln.has(d)))){a.flags|=65536,t&=-t,a.lanes|=t;var g=Jc(a,l,t);iu(a,g);break e}}a=a.return}while(a!==null)}yd(n)}catch(w){t=w,ve===n&&n!==null&&(ve=n=n.return);continue}break}while(!0)}function md(){var e=oa.current;return oa.current=aa,e===null?aa:e}function Ul(){(we===0||we===3||we===2)&&(we=4),Ce===null||(En&268435455)===0&&(wa&268435455)===0||Zt(Ce,ze)}function ua(e,t){var n=$;$|=2;var r=md();(Ce!==e||ze!==t)&&(Ft=null,kn(e,t));do try{rf();break}catch(i){gd(e,i)}while(!0);if(bl(),$=n,oa.current=r,ve!==null)throw Error(k(261));return Ce=null,ze=0,we}function rf(){for(;ve!==null;)vd(ve)}function af(){for(;ve!==null&&!Lh();)vd(ve)}function vd(e){var t=wd(e.alternate,e,tt);e.memoizedProps=e.pendingProps,t===null?yd(e):ve=t,Nl.current=null}function yd(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Qp(n,t,tt),n!==null){ve=n;return}}else{if(n=Kp(n,t),n!==null){n.flags&=32767,ve=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{we=6,ve=null;return}}if(t=t.sibling,t!==null){ve=t;return}ve=t=e}while(t!==null);we===0&&(we=5)}function vn(e,t,n){var r=ee,i=ft.transition;try{ft.transition=null,ee=1,of(e,t,n,r)}finally{ft.transition=i,ee=r}return null}function of(e,t,n,r){do Kn();while(en!==null);if(($&6)!==0)throw Error(k(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Hh(e,a),e===Ce&&(ve=Ce=null,ze=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ai||(Ai=!0,kd(Xi,function(){return Kn(),null})),a=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||a){a=ft.transition,ft.transition=null;var o=ee;ee=1;var l=$;$|=4,Nl.current=null,Jp(e,n),hd(n,e),_p(Ro),Gi=!!Lo,Ro=Lo=null,e.current=n,ef(n,e,i),Rh(),$=l,ee=o,ft.transition=a}else e.current=n;if(Ai&&(Ai=!1,en=e,sa=i),a=e.pendingLanes,a===0&&(ln=null),Nh(n.stateNode,r),Je(e,me()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(la)throw la=!1,e=Zo,Zo=null,e;return(sa&1)!==0&&e.tag!==0&&Kn(),a=e.pendingLanes,(a&1)!==0?e===Jo?Nr++:(Nr=0,Jo=e):Nr=0,fn(),null}function Kn(){if(en!==null){var e=Zu(sa),t=ft.transition,n=ee;try{if(ft.transition=null,ee=16>e?16:e,en===null)var r=!1;else{if(e=en,en=null,sa=0,($&6)!==0)throw Error(k(331));var i=$;for($|=4,P=e.current;P!==null;){var a=P,o=a.child;if((P.flags&16)!==0){var l=a.deletions;if(l!==null){for(var s=0;s<l.length;s++){var c=l[s];for(P=c;P!==null;){var f=P;switch(f.tag){case 0:case 11:case 15:zr(8,f,a)}var m=f.child;if(m!==null)m.return=f,P=m;else for(;P!==null;){f=P;var p=f.sibling,v=f.return;if(ud(f),f===c){P=null;break}if(p!==null){p.return=v,P=p;break}P=v}}}var y=a.alternate;if(y!==null){var x=y.child;if(x!==null){y.child=null;do{var A=x.sibling;x.sibling=null,x=A}while(x!==null)}}P=a}}if((a.subtreeFlags&2064)!==0&&o!==null)o.return=a,P=o;else e:for(;P!==null;){if(a=P,(a.flags&2048)!==0)switch(a.tag){case 0:case 11:case 15:zr(9,a,a.return)}var h=a.sibling;if(h!==null){h.return=a.return,P=h;break e}P=a.return}}var u=e.current;for(P=u;P!==null;){o=P;var d=o.child;if((o.subtreeFlags&2064)!==0&&d!==null)d.return=o,P=d;else e:for(o=u;P!==null;){if(l=P,(l.flags&2048)!==0)try{switch(l.tag){case 0:case 11:case 15:xa(9,l)}}catch(w){ge(l,l.return,w)}if(l===o){P=null;break e}var g=l.sibling;if(g!==null){g.return=l.return,P=g;break e}P=l.return}}if($=i,fn(),Rt&&typeof Rt.onPostCommitFiberRoot=="function")try{Rt.onPostCommitFiberRoot(da,e)}catch{}r=!0}return r}finally{ee=n,ft.transition=t}}return!1}function Cu(e,t,n){t=rr(n,t),t=Zc(e,t,1),e=on(e,t,1),t=Ye(),e!==null&&(Jr(e,1,t),Je(e,t))}function ge(e,t,n){if(e.tag===3)Cu(e,e,n);else for(;t!==null;){if(t.tag===3){Cu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ln===null||!ln.has(r))){e=rr(n,e),e=Jc(t,e,1),t=on(t,e,1),e=Ye(),t!==null&&(Jr(t,1,e),Je(t,e));break}}t=t.return}}function lf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ye(),e.pingedLanes|=e.suspendedLanes&n,Ce===e&&(ze&n)===n&&(we===4||we===3&&(ze&130023424)===ze&&500>me()-Dl?kn(e,0):Fl|=n),Je(e,t)}function xd(e,t){t===0&&((e.mode&1)===0?t=1:(t=mi,mi<<=1,(mi&130023424)===0&&(mi=4194304)));var n=Ye();e=jt(e,t),e!==null&&(Jr(e,t,n),Je(e,n))}function sf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),xd(e,n)}function uf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),xd(e,n)}var wd;wd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ke.current)Qe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Qe=!1,qp(e,t,n);Qe=(e.flags&131072)!==0}else Qe=!1,se&&(t.flags&1048576)!==0&&Tc(t,Ji,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Di(e,t),e=t.pendingProps;var i=Jn(t,je.current);Qn(t,n),i=Al(null,t,r,e,i,n);var a=Ll();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ze(r)?(a=!0,Ki(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Cl(t),i.updater=ya,t.stateNode=i,i._reactInternals=t,Ho(t,r,e,n),t=Xo(null,t,r,!0,a,n)):(t.tag=0,se&&a&&yl(t),Ge(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Di(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=df(r),e=wt(r,e),i){case 0:t=jo(null,t,r,e,n);break e;case 1:t=gu(null,t,r,e,n);break e;case 11:t=pu(null,t,r,e,n);break e;case 14:t=fu(null,t,r,wt(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:wt(r,i),jo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:wt(r,i),gu(e,t,r,i,n);case 3:e:{if(rd(t),e===null)throw Error(k(387));r=t.pendingProps,a=t.memoizedState,i=a.element,Ac(e,t),na(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=rr(Error(k(423)),t),t=mu(e,t,r,n,i);break e}else if(r!==i){i=rr(Error(k(424)),t),t=mu(e,t,r,n,i);break e}else for(nt=an(t.stateNode.containerInfo.firstChild),rt=t,se=!0,bt=null,n=Pc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(er(),r===i){t=Xt(e,t,n);break e}Ge(e,t,r,n)}t=t.child}return t;case 5:return Lc(t),e===null&&Io(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,zo(r,i)?o=null:a!==null&&zo(r,a)&&(t.flags|=32),nd(e,t),Ge(e,t,o,n),t.child;case 6:return e===null&&Io(t),null;case 13:return id(e,t,n);case 4:return El(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=tr(t,null,r,n):Ge(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:wt(r,i),pu(e,t,r,i,n);case 7:return Ge(e,t,t.pendingProps,n),t.child;case 8:return Ge(e,t,t.pendingProps.children,n),t.child;case 12:return Ge(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,o=i.value,ie(ea,r._currentValue),r._currentValue=o,a!==null)if(Ct(a.value,o)){if(a.children===i.children&&!Ke.current){t=Xt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var l=a.dependencies;if(l!==null){o=a.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(a.tag===1){s=Ut(-1,n&-n),s.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?s.next=s:(s.next=f.next,f.next=s),c.pending=s}}a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Wo(a.return,n,t),l.lanes|=n;break}s=s.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(k(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Wo(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Ge(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Qn(t,n),i=gt(i),r=r(i),t.flags|=1,Ge(e,t,r,n),t.child;case 14:return r=t.type,i=wt(r,t.pendingProps),i=wt(r.type,i),fu(e,t,r,i,n);case 15:return ed(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:wt(r,i),Di(e,t),t.tag=1,Ze(r)?(e=!0,Ki(t)):e=!1,Qn(t,n),Kc(t,r,i),Ho(t,r,i,n),Xo(null,t,r,!0,e,n);case 19:return ad(e,t,n);case 22:return td(e,t,n)}throw Error(k(156,t.tag))};function kd(e,t){return $u(e,t)}function cf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pt(e,t,n,r){return new cf(e,t,n,r)}function Hl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function df(e){if(typeof e=="function")return Hl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ol)return 11;if(e===ll)return 14}return 2}function un(e,t){var n=e.alternate;return n===null?(n=pt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ui(e,t,n,r,i,a){var o=2;if(r=e,typeof e=="function")Hl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Nn:return bn(n.children,i,a,t);case al:o=8,i|=8;break;case co:return e=pt(12,n,t,i|2),e.elementType=co,e.lanes=a,e;case ho:return e=pt(13,n,t,i),e.elementType=ho,e.lanes=a,e;case po:return e=pt(19,n,t,i),e.elementType=po,e.lanes=a,e;case Lu:return ka(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mu:o=10;break e;case Au:o=9;break e;case ol:o=11;break e;case ll:o=14;break e;case qt:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=pt(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function bn(e,t,n,r){return e=pt(7,e,r,t),e.lanes=n,e}function ka(e,t,n,r){return e=pt(22,e,r,t),e.elementType=Lu,e.lanes=n,e.stateNode={isHidden:!1},e}function lo(e,t,n){return e=pt(6,e,null,t),e.lanes=n,e}function so(e,t,n){return t=pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function hf(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Va(0),this.expirationTimes=Va(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Va(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Ol(e,t,n,r,i,a,o,l,s){return e=new hf(e,t,n,l,s),t===1?(t=1,a===!0&&(t|=8)):t=0,a=pt(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Cl(a),e}function pf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Bn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function bd(e){if(!e)return dn;e=e._reactInternals;e:{if(Mn(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(Ze(n))return bc(e,n,t)}return t}function Sd(e,t,n,r,i,a,o,l,s){return e=Ol(n,r,!0,e,i,a,o,l,s),e.context=bd(null),n=e.current,r=Ye(),i=sn(n),a=Ut(r,i),a.callback=t??null,on(n,a,i),e.current.lanes=i,Jr(e,i,r),Je(e,r),e}function ba(e,t,n,r){var i=t.current,a=Ye(),o=sn(i);return n=bd(n),t.context===null?t.context=n:t.pendingContext=n,t=Ut(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=on(i,t,o),e!==null&&(Tt(e,i,o,a),Bi(e,i,o)),o}function ca(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function Eu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function jl(e,t){Eu(e,t),(e=e.alternate)&&Eu(e,t)}function ff(){return null}var Td=typeof reportError=="function"?reportError:function(e){console.error(e)};function Xl(e){this._internalRoot=e}Sa.prototype.render=Xl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));ba(e,t,null,null)};Sa.prototype.unmount=Xl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;_n(function(){ba(null,e,null,null)}),t[Ot]=null}};function Sa(e){this._internalRoot=e}Sa.prototype.unstable_scheduleHydration=function(e){if(e){var t=tc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Kt.length&&t!==0&&t<Kt[n].priority;n++);Kt.splice(n,0,e),n===0&&rc(e)}};function Vl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ta(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function _u(){}function gf(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var c=ca(o);a.call(c)}}var o=Sd(t,r,e,0,null,!1,!1,"",_u);return e._reactRootContainer=o,e[Ot]=o.current,Xr(e.nodeType===8?e.parentNode:e),_n(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=ca(s);l.call(c)}}var s=Ol(e,0,!1,null,null,!1,!1,"",_u);return e._reactRootContainer=s,e[Ot]=s.current,Xr(e.nodeType===8?e.parentNode:e),_n(function(){ba(t,s,n,r)}),s}function Ca(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i=="function"){var l=i;i=function(){var s=ca(o);l.call(s)}}ba(t,o,e,i)}else o=gf(n,t,e,i,r);return ca(o)}Ju=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Cr(t.pendingLanes);n!==0&&(cl(t,n|1),Je(t,me()),($&6)===0&&(ir=me()+500,fn()))}break;case 13:_n(function(){var r=jt(e,1);if(r!==null){var i=Ye();Tt(r,e,1,i)}}),jl(e,1)}};dl=function(e){if(e.tag===13){var t=jt(e,134217728);if(t!==null){var n=Ye();Tt(t,e,134217728,n)}jl(e,134217728)}};ec=function(e){if(e.tag===13){var t=sn(e),n=jt(e,t);if(n!==null){var r=Ye();Tt(n,e,t,r)}jl(e,t)}};tc=function(){return ee};nc=function(e,t){var n=ee;try{return ee=e,t()}finally{ee=n}};So=function(e,t,n){switch(t){case"input":if(mo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=ga(r);if(!i)throw Error(k(90));zu(r),mo(r,i)}}}break;case"textarea":Nu(e,n);break;case"select":t=n.value,t!=null&&Gn(e,!!n.multiple,t,!1)}};Ou=Il;ju=_n;var mf={usingClientEntryPoint:!1,Events:[ti,Wn,ga,Uu,Hu,Il]},kr={findFiberByHostInstance:yn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vf={bundleType:kr.bundleType,version:kr.version,rendererPackageName:kr.rendererPackageName,rendererConfig:kr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Gu(e),e===null?null:e.stateNode},findFiberByHostInstance:kr.findFiberByHostInstance||ff,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(br=__REACT_DEVTOOLS_GLOBAL_HOOK__,!br.isDisabled&&br.supportsFiber))try{da=br.inject(vf),Rt=br}catch{}var br;ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mf;ot.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vl(t))throw Error(k(200));return pf(e,t,null,n)};ot.createRoot=function(e,t){if(!Vl(e))throw Error(k(299));var n=!1,r="",i=Td;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Ol(e,1,!1,null,null,n,!1,r,i),e[Ot]=t.current,Xr(e.nodeType===8?e.parentNode:e),new Xl(t)};ot.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Gu(t),e=e===null?null:e.stateNode,e};ot.flushSync=function(e){return _n(e)};ot.hydrate=function(e,t,n){if(!Ta(t))throw Error(k(200));return Ca(null,e,t,!0,n)};ot.hydrateRoot=function(e,t,n){if(!Vl(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",o=Td;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Sd(t,null,e,1,n??null,i,!1,a,o),e[Ot]=t.current,Xr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Sa(t)};ot.render=function(e,t,n){if(!Ta(t))throw Error(k(200));return Ca(null,e,t,!1,n)};ot.unmountComponentAtNode=function(e){if(!Ta(e))throw Error(k(40));return e._reactRootContainer?(_n(function(){Ca(null,null,e,!1,function(){e._reactRootContainer=null,e[Ot]=null})}),!0):!1};ot.unstable_batchedUpdates=Il;ot.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Ta(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Ca(e,t,n,!1,r)};ot.version="18.3.1-next-f1338f8080-20240426"});var Gl=Nt((jf,_d)=>{"use strict";function Ed(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ed)}catch(e){console.error(e)}}Ed(),_d.exports=Cd()});var Md=Nt(Yl=>{"use strict";var Pd=Gl();Yl.createRoot=Pd.createRoot,Yl.hydrateRoot=Pd.hydrateRoot;var Xf});var Ld=Nt(Ea=>{"use strict";var yf=dr(),xf=Symbol.for("react.element"),wf=Symbol.for("react.fragment"),kf=Object.prototype.hasOwnProperty,bf=yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Sf={key:!0,ref:!0,__self:!0,__source:!0};function Ad(e,t,n){var r,i={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)kf.call(t,r)&&!Sf.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:xf,type:e,key:a,ref:o,props:i,_owner:bf.current}}Ea.Fragment=wf;Ea.jsx=Ad;Ea.jsxs=Ad});var zd=Nt((Yf,Rd)=>{"use strict";Rd.exports=Ld()});var Xe=ur(dr()),jd=ur(Md()),An=ur(Gl());var I=ur(zd(),1),M=ur(dr(),1);if(typeof document<"u"&&!document.getElementById("tactile-glass-ui-styles")){let e=document.createElement("style");e.id="tactile-glass-ui-styles",e.textContent=`:root {
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
`,document.head.appendChild(e)}var Tf=Object.defineProperty,Cf=(e,t,n)=>t in e?Tf(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,B=(e,t,n)=>Cf(e,typeof t!="symbol"?t+"":t,n),ke={refraction:4,thickness:8,bevelWidth:2,frost:2,dispersion:88,sheen:12,lightAngle:24,darkness:0,rim:16,fluidBright:36,fluidSpeed:80,fluidScale:24,fluidAuraWidth:8,fluidCenter:32,auroraFlow:100,hoverBright:264,lightTrack:100,clickWave:100},Ee={refraction:2,thickness:8,bevelWidth:2,frost:16,dispersion:80,sheen:40,lightAngle:24,darkness:0,rim:48,fluidBright:48,fluidSpeed:80,fluidScale:16,fluidAuraWidth:12,fluidCenter:0,auroraFlow:0,hoverBright:256,lightTrack:100,clickWave:96},Ne={refraction:72,thickness:16,bevelWidth:4,frost:80,dispersion:0,sheen:16,lightAngle:24,darkness:24,rim:40,fluidBright:32,fluidSpeed:0,fluidScale:4,fluidAuraWidth:32,fluidCenter:96,auroraFlow:0,hoverBright:144,lightTrack:100,clickWave:96},_e={refraction:2,thickness:8,bevelWidth:2,frost:8,dispersion:80,sheen:24,lightAngle:24,darkness:0,rim:48,fluidBright:40,fluidSpeed:80,fluidScale:8,fluidAuraWidth:12,fluidCenter:0,auroraFlow:64,hoverBright:256,lightTrack:100,clickWave:96};var Pe={refraction:88,thickness:72,bevelWidth:3,frost:4,dispersion:96,sheen:12,lightAngle:24,darkness:0,rim:16,fluidBright:24,fluidSpeed:64,fluidScale:16,fluidAuraWidth:16,fluidCenter:0,auroraFlow:100,hoverBright:200,lightTrack:100,clickWave:96},Me={refraction:80,thickness:48,bevelWidth:2,frost:40,dispersion:80,sheen:24,lightAngle:24,angle:24,darkness:0,rim:16,fluidBright:80,fluidSpeed:80,fluidScale:8,fluidAuraWidth:2,fluidCenter:8,auroraFlow:0,hoverBright:96,lightTrack:100,clickWave:96};var Ef=`#version 300 es
  in vec2 a_pos;
  out vec2 v_uv;
  void main() {
    v_uv = (a_pos + 1.0) * 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`,_f=`#version 300 es
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
`;function Bd(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)||console.error("TactileGlassEngine: Shader compile error",e.getShaderInfoLog(r)),r}function Pf(e){let t=e.createProgram();return e.attachShader(t,Bd(e,e.VERTEX_SHADER,Ef)),e.attachShader(t,Bd(e,e.FRAGMENT_SHADER,_f)),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)||console.error("TactileGlassEngine: Program link error",e.getProgramInfoLog(t)),t}function Nd(e){let t=e.trim();if(!t||t==="transparent")return null;if(t.startsWith("#")){let r=t.slice(1);if(r.length===3)return[parseInt(r[0]+r[0],16)/255,parseInt(r[1]+r[1],16)/255,parseInt(r[2]+r[2],16)/255];if(r.length>=6)return[parseInt(r.slice(0,2),16)/255,parseInt(r.slice(2,4),16)/255,parseInt(r.slice(4,6),16)/255]}let n=t.match(/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);return n?(n[4]!==void 0?parseFloat(n[4]):1)<=.01?null:[Math.min(255,Math.max(0,parseFloat(n[1])))/255,Math.min(255,Math.max(0,parseFloat(n[2])))/255,Math.min(255,Math.max(0,parseFloat(n[3])))/255]:null}function Mf(e){if(typeof window<"u"&&typeof document<"u"){let t=e?.parentElement||document.body;for(;t;){let i=window.getComputedStyle(t).backgroundColor,a=Nd(i);if(a)return a;t=t.parentElement}let n=window.getComputedStyle(document.documentElement).getPropertyValue("--bg-canvas"),r=Nd(n);if(r)return r}return[0,0,0]}function Fd(e,t,n,r,i){let a=0;n[0]=0,r[0]=-1/0,r[1]=1/0;for(let o=1;o<i;o++){let l=(e[o]+o*o-(e[n[a]]+n[a]*n[a]))/(2*o-2*n[a]);for(;l<=r[a];)a--,l=(e[o]+o*o-(e[n[a]]+n[a]*n[a]))/(2*o-2*n[a]);a++,n[a]=o,r[a]=l,r[a+1]=1/0}a=0;for(let o=0;o<i;o++){for(;r[a+1]<o;)a++;t[o]=(o-n[a])*(o-n[a])+e[n[a]]}}function Af(e,t,n){let r=new Float32Array(t*n),i=Math.max(t,n),a=new Float32Array(i),o=new Int32Array(i),l=new Float32Array(i+1);for(let s=0;s<t;s++){for(let c=0;c<n;c++)a[c]=e[c*t+s]?1e9:0;Fd(a,a,o,l,n);for(let c=0;c<n;c++)r[c*t+s]=a[c]}for(let s=0;s<n;s++){let c=s*t;for(let f=0;f<t;f++)a[f]=r[c+f];Fd(a,a,o,l,t);for(let f=0;f<t;f++)r[c+f]=Math.sqrt(a[f])}return r}function Lf(e,t,n,r,i,a,o,l){e.clearRect(0,0,t,n),e.font=i,"letterSpacing"in e&&(e.letterSpacing=a&&a!=="normal"?a:"0px"),e.textBaseline="alphabetic",e.textAlign="left",e.fillStyle="#ffffff",e.fillText(r,o,l);let s=e.getImageData(0,0,t,n).data,c=t*n,f=new Uint8Array(c);for(let u=0;u<c;u++)f[u]=s[u*4+3]>=128?1:0;let m=Af(f,t,n),p=new Float32Array(c);for(let u=0;u<c;u++){let d=m[u],g=s[u*4+3];g===0?p[u]=0:d<=2?p[u]=Math.max(0,d-1+g/255):p[u]=d}let v=new Float32Array(c),y=new Float32Array(c),x=6/16,A=4/16,h=1/16;for(let u=0;u<n;u++){let d=u*t;for(let g=0;g<t;g++){let w=Math.max(0,g-2),b=Math.max(0,g-1),T=Math.min(t-1,g+1),S=Math.min(t-1,g+2);v[d+g]=p[d+g]*x+(p[d+b]+p[d+T])*A+(p[d+w]+p[d+S])*h}}for(let u=0;u<n;u++){let d=u*t,g=Math.max(0,u-2)*t,w=Math.max(0,u-1)*t,b=Math.min(n-1,u+1)*t,T=Math.min(n-1,u+2)*t;for(let S=0;S<t;S++)y[d+S]=v[d+S]*x+(v[w+S]+v[b+S])*A+(v[g+S]+v[T+S])*h}for(let u=0;u<c;u++){let d=u*4;s[d+3]===0?(s[d]=0,s[d+1]=0,s[d+2]=0,s[d+3]=0):(s[d]=Math.min(255,Math.round(y[u]*8)),s[d+1]=0,s[d+2]=0)}return s}var ql=class{constructor(){B(this,"glCanvas",null),B(this,"gl",null),B(this,"prog",null),B(this,"quadBuf",null),B(this,"bgTexture",null),B(this,"compositeCanvas",null),B(this,"compositeCtx",null),B(this,"compositeTexture",null),B(this,"textMaskCanvas",null),B(this,"textMaskCtx",null),B(this,"textMaskTextures",new Map),B(this,"uSrc",null),B(this,"uSrcComposite",null),B(this,"uTextMask",null),B(this,"uIsText",null),B(this,"uResolution",null),B(this,"uRect",null),B(this,"uRadius",null),B(this,"uUseBackdrop",null),B(this,"uTilt",null),B(this,"uBgColor",null),B(this,"uRefraction",null),B(this,"uThickness",null),B(this,"uBevelWidth",null),B(this,"uFrost",null),B(this,"uDispersion",null),B(this,"uSheen",null),B(this,"uLightAngle",null),B(this,"uDarkness",null),B(this,"uRim",null),B(this,"uTime",null),B(this,"uFluidBright",null),B(this,"uFluidSpeed",null),B(this,"uFluidScale",null),B(this,"uFluidAuraWidth",null),B(this,"uFluidCenter",null),B(this,"uAuroraFlow",null),B(this,"uMousePos",null),B(this,"uHoverStrength",null),B(this,"uLightTrack",null),B(this,"uHoverBright",null),B(this,"uClickPos",null),B(this,"uClickTime",null),B(this,"uClickWave",null),B(this,"uIsAudioDeck",null),B(this,"uSwitchThumb",null),B(this,"instances",new Map),B(this,"animId",null),B(this,"startTime",performance.now()),B(this,"isTabVisible",!0),B(this,"handleVisibilityChange",()=>{this.isTabVisible=!document.hidden,this.isTabVisible?this.instances.size>0&&!this.animId&&this.startLoop():this.stopLoop()}),typeof window<"u"&&document.addEventListener("visibilitychange",this.handleVisibilityChange)}initGL(){if(this.gl)return!0;if(typeof window>"u")return!1;this.glCanvas=document.createElement("canvas"),this.glCanvas.width=512,this.glCanvas.height=256;let t=this.glCanvas.getContext("webgl2",{alpha:!0,antialias:!1,powerPreference:"high-performance"});if(!t)return!1;this.gl=t,this.prog=Pf(t),this.quadBuf=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.quadBuf),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);let n=t.getAttribLocation(this.prog,"a_pos");return t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),this.uSrc=t.getUniformLocation(this.prog,"u_src"),this.uSrcComposite=t.getUniformLocation(this.prog,"u_srcComposite"),this.uTextMask=t.getUniformLocation(this.prog,"u_textMask"),this.uIsText=t.getUniformLocation(this.prog,"u_isText"),this.uResolution=t.getUniformLocation(this.prog,"u_resolution"),this.uRect=t.getUniformLocation(this.prog,"u_rect"),this.uRadius=t.getUniformLocation(this.prog,"u_radius"),this.uUseBackdrop=t.getUniformLocation(this.prog,"u_useBackdrop"),this.uTilt=t.getUniformLocation(this.prog,"u_tilt"),this.uBgColor=t.getUniformLocation(this.prog,"u_bgColor"),this.uRefraction=t.getUniformLocation(this.prog,"u_refraction"),this.uThickness=t.getUniformLocation(this.prog,"u_thickness"),this.uBevelWidth=t.getUniformLocation(this.prog,"u_bevelWidth"),this.uFrost=t.getUniformLocation(this.prog,"u_frost"),this.uDispersion=t.getUniformLocation(this.prog,"u_dispersion"),this.uSheen=t.getUniformLocation(this.prog,"u_sheen"),this.uLightAngle=t.getUniformLocation(this.prog,"u_lightAngle"),this.uDarkness=t.getUniformLocation(this.prog,"u_darkness"),this.uRim=t.getUniformLocation(this.prog,"u_rim"),this.uTime=t.getUniformLocation(this.prog,"u_time"),this.uFluidBright=t.getUniformLocation(this.prog,"u_fluidBright"),this.uFluidSpeed=t.getUniformLocation(this.prog,"u_fluidSpeed"),this.uFluidScale=t.getUniformLocation(this.prog,"u_fluidScale"),this.uFluidAuraWidth=t.getUniformLocation(this.prog,"u_fluidAuraWidth"),this.uFluidCenter=t.getUniformLocation(this.prog,"u_fluidCenter"),this.uAuroraFlow=t.getUniformLocation(this.prog,"u_auroraFlow"),this.uMousePos=t.getUniformLocation(this.prog,"u_mousePos"),this.uHoverStrength=t.getUniformLocation(this.prog,"u_hoverStrength"),this.uLightTrack=t.getUniformLocation(this.prog,"u_lightTrack"),this.uHoverBright=t.getUniformLocation(this.prog,"u_hoverBright"),this.uClickPos=t.getUniformLocation(this.prog,"u_clickPos"),this.uClickTime=t.getUniformLocation(this.prog,"u_clickTime"),this.uClickWave=t.getUniformLocation(this.prog,"u_clickWave"),this.uIsAudioDeck=t.getUniformLocation(this.prog,"u_isAudioDeck"),this.uSwitchThumb=t.getUniformLocation(this.prog,"u_switchThumb"),this.bgTexture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.bgTexture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),!0}register(t){this.instances.set(t.id,t),this.gl||this.initGL(),this.instances.size===1&&this.startLoop()}unregister(t){this.instances.delete(t);let n=this.textMaskTextures.get(t);n&&this.gl&&this.gl.deleteTexture(n.tex),this.textMaskTextures.delete(t),this.instances.size===0&&this.stopLoop()}startLoop(){if(this.animId!==null)return;let t=()=>{this.renderFrame(),this.instances.size>0&&this.isTabVisible?this.animId=requestAnimationFrame(t):this.animId=null};this.animId=requestAnimationFrame(t)}stopLoop(){this.animId!==null&&(cancelAnimationFrame(this.animId),this.animId=null)}getTime(){return(performance.now()-this.startTime)*.001}renderFrame(){let t=this.gl,n=this.glCanvas,r=this.prog;if(!t||!n||!r)return;let i=this.getTime(),a=new Map;this.instances.forEach(l=>{l.visible&&a.set(l,l.canvas.getBoundingClientRect())});let o=Array.from(this.instances.values()).sort((l,s)=>{let c=l.canvas.parentElement,f=s.canvas.parentElement;if(c&&c.contains(s.canvas))return-1;if(f&&f.contains(l.canvas))return 1;let m=l.canvas.width*l.canvas.height,p=s.canvas.width*s.canvas.height;return m!==p?p-m:0});o.forEach((l,s)=>{var c;if(!l.visible)return;let{canvas:f,ctx:m}=l,p=f.width,v=f.height;if(p<=0||v<=0)return;(n.width<p||n.height<v)&&(n.width=Math.max(n.width,p),n.height=Math.max(n.height,v)),t.viewport(0,0,p,v),t.useProgram(r);let y=Math.min(window.devicePixelRatio||1,2),x=a.get(l)||f.getBoundingClientRect(),A=p*v,h;for(let U=s-1;U>=0;U--){let W=o[U];if(!W.visible||W.canvas.width<=0||W.canvas.height<=0)continue;if((c=W.canvas.parentElement)!=null&&c.contains(f)){h=W;break}let C=a.get(W),X=W.canvas.width*W.canvas.height;if(C&&X>A*1.5&&x.right>C.left&&x.left<C.right&&x.bottom>C.top&&x.top<C.bottom){h=W;break}}if(t.activeTexture(t.TEXTURE0),h&&h.canvas.width>0&&h.canvas.height>0)if(this.compositeCanvas||(this.compositeCanvas=document.createElement("canvas"),this.compositeCtx=this.compositeCanvas.getContext("2d"),this.compositeTexture=t.createTexture()),(this.compositeCanvas.width!==p||this.compositeCanvas.height!==v)&&(this.compositeCanvas.width=p,this.compositeCanvas.height=v),this.compositeCtx&&this.compositeTexture){let U=a.get(h)||h.canvas.getBoundingClientRect(),W=Math.round((x.left-U.left)*y),C=Math.round((x.top-U.top)*y);this.compositeCtx.clearRect(0,0,p,v),this.compositeCtx.drawImage(h.canvas,W,C,p,v,0,0,p,v),t.bindTexture(t.TEXTURE_2D,this.compositeTexture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,this.compositeCanvas),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,2)}else t.bindTexture(t.TEXTURE_2D,this.bgTexture),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,-1);else t.bindTexture(t.TEXTURE_2D,this.bgTexture),this.uSrcComposite&&t.uniform1f(this.uSrcComposite,-1);this.uSrc&&t.uniform1i(this.uSrc,0),l.curHover+=(l.targetHover-l.curHover)*.12,l.curMouseX+=(l.targetMouseX-l.curMouseX)*.14,l.curMouseY+=(l.targetMouseY-l.curMouseY)*.14;let u=l.getParams();if(!l.textMask&&!l.isAudioDeck){let U=u.frost>1?Math.round(u.frost*.25*10)/10:0,W=U>0?`blur(${U}px)`:"";f.style.backdropFilter!==W&&(f.style.backdropFilter=W,f.style.webkitBackdropFilter=W)}let d=Mf(f);this.uBgColor&&t.uniform3f(this.uBgColor,d[0],d[1],d[2]);let g=l.getRect?l.getRect():null,w=g?g[0]:0,b=g?g[1]:0,T=g?g[2]:p,S=g?g[3]:v;if(t.uniform2f(this.uResolution,p,v),t.uniform4f(this.uRect,w,b,T,S),t.uniform1f(this.uRadius,u.radius??S*.5),t.uniform1f(this.uUseBackdrop,0),this.uIsAudioDeck&&t.uniform1f(this.uIsAudioDeck,l.isAudioDeck?1:0),this.uSwitchThumb){let U=l.getSwitchThumb?l.getSwitchThumb():null;if(U){let W=U[2],C=U.length>=4?U[3]:U[2];t.uniform4f(this.uSwitchThumb,U[0],U[1],W,C)}else t.uniform4f(this.uSwitchThumb,0,0,0,0)}if(l.textMask){this.textMaskCanvas||(this.textMaskCanvas=document.createElement("canvas"),this.textMaskCtx=this.textMaskCanvas.getContext("2d",{willReadFrequently:!0}));let U=l.textFont||`800 ${Math.round(v*.72)}px sans-serif`,W=l.textLetterSpacing||"normal",C=`${l.textMask}_${p}_${v}_${U}_${W}`,X=this.textMaskTextures.get(l.id);if(X||(X={tex:t.createTexture(),key:""},this.textMaskTextures.set(l.id,X)),X.key!==C&&this.textMaskCtx){X.key=C,(this.textMaskCanvas.width!==p||this.textMaskCanvas.height!==v)&&(this.textMaskCanvas.width=p,this.textMaskCanvas.height=v),this.textMaskCtx.font=U,"letterSpacing"in this.textMaskCtx&&(this.textMaskCtx.letterSpacing=W!=="normal"?W:"0px");let D=this.textMaskCtx.measureText(l.textMask),ne=D.actualBoundingBoxLeft??0,Ae=D.actualBoundingBoxRight??D.width,K=D.actualBoundingBoxAscent??v*.36,z=D.actualBoundingBoxDescent??v*.1,Z=Math.round(p*.5-(Ae-ne)*.5),fe=Math.round(v*.5+(K-z)*.5),q=Lf(this.textMaskCtx,p,v,l.textMask,U,W,Z,fe);t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,X.tex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,p,v,0,t.RGBA,t.UNSIGNED_BYTE,q)}else t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,X.tex);this.uTextMask&&t.uniform1i(this.uTextMask,1),this.uIsText&&t.uniform1f(this.uIsText,1)}else this.uIsText&&t.uniform1f(this.uIsText,0);if(l.tilt&&(Math.abs(l.tilt.rotX)>.001||Math.abs(l.tilt.rotY)>.001||Math.abs(l.tilt.scale-1)>.001)){let U=l.tilt.rotX*Math.PI/180,W=l.tilt.rotY*Math.PI/180,C=l.tilt.scale||1,X=(l.tilt.focalLength||1e3)*y;this.uTilt&&t.uniform4f(this.uTilt,U,W,C,X)}else this.uTilt&&t.uniform4f(this.uTilt,0,0,1,0);t.uniform1f(this.uTime,i),t.uniform1f(this.uRefraction,u.refraction),t.uniform1f(this.uThickness,u.thickness),t.uniform1f(this.uBevelWidth,u.bevelWidth*y),t.uniform1f(this.uFrost,u.frost),t.uniform1f(this.uDispersion,u.dispersion),t.uniform1f(this.uSheen,u.sheen);let H=u.lightAngle??u.angle??24;t.uniform1f(this.uLightAngle,H*Math.PI/180),t.uniform1f(this.uDarkness,u.darkness),t.uniform1f(this.uRim,u.rim);let L=u.causticBright??u.fluidBright,Q=u.causticSpeed??u.fluidSpeed,le=u.causticScale??u.fluidScale;t.uniform1f(this.uFluidBright,L),t.uniform1f(this.uFluidSpeed,Q),t.uniform1f(this.uFluidScale,le),t.uniform1f(this.uFluidAuraWidth,(u.fluidAuraWidth??4)*y),t.uniform1f(this.uFluidCenter,u.fluidCenter??0),t.uniform1f(this.uAuroraFlow,u.auroraFlow??75),t.uniform2f(this.uMousePos,l.curMouseX,l.curMouseY),t.uniform1f(this.uHoverStrength,l.curHover),t.uniform1f(this.uLightTrack,u.lightTrack),t.uniform1f(this.uHoverBright,u.hoverBright),t.uniform2f(this.uClickPos,l.clickPos[0],l.clickPos[1]),t.uniform1f(this.uClickTime,l.clickTime),t.uniform1f(this.uClickWave,u.clickWave),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLES,0,6),m.clearRect(0,0,p,v),m.drawImage(n,0,n.height-v,p,v,0,0,p,v)})}teardown(){this.stopLoop(),this.gl&&this.prog&&(this.textMaskTextures.forEach(t=>{var n;(n=this.gl)==null||n.deleteTexture(t.tex)}),this.textMaskTextures.clear(),this.gl.deleteProgram(this.prog),this.quadBuf&&this.gl.deleteBuffer(this.quadBuf),this.bgTexture&&this.gl.deleteTexture(this.bgTexture),this.compositeTexture&&this.gl.deleteTexture(this.compositeTexture),this.gl=null,this.prog=null,this.compositeTexture=null,this.compositeCanvas=null,this.compositeCtx=null),typeof window<"u"&&document.removeEventListener("visibilitychange",this.handleVisibilityChange)}},$l=null;function lr(){return $l||($l=new ql),$l}var Dd=({children:e,refraction:t,thickness:n,bevelWidth:r,frost:i,dispersion:a,sheen:o,lightAngle:l,darkness:s,rim:c,fluidBrightness:f,fluidSpeed:m,fluidScale:p,fluidAuraWidth:v,fluidCenter:y,auroraFlow:x,causticBrightness:A,causticSpeed:h,causticScale:u,hoverBrightness:d,trackCursorLight:g=!0,lightTrackingStrength:w,clickShockwave:b=!0,shockwaveStrength:T,overlayZIndex:S=2,className:H="",style:L,...Q})=>{let le=(0,M.useId)(),U=(0,M.useRef)(null),W=(0,M.useRef)(null),C=ke,X=(0,M.useRef)({radius:20,refraction:t??C.refraction,thickness:n??C.thickness,bevelWidth:r??C.bevelWidth,frost:i??C.frost,dispersion:a??C.dispersion,sheen:o??C.sheen,lightAngle:l??C.lightAngle,darkness:s??C.darkness,rim:c??C.rim,fluidBright:f??C.fluidBright,fluidSpeed:m??C.fluidSpeed,fluidScale:p??C.fluidScale,fluidAuraWidth:v??C.fluidAuraWidth,fluidCenter:y??C.fluidCenter,auroraFlow:x??C.auroraFlow,hoverBright:d??C.hoverBright,lightTrack:g?w??C.lightTrack:0,clickWave:b?T??C.clickWave:0});return(0,M.useEffect)(()=>{X.current={...X.current,refraction:t??C.refraction,thickness:n??C.thickness,bevelWidth:r??C.bevelWidth,frost:i??C.frost,dispersion:a??C.dispersion,sheen:o??C.sheen,lightAngle:l??C.lightAngle,darkness:s??C.darkness,rim:c??C.rim,fluidBright:A??f??C.fluidBright,fluidSpeed:h??m??C.fluidSpeed,fluidScale:u??p??C.fluidScale,fluidAuraWidth:v??C.fluidAuraWidth,fluidCenter:y??C.fluidCenter,auroraFlow:x??C.auroraFlow,causticBright:A??f??C.fluidBright,causticSpeed:h??m??C.fluidSpeed,causticScale:u??p??C.fluidScale,hoverBright:d??C.hoverBright,lightTrack:g?w??C.lightTrack:0,clickWave:b?T??C.clickWave:0}},[t,n,r,i,a,o,l,s,c,f,m,p,v,y,x,A,h,u,d,g,w,b,T]),(0,M.useEffect)(()=>{let D=U.current,ne=W.current;if(!D||!ne)return;let Ae=ne.getContext("2d",{alpha:!0});if(!Ae)return;let K=lr(),z={id:le,canvas:ne,ctx:Ae,getParams:()=>{if(!D)return X.current;let j=Math.min(window.devicePixelRatio||1,2),E=window.getComputedStyle(D),N=parseFloat(E.borderRadius),_=Math.min(D.offsetWidth,D.offsetHeight)*.5*j,F=!isNaN(N)&&N>=0?N*j:_;return X.current.radius=Math.min(F,_),X.current},getSwitchThumb:()=>{if(!D)return null;let j=D.querySelector(".switch-thumb, [data-switch-thumb], .tabs-indicator, [data-tabs-indicator]");if(!j)return null;let E=Math.min(window.devicePixelRatio||1,2),N=D.getBoundingClientRect(),_=j.getBoundingClientRect();if(_.width<=0||_.height<=0)return null;let F=(_.left+_.width*.5-(N.left+N.width*.5))*E,ue=(N.top+N.height*.5-(_.top+_.height*.5))*E,ye=_.width*.5*E,G=_.height*.5*E;return[F,ue,ye,G]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},Z=()=>{let j=Math.min(window.devicePixelRatio||1,2),E=Math.round(D.offsetWidth*j),N=Math.round(D.offsetHeight*j);(ne.width!==E||ne.height!==N)&&(ne.width=E,ne.height=N)};Z();let fe=null;typeof ResizeObserver<"u"&&(fe=new ResizeObserver(()=>Z()),fe.observe(D));let q=null;typeof IntersectionObserver<"u"&&(q=new IntersectionObserver(([j])=>{z.visible=j.isIntersecting}),q.observe(D));let Y=j=>{let E=D.getBoundingClientRect(),N=E.left+E.width*.5,_=E.top+E.height*.5,F=Math.min(window.devicePixelRatio||1,2);z.targetMouseX=(j.clientX-N)*F,z.targetMouseY=(_-j.clientY)*F},be=j=>{z.targetHover=1,Y(j)},Le=j=>{z.targetHover=1,Y(j)},R=()=>{z.targetHover=0},O=j=>{Y(j),z.clickPos=[z.targetMouseX,z.targetMouseY],z.clickTime=K.getTime()};return D.addEventListener("pointerenter",be),D.addEventListener("pointermove",Le),D.addEventListener("pointerleave",R),D.addEventListener("pointerdown",O),K.register(z),()=>{K.unregister(le),D.removeEventListener("pointerenter",be),D.removeEventListener("pointermove",Le),D.removeEventListener("pointerleave",R),D.removeEventListener("pointerdown",O),fe&&fe.disconnect(),q&&q.disconnect()}},[le]),(0,I.jsxs)("div",{ref:U,className:`tactile-glass-fx ${H}`.trim(),style:{position:"relative",display:"inline-flex",overflow:"hidden",WebkitTapHighlightColor:"transparent",...L},...Q,children:[(0,I.jsx)("canvas",{ref:W,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:S}}),(0,I.jsx)("div",{style:{position:"relative",zIndex:S+1,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e})]})},Rf=({children:e,size:t="xl",shape:n="pill",className:r="",refraction:i=ke.refraction,thickness:a=ke.thickness,bevelWidth:o=ke.bevelWidth,frost:l=ke.frost,dispersion:s=ke.dispersion,sheen:c=ke.sheen,lightAngle:f=ke.lightAngle,darkness:m=ke.darkness,rim:p=ke.rim,fluidBrightness:v=ke.fluidBright,fluidSpeed:y=ke.fluidSpeed,fluidScale:x=ke.fluidScale,fluidAuraWidth:A=ke.fluidAuraWidth,fluidCenter:h=ke.fluidCenter,auroraFlow:u=ke.auroraFlow,causticBrightness:d,causticSpeed:g,causticScale:w,fluidDispersion:b,hoverBrightness:T=ke.hoverBright,trackCursorLight:S=!0,lightTrackingStrength:H=ke.lightTrack,clickShockwave:L=!0,shockwaveStrength:Q=ke.clickWave,onClick:le,...U})=>{let W=(0,M.useId)(),C=(0,M.useRef)(null),X=(0,M.useRef)(null),D=b!==void 0?b:s,ne=(0,M.useRef)({radius:20,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:D,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:v,fluidSpeed:y,fluidScale:x,fluidAuraWidth:A,fluidCenter:h,auroraFlow:u,hoverBright:T,lightTrack:S?H:0,clickWave:L?Q:0});(0,M.useEffect)(()=>{ne.current={...ne.current,refraction:i,thickness:a,bevelWidth:o,frost:l,dispersion:D,sheen:c,lightAngle:f,darkness:m,rim:p,fluidBright:d??v,fluidSpeed:g??y,fluidScale:w??x,fluidAuraWidth:A,fluidCenter:h,auroraFlow:u,causticBright:d??v,causticSpeed:g??y,causticScale:w??x,hoverBright:T,lightTrack:S?H:0,clickWave:L?Q:0}},[i,a,o,l,D,c,f,m,p,v,y,x,A,h,u,d,g,w,T,S,H,L,Q]),(0,M.useEffect)(()=>{let K=C.current,z=X.current;if(!K||!z)return;let Z=z.getContext("2d",{alpha:!0});if(!Z)return;let fe=lr(),q={id:W,canvas:z,ctx:Z,getParams:()=>{let N=z.height;return ne.current.radius=N*.5,ne.current},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},Y=()=>{let N=Math.min(window.devicePixelRatio||1,2),_=Math.round(K.offsetWidth*N),F=Math.round(K.offsetHeight*N);(z.width!==_||z.height!==F)&&(z.width=_,z.height=F)};Y();let be=new ResizeObserver(Y);be.observe(K);let Le=N=>{let _=K.getBoundingClientRect(),F=_.left+_.width*.5,ue=_.top+_.height*.5,ye=Math.min(window.devicePixelRatio||1,2);q.targetMouseX=(N.clientX-F)*ye,q.targetMouseY=(ue-N.clientY)*ye},R=N=>{q.targetHover=1,Le(N)},O=N=>{q.targetHover=1,Le(N)},j=()=>{q.targetHover=0},E=N=>{Le(N),q.clickPos=[q.targetMouseX,q.targetMouseY],q.clickTime=fe.getTime()};return K.addEventListener("pointerenter",R),K.addEventListener("pointermove",O),K.addEventListener("pointerleave",j),K.addEventListener("pointerdown",E),fe.register(q),()=>{fe.unregister(W),be.disconnect(),K.removeEventListener("pointerenter",R),K.removeEventListener("pointermove",O),K.removeEventListener("pointerleave",j),K.removeEventListener("pointerdown",E)}},[W]);let Ae=n==="circle";return(0,I.jsxs)("button",{ref:C,type:"button",onClick:le,className:`tactile-btn ${Ae?"btn-circle":""} ${r}`.trim(),...U,children:[(0,I.jsx)("canvas",{ref:X,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,I.jsx)("span",{className:"btn-label",style:{position:"relative",zIndex:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:Ae?0:"var(--space-12)"},children:e})]})},Id=Rf;var Wd=({checked:e,defaultChecked:t=!1,onChange:n,size:r="xl",className:i="",disabled:a=!1,refraction:o=Ee.refraction,refractionOff:l=Ne.refraction,thickness:s=Ee.thickness,thicknessOff:c=Ne.thickness,bevelWidth:f=Ee.bevelWidth,bevelWidthOff:m=Ne.bevelWidth,frost:p=Ee.frost,frostOff:v=Ne.frost,dispersion:y=Ee.dispersion,dispersionOff:x=Ne.dispersion,sheen:A=Ee.sheen,sheenOff:h=Ne.sheen,lightAngle:u=Ee.lightAngle,darkness:d=Ee.darkness,darknessOff:g=Ne.darkness,rim:w=Ee.rim,rimOff:b=Ne.rim,fluidBrightness:T=Ee.fluidBright,fluidBrightnessOff:S=Ne.fluidBright,fluidSpeed:H=Ee.fluidSpeed,fluidSpeedOff:L=Ne.fluidSpeed,fluidScale:Q=Ee.fluidScale,fluidScaleOff:le=Ne.fluidScale,fluidAuraWidth:U=Ee.fluidAuraWidth,fluidAuraWidthOff:W=Ne.fluidAuraWidth,fluidCenter:C=Ee.fluidCenter,fluidCenterOff:X=Ne.fluidCenter,auroraFlow:D=Ee.auroraFlow,auroraFlowOff:ne=Ne.auroraFlow,hoverBrightness:Ae=Ee.hoverBright,hoverBrightnessOff:K=Ne.hoverBright,trackCursorLight:z=!0,lightTrackingStrength:Z=Ee.lightTrack,lightTrackingStrengthOff:fe=Ne.lightTrack,clickShockwave:q=!0,shockwaveStrength:Y=Ee.clickWave,shockwaveStrengthOff:be=Ne.clickWave,...Le})=>{let R=(0,M.useId)(),[O,j]=(0,M.useState)(t),E=e!==void 0?e:O,N=(0,M.useRef)(null),_=(0,M.useRef)(null),F=(0,M.useRef)(null),ue=(0,M.useRef)({radius:16,refraction:E?o:l,thickness:E?s:c,bevelWidth:E?f:m,frost:E?p:v,dispersion:E?y:x,sheen:E?A:h,lightAngle:u,darkness:E?d:g,rim:E?w:b,fluidBright:E?T:S,fluidSpeed:E?H:L,fluidScale:E?Q:le,fluidAuraWidth:E?U:W,fluidCenter:E?C:X,auroraFlow:E?D:ne,hoverBright:E?Ae:K,lightTrack:z?E?Z:fe:0,clickWave:q?E?Y:be:0});(0,M.useEffect)(()=>{ue.current={...ue.current,refraction:E?o:l,thickness:E?s:c,bevelWidth:E?f:m,frost:E?p:v,dispersion:E?y:x,sheen:E?A:h,lightAngle:u,darkness:E?d:g,rim:E?w:b,fluidBright:E?T:S,fluidSpeed:E?H:L,fluidScale:E?Q:le,fluidAuraWidth:E?U:W,fluidCenter:E?C:X,auroraFlow:E?D:ne,hoverBright:E?Ae:K,lightTrack:z?E?Z:fe:0,clickWave:q?E?Y:be:0}},[E,o,l,s,c,f,m,p,v,y,x,A,h,u,d,g,w,b,T,S,H,L,Q,le,U,W,C,X,D,ne,Ae,K,z,Z,fe,q,Y,be]);let ye=()=>{if(a)return;let G=!E;e===void 0&&j(G),n?.(G)};return(0,M.useEffect)(()=>{let G=N.current,J=_.current;if(!G||!J)return;let Et=G.getContext("2d",{alpha:!0});if(!Et)return;let ce=lr(),te={id:R,canvas:G,ctx:Et,getParams:()=>{let Se=G.height;return ue.current.radius=Se*.5,ue.current},getSwitchThumb:()=>{let Se=F.current;if(!Se||!J)return null;let ut=Math.min(window.devicePixelRatio||1,2),Bt=J.getBoundingClientRect(),_t=Se.getBoundingClientRect();if(_t.width<=0||_t.height<=0)return null;let ri=(_t.left+_t.width*.5-(Bt.left+Bt.width*.5))*ut,Vd=(Bt.top+Bt.height*.5-(_t.top+_t.height*.5))*ut,Gd=_t.width*.5*ut,Yd=_t.height*.5*ut;return[ri,Vd,Gd,Yd]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},Fe=()=>{let Se=Math.min(window.devicePixelRatio||1,2),ut=Math.round(J.offsetWidth*Se),Bt=Math.round(J.offsetHeight*Se);(G.width!==ut||G.height!==Bt)&&(G.width=ut,G.height=Bt)};Fe();let De=new ResizeObserver(Fe);De.observe(J);let st=Se=>{let ut=J.getBoundingClientRect(),Bt=ut.left+ut.width*.5,_t=ut.top+ut.height*.5,ri=Math.min(window.devicePixelRatio||1,2);te.targetMouseX=(Se.clientX-Bt)*ri,te.targetMouseY=(_t-Se.clientY)*ri},Ie=Se=>{te.targetHover=1,st(Se)},et=Se=>{te.targetHover=1,st(Se)},vt=()=>{te.targetHover=0},Gt=Se=>{st(Se),te.clickPos=[te.targetMouseX,te.targetMouseY],te.clickTime=ce.getTime()};return J.addEventListener("pointerenter",Ie),J.addEventListener("pointermove",et),J.addEventListener("pointerleave",vt),J.addEventListener("pointerdown",Gt),ce.register(te),()=>{ce.unregister(R),De.disconnect(),J.removeEventListener("pointerenter",Ie),J.removeEventListener("pointermove",et),J.removeEventListener("pointerleave",vt),J.removeEventListener("pointerdown",Gt)}},[R]),(0,I.jsxs)("button",{ref:_,type:"button",role:"switch","aria-checked":E,disabled:a,onClick:ye,onKeyDown:G=>{(G.key===" "||G.key==="Enter")&&(G.preventDefault(),ye())},className:`tactile-switch ${E?"active":""} ${i}`.trim(),...Le,children:[(0,I.jsx)("canvas",{ref:N,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,I.jsx)("span",{ref:F,className:"switch-thumb"})]})},Ud=({items:e,value:t,defaultValue:n,onChange:r,size:i="xl",className:a="",refraction:o=_e.refraction,thickness:l=_e.thickness,bevelWidth:s=_e.bevelWidth,frost:c=_e.frost,dispersion:f=_e.dispersion,sheen:m=_e.sheen,lightAngle:p=_e.lightAngle,darkness:v=_e.darkness,rim:y=_e.rim,fluidBrightness:x=_e.fluidBright,fluidSpeed:A=_e.fluidSpeed,fluidScale:h=_e.fluidScale,fluidAuraWidth:u=_e.fluidAuraWidth,fluidCenter:d=_e.fluidCenter,auroraFlow:g=_e.auroraFlow,hoverBrightness:w=_e.hoverBright,trackCursorLight:b=!0,lightTrackingStrength:T=_e.lightTrack,clickShockwave:S=!0,shockwaveStrength:H=_e.clickWave,...L})=>{var Q;let le=(0,M.useId)(),U=(0,M.useRef)(null),W=(0,M.useRef)(null),C=(0,M.useRef)(null),X=(0,M.useRef)(new Map),D=(0,M.useMemo)(()=>e.map(R=>typeof R=="string"?{value:R,label:R}:R),[e]),ne=n??((Q=D[0])==null?void 0:Q.value)??"",[Ae,K]=(0,M.useState)(ne),z=t!==void 0?t:Ae,[Z,fe]=(0,M.useState)({left:0,width:0,ready:!1}),q=(0,M.useRef)({radius:16,refraction:o,thickness:l,bevelWidth:s,frost:c,dispersion:f,sheen:m,lightAngle:p,darkness:v,rim:y,fluidBright:x,fluidSpeed:A,fluidScale:h,fluidAuraWidth:u,fluidCenter:d,auroraFlow:g,hoverBright:w,lightTrack:b?T:0,clickWave:S?H:0});(0,M.useEffect)(()=>{q.current={...q.current,refraction:o,thickness:l,bevelWidth:s,frost:c,dispersion:f,sheen:m,lightAngle:p,darkness:v,rim:y,fluidBright:x,fluidSpeed:A,fluidScale:h,fluidAuraWidth:u,fluidCenter:d,auroraFlow:g,hoverBright:w,lightTrack:b?T:0,clickWave:S?H:0}},[o,l,s,c,f,m,p,v,y,x,A,h,u,d,g,w,b,T,S,H]);let Y=(0,M.useCallback)(()=>{let R=X.current.get(z);R&&fe({left:R.offsetLeft,width:R.offsetWidth,ready:!0})},[z]);(0,M.useEffect)(()=>{Y()},[Y,D]),(0,M.useEffect)(()=>{let R=C.current,O=U.current;if(!R||!O)return;let j=R.getContext("2d",{alpha:!0});if(!j)return;let E=lr(),N={id:le,canvas:R,ctx:j,getParams:()=>{let ce=R.height;return q.current.radius=ce*.5,q.current},getSwitchThumb:()=>{let ce=W.current;if(!ce||!O)return null;let te=Math.min(window.devicePixelRatio||1,2),Fe=O.getBoundingClientRect(),De=ce.getBoundingClientRect();if(De.width<=0||De.height<=0)return null;let st=(De.left+De.width*.5-(Fe.left+Fe.width*.5))*te,Ie=(Fe.top+Fe.height*.5-(De.top+De.height*.5))*te,et=De.width*.5*te,vt=De.height*.5*te;return[st,Ie,et,vt]},curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0},_=()=>{let ce=Math.min(window.devicePixelRatio||1,2),te=Math.round(O.offsetWidth*ce),Fe=Math.round(O.offsetHeight*ce);te>0&&Fe>0&&(R.width!==te||R.height!==Fe)&&(R.width=te,R.height=Fe)};_();let F=null;typeof ResizeObserver<"u"&&(F=new ResizeObserver(()=>{Y(),_()}),F.observe(O));let ue=ce=>{let te=O.getBoundingClientRect(),Fe=te.left+te.width*.5,De=te.top+te.height*.5,st=Math.min(window.devicePixelRatio||1,2);N.targetMouseX=(ce.clientX-Fe)*st,N.targetMouseY=(De-ce.clientY)*st},ye=ce=>{N.targetHover=1,ue(ce)},G=ce=>{N.targetHover=1,ue(ce)},J=()=>{N.targetHover=0},Et=ce=>{ue(ce),N.clickPos=[N.targetMouseX,N.targetMouseY],N.clickTime=E.getTime()};return O.addEventListener("pointerenter",ye),O.addEventListener("pointermove",G),O.addEventListener("pointerleave",J),O.addEventListener("pointerdown",Et),E.register(N),()=>{E.unregister(le),F&&F.disconnect(),O.removeEventListener("pointerenter",ye),O.removeEventListener("pointermove",G),O.removeEventListener("pointerleave",J),O.removeEventListener("pointerdown",Et)}},[le,Y]);let be=(R,O)=>{O||(t===void 0&&K(R),r?.(R))},Le=R=>{var O,j;let E=D.filter(_=>!_.disabled);if(E.length<=1)return;let N=E.findIndex(_=>_.value===z);if(R.key==="ArrowRight"){R.preventDefault();let _=E[(N+1)%E.length];be(_.value),(O=X.current.get(_.value))==null||O.focus()}else if(R.key==="ArrowLeft"){R.preventDefault();let _=E[(N-1+E.length)%E.length];be(_.value),(j=X.current.get(_.value))==null||j.focus()}};return(0,I.jsxs)("div",{ref:U,role:"tablist","aria-label":L["aria-label"]||"Tabs",onKeyDown:Le,className:`tactile-tabs ${a}`.trim(),...L,children:[(0,I.jsx)("canvas",{ref:C,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,I.jsx)("span",{ref:W,"data-tabs-indicator":!0,"aria-hidden":"true",className:"tabs-indicator",style:{transform:`translateX(${Z.left}px)`,width:`${Z.width}px`,opacity:Z.ready?1:0}}),D.map(R=>{let O=R.value===z;return(0,I.jsxs)("button",{ref:j=>{j?X.current.set(R.value,j):X.current.delete(R.value)},type:"button",role:"tab","aria-selected":O,disabled:R.disabled,tabIndex:O?0:-1,onClick:()=>be(R.value,R.disabled),className:`tab-item ${O?"active":""}`.trim(),children:[R.icon&&(0,I.jsx)("span",{style:{display:"inline-flex",flexShrink:0},children:R.icon}),(0,I.jsx)("span",{children:R.label})]},R.value)})]})};var Hd=({value:e,defaultValue:t="",placeholder:n="Ask anything, @ to mention, / for actions",onChange:r,onSubmit:i,onMentionClick:a,agentLabel:o="Agent",modeLabel:l,onAgentClick:s,onModeClick:c,className:f="",refraction:m=Pe.refraction,thickness:p=Pe.thickness,bevelWidth:v=Pe.bevelWidth,frost:y=Pe.frost,dispersion:x=Pe.dispersion,sheen:A=Pe.sheen,lightAngle:h=Pe.lightAngle,darkness:u=Pe.darkness,rim:d=Pe.rim,fluidBrightness:g=Pe.fluidBright,fluidSpeed:w=Pe.fluidSpeed,fluidScale:b=Pe.fluidScale,fluidAuraWidth:T=Pe.fluidAuraWidth,fluidCenter:S=Pe.fluidCenter,auroraFlow:H=Pe.auroraFlow,hoverBrightness:L=Pe.hoverBright,trackCursorLight:Q=!0,lightTrackingStrength:le=Pe.lightTrack,clickShockwave:U=!0,shockwaveStrength:W=Pe.clickWave})=>{let C=(0,M.useId)(),X=(0,M.useRef)(null),D=(0,M.useRef)(null),ne=(0,M.useRef)(null),[Ae,K]=(0,M.useState)(t),z=e!==void 0?e:Ae,Z=(0,M.useRef)({radius:24,refraction:m,thickness:p,bevelWidth:v,frost:y,dispersion:x,sheen:A,lightAngle:h,darkness:u,rim:d,fluidBright:g,fluidSpeed:w,fluidScale:b,fluidAuraWidth:T,fluidCenter:S,auroraFlow:H,hoverBright:L,lightTrack:Q?le:0,clickWave:U?W:0});(0,M.useEffect)(()=>{Z.current={...Z.current,refraction:m,thickness:p,bevelWidth:v,frost:y,dispersion:x,sheen:A,lightAngle:h,darkness:u,rim:d,fluidBright:g,fluidSpeed:w,fluidScale:b,fluidAuraWidth:T,fluidCenter:S,auroraFlow:H,hoverBright:L,lightTrack:Q?le:0,clickWave:U?W:0}},[m,p,v,y,x,A,h,u,d,g,w,b,T,S,H,L,Q,le,U,W]),(0,M.useEffect)(()=>{let _=X.current,F=D.current;if(!_||!F)return;let ue=F.getContext("2d",{alpha:!0});if(!ue)return;let ye=lr(),G={id:C,canvas:F,ctx:ue,getParams:()=>Z.current,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,curHover:0,targetHover:0,clickPos:[-999,-999],clickTime:-999,visible:!0},J=()=>{if(!_||!F)return;let Ie=_.getBoundingClientRect(),et=Math.min(window.devicePixelRatio||1,2),vt=Math.round(Ie.width*et),Gt=Math.round(Ie.height*et);(F.width!==vt||F.height!==Gt)&&(F.width=vt,F.height=Gt),Z.current.radius=Math.min(24*et,Math.min(vt,Gt)*.5)};J();let Et=new ResizeObserver(()=>{J()});Et.observe(_);let ce=Ie=>{G.targetHover=1,st(Ie)},te=Ie=>{G.targetHover=1,st(Ie)},Fe=()=>{G.targetHover=0},De=Ie=>{st(Ie),G.clickPos=[G.targetMouseX,G.targetMouseY],G.clickTime=ye.getTime()},st=Ie=>{if(!_)return;let et=_.getBoundingClientRect(),vt=Math.min(window.devicePixelRatio||1,2),Gt=et.left+et.width*.5,Se=et.top+et.height*.5;G.targetMouseX=(Ie.clientX-Gt)*vt,G.targetMouseY=(Se-Ie.clientY)*vt};return _.addEventListener("pointerenter",ce),_.addEventListener("pointermove",te),_.addEventListener("pointerleave",Fe),_.addEventListener("pointerdown",De),ye.register(G),()=>{ye.unregister(C),Et.disconnect(),_.removeEventListener("pointerenter",ce),_.removeEventListener("pointermove",te),_.removeEventListener("pointerleave",Fe),_.removeEventListener("pointerdown",De)}},[C]);let fe=()=>{let _=ne.current;if(_){_.style.height="auto";let F=parseFloat(window.getComputedStyle(_).maxHeight)||160;_.style.height=`${Math.min(_.scrollHeight,F)}px`}},q=_=>{let F=_.target.value;e===void 0&&K(F),r?.(F),fe()},Y=_=>{_.key==="Enter"&&!_.shiftKey&&(_.preventDefault(),N())},[be,Le]=(0,M.useState)(0),R=[{label:o,placeholder:n},{label:"Plan",placeholder:"Plan architecture, @ to mention, / for actions"},{label:"Ask",placeholder:"Ask a question, @ to mention, / for actions"}],O=R[be%R.length],j=()=>{var _;if(a){a();return}(_=ne.current)==null||_.focus()},E=()=>{if(s){s();return}Le(_=>(_+1)%R.length)},N=()=>{z.trim()&&(i?.(z),e===void 0&&(K(""),requestAnimationFrame(()=>fe())))};return(0,I.jsxs)("div",{ref:X,className:`tactile-prompt-box ${f}`.trim(),children:[(0,I.jsx)("canvas",{ref:D,"aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",borderRadius:"inherit",zIndex:0}}),(0,I.jsxs)("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:"var(--space-16)",width:"100%"},children:[(0,I.jsx)("div",{className:"prompt-body",children:(0,I.jsx)("textarea",{ref:ne,value:z,onChange:q,onKeyDown:Y,placeholder:O.placeholder,rows:1,className:"prompt-textarea"})}),(0,I.jsxs)("div",{className:"prompt-bottom-bar",children:[(0,I.jsxs)("div",{className:"prompt-pills-row",children:[(0,I.jsx)("button",{type:"button",onClick:j,"aria-label":"Add context",className:"prompt-mention-btn",children:(0,I.jsxs)("svg",{className:"prompt-submit-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,I.jsx)("path",{d:"M5 12h14"}),(0,I.jsx)("path",{d:"M12 5v14"})]})}),(0,I.jsx)("button",{type:"button",onClick:E,className:"prompt-pill",children:(0,I.jsx)("span",{className:"prompt-pill-label",children:O.label})}),l&&(0,I.jsx)("button",{type:"button",onClick:c,className:"prompt-pill",children:(0,I.jsx)("span",{className:"prompt-pill-label",children:l})})]}),(0,I.jsx)("button",{type:"button",onClick:N,"aria-label":"Submit prompt",disabled:!z.trim(),className:"prompt-submit-btn",children:(0,I.jsxs)("svg",{className:"prompt-submit-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,I.jsx)("path",{d:"m5 12 7-7 7 7"}),(0,I.jsx)("path",{d:"M12 19V5"})]})})]})]})]})};var zf=({children:e,cycleWords:t,className:n="",style:r,onClick:i,refraction:a=Me.refraction,thickness:o=Me.thickness,bevelWidth:l=Me.bevelWidth,frost:s=Me.frost,dispersion:c=Me.dispersion,sheen:f=Me.sheen,lightAngle:m=Me.lightAngle,darkness:p=Me.darkness,rim:v=Me.rim,fluidBrightness:y=Me.fluidBright,fluidSpeed:x=Me.fluidSpeed,fluidScale:A=Me.fluidScale,fluidAuraWidth:h=Me.fluidAuraWidth,fluidCenter:u=Me.fluidCenter,auroraFlow:d=Me.auroraFlow,hoverBrightness:g=Me.hoverBright,trackCursorLight:w=!0,lightTrackingStrength:b=Me.lightTrack,clickShockwave:T=!0,shockwaveStrength:S=Me.clickWave,...H})=>{let L=(0,M.useId)(),Q=(0,M.useRef)(null),le=(0,M.useRef)(null),[U,W]=(0,M.useState)(0),C=t&&t.length>0?t[U%t.length]:e,X=typeof C=="string"?C:String(C??""),D=(0,M.useRef)({radius:0,refraction:a,thickness:o,bevelWidth:l,frost:s,dispersion:c,sheen:f,lightAngle:m,darkness:p,rim:v,fluidBright:y,fluidSpeed:x,fluidScale:A,fluidAuraWidth:h,fluidCenter:u,auroraFlow:d,hoverBright:g,lightTrack:w?b:0,clickWave:T?S:0}),ne=(0,M.useRef)(null);(0,M.useEffect)(()=>{D.current={...D.current,refraction:a,thickness:o,bevelWidth:l,frost:s,dispersion:c,sheen:f,lightAngle:m,darkness:p,rim:v,fluidBright:y,fluidSpeed:x,fluidScale:A,fluidAuraWidth:h,fluidCenter:u,auroraFlow:d,hoverBright:g,lightTrack:w?b:0,clickWave:T?S:0}},[a,o,l,s,c,f,m,p,v,y,x,A,h,u,d,g,w,b,T,S]),(0,M.useEffect)(()=>{let z=Q.current,Z=le.current;if(!z||!Z)return;let fe=Z.getContext("2d",{alpha:!0});if(!fe)return;let q=lr(),Y={id:L,canvas:Z,ctx:fe,textMask:X,getParams:()=>D.current,curHover:0,targetHover:0,curMouseX:0,curMouseY:0,targetMouseX:0,targetMouseY:0,clickPos:[-999,-999],clickTime:-999,visible:!0};ne.current=Y;let be=()=>{let F=Math.min(window.devicePixelRatio||1,2),ue=16,ye=Math.round((z.offsetWidth+ue*2)*F),G=Math.round((z.offsetHeight+ue*2)*F);(Z.width!==ye||Z.height!==G)&&(Z.width=ye,Z.height=G);let J=window.getComputedStyle(z),Et=parseFloat(J.fontSize)*F;Y.textFont=`${J.fontWeight} ${Et}px ${J.fontFamily}`,Y.textLetterSpacing=J.letterSpacing||"normal",Y.textMask=X};be();let Le=null;typeof ResizeObserver<"u"&&(Le=new ResizeObserver(()=>be()),Le.observe(z));let R=null;typeof IntersectionObserver<"u"&&(R=new IntersectionObserver(([F])=>{Y.visible=F.isIntersecting}),R.observe(z));let O=F=>{let ue=z.getBoundingClientRect(),ye=ue.left+ue.width*.5,G=ue.top+ue.height*.5,J=Math.min(window.devicePixelRatio||1,2);Y.targetMouseX=(F.clientX-ye)*J,Y.targetMouseY=(G-F.clientY)*J},j=F=>{Y.targetHover=1,O(F)},E=F=>{Y.targetHover=1,O(F)},N=()=>{Y.targetHover=0},_=F=>{O(F),Y.clickPos=[Y.targetMouseX,Y.targetMouseY],Y.clickTime=q.getTime()};return z.addEventListener("pointerenter",j),z.addEventListener("pointermove",E),z.addEventListener("pointerleave",N),z.addEventListener("pointerdown",_),q.register(Y),()=>{q.unregister(L),z.removeEventListener("pointerenter",j),z.removeEventListener("pointermove",E),z.removeEventListener("pointerleave",N),z.removeEventListener("pointerdown",_),Le&&Le.disconnect(),R&&R.disconnect()}},[L,X]);let Ae=z=>{t&&t.length>1&&W(Z=>Z+1),i&&i(z)},K=!!(t&&t.length>1)||!!i;return(0,I.jsxs)("span",{ref:Q,className:`tactile-glass-word ${n}`.trim(),style:{position:"relative",display:"inline-flex",alignItems:"baseline",justifyContent:"center",verticalAlign:"baseline",margin:0,padding:0,lineHeight:"inherit",border:"none",background:"transparent",userSelect:"none",cursor:K?"pointer":"default",WebkitTapHighlightColor:"transparent",...r},onClick:Ae,...H,children:[(0,I.jsx)("canvas",{ref:le,"aria-hidden":"true",style:{position:"absolute",inset:"calc(var(--space-16) * -1)",width:"calc(100% + var(--space-32))",height:"calc(100% + var(--space-32))",pointerEvents:"none",zIndex:2}}),(0,I.jsx)("span",{style:{opacity:0,pointerEvents:"none",userSelect:"none",fontWeight:"inherit",letterSpacing:"inherit"},children:C})]})},Od=({level:e="h1",size:t="hero",align:n="center",title:r,highlight:i,highlightCycle:a,subtitle:o,badge:l,wordProps:s,className:c="",children:f,...m})=>{let p=e,v=()=>{if(!r)return null;if(!i&&(!a||a.length===0))return r;let y=[];if(Array.isArray(i)?y.push(...i):typeof i=="string"&&y.push(i),a&&a.length>0&&!y.includes(a[0])&&y.push(a[0]),y.length===0)return r;let x=new RegExp(`(${y.map(A=>A.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})`,"gi");return r.split(x).map((A,h)=>y.find(u=>u.toLowerCase()===A.toLowerCase())?(0,I.jsx)(zf,{cycleWords:a&&a.length>0?a:void 0,...s,children:A},h):(0,I.jsx)(M.default.Fragment,{children:A},h))};return(0,I.jsxs)("div",{className:`tactile-heading-container ${c}`.trim(),style:{display:"flex",flexDirection:"column",maxWidth:"var(--heading-max-w)",alignItems:n==="left"?"flex-start":n==="right"?"flex-end":"center",textAlign:n},children:[l&&(0,I.jsx)("div",{className:"tactile-heading-badge",style:{marginBottom:"var(--space-16)",display:"inline-flex",alignItems:"center"},children:l}),(0,I.jsx)(p,{className:"tactile-heading-title display-heading",style:{fontFamily:"var(--font-sans)",color:"var(--text-primary)",fontSize:t==="sm"?"var(--font-size-xl)":t==="md"?"var(--font-size-2xl)":"var(--font-size-display)",fontWeight:"var(--font-weight-extrabold)",lineHeight:t==="md"?"var(--line-height-2xl)":"var(--line-height-none)",letterSpacing:"var(--letter-spacing-display)",textAlign:n,margin:0},...m,children:f||v()}),o&&(0,I.jsx)("p",{className:"tactile-heading-subtitle",style:{fontSize:"var(--font-size-md)",color:"var(--text-secondary)",maxWidth:"var(--subtitle-max-w)",marginTop:t==="sm"?"var(--space-8)":t==="md"?"var(--space-12)":"var(--space-16)",textAlign:n},children:o})]})};var lt=e=>document.getElementById(e),Xd=matchMedia("(prefers-reduced-motion: reduce)"),Bf=[{value:"market",label:"\u0420\u044B\u043D\u043E\u043A \u043E\u0431\u043B\u0438\u0433\u0430\u0446\u0438\u0439"},{value:"chat",label:"\u0421\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0430\u0433\u0435\u043D\u0442\u0430"}];function Nf(){if(Xd.matches||navigator.connection?.saveData)return!1;let e=document.createElement("canvas").getContext("webgl2",{failIfMajorPerformanceCaveat:!0});return e?(e.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}function sr(e,t){let n=document.createElement("div");return n.id=t,e.before(n),n}function Ff(){if(!Nf())return;let e=sr(document.querySelector(".nav nav"),"optical-nav"),t=sr(lt("themeToggle"),"optical-switch"),n=sr(lt("pageTitle"),"optical-heading"),r=sr(lt("newChat"),"optical-action"),i=sr(lt("askForm"),"optical-prompt"),a=document.createElement("div");document.body.append(a);let o,l=(0,jd.createRoot)(a);function s(){let[y,x]=(0,Xe.useState)(""),h=lt("chat").classList.contains("hide")?"market":"chat",u=lt("pageTitle").textContent,d=lt("chatEngine"),g=lt("newChat").disabled;function w(){document.querySelector("[data-tab=market]").click(),openSearch(),lt("query").focus()}return(0,Xe.useLayoutEffect)(()=>{document.body.classList.add("optical");let b=i.querySelector("textarea");b&&(b.maxLength=2e3,b.setAttribute("aria-label","\u0412\u043E\u043F\u0440\u043E\u0441 \u0430\u0433\u0435\u043D\u0442\u0443"),i.querySelector(".prompt-mention-btn").setAttribute("aria-label","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u044B\u043F\u0443\u0441\u043A"),i.querySelector(".prompt-submit-btn").setAttribute("aria-label","\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441"))}),Xe.default.createElement(Xe.default.Fragment,null,(0,An.createPortal)(Xe.default.createElement(Ud,{"aria-label":"\u0420\u0430\u0437\u0434\u0435\u043B\u044B",dispersion:18,items:Bf,value:h,onChange:b=>document.querySelector('[data-tab="'+b+'"]').click()}),e),(0,An.createPortal)(Xe.default.createElement(Wd,{checked:document.documentElement.dataset.theme==="dark","aria-label":"\u0422\u0451\u043C\u043D\u0430\u044F \u0442\u0435\u043C\u0430",onChange:()=>lt("themeToggle").click()}),t),(0,An.createPortal)(Xe.default.createElement(Od,{wordProps:{dispersion:16,fluidBrightness:64},level:"h1",size:"sm",title:u,highlight:u.split(" ").at(-1)}),n),h==="chat"&&(0,An.createPortal)(Xe.default.createElement(Id,{disabled:g,onClick:()=>{lt("newChat").click(),x(""),i.querySelector("textarea")?.focus()}},"\u041D\u043E\u0432\u044B\u0439 \u0434\u0438\u0430\u043B\u043E\u0433"),r),h==="chat"&&(0,An.createPortal)(Xe.default.createElement(Hd,{dispersion:20,value:y,onChange:b=>x(b.slice(0,2e3)),placeholder:"\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u043E\u0431 \u043E\u0431\u043B\u0438\u0433\u0430\u0446\u0438\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u2026",agentLabel:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u044B\u043F\u0443\u0441\u043A",onMentionClick:w,onAgentClick:w,modeLabel:d.selectedOptions[0]?.text,onModeClick:()=>{d.disabled||(d.value=d.value==="auto"?"archive":"auto",d.dispatchEvent(new Event("change")))},onSubmit:b=>{g||!b.trim()||state.id&&!data||(x(""),ask(b.trim()))}}),i),o&&(0,An.createPortal)(Xe.default.createElement(Dd,{refraction:48,thickness:24,bevelWidth:3,frost:4,dispersion:32,className:"optical-risk"},Xe.default.createElement("strong",{role:"heading","aria-level":"2"},Xe.default.createElement("span",{className:"signal-dot","aria-hidden":"true"}),o.nextElementSibling?.textContent)),o))}function c(){l.render(Xe.default.createElement(s,null))}function f(){let y=document.querySelector("#bondRadar h2,#bondRadar h3");y&&o?.nextElementSibling!==y?o=sr(y,"optical-risk-title"):y||(o=null),c()}let m=new MutationObserver(f);m.observe(lt("detail"),{childList:!0});let p=new MutationObserver(c);p.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),window.addEventListener("radar-view",c);function v(){let y=i.querySelector("textarea")?.value;y!==void 0&&(lt("question").value=y),m.disconnect(),p.disconnect(),window.removeEventListener("radar-view",c),l.unmount(),document.body.classList.remove("optical");for(let x of[e,t,n,r,i,o,a])x?.remove()}Xd.addEventListener("change",v,{once:!0}),f()}Ff();})();
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
