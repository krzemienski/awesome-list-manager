"use strict";(()=>{var e={};e.id=891,e.ids=[891],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2361:e=>{e.exports=require("events")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},1808:e=>{e.exports=require("net")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},4404:e=>{e.exports=require("tls")},7310:e=>{e.exports=require("url")},9796:e=>{e.exports=require("zlib")},7750:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>_,originalPathname:()=>m,patchFetch:()=>y,requestAsyncStorage:()=>h,routeModule:()=>g,serverHooks:()=>x,staticGenerationAsyncStorage:()=>f,staticGenerationBailout:()=>q});var s={};t.r(s),t.d(s,{GET:()=>l,POST:()=>d,PUT:()=>p});var i=t(5419),o=t(9108),a=t(9678),n=t(8070),u=t(7699),c=t(2455);async function d(e,{params:r}){try{let t=(0,u.createRouteHandlerClient)({cookies:c.cookies}),{data:{session:s}}=await t.auth.getSession();if(!s)return n.Z.json({error:"Unauthorized"},{status:401});let{name:i,description:o,parent_category_id:a,order:d}=await e.json();if(!i)return n.Z.json({error:"Name is required"},{status:400});let{data:l}=await t.from("lists").select("user_id").eq("id",r.listId).single();if(!l||l.user_id!==s.user.id)return n.Z.json({error:"Unauthorized"},{status:401});let{data:p,error:g}=await t.from("categories").insert({list_id:r.listId,name:i,description:o,parent_category_id:a,order:d||0}).select(`
        *,
        parent_category:categories(
          id,
          name
        )
      `).single();if(g)throw g;return n.Z.json(p)}catch(e){return console.error("Error creating category:",e),n.Z.json({error:"Internal server error"},{status:500})}}async function l(e,{params:r}){try{let e=(0,u.createRouteHandlerClient)({cookies:c.cookies}),{listId:t}=r,{data:s,error:i}=await e.from("lists").select("user_id").eq("id",t).single();if(i||!s)return n.Z.json({error:"List not found"},{status:404});let{data:o,error:a}=await e.from("categories").select(`
        *,
        parent_category:categories(
          id,
          name
        ),
        links(count)
      `).eq("list_id",t).order("parent_category_id",{ascending:!0,nullsFirst:!0}).order("order",{ascending:!0});if(a)return n.Z.json({error:"Failed to fetch categories"},{status:500});let d=new Map,l=[];return o?.forEach(e=>{d.set(e.id,{...e,children:[]})}),o?.forEach(e=>{let r=d.get(e.id);if(r){if(e.parent_category_id){let t=d.get(e.parent_category_id);t&&(t.children=t.children||[],t.children.push(r))}else l.push(r)}}),n.Z.json(l)}catch(e){return console.error("Error fetching categories:",e),n.Z.json({error:"Internal server error"},{status:500})}}async function p(e,{params:r}){try{let t=(0,u.createRouteHandlerClient)({cookies:c.cookies}),{data:{session:s}}=await t.auth.getSession();if(!s)return n.Z.json({error:"Unauthorized"},{status:401});let{categories:i}=await e.json(),{data:o}=await t.from("lists").select("user_id").eq("id",r.listId).single();if(!o||o.user_id!==s.user.id)return n.Z.json({error:"Unauthorized"},{status:401});let{data:a,error:d}=await t.rpc("update_category_orders",{list_id:r.listId,category_updates:i.map(e=>({id:e.id,parent_id:e.parent_category_id,new_order:e.order}))});if(d)throw d;return n.Z.json({success:!0})}catch(e){return console.error("Error updating categories:",e),n.Z.json({error:"Internal server error"},{status:500})}}let g=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/lists/[listId]/categories/route",pathname:"/api/lists/[listId]/categories",filename:"route",bundlePath:"app/api/lists/[listId]/categories/route"},resolvedPagePath:"/Users/nick/Desktop/alm/src/app/api/lists/[listId]/categories/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:h,staticGenerationAsyncStorage:f,serverHooks:x,headerHooks:_,staticGenerationBailout:q}=g,m="/api/lists/[listId]/categories/route";function y(){return(0,a.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:f})}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[225,280],()=>t(7750));module.exports=s})();