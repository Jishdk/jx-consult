import{u as p,a as x,b as m,c as S,r as i,_ as f,j as e,O as w,M as j,L as g,S as M}from"./components-CaO5HL_p.js";/**
 * @remix-run/react v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function k({getKey:t,...l}){let{isSpaMode:c}=p(),o=x(),u=m();S({getKey:t,storageKey:a});let d=i.useMemo(()=>{if(!t)return null;let s=t(o,u);return s!==o.key?s:null},[]);if(c)return null;let h=((s,y)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[y||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",f({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${h})(${JSON.stringify(a)}, ${JSON.stringify(d)})`}}))}const L="/assets/index-BMDu8V27.css",R=()=>[{rel:"stylesheet",href:L}];function _({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(j,{}),e.jsx(g,{})]}),e.jsxs("body",{children:[t,e.jsx(k,{}),e.jsx(M,{})]})]})}function b(){return e.jsx(w,{})}export{_ as Layout,b as default,R as links};
