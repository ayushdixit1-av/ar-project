(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var Uh={exports:{}},$o={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y_;function PS(){if(y_)return $o;y_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var p in l)p!=="key"&&(c[p]=l[p])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return $o.Fragment=t,$o.jsx=i,$o.jsxs=i,$o}var S_;function IS(){return S_||(S_=1,Uh.exports=PS()),Uh.exports}var G=IS(),Lh={exports:{}},fe={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var M_;function BS(){if(M_)return fe;M_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),v=Symbol.iterator;function b(M){return M===null||typeof M!="object"?null:(M=v&&M[v]||M["@@iterator"],typeof M=="function"?M:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,x={};function y(M,O,tt){this.props=M,this.context=O,this.refs=x,this.updater=tt||E}y.prototype.isReactComponent={},y.prototype.setState=function(M,O){if(typeof M!="object"&&typeof M!="function"&&M!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,M,O,"setState")},y.prototype.forceUpdate=function(M){this.updater.enqueueForceUpdate(this,M,"forceUpdate")};function z(){}z.prototype=y.prototype;function F(M,O,tt){this.props=M,this.context=O,this.refs=x,this.updater=tt||E}var N=F.prototype=new z;N.constructor=F,w(N,y.prototype),N.isPureReactComponent=!0;var P=Array.isArray;function U(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function L(M,O,tt){var mt=tt.ref;return{$$typeof:r,type:M,key:O,ref:mt!==void 0?mt:null,props:tt}}function W(M,O){return L(M.type,O,M.props)}function V(M){return typeof M=="object"&&M!==null&&M.$$typeof===r}function q(M){var O={"=":"=0",":":"=2"};return"$"+M.replace(/[=:]/g,function(tt){return O[tt]})}var ut=/\/+/g;function gt(M,O){return typeof M=="object"&&M!==null&&M.key!=null?q(""+M.key):O.toString(36)}function Z(M){switch(M.status){case"fulfilled":return M.value;case"rejected":throw M.reason;default:switch(typeof M.status=="string"?M.then(U,U):(M.status="pending",M.then(function(O){M.status==="pending"&&(M.status="fulfilled",M.value=O)},function(O){M.status==="pending"&&(M.status="rejected",M.reason=O)})),M.status){case"fulfilled":return M.value;case"rejected":throw M.reason}}throw M}function H(M,O,tt,mt,bt){var J=typeof M;(J==="undefined"||J==="boolean")&&(M=null);var rt=!1;if(M===null)rt=!0;else switch(J){case"bigint":case"string":case"number":rt=!0;break;case"object":switch(M.$$typeof){case r:case t:rt=!0;break;case g:return rt=M._init,H(rt(M._payload),O,tt,mt,bt)}}if(rt)return bt=bt(M),rt=mt===""?"."+gt(M,0):mt,P(bt)?(tt="",rt!=null&&(tt=rt.replace(ut,"$&/")+"/"),H(bt,O,tt,"",function(Ht){return Ht})):bt!=null&&(V(bt)&&(bt=W(bt,tt+(bt.key==null||M&&M.key===bt.key?"":(""+bt.key).replace(ut,"$&/")+"/")+rt)),O.push(bt)),1;rt=0;var dt=mt===""?".":mt+":";if(P(M))for(var wt=0;wt<M.length;wt++)mt=M[wt],J=dt+gt(mt,wt),rt+=H(mt,O,tt,J,bt);else if(wt=b(M),typeof wt=="function")for(M=wt.call(M),wt=0;!(mt=M.next()).done;)mt=mt.value,J=dt+gt(mt,wt++),rt+=H(mt,O,tt,J,bt);else if(J==="object"){if(typeof M.then=="function")return H(Z(M),O,tt,mt,bt);throw O=String(M),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(M).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return rt}function k(M,O,tt){if(M==null)return M;var mt=[],bt=0;return H(M,mt,"","",function(J){return O.call(tt,J,bt++)}),mt}function it(M){if(M._status===-1){var O=M._result;O=O(),O.then(function(tt){(M._status===0||M._status===-1)&&(M._status=1,M._result=tt)},function(tt){(M._status===0||M._status===-1)&&(M._status=2,M._result=tt)}),M._status===-1&&(M._status=0,M._result=O)}if(M._status===1)return M._result.default;throw M._result}var yt=typeof reportError=="function"?reportError:function(M){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof M=="object"&&M!==null&&typeof M.message=="string"?String(M.message):String(M),error:M});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",M);return}console.error(M)},D={map:k,forEach:function(M,O,tt){k(M,function(){O.apply(this,arguments)},tt)},count:function(M){var O=0;return k(M,function(){O++}),O},toArray:function(M){return k(M,function(O){return O})||[]},only:function(M){if(!V(M))throw Error("React.Children.only expected to receive a single React element child.");return M}};return fe.Activity=_,fe.Children=D,fe.Component=y,fe.Fragment=i,fe.Profiler=l,fe.PureComponent=F,fe.StrictMode=a,fe.Suspense=m,fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,fe.__COMPILER_RUNTIME={__proto__:null,c:function(M){return B.H.useMemoCache(M)}},fe.cache=function(M){return function(){return M.apply(null,arguments)}},fe.cacheSignal=function(){return null},fe.cloneElement=function(M,O,tt){if(M==null)throw Error("The argument must be a React element, but you passed "+M+".");var mt=w({},M.props),bt=M.key;if(O!=null)for(J in O.key!==void 0&&(bt=""+O.key),O)!A.call(O,J)||J==="key"||J==="__self"||J==="__source"||J==="ref"&&O.ref===void 0||(mt[J]=O[J]);var J=arguments.length-2;if(J===1)mt.children=tt;else if(1<J){for(var rt=Array(J),dt=0;dt<J;dt++)rt[dt]=arguments[dt+2];mt.children=rt}return L(M.type,bt,mt)},fe.createContext=function(M){return M={$$typeof:f,_currentValue:M,_currentValue2:M,_threadCount:0,Provider:null,Consumer:null},M.Provider=M,M.Consumer={$$typeof:c,_context:M},M},fe.createElement=function(M,O,tt){var mt,bt={},J=null;if(O!=null)for(mt in O.key!==void 0&&(J=""+O.key),O)A.call(O,mt)&&mt!=="key"&&mt!=="__self"&&mt!=="__source"&&(bt[mt]=O[mt]);var rt=arguments.length-2;if(rt===1)bt.children=tt;else if(1<rt){for(var dt=Array(rt),wt=0;wt<rt;wt++)dt[wt]=arguments[wt+2];bt.children=dt}if(M&&M.defaultProps)for(mt in rt=M.defaultProps,rt)bt[mt]===void 0&&(bt[mt]=rt[mt]);return L(M,J,bt)},fe.createRef=function(){return{current:null}},fe.forwardRef=function(M){return{$$typeof:p,render:M}},fe.isValidElement=V,fe.lazy=function(M){return{$$typeof:g,_payload:{_status:-1,_result:M},_init:it}},fe.memo=function(M,O){return{$$typeof:d,type:M,compare:O===void 0?null:O}},fe.startTransition=function(M){var O=B.T,tt={};B.T=tt;try{var mt=M(),bt=B.S;bt!==null&&bt(tt,mt),typeof mt=="object"&&mt!==null&&typeof mt.then=="function"&&mt.then(U,yt)}catch(J){yt(J)}finally{O!==null&&tt.types!==null&&(O.types=tt.types),B.T=O}},fe.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},fe.use=function(M){return B.H.use(M)},fe.useActionState=function(M,O,tt){return B.H.useActionState(M,O,tt)},fe.useCallback=function(M,O){return B.H.useCallback(M,O)},fe.useContext=function(M){return B.H.useContext(M)},fe.useDebugValue=function(){},fe.useDeferredValue=function(M,O){return B.H.useDeferredValue(M,O)},fe.useEffect=function(M,O){return B.H.useEffect(M,O)},fe.useEffectEvent=function(M){return B.H.useEffectEvent(M)},fe.useId=function(){return B.H.useId()},fe.useImperativeHandle=function(M,O,tt){return B.H.useImperativeHandle(M,O,tt)},fe.useInsertionEffect=function(M,O){return B.H.useInsertionEffect(M,O)},fe.useLayoutEffect=function(M,O){return B.H.useLayoutEffect(M,O)},fe.useMemo=function(M,O){return B.H.useMemo(M,O)},fe.useOptimistic=function(M,O){return B.H.useOptimistic(M,O)},fe.useReducer=function(M,O,tt){return B.H.useReducer(M,O,tt)},fe.useRef=function(M){return B.H.useRef(M)},fe.useState=function(M){return B.H.useState(M)},fe.useSyncExternalStore=function(M,O,tt){return B.H.useSyncExternalStore(M,O,tt)},fe.useTransition=function(){return B.H.useTransition()},fe.version="19.2.8",fe}var b_;function pp(){return b_||(b_=1,Lh.exports=BS()),Lh.exports}var We=pp(),Oh={exports:{}},tl={},Ph={exports:{}},Ih={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E_;function zS(){return E_||(E_=1,(function(r){function t(H,k){var it=H.length;H.push(k);t:for(;0<it;){var yt=it-1>>>1,D=H[yt];if(0<l(D,k))H[yt]=k,H[it]=D,it=yt;else break t}}function i(H){return H.length===0?null:H[0]}function a(H){if(H.length===0)return null;var k=H[0],it=H.pop();if(it!==k){H[0]=it;t:for(var yt=0,D=H.length,M=D>>>1;yt<M;){var O=2*(yt+1)-1,tt=H[O],mt=O+1,bt=H[mt];if(0>l(tt,it))mt<D&&0>l(bt,tt)?(H[yt]=bt,H[mt]=it,yt=mt):(H[yt]=tt,H[O]=it,yt=O);else if(mt<D&&0>l(bt,it))H[yt]=bt,H[mt]=it,yt=mt;else break t}}return k}function l(H,k){var it=H.sortIndex-k.sortIndex;return it!==0?it:H.id-k.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,p=f.now();r.unstable_now=function(){return f.now()-p}}var m=[],d=[],g=1,_=null,v=3,b=!1,E=!1,w=!1,x=!1,y=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;function N(H){for(var k=i(d);k!==null;){if(k.callback===null)a(d);else if(k.startTime<=H)a(d),k.sortIndex=k.expirationTime,t(m,k);else break;k=i(d)}}function P(H){if(w=!1,N(H),!E)if(i(m)!==null)E=!0,U||(U=!0,q());else{var k=i(d);k!==null&&Z(P,k.startTime-H)}}var U=!1,B=-1,A=5,L=-1;function W(){return x?!0:!(r.unstable_now()-L<A)}function V(){if(x=!1,U){var H=r.unstable_now();L=H;var k=!0;try{t:{E=!1,w&&(w=!1,z(B),B=-1),b=!0;var it=v;try{e:{for(N(H),_=i(m);_!==null&&!(_.expirationTime>H&&W());){var yt=_.callback;if(typeof yt=="function"){_.callback=null,v=_.priorityLevel;var D=yt(_.expirationTime<=H);if(H=r.unstable_now(),typeof D=="function"){_.callback=D,N(H),k=!0;break e}_===i(m)&&a(m),N(H)}else a(m);_=i(m)}if(_!==null)k=!0;else{var M=i(d);M!==null&&Z(P,M.startTime-H),k=!1}}break t}finally{_=null,v=it,b=!1}k=void 0}}finally{k?q():U=!1}}}var q;if(typeof F=="function")q=function(){F(V)};else if(typeof MessageChannel<"u"){var ut=new MessageChannel,gt=ut.port2;ut.port1.onmessage=V,q=function(){gt.postMessage(null)}}else q=function(){y(V,0)};function Z(H,k){B=y(function(){H(r.unstable_now())},k)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(H){H.callback=null},r.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<H?Math.floor(1e3/H):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_next=function(H){switch(v){case 1:case 2:case 3:var k=3;break;default:k=v}var it=v;v=k;try{return H()}finally{v=it}},r.unstable_requestPaint=function(){x=!0},r.unstable_runWithPriority=function(H,k){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var it=v;v=H;try{return k()}finally{v=it}},r.unstable_scheduleCallback=function(H,k,it){var yt=r.unstable_now();switch(typeof it=="object"&&it!==null?(it=it.delay,it=typeof it=="number"&&0<it?yt+it:yt):it=yt,H){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=it+D,H={id:g++,callback:k,priorityLevel:H,startTime:it,expirationTime:D,sortIndex:-1},it>yt?(H.sortIndex=it,t(d,H),i(m)===null&&H===i(d)&&(w?(z(B),B=-1):w=!0,Z(P,it-yt))):(H.sortIndex=D,t(m,H),E||b||(E=!0,U||(U=!0,q()))),H},r.unstable_shouldYield=W,r.unstable_wrapCallback=function(H){var k=v;return function(){var it=v;v=k;try{return H.apply(this,arguments)}finally{v=it}}}})(Ih)),Ih}var T_;function FS(){return T_||(T_=1,Ph.exports=zS()),Ph.exports}var Bh={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A_;function HS(){if(A_)return Fn;A_=1;var r=pp();function t(m){var d="https://react.dev/errors/"+m;if(1<arguments.length){d+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)d+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var a={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,d,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:d,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(m,d){if(m==="font")return"";if(typeof d=="string")return d==="use-credentials"?d:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Fn.createPortal=function(m,d){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!d||d.nodeType!==1&&d.nodeType!==9&&d.nodeType!==11)throw Error(t(299));return c(m,d,null,g)},Fn.flushSync=function(m){var d=f.T,g=a.p;try{if(f.T=null,a.p=2,m)return m()}finally{f.T=d,a.p=g,a.d.f()}},Fn.preconnect=function(m,d){typeof m=="string"&&(d?(d=d.crossOrigin,d=typeof d=="string"?d==="use-credentials"?d:"":void 0):d=null,a.d.C(m,d))},Fn.prefetchDNS=function(m){typeof m=="string"&&a.d.D(m)},Fn.preinit=function(m,d){if(typeof m=="string"&&d&&typeof d.as=="string"){var g=d.as,_=p(g,d.crossOrigin),v=typeof d.integrity=="string"?d.integrity:void 0,b=typeof d.fetchPriority=="string"?d.fetchPriority:void 0;g==="style"?a.d.S(m,typeof d.precedence=="string"?d.precedence:void 0,{crossOrigin:_,integrity:v,fetchPriority:b}):g==="script"&&a.d.X(m,{crossOrigin:_,integrity:v,fetchPriority:b,nonce:typeof d.nonce=="string"?d.nonce:void 0})}},Fn.preinitModule=function(m,d){if(typeof m=="string")if(typeof d=="object"&&d!==null){if(d.as==null||d.as==="script"){var g=p(d.as,d.crossOrigin);a.d.M(m,{crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0})}}else d==null&&a.d.M(m)},Fn.preload=function(m,d){if(typeof m=="string"&&typeof d=="object"&&d!==null&&typeof d.as=="string"){var g=d.as,_=p(g,d.crossOrigin);a.d.L(m,g,{crossOrigin:_,integrity:typeof d.integrity=="string"?d.integrity:void 0,nonce:typeof d.nonce=="string"?d.nonce:void 0,type:typeof d.type=="string"?d.type:void 0,fetchPriority:typeof d.fetchPriority=="string"?d.fetchPriority:void 0,referrerPolicy:typeof d.referrerPolicy=="string"?d.referrerPolicy:void 0,imageSrcSet:typeof d.imageSrcSet=="string"?d.imageSrcSet:void 0,imageSizes:typeof d.imageSizes=="string"?d.imageSizes:void 0,media:typeof d.media=="string"?d.media:void 0})}},Fn.preloadModule=function(m,d){if(typeof m=="string")if(d){var g=p(d.as,d.crossOrigin);a.d.m(m,{as:typeof d.as=="string"&&d.as!=="script"?d.as:void 0,crossOrigin:g,integrity:typeof d.integrity=="string"?d.integrity:void 0})}else a.d.m(m)},Fn.requestFormReset=function(m){a.d.r(m)},Fn.unstable_batchedUpdates=function(m,d){return m(d)},Fn.useFormState=function(m,d,g){return f.H.useFormState(m,d,g)},Fn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Fn.version="19.2.8",Fn}var w_;function GS(){if(w_)return Bh.exports;w_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Bh.exports=HS(),Bh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C_;function VS(){if(C_)return tl;C_=1;var r=FS(),t=pp(),i=GS();function a(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)n+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,s=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(s=n.return),e=n.return;while(e)}return n.tag===3?s:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(a(188))}function d(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(a(188));return n!==e?null:e}for(var s=e,o=n;;){var u=s.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===s)return m(u),e;if(h===o)return m(u),n;h=h.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=h;else{for(var S=!1,R=u.child;R;){if(R===s){S=!0,s=u,o=h;break}if(R===o){S=!0,o=u,s=h;break}R=R.sibling}if(!S){for(R=h.child;R;){if(R===s){S=!0,s=h,o=u;break}if(R===o){S=!0,o=h,s=u;break}R=R.sibling}if(!S)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,v=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),F=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),P=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),L=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var ut=Symbol.for("react.client.reference");function gt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ut?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case y:return"Profiler";case x:return"StrictMode";case P:return"Suspense";case U:return"SuspenseList";case L:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case F:return e.displayName||"Context";case z:return(e._context.displayName||"Context")+".Consumer";case N:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case B:return n=e.displayName||null,n!==null?n:gt(e.type)||"Memo";case A:n=e._payload,e=e._init;try{return gt(e(n))}catch{}}return null}var Z=Array.isArray,H=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,it={pending:!1,data:null,method:null,action:null},yt=[],D=-1;function M(e){return{current:e}}function O(e){0>D||(e.current=yt[D],yt[D]=null,D--)}function tt(e,n){D++,yt[D]=e.current,e.current=n}var mt=M(null),bt=M(null),J=M(null),rt=M(null);function dt(e,n){switch(tt(J,n),tt(bt,e),tt(mt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?kg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=kg(n),e=Xg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}O(mt),tt(mt,e)}function wt(){O(mt),O(bt),O(J)}function Ht(e){e.memoizedState!==null&&tt(rt,e);var n=mt.current,s=Xg(n,e.type);n!==s&&(tt(bt,e),tt(mt,s))}function Lt(e){bt.current===e&&(O(mt),O(bt)),rt.current===e&&(O(rt),Zo._currentValue=it)}var ce,$t;function kt(e){if(ce===void 0)try{throw Error()}catch(s){var n=s.stack.trim().match(/\n( *(at )?)/);ce=n&&n[1]||"",$t=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ce+e+$t}var re=!1;function le(e,n){if(!e||re)return"";re=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Tt=function(){throw Error()};if(Object.defineProperty(Tt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Tt,[])}catch(pt){var ht=pt}Reflect.construct(e,[],Tt)}else{try{Tt.call()}catch(pt){ht=pt}e.call(Tt.prototype)}}else{try{throw Error()}catch(pt){ht=pt}(Tt=e())&&typeof Tt.catch=="function"&&Tt.catch(function(){})}}catch(pt){if(pt&&ht&&typeof pt.stack=="string")return[pt.stack,ht.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),S=h[0],R=h[1];if(S&&R){var X=S.split(`
`),st=R.split(`
`);for(u=o=0;o<X.length&&!X[o].includes("DetermineComponentFrameRoot");)o++;for(;u<st.length&&!st[u].includes("DetermineComponentFrameRoot");)u++;if(o===X.length||u===st.length)for(o=X.length-1,u=st.length-1;1<=o&&0<=u&&X[o]!==st[u];)u--;for(;1<=o&&0<=u;o--,u--)if(X[o]!==st[u]){if(o!==1||u!==1)do if(o--,u--,0>u||X[o]!==st[u]){var St=`
`+X[o].replace(" at new "," at ");return e.displayName&&St.includes("<anonymous>")&&(St=St.replace("<anonymous>",e.displayName)),St}while(1<=o&&0<=u);break}}}finally{re=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?kt(s):""}function Ae(e,n){switch(e.tag){case 26:case 27:case 5:return kt(e.type);case 16:return kt("Lazy");case 13:return e.child!==n&&n!==null?kt("Suspense Fallback"):kt("Suspense");case 19:return kt("SuspenseList");case 0:case 15:return le(e.type,!1);case 11:return le(e.type.render,!1);case 1:return le(e.type,!0);case 31:return kt("Activity");default:return""}}function Re(e){try{var n="",s=null;do n+=Ae(e,s),s=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ie=Object.prototype.hasOwnProperty,Ne=r.unstable_scheduleCallback,Ye=r.unstable_cancelCallback,an=r.unstable_shouldYield,Q=r.unstable_requestPaint,Oe=r.unstable_now,Ce=r.unstable_getCurrentPriorityLevel,I=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,nt=r.unstable_NormalPriority,ct=r.unstable_LowPriority,_t=r.unstable_IdlePriority,Ct=r.log,Ut=r.unstable_setDisableYieldValue,vt=null,xt=null;function Nt(e){if(typeof Ct=="function"&&Ut(e),xt&&typeof xt.setStrictMode=="function")try{xt.setStrictMode(vt,e)}catch{}}var Gt=Math.clz32?Math.clz32:te,It=Math.log,Ot=Math.LN2;function te(e){return e>>>=0,e===0?32:31-(It(e)/Ot|0)|0}var ee=256,ue=262144,K=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mt(e,n,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var R=o&134217727;return R!==0?(o=R&~h,o!==0?u=Rt(o):(S&=R,S!==0?u=Rt(S):s||(s=R&~e,s!==0&&(u=Rt(s))))):(R=o&~h,R!==0?u=Rt(R):S!==0?u=Rt(S):s||(s=o&~e,s!==0&&(u=Rt(s)))),u===0?0:n!==0&&n!==u&&(n&h)===0&&(h=u&-u,s=n&-n,h>=s||h===32&&(s&4194048)!==0)?n:u}function Dt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Ft(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function At(){var e=K;return K<<=1,(K&62914560)===0&&(K=4194304),e}function Kt(e){for(var n=[],s=0;31>s;s++)n.push(e);return n}function Wt(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function sn(e,n,s,o,u,h){var S=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var R=e.entanglements,X=e.expirationTimes,st=e.hiddenUpdates;for(s=S&~s;0<s;){var St=31-Gt(s),Tt=1<<St;R[St]=0,X[St]=-1;var ht=st[St];if(ht!==null)for(st[St]=null,St=0;St<ht.length;St++){var pt=ht[St];pt!==null&&(pt.lane&=-536870913)}s&=~Tt}o!==0&&ze(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(S&~n))}function ze(e,n,s){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Gt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function si(e,n){var s=e.entangledLanes|=n;for(e=e.entanglements;s;){var o=31-Gt(s),u=1<<o;u&n|e[o]&n&&(e[o]|=n),s&=~u}}function ri(e,n){var s=n&-n;return s=(s&42)!==0?1:lo(s),(s&(e.suspendedLanes|n))!==0?0:s}function lo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function co(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function uo(){var e=k.p;return e!==0?e:(e=window.event,e===void 0?32:d_(e.type))}function ar(e,n){var s=k.p;try{return k.p=e,n()}finally{k.p=s}}var ki=Math.random().toString(36).slice(2),_n="__reactFiber$"+ki,Un="__reactProps$"+ki,jn="__reactContainer$"+ki,As="__reactEvents$"+ki,yl="__reactListeners$"+ki,Sl="__reactHandles$"+ki,ws="__reactResources$"+ki,Ha="__reactMarker$"+ki;function Ga(e){delete e[_n],delete e[Un],delete e[As],delete e[yl],delete e[Sl]}function ra(e){var n=e[_n];if(n)return n;for(var s=e.parentNode;s;){if(n=s[jn]||s[_n]){if(s=n.alternate,n.child!==null||s!==null&&s.child!==null)for(e=Jg(e);e!==null;){if(s=e[_n])return s;e=Jg(e)}return n}e=s,s=e.parentNode}return null}function oa(e){if(e=e[_n]||e[jn]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Cs(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(a(33))}function Va(e){var n=e[ws];return n||(n=e[ws]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[Ha]=!0}var Ml=new Set,C={};function $(e,n){ft(e,n),ft(e+"Capture",n)}function ft(e,n){for(C[e]=n,e=0;e<n.length;e++)Ml.add(n[e])}var ot=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),lt={},Bt={};function Xt(e){return Ie.call(Bt,e)?!0:Ie.call(lt,e)?!1:ot.test(e)?Bt[e]=!0:(lt[e]=!0,!1)}function Pt(e,n,s){if(Xt(n))if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+s)}}function jt(e,n,s){if(s===null)e.removeAttribute(n);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+s)}}function Yt(e,n,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(n,s,""+o)}}function ne(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function de(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Qt(e,n,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(S){s=""+S,h.call(this,S)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(S){s=""+S},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function De(e){if(!e._valueTracker){var n=de(e)?"checked":"value";e._valueTracker=Qt(e,n,""+e[n])}}function rn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var s=n.getValue(),o="";return e&&(o=de(e)?e.checked?"true":"false":e.value),e=o,e!==s?(n.setValue(e),!0):!1}function Je(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Fe=/[\n"\\]/g;function He(e){return e.replace(Fe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Vt(e,n,s,o,u,h,S,R){e.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.type=S:e.removeAttribute("type"),n!=null?S==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+ne(n)):e.value!==""+ne(n)&&(e.value=""+ne(n)):S!=="submit"&&S!=="reset"||e.removeAttribute("value"),n!=null?xe(e,S,ne(n)):s!=null?xe(e,S,ne(s)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?e.name=""+ne(R):e.removeAttribute("name")}function zn(e,n,s,o,u,h,S,R){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),n!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||n!=null)){De(e);return}s=s!=null?""+ne(s):"",n=n!=null?""+ne(n):s,R||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=R?e.checked:!!o,e.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(e.name=S),De(e)}function xe(e,n,s){n==="number"&&Je(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function En(e,n,s,o){if(e=e.options,n){n={};for(var u=0;u<s.length;u++)n["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=n.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+ne(s),n=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function oi(e,n,s){if(n!=null&&(n=""+ne(n),n!==e.value&&(e.value=n),s==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=s!=null?""+ne(s):""}function Di(e,n,s,o){if(n==null){if(o!=null){if(s!=null)throw Error(a(92));if(Z(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),n=s}s=ne(n),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),De(e)}function li(e,n){if(n){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=n;return}}e.textContent=n}var Ge=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function on(e,n,s){var o=n.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,s):typeof s!="number"||s===0||Ge.has(n)?n==="float"?e.cssFloat=s:e[n]=(""+s).trim():e[n]=s+"px"}function Ui(e,n,s){if(n!=null&&typeof n!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&s[u]!==o&&on(e,u,o)}else for(var h in n)n.hasOwnProperty(h)&&on(e,h,n[h])}function Be(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ka=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Rs(e){return ka.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function la(){}var Cu=null;function Ru(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sr=null,rr=null;function Vp(e){var n=oa(e);if(n&&(e=n.stateNode)){var s=e[Un]||null;t:switch(e=n.stateNode,n.type){case"input":if(Vt(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),n=s.name,s.type==="radio"&&n!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+He(""+n)+'"][type="radio"]'),n=0;n<s.length;n++){var o=s[n];if(o!==e&&o.form===e.form){var u=o[Un]||null;if(!u)throw Error(a(90));Vt(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<s.length;n++)o=s[n],o.form===e.form&&rn(o)}break t;case"textarea":oi(e,s.value,s.defaultValue);break t;case"select":n=s.value,n!=null&&En(e,!!s.multiple,n,!1)}}}var Nu=!1;function kp(e,n,s){if(Nu)return e(n,s);Nu=!0;try{var o=e(n);return o}finally{if(Nu=!1,(sr!==null||rr!==null)&&(cc(),sr&&(n=sr,e=rr,rr=sr=null,Vp(n),e)))for(n=0;n<e.length;n++)Vp(e[n])}}function fo(e,n){var s=e.stateNode;if(s===null)return null;var o=s[Un]||null;if(o===null)return null;s=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,n,typeof s));return s}var ca=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Du=!1;if(ca)try{var ho={};Object.defineProperty(ho,"passive",{get:function(){Du=!0}}),window.addEventListener("test",ho,ho),window.removeEventListener("test",ho,ho)}catch{Du=!1}var Xa=null,Uu=null,bl=null;function Xp(){if(bl)return bl;var e,n=Uu,s=n.length,o,u="value"in Xa?Xa.value:Xa.textContent,h=u.length;for(e=0;e<s&&n[e]===u[e];e++);var S=s-e;for(o=1;o<=S&&n[s-o]===u[h-o];o++);return bl=u.slice(e,1<o?1-o:void 0)}function El(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Tl(){return!0}function Wp(){return!1}function Zn(e){function n(s,o,u,h,S){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=S,this.currentTarget=null;for(var R in e)e.hasOwnProperty(R)&&(s=e[R],this[R]=s?s(h):h[R]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Tl:Wp,this.isPropagationStopped=Wp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Tl)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Tl)},persist:function(){},isPersistent:Tl}),n}var Ns={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Al=Zn(Ns),po=_({},Ns,{view:0,detail:0}),Lx=Zn(po),Lu,Ou,mo,wl=_({},po,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Iu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==mo&&(mo&&e.type==="mousemove"?(Lu=e.screenX-mo.screenX,Ou=e.screenY-mo.screenY):Ou=Lu=0,mo=e),Lu)},movementY:function(e){return"movementY"in e?e.movementY:Ou}}),Yp=Zn(wl),Ox=_({},wl,{dataTransfer:0}),Px=Zn(Ox),Ix=_({},po,{relatedTarget:0}),Pu=Zn(Ix),Bx=_({},Ns,{animationName:0,elapsedTime:0,pseudoElement:0}),zx=Zn(Bx),Fx=_({},Ns,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hx=Zn(Fx),Gx=_({},Ns,{data:0}),qp=Zn(Gx),Vx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},kx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Xx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wx(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Xx[e])?!!n[e]:!1}function Iu(){return Wx}var Yx=_({},po,{key:function(e){if(e.key){var n=Vx[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=El(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?kx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Iu,charCode:function(e){return e.type==="keypress"?El(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?El(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qx=Zn(Yx),jx=_({},wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),jp=Zn(jx),Zx=_({},po,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Iu}),Kx=Zn(Zx),Jx=_({},Ns,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qx=Zn(Jx),$x=_({},wl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ty=Zn($x),ey=_({},Ns,{newState:0,oldState:0}),ny=Zn(ey),iy=[9,13,27,32],Bu=ca&&"CompositionEvent"in window,go=null;ca&&"documentMode"in document&&(go=document.documentMode);var ay=ca&&"TextEvent"in window&&!go,Zp=ca&&(!Bu||go&&8<go&&11>=go),Kp=" ",Jp=!1;function Qp(e,n){switch(e){case"keyup":return iy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $p(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var or=!1;function sy(e,n){switch(e){case"compositionend":return $p(n);case"keypress":return n.which!==32?null:(Jp=!0,Kp);case"textInput":return e=n.data,e===Kp&&Jp?null:e;default:return null}}function ry(e,n){if(or)return e==="compositionend"||!Bu&&Qp(e,n)?(e=Xp(),bl=Uu=Xa=null,or=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Zp&&n.locale!=="ko"?null:n.data;default:return null}}var oy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tm(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!oy[e.type]:n==="textarea"}function em(e,n,s,o){sr?rr?rr.push(o):rr=[o]:sr=o,n=gc(n,"onChange"),0<n.length&&(s=new Al("onChange","change",null,s,o),e.push({event:s,listeners:n}))}var _o=null,vo=null;function ly(e){Bg(e,0)}function Cl(e){var n=Cs(e);if(rn(n))return e}function nm(e,n){if(e==="change")return n}var im=!1;if(ca){var zu;if(ca){var Fu="oninput"in document;if(!Fu){var am=document.createElement("div");am.setAttribute("oninput","return;"),Fu=typeof am.oninput=="function"}zu=Fu}else zu=!1;im=zu&&(!document.documentMode||9<document.documentMode)}function sm(){_o&&(_o.detachEvent("onpropertychange",rm),vo=_o=null)}function rm(e){if(e.propertyName==="value"&&Cl(vo)){var n=[];em(n,vo,e,Ru(e)),kp(ly,n)}}function cy(e,n,s){e==="focusin"?(sm(),_o=n,vo=s,_o.attachEvent("onpropertychange",rm)):e==="focusout"&&sm()}function uy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cl(vo)}function fy(e,n){if(e==="click")return Cl(n)}function hy(e,n){if(e==="input"||e==="change")return Cl(n)}function dy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ci=typeof Object.is=="function"?Object.is:dy;function xo(e,n){if(ci(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var s=Object.keys(e),o=Object.keys(n);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!Ie.call(n,u)||!ci(e[u],n[u]))return!1}return!0}function om(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function lm(e,n){var s=om(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=n&&o>=n)return{node:s,offset:n-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=om(s)}}function cm(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?cm(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function um(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Je(e.document);n instanceof e.HTMLIFrameElement;){try{var s=typeof n.contentWindow.location.href=="string"}catch{s=!1}if(s)e=n.contentWindow;else break;n=Je(e.document)}return n}function Hu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var py=ca&&"documentMode"in document&&11>=document.documentMode,lr=null,Gu=null,yo=null,Vu=!1;function fm(e,n,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Vu||lr==null||lr!==Je(o)||(o=lr,"selectionStart"in o&&Hu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),yo&&xo(yo,o)||(yo=o,o=gc(Gu,"onSelect"),0<o.length&&(n=new Al("onSelect","select",null,n,s),e.push({event:n,listeners:o}),n.target=lr)))}function Ds(e,n){var s={};return s[e.toLowerCase()]=n.toLowerCase(),s["Webkit"+e]="webkit"+n,s["Moz"+e]="moz"+n,s}var cr={animationend:Ds("Animation","AnimationEnd"),animationiteration:Ds("Animation","AnimationIteration"),animationstart:Ds("Animation","AnimationStart"),transitionrun:Ds("Transition","TransitionRun"),transitionstart:Ds("Transition","TransitionStart"),transitioncancel:Ds("Transition","TransitionCancel"),transitionend:Ds("Transition","TransitionEnd")},ku={},hm={};ca&&(hm=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);function Us(e){if(ku[e])return ku[e];if(!cr[e])return e;var n=cr[e],s;for(s in n)if(n.hasOwnProperty(s)&&s in hm)return ku[e]=n[s];return e}var dm=Us("animationend"),pm=Us("animationiteration"),mm=Us("animationstart"),my=Us("transitionrun"),gy=Us("transitionstart"),_y=Us("transitioncancel"),gm=Us("transitionend"),_m=new Map,Xu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Xu.push("scrollEnd");function Li(e,n){_m.set(e,n),$(n,[e])}var Rl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},yi=[],ur=0,Wu=0;function Nl(){for(var e=ur,n=Wu=ur=0;n<e;){var s=yi[n];yi[n++]=null;var o=yi[n];yi[n++]=null;var u=yi[n];yi[n++]=null;var h=yi[n];if(yi[n++]=null,o!==null&&u!==null){var S=o.pending;S===null?u.next=u:(u.next=S.next,S.next=u),o.pending=u}h!==0&&vm(s,u,h)}}function Dl(e,n,s,o){yi[ur++]=e,yi[ur++]=n,yi[ur++]=s,yi[ur++]=o,Wu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Yu(e,n,s,o){return Dl(e,n,s,o),Ul(e)}function Ls(e,n){return Dl(e,null,null,n),Ul(e)}function vm(e,n,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,h=e.return;h!==null;)h.childLanes|=s,o=h.alternate,o!==null&&(o.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&n!==null&&(u=31-Gt(s),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=s|536870912),h):null}function Ul(e){if(50<Vo)throw Vo=0,nh=null,Error(a(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var fr={};function vy(e,n,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,n,s,o){return new vy(e,n,s,o)}function qu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ua(e,n){var s=e.alternate;return s===null?(s=ui(e.tag,n,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=n,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,n=e.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function xm(e,n){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,n=s.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Ll(e,n,s,o,u,h){var S=0;if(o=e,typeof e=="function")qu(e)&&(S=1);else if(typeof e=="string")S=bS(e,s,mt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case L:return e=ui(31,s,n,u),e.elementType=L,e.lanes=h,e;case w:return Os(s.children,u,h,n);case x:S=8,u|=24;break;case y:return e=ui(12,s,n,u|2),e.elementType=y,e.lanes=h,e;case P:return e=ui(13,s,n,u),e.elementType=P,e.lanes=h,e;case U:return e=ui(19,s,n,u),e.elementType=U,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case F:S=10;break t;case z:S=9;break t;case N:S=11;break t;case B:S=14;break t;case A:S=16,o=null;break t}S=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return n=ui(S,s,n,u),n.elementType=e,n.type=o,n.lanes=h,n}function Os(e,n,s,o){return e=ui(7,e,o,n),e.lanes=s,e}function ju(e,n,s){return e=ui(6,e,null,n),e.lanes=s,e}function ym(e){var n=ui(18,null,null,0);return n.stateNode=e,n}function Zu(e,n,s){return n=ui(4,e.children!==null?e.children:[],e.key,n),n.lanes=s,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Sm=new WeakMap;function Si(e,n){if(typeof e=="object"&&e!==null){var s=Sm.get(e);return s!==void 0?s:(n={value:e,source:n,stack:Re(n)},Sm.set(e,n),n)}return{value:e,source:n,stack:Re(n)}}var hr=[],dr=0,Ol=null,So=0,Mi=[],bi=0,Wa=null,Wi=1,Yi="";function fa(e,n){hr[dr++]=So,hr[dr++]=Ol,Ol=e,So=n}function Mm(e,n,s){Mi[bi++]=Wi,Mi[bi++]=Yi,Mi[bi++]=Wa,Wa=e;var o=Wi;e=Yi;var u=32-Gt(o)-1;o&=~(1<<u),s+=1;var h=32-Gt(n)+u;if(30<h){var S=u-u%5;h=(o&(1<<S)-1).toString(32),o>>=S,u-=S,Wi=1<<32-Gt(n)+u|s<<u|o,Yi=h+e}else Wi=1<<h|s<<u|o,Yi=e}function Ku(e){e.return!==null&&(fa(e,1),Mm(e,1,0))}function Ju(e){for(;e===Ol;)Ol=hr[--dr],hr[dr]=null,So=hr[--dr],hr[dr]=null;for(;e===Wa;)Wa=Mi[--bi],Mi[bi]=null,Yi=Mi[--bi],Mi[bi]=null,Wi=Mi[--bi],Mi[bi]=null}function bm(e,n){Mi[bi++]=Wi,Mi[bi++]=Yi,Mi[bi++]=Wa,Wi=n.id,Yi=n.overflow,Wa=e}var Ln=null,$e=null,Ee=!1,Ya=null,Ei=!1,Qu=Error(a(519));function qa(e){var n=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mo(Si(n,e)),Qu}function Em(e){var n=e.stateNode,s=e.type,o=e.memoizedProps;switch(n[_n]=e,n[Un]=o,s){case"dialog":Se("cancel",n),Se("close",n);break;case"iframe":case"object":case"embed":Se("load",n);break;case"video":case"audio":for(s=0;s<Xo.length;s++)Se(Xo[s],n);break;case"source":Se("error",n);break;case"img":case"image":case"link":Se("error",n),Se("load",n);break;case"details":Se("toggle",n);break;case"input":Se("invalid",n),zn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Se("invalid",n);break;case"textarea":Se("invalid",n),Di(n,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||n.textContent===""+s||o.suppressHydrationWarning===!0||Gg(n.textContent,s)?(o.popover!=null&&(Se("beforetoggle",n),Se("toggle",n)),o.onScroll!=null&&Se("scroll",n),o.onScrollEnd!=null&&Se("scrollend",n),o.onClick!=null&&(n.onclick=la),n=!0):n=!1,n||qa(e,!0)}function Tm(e){for(Ln=e.return;Ln;)switch(Ln.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Ln=Ln.return}}function pr(e){if(e!==Ln)return!1;if(!Ee)return Tm(e),Ee=!0,!1;var n=e.tag,s;if((s=n!==3&&n!==27)&&((s=n===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||_h(e.type,e.memoizedProps)),s=!s),s&&$e&&qa(e),Tm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=Kg(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));$e=Kg(e)}else n===27?(n=$e,os(e.type)?(e=Mh,Mh=null,$e=e):$e=n):$e=Ln?Ai(e.stateNode.nextSibling):null;return!0}function Ps(){$e=Ln=null,Ee=!1}function $u(){var e=Ya;return e!==null&&($n===null?$n=e:$n.push.apply($n,e),Ya=null),e}function Mo(e){Ya===null?Ya=[e]:Ya.push(e)}var tf=M(null),Is=null,ha=null;function ja(e,n,s){tt(tf,n._currentValue),n._currentValue=s}function da(e){e._currentValue=tf.current,O(tf)}function ef(e,n,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===s)break;e=e.return}}function nf(e,n,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var S=u.child;h=h.firstContext;t:for(;h!==null;){var R=h;h=u;for(var X=0;X<n.length;X++)if(R.context===n[X]){h.lanes|=s,R=h.alternate,R!==null&&(R.lanes|=s),ef(h.return,s,e),o||(S=null);break t}h=R.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(a(341));S.lanes|=s,h=S.alternate,h!==null&&(h.lanes|=s),ef(S,s,e),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===e){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function mr(e,n,s,o){e=null;for(var u=n,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(a(387));if(S=S.memoizedProps,S!==null){var R=u.type;ci(u.pendingProps.value,S.value)||(e!==null?e.push(R):e=[R])}}else if(u===rt.current){if(S=u.alternate,S===null)throw Error(a(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Zo):e=[Zo])}u=u.return}e!==null&&nf(n,e,s,o),n.flags|=262144}function Pl(e){for(e=e.firstContext;e!==null;){if(!ci(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Bs(e){Is=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function On(e){return Am(Is,e)}function Il(e,n){return Is===null&&Bs(e),Am(e,n)}function Am(e,n){var s=n._currentValue;if(n={context:n,memoizedValue:s,next:null},ha===null){if(e===null)throw Error(a(308));ha=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else ha=ha.next=n;return s}var xy=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(s){return s()})}},yy=r.unstable_scheduleCallback,Sy=r.unstable_NormalPriority,xn={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function af(){return{controller:new xy,data:new Map,refCount:0}}function bo(e){e.refCount--,e.refCount===0&&yy(Sy,function(){e.controller.abort()})}var Eo=null,sf=0,gr=0,_r=null;function My(e,n){if(Eo===null){var s=Eo=[];sf=0,gr=lh(),_r={status:"pending",value:void 0,then:function(o){s.push(o)}}}return sf++,n.then(wm,wm),n}function wm(){if(--sf===0&&Eo!==null){_r!==null&&(_r.status="fulfilled");var e=Eo;Eo=null,gr=0,_r=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function by(e,n){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<s.length;u++)(0,s[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var Cm=H.S;H.S=function(e,n){fg=Oe(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&My(e,n),Cm!==null&&Cm(e,n)};var zs=M(null);function rf(){var e=zs.current;return e!==null?e:Qe.pooledCache}function Bl(e,n){n===null?tt(zs,zs.current):tt(zs,n.pool)}function Rm(){var e=rf();return e===null?null:{parent:xn._currentValue,pool:e}}var vr=Error(a(460)),of=Error(a(474)),zl=Error(a(542)),Fl={then:function(){}};function Nm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Dm(e,n,s){switch(s=e[s],s===void 0?e.push(n):s!==n&&(n.then(la,la),n=s),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Lm(e),e;default:if(typeof n.status=="string")n.then(la,la);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Lm(e),e}throw Hs=n,vr}}function Fs(e){try{var n=e._init;return n(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Hs=s,vr):s}}var Hs=null;function Um(){if(Hs===null)throw Error(a(459));var e=Hs;return Hs=null,e}function Lm(e){if(e===vr||e===zl)throw Error(a(483))}var xr=null,To=0;function Hl(e){var n=To;return To+=1,xr===null&&(xr=[]),Dm(xr,e,n)}function Ao(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Gl(e,n){throw n.$$typeof===v?Error(a(525)):(e=Object.prototype.toString.call(n),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Om(e){function n(et,j){if(e){var at=et.deletions;at===null?(et.deletions=[j],et.flags|=16):at.push(j)}}function s(et,j){if(!e)return null;for(;j!==null;)n(et,j),j=j.sibling;return null}function o(et){for(var j=new Map;et!==null;)et.key!==null?j.set(et.key,et):j.set(et.index,et),et=et.sibling;return j}function u(et,j){return et=ua(et,j),et.index=0,et.sibling=null,et}function h(et,j,at){return et.index=at,e?(at=et.alternate,at!==null?(at=at.index,at<j?(et.flags|=67108866,j):at):(et.flags|=67108866,j)):(et.flags|=1048576,j)}function S(et){return e&&et.alternate===null&&(et.flags|=67108866),et}function R(et,j,at,Et){return j===null||j.tag!==6?(j=ju(at,et.mode,Et),j.return=et,j):(j=u(j,at),j.return=et,j)}function X(et,j,at,Et){var ie=at.type;return ie===w?St(et,j,at.props.children,Et,at.key):j!==null&&(j.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===A&&Fs(ie)===j.type)?(j=u(j,at.props),Ao(j,at),j.return=et,j):(j=Ll(at.type,at.key,at.props,null,et.mode,Et),Ao(j,at),j.return=et,j)}function st(et,j,at,Et){return j===null||j.tag!==4||j.stateNode.containerInfo!==at.containerInfo||j.stateNode.implementation!==at.implementation?(j=Zu(at,et.mode,Et),j.return=et,j):(j=u(j,at.children||[]),j.return=et,j)}function St(et,j,at,Et,ie){return j===null||j.tag!==7?(j=Os(at,et.mode,Et,ie),j.return=et,j):(j=u(j,at),j.return=et,j)}function Tt(et,j,at){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=ju(""+j,et.mode,at),j.return=et,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case b:return at=Ll(j.type,j.key,j.props,null,et.mode,at),Ao(at,j),at.return=et,at;case E:return j=Zu(j,et.mode,at),j.return=et,j;case A:return j=Fs(j),Tt(et,j,at)}if(Z(j)||q(j))return j=Os(j,et.mode,at,null),j.return=et,j;if(typeof j.then=="function")return Tt(et,Hl(j),at);if(j.$$typeof===F)return Tt(et,Il(et,j),at);Gl(et,j)}return null}function ht(et,j,at,Et){var ie=j!==null?j.key:null;if(typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint")return ie!==null?null:R(et,j,""+at,Et);if(typeof at=="object"&&at!==null){switch(at.$$typeof){case b:return at.key===ie?X(et,j,at,Et):null;case E:return at.key===ie?st(et,j,at,Et):null;case A:return at=Fs(at),ht(et,j,at,Et)}if(Z(at)||q(at))return ie!==null?null:St(et,j,at,Et,null);if(typeof at.then=="function")return ht(et,j,Hl(at),Et);if(at.$$typeof===F)return ht(et,j,Il(et,at),Et);Gl(et,at)}return null}function pt(et,j,at,Et,ie){if(typeof Et=="string"&&Et!==""||typeof Et=="number"||typeof Et=="bigint")return et=et.get(at)||null,R(j,et,""+Et,ie);if(typeof Et=="object"&&Et!==null){switch(Et.$$typeof){case b:return et=et.get(Et.key===null?at:Et.key)||null,X(j,et,Et,ie);case E:return et=et.get(Et.key===null?at:Et.key)||null,st(j,et,Et,ie);case A:return Et=Fs(Et),pt(et,j,at,Et,ie)}if(Z(Et)||q(Et))return et=et.get(at)||null,St(j,et,Et,ie,null);if(typeof Et.then=="function")return pt(et,j,at,Hl(Et),ie);if(Et.$$typeof===F)return pt(et,j,at,Il(j,Et),ie);Gl(j,Et)}return null}function Zt(et,j,at,Et){for(var ie=null,Ue=null,Jt=j,me=j=0,be=null;Jt!==null&&me<at.length;me++){Jt.index>me?(be=Jt,Jt=null):be=Jt.sibling;var Le=ht(et,Jt,at[me],Et);if(Le===null){Jt===null&&(Jt=be);break}e&&Jt&&Le.alternate===null&&n(et,Jt),j=h(Le,j,me),Ue===null?ie=Le:Ue.sibling=Le,Ue=Le,Jt=be}if(me===at.length)return s(et,Jt),Ee&&fa(et,me),ie;if(Jt===null){for(;me<at.length;me++)Jt=Tt(et,at[me],Et),Jt!==null&&(j=h(Jt,j,me),Ue===null?ie=Jt:Ue.sibling=Jt,Ue=Jt);return Ee&&fa(et,me),ie}for(Jt=o(Jt);me<at.length;me++)be=pt(Jt,et,me,at[me],Et),be!==null&&(e&&be.alternate!==null&&Jt.delete(be.key===null?me:be.key),j=h(be,j,me),Ue===null?ie=be:Ue.sibling=be,Ue=be);return e&&Jt.forEach(function(hs){return n(et,hs)}),Ee&&fa(et,me),ie}function se(et,j,at,Et){if(at==null)throw Error(a(151));for(var ie=null,Ue=null,Jt=j,me=j=0,be=null,Le=at.next();Jt!==null&&!Le.done;me++,Le=at.next()){Jt.index>me?(be=Jt,Jt=null):be=Jt.sibling;var hs=ht(et,Jt,Le.value,Et);if(hs===null){Jt===null&&(Jt=be);break}e&&Jt&&hs.alternate===null&&n(et,Jt),j=h(hs,j,me),Ue===null?ie=hs:Ue.sibling=hs,Ue=hs,Jt=be}if(Le.done)return s(et,Jt),Ee&&fa(et,me),ie;if(Jt===null){for(;!Le.done;me++,Le=at.next())Le=Tt(et,Le.value,Et),Le!==null&&(j=h(Le,j,me),Ue===null?ie=Le:Ue.sibling=Le,Ue=Le);return Ee&&fa(et,me),ie}for(Jt=o(Jt);!Le.done;me++,Le=at.next())Le=pt(Jt,et,me,Le.value,Et),Le!==null&&(e&&Le.alternate!==null&&Jt.delete(Le.key===null?me:Le.key),j=h(Le,j,me),Ue===null?ie=Le:Ue.sibling=Le,Ue=Le);return e&&Jt.forEach(function(OS){return n(et,OS)}),Ee&&fa(et,me),ie}function Ze(et,j,at,Et){if(typeof at=="object"&&at!==null&&at.type===w&&at.key===null&&(at=at.props.children),typeof at=="object"&&at!==null){switch(at.$$typeof){case b:t:{for(var ie=at.key;j!==null;){if(j.key===ie){if(ie=at.type,ie===w){if(j.tag===7){s(et,j.sibling),Et=u(j,at.props.children),Et.return=et,et=Et;break t}}else if(j.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===A&&Fs(ie)===j.type){s(et,j.sibling),Et=u(j,at.props),Ao(Et,at),Et.return=et,et=Et;break t}s(et,j);break}else n(et,j);j=j.sibling}at.type===w?(Et=Os(at.props.children,et.mode,Et,at.key),Et.return=et,et=Et):(Et=Ll(at.type,at.key,at.props,null,et.mode,Et),Ao(Et,at),Et.return=et,et=Et)}return S(et);case E:t:{for(ie=at.key;j!==null;){if(j.key===ie)if(j.tag===4&&j.stateNode.containerInfo===at.containerInfo&&j.stateNode.implementation===at.implementation){s(et,j.sibling),Et=u(j,at.children||[]),Et.return=et,et=Et;break t}else{s(et,j);break}else n(et,j);j=j.sibling}Et=Zu(at,et.mode,Et),Et.return=et,et=Et}return S(et);case A:return at=Fs(at),Ze(et,j,at,Et)}if(Z(at))return Zt(et,j,at,Et);if(q(at)){if(ie=q(at),typeof ie!="function")throw Error(a(150));return at=ie.call(at),se(et,j,at,Et)}if(typeof at.then=="function")return Ze(et,j,Hl(at),Et);if(at.$$typeof===F)return Ze(et,j,Il(et,at),Et);Gl(et,at)}return typeof at=="string"&&at!==""||typeof at=="number"||typeof at=="bigint"?(at=""+at,j!==null&&j.tag===6?(s(et,j.sibling),Et=u(j,at),Et.return=et,et=Et):(s(et,j),Et=ju(at,et.mode,Et),Et.return=et,et=Et),S(et)):s(et,j)}return function(et,j,at,Et){try{To=0;var ie=Ze(et,j,at,Et);return xr=null,ie}catch(Jt){if(Jt===vr||Jt===zl)throw Jt;var Ue=ui(29,Jt,null,et.mode);return Ue.lanes=Et,Ue.return=et,Ue}finally{}}}var Gs=Om(!0),Pm=Om(!1),Za=!1;function lf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function cf(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ka(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ja(e,n,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Pe&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Ul(e),vm(e,null,s),n}return Dl(e,o,n,s),Ul(e)}function wo(e,n,s){if(n=n.updateQueue,n!==null&&(n=n.shared,(s&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,si(e,s)}}function uf(e,n){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var S={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?u=h=S:h=h.next=S,s=s.next}while(s!==null);h===null?u=h=n:h=h.next=n}else u=h=n;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=n:e.next=n,s.lastBaseUpdate=n}var ff=!1;function Co(){if(ff){var e=_r;if(e!==null)throw e}}function Ro(e,n,s,o){ff=!1;var u=e.updateQueue;Za=!1;var h=u.firstBaseUpdate,S=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var X=R,st=X.next;X.next=null,S===null?h=st:S.next=st,S=X;var St=e.alternate;St!==null&&(St=St.updateQueue,R=St.lastBaseUpdate,R!==S&&(R===null?St.firstBaseUpdate=st:R.next=st,St.lastBaseUpdate=X))}if(h!==null){var Tt=u.baseState;S=0,St=st=X=null,R=h;do{var ht=R.lane&-536870913,pt=ht!==R.lane;if(pt?(Me&ht)===ht:(o&ht)===ht){ht!==0&&ht===gr&&(ff=!0),St!==null&&(St=St.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var Zt=e,se=R;ht=n;var Ze=s;switch(se.tag){case 1:if(Zt=se.payload,typeof Zt=="function"){Tt=Zt.call(Ze,Tt,ht);break t}Tt=Zt;break t;case 3:Zt.flags=Zt.flags&-65537|128;case 0:if(Zt=se.payload,ht=typeof Zt=="function"?Zt.call(Ze,Tt,ht):Zt,ht==null)break t;Tt=_({},Tt,ht);break t;case 2:Za=!0}}ht=R.callback,ht!==null&&(e.flags|=64,pt&&(e.flags|=8192),pt=u.callbacks,pt===null?u.callbacks=[ht]:pt.push(ht))}else pt={lane:ht,tag:R.tag,payload:R.payload,callback:R.callback,next:null},St===null?(st=St=pt,X=Tt):St=St.next=pt,S|=ht;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;pt=R,R=pt.next,pt.next=null,u.lastBaseUpdate=pt,u.shared.pending=null}}while(!0);St===null&&(X=Tt),u.baseState=X,u.firstBaseUpdate=st,u.lastBaseUpdate=St,h===null&&(u.shared.lanes=0),ns|=S,e.lanes=S,e.memoizedState=Tt}}function Im(e,n){if(typeof e!="function")throw Error(a(191,e));e.call(n)}function Bm(e,n){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Im(s[e],n)}var yr=M(null),Vl=M(0);function zm(e,n){e=Ma,tt(Vl,e),tt(yr,n),Ma=e|n.baseLanes}function hf(){tt(Vl,Ma),tt(yr,yr.current)}function df(){Ma=Vl.current,O(yr),O(Vl)}var fi=M(null),Ti=null;function Qa(e){var n=e.alternate;tt(pn,pn.current&1),tt(fi,e),Ti===null&&(n===null||yr.current!==null||n.memoizedState!==null)&&(Ti=e)}function pf(e){tt(pn,pn.current),tt(fi,e),Ti===null&&(Ti=e)}function Fm(e){e.tag===22?(tt(pn,pn.current),tt(fi,e),Ti===null&&(Ti=e)):$a()}function $a(){tt(pn,pn.current),tt(fi,fi.current)}function hi(e){O(fi),Ti===e&&(Ti=null),O(pn)}var pn=M(0);function kl(e){for(var n=e;n!==null;){if(n.tag===13){var s=n.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||yh(s)||Sh(s)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var pa=0,pe=null,qe=null,yn=null,Xl=!1,Sr=!1,Vs=!1,Wl=0,No=0,Mr=null,Ey=0;function fn(){throw Error(a(321))}function mf(e,n){if(n===null)return!1;for(var s=0;s<n.length&&s<e.length;s++)if(!ci(e[s],n[s]))return!1;return!0}function gf(e,n,s,o,u,h){return pa=h,pe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,H.H=e===null||e.memoizedState===null?M0:Df,Vs=!1,h=s(o,u),Vs=!1,Sr&&(h=Gm(n,s,o,u)),Hm(e),h}function Hm(e){H.H=Lo;var n=qe!==null&&qe.next!==null;if(pa=0,yn=qe=pe=null,Xl=!1,No=0,Mr=null,n)throw Error(a(300));e===null||Sn||(e=e.dependencies,e!==null&&Pl(e)&&(Sn=!0))}function Gm(e,n,s,o){pe=e;var u=0;do{if(Sr&&(Mr=null),No=0,Sr=!1,25<=u)throw Error(a(301));if(u+=1,yn=qe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}H.H=b0,h=n(s,o)}while(Sr);return h}function Ty(){var e=H.H,n=e.useState()[0];return n=typeof n.then=="function"?Do(n):n,e=e.useState()[0],(qe!==null?qe.memoizedState:null)!==e&&(pe.flags|=1024),n}function _f(){var e=Wl!==0;return Wl=0,e}function vf(e,n,s){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~s}function xf(e){if(Xl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Xl=!1}pa=0,yn=qe=pe=null,Sr=!1,No=Wl=0,Mr=null}function Wn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return yn===null?pe.memoizedState=yn=e:yn=yn.next=e,yn}function mn(){if(qe===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=qe.next;var n=yn===null?pe.memoizedState:yn.next;if(n!==null)yn=n,qe=e;else{if(e===null)throw pe.alternate===null?Error(a(467)):Error(a(310));qe=e,e={memoizedState:qe.memoizedState,baseState:qe.baseState,baseQueue:qe.baseQueue,queue:qe.queue,next:null},yn===null?pe.memoizedState=yn=e:yn=yn.next=e}return yn}function Yl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Do(e){var n=No;return No+=1,Mr===null&&(Mr=[]),e=Dm(Mr,e,n),n=pe,(yn===null?n.memoizedState:yn.next)===null&&(n=n.alternate,H.H=n===null||n.memoizedState===null?M0:Df),e}function ql(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Do(e);if(e.$$typeof===F)return On(e)}throw Error(a(438,String(e)))}function yf(e){var n=null,s=pe.updateQueue;if(s!==null&&(n=s.memoCache),n==null){var o=pe.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),s===null&&(s=Yl(),pe.updateQueue=s),s.memoCache=n,s=n.data[n.index],s===void 0)for(s=n.data[n.index]=Array(e),o=0;o<e;o++)s[o]=W;return n.index++,s}function ma(e,n){return typeof n=="function"?n(e):n}function jl(e){var n=mn();return Sf(n,qe,e)}function Sf(e,n,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var S=u.next;u.next=h.next,h.next=S}n.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{n=u.next;var R=S=null,X=null,st=n,St=!1;do{var Tt=st.lane&-536870913;if(Tt!==st.lane?(Me&Tt)===Tt:(pa&Tt)===Tt){var ht=st.revertLane;if(ht===0)X!==null&&(X=X.next={lane:0,revertLane:0,gesture:null,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null}),Tt===gr&&(St=!0);else if((pa&ht)===ht){st=st.next,ht===gr&&(St=!0);continue}else Tt={lane:0,revertLane:st.revertLane,gesture:null,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},X===null?(R=X=Tt,S=h):X=X.next=Tt,pe.lanes|=ht,ns|=ht;Tt=st.action,Vs&&s(h,Tt),h=st.hasEagerState?st.eagerState:s(h,Tt)}else ht={lane:Tt,revertLane:st.revertLane,gesture:st.gesture,action:st.action,hasEagerState:st.hasEagerState,eagerState:st.eagerState,next:null},X===null?(R=X=ht,S=h):X=X.next=ht,pe.lanes|=Tt,ns|=Tt;st=st.next}while(st!==null&&st!==n);if(X===null?S=h:X.next=R,!ci(h,e.memoizedState)&&(Sn=!0,St&&(s=_r,s!==null)))throw s;e.memoizedState=h,e.baseState=S,e.baseQueue=X,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Mf(e){var n=mn(),s=n.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,h=n.memoizedState;if(u!==null){s.pending=null;var S=u=u.next;do h=e(h,S.action),S=S.next;while(S!==u);ci(h,n.memoizedState)||(Sn=!0),n.memoizedState=h,n.baseQueue===null&&(n.baseState=h),s.lastRenderedState=h}return[h,o]}function Vm(e,n,s){var o=pe,u=mn(),h=Ee;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=n();var S=!ci((qe||u).memoizedState,s);if(S&&(u.memoizedState=s,Sn=!0),u=u.queue,Tf(Wm.bind(null,o,u,e),[e]),u.getSnapshot!==n||S||yn!==null&&yn.memoizedState.tag&1){if(o.flags|=2048,br(9,{destroy:void 0},Xm.bind(null,o,u,s,n),null),Qe===null)throw Error(a(349));h||(pa&127)!==0||km(o,n,s)}return s}function km(e,n,s){e.flags|=16384,e={getSnapshot:n,value:s},n=pe.updateQueue,n===null?(n=Yl(),pe.updateQueue=n,n.stores=[e]):(s=n.stores,s===null?n.stores=[e]:s.push(e))}function Xm(e,n,s,o){n.value=s,n.getSnapshot=o,Ym(n)&&qm(e)}function Wm(e,n,s){return s(function(){Ym(n)&&qm(e)})}function Ym(e){var n=e.getSnapshot;e=e.value;try{var s=n();return!ci(e,s)}catch{return!0}}function qm(e){var n=Ls(e,2);n!==null&&ti(n,e,2)}function bf(e){var n=Wn();if(typeof e=="function"){var s=e;if(e=s(),Vs){Nt(!0);try{s()}finally{Nt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:e},n}function jm(e,n,s,o){return e.baseState=s,Sf(e,qe,typeof o=="function"?o:ma)}function Ay(e,n,s,o,u){if(Jl(e))throw Error(a(485));if(e=n.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){h.listeners.push(S)}};H.T!==null?s(!0):h.isTransition=!1,o(h),s=n.pending,s===null?(h.next=n.pending=h,Zm(n,h)):(h.next=s.next,n.pending=s.next=h)}}function Zm(e,n){var s=n.action,o=n.payload,u=e.state;if(n.isTransition){var h=H.T,S={};H.T=S;try{var R=s(u,o),X=H.S;X!==null&&X(S,R),Km(e,n,R)}catch(st){Ef(e,n,st)}finally{h!==null&&S.types!==null&&(h.types=S.types),H.T=h}}else try{h=s(u,o),Km(e,n,h)}catch(st){Ef(e,n,st)}}function Km(e,n,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){Jm(e,n,o)},function(o){return Ef(e,n,o)}):Jm(e,n,s)}function Jm(e,n,s){n.status="fulfilled",n.value=s,Qm(n),e.state=s,n=e.pending,n!==null&&(s=n.next,s===n?e.pending=null:(s=s.next,n.next=s,Zm(e,s)))}function Ef(e,n,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=s,Qm(n),n=n.next;while(n!==o)}e.action=null}function Qm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function $m(e,n){return n}function t0(e,n){if(Ee){var s=Qe.formState;if(s!==null){t:{var o=pe;if(Ee){if($e){e:{for(var u=$e,h=Ei;u.nodeType!==8;){if(!h){u=null;break e}if(u=Ai(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){$e=Ai(u.nextSibling),o=u.data==="F!";break t}}qa(o)}o=!1}o&&(n=s[0])}}return s=Wn(),s.memoizedState=s.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$m,lastRenderedState:n},s.queue=o,s=x0.bind(null,pe,o),o.dispatch=s,o=bf(!1),h=Nf.bind(null,pe,!1,o.queue),o=Wn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,s=Ay.bind(null,pe,u,h,s),u.dispatch=s,o.memoizedState=e,[n,s,!1]}function e0(e){var n=mn();return n0(n,qe,e)}function n0(e,n,s){if(n=Sf(e,n,$m)[0],e=jl(ma)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Do(n)}catch(S){throw S===vr?zl:S}else o=n;n=mn();var u=n.queue,h=u.dispatch;return s!==n.memoizedState&&(pe.flags|=2048,br(9,{destroy:void 0},wy.bind(null,u,s),null)),[o,h,e]}function wy(e,n){e.action=n}function i0(e){var n=mn(),s=qe;if(s!==null)return n0(n,s,e);mn(),n=n.memoizedState,s=mn();var o=s.queue.dispatch;return s.memoizedState=e,[n,o,!1]}function br(e,n,s,o){return e={tag:e,create:s,deps:o,inst:n,next:null},n=pe.updateQueue,n===null&&(n=Yl(),pe.updateQueue=n),s=n.lastEffect,s===null?n.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,n.lastEffect=e),e}function a0(){return mn().memoizedState}function Zl(e,n,s,o){var u=Wn();pe.flags|=e,u.memoizedState=br(1|n,{destroy:void 0},s,o===void 0?null:o)}function Kl(e,n,s,o){var u=mn();o=o===void 0?null:o;var h=u.memoizedState.inst;qe!==null&&o!==null&&mf(o,qe.memoizedState.deps)?u.memoizedState=br(n,h,s,o):(pe.flags|=e,u.memoizedState=br(1|n,h,s,o))}function s0(e,n){Zl(8390656,8,e,n)}function Tf(e,n){Kl(2048,8,e,n)}function Cy(e){pe.flags|=4;var n=pe.updateQueue;if(n===null)n=Yl(),pe.updateQueue=n,n.events=[e];else{var s=n.events;s===null?n.events=[e]:s.push(e)}}function r0(e){var n=mn().memoizedState;return Cy({ref:n,nextImpl:e}),function(){if((Pe&2)!==0)throw Error(a(440));return n.impl.apply(void 0,arguments)}}function o0(e,n){return Kl(4,2,e,n)}function l0(e,n){return Kl(4,4,e,n)}function c0(e,n){if(typeof n=="function"){e=e();var s=n(e);return function(){typeof s=="function"?s():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function u0(e,n,s){s=s!=null?s.concat([e]):null,Kl(4,4,c0.bind(null,n,e),s)}function Af(){}function f0(e,n){var s=mn();n=n===void 0?null:n;var o=s.memoizedState;return n!==null&&mf(n,o[1])?o[0]:(s.memoizedState=[e,n],e)}function h0(e,n){var s=mn();n=n===void 0?null:n;var o=s.memoizedState;if(n!==null&&mf(n,o[1]))return o[0];if(o=e(),Vs){Nt(!0);try{e()}finally{Nt(!1)}}return s.memoizedState=[o,n],o}function wf(e,n,s){return s===void 0||(pa&1073741824)!==0&&(Me&261930)===0?e.memoizedState=n:(e.memoizedState=s,e=dg(),pe.lanes|=e,ns|=e,s)}function d0(e,n,s,o){return ci(s,n)?s:yr.current!==null?(e=wf(e,s,o),ci(e,n)||(Sn=!0),e):(pa&42)===0||(pa&1073741824)!==0&&(Me&261930)===0?(Sn=!0,e.memoizedState=s):(e=dg(),pe.lanes|=e,ns|=e,n)}function p0(e,n,s,o,u){var h=k.p;k.p=h!==0&&8>h?h:8;var S=H.T,R={};H.T=R,Nf(e,!1,n,s);try{var X=u(),st=H.S;if(st!==null&&st(R,X),X!==null&&typeof X=="object"&&typeof X.then=="function"){var St=by(X,o);Uo(e,n,St,mi(e))}else Uo(e,n,o,mi(e))}catch(Tt){Uo(e,n,{then:function(){},status:"rejected",reason:Tt},mi())}finally{k.p=h,S!==null&&R.types!==null&&(S.types=R.types),H.T=S}}function Ry(){}function Cf(e,n,s,o){if(e.tag!==5)throw Error(a(476));var u=m0(e).queue;p0(e,u,n,it,s===null?Ry:function(){return g0(e),s(o)})}function m0(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:it,baseState:it,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:it},next:null};var s={};return n.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:s},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function g0(e){var n=m0(e);n.next===null&&(n=e.alternate.memoizedState),Uo(e,n.next.queue,{},mi())}function Rf(){return On(Zo)}function _0(){return mn().memoizedState}function v0(){return mn().memoizedState}function Ny(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var s=mi();e=Ka(s);var o=Ja(n,e,s);o!==null&&(ti(o,n,s),wo(o,n,s)),n={cache:af()},e.payload=n;return}n=n.return}}function Dy(e,n,s){var o=mi();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Jl(e)?y0(n,s):(s=Yu(e,n,s,o),s!==null&&(ti(s,e,o),S0(s,n,o)))}function x0(e,n,s){var o=mi();Uo(e,n,s,o)}function Uo(e,n,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Jl(e))y0(n,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=n.lastRenderedReducer,h!==null))try{var S=n.lastRenderedState,R=h(S,s);if(u.hasEagerState=!0,u.eagerState=R,ci(R,S))return Dl(e,n,u,0),Qe===null&&Nl(),!1}catch{}finally{}if(s=Yu(e,n,u,o),s!==null)return ti(s,e,o),S0(s,n,o),!0}return!1}function Nf(e,n,s,o){if(o={lane:2,revertLane:lh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Jl(e)){if(n)throw Error(a(479))}else n=Yu(e,s,o,2),n!==null&&ti(n,e,2)}function Jl(e){var n=e.alternate;return e===pe||n!==null&&n===pe}function y0(e,n){Sr=Xl=!0;var s=e.pending;s===null?n.next=n:(n.next=s.next,s.next=n),e.pending=n}function S0(e,n,s){if((s&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,s|=o,n.lanes=s,si(e,s)}}var Lo={readContext:On,use:ql,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useLayoutEffect:fn,useInsertionEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useSyncExternalStore:fn,useId:fn,useHostTransitionStatus:fn,useFormState:fn,useActionState:fn,useOptimistic:fn,useMemoCache:fn,useCacheRefresh:fn};Lo.useEffectEvent=fn;var M0={readContext:On,use:ql,useCallback:function(e,n){return Wn().memoizedState=[e,n===void 0?null:n],e},useContext:On,useEffect:s0,useImperativeHandle:function(e,n,s){s=s!=null?s.concat([e]):null,Zl(4194308,4,c0.bind(null,n,e),s)},useLayoutEffect:function(e,n){return Zl(4194308,4,e,n)},useInsertionEffect:function(e,n){Zl(4,2,e,n)},useMemo:function(e,n){var s=Wn();n=n===void 0?null:n;var o=e();if(Vs){Nt(!0);try{e()}finally{Nt(!1)}}return s.memoizedState=[o,n],o},useReducer:function(e,n,s){var o=Wn();if(s!==void 0){var u=s(n);if(Vs){Nt(!0);try{s(n)}finally{Nt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=Dy.bind(null,pe,e),[o.memoizedState,e]},useRef:function(e){var n=Wn();return e={current:e},n.memoizedState=e},useState:function(e){e=bf(e);var n=e.queue,s=x0.bind(null,pe,n);return n.dispatch=s,[e.memoizedState,s]},useDebugValue:Af,useDeferredValue:function(e,n){var s=Wn();return wf(s,e,n)},useTransition:function(){var e=bf(!1);return e=p0.bind(null,pe,e.queue,!0,!1),Wn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,s){var o=pe,u=Wn();if(Ee){if(s===void 0)throw Error(a(407));s=s()}else{if(s=n(),Qe===null)throw Error(a(349));(Me&127)!==0||km(o,n,s)}u.memoizedState=s;var h={value:s,getSnapshot:n};return u.queue=h,s0(Wm.bind(null,o,h,e),[e]),o.flags|=2048,br(9,{destroy:void 0},Xm.bind(null,o,h,s,n),null),s},useId:function(){var e=Wn(),n=Qe.identifierPrefix;if(Ee){var s=Yi,o=Wi;s=(o&~(1<<32-Gt(o)-1)).toString(32)+s,n="_"+n+"R_"+s,s=Wl++,0<s&&(n+="H"+s.toString(32)),n+="_"}else s=Ey++,n="_"+n+"r_"+s.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Rf,useFormState:t0,useActionState:t0,useOptimistic:function(e){var n=Wn();n.memoizedState=n.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=s,n=Nf.bind(null,pe,!0,s),s.dispatch=n,[e,n]},useMemoCache:yf,useCacheRefresh:function(){return Wn().memoizedState=Ny.bind(null,pe)},useEffectEvent:function(e){var n=Wn(),s={impl:e};return n.memoizedState=s,function(){if((Pe&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Df={readContext:On,use:ql,useCallback:f0,useContext:On,useEffect:Tf,useImperativeHandle:u0,useInsertionEffect:o0,useLayoutEffect:l0,useMemo:h0,useReducer:jl,useRef:a0,useState:function(){return jl(ma)},useDebugValue:Af,useDeferredValue:function(e,n){var s=mn();return d0(s,qe.memoizedState,e,n)},useTransition:function(){var e=jl(ma)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Do(e),n]},useSyncExternalStore:Vm,useId:_0,useHostTransitionStatus:Rf,useFormState:e0,useActionState:e0,useOptimistic:function(e,n){var s=mn();return jm(s,qe,e,n)},useMemoCache:yf,useCacheRefresh:v0};Df.useEffectEvent=r0;var b0={readContext:On,use:ql,useCallback:f0,useContext:On,useEffect:Tf,useImperativeHandle:u0,useInsertionEffect:o0,useLayoutEffect:l0,useMemo:h0,useReducer:Mf,useRef:a0,useState:function(){return Mf(ma)},useDebugValue:Af,useDeferredValue:function(e,n){var s=mn();return qe===null?wf(s,e,n):d0(s,qe.memoizedState,e,n)},useTransition:function(){var e=Mf(ma)[0],n=mn().memoizedState;return[typeof e=="boolean"?e:Do(e),n]},useSyncExternalStore:Vm,useId:_0,useHostTransitionStatus:Rf,useFormState:i0,useActionState:i0,useOptimistic:function(e,n){var s=mn();return qe!==null?jm(s,qe,e,n):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:yf,useCacheRefresh:v0};b0.useEffectEvent=r0;function Uf(e,n,s,o){n=e.memoizedState,s=s(o,n),s=s==null?n:_({},n,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Lf={enqueueSetState:function(e,n,s){e=e._reactInternals;var o=mi(),u=Ka(o);u.payload=n,s!=null&&(u.callback=s),n=Ja(e,u,o),n!==null&&(ti(n,e,o),wo(n,e,o))},enqueueReplaceState:function(e,n,s){e=e._reactInternals;var o=mi(),u=Ka(o);u.tag=1,u.payload=n,s!=null&&(u.callback=s),n=Ja(e,u,o),n!==null&&(ti(n,e,o),wo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var s=mi(),o=Ka(s);o.tag=2,n!=null&&(o.callback=n),n=Ja(e,o,s),n!==null&&(ti(n,e,s),wo(n,e,s))}};function E0(e,n,s,o,u,h,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,S):n.prototype&&n.prototype.isPureReactComponent?!xo(s,o)||!xo(u,h):!0}function T0(e,n,s,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(s,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(s,o),n.state!==e&&Lf.enqueueReplaceState(n,n.state,null)}function ks(e,n){var s=n;if("ref"in n){s={};for(var o in n)o!=="ref"&&(s[o]=n[o])}if(e=e.defaultProps){s===n&&(s=_({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function A0(e){Rl(e)}function w0(e){console.error(e)}function C0(e){Rl(e)}function Ql(e,n){try{var s=e.onUncaughtError;s(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function R0(e,n,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Of(e,n,s){return s=Ka(s),s.tag=3,s.payload={element:null},s.callback=function(){Ql(e,n)},s}function N0(e){return e=Ka(e),e.tag=3,e}function D0(e,n,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){R0(n,s,o)}}var S=s.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){R0(n,s,o),typeof u!="function"&&(is===null?is=new Set([this]):is.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function Uy(e,n,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=s.alternate,n!==null&&mr(n,s,u,!0),s=fi.current,s!==null){switch(s.tag){case 31:case 13:return Ti===null?uc():s.alternate===null&&hn===0&&(hn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Fl?s.flags|=16384:(n=s.updateQueue,n===null?s.updateQueue=new Set([o]):n.add(o),sh(e,o,u)),!1;case 22:return s.flags|=65536,o===Fl?s.flags|=16384:(n=s.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=n):(s=n.retryQueue,s===null?n.retryQueue=new Set([o]):s.add(o)),sh(e,o,u)),!1}throw Error(a(435,s.tag))}return sh(e,o,u),uc(),!1}if(Ee)return n=fi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Qu&&(e=Error(a(422),{cause:o}),Mo(Si(e,s)))):(o!==Qu&&(n=Error(a(423),{cause:o}),Mo(Si(n,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Si(o,s),u=Of(e.stateNode,o,u),uf(e,u),hn!==4&&(hn=2)),!1;var h=Error(a(520),{cause:o});if(h=Si(h,s),Go===null?Go=[h]:Go.push(h),hn!==4&&(hn=2),n===null)return!0;o=Si(o,s),s=n;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Of(s.stateNode,o,e),uf(s,e),!1;case 1:if(n=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(is===null||!is.has(h))))return s.flags|=65536,u&=-u,s.lanes|=u,u=N0(u),D0(u,e,s,o),uf(s,u),!1}s=s.return}while(s!==null);return!1}var Pf=Error(a(461)),Sn=!1;function Pn(e,n,s,o){n.child=e===null?Pm(n,null,s,o):Gs(n,e.child,s,o)}function U0(e,n,s,o,u){s=s.render;var h=n.ref;if("ref"in o){var S={};for(var R in o)R!=="ref"&&(S[R]=o[R])}else S=o;return Bs(n),o=gf(e,n,s,S,h,u),R=_f(),e!==null&&!Sn?(vf(e,n,u),ga(e,n,u)):(Ee&&R&&Ku(n),n.flags|=1,Pn(e,n,o,u),n.child)}function L0(e,n,s,o,u){if(e===null){var h=s.type;return typeof h=="function"&&!qu(h)&&h.defaultProps===void 0&&s.compare===null?(n.tag=15,n.type=h,O0(e,n,h,o,u)):(e=Ll(s.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(h=e.child,!kf(e,u)){var S=h.memoizedProps;if(s=s.compare,s=s!==null?s:xo,s(S,o)&&e.ref===n.ref)return ga(e,n,u)}return n.flags|=1,e=ua(h,o),e.ref=n.ref,e.return=n,n.child=e}function O0(e,n,s,o,u){if(e!==null){var h=e.memoizedProps;if(xo(h,o)&&e.ref===n.ref)if(Sn=!1,n.pendingProps=o=h,kf(e,u))(e.flags&131072)!==0&&(Sn=!0);else return n.lanes=e.lanes,ga(e,n,u)}return If(e,n,s,o,u)}function P0(e,n,s,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,n.child=null;return I0(e,n,h,s,o)}if((s&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Bl(n,h!==null?h.cachePool:null),h!==null?zm(n,h):hf(),Fm(n);else return o=n.lanes=536870912,I0(e,n,h!==null?h.baseLanes|s:s,s,o)}else h!==null?(Bl(n,h.cachePool),zm(n,h),$a(),n.memoizedState=null):(e!==null&&Bl(n,null),hf(),$a());return Pn(e,n,u,s),n.child}function Oo(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function I0(e,n,s,o,u){var h=rf();return h=h===null?null:{parent:xn._currentValue,pool:h},n.memoizedState={baseLanes:s,cachePool:h},e!==null&&Bl(n,null),hf(),Fm(n),e!==null&&mr(e,n,o,!0),n.childLanes=u,null}function $l(e,n){return n=ec({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function B0(e,n,s){return Gs(n,e.child,null,s),e=$l(n,n.pendingProps),e.flags|=2,hi(n),n.memoizedState=null,e}function Ly(e,n,s){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ee){if(o.mode==="hidden")return e=$l(n,o),n.lanes=536870912,Oo(null,e);if(pf(n),(e=$e)?(e=Zg(e,Ei),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Wa!==null?{id:Wi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=ym(e),s.return=n,n.child=s,Ln=n,$e=null)):e=null,e===null)throw qa(n);return n.lanes=536870912,null}return $l(n,o)}var h=e.memoizedState;if(h!==null){var S=h.dehydrated;if(pf(n),u)if(n.flags&256)n.flags&=-257,n=B0(e,n,s);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(a(558));else if(Sn||mr(e,n,s,!1),u=(s&e.childLanes)!==0,Sn||u){if(o=Qe,o!==null&&(S=ri(o,s),S!==0&&S!==h.retryLane))throw h.retryLane=S,Ls(e,S),ti(o,e,S),Pf;uc(),n=B0(e,n,s)}else e=h.treeContext,$e=Ai(S.nextSibling),Ln=n,Ee=!0,Ya=null,Ei=!1,e!==null&&bm(n,e),n=$l(n,o),n.flags|=4096;return n}return e=ua(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function tc(e,n){var s=n.ref;if(s===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(n.flags|=4194816)}}function If(e,n,s,o,u){return Bs(n),s=gf(e,n,s,o,void 0,u),o=_f(),e!==null&&!Sn?(vf(e,n,u),ga(e,n,u)):(Ee&&o&&Ku(n),n.flags|=1,Pn(e,n,s,u),n.child)}function z0(e,n,s,o,u,h){return Bs(n),n.updateQueue=null,s=Gm(n,o,s,u),Hm(e),o=_f(),e!==null&&!Sn?(vf(e,n,h),ga(e,n,h)):(Ee&&o&&Ku(n),n.flags|=1,Pn(e,n,s,h),n.child)}function F0(e,n,s,o,u){if(Bs(n),n.stateNode===null){var h=fr,S=s.contextType;typeof S=="object"&&S!==null&&(h=On(S)),h=new s(o,h),n.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Lf,n.stateNode=h,h._reactInternals=n,h=n.stateNode,h.props=o,h.state=n.memoizedState,h.refs={},lf(n),S=s.contextType,h.context=typeof S=="object"&&S!==null?On(S):fr,h.state=n.memoizedState,S=s.getDerivedStateFromProps,typeof S=="function"&&(Uf(n,s,S,o),h.state=n.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(S=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),S!==h.state&&Lf.enqueueReplaceState(h,h.state,null),Ro(n,o,h,u),Co(),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){h=n.stateNode;var R=n.memoizedProps,X=ks(s,R);h.props=X;var st=h.context,St=s.contextType;S=fr,typeof St=="object"&&St!==null&&(S=On(St));var Tt=s.getDerivedStateFromProps;St=typeof Tt=="function"||typeof h.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,St||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(R||st!==S)&&T0(n,h,o,S),Za=!1;var ht=n.memoizedState;h.state=ht,Ro(n,o,h,u),Co(),st=n.memoizedState,R||ht!==st||Za?(typeof Tt=="function"&&(Uf(n,s,Tt,o),st=n.memoizedState),(X=Za||E0(n,s,X,o,ht,st,S))?(St||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(n.flags|=4194308)):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=st),h.props=o,h.state=st,h.context=S,o=X):(typeof h.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{h=n.stateNode,cf(e,n),S=n.memoizedProps,St=ks(s,S),h.props=St,Tt=n.pendingProps,ht=h.context,st=s.contextType,X=fr,typeof st=="object"&&st!==null&&(X=On(st)),R=s.getDerivedStateFromProps,(st=typeof R=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(S!==Tt||ht!==X)&&T0(n,h,o,X),Za=!1,ht=n.memoizedState,h.state=ht,Ro(n,o,h,u),Co();var pt=n.memoizedState;S!==Tt||ht!==pt||Za||e!==null&&e.dependencies!==null&&Pl(e.dependencies)?(typeof R=="function"&&(Uf(n,s,R,o),pt=n.memoizedState),(St=Za||E0(n,s,St,o,ht,pt,X)||e!==null&&e.dependencies!==null&&Pl(e.dependencies))?(st||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,pt,X),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,pt,X)),typeof h.componentDidUpdate=="function"&&(n.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof h.componentDidUpdate!="function"||S===e.memoizedProps&&ht===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&ht===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=pt),h.props=o,h.state=pt,h.context=X,o=St):(typeof h.componentDidUpdate!="function"||S===e.memoizedProps&&ht===e.memoizedState||(n.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&ht===e.memoizedState||(n.flags|=1024),o=!1)}return h=o,tc(e,n),o=(n.flags&128)!==0,h||o?(h=n.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:h.render(),n.flags|=1,e!==null&&o?(n.child=Gs(n,e.child,null,u),n.child=Gs(n,null,s,u)):Pn(e,n,s,u),n.memoizedState=h.state,e=n.child):e=ga(e,n,u),e}function H0(e,n,s,o){return Ps(),n.flags|=256,Pn(e,n,s,o),n.child}var Bf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function zf(e){return{baseLanes:e,cachePool:Rm()}}function Ff(e,n,s){return e=e!==null?e.childLanes&~s:0,n&&(e|=pi),e}function G0(e,n,s){var o=n.pendingProps,u=!1,h=(n.flags&128)!==0,S;if((S=h)||(S=e!==null&&e.memoizedState===null?!1:(pn.current&2)!==0),S&&(u=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ee){if(u?Qa(n):$a(),(e=$e)?(e=Zg(e,Ei),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Wa!==null?{id:Wi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},s=ym(e),s.return=n,n.child=s,Ln=n,$e=null)):e=null,e===null)throw qa(n);return Sh(e)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?($a(),u=n.mode,R=ec({mode:"hidden",children:R},u),o=Os(o,u,s,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=zf(s),o.childLanes=Ff(e,S,s),n.memoizedState=Bf,Oo(null,o)):(Qa(n),Hf(n,R))}var X=e.memoizedState;if(X!==null&&(R=X.dehydrated,R!==null)){if(h)n.flags&256?(Qa(n),n.flags&=-257,n=Gf(e,n,s)):n.memoizedState!==null?($a(),n.child=e.child,n.flags|=128,n=null):($a(),R=o.fallback,u=n.mode,o=ec({mode:"visible",children:o.children},u),R=Os(R,u,s,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,Gs(n,e.child,null,s),o=n.child,o.memoizedState=zf(s),o.childLanes=Ff(e,S,s),n.memoizedState=Bf,n=Oo(null,o));else if(Qa(n),Sh(R)){if(S=R.nextSibling&&R.nextSibling.dataset,S)var st=S.dgst;S=st,o=Error(a(419)),o.stack="",o.digest=S,Mo({value:o,source:null,stack:null}),n=Gf(e,n,s)}else if(Sn||mr(e,n,s,!1),S=(s&e.childLanes)!==0,Sn||S){if(S=Qe,S!==null&&(o=ri(S,s),o!==0&&o!==X.retryLane))throw X.retryLane=o,Ls(e,o),ti(S,e,o),Pf;yh(R)||uc(),n=Gf(e,n,s)}else yh(R)?(n.flags|=192,n.child=e.child,n=null):(e=X.treeContext,$e=Ai(R.nextSibling),Ln=n,Ee=!0,Ya=null,Ei=!1,e!==null&&bm(n,e),n=Hf(n,o.children),n.flags|=4096);return n}return u?($a(),R=o.fallback,u=n.mode,X=e.child,st=X.sibling,o=ua(X,{mode:"hidden",children:o.children}),o.subtreeFlags=X.subtreeFlags&65011712,st!==null?R=ua(st,R):(R=Os(R,u,s,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Oo(null,o),o=n.child,R=e.child.memoizedState,R===null?R=zf(s):(u=R.cachePool,u!==null?(X=xn._currentValue,u=u.parent!==X?{parent:X,pool:X}:u):u=Rm(),R={baseLanes:R.baseLanes|s,cachePool:u}),o.memoizedState=R,o.childLanes=Ff(e,S,s),n.memoizedState=Bf,Oo(e.child,o)):(Qa(n),s=e.child,e=s.sibling,s=ua(s,{mode:"visible",children:o.children}),s.return=n,s.sibling=null,e!==null&&(S=n.deletions,S===null?(n.deletions=[e],n.flags|=16):S.push(e)),n.child=s,n.memoizedState=null,s)}function Hf(e,n){return n=ec({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function ec(e,n){return e=ui(22,e,null,n),e.lanes=0,e}function Gf(e,n,s){return Gs(n,e.child,null,s),e=Hf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function V0(e,n,s){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),ef(e.return,n,s)}function Vf(e,n,s,o,u,h){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:h}:(S.isBackwards=n,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=s,S.tailMode=u,S.treeForkCount=h)}function k0(e,n,s){var o=n.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var S=pn.current,R=(S&2)!==0;if(R?(S=S&1|2,n.flags|=128):S&=1,tt(pn,S),Pn(e,n,o,s),o=Ee?So:0,!R&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&V0(e,s,n);else if(e.tag===19)V0(e,s,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=n.child,u=null;s!==null;)e=s.alternate,e!==null&&kl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=n.child,n.child=null):(u=s.sibling,s.sibling=null),Vf(n,!1,u,s,h,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&kl(e)===null){n.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Vf(n,!0,s,null,h,o);break;case"together":Vf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ga(e,n,s){if(e!==null&&(n.dependencies=e.dependencies),ns|=n.lanes,(s&n.childLanes)===0)if(e!==null){if(mr(e,n,s,!1),(s&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(a(153));if(n.child!==null){for(e=n.child,s=ua(e,e.pendingProps),n.child=s,s.return=n;e.sibling!==null;)e=e.sibling,s=s.sibling=ua(e,e.pendingProps),s.return=n;s.sibling=null}return n.child}function kf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Pl(e)))}function Oy(e,n,s){switch(n.tag){case 3:dt(n,n.stateNode.containerInfo),ja(n,xn,e.memoizedState.cache),Ps();break;case 27:case 5:Ht(n);break;case 4:dt(n,n.stateNode.containerInfo);break;case 10:ja(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,pf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Qa(n),n.flags|=128,null):(s&n.child.childLanes)!==0?G0(e,n,s):(Qa(n),e=ga(e,n,s),e!==null?e.sibling:null);Qa(n);break;case 19:var u=(e.flags&128)!==0;if(o=(s&n.childLanes)!==0,o||(mr(e,n,s,!1),o=(s&n.childLanes)!==0),u){if(o)return k0(e,n,s);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),tt(pn,pn.current),o)break;return null;case 22:return n.lanes=0,P0(e,n,s,n.pendingProps);case 24:ja(n,xn,e.memoizedState.cache)}return ga(e,n,s)}function X0(e,n,s){if(e!==null)if(e.memoizedProps!==n.pendingProps)Sn=!0;else{if(!kf(e,s)&&(n.flags&128)===0)return Sn=!1,Oy(e,n,s);Sn=(e.flags&131072)!==0}else Sn=!1,Ee&&(n.flags&1048576)!==0&&Mm(n,So,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=Fs(n.elementType),n.type=e,typeof e=="function")qu(e)?(o=ks(e,o),n.tag=1,n=F0(null,n,e,o,s)):(n.tag=0,n=If(null,n,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===N){n.tag=11,n=U0(null,n,e,o,s);break t}else if(u===B){n.tag=14,n=L0(null,n,e,o,s);break t}}throw n=gt(e)||e,Error(a(306,n,""))}}return n;case 0:return If(e,n,n.type,n.pendingProps,s);case 1:return o=n.type,u=ks(o,n.pendingProps),F0(e,n,o,u,s);case 3:t:{if(dt(n,n.stateNode.containerInfo),e===null)throw Error(a(387));o=n.pendingProps;var h=n.memoizedState;u=h.element,cf(e,n),Ro(n,o,null,s);var S=n.memoizedState;if(o=S.cache,ja(n,xn,o),o!==h.cache&&nf(n,[xn],s,!0),Co(),o=S.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=h,n.memoizedState=h,n.flags&256){n=H0(e,n,o,s);break t}else if(o!==u){u=Si(Error(a(424)),n),Mo(u),n=H0(e,n,o,s);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for($e=Ai(e.firstChild),Ln=n,Ee=!0,Ya=null,Ei=!0,s=Pm(n,null,o,s),n.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Ps(),o===u){n=ga(e,n,s);break t}Pn(e,n,o,s)}n=n.child}return n;case 26:return tc(e,n),e===null?(s=e_(n.type,null,n.pendingProps,null))?n.memoizedState=s:Ee||(s=n.type,e=n.pendingProps,o=_c(J.current).createElement(s),o[_n]=n,o[Un]=e,In(o,s,e),vn(o),n.stateNode=o):n.memoizedState=e_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Ht(n),e===null&&Ee&&(o=n.stateNode=Qg(n.type,n.pendingProps,J.current),Ln=n,Ei=!0,u=$e,os(n.type)?(Mh=u,$e=Ai(o.firstChild)):$e=u),Pn(e,n,n.pendingProps.children,s),tc(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ee&&((u=o=$e)&&(o=uS(o,n.type,n.pendingProps,Ei),o!==null?(n.stateNode=o,Ln=n,$e=Ai(o.firstChild),Ei=!1,u=!0):u=!1),u||qa(n)),Ht(n),u=n.type,h=n.pendingProps,S=e!==null?e.memoizedProps:null,o=h.children,_h(u,h)?o=null:S!==null&&_h(u,S)&&(n.flags|=32),n.memoizedState!==null&&(u=gf(e,n,Ty,null,null,s),Zo._currentValue=u),tc(e,n),Pn(e,n,o,s),n.child;case 6:return e===null&&Ee&&((e=s=$e)&&(s=fS(s,n.pendingProps,Ei),s!==null?(n.stateNode=s,Ln=n,$e=null,e=!0):e=!1),e||qa(n)),null;case 13:return G0(e,n,s);case 4:return dt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=Gs(n,null,o,s):Pn(e,n,o,s),n.child;case 11:return U0(e,n,n.type,n.pendingProps,s);case 7:return Pn(e,n,n.pendingProps,s),n.child;case 8:return Pn(e,n,n.pendingProps.children,s),n.child;case 12:return Pn(e,n,n.pendingProps.children,s),n.child;case 10:return o=n.pendingProps,ja(n,n.type,o.value),Pn(e,n,o.children,s),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,Bs(n),u=On(u),o=o(u),n.flags|=1,Pn(e,n,o,s),n.child;case 14:return L0(e,n,n.type,n.pendingProps,s);case 15:return O0(e,n,n.type,n.pendingProps,s);case 19:return k0(e,n,s);case 31:return Ly(e,n,s);case 22:return P0(e,n,s,n.pendingProps);case 24:return Bs(n),o=On(xn),e===null?(u=rf(),u===null&&(u=Qe,h=af(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=s),u=h),n.memoizedState={parent:o,cache:u},lf(n),ja(n,xn,u)):((e.lanes&s)!==0&&(cf(e,n),Ro(n,null,null,s),Co()),u=e.memoizedState,h=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),ja(n,xn,o)):(o=h.cache,ja(n,xn,o),o!==u.cache&&nf(n,[xn],s,!0))),Pn(e,n,n.pendingProps.children,s),n.child;case 29:throw n.pendingProps}throw Error(a(156,n.tag))}function _a(e){e.flags|=4}function Xf(e,n,s,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(_g())e.flags|=8192;else throw Hs=Fl,of}else e.flags&=-16777217}function W0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!r_(n))if(_g())e.flags|=8192;else throw Hs=Fl,of}function nc(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?At():536870912,e.lanes|=n,wr|=n)}function Po(e,n){if(!Ee)switch(e.tailMode){case"hidden":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function tn(e){var n=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(n)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,n}function Py(e,n,s){var o=n.pendingProps;switch(Ju(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(n),null;case 1:return tn(n),null;case 3:return s=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),da(xn),wt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(pr(n)?_a(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,$u())),tn(n),null;case 26:var u=n.type,h=n.memoizedState;return e===null?(_a(n),h!==null?(tn(n),W0(n,h)):(tn(n),Xf(n,u,null,o,s))):h?h!==e.memoizedState?(_a(n),tn(n),W0(n,h)):(tn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&_a(n),tn(n),Xf(n,u,e,o,s)),null;case 27:if(Lt(n),s=J.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&_a(n);else{if(!o){if(n.stateNode===null)throw Error(a(166));return tn(n),null}e=mt.current,pr(n)?Em(n):(e=Qg(u,o,s),n.stateNode=e,_a(n))}return tn(n),null;case 5:if(Lt(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&_a(n);else{if(!o){if(n.stateNode===null)throw Error(a(166));return tn(n),null}if(h=mt.current,pr(n))Em(n);else{var S=_c(J.current);switch(h){case 1:h=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=S.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?S.createElement(u,{is:o.is}):S.createElement(u)}}h[_n]=n,h[Un]=o;t:for(S=n.child;S!==null;){if(S.tag===5||S.tag===6)h.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===n)break t;for(;S.sibling===null;){if(S.return===null||S.return===n)break t;S=S.return}S.sibling.return=S.return,S=S.sibling}n.stateNode=h;t:switch(In(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&_a(n)}}return tn(n),Xf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,s),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&_a(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(a(166));if(e=J.current,pr(n)){if(e=n.stateNode,s=n.memoizedProps,o=null,u=Ln,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[_n]=n,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Gg(e.nodeValue,s)),e||qa(n,!0)}else e=_c(e).createTextNode(o),e[_n]=n,n.stateNode=e}return tn(n),null;case 31:if(s=n.memoizedState,e===null||e.memoizedState!==null){if(o=pr(n),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[_n]=n}else Ps(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;tn(n),e=!1}else s=$u(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return n.flags&256?(hi(n),n):(hi(n),null);if((n.flags&128)!==0)throw Error(a(558))}return tn(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=pr(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[_n]=n}else Ps(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;tn(n),u=!1}else u=$u(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(hi(n),n):(hi(n),null)}return hi(n),(n.flags&128)!==0?(n.lanes=s,n):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),s!==e&&s&&(n.child.flags|=8192),nc(n,n.updateQueue),tn(n),null);case 4:return wt(),e===null&&hh(n.stateNode.containerInfo),tn(n),null;case 10:return da(n.type),tn(n),null;case 19:if(O(pn),o=n.memoizedState,o===null)return tn(n),null;if(u=(n.flags&128)!==0,h=o.rendering,h===null)if(u)Po(o,!1);else{if(hn!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(h=kl(e),h!==null){for(n.flags|=128,Po(o,!1),e=h.updateQueue,n.updateQueue=e,nc(n,e),n.subtreeFlags=0,e=s,s=n.child;s!==null;)xm(s,e),s=s.sibling;return tt(pn,pn.current&1|2),Ee&&fa(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&Oe()>oc&&(n.flags|=128,u=!0,Po(o,!1),n.lanes=4194304)}else{if(!u)if(e=kl(h),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,nc(n,e),Po(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ee)return tn(n),null}else 2*Oe()-o.renderingStartTime>oc&&s!==536870912&&(n.flags|=128,u=!0,Po(o,!1),n.lanes=4194304);o.isBackwards?(h.sibling=n.child,n.child=h):(e=o.last,e!==null?e.sibling=h:n.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Oe(),e.sibling=null,s=pn.current,tt(pn,u?s&1|2:s&1),Ee&&fa(n,o.treeForkCount),e):(tn(n),null);case 22:case 23:return hi(n),df(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(s&536870912)!==0&&(n.flags&128)===0&&(tn(n),n.subtreeFlags&6&&(n.flags|=8192)):tn(n),s=n.updateQueue,s!==null&&nc(n,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==s&&(n.flags|=2048),e!==null&&O(zs),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),n.memoizedState.cache!==s&&(n.flags|=2048),da(xn),tn(n),null;case 25:return null;case 30:return null}throw Error(a(156,n.tag))}function Iy(e,n){switch(Ju(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return da(xn),wt(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Lt(n),null;case 31:if(n.memoizedState!==null){if(hi(n),n.alternate===null)throw Error(a(340));Ps()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(hi(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(a(340));Ps()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return O(pn),null;case 4:return wt(),null;case 10:return da(n.type),null;case 22:case 23:return hi(n),df(),e!==null&&O(zs),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return da(xn),null;case 25:return null;default:return null}}function Y0(e,n){switch(Ju(n),n.tag){case 3:da(xn),wt();break;case 26:case 27:case 5:Lt(n);break;case 4:wt();break;case 31:n.memoizedState!==null&&hi(n);break;case 13:hi(n);break;case 19:O(pn);break;case 10:da(n.type);break;case 22:case 23:hi(n),df(),e!==null&&O(zs);break;case 24:da(xn)}}function Io(e,n){try{var s=n.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var h=s.create,S=s.inst;o=h(),S.destroy=o}s=s.next}while(s!==u)}}catch(R){ke(n,n.return,R)}}function ts(e,n,s){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var S=o.inst,R=S.destroy;if(R!==void 0){S.destroy=void 0,u=n;var X=s,st=R;try{st()}catch(St){ke(u,X,St)}}}o=o.next}while(o!==h)}}catch(St){ke(n,n.return,St)}}function q0(e){var n=e.updateQueue;if(n!==null){var s=e.stateNode;try{Bm(n,s)}catch(o){ke(e,e.return,o)}}}function j0(e,n,s){s.props=ks(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){ke(e,n,o)}}function Bo(e,n){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){ke(e,n,u)}}function qi(e,n){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){ke(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){ke(e,n,u)}else s.current=null}function Z0(e){var n=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){ke(e,e.return,u)}}function Wf(e,n,s){try{var o=e.stateNode;aS(o,e.type,s,n),o[Un]=n}catch(u){ke(e,e.return,u)}}function K0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&os(e.type)||e.tag===4}function Yf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||K0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&os(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qf(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,n):(n=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,n.appendChild(e),s=s._reactRootContainer,s!=null||n.onclick!==null||(n.onclick=la));else if(o!==4&&(o===27&&os(e.type)&&(s=e.stateNode,n=null),e=e.child,e!==null))for(qf(e,n,s),e=e.sibling;e!==null;)qf(e,n,s),e=e.sibling}function ic(e,n,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?s.insertBefore(e,n):s.appendChild(e);else if(o!==4&&(o===27&&os(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(ic(e,n,s),e=e.sibling;e!==null;)ic(e,n,s),e=e.sibling}function J0(e){var n=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);In(n,o,s),n[_n]=e,n[Un]=s}catch(h){ke(e,e.return,h)}}var va=!1,Mn=!1,jf=!1,Q0=typeof WeakSet=="function"?WeakSet:Set,Nn=null;function By(e,n){if(e=e.containerInfo,mh=Ec,e=um(e),Hu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var S=0,R=-1,X=-1,st=0,St=0,Tt=e,ht=null;e:for(;;){for(var pt;Tt!==s||u!==0&&Tt.nodeType!==3||(R=S+u),Tt!==h||o!==0&&Tt.nodeType!==3||(X=S+o),Tt.nodeType===3&&(S+=Tt.nodeValue.length),(pt=Tt.firstChild)!==null;)ht=Tt,Tt=pt;for(;;){if(Tt===e)break e;if(ht===s&&++st===u&&(R=S),ht===h&&++St===o&&(X=S),(pt=Tt.nextSibling)!==null)break;Tt=ht,ht=Tt.parentNode}Tt=pt}s=R===-1||X===-1?null:{start:R,end:X}}else s=null}s=s||{start:0,end:0}}else s=null;for(gh={focusedElem:e,selectionRange:s},Ec=!1,Nn=n;Nn!==null;)if(n=Nn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Nn=e;else for(;Nn!==null;){switch(n=Nn,h=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=n,u=h.memoizedProps,h=h.memoizedState,o=s.stateNode;try{var Zt=ks(s.type,u);e=o.getSnapshotBeforeUpdate(Zt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(se){ke(s,s.return,se)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,s=e.nodeType,s===9)xh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":xh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=n.sibling,e!==null){e.return=n.return,Nn=e;break}Nn=n.return}}function $0(e,n,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:ya(e,s),o&4&&Io(5,s);break;case 1:if(ya(e,s),o&4)if(e=s.stateNode,n===null)try{e.componentDidMount()}catch(S){ke(s,s.return,S)}else{var u=ks(s.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(S){ke(s,s.return,S)}}o&64&&q0(s),o&512&&Bo(s,s.return);break;case 3:if(ya(e,s),o&64&&(e=s.updateQueue,e!==null)){if(n=null,s.child!==null)switch(s.child.tag){case 27:case 5:n=s.child.stateNode;break;case 1:n=s.child.stateNode}try{Bm(e,n)}catch(S){ke(s,s.return,S)}}break;case 27:n===null&&o&4&&J0(s);case 26:case 5:ya(e,s),n===null&&o&4&&Z0(s),o&512&&Bo(s,s.return);break;case 12:ya(e,s);break;case 31:ya(e,s),o&4&&ng(e,s);break;case 13:ya(e,s),o&4&&ig(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=Yy.bind(null,s),hS(e,s))));break;case 22:if(o=s.memoizedState!==null||va,!o){n=n!==null&&n.memoizedState!==null||Mn,u=va;var h=Mn;va=o,(Mn=n)&&!h?Sa(e,s,(s.subtreeFlags&8772)!==0):ya(e,s),va=u,Mn=h}break;case 30:break;default:ya(e,s)}}function tg(e){var n=e.alternate;n!==null&&(e.alternate=null,tg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Ga(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ln=null,Kn=!1;function xa(e,n,s){for(s=s.child;s!==null;)eg(e,n,s),s=s.sibling}function eg(e,n,s){if(xt&&typeof xt.onCommitFiberUnmount=="function")try{xt.onCommitFiberUnmount(vt,s)}catch{}switch(s.tag){case 26:Mn||qi(s,n),xa(e,n,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:Mn||qi(s,n);var o=ln,u=Kn;os(s.type)&&(ln=s.stateNode,Kn=!1),xa(e,n,s),Yo(s.stateNode),ln=o,Kn=u;break;case 5:Mn||qi(s,n);case 6:if(o=ln,u=Kn,ln=null,xa(e,n,s),ln=o,Kn=u,ln!==null)if(Kn)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(s.stateNode)}catch(h){ke(s,n,h)}else try{ln.removeChild(s.stateNode)}catch(h){ke(s,n,h)}break;case 18:ln!==null&&(Kn?(e=ln,qg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),Pr(e)):qg(ln,s.stateNode));break;case 4:o=ln,u=Kn,ln=s.stateNode.containerInfo,Kn=!0,xa(e,n,s),ln=o,Kn=u;break;case 0:case 11:case 14:case 15:ts(2,s,n),Mn||ts(4,s,n),xa(e,n,s);break;case 1:Mn||(qi(s,n),o=s.stateNode,typeof o.componentWillUnmount=="function"&&j0(s,n,o)),xa(e,n,s);break;case 21:xa(e,n,s);break;case 22:Mn=(o=Mn)||s.memoizedState!==null,xa(e,n,s),Mn=o;break;default:xa(e,n,s)}}function ng(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Pr(e)}catch(s){ke(n,n.return,s)}}}function ig(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Pr(e)}catch(s){ke(n,n.return,s)}}function zy(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Q0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Q0),n;default:throw Error(a(435,e.tag))}}function ac(e,n){var s=zy(e);n.forEach(function(o){if(!s.has(o)){s.add(o);var u=qy.bind(null,e,o);o.then(u,u)}})}function Jn(e,n){var s=n.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],h=e,S=n,R=S;t:for(;R!==null;){switch(R.tag){case 27:if(os(R.type)){ln=R.stateNode,Kn=!1;break t}break;case 5:ln=R.stateNode,Kn=!1;break t;case 3:case 4:ln=R.stateNode.containerInfo,Kn=!0;break t}R=R.return}if(ln===null)throw Error(a(160));eg(h,S,u),ln=null,Kn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)ag(n,e),n=n.sibling}var Oi=null;function ag(e,n){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),Qn(e),o&4&&(ts(3,e,e.return),Io(3,e),ts(5,e,e.return));break;case 1:Jn(n,e),Qn(e),o&512&&(Mn||s===null||qi(s,s.return)),o&64&&va&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Oi;if(Jn(n,e),Qn(e),o&512&&(Mn||s===null||qi(s,s.return)),o&4){var h=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Ha]||h[_n]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),In(h,o,s),h[_n]=e,vn(h),o=h;break t;case"link":var S=a_("link","href",u).get(o+(s.href||""));if(S){for(var R=0;R<S.length;R++)if(h=S[R],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){S.splice(R,1);break e}}h=u.createElement(o),In(h,o,s),u.head.appendChild(h);break;case"meta":if(S=a_("meta","content",u).get(o+(s.content||""))){for(R=0;R<S.length;R++)if(h=S[R],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){S.splice(R,1);break e}}h=u.createElement(o),In(h,o,s),u.head.appendChild(h);break;default:throw Error(a(468,o))}h[_n]=e,vn(h),o=h}e.stateNode=o}else s_(u,e.type,e.stateNode);else e.stateNode=i_(u,o,e.memoizedProps);else h!==o?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,o===null?s_(u,e.type,e.stateNode):i_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Wf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Jn(n,e),Qn(e),o&512&&(Mn||s===null||qi(s,s.return)),s!==null&&o&4&&Wf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Jn(n,e),Qn(e),o&512&&(Mn||s===null||qi(s,s.return)),e.flags&32){u=e.stateNode;try{li(u,"")}catch(Zt){ke(e,e.return,Zt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Wf(e,u,s!==null?s.memoizedProps:u)),o&1024&&(jf=!0);break;case 6:if(Jn(n,e),Qn(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Zt){ke(e,e.return,Zt)}}break;case 3:if(yc=null,u=Oi,Oi=vc(n.containerInfo),Jn(n,e),Oi=u,Qn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{Pr(n.containerInfo)}catch(Zt){ke(e,e.return,Zt)}jf&&(jf=!1,sg(e));break;case 4:o=Oi,Oi=vc(e.stateNode.containerInfo),Jn(n,e),Qn(e),Oi=o;break;case 12:Jn(n,e),Qn(e);break;case 31:Jn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ac(e,o)));break;case 13:Jn(n,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(rc=Oe()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ac(e,o)));break;case 22:u=e.memoizedState!==null;var X=s!==null&&s.memoizedState!==null,st=va,St=Mn;if(va=st||u,Mn=St||X,Jn(n,e),Mn=St,va=st,Qn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(s===null||X||va||Mn||Xs(e)),s=null,n=e;;){if(n.tag===5||n.tag===26){if(s===null){X=s=n;try{if(h=X.stateNode,u)S=h.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{R=X.stateNode;var Tt=X.memoizedProps.style,ht=Tt!=null&&Tt.hasOwnProperty("display")?Tt.display:null;R.style.display=ht==null||typeof ht=="boolean"?"":(""+ht).trim()}}catch(Zt){ke(X,X.return,Zt)}}}else if(n.tag===6){if(s===null){X=n;try{X.stateNode.nodeValue=u?"":X.memoizedProps}catch(Zt){ke(X,X.return,Zt)}}}else if(n.tag===18){if(s===null){X=n;try{var pt=X.stateNode;u?jg(pt,!0):jg(X.stateNode,!1)}catch(Zt){ke(X,X.return,Zt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;s===n&&(s=null),n=n.return}s===n&&(s=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,ac(e,s))));break;case 19:Jn(n,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ac(e,o)));break;case 30:break;case 21:break;default:Jn(n,e),Qn(e)}}function Qn(e){var n=e.flags;if(n&2){try{for(var s,o=e.return;o!==null;){if(K0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,h=Yf(e);ic(e,h,u);break;case 5:var S=s.stateNode;s.flags&32&&(li(S,""),s.flags&=-33);var R=Yf(e);ic(e,R,S);break;case 3:case 4:var X=s.stateNode.containerInfo,st=Yf(e);qf(e,st,X);break;default:throw Error(a(161))}}catch(St){ke(e,e.return,St)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function sg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;sg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ya(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)$0(e,n.alternate,n),n=n.sibling}function Xs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:ts(4,n,n.return),Xs(n);break;case 1:qi(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&j0(n,n.return,s),Xs(n);break;case 27:Yo(n.stateNode);case 26:case 5:qi(n,n.return),Xs(n);break;case 22:n.memoizedState===null&&Xs(n);break;case 30:Xs(n);break;default:Xs(n)}e=e.sibling}}function Sa(e,n,s){for(s=s&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,h=n,S=h.flags;switch(h.tag){case 0:case 11:case 15:Sa(u,h,s),Io(4,h);break;case 1:if(Sa(u,h,s),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(st){ke(o,o.return,st)}if(o=h,u=o.updateQueue,u!==null){var R=o.stateNode;try{var X=u.shared.hiddenCallbacks;if(X!==null)for(u.shared.hiddenCallbacks=null,u=0;u<X.length;u++)Im(X[u],R)}catch(st){ke(o,o.return,st)}}s&&S&64&&q0(h),Bo(h,h.return);break;case 27:J0(h);case 26:case 5:Sa(u,h,s),s&&o===null&&S&4&&Z0(h),Bo(h,h.return);break;case 12:Sa(u,h,s);break;case 31:Sa(u,h,s),s&&S&4&&ng(u,h);break;case 13:Sa(u,h,s),s&&S&4&&ig(u,h);break;case 22:h.memoizedState===null&&Sa(u,h,s),Bo(h,h.return);break;case 30:break;default:Sa(u,h,s)}n=n.sibling}}function Zf(e,n){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&bo(s))}function Kf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&bo(e))}function Pi(e,n,s,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)rg(e,n,s,o),n=n.sibling}function rg(e,n,s,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Pi(e,n,s,o),u&2048&&Io(9,n);break;case 1:Pi(e,n,s,o);break;case 3:Pi(e,n,s,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&bo(e)));break;case 12:if(u&2048){Pi(e,n,s,o),e=n.stateNode;try{var h=n.memoizedProps,S=h.id,R=h.onPostCommit;typeof R=="function"&&R(S,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(X){ke(n,n.return,X)}}else Pi(e,n,s,o);break;case 31:Pi(e,n,s,o);break;case 13:Pi(e,n,s,o);break;case 23:break;case 22:h=n.stateNode,S=n.alternate,n.memoizedState!==null?h._visibility&2?Pi(e,n,s,o):zo(e,n):h._visibility&2?Pi(e,n,s,o):(h._visibility|=2,Er(e,n,s,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Zf(S,n);break;case 24:Pi(e,n,s,o),u&2048&&Kf(n.alternate,n);break;default:Pi(e,n,s,o)}}function Er(e,n,s,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var h=e,S=n,R=s,X=o,st=S.flags;switch(S.tag){case 0:case 11:case 15:Er(h,S,R,X,u),Io(8,S);break;case 23:break;case 22:var St=S.stateNode;S.memoizedState!==null?St._visibility&2?Er(h,S,R,X,u):zo(h,S):(St._visibility|=2,Er(h,S,R,X,u)),u&&st&2048&&Zf(S.alternate,S);break;case 24:Er(h,S,R,X,u),u&&st&2048&&Kf(S.alternate,S);break;default:Er(h,S,R,X,u)}n=n.sibling}}function zo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var s=e,o=n,u=o.flags;switch(o.tag){case 22:zo(s,o),u&2048&&Zf(o.alternate,o);break;case 24:zo(s,o),u&2048&&Kf(o.alternate,o);break;default:zo(s,o)}n=n.sibling}}var Fo=8192;function Tr(e,n,s){if(e.subtreeFlags&Fo)for(e=e.child;e!==null;)og(e,n,s),e=e.sibling}function og(e,n,s){switch(e.tag){case 26:Tr(e,n,s),e.flags&Fo&&e.memoizedState!==null&&ES(s,Oi,e.memoizedState,e.memoizedProps);break;case 5:Tr(e,n,s);break;case 3:case 4:var o=Oi;Oi=vc(e.stateNode.containerInfo),Tr(e,n,s),Oi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Fo,Fo=16777216,Tr(e,n,s),Fo=o):Tr(e,n,s));break;default:Tr(e,n,s)}}function lg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Ho(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];Nn=o,ug(o,e)}lg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)cg(e),e=e.sibling}function cg(e){switch(e.tag){case 0:case 11:case 15:Ho(e),e.flags&2048&&ts(9,e,e.return);break;case 3:Ho(e);break;case 12:Ho(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,sc(e)):Ho(e);break;default:Ho(e)}}function sc(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var s=0;s<n.length;s++){var o=n[s];Nn=o,ug(o,e)}lg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:ts(8,n,n.return),sc(n);break;case 22:s=n.stateNode,s._visibility&2&&(s._visibility&=-3,sc(n));break;default:sc(n)}e=e.sibling}}function ug(e,n){for(;Nn!==null;){var s=Nn;switch(s.tag){case 0:case 11:case 15:ts(8,s,n);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:bo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,Nn=o;else t:for(s=e;Nn!==null;){o=Nn;var u=o.sibling,h=o.return;if(tg(o),o===s){Nn=null;break t}if(u!==null){u.return=h,Nn=u;break t}Nn=h}}}var Fy={getCacheForType:function(e){var n=On(xn),s=n.data.get(e);return s===void 0&&(s=e(),n.data.set(e,s)),s},cacheSignal:function(){return On(xn).controller.signal}},Hy=typeof WeakMap=="function"?WeakMap:Map,Pe=0,Qe=null,ye=null,Me=0,Ve=0,di=null,es=!1,Ar=!1,Jf=!1,Ma=0,hn=0,ns=0,Ws=0,Qf=0,pi=0,wr=0,Go=null,$n=null,$f=!1,rc=0,fg=0,oc=1/0,lc=null,is=null,Tn=0,as=null,Cr=null,ba=0,th=0,eh=null,hg=null,Vo=0,nh=null;function mi(){return(Pe&2)!==0&&Me!==0?Me&-Me:H.T!==null?lh():uo()}function dg(){if(pi===0)if((Me&536870912)===0||Ee){var e=ue;ue<<=1,(ue&3932160)===0&&(ue=262144),pi=e}else pi=536870912;return e=fi.current,e!==null&&(e.flags|=32),pi}function ti(e,n,s){(e===Qe&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(Rr(e,0),ss(e,Me,pi,!1)),Wt(e,s),((Pe&2)===0||e!==Qe)&&(e===Qe&&((Pe&2)===0&&(Ws|=s),hn===4&&ss(e,Me,pi,!1)),ji(e))}function pg(e,n,s){if((Pe&6)!==0)throw Error(a(327));var o=!s&&(n&127)===0&&(n&e.expiredLanes)===0||Dt(e,n),u=o?ky(e,n):ah(e,n,!0),h=o;do{if(u===0){Ar&&!o&&ss(e,n,0,!1);break}else{if(s=e.current.alternate,h&&!Gy(s)){u=ah(e,n,!1),h=!1;continue}if(u===2){if(h=n,e.errorRecoveryDisabledLanes&h)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;t:{var R=e;u=Go;var X=R.current.memoizedState.isDehydrated;if(X&&(Rr(R,S).flags|=256),S=ah(R,S,!1),S!==2){if(Jf&&!X){R.errorRecoveryDisabledLanes|=h,Ws|=h,u=4;break t}h=$n,$n=u,h!==null&&($n===null?$n=h:$n.push.apply($n,h))}u=S}if(h=!1,u!==2)continue}}if(u===1){Rr(e,0),ss(e,n,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(a(345));case 4:if((n&4194048)!==n)break;case 6:ss(o,n,pi,!es);break t;case 2:$n=null;break;case 3:case 5:break;default:throw Error(a(329))}if((n&62914560)===n&&(u=rc+300-Oe(),10<u)){if(ss(o,n,pi,!es),Mt(o,0,!0)!==0)break t;ba=n,o.timeoutHandle=Wg(mg.bind(null,o,s,$n,lc,$f,n,pi,Ws,wr,es,h,"Throttled",-0,0),u);break t}mg(o,s,$n,lc,$f,n,pi,Ws,wr,es,h,null,-0,0)}}break}while(!0);ji(e)}function mg(e,n,s,o,u,h,S,R,X,st,St,Tt,ht,pt){if(e.timeoutHandle=-1,Tt=n.subtreeFlags,Tt&8192||(Tt&16785408)===16785408){Tt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:la},og(n,h,Tt);var Zt=(h&62914560)===h?rc-Oe():(h&4194048)===h?fg-Oe():0;if(Zt=TS(Tt,Zt),Zt!==null){ba=h,e.cancelPendingCommit=Zt(bg.bind(null,e,n,h,s,o,u,S,R,X,St,Tt,null,ht,pt)),ss(e,h,S,!st);return}}bg(e,n,h,s,o,u,S,R,X)}function Gy(e){for(var n=e;;){var s=n.tag;if((s===0||s===11||s===15)&&n.flags&16384&&(s=n.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],h=u.getSnapshot;u=u.value;try{if(!ci(h(),u))return!1}catch{return!1}}if(s=n.child,n.subtreeFlags&16384&&s!==null)s.return=n,n=s;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ss(e,n,s,o){n&=~Qf,n&=~Ws,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var h=31-Gt(u),S=1<<h;o[h]=-1,u&=~S}s!==0&&ze(e,s,n)}function cc(){return(Pe&6)===0?(ko(0),!1):!0}function ih(){if(ye!==null){if(Ve===0)var e=ye.return;else e=ye,ha=Is=null,xf(e),xr=null,To=0,e=ye;for(;e!==null;)Y0(e.alternate,e),e=e.return;ye=null}}function Rr(e,n){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,oS(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ba=0,ih(),Qe=e,ye=s=ua(e.current,null),Me=n,Ve=0,di=null,es=!1,Ar=Dt(e,n),Jf=!1,wr=pi=Qf=Ws=ns=hn=0,$n=Go=null,$f=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Gt(o),h=1<<u;n|=e[u],o&=~h}return Ma=n,Nl(),s}function gg(e,n){pe=null,H.H=Lo,n===vr||n===zl?(n=Um(),Ve=3):n===of?(n=Um(),Ve=4):Ve=n===Pf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,di=n,ye===null&&(hn=1,Ql(e,Si(n,e.current)))}function _g(){var e=fi.current;return e===null?!0:(Me&4194048)===Me?Ti===null:(Me&62914560)===Me||(Me&536870912)!==0?e===Ti:!1}function vg(){var e=H.H;return H.H=Lo,e===null?Lo:e}function xg(){var e=H.A;return H.A=Fy,e}function uc(){hn=4,es||(Me&4194048)!==Me&&fi.current!==null||(Ar=!0),(ns&134217727)===0&&(Ws&134217727)===0||Qe===null||ss(Qe,Me,pi,!1)}function ah(e,n,s){var o=Pe;Pe|=2;var u=vg(),h=xg();(Qe!==e||Me!==n)&&(lc=null,Rr(e,n)),n=!1;var S=hn;t:do try{if(Ve!==0&&ye!==null){var R=ye,X=di;switch(Ve){case 8:ih(),S=6;break t;case 3:case 2:case 9:case 6:fi.current===null&&(n=!0);var st=Ve;if(Ve=0,di=null,Nr(e,R,X,st),s&&Ar){S=0;break t}break;default:st=Ve,Ve=0,di=null,Nr(e,R,X,st)}}Vy(),S=hn;break}catch(St){gg(e,St)}while(!0);return n&&e.shellSuspendCounter++,ha=Is=null,Pe=o,H.H=u,H.A=h,ye===null&&(Qe=null,Me=0,Nl()),S}function Vy(){for(;ye!==null;)yg(ye)}function ky(e,n){var s=Pe;Pe|=2;var o=vg(),u=xg();Qe!==e||Me!==n?(lc=null,oc=Oe()+500,Rr(e,n)):Ar=Dt(e,n);t:do try{if(Ve!==0&&ye!==null){n=ye;var h=di;e:switch(Ve){case 1:Ve=0,di=null,Nr(e,n,h,1);break;case 2:case 9:if(Nm(h)){Ve=0,di=null,Sg(n);break}n=function(){Ve!==2&&Ve!==9||Qe!==e||(Ve=7),ji(e)},h.then(n,n);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:Nm(h)?(Ve=0,di=null,Sg(n)):(Ve=0,di=null,Nr(e,n,h,7));break;case 5:var S=null;switch(ye.tag){case 26:S=ye.memoizedState;case 5:case 27:var R=ye;if(S?r_(S):R.stateNode.complete){Ve=0,di=null;var X=R.sibling;if(X!==null)ye=X;else{var st=R.return;st!==null?(ye=st,fc(st)):ye=null}break e}}Ve=0,di=null,Nr(e,n,h,5);break;case 6:Ve=0,di=null,Nr(e,n,h,6);break;case 8:ih(),hn=6;break t;default:throw Error(a(462))}}Xy();break}catch(St){gg(e,St)}while(!0);return ha=Is=null,H.H=o,H.A=u,Pe=s,ye!==null?0:(Qe=null,Me=0,Nl(),hn)}function Xy(){for(;ye!==null&&!an();)yg(ye)}function yg(e){var n=X0(e.alternate,e,Ma);e.memoizedProps=e.pendingProps,n===null?fc(e):ye=n}function Sg(e){var n=e,s=n.alternate;switch(n.tag){case 15:case 0:n=z0(s,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=z0(s,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:xf(n);default:Y0(s,n),n=ye=xm(n,Ma),n=X0(s,n,Ma)}e.memoizedProps=e.pendingProps,n===null?fc(e):ye=n}function Nr(e,n,s,o){ha=Is=null,xf(n),xr=null,To=0;var u=n.return;try{if(Uy(e,u,n,s,Me)){hn=1,Ql(e,Si(s,e.current)),ye=null;return}}catch(h){if(u!==null)throw ye=u,h;hn=1,Ql(e,Si(s,e.current)),ye=null;return}n.flags&32768?(Ee||o===1?e=!0:Ar||(Me&536870912)!==0?e=!1:(es=e=!0,(o===2||o===9||o===3||o===6)&&(o=fi.current,o!==null&&o.tag===13&&(o.flags|=16384))),Mg(n,e)):fc(n)}function fc(e){var n=e;do{if((n.flags&32768)!==0){Mg(n,es);return}e=n.return;var s=Py(n.alternate,n,Ma);if(s!==null){ye=s;return}if(n=n.sibling,n!==null){ye=n;return}ye=n=e}while(n!==null);hn===0&&(hn=5)}function Mg(e,n){do{var s=Iy(e.alternate,e);if(s!==null){s.flags&=32767,ye=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!n&&(e=e.sibling,e!==null)){ye=e;return}ye=e=s}while(e!==null);hn=6,ye=null}function bg(e,n,s,o,u,h,S,R,X){e.cancelPendingCommit=null;do hc();while(Tn!==0);if((Pe&6)!==0)throw Error(a(327));if(n!==null){if(n===e.current)throw Error(a(177));if(h=n.lanes|n.childLanes,h|=Wu,sn(e,s,h,S,R,X),e===Qe&&(ye=Qe=null,Me=0),Cr=n,as=e,ba=s,th=h,eh=u,hg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,jy(nt,function(){return Cg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=H.T,H.T=null,u=k.p,k.p=2,S=Pe,Pe|=4;try{By(e,n,s)}finally{Pe=S,k.p=u,H.T=o}}Tn=1,Eg(),Tg(),Ag()}}function Eg(){if(Tn===1){Tn=0;var e=as,n=Cr,s=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||s){s=H.T,H.T=null;var o=k.p;k.p=2;var u=Pe;Pe|=4;try{ag(n,e);var h=gh,S=um(e.containerInfo),R=h.focusedElem,X=h.selectionRange;if(S!==R&&R&&R.ownerDocument&&cm(R.ownerDocument.documentElement,R)){if(X!==null&&Hu(R)){var st=X.start,St=X.end;if(St===void 0&&(St=st),"selectionStart"in R)R.selectionStart=st,R.selectionEnd=Math.min(St,R.value.length);else{var Tt=R.ownerDocument||document,ht=Tt&&Tt.defaultView||window;if(ht.getSelection){var pt=ht.getSelection(),Zt=R.textContent.length,se=Math.min(X.start,Zt),Ze=X.end===void 0?se:Math.min(X.end,Zt);!pt.extend&&se>Ze&&(S=Ze,Ze=se,se=S);var et=lm(R,se),j=lm(R,Ze);if(et&&j&&(pt.rangeCount!==1||pt.anchorNode!==et.node||pt.anchorOffset!==et.offset||pt.focusNode!==j.node||pt.focusOffset!==j.offset)){var at=Tt.createRange();at.setStart(et.node,et.offset),pt.removeAllRanges(),se>Ze?(pt.addRange(at),pt.extend(j.node,j.offset)):(at.setEnd(j.node,j.offset),pt.addRange(at))}}}}for(Tt=[],pt=R;pt=pt.parentNode;)pt.nodeType===1&&Tt.push({element:pt,left:pt.scrollLeft,top:pt.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<Tt.length;R++){var Et=Tt[R];Et.element.scrollLeft=Et.left,Et.element.scrollTop=Et.top}}Ec=!!mh,gh=mh=null}finally{Pe=u,k.p=o,H.T=s}}e.current=n,Tn=2}}function Tg(){if(Tn===2){Tn=0;var e=as,n=Cr,s=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||s){s=H.T,H.T=null;var o=k.p;k.p=2;var u=Pe;Pe|=4;try{$0(e,n.alternate,n)}finally{Pe=u,k.p=o,H.T=s}}Tn=3}}function Ag(){if(Tn===4||Tn===3){Tn=0,Q();var e=as,n=Cr,s=ba,o=hg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Tn=5:(Tn=0,Cr=as=null,wg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(is=null),co(s),n=n.stateNode,xt&&typeof xt.onCommitFiberRoot=="function")try{xt.onCommitFiberRoot(vt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=H.T,u=k.p,k.p=2,H.T=null;try{for(var h=e.onRecoverableError,S=0;S<o.length;S++){var R=o[S];h(R.value,{componentStack:R.stack})}}finally{H.T=n,k.p=u}}(ba&3)!==0&&hc(),ji(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===nh?Vo++:(Vo=0,nh=e):Vo=0,ko(0)}}function wg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,bo(n)))}function hc(){return Eg(),Tg(),Ag(),Cg()}function Cg(){if(Tn!==5)return!1;var e=as,n=th;th=0;var s=co(ba),o=H.T,u=k.p;try{k.p=32>s?32:s,H.T=null,s=eh,eh=null;var h=as,S=ba;if(Tn=0,Cr=as=null,ba=0,(Pe&6)!==0)throw Error(a(331));var R=Pe;if(Pe|=4,cg(h.current),rg(h,h.current,S,s),Pe=R,ko(0,!1),xt&&typeof xt.onPostCommitFiberRoot=="function")try{xt.onPostCommitFiberRoot(vt,h)}catch{}return!0}finally{k.p=u,H.T=o,wg(e,n)}}function Rg(e,n,s){n=Si(s,n),n=Of(e.stateNode,n,2),e=Ja(e,n,2),e!==null&&(Wt(e,2),ji(e))}function ke(e,n,s){if(e.tag===3)Rg(e,e,s);else for(;n!==null;){if(n.tag===3){Rg(n,e,s);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(is===null||!is.has(o))){e=Si(s,e),s=N0(2),o=Ja(n,s,2),o!==null&&(D0(s,o,n,e),Wt(o,2),ji(o));break}}n=n.return}}function sh(e,n,s){var o=e.pingCache;if(o===null){o=e.pingCache=new Hy;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(s)||(Jf=!0,u.add(s),e=Wy.bind(null,e,n,s),n.then(e,e))}function Wy(e,n,s){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Qe===e&&(Me&s)===s&&(hn===4||hn===3&&(Me&62914560)===Me&&300>Oe()-rc?(Pe&2)===0&&Rr(e,0):Qf|=s,wr===Me&&(wr=0)),ji(e)}function Ng(e,n){n===0&&(n=At()),e=Ls(e,n),e!==null&&(Wt(e,n),ji(e))}function Yy(e){var n=e.memoizedState,s=0;n!==null&&(s=n.retryLane),Ng(e,s)}function qy(e,n){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(n),Ng(e,s)}function jy(e,n){return Ne(e,n)}var dc=null,Dr=null,rh=!1,pc=!1,oh=!1,rs=0;function ji(e){e!==Dr&&e.next===null&&(Dr===null?dc=Dr=e:Dr=Dr.next=e),pc=!0,rh||(rh=!0,Ky())}function ko(e,n){if(!oh&&pc){oh=!0;do for(var s=!1,o=dc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var S=o.suspendedLanes,R=o.pingedLanes;h=(1<<31-Gt(42|e)+1)-1,h&=u&~(S&~R),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,Og(o,h))}else h=Me,h=Mt(o,o===Qe?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Dt(o,h)||(s=!0,Og(o,h));o=o.next}while(s);oh=!1}}function Zy(){Dg()}function Dg(){pc=rh=!1;var e=0;rs!==0&&rS()&&(e=rs);for(var n=Oe(),s=null,o=dc;o!==null;){var u=o.next,h=Ug(o,n);h===0?(o.next=null,s===null?dc=u:s.next=u,u===null&&(Dr=s)):(s=o,(e!==0||(h&3)!==0)&&(pc=!0)),o=u}Tn!==0&&Tn!==5||ko(e),rs!==0&&(rs=0)}function Ug(e,n){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var S=31-Gt(h),R=1<<S,X=u[S];X===-1?((R&s)===0||(R&o)!==0)&&(u[S]=Ft(R,n)):X<=n&&(e.expiredLanes|=R),h&=~R}if(n=Qe,s=Me,s=Mt(e,e===n?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===n&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Ye(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||Dt(e,s)){if(n=s&-s,n===e.callbackPriority)return n;switch(o!==null&&Ye(o),co(s)){case 2:case 8:s=T;break;case 32:s=nt;break;case 268435456:s=_t;break;default:s=nt}return o=Lg.bind(null,e),s=Ne(s,o),e.callbackPriority=n,e.callbackNode=s,n}return o!==null&&o!==null&&Ye(o),e.callbackPriority=2,e.callbackNode=null,2}function Lg(e,n){if(Tn!==0&&Tn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(hc()&&e.callbackNode!==s)return null;var o=Me;return o=Mt(e,e===Qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(pg(e,o,n),Ug(e,Oe()),e.callbackNode!=null&&e.callbackNode===s?Lg.bind(null,e):null)}function Og(e,n){if(hc())return null;pg(e,n,!0)}function Ky(){lS(function(){(Pe&6)!==0?Ne(I,Zy):Dg()})}function lh(){if(rs===0){var e=gr;e===0&&(e=ee,ee<<=1,(ee&261888)===0&&(ee=256)),rs=e}return rs}function Pg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Rs(""+e)}function Ig(e,n){var s=n.ownerDocument.createElement("input");return s.name=n.name,s.value=n.value,e.id&&s.setAttribute("form",e.id),n.parentNode.insertBefore(s,n),e=new FormData(e),s.parentNode.removeChild(s),e}function Jy(e,n,s,o,u){if(n==="submit"&&s&&s.stateNode===u){var h=Pg((u[Un]||null).action),S=o.submitter;S&&(n=(n=S[Un]||null)?Pg(n.formAction):S.getAttribute("formAction"),n!==null&&(h=n,S=null));var R=new Al("action","action",null,o,u);e.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(rs!==0){var X=S?Ig(u,S):new FormData(u);Cf(s,{pending:!0,data:X,method:u.method,action:h},null,X)}}else typeof h=="function"&&(R.preventDefault(),X=S?Ig(u,S):new FormData(u),Cf(s,{pending:!0,data:X,method:u.method,action:h},h,X))},currentTarget:u}]})}}for(var ch=0;ch<Xu.length;ch++){var uh=Xu[ch],Qy=uh.toLowerCase(),$y=uh[0].toUpperCase()+uh.slice(1);Li(Qy,"on"+$y)}Li(dm,"onAnimationEnd"),Li(pm,"onAnimationIteration"),Li(mm,"onAnimationStart"),Li("dblclick","onDoubleClick"),Li("focusin","onFocus"),Li("focusout","onBlur"),Li(my,"onTransitionRun"),Li(gy,"onTransitionStart"),Li(_y,"onTransitionCancel"),Li(gm,"onTransitionEnd"),ft("onMouseEnter",["mouseout","mouseover"]),ft("onMouseLeave",["mouseout","mouseover"]),ft("onPointerEnter",["pointerout","pointerover"]),ft("onPointerLeave",["pointerout","pointerover"]),$("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),$("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),$("onBeforeInput",["compositionend","keypress","textInput","paste"]),$("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),$("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xo));function Bg(e,n){n=(n&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var h=void 0;if(n)for(var S=o.length-1;0<=S;S--){var R=o[S],X=R.instance,st=R.currentTarget;if(R=R.listener,X!==h&&u.isPropagationStopped())break t;h=R,u.currentTarget=st;try{h(u)}catch(St){Rl(St)}u.currentTarget=null,h=X}else for(S=0;S<o.length;S++){if(R=o[S],X=R.instance,st=R.currentTarget,R=R.listener,X!==h&&u.isPropagationStopped())break t;h=R,u.currentTarget=st;try{h(u)}catch(St){Rl(St)}u.currentTarget=null,h=X}}}}function Se(e,n){var s=n[As];s===void 0&&(s=n[As]=new Set);var o=e+"__bubble";s.has(o)||(zg(n,e,2,!1),s.add(o))}function fh(e,n,s){var o=0;n&&(o|=4),zg(s,e,o,n)}var mc="_reactListening"+Math.random().toString(36).slice(2);function hh(e){if(!e[mc]){e[mc]=!0,Ml.forEach(function(s){s!=="selectionchange"&&(tS.has(s)||fh(s,!1,e),fh(s,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[mc]||(n[mc]=!0,fh("selectionchange",!1,n))}}function zg(e,n,s,o){switch(d_(n)){case 2:var u=CS;break;case 8:u=RS;break;default:u=wh}s=u.bind(null,n,s,e),u=void 0,!Du||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,s,{capture:!0,passive:u}):e.addEventListener(n,s,!0):u!==void 0?e.addEventListener(n,s,{passive:u}):e.addEventListener(n,s,!1)}function dh(e,n,s,o,u){var h=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var R=o.stateNode.containerInfo;if(R===u)break;if(S===4)for(S=o.return;S!==null;){var X=S.tag;if((X===3||X===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;R!==null;){if(S=ra(R),S===null)return;if(X=S.tag,X===5||X===6||X===26||X===27){o=h=S;continue t}R=R.parentNode}}o=o.return}kp(function(){var st=h,St=Ru(s),Tt=[];t:{var ht=_m.get(e);if(ht!==void 0){var pt=Al,Zt=e;switch(e){case"keypress":if(El(s)===0)break t;case"keydown":case"keyup":pt=qx;break;case"focusin":Zt="focus",pt=Pu;break;case"focusout":Zt="blur",pt=Pu;break;case"beforeblur":case"afterblur":pt=Pu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":pt=Yp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":pt=Px;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":pt=Kx;break;case dm:case pm:case mm:pt=zx;break;case gm:pt=Qx;break;case"scroll":case"scrollend":pt=Lx;break;case"wheel":pt=ty;break;case"copy":case"cut":case"paste":pt=Hx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":pt=jp;break;case"toggle":case"beforetoggle":pt=ny}var se=(n&4)!==0,Ze=!se&&(e==="scroll"||e==="scrollend"),et=se?ht!==null?ht+"Capture":null:ht;se=[];for(var j=st,at;j!==null;){var Et=j;if(at=Et.stateNode,Et=Et.tag,Et!==5&&Et!==26&&Et!==27||at===null||et===null||(Et=fo(j,et),Et!=null&&se.push(Wo(j,Et,at))),Ze)break;j=j.return}0<se.length&&(ht=new pt(ht,Zt,null,s,St),Tt.push({event:ht,listeners:se}))}}if((n&7)===0){t:{if(ht=e==="mouseover"||e==="pointerover",pt=e==="mouseout"||e==="pointerout",ht&&s!==Cu&&(Zt=s.relatedTarget||s.fromElement)&&(ra(Zt)||Zt[jn]))break t;if((pt||ht)&&(ht=St.window===St?St:(ht=St.ownerDocument)?ht.defaultView||ht.parentWindow:window,pt?(Zt=s.relatedTarget||s.toElement,pt=st,Zt=Zt?ra(Zt):null,Zt!==null&&(Ze=c(Zt),se=Zt.tag,Zt!==Ze||se!==5&&se!==27&&se!==6)&&(Zt=null)):(pt=null,Zt=st),pt!==Zt)){if(se=Yp,Et="onMouseLeave",et="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(se=jp,Et="onPointerLeave",et="onPointerEnter",j="pointer"),Ze=pt==null?ht:Cs(pt),at=Zt==null?ht:Cs(Zt),ht=new se(Et,j+"leave",pt,s,St),ht.target=Ze,ht.relatedTarget=at,Et=null,ra(St)===st&&(se=new se(et,j+"enter",Zt,s,St),se.target=at,se.relatedTarget=Ze,Et=se),Ze=Et,pt&&Zt)e:{for(se=eS,et=pt,j=Zt,at=0,Et=et;Et;Et=se(Et))at++;Et=0;for(var ie=j;ie;ie=se(ie))Et++;for(;0<at-Et;)et=se(et),at--;for(;0<Et-at;)j=se(j),Et--;for(;at--;){if(et===j||j!==null&&et===j.alternate){se=et;break e}et=se(et),j=se(j)}se=null}else se=null;pt!==null&&Fg(Tt,ht,pt,se,!1),Zt!==null&&Ze!==null&&Fg(Tt,Ze,Zt,se,!0)}}t:{if(ht=st?Cs(st):window,pt=ht.nodeName&&ht.nodeName.toLowerCase(),pt==="select"||pt==="input"&&ht.type==="file")var Ue=nm;else if(tm(ht))if(im)Ue=hy;else{Ue=uy;var Jt=cy}else pt=ht.nodeName,!pt||pt.toLowerCase()!=="input"||ht.type!=="checkbox"&&ht.type!=="radio"?st&&Be(st.elementType)&&(Ue=nm):Ue=fy;if(Ue&&(Ue=Ue(e,st))){em(Tt,Ue,s,St);break t}Jt&&Jt(e,ht,st),e==="focusout"&&st&&ht.type==="number"&&st.memoizedProps.value!=null&&xe(ht,"number",ht.value)}switch(Jt=st?Cs(st):window,e){case"focusin":(tm(Jt)||Jt.contentEditable==="true")&&(lr=Jt,Gu=st,yo=null);break;case"focusout":yo=Gu=lr=null;break;case"mousedown":Vu=!0;break;case"contextmenu":case"mouseup":case"dragend":Vu=!1,fm(Tt,s,St);break;case"selectionchange":if(py)break;case"keydown":case"keyup":fm(Tt,s,St)}var me;if(Bu)t:{switch(e){case"compositionstart":var be="onCompositionStart";break t;case"compositionend":be="onCompositionEnd";break t;case"compositionupdate":be="onCompositionUpdate";break t}be=void 0}else or?Qp(e,s)&&(be="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(be="onCompositionStart");be&&(Zp&&s.locale!=="ko"&&(or||be!=="onCompositionStart"?be==="onCompositionEnd"&&or&&(me=Xp()):(Xa=St,Uu="value"in Xa?Xa.value:Xa.textContent,or=!0)),Jt=gc(st,be),0<Jt.length&&(be=new qp(be,e,null,s,St),Tt.push({event:be,listeners:Jt}),me?be.data=me:(me=$p(s),me!==null&&(be.data=me)))),(me=ay?sy(e,s):ry(e,s))&&(be=gc(st,"onBeforeInput"),0<be.length&&(Jt=new qp("onBeforeInput","beforeinput",null,s,St),Tt.push({event:Jt,listeners:be}),Jt.data=me)),Jy(Tt,e,st,s,St)}Bg(Tt,n)})}function Wo(e,n,s){return{instance:e,listener:n,currentTarget:s}}function gc(e,n){for(var s=n+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=fo(e,s),u!=null&&o.unshift(Wo(e,u,h)),u=fo(e,n),u!=null&&o.push(Wo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function eS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Fg(e,n,s,o,u){for(var h=n._reactName,S=[];s!==null&&s!==o;){var R=s,X=R.alternate,st=R.stateNode;if(R=R.tag,X!==null&&X===o)break;R!==5&&R!==26&&R!==27||st===null||(X=st,u?(st=fo(s,h),st!=null&&S.unshift(Wo(s,st,X))):u||(st=fo(s,h),st!=null&&S.push(Wo(s,st,X)))),s=s.return}S.length!==0&&e.push({event:n,listeners:S})}var nS=/\r\n?/g,iS=/\u0000|\uFFFD/g;function Hg(e){return(typeof e=="string"?e:""+e).replace(nS,`
`).replace(iS,"")}function Gg(e,n){return n=Hg(n),Hg(e)===n}function je(e,n,s,o,u,h){switch(s){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||li(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&li(e,""+o);break;case"className":jt(e,"class",o);break;case"tabIndex":jt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":jt(e,s,o);break;case"style":Ui(e,o,h);break;case"data":if(n!=="object"){jt(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Rs(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(n!=="input"&&je(e,n,"name",u.name,u,null),je(e,n,"formEncType",u.formEncType,u,null),je(e,n,"formMethod",u.formMethod,u,null),je(e,n,"formTarget",u.formTarget,u,null)):(je(e,n,"encType",u.encType,u,null),je(e,n,"method",u.method,u,null),je(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=Rs(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=la);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=Rs(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":Se("beforetoggle",e),Se("toggle",e),Pt(e,"popover",o);break;case"xlinkActuate":Yt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Yt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Yt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Yt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Yt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Yt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Yt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Pt(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=Xi.get(s)||s,Pt(e,s,o))}}function ph(e,n,s,o,u,h){switch(s){case"style":Ui(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?li(e,o):(typeof o=="number"||typeof o=="bigint")&&li(e,""+o);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"onClick":o!=null&&(e.onclick=la);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!C.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),n=s.slice(2,u?s.length-7:void 0),h=e[Un]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(n,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(n,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):Pt(e,s,o)}}}function In(e,n,s){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var o=!1,u=!1,h;for(h in s)if(s.hasOwnProperty(h)){var S=s[h];if(S!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,n));default:je(e,n,h,S,s,null)}}u&&je(e,n,"srcSet",s.srcSet,s,null),o&&je(e,n,"src",s.src,s,null);return;case"input":Se("invalid",e);var R=h=S=u=null,X=null,st=null;for(o in s)if(s.hasOwnProperty(o)){var St=s[o];if(St!=null)switch(o){case"name":u=St;break;case"type":S=St;break;case"checked":X=St;break;case"defaultChecked":st=St;break;case"value":h=St;break;case"defaultValue":R=St;break;case"children":case"dangerouslySetInnerHTML":if(St!=null)throw Error(a(137,n));break;default:je(e,n,o,St,s,null)}}zn(e,h,R,X,st,S,u,!1);return;case"select":Se("invalid",e),o=S=h=null;for(u in s)if(s.hasOwnProperty(u)&&(R=s[u],R!=null))switch(u){case"value":h=R;break;case"defaultValue":S=R;break;case"multiple":o=R;default:je(e,n,u,R,s,null)}n=h,s=S,e.multiple=!!o,n!=null?En(e,!!o,n,!1):s!=null&&En(e,!!o,s,!0);return;case"textarea":Se("invalid",e),h=u=o=null;for(S in s)if(s.hasOwnProperty(S)&&(R=s[S],R!=null))switch(S){case"value":o=R;break;case"defaultValue":u=R;break;case"children":h=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(a(91));break;default:je(e,n,S,R,s,null)}Di(e,o,u,h);return;case"option":for(X in s)if(s.hasOwnProperty(X)&&(o=s[X],o!=null))switch(X){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:je(e,n,X,o,s,null)}return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(o=0;o<Xo.length;o++)Se(Xo[o],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(st in s)if(s.hasOwnProperty(st)&&(o=s[st],o!=null))switch(st){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,n));default:je(e,n,st,o,s,null)}return;default:if(Be(n)){for(St in s)s.hasOwnProperty(St)&&(o=s[St],o!==void 0&&ph(e,n,St,o,s,void 0));return}}for(R in s)s.hasOwnProperty(R)&&(o=s[R],o!=null&&je(e,n,R,o,s,null))}function aS(e,n,s,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,S=null,R=null,X=null,st=null,St=null;for(pt in s){var Tt=s[pt];if(s.hasOwnProperty(pt)&&Tt!=null)switch(pt){case"checked":break;case"value":break;case"defaultValue":X=Tt;default:o.hasOwnProperty(pt)||je(e,n,pt,null,o,Tt)}}for(var ht in o){var pt=o[ht];if(Tt=s[ht],o.hasOwnProperty(ht)&&(pt!=null||Tt!=null))switch(ht){case"type":h=pt;break;case"name":u=pt;break;case"checked":st=pt;break;case"defaultChecked":St=pt;break;case"value":S=pt;break;case"defaultValue":R=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(a(137,n));break;default:pt!==Tt&&je(e,n,ht,pt,o,Tt)}}Vt(e,S,R,X,st,St,h,u);return;case"select":pt=S=R=ht=null;for(h in s)if(X=s[h],s.hasOwnProperty(h)&&X!=null)switch(h){case"value":break;case"multiple":pt=X;default:o.hasOwnProperty(h)||je(e,n,h,null,o,X)}for(u in o)if(h=o[u],X=s[u],o.hasOwnProperty(u)&&(h!=null||X!=null))switch(u){case"value":ht=h;break;case"defaultValue":R=h;break;case"multiple":S=h;default:h!==X&&je(e,n,u,h,o,X)}n=R,s=S,o=pt,ht!=null?En(e,!!s,ht,!1):!!o!=!!s&&(n!=null?En(e,!!s,n,!0):En(e,!!s,s?[]:"",!1));return;case"textarea":pt=ht=null;for(R in s)if(u=s[R],s.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:je(e,n,R,null,o,u)}for(S in o)if(u=o[S],h=s[S],o.hasOwnProperty(S)&&(u!=null||h!=null))switch(S){case"value":ht=u;break;case"defaultValue":pt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==h&&je(e,n,S,u,o,h)}oi(e,ht,pt);return;case"option":for(var Zt in s)if(ht=s[Zt],s.hasOwnProperty(Zt)&&ht!=null&&!o.hasOwnProperty(Zt))switch(Zt){case"selected":e.selected=!1;break;default:je(e,n,Zt,null,o,ht)}for(X in o)if(ht=o[X],pt=s[X],o.hasOwnProperty(X)&&ht!==pt&&(ht!=null||pt!=null))switch(X){case"selected":e.selected=ht&&typeof ht!="function"&&typeof ht!="symbol";break;default:je(e,n,X,ht,o,pt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var se in s)ht=s[se],s.hasOwnProperty(se)&&ht!=null&&!o.hasOwnProperty(se)&&je(e,n,se,null,o,ht);for(st in o)if(ht=o[st],pt=s[st],o.hasOwnProperty(st)&&ht!==pt&&(ht!=null||pt!=null))switch(st){case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(a(137,n));break;default:je(e,n,st,ht,o,pt)}return;default:if(Be(n)){for(var Ze in s)ht=s[Ze],s.hasOwnProperty(Ze)&&ht!==void 0&&!o.hasOwnProperty(Ze)&&ph(e,n,Ze,void 0,o,ht);for(St in o)ht=o[St],pt=s[St],!o.hasOwnProperty(St)||ht===pt||ht===void 0&&pt===void 0||ph(e,n,St,ht,o,pt);return}}for(var et in s)ht=s[et],s.hasOwnProperty(et)&&ht!=null&&!o.hasOwnProperty(et)&&je(e,n,et,null,o,ht);for(Tt in o)ht=o[Tt],pt=s[Tt],!o.hasOwnProperty(Tt)||ht===pt||ht==null&&pt==null||je(e,n,Tt,ht,o,pt)}function Vg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function sS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],h=u.transferSize,S=u.initiatorType,R=u.duration;if(h&&R&&Vg(S)){for(S=0,R=u.responseEnd,o+=1;o<s.length;o++){var X=s[o],st=X.startTime;if(st>R)break;var St=X.transferSize,Tt=X.initiatorType;St&&Vg(Tt)&&(X=X.responseEnd,S+=St*(X<R?1:(R-st)/(X-st)))}if(--o,n+=8*(h+S)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var mh=null,gh=null;function _c(e){return e.nodeType===9?e:e.ownerDocument}function kg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Xg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function _h(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var vh=null;function rS(){var e=window.event;return e&&e.type==="popstate"?e===vh?!1:(vh=e,!0):(vh=null,!1)}var Wg=typeof setTimeout=="function"?setTimeout:void 0,oS=typeof clearTimeout=="function"?clearTimeout:void 0,Yg=typeof Promise=="function"?Promise:void 0,lS=typeof queueMicrotask=="function"?queueMicrotask:typeof Yg<"u"?function(e){return Yg.resolve(null).then(e).catch(cS)}:Wg;function cS(e){setTimeout(function(){throw e})}function os(e){return e==="head"}function qg(e,n){var s=n,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),Pr(n);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Yo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Yo(s);for(var h=s.firstChild;h;){var S=h.nextSibling,R=h.nodeName;h[Ha]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=S}}else s==="body"&&Yo(e.ownerDocument.body);s=u}while(s);Pr(n)}function jg(e,n){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?n?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(n?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function xh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var s=n;switch(n=n.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":xh(s),Ga(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function uS(e,n,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ha])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=Ai(e.nextSibling),e===null)break}return null}function fS(e,n,s){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=Ai(e.nextSibling),e===null))return null;return e}function Zg(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ai(e.nextSibling),e===null))return null;return e}function yh(e){return e.data==="$?"||e.data==="$~"}function Sh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function hS(e,n){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||s.readyState!=="loading")n();else{var o=function(){n(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Ai(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Mh=null;function Kg(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(n===0)return Ai(e.nextSibling);n--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||n++}e=e.nextSibling}return null}function Jg(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(n===0)return e;n--}else s!=="/$"&&s!=="/&"||n++}e=e.previousSibling}return null}function Qg(e,n,s){switch(n=_c(s),e){case"html":if(e=n.documentElement,!e)throw Error(a(452));return e;case"head":if(e=n.head,!e)throw Error(a(453));return e;case"body":if(e=n.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Yo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Ga(e)}var wi=new Map,$g=new Set;function vc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ea=k.d;k.d={f:dS,r:pS,D:mS,C:gS,L:_S,m:vS,X:yS,S:xS,M:SS};function dS(){var e=Ea.f(),n=cc();return e||n}function pS(e){var n=oa(e);n!==null&&n.tag===5&&n.type==="form"?g0(n):Ea.r(e)}var Ur=typeof document>"u"?null:document;function t_(e,n,s){var o=Ur;if(o&&typeof n=="string"&&n){var u=He(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),$g.has(u)||($g.add(u),e={rel:e,crossOrigin:s,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),In(n,"link",e),vn(n),o.head.appendChild(n)))}}function mS(e){Ea.D(e),t_("dns-prefetch",e,null)}function gS(e,n){Ea.C(e,n),t_("preconnect",e,n)}function _S(e,n,s){Ea.L(e,n,s);var o=Ur;if(o&&e&&n){var u='link[rel="preload"][as="'+He(n)+'"]';n==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+He(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+He(s.imageSizes)+'"]')):u+='[href="'+He(e)+'"]';var h=u;switch(n){case"style":h=Lr(e);break;case"script":h=Or(e)}wi.has(h)||(e=_({rel:"preload",href:n==="image"&&s&&s.imageSrcSet?void 0:e,as:n},s),wi.set(h,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(qo(h))||n==="script"&&o.querySelector(jo(h))||(n=o.createElement("link"),In(n,"link",e),vn(n),o.head.appendChild(n)))}}function vS(e,n){Ea.m(e,n);var s=Ur;if(s&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+He(o)+'"][href="'+He(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Or(e)}if(!wi.has(h)&&(e=_({rel:"modulepreload",href:e},n),wi.set(h,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(jo(h)))return}o=s.createElement("link"),In(o,"link",e),vn(o),s.head.appendChild(o)}}}function xS(e,n,s){Ea.S(e,n,s);var o=Ur;if(o&&e){var u=Va(o).hoistableStyles,h=Lr(e);n=n||"default";var S=u.get(h);if(!S){var R={loading:0,preload:null};if(S=o.querySelector(qo(h)))R.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},s),(s=wi.get(h))&&bh(e,s);var X=S=o.createElement("link");vn(X),In(X,"link",e),X._p=new Promise(function(st,St){X.onload=st,X.onerror=St}),X.addEventListener("load",function(){R.loading|=1}),X.addEventListener("error",function(){R.loading|=2}),R.loading|=4,xc(S,n,o)}S={type:"stylesheet",instance:S,count:1,state:R},u.set(h,S)}}}function yS(e,n){Ea.X(e,n);var s=Ur;if(s&&e){var o=Va(s).hoistableScripts,u=Or(e),h=o.get(u);h||(h=s.querySelector(jo(u)),h||(e=_({src:e,async:!0},n),(n=wi.get(u))&&Eh(e,n),h=s.createElement("script"),vn(h),In(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function SS(e,n){Ea.M(e,n);var s=Ur;if(s&&e){var o=Va(s).hoistableScripts,u=Or(e),h=o.get(u);h||(h=s.querySelector(jo(u)),h||(e=_({src:e,async:!0,type:"module"},n),(n=wi.get(u))&&Eh(e,n),h=s.createElement("script"),vn(h),In(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function e_(e,n,s,o){var u=(u=J.current)?vc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(n=Lr(s.href),s=Va(u).hoistableStyles,o=s.get(n),o||(o={type:"style",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Lr(s.href);var h=Va(u).hoistableStyles,S=h.get(e);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,S),(h=u.querySelector(qo(e)))&&!h._p&&(S.instance=h,S.state.loading=5),wi.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},wi.set(e,s),h||MS(u,e,s,S.state))),n&&o===null)throw Error(a(528,""));return S}if(n&&o!==null)throw Error(a(529,""));return null;case"script":return n=s.async,s=s.src,typeof s=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Or(s),s=Va(u).hoistableScripts,o=s.get(n),o||(o={type:"script",instance:null,count:0,state:null},s.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Lr(e){return'href="'+He(e)+'"'}function qo(e){return'link[rel="stylesheet"]['+e+"]"}function n_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function MS(e,n,s,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),In(n,"link",s),vn(n),e.head.appendChild(n))}function Or(e){return'[src="'+He(e)+'"]'}function jo(e){return"script[async]"+e}function i_(e,n,s){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+He(s.href)+'"]');if(o)return n.instance=o,vn(o),o;var u=_({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),vn(o),In(o,"style",u),xc(o,s.precedence,e),n.instance=o;case"stylesheet":u=Lr(s.href);var h=e.querySelector(qo(u));if(h)return n.state.loading|=4,n.instance=h,vn(h),h;o=n_(s),(u=wi.get(u))&&bh(o,u),h=(e.ownerDocument||e).createElement("link"),vn(h);var S=h;return S._p=new Promise(function(R,X){S.onload=R,S.onerror=X}),In(h,"link",o),n.state.loading|=4,xc(h,s.precedence,e),n.instance=h;case"script":return h=Or(s.src),(u=e.querySelector(jo(h)))?(n.instance=u,vn(u),u):(o=s,(u=wi.get(h))&&(o=_({},s),Eh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),vn(u),In(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(a(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,xc(o,s.precedence,e));return n.instance}function xc(e,n,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,S=0;S<o.length;S++){var R=o[S];if(R.dataset.precedence===n)h=R;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(n=s.nodeType===9?s.head:s,n.insertBefore(e,n.firstChild))}function bh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Eh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var yc=null;function a_(e,n,s){if(yc===null){var o=new Map,u=yc=new Map;u.set(s,o)}else u=yc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var h=s[u];if(!(h[Ha]||h[_n]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var S=h.getAttribute(n)||"";S=e+S;var R=o.get(S);R?R.push(h):o.set(S,[h])}}return o}function s_(e,n,s){e=e.ownerDocument||e,e.head.insertBefore(s,n==="title"?e.querySelector("head > title"):null)}function bS(e,n,s){if(s===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function r_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function ES(e,n,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=Lr(o.href),h=n.querySelector(qo(u));if(h){n=h._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Sc.bind(e),n.then(e,e)),s.state.loading|=4,s.instance=h,vn(h);return}h=n.ownerDocument||n,o=n_(o),(u=wi.get(u))&&bh(o,u),h=h.createElement("link"),vn(h);var S=h;S._p=new Promise(function(R,X){S.onload=R,S.onerror=X}),In(h,"link",o),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,n),(n=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=Sc.bind(e),n.addEventListener("load",s),n.addEventListener("error",s))}}var Th=0;function TS(e,n){return e.stylesheets&&e.count===0&&bc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&bc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+n);0<e.imgBytes&&Th===0&&(Th=62500*sS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&bc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Th?50:800)+n);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function Sc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)bc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Mc=null;function bc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mc=new Map,n.forEach(AS,e),Mc=null,Sc.call(e))}function AS(e,n){if(!(n.state.loading&4)){var s=Mc.get(e);if(s)var o=s.get(null);else{s=new Map,Mc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var S=u[h];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(s.set(S.dataset.precedence,S),o=S)}o&&s.set(null,o)}u=n.instance,S=u.getAttribute("data-precedence"),h=s.get(S)||o,h===o&&s.set(null,u),s.set(S,u),this.count++,o=Sc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Zo={$$typeof:F,Provider:null,Consumer:null,_currentValue:it,_currentValue2:it,_threadCount:0};function wS(e,n,s,o,u,h,S,R,X){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kt(0),this.hiddenUpdates=Kt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=X,this.incompleteTransitions=new Map}function o_(e,n,s,o,u,h,S,R,X,st,St,Tt){return e=new wS(e,n,s,S,X,st,St,Tt,R),n=1,h===!0&&(n|=24),h=ui(3,null,null,n),e.current=h,h.stateNode=e,n=af(),n.refCount++,e.pooledCache=n,n.refCount++,h.memoizedState={element:o,isDehydrated:s,cache:n},lf(h),e}function l_(e){return e?(e=fr,e):fr}function c_(e,n,s,o,u,h){u=l_(u),o.context===null?o.context=u:o.pendingContext=u,o=Ka(n),o.payload={element:s},h=h===void 0?null:h,h!==null&&(o.callback=h),s=Ja(e,o,n),s!==null&&(ti(s,e,n),wo(s,e,n))}function u_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<n?s:n}}function Ah(e,n){u_(e,n),(e=e.alternate)&&u_(e,n)}function f_(e){if(e.tag===13||e.tag===31){var n=Ls(e,67108864);n!==null&&ti(n,e,67108864),Ah(e,67108864)}}function h_(e){if(e.tag===13||e.tag===31){var n=mi();n=lo(n);var s=Ls(e,n);s!==null&&ti(s,e,n),Ah(e,n)}}var Ec=!0;function CS(e,n,s,o){var u=H.T;H.T=null;var h=k.p;try{k.p=2,wh(e,n,s,o)}finally{k.p=h,H.T=u}}function RS(e,n,s,o){var u=H.T;H.T=null;var h=k.p;try{k.p=8,wh(e,n,s,o)}finally{k.p=h,H.T=u}}function wh(e,n,s,o){if(Ec){var u=Ch(o);if(u===null)dh(e,n,o,Tc,s),p_(e,o);else if(DS(u,e,n,s,o))o.stopPropagation();else if(p_(e,o),n&4&&-1<NS.indexOf(e)){for(;u!==null;){var h=oa(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var S=Rt(h.pendingLanes);if(S!==0){var R=h;for(R.pendingLanes|=2,R.entangledLanes|=2;S;){var X=1<<31-Gt(S);R.entanglements[1]|=X,S&=~X}ji(h),(Pe&6)===0&&(oc=Oe()+500,ko(0))}}break;case 31:case 13:R=Ls(h,2),R!==null&&ti(R,h,2),cc(),Ah(h,2)}if(h=Ch(o),h===null&&dh(e,n,o,Tc,s),h===u)break;u=h}u!==null&&o.stopPropagation()}else dh(e,n,o,null,s)}}function Ch(e){return e=Ru(e),Rh(e)}var Tc=null;function Rh(e){if(Tc=null,e=ra(e),e!==null){var n=c(e);if(n===null)e=null;else{var s=n.tag;if(s===13){if(e=f(n),e!==null)return e;e=null}else if(s===31){if(e=p(n),e!==null)return e;e=null}else if(s===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Tc=e,null}function d_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ce()){case I:return 2;case T:return 8;case nt:case ct:return 32;case _t:return 268435456;default:return 32}default:return 32}}var Nh=!1,ls=null,cs=null,us=null,Ko=new Map,Jo=new Map,fs=[],NS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function p_(e,n){switch(e){case"focusin":case"focusout":ls=null;break;case"dragenter":case"dragleave":cs=null;break;case"mouseover":case"mouseout":us=null;break;case"pointerover":case"pointerout":Ko.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jo.delete(n.pointerId)}}function Qo(e,n,s,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:n,domEventName:s,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},n!==null&&(n=oa(n),n!==null&&f_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function DS(e,n,s,o,u){switch(n){case"focusin":return ls=Qo(ls,e,n,s,o,u),!0;case"dragenter":return cs=Qo(cs,e,n,s,o,u),!0;case"mouseover":return us=Qo(us,e,n,s,o,u),!0;case"pointerover":var h=u.pointerId;return Ko.set(h,Qo(Ko.get(h)||null,e,n,s,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Jo.set(h,Qo(Jo.get(h)||null,e,n,s,o,u)),!0}return!1}function m_(e){var n=ra(e.target);if(n!==null){var s=c(n);if(s!==null){if(n=s.tag,n===13){if(n=f(s),n!==null){e.blockedOn=n,ar(e.priority,function(){h_(s)});return}}else if(n===31){if(n=p(s),n!==null){e.blockedOn=n,ar(e.priority,function(){h_(s)});return}}else if(n===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ac(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var s=Ch(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);Cu=o,s.target.dispatchEvent(o),Cu=null}else return n=oa(s),n!==null&&f_(n),e.blockedOn=s,!1;n.shift()}return!0}function g_(e,n,s){Ac(e)&&s.delete(n)}function US(){Nh=!1,ls!==null&&Ac(ls)&&(ls=null),cs!==null&&Ac(cs)&&(cs=null),us!==null&&Ac(us)&&(us=null),Ko.forEach(g_),Jo.forEach(g_)}function wc(e,n){e.blockedOn===n&&(e.blockedOn=null,Nh||(Nh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,US)))}var Cc=null;function __(e){Cc!==e&&(Cc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Cc===e&&(Cc=null);for(var n=0;n<e.length;n+=3){var s=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(Rh(o||s)===null)continue;break}var h=oa(s);h!==null&&(e.splice(n,3),n-=3,Cf(h,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function Pr(e){function n(X){return wc(X,e)}ls!==null&&wc(ls,e),cs!==null&&wc(cs,e),us!==null&&wc(us,e),Ko.forEach(n),Jo.forEach(n);for(var s=0;s<fs.length;s++){var o=fs[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<fs.length&&(s=fs[0],s.blockedOn===null);)m_(s),s.blockedOn===null&&fs.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],h=s[o+1],S=u[Un]||null;if(typeof h=="function")S||__(s);else if(S){var R=null;if(h&&h.hasAttribute("formAction")){if(u=h,S=h[Un]||null)R=S.formAction;else if(Rh(u)!==null)continue}else R=S.action;typeof R=="function"?s[o+1]=R:(s.splice(o,3),o-=3),__(s)}}}function v_(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Dh(e){this._internalRoot=e}Rc.prototype.render=Dh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(a(409));var s=n.current,o=mi();c_(s,o,e,n,null,null)},Rc.prototype.unmount=Dh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;c_(e.current,2,null,e,null,null),cc(),n[jn]=null}};function Rc(e){this._internalRoot=e}Rc.prototype.unstable_scheduleHydration=function(e){if(e){var n=uo();e={blockedOn:null,target:e,priority:n};for(var s=0;s<fs.length&&n!==0&&n<fs[s].priority;s++);fs.splice(s,0,e),s===0&&m_(e)}};var x_=t.version;if(x_!=="19.2.8")throw Error(a(527,x_,"19.2.8"));k.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=d(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var LS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:H,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nc.isDisabled&&Nc.supportsFiber)try{vt=Nc.inject(LS),xt=Nc}catch{}}return tl.createRoot=function(e,n){if(!l(e))throw Error(a(299));var s=!1,o="",u=A0,h=w0,S=C0;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(h=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),n=o_(e,1,!1,null,null,s,o,null,u,h,S,v_),e[jn]=n.current,hh(e),new Dh(n)},tl.hydrateRoot=function(e,n,s){if(!l(e))throw Error(a(299));var o=!1,u="",h=A0,S=w0,R=C0,X=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(S=s.onCaughtError),s.onRecoverableError!==void 0&&(R=s.onRecoverableError),s.formState!==void 0&&(X=s.formState)),n=o_(e,1,!0,n,s??null,o,u,X,h,S,R,v_),n.context=l_(null),s=n.current,o=mi(),o=lo(o),u=Ka(o),u.callback=null,Ja(s,u,o),s=o,n.current.lanes=s,Wt(n,s),ji(n),e[jn]=n.current,hh(e),new Rc(n)},tl.version="19.2.8",tl}var R_;function kS(){if(R_)return Oh.exports;R_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Oh.exports=VS(),Oh.exports}var XS=kS();/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WS=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),YS=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,a)=>a?a.toUpperCase():i.toLowerCase()),N_=r=>{const t=YS(r);return t.charAt(0).toUpperCase()+t.slice(1)},Wv=(...r)=>r.filter((t,i,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===i).join(" ").trim(),qS=r=>{for(const t in r)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var jS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZS=We.forwardRef(({color:r="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:l="",children:c,iconNode:f,...p},m)=>We.createElement("svg",{ref:m,...jS,width:t,height:t,stroke:r,strokeWidth:a?Number(i)*24/Number(t):i,className:Wv("lucide",l),...!c&&!qS(p)&&{"aria-hidden":"true"},...p},[...f.map(([d,g])=>We.createElement(d,g)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un=(r,t)=>{const i=We.forwardRef(({className:a,...l},c)=>We.createElement(ZS,{ref:c,iconNode:t,className:Wv(`lucide-${WS(N_(r))}`,`lucide-${r}`,a),...l}));return i.displayName=N_(r),i};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KS=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],JS=un("activity",KS);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QS=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],$S=un("award",QS);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tM=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Yv=un("camera",tM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eM=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],nM=un("chevron-right",eM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aM=un("circle-alert",iM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],rM=un("circle-check",sM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],lM=un("circle-x",oM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cM=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],uM=un("cpu",cM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fM=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],hM=un("download",fM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dM=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],pM=un("eye",dM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],gM=un("info",mM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _M=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],vM=un("lightbulb",_M);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xM=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],yM=un("palette",xM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SM=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],zh=un("plus",SM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MM=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],bM=un("rotate-ccw",MM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EM=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],TM=un("save",EM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AM=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],wM=un("shield-alert",AM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CM=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],qv=un("sparkles",CM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RM=[["circle",{cx:"9",cy:"12",r:"3",key:"u3jwor"}],["rect",{width:"20",height:"14",x:"2",y:"5",rx:"7",key:"g7kal2"}]],NM=un("toggle-left",RM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DM=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],UM=un("trash-2",DM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],D_=un("triangle-alert",LM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OM=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],PM=un("x",OM);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IM=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],jv=un("zap",IM);class BM{constructor(){this.ctx=null}init(){if(!this.ctx&&typeof window<"u"){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}}playSwitchClick(){if(this.init(),!!this.ctx)try{const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.05),i.gain.setValueAtTime(.3,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.01,this.ctx.currentTime+.05),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.05)}catch{}}playWirePlug(){if(this.init(),!!this.ctx)try{const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(800,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1200,this.ctx.currentTime+.04),i.gain.setValueAtTime(.2,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.04),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.04)}catch{}}playMultimeterBeep(){if(this.init(),!!this.ctx)try{const t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(1046.5,this.ctx.currentTime),i.gain.setValueAtTime(.15,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.15),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.15)}catch{}}playPowerToggle(t){if(this.init(),!!this.ctx)try{const i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(t?150:300,this.ctx.currentTime),i.frequency.exponentialRampToValueAtTime(t?400:80,this.ctx.currentTime+.1),a.gain.setValueAtTime(.25,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),i.connect(a),a.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.1)}catch{}}}const Kr=new BM,zM=({powerOn:r,voltage:t,onTogglePower:i,onChangeVoltage:a,onResetCircuit:l,onSaveCircuit:c,onLoadCircuit:f,onLoadPreset:p,onOpenAR:m,activeICType:d})=>G.jsxs("header",{className:"h-14 bg-[#161920] border-b border-white/5 text-slate-200 px-6 flex items-center justify-between gap-4 z-20 sticky top-0 shrink-0 shadow-2xl",children:[G.jsxs("div",{className:"flex items-center gap-3",children:[G.jsx("div",{className:"w-8 h-8 bg-blue-500/20 border border-blue-400/50 rounded flex items-center justify-center shrink-0",children:G.jsx(jv,{className:"w-4 h-4 text-blue-400"})}),G.jsx("div",{children:G.jsxs("h1",{className:"font-bold tracking-tight text-base sm:text-lg uppercase italic text-white flex items-center gap-2",children:["Virtual Electronics Training Lab",G.jsx("span",{className:"text-[10px] bg-blue-500/20 text-blue-400 font-mono px-2 py-0.5 rounded border border-blue-500/30 not-italic uppercase tracking-widest",children:"EXP-01"})]})})]}),G.jsxs("div",{className:"hidden lg:flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5",children:[G.jsx("span",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] px-1",children:"IC Presets:"}),["7408","7400","7432","7402","7486","7404"].map(g=>G.jsx("button",{onClick:()=>p(g),className:`px-2.5 py-1 text-xs font-mono font-bold rounded uppercase tracking-wider transition-all ${d===g?"bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50":"text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5"}`,children:g},g))]}),G.jsxs("div",{className:"flex items-center gap-3",children:[G.jsxs("div",{className:"flex items-center gap-1.5 bg-[#0A0B0E] px-2 py-1 rounded-lg border border-white/5 font-mono text-xs",children:[G.jsx("span",{className:"text-[10px] text-slate-500 uppercase font-bold",children:"V-ADJ:"}),G.jsx("button",{onClick:()=>a(Math.max(1,parseFloat((t-.5).toFixed(1)))),className:"px-1.5 py-0.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/5 font-bold",title:"Decrease voltage by 0.5V",children:"-"}),G.jsxs("span",{className:"font-bold text-blue-400 w-12 text-center",children:[t.toFixed(1),"V"]}),G.jsx("button",{onClick:()=>a(Math.min(15,parseFloat((t+.5).toFixed(1)))),className:"px-1.5 py-0.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/5 font-bold",title:"Increase voltage by 0.5V",children:"+"})]}),G.jsxs("button",{onClick:()=>{Kr.playPowerToggle(!r),i()},className:`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest transition-all ${r?"bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20":"bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"}`,title:"Click to toggle power supply",children:[G.jsx("div",{className:`w-2 h-2 rounded-full ${r?"bg-green-400 animate-pulse":"bg-red-500"}`}),G.jsx("span",{className:"font-bold",children:r?"SIMULATION ACTIVE":"POWER OFF"})]}),G.jsx("div",{className:"h-4 w-[1px] bg-white/10 hidden sm:block"}),G.jsxs("div",{className:"flex items-center gap-2",children:[G.jsxs("button",{onClick:c,title:"Save Circuit",className:"px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors shadow-md shadow-blue-500/20 flex items-center gap-1.5",children:[G.jsx(TM,{className:"w-3.5 h-3.5"}),G.jsx("span",{className:"hidden sm:inline",children:"Save"})]}),G.jsx("button",{onClick:f,title:"Load Saved Circuit",className:"px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded border border-white/10 uppercase transition-colors",children:G.jsx(hM,{className:"w-3.5 h-3.5"})}),G.jsx("button",{onClick:l,title:"Reset Circuit",className:"px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded border border-red-500/20 uppercase transition-colors",children:G.jsx(bM,{className:"w-3.5 h-3.5"})}),G.jsxs("button",{onClick:m,className:"px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded border border-white/10 uppercase tracking-wider transition-colors flex items-center gap-1.5",children:[G.jsx(Yv,{className:"w-3.5 h-3.5"}),G.jsx("span",{className:"hidden md:inline",children:"View in AR"})]})]})]})]}),uu={7408:{type:"7408",name:"IC 7408",fullName:"Quad 2-Input AND Gate",description:"Contains four independent 2-input AND logic gates. Output is HIGH only if both inputs are HIGH.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1B",type:"INPUT",gateIndex:1},3:{pinNumber:3,name:"1Y",type:"OUTPUT",gateIndex:1},4:{pinNumber:4,name:"2A",type:"INPUT",gateIndex:2},5:{pinNumber:5,name:"2B",type:"INPUT",gateIndex:2},6:{pinNumber:6,name:"2Y",type:"OUTPUT",gateIndex:2},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"3Y",type:"OUTPUT",gateIndex:3},9:{pinNumber:9,name:"3A",type:"INPUT",gateIndex:3},10:{pinNumber:10,name:"3B",type:"INPUT",gateIndex:3},11:{pinNumber:11,name:"4Y",type:"OUTPUT",gateIndex:4},12:{pinNumber:12,name:"4A",type:"INPUT",gateIndex:4},13:{pinNumber:13,name:"4B",type:"INPUT",gateIndex:4},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A,i=r.B;return t==="FLOATING"||i==="FLOATING"?"FLOATING":t==="HIGH"&&i==="HIGH"?"HIGH":"LOW"}},7400:{type:"7400",name:"IC 7400",fullName:"Quad 2-Input NAND Gate",description:"Contains four independent 2-input NAND logic gates. Output is LOW only if both inputs are HIGH.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1B",type:"INPUT",gateIndex:1},3:{pinNumber:3,name:"1Y",type:"OUTPUT",gateIndex:1},4:{pinNumber:4,name:"2A",type:"INPUT",gateIndex:2},5:{pinNumber:5,name:"2B",type:"INPUT",gateIndex:2},6:{pinNumber:6,name:"2Y",type:"OUTPUT",gateIndex:2},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"3Y",type:"OUTPUT",gateIndex:3},9:{pinNumber:9,name:"3A",type:"INPUT",gateIndex:3},10:{pinNumber:10,name:"3B",type:"INPUT",gateIndex:3},11:{pinNumber:11,name:"4Y",type:"OUTPUT",gateIndex:4},12:{pinNumber:12,name:"4A",type:"INPUT",gateIndex:4},13:{pinNumber:13,name:"4B",type:"INPUT",gateIndex:4},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A,i=r.B;return t==="FLOATING"||i==="FLOATING"?"FLOATING":t==="HIGH"&&i==="HIGH"?"LOW":"HIGH"}},7432:{type:"7432",name:"IC 7432",fullName:"Quad 2-Input OR Gate",description:"Contains four independent 2-input OR logic gates. Output is HIGH if at least one input is HIGH.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1B",type:"INPUT",gateIndex:1},3:{pinNumber:3,name:"1Y",type:"OUTPUT",gateIndex:1},4:{pinNumber:4,name:"2A",type:"INPUT",gateIndex:2},5:{pinNumber:5,name:"2B",type:"INPUT",gateIndex:2},6:{pinNumber:6,name:"2Y",type:"OUTPUT",gateIndex:2},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"3Y",type:"OUTPUT",gateIndex:3},9:{pinNumber:9,name:"3A",type:"INPUT",gateIndex:3},10:{pinNumber:10,name:"3B",type:"INPUT",gateIndex:3},11:{pinNumber:11,name:"4Y",type:"OUTPUT",gateIndex:4},12:{pinNumber:12,name:"4A",type:"INPUT",gateIndex:4},13:{pinNumber:13,name:"4B",type:"INPUT",gateIndex:4},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A,i=r.B;return t==="FLOATING"||i==="FLOATING"?"FLOATING":t==="HIGH"||i==="HIGH"?"HIGH":"LOW"}},7402:{type:"7402",name:"IC 7402",fullName:"Quad 2-Input NOR Gate",description:"Contains four independent 2-input NOR logic gates. Output is HIGH only if both inputs are LOW.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1B",type:"INPUT",gateIndex:1},3:{pinNumber:3,name:"1Y",type:"OUTPUT",gateIndex:1},4:{pinNumber:4,name:"2A",type:"INPUT",gateIndex:2},5:{pinNumber:5,name:"2B",type:"INPUT",gateIndex:2},6:{pinNumber:6,name:"2Y",type:"OUTPUT",gateIndex:2},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"3Y",type:"OUTPUT",gateIndex:3},9:{pinNumber:9,name:"3A",type:"INPUT",gateIndex:3},10:{pinNumber:10,name:"3B",type:"INPUT",gateIndex:3},11:{pinNumber:11,name:"4Y",type:"OUTPUT",gateIndex:4},12:{pinNumber:12,name:"4A",type:"INPUT",gateIndex:4},13:{pinNumber:13,name:"4B",type:"INPUT",gateIndex:4},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A,i=r.B;return t==="FLOATING"||i==="FLOATING"?"FLOATING":t==="LOW"&&i==="LOW"?"HIGH":"LOW"}},7486:{type:"7486",name:"IC 7486",fullName:"Quad 2-Input Exclusive-OR (XOR) Gate",description:"Contains four independent 2-input XOR logic gates. Output is HIGH when inputs differ.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1B",type:"INPUT",gateIndex:1},3:{pinNumber:3,name:"1Y",type:"OUTPUT",gateIndex:1},4:{pinNumber:4,name:"2A",type:"INPUT",gateIndex:2},5:{pinNumber:5,name:"2B",type:"INPUT",gateIndex:2},6:{pinNumber:6,name:"2Y",type:"OUTPUT",gateIndex:2},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"3Y",type:"OUTPUT",gateIndex:3},9:{pinNumber:9,name:"3A",type:"INPUT",gateIndex:3},10:{pinNumber:10,name:"3B",type:"INPUT",gateIndex:3},11:{pinNumber:11,name:"4Y",type:"OUTPUT",gateIndex:4},12:{pinNumber:12,name:"4A",type:"INPUT",gateIndex:4},13:{pinNumber:13,name:"4B",type:"INPUT",gateIndex:4},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A,i=r.B;return t==="FLOATING"||i==="FLOATING"?"FLOATING":t!==i?"HIGH":"LOW"}},7404:{type:"7404",name:"IC 7404",fullName:"Hex Inverter (NOT Gate)",description:"Contains six independent NOT logic gates. Inverts the input signal.",pinCount:14,vccPin:14,gndPin:7,pins:{1:{pinNumber:1,name:"1A",type:"INPUT",gateIndex:1},2:{pinNumber:2,name:"1Y",type:"OUTPUT",gateIndex:1},3:{pinNumber:3,name:"2A",type:"INPUT",gateIndex:2},4:{pinNumber:4,name:"2Y",type:"OUTPUT",gateIndex:2},5:{pinNumber:5,name:"3A",type:"INPUT",gateIndex:3},6:{pinNumber:6,name:"3Y",type:"OUTPUT",gateIndex:3},7:{pinNumber:7,name:"GND",type:"GROUND"},8:{pinNumber:8,name:"4Y",type:"OUTPUT",gateIndex:4},9:{pinNumber:9,name:"4A",type:"INPUT",gateIndex:4},10:{pinNumber:10,name:"5Y",type:"OUTPUT",gateIndex:5},11:{pinNumber:11,name:"5A",type:"INPUT",gateIndex:5},12:{pinNumber:12,name:"6Y",type:"OUTPUT",gateIndex:6},13:{pinNumber:13,name:"6A",type:"INPUT",gateIndex:6},14:{pinNumber:14,name:"VCC",type:"POWER"}},logicFunction:r=>{const t=r.A;return t==="FLOATING"?"FLOATING":t==="HIGH"?"LOW":"HIGH"}}},FM=[{color:"red",label:"+5V Power",hex:"#ef4444"},{color:"black",label:"GND Ground",hex:"#18181b"},{color:"yellow",label:"Input A",hex:"#eab308"},{color:"green",label:"Input B",hex:"#22c55e"},{color:"blue",label:"Output Y",hex:"#3b82f6"},{color:"white",label:"Signal",hex:"#f8fafc"}],HM=({onAddIC:r,onAddSwitch:t,onAddLED:i,onAddResistor:a,selectedWireColor:l,onSelectWireColor:c,multimeterMode:f,onSelectMultimeterMode:p,activeICType:m})=>{const[d,g]=We.useState("ics");return G.jsxs("aside",{className:"w-72 bg-[#12151B] border-r border-white/5 text-slate-200 flex flex-col h-[calc(100vh-56px-32px)] z-10 shrink-0 select-none",children:[G.jsxs("div",{className:"grid grid-cols-4 bg-[#0A0B0E] p-1.5 border-b border-white/5 gap-1 text-xs font-medium",children:[G.jsxs("button",{onClick:()=>g("ics"),className:`flex flex-col items-center py-2 rounded transition-all text-[11px] ${d==="ics"?"bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30":"text-slate-400 hover:text-slate-200"}`,children:[G.jsx(uM,{className:"w-3.5 h-3.5 mb-1"}),"ICs"]}),G.jsxs("button",{onClick:()=>g("inputs"),className:`flex flex-col items-center py-2 rounded transition-all text-[11px] ${d==="inputs"?"bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30":"text-slate-400 hover:text-slate-200"}`,children:[G.jsx(NM,{className:"w-3.5 h-3.5 mb-1"}),"I/O"]}),G.jsxs("button",{onClick:()=>g("wires"),className:`flex flex-col items-center py-2 rounded transition-all text-[11px] ${d==="wires"?"bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30":"text-slate-400 hover:text-slate-200"}`,children:[G.jsx(yM,{className:"w-3.5 h-3.5 mb-1"}),"Wires"]}),G.jsxs("button",{onClick:()=>g("meter"),className:`flex flex-col items-center py-2 rounded transition-all text-[11px] ${d==="meter"?"bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30":"text-slate-400 hover:text-slate-200"}`,children:[G.jsx(JS,{className:"w-3.5 h-3.5 mb-1"}),"Meter"]})]}),G.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800",children:[d==="ics"&&G.jsxs("div",{children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4",children:"Component Library"}),G.jsx("div",{className:"space-y-2.5",children:Object.keys(uu).map(_=>{const v=uu[_],b=m===_;return G.jsxs("div",{onClick:()=>r(_),className:`p-3 rounded-lg border transition-all cursor-pointer group ${b?"bg-blue-500/10 border-blue-500/50 text-white":"bg-white/5 border-white/10 hover:border-blue-500/50"}`,children:[G.jsxs("div",{className:"flex justify-between items-start mb-1",children:[G.jsxs("span",{className:`text-xs font-bold ${b?"text-blue-400":"text-white group-hover:text-blue-400"}`,children:["IC ",v.name]}),G.jsx("span",{className:"text-[9px] px-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/20 font-mono",children:v.fullName.split(" ")[0]})]}),G.jsxs("p",{className:"text-[10px] text-slate-500",children:[v.fullName," / DIP-14"]}),G.jsxs("div",{className:"mt-2 text-[9px] font-mono text-slate-400 bg-black/40 p-1.5 rounded border border-white/5 flex justify-between",children:[G.jsx("span",{children:"VCC: Pin 14"}),G.jsx("span",{children:"GND: Pin 7"})]})]},_)})})]}),d==="inputs"&&G.jsxs("div",{className:"space-y-5",children:[G.jsxs("div",{children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3",children:"Input Switches"}),G.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[G.jsxs("button",{onClick:()=>t("Input A"),className:"p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all group",children:[G.jsxs("div",{className:"flex items-center justify-between",children:[G.jsx("span",{className:"font-bold text-xs text-white group-hover:text-blue-400",children:"Switch A"}),G.jsx(zh,{className:"w-3.5 h-3.5 text-blue-400"})]}),G.jsx("span",{className:"text-[10px] text-slate-500 mt-1 block",children:"SPST Toggle"})]}),G.jsxs("button",{onClick:()=>t("Input B"),className:"p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all group",children:[G.jsxs("div",{className:"flex items-center justify-between",children:[G.jsx("span",{className:"font-bold text-xs text-white group-hover:text-blue-400",children:"Switch B"}),G.jsx(zh,{className:"w-3.5 h-3.5 text-blue-400"})]}),G.jsx("span",{className:"text-[10px] text-slate-500 mt-1 block",children:"SPST Toggle"})]})]})]}),G.jsxs("div",{children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3",children:"Outputs & Resistors"}),G.jsxs("div",{className:"space-y-2",children:[G.jsxs("div",{className:"p-3 bg-white/5 border border-white/10 rounded-lg space-y-2",children:[G.jsxs("div",{className:"flex items-center justify-between",children:[G.jsx("span",{className:"text-xs font-bold text-white",children:"Output LED"}),G.jsx("span",{className:"text-[10px] text-slate-500",children:"Select Color"})]}),G.jsx("div",{className:"grid grid-cols-4 gap-1.5",children:["red","green","yellow","blue"].map(_=>G.jsx("button",{onClick:()=>i(_),className:"py-1.5 rounded text-[10px] font-mono font-bold capitalize border border-white/10 hover:border-white transition-all uppercase",style:{backgroundColor:_==="red"?"#ef444420":_==="green"?"#22c55e20":_==="yellow"?"#eab30820":"#3b82f620",color:_==="red"?"#ef4444":_==="green"?"#22c55e":_==="yellow"?"#eab308":"#3b82f6"},children:_},_))})]}),G.jsxs("button",{onClick:a,className:"w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left hover:border-blue-500/50 transition-all flex items-center justify-between group",children:[G.jsxs("div",{children:[G.jsx("span",{className:"font-bold text-xs text-white group-hover:text-blue-400",children:"330Ω Resistor"}),G.jsx("span",{className:"text-[10px] text-slate-500 block",children:"LED Overcurrent Protection"})]}),G.jsx(zh,{className:"w-4 h-4 text-blue-400"})]})]})]})]}),d==="wires"&&G.jsxs("div",{children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4",children:"Hookup Wires"}),G.jsx("p",{className:"text-[10px] text-slate-500 mb-3 leading-relaxed",children:"Select wire color, then click 2 holes on the breadboard to place wire."}),G.jsx("div",{className:"grid grid-cols-2 gap-2",children:FM.map(_=>G.jsxs("div",{onClick:()=>c(_.color),className:`p-3 rounded-lg border flex flex-col justify-between cursor-pointer transition-all ${l===_.color?"bg-blue-500/20 border-blue-500 text-white shadow-md":"bg-white/5 border-white/10 hover:border-white/30 text-slate-300"}`,children:[G.jsxs("div",{className:"flex items-center justify-between mb-2",children:[G.jsx("span",{className:"text-[10px] font-bold font-mono uppercase",children:_.label.split(" ")[0]}),G.jsx("div",{className:"w-3 h-3 rounded-full border border-white/20",style:{backgroundColor:_.hex}})]}),G.jsx("span",{className:"text-[9px] text-slate-400 font-mono",children:_.label})]},_.color))})]}),d==="meter"&&G.jsxs("div",{children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4",children:"Multimeter Probe Mode"}),G.jsx("div",{className:"space-y-2",children:[{mode:"VOLTAGE",name:"DC Voltage Probe",desc:"Measure 0.00V to 5.04V logic level"},{mode:"CONTINUITY",name:"Continuity Test",desc:"Audio beep test for connections"},{mode:"LOGIC",name:"Logic Probe",desc:"Instant HIGH (1) / LOW (0) status"}].map(_=>G.jsxs("div",{onClick:()=>p(_.mode),className:`p-3 rounded-lg border cursor-pointer transition-all ${f===_.mode?"bg-blue-500/20 border-blue-500 text-white shadow-md":"bg-white/5 border-white/10 hover:border-white/30 text-slate-300"}`,children:[G.jsxs("div",{className:"flex items-center justify-between",children:[G.jsx("span",{className:"font-bold text-xs",children:_.name}),f===_.mode&&G.jsx("span",{className:"text-[9px] font-mono font-bold text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/20",children:"ACTIVE"})]}),G.jsx("p",{className:"text-[10px] text-slate-500 mt-1",children:_.desc})]},_.mode))})]})]}),G.jsxs("div",{className:"p-4 bg-blue-500/5 border-t border-white/5 border-b-0 shrink-0",children:[G.jsx("h3",{className:"text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2",children:"Logic Probe Display"}),G.jsxs("div",{className:"flex items-baseline gap-1",children:[G.jsx("span",{className:"text-2xl font-mono text-white font-bold",children:"5.04"}),G.jsx("span",{className:"text-xs font-mono text-blue-400",children:"VDC"})]}),G.jsx("div",{className:"mt-2 h-1 bg-white/10 rounded-full overflow-hidden",children:G.jsx("div",{className:"h-full bg-blue-500 w-[98%]"})})]})]})};var mp={};(function r(t,i,a,l){var c=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),f=typeof Path2D=="function"&&typeof DOMMatrix=="function",p=(function(){if(!t.OffscreenCanvas)return!1;try{var D=new OffscreenCanvas(1,1),M=D.getContext("2d");M.fillRect(0,0,1,1);var O=D.transferToImageBitmap();M.createPattern(O,"no-repeat")}catch{return!1}return!0})();function m(){}function d(D){var M=i.exports.Promise,O=M!==void 0?M:t.Promise;return typeof O=="function"?new O(D):(D(m,m),null)}var g=(function(D,M){return{transform:function(O){if(D)return O;if(M.has(O))return M.get(O);var tt=new OffscreenCanvas(O.width,O.height),mt=tt.getContext("2d");return mt.drawImage(O,0,0),M.set(O,tt),tt},clear:function(){M.clear()}}})(p,new Map),_=(function(){var D=Math.floor(16.666666666666668),M,O,tt={},mt=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(M=function(bt){var J=Math.random();return tt[J]=requestAnimationFrame(function rt(dt){mt===dt||mt+D-1<dt?(mt=dt,delete tt[J],bt()):tt[J]=requestAnimationFrame(rt)}),J},O=function(bt){tt[bt]&&cancelAnimationFrame(tt[bt])}):(M=function(bt){return setTimeout(bt,D)},O=function(bt){return clearTimeout(bt)}),{frame:M,cancel:O}})(),v=(function(){var D,M,O={};function tt(mt){function bt(J,rt){mt.postMessage({options:J||{},callback:rt})}mt.init=function(rt){var dt=rt.transferControlToOffscreen();mt.postMessage({canvas:dt},[dt])},mt.fire=function(rt,dt,wt){if(M)return bt(rt,null),M;var Ht=Math.random().toString(36).slice(2);return M=d(function(Lt){function ce($t){$t.data.callback===Ht&&(delete O[Ht],mt.removeEventListener("message",ce),M=null,g.clear(),wt(),Lt())}mt.addEventListener("message",ce),bt(rt,Ht),O[Ht]=ce.bind(null,{data:{callback:Ht}})}),M},mt.reset=function(){mt.postMessage({reset:!0});for(var rt in O)O[rt](),delete O[rt]}}return function(){if(D)return D;if(!a&&c){var mt=["var CONFETTI, SIZE = {}, module = {};","("+r.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{D=new Worker(URL.createObjectURL(new Blob([mt])))}catch(bt){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",bt),null}tt(D)}return D}})(),b={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function E(D,M){return M?M(D):D}function w(D){return D!=null}function x(D,M,O){return E(D&&w(D[M])?D[M]:b[M],O)}function y(D){return D<0?0:Math.floor(D)}function z(D,M){return Math.floor(Math.random()*(M-D))+D}function F(D){return parseInt(D,16)}function N(D){return D.map(P)}function P(D){var M=String(D).replace(/[^0-9a-f]/gi,"");return M.length<6&&(M=M[0]+M[0]+M[1]+M[1]+M[2]+M[2]),{r:F(M.substring(0,2)),g:F(M.substring(2,4)),b:F(M.substring(4,6))}}function U(D){var M=x(D,"origin",Object);return M.x=x(M,"x",Number),M.y=x(M,"y",Number),M}function B(D){D.width=document.documentElement.clientWidth,D.height=document.documentElement.clientHeight}function A(D){var M=D.getBoundingClientRect();D.width=M.width,D.height=M.height}function L(D){var M=document.createElement("canvas");return M.style.position="fixed",M.style.top="0px",M.style.left="0px",M.style.pointerEvents="none",M.style.zIndex=D,M}function W(D,M,O,tt,mt,bt,J,rt,dt){D.save(),D.translate(M,O),D.rotate(bt),D.scale(tt,mt),D.arc(0,0,1,J,rt,dt),D.restore()}function V(D){var M=D.angle*(Math.PI/180),O=D.spread*(Math.PI/180);return{x:D.x,y:D.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:D.startVelocity*.5+Math.random()*D.startVelocity,angle2D:-M+(.5*O-Math.random()*O),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:D.color,shape:D.shape,tick:0,totalTicks:D.ticks,decay:D.decay,drift:D.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:D.gravity*3,ovalScalar:.6,scalar:D.scalar,flat:D.flat}}function q(D,M){M.x+=Math.cos(M.angle2D)*M.velocity+M.drift,M.y+=Math.sin(M.angle2D)*M.velocity+M.gravity,M.velocity*=M.decay,M.flat?(M.wobble=0,M.wobbleX=M.x+10*M.scalar,M.wobbleY=M.y+10*M.scalar,M.tiltSin=0,M.tiltCos=0,M.random=1):(M.wobble+=M.wobbleSpeed,M.wobbleX=M.x+10*M.scalar*Math.cos(M.wobble),M.wobbleY=M.y+10*M.scalar*Math.sin(M.wobble),M.tiltAngle+=.1,M.tiltSin=Math.sin(M.tiltAngle),M.tiltCos=Math.cos(M.tiltAngle),M.random=Math.random()+2);var O=M.tick++/M.totalTicks,tt=M.x+M.random*M.tiltCos,mt=M.y+M.random*M.tiltSin,bt=M.wobbleX+M.random*M.tiltCos,J=M.wobbleY+M.random*M.tiltSin;if(D.fillStyle="rgba("+M.color.r+", "+M.color.g+", "+M.color.b+", "+(1-O)+")",D.beginPath(),f&&M.shape.type==="path"&&typeof M.shape.path=="string"&&Array.isArray(M.shape.matrix))D.fill(k(M.shape.path,M.shape.matrix,M.x,M.y,Math.abs(bt-tt)*.1,Math.abs(J-mt)*.1,Math.PI/10*M.wobble));else if(M.shape.type==="bitmap"){var rt=Math.PI/10*M.wobble,dt=Math.abs(bt-tt)*.1,wt=Math.abs(J-mt)*.1,Ht=M.shape.bitmap.width*M.scalar,Lt=M.shape.bitmap.height*M.scalar,ce=new DOMMatrix([Math.cos(rt)*dt,Math.sin(rt)*dt,-Math.sin(rt)*wt,Math.cos(rt)*wt,M.x,M.y]);ce.multiplySelf(new DOMMatrix(M.shape.matrix));var $t=D.createPattern(g.transform(M.shape.bitmap),"no-repeat");$t.setTransform(ce),D.globalAlpha=1-O,D.fillStyle=$t,D.fillRect(M.x-Ht/2,M.y-Lt/2,Ht,Lt),D.globalAlpha=1}else if(M.shape==="circle")D.ellipse?D.ellipse(M.x,M.y,Math.abs(bt-tt)*M.ovalScalar,Math.abs(J-mt)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI):W(D,M.x,M.y,Math.abs(bt-tt)*M.ovalScalar,Math.abs(J-mt)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI);else if(M.shape==="star")for(var kt=Math.PI/2*3,re=4*M.scalar,le=8*M.scalar,Ae=M.x,Re=M.y,Ie=5,Ne=Math.PI/Ie;Ie--;)Ae=M.x+Math.cos(kt)*le,Re=M.y+Math.sin(kt)*le,D.lineTo(Ae,Re),kt+=Ne,Ae=M.x+Math.cos(kt)*re,Re=M.y+Math.sin(kt)*re,D.lineTo(Ae,Re),kt+=Ne;else D.moveTo(Math.floor(M.x),Math.floor(M.y)),D.lineTo(Math.floor(M.wobbleX),Math.floor(mt)),D.lineTo(Math.floor(bt),Math.floor(J)),D.lineTo(Math.floor(tt),Math.floor(M.wobbleY));return D.closePath(),D.fill(),M.tick<M.totalTicks}function ut(D,M,O,tt,mt){var bt=M.slice(),J=D.getContext("2d"),rt,dt,wt=d(function(Ht){function Lt(){rt=dt=null,J.clearRect(0,0,tt.width,tt.height),g.clear(),mt(),Ht()}function ce(){a&&!(tt.width===l.width&&tt.height===l.height)&&(tt.width=D.width=l.width,tt.height=D.height=l.height),!tt.width&&!tt.height&&(O(D),tt.width=D.width,tt.height=D.height),J.clearRect(0,0,tt.width,tt.height),bt=bt.filter(function($t){return q(J,$t)}),bt.length?rt=_.frame(ce):Lt()}rt=_.frame(ce),dt=Lt});return{addFettis:function(Ht){return bt=bt.concat(Ht),wt},canvas:D,promise:wt,reset:function(){rt&&_.cancel(rt),dt&&dt()}}}function gt(D,M){var O=!D,tt=!!x(M||{},"resize"),mt=!1,bt=x(M,"disableForReducedMotion",Boolean),J=c&&!!x(M||{},"useWorker"),rt=J?v():null,dt=O?B:A,wt=D&&rt?!!D.__confetti_initialized:!1,Ht=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Lt;function ce(kt,re,le){for(var Ae=x(kt,"particleCount",y),Re=x(kt,"angle",Number),Ie=x(kt,"spread",Number),Ne=x(kt,"startVelocity",Number),Ye=x(kt,"decay",Number),an=x(kt,"gravity",Number),Q=x(kt,"drift",Number),Oe=x(kt,"colors",N),Ce=x(kt,"ticks",Number),I=x(kt,"shapes"),T=x(kt,"scalar"),nt=!!x(kt,"flat"),ct=U(kt),_t=Ae,Ct=[],Ut=D.width*ct.x,vt=D.height*ct.y;_t--;)Ct.push(V({x:Ut,y:vt,angle:Re,spread:Ie,startVelocity:Ne,color:Oe[_t%Oe.length],shape:I[z(0,I.length)],ticks:Ce,decay:Ye,gravity:an,drift:Q,scalar:T,flat:nt}));return Lt?Lt.addFettis(Ct):(Lt=ut(D,Ct,dt,re,le),Lt.promise)}function $t(kt){var re=bt||x(kt,"disableForReducedMotion",Boolean),le=x(kt,"zIndex",Number);if(re&&Ht)return d(function(Ne){Ne()});O&&Lt?D=Lt.canvas:O&&!D&&(D=L(le),document.body.appendChild(D)),tt&&!wt&&dt(D);var Ae={width:D.width,height:D.height};rt&&!wt&&rt.init(D),wt=!0,rt&&(D.__confetti_initialized=!0);function Re(){if(rt){var Ne={getBoundingClientRect:function(){if(!O)return D.getBoundingClientRect()}};dt(Ne),rt.postMessage({resize:{width:Ne.width,height:Ne.height}});return}Ae.width=Ae.height=null}function Ie(){Lt=null,tt&&(mt=!1,t.removeEventListener("resize",Re)),O&&D&&(document.body.contains(D)&&document.body.removeChild(D),D=null,wt=!1)}return tt&&!mt&&(mt=!0,t.addEventListener("resize",Re,!1)),rt?rt.fire(kt,Ae,Ie):ce(kt,Ae,Ie)}return $t.reset=function(){rt&&rt.reset(),Lt&&Lt.reset()},$t}var Z;function H(){return Z||(Z=gt(null,{useWorker:!0,resize:!0})),Z}function k(D,M,O,tt,mt,bt,J){var rt=new Path2D(D),dt=new Path2D;dt.addPath(rt,new DOMMatrix(M));var wt=new Path2D;return wt.addPath(dt,new DOMMatrix([Math.cos(J)*mt,Math.sin(J)*mt,-Math.sin(J)*bt,Math.cos(J)*bt,O,tt])),wt}function it(D){if(!f)throw new Error("path confetti are not supported in this browser");var M,O;typeof D=="string"?M=D:(M=D.path,O=D.matrix);var tt=new Path2D(M),mt=document.createElement("canvas"),bt=mt.getContext("2d");if(!O){for(var J=1e3,rt=J,dt=J,wt=0,Ht=0,Lt,ce,$t=0;$t<J;$t+=2)for(var kt=0;kt<J;kt+=2)bt.isPointInPath(tt,$t,kt,"nonzero")&&(rt=Math.min(rt,$t),dt=Math.min(dt,kt),wt=Math.max(wt,$t),Ht=Math.max(Ht,kt));Lt=wt-rt,ce=Ht-dt;var re=10,le=Math.min(re/Lt,re/ce);O=[le,0,0,le,-Math.round(Lt/2+rt)*le,-Math.round(ce/2+dt)*le]}return{type:"path",path:M,matrix:O}}function yt(D){var M,O=1,tt="#000000",mt='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof D=="string"?M=D:(M=D.text,O="scalar"in D?D.scalar:O,mt="fontFamily"in D?D.fontFamily:mt,tt="color"in D?D.color:tt);var bt=10*O,J=""+bt+"px "+mt,rt=new OffscreenCanvas(bt,bt),dt=rt.getContext("2d");dt.font=J;var wt=dt.measureText(M),Ht=Math.ceil(wt.actualBoundingBoxRight+wt.actualBoundingBoxLeft),Lt=Math.ceil(wt.actualBoundingBoxAscent+wt.actualBoundingBoxDescent),ce=2,$t=wt.actualBoundingBoxLeft+ce,kt=wt.actualBoundingBoxAscent+ce;Ht+=ce+ce,Lt+=ce+ce,rt=new OffscreenCanvas(Ht,Lt),dt=rt.getContext("2d"),dt.font=J,dt.fillStyle=tt,dt.fillText(M,$t,kt);var re=1/O;return{type:"bitmap",bitmap:rt.transferToImageBitmap(),matrix:[re,0,0,re,-Ht*re/2,-Lt*re/2]}}i.exports=function(){return H().apply(this,arguments)},i.exports.reset=function(){H().reset()},i.exports.create=gt,i.exports.shapeFromPath=it,i.exports.shapeFromText=yt})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),mp,!1);const GM=mp.exports;mp.exports.create;const U_={7408:{icType:"7408",name:"AND Gate (IC 7408)",inputNames:["A","B"],outputName:"Y",rows:[{inputs:{A:0,B:0},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:0,B:1},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:1,B:0},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:1,B:1},expectedOutput:1,observedOutput:null,verified:!1}]},7400:{icType:"7400",name:"NAND Gate (IC 7400)",inputNames:["A","B"],outputName:"Y",rows:[{inputs:{A:0,B:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:0,B:1},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:1},expectedOutput:0,observedOutput:null,verified:!1}]},7432:{icType:"7432",name:"OR Gate (IC 7432)",inputNames:["A","B"],outputName:"Y",rows:[{inputs:{A:0,B:0},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:0,B:1},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:1},expectedOutput:1,observedOutput:null,verified:!1}]},7402:{icType:"7402",name:"NOR Gate (IC 7402)",inputNames:["A","B"],outputName:"Y",rows:[{inputs:{A:0,B:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:0,B:1},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:1,B:0},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:1,B:1},expectedOutput:0,observedOutput:null,verified:!1}]},7486:{icType:"7486",name:"XOR Gate (IC 7486)",inputNames:["A","B"],outputName:"Y",rows:[{inputs:{A:0,B:0},expectedOutput:0,observedOutput:null,verified:!1},{inputs:{A:0,B:1},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1,B:1},expectedOutput:0,observedOutput:null,verified:!1}]},7404:{icType:"7404",name:"NOT Gate (IC 7404)",inputNames:["A"],outputName:"Y",rows:[{inputs:{A:0},expectedOutput:1,observedOutput:null,verified:!1},{inputs:{A:1},expectedOutput:0,observedOutput:null,verified:!1}]}};function VM(r){return[{stepNumber:1,title:"Select Component",instruction:`Select IC ${r} from the Component Library on the left panel.`,hint:"Click the IC card in the sidebar or drag it onto the breadboard.",isCompleted:t=>t.ics.some(i=>i.type===r)},{stepNumber:2,title:"Place IC across Center Gap",instruction:`Ensure IC ${r} straddles the center divider gap of the breadboard.`,hint:"The pins must sit cleanly on top row F and bottom row J.",isCompleted:t=>t.ics.some(i=>i.type===r)},{stepNumber:3,title:"Connect +5V Power to Pin 14",instruction:`Run a RED wire from the +5V power rail to Pin 14 of IC ${r}.`,hint:"Pin 14 is the top-left pin of the IC (Row F, starting column).",isCompleted:(t,i)=>{var l;const a=t.ics.find(c=>c.type===r);return!a||!i?!1:((l=i.icPowerStatus[a.id])==null?void 0:l.vccOk)||!1}},{stepNumber:4,title:"Connect Ground to Pin 7",instruction:`Run a BLACK wire from the GND rail to Pin 7 of IC ${r}.`,hint:"Pin 7 is the bottom-right pin of the IC (Row J, column + 6).",isCompleted:(t,i)=>{var l;const a=t.ics.find(c=>c.type===r);return!a||!i?!1:((l=i.icPowerStatus[a.id])==null?void 0:l.gndOk)||!1}},{stepNumber:5,title:"Connect Input Switches",instruction:"Connect Switch A to Pin 1 (and Switch B to Pin 2 for 2-input gates).",hint:"Use Yellow wire for Input A and Green wire for Input B.",isCompleted:t=>t.switches.length>0&&t.wires.length>=4},{stepNumber:6,title:"Connect Output LED & Resistor",instruction:"Wire Gate 1 Output (Pin 3) through a 330Ω Resistor to the LED Anode, and LED Cathode to GND.",hint:"The resistor limits current to protect the LED.",isCompleted:t=>t.leds.length>0&&t.resistors.length>0},{stepNumber:7,title:"Power ON & Verify Truth Table",instruction:"Turn on the Power Supply and toggle inputs to measure and verify all rows in the Truth Table!",hint:"Click the POWER button and toggle switches A and B.",isCompleted:t=>t.powerSupplyOn}]}function L_(r){return{powerSupplyOn:!0,powerSupplyVoltage:5,ics:[{id:`ic_preset_${r}`,type:r,startCol:10}],switches:[{id:"sw_A",label:"Input A",state:"LOW",outputHoleKey:"terminal_2_J"},{id:"sw_B",label:"Input B",state:"LOW",outputHoleKey:"terminal_4_J"}],leds:[{id:"led_out",color:"red",anodeHoleKey:"terminal_22_J",cathodeHoleKey:"rail_BOTTOM_NEG_22",isOn:!1}],resistors:[{id:"res_out",resistance:330,fromHoleKey:"terminal_12_A",toHoleKey:"terminal_22_J"}],wires:[{id:"w_supply_vcc",fromHoleKey:"supply_VCC",toHoleKey:"rail_TOP_POS_1",color:"red"},{id:"w_supply_gnd",fromHoleKey:"supply_GND",toHoleKey:"rail_BOTTOM_NEG_1",color:"black"},{id:"w_vcc",fromHoleKey:"terminal_10_F",toHoleKey:"rail_TOP_POS_10",color:"red"},{id:"w_gnd",fromHoleKey:"terminal_16_A",toHoleKey:"rail_BOTTOM_NEG_16",color:"black"},{id:"w_inA",fromHoleKey:"terminal_2_J",toHoleKey:"terminal_10_A",color:"yellow"},{id:"w_inB",fromHoleKey:"terminal_4_J",toHoleKey:"terminal_11_A",color:"green"}]}}const kM=({icType:r,circuitState:t,simResult:i})=>{var v,b;const a=U_[r]||U_[7408],[l,c]=We.useState({}),f=((v=t.switches.find(E=>E.label.includes("A")))==null?void 0:v.state)==="HIGH"?1:0,p=((b=t.switches.find(E=>E.label.includes("B")))==null?void 0:b.state)==="HIGH"?1:0,d=t.leds.some(E=>{var w;return(w=i==null?void 0:i.ledStates[E.id])==null?void 0:w.isOn})?1:0;We.useEffect(()=>{c({})},[r]),We.useEffect(()=>{a.rows.forEach((E,w)=>{const x=E.inputs.A===f,y=E.inputs.B===void 0||E.inputs.B===p;x&&y&&d===E.expectedOutput&&c(z=>z[w]?z:{...z,[w]:!0})})},[f,p,d,r]);const g=a.rows.every((E,w)=>l[w]),_=()=>{GM({particleCount:100,spread:70,origin:{y:.6}})};return We.useEffect(()=>{g&&_()},[g]),G.jsxs("div",{className:"bg-[#12151B] border border-white/5 rounded-xl p-4 text-slate-200 shadow-2xl space-y-3 w-72 shrink-0",children:[G.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-2",children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]",children:"Live Truth Table"}),g&&G.jsxs("span",{className:"flex items-center gap-1 text-[9px] font-mono font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 uppercase",children:[G.jsx($S,{className:"w-3 h-3"}),G.jsx("span",{children:"VERIFIED"})]})]}),G.jsxs("table",{className:"w-full text-left border-collapse",children:[G.jsx("thead",{children:G.jsxs("tr",{className:"border-b border-white/5",children:[a.inputNames.map(E=>G.jsx("th",{className:"py-2 text-[10px] font-mono text-blue-400 uppercase",children:E},E)),G.jsxs("th",{className:"py-2 text-[10px] font-mono text-white uppercase",children:[a.outputName," (Out)"]}),G.jsx("th",{className:"py-2 text-[10px] font-mono text-slate-500 uppercase text-right",children:"Status"})]})}),G.jsx("tbody",{className:"text-xs font-mono",children:a.rows.map((E,w)=>{const x=E.inputs.A===f&&(E.inputs.B===void 0||E.inputs.B===p),y=l[w];return G.jsxs("tr",{className:`transition-colors ${x?"bg-blue-500/10 border-l-2 border-blue-500 text-blue-100 font-bold":"text-slate-500 opacity-60 hover:opacity-100"}`,children:[G.jsx("td",{className:"py-2 pl-2",children:E.inputs.A}),E.inputs.B!==void 0&&G.jsx("td",{className:"py-2",children:E.inputs.B}),G.jsx("td",{className:"py-2 font-bold text-white",children:E.expectedOutput}),G.jsx("td",{className:"py-2 text-right",children:y?G.jsx(rM,{className:"w-3.5 h-3.5 text-green-400 inline"}):G.jsx(lM,{className:"w-3.5 h-3.5 text-slate-600 inline"})})]},w)})})]}),G.jsxs("div",{className:"text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1 border-t border-white/5",children:[G.jsx("span",{children:"Verified Rows:"}),G.jsxs("span",{className:"font-bold text-slate-300",children:[Object.keys(l).length," / ",a.rows.length]})]}),g&&G.jsxs("button",{onClick:_,className:"w-full py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase rounded transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20",children:[G.jsx(qv,{className:"w-3.5 h-3.5"}),G.jsx("span",{children:"Celebrate Victory!"})]})]})},XM=({icType:r,circuitState:t,simResult:i})=>{const a=VM(r),[l,c]=We.useState(0),f=a.filter(m=>m.isCompleted(t,i)).length,p=Math.round(f/a.length*100);return G.jsxs("div",{className:"bg-[#12151B] border border-white/5 rounded-xl p-4 text-slate-200 shadow-2xl space-y-3 w-72 shrink-0",children:[G.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-2",children:[G.jsx("h2",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]",children:"Guided Instructions"}),G.jsxs("span",{className:"text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20",children:[p,"%"]})]}),G.jsx("div",{className:"w-full bg-white/5 rounded-full h-1 overflow-hidden",children:G.jsx("div",{className:"bg-blue-500 h-1 rounded-full transition-all duration-500",style:{width:`${p}%`}})}),G.jsx("div",{className:"space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800",children:a.map((m,d)=>{const g=m.isCompleted(t,i),_=d===l;return G.jsx("div",{onClick:()=>c(d),className:`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${g?"bg-white/5 border-white/5 text-slate-300":_?"bg-blue-500/10 border-blue-500/40 text-white font-medium":"bg-white/5 border-white/5 text-slate-500 opacity-60 hover:opacity-100"}`,children:G.jsxs("div",{className:"flex items-start gap-3",children:[G.jsx("div",{className:`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${g?"bg-green-500/20 text-green-500 border-green-500/30":_?"bg-blue-500 text-white border-blue-500/30":"bg-white/10 text-white/50 border-white/10"}`,children:m.stepNumber}),G.jsxs("div",{className:"flex-1",children:[G.jsxs("div",{className:"flex items-center justify-between",children:[G.jsx("span",{className:"font-semibold text-slate-200 text-[11px]",children:m.title}),G.jsx(nM,{className:`w-3 h-3 transition-transform ${_?"rotate-90 text-blue-400":"text-slate-600"}`})]}),_&&G.jsxs("div",{className:"mt-2 space-y-2 border-t border-white/5 pt-2 text-[11px] text-slate-300",children:[G.jsx("p",{className:"leading-relaxed",children:m.instruction}),G.jsxs("div",{className:"flex items-start gap-1.5 text-[10px] text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20",children:[G.jsx(vM,{className:"w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"}),G.jsx("span",{children:m.hint})]})]})]})]})},m.stepNumber)})})]})},WM=({diagnostics:r,isShortCircuit:t})=>r.length===0&&!t?null:G.jsxs("div",{className:"fixed bottom-12 left-80 right-80 max-w-lg mx-auto z-20 space-y-2 pointer-events-none",children:[t&&G.jsxs("div",{className:"pointer-events-auto p-3 bg-red-500/10 border border-red-500/30 backdrop-blur-md rounded-lg shadow-2xl flex items-start gap-2.5 animate-bounce",children:[G.jsx(wM,{className:"w-5 h-5 text-red-400 shrink-0 mt-0.5"}),G.jsxs("div",{children:[G.jsx("p",{className:"text-[10px] font-bold text-red-400 uppercase mb-0.5",children:"SHORT CIRCUIT DETECTED!"}),G.jsx("p",{className:"text-[11px] text-red-200/80 leading-relaxed italic",children:"+5V power supply is connected directly to Ground! Turn off power immediately and disconnect the shorting wire."})]})]}),r.map(i=>G.jsxs("div",{className:`pointer-events-auto backdrop-blur-md border rounded-lg p-3 text-xs shadow-2xl flex items-start gap-2.5 transition-all ${i.severity==="error"?"bg-red-500/10 border-red-500/20 text-red-200":i.severity==="warning"?"bg-amber-500/10 border-amber-500/20 text-amber-200":"bg-blue-500/10 border-blue-500/20 text-blue-200"}`,children:[i.severity==="error"?G.jsx(D_,{className:"w-4 h-4 text-red-400 shrink-0 mt-0.5"}):i.severity==="warning"?G.jsx(D_,{className:"w-4 h-4 text-amber-400 shrink-0 mt-0.5"}):G.jsx(gM,{className:"w-4 h-4 text-blue-400 shrink-0 mt-0.5"}),G.jsxs("div",{children:[G.jsx("p",{className:"text-[10px] font-bold text-red-400 uppercase mb-0.5",children:i.title}),G.jsx("p",{className:"text-[11px] text-red-200/70 leading-relaxed italic",children:i.message})]})]},i.id))]}),YM=({isOpen:r,onClose:t,circuitState:i,simResult:a,isARSupported:l,onLaunchWebXR:c,onToggleSwitchState:f,activeICType:p})=>{if(!r)return null;const m=i.leds.some(d=>{var g;return(g=a==null?void 0:a.ledStates[d.id])==null?void 0:g.isOn});return G.jsx("div",{className:"fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4",children:G.jsxs("div",{className:"bg-[#12151B] border border-white/10 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl space-y-6 relative overflow-hidden",children:[G.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"}),G.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-4",children:[G.jsxs("div",{className:"flex items-center gap-3",children:[G.jsx("div",{className:"p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg",children:G.jsx(Yv,{className:"w-5 h-5"})}),G.jsxs("div",{children:[G.jsx("h2",{className:"text-base font-bold uppercase tracking-tight text-white",children:"Augmented Reality (AR) View"}),G.jsx("p",{className:"text-xs text-slate-400",children:"Place and inspect your virtual circuit in physical space"})]})]}),G.jsx("button",{onClick:t,className:"p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all",children:G.jsx(PM,{className:"w-5 h-5"})})]}),G.jsxs("div",{className:"bg-[#0A0B0E] rounded-xl p-4 border border-white/5 space-y-3",children:[G.jsxs("div",{className:"flex items-center justify-between text-xs font-mono text-slate-400",children:[G.jsxs("span",{children:["ACTIVE IC: ",G.jsxs("strong",{className:"text-blue-400 font-bold",children:["IC ",p]})]}),G.jsxs("span",{children:["SIMULATED OUTPUT: ",G.jsx("strong",{className:m?"text-green-400 font-bold":"text-slate-500",children:m?"HIGH (LED ON)":"LOW (LED OFF)"})]})]}),G.jsxs("div",{className:"flex items-center justify-between bg-[#161920] p-3 rounded-lg border border-white/5",children:[G.jsx("span",{className:"text-xs font-bold text-white",children:"Live Input Switch Controls:"}),G.jsx("div",{className:"flex items-center gap-2",children:i.switches.map(d=>G.jsxs("button",{onClick:()=>f(d.id),className:`px-3 py-1 rounded font-mono text-xs font-bold transition-all uppercase ${d.state==="HIGH"?"bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50":"bg-white/5 text-slate-400 hover:text-white border border-white/10"}`,children:[d.label,": ",d.state==="HIGH"?"1 (HIGH)":"0 (LOW)"]},d.id))})]})]}),l?G.jsxs("div",{className:"bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 text-center space-y-4",children:[G.jsx(qv,{className:"w-8 h-8 text-blue-400 mx-auto animate-pulse"}),G.jsxs("div",{children:[G.jsx("h3",{className:"font-bold text-sm text-blue-300 uppercase tracking-wider",children:"WebXR Immersive AR Available!"}),G.jsx("p",{className:"text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed",children:"Point your mobile/VR camera at a flat surface (table top) to position the 3D virtual breadboard and test logic gate operation live in AR."})]}),G.jsx("button",{onClick:c,className:"px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all border border-blue-400/50",children:"LAUNCH WebXR CAMERA AR"})]}):G.jsxs("div",{className:"bg-[#0A0B0E] border border-white/5 rounded-xl p-4 space-y-3",children:[G.jsxs("div",{className:"flex items-start gap-3 text-amber-400",children:[G.jsx(aM,{className:"w-5 h-5 shrink-0 mt-0.5"}),G.jsxs("div",{className:"text-xs space-y-1",children:[G.jsx("span",{className:"font-bold text-white block",children:"WebXR Hardware AR Notice:"}),G.jsxs("p",{className:"text-slate-400 leading-relaxed",children:["WebXR camera pass-through is not detected in this browser/container session. The system is operating in ",G.jsx("strong",{className:"text-blue-400",children:"Interactive 3D AR Table View"})," mode."]})]})]}),G.jsxs("div",{className:"bg-[#161920] p-3 rounded-lg border border-white/5 text-xs text-slate-300 space-y-1.5",children:[G.jsxs("div",{className:"flex items-center gap-2 text-blue-400 font-bold",children:[G.jsx(pM,{className:"w-4 h-4"}),G.jsx("span",{children:"Real-Time 3D AR Simulation Active"})]}),G.jsx("p",{className:"text-slate-400 leading-relaxed",children:"You can rotate, orbit, and zoom around the workbench in the main laboratory screen while toggling switches live to observe real circuit logic updates!"})]})]}),G.jsx("div",{className:"flex justify-end pt-2",children:G.jsx("button",{onClick:t,className:"px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10",children:"Return to 3D Workbench"})})]})})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gp="185",Qr={ROTATE:0,DOLLY:1,PAN:2},Jr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},qM=0,O_=1,jM=2,iu=1,Zv=2,cl=3,Ss=0,ai=1,Ua=2,Oa=0,$r=1,P_=2,I_=3,B_=4,ZM=5,Js=100,KM=101,JM=102,QM=103,$M=104,tb=200,eb=201,nb=202,ib=203,bd=204,Ed=205,ab=206,sb=207,rb=208,ob=209,lb=210,cb=211,ub=212,fb=213,hb=214,Td=0,Ad=1,wd=2,no=3,Cd=4,Rd=5,Nd=6,Dd=7,Kv=0,db=1,pb=2,ea=0,Jv=1,Qv=2,$v=3,_p=4,tx=5,ex=6,nx=7,ix=300,nr=301,io=302,Fh=303,Hh=304,yu=306,Ud=1e3,La=1001,Ld=1002,Bn=1003,mb=1004,Dc=1005,kn=1006,Gh=1007,tr=1008,vi=1009,ax=1010,sx=1011,pl=1012,vp=1013,aa=1014,$i=1015,Ia=1016,xp=1017,yp=1018,ml=1020,rx=35902,ox=35899,lx=1021,cx=1022,Gi=1023,Ba=1026,er=1027,ux=1028,Sp=1029,ir=1030,Mp=1031,bp=1033,au=33776,su=33777,ru=33778,ou=33779,Od=35840,Pd=35841,Id=35842,Bd=35843,zd=36196,Fd=37492,Hd=37496,Gd=37488,Vd=37489,fu=37490,kd=37491,Xd=37808,Wd=37809,Yd=37810,qd=37811,jd=37812,Zd=37813,Kd=37814,Jd=37815,Qd=37816,$d=37817,tp=37818,ep=37819,np=37820,ip=37821,ap=36492,sp=36494,rp=36495,op=36283,lp=36284,hu=36285,cp=36286,gb=3200,up=0,_b=1,xs="",Ri="srgb",du="srgb-linear",pu="linear",Xe="srgb",Ir=7680,z_=519,vb=512,xb=513,yb=514,Ep=515,Sb=516,Mb=517,Tp=518,bb=519,F_=35044,H_="300 es",ta=2e3,gl=2001;function Eb(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function mu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Tb(){const r=mu("canvas");return r.style.display="block",r}const G_={};function V_(...r){const t="THREE."+r.shift();console.log(t,...r)}function fx(r){const t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function oe(...r){r=fx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...r)}}function we(...r){r=fx(r);const t="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...r)}}function to(...r){const t=r.join(" ");t in G_||(G_[t]=!0,oe(...r))}function Ab(r,t,i){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:a()}}setTimeout(c,i)})}const wb={[Td]:Ad,[wd]:Nd,[Cd]:Dd,[no]:Rd,[Ad]:Td,[Nd]:wd,[Dd]:Cd,[Rd]:no};class Es{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(i)===-1&&a[t].push(i)}hasEventListener(t,i){const a=this._listeners;return a===void 0?!1:a[t]!==void 0&&a[t].indexOf(i)!==-1}removeEventListener(t,i){const a=this._listeners;if(a===void 0)return;const l=a[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const a=i[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lu=Math.PI/180,gu=180/Math.PI;function _l(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Hn[r&255]+Hn[r>>8&255]+Hn[r>>16&255]+Hn[r>>24&255]+"-"+Hn[t&255]+Hn[t>>8&255]+"-"+Hn[t>>16&15|64]+Hn[t>>24&255]+"-"+Hn[i&63|128]+Hn[i>>8&255]+"-"+Hn[i>>16&255]+Hn[i>>24&255]+Hn[a&255]+Hn[a>>8&255]+Hn[a>>16&255]+Hn[a>>24&255]).toLowerCase()}function _e(r,t,i){return Math.max(t,Math.min(i,r))}function Cb(r,t){return(r%t+t)%t}function Vh(r,t,i){return(1-i)*r+i*t}function el(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ei(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Rb={DEG2RAD:lu},Bp=class Bp{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,a=this.y,l=t.elements;return this.x=l[0]*i+l[3]*a+l[6],this.y=l[1]*i+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(_e(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const a=this.dot(t)/i;return Math.acos(_e(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,a=this.y-t.y;return i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const a=Math.cos(i),l=Math.sin(i),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Bp.prototype.isVector2=!0;let qt=Bp;class Ms{constructor(t=0,i=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=a,this._w=l}static slerpFlat(t,i,a,l,c,f,p){let m=a[l+0],d=a[l+1],g=a[l+2],_=a[l+3],v=c[f+0],b=c[f+1],E=c[f+2],w=c[f+3];if(_!==w||m!==v||d!==b||g!==E){let x=m*v+d*b+g*E+_*w;x<0&&(v=-v,b=-b,E=-E,w=-w,x=-x);let y=1-p;if(x<.9995){const z=Math.acos(x),F=Math.sin(z);y=Math.sin(y*z)/F,p=Math.sin(p*z)/F,m=m*y+v*p,d=d*y+b*p,g=g*y+E*p,_=_*y+w*p}else{m=m*y+v*p,d=d*y+b*p,g=g*y+E*p,_=_*y+w*p;const z=1/Math.sqrt(m*m+d*d+g*g+_*_);m*=z,d*=z,g*=z,_*=z}}t[i]=m,t[i+1]=d,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,a,l,c,f){const p=a[l],m=a[l+1],d=a[l+2],g=a[l+3],_=c[f],v=c[f+1],b=c[f+2],E=c[f+3];return t[i]=p*E+g*_+m*b-d*v,t[i+1]=m*E+g*v+d*_-p*b,t[i+2]=d*E+g*b+p*v-m*_,t[i+3]=g*E-p*_-m*v-d*b,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,a,l){return this._x=t,this._y=i,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const a=t._x,l=t._y,c=t._z,f=t._order,p=Math.cos,m=Math.sin,d=p(a/2),g=p(l/2),_=p(c/2),v=m(a/2),b=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=v*g*_+d*b*E,this._y=d*b*_-v*g*E,this._z=d*g*E+v*b*_,this._w=d*g*_-v*b*E;break;case"YXZ":this._x=v*g*_+d*b*E,this._y=d*b*_-v*g*E,this._z=d*g*E-v*b*_,this._w=d*g*_+v*b*E;break;case"ZXY":this._x=v*g*_-d*b*E,this._y=d*b*_+v*g*E,this._z=d*g*E+v*b*_,this._w=d*g*_-v*b*E;break;case"ZYX":this._x=v*g*_-d*b*E,this._y=d*b*_+v*g*E,this._z=d*g*E-v*b*_,this._w=d*g*_+v*b*E;break;case"YZX":this._x=v*g*_+d*b*E,this._y=d*b*_+v*g*E,this._z=d*g*E-v*b*_,this._w=d*g*_-v*b*E;break;case"XZY":this._x=v*g*_-d*b*E,this._y=d*b*_-v*g*E,this._z=d*g*E+v*b*_,this._w=d*g*_+v*b*E;break;default:oe("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const a=i/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,a=i[0],l=i[4],c=i[8],f=i[1],p=i[5],m=i[9],d=i[2],g=i[6],_=i[10],v=a+p+_;if(v>0){const b=.5/Math.sqrt(v+1);this._w=.25/b,this._x=(g-m)*b,this._y=(c-d)*b,this._z=(f-l)*b}else if(a>p&&a>_){const b=2*Math.sqrt(1+a-p-_);this._w=(g-m)/b,this._x=.25*b,this._y=(l+f)/b,this._z=(c+d)/b}else if(p>_){const b=2*Math.sqrt(1+p-a-_);this._w=(c-d)/b,this._x=(l+f)/b,this._y=.25*b,this._z=(m+g)/b}else{const b=2*Math.sqrt(1+_-a-p);this._w=(f-l)/b,this._x=(c+d)/b,this._y=(m+g)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let a=t.dot(i)+1;return a<1e-8?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,i){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,i/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const a=t._x,l=t._y,c=t._z,f=t._w,p=i._x,m=i._y,d=i._z,g=i._w;return this._x=a*g+f*p+l*d-c*m,this._y=l*g+f*m+c*p-a*d,this._z=c*g+f*d+a*m-l*p,this._w=f*g-a*p-l*m-c*d,this._onChangeCallback(),this}slerp(t,i){let a=t._x,l=t._y,c=t._z,f=t._w,p=this.dot(t);p<0&&(a=-a,l=-l,c=-c,f=-f,p=-p);let m=1-i;if(p<.9995){const d=Math.acos(p),g=Math.sin(d);m=Math.sin(m*d)/g,i=Math.sin(i*d)/g,this._x=this._x*m+a*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+a*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(t,i,a){return this.copy(t).slerp(i,a)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const zp=class zp{constructor(t=0,i=0,a=0){this.x=t,this.y=i,this.z=a}set(t,i,a){return a===void 0&&(a=this.z),this.x=t,this.y=i,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(k_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(k_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*a+c[6]*l,this.y=c[1]*i+c[4]*a+c[7]*l,this.z=c[2]*i+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*i+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const i=this.x,a=this.y,l=this.z,c=t.x,f=t.y,p=t.z,m=t.w,d=2*(f*l-p*a),g=2*(p*i-c*l),_=2*(c*a-f*i);return this.x=i+m*d+f*_-p*g,this.y=a+m*g+p*d-c*_,this.z=l+m*_+c*g-f*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*a+c[8]*l,this.y=c[1]*i+c[5]*a+c[9]*l,this.z=c[2]*i+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(_e(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this.z=t.z+(i.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const a=t.x,l=t.y,c=t.z,f=i.x,p=i.y,m=i.z;return this.x=l*m-c*p,this.y=c*f-a*m,this.z=a*p-l*f,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const a=t.dot(this)/i;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return kh.copy(this).projectOnVector(t),this.sub(kh)}reflect(t){return this.sub(kh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const a=this.dot(t)/i;return Math.acos(_e(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return i*i+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,a){const l=Math.sin(i)*t;return this.x=l*Math.sin(a),this.y=Math.cos(i)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,a){return this.x=t*Math.sin(i),this.y=a,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=a,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,a=Math.sqrt(1-i*i);return this.x=a*Math.cos(t),this.y=i,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};zp.prototype.isVector3=!0;let Y=zp;const kh=new Y,k_=new Ms,Fp=class Fp{constructor(t,i,a,l,c,f,p,m,d){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,a,l,c,f,p,m,d)}set(t,i,a,l,c,f,p,m,d){const g=this.elements;return g[0]=t,g[1]=l,g[2]=p,g[3]=i,g[4]=c,g[5]=m,g[6]=a,g[7]=f,g[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,a=t.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],this}extractBasis(t,i,a){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const a=t.elements,l=i.elements,c=this.elements,f=a[0],p=a[3],m=a[6],d=a[1],g=a[4],_=a[7],v=a[2],b=a[5],E=a[8],w=l[0],x=l[3],y=l[6],z=l[1],F=l[4],N=l[7],P=l[2],U=l[5],B=l[8];return c[0]=f*w+p*z+m*P,c[3]=f*x+p*F+m*U,c[6]=f*y+p*N+m*B,c[1]=d*w+g*z+_*P,c[4]=d*x+g*F+_*U,c[7]=d*y+g*N+_*B,c[2]=v*w+b*z+E*P,c[5]=v*x+b*F+E*U,c[8]=v*y+b*N+E*B,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8];return i*f*g-i*p*d-a*c*g+a*p*m+l*c*d-l*f*m}invert(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8],_=g*f-p*d,v=p*m-g*c,b=d*c-f*m,E=i*_+a*v+l*b;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=_*w,t[1]=(l*d-g*a)*w,t[2]=(p*a-l*f)*w,t[3]=v*w,t[4]=(g*i-l*m)*w,t[5]=(l*c-p*i)*w,t[6]=b*w,t[7]=(a*m-d*i)*w,t[8]=(f*i-a*c)*w,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,a,l,c,f,p){const m=Math.cos(c),d=Math.sin(c);return this.set(a*m,a*d,-a*(m*f+d*p)+f+t,-l*d,l*m,-l*(-d*f+m*p)+p+i,0,0,1),this}scale(t,i){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Xh.makeScale(t,i)),this}rotate(t){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Xh.makeRotation(-t)),this}translate(t,i){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Xh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,-a,0,a,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,a=t.elements;for(let l=0;l<9;l++)if(i[l]!==a[l])return!1;return!0}fromArray(t,i=0){for(let a=0;a<9;a++)this.elements[a]=t[a+i];return this}toArray(t=[],i=0){const a=this.elements;return t[i]=a[0],t[i+1]=a[1],t[i+2]=a[2],t[i+3]=a[3],t[i+4]=a[4],t[i+5]=a[5],t[i+6]=a[6],t[i+7]=a[7],t[i+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Fp.prototype.isMatrix3=!0;let he=Fp;const Xh=new he,X_=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),W_=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nb(){const r={enabled:!0,workingColorSpace:du,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Xe&&(l.r=Pa(l.r),l.g=Pa(l.g),l.b=Pa(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Xe&&(l.r=eo(l.r),l.g=eo(l.g),l.b=eo(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===xs?pu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[du]:{primaries:t,whitePoint:a,transfer:pu,toXYZ:X_,fromXYZ:W_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ri},outputColorSpaceConfig:{drawingBufferColorSpace:Ri}},[Ri]:{primaries:t,whitePoint:a,transfer:Xe,toXYZ:X_,fromXYZ:W_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ri}}}),r}const Te=Nb();function Pa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function eo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Br;class Db{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let a;if(t instanceof HTMLCanvasElement)a=t;else{Br===void 0&&(Br=mu("canvas")),Br.width=t.width,Br.height=t.height;const l=Br.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),a=Br}return a.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=mu("canvas");i.width=t.width,i.height=t.height;const a=i.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Pa(c[f]/255)*255;return a.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let a=0;a<i.length;a++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[a]=Math.floor(Pa(i[a]/255)*255):i[a]=Pa(i[a]);return{data:i,width:t.width,height:t.height}}else return oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ub=0;class Ap{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ub++}),this.uuid=_l(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayWidth,i.displayHeight,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,p=l.length;f<p;f++)l[f].isDataTexture?c.push(Wh(l[f].image)):c.push(Wh(l[f]))}else c=Wh(l);a.url=c}return i||(t.images[this.uuid]=a),a}}function Wh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Db.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(oe("Texture: Unable to serialize Texture."),{})}let Lb=0;const Yh=new Y;class Xn extends Es{constructor(t=Xn.DEFAULT_IMAGE,i=Xn.DEFAULT_MAPPING,a=La,l=La,c=kn,f=tr,p=Gi,m=vi,d=Xn.DEFAULT_ANISOTROPY,g=xs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lb++}),this.uuid=_l(),this.name="",this.source=new Ap(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=d,this.format=p,this.internalFormat=null,this.type=m,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yh).x}get height(){return this.source.getSize(Yh).y}get depth(){return this.source.getSize(Yh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const a=t[i];if(a===void 0){oe(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){oe(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&a&&l.isVector2&&a.isVector2||l&&a&&l.isVector3&&a.isVector3||l&&a&&l.isMatrix3&&a.isMatrix3?l.copy(a):this[i]=a}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),i||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ix)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ud:t.x=t.x-Math.floor(t.x);break;case La:t.x=t.x<0?0:1;break;case Ld:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ud:t.y=t.y-Math.floor(t.y);break;case La:t.y=t.y<0?0:1;break;case Ld:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xn.DEFAULT_IMAGE=null;Xn.DEFAULT_MAPPING=ix;Xn.DEFAULT_ANISOTROPY=1;const Hp=class Hp{constructor(t=0,i=0,a=0,l=1){this.x=t,this.y=i,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,a,l){return this.x=t,this.y=i,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*i+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,a,l,c;const m=t.elements,d=m[0],g=m[4],_=m[8],v=m[1],b=m[5],E=m[9],w=m[2],x=m[6],y=m[10];if(Math.abs(g-v)<.01&&Math.abs(_-w)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+w)<.1&&Math.abs(E+x)<.1&&Math.abs(d+b+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const F=(d+1)/2,N=(b+1)/2,P=(y+1)/2,U=(g+v)/4,B=(_+w)/4,A=(E+x)/4;return F>N&&F>P?F<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(F),l=U/a,c=B/a):N>P?N<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(N),a=U/l,c=A/l):P<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(P),a=B/c,l=A/c),this.set(a,l,c,i),this}let z=Math.sqrt((x-E)*(x-E)+(_-w)*(_-w)+(v-g)*(v-g));return Math.abs(z)<.001&&(z=1),this.x=(x-E)/z,this.y=(_-w)/z,this.z=(v-g)/z,this.w=Math.acos((d+b+y-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this.w=_e(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this.w=_e(this.w,t,i),this}clampLength(t,i){const a=this.length();return this.divideScalar(a||1).multiplyScalar(_e(a,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,a){return this.x=t.x+(i.x-t.x)*a,this.y=t.y+(i.y-t.y)*a,this.z=t.z+(i.z-t.z)*a,this.w=t.w+(i.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hp.prototype.isVector4=!0;let cn=Hp;class Ob extends Es{constructor(t=1,i=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},a),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=a.depth,this.scissor=new cn(0,0,t,i),this.scissorTest=!1,this.viewport=new cn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:a.depth},c=new Xn(l),f=a.count;for(let p=0;p<f;p++)this.textures[p]=c.clone(),this.textures[p].isRenderTargetTexture=!0,this.textures[p].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview,this.useArrayDepthTexture=a.useArrayDepthTexture}_setTextureOptions(t={}){const i={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,a=1){if(this.width!==t||this.height!==i||this.depth!==a){this.width=t,this.height=i,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=a,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,a=t.textures.length;i<a;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new Ap(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class na extends Ob{constructor(t=1,i=1,a={}){super(t,i,a),this.isWebGLRenderTarget=!0}}class hx extends Xn{constructor(t=null,i=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:a,depth:l},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pb extends Xn{constructor(t=null,i=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:a,depth:l},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xu=class xu{constructor(t,i,a,l,c,f,p,m,d,g,_,v,b,E,w,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,a,l,c,f,p,m,d,g,_,v,b,E,w,x)}set(t,i,a,l,c,f,p,m,d,g,_,v,b,E,w,x){const y=this.elements;return y[0]=t,y[4]=i,y[8]=a,y[12]=l,y[1]=c,y[5]=f,y[9]=p,y[13]=m,y[2]=d,y[6]=g,y[10]=_,y[14]=v,y[3]=b,y[7]=E,y[11]=w,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xu().fromArray(this.elements)}copy(t){const i=this.elements,a=t.elements;return i[0]=a[0],i[1]=a[1],i[2]=a[2],i[3]=a[3],i[4]=a[4],i[5]=a[5],i[6]=a[6],i[7]=a[7],i[8]=a[8],i[9]=a[9],i[10]=a[10],i[11]=a[11],i[12]=a[12],i[13]=a[13],i[14]=a[14],i[15]=a[15],this}copyPosition(t){const i=this.elements,a=t.elements;return i[12]=a[12],i[13]=a[13],i[14]=a[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,a){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),a.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(t,i,a){return this.set(t.x,i.x,a.x,0,t.y,i.y,a.y,0,t.z,i.z,a.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const i=this.elements,a=t.elements,l=1/zr.setFromMatrixColumn(t,0).length(),c=1/zr.setFromMatrixColumn(t,1).length(),f=1/zr.setFromMatrixColumn(t,2).length();return i[0]=a[0]*l,i[1]=a[1]*l,i[2]=a[2]*l,i[3]=0,i[4]=a[4]*c,i[5]=a[5]*c,i[6]=a[6]*c,i[7]=0,i[8]=a[8]*f,i[9]=a[9]*f,i[10]=a[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),p=Math.sin(a),m=Math.cos(l),d=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const v=f*g,b=f*_,E=p*g,w=p*_;i[0]=m*g,i[4]=-m*_,i[8]=d,i[1]=b+E*d,i[5]=v-w*d,i[9]=-p*m,i[2]=w-v*d,i[6]=E+b*d,i[10]=f*m}else if(t.order==="YXZ"){const v=m*g,b=m*_,E=d*g,w=d*_;i[0]=v+w*p,i[4]=E*p-b,i[8]=f*d,i[1]=f*_,i[5]=f*g,i[9]=-p,i[2]=b*p-E,i[6]=w+v*p,i[10]=f*m}else if(t.order==="ZXY"){const v=m*g,b=m*_,E=d*g,w=d*_;i[0]=v-w*p,i[4]=-f*_,i[8]=E+b*p,i[1]=b+E*p,i[5]=f*g,i[9]=w-v*p,i[2]=-f*d,i[6]=p,i[10]=f*m}else if(t.order==="ZYX"){const v=f*g,b=f*_,E=p*g,w=p*_;i[0]=m*g,i[4]=E*d-b,i[8]=v*d+w,i[1]=m*_,i[5]=w*d+v,i[9]=b*d-E,i[2]=-d,i[6]=p*m,i[10]=f*m}else if(t.order==="YZX"){const v=f*m,b=f*d,E=p*m,w=p*d;i[0]=m*g,i[4]=w-v*_,i[8]=E*_+b,i[1]=_,i[5]=f*g,i[9]=-p*g,i[2]=-d*g,i[6]=b*_+E,i[10]=v-w*_}else if(t.order==="XZY"){const v=f*m,b=f*d,E=p*m,w=p*d;i[0]=m*g,i[4]=-_,i[8]=d*g,i[1]=v*_+w,i[5]=f*g,i[9]=b*_-E,i[2]=E*_-b,i[6]=p*g,i[10]=w*_+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ib,t,Bb)}lookAt(t,i,a){const l=this.elements;return gi.subVectors(t,i),gi.lengthSq()===0&&(gi.z=1),gi.normalize(),ds.crossVectors(a,gi),ds.lengthSq()===0&&(Math.abs(a.z)===1?gi.x+=1e-4:gi.z+=1e-4,gi.normalize(),ds.crossVectors(a,gi)),ds.normalize(),Uc.crossVectors(gi,ds),l[0]=ds.x,l[4]=Uc.x,l[8]=gi.x,l[1]=ds.y,l[5]=Uc.y,l[9]=gi.y,l[2]=ds.z,l[6]=Uc.z,l[10]=gi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const a=t.elements,l=i.elements,c=this.elements,f=a[0],p=a[4],m=a[8],d=a[12],g=a[1],_=a[5],v=a[9],b=a[13],E=a[2],w=a[6],x=a[10],y=a[14],z=a[3],F=a[7],N=a[11],P=a[15],U=l[0],B=l[4],A=l[8],L=l[12],W=l[1],V=l[5],q=l[9],ut=l[13],gt=l[2],Z=l[6],H=l[10],k=l[14],it=l[3],yt=l[7],D=l[11],M=l[15];return c[0]=f*U+p*W+m*gt+d*it,c[4]=f*B+p*V+m*Z+d*yt,c[8]=f*A+p*q+m*H+d*D,c[12]=f*L+p*ut+m*k+d*M,c[1]=g*U+_*W+v*gt+b*it,c[5]=g*B+_*V+v*Z+b*yt,c[9]=g*A+_*q+v*H+b*D,c[13]=g*L+_*ut+v*k+b*M,c[2]=E*U+w*W+x*gt+y*it,c[6]=E*B+w*V+x*Z+y*yt,c[10]=E*A+w*q+x*H+y*D,c[14]=E*L+w*ut+x*k+y*M,c[3]=z*U+F*W+N*gt+P*it,c[7]=z*B+F*V+N*Z+P*yt,c[11]=z*A+F*q+N*H+P*D,c[15]=z*L+F*ut+N*k+P*M,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],a=t[4],l=t[8],c=t[12],f=t[1],p=t[5],m=t[9],d=t[13],g=t[2],_=t[6],v=t[10],b=t[14],E=t[3],w=t[7],x=t[11],y=t[15],z=m*b-d*v,F=p*b-d*_,N=p*v-m*_,P=f*b-d*g,U=f*v-m*g,B=f*_-p*g;return i*(w*z-x*F+y*N)-a*(E*z-x*P+y*U)+l*(E*F-w*P+y*B)-c*(E*N-w*U+x*B)}determinantAffine(){const t=this.elements,i=t[0],a=t[4],l=t[8],c=t[1],f=t[5],p=t[9],m=t[2],d=t[6],g=t[10];return i*(f*g-p*d)-a*(c*g-p*m)+l*(c*d-f*m)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=a),this}invert(){const t=this.elements,i=t[0],a=t[1],l=t[2],c=t[3],f=t[4],p=t[5],m=t[6],d=t[7],g=t[8],_=t[9],v=t[10],b=t[11],E=t[12],w=t[13],x=t[14],y=t[15],z=i*p-a*f,F=i*m-l*f,N=i*d-c*f,P=a*m-l*p,U=a*d-c*p,B=l*d-c*m,A=g*w-_*E,L=g*x-v*E,W=g*y-b*E,V=_*x-v*w,q=_*y-b*w,ut=v*y-b*x,gt=z*ut-F*q+N*V+P*W-U*L+B*A;if(gt===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Z=1/gt;return t[0]=(p*ut-m*q+d*V)*Z,t[1]=(l*q-a*ut-c*V)*Z,t[2]=(w*B-x*U+y*P)*Z,t[3]=(v*U-_*B-b*P)*Z,t[4]=(m*W-f*ut-d*L)*Z,t[5]=(i*ut-l*W+c*L)*Z,t[6]=(x*N-E*B-y*F)*Z,t[7]=(g*B-v*N+b*F)*Z,t[8]=(f*q-p*W+d*A)*Z,t[9]=(a*W-i*q-c*A)*Z,t[10]=(E*U-w*N+y*z)*Z,t[11]=(_*N-g*U-b*z)*Z,t[12]=(p*L-f*V-m*A)*Z,t[13]=(i*V-a*L+l*A)*Z,t[14]=(w*F-E*P-x*z)*Z,t[15]=(g*P-_*F+v*z)*Z,this}scale(t){const i=this.elements,a=t.x,l=t.y,c=t.z;return i[0]*=a,i[4]*=l,i[8]*=c,i[1]*=a,i[5]*=l,i[9]*=c,i[2]*=a,i[6]*=l,i[10]*=c,i[3]*=a,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,a,l))}makeTranslation(t,i,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,a,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,i,-a,0,0,a,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,0,a,0,0,1,0,0,-a,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),a=Math.sin(t);return this.set(i,-a,0,0,a,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const a=Math.cos(i),l=Math.sin(i),c=1-a,f=t.x,p=t.y,m=t.z,d=c*f,g=c*p;return this.set(d*f+a,d*p-l*m,d*m+l*p,0,d*p+l*m,g*p+a,g*m-l*f,0,d*m-l*p,g*m+l*f,c*m*m+a,0,0,0,0,1),this}makeScale(t,i,a){return this.set(t,0,0,0,0,i,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,i,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,i,l,1,0,0,0,0,1),this}compose(t,i,a){const l=this.elements,c=i._x,f=i._y,p=i._z,m=i._w,d=c+c,g=f+f,_=p+p,v=c*d,b=c*g,E=c*_,w=f*g,x=f*_,y=p*_,z=m*d,F=m*g,N=m*_,P=a.x,U=a.y,B=a.z;return l[0]=(1-(w+y))*P,l[1]=(b+N)*P,l[2]=(E-F)*P,l[3]=0,l[4]=(b-N)*U,l[5]=(1-(v+y))*U,l[6]=(x+z)*U,l[7]=0,l[8]=(E+F)*B,l[9]=(x-z)*B,l[10]=(1-(v+w))*B,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,a){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinantAffine();if(c===0)return a.set(1,1,1),i.identity(),this;let f=zr.set(l[0],l[1],l[2]).length();const p=zr.set(l[4],l[5],l[6]).length(),m=zr.set(l[8],l[9],l[10]).length();c<0&&(f=-f),Ii.copy(this);const d=1/f,g=1/p,_=1/m;return Ii.elements[0]*=d,Ii.elements[1]*=d,Ii.elements[2]*=d,Ii.elements[4]*=g,Ii.elements[5]*=g,Ii.elements[6]*=g,Ii.elements[8]*=_,Ii.elements[9]*=_,Ii.elements[10]*=_,i.setFromRotationMatrix(Ii),a.x=f,a.y=p,a.z=m,this}makePerspective(t,i,a,l,c,f,p=ta,m=!1){const d=this.elements,g=2*c/(i-t),_=2*c/(a-l),v=(i+t)/(i-t),b=(a+l)/(a-l);let E,w;if(m)E=c/(f-c),w=f*c/(f-c);else if(p===ta)E=-(f+c)/(f-c),w=-2*f*c/(f-c);else if(p===gl)E=-f/(f-c),w=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+p);return d[0]=g,d[4]=0,d[8]=v,d[12]=0,d[1]=0,d[5]=_,d[9]=b,d[13]=0,d[2]=0,d[6]=0,d[10]=E,d[14]=w,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(t,i,a,l,c,f,p=ta,m=!1){const d=this.elements,g=2/(i-t),_=2/(a-l),v=-(i+t)/(i-t),b=-(a+l)/(a-l);let E,w;if(m)E=1/(f-c),w=f/(f-c);else if(p===ta)E=-2/(f-c),w=-(f+c)/(f-c);else if(p===gl)E=-1/(f-c),w=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+p);return d[0]=g,d[4]=0,d[8]=0,d[12]=v,d[1]=0,d[5]=_,d[9]=0,d[13]=b,d[2]=0,d[6]=0,d[10]=E,d[14]=w,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(t){const i=this.elements,a=t.elements;for(let l=0;l<16;l++)if(i[l]!==a[l])return!1;return!0}fromArray(t,i=0){for(let a=0;a<16;a++)this.elements[a]=t[a+i];return this}toArray(t=[],i=0){const a=this.elements;return t[i]=a[0],t[i+1]=a[1],t[i+2]=a[2],t[i+3]=a[3],t[i+4]=a[4],t[i+5]=a[5],t[i+6]=a[6],t[i+7]=a[7],t[i+8]=a[8],t[i+9]=a[9],t[i+10]=a[10],t[i+11]=a[11],t[i+12]=a[12],t[i+13]=a[13],t[i+14]=a[14],t[i+15]=a[15],t}};xu.prototype.isMatrix4=!0;let nn=xu;const zr=new Y,Ii=new nn,Ib=new Y(0,0,0),Bb=new Y(1,1,1),ds=new Y,Uc=new Y,gi=new Y,Y_=new nn,q_=new Ms;class bs{constructor(t=0,i=0,a=0,l=bs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,a,l=this._order){return this._x=t,this._y=i,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],p=l[8],m=l[1],d=l[5],g=l[9],_=l[2],v=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(_e(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,b),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(v,d),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(p,b),this._z=Math.atan2(m,d)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(_e(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,b),this._z=Math.atan2(-f,d)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-_e(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,d));break;case"YZX":this._z=Math.asin(_e(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,d),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(p,b));break;case"XZY":this._z=Math.asin(-_e(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,d),this._y=Math.atan2(p,c)):(this._x=Math.atan2(-g,b),this._y=0);break;default:oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,a){return Y_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Y_,i,a)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return q_.setFromEuler(this),this.setFromQuaternion(q_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bs.DEFAULT_ORDER="XYZ";class wp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zb=0;const j_=new Y,Fr=new Ms,Ta=new nn,Lc=new Y,nl=new Y,Fb=new Y,Hb=new Ms,Z_=new Y(1,0,0),K_=new Y(0,1,0),J_=new Y(0,0,1),Q_={type:"added"},Gb={type:"removed"},Hr={type:"childadded",child:null},qh={type:"childremoved",child:null};class wn extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zb++}),this.uuid=_l(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const t=new Y,i=new bs,a=new Ms,l=new Y(1,1,1);function c(){a.setFromEuler(i,!1)}function f(){i.setFromQuaternion(a,void 0,!1)}i._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new nn},normalMatrix:{value:new he}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Fr.setFromAxisAngle(t,i),this.quaternion.multiply(Fr),this}rotateOnWorldAxis(t,i){return Fr.setFromAxisAngle(t,i),this.quaternion.premultiply(Fr),this}rotateX(t){return this.rotateOnAxis(Z_,t)}rotateY(t){return this.rotateOnAxis(K_,t)}rotateZ(t){return this.rotateOnAxis(J_,t)}translateOnAxis(t,i){return j_.copy(t).applyQuaternion(this.quaternion),this.position.add(j_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Z_,t)}translateY(t){return this.translateOnAxis(K_,t)}translateZ(t){return this.translateOnAxis(J_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ta.copy(this.matrixWorld).invert())}lookAt(t,i,a){t.isVector3?Lc.copy(t):Lc.set(t,i,a);const l=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ta.lookAt(nl,Lc,this.up):Ta.lookAt(Lc,nl,this.up),this.quaternion.setFromRotationMatrix(Ta),l&&(Ta.extractRotation(l.matrixWorld),Fr.setFromRotationMatrix(Ta),this.quaternion.premultiply(Fr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(we("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Q_),Hr.child=t,this.dispatchEvent(Hr),Hr.child=null):we("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Gb),qh.child=t,this.dispatchEvent(qh),qh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ta.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ta.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ta),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Q_),Hr.child=t,this.dispatchEvent(Hr),Hr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,i);if(f!==void 0)return f}}getObjectsByProperty(t,i,a=[]){this[t]===i&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,i,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,t,Fb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,Hb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,a=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*a-c[8]*l,c[13]+=a-c[1]*i-c[5]*a-c[9]*l,c[14]+=l-c[2]*i-c[6]*a-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let a=0,l=i.length;a<l;a++)i[a].updateMatrixWorld(t)}updateWorldMatrix(t,i,a=!1){const l=this.parent;if(t===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||a)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,a=!0),i===!0){const c=this.children;for(let f=0,p=c.length;f<p;f++)c[f].updateWorldMatrix(!1,!0,a)}}toJSON(t){const i=t===void 0||typeof t=="string",a={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(p=>({...p,boundingBox:p.boundingBox?p.boundingBox.toJSON():void 0,boundingSphere:p.boundingSphere?p.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(p=>({...p})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(p,m){return p[m.uuid]===void 0&&(p[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const p=this.geometry.parameters;if(p!==void 0&&p.shapes!==void 0){const m=p.shapes;if(Array.isArray(m))for(let d=0,g=m.length;d<g;d++){const _=m[d];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const p=[];for(let m=0,d=this.material.length;m<d;m++)p.push(c(t.materials,this.material[m]));l.material=p}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let p=0;p<this.children.length;p++)l.children.push(this.children[p].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let p=0;p<this.animations.length;p++){const m=this.animations[p];l.animations.push(c(t.animations,m))}}if(i){const p=f(t.geometries),m=f(t.materials),d=f(t.textures),g=f(t.images),_=f(t.shapes),v=f(t.skeletons),b=f(t.animations),E=f(t.nodes);p.length>0&&(a.geometries=p),m.length>0&&(a.materials=m),d.length>0&&(a.textures=d),g.length>0&&(a.images=g),_.length>0&&(a.shapes=_),v.length>0&&(a.skeletons=v),b.length>0&&(a.animations=b),E.length>0&&(a.nodes=E)}return a.object=l,a;function f(p){const m=[];for(const d in p){const g=p[d];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}}wn.DEFAULT_UP=new Y(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xi extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vb={type:"move"};class jh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const a of t.hand.values())this._getHandJoint(i,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,a){let l=null,c=null,f=null;const p=this._targetRay,m=this._grip,d=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(d&&t.hand){f=!0;for(const w of t.hand.values()){const x=i.getJointPose(w,a),y=this._getHandJoint(d,w);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=d.joints["index-finger-tip"],_=d.joints["thumb-tip"],v=g.position.distanceTo(_.position),b=.02,E=.005;d.inputState.pinching&&v>b+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&v<=b-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,a),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:t,target:this})));p!==null&&(l=i.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,this.dispatchEvent(Vb)))}return p!==null&&(p.visible=l!==null),m!==null&&(m.visible=c!==null),d!==null&&(d.visible=f!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const a=new xi;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[i.jointName]=a,t.add(a)}return t.joints[i.jointName]}}const dx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ps={h:0,s:0,l:0},Oc={h:0,s:0,l:0};function Zh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class ve{constructor(t,i,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,a)}set(t,i,a){if(i===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Te.colorSpaceToWorking(this,i),this}setRGB(t,i,a,l=Te.workingColorSpace){return this.r=t,this.g=i,this.b=a,Te.colorSpaceToWorking(this,l),this}setHSL(t,i,a,l=Te.workingColorSpace){if(t=Cb(t,1),i=_e(i,0,1),a=_e(a,0,1),i===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+i):a+i-a*i,f=2*a-c;this.r=Zh(f,c,t+1/3),this.g=Zh(f,c,t),this.b=Zh(f,c,t-1/3)}return Te.colorSpaceToWorking(this,l),this}setStyle(t,i=Ri){function a(c){c!==void 0&&parseFloat(c)<1&&oe("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],p=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(p))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:oe("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);oe("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Ri){const a=dx[t.toLowerCase()];return a!==void 0?this.setHex(a,i):oe("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pa(t.r),this.g=Pa(t.g),this.b=Pa(t.b),this}copyLinearToSRGB(t){return this.r=eo(t.r),this.g=eo(t.g),this.b=eo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ri){return Te.workingToColorSpace(Gn.copy(this),t),Math.round(_e(Gn.r*255,0,255))*65536+Math.round(_e(Gn.g*255,0,255))*256+Math.round(_e(Gn.b*255,0,255))}getHexString(t=Ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Te.workingColorSpace){Te.workingToColorSpace(Gn.copy(this),i);const a=Gn.r,l=Gn.g,c=Gn.b,f=Math.max(a,l,c),p=Math.min(a,l,c);let m,d;const g=(p+f)/2;if(p===f)m=0,d=0;else{const _=f-p;switch(d=g<=.5?_/(f+p):_/(2-f-p),f){case a:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-a)/_+2;break;case c:m=(a-l)/_+4;break}m/=6}return t.h=m,t.s=d,t.l=g,t}getRGB(t,i=Te.workingColorSpace){return Te.workingToColorSpace(Gn.copy(this),i),t.r=Gn.r,t.g=Gn.g,t.b=Gn.b,t}getStyle(t=Ri){Te.workingToColorSpace(Gn.copy(this),t);const i=Gn.r,a=Gn.g,l=Gn.b;return t!==Ri?`color(${t} ${i.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,i,a){return this.getHSL(ps),this.setHSL(ps.h+t,ps.s+i,ps.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,a){return this.r=t.r+(i.r-t.r)*a,this.g=t.g+(i.g-t.g)*a,this.b=t.b+(i.b-t.b)*a,this}lerpHSL(t,i){this.getHSL(ps),t.getHSL(Oc);const a=Vh(ps.h,Oc.h,i),l=Vh(ps.s,Oc.s,i),c=Vh(ps.l,Oc.l,i);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*a+c[6]*l,this.g=c[1]*i+c[4]*a+c[7]*l,this.b=c[2]*i+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gn=new ve;ve.NAMES=dx;class Cp{constructor(t,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new ve(t),this.density=i}clone(){return new Cp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kb extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bs,this.environmentIntensity=1,this.environmentRotation=new bs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Bi=new Y,Aa=new Y,Kh=new Y,wa=new Y,Gr=new Y,Vr=new Y,$_=new Y,Jh=new Y,Qh=new Y,$h=new Y,td=new cn,ed=new cn,nd=new cn;class Fi{constructor(t=new Y,i=new Y,a=new Y){this.a=t,this.b=i,this.c=a}static getNormal(t,i,a,l){l.subVectors(a,i),Bi.subVectors(t,i),l.cross(Bi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,a,l,c){Bi.subVectors(l,i),Aa.subVectors(a,i),Kh.subVectors(t,i);const f=Bi.dot(Bi),p=Bi.dot(Aa),m=Bi.dot(Kh),d=Aa.dot(Aa),g=Aa.dot(Kh),_=f*d-p*p;if(_===0)return c.set(0,0,0),null;const v=1/_,b=(d*m-p*g)*v,E=(f*g-p*m)*v;return c.set(1-b-E,E,b)}static containsPoint(t,i,a,l){return this.getBarycoord(t,i,a,l,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(t,i,a,l,c,f,p,m){return this.getBarycoord(t,i,a,l,wa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,wa.x),m.addScaledVector(f,wa.y),m.addScaledVector(p,wa.z),m)}static getInterpolatedAttribute(t,i,a,l,c,f){return td.setScalar(0),ed.setScalar(0),nd.setScalar(0),td.fromBufferAttribute(t,i),ed.fromBufferAttribute(t,a),nd.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(td,c.x),f.addScaledVector(ed,c.y),f.addScaledVector(nd,c.z),f}static isFrontFacing(t,i,a,l){return Bi.subVectors(a,i),Aa.subVectors(t,i),Bi.cross(Aa).dot(l)<0}set(t,i,a){return this.a.copy(t),this.b.copy(i),this.c.copy(a),this}setFromPointsAndIndices(t,i,a,l){return this.a.copy(t[i]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,a,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bi.subVectors(this.c,this.b),Aa.subVectors(this.a,this.b),Bi.cross(Aa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Fi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,a,l,c){return Fi.getInterpolation(t,this.a,this.b,this.c,i,a,l,c)}containsPoint(t){return Fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const a=this.a,l=this.b,c=this.c;let f,p;Gr.subVectors(l,a),Vr.subVectors(c,a),Jh.subVectors(t,a);const m=Gr.dot(Jh),d=Vr.dot(Jh);if(m<=0&&d<=0)return i.copy(a);Qh.subVectors(t,l);const g=Gr.dot(Qh),_=Vr.dot(Qh);if(g>=0&&_<=g)return i.copy(l);const v=m*_-g*d;if(v<=0&&m>=0&&g<=0)return f=m/(m-g),i.copy(a).addScaledVector(Gr,f);$h.subVectors(t,c);const b=Gr.dot($h),E=Vr.dot($h);if(E>=0&&b<=E)return i.copy(c);const w=b*d-m*E;if(w<=0&&d>=0&&E<=0)return p=d/(d-E),i.copy(a).addScaledVector(Vr,p);const x=g*E-b*_;if(x<=0&&_-g>=0&&b-E>=0)return $_.subVectors(c,l),p=(_-g)/(_-g+(b-E)),i.copy(l).addScaledVector($_,p);const y=1/(x+w+v);return f=w*y,p=v*y,i.copy(a).addScaledVector(Gr,f).addScaledVector(Vr,p)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class vl{constructor(t=new Y(1/0,1/0,1/0),i=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,a=t.length;i<a;i+=3)this.expandByPoint(zi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,a=t.count;i<a;i++)this.expandByPoint(zi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,a=t.length;i<a;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const a=zi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,p=c.count;f<p;f++)t.isMesh===!0?t.getVertexPosition(f,zi):zi.fromBufferAttribute(c,f),zi.applyMatrix4(t.matrixWorld),this.expandByPoint(zi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Pc.copy(a.boundingBox)),Pc.applyMatrix4(t.matrixWorld),this.union(Pc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,zi),zi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,a;return t.normal.x>0?(i=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),i<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(il),Ic.subVectors(this.max,il),kr.subVectors(t.a,il),Xr.subVectors(t.b,il),Wr.subVectors(t.c,il),ms.subVectors(Xr,kr),gs.subVectors(Wr,Xr),Ys.subVectors(kr,Wr);let i=[0,-ms.z,ms.y,0,-gs.z,gs.y,0,-Ys.z,Ys.y,ms.z,0,-ms.x,gs.z,0,-gs.x,Ys.z,0,-Ys.x,-ms.y,ms.x,0,-gs.y,gs.x,0,-Ys.y,Ys.x,0];return!id(i,kr,Xr,Wr,Ic)||(i=[1,0,0,0,1,0,0,0,1],!id(i,kr,Xr,Wr,Ic))?!1:(Bc.crossVectors(ms,gs),i=[Bc.x,Bc.y,Bc.z],id(i,kr,Xr,Wr,Ic))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ca),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ca=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],zi=new Y,Pc=new vl,kr=new Y,Xr=new Y,Wr=new Y,ms=new Y,gs=new Y,Ys=new Y,il=new Y,Ic=new Y,Bc=new Y,qs=new Y;function id(r,t,i,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){qs.fromArray(r,c);const p=l.x*Math.abs(qs.x)+l.y*Math.abs(qs.y)+l.z*Math.abs(qs.z),m=t.dot(qs),d=i.dot(qs),g=a.dot(qs);if(Math.max(-Math.max(m,d,g),Math.min(m,d,g))>p)return!1}return!0}const bn=new Y,zc=new qt;let Xb=0;class ia extends Es{constructor(t,i,a=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xb++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=a,this.usage=F_,this.updateRanges=[],this.gpuType=$i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,a){t*=this.itemSize,a*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,a=this.count;i<a;i++)zc.fromBufferAttribute(this,i),zc.applyMatrix3(t),this.setXY(i,zc.x,zc.y);else if(this.itemSize===3)for(let i=0,a=this.count;i<a;i++)bn.fromBufferAttribute(this,i),bn.applyMatrix3(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}applyMatrix4(t){for(let i=0,a=this.count;i<a;i++)bn.fromBufferAttribute(this,i),bn.applyMatrix4(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}applyNormalMatrix(t){for(let i=0,a=this.count;i<a;i++)bn.fromBufferAttribute(this,i),bn.applyNormalMatrix(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}transformDirection(t){for(let i=0,a=this.count;i<a;i++)bn.fromBufferAttribute(this,i),bn.transformDirection(t),this.setXYZ(i,bn.x,bn.y,bn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let a=this.array[t*this.itemSize+i];return this.normalized&&(a=el(a,this.array)),a}setComponent(t,i,a){return this.normalized&&(a=ei(a,this.array)),this.array[t*this.itemSize+i]=a,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=el(i,this.array)),i}setX(t,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=el(i,this.array)),i}setY(t,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=el(i,this.array)),i}setZ(t,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=el(i,this.array)),i}setW(t,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,a){return t*=this.itemSize,this.normalized&&(i=ei(i,this.array),a=ei(a,this.array)),this.array[t+0]=i,this.array[t+1]=a,this}setXYZ(t,i,a,l){return t*=this.itemSize,this.normalized&&(i=ei(i,this.array),a=ei(a,this.array),l=ei(l,this.array)),this.array[t+0]=i,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,i,a,l,c){return t*=this.itemSize,this.normalized&&(i=ei(i,this.array),a=ei(a,this.array),l=ei(l,this.array),c=ei(c,this.array)),this.array[t+0]=i,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==F_&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class px extends ia{constructor(t,i,a){super(new Uint16Array(t),i,a)}}class mx extends ia{constructor(t,i,a){super(new Uint32Array(t),i,a)}}class dn extends ia{constructor(t,i,a){super(new Float32Array(t),i,a)}}const Wb=new vl,al=new Y,ad=new Y;class Su{constructor(t=new Y,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const a=this.center;i!==void 0?a.copy(i):Wb.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const a=this.center.distanceToSquared(t);return i.copy(t),a>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;al.subVectors(t,this.center);const i=al.lengthSq();if(i>this.radius*this.radius){const a=Math.sqrt(i),l=(a-this.radius)*.5;this.center.addScaledVector(al,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ad.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(al.copy(t.center).add(ad)),this.expandByPoint(al.copy(t.center).sub(ad))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Yb=0;const Ci=new nn,sd=new wn,Yr=new Y,_i=new vl,sl=new vl,Dn=new Y;class qn extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=_l(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Eb(t)?mx:px)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,a=0){this.groups.push({start:t,count:i,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new he().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,i,a){return Ci.makeTranslation(t,i,a),this.applyMatrix4(Ci),this}scale(t,i,a){return Ci.makeScale(t,i,a),this.applyMatrix4(Ci),this}lookAt(t){return sd.lookAt(t),sd.updateMatrix(),this.applyMatrix4(sd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yr).negate(),this.translate(Yr.x,Yr.y,Yr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new dn(a,3))}else{const a=Math.min(t.length,i.count);for(let l=0;l<a;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let a=0,l=i.length;a<l;a++){const c=i[a];_i.setFromBufferAttribute(c),this.morphTargetsRelative?(Dn.addVectors(this.boundingBox.min,_i.min),this.boundingBox.expandByPoint(Dn),Dn.addVectors(this.boundingBox.max,_i.max),this.boundingBox.expandByPoint(Dn)):(this.boundingBox.expandByPoint(_i.min),this.boundingBox.expandByPoint(_i.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&we('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Su);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(t){const a=this.boundingSphere.center;if(_i.setFromBufferAttribute(t),i)for(let c=0,f=i.length;c<f;c++){const p=i[c];sl.setFromBufferAttribute(p),this.morphTargetsRelative?(Dn.addVectors(_i.min,sl.min),_i.expandByPoint(Dn),Dn.addVectors(_i.max,sl.max),_i.expandByPoint(Dn)):(_i.expandByPoint(sl.min),_i.expandByPoint(sl.max))}_i.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)Dn.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(Dn));if(i)for(let c=0,f=i.length;c<f;c++){const p=i[c],m=this.morphTargetsRelative;for(let d=0,g=p.count;d<g;d++)Dn.fromBufferAttribute(p,d),m&&(Yr.fromBufferAttribute(t,d),Dn.add(Yr)),l=Math.max(l,a.distanceToSquared(Dn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&we('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){we("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=i.position,l=i.normal,c=i.uv;let f=this.getAttribute("tangent");(f===void 0||f.count!==a.count)&&(f=new ia(new Float32Array(4*a.count),4),this.setAttribute("tangent",f));const p=[],m=[];for(let A=0;A<a.count;A++)p[A]=new Y,m[A]=new Y;const d=new Y,g=new Y,_=new Y,v=new qt,b=new qt,E=new qt,w=new Y,x=new Y;function y(A,L,W){d.fromBufferAttribute(a,A),g.fromBufferAttribute(a,L),_.fromBufferAttribute(a,W),v.fromBufferAttribute(c,A),b.fromBufferAttribute(c,L),E.fromBufferAttribute(c,W),g.sub(d),_.sub(d),b.sub(v),E.sub(v);const V=1/(b.x*E.y-E.x*b.y);isFinite(V)&&(w.copy(g).multiplyScalar(E.y).addScaledVector(_,-b.y).multiplyScalar(V),x.copy(_).multiplyScalar(b.x).addScaledVector(g,-E.x).multiplyScalar(V),p[A].add(w),p[L].add(w),p[W].add(w),m[A].add(x),m[L].add(x),m[W].add(x))}let z=this.groups;z.length===0&&(z=[{start:0,count:t.count}]);for(let A=0,L=z.length;A<L;++A){const W=z[A],V=W.start,q=W.count;for(let ut=V,gt=V+q;ut<gt;ut+=3)y(t.getX(ut+0),t.getX(ut+1),t.getX(ut+2))}const F=new Y,N=new Y,P=new Y,U=new Y;function B(A){P.fromBufferAttribute(l,A),U.copy(P);const L=p[A];F.copy(L),F.sub(P.multiplyScalar(P.dot(L))).normalize(),N.crossVectors(U,L);const V=N.dot(m[A])<0?-1:1;f.setXYZW(A,F.x,F.y,F.z,V)}for(let A=0,L=z.length;A<L;++A){const W=z[A],V=W.start,q=W.count;for(let ut=V,gt=V+q;ut<gt;ut+=3)B(t.getX(ut+0)),B(t.getX(ut+1)),B(t.getX(ut+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let a=this.getAttribute("normal");if(a===void 0||a.count!==i.count)a=new ia(new Float32Array(i.count*3),3),this.setAttribute("normal",a);else for(let v=0,b=a.count;v<b;v++)a.setXYZ(v,0,0,0);const l=new Y,c=new Y,f=new Y,p=new Y,m=new Y,d=new Y,g=new Y,_=new Y;if(t)for(let v=0,b=t.count;v<b;v+=3){const E=t.getX(v+0),w=t.getX(v+1),x=t.getX(v+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,w),f.fromBufferAttribute(i,x),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),p.fromBufferAttribute(a,E),m.fromBufferAttribute(a,w),d.fromBufferAttribute(a,x),p.add(g),m.add(g),d.add(g),a.setXYZ(E,p.x,p.y,p.z),a.setXYZ(w,m.x,m.y,m.z),a.setXYZ(x,d.x,d.y,d.z)}else for(let v=0,b=i.count;v<b;v+=3)l.fromBufferAttribute(i,v+0),c.fromBufferAttribute(i,v+1),f.fromBufferAttribute(i,v+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),a.setXYZ(v+0,g.x,g.y,g.z),a.setXYZ(v+1,g.x,g.y,g.z),a.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,a=t.count;i<a;i++)Dn.fromBufferAttribute(t,i),Dn.normalize(),t.setXYZ(i,Dn.x,Dn.y,Dn.z)}toNonIndexed(){function t(p,m){const d=p.array,g=p.itemSize,_=p.normalized,v=new d.constructor(m.length*g);let b=0,E=0;for(let w=0,x=m.length;w<x;w++){p.isInterleavedBufferAttribute?b=m[w]*p.data.stride+p.offset:b=m[w]*g;for(let y=0;y<g;y++)v[E++]=d[b++]}return new ia(v,g,_)}if(this.index===null)return oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new qn,a=this.index.array,l=this.attributes;for(const p in l){const m=l[p],d=t(m,a);i.setAttribute(p,d)}const c=this.morphAttributes;for(const p in c){const m=[],d=c[p];for(let g=0,_=d.length;g<_;g++){const v=d[g],b=t(v,a);m.push(b)}i.morphAttributes[p]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let p=0,m=f.length;p<m;p++){const d=f[p];i.addGroup(d.start,d.count,d.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const m=this.parameters;for(const d in m)m[d]!==void 0&&(t[d]=m[d]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const a=this.attributes;for(const m in a){const d=a[m];t.data.attributes[m]=d.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const d=this.morphAttributes[m],g=[];for(let _=0,v=d.length;_<v;_++){const b=d[_];g.push(b.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const p=this.boundingSphere;return p!==null&&(t.data.boundingSphere=p.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone());const l=t.attributes;for(const d in l){const g=l[d];this.setAttribute(d,g.clone(i))}const c=t.morphAttributes;for(const d in c){const g=[],_=c[d];for(let v=0,b=_.length;v<b;v++)g.push(_[v].clone(i));this.morphAttributes[d]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let d=0,g=f.length;d<g;d++){const _=f[d];this.addGroup(_.start,_.count,_.materialIndex)}const p=t.boundingBox;p!==null&&(this.boundingBox=p.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let qb=0;class ro extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qb++}),this.uuid=_l(),this.name="",this.type="Material",this.blending=$r,this.side=Ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bd,this.blendDst=Ed,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=no,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=z_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const a=t[i];if(a===void 0){oe(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){oe(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector2&&a&&a.isVector2||l&&l.isEuler&&a&&a.isEuler||l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[i]=a}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==$r&&(a.blending=this.blending),this.side!==Ss&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==bd&&(a.blendSrc=this.blendSrc),this.blendDst!==Ed&&(a.blendDst=this.blendDst),this.blendEquation!==Js&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==no&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==z_&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ir&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Ir&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Ir&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.allowOverride===!1&&(a.allowOverride=!1),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}if(i){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}fromJSON(t,i){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ve().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=i[t.map]||null),t.matcap!==void 0&&(this.matcap=i[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=i[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=i[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=i[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let a=t.normalScale;Array.isArray(a)===!1&&(a=[a,a]),this.normalScale=new qt().fromArray(a)}return t.displacementMap!==void 0&&(this.displacementMap=i[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=i[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=i[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=i[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=i[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=i[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=i[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=i[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=i[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=i[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=i[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=i[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=i[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=i[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=i[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=i[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let a=null;if(i!==null){const l=i.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=i[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ra=new Y,rd=new Y,Fc=new Y,_s=new Y,od=new Y,Hc=new Y,ld=new Y;class Mu{constructor(t=new Y,i=new Y(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ra)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const a=i.dot(this.direction);return a<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=Ra.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(Ra.copy(this.origin).addScaledVector(this.direction,i),Ra.distanceToSquared(t))}distanceSqToSegment(t,i,a,l){rd.copy(t).add(i).multiplyScalar(.5),Fc.copy(i).sub(t).normalize(),_s.copy(this.origin).sub(rd);const c=t.distanceTo(i)*.5,f=-this.direction.dot(Fc),p=_s.dot(this.direction),m=-_s.dot(Fc),d=_s.lengthSq(),g=Math.abs(1-f*f);let _,v,b,E;if(g>0)if(_=f*m-p,v=f*p-m,E=c*g,_>=0)if(v>=-E)if(v<=E){const w=1/g;_*=w,v*=w,b=_*(_+f*v+2*p)+v*(f*_+v+2*m)+d}else v=c,_=Math.max(0,-(f*v+p)),b=-_*_+v*(v+2*m)+d;else v=-c,_=Math.max(0,-(f*v+p)),b=-_*_+v*(v+2*m)+d;else v<=-E?(_=Math.max(0,-(-f*c+p)),v=_>0?-c:Math.min(Math.max(-c,-m),c),b=-_*_+v*(v+2*m)+d):v<=E?(_=0,v=Math.min(Math.max(-c,-m),c),b=v*(v+2*m)+d):(_=Math.max(0,-(f*c+p)),v=_>0?c:Math.min(Math.max(-c,-m),c),b=-_*_+v*(v+2*m)+d);else v=f>0?-c:c,_=Math.max(0,-(f*v+p)),b=-_*_+v*(v+2*m)+d;return a&&a.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(rd).addScaledVector(Fc,v),b}intersectSphere(t,i){Ra.subVectors(t.center,this.origin);const a=Ra.dot(this.direction),l=Ra.dot(Ra)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),p=a-f,m=a+f;return m<0?null:p<0?this.at(m,i):this.at(p,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/i;return a>=0?a:null}intersectPlane(t,i){const a=this.distanceToPlane(t);return a===null?null:this.at(a,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let a,l,c,f,p,m;const d=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return d>=0?(a=(t.min.x-v.x)*d,l=(t.max.x-v.x)*d):(a=(t.max.x-v.x)*d,l=(t.min.x-v.x)*d),g>=0?(c=(t.min.y-v.y)*g,f=(t.max.y-v.y)*g):(c=(t.max.y-v.y)*g,f=(t.min.y-v.y)*g),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),_>=0?(p=(t.min.z-v.z)*_,m=(t.max.z-v.z)*_):(p=(t.max.z-v.z)*_,m=(t.min.z-v.z)*_),a>m||p>l)||((p>a||a!==a)&&(a=p),(m<l||l!==l)&&(l=m),l<0)?null:this.at(a>=0?a:l,i)}intersectsBox(t){return this.intersectBox(t,Ra)!==null}intersectTriangle(t,i,a,l,c){od.subVectors(i,t),Hc.subVectors(a,t),ld.crossVectors(od,Hc);let f=this.direction.dot(ld),p;if(f>0){if(l)return null;p=1}else if(f<0)p=-1,f=-f;else return null;_s.subVectors(this.origin,t);const m=p*this.direction.dot(Hc.crossVectors(_s,Hc));if(m<0)return null;const d=p*this.direction.dot(od.cross(_s));if(d<0||m+d>f)return null;const g=-p*_s.dot(ld);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vi extends ro{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bs,this.combine=Kv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const tv=new nn,js=new Mu,Gc=new Su,ev=new Y,Vc=new Y,kc=new Y,Xc=new Y,cd=new Y,Wc=new Y,nv=new Y,Yc=new Y;class ae extends wn{constructor(t=new qn,i=new Vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,a=Object.keys(i);if(a.length>0){const l=i[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}getVertexPosition(t,i){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;i.fromBufferAttribute(l,t);const p=this.morphTargetInfluences;if(c&&p){Wc.set(0,0,0);for(let m=0,d=c.length;m<d;m++){const g=p[m],_=c[m];g!==0&&(cd.fromBufferAttribute(_,t),f?Wc.addScaledVector(cd,g):Wc.addScaledVector(cd.sub(i),g))}i.add(Wc)}return i}raycast(t,i){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Gc.copy(a.boundingSphere),Gc.applyMatrix4(c),js.copy(t.ray).recast(t.near),!(Gc.containsPoint(js.origin)===!1&&(js.intersectSphere(Gc,ev)===null||js.origin.distanceToSquared(ev)>(t.far-t.near)**2))&&(tv.copy(c).invert(),js.copy(t.ray).applyMatrix4(tv),!(a.boundingBox!==null&&js.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,i,js)))}_computeIntersections(t,i,a){let l;const c=this.geometry,f=this.material,p=c.index,m=c.attributes.position,d=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,v=c.groups,b=c.drawRange;if(p!==null)if(Array.isArray(f))for(let E=0,w=v.length;E<w;E++){const x=v[E],y=f[x.materialIndex],z=Math.max(x.start,b.start),F=Math.min(p.count,Math.min(x.start+x.count,b.start+b.count));for(let N=z,P=F;N<P;N+=3){const U=p.getX(N),B=p.getX(N+1),A=p.getX(N+2);l=qc(this,y,t,a,d,g,_,U,B,A),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,b.start),w=Math.min(p.count,b.start+b.count);for(let x=E,y=w;x<y;x+=3){const z=p.getX(x),F=p.getX(x+1),N=p.getX(x+2);l=qc(this,f,t,a,d,g,_,z,F,N),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,w=v.length;E<w;E++){const x=v[E],y=f[x.materialIndex],z=Math.max(x.start,b.start),F=Math.min(m.count,Math.min(x.start+x.count,b.start+b.count));for(let N=z,P=F;N<P;N+=3){const U=N,B=N+1,A=N+2;l=qc(this,y,t,a,d,g,_,U,B,A),l&&(l.faceIndex=Math.floor(N/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,b.start),w=Math.min(m.count,b.start+b.count);for(let x=E,y=w;x<y;x+=3){const z=x,F=x+1,N=x+2;l=qc(this,f,t,a,d,g,_,z,F,N),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function jb(r,t,i,a,l,c,f,p){let m;if(t.side===ai?m=a.intersectTriangle(f,c,l,!0,p):m=a.intersectTriangle(l,c,f,t.side===Ss,p),m===null)return null;Yc.copy(p),Yc.applyMatrix4(r.matrixWorld);const d=i.ray.origin.distanceTo(Yc);return d<i.near||d>i.far?null:{distance:d,point:Yc.clone(),object:r}}function qc(r,t,i,a,l,c,f,p,m,d){r.getVertexPosition(p,Vc),r.getVertexPosition(m,kc),r.getVertexPosition(d,Xc);const g=jb(r,t,i,a,Vc,kc,Xc,nv);if(g){const _=new Y;Fi.getBarycoord(nv,Vc,kc,Xc,_),l&&(g.uv=Fi.getInterpolatedAttribute(l,p,m,d,_,new qt)),c&&(g.uv1=Fi.getInterpolatedAttribute(c,p,m,d,_,new qt)),f&&(g.normal=Fi.getInterpolatedAttribute(f,p,m,d,_,new Y),g.normal.dot(a.direction)>0&&g.normal.multiplyScalar(-1));const v={a:p,b:m,c:d,normal:new Y,materialIndex:0};Fi.getNormal(Vc,kc,Xc,v.normal),g.face=v,g.barycoord=_}return g}class Zb extends Xn{constructor(t=null,i=1,a=1,l,c,f,p,m,d=Bn,g=Bn,_,v){super(null,f,p,m,d,g,l,c,_,v),this.isDataTexture=!0,this.image={data:t,width:i,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ud=new Y,Kb=new Y,Jb=new he;class Na{constructor(t=new Y(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,a,l){return this.normal.set(t,i,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,a){const l=ud.subVectors(a,i).cross(Kb.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i,a=!0){const l=t.delta(ud),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const f=-(t.start.dot(this.normal)+this.constant)/c;return a===!0&&(f<0||f>1)?null:i.copy(t.start).addScaledVector(l,f)}intersectsLine(t){const i=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return i<0&&a>0||a<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const a=i||Jb.getNormalMatrix(t),l=this.coplanarPoint(ud).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zs=new Su,Qb=new qt(.5,.5),jc=new Y;class Rp{constructor(t=new Na,i=new Na,a=new Na,l=new Na,c=new Na,f=new Na){this.planes=[t,i,a,l,c,f]}set(t,i,a,l,c,f){const p=this.planes;return p[0].copy(t),p[1].copy(i),p[2].copy(a),p[3].copy(l),p[4].copy(c),p[5].copy(f),this}copy(t){const i=this.planes;for(let a=0;a<6;a++)i[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,i=ta,a=!1){const l=this.planes,c=t.elements,f=c[0],p=c[1],m=c[2],d=c[3],g=c[4],_=c[5],v=c[6],b=c[7],E=c[8],w=c[9],x=c[10],y=c[11],z=c[12],F=c[13],N=c[14],P=c[15];if(l[0].setComponents(d-f,b-g,y-E,P-z).normalize(),l[1].setComponents(d+f,b+g,y+E,P+z).normalize(),l[2].setComponents(d+p,b+_,y+w,P+F).normalize(),l[3].setComponents(d-p,b-_,y-w,P-F).normalize(),a)l[4].setComponents(m,v,x,N).normalize(),l[5].setComponents(d-m,b-v,y-x,P-N).normalize();else if(l[4].setComponents(d-m,b-v,y-x,P-N).normalize(),i===ta)l[5].setComponents(d+m,b+v,y+x,P+N).normalize();else if(i===gl)l[5].setComponents(m,v,x,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Zs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zs)}intersectsSprite(t){Zs.center.set(0,0,0);const i=Qb.distanceTo(t.center);return Zs.radius=.7071067811865476+i,Zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zs)}intersectsSphere(t){const i=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let a=0;a<6;a++){const l=i[a];if(jc.x=l.normal.x>0?t.max.x:t.min.x,jc.y=l.normal.y>0?t.max.y:t.min.y,jc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(jc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let a=0;a<6;a++)if(i[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gx extends ro{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _u=new Y,vu=new Y,iv=new nn,rl=new Mu,Zc=new Su,fd=new Y,av=new Y;class $b extends wn{constructor(t=new qn,i=new gx){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,a=[0];for(let l=1,c=i.count;l<c;l++)_u.fromBufferAttribute(i,l-1),vu.fromBufferAttribute(i,l),a[l]=a[l-1],a[l]+=_u.distanceTo(vu);t.setAttribute("lineDistance",new dn(a,1))}else oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Zc.copy(a.boundingSphere),Zc.applyMatrix4(l),Zc.radius+=c,t.ray.intersectsSphere(Zc)===!1)return;iv.copy(l).invert(),rl.copy(t.ray).applyMatrix4(iv);const p=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=p*p,d=this.isLineSegments?2:1,g=a.index,v=a.attributes.position;if(g!==null){const b=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let w=b,x=E-1;w<x;w+=d){const y=g.getX(w),z=g.getX(w+1),F=Kc(this,t,rl,m,y,z,w);F&&i.push(F)}if(this.isLineLoop){const w=g.getX(E-1),x=g.getX(b),y=Kc(this,t,rl,m,w,x,E-1);y&&i.push(y)}}else{const b=Math.max(0,f.start),E=Math.min(v.count,f.start+f.count);for(let w=b,x=E-1;w<x;w+=d){const y=Kc(this,t,rl,m,w,w+1,w);y&&i.push(y)}if(this.isLineLoop){const w=Kc(this,t,rl,m,E-1,b,E-1);w&&i.push(w)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,a=Object.keys(i);if(a.length>0){const l=i[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const p=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[p]=c}}}}}function Kc(r,t,i,a,l,c,f){const p=r.geometry.attributes.position;if(_u.fromBufferAttribute(p,l),vu.fromBufferAttribute(p,c),i.distanceSqToSegment(_u,vu,fd,av)>a)return;fd.applyMatrix4(r.matrixWorld);const d=t.ray.origin.distanceTo(fd);if(!(d<t.near||d>t.far))return{distance:d,point:av.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}class _x extends Xn{constructor(t=[],i=nr,a,l,c,f,p,m,d,g){super(t,i,a,l,c,f,p,m,d,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bu extends Xn{constructor(t,i,a,l,c,f,p,m,d){super(t,i,a,l,c,f,p,m,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ao extends Xn{constructor(t,i,a=aa,l,c,f,p=Bn,m=Bn,d,g=Ba,_=1){if(g!==Ba&&g!==er)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:t,height:i,depth:_};super(v,l,c,f,p,m,g,a,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ap(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class t1 extends ao{constructor(t,i=aa,a=nr,l,c,f=Bn,p=Bn,m,d=Ba){const g={width:t,height:t,depth:1},_=[g,g,g,g,g,g];super(t,t,i,a,l,c,f,p,m,d),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class vx extends Xn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class gn extends qn{constructor(t=1,i=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const p=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],d=[],g=[],_=[];let v=0,b=0;E("z","y","x",-1,-1,a,i,t,f,c,0),E("z","y","x",1,-1,a,i,-t,f,c,1),E("x","z","y",1,1,t,a,i,l,f,2),E("x","z","y",1,-1,t,a,-i,l,f,3),E("x","y","z",1,-1,t,i,a,l,c,4),E("x","y","z",-1,-1,t,i,-a,l,c,5),this.setIndex(m),this.setAttribute("position",new dn(d,3)),this.setAttribute("normal",new dn(g,3)),this.setAttribute("uv",new dn(_,2));function E(w,x,y,z,F,N,P,U,B,A,L){const W=N/B,V=P/A,q=N/2,ut=P/2,gt=U/2,Z=B+1,H=A+1;let k=0,it=0;const yt=new Y;for(let D=0;D<H;D++){const M=D*V-ut;for(let O=0;O<Z;O++){const tt=O*W-q;yt[w]=tt*z,yt[x]=M*F,yt[y]=gt,d.push(yt.x,yt.y,yt.z),yt[w]=0,yt[x]=0,yt[y]=U>0?1:-1,g.push(yt.x,yt.y,yt.z),_.push(O/B),_.push(1-D/A),k+=1}}for(let D=0;D<A;D++)for(let M=0;M<B;M++){const O=v+M+Z*D,tt=v+M+Z*(D+1),mt=v+(M+1)+Z*(D+1),bt=v+(M+1)+Z*D;m.push(O,tt,bt),m.push(tt,mt,bt),it+=6}p.addGroup(b,it,L),b+=it,v+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Np extends qn{constructor(t=1,i=32,a=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:a,thetaLength:l},i=Math.max(3,i);const c=[],f=[],p=[],m=[],d=new Y,g=new qt;f.push(0,0,0),p.push(0,0,1),m.push(.5,.5);for(let _=0,v=3;_<=i;_++,v+=3){const b=a+_/i*l;d.x=t*Math.cos(b),d.y=t*Math.sin(b),f.push(d.x,d.y,d.z),p.push(0,0,1),g.x=(f[v]/t+1)/2,g.y=(f[v+1]/t+1)/2,m.push(g.x,g.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new dn(f,3)),this.setAttribute("normal",new dn(p,3)),this.setAttribute("uv",new dn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Np(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ni extends qn{constructor(t=1,i=1,a=1,l=32,c=1,f=!1,p=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:a,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:p,thetaLength:m};const d=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],v=[],b=[];let E=0;const w=[],x=a/2;let y=0;z(),f===!1&&(t>0&&F(!0),i>0&&F(!1)),this.setIndex(g),this.setAttribute("position",new dn(_,3)),this.setAttribute("normal",new dn(v,3)),this.setAttribute("uv",new dn(b,2));function z(){const N=new Y,P=new Y;let U=0;const B=(i-t)/a;for(let A=0;A<=c;A++){const L=[],W=A/c,V=W*(i-t)+t;for(let q=0;q<=l;q++){const ut=q/l,gt=ut*m+p,Z=Math.sin(gt),H=Math.cos(gt);P.x=V*Z,P.y=-W*a+x,P.z=V*H,_.push(P.x,P.y,P.z),N.set(Z,B,H).normalize(),v.push(N.x,N.y,N.z),b.push(ut,1-W),L.push(E++)}w.push(L)}for(let A=0;A<l;A++)for(let L=0;L<c;L++){const W=w[L][A],V=w[L+1][A],q=w[L+1][A+1],ut=w[L][A+1];(t>0||L!==0)&&(g.push(W,V,ut),U+=3),(i>0||L!==c-1)&&(g.push(V,q,ut),U+=3)}d.addGroup(y,U,0),y+=U}function F(N){const P=E,U=new qt,B=new Y;let A=0;const L=N===!0?t:i,W=N===!0?1:-1;for(let q=1;q<=l;q++)_.push(0,x*W,0),v.push(0,W,0),b.push(.5,.5),E++;const V=E;for(let q=0;q<=l;q++){const gt=q/l*m+p,Z=Math.cos(gt),H=Math.sin(gt);B.x=L*H,B.y=x*W,B.z=L*Z,_.push(B.x,B.y,B.z),v.push(0,W,0),U.x=Z*.5+.5,U.y=H*.5*W+.5,b.push(U.x,U.y),E++}for(let q=0;q<l;q++){const ut=P+q,gt=V+q;N===!0?g.push(gt,gt+1,ut):g.push(gt+1,gt,ut),A+=3}d.addGroup(y,A,N===!0?1:2),y+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dp extends Ni{constructor(t=1,i=1,a=32,l=1,c=!1,f=0,p=Math.PI*2){super(0,t,i,a,l,c,f,p),this.type="ConeGeometry",this.parameters={radius:t,height:i,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:p}}static fromJSON(t){return new Dp(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fa{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){oe("Curve: .getPoint() not implemented.")}getPointAt(t,i){const a=this.getUtoTmapping(t);return this.getPoint(a,i)}getPoints(t=5){const i=[];for(let a=0;a<=t;a++)i.push(this.getPoint(a/t));return i}getSpacedPoints(t=5){const i=[];for(let a=0;a<=t;a++)i.push(this.getPointAt(a/t));return i}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const i=[];let a,l=this.getPoint(0),c=0;i.push(0);for(let f=1;f<=t;f++)a=this.getPoint(f/t),c+=a.distanceTo(l),i.push(c),l=a;return this.cacheArcLengths=i,i}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,i=null){const a=this.getLengths();let l=0;const c=a.length;let f;i?f=i:f=t*a[c-1];let p=0,m=c-1,d;for(;p<=m;)if(l=Math.floor(p+(m-p)/2),d=a[l]-f,d<0)p=l+1;else if(d>0)m=l-1;else{m=l;break}if(l=m,a[l]===f)return l/(c-1);const g=a[l],v=a[l+1]-g,b=(f-g)/v;return(l+b)/(c-1)}getTangent(t,i){let l=t-1e-4,c=t+1e-4;l<0&&(l=0),c>1&&(c=1);const f=this.getPoint(l),p=this.getPoint(c),m=i||(f.isVector2?new qt:new Y);return m.copy(p).sub(f).normalize(),m}getTangentAt(t,i){const a=this.getUtoTmapping(t);return this.getTangent(a,i)}computeFrenetFrames(t,i=!1){const a=new Y,l=[],c=[],f=[],p=new Y,m=new nn;for(let b=0;b<=t;b++){const E=b/t;l[b]=this.getTangentAt(E,new Y)}c[0]=new Y,f[0]=new Y;let d=Number.MAX_VALUE;const g=Math.abs(l[0].x),_=Math.abs(l[0].y),v=Math.abs(l[0].z);g<=d&&(d=g,a.set(1,0,0)),_<=d&&(d=_,a.set(0,1,0)),v<=d&&a.set(0,0,1),p.crossVectors(l[0],a).normalize(),c[0].crossVectors(l[0],p),f[0].crossVectors(l[0],c[0]);for(let b=1;b<=t;b++){if(c[b]=c[b-1].clone(),f[b]=f[b-1].clone(),p.crossVectors(l[b-1],l[b]),p.length()>Number.EPSILON){p.normalize();const E=Math.acos(_e(l[b-1].dot(l[b]),-1,1));c[b].applyMatrix4(m.makeRotationAxis(p,E))}f[b].crossVectors(l[b],c[b])}if(i===!0){let b=Math.acos(_e(c[0].dot(c[t]),-1,1));b/=t,l[0].dot(p.crossVectors(c[0],c[t]))>0&&(b=-b);for(let E=1;E<=t;E++)c[E].applyMatrix4(m.makeRotationAxis(l[E],b*E)),f[E].crossVectors(l[E],c[E])}return{tangents:l,normals:c,binormals:f}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class xx extends Fa{constructor(t=0,i=0,a=1,l=1,c=0,f=Math.PI*2,p=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=i,this.xRadius=a,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=f,this.aClockwise=p,this.aRotation=m}getPoint(t,i=new qt){const a=i,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const f=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(f?c=0:c=l),this.aClockwise===!0&&!f&&(c===l?c=-l:c=c-l);const p=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(p),d=this.aY+this.yRadius*Math.sin(p);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),v=m-this.aX,b=d-this.aY;m=v*g-b*_+this.aX,d=v*_+b*g+this.aY}return a.set(m,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class e1 extends xx{constructor(t,i,a,l,c,f){super(t,i,a,a,l,c,f),this.isArcCurve=!0,this.type="ArcCurve"}}function Up(){let r=0,t=0,i=0,a=0;function l(c,f,p,m){r=c,t=p,i=-3*c+3*f-2*p-m,a=2*c-2*f+p+m}return{initCatmullRom:function(c,f,p,m,d){l(f,p,d*(p-c),d*(m-f))},initNonuniformCatmullRom:function(c,f,p,m,d,g,_){let v=(f-c)/d-(p-c)/(d+g)+(p-f)/g,b=(p-f)/g-(m-f)/(g+_)+(m-p)/_;v*=g,b*=g,l(f,p,v,b)},calc:function(c){const f=c*c,p=f*c;return r+t*c+i*f+a*p}}}const sv=new Y,rv=new Y,hd=new Up,dd=new Up,pd=new Up;class n1 extends Fa{constructor(t=[],i=!1,a="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=i,this.curveType=a,this.tension=l}getPoint(t,i=new Y){const a=i,l=this.points,c=l.length,f=(c-(this.closed?0:1))*t;let p=Math.floor(f),m=f-p;this.closed?p+=p>0?0:(Math.floor(Math.abs(p)/c)+1)*c:m===0&&p===c-1&&(p=c-2,m=1);let d,g;this.closed||p>0?d=l[(p-1)%c]:(rv.subVectors(l[0],l[1]).add(l[0]),d=rv);const _=l[p%c],v=l[(p+1)%c];if(this.closed||p+2<c?g=l[(p+2)%c]:(sv.subVectors(l[c-1],l[c-2]).add(l[c-1]),g=sv),this.curveType==="centripetal"||this.curveType==="chordal"){const b=this.curveType==="chordal"?.5:.25;let E=Math.pow(d.distanceToSquared(_),b),w=Math.pow(_.distanceToSquared(v),b),x=Math.pow(v.distanceToSquared(g),b);w<1e-4&&(w=1),E<1e-4&&(E=w),x<1e-4&&(x=w),hd.initNonuniformCatmullRom(d.x,_.x,v.x,g.x,E,w,x),dd.initNonuniformCatmullRom(d.y,_.y,v.y,g.y,E,w,x),pd.initNonuniformCatmullRom(d.z,_.z,v.z,g.z,E,w,x)}else this.curveType==="catmullrom"&&(hd.initCatmullRom(d.x,_.x,v.x,g.x,this.tension),dd.initCatmullRom(d.y,_.y,v.y,g.y,this.tension),pd.initCatmullRom(d.z,_.z,v.z,g.z,this.tension));return a.set(hd.calc(m),dd.calc(m),pd.calc(m)),a}copy(t){super.copy(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(l.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,a=this.points.length;i<a;i++){const l=this.points[i];t.points.push(l.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(new Y().fromArray(l))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ov(r,t,i,a,l){const c=(a-t)*.5,f=(l-i)*.5,p=r*r,m=r*p;return(2*i-2*a+c+f)*m+(-3*i+3*a-2*c-f)*p+c*r+i}function i1(r,t){const i=1-r;return i*i*t}function a1(r,t){return 2*(1-r)*r*t}function s1(r,t){return r*r*t}function fl(r,t,i,a){return i1(r,t)+a1(r,i)+s1(r,a)}function r1(r,t){const i=1-r;return i*i*i*t}function o1(r,t){const i=1-r;return 3*i*i*r*t}function l1(r,t){return 3*(1-r)*r*r*t}function c1(r,t){return r*r*r*t}function hl(r,t,i,a,l){return r1(r,t)+o1(r,i)+l1(r,a)+c1(r,l)}class u1 extends Fa{constructor(t=new qt,i=new qt,a=new qt,l=new qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=i,this.v2=a,this.v3=l}getPoint(t,i=new qt){const a=i,l=this.v0,c=this.v1,f=this.v2,p=this.v3;return a.set(hl(t,l.x,c.x,f.x,p.x),hl(t,l.y,c.y,f.y,p.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lp extends Fa{constructor(t=new Y,i=new Y,a=new Y,l=new Y){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=i,this.v2=a,this.v3=l}getPoint(t,i=new Y){const a=i,l=this.v0,c=this.v1,f=this.v2,p=this.v3;return a.set(hl(t,l.x,c.x,f.x,p.x),hl(t,l.y,c.y,f.y,p.y),hl(t,l.z,c.z,f.z,p.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class f1 extends Fa{constructor(t=new qt,i=new qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=i}getPoint(t,i=new qt){const a=i;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new qt){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yx extends Fa{constructor(t=new Y,i=new Y){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=i}getPoint(t,i=new Y){const a=i;return t===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(t).add(this.v1)),a}getPointAt(t,i){return this.getPoint(t,i)}getTangent(t,i=new Y){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,i){return this.getTangent(t,i)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class h1 extends Fa{constructor(t=new qt,i=new qt,a=new qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=i,this.v2=a}getPoint(t,i=new qt){const a=i,l=this.v0,c=this.v1,f=this.v2;return a.set(fl(t,l.x,c.x,f.x),fl(t,l.y,c.y,f.y)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sx extends Fa{constructor(t=new Y,i=new Y,a=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=i,this.v2=a}getPoint(t,i=new Y){const a=i,l=this.v0,c=this.v1,f=this.v2;return a.set(fl(t,l.x,c.x,f.x),fl(t,l.y,c.y,f.y),fl(t,l.z,c.z,f.z)),a}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class d1 extends Fa{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,i=new qt){const a=i,l=this.points,c=(l.length-1)*t,f=Math.floor(c),p=c-f,m=l[f===0?f:f-1],d=l[f],g=l[f>l.length-2?l.length-1:f+1],_=l[f>l.length-3?l.length-1:f+2];return a.set(ov(p,m.x,d.x,g.x,_.x),ov(p,m.y,d.y,g.y,_.y)),a}copy(t){super.copy(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let i=0,a=this.points.length;i<a;i++){const l=this.points[i];t.points.push(l.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let i=0,a=t.points.length;i<a;i++){const l=t.points[i];this.points.push(new qt().fromArray(l))}return this}}var p1=Object.freeze({__proto__:null,ArcCurve:e1,CatmullRomCurve3:n1,CubicBezierCurve:u1,CubicBezierCurve3:Lp,EllipseCurve:xx,LineCurve:f1,LineCurve3:yx,QuadraticBezierCurve:h1,QuadraticBezierCurve3:Sx,SplineCurve:d1});class Ts extends qn{constructor(t=1,i=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:a,heightSegments:l};const c=t/2,f=i/2,p=Math.floor(a),m=Math.floor(l),d=p+1,g=m+1,_=t/p,v=i/m,b=[],E=[],w=[],x=[];for(let y=0;y<g;y++){const z=y*v-f;for(let F=0;F<d;F++){const N=F*_-c;E.push(N,-z,0),w.push(0,0,1),x.push(F/p),x.push(1-y/m)}}for(let y=0;y<m;y++)for(let z=0;z<p;z++){const F=z+d*y,N=z+d*(y+1),P=z+1+d*(y+1),U=z+1+d*y;b.push(F,N,U),b.push(N,P,U)}this.setIndex(b),this.setAttribute("position",new dn(E,3)),this.setAttribute("normal",new dn(w,3)),this.setAttribute("uv",new dn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ts(t.width,t.height,t.widthSegments,t.heightSegments)}}class Eu extends qn{constructor(t=1,i=32,a=16,l=0,c=Math.PI*2,f=0,p=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:p},i=Math.max(3,Math.floor(i)),a=Math.max(2,Math.floor(a));const m=Math.min(f+p,Math.PI);let d=0;const g=[],_=new Y,v=new Y,b=[],E=[],w=[],x=[];for(let y=0;y<=a;y++){const z=[],F=y/a,N=f+F*p,P=t*Math.cos(N),U=Math.sqrt(t*t-P*P);let B=0;y===0&&f===0?B=.5/i:y===a&&m===Math.PI&&(B=-.5/i);for(let A=0;A<=i;A++){const L=A/i,W=l+L*c;_.x=-U*Math.cos(W),_.y=P,_.z=U*Math.sin(W),E.push(_.x,_.y,_.z),v.copy(_).normalize(),w.push(v.x,v.y,v.z),x.push(L+B,1-F),z.push(d++)}g.push(z)}for(let y=0;y<a;y++)for(let z=0;z<i;z++){const F=g[y][z+1],N=g[y][z],P=g[y+1][z],U=g[y+1][z+1];(y!==0||f>0)&&b.push(F,N,U),(y!==a-1||m<Math.PI)&&b.push(N,P,U)}this.setIndex(b),this.setAttribute("position",new dn(E,3)),this.setAttribute("normal",new dn(w,3)),this.setAttribute("uv",new dn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xl extends qn{constructor(t=new Sx(new Y(-1,-1,0),new Y(-1,1,0),new Y(1,1,0)),i=64,a=1,l=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:a,radialSegments:l,closed:c};const f=t.computeFrenetFrames(i,c);this.tangents=f.tangents,this.normals=f.normals,this.binormals=f.binormals;const p=new Y,m=new Y,d=new qt;let g=new Y;const _=[],v=[],b=[],E=[];w(),this.setIndex(E),this.setAttribute("position",new dn(_,3)),this.setAttribute("normal",new dn(v,3)),this.setAttribute("uv",new dn(b,2));function w(){for(let F=0;F<i;F++)x(F);x(c===!1?i:0),z(),y()}function x(F){g=t.getPointAt(F/i,g);const N=f.normals[F],P=f.binormals[F];for(let U=0;U<=l;U++){const B=U/l*Math.PI*2,A=Math.sin(B),L=-Math.cos(B);m.x=L*N.x+A*P.x,m.y=L*N.y+A*P.y,m.z=L*N.z+A*P.z,m.normalize(),v.push(m.x,m.y,m.z),p.x=g.x+a*m.x,p.y=g.y+a*m.y,p.z=g.z+a*m.z,_.push(p.x,p.y,p.z)}}function y(){for(let F=1;F<=i;F++)for(let N=1;N<=l;N++){const P=(l+1)*(F-1)+(N-1),U=(l+1)*F+(N-1),B=(l+1)*F+N,A=(l+1)*(F-1)+N;E.push(P,U,A),E.push(U,B,A)}}function z(){for(let F=0;F<=i;F++)for(let N=0;N<=l;N++)d.x=F/i,d.y=N/l,b.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new xl(new p1[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function so(r){const t={};for(const i in r){t[i]={};for(const a in r[i]){const l=r[i][a];if(lv(l))l.isRenderTargetTexture?(oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][a]=null):t[i][a]=l.clone();else if(Array.isArray(l))if(lv(l[0])){const c=[];for(let f=0,p=l.length;f<p;f++)c[f]=l[f].clone();t[i][a]=c}else t[i][a]=l.slice();else t[i][a]=l}}return t}function Yn(r){const t={};for(let i=0;i<r.length;i++){const a=so(r[i]);for(const l in a)t[l]=a[l]}return t}function lv(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function m1(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Mx(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Te.workingColorSpace}const g1={clone:so,merge:Yn};var _1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,v1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sa extends ro{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_1,this.fragmentShader=v1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=so(t.uniforms),this.uniformsGroups=m1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(i.extensions=a),i}fromJSON(t,i){if(super.fromJSON(t,i),t.uniforms!==void 0)for(const a in t.uniforms){const l=t.uniforms[a];switch(this.uniforms[a]={},l.type){case"t":this.uniforms[a].value=i[l.value]||null;break;case"c":this.uniforms[a].value=new ve().setHex(l.value);break;case"v2":this.uniforms[a].value=new qt().fromArray(l.value);break;case"v3":this.uniforms[a].value=new Y().fromArray(l.value);break;case"v4":this.uniforms[a].value=new cn().fromArray(l.value);break;case"m3":this.uniforms[a].value=new he().fromArray(l.value);break;case"m4":this.uniforms[a].value=new nn().fromArray(l.value);break;default:this.uniforms[a].value=l.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const a in t.extensions)this.extensions[a]=t.extensions[a];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class x1 extends sa{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class en extends ro{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=up,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class y1 extends en{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class S1 extends ro{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class M1 extends ro{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class b1 extends gx{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Tu extends wn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(t),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const md=new nn,cv=new Y,uv=new Y;class Op{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new nn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rp,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new cn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,a=this.matrix;cv.setFromMatrixPosition(t.matrixWorld),i.position.copy(cv),uv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(uv),i.updateMatrixWorld(),md.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(md,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===gl||i.reversedDepth?a.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):a.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),a.multiply(md)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Jc=new Y,Qc=new Ms,Zi=new Y;class bx extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=ta,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Jc,Qc,Zi),Zi.x===1&&Zi.y===1&&Zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jc,Qc,Zi.set(1,1,1)).invert()}updateWorldMatrix(t,i,a=!1){super.updateWorldMatrix(t,i,a),this.matrixWorld.decompose(Jc,Qc,Zi),Zi.x===1&&Zi.y===1&&Zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jc,Qc,Zi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vs=new Y,fv=new qt,hv=new qt;class ii extends bx{constructor(t=50,i=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=gu*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(lu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gu*2*Math.atan(Math.tan(lu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,a){vs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vs.x,vs.y).multiplyScalar(-t/vs.z),vs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(vs.x,vs.y).multiplyScalar(-t/vs.z)}getViewSize(t,i){return this.getViewBounds(t,fv,hv),i.subVectors(hv,fv)}setViewOffset(t,i,a,l,c,f){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(lu*.5*this.fov)/this.zoom,a=2*i,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,d=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*a/d,l*=f.width/m,a*=f.height/d}const p=this.filmOffset;p!==0&&(c+=t*p/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-a,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class E1 extends Op{constructor(){super(new ii(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const i=this.camera,a=gu*2*t.angle*this.focus,l=this.mapSize.width/this.mapSize.height*this.aspect,c=t.distance||i.far;(a!==i.fov||l!==i.aspect||c!==i.far)&&(i.fov=a,i.aspect=l,i.far=c,i.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class T1 extends Tu{constructor(t,i,a=0,l=Math.PI/3,c=0,f=2){super(t,i),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.distance=a,this.angle=l,this.penumbra=c,this.decay=f,this.map=null,this.shadow=new E1}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.angle=this.angle,i.object.decay=this.decay,i.object.penumbra=this.penumbra,i.object.target=this.target.uuid,this.map&&this.map.isTexture&&(i.object.map=this.map.toJSON(t).uuid),i.object.shadow=this.shadow.toJSON(),i}}class A1 extends Op{constructor(){super(new ii(90,1,.5,500)),this.isPointLightShadow=!0}}class w1 extends Tu{constructor(t,i,a=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=l,this.shadow=new A1}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class Pp extends bx{constructor(t=-1,i=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,p=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=d*this.view.offsetX,f=c+d*this.view.width,p-=g*this.view.offsetY,m=p-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,p,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class C1 extends Op{constructor(){super(new Pp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class R1 extends Tu{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new C1}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class N1 extends Tu{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const qr=-90,jr=1;class D1 extends wn{constructor(t,i,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ii(qr,jr,t,i);l.layers=this.layers,this.add(l);const c=new ii(qr,jr,t,i);c.layers=this.layers,this.add(c);const f=new ii(qr,jr,t,i);f.layers=this.layers,this.add(f);const p=new ii(qr,jr,t,i);p.layers=this.layers,this.add(p);const m=new ii(qr,jr,t,i);m.layers=this.layers,this.add(m);const d=new ii(qr,jr,t,i);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[a,l,c,f,p,m]=i;for(const d of i)this.remove(d);if(t===ta)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),p.up.set(0,1,0),p.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===gl)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),p.up.set(0,-1,0),p.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of i)this.add(d),d.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,p,m,d,g]=this.children,_=t.getRenderTarget(),v=t.getActiveCubeFace(),b=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const w=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let x=!1;t.isWebGLRenderer===!0?x=t.state.buffers.depth.getReversed():x=t.reversedDepthBuffer,t.setRenderTarget(a,0,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(a,1,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,f),t.setRenderTarget(a,2,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),t.setRenderTarget(a,3,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(a,4,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),a.texture.generateMipmaps=w,t.setRenderTarget(a,5,l),x&&t.autoClear===!1&&t.clearDepth(),t.render(i,g),t.setRenderTarget(_,v,b),t.xr.enabled=E,a.texture.needsPMREMUpdate=!0}}class U1 extends ii{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const dv=new nn;class L1{constructor(t,i,a=0,l=1/0){this.ray=new Mu(t,i),this.near=a,this.far=l,this.camera=null,this.layers=new wp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):we("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return dv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dv),this}intersectObject(t,i=!0,a=[]){return fp(t,this,a,i),a.sort(pv),a}intersectObjects(t,i=!0,a=[]){for(let l=0,c=t.length;l<c;l++)fp(t[l],this,a,i);return a.sort(pv),a}}function pv(r,t){return r.distance-t.distance}function fp(r,t,i,a){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&a===!0){const c=r.children;for(let f=0,p=c.length;f<p;f++)fp(c[f],t,i,!0)}}class mv{constructor(t=1,i=0,a=0){this.radius=t,this.phi=i,this.theta=a}set(t,i,a){return this.radius=t,this.phi=i,this.theta=a,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,a){return this.radius=Math.sqrt(t*t+i*i+a*a),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,a),this.phi=Math.acos(_e(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Gp=class Gp{constructor(t,i,a,l){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,a,l)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let a=0;a<4;a++)this.elements[a]=t[a+i];return this}set(t,i,a,l){const c=this.elements;return c[0]=t,c[2]=i,c[1]=a,c[3]=l,this}};Gp.prototype.isMatrix2=!0;let gv=Gp;class O1 extends Es{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){oe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function _v(r,t,i,a){const l=P1(a);switch(i){case lx:return r*t;case ux:return r*t/l.components*l.byteLength;case Sp:return r*t/l.components*l.byteLength;case ir:return r*t*2/l.components*l.byteLength;case Mp:return r*t*2/l.components*l.byteLength;case cx:return r*t*3/l.components*l.byteLength;case Gi:return r*t*4/l.components*l.byteLength;case bp:return r*t*4/l.components*l.byteLength;case au:case su:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ru:case ou:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Pd:case Bd:return Math.max(r,16)*Math.max(t,8)/4;case Od:case Id:return Math.max(r,8)*Math.max(t,8)/2;case zd:case Fd:case Gd:case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Hd:case fu:case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Yd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case jd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Jd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ep:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case np:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ip:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ap:case sp:case rp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case op:case lp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case hu:case cp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function P1(r){switch(r){case vi:case ax:return{byteLength:1,components:1};case pl:case sx:case Ia:return{byteLength:2,components:1};case xp:case yp:return{byteLength:2,components:4};case aa:case vp:case $i:return{byteLength:4,components:1};case rx:case ox:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gp}}));typeof window<"u"&&(window.__THREE__?oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ex(){let r=null,t=!1,i=null,a=null;function l(c,f){i(c,f),a=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&r!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function I1(r){const t=new WeakMap;function i(p,m){const d=p.array,g=p.usage,_=d.byteLength,v=r.createBuffer();r.bindBuffer(m,v),r.bufferData(m,d,g),p.onUploadCallback();let b;if(d instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)b=r.HALF_FLOAT;else if(d instanceof Uint16Array)p.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)b=r.SHORT;else if(d instanceof Uint32Array)b=r.UNSIGNED_INT;else if(d instanceof Int32Array)b=r.INT;else if(d instanceof Int8Array)b=r.BYTE;else if(d instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:b,bytesPerElement:d.BYTES_PER_ELEMENT,version:p.version,size:_}}function a(p,m,d){const g=m.array,_=m.updateRanges;if(r.bindBuffer(d,p),_.length===0)r.bufferSubData(d,0,g);else{_.sort((b,E)=>b.start-E.start);let v=0;for(let b=1;b<_.length;b++){const E=_[v],w=_[b];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++v,_[v]=w)}_.length=v+1;for(let b=0,E=_.length;b<E;b++){const w=_[b];r.bufferSubData(d,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(p){return p.isInterleavedBufferAttribute&&(p=p.data),t.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=t.get(p);m&&(r.deleteBuffer(m.buffer),t.delete(p))}function f(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const g=t.get(p);(!g||g.version<p.version)&&t.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const d=t.get(p);if(d===void 0)t.set(p,i(p,m));else if(d.version<p.version){if(d.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(d.buffer,p,m),d.version=p.version}}return{get:l,remove:c,update:f}}var B1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,z1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,F1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,H1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,G1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,V1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,X1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,W1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Y1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,q1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,j1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Z1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,K1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,J1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Q1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,aE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,rE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,oE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,cE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dE="gl_FragColor = linearToOutputTexel( gl_FragColor );",pE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_E=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ME=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,EE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,TE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,RE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,NE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,DE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,LE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,PE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,IE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,BE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,HE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,GE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,XE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,WE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,YE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,KE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,JE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,QE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$E=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,oT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_T=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ST=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,MT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ET=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,TT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,AT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,NT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,DT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,IT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const BT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,WT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,YT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,qT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,JT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,QT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$T=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,aA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ge={alphahash_fragment:B1,alphahash_pars_fragment:z1,alphamap_fragment:F1,alphamap_pars_fragment:H1,alphatest_fragment:G1,alphatest_pars_fragment:V1,aomap_fragment:k1,aomap_pars_fragment:X1,batching_pars_vertex:W1,batching_vertex:Y1,begin_vertex:q1,beginnormal_vertex:j1,bsdfs:Z1,iridescence_fragment:K1,bumpmap_pars_fragment:J1,clipping_planes_fragment:Q1,clipping_planes_pars_fragment:$1,clipping_planes_pars_vertex:tE,clipping_planes_vertex:eE,color_fragment:nE,color_pars_fragment:iE,color_pars_vertex:aE,color_vertex:sE,common:rE,cube_uv_reflection_fragment:oE,defaultnormal_vertex:lE,displacementmap_pars_vertex:cE,displacementmap_vertex:uE,emissivemap_fragment:fE,emissivemap_pars_fragment:hE,colorspace_fragment:dE,colorspace_pars_fragment:pE,envmap_fragment:mE,envmap_common_pars_fragment:gE,envmap_pars_fragment:_E,envmap_pars_vertex:vE,envmap_physical_pars_fragment:RE,envmap_vertex:xE,fog_vertex:yE,fog_pars_vertex:SE,fog_fragment:ME,fog_pars_fragment:bE,gradientmap_pars_fragment:EE,lightmap_pars_fragment:TE,lights_lambert_fragment:AE,lights_lambert_pars_fragment:wE,lights_pars_begin:CE,lights_toon_fragment:NE,lights_toon_pars_fragment:DE,lights_phong_fragment:UE,lights_phong_pars_fragment:LE,lights_physical_fragment:OE,lights_physical_pars_fragment:PE,lights_fragment_begin:IE,lights_fragment_maps:BE,lights_fragment_end:zE,lightprobes_pars_fragment:FE,logdepthbuf_fragment:HE,logdepthbuf_pars_fragment:GE,logdepthbuf_pars_vertex:VE,logdepthbuf_vertex:kE,map_fragment:XE,map_pars_fragment:WE,map_particle_fragment:YE,map_particle_pars_fragment:qE,metalnessmap_fragment:jE,metalnessmap_pars_fragment:ZE,morphinstance_vertex:KE,morphcolor_vertex:JE,morphnormal_vertex:QE,morphtarget_pars_vertex:$E,morphtarget_vertex:tT,normal_fragment_begin:eT,normal_fragment_maps:nT,normal_pars_fragment:iT,normal_pars_vertex:aT,normal_vertex:sT,normalmap_pars_fragment:rT,clearcoat_normal_fragment_begin:oT,clearcoat_normal_fragment_maps:lT,clearcoat_pars_fragment:cT,iridescence_pars_fragment:uT,opaque_fragment:fT,packing:hT,premultiplied_alpha_fragment:dT,project_vertex:pT,dithering_fragment:mT,dithering_pars_fragment:gT,roughnessmap_fragment:_T,roughnessmap_pars_fragment:vT,shadowmap_pars_fragment:xT,shadowmap_pars_vertex:yT,shadowmap_vertex:ST,shadowmask_pars_fragment:MT,skinbase_vertex:bT,skinning_pars_vertex:ET,skinning_vertex:TT,skinnormal_vertex:AT,specularmap_fragment:wT,specularmap_pars_fragment:CT,tonemapping_fragment:RT,tonemapping_pars_fragment:NT,transmission_fragment:DT,transmission_pars_fragment:UT,uv_pars_fragment:LT,uv_pars_vertex:OT,uv_vertex:PT,worldpos_vertex:IT,background_vert:BT,background_frag:zT,backgroundCube_vert:FT,backgroundCube_frag:HT,cube_vert:GT,cube_frag:VT,depth_vert:kT,depth_frag:XT,distance_vert:WT,distance_frag:YT,equirect_vert:qT,equirect_frag:jT,linedashed_vert:ZT,linedashed_frag:KT,meshbasic_vert:JT,meshbasic_frag:QT,meshlambert_vert:$T,meshlambert_frag:tA,meshmatcap_vert:eA,meshmatcap_frag:nA,meshnormal_vert:iA,meshnormal_frag:aA,meshphong_vert:sA,meshphong_frag:rA,meshphysical_vert:oA,meshphysical_frag:lA,meshtoon_vert:cA,meshtoon_frag:uA,points_vert:fA,points_frag:hA,shadow_vert:dA,shadow_frag:pA,sprite_vert:mA,sprite_frag:gA},zt={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},Ji={basic:{uniforms:Yn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Yn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ve(0)},envMapIntensity:{value:1}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Yn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Yn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Yn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new ve(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Yn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Yn([zt.points,zt.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Yn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Yn([zt.common,zt.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Yn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Yn([zt.sprite,zt.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distance:{uniforms:Yn([zt.common,zt.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distance_vert,fragmentShader:ge.distance_frag},shadow:{uniforms:Yn([zt.lights,zt.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};Ji.physical={uniforms:Yn([Ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};const $c={r:0,b:0,g:0},_A=new nn,Tx=new he;Tx.set(-1,0,0,0,1,0,0,0,1);function vA(r,t,i,a,l,c){const f=new ve(0);let p=l===!0?0:1,m,d,g=null,_=0,v=null;function b(z){let F=z.isScene===!0?z.background:null;if(F&&F.isTexture){const N=z.backgroundBlurriness>0;F=t.get(F,N)}return F}function E(z){let F=!1;const N=b(z);N===null?x(f,p):N&&N.isColor&&(x(N,1),F=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,c):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||F)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(z,F){const N=b(F);N&&(N.isCubeTexture||N.mapping===yu)?(d===void 0&&(d=new ae(new gn(1,1,1),new sa({name:"BackgroundCubeMaterial",uniforms:so(Ji.backgroundCube.uniforms),vertexShader:Ji.backgroundCube.vertexShader,fragmentShader:Ji.backgroundCube.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,U,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),d.material.uniforms.envMap.value=N,d.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(_A.makeRotationFromEuler(F.backgroundRotation)).transpose(),N.isCubeTexture&&N.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Tx),d.material.toneMapped=Te.getTransfer(N.colorSpace)!==Xe,(g!==N||_!==N.version||v!==r.toneMapping)&&(d.material.needsUpdate=!0,g=N,_=N.version,v=r.toneMapping),d.layers.enableAll(),z.unshift(d,d.geometry,d.material,0,0,null)):N&&N.isTexture&&(m===void 0&&(m=new ae(new Ts(2,2),new sa({name:"BackgroundMaterial",uniforms:so(Ji.background.uniforms),vertexShader:Ji.background.vertexShader,fragmentShader:Ji.background.fragmentShader,side:Ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=N,m.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,m.material.toneMapped=Te.getTransfer(N.colorSpace)!==Xe,N.matrixAutoUpdate===!0&&N.updateMatrix(),m.material.uniforms.uvTransform.value.copy(N.matrix),(g!==N||_!==N.version||v!==r.toneMapping)&&(m.material.needsUpdate=!0,g=N,_=N.version,v=r.toneMapping),m.layers.enableAll(),z.unshift(m,m.geometry,m.material,0,0,null))}function x(z,F){z.getRGB($c,Mx(r)),i.buffers.color.setClear($c.r,$c.g,$c.b,F,c)}function y(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(z,F=1){f.set(z),p=F,x(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(z){p=z,x(f,p)},render:E,addToRenderList:w,dispose:y}}function xA(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=v(null);let c=l,f=!1;function p(V,q,ut,gt,Z){let H=!1;const k=_(V,gt,ut,q);c!==k&&(c=k,d(c.object)),H=b(V,gt,ut,Z),H&&E(V,gt,ut,Z),Z!==null&&t.update(Z,r.ELEMENT_ARRAY_BUFFER),(H||f)&&(f=!1,N(V,q,ut,gt),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function m(){return r.createVertexArray()}function d(V){return r.bindVertexArray(V)}function g(V){return r.deleteVertexArray(V)}function _(V,q,ut,gt){const Z=gt.wireframe===!0;let H=a[q.id];H===void 0&&(H={},a[q.id]=H);const k=V.isInstancedMesh===!0?V.id:0;let it=H[k];it===void 0&&(it={},H[k]=it);let yt=it[ut.id];yt===void 0&&(yt={},it[ut.id]=yt);let D=yt[Z];return D===void 0&&(D=v(m()),yt[Z]=D),D}function v(V){const q=[],ut=[],gt=[];for(let Z=0;Z<i;Z++)q[Z]=0,ut[Z]=0,gt[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ut,attributeDivisors:gt,object:V,attributes:{},index:null}}function b(V,q,ut,gt){const Z=c.attributes,H=q.attributes;let k=0;const it=ut.getAttributes();for(const yt in it)if(it[yt].location>=0){const M=Z[yt];let O=H[yt];if(O===void 0&&(yt==="instanceMatrix"&&V.instanceMatrix&&(O=V.instanceMatrix),yt==="instanceColor"&&V.instanceColor&&(O=V.instanceColor)),M===void 0||M.attribute!==O||O&&M.data!==O.data)return!0;k++}return c.attributesNum!==k||c.index!==gt}function E(V,q,ut,gt){const Z={},H=q.attributes;let k=0;const it=ut.getAttributes();for(const yt in it)if(it[yt].location>=0){let M=H[yt];M===void 0&&(yt==="instanceMatrix"&&V.instanceMatrix&&(M=V.instanceMatrix),yt==="instanceColor"&&V.instanceColor&&(M=V.instanceColor));const O={};O.attribute=M,M&&M.data&&(O.data=M.data),Z[yt]=O,k++}c.attributes=Z,c.attributesNum=k,c.index=gt}function w(){const V=c.newAttributes;for(let q=0,ut=V.length;q<ut;q++)V[q]=0}function x(V){y(V,0)}function y(V,q){const ut=c.newAttributes,gt=c.enabledAttributes,Z=c.attributeDivisors;ut[V]=1,gt[V]===0&&(r.enableVertexAttribArray(V),gt[V]=1),Z[V]!==q&&(r.vertexAttribDivisor(V,q),Z[V]=q)}function z(){const V=c.newAttributes,q=c.enabledAttributes;for(let ut=0,gt=q.length;ut<gt;ut++)q[ut]!==V[ut]&&(r.disableVertexAttribArray(ut),q[ut]=0)}function F(V,q,ut,gt,Z,H,k){k===!0?r.vertexAttribIPointer(V,q,ut,Z,H):r.vertexAttribPointer(V,q,ut,gt,Z,H)}function N(V,q,ut,gt){w();const Z=gt.attributes,H=ut.getAttributes(),k=q.defaultAttributeValues;for(const it in H){const yt=H[it];if(yt.location>=0){let D=Z[it];if(D===void 0&&(it==="instanceMatrix"&&V.instanceMatrix&&(D=V.instanceMatrix),it==="instanceColor"&&V.instanceColor&&(D=V.instanceColor)),D!==void 0){const M=D.normalized,O=D.itemSize,tt=t.get(D);if(tt===void 0)continue;const mt=tt.buffer,bt=tt.type,J=tt.bytesPerElement,rt=bt===r.INT||bt===r.UNSIGNED_INT||D.gpuType===vp;if(D.isInterleavedBufferAttribute){const dt=D.data,wt=dt.stride,Ht=D.offset;if(dt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<yt.locationSize;Lt++)y(yt.location+Lt,dt.meshPerAttribute);V.isInstancedMesh!==!0&&gt._maxInstanceCount===void 0&&(gt._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Lt=0;Lt<yt.locationSize;Lt++)x(yt.location+Lt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let Lt=0;Lt<yt.locationSize;Lt++)F(yt.location+Lt,O/yt.locationSize,bt,M,wt*J,(Ht+O/yt.locationSize*Lt)*J,rt)}else{if(D.isInstancedBufferAttribute){for(let dt=0;dt<yt.locationSize;dt++)y(yt.location+dt,D.meshPerAttribute);V.isInstancedMesh!==!0&&gt._maxInstanceCount===void 0&&(gt._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let dt=0;dt<yt.locationSize;dt++)x(yt.location+dt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let dt=0;dt<yt.locationSize;dt++)F(yt.location+dt,O/yt.locationSize,bt,M,O*J,O/yt.locationSize*dt*J,rt)}}else if(k!==void 0){const M=k[it];if(M!==void 0)switch(M.length){case 2:r.vertexAttrib2fv(yt.location,M);break;case 3:r.vertexAttrib3fv(yt.location,M);break;case 4:r.vertexAttrib4fv(yt.location,M);break;default:r.vertexAttrib1fv(yt.location,M)}}}}z()}function P(){L();for(const V in a){const q=a[V];for(const ut in q){const gt=q[ut];for(const Z in gt){const H=gt[Z];for(const k in H)g(H[k].object),delete H[k];delete gt[Z]}}delete a[V]}}function U(V){if(a[V.id]===void 0)return;const q=a[V.id];for(const ut in q){const gt=q[ut];for(const Z in gt){const H=gt[Z];for(const k in H)g(H[k].object),delete H[k];delete gt[Z]}}delete a[V.id]}function B(V){for(const q in a){const ut=a[q];for(const gt in ut){const Z=ut[gt];if(Z[V.id]===void 0)continue;const H=Z[V.id];for(const k in H)g(H[k].object),delete H[k];delete Z[V.id]}}}function A(V){for(const q in a){const ut=a[q],gt=V.isInstancedMesh===!0?V.id:0,Z=ut[gt];if(Z!==void 0){for(const H in Z){const k=Z[H];for(const it in k)g(k[it].object),delete k[it];delete Z[H]}delete ut[gt],Object.keys(ut).length===0&&delete a[q]}}}function L(){W(),f=!0,c!==l&&(c=l,d(c.object))}function W(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:p,reset:L,resetDefaultState:W,dispose:P,releaseStatesOfGeometry:U,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:w,enableAttribute:x,disableUnusedAttributes:z}}function yA(r,t,i){let a;function l(m){a=m}function c(m,d){r.drawArrays(a,m,d),i.update(d,a,1)}function f(m,d,g){g!==0&&(r.drawArraysInstanced(a,m,d,g),i.update(d,a,g))}function p(m,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,d,0,g);let v=0;for(let b=0;b<g;b++)v+=d[b];i.update(v,a,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function SA(r,t,i,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const B=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==Gi&&a.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(B){const A=B===Ia&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(B!==vi&&a.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==$i&&!A)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=i.precision!==void 0?i.precision:"highp";const g=m(d);g!==d&&(oe("WebGLRenderer:",d,"not supported, using",g,"instead."),d=g);const _=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&v===!1&&oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),z=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),F=r.getParameter(r.MAX_VARYING_VECTORS),N=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=r.getParameter(r.MAX_SAMPLES),U=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:p,precision:d,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:b,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:x,maxAttributes:y,maxVertexUniforms:z,maxVaryings:F,maxFragmentUniforms:N,maxSamples:P,samples:U}}function MA(r){const t=this;let i=null,a=0,l=!1,c=!1;const f=new Na,p=new he,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const b=_.length!==0||v||a!==0||l;return l=v,a=_.length,b},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,v){i=g(_,v,0)},this.setState=function(_,v,b){const E=_.clippingPlanes,w=_.clipIntersection,x=_.clipShadows,y=r.get(_);if(!l||E===null||E.length===0||c&&!x)c?g(null):d();else{const z=c?0:a,F=z*4;let N=y.clippingState||null;m.value=N,N=g(E,v,F,b);for(let P=0;P!==F;++P)N[P]=i[P];y.clippingState=N,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=z}};function d(){m.value!==i&&(m.value=i,m.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function g(_,v,b,E){const w=_!==null?_.length:0;let x=null;if(w!==0){if(x=m.value,E!==!0||x===null){const y=b+w*4,z=v.matrixWorldInverse;p.getNormalMatrix(z),(x===null||x.length<y)&&(x=new Float32Array(y));for(let F=0,N=b;F!==w;++F,N+=4)f.copy(_[F]).applyMatrix4(z,p),f.normal.toArray(x,N),x[N+3]=f.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,x}}const ys=4,vv=[.125,.215,.35,.446,.526,.582],Qs=20,bA=256,ol=new Pp,xv=new ve;let gd=null,_d=0,vd=0,xd=!1;const EA=new Y;class yv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,a=.1,l=100,c={}){const{size:f=256,position:p=EA}=c;gd=this._renderer.getRenderTarget(),_d=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,a,l,m,p),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gd,_d,vd),this._renderer.xr.enabled=xd,t.scissorTest=!1,Zr(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===nr||t.mapping===io?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gd=this._renderer.getRenderTarget(),_d=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel(),xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=i||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,a={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:Ia,format:Gi,colorSpace:du,depthBuffer:!1},l=Sv(t,i,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sv(t,i,a);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=TA(c)),this._blurMaterial=wA(c,t,i),this._ggxMaterial=AA(c,t,i)}return l}_compileMaterial(t){const i=new ae(new qn,t);this._renderer.compile(i,ol)}_sceneToCubeUV(t,i,a,l,c){const m=new ii(90,1,i,a),d=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,b=_.toneMapping;_.getClearColor(xv),_.toneMapping=ea,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new gn,new Vi({name:"PMREM.Background",side:ai,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,x=w.material;let y=!1;const z=t.background;z?z.isColor&&(x.color.copy(z),t.background=null,y=!0):(x.color.copy(xv),y=!0);for(let F=0;F<6;F++){const N=F%3;N===0?(m.up.set(0,d[F],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[F],c.y,c.z)):N===1?(m.up.set(0,0,d[F]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[F],c.z)):(m.up.set(0,d[F],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[F]));const P=this._cubeSize;Zr(l,N*P,F>2?P:0,P,P),_.setRenderTarget(l),y&&_.render(w,m),_.render(t,m)}_.toneMapping=b,_.autoClear=v,t.background=z}_textureToCubeUV(t,i){const a=this._renderer,l=t.mapping===nr||t.mapping===io;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=bv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const p=c.uniforms;p.envMap.value=t;const m=this._cubeSize;Zr(i,0,0,3*m,2*m),a.setRenderTarget(i),a.render(f,ol)}_applyPMREM(t){const i=this._renderer,a=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=a}_applyGGXFilter(t,i,a){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,p=this._lodMeshes[a];p.material=f;const m=f.uniforms,d=a/(this._lodMeshes.length-1),g=i/(this._lodMeshes.length-1),_=Math.sqrt(d*d-g*g),v=0+d*1.25,b=_*v,{_lodMax:E}=this,w=this._sizeLods[a],x=3*w*(a>E-ys?a-E+ys:0),y=4*(this._cubeSize-w);m.envMap.value=t.texture,m.roughness.value=b,m.mipInt.value=E-i,Zr(c,x,y,3*w,2*w),l.setRenderTarget(c),l.render(p,ol),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-a,Zr(t,x,y,3*w,2*w),l.setRenderTarget(t),l.render(p,ol)}_blur(t,i,a,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,i,a,l,"latitudinal",c),this._halfBlur(f,t,a,a,l,"longitudinal",c)}_halfBlur(t,i,a,l,c,f,p){const m=this._renderer,d=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&we("blur direction must be either latitudinal or longitudinal!");const g=3,_=this._lodMeshes[l];_.material=d;const v=d.uniforms,b=this._sizeLods[a]-1,E=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*Qs-1),w=c/E,x=isFinite(c)?1+Math.floor(g*w):Qs;x>Qs&&oe(`sigmaRadians, ${c}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Qs}`);const y=[];let z=0;for(let B=0;B<Qs;++B){const A=B/w,L=Math.exp(-A*A/2);y.push(L),B===0?z+=L:B<x&&(z+=2*L)}for(let B=0;B<y.length;B++)y[B]=y[B]/z;v.envMap.value=t.texture,v.samples.value=x,v.weights.value=y,v.latitudinal.value=f==="latitudinal",p&&(v.poleAxis.value=p);const{_lodMax:F}=this;v.dTheta.value=E,v.mipInt.value=F-a;const N=this._sizeLods[l],P=3*N*(l>F-ys?l-F+ys:0),U=4*(this._cubeSize-N);Zr(i,P,U,3*N,2*N),m.setRenderTarget(i),m.render(_,ol)}}function TA(r){const t=[],i=[],a=[];let l=r;const c=r-ys+1+vv.length;for(let f=0;f<c;f++){const p=Math.pow(2,l);t.push(p);let m=1/p;f>r-ys?m=vv[f-r+ys-1]:f===0&&(m=0),i.push(m);const d=1/(p-2),g=-d,_=1+d,v=[g,g,_,g,_,_,g,g,_,_,g,_],b=6,E=6,w=3,x=2,y=1,z=new Float32Array(w*E*b),F=new Float32Array(x*E*b),N=new Float32Array(y*E*b);for(let U=0;U<b;U++){const B=U%3*2/3-1,A=U>2?0:-1,L=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];z.set(L,w*E*U),F.set(v,x*E*U);const W=[U,U,U,U,U,U];N.set(W,y*E*U)}const P=new qn;P.setAttribute("position",new ia(z,w)),P.setAttribute("uv",new ia(F,x)),P.setAttribute("faceIndex",new ia(N,y)),a.push(new ae(P,null)),l>ys&&l--}return{lodMeshes:a,sizeLods:t,sigmas:i}}function Sv(r,t,i){const a=new na(r,t,i);return a.texture.mapping=yu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Zr(r,t,i,a,l){r.viewport.set(t,i,a,l),r.scissor.set(t,i,a,l)}function AA(r,t,i){return new sa({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Au(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function wA(r,t,i){const a=new Float32Array(Qs),l=new Y(0,1,0);return new sa({name:"SphericalGaussianBlur",defines:{n:Qs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Mv(){return new sa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function bv(){return new sa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Au(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ax extends na{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new _x(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new gn(5,5,5),c=new sa({name:"CubemapFromEquirect",uniforms:so(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:ai,blending:Oa});c.uniforms.tEquirect.value=i;const f=new ae(l,c),p=i.minFilter;return i.minFilter===tr&&(i.minFilter=kn),new D1(1,10,this).update(t,f),i.minFilter=p,f.geometry.dispose(),f.material.dispose(),this}clear(t,i=!0,a=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(i,a,l);t.setRenderTarget(c)}}function CA(r){let t=new WeakMap,i=new WeakMap,a=null;function l(v,b=!1){return v==null?null:b?f(v):c(v)}function c(v){if(v&&v.isTexture){const b=v.mapping;if(b===Fh||b===Hh)if(t.has(v)){const E=t.get(v).texture;return p(E,v.mapping)}else{const E=v.image;if(E&&E.height>0){const w=new Ax(E.height);return w.fromEquirectangularTexture(r,v),t.set(v,w),v.addEventListener("dispose",d),p(w.texture,v.mapping)}else return null}}return v}function f(v){if(v&&v.isTexture){const b=v.mapping,E=b===Fh||b===Hh,w=b===nr||b===io;if(E||w){let x=i.get(v);const y=x!==void 0?x.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==y)return a===null&&(a=new yv(r)),x=E?a.fromEquirectangular(v,x):a.fromCubemap(v,x),x.texture.pmremVersion=v.pmremVersion,i.set(v,x),x.texture;if(x!==void 0)return x.texture;{const z=v.image;return E&&z&&z.height>0||w&&z&&m(z)?(a===null&&(a=new yv(r)),x=E?a.fromEquirectangular(v):a.fromCubemap(v),x.texture.pmremVersion=v.pmremVersion,i.set(v,x),v.addEventListener("dispose",g),x.texture):null}}}return v}function p(v,b){return b===Fh?v.mapping=nr:b===Hh&&(v.mapping=io),v}function m(v){let b=0;const E=6;for(let w=0;w<E;w++)v[w]!==void 0&&b++;return b===E}function d(v){const b=v.target;b.removeEventListener("dispose",d);const E=t.get(b);E!==void 0&&(t.delete(b),E.dispose())}function g(v){const b=v.target;b.removeEventListener("dispose",g);const E=i.get(b);E!==void 0&&(i.delete(b),E.dispose())}function _(){t=new WeakMap,i=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:l,dispose:_}}function RA(r){const t={};function i(a){if(t[a]!==void 0)return t[a];const l=r.getExtension(a);return t[a]=l,l}return{has:function(a){return i(a)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(a){const l=i(a);return l===null&&to("WebGLRenderer: "+a+" extension not supported."),l}}}function NA(r,t,i,a){const l={},c=new WeakMap;function f(_){const v=_.target;v.index!==null&&t.remove(v.index);for(const E in v.attributes)t.remove(v.attributes[E]);v.removeEventListener("dispose",f),delete l[v.id];const b=c.get(v);b&&(t.remove(b),c.delete(v)),a.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function p(_,v){return l[v.id]===!0||(v.addEventListener("dispose",f),l[v.id]=!0,i.memory.geometries++),v}function m(_){const v=_.attributes;for(const b in v)t.update(v[b],r.ARRAY_BUFFER)}function d(_){const v=[],b=_.index,E=_.attributes.position;let w=0;if(E===void 0)return;if(b!==null){const z=b.array;w=b.version;for(let F=0,N=z.length;F<N;F+=3){const P=z[F+0],U=z[F+1],B=z[F+2];v.push(P,U,U,B,B,P)}}else{const z=E.array;w=E.version;for(let F=0,N=z.length/3-1;F<N;F+=3){const P=F+0,U=F+1,B=F+2;v.push(P,U,U,B,B,P)}}const x=new(E.count>=65535?mx:px)(v,1);x.version=w;const y=c.get(_);y&&t.remove(y),c.set(_,x)}function g(_){const v=c.get(_);if(v){const b=_.index;b!==null&&v.version<b.version&&d(_)}else d(_);return c.get(_)}return{get:p,update:m,getWireframeAttribute:g}}function DA(r,t,i){let a;function l(_){a=_}let c,f;function p(_){c=_.type,f=_.bytesPerElement}function m(_,v){r.drawElements(a,v,c,_*f),i.update(v,a,1)}function d(_,v,b){b!==0&&(r.drawElementsInstanced(a,v,c,_*f,b),i.update(v,a,b))}function g(_,v,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,v,0,c,_,0,b);let w=0;for(let x=0;x<b;x++)w+=v[x];i.update(w,a,1)}this.setMode=l,this.setIndex=p,this.render=m,this.renderInstances=d,this.renderMultiDraw=g}function UA(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,p){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=p*(c/3);break;case r.LINES:i.lines+=p*(c/2);break;case r.LINE_STRIP:i.lines+=p*(c-1);break;case r.LINE_LOOP:i.lines+=p*c;break;case r.POINTS:i.points+=p*c;break;default:we("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:a}}function LA(r,t,i){const a=new WeakMap,l=new cn;function c(f,p,m){const d=f.morphTargetInfluences,g=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,_=g!==void 0?g.length:0;let v=a.get(p);if(v===void 0||v.count!==_){let W=function(){A.dispose(),a.delete(p),p.removeEventListener("dispose",W)};var b=W;v!==void 0&&v.texture.dispose();const E=p.morphAttributes.position!==void 0,w=p.morphAttributes.normal!==void 0,x=p.morphAttributes.color!==void 0,y=p.morphAttributes.position||[],z=p.morphAttributes.normal||[],F=p.morphAttributes.color||[];let N=0;E===!0&&(N=1),w===!0&&(N=2),x===!0&&(N=3);let P=p.attributes.position.count*N,U=1;P>t.maxTextureSize&&(U=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const B=new Float32Array(P*U*4*_),A=new hx(B,P,U,_);A.type=$i,A.needsUpdate=!0;const L=N*4;for(let V=0;V<_;V++){const q=y[V],ut=z[V],gt=F[V],Z=P*U*4*V;for(let H=0;H<q.count;H++){const k=H*L;E===!0&&(l.fromBufferAttribute(q,H),B[Z+k+0]=l.x,B[Z+k+1]=l.y,B[Z+k+2]=l.z,B[Z+k+3]=0),w===!0&&(l.fromBufferAttribute(ut,H),B[Z+k+4]=l.x,B[Z+k+5]=l.y,B[Z+k+6]=l.z,B[Z+k+7]=0),x===!0&&(l.fromBufferAttribute(gt,H),B[Z+k+8]=l.x,B[Z+k+9]=l.y,B[Z+k+10]=l.z,B[Z+k+11]=gt.itemSize===4?l.w:1)}}v={count:_,texture:A,size:new qt(P,U)},a.set(p,v),p.addEventListener("dispose",W)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let E=0;for(let x=0;x<d.length;x++)E+=d[x];const w=p.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",w),m.getUniforms().setValue(r,"morphTargetInfluences",d)}m.getUniforms().setValue(r,"morphTargetsTexture",v.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:c}}function OA(r,t,i,a,l){let c=new WeakMap;function f(d){const g=l.render.frame,_=d.geometry,v=t.get(d,_);if(c.get(v)!==g&&(t.update(v),c.set(v,g)),d.isInstancedMesh&&(d.hasEventListener("dispose",m)===!1&&d.addEventListener("dispose",m),c.get(d)!==g&&(i.update(d.instanceMatrix,r.ARRAY_BUFFER),d.instanceColor!==null&&i.update(d.instanceColor,r.ARRAY_BUFFER),c.set(d,g))),d.isSkinnedMesh){const b=d.skeleton;c.get(b)!==g&&(b.update(),c.set(b,g))}return v}function p(){c=new WeakMap}function m(d){const g=d.target;g.removeEventListener("dispose",m),a.releaseStatesOfObject(g),i.remove(g.instanceMatrix),g.instanceColor!==null&&i.remove(g.instanceColor)}return{update:f,dispose:p}}const PA={[Jv]:"LINEAR_TONE_MAPPING",[Qv]:"REINHARD_TONE_MAPPING",[$v]:"CINEON_TONE_MAPPING",[_p]:"ACES_FILMIC_TONE_MAPPING",[ex]:"AGX_TONE_MAPPING",[nx]:"NEUTRAL_TONE_MAPPING",[tx]:"CUSTOM_TONE_MAPPING"};function IA(r,t,i,a,l,c){const f=new na(t,i,{type:r,depthBuffer:l,stencilBuffer:c,samples:a?4:0,depthTexture:l?new ao(t,i):void 0}),p=new na(t,i,{type:Ia,depthBuffer:!1,stencilBuffer:!1}),m=new qn;m.setAttribute("position",new dn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new dn([0,2,0,0,2,0],2));const d=new x1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),g=new ae(m,d),_=new Pp(-1,1,1,-1,0,1);let v=null,b=null,E=!1,w,x=null,y=[],z=!1;this.setSize=function(F,N){f.setSize(F,N),p.setSize(F,N);for(let P=0;P<y.length;P++){const U=y[P];U.setSize&&U.setSize(F,N)}},this.setEffects=function(F){y=F,z=y.length>0&&y[0].isRenderPass===!0;const N=f.width,P=f.height;for(let U=0;U<y.length;U++){const B=y[U];B.setSize&&B.setSize(N,P)}},this.begin=function(F,N){if(E||F.toneMapping===ea&&y.length===0)return!1;if(x=N,N!==null){const P=N.width,U=N.height;(f.width!==P||f.height!==U)&&this.setSize(P,U)}return z===!1&&F.setRenderTarget(f),w=F.toneMapping,F.toneMapping=ea,!0},this.hasRenderPass=function(){return z},this.end=function(F,N){F.toneMapping=w,E=!0;let P=f,U=p;for(let B=0;B<y.length;B++){const A=y[B];if(A.enabled!==!1&&(A.render(F,U,P,N),A.needsSwap!==!1)){const L=P;P=U,U=L}}if(v!==F.outputColorSpace||b!==F.toneMapping){v=F.outputColorSpace,b=F.toneMapping,d.defines={},Te.getTransfer(v)===Xe&&(d.defines.SRGB_TRANSFER="");const B=PA[b];B&&(d.defines[B]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=P.texture,F.setRenderTarget(x),F.render(g,_),x=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){f.depthTexture&&f.depthTexture.dispose(),f.dispose(),p.dispose(),m.dispose(),d.dispose()}}const wx=new Xn,hp=new ao(1,1),Cx=new hx,Rx=new Pb,Nx=new _x,Ev=[],Tv=[],Av=new Float32Array(16),wv=new Float32Array(9),Cv=new Float32Array(4);function oo(r,t,i){const a=r[0];if(a<=0||a>0)return r;const l=t*i;let c=Ev[l];if(c===void 0&&(c=new Float32Array(l),Ev[l]=c),t!==0){a.toArray(c,0);for(let f=1,p=0;f!==t;++f)p+=i,r[f].toArray(c,p)}return c}function Cn(r,t){if(r.length!==t.length)return!1;for(let i=0,a=r.length;i<a;i++)if(r[i]!==t[i])return!1;return!0}function Rn(r,t){for(let i=0,a=t.length;i<a;i++)r[i]=t[i]}function wu(r,t){let i=Tv[t];i===void 0&&(i=new Int32Array(t),Tv[t]=i);for(let a=0;a!==t;++a)i[a]=r.allocateTextureUnit();return i}function BA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function zA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Cn(i,t))return;r.uniform2fv(this.addr,t),Rn(i,t)}}function FA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Cn(i,t))return;r.uniform3fv(this.addr,t),Rn(i,t)}}function HA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Cn(i,t))return;r.uniform4fv(this.addr,t),Rn(i,t)}}function GA(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(Cn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Rn(i,t)}else{if(Cn(i,a))return;Cv.set(a),r.uniformMatrix2fv(this.addr,!1,Cv),Rn(i,a)}}function VA(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(Cn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Rn(i,t)}else{if(Cn(i,a))return;wv.set(a),r.uniformMatrix3fv(this.addr,!1,wv),Rn(i,a)}}function kA(r,t){const i=this.cache,a=t.elements;if(a===void 0){if(Cn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Rn(i,t)}else{if(Cn(i,a))return;Av.set(a),r.uniformMatrix4fv(this.addr,!1,Av),Rn(i,a)}}function XA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function WA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Cn(i,t))return;r.uniform2iv(this.addr,t),Rn(i,t)}}function YA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Cn(i,t))return;r.uniform3iv(this.addr,t),Rn(i,t)}}function qA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Cn(i,t))return;r.uniform4iv(this.addr,t),Rn(i,t)}}function jA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function ZA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Cn(i,t))return;r.uniform2uiv(this.addr,t),Rn(i,t)}}function KA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Cn(i,t))return;r.uniform3uiv(this.addr,t),Rn(i,t)}}function JA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Cn(i,t))return;r.uniform4uiv(this.addr,t),Rn(i,t)}}function QA(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(hp.compareFunction=i.isReversedDepthBuffer()?Tp:Ep,c=hp):c=wx,i.setTexture2D(t||c,l)}function $A(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTexture3D(t||Rx,l)}function t2(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTextureCube(t||Nx,l)}function e2(r,t,i){const a=this.cache,l=i.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),i.setTexture2DArray(t||Cx,l)}function n2(r){switch(r){case 5126:return BA;case 35664:return zA;case 35665:return FA;case 35666:return HA;case 35674:return GA;case 35675:return VA;case 35676:return kA;case 5124:case 35670:return XA;case 35667:case 35671:return WA;case 35668:case 35672:return YA;case 35669:case 35673:return qA;case 5125:return jA;case 36294:return ZA;case 36295:return KA;case 36296:return JA;case 35678:case 36198:case 36298:case 36306:case 35682:return QA;case 35679:case 36299:case 36307:return $A;case 35680:case 36300:case 36308:case 36293:return t2;case 36289:case 36303:case 36311:case 36292:return e2}}function i2(r,t){r.uniform1fv(this.addr,t)}function a2(r,t){const i=oo(t,this.size,2);r.uniform2fv(this.addr,i)}function s2(r,t){const i=oo(t,this.size,3);r.uniform3fv(this.addr,i)}function r2(r,t){const i=oo(t,this.size,4);r.uniform4fv(this.addr,i)}function o2(r,t){const i=oo(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function l2(r,t){const i=oo(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function c2(r,t){const i=oo(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function u2(r,t){r.uniform1iv(this.addr,t)}function f2(r,t){r.uniform2iv(this.addr,t)}function h2(r,t){r.uniform3iv(this.addr,t)}function d2(r,t){r.uniform4iv(this.addr,t)}function p2(r,t){r.uniform1uiv(this.addr,t)}function m2(r,t){r.uniform2uiv(this.addr,t)}function g2(r,t){r.uniform3uiv(this.addr,t)}function _2(r,t){r.uniform4uiv(this.addr,t)}function v2(r,t,i){const a=this.cache,l=t.length,c=wu(i,l);Cn(a,c)||(r.uniform1iv(this.addr,c),Rn(a,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=hp:f=wx;for(let p=0;p!==l;++p)i.setTexture2D(t[p]||f,c[p])}function x2(r,t,i){const a=this.cache,l=t.length,c=wu(i,l);Cn(a,c)||(r.uniform1iv(this.addr,c),Rn(a,c));for(let f=0;f!==l;++f)i.setTexture3D(t[f]||Rx,c[f])}function y2(r,t,i){const a=this.cache,l=t.length,c=wu(i,l);Cn(a,c)||(r.uniform1iv(this.addr,c),Rn(a,c));for(let f=0;f!==l;++f)i.setTextureCube(t[f]||Nx,c[f])}function S2(r,t,i){const a=this.cache,l=t.length,c=wu(i,l);Cn(a,c)||(r.uniform1iv(this.addr,c),Rn(a,c));for(let f=0;f!==l;++f)i.setTexture2DArray(t[f]||Cx,c[f])}function M2(r){switch(r){case 5126:return i2;case 35664:return a2;case 35665:return s2;case 35666:return r2;case 35674:return o2;case 35675:return l2;case 35676:return c2;case 5124:case 35670:return u2;case 35667:case 35671:return f2;case 35668:case 35672:return h2;case 35669:case 35673:return d2;case 5125:return p2;case 36294:return m2;case 36295:return g2;case 36296:return _2;case 35678:case 36198:case 36298:case 36306:case 35682:return v2;case 35679:case 36299:case 36307:return x2;case 35680:case 36300:case 36308:case 36293:return y2;case 36289:case 36303:case 36311:case 36292:return S2}}class b2{constructor(t,i,a){this.id=t,this.addr=a,this.cache=[],this.type=i.type,this.setValue=n2(i.type)}}class E2{constructor(t,i,a){this.id=t,this.addr=a,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=M2(i.type)}}class T2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const p=l[c];p.setValue(t,i[p.id],a)}}}const yd=/(\w+)(\])?(\[|\.)?/g;function Rv(r,t){r.seq.push(t),r.map[t.id]=t}function A2(r,t,i){const a=r.name,l=a.length;for(yd.lastIndex=0;;){const c=yd.exec(a),f=yd.lastIndex;let p=c[1];const m=c[2]==="]",d=c[3];if(m&&(p=p|0),d===void 0||d==="["&&f+2===l){Rv(i,d===void 0?new b2(p,r,t):new E2(p,r,t));break}else{let _=i.map[p];_===void 0&&(_=new T2(p),Rv(i,_)),i=_}}}class cu{constructor(t,i){this.seq=[],this.map={};const a=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let f=0;f<a;++f){const p=t.getActiveUniform(i,f),m=t.getUniformLocation(i,p.name);A2(p,m,this)}const l=[],c=[];for(const f of this.seq)f.type===t.SAMPLER_2D_SHADOW||f.type===t.SAMPLER_CUBE_SHADOW||f.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,a,l){const c=this.map[i];c!==void 0&&c.setValue(t,a,l)}setOptional(t,i,a){const l=i[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,i,a,l){for(let c=0,f=i.length;c!==f;++c){const p=i[c],m=a[p.id];m.needsUpdate!==!1&&p.setValue(t,m.value,l)}}static seqWithValue(t,i){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in i&&a.push(f)}return a}}function Nv(r,t,i){const a=r.createShader(t);return r.shaderSource(a,i),r.compileShader(a),a}const w2=37297;let C2=0;function R2(r,t){const i=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let f=l;f<c;f++){const p=f+1;a.push(`${p===t?">":" "} ${p}: ${i[f]}`)}return a.join(`
`)}const Dv=new he;function N2(r){Te._getMatrix(Dv,Te.workingColorSpace,r);const t=`mat3( ${Dv.elements.map(i=>i.toFixed(4))} )`;switch(Te.getTransfer(r)){case pu:return[t,"LinearTransferOETF"];case Xe:return[t,"sRGBTransferOETF"];default:return oe("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Uv(r,t,i){const a=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(a&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const p=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+R2(r.getShaderSource(t),p)}else return c}function D2(r,t){const i=N2(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const U2={[Jv]:"Linear",[Qv]:"Reinhard",[$v]:"Cineon",[_p]:"ACESFilmic",[ex]:"AgX",[nx]:"Neutral",[tx]:"Custom"};function L2(r,t){const i=U2[t];return i===void 0?(oe("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const tu=new Y;function O2(){Te.getLuminanceCoefficients(tu);const r=tu.x.toFixed(4),t=tu.y.toFixed(4),i=tu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P2(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ul).join(`
`)}function I2(r){const t=[];for(const i in r){const a=r[i];a!==!1&&t.push("#define "+i+" "+a)}return t.join(`
`)}function B2(r,t){const i={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let p=1;c.type===r.FLOAT_MAT2&&(p=2),c.type===r.FLOAT_MAT3&&(p=3),c.type===r.FLOAT_MAT4&&(p=4),i[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:p}}return i}function ul(r){return r!==""}function Lv(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ov(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const z2=/^[ \t]*#include +<([\w\d./]+)>/gm;function dp(r){return r.replace(z2,H2)}const F2=new Map;function H2(r,t){let i=ge[t];if(i===void 0){const a=F2.get(t);if(a!==void 0)i=ge[a],oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return dp(i)}const G2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pv(r){return r.replace(G2,V2)}function V2(r,t,i,a){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Iv(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const k2={[iu]:"SHADOWMAP_TYPE_PCF",[cl]:"SHADOWMAP_TYPE_VSM"};function X2(r){return k2[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const W2={[nr]:"ENVMAP_TYPE_CUBE",[io]:"ENVMAP_TYPE_CUBE",[yu]:"ENVMAP_TYPE_CUBE_UV"};function Y2(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":W2[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const q2={[io]:"ENVMAP_MODE_REFRACTION"};function j2(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":q2[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Z2={[Kv]:"ENVMAP_BLENDING_MULTIPLY",[db]:"ENVMAP_BLENDING_MIX",[pb]:"ENVMAP_BLENDING_ADD"};function K2(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Z2[r.combine]||"ENVMAP_BLENDING_NONE"}function J2(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:a,maxMip:i}}function Q2(r,t,i,a){const l=r.getContext(),c=i.defines;let f=i.vertexShader,p=i.fragmentShader;const m=X2(i),d=Y2(i),g=j2(i),_=K2(i),v=J2(i),b=P2(i),E=I2(c),w=l.createProgram();let x,y,z=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(ul).join(`
`),x.length>0&&(x+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(ul).join(`
`),y.length>0&&(y+=`
`)):(x=[Iv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ul).join(`
`),y=[Iv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+d:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ea?"#define TONE_MAPPING":"",i.toneMapping!==ea?ge.tonemapping_pars_fragment:"",i.toneMapping!==ea?L2("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,D2("linearToOutputTexel",i.outputColorSpace),O2(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(ul).join(`
`)),f=dp(f),f=Lv(f,i),f=Ov(f,i),p=dp(p),p=Lv(p,i),p=Ov(p,i),f=Pv(f),p=Pv(p),i.isRawShaderMaterial!==!0&&(z=`#version 300 es
`,x=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,y=["#define varying in",i.glslVersion===H_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===H_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const F=z+x+f,N=z+y+p,P=Nv(l,l.VERTEX_SHADER,F),U=Nv(l,l.FRAGMENT_SHADER,N);l.attachShader(w,P),l.attachShader(w,U),i.index0AttributeName!==void 0?l.bindAttribLocation(w,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(w,0,"position"),l.linkProgram(w);function B(V){if(r.debug.checkShaderErrors){const q=l.getProgramInfoLog(w)||"",ut=l.getShaderInfoLog(P)||"",gt=l.getShaderInfoLog(U)||"",Z=q.trim(),H=ut.trim(),k=gt.trim();let it=!0,yt=!0;if(l.getProgramParameter(w,l.LINK_STATUS)===!1)if(it=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,w,P,U);else{const D=Uv(l,P,"vertex"),M=Uv(l,U,"fragment");we("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(w,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+Z+`
`+D+`
`+M)}else Z!==""?oe("WebGLProgram: Program Info Log:",Z):(H===""||k==="")&&(yt=!1);yt&&(V.diagnostics={runnable:it,programLog:Z,vertexShader:{log:H,prefix:x},fragmentShader:{log:k,prefix:y}})}l.deleteShader(P),l.deleteShader(U),A=new cu(l,w),L=B2(l,w)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let L;this.getAttributes=function(){return L===void 0&&B(this),L};let W=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=l.getProgramParameter(w,w2)),W},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=C2++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=P,this.fragmentShader=U,this}let $2=0;class tw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,i,a){const l=this._getShaderCacheForMaterial(t);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const a of i)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let a=i.get(t);return a===void 0&&(a=new Set,i.set(t,a)),a}_getShaderStage(t){const i=this.shaderCache;let a=i.get(t);return a===void 0&&(a=new ew(t),i.set(t,a)),a}}class ew{constructor(t){this.id=$2++,this.code=t,this.usedTimes=0}}function nw(r){return r===ir||r===fu||r===hu}function iw(r,t,i,a,l,c){const f=new wp,p=new tw,m=new Set,d=[],g=new Map,_=a.logarithmicDepthBuffer;let v=a.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(A){return m.add(A),A===0?"uv":`uv${A}`}function w(A,L,W,V,q,ut){const gt=V.fog,Z=q.geometry,H=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?V.environment:null,k=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,it=t.get(A.envMap||H,k),yt=it&&it.mapping===yu?it.image.height:null,D=b[A.type];A.precision!==null&&(v=a.getMaxPrecision(A.precision),v!==A.precision&&oe("WebGLProgram.getParameters:",A.precision,"not supported, using",v,"instead."));const M=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,O=M!==void 0?M.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let mt,bt,J,rt;if(D){const Wt=Ji[D];mt=Wt.vertexShader,bt=Wt.fragmentShader}else{mt=A.vertexShader,bt=A.fragmentShader;const Wt=p.getVertexShaderStage(A),sn=p.getFragmentShaderStage(A);p.update(A,Wt,sn),J=Wt.id,rt=sn.id}const dt=r.getRenderTarget(),wt=r.state.buffers.depth.getReversed(),Ht=q.isInstancedMesh===!0,Lt=q.isBatchedMesh===!0,ce=!!A.map,$t=!!A.matcap,kt=!!it,re=!!A.aoMap,le=!!A.lightMap,Ae=!!A.bumpMap&&A.wireframe===!1,Re=!!A.normalMap,Ie=!!A.displacementMap,Ne=!!A.emissiveMap,Ye=!!A.metalnessMap,an=!!A.roughnessMap,Q=A.anisotropy>0,Oe=A.clearcoat>0,Ce=A.dispersion>0,I=A.iridescence>0,T=A.sheen>0,nt=A.transmission>0,ct=Q&&!!A.anisotropyMap,_t=Oe&&!!A.clearcoatMap,Ct=Oe&&!!A.clearcoatNormalMap,Ut=Oe&&!!A.clearcoatRoughnessMap,vt=I&&!!A.iridescenceMap,xt=I&&!!A.iridescenceThicknessMap,Nt=T&&!!A.sheenColorMap,Gt=T&&!!A.sheenRoughnessMap,It=!!A.specularMap,Ot=!!A.specularColorMap,te=!!A.specularIntensityMap,ee=nt&&!!A.transmissionMap,ue=nt&&!!A.thicknessMap,K=!!A.gradientMap,Rt=!!A.alphaMap,Mt=A.alphaTest>0,Dt=!!A.alphaHash,Ft=!!A.extensions;let At=ea;A.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(At=r.toneMapping);const Kt={shaderID:D,shaderType:A.type,shaderName:A.name,vertexShader:mt,fragmentShader:bt,defines:A.defines,customVertexShaderID:J,customFragmentShaderID:rt,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:v,batching:Lt,batchingColor:Lt&&q._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&q.instanceColor!==null,instancingMorph:Ht&&q.morphTexture!==null,outputColorSpace:dt===null?r.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Te.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:ce,matcap:$t,envMap:kt,envMapMode:kt&&it.mapping,envMapCubeUVHeight:yt,aoMap:re,lightMap:le,bumpMap:Ae,normalMap:Re,displacementMap:Ie,emissiveMap:Ne,normalMapObjectSpace:Re&&A.normalMapType===_b,normalMapTangentSpace:Re&&A.normalMapType===up,packedNormalMap:Re&&A.normalMapType===up&&nw(A.normalMap.format),metalnessMap:Ye,roughnessMap:an,anisotropy:Q,anisotropyMap:ct,clearcoat:Oe,clearcoatMap:_t,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Ut,dispersion:Ce,iridescence:I,iridescenceMap:vt,iridescenceThicknessMap:xt,sheen:T,sheenColorMap:Nt,sheenRoughnessMap:Gt,specularMap:It,specularColorMap:Ot,specularIntensityMap:te,transmission:nt,transmissionMap:ee,thicknessMap:ue,gradientMap:K,opaque:A.transparent===!1&&A.blending===$r&&A.alphaToCoverage===!1,alphaMap:Rt,alphaTest:Mt,alphaHash:Dt,combine:A.combine,mapUv:ce&&E(A.map.channel),aoMapUv:re&&E(A.aoMap.channel),lightMapUv:le&&E(A.lightMap.channel),bumpMapUv:Ae&&E(A.bumpMap.channel),normalMapUv:Re&&E(A.normalMap.channel),displacementMapUv:Ie&&E(A.displacementMap.channel),emissiveMapUv:Ne&&E(A.emissiveMap.channel),metalnessMapUv:Ye&&E(A.metalnessMap.channel),roughnessMapUv:an&&E(A.roughnessMap.channel),anisotropyMapUv:ct&&E(A.anisotropyMap.channel),clearcoatMapUv:_t&&E(A.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&E(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&E(A.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&E(A.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&E(A.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&E(A.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&E(A.sheenRoughnessMap.channel),specularMapUv:It&&E(A.specularMap.channel),specularColorMapUv:Ot&&E(A.specularColorMap.channel),specularIntensityMapUv:te&&E(A.specularIntensityMap.channel),transmissionMapUv:ee&&E(A.transmissionMap.channel),thicknessMapUv:ue&&E(A.thicknessMap.channel),alphaMapUv:Rt&&E(A.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Re||Q),vertexNormals:!!Z.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Z.attributes.uv&&(ce||Rt),fog:!!gt,useFog:A.fog===!0,fogExp2:!!gt&&gt.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||Z.attributes.normal===void 0&&Re===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:wt,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:Z.attributes.position!==void 0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:tt,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:ut.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:At,decodeVideoTexture:ce&&A.map.isVideoTexture===!0&&Te.getTransfer(A.map.colorSpace)===Xe,decodeVideoTextureEmissive:Ne&&A.emissiveMap.isVideoTexture===!0&&Te.getTransfer(A.emissiveMap.colorSpace)===Xe,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Ua,flipSided:A.side===ai,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ft&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&A.extensions.multiDraw===!0||Lt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Kt.vertexUv1s=m.has(1),Kt.vertexUv2s=m.has(2),Kt.vertexUv3s=m.has(3),m.clear(),Kt}function x(A){const L=[];if(A.shaderID?L.push(A.shaderID):(L.push(A.customVertexShaderID),L.push(A.customFragmentShaderID)),A.defines!==void 0)for(const W in A.defines)L.push(W),L.push(A.defines[W]);return A.isRawShaderMaterial===!1&&(y(L,A),z(L,A),L.push(r.outputColorSpace)),L.push(A.customProgramCacheKey),L.join()}function y(A,L){A.push(L.precision),A.push(L.outputColorSpace),A.push(L.envMapMode),A.push(L.envMapCubeUVHeight),A.push(L.mapUv),A.push(L.alphaMapUv),A.push(L.lightMapUv),A.push(L.aoMapUv),A.push(L.bumpMapUv),A.push(L.normalMapUv),A.push(L.displacementMapUv),A.push(L.emissiveMapUv),A.push(L.metalnessMapUv),A.push(L.roughnessMapUv),A.push(L.anisotropyMapUv),A.push(L.clearcoatMapUv),A.push(L.clearcoatNormalMapUv),A.push(L.clearcoatRoughnessMapUv),A.push(L.iridescenceMapUv),A.push(L.iridescenceThicknessMapUv),A.push(L.sheenColorMapUv),A.push(L.sheenRoughnessMapUv),A.push(L.specularMapUv),A.push(L.specularColorMapUv),A.push(L.specularIntensityMapUv),A.push(L.transmissionMapUv),A.push(L.thicknessMapUv),A.push(L.combine),A.push(L.fogExp2),A.push(L.sizeAttenuation),A.push(L.morphTargetsCount),A.push(L.morphAttributeCount),A.push(L.numDirLights),A.push(L.numPointLights),A.push(L.numSpotLights),A.push(L.numSpotLightMaps),A.push(L.numHemiLights),A.push(L.numRectAreaLights),A.push(L.numDirLightShadows),A.push(L.numPointLightShadows),A.push(L.numSpotLightShadows),A.push(L.numSpotLightShadowsWithMaps),A.push(L.numLightProbes),A.push(L.shadowMapType),A.push(L.toneMapping),A.push(L.numClippingPlanes),A.push(L.numClipIntersection),A.push(L.depthPacking)}function z(A,L){f.disableAll(),L.instancing&&f.enable(0),L.instancingColor&&f.enable(1),L.instancingMorph&&f.enable(2),L.matcap&&f.enable(3),L.envMap&&f.enable(4),L.normalMapObjectSpace&&f.enable(5),L.normalMapTangentSpace&&f.enable(6),L.clearcoat&&f.enable(7),L.iridescence&&f.enable(8),L.alphaTest&&f.enable(9),L.vertexColors&&f.enable(10),L.vertexAlphas&&f.enable(11),L.vertexUv1s&&f.enable(12),L.vertexUv2s&&f.enable(13),L.vertexUv3s&&f.enable(14),L.vertexTangents&&f.enable(15),L.anisotropy&&f.enable(16),L.alphaHash&&f.enable(17),L.batching&&f.enable(18),L.dispersion&&f.enable(19),L.batchingColor&&f.enable(20),L.gradientMap&&f.enable(21),L.packedNormalMap&&f.enable(22),L.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),L.fog&&f.enable(0),L.useFog&&f.enable(1),L.flatShading&&f.enable(2),L.logarithmicDepthBuffer&&f.enable(3),L.reversedDepthBuffer&&f.enable(4),L.skinning&&f.enable(5),L.morphTargets&&f.enable(6),L.morphNormals&&f.enable(7),L.morphColors&&f.enable(8),L.premultipliedAlpha&&f.enable(9),L.shadowMapEnabled&&f.enable(10),L.doubleSided&&f.enable(11),L.flipSided&&f.enable(12),L.useDepthPacking&&f.enable(13),L.dithering&&f.enable(14),L.transmission&&f.enable(15),L.sheen&&f.enable(16),L.opaque&&f.enable(17),L.pointsUvs&&f.enable(18),L.decodeVideoTexture&&f.enable(19),L.decodeVideoTextureEmissive&&f.enable(20),L.alphaToCoverage&&f.enable(21),L.numLightProbeGrids>0&&f.enable(22),L.hasPositionAttribute&&f.enable(23),A.push(f.mask)}function F(A){const L=b[A.type];let W;if(L){const V=Ji[L];W=g1.clone(V.uniforms)}else W=A.uniforms;return W}function N(A,L){let W=g.get(L);return W!==void 0?++W.usedTimes:(W=new Q2(r,L,A,l),d.push(W),g.set(L,W)),W}function P(A){if(--A.usedTimes===0){const L=d.indexOf(A);d[L]=d[d.length-1],d.pop(),g.delete(A.cacheKey),A.destroy()}}function U(A){p.remove(A)}function B(){p.dispose()}return{getParameters:w,getProgramCacheKey:x,getUniforms:F,acquireProgram:N,releaseProgram:P,releaseShaderCache:U,programs:d,dispose:B}}function aw(){let r=new WeakMap;function t(f){return r.has(f)}function i(f){let p=r.get(f);return p===void 0&&(p={},r.set(f,p)),p}function a(f){r.delete(f)}function l(f,p,m){r.get(f)[p]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:a,update:l,dispose:c}}function sw(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Bv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function zv(){const r=[];let t=0;const i=[],a=[],l=[];function c(){t=0,i.length=0,a.length=0,l.length=0}function f(v){let b=0;return v.isInstancedMesh&&(b+=2),v.isSkinnedMesh&&(b+=1),b}function p(v,b,E,w,x,y){let z=r[t];return z===void 0?(z={id:v.id,object:v,geometry:b,material:E,materialVariant:f(v),groupOrder:w,renderOrder:v.renderOrder,z:x,group:y},r[t]=z):(z.id=v.id,z.object=v,z.geometry=b,z.material=E,z.materialVariant=f(v),z.groupOrder=w,z.renderOrder=v.renderOrder,z.z=x,z.group=y),t++,z}function m(v,b,E,w,x,y){const z=p(v,b,E,w,x,y);E.transmission>0?a.push(z):E.transparent===!0?l.push(z):i.push(z)}function d(v,b,E,w,x,y){const z=p(v,b,E,w,x,y);E.transmission>0?a.unshift(z):E.transparent===!0?l.unshift(z):i.unshift(z)}function g(v,b,E){i.length>1&&i.sort(v||sw),a.length>1&&a.sort(b||Bv),l.length>1&&l.sort(b||Bv),E&&(i.reverse(),a.reverse(),l.reverse())}function _(){for(let v=t,b=r.length;v<b;v++){const E=r[v];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:i,transmissive:a,transparent:l,init:c,push:m,unshift:d,finish:_,sort:g}}function rw(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new zv,r.set(a,[f])):l>=c.length?(f=new zv,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:t,dispose:i}}function ow(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new Y,color:new ve};break;case"SpotLight":i={position:new Y,direction:new Y,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Y,color:new ve,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Y,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":i={color:new ve,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return r[t.id]=i,i}}}function lw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let cw=0;function uw(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function fw(r){const t=new ow,i=lw(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)a.probe.push(new Y);const l=new Y,c=new nn,f=new nn;function p(d){let g=0,_=0,v=0;for(let L=0;L<9;L++)a.probe[L].set(0,0,0);let b=0,E=0,w=0,x=0,y=0,z=0,F=0,N=0,P=0,U=0,B=0;d.sort(uw);for(let L=0,W=d.length;L<W;L++){const V=d[L],q=V.color,ut=V.intensity,gt=V.distance;let Z=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===ir?Z=V.shadow.map.texture:Z=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)g+=q.r*ut,_+=q.g*ut,v+=q.b*ut;else if(V.isLightProbe){for(let H=0;H<9;H++)a.probe[H].addScaledVector(V.sh.coefficients[H],ut);B++}else if(V.isDirectionalLight){const H=t.get(V);if(H.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const k=V.shadow,it=i.get(V);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,a.directionalShadow[b]=it,a.directionalShadowMap[b]=Z,a.directionalShadowMatrix[b]=V.shadow.matrix,z++}a.directional[b]=H,b++}else if(V.isSpotLight){const H=t.get(V);H.position.setFromMatrixPosition(V.matrixWorld),H.color.copy(q).multiplyScalar(ut),H.distance=gt,H.coneCos=Math.cos(V.angle),H.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),H.decay=V.decay,a.spot[w]=H;const k=V.shadow;if(V.map&&(a.spotLightMap[P]=V.map,P++,k.updateMatrices(V),V.castShadow&&U++),a.spotLightMatrix[w]=k.matrix,V.castShadow){const it=i.get(V);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,a.spotShadow[w]=it,a.spotShadowMap[w]=Z,N++}w++}else if(V.isRectAreaLight){const H=t.get(V);H.color.copy(q).multiplyScalar(ut),H.halfWidth.set(V.width*.5,0,0),H.halfHeight.set(0,V.height*.5,0),a.rectArea[x]=H,x++}else if(V.isPointLight){const H=t.get(V);if(H.color.copy(V.color).multiplyScalar(V.intensity),H.distance=V.distance,H.decay=V.decay,V.castShadow){const k=V.shadow,it=i.get(V);it.shadowIntensity=k.intensity,it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,it.shadowCameraNear=k.camera.near,it.shadowCameraFar=k.camera.far,a.pointShadow[E]=it,a.pointShadowMap[E]=Z,a.pointShadowMatrix[E]=V.shadow.matrix,F++}a.point[E]=H,E++}else if(V.isHemisphereLight){const H=t.get(V);H.skyColor.copy(V.color).multiplyScalar(ut),H.groundColor.copy(V.groundColor).multiplyScalar(ut),a.hemi[y]=H,y++}}x>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=zt.LTC_FLOAT_1,a.rectAreaLTC2=zt.LTC_FLOAT_2):(a.rectAreaLTC1=zt.LTC_HALF_1,a.rectAreaLTC2=zt.LTC_HALF_2)),a.ambient[0]=g,a.ambient[1]=_,a.ambient[2]=v;const A=a.hash;(A.directionalLength!==b||A.pointLength!==E||A.spotLength!==w||A.rectAreaLength!==x||A.hemiLength!==y||A.numDirectionalShadows!==z||A.numPointShadows!==F||A.numSpotShadows!==N||A.numSpotMaps!==P||A.numLightProbes!==B)&&(a.directional.length=b,a.spot.length=w,a.rectArea.length=x,a.point.length=E,a.hemi.length=y,a.directionalShadow.length=z,a.directionalShadowMap.length=z,a.pointShadow.length=F,a.pointShadowMap.length=F,a.spotShadow.length=N,a.spotShadowMap.length=N,a.directionalShadowMatrix.length=z,a.pointShadowMatrix.length=F,a.spotLightMatrix.length=N+P-U,a.spotLightMap.length=P,a.numSpotLightShadowsWithMaps=U,a.numLightProbes=B,A.directionalLength=b,A.pointLength=E,A.spotLength=w,A.rectAreaLength=x,A.hemiLength=y,A.numDirectionalShadows=z,A.numPointShadows=F,A.numSpotShadows=N,A.numSpotMaps=P,A.numLightProbes=B,a.version=cw++)}function m(d,g){let _=0,v=0,b=0,E=0,w=0;const x=g.matrixWorldInverse;for(let y=0,z=d.length;y<z;y++){const F=d[y];if(F.isDirectionalLight){const N=a.directional[_];N.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),_++}else if(F.isSpotLight){const N=a.spot[b];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),N.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),b++}else if(F.isRectAreaLight){const N=a.rectArea[E];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),f.identity(),c.copy(F.matrixWorld),c.premultiply(x),f.extractRotation(c),N.halfWidth.set(F.width*.5,0,0),N.halfHeight.set(0,F.height*.5,0),N.halfWidth.applyMatrix4(f),N.halfHeight.applyMatrix4(f),E++}else if(F.isPointLight){const N=a.point[v];N.position.setFromMatrixPosition(F.matrixWorld),N.position.applyMatrix4(x),v++}else if(F.isHemisphereLight){const N=a.hemi[w];N.direction.setFromMatrixPosition(F.matrixWorld),N.direction.transformDirection(x),w++}}}return{setup:p,setupView:m,state:a}}function Fv(r){const t=new fw(r),i=[],a=[],l=[];function c(v){_.camera=v,i.length=0,a.length=0,l.length=0}function f(v){i.push(v)}function p(v){a.push(v)}function m(v){l.push(v)}function d(){t.setup(i)}function g(v){t.setupView(i,v)}const _={lightsArray:i,shadowsArray:a,lightProbeGridArray:l,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:d,setupLightsView:g,pushLight:f,pushShadow:p,pushLightProbeGrid:m}}function hw(r){let t=new WeakMap;function i(l,c=0){const f=t.get(l);let p;return f===void 0?(p=new Fv(r),t.set(l,[p])):c>=f.length?(p=new Fv(r),f.push(p)):p=f[c],p}function a(){t=new WeakMap}return{get:i,dispose:a}}const dw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mw=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],gw=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Hv=new nn,ll=new Y,Sd=new Y;function _w(r,t,i){let a=new Rp;const l=new qt,c=new qt,f=new cn,p=new S1,m=new M1,d={},g=i.maxTextureSize,_={[Ss]:ai,[ai]:Ss,[Ua]:Ua},v=new sa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:dw,fragmentShader:pw}),b=v.clone();b.defines.HORIZONTAL_PASS=1;const E=new qn;E.setAttribute("position",new ia(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new ae(E,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=iu;let y=this.type;this.render=function(U,B,A){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||U.length===0)return;this.type===Zv&&(oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=iu);const L=r.getRenderTarget(),W=r.getActiveCubeFace(),V=r.getActiveMipmapLevel(),q=r.state;q.setBlending(Oa),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const ut=y!==this.type;ut&&B.traverse(function(gt){gt.material&&(Array.isArray(gt.material)?gt.material.forEach(Z=>Z.needsUpdate=!0):gt.material.needsUpdate=!0)});for(let gt=0,Z=U.length;gt<Z;gt++){const H=U[gt],k=H.shadow;if(k===void 0){oe("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const it=k.getFrameExtents();l.multiply(it),c.copy(k.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/it.x),l.x=c.x*it.x,k.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/it.y),l.y=c.y*it.y,k.mapSize.y=c.y));const yt=r.state.buffers.depth.getReversed();if(k.camera._reversedDepth=yt,k.map===null||ut===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===cl){if(H.isPointLight){oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new na(l.x,l.y,{format:ir,type:Ia,minFilter:kn,magFilter:kn,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new ao(l.x,l.y,$i),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=Ba,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Bn,k.map.depthTexture.magFilter=Bn}else H.isPointLight?(k.map=new Ax(l.x),k.map.depthTexture=new t1(l.x,aa)):(k.map=new na(l.x,l.y),k.map.depthTexture=new ao(l.x,l.y,aa)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=Ba,this.type===iu?(k.map.depthTexture.compareFunction=yt?Tp:Ep,k.map.depthTexture.minFilter=kn,k.map.depthTexture.magFilter=kn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Bn,k.map.depthTexture.magFilter=Bn);k.camera.updateProjectionMatrix()}const D=k.map.isWebGLCubeRenderTarget?6:1;for(let M=0;M<D;M++){if(k.map.isWebGLCubeRenderTarget)r.setRenderTarget(k.map,M),r.clear();else{M===0&&(r.setRenderTarget(k.map),r.clear());const O=k.getViewport(M);f.set(c.x*O.x,c.y*O.y,c.x*O.z,c.y*O.w),q.viewport(f)}if(H.isPointLight){const O=k.camera,tt=k.matrix,mt=H.distance||O.far;mt!==O.far&&(O.far=mt,O.updateProjectionMatrix()),ll.setFromMatrixPosition(H.matrixWorld),O.position.copy(ll),Sd.copy(O.position),Sd.add(mw[M]),O.up.copy(gw[M]),O.lookAt(Sd),O.updateMatrixWorld(),tt.makeTranslation(-ll.x,-ll.y,-ll.z),Hv.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Hv,O.coordinateSystem,O.reversedDepth)}else k.updateMatrices(H);a=k.getFrustum(),N(B,A,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===cl&&z(k,A),k.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(L,W,V)};function z(U,B){const A=t.update(w);v.defines.VSM_SAMPLES!==U.blurSamples&&(v.defines.VSM_SAMPLES=U.blurSamples,b.defines.VSM_SAMPLES=U.blurSamples,v.needsUpdate=!0,b.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new na(l.x,l.y,{format:ir,type:Ia})),v.uniforms.shadow_pass.value=U.map.depthTexture,v.uniforms.resolution.value=U.mapSize,v.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(B,null,A,v,w,null),b.uniforms.shadow_pass.value=U.mapPass.texture,b.uniforms.resolution.value=U.mapSize,b.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(B,null,A,b,w,null)}function F(U,B,A,L){let W=null;const V=A.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(V!==void 0)W=V;else if(W=A.isPointLight===!0?m:p,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const q=W.uuid,ut=B.uuid;let gt=d[q];gt===void 0&&(gt={},d[q]=gt);let Z=gt[ut];Z===void 0&&(Z=W.clone(),gt[ut]=Z,B.addEventListener("dispose",P)),W=Z}if(W.visible=B.visible,W.wireframe=B.wireframe,L===cl?W.side=B.shadowSide!==null?B.shadowSide:B.side:W.side=B.shadowSide!==null?B.shadowSide:_[B.side],W.alphaMap=B.alphaMap,W.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,W.map=B.map,W.clipShadows=B.clipShadows,W.clippingPlanes=B.clippingPlanes,W.clipIntersection=B.clipIntersection,W.displacementMap=B.displacementMap,W.displacementScale=B.displacementScale,W.displacementBias=B.displacementBias,W.wireframeLinewidth=B.wireframeLinewidth,W.linewidth=B.linewidth,A.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const q=r.properties.get(W);q.light=A}return W}function N(U,B,A,L,W){if(U.visible===!1)return;if(U.layers.test(B.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&W===cl)&&(!U.frustumCulled||a.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,U.matrixWorld);const ut=t.update(U),gt=U.material;if(Array.isArray(gt)){const Z=ut.groups;for(let H=0,k=Z.length;H<k;H++){const it=Z[H],yt=gt[it.materialIndex];if(yt&&yt.visible){const D=F(U,yt,L,W);U.onBeforeShadow(r,U,B,A,ut,D,it),r.renderBufferDirect(A,null,ut,D,U,it),U.onAfterShadow(r,U,B,A,ut,D,it)}}}else if(gt.visible){const Z=F(U,gt,L,W);U.onBeforeShadow(r,U,B,A,ut,Z,null),r.renderBufferDirect(A,null,ut,Z,U,null),U.onAfterShadow(r,U,B,A,ut,Z,null)}}const q=U.children;for(let ut=0,gt=q.length;ut<gt;ut++)N(q[ut],B,A,L,W)}function P(U){U.target.removeEventListener("dispose",P);for(const A in d){const L=d[A],W=U.target.uuid;W in L&&(L[W].dispose(),delete L[W])}}}function vw(r,t){function i(){let K=!1;const Rt=new cn;let Mt=null;const Dt=new cn(0,0,0,0);return{setMask:function(Ft){Mt!==Ft&&!K&&(r.colorMask(Ft,Ft,Ft,Ft),Mt=Ft)},setLocked:function(Ft){K=Ft},setClear:function(Ft,At,Kt,Wt,sn){sn===!0&&(Ft*=Wt,At*=Wt,Kt*=Wt),Rt.set(Ft,At,Kt,Wt),Dt.equals(Rt)===!1&&(r.clearColor(Ft,At,Kt,Wt),Dt.copy(Rt))},reset:function(){K=!1,Mt=null,Dt.set(-1,0,0,0)}}}function a(){let K=!1,Rt=!1,Mt=null,Dt=null,Ft=null;return{setReversed:function(At){if(Rt!==At){const Kt=t.get("EXT_clip_control");At?Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.ZERO_TO_ONE_EXT):Kt.clipControlEXT(Kt.LOWER_LEFT_EXT,Kt.NEGATIVE_ONE_TO_ONE_EXT),Rt=At;const Wt=Ft;Ft=null,this.setClear(Wt)}},getReversed:function(){return Rt},setTest:function(At){At?dt(r.DEPTH_TEST):wt(r.DEPTH_TEST)},setMask:function(At){Mt!==At&&!K&&(r.depthMask(At),Mt=At)},setFunc:function(At){if(Rt&&(At=wb[At]),Dt!==At){switch(At){case Td:r.depthFunc(r.NEVER);break;case Ad:r.depthFunc(r.ALWAYS);break;case wd:r.depthFunc(r.LESS);break;case no:r.depthFunc(r.LEQUAL);break;case Cd:r.depthFunc(r.EQUAL);break;case Rd:r.depthFunc(r.GEQUAL);break;case Nd:r.depthFunc(r.GREATER);break;case Dd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Dt=At}},setLocked:function(At){K=At},setClear:function(At){Ft!==At&&(Ft=At,Rt&&(At=1-At),r.clearDepth(At))},reset:function(){K=!1,Mt=null,Dt=null,Ft=null,Rt=!1}}}function l(){let K=!1,Rt=null,Mt=null,Dt=null,Ft=null,At=null,Kt=null,Wt=null,sn=null;return{setTest:function(ze){K||(ze?dt(r.STENCIL_TEST):wt(r.STENCIL_TEST))},setMask:function(ze){Rt!==ze&&!K&&(r.stencilMask(ze),Rt=ze)},setFunc:function(ze,si,ri){(Mt!==ze||Dt!==si||Ft!==ri)&&(r.stencilFunc(ze,si,ri),Mt=ze,Dt=si,Ft=ri)},setOp:function(ze,si,ri){(At!==ze||Kt!==si||Wt!==ri)&&(r.stencilOp(ze,si,ri),At=ze,Kt=si,Wt=ri)},setLocked:function(ze){K=ze},setClear:function(ze){sn!==ze&&(r.clearStencil(ze),sn=ze)},reset:function(){K=!1,Rt=null,Mt=null,Dt=null,Ft=null,At=null,Kt=null,Wt=null,sn=null}}}const c=new i,f=new a,p=new l,m=new WeakMap,d=new WeakMap;let g={},_={},v={},b=new WeakMap,E=[],w=null,x=!1,y=null,z=null,F=null,N=null,P=null,U=null,B=null,A=new ve(0,0,0),L=0,W=!1,V=null,q=null,ut=null,gt=null,Z=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,it=0;const yt=r.getParameter(r.VERSION);yt.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(yt)[1]),k=it>=1):yt.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(yt)[1]),k=it>=2);let D=null,M={};const O=r.getParameter(r.SCISSOR_BOX),tt=r.getParameter(r.VIEWPORT),mt=new cn().fromArray(O),bt=new cn().fromArray(tt);function J(K,Rt,Mt,Dt){const Ft=new Uint8Array(4),At=r.createTexture();r.bindTexture(K,At),r.texParameteri(K,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(K,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Kt=0;Kt<Mt;Kt++)K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,Dt,0,r.RGBA,r.UNSIGNED_BYTE,Ft):r.texImage2D(Rt+Kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ft);return At}const rt={};rt[r.TEXTURE_2D]=J(r.TEXTURE_2D,r.TEXTURE_2D,1),rt[r.TEXTURE_CUBE_MAP]=J(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[r.TEXTURE_2D_ARRAY]=J(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),rt[r.TEXTURE_3D]=J(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),dt(r.DEPTH_TEST),f.setFunc(no),Ae(!1),Re(O_),dt(r.CULL_FACE),re(Oa);function dt(K){g[K]!==!0&&(r.enable(K),g[K]=!0)}function wt(K){g[K]!==!1&&(r.disable(K),g[K]=!1)}function Ht(K,Rt){return v[K]!==Rt?(r.bindFramebuffer(K,Rt),v[K]=Rt,K===r.DRAW_FRAMEBUFFER&&(v[r.FRAMEBUFFER]=Rt),K===r.FRAMEBUFFER&&(v[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function Lt(K,Rt){let Mt=E,Dt=!1;if(K){Mt=b.get(Rt),Mt===void 0&&(Mt=[],b.set(Rt,Mt));const Ft=K.textures;if(Mt.length!==Ft.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let At=0,Kt=Ft.length;At<Kt;At++)Mt[At]=r.COLOR_ATTACHMENT0+At;Mt.length=Ft.length,Dt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Dt=!0);Dt&&r.drawBuffers(Mt)}function ce(K){return w!==K?(r.useProgram(K),w=K,!0):!1}const $t={[Js]:r.FUNC_ADD,[KM]:r.FUNC_SUBTRACT,[JM]:r.FUNC_REVERSE_SUBTRACT};$t[QM]=r.MIN,$t[$M]=r.MAX;const kt={[tb]:r.ZERO,[eb]:r.ONE,[nb]:r.SRC_COLOR,[bd]:r.SRC_ALPHA,[lb]:r.SRC_ALPHA_SATURATE,[rb]:r.DST_COLOR,[ab]:r.DST_ALPHA,[ib]:r.ONE_MINUS_SRC_COLOR,[Ed]:r.ONE_MINUS_SRC_ALPHA,[ob]:r.ONE_MINUS_DST_COLOR,[sb]:r.ONE_MINUS_DST_ALPHA,[cb]:r.CONSTANT_COLOR,[ub]:r.ONE_MINUS_CONSTANT_COLOR,[fb]:r.CONSTANT_ALPHA,[hb]:r.ONE_MINUS_CONSTANT_ALPHA};function re(K,Rt,Mt,Dt,Ft,At,Kt,Wt,sn,ze){if(K===Oa){x===!0&&(wt(r.BLEND),x=!1);return}if(x===!1&&(dt(r.BLEND),x=!0),K!==ZM){if(K!==y||ze!==W){if((z!==Js||P!==Js)&&(r.blendEquation(r.FUNC_ADD),z=Js,P=Js),ze)switch(K){case $r:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case P_:r.blendFunc(r.ONE,r.ONE);break;case I_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case B_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:we("WebGLState: Invalid blending: ",K);break}else switch(K){case $r:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case P_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case I_:we("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case B_:we("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:we("WebGLState: Invalid blending: ",K);break}F=null,N=null,U=null,B=null,A.set(0,0,0),L=0,y=K,W=ze}return}Ft=Ft||Rt,At=At||Mt,Kt=Kt||Dt,(Rt!==z||Ft!==P)&&(r.blendEquationSeparate($t[Rt],$t[Ft]),z=Rt,P=Ft),(Mt!==F||Dt!==N||At!==U||Kt!==B)&&(r.blendFuncSeparate(kt[Mt],kt[Dt],kt[At],kt[Kt]),F=Mt,N=Dt,U=At,B=Kt),(Wt.equals(A)===!1||sn!==L)&&(r.blendColor(Wt.r,Wt.g,Wt.b,sn),A.copy(Wt),L=sn),y=K,W=!1}function le(K,Rt){K.side===Ua?wt(r.CULL_FACE):dt(r.CULL_FACE);let Mt=K.side===ai;Rt&&(Mt=!Mt),Ae(Mt),K.blending===$r&&K.transparent===!1?re(Oa):re(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),f.setFunc(K.depthFunc),f.setTest(K.depthTest),f.setMask(K.depthWrite),c.setMask(K.colorWrite);const Dt=K.stencilWrite;p.setTest(Dt),Dt&&(p.setMask(K.stencilWriteMask),p.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),p.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Ne(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?dt(r.SAMPLE_ALPHA_TO_COVERAGE):wt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(K){V!==K&&(K?r.frontFace(r.CW):r.frontFace(r.CCW),V=K)}function Re(K){K!==qM?(dt(r.CULL_FACE),K!==q&&(K===O_?r.cullFace(r.BACK):K===jM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):wt(r.CULL_FACE),q=K}function Ie(K){K!==ut&&(k&&r.lineWidth(K),ut=K)}function Ne(K,Rt,Mt){K?(dt(r.POLYGON_OFFSET_FILL),(gt!==Rt||Z!==Mt)&&(gt=Rt,Z=Mt,f.getReversed()&&(Rt=-Rt),r.polygonOffset(Rt,Mt))):wt(r.POLYGON_OFFSET_FILL)}function Ye(K){K?dt(r.SCISSOR_TEST):wt(r.SCISSOR_TEST)}function an(K){K===void 0&&(K=r.TEXTURE0+H-1),D!==K&&(r.activeTexture(K),D=K)}function Q(K,Rt,Mt){Mt===void 0&&(D===null?Mt=r.TEXTURE0+H-1:Mt=D);let Dt=M[Mt];Dt===void 0&&(Dt={type:void 0,texture:void 0},M[Mt]=Dt),(Dt.type!==K||Dt.texture!==Rt)&&(D!==Mt&&(r.activeTexture(Mt),D=Mt),r.bindTexture(K,Rt||rt[K]),Dt.type=K,Dt.texture=Rt)}function Oe(){const K=M[D];K!==void 0&&K.type!==void 0&&(r.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function Ce(){try{r.compressedTexImage2D(...arguments)}catch(K){we("WebGLState:",K)}}function I(){try{r.compressedTexImage3D(...arguments)}catch(K){we("WebGLState:",K)}}function T(){try{r.texSubImage2D(...arguments)}catch(K){we("WebGLState:",K)}}function nt(){try{r.texSubImage3D(...arguments)}catch(K){we("WebGLState:",K)}}function ct(){try{r.compressedTexSubImage2D(...arguments)}catch(K){we("WebGLState:",K)}}function _t(){try{r.compressedTexSubImage3D(...arguments)}catch(K){we("WebGLState:",K)}}function Ct(){try{r.texStorage2D(...arguments)}catch(K){we("WebGLState:",K)}}function Ut(){try{r.texStorage3D(...arguments)}catch(K){we("WebGLState:",K)}}function vt(){try{r.texImage2D(...arguments)}catch(K){we("WebGLState:",K)}}function xt(){try{r.texImage3D(...arguments)}catch(K){we("WebGLState:",K)}}function Nt(K){return _[K]!==void 0?_[K]:r.getParameter(K)}function Gt(K,Rt){_[K]!==Rt&&(r.pixelStorei(K,Rt),_[K]=Rt)}function It(K){mt.equals(K)===!1&&(r.scissor(K.x,K.y,K.z,K.w),mt.copy(K))}function Ot(K){bt.equals(K)===!1&&(r.viewport(K.x,K.y,K.z,K.w),bt.copy(K))}function te(K,Rt){let Mt=d.get(Rt);Mt===void 0&&(Mt=new WeakMap,d.set(Rt,Mt));let Dt=Mt.get(K);Dt===void 0&&(Dt=r.getUniformBlockIndex(Rt,K.name),Mt.set(K,Dt))}function ee(K,Rt){const Dt=d.get(Rt).get(K);m.get(Rt)!==Dt&&(r.uniformBlockBinding(Rt,Dt,K.__bindingPointIndex),m.set(Rt,Dt))}function ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),g={},_={},D=null,M={},v={},b=new WeakMap,E=[],w=null,x=!1,y=null,z=null,F=null,N=null,P=null,U=null,B=null,A=new ve(0,0,0),L=0,W=!1,V=null,q=null,ut=null,gt=null,Z=null,mt.set(0,0,r.canvas.width,r.canvas.height),bt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:dt,disable:wt,bindFramebuffer:Ht,drawBuffers:Lt,useProgram:ce,setBlending:re,setMaterial:le,setFlipSided:Ae,setCullFace:Re,setLineWidth:Ie,setPolygonOffset:Ne,setScissorTest:Ye,activeTexture:an,bindTexture:Q,unbindTexture:Oe,compressedTexImage2D:Ce,compressedTexImage3D:I,texImage2D:vt,texImage3D:xt,pixelStorei:Gt,getParameter:Nt,updateUBOMapping:te,uniformBlockBinding:ee,texStorage2D:Ct,texStorage3D:Ut,texSubImage2D:T,texSubImage3D:nt,compressedTexSubImage2D:ct,compressedTexSubImage3D:_t,scissor:It,viewport:Ot,reset:ue}}function xw(r,t,i,a,l,c,f){const p=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new qt,g=new WeakMap,_=new Set;let v;const b=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(I,T){return E?new OffscreenCanvas(I,T):mu("canvas")}function x(I,T,nt){let ct=1;const _t=Ce(I);if((_t.width>nt||_t.height>nt)&&(ct=nt/Math.max(_t.width,_t.height)),ct<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Ct=Math.floor(ct*_t.width),Ut=Math.floor(ct*_t.height);v===void 0&&(v=w(Ct,Ut));const vt=T?w(Ct,Ut):v;return vt.width=Ct,vt.height=Ut,vt.getContext("2d").drawImage(I,0,0,Ct,Ut),oe("WebGLRenderer: Texture has been resized from ("+_t.width+"x"+_t.height+") to ("+Ct+"x"+Ut+")."),vt}else return"data"in I&&oe("WebGLRenderer: Image in DataTexture is too big ("+_t.width+"x"+_t.height+")."),I;return I}function y(I){return I.generateMipmaps}function z(I){r.generateMipmap(I)}function F(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function N(I,T,nt,ct,_t,Ct=!1){if(I!==null){if(r[I]!==void 0)return r[I];oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ut;ct&&(Ut=t.get("EXT_texture_norm16"),Ut||oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let vt=T;if(T===r.RED&&(nt===r.FLOAT&&(vt=r.R32F),nt===r.HALF_FLOAT&&(vt=r.R16F),nt===r.UNSIGNED_BYTE&&(vt=r.R8),nt===r.UNSIGNED_SHORT&&Ut&&(vt=Ut.R16_EXT),nt===r.SHORT&&Ut&&(vt=Ut.R16_SNORM_EXT)),T===r.RED_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.R8UI),nt===r.UNSIGNED_SHORT&&(vt=r.R16UI),nt===r.UNSIGNED_INT&&(vt=r.R32UI),nt===r.BYTE&&(vt=r.R8I),nt===r.SHORT&&(vt=r.R16I),nt===r.INT&&(vt=r.R32I)),T===r.RG&&(nt===r.FLOAT&&(vt=r.RG32F),nt===r.HALF_FLOAT&&(vt=r.RG16F),nt===r.UNSIGNED_BYTE&&(vt=r.RG8),nt===r.UNSIGNED_SHORT&&Ut&&(vt=Ut.RG16_EXT),nt===r.SHORT&&Ut&&(vt=Ut.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RG8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RG16UI),nt===r.UNSIGNED_INT&&(vt=r.RG32UI),nt===r.BYTE&&(vt=r.RG8I),nt===r.SHORT&&(vt=r.RG16I),nt===r.INT&&(vt=r.RG32I)),T===r.RGB_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RGB8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RGB16UI),nt===r.UNSIGNED_INT&&(vt=r.RGB32UI),nt===r.BYTE&&(vt=r.RGB8I),nt===r.SHORT&&(vt=r.RGB16I),nt===r.INT&&(vt=r.RGB32I)),T===r.RGBA_INTEGER&&(nt===r.UNSIGNED_BYTE&&(vt=r.RGBA8UI),nt===r.UNSIGNED_SHORT&&(vt=r.RGBA16UI),nt===r.UNSIGNED_INT&&(vt=r.RGBA32UI),nt===r.BYTE&&(vt=r.RGBA8I),nt===r.SHORT&&(vt=r.RGBA16I),nt===r.INT&&(vt=r.RGBA32I)),T===r.RGB&&(nt===r.UNSIGNED_SHORT&&Ut&&(vt=Ut.RGB16_EXT),nt===r.SHORT&&Ut&&(vt=Ut.RGB16_SNORM_EXT),nt===r.UNSIGNED_INT_5_9_9_9_REV&&(vt=r.RGB9_E5),nt===r.UNSIGNED_INT_10F_11F_11F_REV&&(vt=r.R11F_G11F_B10F)),T===r.RGBA){const xt=Ct?pu:Te.getTransfer(_t);nt===r.FLOAT&&(vt=r.RGBA32F),nt===r.HALF_FLOAT&&(vt=r.RGBA16F),nt===r.UNSIGNED_BYTE&&(vt=xt===Xe?r.SRGB8_ALPHA8:r.RGBA8),nt===r.UNSIGNED_SHORT&&Ut&&(vt=Ut.RGBA16_EXT),nt===r.SHORT&&Ut&&(vt=Ut.RGBA16_SNORM_EXT),nt===r.UNSIGNED_SHORT_4_4_4_4&&(vt=r.RGBA4),nt===r.UNSIGNED_SHORT_5_5_5_1&&(vt=r.RGB5_A1)}return(vt===r.R16F||vt===r.R32F||vt===r.RG16F||vt===r.RG32F||vt===r.RGBA16F||vt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),vt}function P(I,T){let nt;return I?T===null||T===aa||T===ml?nt=r.DEPTH24_STENCIL8:T===$i?nt=r.DEPTH32F_STENCIL8:T===pl&&(nt=r.DEPTH24_STENCIL8,oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===aa||T===ml?nt=r.DEPTH_COMPONENT24:T===$i?nt=r.DEPTH_COMPONENT32F:T===pl&&(nt=r.DEPTH_COMPONENT16),nt}function U(I,T){return y(I)===!0||I.isFramebufferTexture&&I.minFilter!==Bn&&I.minFilter!==kn?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function B(I){const T=I.target;T.removeEventListener("dispose",B),L(T),T.isVideoTexture&&g.delete(T),T.isHTMLTexture&&_.delete(T)}function A(I){const T=I.target;T.removeEventListener("dispose",A),V(T)}function L(I){const T=a.get(I);if(T.__webglInit===void 0)return;const nt=I.source,ct=b.get(nt);if(ct){const _t=ct[T.__cacheKey];_t.usedTimes--,_t.usedTimes===0&&W(I),Object.keys(ct).length===0&&b.delete(nt)}a.remove(I)}function W(I){const T=a.get(I);r.deleteTexture(T.__webglTexture);const nt=I.source,ct=b.get(nt);delete ct[T.__cacheKey],f.memory.textures--}function V(I){const T=a.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),a.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(T.__webglFramebuffer[ct]))for(let _t=0;_t<T.__webglFramebuffer[ct].length;_t++)r.deleteFramebuffer(T.__webglFramebuffer[ct][_t]);else r.deleteFramebuffer(T.__webglFramebuffer[ct]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ct])}else{if(Array.isArray(T.__webglFramebuffer))for(let ct=0;ct<T.__webglFramebuffer.length;ct++)r.deleteFramebuffer(T.__webglFramebuffer[ct]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ct=0;ct<T.__webglColorRenderbuffer.length;ct++)T.__webglColorRenderbuffer[ct]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ct]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const nt=I.textures;for(let ct=0,_t=nt.length;ct<_t;ct++){const Ct=a.get(nt[ct]);Ct.__webglTexture&&(r.deleteTexture(Ct.__webglTexture),f.memory.textures--),a.remove(nt[ct])}a.remove(I)}let q=0;function ut(){q=0}function gt(){return q}function Z(I){q=I}function H(){const I=q;return I>=l.maxTextures&&oe("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+l.maxTextures),q+=1,I}function k(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function it(I,T){const nt=a.get(I);if(I.isVideoTexture&&Q(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&nt.__version!==I.version){const ct=I.image;if(ct===null)oe("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)oe("WebGLRenderer: Texture marked for update but image is incomplete");else{wt(nt,I,T);return}}else I.isExternalTexture&&(nt.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,nt.__webglTexture,r.TEXTURE0+T)}function yt(I,T){const nt=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&nt.__version!==I.version){wt(nt,I,T);return}else I.isExternalTexture&&(nt.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,nt.__webglTexture,r.TEXTURE0+T)}function D(I,T){const nt=a.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&nt.__version!==I.version){wt(nt,I,T);return}i.bindTexture(r.TEXTURE_3D,nt.__webglTexture,r.TEXTURE0+T)}function M(I,T){const nt=a.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&nt.__version!==I.version){Ht(nt,I,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture,r.TEXTURE0+T)}const O={[Ud]:r.REPEAT,[La]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},tt={[Bn]:r.NEAREST,[mb]:r.NEAREST_MIPMAP_NEAREST,[Dc]:r.NEAREST_MIPMAP_LINEAR,[kn]:r.LINEAR,[Gh]:r.LINEAR_MIPMAP_NEAREST,[tr]:r.LINEAR_MIPMAP_LINEAR},mt={[vb]:r.NEVER,[bb]:r.ALWAYS,[xb]:r.LESS,[Ep]:r.LEQUAL,[yb]:r.EQUAL,[Tp]:r.GEQUAL,[Sb]:r.GREATER,[Mb]:r.NOTEQUAL};function bt(I,T){if(T.type===$i&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===kn||T.magFilter===Gh||T.magFilter===Dc||T.magFilter===tr||T.minFilter===kn||T.minFilter===Gh||T.minFilter===Dc||T.minFilter===tr)&&oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,O[T.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,O[T.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,O[T.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,tt[T.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,tt[T.minFilter]),T.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,mt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Bn||T.minFilter!==Dc&&T.minFilter!==tr||T.type===$i&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const nt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function J(I,T){let nt=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",B));const ct=T.source;let _t=b.get(ct);_t===void 0&&(_t={},b.set(ct,_t));const Ct=k(T);if(Ct!==I.__cacheKey){_t[Ct]===void 0&&(_t[Ct]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,nt=!0),_t[Ct].usedTimes++;const Ut=_t[I.__cacheKey];Ut!==void 0&&(_t[I.__cacheKey].usedTimes--,Ut.usedTimes===0&&W(T)),I.__cacheKey=Ct,I.__webglTexture=_t[Ct].texture}return nt}function rt(I,T,nt){return Math.floor(Math.floor(I/nt)/T)}function dt(I,T,nt,ct){const Ct=I.updateRanges;if(Ct.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,nt,ct,T.data);else{Ct.sort((Gt,It)=>Gt.start-It.start);let Ut=0;for(let Gt=1;Gt<Ct.length;Gt++){const It=Ct[Ut],Ot=Ct[Gt],te=It.start+It.count,ee=rt(Ot.start,T.width,4),ue=rt(It.start,T.width,4);Ot.start<=te+1&&ee===ue&&rt(Ot.start+Ot.count-1,T.width,4)===ee?It.count=Math.max(It.count,Ot.start+Ot.count-It.start):(++Ut,Ct[Ut]=Ot)}Ct.length=Ut+1;const vt=i.getParameter(r.UNPACK_ROW_LENGTH),xt=i.getParameter(r.UNPACK_SKIP_PIXELS),Nt=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Gt=0,It=Ct.length;Gt<It;Gt++){const Ot=Ct[Gt],te=Math.floor(Ot.start/4),ee=Math.ceil(Ot.count/4),ue=te%T.width,K=Math.floor(te/T.width),Rt=ee,Mt=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(r.UNPACK_SKIP_ROWS,K),i.texSubImage2D(r.TEXTURE_2D,0,ue,K,Rt,Mt,nt,ct,T.data)}I.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,vt),i.pixelStorei(r.UNPACK_SKIP_PIXELS,xt),i.pixelStorei(r.UNPACK_SKIP_ROWS,Nt)}}function wt(I,T,nt){let ct=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=r.TEXTURE_3D);const _t=J(I,T),Ct=T.source;i.bindTexture(ct,I.__webglTexture,r.TEXTURE0+nt);const Ut=a.get(Ct);if(Ct.version!==Ut.__version||_t===!0){if(i.activeTexture(r.TEXTURE0+nt),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const Mt=Te.getPrimaries(Te.workingColorSpace),Dt=T.colorSpace===xs?null:Te.getPrimaries(T.colorSpace),Ft=T.colorSpace===xs||Mt===Dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let xt=x(T.image,!1,l.maxTextureSize);xt=Oe(T,xt);const Nt=c.convert(T.format,T.colorSpace),Gt=c.convert(T.type);let It=N(T.internalFormat,Nt,Gt,T.normalized,T.colorSpace,T.isVideoTexture);bt(ct,T);let Ot;const te=T.mipmaps,ee=T.isVideoTexture!==!0,ue=Ut.__version===void 0||_t===!0,K=Ct.dataReady,Rt=U(T,xt);if(T.isDepthTexture)It=P(T.format===er,T.type),ue&&(ee?i.texStorage2D(r.TEXTURE_2D,1,It,xt.width,xt.height):i.texImage2D(r.TEXTURE_2D,0,It,xt.width,xt.height,0,Nt,Gt,null));else if(T.isDataTexture)if(te.length>0){ee&&ue&&i.texStorage2D(r.TEXTURE_2D,Rt,It,te[0].width,te[0].height);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Ot=te[Mt],ee?K&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Nt,Gt,Ot.data):i.texImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Nt,Gt,Ot.data);T.generateMipmaps=!1}else ee?(ue&&i.texStorage2D(r.TEXTURE_2D,Rt,It,xt.width,xt.height),K&&dt(T,xt,Nt,Gt)):i.texImage2D(r.TEXTURE_2D,0,It,xt.width,xt.height,0,Nt,Gt,xt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ee&&ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,It,te[0].width,te[0].height,xt.depth);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)if(Ot=te[Mt],T.format!==Gi)if(Nt!==null)if(ee){if(K)if(T.layerUpdates.size>0){const Ft=_v(Ot.width,Ot.height,T.format,T.type);for(const At of T.layerUpdates){const Kt=Ot.data.subarray(At*Ft/Ot.data.BYTES_PER_ELEMENT,(At+1)*Ft/Ot.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,At,Ot.width,Ot.height,1,Nt,Kt)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ot.width,Ot.height,xt.depth,Nt,Ot.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Mt,It,Ot.width,Ot.height,xt.depth,0,Ot.data,0,0);else oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ee?K&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,Mt,0,0,0,Ot.width,Ot.height,xt.depth,Nt,Gt,Ot.data):i.texImage3D(r.TEXTURE_2D_ARRAY,Mt,It,Ot.width,Ot.height,xt.depth,0,Nt,Gt,Ot.data)}else{ee&&ue&&i.texStorage2D(r.TEXTURE_2D,Rt,It,te[0].width,te[0].height);for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Ot=te[Mt],T.format!==Gi?Nt!==null?ee?K&&i.compressedTexSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Nt,Ot.data):i.compressedTexImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Ot.data):oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?K&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Ot.width,Ot.height,Nt,Gt,Ot.data):i.texImage2D(r.TEXTURE_2D,Mt,It,Ot.width,Ot.height,0,Nt,Gt,Ot.data)}else if(T.isDataArrayTexture)if(ee){if(ue&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,It,xt.width,xt.height,xt.depth),K)if(T.layerUpdates.size>0){const Mt=_v(xt.width,xt.height,T.format,T.type);for(const Dt of T.layerUpdates){const Ft=xt.data.subarray(Dt*Mt/xt.data.BYTES_PER_ELEMENT,(Dt+1)*Mt/xt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Dt,xt.width,xt.height,1,Nt,Gt,Ft)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,Nt,Gt,xt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,It,xt.width,xt.height,xt.depth,0,Nt,Gt,xt.data);else if(T.isData3DTexture)ee?(ue&&i.texStorage3D(r.TEXTURE_3D,Rt,It,xt.width,xt.height,xt.depth),K&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,Nt,Gt,xt.data)):i.texImage3D(r.TEXTURE_3D,0,It,xt.width,xt.height,xt.depth,0,Nt,Gt,xt.data);else if(T.isFramebufferTexture){if(ue)if(ee)i.texStorage2D(r.TEXTURE_2D,Rt,It,xt.width,xt.height);else{let Mt=xt.width,Dt=xt.height;for(let Ft=0;Ft<Rt;Ft++)i.texImage2D(r.TEXTURE_2D,Ft,It,Mt,Dt,0,Nt,Gt,null),Mt>>=1,Dt>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const Mt=r.canvas;if(Mt.hasAttribute("layoutsubtree")||Mt.setAttribute("layoutsubtree","true"),xt.parentNode!==Mt){Mt.appendChild(xt),_.add(T),Mt.onpaint=Dt=>{const Ft=Dt.changedElements;for(const At of _)Ft.includes(At.image)&&(At.needsUpdate=!0)},Mt.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,xt);else{const Ft=r.RGBA,At=r.RGBA,Kt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Ft,At,Kt,xt)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(te.length>0){if(ee&&ue){const Mt=Ce(te[0]);i.texStorage2D(r.TEXTURE_2D,Rt,It,Mt.width,Mt.height)}for(let Mt=0,Dt=te.length;Mt<Dt;Mt++)Ot=te[Mt],ee?K&&i.texSubImage2D(r.TEXTURE_2D,Mt,0,0,Nt,Gt,Ot):i.texImage2D(r.TEXTURE_2D,Mt,It,Nt,Gt,Ot);T.generateMipmaps=!1}else if(ee){if(ue){const Mt=Ce(xt);i.texStorage2D(r.TEXTURE_2D,Rt,It,Mt.width,Mt.height)}K&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Nt,Gt,xt)}else i.texImage2D(r.TEXTURE_2D,0,It,Nt,Gt,xt);y(T)&&z(ct),Ut.__version=Ct.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Ht(I,T,nt){if(T.image.length!==6)return;const ct=J(I,T),_t=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+nt);const Ct=a.get(_t);if(_t.version!==Ct.__version||ct===!0){i.activeTexture(r.TEXTURE0+nt);const Ut=Te.getPrimaries(Te.workingColorSpace),vt=T.colorSpace===xs?null:Te.getPrimaries(T.colorSpace),xt=T.colorSpace===xs||Ut===vt?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Nt=T.isCompressedTexture||T.image[0].isCompressedTexture,Gt=T.image[0]&&T.image[0].isDataTexture,It=[];for(let At=0;At<6;At++)!Nt&&!Gt?It[At]=x(T.image[At],!0,l.maxCubemapSize):It[At]=Gt?T.image[At].image:T.image[At],It[At]=Oe(T,It[At]);const Ot=It[0],te=c.convert(T.format,T.colorSpace),ee=c.convert(T.type),ue=N(T.internalFormat,te,ee,T.normalized,T.colorSpace),K=T.isVideoTexture!==!0,Rt=Ct.__version===void 0||ct===!0,Mt=_t.dataReady;let Dt=U(T,Ot);bt(r.TEXTURE_CUBE_MAP,T);let Ft;if(Nt){K&&Rt&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Dt,ue,Ot.width,Ot.height);for(let At=0;At<6;At++){Ft=It[At].mipmaps;for(let Kt=0;Kt<Ft.length;Kt++){const Wt=Ft[Kt];T.format!==Gi?te!==null?K?Mt&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt,0,0,Wt.width,Wt.height,te,Wt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt,ue,Wt.width,Wt.height,0,Wt.data):oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt,0,0,Wt.width,Wt.height,te,ee,Wt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt,ue,Wt.width,Wt.height,0,te,ee,Wt.data)}}}else{if(Ft=T.mipmaps,K&&Rt){Ft.length>0&&Dt++;const At=Ce(It[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Dt,ue,At.width,At.height)}for(let At=0;At<6;At++)if(Gt){K?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,0,0,It[At].width,It[At].height,te,ee,It[At].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,ue,It[At].width,It[At].height,0,te,ee,It[At].data);for(let Kt=0;Kt<Ft.length;Kt++){const sn=Ft[Kt].image[At].image;K?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt+1,0,0,sn.width,sn.height,te,ee,sn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt+1,ue,sn.width,sn.height,0,te,ee,sn.data)}}else{K?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,0,0,te,ee,It[At]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,ue,te,ee,It[At]);for(let Kt=0;Kt<Ft.length;Kt++){const Wt=Ft[Kt];K?Mt&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt+1,0,0,te,ee,Wt.image[At]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+At,Kt+1,ue,te,ee,Wt.image[At])}}}y(T)&&z(r.TEXTURE_CUBE_MAP),Ct.__version=_t.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Lt(I,T,nt,ct,_t,Ct){const Ut=c.convert(nt.format,nt.colorSpace),vt=c.convert(nt.type),xt=N(nt.internalFormat,Ut,vt,nt.normalized,nt.colorSpace),Nt=a.get(T),Gt=a.get(nt);if(Gt.__renderTarget=T,!Nt.__hasExternalTextures){const It=Math.max(1,T.width>>Ct),Ot=Math.max(1,T.height>>Ct);_t===r.TEXTURE_3D||_t===r.TEXTURE_2D_ARRAY?i.texImage3D(_t,Ct,xt,It,Ot,T.depth,0,Ut,vt,null):i.texImage2D(_t,Ct,xt,It,Ot,0,Ut,vt,null)}i.bindFramebuffer(r.FRAMEBUFFER,I),an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ct,_t,Gt.__webglTexture,0,Ye(T)):(_t===r.TEXTURE_2D||_t>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_t<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ct,_t,Gt.__webglTexture,Ct),i.bindFramebuffer(r.FRAMEBUFFER,null)}function ce(I,T,nt){if(r.bindRenderbuffer(r.RENDERBUFFER,I),T.depthBuffer){const ct=T.depthTexture,_t=ct&&ct.isDepthTexture?ct.type:null,Ct=P(T.stencilBuffer,_t),Ut=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;an(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ye(T),Ct,T.width,T.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye(T),Ct,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ct,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ut,r.RENDERBUFFER,I)}else{const ct=T.textures;for(let _t=0;_t<ct.length;_t++){const Ct=ct[_t],Ut=c.convert(Ct.format,Ct.colorSpace),vt=c.convert(Ct.type),xt=N(Ct.internalFormat,Ut,vt,Ct.normalized,Ct.colorSpace);an(T)?p.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ye(T),xt,T.width,T.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye(T),xt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,xt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function $t(I,T,nt){const ct=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const _t=a.get(T.depthTexture);if(_t.__renderTarget=T,(!_t.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ct){if(_t.__webglInit===void 0&&(_t.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),_t.__webglTexture===void 0){_t.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,_t.__webglTexture),bt(r.TEXTURE_CUBE_MAP,T.depthTexture);const Nt=c.convert(T.depthTexture.format),Gt=c.convert(T.depthTexture.type);let It;T.depthTexture.format===Ba?It=r.DEPTH_COMPONENT24:T.depthTexture.format===er&&(It=r.DEPTH24_STENCIL8);for(let Ot=0;Ot<6;Ot++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ot,0,It,T.width,T.height,0,Nt,Gt,null)}}else it(T.depthTexture,0);const Ct=_t.__webglTexture,Ut=Ye(T),vt=ct?r.TEXTURE_CUBE_MAP_POSITIVE_X+nt:r.TEXTURE_2D,xt=T.depthTexture.format===er?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ba)an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,vt,Ct,0,Ut):r.framebufferTexture2D(r.FRAMEBUFFER,xt,vt,Ct,0);else if(T.depthTexture.format===er)an(T)?p.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,vt,Ct,0,Ut):r.framebufferTexture2D(r.FRAMEBUFFER,xt,vt,Ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function kt(I){const T=a.get(I),nt=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const ct=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ct){const _t=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ct.removeEventListener("dispose",_t)};ct.addEventListener("dispose",_t),T.__depthDisposeCallback=_t}T.__boundDepthTexture=ct}if(I.depthTexture&&!T.__autoAllocateDepthBuffer)if(nt)for(let ct=0;ct<6;ct++)$t(T.__webglFramebuffer[ct],I,ct);else{const ct=I.texture.mipmaps;ct&&ct.length>0?$t(T.__webglFramebuffer[0],I,0):$t(T.__webglFramebuffer,I,0)}else if(nt){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]===void 0)T.__webglDepthbuffer[ct]=r.createRenderbuffer(),ce(T.__webglDepthbuffer[ct],I,!1);else{const _t=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=T.__webglDepthbuffer[ct];r.bindRenderbuffer(r.RENDERBUFFER,Ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,_t,r.RENDERBUFFER,Ct)}}else{const ct=I.texture.mipmaps;if(ct&&ct.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),ce(T.__webglDepthbuffer,I,!1);else{const _t=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ct),r.framebufferRenderbuffer(r.FRAMEBUFFER,_t,r.RENDERBUFFER,Ct)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function re(I,T,nt){const ct=a.get(I);T!==void 0&&Lt(ct.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),nt!==void 0&&kt(I)}function le(I){const T=I.texture,nt=a.get(I),ct=a.get(T);I.addEventListener("dispose",A);const _t=I.textures,Ct=I.isWebGLCubeRenderTarget===!0,Ut=_t.length>1;if(Ut||(ct.__webglTexture===void 0&&(ct.__webglTexture=r.createTexture()),ct.__version=T.version,f.memory.textures++),Ct){nt.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer[vt]=[];for(let xt=0;xt<T.mipmaps.length;xt++)nt.__webglFramebuffer[vt][xt]=r.createFramebuffer()}else nt.__webglFramebuffer[vt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){nt.__webglFramebuffer=[];for(let vt=0;vt<T.mipmaps.length;vt++)nt.__webglFramebuffer[vt]=r.createFramebuffer()}else nt.__webglFramebuffer=r.createFramebuffer();if(Ut)for(let vt=0,xt=_t.length;vt<xt;vt++){const Nt=a.get(_t[vt]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=r.createTexture(),f.memory.textures++)}if(I.samples>0&&an(I)===!1){nt.__webglMultisampledFramebuffer=r.createFramebuffer(),nt.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let vt=0;vt<_t.length;vt++){const xt=_t[vt];nt.__webglColorRenderbuffer[vt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,nt.__webglColorRenderbuffer[vt]);const Nt=c.convert(xt.format,xt.colorSpace),Gt=c.convert(xt.type),It=N(xt.internalFormat,Nt,Gt,xt.normalized,xt.colorSpace,I.isXRRenderTarget===!0),Ot=Ye(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ot,It,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.RENDERBUFFER,nt.__webglColorRenderbuffer[vt])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(nt.__webglDepthRenderbuffer=r.createRenderbuffer(),ce(nt.__webglDepthRenderbuffer,I,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ct){i.bindTexture(r.TEXTURE_CUBE_MAP,ct.__webglTexture),bt(r.TEXTURE_CUBE_MAP,T);for(let vt=0;vt<6;vt++)if(T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)Lt(nt.__webglFramebuffer[vt][xt],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,xt);else Lt(nt.__webglFramebuffer[vt],I,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);y(T)&&z(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ut){for(let vt=0,xt=_t.length;vt<xt;vt++){const Nt=_t[vt],Gt=a.get(Nt);let It=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(It=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(It,Gt.__webglTexture),bt(It,Nt),Lt(nt.__webglFramebuffer,I,Nt,r.COLOR_ATTACHMENT0+vt,It,0),y(Nt)&&z(It)}i.unbindTexture()}else{let vt=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(vt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(vt,ct.__webglTexture),bt(vt,T),T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)Lt(nt.__webglFramebuffer[xt],I,T,r.COLOR_ATTACHMENT0,vt,xt);else Lt(nt.__webglFramebuffer,I,T,r.COLOR_ATTACHMENT0,vt,0);y(T)&&z(vt),i.unbindTexture()}I.depthBuffer&&kt(I)}function Ae(I){const T=I.textures;for(let nt=0,ct=T.length;nt<ct;nt++){const _t=T[nt];if(y(_t)){const Ct=F(I),Ut=a.get(_t).__webglTexture;i.bindTexture(Ct,Ut),z(Ct),i.unbindTexture()}}}const Re=[],Ie=[];function Ne(I){if(I.samples>0){if(an(I)===!1){const T=I.textures,nt=I.width,ct=I.height;let _t=r.COLOR_BUFFER_BIT;const Ct=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ut=a.get(I),vt=T.length>1;if(vt)for(let Nt=0;Nt<T.length;Nt++)i.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Nt,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Nt,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const xt=I.texture.mipmaps;xt&&xt.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Nt=0;Nt<T.length;Nt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(_t|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(_t|=r.STENCIL_BUFFER_BIT)),vt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ut.__webglColorRenderbuffer[Nt]);const Gt=a.get(T[Nt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Gt,0)}r.blitFramebuffer(0,0,nt,ct,0,0,nt,ct,_t,r.NEAREST),m===!0&&(Re.length=0,Ie.length=0,Re.push(r.COLOR_ATTACHMENT0+Nt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Re.push(Ct),Ie.push(Ct),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ie)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Re))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),vt)for(let Nt=0;Nt<T.length;Nt++){i.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Nt,r.RENDERBUFFER,Ut.__webglColorRenderbuffer[Nt]);const Gt=a.get(T[Nt]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Nt,r.TEXTURE_2D,Gt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&m){const T=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Ye(I){return Math.min(l.maxSamples,I.samples)}function an(I){const T=a.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Q(I){const T=f.render.frame;g.get(I)!==T&&(g.set(I,T),I.update())}function Oe(I,T){const nt=I.colorSpace,ct=I.format,_t=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||nt!==du&&nt!==xs&&(Te.getTransfer(nt)===Xe?(ct!==Gi||_t!==vi)&&oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):we("WebGLTextures: Unsupported texture color space:",nt)),T}function Ce(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=H,this.resetTextureUnits=ut,this.getTextureUnits=gt,this.setTextureUnits=Z,this.setTexture2D=it,this.setTexture2DArray=yt,this.setTexture3D=D,this.setTextureCube=M,this.rebindTextures=re,this.setupRenderTarget=le,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=an,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function yw(r,t){function i(a,l=xs){let c;const f=Te.getTransfer(l);if(a===vi)return r.UNSIGNED_BYTE;if(a===xp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===yp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===rx)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===ox)return r.UNSIGNED_INT_10F_11F_11F_REV;if(a===ax)return r.BYTE;if(a===sx)return r.SHORT;if(a===pl)return r.UNSIGNED_SHORT;if(a===vp)return r.INT;if(a===aa)return r.UNSIGNED_INT;if(a===$i)return r.FLOAT;if(a===Ia)return r.HALF_FLOAT;if(a===lx)return r.ALPHA;if(a===cx)return r.RGB;if(a===Gi)return r.RGBA;if(a===Ba)return r.DEPTH_COMPONENT;if(a===er)return r.DEPTH_STENCIL;if(a===ux)return r.RED;if(a===Sp)return r.RED_INTEGER;if(a===ir)return r.RG;if(a===Mp)return r.RG_INTEGER;if(a===bp)return r.RGBA_INTEGER;if(a===au||a===su||a===ru||a===ou)if(f===Xe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===au)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===su)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===au)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===su)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===ou)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Od||a===Pd||a===Id||a===Bd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Od)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Pd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Id)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Bd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===zd||a===Fd||a===Hd||a===Gd||a===Vd||a===fu||a===kd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===zd||a===Fd)return f===Xe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Hd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(a===Gd)return c.COMPRESSED_R11_EAC;if(a===Vd)return c.COMPRESSED_SIGNED_R11_EAC;if(a===fu)return c.COMPRESSED_RG11_EAC;if(a===kd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Xd||a===Wd||a===Yd||a===qd||a===jd||a===Zd||a===Kd||a===Jd||a===Qd||a===$d||a===tp||a===ep||a===np||a===ip)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Xd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Wd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Yd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===qd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===jd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Zd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Kd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Jd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Qd)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===$d)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===tp)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===ep)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===np)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===ip)return f===Xe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===ap||a===sp||a===rp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===ap)return f===Xe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===sp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===rp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===op||a===lp||a===hu||a===cp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===op)return c.COMPRESSED_RED_RGTC1_EXT;if(a===lp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===hu)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===cp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===ml?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:i}}const Sw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const a=new vx(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,a=new sa({vertexShader:Sw,fragmentShader:Mw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ae(new Ts(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ew extends Es{constructor(t,i){super();const a=this;let l=null,c=1,f=null,p="local-floor",m=1,d=null,g=null,_=null,v=null,b=null,E=null;const w=typeof XRWebGLBinding<"u",x=new bw,y={},z=i.getContextAttributes();let F=null,N=null;const P=[],U=[],B=new qt;let A=null;const L=new ii;L.viewport=new cn;const W=new ii;W.viewport=new cn;const V=[L,W],q=new U1;let ut=null,gt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let rt=P[J];return rt===void 0&&(rt=new jh,P[J]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(J){let rt=P[J];return rt===void 0&&(rt=new jh,P[J]=rt),rt.getGripSpace()},this.getHand=function(J){let rt=P[J];return rt===void 0&&(rt=new jh,P[J]=rt),rt.getHandSpace()};function Z(J){const rt=U.indexOf(J.inputSource);if(rt===-1)return;const dt=P[rt];dt!==void 0&&(dt.update(J.inputSource,J.frame,d||f),dt.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){l.removeEventListener("select",Z),l.removeEventListener("selectstart",Z),l.removeEventListener("selectend",Z),l.removeEventListener("squeeze",Z),l.removeEventListener("squeezestart",Z),l.removeEventListener("squeezeend",Z),l.removeEventListener("end",H),l.removeEventListener("inputsourceschange",k);for(let J=0;J<P.length;J++){const rt=U[J];rt!==null&&(U[J]=null,P[J].disconnect(rt))}ut=null,gt=null,x.reset();for(const J in y)delete y[J];t.setRenderTarget(F),b=null,v=null,_=null,l=null,N=null,bt.stop(),a.isPresenting=!1,t.setPixelRatio(A),t.setSize(B.width,B.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){c=J,a.isPresenting===!0&&oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){p=J,a.isPresenting===!0&&oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||f},this.setReferenceSpace=function(J){d=J},this.getBaseLayer=function(){return v!==null?v:b},this.getBinding=function(){return _===null&&w&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(J){if(l=J,l!==null){if(F=t.getRenderTarget(),l.addEventListener("select",Z),l.addEventListener("selectstart",Z),l.addEventListener("selectend",Z),l.addEventListener("squeeze",Z),l.addEventListener("squeezestart",Z),l.addEventListener("squeezeend",Z),l.addEventListener("end",H),l.addEventListener("inputsourceschange",k),z.xrCompatible!==!0&&await i.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(B),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,wt=null,Ht=null;z.depth&&(Ht=z.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,dt=z.stencil?er:Ba,wt=z.stencil?ml:aa);const Lt={colorFormat:i.RGBA8,depthFormat:Ht,scaleFactor:c};_=this.getBinding(),v=_.createProjectionLayer(Lt),l.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),N=new na(v.textureWidth,v.textureHeight,{format:Gi,type:vi,depthTexture:new ao(v.textureWidth,v.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:z.stencil,colorSpace:t.outputColorSpace,samples:z.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const dt={antialias:z.antialias,alpha:!0,depth:z.depth,stencil:z.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,dt),l.updateRenderState({baseLayer:b}),t.setPixelRatio(1),t.setSize(b.framebufferWidth,b.framebufferHeight,!1),N=new na(b.framebufferWidth,b.framebufferHeight,{format:Gi,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:z.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}N.isXRRenderTarget=!0,this.setFoveation(m),d=null,f=await l.requestReferenceSpace(p),bt.setContext(l),bt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function k(J){for(let rt=0;rt<J.removed.length;rt++){const dt=J.removed[rt],wt=U.indexOf(dt);wt>=0&&(U[wt]=null,P[wt].disconnect(dt))}for(let rt=0;rt<J.added.length;rt++){const dt=J.added[rt];let wt=U.indexOf(dt);if(wt===-1){for(let Lt=0;Lt<P.length;Lt++)if(Lt>=U.length){U.push(dt),wt=Lt;break}else if(U[Lt]===null){U[Lt]=dt,wt=Lt;break}if(wt===-1)break}const Ht=P[wt];Ht&&Ht.connect(dt)}}const it=new Y,yt=new Y;function D(J,rt,dt){it.setFromMatrixPosition(rt.matrixWorld),yt.setFromMatrixPosition(dt.matrixWorld);const wt=it.distanceTo(yt),Ht=rt.projectionMatrix.elements,Lt=dt.projectionMatrix.elements,ce=Ht[14]/(Ht[10]-1),$t=Ht[14]/(Ht[10]+1),kt=(Ht[9]+1)/Ht[5],re=(Ht[9]-1)/Ht[5],le=(Ht[8]-1)/Ht[0],Ae=(Lt[8]+1)/Lt[0],Re=ce*le,Ie=ce*Ae,Ne=wt/(-le+Ae),Ye=Ne*-le;if(rt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ye),J.translateZ(Ne),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ht[10]===-1)J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const an=ce+Ne,Q=$t+Ne,Oe=Re-Ye,Ce=Ie+(wt-Ye),I=kt*$t/Q*an,T=re*$t/Q*an;J.projectionMatrix.makePerspective(Oe,Ce,I,T,an,Q),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function M(J,rt){rt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(rt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(l===null)return;let rt=J.near,dt=J.far;x.texture!==null&&(x.depthNear>0&&(rt=x.depthNear),x.depthFar>0&&(dt=x.depthFar)),q.near=W.near=L.near=rt,q.far=W.far=L.far=dt,(ut!==q.near||gt!==q.far)&&(l.updateRenderState({depthNear:q.near,depthFar:q.far}),ut=q.near,gt=q.far),q.layers.mask=J.layers.mask|6,L.layers.mask=q.layers.mask&-5,W.layers.mask=q.layers.mask&-3;const wt=J.parent,Ht=q.cameras;M(q,wt);for(let Lt=0;Lt<Ht.length;Lt++)M(Ht[Lt],wt);Ht.length===2?D(q,L,W):q.projectionMatrix.copy(L.projectionMatrix),O(J,q,wt)};function O(J,rt,dt){dt===null?J.matrix.copy(rt.matrixWorld):(J.matrix.copy(dt.matrixWorld),J.matrix.invert(),J.matrix.multiply(rt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=gu*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(v===null&&b===null))return m},this.setFoveation=function(J){m=J,v!==null&&(v.fixedFoveation=J),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(q)},this.getCameraTexture=function(J){return y[J]};let tt=null;function mt(J,rt){if(g=rt.getViewerPose(d||f),E=rt,g!==null){const dt=g.views;b!==null&&(t.setRenderTargetFramebuffer(N,b.framebuffer),t.setRenderTarget(N));let wt=!1;dt.length!==q.cameras.length&&(q.cameras.length=0,wt=!0);for(let $t=0;$t<dt.length;$t++){const kt=dt[$t];let re=null;if(b!==null)re=b.getViewport(kt);else{const Ae=_.getViewSubImage(v,kt);re=Ae.viewport,$t===0&&(t.setRenderTargetTextures(N,Ae.colorTexture,Ae.depthStencilTexture),t.setRenderTarget(N))}let le=V[$t];le===void 0&&(le=new ii,le.layers.enable($t),le.viewport=new cn,V[$t]=le),le.matrix.fromArray(kt.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(kt.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(re.x,re.y,re.width,re.height),$t===0&&(q.matrix.copy(le.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),wt===!0&&q.cameras.push(le)}const Ht=l.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&w){_=a.getBinding();const $t=_.getDepthInformation(dt[0]);$t&&$t.isValid&&$t.texture&&x.init($t,l.renderState)}if(Ht&&Ht.includes("camera-access")&&w){t.state.unbindTexture(),_=a.getBinding();for(let $t=0;$t<dt.length;$t++){const kt=dt[$t].camera;if(kt){let re=y[kt];re||(re=new vx,y[kt]=re);const le=_.getCameraImage(kt);re.sourceTexture=le}}}}for(let dt=0;dt<P.length;dt++){const wt=U[dt],Ht=P[dt];wt!==null&&Ht!==void 0&&Ht.update(wt,rt,d||f)}tt&&tt(J,rt),rt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:rt}),E=null}const bt=new Ex;bt.setAnimationLoop(mt),this.setAnimationLoop=function(J){tt=J},this.dispose=function(){}}}const Tw=new nn,Dx=new he;Dx.set(-1,0,0,0,1,0,0,0,1);function Aw(r,t){function i(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function a(x,y){y.color.getRGB(x.fogColor.value,Mx(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function l(x,y,z,F,N){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(x,y):y.isMeshLambertMaterial?(c(x,y),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(x,y),_(x,y)):y.isMeshPhongMaterial?(c(x,y),g(x,y),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(x,y),v(x,y),y.isMeshPhysicalMaterial&&b(x,y,N)):y.isMeshMatcapMaterial?(c(x,y),E(x,y)):y.isMeshDepthMaterial?c(x,y):y.isMeshDistanceMaterial?(c(x,y),w(x,y)):y.isMeshNormalMaterial?c(x,y):y.isLineBasicMaterial?(f(x,y),y.isLineDashedMaterial&&p(x,y)):y.isPointsMaterial?m(x,y,z,F):y.isSpriteMaterial?d(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,i(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===ai&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,i(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===ai&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,i(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,i(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const z=t.get(y),F=z.envMap,N=z.envMapRotation;F&&(x.envMap.value=F,x.envMapRotation.value.setFromMatrix4(Tw.makeRotationFromEuler(N)).transpose(),F.isCubeTexture&&F.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Dx),x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap&&(x.lightMap.value=y.lightMap,x.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,x.lightMapTransform)),y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,x.aoMapTransform))}function f(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform))}function p(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function m(x,y,z,F){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*z,x.scale.value=F*.5,y.map&&(x.map.value=y.map,i(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function d(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function _(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function v(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,x.roughnessMapTransform)),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function b(x,y,z){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ai&&x.clearcoatNormalScale.value.negate())),y.dispersion>0&&(x.dispersion.value=y.dispersion),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=z.texture,x.transmissionSamplerSize.value.set(z.width,z.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,y){y.matcap&&(x.matcap.value=y.matcap)}function w(x,y){const z=t.get(y).light;x.referencePosition.value.setFromMatrixPosition(z.matrixWorld),x.nearDistance.value=z.shadow.camera.near,x.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function ww(r,t,i,a){let l={},c={},f=[];const p=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,P){const U=P.program;a.uniformBlockBinding(N,U)}function d(N,P){let U=l[N.id];U===void 0&&(x(N),U=g(N),l[N.id]=U,N.addEventListener("dispose",z));const B=P.program;a.updateUBOMapping(N,B);const A=t.render.frame;c[N.id]!==A&&(v(N),c[N.id]=A)}function g(N){const P=_();N.__bindingPointIndex=P;const U=r.createBuffer(),B=N.__size,A=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,B,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,P,U),U}function _(){for(let N=0;N<p;N++)if(f.indexOf(N)===-1)return f.push(N),N;return we("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(N){const P=l[N.id],U=N.uniforms,B=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,P);for(let A=0,L=U.length;A<L;A++){const W=U[A];if(Array.isArray(W))for(let V=0,q=W.length;V<q;V++)b(W[V],A,V,B);else b(W,A,0,B)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(N,P,U,B){if(w(N,P,U,B)===!0){const A=N.__offset,L=N.value;if(Array.isArray(L)){let W=0;for(let V=0;V<L.length;V++){const q=L[V],ut=y(q);E(q,N.__data,W),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(W+=ut.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(L,N.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,A,N.__data)}}function E(N,P,U){typeof N=="number"||typeof N=="boolean"?P[0]=N:N.isMatrix3?(P[0]=N.elements[0],P[1]=N.elements[1],P[2]=N.elements[2],P[3]=0,P[4]=N.elements[3],P[5]=N.elements[4],P[6]=N.elements[5],P[7]=0,P[8]=N.elements[6],P[9]=N.elements[7],P[10]=N.elements[8],P[11]=0):ArrayBuffer.isView(N)?P.set(new N.constructor(N.buffer,N.byteOffset,P.length)):N.toArray(P,U)}function w(N,P,U,B){const A=N.value,L=P+"_"+U;if(B[L]===void 0)return typeof A=="number"||typeof A=="boolean"?B[L]=A:ArrayBuffer.isView(A)?B[L]=A.slice():B[L]=A.clone(),!0;{const W=B[L];if(typeof A=="number"||typeof A=="boolean"){if(W!==A)return B[L]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(W.equals(A)===!1)return W.copy(A),!0}}return!1}function x(N){const P=N.uniforms;let U=0;const B=16;for(let L=0,W=P.length;L<W;L++){const V=Array.isArray(P[L])?P[L]:[P[L]];for(let q=0,ut=V.length;q<ut;q++){const gt=V[q],Z=Array.isArray(gt.value)?gt.value:[gt.value];for(let H=0,k=Z.length;H<k;H++){const it=Z[H],yt=y(it),D=U%B,M=D%yt.boundary,O=D+M;U+=M,O!==0&&B-O<yt.storage&&(U+=B-O),gt.__data=new Float32Array(yt.storage/Float32Array.BYTES_PER_ELEMENT),gt.__offset=U,U+=yt.storage}}}const A=U%B;return A>0&&(U+=B-A),N.__size=U,N.__cache={},this}function y(N){const P={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(P.boundary=4,P.storage=4):N.isVector2?(P.boundary=8,P.storage=8):N.isVector3||N.isColor?(P.boundary=16,P.storage=12):N.isVector4?(P.boundary=16,P.storage=16):N.isMatrix3?(P.boundary=48,P.storage=48):N.isMatrix4?(P.boundary=64,P.storage=64):N.isTexture?oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(P.boundary=16,P.storage=N.byteLength):oe("WebGLRenderer: Unsupported uniform value type.",N),P}function z(N){const P=N.target;P.removeEventListener("dispose",z);const U=f.indexOf(P.__bindingPointIndex);f.splice(U,1),r.deleteBuffer(l[P.id]),delete l[P.id],delete c[P.id]}function F(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:d,dispose:F}}const Cw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ki=null;function Rw(){return Ki===null&&(Ki=new Zb(Cw,16,16,ir,Ia),Ki.name="DFG_LUT",Ki.minFilter=kn,Ki.magFilter=kn,Ki.wrapS=La,Ki.wrapT=La,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}class Nw{constructor(t={}){const{canvas:i=Tb(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:d=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:b=vi}=t;this.isWebGLRenderer=!0;let E;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=a.getContextAttributes().alpha}else E=f;const w=b,x=new Set([bp,Mp,Sp]),y=new Set([vi,aa,pl,ml,xp,yp]),z=new Uint32Array(4),F=new Int32Array(4),N=new Y;let P=null,U=null;const B=[],A=[];let L=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ea,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const W=this;let V=!1,q=null,ut=null,gt=null,Z=null;this._outputColorSpace=Ri;let H=0,k=0,it=null,yt=-1,D=null;const M=new cn,O=new cn;let tt=null;const mt=new ve(0);let bt=0,J=i.width,rt=i.height,dt=1,wt=null,Ht=null;const Lt=new cn(0,0,J,rt),ce=new cn(0,0,J,rt);let $t=!1;const kt=new Rp;let re=!1,le=!1;const Ae=new nn,Re=new Y,Ie=new cn,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function an(){return it===null?dt:1}let Q=a;function Oe(C,$){return i.getContext(C,$)}try{const C={alpha:!0,depth:l,stencil:c,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:d,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${gp}`),i.addEventListener("webglcontextlost",sn,!1),i.addEventListener("webglcontextrestored",ze,!1),i.addEventListener("webglcontextcreationerror",si,!1),Q===null){const $="webgl2";if(Q=Oe($,C),Q===null)throw Oe($)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw we("WebGLRenderer: "+C.message),C}let Ce,I,T,nt,ct,_t,Ct,Ut,vt,xt,Nt,Gt,It,Ot,te,ee,ue,K,Rt,Mt,Dt,Ft,At;function Kt(){Ce=new RA(Q),Ce.init(),Dt=new yw(Q,Ce),I=new SA(Q,Ce,t,Dt),T=new vw(Q,Ce),I.reversedDepthBuffer&&v&&T.buffers.depth.setReversed(!0),ut=Q.createFramebuffer(),gt=Q.createFramebuffer(),Z=Q.createFramebuffer(),nt=new UA(Q),ct=new aw,_t=new xw(Q,Ce,T,ct,I,Dt,nt),Ct=new CA(W),Ut=new I1(Q),Ft=new xA(Q,Ut),vt=new NA(Q,Ut,nt,Ft),xt=new OA(Q,vt,Ut,Ft,nt),K=new LA(Q,I,_t),te=new MA(ct),Nt=new iw(W,Ct,Ce,I,Ft,te),Gt=new Aw(W,ct),It=new rw,Ot=new hw(Ce),ue=new vA(W,Ct,T,xt,E,m),ee=new _w(W,xt,I),At=new ww(Q,nt,I,T),Rt=new yA(Q,Ce,nt),Mt=new DA(Q,Ce,nt),nt.programs=Nt.programs,W.capabilities=I,W.extensions=Ce,W.properties=ct,W.renderLists=It,W.shadowMap=ee,W.state=T,W.info=nt}Kt(),w!==vi&&(L=new IA(w,i.width,i.height,p,l,c));const Wt=new Ew(W,Q);this.xr=Wt,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const C=Ce.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ce.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(C){C!==void 0&&(dt=C,this.setSize(J,rt,!1))},this.getSize=function(C){return C.set(J,rt)},this.setSize=function(C,$,ft=!0){if(Wt.isPresenting){oe("WebGLRenderer: Can't change size while VR device is presenting.");return}J=C,rt=$,i.width=Math.floor(C*dt),i.height=Math.floor($*dt),ft===!0&&(i.style.width=C+"px",i.style.height=$+"px"),L!==null&&L.setSize(i.width,i.height),this.setViewport(0,0,C,$)},this.getDrawingBufferSize=function(C){return C.set(J*dt,rt*dt).floor()},this.setDrawingBufferSize=function(C,$,ft){J=C,rt=$,dt=ft,i.width=Math.floor(C*ft),i.height=Math.floor($*ft),this.setViewport(0,0,C,$)},this.setEffects=function(C){if(w===vi){we("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let $=0;$<C.length;$++)if(C[$].isOutputPass===!0){oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(M)},this.getViewport=function(C){return C.copy(Lt)},this.setViewport=function(C,$,ft,ot){C.isVector4?Lt.set(C.x,C.y,C.z,C.w):Lt.set(C,$,ft,ot),T.viewport(M.copy(Lt).multiplyScalar(dt).round())},this.getScissor=function(C){return C.copy(ce)},this.setScissor=function(C,$,ft,ot){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,$,ft,ot),T.scissor(O.copy(ce).multiplyScalar(dt).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(C){T.setScissorTest($t=C)},this.setOpaqueSort=function(C){wt=C},this.setTransparentSort=function(C){Ht=C},this.getClearColor=function(C){return C.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor(...arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha(...arguments)},this.clear=function(C=!0,$=!0,ft=!0){let ot=0;if(C){let lt=!1;if(it!==null){const Bt=it.texture.format;lt=x.has(Bt)}if(lt){const Bt=it.texture.type,Xt=y.has(Bt),Pt=ue.getClearColor(),jt=ue.getClearAlpha(),Yt=Pt.r,ne=Pt.g,de=Pt.b;Xt?(z[0]=Yt,z[1]=ne,z[2]=de,z[3]=jt,Q.clearBufferuiv(Q.COLOR,0,z)):(F[0]=Yt,F[1]=ne,F[2]=de,F[3]=jt,Q.clearBufferiv(Q.COLOR,0,F))}else ot|=Q.COLOR_BUFFER_BIT}$&&(ot|=Q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ft&&(ot|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ot!==0&&Q.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),q=C},this.dispose=function(){i.removeEventListener("webglcontextlost",sn,!1),i.removeEventListener("webglcontextrestored",ze,!1),i.removeEventListener("webglcontextcreationerror",si,!1),ue.dispose(),It.dispose(),Ot.dispose(),ct.dispose(),Ct.dispose(),xt.dispose(),Ft.dispose(),At.dispose(),Nt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",_n),Wt.removeEventListener("sessionend",Un),jn.stop()};function sn(C){C.preventDefault(),V_("WebGLRenderer: Context Lost."),V=!0}function ze(){V_("WebGLRenderer: Context Restored."),V=!1;const C=nt.autoReset,$=ee.enabled,ft=ee.autoUpdate,ot=ee.needsUpdate,lt=ee.type;Kt(),nt.autoReset=C,ee.enabled=$,ee.autoUpdate=ft,ee.needsUpdate=ot,ee.type=lt}function si(C){we("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ri(C){const $=C.target;$.removeEventListener("dispose",ri),lo($)}function lo(C){co(C),ct.remove(C)}function co(C){const $=ct.get(C).programs;$!==void 0&&($.forEach(function(ft){Nt.releaseProgram(ft)}),C.isShaderMaterial&&Nt.releaseShaderCache(C))}this.renderBufferDirect=function(C,$,ft,ot,lt,Bt){$===null&&($=Ne);const Xt=lt.isMesh&&lt.matrixWorld.determinantAffine()<0,Pt=Va(C,$,ft,ot,lt);T.setMaterial(ot,Xt);let jt=ft.index,Yt=1;if(ot.wireframe===!0){if(jt=vt.getWireframeAttribute(ft),jt===void 0)return;Yt=2}const ne=ft.drawRange,de=ft.attributes.position;let Qt=ne.start*Yt,De=(ne.start+ne.count)*Yt;Bt!==null&&(Qt=Math.max(Qt,Bt.start*Yt),De=Math.min(De,(Bt.start+Bt.count)*Yt)),jt!==null?(Qt=Math.max(Qt,0),De=Math.min(De,jt.count)):de!=null&&(Qt=Math.max(Qt,0),De=Math.min(De,de.count));const rn=De-Qt;if(rn<0||rn===1/0)return;Ft.setup(lt,ot,Pt,ft,jt);let Je,Fe=Rt;if(jt!==null&&(Je=Ut.get(jt),Fe=Mt,Fe.setIndex(Je)),lt.isMesh)ot.wireframe===!0?(T.setLineWidth(ot.wireframeLinewidth*an()),Fe.setMode(Q.LINES)):Fe.setMode(Q.TRIANGLES);else if(lt.isLine){let He=ot.linewidth;He===void 0&&(He=1),T.setLineWidth(He*an()),lt.isLineSegments?Fe.setMode(Q.LINES):lt.isLineLoop?Fe.setMode(Q.LINE_LOOP):Fe.setMode(Q.LINE_STRIP)}else lt.isPoints?Fe.setMode(Q.POINTS):lt.isSprite&&Fe.setMode(Q.TRIANGLES);if(lt.isBatchedMesh)if(Ce.get("WEBGL_multi_draw"))Fe.renderMultiDraw(lt._multiDrawStarts,lt._multiDrawCounts,lt._multiDrawCount);else{const He=lt._multiDrawStarts,Vt=lt._multiDrawCounts,zn=lt._multiDrawCount,xe=jt?Ut.get(jt).bytesPerElement:1,En=ct.get(ot).currentProgram.getUniforms();for(let oi=0;oi<zn;oi++)En.setValue(Q,"_gl_DrawID",oi),Fe.render(He[oi]/xe,Vt[oi])}else if(lt.isInstancedMesh)Fe.renderInstances(Qt,rn,lt.count);else if(ft.isInstancedBufferGeometry){const He=ft._maxInstanceCount!==void 0?ft._maxInstanceCount:1/0,Vt=Math.min(ft.instanceCount,He);Fe.renderInstances(Qt,rn,Vt)}else Fe.render(Qt,rn)};function uo(C,$,ft){C.transparent===!0&&C.side===Ua&&C.forceSinglePass===!1?(C.side=ai,C.needsUpdate=!0,Ga(C,$,ft),C.side=Ss,C.needsUpdate=!0,Ga(C,$,ft),C.side=Ua):Ga(C,$,ft)}this.compile=function(C,$,ft=null){ft===null&&(ft=C),U=Ot.get(ft),U.init($),A.push(U),ft.traverseVisible(function(lt){lt.isLight&&lt.layers.test($.layers)&&(U.pushLight(lt),lt.castShadow&&U.pushShadow(lt))}),C!==ft&&C.traverseVisible(function(lt){lt.isLight&&lt.layers.test($.layers)&&(U.pushLight(lt),lt.castShadow&&U.pushShadow(lt))}),U.setupLights();const ot=new Set;return C.traverse(function(lt){if(!(lt.isMesh||lt.isPoints||lt.isLine||lt.isSprite))return;const Bt=lt.material;if(Bt)if(Array.isArray(Bt))for(let Xt=0;Xt<Bt.length;Xt++){const Pt=Bt[Xt];uo(Pt,ft,lt),ot.add(Pt)}else uo(Bt,ft,lt),ot.add(Bt)}),U=A.pop(),ot},this.compileAsync=function(C,$,ft=null){const ot=this.compile(C,$,ft);return new Promise(lt=>{function Bt(){if(ot.forEach(function(Xt){ct.get(Xt).currentProgram.isReady()&&ot.delete(Xt)}),ot.size===0){lt(C);return}setTimeout(Bt,10)}Ce.get("KHR_parallel_shader_compile")!==null?Bt():setTimeout(Bt,10)})};let ar=null;function ki(C){ar&&ar(C)}function _n(){jn.stop()}function Un(){jn.start()}const jn=new Ex;jn.setAnimationLoop(ki),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(C){ar=C,Wt.setAnimationLoop(C),C===null?jn.stop():jn.start()},Wt.addEventListener("sessionstart",_n),Wt.addEventListener("sessionend",Un),this.render=function(C,$){if($!==void 0&&$.isCamera!==!0){we("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;q!==null&&q.renderStart(C,$);const ft=Wt.enabled===!0&&Wt.isPresenting===!0,ot=L!==null&&(it===null||ft)&&L.begin(W,it);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera($),$=Wt.getCamera()),C.isScene===!0&&C.onBeforeRender(W,C,$,it),U=Ot.get(C,A.length),U.init($),U.state.textureUnits=_t.getTextureUnits(),A.push(U),Ae.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),kt.setFromProjectionMatrix(Ae,ta,$.reversedDepth),le=this.localClippingEnabled,re=te.init(this.clippingPlanes,le),P=It.get(C,B.length),P.init(),B.push(P),Wt.enabled===!0&&Wt.isPresenting===!0){const Xt=W.xr.getDepthSensingMesh();Xt!==null&&As(Xt,$,-1/0,W.sortObjects)}As(C,$,0,W.sortObjects),P.finish(),W.sortObjects===!0&&P.sort(wt,Ht,$.reversedDepth),Ye=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1,Ye&&ue.addToRenderList(P,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&te.beginShadows();const lt=U.state.shadowsArray;if(ee.render(lt,C,$),re===!0&&te.endShadows(),(ot&&L.hasRenderPass())===!1){const Xt=P.opaque,Pt=P.transmissive;if(U.setupLights(),$.isArrayCamera){const jt=$.cameras;if(Pt.length>0)for(let Yt=0,ne=jt.length;Yt<ne;Yt++){const de=jt[Yt];Sl(Xt,Pt,C,de)}Ye&&ue.render(C);for(let Yt=0,ne=jt.length;Yt<ne;Yt++){const de=jt[Yt];yl(P,C,de,de.viewport)}}else Pt.length>0&&Sl(Xt,Pt,C,$),Ye&&ue.render(C),yl(P,C,$)}it!==null&&k===0&&(_t.updateMultisampleRenderTarget(it),_t.updateRenderTargetMipmap(it)),ot&&L.end(W),C.isScene===!0&&C.onAfterRender(W,C,$),Ft.resetDefaultState(),yt=-1,D=null,A.pop(),A.length>0?(U=A[A.length-1],_t.setTextureUnits(U.state.textureUnits),re===!0&&te.setGlobalState(W.clippingPlanes,U.state.camera)):U=null,B.pop(),B.length>0?P=B[B.length-1]:P=null,q!==null&&q.renderEnd()};function As(C,$,ft,ot){if(C.visible===!1)return;if(C.layers.test($.layers)){if(C.isGroup)ft=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update($);else if(C.isLightProbeGrid)U.pushLightProbeGrid(C);else if(C.isLight)U.pushLight(C),C.castShadow&&U.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||kt.intersectsSprite(C)){ot&&Ie.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ae);const Xt=xt.update(C),Pt=C.material;Pt.visible&&P.push(C,Xt,Pt,ft,Ie.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||kt.intersectsObject(C))){const Xt=xt.update(C),Pt=C.material;if(ot&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ie.copy(C.boundingSphere.center)):(Xt.boundingSphere===null&&Xt.computeBoundingSphere(),Ie.copy(Xt.boundingSphere.center)),Ie.applyMatrix4(C.matrixWorld).applyMatrix4(Ae)),Array.isArray(Pt)){const jt=Xt.groups;for(let Yt=0,ne=jt.length;Yt<ne;Yt++){const de=jt[Yt],Qt=Pt[de.materialIndex];Qt&&Qt.visible&&P.push(C,Xt,Qt,ft,Ie.z,de)}}else Pt.visible&&P.push(C,Xt,Pt,ft,Ie.z,null)}}const Bt=C.children;for(let Xt=0,Pt=Bt.length;Xt<Pt;Xt++)As(Bt[Xt],$,ft,ot)}function yl(C,$,ft,ot){const{opaque:lt,transmissive:Bt,transparent:Xt}=C;U.setupLightsView(ft),re===!0&&te.setGlobalState(W.clippingPlanes,ft),ot&&T.viewport(M.copy(ot)),lt.length>0&&ws(lt,$,ft),Bt.length>0&&ws(Bt,$,ft),Xt.length>0&&ws(Xt,$,ft),T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function Sl(C,$,ft,ot){if((ft.isScene===!0?ft.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[ot.id]===void 0){const Qt=Ce.has("EXT_color_buffer_half_float")||Ce.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[ot.id]=new na(1,1,{generateMipmaps:!0,type:Qt?Ia:vi,minFilter:tr,samples:Math.max(4,I.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Te.workingColorSpace})}const Bt=U.state.transmissionRenderTarget[ot.id],Xt=ot.viewport||M;Bt.setSize(Xt.z*W.transmissionResolutionScale,Xt.w*W.transmissionResolutionScale);const Pt=W.getRenderTarget(),jt=W.getActiveCubeFace(),Yt=W.getActiveMipmapLevel();W.setRenderTarget(Bt),W.getClearColor(mt),bt=W.getClearAlpha(),bt<1&&W.setClearColor(16777215,.5),W.clear(),Ye&&ue.render(ft);const ne=W.toneMapping;W.toneMapping=ea;const de=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),U.setupLightsView(ot),re===!0&&te.setGlobalState(W.clippingPlanes,ot),ws(C,ft,ot),_t.updateMultisampleRenderTarget(Bt),_t.updateRenderTargetMipmap(Bt),Ce.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let De=0,rn=$.length;De<rn;De++){const Je=$[De],{object:Fe,geometry:He,material:Vt,group:zn}=Je;if(Vt.side===Ua&&Fe.layers.test(ot.layers)){const xe=Vt.side;Vt.side=ai,Vt.needsUpdate=!0,Ha(Fe,ft,ot,He,Vt,zn),Vt.side=xe,Vt.needsUpdate=!0,Qt=!0}}Qt===!0&&(_t.updateMultisampleRenderTarget(Bt),_t.updateRenderTargetMipmap(Bt))}W.setRenderTarget(Pt,jt,Yt),W.setClearColor(mt,bt),de!==void 0&&(ot.viewport=de),W.toneMapping=ne}function ws(C,$,ft){const ot=$.isScene===!0?$.overrideMaterial:null;for(let lt=0,Bt=C.length;lt<Bt;lt++){const Xt=C[lt],{object:Pt,geometry:jt,group:Yt}=Xt;let ne=Xt.material;ne.allowOverride===!0&&ot!==null&&(ne=ot),Pt.layers.test(ft.layers)&&Ha(Pt,$,ft,jt,ne,Yt)}}function Ha(C,$,ft,ot,lt,Bt){C.onBeforeRender(W,$,ft,ot,lt,Bt),C.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),lt.onBeforeRender(W,$,ft,ot,C,Bt),lt.transparent===!0&&lt.side===Ua&&lt.forceSinglePass===!1?(lt.side=ai,lt.needsUpdate=!0,W.renderBufferDirect(ft,$,ot,lt,C,Bt),lt.side=Ss,lt.needsUpdate=!0,W.renderBufferDirect(ft,$,ot,lt,C,Bt),lt.side=Ua):W.renderBufferDirect(ft,$,ot,lt,C,Bt),C.onAfterRender(W,$,ft,ot,lt,Bt)}function Ga(C,$,ft){$.isScene!==!0&&($=Ne);const ot=ct.get(C),lt=U.state.lights,Bt=U.state.shadowsArray,Xt=lt.state.version,Pt=Nt.getParameters(C,lt.state,Bt,$,ft,U.state.lightProbeGridArray),jt=Nt.getProgramCacheKey(Pt);let Yt=ot.programs;ot.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?$.environment:null,ot.fog=$.fog;const ne=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;ot.envMap=Ct.get(C.envMap||ot.environment,ne),ot.envMapRotation=ot.environment!==null&&C.envMap===null?$.environmentRotation:C.envMapRotation,Yt===void 0&&(C.addEventListener("dispose",ri),Yt=new Map,ot.programs=Yt);let de=Yt.get(jt);if(de!==void 0){if(ot.currentProgram===de&&ot.lightsStateVersion===Xt)return oa(C,Pt),de}else Pt.uniforms=Nt.getUniforms(C),q!==null&&C.isNodeMaterial&&q.build(C,ft,Pt),C.onBeforeCompile(Pt,W),de=Nt.acquireProgram(Pt,jt),Yt.set(jt,de),ot.uniforms=Pt.uniforms;const Qt=ot.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Qt.clippingPlanes=te.uniform),oa(C,Pt),ot.needsLights=Ml(C),ot.lightsStateVersion=Xt,ot.needsLights&&(Qt.ambientLightColor.value=lt.state.ambient,Qt.lightProbe.value=lt.state.probe,Qt.directionalLights.value=lt.state.directional,Qt.directionalLightShadows.value=lt.state.directionalShadow,Qt.spotLights.value=lt.state.spot,Qt.spotLightShadows.value=lt.state.spotShadow,Qt.rectAreaLights.value=lt.state.rectArea,Qt.ltc_1.value=lt.state.rectAreaLTC1,Qt.ltc_2.value=lt.state.rectAreaLTC2,Qt.pointLights.value=lt.state.point,Qt.pointLightShadows.value=lt.state.pointShadow,Qt.hemisphereLights.value=lt.state.hemi,Qt.directionalShadowMatrix.value=lt.state.directionalShadowMatrix,Qt.spotLightMatrix.value=lt.state.spotLightMatrix,Qt.spotLightMap.value=lt.state.spotLightMap,Qt.pointShadowMatrix.value=lt.state.pointShadowMatrix),ot.lightProbeGrid=U.state.lightProbeGridArray.length>0,ot.currentProgram=de,ot.uniformsList=null,de}function ra(C){if(C.uniformsList===null){const $=C.currentProgram.getUniforms();C.uniformsList=cu.seqWithValue($.seq,C.uniforms)}return C.uniformsList}function oa(C,$){const ft=ct.get(C);ft.outputColorSpace=$.outputColorSpace,ft.batching=$.batching,ft.batchingColor=$.batchingColor,ft.instancing=$.instancing,ft.instancingColor=$.instancingColor,ft.instancingMorph=$.instancingMorph,ft.skinning=$.skinning,ft.morphTargets=$.morphTargets,ft.morphNormals=$.morphNormals,ft.morphColors=$.morphColors,ft.morphTargetsCount=$.morphTargetsCount,ft.numClippingPlanes=$.numClippingPlanes,ft.numIntersection=$.numClipIntersection,ft.vertexAlphas=$.vertexAlphas,ft.vertexTangents=$.vertexTangents,ft.toneMapping=$.toneMapping}function Cs(C,$){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;N.setFromMatrixPosition($.matrixWorld);for(let ft=0,ot=C.length;ft<ot;ft++){const lt=C[ft];if(lt.texture!==null&&lt.boundingBox.containsPoint(N))return lt}return null}function Va(C,$,ft,ot,lt){$.isScene!==!0&&($=Ne),_t.resetTextureUnits();const Bt=$.fog,Xt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial?$.environment:null,Pt=it===null?W.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Te.workingColorSpace,jt=ot.isMeshStandardMaterial||ot.isMeshLambertMaterial&&!ot.envMap||ot.isMeshPhongMaterial&&!ot.envMap,Yt=Ct.get(ot.envMap||Xt,jt),ne=ot.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,de=!!ft.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Qt=!!ft.morphAttributes.position,De=!!ft.morphAttributes.normal,rn=!!ft.morphAttributes.color;let Je=ea;ot.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Je=W.toneMapping);const Fe=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,He=Fe!==void 0?Fe.length:0,Vt=ct.get(ot),zn=U.state.lights;if(re===!0&&(le===!0||C!==D)){const Be=C===D&&ot.id===yt;te.setState(ot,C,Be)}let xe=!1;ot.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==zn.state.version||Vt.outputColorSpace!==Pt||lt.isBatchedMesh&&Vt.batching===!1||!lt.isBatchedMesh&&Vt.batching===!0||lt.isBatchedMesh&&Vt.batchingColor===!0&&lt.colorTexture===null||lt.isBatchedMesh&&Vt.batchingColor===!1&&lt.colorTexture!==null||lt.isInstancedMesh&&Vt.instancing===!1||!lt.isInstancedMesh&&Vt.instancing===!0||lt.isSkinnedMesh&&Vt.skinning===!1||!lt.isSkinnedMesh&&Vt.skinning===!0||lt.isInstancedMesh&&Vt.instancingColor===!0&&lt.instanceColor===null||lt.isInstancedMesh&&Vt.instancingColor===!1&&lt.instanceColor!==null||lt.isInstancedMesh&&Vt.instancingMorph===!0&&lt.morphTexture===null||lt.isInstancedMesh&&Vt.instancingMorph===!1&&lt.morphTexture!==null||Vt.envMap!==Yt||ot.fog===!0&&Vt.fog!==Bt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==te.numPlanes||Vt.numIntersection!==te.numIntersection)||Vt.vertexAlphas!==ne||Vt.vertexTangents!==de||Vt.morphTargets!==Qt||Vt.morphNormals!==De||Vt.morphColors!==rn||Vt.toneMapping!==Je||Vt.morphTargetsCount!==He||!!Vt.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(xe=!0):(xe=!0,Vt.__version=ot.version);let En=Vt.currentProgram;xe===!0&&(En=Ga(ot,$,lt),q&&ot.isNodeMaterial&&q.onUpdateProgram(ot,En,Vt));let oi=!1,Di=!1,li=!1;const Ge=En.getUniforms(),on=Vt.uniforms;if(T.useProgram(En.program)&&(oi=!0,Di=!0,li=!0),ot.id!==yt&&(yt=ot.id,Di=!0),Vt.needsLights){const Be=Cs(U.state.lightProbeGridArray,lt);Vt.lightProbeGrid!==Be&&(Vt.lightProbeGrid=Be,Di=!0)}if(oi||D!==C){T.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Ge.setValue(Q,"projectionMatrix",C.projectionMatrix),Ge.setValue(Q,"viewMatrix",C.matrixWorldInverse);const Xi=Ge.map.cameraPosition;Xi!==void 0&&Xi.setValue(Q,Re.setFromMatrixPosition(C.matrixWorld)),I.logarithmicDepthBuffer&&Ge.setValue(Q,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Ge.setValue(Q,"isOrthographic",C.isOrthographicCamera===!0),D!==C&&(D=C,Di=!0,li=!0)}if(Vt.needsLights&&(zn.state.directionalShadowMap.length>0&&Ge.setValue(Q,"directionalShadowMap",zn.state.directionalShadowMap,_t),zn.state.spotShadowMap.length>0&&Ge.setValue(Q,"spotShadowMap",zn.state.spotShadowMap,_t),zn.state.pointShadowMap.length>0&&Ge.setValue(Q,"pointShadowMap",zn.state.pointShadowMap,_t)),lt.isSkinnedMesh){Ge.setOptional(Q,lt,"bindMatrix"),Ge.setOptional(Q,lt,"bindMatrixInverse");const Be=lt.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),Ge.setValue(Q,"boneTexture",Be.boneTexture,_t))}lt.isBatchedMesh&&(Ge.setOptional(Q,lt,"batchingTexture"),Ge.setValue(Q,"batchingTexture",lt._matricesTexture,_t),Ge.setOptional(Q,lt,"batchingIdTexture"),Ge.setValue(Q,"batchingIdTexture",lt._indirectTexture,_t),Ge.setOptional(Q,lt,"batchingColorTexture"),lt._colorsTexture!==null&&Ge.setValue(Q,"batchingColorTexture",lt._colorsTexture,_t));const Ui=ft.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0)&&K.update(lt,ft,En),(Di||Vt.receiveShadow!==lt.receiveShadow)&&(Vt.receiveShadow=lt.receiveShadow,Ge.setValue(Q,"receiveShadow",lt.receiveShadow)),(ot.isMeshStandardMaterial||ot.isMeshLambertMaterial||ot.isMeshPhongMaterial)&&ot.envMap===null&&$.environment!==null&&(on.envMapIntensity.value=$.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=Rw()),Di){if(Ge.setValue(Q,"toneMappingExposure",W.toneMappingExposure),Vt.needsLights&&vn(on,li),Bt&&ot.fog===!0&&Gt.refreshFogUniforms(on,Bt),Gt.refreshMaterialUniforms(on,ot,dt,rt,U.state.transmissionRenderTarget[C.id]),Vt.needsLights&&Vt.lightProbeGrid){const Be=Vt.lightProbeGrid;on.probesSH.value=Be.texture,on.probesMin.value.copy(Be.boundingBox.min),on.probesMax.value.copy(Be.boundingBox.max),on.probesResolution.value.copy(Be.resolution)}cu.upload(Q,ra(Vt),on,_t)}if(ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(cu.upload(Q,ra(Vt),on,_t),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Ge.setValue(Q,"center",lt.center),Ge.setValue(Q,"modelViewMatrix",lt.modelViewMatrix),Ge.setValue(Q,"normalMatrix",lt.normalMatrix),Ge.setValue(Q,"modelMatrix",lt.matrixWorld),ot.uniformsGroups!==void 0){const Be=ot.uniformsGroups;for(let Xi=0,ka=Be.length;Xi<ka;Xi++){const Rs=Be[Xi];At.update(Rs,En),At.bind(Rs,En)}}return En}function vn(C,$){C.ambientLightColor.needsUpdate=$,C.lightProbe.needsUpdate=$,C.directionalLights.needsUpdate=$,C.directionalLightShadows.needsUpdate=$,C.pointLights.needsUpdate=$,C.pointLightShadows.needsUpdate=$,C.spotLights.needsUpdate=$,C.spotLightShadows.needsUpdate=$,C.rectAreaLights.needsUpdate=$,C.hemisphereLights.needsUpdate=$}function Ml(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(C,$,ft){const ot=ct.get(C);ot.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),ct.get(C.texture).__webglTexture=$,ct.get(C.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:ft,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,$){const ft=ct.get(C);ft.__webglFramebuffer=$,ft.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(C,$=0,ft=0){it=C,H=$,k=ft;let ot=null,lt=!1,Bt=!1;if(C){const Pt=ct.get(C);if(Pt.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(Q.FRAMEBUFFER,Pt.__webglFramebuffer),M.copy(C.viewport),O.copy(C.scissor),tt=C.scissorTest,T.viewport(M),T.scissor(O),T.setScissorTest(tt),yt=-1;return}else if(Pt.__webglFramebuffer===void 0)_t.setupRenderTarget(C);else if(Pt.__hasExternalTextures)_t.rebindTextures(C,ct.get(C.texture).__webglTexture,ct.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ne=C.depthTexture;if(Pt.__boundDepthTexture!==ne){if(ne!==null&&ct.has(ne)&&(C.width!==ne.image.width||C.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");_t.setupDepthRenderbuffer(C)}}const jt=C.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Bt=!0);const Yt=ct.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Yt[$])?ot=Yt[$][ft]:ot=Yt[$],lt=!0):C.samples>0&&_t.useMultisampledRTT(C)===!1?ot=ct.get(C).__webglMultisampledFramebuffer:Array.isArray(Yt)?ot=Yt[ft]:ot=Yt,M.copy(C.viewport),O.copy(C.scissor),tt=C.scissorTest}else M.copy(Lt).multiplyScalar(dt).floor(),O.copy(ce).multiplyScalar(dt).floor(),tt=$t;if(ft!==0&&(ot=ut),T.bindFramebuffer(Q.FRAMEBUFFER,ot)&&T.drawBuffers(C,ot),T.viewport(M),T.scissor(O),T.setScissorTest(tt),lt){const Pt=ct.get(C.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+$,Pt.__webglTexture,ft)}else if(Bt){const Pt=$;for(let jt=0;jt<C.textures.length;jt++){const Yt=ct.get(C.textures[jt]);Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0+jt,Yt.__webglTexture,ft,Pt)}}else if(C!==null&&ft!==0){const Pt=ct.get(C.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,Pt.__webglTexture,ft)}yt=-1},this.readRenderTargetPixels=function(C,$,ft,ot,lt,Bt,Xt,Pt=0){if(!(C&&C.isWebGLRenderTarget)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let jt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Xt!==void 0&&(jt=jt[Xt]),jt){T.bindFramebuffer(Q.FRAMEBUFFER,jt);try{const Yt=C.textures[Pt],ne=Yt.format,de=Yt.type;if(C.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+Pt),!I.textureFormatReadable(ne)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!I.textureTypeReadable(de)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=C.width-ot&&ft>=0&&ft<=C.height-lt&&Q.readPixels($,ft,ot,lt,Dt.convert(ne),Dt.convert(de),Bt)}finally{const Yt=it!==null?ct.get(it).__webglFramebuffer:null;T.bindFramebuffer(Q.FRAMEBUFFER,Yt)}}},this.readRenderTargetPixelsAsync=async function(C,$,ft,ot,lt,Bt,Xt,Pt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let jt=ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Xt!==void 0&&(jt=jt[Xt]),jt)if($>=0&&$<=C.width-ot&&ft>=0&&ft<=C.height-lt){T.bindFramebuffer(Q.FRAMEBUFFER,jt);const Yt=C.textures[Pt],ne=Yt.format,de=Yt.type;if(C.textures.length>1&&Q.readBuffer(Q.COLOR_ATTACHMENT0+Pt),!I.textureFormatReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!I.textureTypeReadable(de))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qt=Q.createBuffer();Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Qt),Q.bufferData(Q.PIXEL_PACK_BUFFER,Bt.byteLength,Q.STREAM_READ),Q.readPixels($,ft,ot,lt,Dt.convert(ne),Dt.convert(de),0);const De=it!==null?ct.get(it).__webglFramebuffer:null;T.bindFramebuffer(Q.FRAMEBUFFER,De);const rn=Q.fenceSync(Q.SYNC_GPU_COMMANDS_COMPLETE,0);return Q.flush(),await Ab(Q,rn,4),Q.bindBuffer(Q.PIXEL_PACK_BUFFER,Qt),Q.getBufferSubData(Q.PIXEL_PACK_BUFFER,0,Bt),Q.deleteBuffer(Qt),Q.deleteSync(rn),Bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,$=null,ft=0){const ot=Math.pow(2,-ft),lt=Math.floor(C.image.width*ot),Bt=Math.floor(C.image.height*ot),Xt=$!==null?$.x:0,Pt=$!==null?$.y:0;_t.setTexture2D(C,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,ft,0,0,Xt,Pt,lt,Bt),T.unbindTexture()},this.copyTextureToTexture=function(C,$,ft=null,ot=null,lt=0,Bt=0){let Xt,Pt,jt,Yt,ne,de,Qt,De,rn;const Je=C.isCompressedTexture?C.mipmaps[Bt]:C.image;if(ft!==null)Xt=ft.max.x-ft.min.x,Pt=ft.max.y-ft.min.y,jt=ft.isBox3?ft.max.z-ft.min.z:1,Yt=ft.min.x,ne=ft.min.y,de=ft.isBox3?ft.min.z:0;else{const on=Math.pow(2,-lt);Xt=Math.floor(Je.width*on),Pt=Math.floor(Je.height*on),C.isDataArrayTexture?jt=Je.depth:C.isData3DTexture?jt=Math.floor(Je.depth*on):jt=1,Yt=0,ne=0,de=0}ot!==null?(Qt=ot.x,De=ot.y,rn=ot.z):(Qt=0,De=0,rn=0);const Fe=Dt.convert($.format),He=Dt.convert($.type);let Vt;$.isData3DTexture?(_t.setTexture3D($,0),Vt=Q.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(_t.setTexture2DArray($,0),Vt=Q.TEXTURE_2D_ARRAY):(_t.setTexture2D($,0),Vt=Q.TEXTURE_2D),T.activeTexture(Q.TEXTURE0),T.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,$.flipY),T.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),T.pixelStorei(Q.UNPACK_ALIGNMENT,$.unpackAlignment);const zn=T.getParameter(Q.UNPACK_ROW_LENGTH),xe=T.getParameter(Q.UNPACK_IMAGE_HEIGHT),En=T.getParameter(Q.UNPACK_SKIP_PIXELS),oi=T.getParameter(Q.UNPACK_SKIP_ROWS),Di=T.getParameter(Q.UNPACK_SKIP_IMAGES);T.pixelStorei(Q.UNPACK_ROW_LENGTH,Je.width),T.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Je.height),T.pixelStorei(Q.UNPACK_SKIP_PIXELS,Yt),T.pixelStorei(Q.UNPACK_SKIP_ROWS,ne),T.pixelStorei(Q.UNPACK_SKIP_IMAGES,de);const li=C.isDataArrayTexture||C.isData3DTexture,Ge=$.isDataArrayTexture||$.isData3DTexture;if(C.isDepthTexture){const on=ct.get(C),Ui=ct.get($),Be=ct.get(on.__renderTarget),Xi=ct.get(Ui.__renderTarget);T.bindFramebuffer(Q.READ_FRAMEBUFFER,Be.__webglFramebuffer),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let ka=0;ka<jt;ka++)li&&(Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ct.get(C).__webglTexture,lt,de+ka),Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,ct.get($).__webglTexture,Bt,rn+ka)),Q.blitFramebuffer(Yt,ne,Xt,Pt,Qt,De,Xt,Pt,Q.DEPTH_BUFFER_BIT,Q.NEAREST);T.bindFramebuffer(Q.READ_FRAMEBUFFER,null),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else if(lt!==0||C.isRenderTargetTexture||ct.has(C)){const on=ct.get(C),Ui=ct.get($);T.bindFramebuffer(Q.READ_FRAMEBUFFER,gt),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,Z);for(let Be=0;Be<jt;Be++)li?Q.framebufferTextureLayer(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,on.__webglTexture,lt,de+Be):Q.framebufferTexture2D(Q.READ_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,on.__webglTexture,lt),Ge?Q.framebufferTextureLayer(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Ui.__webglTexture,Bt,rn+Be):Q.framebufferTexture2D(Q.DRAW_FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_2D,Ui.__webglTexture,Bt),lt!==0?Q.blitFramebuffer(Yt,ne,Xt,Pt,Qt,De,Xt,Pt,Q.COLOR_BUFFER_BIT,Q.NEAREST):Ge?Q.copyTexSubImage3D(Vt,Bt,Qt,De,rn+Be,Yt,ne,Xt,Pt):Q.copyTexSubImage2D(Vt,Bt,Qt,De,Yt,ne,Xt,Pt);T.bindFramebuffer(Q.READ_FRAMEBUFFER,null),T.bindFramebuffer(Q.DRAW_FRAMEBUFFER,null)}else Ge?C.isDataTexture||C.isData3DTexture?Q.texSubImage3D(Vt,Bt,Qt,De,rn,Xt,Pt,jt,Fe,He,Je.data):$.isCompressedArrayTexture?Q.compressedTexSubImage3D(Vt,Bt,Qt,De,rn,Xt,Pt,jt,Fe,Je.data):Q.texSubImage3D(Vt,Bt,Qt,De,rn,Xt,Pt,jt,Fe,He,Je):C.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,Bt,Qt,De,Xt,Pt,Fe,He,Je.data):C.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,Bt,Qt,De,Je.width,Je.height,Fe,Je.data):Q.texSubImage2D(Q.TEXTURE_2D,Bt,Qt,De,Xt,Pt,Fe,He,Je);T.pixelStorei(Q.UNPACK_ROW_LENGTH,zn),T.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,xe),T.pixelStorei(Q.UNPACK_SKIP_PIXELS,En),T.pixelStorei(Q.UNPACK_SKIP_ROWS,oi),T.pixelStorei(Q.UNPACK_SKIP_IMAGES,Di),Bt===0&&$.generateMipmaps&&Q.generateMipmap(Vt),T.unbindTexture()},this.initRenderTarget=function(C){ct.get(C).__webglFramebuffer===void 0&&_t.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?_t.setTextureCube(C,0):C.isData3DTexture?_t.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?_t.setTexture2DArray(C,0):_t.setTexture2D(C,0),T.unbindTexture()},this.resetState=function(){H=0,k=0,it=null,T.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ta}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Te._getDrawingBufferColorSpace(t),i.unpackColorSpace=Te._getUnpackColorSpace()}}const Gv={type:"change"},Ip={type:"start"},Ux={type:"end"},eu=new Mu,Vv=new Na,Dw=Math.cos(70*Rb.DEG2RAD),An=new Y,ni=2*Math.PI,Ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Md=1e-6;class Uw extends O1{constructor(t,i=null){super(t,i),this.state=Ke.NONE,this.target=new Y,this.cursor=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qr.ROTATE,MIDDLE:Qr.DOLLY,RIGHT:Qr.PAN},this.touches={ONE:Jr.ROTATE,TWO:Jr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Y,this._lastQuaternion=new Ms,this._lastTargetPosition=new Y,this._quat=new Ms().setFromUnitVectors(t.up,new Y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new mv,this._sphericalDelta=new mv,this._scale=1,this._panOffset=new Y,this._rotateStart=new qt,this._rotateEnd=new qt,this._rotateDelta=new qt,this._panStart=new qt,this._panEnd=new qt,this._panDelta=new qt,this._dollyStart=new qt,this._dollyEnd=new qt,this._dollyDelta=new qt,this._dollyDirection=new Y,this._mouse=new qt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ow.bind(this),this._onPointerDown=Lw.bind(this),this._onPointerUp=Pw.bind(this),this._onContextMenu=Vw.bind(this),this._onMouseWheel=zw.bind(this),this._onKeyDown=Fw.bind(this),this._onTouchStart=Hw.bind(this),this._onTouchMove=Gw.bind(this),this._onMouseDown=Iw.bind(this),this._onMouseMove=Bw.bind(this),this._interceptControlDown=kw.bind(this),this._interceptControlUp=Xw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gv),this.update(),this.state=Ke.NONE}pan(t,i){this._pan(t,i),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const i=this.object.position;An.copy(i).sub(this.target),An.applyQuaternion(this._quat),this._spherical.setFromVector3(An),this.autoRotate&&this.state===Ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(a)&&isFinite(l)&&(a<-Math.PI?a+=ni:a>Math.PI&&(a-=ni),l<-Math.PI?l+=ni:l>Math.PI&&(l-=ni),a<=l?this._spherical.theta=Math.max(a,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+l)/2?Math.max(a,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(An.setFromSpherical(this._spherical),An.applyQuaternion(this._quatInverse),i.copy(this.target).add(An),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const p=An.length();f=this._clampDistance(p*this._scale);const m=p-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const p=new Y(this._mouse.x,this._mouse.y,0);p.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const d=new Y(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(p),this.object.updateMatrixWorld(),f=An.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(eu.origin.copy(this.object.position),eu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(eu.direction))<Dw?this.object.lookAt(this.target):(Vv.setFromNormalAndCoplanarPoint(this.object.up,this.target),eu.intersectPlane(Vv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Md||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Md||this._lastTargetPosition.distanceToSquared(this.target)>Md?(this.dispatchEvent(Gv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ni/60*this.autoRotateSpeed*t:ni/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){An.setFromMatrixColumn(i,0),An.multiplyScalar(-t),this._panOffset.add(An)}_panUp(t,i){this.screenSpacePanning===!0?An.setFromMatrixColumn(i,1):(An.setFromMatrixColumn(i,0),An.crossVectors(this.object.up,An)),An.multiplyScalar(t),this._panOffset.add(An)}_pan(t,i){const a=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;An.copy(l).sub(this.target);let c=An.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/a.clientHeight,this.object.matrix),this._panUp(2*i*c/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),l=t-a.left,c=i-a.top,f=a.width,p=a.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/p)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/i.clientHeight),this._rotateUp(ni*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),a=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(a,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),a=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(a,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),a=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(a*a+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),l=.5*(t.pageX+a.x),c=.5*(t.pageY+a.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/i.clientHeight),this._rotateUp(ni*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),a=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(a,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),a=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(a*a+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+i.x)*.5,p=(t.pageY+i.y)*.5;this._updateZoomParameters(f,p)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new qt,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,a={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function Lw(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Ow(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Pw(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ux),this.state=Ke.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function Iw(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Qr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Ke.DOLLY;break;case Qr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ke.ROTATE}break;case Qr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Ke.PAN}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(Ip)}function Bw(r){switch(this.state){case Ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function zw(r){this.enabled===!1||this.enableZoom===!1||this.state!==Ke.NONE||(r.preventDefault(),this.dispatchEvent(Ip),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Ux))}function Fw(r){this.enabled!==!1&&this._handleKeyDown(r)}function Hw(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Jr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Ke.TOUCH_ROTATE;break;case Jr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Ke.TOUCH_PAN;break;default:this.state=Ke.NONE}break;case 2:switch(this.touches.TWO){case Jr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Ke.TOUCH_DOLLY_PAN;break;case Jr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Ke.TOUCH_DOLLY_ROTATE;break;default:this.state=Ke.NONE}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(Ip)}function Gw(r){switch(this._trackPointer(r),this.state){case Ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Ke.NONE}}function Vw(r){this.enabled!==!1&&r.preventDefault()}function kw(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Xw(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Da=30,dl=.32;function Hi(r){return(r-(Da+1)/2)*dl}function Qi(r){switch(r){case"A":return-1.2;case"B":return-.92;case"C":return-.64;case"D":return-.36;case"E":return-.12;case"F":return .12;case"G":return .36;case"H":return .64;case"I":return .92;case"J":return 1.2;default:return 0}}function $s(r){switch(r){case"TOP_POS":return-1.9;case"TOP_NEG":return-1.6;case"BOTTOM_POS":return 1.6;case"BOTTOM_NEG":return 1.9}}function za(r){if(r==="supply_VCC")return new Y(-6.9,.6,-1);if(r==="supply_GND")return new Y(-6.9,1,-1);if(r.startsWith("rail_")){const t=r.split("_"),i=`${t[1]}_${t[2]}`,a=parseInt(t[3],10)||1;return new Y(Hi(a),.36,$s(i))}if(r.startsWith("terminal_")){const t=r.split("_"),i=parseInt(t[1],10)||1,a=t[2]||"A";return new Y(Hi(i),.36,Qi(a))}return new Y(0,.36,0)}function Ww(r){let t="",i=1/0;const a=Math.hypot(r.x- -6.9,r.z- -1);a<i&&(i=a,t="supply_VCC");const l=Math.hypot(r.x- -6.9,r.z- -1);l<i&&(i=l,t="supply_GND");for(let c=1;c<=Da;c++){const f=Hi(c);["A","B","C","D","E","F","G","H","I","J"].forEach(p=>{const m=Qi(p),d=Math.hypot(r.x-f,r.z-m);d<i&&(i=d,t=`terminal_${c}_${p}`)})}for(let c=1;c<=Da;c++){const f=Hi(c);["TOP_POS","TOP_NEG","BOTTOM_POS","BOTTOM_NEG"].forEach(p=>{const m=$s(p),d=Math.hypot(r.x-f,r.z-m);d<i&&(i=d,t=`rail_${p}_${c}`)})}return i>.55?null:{holeKey:t,distance:i}}class Yw{constructor(){this.holeMeshMap=new Map,this.holeHitBoxes=[],this.group=new xi,this.buildBreadboard()}buildBreadboard(){const t=Da*dl+.8,i=4.6,a=.35,l=new en({color:16052714,roughness:.3,metalness:.05}),c=new gn(t,a,i),f=new ae(c,l);f.position.y=a/2,f.receiveShadow=!0,f.castShadow=!0,this.group.add(f);const p=new en({color:14078148,roughness:.6}),m=new ae(new gn(t,.1,.2),p);m.position.set(0,a+.01,0),this.group.add(m);const d=new Vi({color:15680580}),g=new Vi({color:3900150}),_=new ae(new gn(t-.4,.01,.04),d);_.position.set(0,a+.005,$s("TOP_POS")-.15),this.group.add(_);const v=new ae(new gn(t-.4,.01,.04),g);v.position.set(0,a+.005,$s("TOP_NEG")+.15),this.group.add(v);const b=new ae(new gn(t-.4,.01,.04),d);b.position.set(0,a+.005,$s("BOTTOM_POS")-.15),this.group.add(b);const E=new ae(new gn(t-.4,.01,.04),g);E.position.set(0,a+.005,$s("BOTTOM_NEG")+.15),this.group.add(E);const w=document.createElement("canvas");w.width=1024,w.height=512;const x=w.getContext("2d");if(x){x.clearRect(0,0,1024,512),x.fillStyle="#475569",x.font="bold 18px monospace",x.textAlign="center",x.textBaseline="middle";const W=Z=>(Z/t+.5)*1024,V=Z=>(Z/i+.5)*512;for(let Z=1;Z<=Da;Z++)if(Z===1||Z%5===0){const H=W(Hi(Z));x.fillText(Z.toString(),H,V(Qi("A")-.28)),x.fillText(Z.toString(),H,V(Qi("J")+.28)),x.fillText(Z.toString(),H,V(Qi("E")-.16)),x.fillText(Z.toString(),H,V(Qi("F")+.16))}const q=["A","B","C","D","E","F","G","H","I","J"],ut=W(Hi(1)-.4),gt=W(Hi(Da)+.4);q.forEach(Z=>{const H=V(Qi(Z));x.fillText(Z,ut,H),x.fillText(Z,gt,H)})}const y=new bu(w);y.anisotropy=4;const z=new Vi({map:y,transparent:!0,depthWrite:!1}),F=new Ts(t,i),N=new ae(F,z);N.rotation.x=-Math.PI/2,N.position.set(0,a+.006,0),this.group.add(N);const P=new Ni(.06,.06,.02,12),U=new en({color:1976635,roughness:.8,metalness:.2}),B=(W,V,q)=>{const ut=new ae(P,U.clone());ut.position.set(V,a+.002,q),ut.userData={holeKey:W},this.group.add(ut),this.holeMeshMap.set(W,ut),this.holeHitBoxes.push(ut)},A=["A","B","C","D","E","F","G","H","I","J"];for(let W=1;W<=Da;W++){const V=Hi(W);A.forEach(q=>{const ut=Qi(q);B(`terminal_${W}_${q}`,V,ut)})}const L=["TOP_POS","TOP_NEG","BOTTOM_POS","BOTTOM_NEG"];for(let W=1;W<=Da;W++){const V=Hi(W);L.forEach(q=>{const ut=$s(q);B(`rail_${q}_${W}`,V,ut)})}}highlightHole(t,i=3718648){if(!t){this.holeMeshMap.forEach(c=>{c.material.color.setHex(1976635),c.scale.set(1,1,1)});return}const a=[];if(t.startsWith("rail_")){const c=t.split("_"),f=`rail_${c[1]}_${c[2]}_`;for(let p=1;p<=Da;p++)a.push(f+p)}else if(t.startsWith("terminal_")){const c=t.split("_"),f=c[1],p=c[2];(["A","B","C","D","E"].includes(p)?["A","B","C","D","E"]:["F","G","H","I","J"]).forEach(d=>{a.push(`terminal_${f}_${d}`)})}const l=new Set(a);this.holeMeshMap.forEach((c,f)=>{f===t?(c.material.color.setHex(i),c.scale.set(1.4,1.4,1.4)):l.has(f)?(c.material.color.setHex(1981066),c.scale.set(1.2,1.2,1.2)):(c.material.color.setHex(1976635),c.scale.set(1,1,1))})}highlightNetNodes(t,i=16096779){const a=new Set(t);this.holeMeshMap.forEach((l,c)=>{a.has(c)&&(l.material.color.setHex(i),l.scale.set(1.3,1.3,1.3))})}}class kv{constructor(t){this.icData=t,this.group=new xi,this.group.userData={type:"IC",icId:t.id,icType:t.type},this.buildIC(),this.updatePosition()}buildIC(){const t=uu[this.icData.type],i=7,a=i*dl,l=.52,c=.26,f=new en({color:1315863,roughness:.35,metalness:.15}),p=new gn(a-.04,c,l),m=new ae(p,f);m.position.y=.35+.18+c/2,m.castShadow=!0,m.receiveShadow=!0,this.group.add(m);const d=new Ni(.06,.06,c+.01,16,1,!1,Math.PI/2,Math.PI),g=new en({color:657932,roughness:.5}),_=new ae(d,g);_.position.set(-a/2+.02,.35+.18+c/2,0),this.group.add(_);const v=new Np(.035,16),b=new Vi({color:14870768}),E=new ae(v,b);E.rotation.x=-Math.PI/2,E.position.set(-a/2+.18,.35+.18+c+.002,-l/2+.12),this.group.add(E);const w=document.createElement("canvas");w.width=512,w.height=128;const x=w.getContext("2d");x&&(x.fillStyle="#141417",x.fillRect(0,0,512,128),x.fillStyle="#d4d4d8",x.font='bold 44px "Courier New", monospace',x.textAlign="center",x.textBaseline="middle",x.fillText(`SN74HC${this.icData.type}N`,256,44),x.font='22px "Courier New", monospace',x.fillStyle="#a1a1aa",x.fillText(t?t.fullName:"LOGIC IC",256,88));const y=new bu(w);y.anisotropy=4;const z=new en({map:y,roughness:.3,metalness:.2}),F=new ae(new Ts((a-.1)*.9,l*.75),z);F.rotation.x=-Math.PI/2,F.position.set(.02,.35+.18+c+.001,0),this.group.add(F);const N=new en({color:14870768,metalness:.92,roughness:.18}),P=Qi("E"),U=Qi("F");for(let B=0;B<i;B++){const A=-a/2+B*dl+dl/2;this.createLeg(A,-l/2,P,N),this.createLeg(A,l/2,U,N)}}createLeg(t,i,a,l){const c=new xi,f=.62,p=.22,m=Math.abs(a-i)+.02,d=new gn(.08,.03,m),g=new ae(d,l);g.position.set(t,f,(i+a)/2),c.add(g);const _=f-p,v=new gn(.05,_,.025),b=new ae(v,l);b.position.set(t,f-_/2,a),c.add(b);const E=new Dp(.025,.06,4),w=new ae(E,l);w.rotation.x=Math.PI,w.position.set(t,p-.03,a),c.add(w),this.group.add(c)}updatePosition(){const t=Hi(this.icData.startCol),i=Hi(this.icData.startCol+6),a=(t+i)/2;this.group.position.set(a,0,0)}}const qw={red:15680580,black:1579035,yellow:15381256,green:2278750,blue:3900150,white:16317180,orange:16347926,purple:11032055};class jw{constructor(t){this.wireData=t,this.group=new xi,this.group.userData={type:"WIRE",wireId:t.id},this.buildWire()}buildWire(){for(;this.group.children.length>0;)this.group.remove(this.group.children[0]);const t=za(this.wireData.fromHoleKey),i=za(this.wireData.toHoleKey),a=t.distanceTo(i),l=Math.min(2.5,Math.max(.4,a*.35));(t.x+i.x)/2,(t.z+i.z)/2;const c=new Y(t.x,t.y+l,t.z),f=new Y(i.x,i.y+l,i.z),p=new Lp(t,c,f,i),m=new xl(p,32,.04,8,!1),d=qw[this.wireData.color]||15680580,g=new en({color:d,roughness:.3,metalness:.1}),_=new ae(m,g);_.castShadow=!0,this.group.add(_);const v=new Ni(.045,.045,.25,8),b=new en({color:13948120,metalness:.9,roughness:.2}),E=new ae(v,b);E.position.set(t.x,t.y-.08,t.z),this.group.add(E);const w=new ae(v,b);w.position.set(i.x,i.y-.08,i.z),this.group.add(w)}}class Zw{constructor(t){this.switchData=t,this.group=new xi,this.group.userData={type:"SWITCH",switchId:t.id},this.buildSwitch(),this.updateState()}buildSwitch(){const t=za(this.switchData.outputHoleKey),i=new en({color:4144966,roughness:.5}),a=new ae(new gn(.45,.35,.45),i);a.position.set(t.x,.52,t.z),a.castShadow=!0,this.group.add(a);const l=new en({color:15000807,metalness:.9,roughness:.2});this.leverMesh=new ae(new Ni(.04,.05,.4,12),l),this.leverMesh.position.set(t.x,.8,t.z),this.group.add(this.leverMesh),this.statusLedMesh=new ae(new Eu(.06,12,12),new Vi({color:15680580})),this.statusLedMesh.position.set(t.x+.12,.71,t.z),this.group.add(this.statusLedMesh)}updateState(){za(this.switchData.outputHoleKey);const t=this.switchData.state==="HIGH";this.leverMesh.rotation.z=t?-.4:.4,this.statusLedMesh.material.color.setHex(t?2278750:15680580),this.group.position.set(0,0,0)}}const nu={red:{off:10033947,on:15680580,light:16711680},green:{off:1467700,on:2278750,light:65280},yellow:{off:8736014,on:15381256,light:16776960},blue:{off:1982639,on:3900150,light:255}};class Kw{constructor(t){this.ledData=t,this.group=new xi,this.group.userData={type:"LED",ledId:t.id},this.buildLED(),this.updateState()}buildLED(){const t=za(this.ledData.anodeHoleKey),i=za(this.ledData.cathodeHoleKey),a=new Y((t.x+i.x)/2,.8,(t.z+i.z)/2),l=new Ni(.18,.18,.35,16),c=new Eu(.18,16,16,0,Math.PI*2,0,Math.PI/2),f=nu[this.ledData.color]||nu.red;this.bulbMaterial=new y1({color:f.off,emissive:f.off,emissiveIntensity:.1,roughness:.1,transmission:.6,transparent:!0,opacity:.9});const p=new ae(l,this.bulbMaterial);p.position.set(a.x,a.y,a.z);const m=new ae(c,this.bulbMaterial);m.position.set(a.x,a.y+.175,a.z),this.group.add(p),this.group.add(m),this.lightSource=new w1(f.light,0,3),this.lightSource.position.set(a.x,a.y+.1,a.z),this.group.add(this.lightSource);const d=new en({color:13948120,metalness:.9,roughness:.2}),g=_=>{const v=new yx(new Y(_.x,_.y,_.z),new Y(a.x,a.y-.175,a.z)),b=new ae(new xl(v,8,.02,6,!1),d);this.group.add(b)};g(t),g(i)}updateState(){const t=nu[this.ledData.color]||nu.red;this.ledData.isOn?(this.bulbMaterial.color.setHex(t.on),this.bulbMaterial.emissive.setHex(t.on),this.bulbMaterial.emissiveIntensity=2.5,this.lightSource.intensity=3):(this.bulbMaterial.color.setHex(t.off),this.bulbMaterial.emissive.setHex(t.off),this.bulbMaterial.emissiveIntensity=.1,this.lightSource.intensity=0)}}class Jw{constructor(t){this.resistorData=t,this.group=new xi,this.group.userData={type:"RESISTOR",resistorId:t.id},this.buildResistor()}buildResistor(){const t=za(this.resistorData.fromHoleKey),i=za(this.resistorData.toHoleKey),a=new Y().addVectors(t,i).multiplyScalar(.5);a.y=.6;const l=new en({color:15381256,roughness:.4}),c=new Ni(.12,.12,.45,12),f=new ae(c,l);f.rotation.z=Math.PI/2,f.position.copy(a),f.castShadow=!0,this.group.add(f);const p=new Vi({color:16347926}),m=new Vi({color:7877903}),d=new en({color:15381256,metalness:.8}),g=new Ni(.125,.125,.04,12),_=new ae(g,p);_.rotation.z=Math.PI/2,_.position.set(a.x-.12,a.y,a.z),this.group.add(_);const v=new ae(g,p);v.rotation.z=Math.PI/2,v.position.set(a.x-.04,a.y,a.z),this.group.add(v);const b=new ae(g,m);b.rotation.z=Math.PI/2,b.position.set(a.x+.04,a.y,a.z),this.group.add(b);const E=new ae(g,d);E.rotation.z=Math.PI/2,E.position.set(a.x+.12,a.y,a.z),this.group.add(E);const w=new en({color:13948120,metalness:.9,roughness:.2}),x=(y,z)=>{const F=new Lp(y,new Y(y.x,a.y,y.z),new Y(z.x,a.y,z.z),z),N=new ae(new xl(F,8,.02,6,!1),w);this.group.add(N)};x(t,new Y(a.x-.22,a.y,a.z)),x(i,new Y(a.x+.22,a.y,a.z))}}class Qw{constructor(t=!0){this.isOn=t,this.displayCtx=null,this.group=new xi,this.group.position.set(-7.5,0,-2.2),this.buildPowerSupply(),this.updateState()}buildPowerSupply(){const t=new gn(2.4,1.8,2.2),i=new en({color:1579035,metalness:.8,roughness:.3}),a=new ae(t,i);a.position.y=.9,a.castShadow=!0,this.group.add(a);const l=new gn(2.3,1.7,.05),c=new en({color:2565930,metalness:.5,roughness:.4}),f=new ae(l,c);f.position.set(0,.9,1.12),this.group.add(f);const p=document.createElement("canvas");p.width=256,p.height=128,this.displayCtx=p.getContext("2d"),this.displayCtx&&(this.displayCtx.fillStyle="#09090b",this.displayCtx.fillRect(0,0,256,128),this.displayCtx.fillStyle="#22c55e",this.displayCtx.font="bold 44px monospace",this.displayCtx.fillText("5.00 V",20,60),this.displayCtx.fillStyle="#38bdf8",this.displayCtx.font="24px monospace",this.displayCtx.fillText("0.25 A  [DC]",20,105)),this.displayTex=new bu(p),this.displayMesh=new ae(new Ts(1.2,.6),new Vi({map:this.displayTex})),this.displayMesh.position.set(-.4,1.2,1.15),this.group.add(this.displayMesh);const m=new Ni(.1,.1,.25,12),d=new en({color:15680580,metalness:.6});this.redPostMesh=new ae(m,d),this.redPostMesh.rotation.x=Math.PI/2,this.redPostMesh.position.set(.6,.6,1.2),this.group.add(this.redPostMesh);const g=new en({color:592139,metalness:.6});this.blackPostMesh=new ae(m,g),this.blackPostMesh.rotation.x=Math.PI/2,this.blackPostMesh.position.set(.6,1,1.2),this.group.add(this.blackPostMesh);const _=new en({color:15680580});this.powerBtnMesh=new ae(new gn(.25,.35,.1),_),this.powerBtnMesh.position.set(-.8,.5,1.15),this.group.add(this.powerBtnMesh)}updateState(){this.powerBtnMesh.material.color.setHex(this.isOn?2278750:15680580)}updateDisplayVoltage(t){if(!this.displayCtx)return;this.displayCtx.fillStyle="#09090b",this.displayCtx.fillRect(0,0,256,128),this.displayCtx.fillStyle="#22c55e",this.displayCtx.font="bold 44px monospace",this.displayCtx.fillText(`${t.toFixed(2)} V`,20,60),this.displayCtx.fillStyle="#38bdf8",this.displayCtx.font="24px monospace";const i=this.isOn?t*.05:0;this.displayCtx.fillText(`${i.toFixed(2)} A  [DC]`,20,105),this.displayTex.needsUpdate=!0}highlightPost(t){this.redPostMesh.material.emissive.setHex(t==="VCC"?4460817:0),this.blackPostMesh.material.emissive.setHex(t==="GND"?2236962:0)}}class $w{constructor(){this.group=new xi,this.group.position.set(7.5,0,-2.2),this.buildMultimeter()}buildMultimeter(){const t=new gn(1.8,2.4,.7),i=new en({color:16436245,roughness:.4}),a=new ae(t,i);a.position.y=.35,a.rotation.x=-.3,a.castShadow=!0,this.group.add(a);const l=new en({color:1579035,roughness:.5}),c=new ae(new gn(1.6,2.2,.05),l);c.position.set(0,.37,.33),c.rotation.x=-.3,this.group.add(c);const f=document.createElement("canvas");f.width=256,f.height=128,this.canvasCtx=f.getContext("2d"),this.canvasCtx&&(this.canvasCtx.fillStyle="#84cc16",this.canvasCtx.fillRect(0,0,256,128),this.canvasCtx.fillStyle="#0f172a",this.canvasCtx.font="bold 36px monospace",this.canvasCtx.fillText("0.00 V",20,70)),this.canvasTex=new bu(f),this.displayMesh=new ae(new Ts(1.3,.65),new Vi({map:this.canvasTex})),this.displayMesh.position.set(0,.8,.36),this.displayMesh.rotation.x=-.3,this.group.add(this.displayMesh);const p=new en({color:4144966,roughness:.3}),m=new ae(new Ni(.25,.25,.15,16),p);m.position.set(0,.1,.38),m.rotation.x=-.3+Math.PI/2,this.group.add(m)}updateDisplay(t,i="DC VOLTS"){this.canvasCtx&&(this.canvasCtx.fillStyle="#84cc16",this.canvasCtx.fillRect(0,0,256,128),this.canvasCtx.fillStyle="#0f172a",this.canvasCtx.font="bold 32px monospace",this.canvasCtx.fillText(t,15,60),this.canvasCtx.font="18px sans-serif",this.canvasCtx.fillText(i,15,105),this.canvasTex.needsUpdate=!0)}}class tC{constructor(t){this.icMeshMap=new Map,this.wireMeshMap=new Map,this.switchMeshMap=new Map,this.ledMeshMap=new Map,this.resistorMeshMap=new Map,this.tempWireMesh=null,this.activeWireStartHole=null,this.selectedWireColor="red",this.hoveredHoleKey=null,this.selectedElement=null,this.raycaster=new L1,this.mouse=new qt,this.resizeObserver=null,this.placingICType=null,this.tempICMesh=null,this.isDraggingIC=!1,this.draggedICId=null,this.onResize=()=>{if(!this.container)return;const a=this.container.clientWidth,l=this.container.clientHeight;this.camera.aspect=a/l,this.camera.updateProjectionMatrix(),this.renderer.setSize(a,l)},this.onPointerDown=a=>{const l=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(a.clientX-l.left)/l.width*2-1,this.mouse.y=-((a.clientY-l.top)/l.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const c=this.raycaster.intersectObjects(this.scene.children,!0);for(const f of c){let p=f.object;for(;p&&p!==this.scene;){if(p.userData&&p.userData.type==="IC"&&p.userData.icId){this.isDraggingIC=!0,this.draggedICId=p.userData.icId,this.controls.enabled=!1;return}p=p.parent}}},this.onPointerUp=()=>{this.isDraggingIC&&(this.isDraggingIC=!1,this.draggedICId=null,this.controls.enabled=!0)},this.onPointerMove=a=>{const l=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(a.clientX-l.left)/l.width*2-1,this.mouse.y=-((a.clientY-l.top)/l.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const c=new Na(new Y(0,1,0),-.36),f=new Y;if(this.raycaster.ray.intersectPlane(c,f),f){if(this.isDraggingIC&&this.draggedICId){const _=Math.max(1,Math.min(23,Math.round(f.x/.32+15.5)));this.onICPositionChange&&this.onICPositionChange(this.draggedICId,_);return}const p=Ww(f),m=p?p.holeKey:null;if(m!==this.hoveredHoleKey&&(this.hoveredHoleKey=m,this.breadboard3D.highlightHole(this.hoveredHoleKey),this.powerSupply3D.highlightPost(m==="supply_VCC"?"VCC":m==="supply_GND"?"GND":null)),this.placingICType){let d=10;if(m){const _=m.split("_");_[0]==="terminal"?d=parseInt(_[1],10):_[0]==="rail"&&(d=parseInt(_[3],10))}const g=Math.max(1,Math.min(23,d-3));this.tempICMesh?(this.tempICMesh.icData.startCol=g,this.tempICMesh.updatePosition()):(this.tempICMesh=new kv({id:"temp_ic_placing",type:this.placingICType,startCol:g}),this.tempICMesh.group.traverse(_=>{_ instanceof ae&&(_.material=_.material.clone(),_.material.transparent=!0,_.material.opacity=.55)}),this.scene.add(this.tempICMesh.group))}else this.clearTempIC();if(this.activeWireStartHole){const d=za(this.activeWireStartHole),g=f;this.tempWireMesh&&this.scene.remove(this.tempWireMesh);const _=[d,g],v=new qn().setFromPoints(_),b=new b1({color:3718648,dashSize:.1,gapSize:.05});this.tempWireMesh=new $b(v,b),this.tempWireMesh.computeLineDistances(),this.scene.add(this.tempWireMesh)}}},this.onPointerClick=a=>{if(this.placingICType){if(this.hoveredHoleKey){let f=10;const p=this.hoveredHoleKey.split("_");p[0]==="terminal"?f=parseInt(p[1],10):p[0]==="rail"&&(f=parseInt(p[3],10));const m=Math.max(1,Math.min(23,f-3));this.onICPlaced&&this.onICPlaced(this.placingICType,m)}return}this.raycaster.setFromCamera(this.mouse,this.camera);const l=this.raycaster.intersectObjects(this.scene.children,!0);let c=null;for(const f of l){let p=f.object;for(;p&&p!==this.scene;){if(p.userData&&p.userData.type){p.userData.type==="IC"&&(c={type:"IC",id:p.userData.icId}),p.userData.type==="SWITCH"&&(c={type:"SWITCH",id:p.userData.switchId}),p.userData.type==="LED"&&(c={type:"LED",id:p.userData.ledId}),p.userData.type==="WIRE"&&(c={type:"WIRE",id:p.userData.wireId}),p.userData.type==="RESISTOR"&&(c={type:"RESISTOR",id:p.userData.resistorId});break}p=p.parent}if(c)break}if(c){this.updateSelectionVisuals(c),this.onElementSelect&&this.onElementSelect(this.selectedElement);return}if(this.hoveredHoleKey){this.updateSelectionVisuals(null),this.onHoleClick&&this.onHoleClick(this.hoveredHoleKey);return}this.updateSelectionVisuals(null),this.onElementSelect&&this.onElementSelect(null)},this.animate=()=>{this.controls.update(),this.renderer.render(this.scene,this.camera)},this.container=t,this.scene=new kb,this.scene.background=new ve(658190),this.scene.fog=new Cp(658190,.02);const i=t.clientWidth/t.clientHeight;this.camera=new ii(45,i,.1,100),this.camera.position.set(0,8,9),this.renderer=new Nw({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Zv,this.renderer.toneMapping=_p,t.appendChild(this.renderer.domElement),this.controls=new Uw(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.maxPolarAngle=Math.PI/2-.05,this.controls.minDistance=3,this.controls.maxDistance=25,this.controls.target.set(0,.4,0),this.setupLighting(),this.setupWorkbench(),this.addEventListeners(),this.renderer.setAnimationLoop(this.animate)}setupLighting(){const t=new N1(16777215,.9);this.scene.add(t);const i=new T1(16777215,2.5);i.position.set(0,15,5),i.angle=Math.PI/4,i.penumbra=.5,i.castShadow=!0,i.shadow.mapSize.width=2048,i.shadow.mapSize.height=2048,this.scene.add(i);const a=new R1(3718648,.8);a.position.set(-10,8,-10),this.scene.add(a)}setupWorkbench(){const t=new gn(22,.8,14),i=new en({color:1976635,roughness:.6,metalness:.2}),a=new ae(t,i);a.position.y=-.4,a.receiveShadow=!0,this.scene.add(a),this.breadboard3D=new Yw,this.scene.add(this.breadboard3D.group),this.powerSupply3D=new Qw,this.scene.add(this.powerSupply3D.group),this.multimeter3D=new $w,this.scene.add(this.multimeter3D.group)}addEventListeners(){window.addEventListener("resize",this.onResize),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>{this.onResize()}),this.resizeObserver.observe(this.container)),this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown),this.renderer.domElement.addEventListener("pointermove",this.onPointerMove),this.renderer.domElement.addEventListener("pointerup",this.onPointerUp),this.renderer.domElement.addEventListener("click",this.onPointerClick)}cancelWireCreation(){this.activeWireStartHole=null,this.tempWireMesh&&(this.scene.remove(this.tempWireMesh),this.tempWireMesh=null)}syncCircuitState(t,i,a){const l=new Set(t.ics.map(d=>d.id));this.icMeshMap.forEach((d,g)=>{l.has(g)||(this.scene.remove(d.group),this.icMeshMap.delete(g))}),t.ics.forEach(d=>{let g=this.icMeshMap.get(d.id);g?(g.icData=d,g.updatePosition()):(g=new kv(d),this.scene.add(g.group),this.icMeshMap.set(d.id,g))});const c=new Set(t.wires.map(d=>d.id));this.wireMeshMap.forEach((d,g)=>{c.has(g)||(this.scene.remove(d.group),this.wireMeshMap.delete(g))}),t.wires.forEach(d=>{let g=this.wireMeshMap.get(d.id);g?(g.wireData.color!==d.color||g.wireData.fromHoleKey!==d.fromHoleKey||g.wireData.toHoleKey!==d.toHoleKey)&&(g.wireData=d,g.buildWire()):(g=new jw(d),this.scene.add(g.group),this.wireMeshMap.set(d.id,g))});const f=new Set(t.switches.map(d=>d.id));this.switchMeshMap.forEach((d,g)=>{f.has(g)||(this.scene.remove(d.group),this.switchMeshMap.delete(g))}),t.switches.forEach(d=>{let g=this.switchMeshMap.get(d.id);g?(g.switchData=d,g.updateState()):(g=new Zw(d),this.scene.add(g.group),this.switchMeshMap.set(d.id,g))});const p=new Set(t.leds.map(d=>d.id));this.ledMeshMap.forEach((d,g)=>{p.has(g)||(this.scene.remove(d.group),this.ledMeshMap.delete(g))}),t.leds.forEach(d=>{var b;let g=this.ledMeshMap.get(d.id);const _=((b=i==null?void 0:i.ledStates[d.id])==null?void 0:b.isOn)||!1,v={...d,isOn:_};g?(g.ledData=v,g.updateState()):(g=new Kw(v),this.scene.add(g.group),this.ledMeshMap.set(d.id,g))});const m=new Set(t.resistors.map(d=>d.id));if(this.resistorMeshMap.forEach((d,g)=>{m.has(g)||(this.scene.remove(d.group),this.resistorMeshMap.delete(g))}),t.resistors.forEach(d=>{let g=this.resistorMeshMap.get(d.id);g||(g=new Jw(d),this.scene.add(g.group),this.resistorMeshMap.set(d.id,g))}),this.powerSupply3D.isOn=t.powerSupplyOn,this.powerSupply3D.updateState(),this.powerSupply3D.updateDisplayVoltage(t.powerSupplyVoltage!==void 0?t.powerSupplyVoltage:5),a&&i)if(a.redHoleKey){const d=i.netVoltages[a.redHoleKey],g=i.netStates[a.redHoleKey];if(a.mode==="VOLTAGE"){const _=isNaN(d)?"OL / Float":`${d.toFixed(2)} V`;this.multimeter3D.updateDisplay(_,"DC VOLTAGE")}else if(a.mode==="LOGIC")this.multimeter3D.updateDisplay(`LOGIC: ${g||"FLOAT"}`,"LOGIC PROBE");else if(a.mode==="CONTINUITY"&&a.blackHoleKey){const _=i.netStates[a.redHoleKey]===i.netStates[a.blackHoleKey];this.multimeter3D.updateDisplay(_?"BEEP! 0.0 Ω":"OPEN CIRCUIT","CONTINUITY")}}else this.multimeter3D.updateDisplay("0.00 V","DC VOLTS")}destroy(){window.removeEventListener("resize",this.onResize),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),this.renderer.domElement.removeEventListener("pointermove",this.onPointerMove),this.renderer.domElement.removeEventListener("pointerup",this.onPointerUp),this.renderer.domElement.removeEventListener("click",this.onPointerClick),this.renderer.dispose()}setPlacingIC(t){this.placingICType=t,t||this.clearTempIC()}clearTempIC(){this.tempICMesh&&(this.scene.remove(this.tempICMesh.group),this.tempICMesh=null)}updateSelectionVisuals(t){this.selectedElement=t;const i=(a,l)=>{a.traverse(c=>{if(c instanceof ae&&c.material){const f=c.material;l?(f.userData.origEmissive===void 0&&(f.userData.origEmissive=f.emissive?f.emissive.getHex():0),f.emissive&&f.emissive.setHex(22015)):f.userData.origEmissive!==void 0&&f.emissive&&f.emissive.setHex(f.userData.origEmissive)}})};this.icMeshMap.forEach((a,l)=>{i(a.group,!!(t&&t.type==="IC"&&t.id===l))}),this.wireMeshMap.forEach((a,l)=>{i(a.group,!!(t&&t.type==="WIRE"&&t.id===l))}),this.switchMeshMap.forEach((a,l)=>{i(a.group,!!(t&&t.type==="SWITCH"&&t.id===l))}),this.ledMeshMap.forEach((a,l)=>{i(a.group,!!(t&&t.type==="LED"&&t.id===l))}),this.resistorMeshMap.forEach((a,l)=>{i(a.group,!!(t&&t.type==="RESISTOR"&&t.id===l))})}}function Vn(r){if(r.startsWith("rail_")){const t=r.split("_");return`net_rail_${t[1]}_${t[2]}`}if(r.startsWith("terminal_")){const t=r.split("_"),i=t[1],a=t[2];return["A","B","C","D","E"].includes(a)?`net_top_${i}`:`net_bottom_${i}`}return`net_custom_${r}`}function Ks(r,t){return t>=1&&t<=7?`terminal_${r.startCol+(t-1)}_E`:t>=8&&t<=14?`terminal_${r.startCol+(14-t)}_F`:""}class eC{static simulate(t){const i=[],a={},l=t.powerSupplyVoltage!==void 0?t.powerSupplyVoltage:5,c={},f={},p={},m={};function d(E){return m[E]||(m[E]=E),m[E]===E?E:(m[E]=d(m[E]),m[E])}function g(E,w){const x=d(E),y=d(w);x!==y&&(m[x]=y)}t.powerSupplyOn&&(g("net_custom_supply_VCC","net_supply_vcc"),g("net_custom_supply_GND","net_supply_gnd")),t.wires.forEach(E=>{const w=Vn(E.fromHoleKey),x=Vn(E.toHoleKey);g(w,x)}),t.resistors.forEach(E=>{const w=Vn(E.fromHoleKey),x=Vn(E.toHoleKey);g(w,x)});const _={};function v(E,w){const x=Vn(E),y=d(x);_[y]||(_[y]=new Set),_[y].add(w)}if(t.powerSupplyOn){const E=d("net_supply_vcc"),w=d("net_supply_gnd");if(_[E]||(_[E]=new Set),_[E].add("HIGH"),_[w]||(_[w]=new Set),_[w].add("LOW"),E===w)return i.push({id:"short_circuit",severity:"error",title:"SHORT CIRCUIT DETECTED!",message:"+5V Power Supply is connected directly to Ground! Turn off power or check wiring."}),{netStates:{},netVoltages:{},diagnostics:i,isShortCircuit:!0,icPowerStatus:{},ledStates:{}}}t.switches.forEach(E=>{v(E.outputHoleKey,E.state)});for(let E=0;E<5;E++)t.ics.forEach(w=>{const x=uu[w.type];if(!x)return;const y=Ks(w,x.vccPin),z=Ks(w,x.gndPin),F=d(Vn(y)),N=d(Vn(z)),P=_[F],U=_[N],B=!!(P&&P.has("HIGH")),A=!!(U&&U.has("LOW")),L=B&&A;if(f[w.id]={powered:L,vccOk:B,gndOk:A},!L&&E===0){let W=`${x.name} is not powered. `;B||(W+=`Pin ${x.vccPin} (VCC) needs +5V. `),A||(W+=`Pin ${x.gndPin} (GND) needs Ground.`),i.push({id:`ic_unpowered_${w.id}`,severity:"warning",title:`${x.name} Unpowered`,message:W,componentId:w.id})}if(L){const W=w.type==="7404"?6:4;for(let V=1;V<=W;V++)if(w.type==="7404"){const q=V*2-1,ut=V*2,gt=Ks(w,q),Z=Ks(w,ut),H=d(Vn(gt)),k=_[H];let it="FLOATING";k&&k.has("HIGH")?it="HIGH":k&&k.has("LOW")&&(it="LOW");const yt=x.logicFunction({A:it});yt!=="FLOATING"&&v(Z,yt)}else{const q=V===1?1:V===2?4:V===3?9:12,ut=V===1?2:V===2?5:V===3?10:13,gt=V===1?3:V===2?6:V===3?8:11,Z=Ks(w,q),H=Ks(w,ut),k=Ks(w,gt),it=d(Vn(Z)),yt=d(Vn(H)),D=_[it],M=_[yt];let O="FLOATING";D&&D.has("HIGH")?O="HIGH":D&&D.has("LOW")&&(O="LOW");let tt="FLOATING";M&&M.has("HIGH")?tt="HIGH":M&&M.has("LOW")&&(tt="LOW");const mt=x.logicFunction({A:O,B:tt});mt!=="FLOATING"&&v(k,mt)}}});const b=new Set;Object.keys(m).forEach(E=>b.add(d(E)));for(let E=1;E<=30;E++)["A","B","C","D","E","F","G","H","I","J"].forEach(w=>{const x=`terminal_${E}_${w}`,y=d(Vn(x)),z=_[y];z&&z.has("HIGH")&&z.has("LOW")?(a[x]="SHORT_CIRCUIT",c[x]=l/2):z&&z.has("HIGH")?(a[x]="HIGH",c[x]=l):z&&z.has("LOW")?(a[x]="LOW",c[x]=0):(a[x]="FLOATING",c[x]=NaN)});return["TOP_POS","TOP_NEG","BOTTOM_POS","BOTTOM_NEG"].forEach(E=>{for(let w=1;w<=30;w++){const x=`rail_${E}_${w}`,y=d(Vn(x)),z=_[y];z&&z.has("HIGH")?(a[x]="HIGH",c[x]=l):z&&z.has("LOW")?(a[x]="LOW",c[x]=0):(a[x]="FLOATING",c[x]=NaN)}}),t.leds.forEach(E=>{const w=a[E.anodeHoleKey]||"FLOATING",x=a[E.cathodeHoleKey]||"FLOATING",y=w==="HIGH"&&x==="LOW";let z=!1;t.resistors.forEach(F=>{const N=Vn(F.fromHoleKey),P=Vn(F.toHoleKey),U=Vn(E.anodeHoleKey),B=Vn(E.cathodeHoleKey);(N===U||P===U||N===B||P===B)&&(z=!0)}),y&&!z&&i.push({id:`led_no_resistor_${E.id}`,severity:"warning",title:"Missing Resistor Warning",message:"LED is powered directly without a 330Ω current-limiting resistor!",componentId:E.id}),p[E.id]={isOn:y,isBurnt:!1}}),{netStates:a,netVoltages:c,diagnostics:i,isShortCircuit:!1,icPowerStatus:f,ledStates:p}}}class nC{constructor(){this.isARSupported=!1,this.checkSupport()}async checkSupport(){if(typeof navigator<"u"&&"xr"in navigator&&navigator.xr)try{this.isARSupported=await navigator.xr.isSessionSupported("immersive-ar")}catch{this.isARSupported=!1}else this.isARSupported=!1;return this.isARSupported}getIsSupported(){return this.isARSupported}async startARSession(t,i){if(!("xr"in navigator)||!navigator.xr){i.onError&&i.onError("WebXR AR is not supported on this device or browser.");return}try{const a=await navigator.xr.requestSession("immersive-ar",{requiredFeatures:["hit-test"]});t.xr.enabled=!0,await t.xr.setSession(a),i.onSessionStart&&i.onSessionStart(),a.addEventListener("end",()=>{t.xr.enabled=!1,i.onSessionEnd&&i.onSessionEnd()})}catch(a){i.onError&&i.onError(a.message||"Failed to start WebXR AR session.")}}}const Xv=new nC;function iC(){var yt;const[r,t]=We.useState(()=>L_("7408")),[i,a]=We.useState("7408"),[l,c]=We.useState("yellow"),[f,p]=We.useState("VOLTAGE"),[m,d]=We.useState({redHoleKey:null,blackHoleKey:null,mode:"VOLTAGE"}),[g,_]=We.useState(null),[v,b]=We.useState(!1),[E,w]=We.useState(!1),[x,y]=We.useState(null),[z,F]=We.useState(!1),N=We.useRef(null),P=We.useRef(null),U=eC.simulate(r);We.useEffect(()=>{Xv.checkSupport().then(D=>w(D))},[]),We.useEffect(()=>{if(!N.current)return;const D=new tC(N.current);return P.current=D,()=>{D.destroy(),P.current=null}},[]),We.useEffect(()=>{const D=P.current;D&&(D.onHoleClick=M=>{if(z){if(!D.activeWireStartHole)D.activeWireStartHole=M,d(O=>({...O,redHoleKey:M}));else{const O=D.activeWireStartHole,tt=M;if(D.cancelWireCreation(),O!==tt){const mt={id:`res_${Date.now()}`,resistance:330,fromHoleKey:O,toHoleKey:tt};t(bt=>({...bt,resistors:[...bt.resistors,mt]})),F(!1),Kr.playWirePlug()}}return}if(!D.activeWireStartHole)D.activeWireStartHole=M,d(O=>({...O,redHoleKey:M})),f==="CONTINUITY"&&Kr.playMultimeterBeep();else{const O=D.activeWireStartHole,tt=M;if(D.cancelWireCreation(),O!==tt){const mt={id:`w_${Date.now()}`,fromHoleKey:O,toHoleKey:tt,color:l};t(bt=>({...bt,wires:[...bt.wires,mt]})),Kr.playWirePlug()}}},D.onElementSelect=M=>{_(M),M&&M.type==="SWITCH"&&H(M.id)},D.onICPositionChange=(M,O)=>{t(tt=>({...tt,ics:tt.ics.map(mt=>mt.id===M?{...mt,startCol:O}:mt)}))},D.onICPlaced=(M,O)=>{a(M);const tt={id:`ic_${M}_${Date.now()}`,type:M,startCol:O};t(mt=>({...mt,ics:[...mt.ics.filter(bt=>bt.type!==M),tt]})),y(null),Kr.playWirePlug()})},[z,x,l,f,r]),We.useEffect(()=>{P.current&&(P.current.selectedWireColor=l,P.current.setPlacingIC(x),P.current.syncCircuitState(r,U,m),P.current.updateSelectionVisuals(g))},[r,U,l,m,x,g]),We.useEffect(()=>{const D=M=>{if(M.key==="Escape")x&&y(null),z&&F(!1),P.current&&P.current.cancelWireCreation();else if(M.key==="Delete"||M.key==="Backspace"){const O=document.activeElement;!(O&&(O.tagName==="INPUT"||O.tagName==="TEXTAREA"||O.getAttribute("contenteditable")==="true"))&&g&&(M.preventDefault(),k())}};return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[x,z,g]);const B=()=>{t(D=>({...D,powerSupplyOn:!D.powerSupplyOn}))},A=()=>{t({powerSupplyOn:!0,powerSupplyVoltage:5,ics:[],wires:[],switches:[],leds:[],resistors:[]})},L=()=>{try{localStorage.setItem("virtual_lab_circuit",JSON.stringify(r)),alert("Circuit successfully saved to local storage!")}catch{alert("Failed to save circuit.")}},W=()=>{try{const D=localStorage.getItem("virtual_lab_circuit");D?t(JSON.parse(D)):alert("No saved circuit found.")}catch{alert("Failed to load saved circuit.")}},V=D=>{a(D),t(L_(D))},q=D=>{y(D)},ut=D=>{const M=`sw_${Date.now()}`,O=2+r.switches.length*2;t(tt=>({...tt,switches:[...tt.switches,{id:M,label:D,state:"LOW",outputHoleKey:`terminal_${O}_J`}]}))},gt=D=>{t(M=>({...M,leds:[...M.leds,{id:`led_${Date.now()}`,color:D,anodeHoleKey:"terminal_22_J",cathodeHoleKey:"rail_BOTTOM_NEG_22",isOn:!1}]}))},Z=()=>{F(!0)},H=D=>{Kr.playSwitchClick(),t(M=>({...M,switches:M.switches.map(O=>O.id===D?{...O,state:O.state==="HIGH"?"LOW":"HIGH"}:O)}))},k=()=>{if(!g)return;const{type:D,id:M}=g;D==="WIRE"?t(O=>({...O,wires:O.wires.filter(tt=>tt.id!==M)})):D==="IC"?t(O=>({...O,ics:O.ics.filter(tt=>tt.id!==M)})):D==="SWITCH"?t(O=>({...O,switches:O.switches.filter(tt=>tt.id!==M)})):D==="LED"?t(O=>({...O,leds:O.leds.filter(tt=>tt.id!==M)})):D==="RESISTOR"&&t(O=>({...O,resistors:O.resistors.filter(tt=>tt.id!==M)})),_(null)},it=(D,M)=>{t(O=>({...O,ics:O.ics.map(tt=>tt.id===D?{...tt,startCol:Math.max(1,Math.min(23,tt.startCol+M))}:tt)}))};return G.jsxs("div",{className:"flex flex-col h-screen w-screen overflow-hidden bg-[#0A0B0E] font-sans select-none text-slate-200",children:[G.jsx(zM,{powerOn:r.powerSupplyOn,voltage:r.powerSupplyVoltage!==void 0?r.powerSupplyVoltage:5,onTogglePower:B,onChangeVoltage:D=>t(M=>({...M,powerSupplyVoltage:D})),onResetCircuit:A,onSaveCircuit:L,onLoadCircuit:W,onLoadPreset:V,onOpenAR:()=>b(!0),activeICType:i}),G.jsxs("div",{className:"flex flex-1 relative overflow-hidden",children:[G.jsx(HM,{onAddIC:q,onAddSwitch:ut,onAddLED:gt,onAddResistor:Z,selectedWireColor:l,onSelectWireColor:c,multimeterMode:f,onSelectMultimeterMode:D=>{p(D),d(M=>({...M,mode:D}))},activeICType:i}),G.jsxs("div",{className:"flex-1 relative bg-[#0A0B0E]",children:[G.jsx("div",{ref:N,className:"w-full h-full cursor-crosshair"}),x&&G.jsx("div",{className:"absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 border border-blue-400/50 text-white font-mono text-[11px] font-bold uppercase rounded p-2.5 px-4 shadow-2xl z-30 flex items-center gap-2.5 animate-pulse",children:G.jsxs("span",{children:["Placing SN74HC",x,"N... Click on any hole to position IC. Press ESC to cancel."]})}),z&&G.jsx("div",{className:"absolute top-4 left-1/2 -translate-x-1/2 bg-amber-600 border border-amber-400/50 text-white font-mono text-[11px] font-bold uppercase rounded p-2.5 px-4 shadow-2xl z-30 flex items-center gap-2.5 animate-pulse",children:G.jsxs("span",{children:[(yt=P.current)!=null&&yt.activeWireStartHole?"Resistor Mode: Click 2nd hole to drop.":"Resistor Mode: Click 1st hole to start."," (Press ESC to cancel)"]})}),G.jsxs("div",{className:"absolute top-4 left-4 bg-[#12151B]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs text-slate-300 shadow-2xl pointer-events-none space-y-1 max-w-sm",children:[G.jsxs("div",{className:"flex items-center gap-1.5 font-bold text-white uppercase text-[10px] tracking-wider",children:[G.jsx(jv,{className:"w-3.5 h-3.5 text-blue-400"}),G.jsx("span",{children:"Breadboard Controls & Interactive Wiring"})]}),G.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed font-mono",children:["• ",G.jsx("strong",{className:"text-blue-300",children:"Put Wires:"})," Click 1st hole on breadboard, then click 2nd hole to attach wire.",G.jsx("br",{}),"• ",G.jsx("strong",{className:"text-blue-300",children:"Move ICs:"})," Click & drag any IC in 3D across columns (or select IC below).",G.jsx("br",{}),"• ",G.jsx("strong",{className:"text-blue-300",children:"Camera:"})," Drag mouse to rotate • Right-click or scroll to zoom."]})]}),g&&G.jsxs("div",{className:"absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#12151B] backdrop-blur-md border border-white/10 rounded-lg p-2.5 px-4 text-xs text-slate-200 shadow-2xl flex items-center gap-3 z-20",children:[G.jsxs("span",{className:"font-mono text-xs text-blue-400 font-bold uppercase",children:["Selected: ",g.type," (",g.id,")"]}),g.type==="IC"&&G.jsxs("div",{className:"flex items-center gap-1.5 border-l border-r border-white/10 px-3",children:[G.jsx("span",{className:"text-[10px] font-mono text-slate-400 uppercase",children:"Column:"}),G.jsx("button",{onClick:()=>it(g.id,-1),className:"px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded border border-white/10",title:"Shift IC Left 1 Column",children:"← Left"}),G.jsx("button",{onClick:()=>it(g.id,1),className:"px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded border border-white/10",title:"Shift IC Right 1 Column",children:"Right →"})]}),G.jsxs("button",{onClick:k,className:"flex items-center gap-1 px-2.5 py-1 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold rounded text-xs uppercase tracking-wider transition-all border border-red-500/30",children:[G.jsx(UM,{className:"w-3.5 h-3.5"}),G.jsx("span",{children:"Delete"})]})]})]}),G.jsxs("div",{className:"absolute top-4 right-4 z-10 flex flex-col space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto pr-1",children:[G.jsx(kM,{icType:i,circuitState:r,simResult:U}),G.jsx(XM,{icType:i,circuitState:r,simResult:U})]})]}),G.jsx(WM,{diagnostics:U.diagnostics,isShortCircuit:U.isShortCircuit}),G.jsxs("footer",{className:"h-8 bg-[#0F1115] border-t border-white/5 px-4 flex items-center justify-between shrink-0 text-[10px] font-mono text-slate-500 z-10",children:[G.jsxs("div",{className:"flex gap-4",children:[G.jsxs("span",{children:["IC: SN74HC",i,"N"]}),G.jsx("span",{children:"PINS: 14/14"}),G.jsx("span",{children:"NODE: 0x2A4F"})]}),G.jsxs("div",{className:"hidden sm:block uppercase",children:["COMPONENT: IC ",i," • PIN 14 (VCC) - 5.04V"]})]}),G.jsx(YM,{isOpen:v,onClose:()=>b(!1),circuitState:r,simResult:U,isARSupported:E,onLaunchWebXR:()=>{P.current&&Xv.startARSession(P.current.renderer,{onError:D=>alert(D)})},onToggleSwitchState:H,activeICType:i})]})}XS.createRoot(document.getElementById("root")).render(G.jsx(We.StrictMode,{children:G.jsx(iC,{})}));
