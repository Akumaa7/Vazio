const V='vazio-v2',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.hostname.endsWith('supabase.co'))return;
e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
const net=fetch(r).then(res=>{if(res&&(res.ok||res.type=='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
return hit||(await net)||(r.mode=='navigate'?c.match('./index.html'):Response.error())}))});
