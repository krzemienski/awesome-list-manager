(()=>{var e={};e.id=52,e.ids=[52],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},5477:e=>{"use strict";e.exports=require("punycode")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},9796:e=>{"use strict";e.exports=require("zlib")},1984:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>d,routeModule:()=>x,tree:()=>c});var r=s(482),i=s(9108),a=s(2563),n=s.n(a),o=s(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["dashboard",{children:["lists",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,7332)),"/Users/nick/Desktop/alm/src/app/dashboard/lists/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,5950)),"/Users/nick/Desktop/alm/src/app/dashboard/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,1342)),"/Users/nick/Desktop/alm/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/nick/Desktop/alm/src/app/dashboard/lists/page.tsx"],u="/dashboard/lists/page",h={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/dashboard/lists/page",pathname:"/dashboard/lists",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6475:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2583,23)),Promise.resolve().then(s.t.bind(s,6840,23)),Promise.resolve().then(s.t.bind(s,8771,23)),Promise.resolve().then(s.t.bind(s,3225,23)),Promise.resolve().then(s.t.bind(s,9295,23)),Promise.resolve().then(s.t.bind(s,3982,23))},2586:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,1476,23)),Promise.resolve().then(s.bind(s,2481))},7897:(e,t,s)=>{Promise.resolve().then(s.bind(s,2481))},5303:()=>{},2481:(e,t,s)=>{"use strict";s.r(t),s.d(t,{AuthProvider:()=>d,useAuth:()=>u});var r=s(2295),i=s(3729),a=s(6755);let n="http://localhost:54321",o="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";if(!n||!o)throw Error("Missing Supabase environment variables");let l=(0,a.eI)(n,o),c=(0,i.createContext)(void 0);function d({children:e}){let[t,s]=(0,i.useState)(null),[a,n]=(0,i.useState)(!0);(0,i.useEffect)(()=>{l.auth.getSession().then(({data:{session:e}})=>{s(e?.user??null),n(!1)});let{data:{subscription:e}}=l.auth.onAuthStateChange((e,t)=>{s(t?.user??null)});return()=>e.unsubscribe()},[]);let o=async(e,t)=>{let{error:s}=await l.auth.signInWithPassword({email:e,password:t});if(s)throw s},d=async(e,t)=>{let{error:s}=await l.auth.signUp({email:e,password:t});if(s)throw s},u=async()=>{let{error:e}=await l.auth.signOut();if(e)throw e},h=async()=>{let{error:e}=await l.auth.signInWithOAuth({provider:"github",options:{redirectTo:`${window.location.origin}/auth/callback`}});if(e)throw e};return r.jsx(c.Provider,{value:{user:t,loading:a,signIn:o,signUp:d,signOut:u,githubSignIn:h},children:e})}function u(){let e=(0,i.useContext)(c);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},5950:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>y});var r=s(5036),i=s(3573),a=s(8052),n=s(9346),o=s(8739);function l(){let{user:e,signOut:t}=(0,i.a)();return(0,r.jsxs)("header",{className:"bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4",children:[r.jsx("div",{className:"flex items-center space-x-4",children:r.jsx("h1",{className:"text-xl font-semibold",children:"AwesomeListManager"})}),(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[r.jsx(a.z,{variant:"ghost",size:"icon",children:r.jsx(n.Z,{className:"h-5 w-5"})}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[r.jsx(o.Z,{className:"h-8 w-8"}),r.jsx("div",{children:r.jsx("p",{className:"text-sm font-medium",children:e?.email})})]}),r.jsx(a.z,{variant:"outline",onClick:()=>t(),children:"Sign out"})]})]})}var c=s(646),d=s.n(c),u=s(4551),h=s(2245),x=s(2947),m=s(5365),p=s(7781),g=s(753),b=s(6506);let f=[{name:"Dashboard",href:"/dashboard",icon:x.Z},{name:"Lists",href:"/dashboard/lists",icon:m.Z},{name:"Repositories",href:"/dashboard/repositories",icon:p.Z},{name:"Analytics",href:"/dashboard/analytics",icon:g.Z},{name:"Settings",href:"/dashboard/settings",icon:b.Z}];function v(){let e=(0,u.usePathname)();return(0,r.jsxs)("div",{className:"w-64 bg-gray-900 text-white",children:[r.jsx("div",{className:"h-16 flex items-center justify-center border-b border-gray-800",children:r.jsx("span",{className:"text-xl font-bold",children:"ALM"})}),r.jsx("nav",{className:"mt-5 px-2",children:r.jsx("div",{className:"space-y-1",children:f.map(t=>{let s=t.icon;return(0,r.jsxs)(d(),{href:t.href,className:(0,h.cn)("group flex items-center px-2 py-2 text-sm font-medium rounded-md",e===t.href?"bg-gray-800 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),children:[r.jsx(s,{className:(0,h.cn)("mr-3 h-5 w-5",e===t.href?"text-white":"text-gray-400 group-hover:text-gray-300")}),t.name]},t.name)})})})]})}function y({children:e}){return(0,r.jsxs)("div",{className:"h-screen flex",children:[r.jsx(v,{}),(0,r.jsxs)("div",{className:"flex-1 flex flex-col",children:[r.jsx(l,{}),r.jsx("main",{className:"flex-1 overflow-y-auto bg-gray-50 p-4",children:e})]})]})}},7332:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var r=s(5036),i=s(8052);/**
 * @license lucide-react v0.298.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(9508).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var n=s(5365);function o(){return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsxs)("div",{children:[r.jsx("h2",{className:"text-2xl font-bold",children:"AwesomeLists"}),r.jsx("p",{className:"text-gray-600",children:"Manage and organize your curated lists"})]}),(0,r.jsxs)(i.z,{children:[r.jsx(a,{className:"mr-2 h-4 w-4"}),"Create New List"]})]}),r.jsx("div",{className:"bg-white rounded-lg shadow",children:r.jsx("div",{className:"p-6",children:(0,r.jsxs)("div",{className:"text-center py-12",children:[r.jsx(n.Z,{className:"mx-auto h-12 w-12 text-gray-400"}),r.jsx("h3",{className:"mt-2 text-lg font-medium text-gray-900",children:"No lists created"}),r.jsx("p",{className:"mt-1 text-sm text-gray-500",children:"Get started by creating your first AwesomeList."}),r.jsx("div",{className:"mt-6",children:(0,r.jsxs)(i.z,{children:[r.jsx(a,{className:"mr-2 h-4 w-4"}),"Create New List"]})})]})})})]})}},1342:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l,metadata:()=>o});var r=s(5036),i=s(2195),a=s.n(i),n=s(3573);s(4315);let o={title:"AwesomeListManager",description:"A modern platform for managing AwesomeLists"};function l({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{className:a().className,children:r.jsx(n.H,{children:r.jsx("main",{className:"min-h-screen bg-background",children:e})})})})}},8052:(e,t,s)=>{"use strict";s.d(t,{z:()=>c});var r=s(5036),i=s(2),a=s(9048),n=s(4467),o=s(2245);let l=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=i.forwardRef(({className:e,variant:t,size:s,asChild:i=!1,...n},c)=>{let d=i?a.g7:"button";return r.jsx(d,{className:(0,o.cn)(l({variant:t,size:s,className:e})),ref:c,...n})});c.displayName="Button"},3573:(e,t,s)=>{"use strict";s.d(t,{H:()=>o,a:()=>l});var r=s(6843);let i=(0,r.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx`),{__esModule:a,$$typeof:n}=i;i.default;let o=(0,r.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx#AuthProvider`),l=(0,r.createProxy)(String.raw`/Users/nick/Desktop/alm/src/lib/auth/AuthContext.tsx#useAuth`)},2245:(e,t,s)=>{"use strict";s.d(t,{cn:()=>a});var r=s(1554),i=s(1774);function a(...e){return(0,i.m6)((0,r.W)(e))}},4315:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[225,316,586],()=>s(1984));module.exports=r})();