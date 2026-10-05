import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(process.argv[2]);const port=+process.argv[3]||8790;
const T={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.xml':'application/xml','.txt':'text/plain','.ico':'image/x-icon','.webmanifest':'application/manifest+json','.woff2':'font/woff2','.mp4':'video/mp4'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(root,p);if(!f.startsWith(root)){r.writeHead(403);return r.end()}
try{if(fs.statSync(f).isDirectory())f=path.join(f,'index.html')}catch{}
fs.readFile(f,(e,d)=>{if(e){const nf=path.join(root,'404.html');r.writeHead(404,{'content-type':T['.html']});return r.end(fs.existsSync(nf)?fs.readFileSync(nf):'404')}r.writeHead(200,{'content-type':T[path.extname(f).toLowerCase()]||'application/octet-stream','cache-control':'no-store'});r.end(d)})}).listen(port,()=>console.log('serving '+root+' on '+port));
