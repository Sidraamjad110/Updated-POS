(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5531],{40449:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return Categories}});var n=a(74848),d=a(96540),c=a(62636),m=a(28735),f=a(78791),g=a(36177),h=a(86597);function Categories(e){let{token:r,isAuthenticated:a,logout:y,categories:b,setCategories:v,onFormActive:x,isProductFormActive:k}=e,[C,j]=(0,d.useState)(!0),[N,A]=(0,d.useState)(null),[F,O]=(0,d.useState)("list"),[L,D]=(0,d.useState)(null),[I,M]=(0,d.useState)(null),[z,T]=(0,d.useState)(!1),[R,B]=(0,d.useState)(null);(0,d.useEffect)(()=>{if(!a||!r){j(!1);return}let fetchData=async()=>{A(null);try{let e=await (0,m.jE)(r,y);v(e)}catch(e){A({message:e instanceof Error?e.message:"Failed to fetch categories",type:"error"})}finally{j(!1)}};fetchData()},[a,r,y,v]),(0,d.useEffect)(()=>{let e="list"!==F;x(e)},[F,x]);let resetForm=()=>{O("list"),D(null),M(null),T(!1),B(null)};return C?(0,n.jsx)("div",{className:"rounded-lg p-3 shadow-sm",style:{backgroundColor:"var(--background-color)",border:"1px solid var(--border-color)"},children:(0,n.jsxs)("div",{className:"animate-pulse space-y-4",children:[(0,n.jsx)("div",{className:"h-8 rounded",style:{backgroundColor:"var(--background-secondary)"}}),[,,,,].fill(0).map((e,r)=>(0,n.jsx)("div",{className:"h-40 rounded-lg",style:{backgroundColor:"var(--background-secondary)"}},r))]})}):(0,n.jsxs)("div",{className:"relative p-3 min-h-screen",style:{backgroundColor:"var(--surface-color)",color:"var(--text-color)",opacity:k?.5:1,pointerEvents:k?"none":"auto"},children:[(0,n.jsx)(c.l$,{position:"top-right"}),N&&(0,n.jsx)(f.default,{message:N.message,type:N.type,onClose:()=>A(null)}),"list"===F&&(0,n.jsx)(h.default,{token:r,isAuthenticated:a,logout:y,categories:b,setCategories:v,isProductFormActive:k,onAdd:()=>{O("add"),D(null)},onEdit:e=>{D(e),M(e._id),O("edit")},onDelete:e=>{let r=b.find(r=>r._id===e);r&&(D(r),B(e),T(!0))},flashMessage:N,setFlashMessage:A}),"add"===F&&(0,n.jsx)(g.default,{token:r,logout:y,categories:b,setCategories:v,onCancel:resetForm,isProductFormActive:k,mode:"add",setFlashMessageInParent:A}),"edit"===F&&L&&I&&(0,n.jsx)(g.default,{token:r,logout:y,categories:b,setCategories:v,category:L,editingCategoryId:I,onCancel:resetForm,isProductFormActive:k,mode:"edit",setFlashMessageInParent:A}),z&&R&&(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,n.jsx)("div",{className:"bg-white rounded-lg max-w-md",style:{backgroundColor:"var(--background-color)"},children:(0,n.jsx)(g.default,{token:r,logout:y,categories:b,setCategories:v,category:L,deleteCategoryId:R,onCancel:resetForm,isProductFormActive:k,mode:"delete",setFlashMessageInParent:A})})})]})}},52756:function(e,r,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Categories/categories",function(){return a(40449)}])},55785:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"}),n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 6h.008v.008H6V6Z"}))});r.A=d},62636:function(e,r,a){"use strict";let n,d;a.d(r,{l$:function(){return Fe},Ay:function(){return es}});var c,m=a(96540);let f={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||f},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,y=/\n+/g,o=(e,r)=>{let a="",n="",d="";for(let c in e){let m=e[c];"@"==c[0]?"i"==c[1]?a=c+" "+m+";":n+="f"==c[1]?o(m,c):c+"{"+o(m,"k"==c[1]?"":r)+"}":"object"==typeof m?n+=o(m,r?r.replace(/([^,])+/g,e=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):c):null!=m&&(c="-"==c[1]?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(c,m):c+":"+m+";")}return a+(r&&d?r+"{"+d+"}":d)+n},b={},i=e=>{if("object"==typeof e){let r="";for(let a in e)r+=a+i(e[a]);return r}return e},s=(e,r,a,n,d)=>{var c;let m=i(e),f=b[m]||(b[m]=(e=>{let r=0,a=11;for(;r<e.length;)a=101*a+e.charCodeAt(r++)>>>0;return"go"+a})(m));if(!b[f]){let r=m!==e?e:(e=>{let r,a,n=[{}];for(;r=g.exec(e.replace(h,""));)r[4]?n.shift():r[3]?(a=r[3].replace(y," ").trim(),n.unshift(n[0][a]=n[0][a]||{})):n[0][r[1]]=r[2].replace(y," ").trim();return n[0]})(e);b[f]=o(d?{["@keyframes "+f]:r}:r,a?"":"."+f)}let v=a&&b.g;return a&&(b.g=b[f]),c=b[f],v?r.data=r.data.replace(v,c):-1===r.data.indexOf(c)&&(r.data=n?c+r.data:r.data+c),f},p=(e,r,a)=>e.reduce((e,n,d)=>{let c=r[d];if(c&&c.call){let e=c(a),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;c=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+n+(null==c?"":c)},"");function u(e){let r=this||{},a=e.call?e(r.p):e;return s(a.unshift?a.raw?p(a,[].slice.call(arguments,1),r.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(r.p):a),{}):a,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let v,x,k,C=u.bind({k:1});function w(e,r){let a=this||{};return function(){let n=arguments;function l(d,c){let m=Object.assign({},d),f=m.className||l.className;a.p=Object.assign({theme:x&&x()},m),a.o=/go\d/.test(f),m.className=u.apply(a,n)+(f?" "+f:""),r&&(m.ref=c);let g=e;return e[0]&&(g=m.as||e,delete m.as),k&&g[0]&&k(m),v(g,m)}return r?r(l):l}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,j=(n=0,()=>(++n).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},N="default",H=(e,r)=>{let{toastLimit:a}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:n}=r;return H(e,{type:e.toasts.find(e=>e.id===n.id)?1:0,toast:n});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let c=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+c}))}}},A=[],F={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},Y=(e,r=N)=>{O[r]=H(O[r]||F,e),A.forEach(([e,a])=>{e===r&&a(O[r])})},_=e=>Object.keys(O).forEach(r=>Y(e,r)),Q=e=>Object.keys(O).find(r=>O[r].toasts.some(r=>r.id===e)),S=(e=N)=>r=>{Y(r,e)},L={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=N)=>{let[a,n]=(0,m.useState)(O[r]||F),d=(0,m.useRef)(O[r]);(0,m.useEffect)(()=>(d.current!==O[r]&&n(O[r]),A.push([r,n]),()=>{let e=A.findIndex(([e])=>e===r);e>-1&&A.splice(e,1)}),[r]);let c=a.toasts.map(r=>{var a,n,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(a=e[r.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(n=e[r.type])?void 0:n.duration)||(null==e?void 0:e.duration)||L[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...a,toasts:c}},ie=(e,r="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||j()}),P=e=>(r,a)=>{let n=ie(r,e,a);return S(n.toasterId||Q(n.id))({type:2,toast:n}),n.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let a={type:3,toastId:e};r?S(r)(a):_(a)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let a={type:4,toastId:e};r?S(r)(a):_(a)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,a)=>{let n=dist_n.loading(r.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:n,...a,...null==a?void 0:a.success}):dist_n.dismiss(n),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:n,...a,...null==a?void 0:a.error}):dist_n.dismiss(n)}),e};var D=1e3,dist_w=(e,r="default")=>{let{toasts:a,pausedAt:n}=V(e,r),d=(0,m.useRef)(new Map).current,c=(0,m.useCallback)((e,r=D)=>{if(d.has(e))return;let a=setTimeout(()=>{d.delete(e),f({type:4,toastId:e})},r);d.set(e,a)},[]);(0,m.useEffect)(()=>{if(n)return;let e=Date.now(),d=a.map(a=>{if(a.duration===1/0)return;let n=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(n<0){a.visible&&dist_n.dismiss(a.id);return}return setTimeout(()=>dist_n.dismiss(a.id,r),n)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[a,n,r]);let f=(0,m.useCallback)(S(r),[r]),g=(0,m.useCallback)(()=>{f({type:5,time:Date.now()})},[f]),h=(0,m.useCallback)((e,r)=>{f({type:1,toast:{id:e,height:r}})},[f]),y=(0,m.useCallback)(()=>{n&&f({type:6,time:Date.now()})},[n,f]),b=(0,m.useCallback)((e,r)=>{let{reverseOrder:n=!1,gutter:d=8,defaultPosition:c}=r||{},m=a.filter(r=>(r.position||c)===(e.position||c)&&r.height),f=m.findIndex(r=>r.id===e.id),g=m.filter((e,r)=>r<f&&e.visible).length;return m.filter(e=>e.visible).slice(...n?[g+1]:[0,g]).reduce((e,r)=>e+(r.height||0)+d,0)},[a]);return(0,m.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)c(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[a,c]),{toasts:a,handlers:{updateHeight:h,startPause:g,endPause:y,calculateOffset:b}}},I=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
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
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,W=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=C`
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
}`,X=w("div")`
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
    animation: ${U} 0.2s ease-out forwards;
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
`,q=w("div")`
  position: absolute;
`,G=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=C`
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
`,$=({toast:e})=>{let{icon:r,type:a,iconTheme:n}=e;return void 0!==r?"string"==typeof r?m.createElement(K,null,r):r:"blank"===a?null:m.createElement(G,null,m.createElement(B,{...n}),"loading"!==a&&m.createElement(q,null,"error"===a?m.createElement(T,{...n}):m.createElement(X,{...n})))},Re=e=>`
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
`,ke=(e,r)=>{let a=e.includes("top")?1:-1,[n,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(a),Ee(a)];return{animation:r?`${C(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=m.memo(({toast:e,position:r,style:a,children:n})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},c=m.createElement($,{toast:e}),f=m.createElement(et,{...e.ariaProps},dist_h(e.message,e));return m.createElement(ee,{className:e.className,style:{...d,...a,...e.style}},"function"==typeof n?n({icon:c,message:f}):m.createElement(m.Fragment,null,c,f))});c=m.createElement,o.p=void 0,v=c,x=void 0,k=void 0;var we=({id:e,className:r,style:a,onHeightUpdate:n,children:d})=>{let c=m.useCallback(r=>{if(r){let l=()=>{n(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return m.createElement("div",{ref:c,className:r,style:a},d)},Me=(e,r)=>{let a=e.includes("top"),n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...n}},ea=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:a,gutter:n,children:d,toasterId:c,containerStyle:f,containerClassName:g})=>{let{toasts:h,handlers:y}=dist_w(a,c);return m.createElement("div",{"data-rht-toaster":c||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...f},className:g,onMouseEnter:y.startPause,onMouseLeave:y.endPause},h.map(a=>{let c=a.position||r,f=Me(c,y.calculateOffset(a,{reverseOrder:e,gutter:n,defaultPosition:r}));return m.createElement(we,{id:a.id,key:a.id,onHeightUpdate:y.updateHeight,className:a.visible?ea:"",style:f},"custom"===a.type?dist_h(a.message,a):d?d(a):m.createElement(er,{toast:a,position:c}))}))},es=dist_n},63322:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))});r.A=d},78791:function(e,r,a){"use strict";a.r(r);var n=a(74848),d=a(96540);r.default=e=>{let{message:r,type:a,onClose:c,className:m=""}=e;return(0,d.useEffect)(()=>{let e=setTimeout(()=>{c()},5e3);return()=>clearTimeout(e)},[c]),(0,n.jsxs)("div",{className:"p-4 mb-6 rounded-xl shadow-sm border-t-4 ".concat("success"===a?"bg-green-50 border-green-500 text-green-700":"bg-red-50 border-red-500 text-red-700"," ").concat(m," relative"),role:"alert",children:[(0,n.jsx)("button",{onClick:c,className:"absolute top-2 right-2 text-lg hover:opacity-70 transition-opacity","aria-label":"Close message",children:"\xd7"}),(0,n.jsx)("p",{className:"pr-6",children:r})]})}},80794:function(e,r,a){"use strict";var n=a(96540);let d=n.forwardRef(function({title:e,titleId:r,...a},d){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":r},a),e?n.createElement("title",{id:r},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))});r.A=d}},function(e){e.O(0,[6177,6597,6593,636,8792],function(){return e(e.s=52756)}),_N_E=e.O()}]);