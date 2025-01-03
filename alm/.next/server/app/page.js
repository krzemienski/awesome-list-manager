(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},5477:e=>{"use strict";e.exports=require("punycode")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},9796:e=>{"use strict";e.exports=require("zlib")},3435:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>c,routeModule:()=>h,tree:()=>l});var s=r(482),i=r(9108),n=r(2563),a=r.n(n),o=r(8300),u={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>o[e]);r.d(t,u);let l=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1136)),"/Users/nick/Desktop/alm/src/app/page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1342)),"/Users/nick/Desktop/alm/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/nick/Desktop/alm/src/app/page.tsx"],d="/page",p={require:r,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},6475:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},7897:(e,t,r)=>{Promise.resolve().then(r.bind(r,2481))},5303:()=>{},2481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{AuthProvider:()=>c,useAuth:()=>d});var s=r(2295),i=r(3729),n=r(6755);let a="http://localhost:54321",o="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";if(!a||!o)throw Error("Missing Supabase environment variables");let u=(0,n.eI)(a,o),l=(0,i.createContext)(void 0);function c({children:e}){let[t,r]=(0,i.useState)(null),[n,a]=(0,i.useState)(!0);(0,i.useEffect)(()=>{u.auth.getSession().then(({data:{session:e}})=>{r(e?.user??null),a(!1)});let{data:{subscription:e}}=u.auth.onAuthStateChange((e,t)=>{r(t?.user??null)});return()=>e.unsubscribe()},[]);let o=async(e,t)=>{let{error:r}=await u.auth.signInWithPassword({email:e,password:t});if(r)throw r},c=async(e,t)=>{let{error:r}=await u.auth.signUp({email:e,password:t});if(r)throw r},d=async()=>{let{error:e}=await u.auth.signOut();if(e)throw e},p=async()=>{let{error:e}=await u.auth.signInWithOAuth({provider:"github",options:{redirectTo:`${window.location.origin}/auth/callback`}});if(e)throw e};return s.jsx(l.Provider,{value:{user:t,loading:n,signIn:o,signUp:c,signOut:d,githubSignIn:p},children:e})}function d(){let e=(0,i.useContext)(l);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},1342:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>o});var s=r(5036),i=r(2195),n=r.n(i),a=r(3573);r(4315);let o={title:"AwesomeListManager",description:"A modern platform for managing AwesomeLists"};function u({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{className:n().className,children:s.jsx(a.H,{children:s.jsx("main",{className:"min-h-screen bg-background",children:e})})})})}},1136:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(5036);function i(){return(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[s.jsx("h1",{className:"text-4xl font-bold mb-8",children:"Welcome to AwesomeListManager"}),s.jsx("p",{className:"text-lg text-gray-600",children:"A modern platform for managing and curating AwesomeLists"})]})}},3573:(e,t,r)=>{"use strict";r.d(t,{H:()=>o,a:()=>u});var s=r(6843);let i=(0,s.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx`),{__esModule:n,$$typeof:a}=i;i.default;let o=(0,s.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx#AuthProvider`),u=(0,s.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx#useAuth`)},4315:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[225,316],()=>r(3435));module.exports=s})();