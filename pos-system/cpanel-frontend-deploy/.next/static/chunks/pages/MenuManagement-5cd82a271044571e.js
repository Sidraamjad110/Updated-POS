(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4820],{6892:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return MenuManagement}});var n=a(74848),d=a(96540),c=a(84984),m=a(40449),f=a(40189);function MenuManagement(){let{isAuthenticated:e,token:r,logout:a}=(0,c.As)(),[g,h]=(0,d.useState)(!1),[b,v]=(0,d.useState)("all"),[x,y]=(0,d.useState)([]),[k,j]=(0,d.useState)(!1),[C,N]=(0,d.useState)(!1),[A,M]=(0,d.useState)("default"),handleSetFormMode=(e,r,a)=>{"category"===r?j(!!e):N(!!e)};(0,d.useEffect)(()=>{var e;h(!0);let r=(null===(e=document.querySelector("html"))||void 0===e?void 0:e.getAttribute("data-theme"))||"default";M(r);let a=new MutationObserver(e=>{e.forEach(e=>{if("attributes"===e.type&&"data-theme"===e.attributeName){var r;let e=(null===(r=document.querySelector("html"))||void 0===r?void 0:r.getAttribute("data-theme"))||"default";M(e)}})}),n=document.querySelector("html");return n&&a.observe(n,{attributes:!0,attributeFilter:["data-theme"]}),()=>a.disconnect()},[]);let L=(()=>{if("dark"===A||"dark-pro"===A)return{cardBackground:"#1f2937",cardBorder:"#374151",cardText:"#ffffff",headingText:"#ffffff"};switch(A){case"blue":return{cardBackground:"#ffffff",cardBorder:"#e5e7eb",cardText:"#1e3a8a",headingText:"#000"};case"green":return{cardBackground:"#ffffff",cardBorder:"#e5e7eb",cardText:"#064e3b",headingText:"#064e3b"};default:return{cardBackground:"#ffffff",cardBorder:"#e5e7eb",cardText:"#111827",headingText:"#111827"}}})();return g?e?(0,n.jsxs)("div",{className:"w-full min-h-screen py-4 bg-[var(--background-color)]",children:[(0,n.jsx)("div",{className:"rounded-lg shadow-md border w-full p-4 mb-6",style:{backgroundColor:L.cardBackground,borderColor:L.cardBorder,color:L.cardText},children:(0,n.jsx)("div",{className:"flex flex-col lg:flex-row lg:justify-between lg:items-center",children:(0,n.jsx)("div",{className:"mb-3 lg:mb-0",children:(0,n.jsx)("h1",{className:"text-2xl font-bold",style:{color:L.headingText},children:"Menu Management"})})})}),(0,n.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-10 gap-4",children:[(0,n.jsx)("div",{className:"lg:col-span-3",children:(0,n.jsx)("div",{className:"rounded-lg shadow-md border",style:{backgroundColor:L.cardBackground,borderColor:L.cardBorder,color:L.cardText},children:(0,n.jsx)(m.default,{token:r,isAuthenticated:e,logout:a,categories:x,setCategories:y,onFormActive:j,isProductFormActive:C})})}),(0,n.jsx)("div",{className:"lg:col-span-7",children:(0,n.jsx)("div",{className:"rounded-lg shadow-md border",style:{backgroundColor:L.cardBackground,borderColor:L.cardBorder,color:L.cardText},children:(0,n.jsx)(f.default,{token:r,isAuthenticated:e,logout:a,categories:x,setFormMode:(e,r)=>handleSetFormMode(e,"product",r),filterCategory:b,setFilterCategory:v,isFormActive:C,isCategoryFormActive:k})})})]})]}):(0,n.jsx)("div",{className:"flex justify-center items-center h-screen bg-[var(--background-color)]",children:(0,n.jsxs)("div",{className:"text-center p-6 max-w-md rounded-lg shadow-md border",style:{backgroundColor:L.cardBackground,borderColor:L.cardBorder,color:L.cardText},children:[(0,n.jsx)("h2",{className:"text-2xl font-bold mb-4",style:{color:L.headingText},children:"Access Denied"}),(0,n.jsx)("p",{className:"mb-6",style:{color:L.cardText},children:"Please log in to access the Menu Management Dashboard."}),(0,n.jsx)("button",{onClick:()=>window.location.href="/pos-system/login",className:"px-4 py-2 bg-[var(--primary-color)] text-[var(--sidebar-text)] rounded-lg hover:bg-[var(--primary-700)] transition-colors",children:"Go to Log In"})]})}):(0,n.jsx)("div",{className:"flex justify-center items-center h-screen bg-[var(--background-color)]",children:(0,n.jsx)("div",{className:"text-center p-6 max-w-md rounded-lg shadow-md border",style:{backgroundColor:L.cardBackground,borderColor:L.cardBorder,color:L.cardText},children:(0,n.jsx)("div",{className:"text-2xl mb-4",style:{color:L.headingText},children:"Loading..."})})})}},18354:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"}))});r.A=d},18981:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{fillRule:"evenodd",d:"M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))});r.A=d},40449:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return Categories}});var n=a(74848),d=a(96540),c=a(62636),m=a(28735),f=a(78791),g=a(36177),h=a(86597);function Categories(e){let{token:r,isAuthenticated:a,logout:b,categories:v,setCategories:x,onFormActive:y,isProductFormActive:k}=e,[j,C]=(0,d.useState)(!0),[N,A]=(0,d.useState)(null),[M,L]=(0,d.useState)("list"),[F,B]=(0,d.useState)(null),[T,O]=(0,d.useState)(null),[D,I]=(0,d.useState)(!1),[R,z]=(0,d.useState)(null);(0,d.useEffect)(()=>{if(!a||!r){C(!1);return}let fetchData=async()=>{A(null);try{let e=await (0,m.jE)(r,b);x(e)}catch(e){A({message:e instanceof Error?e.message:"Failed to fetch categories",type:"error"})}finally{C(!1)}};fetchData()},[a,r,b,x]),(0,d.useEffect)(()=>{let e="list"!==M;y(e)},[M,y]);let resetForm=()=>{L("list"),B(null),O(null),I(!1),z(null)};return j?(0,n.jsx)("div",{className:"rounded-lg p-3 shadow-sm",style:{backgroundColor:"var(--background-color)",border:"1px solid var(--border-color)"},children:(0,n.jsxs)("div",{className:"animate-pulse space-y-4",children:[(0,n.jsx)("div",{className:"h-8 rounded",style:{backgroundColor:"var(--background-secondary)"}}),[,,,,].fill(0).map((e,r)=>(0,n.jsx)("div",{className:"h-40 rounded-lg",style:{backgroundColor:"var(--background-secondary)"}},r))]})}):(0,n.jsxs)("div",{className:"relative p-3 min-h-screen",style:{backgroundColor:"var(--surface-color)",color:"var(--text-color)",opacity:k?.5:1,pointerEvents:k?"none":"auto"},children:[(0,n.jsx)(c.l$,{position:"top-right"}),N&&(0,n.jsx)(f.default,{message:N.message,type:N.type,onClose:()=>A(null)}),"list"===M&&(0,n.jsx)(h.default,{token:r,isAuthenticated:a,logout:b,categories:v,setCategories:x,isProductFormActive:k,onAdd:()=>{L("add"),B(null)},onEdit:e=>{B(e),O(e._id),L("edit")},onDelete:e=>{let r=v.find(r=>r._id===e);r&&(B(r),z(e),I(!0))},flashMessage:N,setFlashMessage:A}),"add"===M&&(0,n.jsx)(g.default,{token:r,logout:b,categories:v,setCategories:x,onCancel:resetForm,isProductFormActive:k,mode:"add",setFlashMessageInParent:A}),"edit"===M&&F&&T&&(0,n.jsx)(g.default,{token:r,logout:b,categories:v,setCategories:x,category:F,editingCategoryId:T,onCancel:resetForm,isProductFormActive:k,mode:"edit",setFlashMessageInParent:A}),D&&R&&(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-white rounded-lg max-w-md",style:{backgroundColor:"var(--background-color)"},children:(0,n.jsx)(g.default,{token:r,logout:b,categories:v,setCategories:x,category:F,deleteCategoryId:R,onCancel:resetForm,isProductFormActive:k,mode:"delete",setFlashMessageInParent:A})})})]})}},55785:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"}),n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 6h.008v.008H6V6Z"}))});r.A=d},62636:function(e,r,a){"use strict";let n,d;a.d(r,{l$:function(){return Fe},Ay:function(){return eo}});var c,m=a(96540);let f={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||f},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,b=/\n+/g,o=(e,r)=>{let a="",n="",d="";for(let c in e){let m=e[c];"@"==c[0]?"i"==c[1]?a=c+" "+m+";":n+="f"==c[1]?o(m,c):c+"{"+o(m,"k"==c[1]?"":r)+"}":"object"==typeof m?n+=o(m,r?r.replace(/([^,])+/g,e=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):c):null!=m&&(c="-"==c[1]?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(c,m):c+":"+m+";")}return a+(r&&d?r+"{"+d+"}":d)+n},v={},i=e=>{if("object"==typeof e){let r="";for(let a in e)r+=a+i(e[a]);return r}return e},s=(e,r,a,n,d)=>{var c;let m=i(e),f=v[m]||(v[m]=(e=>{let r=0,a=11;for(;r<e.length;)a=101*a+e.charCodeAt(r++)>>>0;return"go"+a})(m));if(!v[f]){let r=m!==e?e:(e=>{let r,a,n=[{}];for(;r=g.exec(e.replace(h,""));)r[4]?n.shift():r[3]?(a=r[3].replace(b," ").trim(),n.unshift(n[0][a]=n[0][a]||{})):n[0][r[1]]=r[2].replace(b," ").trim();return n[0]})(e);v[f]=o(d?{["@keyframes "+f]:r}:r,a?"":"."+f)}let x=a&&v.g;return a&&(v.g=v[f]),c=v[f],x?r.data=r.data.replace(x,c):-1===r.data.indexOf(c)&&(r.data=n?c+r.data:r.data+c),f},p=(e,r,a)=>e.reduce((e,n,d)=>{let c=r[d];if(c&&c.call){let e=c(a),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;c=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+n+(null==c?"":c)},"");function u(e){let r=this||{},a=e.call?e(r.p):e;return s(a.unshift?a.raw?p(a,[].slice.call(arguments,1),r.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(r.p):a),{}):a,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let x,y,k,j=u.bind({k:1});function w(e,r){let a=this||{};return function(){let n=arguments;function l(d,c){let m=Object.assign({},d),f=m.className||l.className;a.p=Object.assign({theme:y&&y()},m),a.o=/go\d/.test(f),m.className=u.apply(a,n)+(f?" "+f:""),r&&(m.ref=c);let g=e;return e[0]&&(g=m.as||e,delete m.as),k&&g[0]&&k(m),x(g,m)}return r?r(l):l}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,C=(n=0,()=>(++n).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},N="default",H=(e,r)=>{let{toastLimit:a}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:n}=r;return H(e,{type:e.toasts.find(e=>e.id===n.id)?1:0,toast:n});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let c=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+c}))}}},A=[],M={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},Y=(e,r=N)=>{L[r]=H(L[r]||M,e),A.forEach(([e,a])=>{e===r&&a(L[r])})},_=e=>Object.keys(L).forEach(r=>Y(e,r)),Q=e=>Object.keys(L).find(r=>L[r].toasts.some(r=>r.id===e)),S=(e=N)=>r=>{Y(r,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=N)=>{let[a,n]=(0,m.useState)(L[r]||M),d=(0,m.useRef)(L[r]);(0,m.useEffect)(()=>(d.current!==L[r]&&n(L[r]),A.push([r,n]),()=>{let e=A.findIndex(([e])=>e===r);e>-1&&A.splice(e,1)}),[r]);let c=a.toasts.map(r=>{var a,n,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(a=e[r.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(n=e[r.type])?void 0:n.duration)||(null==e?void 0:e.duration)||F[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...a,toasts:c}},ie=(e,r="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||C()}),P=e=>(r,a)=>{let n=ie(r,e,a);return S(n.toasterId||Q(n.id))({type:2,toast:n}),n.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let a={type:3,toastId:e};r?S(r)(a):_(a)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let a={type:4,toastId:e};r?S(r)(a):_(a)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,a)=>{let n=dist_n.loading(r.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:n,...a,...null==a?void 0:a.success}):dist_n.dismiss(n),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:n,...a,...null==a?void 0:a.error}):dist_n.dismiss(n)}),e};var B=1e3,dist_w=(e,r="default")=>{let{toasts:a,pausedAt:n}=V(e,r),d=(0,m.useRef)(new Map).current,c=(0,m.useCallback)((e,r=B)=>{if(d.has(e))return;let a=setTimeout(()=>{d.delete(e),f({type:4,toastId:e})},r);d.set(e,a)},[]);(0,m.useEffect)(()=>{if(n)return;let e=Date.now(),d=a.map(a=>{if(a.duration===1/0)return;let n=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(n<0){a.visible&&dist_n.dismiss(a.id);return}return setTimeout(()=>dist_n.dismiss(a.id,r),n)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[a,n,r]);let f=(0,m.useCallback)(S(r),[r]),g=(0,m.useCallback)(()=>{f({type:5,time:Date.now()})},[f]),h=(0,m.useCallback)((e,r)=>{f({type:1,toast:{id:e,height:r}})},[f]),b=(0,m.useCallback)(()=>{n&&f({type:6,time:Date.now()})},[n,f]),v=(0,m.useCallback)((e,r)=>{let{reverseOrder:n=!1,gutter:d=8,defaultPosition:c}=r||{},m=a.filter(r=>(r.position||c)===(e.position||c)&&r.height),f=m.findIndex(r=>r.id===e.id),g=m.filter((e,r)=>r<f&&e.visible).length;return m.filter(e=>e.visible).slice(...n?[g+1]:[0,g]).reduce((e,r)=>e+(r.height||0)+d,0)},[a]);return(0,m.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)c(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[a,c]),{toasts:a,handlers:{updateHeight:h,startPause:g,endPause:b,calculateOffset:v}}},T=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,O=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${O} 0.15s ease-out forwards;
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
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,W=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=j`
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
}`,U=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
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
`,X=w("div")`
  position: absolute;
`,G=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=j`
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
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:a,iconTheme:n}=e;return void 0!==r?"string"==typeof r?m.createElement(K,null,r):r:"blank"===a?null:m.createElement(G,null,m.createElement(z,{...n}),"loading"!==a&&m.createElement(X,null,"error"===a?m.createElement(I,{...n}):m.createElement(U,{...n})))},Re=e=>`
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
`,ke=(e,r)=>{let a=e.includes("top")?1:-1,[n,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(a),Ee(a)];return{animation:r?`${j(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=m.memo(({toast:e,position:r,style:a,children:n})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},c=m.createElement($,{toast:e}),f=m.createElement(et,{...e.ariaProps},dist_h(e.message,e));return m.createElement(ee,{className:e.className,style:{...d,...a,...e.style}},"function"==typeof n?n({icon:c,message:f}):m.createElement(m.Fragment,null,c,f))});c=m.createElement,o.p=void 0,x=c,y=void 0,k=void 0;var we=({id:e,className:r,style:a,onHeightUpdate:n,children:d})=>{let c=m.useCallback(r=>{if(r){let l=()=>{n(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return m.createElement("div",{ref:c,className:r,style:a},d)},Me=(e,r)=>{let a=e.includes("top"),n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...n}},ea=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:a,gutter:n,children:d,toasterId:c,containerStyle:f,containerClassName:g})=>{let{toasts:h,handlers:b}=dist_w(a,c);return m.createElement("div",{"data-rht-toaster":c||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...f},className:g,onMouseEnter:b.startPause,onMouseLeave:b.endPause},h.map(a=>{let c=a.position||r,f=Me(c,b.calculateOffset(a,{reverseOrder:e,gutter:n,defaultPosition:r}));return m.createElement(we,{id:a.id,key:a.id,onHeightUpdate:b.updateHeight,className:a.visible?ea:"",style:f},"custom"===a.type?dist_h(a.message,a):d?d(a):m.createElement(er,{toast:a,position:c}))}))},eo=dist_n},63322:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))});r.A=d},64985:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"}))});r.A=d},66217:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"}))});r.A=d},73956:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))});r.A=d},74084:function(e,r,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/MenuManagement",function(){return a(6892)}])},78791:function(e,r,a){"use strict";a.r(r);var n=a(74848),d=a(96540);r.default=e=>{let{message:r,type:a,onClose:c,className:m=""}=e;return(0,d.useEffect)(()=>{let e=setTimeout(()=>{c()},5e3);return()=>clearTimeout(e)},[c]),(0,n.jsxs)("div",{className:"p-4 mb-6 rounded-xl shadow-sm border-t-4 ".concat("success"===a?"bg-green-50 border-green-500 text-green-700":"bg-red-50 border-red-500 text-red-700"," ").concat(m," relative"),role:"alert",children:[(0,n.jsx)("button",{onClick:c,className:"absolute top-2 right-2 text-lg hover:opacity-70 transition-opacity","aria-label":"Close message",children:"\xd7"}),(0,n.jsx)("p",{className:"pr-6",children:r})]})}},80794:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))});r.A=d}},function(e){e.O(0,[3868,6177,4284,6597,189,6593,636,8792],function(){return e(e.s=74084)}),_N_E=e.O()}]);