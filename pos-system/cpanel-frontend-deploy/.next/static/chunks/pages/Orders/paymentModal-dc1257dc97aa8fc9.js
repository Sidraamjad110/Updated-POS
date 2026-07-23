(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1099],{25517:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"}))});r.A=d},27669:function(e,r,a){"use strict";a.d(r,{D5:function(){return markOrderAsCompleted},N4:function(){return cancelOrder},NQ:function(){return confirmOrder},P7:function(){return getOrderByNumber},PM:function(){return markOrderAsReady},Vd:function(){return getAllOrders},bA:function(){return markNotificationAsRead},fS:function(){return createOrder},im:function(){return fetchFreeWaiters},kp:function(){return addToExistingOrder},ot:function(){return assignTable},wP:function(){return getOrderQueue},wh:function(){return processPayment},x0:function(){return markOrderAsServed}});var n=a(62636);let handleApiError=(e,r)=>{if(!e.success)switch(console.error("API Error:",e),e.statusCode){case 400:return e.message||"Invalid input provided";case 401:return r(),window.location.href="/pos-system/login","Please log in to continue";case 403:return"Access denied";case 404:return e.message||"Order not found";case 409:return e.message||"Duplicate entry";case 500:return"An unexpected server error occurred";default:return"An unexpected error occurred"}return""},d="https://pos.rasantsol.com",createOrder=async(e,r,a,c)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/create"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({items:a,...c})});if(401===n.status)throw r(),window.location.href="/pos-system/login",Error("Unauthorized");let m=await n.json();if(!n.ok||!m.success)throw Error(m.message||handleApiError(m,r));return"data"in m.data?m.data.data:m.data}catch(r){let e=r instanceof Error?r.message:"Failed to create order";throw n.Ay.error(e),Error(e)}},assignTable=async(e,r,a,c)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/assign-table"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a,table_id:c})}),m=await n.json();if(!n.ok||!m.success)throw Error(m.message||handleApiError(m,r));return"data"in m.data?m.data.data:m.data}catch(r){let e=r instanceof Error?r.message:"Failed to assign table";throw n.Ay.error(e),Error(e)}},markOrderAsReady=async(e,r,a)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/ready"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to mark order as ready")}},markOrderAsServed=async(e,r,a)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/served"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to mark order as served")}},markOrderAsCompleted=async(e,r,a)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/completed"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to mark order as completed")}},confirmOrder=async(e,r,a,n)=>{try{let c=await fetch("".concat(d,"/orders/api/v1/confirm"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a,preparation_time:n})}),m=await c.json();if(!c.ok||!m.success)throw Error(m.message||handleApiError(m,r));return"data"in m.data?m.data.data:m.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to confirm order")}},cancelOrder=async(e,r,a)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/cancel"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to cancel order")}},getAllOrders=async(e,r)=>{try{let a=await fetch("".concat(d,"/orders/api/v1/list"),{headers:{Authorization:"Bearer ".concat(e)}});if(!a.ok)throw Error("HTTP error! status: ".concat(a.status));let n=await a.json();if(!n.success)throw Error(n.message||handleApiError(n,r));return"data"in n.data?n.data.data:n.data||[]}catch(e){throw console.error("Error in getAllOrders:",e),Error(e instanceof Error?e.message:"Failed to fetch orders")}},getOrderByNumber=async(e,r,a)=>{try{console.log("Fetching order with number: ".concat(a));let n=await fetch("".concat(d,"/orders/api/v1/by-number"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})});if(!n.ok)throw console.error("HTTP error! status: ".concat(n.status,", order_number: ").concat(a)),Error("HTTP error! status: ".concat(n.status));let c=await n.json();if(console.log("API response:",c),!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(r){let e=r instanceof Error?r.message:"Failed to fetch order by number";throw console.error("Error in getOrderByNumber:",e),n.Ay.error(e),Error(e)}},getOrderQueue=async(e,r)=>{try{var a,n;let c=await fetch("".concat(d,"/orders/api/v1/queue"),{headers:{Authorization:"Bearer ".concat(e)}});if(!c.ok)throw Error("HTTP error! status: ".concat(c.status));let m=await c.json();if(!m.success)throw Error(m.message||handleApiError(m,r));return null!==(n=null===(a=m.data)||void 0===a?void 0:a.data)&&void 0!==n?n:[]}catch(e){throw console.error("Error in getOrderQueue:",e),Error(e instanceof Error?e.message:"Failed to fetch order queue")}},processPayment=async(e,r,a,n,c)=>{try{let m=await fetch("".concat(d,"/orders/api/v1/payment"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_id:a,received_amount:n,payment_method:c})}),f=await m.json();if(!m.ok||!f.success)throw Error(f.message||handleApiError(f,r));return"data"in f.data?f.data.data:f.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to process payment")}},markNotificationAsRead=async(e,r,a)=>{try{let n=await fetch("".concat(d,"/orders/api/v1/notification"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a})}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));return"data"in c.data?c.data.data:c.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to mark notification as read")}},fetchFreeWaiters=async(e,r)=>{try{var a;let n=await fetch("".concat(d,"/users/api/v1/all-waiters"),{headers:{Authorization:"Bearer ".concat(e)}}),c=await n.json();if(!n.ok||!c.success)throw Error(c.message||handleApiError(c,r));let m=(null===(a=c.data)||void 0===a?void 0:a.data)||[];return m.map(e=>({_id:e._id,name:e.name,email:e.email,user_type:e.user_type,role:e.role,created_by:{id:e.created_by.id,name:e.created_by.name,email:e.created_by.email,store_name:e.created_by.store_name,logoUrl:e.created_by.logoUrl,store_logo:e.created_by.store_logo}}))}catch(e){throw Error(e instanceof Error?e.message:"Failed to fetch waiters")}},addToExistingOrder=async(e,r,a,n)=>{try{let c=await fetch("".concat(d,"/orders/api/v1/add-to-order"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({order_number:a,items:n})}),m=await c.json();if(!c.ok||!m.success)throw Error(m.message||handleApiError(m,r));return"data"in m.data?m.data.data:m.data}catch(e){throw Error(e instanceof Error?e.message:"Failed to add items to order")}}},35316:function(e,r,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Orders/paymentModal",function(){return a(89785)}])},62636:function(e,r,a){"use strict";let n,d;a.d(r,{l$:function(){return Fe},Ay:function(){return eo}});var c,m=a(96540);let f={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||f},h=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,g=/\n+/g,o=(e,r)=>{let a="",n="",d="";for(let c in e){let m=e[c];"@"==c[0]?"i"==c[1]?a=c+" "+m+";":n+="f"==c[1]?o(m,c):c+"{"+o(m,"k"==c[1]?"":r)+"}":"object"==typeof m?n+=o(m,r?r.replace(/([^,])+/g,e=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):c):null!=m&&(c="-"==c[1]?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(c,m):c+":"+m+";")}return a+(r&&d?r+"{"+d+"}":d)+n},b={},i=e=>{if("object"==typeof e){let r="";for(let a in e)r+=a+i(e[a]);return r}return e},s=(e,r,a,n,d)=>{var c;let m=i(e),f=b[m]||(b[m]=(e=>{let r=0,a=11;for(;r<e.length;)a=101*a+e.charCodeAt(r++)>>>0;return"go"+a})(m));if(!b[f]){let r=m!==e?e:(e=>{let r,a,n=[{}];for(;r=h.exec(e.replace(y,""));)r[4]?n.shift():r[3]?(a=r[3].replace(g," ").trim(),n.unshift(n[0][a]=n[0][a]||{})):n[0][r[1]]=r[2].replace(g," ").trim();return n[0]})(e);b[f]=o(d?{["@keyframes "+f]:r}:r,a?"":"."+f)}let v=a&&b.g;return a&&(b.g=b[f]),c=b[f],v?r.data=r.data.replace(v,c):-1===r.data.indexOf(c)&&(r.data=n?c+r.data:r.data+c),f},p=(e,r,a)=>e.reduce((e,n,d)=>{let c=r[d];if(c&&c.call){let e=c(a),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;c=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+n+(null==c?"":c)},"");function u(e){let r=this||{},a=e.call?e(r.p):e;return s(a.unshift?a.raw?p(a,[].slice.call(arguments,1),r.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(r.p):a),{}):a,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let v,x,A,k=u.bind({k:1});function w(e,r){let a=this||{};return function(){let n=arguments;function l(d,c){let m=Object.assign({},d),f=m.className||l.className;a.p=Object.assign({theme:x&&x()},m),a.o=/go\d/.test(f),m.className=u.apply(a,n)+(f?" "+f:""),r&&(m.ref=c);let h=e;return e[0]&&(h=m.as||e,delete m.as),A&&h[0]&&A(m),v(h,m)}return r?r(l):l}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,O=(n=0,()=>(++n).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},T="default",H=(e,r)=>{let{toastLimit:a}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:n}=r;return H(e,{type:e.toasts.find(e=>e.id===n.id)?1:0,toast:n});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let c=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+c}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},Y=(e,r=T)=>{C[r]=H(C[r]||N,e),j.forEach(([e,a])=>{e===r&&a(C[r])})},_=e=>Object.keys(C).forEach(r=>Y(e,r)),Q=e=>Object.keys(C).find(r=>C[r].toasts.some(r=>r.id===e)),S=(e=T)=>r=>{Y(r,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=T)=>{let[a,n]=(0,m.useState)(C[r]||N),d=(0,m.useRef)(C[r]);(0,m.useEffect)(()=>(d.current!==C[r]&&n(C[r]),j.push([r,n]),()=>{let e=j.findIndex(([e])=>e===r);e>-1&&j.splice(e,1)}),[r]);let c=a.toasts.map(r=>{var a,n,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(a=e[r.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(n=e[r.type])?void 0:n.duration)||(null==e?void 0:e.duration)||z[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...a,toasts:c}},ie=(e,r="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||O()}),P=e=>(r,a)=>{let n=ie(r,e,a);return S(n.toasterId||Q(n.id))({type:2,toast:n}),n.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let a={type:3,toastId:e};r?S(r)(a):_(a)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let a={type:4,toastId:e};r?S(r)(a):_(a)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,a)=>{let n=dist_n.loading(r.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:n,...a,...null==a?void 0:a.success}):dist_n.dismiss(n),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:n,...a,...null==a?void 0:a.error}):dist_n.dismiss(n)}),e};var F=1e3,dist_w=(e,r="default")=>{let{toasts:a,pausedAt:n}=V(e,r),d=(0,m.useRef)(new Map).current,c=(0,m.useCallback)((e,r=F)=>{if(d.has(e))return;let a=setTimeout(()=>{d.delete(e),f({type:4,toastId:e})},r);d.set(e,a)},[]);(0,m.useEffect)(()=>{if(n)return;let e=Date.now(),d=a.map(a=>{if(a.duration===1/0)return;let n=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(n<0){a.visible&&dist_n.dismiss(a.id);return}return setTimeout(()=>dist_n.dismiss(a.id,r),n)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[a,n,r]);let f=(0,m.useCallback)(S(r),[r]),h=(0,m.useCallback)(()=>{f({type:5,time:Date.now()})},[f]),y=(0,m.useCallback)((e,r)=>{f({type:1,toast:{id:e,height:r}})},[f]),g=(0,m.useCallback)(()=>{n&&f({type:6,time:Date.now()})},[n,f]),b=(0,m.useCallback)((e,r)=>{let{reverseOrder:n=!1,gutter:d=8,defaultPosition:c}=r||{},m=a.filter(r=>(r.position||c)===(e.position||c)&&r.height),f=m.findIndex(r=>r.id===e.id),h=m.filter((e,r)=>r<f&&e.visible).length;return m.filter(e=>e.visible).slice(...n?[h+1]:[0,h]).reduce((e,r)=>e+(r.height||0)+d,0)},[a]);return(0,m.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)c(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[a,c]),{toasts:a,handlers:{updateHeight:y,startPause:h,endPause:g,calculateOffset:b}}},B=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,U=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${U} 1s linear infinite;
`,L=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,q=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,W=w("div")`
  position: absolute;
`,X=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,G=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${G} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:a,iconTheme:n}=e;return void 0!==r?"string"==typeof r?m.createElement(K,null,r):r:"blank"===a?null:m.createElement(X,null,m.createElement(J,{...n}),"loading"!==a&&m.createElement(W,null,"error"===a?m.createElement(M,{...n}):m.createElement(q,{...n})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ee=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,et=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let a=e.includes("top")?1:-1,[n,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(a),Ee(a)];return{animation:r?`${k(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=m.memo(({toast:e,position:r,style:a,children:n})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},c=m.createElement($,{toast:e}),f=m.createElement(et,{...e.ariaProps},dist_h(e.message,e));return m.createElement(ee,{className:e.className,style:{...d,...a,...e.style}},"function"==typeof n?n({icon:c,message:f}):m.createElement(m.Fragment,null,c,f))});c=m.createElement,o.p=void 0,v=c,x=void 0,A=void 0;var we=({id:e,className:r,style:a,onHeightUpdate:n,children:d})=>{let c=m.useCallback(r=>{if(r){let l=()=>{n(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return m.createElement("div",{ref:c,className:r,style:a},d)},Me=(e,r)=>{let a=e.includes("top"),n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...n}},ea=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:a,gutter:n,children:d,toasterId:c,containerStyle:f,containerClassName:h})=>{let{toasts:y,handlers:g}=dist_w(a,c);return m.createElement("div",{"data-rht-toaster":c||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...f},className:h,onMouseEnter:g.startPause,onMouseLeave:g.endPause},y.map(a=>{let c=a.position||r,f=Me(c,g.calculateOffset(a,{reverseOrder:e,gutter:n,defaultPosition:r}));return m.createElement(we,{id:a.id,key:a.id,onHeightUpdate:g.updateHeight,className:a.visible?ea:"",style:f},"custom"===a.type?dist_h(a.message,a):d?d(a):m.createElement(er,{toast:a,position:c}))}))},eo=dist_n}},function(e){e.O(0,[9785,6593,636,8792],function(){return e(e.s=35316)}),_N_E=e.O()}]);