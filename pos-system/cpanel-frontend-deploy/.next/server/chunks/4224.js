"use strict";exports.id=4224,exports.ids=[4224],exports.modules={483:(e,r,a)=>{a.d(r,{A:()=>s});var t=a(4722);let s=(0,t.A)("chart-column",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]])},3893:(e,r,a)=>{a.d(r,{A:()=>s});var t=a(4722);let s=(0,t.A)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]])},4722:(e,r,a)=>{a.d(r,{A:()=>createLucideIcon});var t=a(2015);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),toCamelCase=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase()),toPascalCase=e=>{let r=toCamelCase(e);return r.charAt(0).toUpperCase()+r.slice(1)},mergeClasses=(...e)=>e.filter((e,r,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===r).join(" ").trim(),hasA11yProp=e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:l="",children:i,iconNode:c,...d},n)=>(0,t.createElement)("svg",{ref:n,...s,width:r,height:r,stroke:e,strokeWidth:o?24*Number(a)/Number(r):a,className:mergeClasses("lucide",l),...!i&&!hasA11yProp(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(i)?i:[i]])),createLucideIcon=(e,r)=>{let a=(0,t.forwardRef)(({className:a,...s},l)=>(0,t.createElement)(o,{ref:l,iconNode:r,className:mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`,`lucide-${e}`,a),...s}));return a.displayName=toPascalCase(e),a}}};