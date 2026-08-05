
/* ============================================================
   0 · UTIL
   ============================================================ */
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const rs=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const FREE_AT=4999;
const COUPONS={WELCOME10:{type:'pct',v:10,min:3000},PLANET:{type:'ship',v:0,min:0}};
const uid=()=>Math.random().toString(36).slice(2,9);

/* ============================================================
   1 · PRODUCT DATA
   ============================================================ */
const C={
  black:{name:'Black',hex:'#1B1B1E'}, bone:{name:'Bone',hex:'#EDEAE3'},
  olive:{name:'Olive',hex:'#5B5C46'}, rust:{name:'Rust',hex:'#8A4A34'},
  navy:{name:'Navy',hex:'#232A3A'}, grey:{name:'Grey',hex:'#6C6C70'},
  sand:{name:'Sand',hex:'#C7B79A'}, indigo:{name:'Indigo',hex:'#2B3550'}
};
const SZ_APP=['XS','S','M','L','XL','XXL'];
const SZ_ONE=['One Size'];

const PRODUCTS=[
{id:'UP-001',name:'Wool Overcoat',cat:'outerwear',price:14500,tag:'Bestseller',type:'coat',
 colors:['black','navy','sand'],sizes:SZ_APP,fabric:'80% wool, 20% nylon',fit:'Relaxed, below-knee',
 desc:'A double-breasted overcoat cut long and left uncomplicated — one silhouette, worn from October through March.'},
{id:'UP-002',name:'Nylon Field Jacket',cat:'outerwear',price:9800,tag:null,type:'jacket',
 colors:['black','olive','grey'],sizes:SZ_APP,fabric:'Ripstop nylon, taffeta lining',fit:'Regular, cropped hem',
 desc:'Four-pocket field jacket in weather-resistant ripstop, built for a commute that includes weather.'},
{id:'UP-003',name:'Shearling Bomber',cat:'outerwear',price:17200,tag:'Limited',type:'bomber',
 colors:['black','sand'],sizes:SZ_APP,fabric:'Suede shell, shearling lining',fit:'Boxy',
 desc:'Small batch, suede shell over genuine shearling. Once the run sells out, it does not come back.'},
{id:'UP-004',name:'Rain Trench',cat:'outerwear',price:11200,compareAt:13500,tag:null,type:'trench',
 colors:['black','navy'],sizes:SZ_APP,fabric:'Bonded cotton, taped seams',fit:'Long, belted',
 desc:'Fully taped seams under a belted trench line — the only outerwear that survives a monsoon commute.'},
{id:'UP-005',name:'Merino Crewneck',cat:'knitwear',price:5200,tag:'New',type:'sweater',
 colors:['black','bone','olive','grey'],sizes:SZ_APP,fabric:'100% merino wool',fit:'Regular',
 desc:'Fine-gauge merino in a plain crew — the sweater you reach for on every mid-temperature day.'},
{id:'UP-006',name:'Cable Knit Cardigan',cat:'knitwear',price:6400,tag:null,type:'cardigan',
 colors:['bone','navy','rust'],sizes:SZ_APP,fabric:'Cotton-wool blend',fit:'Relaxed',
 desc:'A heavier cable knit that opens flat down the front — layer over a tee or wear alone, buttoned.'},
{id:'UP-007',name:'Half-Zip Knit',cat:'knitwear',price:5800,tag:null,type:'halfzip',
 colors:['black','grey','indigo'],sizes:SZ_APP,fabric:'Wool-blend knit',fit:'Regular',
 desc:'A quarter-zip knit that reads dressed-up over a collar and dressed-down over nothing at all.'},
{id:'UP-008',name:'Cashmere Turtleneck',cat:'knitwear',price:8900,tag:'Bestseller',type:'turtleneck',
 colors:['black','bone','navy'],sizes:SZ_APP,fabric:'100% cashmere',fit:'Slim',
 desc:'Two-ply cashmere, close to the body, high enough at the neck to skip a scarf entirely.'},
{id:'UP-009',name:'Straight Raw Denim',cat:'denim',price:6200,tag:null,type:'jeans',
 colors:['indigo'],sizes:SZ_APP,fabric:'14oz raw selvedge',fit:'Straight',
 desc:'Unwashed 14oz selvedge that breaks in around you — expect it to fade exactly where you sit and walk.'},
{id:'UP-010',name:'Tapered Black Denim',cat:'denim',price:6200,tag:'Bestseller',type:'jeans',
 colors:['black'],sizes:SZ_APP,fabric:'Stretch denim',fit:'Tapered',
 desc:'Garment-dyed black with a two-percent stretch — the one pair that goes from studio to dinner.'},
{id:'UP-011',name:'Wide-Leg Denim',cat:'denim',price:6800,tag:'New',type:'jeans',
 colors:['indigo','black'],sizes:SZ_APP,fabric:'Rigid cotton denim',fit:'Wide',
 desc:'A relaxed, wide leg cut high on the waist. Sits heavy, drapes straight, no taper at the ankle.'},
{id:'UP-012',name:'Denim Trucker Jacket',cat:'denim',price:7600,tag:null,type:'jacket',
 colors:['indigo','black'],sizes:SZ_APP,fabric:'12oz cotton denim',fit:'Boxy',
 desc:'Classic trucker proportions in 12oz cotton — sized to layer a knit underneath without pulling.'},
{id:'UP-013',name:'Heavyweight Tee',cat:'basics',price:2200,tag:null,type:'tee',
 colors:['black','bone','olive','navy','grey'],sizes:SZ_APP,fabric:'240gsm combed cotton',fit:'Regular',
 desc:'240gsm cotton, garment-washed once so it arrives already broken in and holds its shape after.'},
{id:'UP-014',name:'Long Sleeve Tee',cat:'basics',price:2600,compareAt:3000,tag:null,type:'tee',
 colors:['black','bone','grey'],sizes:SZ_APP,fabric:'220gsm combed cotton',fit:'Regular',
 desc:'The same cotton as the heavyweight tee, run through in long sleeve for the in-between months.'},
{id:'UP-015',name:'Boxy Crop Tee',cat:'basics',price:2100,tag:'New',type:'tee',
 colors:['black','bone','rust'],sizes:SZ_APP,fabric:'240gsm combed cotton',fit:'Boxy, cropped',
 desc:'A shorter, boxier body on the same heavyweight cotton — cut to sit right at the waistband.'},
{id:'UP-016',name:'Pleated Trouser',cat:'basics',price:5400,tag:null,type:'trouser',
 colors:['black','sand','navy'],sizes:SZ_APP,fabric:'Wool-blend twill',fit:'Tapered, pleated',
 desc:'Single-pleat trousers with a tapered leg — dressy enough for a desk, easy enough for everything else.'},
{id:'UP-017',name:'Utility Cargo Pant',cat:'basics',price:5800,tag:'New',type:'trouser',
 colors:['black','olive','grey'],sizes:SZ_APP,fabric:'Cotton ripstop',fit:'Relaxed, tapered',
 desc:'Six pockets, none of them decorative. A relaxed leg that tapers just enough to stay out of your way.'},
{id:'UP-018',name:'Canvas Tote',cat:'accessories',price:2400,tag:null,type:'bag',
 colors:['bone','black','olive'],sizes:SZ_ONE,fabric:'16oz waxed canvas',fit:'One size',
 desc:'Waxed canvas that only looks better as it scuffs — a strap long enough to wear cross-body.'},
{id:'UP-019',name:'Wool Beanie',cat:'accessories',price:1600,tag:null,type:'cap',
 colors:['black','bone','rust','navy'],sizes:SZ_ONE,fabric:'Merino wool rib knit',fit:'One size',
 desc:'A close-ribbed merino beanie, unlined, sized to sit above the ears without a fold.'},
{id:'UP-020',name:'Leather Belt',cat:'accessories',price:3200,tag:'Bestseller',type:'belt',
 colors:['black','sand'],sizes:SZ_ONE,fabric:'Full-grain leather',fit:'One size, cut to fit',
 desc:'Full-grain leather on a solid brass buckle. Sold uncut — trim it to your exact waist at home.'}
];
const byId=id=>PRODUCTS.find(p=>p.id===id);
const CATS=[['outerwear','Outerwear'],['knitwear','Knitwear'],['denim','Denim'],['basics','Basics'],['accessories','Accessories']];

/* ============================================================
   2 · LINE-ART GENERATOR
   Every garment is drawn as a flat geometric silhouette with a
   single gold "pin" mark — the same coordinate-pin motif used
   for store locations — as the brand's consistent signature.
   ============================================================ */
const PIN='<g><line x1="162" y1="28" x2="176" y2="14" stroke="#C9A227" stroke-width="1.3"/><circle cx="176" cy="14" r="2.6" fill="#C9A227"/></g>';
const ART={
  coat:`<path d="M100 34 L72 54 L60 224 L140 224 L128 54 Z"/><path d="M100 34 L84 18 M100 34 L116 18"/><line x1="60" y1="150" x2="140" y2="150"/><line x1="100" y1="34" x2="100" y2="224" stroke-dasharray="2 6"/><circle cx="100" cy="78" r="1.5" fill="currentColor"/><circle cx="100" cy="108" r="1.5" fill="currentColor"/><circle cx="100" cy="138" r="1.5" fill="currentColor"/>`,
  jacket:`<path d="M100 36 L70 56 L62 168 L138 168 L130 56 Z"/><path d="M100 36 L86 20 M100 36 L114 20"/><line x1="100" y1="36" x2="100" y2="168" stroke-dasharray="2 6"/><rect x="72" y="118" width="22" height="15"/><rect x="106" y="118" width="22" height="15"/>`,
  bomber:`<path d="M100 38 L66 58 L60 166 L140 166 L134 58 Z"/><rect x="84" y="22" width="32" height="14" rx="3"/><line x1="60" y1="158" x2="140" y2="158"/><line x1="60" y1="163" x2="140" y2="163"/><line x1="100" y1="38" x2="100" y2="166" stroke-dasharray="2 6"/>`,
  trench:`<path d="M100 30 L64 56 L50 230 L150 230 L136 56 Z"/><path d="M100 30 L76 14 M100 30 L124 14"/><line x1="50" y1="148" x2="150" y2="148"/><rect x="90" y="144" width="20" height="9"/><line x1="100" y1="30" x2="100" y2="230" stroke-dasharray="2 6"/>`,
  sweater:`<path d="M100 40 C88 40 80 30 78 20 L58 52 L52 178 L148 178 L142 52 L122 20 C120 30 112 40 100 40Z"/><line x1="52" y1="168" x2="148" y2="168"/>`,
  cardigan:`<path d="M100 42 L78 20 L58 52 L52 178 L96 178 L100 60 L104 178 L148 178 L142 52 L122 20 Z"/><line x1="100" y1="60" x2="100" y2="178"/><circle cx="100" cy="90" r="1.4" fill="currentColor"/><circle cx="100" cy="115" r="1.4" fill="currentColor"/><circle cx="100" cy="140" r="1.4" fill="currentColor"/><line x1="52" y1="168" x2="96" y2="168"/><line x1="104" y1="168" x2="148" y2="168"/>`,
  halfzip:`<path d="M100 40 C88 40 80 30 78 20 L58 52 L52 178 L148 178 L142 52 L122 20 C120 30 112 40 100 40Z"/><rect x="92" y="20" width="16" height="10" rx="2"/><line x1="100" y1="30" x2="100" y2="55"/><line x1="52" y1="168" x2="148" y2="168"/>`,
  turtleneck:`<path d="M100 46 C92 46 86 40 86 32 C86 40 84 44 78 48 L58 56 L52 178 L148 178 L142 56 L122 48 C116 44 114 40 114 32 C114 40 108 46 100 46Z"/><path d="M86 34 Q100 40 114 34"/><line x1="52" y1="168" x2="148" y2="168"/>`,
  jeans:`<path d="M76 30 L60 226 L92 226 L100 110 L108 226 L140 226 L124 30 Z"/><line x1="76" y1="30" x2="124" y2="30"/><line x1="100" y1="30" x2="100" y2="90" stroke-dasharray="2 6"/><line x1="70" y1="70" x2="86" y2="66"/><line x1="130" y1="70" x2="114" y2="66"/>`,
  trouser:`<path d="M78 30 L64 224 L94 224 L100 120 L106 224 L136 224 L122 30 Z"/><line x1="78" y1="30" x2="122" y2="30"/><line x1="82" y1="38" x2="90" y2="30" stroke-dasharray="1 4"/><line x1="118" y1="38" x2="110" y2="30" stroke-dasharray="1 4"/><line x1="100" y1="30" x2="100" y2="100" stroke-dasharray="2 6"/>`,
  tee:`<path d="M100 40 L82 24 L58 40 L66 58 L78 50 L78 190 L122 190 L122 50 L134 58 L142 40 L118 24 Z"/><path d="M84 26 Q100 38 116 26"/>`,
  bag:`<path d="M62 92 L70 200 L130 200 L138 92 Z"/><path d="M78 92 C78 66 84 52 100 52 C116 52 122 66 122 92"/><line x1="62" y1="112" x2="138" y2="112"/>`,
  cap:`<path d="M60 130 C60 76 76 44 100 44 C124 44 140 76 140 130 Z"/><line x1="60" y1="118" x2="140" y2="118"/><line x1="60" y1="128" x2="140" y2="128"/>`,
  belt:`<rect x="30" y="112" width="120" height="16" rx="2"/><rect x="148" y="104" width="26" height="32" rx="3"/><circle cx="161" cy="120" r="4"/><circle cx="46" cy="120" r="1.6" fill="currentColor"/><circle cx="60" cy="120" r="1.6" fill="currentColor"/><circle cx="74" cy="120" r="1.6" fill="currentColor"/>`
};
const UNSPLASH = {
  coat: '1539533113208-f6df8cc8b543',
  jacket: '1559551409-dadc959f76b8',
  bomber: '1559551409-dadc959f76b8',
  trench: '1520854221256-17451cc331bf',
  sweater: '1596755095609-ed3736d0126a',
  cardigan: '1620799140408-edc6dcb6d633',
  halfzip: '1556821840-3a63f95609a7',
  turtleneck: '1556821840-3a63f95609a7',
  jeans: '1541099649105-f69ad21f3246',
  trouser: '1624378439575-d8705ad7ae80',
  tee: '1521572163474-6864f9cf17ab',
  bag: '1590874103328-eac38a683ce7',
  cap: '1588850561407-ed78c282e89b',
  belt: '1553062407-98eeb64c6a62'
};
function art(type){
  const imgId = UNSPLASH[type] || '1521572163474-6864f9cf17ab';
  return `<img src="https://images.unsplash.com/photo-${imgId}?w=500&h=600&fit=crop" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="${type}">`;
}

/* ============================================================
   3 · STATE
   ============================================================ */

function saveState(){
  localStorage.setItem('up_cart',JSON.stringify(S.cart));
  localStorage.setItem('up_wish',JSON.stringify(S.wish));
}
const S={
  cart:JSON.parse(localStorage.getItem('up_cart')||'[]'),        // {id,size,colour,qty}
  wish:JSON.parse(localStorage.getItem('up_wish')||'[]'),        // [id]
  coupon:null,
  co:1,           // checkout step
  orderNo:'',paid:'',total:0,
  filters:{cats:[],max:18000,sort:'feat'},
  pd:{id:null,size:null,colour:null,qty:1}, // active product-page selection
};
function toast(msg){
  const t=$('#toast');t.textContent=msg;t.classList.add('on');
  clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('on'),2600);
}
function badges(){
  const cc=S.cart.reduce((a,l)=>a+l.qty,0);
  const wb=$('#wishCnt'),cb=$('#cartCnt');
  wb.textContent=S.wish.length;wb.style.display=S.wish.length?'grid':'none';
  cb.textContent=cc;cb.style.display=cc?'grid':'none';
}

/* ============================================================
   4 · THREE.JS — night-lights globe (hero signature)
   ============================================================ */
let globeState=null;
function initGlobe(canvas){
  destroyGlobe();
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(46,canvas.clientWidth/canvas.clientHeight,0.1,100);
  camera.position.set(0,0,7.2);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);

  const group=new THREE.Group();
  scene.add(group);

  // dot-glow sprite texture
  const spCanvas=document.createElement('canvas');spCanvas.width=64;spCanvas.height=64;
  const sctx=spCanvas.getContext('2d');
  const grad=sctx.createRadialGradient(32,32,0,32,32,32);
  grad.addColorStop(0,'rgba(255,220,140,1)');grad.addColorStop(.4,'rgba(201,162,39,.9)');grad.addColorStop(1,'rgba(201,162,39,0)');
  sctx.fillStyle=grad;sctx.fillRect(0,0,64,64);
  const dotTex=new THREE.CanvasTexture(spCanvas);

  // globe "city light" points — clustered near a few bands to look like coastlines/cities
  const N=1400;
  const pos=new Float32Array(N*3);
  const R=2.35;
  let k=0;
  while(k<N){
    const u=Math.random(),v=Math.random();
    const theta=2*Math.PI*u, phi=Math.acos(2*v-1);
    // bias density using layered noise-ish bands so it doesn't look uniform
    const band=Math.sin(phi*3.1+u*6)*0.5+Math.sin(theta*2.2)*0.3;
    if(Math.random()>0.62+band*0.18) continue;
    const x=R*Math.sin(phi)*Math.cos(theta);
    const y=R*Math.cos(phi);
    const z=R*Math.sin(phi)*Math.sin(theta);
    pos[k*3]=x;pos[k*3+1]=y;pos[k*3+2]=z;k++;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos.slice(0,k*3),3));
  const mat=new THREE.PointsMaterial({size:.05,map:dotTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,color:0xE8C468});
  const points=new THREE.Points(geo,mat);
  group.add(points);

  // faint wireframe sphere shell
  const shellGeo=new THREE.SphereGeometry(2.35,28,20);
  const shellMat=new THREE.MeshBasicMaterial({color:0x8FA8B8,wireframe:true,transparent:true,opacity:.05});
  group.add(new THREE.Mesh(shellGeo,shellMat));

  // outer starfield
  const SN=500;const spos=new Float32Array(SN*3);
  for(let i=0;i<SN;i++){
    const r=9+Math.random()*10;
    const t=2*Math.PI*Math.random(),p=Math.acos(2*Math.random()-1);
    spos[i*3]=r*Math.sin(p)*Math.cos(t);spos[i*3+1]=r*Math.cos(p);spos[i*3+2]=r*Math.sin(p)*Math.sin(t);
  }
  const sgeo=new THREE.BufferGeometry();sgeo.setAttribute('position',new THREE.BufferAttribute(spos,3));
  const smat=new THREE.PointsMaterial({size:.035,color:0xEDEAE3,transparent:true,opacity:.35});
  scene.add(new THREE.Points(sgeo,smat));

  let mx=0,my=0,tx=0,ty=0;
  function onMove(e){
    const r=canvas.getBoundingClientRect();
    mx=((e.clientX-r.left)/r.width-.5);
    my=((e.clientY-r.top)/r.height-.5);
  }
  window.addEventListener('mousemove',onMove);

  let raf;
  function tick(){
    tx+=(mx-tx)*.03; ty+=(my-ty)*.03;
    group.rotation.y+=.0018;
    group.rotation.y+= tx*0.002;
    group.rotation.x = -ty*0.35 + Math.sin(Date.now()*0.00005)*0.05;
    renderer.render(scene,camera);
    raf=requestAnimationFrame(tick);
  }
  tick();
  canvas.classList.add('ready');

  function onResize(){
    const w=canvas.clientWidth,h=canvas.clientHeight;
    if(!w||!h)return;
    camera.aspect=w/h;camera.updateProjectionMatrix();
    renderer.setSize(w,h,false);
  }
  window.addEventListener('resize',onResize);

  globeState={raf,onMove,onResize,renderer};
}
function destroyGlobe(){
  if(!globeState)return;
  cancelAnimationFrame(globeState.raf);
  window.removeEventListener('mousemove',globeState.onMove);
  window.removeEventListener('resize',globeState.onResize);
  globeState.renderer.dispose();
  globeState=null;
}

/* ============================================================
   5 · SHARED RENDER HELPERS
   ============================================================ */
function priceHTML(p){
  return p.compareAt?`<span class="pcard__price"><s>${rs(p.compareAt)}</s>${rs(p.price)}</span>`:`<span class="pcard__price">${rs(p.price)}</span>`;
}
function productCard(p,i){
  const wished=S.wish.includes(p.id);
  return `<article class="pcard rv" style="--i:${i%8}">
    <div class="pcard__art" data-qv="${p.id}">
      <div class="pcard__tags">${p.tag?`<span class="tag tag--gold">${p.tag}</span>`:''}${p.compareAt?`<span class="tag" style="color:var(--err);border-color:var(--err)">Sale</span>`:''}</div>
      <button class="pcard__wish ${wished?'on':''}" data-wish="${p.id}" aria-label="Save">
        <svg viewBox="0 0 24 24" fill="${wished?'currentColor':'none'}" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4 6 4c2.2 0 3.8 1.2 6 3.6C14.2 5.2 15.8 4 18 4c4 0 5.6 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>
      </button>
      ${art(p.type)}
      <div class="pcard__qv"><button class="btn btn--solid btn--full btn--sm" data-qv="${p.id}">Quick view</button></div>
    </div>
    <a href="#/product/${p.id}" class="pcard__body">
      <span class="coord">${p.id}</span>
      <h4>${p.name}</h4>
      <div class="pcard__meta">
        ${priceHTML(p)}
        <div class="pcard__swatches">${p.colors.slice(0,4).map(c=>`<i style="background:${C[c].hex}"></i>`).join('')}</div>
      </div>
    </a>
  </article>`;
}
function grid(list,cls){
  if(!list.length)return `<div class="empty"><h3 style="font-size:26px">No matches</h3><p>Try clearing a filter or searching a different term.</p></div>`;
  return `<div class="${cls||'pgrid'}">${list.map((p,i)=>productCard(p,i)).join('')}</div>`;
}
function wireCards(root){
  $$('[data-qv]',root).forEach(b=>b.onclick=(e)=>{e.preventDefault();openQuickView(b.dataset.qv)});
  $$('[data-wish]',root).forEach(b=>b.onclick=(e)=>{
    e.preventDefault();e.stopPropagation();
    const id=b.dataset.wish;
    S.wish=S.wish.includes(id)?S.wish.filter(x=>x!==id):[...S.wish,id];
    badges();drawWish();
    b.classList.toggle('on');
    b.querySelector('svg').setAttribute('fill',S.wish.includes(id)?'currentColor':'none');
    toast(S.wish.includes(id)?'Saved to wishlist':'Removed from wishlist');
  });
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
  $$('.rv',root).forEach(el=>io.observe(el));
}

/* ============================================================
   6 · ROUTER
   ============================================================ */
function parseHash(){
  const raw=(location.hash||'#/').slice(1);
  const [path,qs]=raw.split('?');
  const q={};
  if(qs)qs.split('&').forEach(pair=>{const [k,v]=pair.split('=');if(k)q[decodeURIComponent(k)]=decodeURIComponent(v||'')});
  return {path:path||'/',q};
}
function setActiveNav(path){
  const top='/'+(path.split('/')[1]||'');
  $$('.nav a,.mmenu a').forEach(a=>a.classList.toggle('on',a.dataset.route===top||(top==='/'&&a.dataset.route==='/')));
}
function router(){
  const {path,q}=parseHash();
  destroyGlobe();
  const app=$('#app');
  if(path==='/'){app.innerHTML=viewHome();}
  else if(path==='/shop'){app.innerHTML=viewShop(q);}
  else if(path.startsWith('/product/')){app.innerHTML=viewProduct(path.split('/')[2]);}
  else if(path==='/about'){app.innerHTML=viewAbout();}
  else if(path==='/contact'){app.innerHTML=viewContact();}
  else {app.innerHTML=view404();}
  setActiveNav(path);
  window.scrollTo({top:0,behavior:'instant' in document.documentElement.style?'instant':'auto'});
  afterRoute(path,q);
}
window.addEventListener('hashchange',router);

/* ============================================================
   7 · VIEW: HOME
   ============================================================ */
function viewHome(){
  const bestsellers=PRODUCTS.filter(p=>p.tag==='Bestseller').concat(PRODUCTS.filter(p=>p.tag==='New')).slice(0,8);
  return `
  <section class="hero">
    <canvas class="hero__canvas" id="globeCanvas"></canvas>
    <div class="wrap hero__in">
      <span class="eyebrow hero__eyebrow">Issue No. 004 &nbsp;·&nbsp; 31.63°N, 74.87°E</span>
      <h1>Clothing built<br>for the whole <em>map</em>.</h1>
      <p class="hero__sub">Urban Planet designs a small, considered wardrobe — outerwear, knitwear, denim and basics — cut to travel well and last past the season it was bought in.</p>
      <div class="hero__acts">
        <a href="shop.html" class="btn btn--gold">Shop the drop</a>
        <a href="about.html" class="btn">Our approach</a>
      </div>
      <div class="hero__stats">
        <div><b>40+</b><span>Countries shipped</span></div>
        <div><b>20</b><span>Core styles, no clutter</span></div>
        <div><b>15d</b><span>Free returns window</span></div>
      </div>
    </div>
    <div class="hero__scroll"><span class="ln"></span>Scroll</div>
  </section>

  <section class="sec sec--tight">
    <div class="wrap">
      <div class="sechd rv">
        <h2>Shop by<br>category</h2>
        <p>Three places to start. Everything else in the catalogue branches off these.</p>
      </div>
      <div class="colls rv">
        ${collCard('outerwear','Outerwear','For the coldest and wettest of it')}
        ${collCard('knitwear','Knitwear','Merino, cashmere, cotton-wool blends')}
        ${collCard('denim','Denim','Raw, black, wide — pick a leg')}
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sechd rv">
        <h2>Most<br>worn</h2>
        <p>The styles that get reordered the most, straight from our own dispatch numbers.</p>
        <a href="shop.html" class="btn btn--sm" style="margin-top:auto">View all</a>
      </div>
      <div class="rv">${grid(bestsellers)}</div>
    </div>
  </section>

  <section class="editorial rv">
    <div class="editorial__txt">
      <span class="eyebrow">The Approach</span>
      <h2 style="margin-top:18px">Fewer pieces.<br>Worn more.</h2>
      <p>We publish one small collection a season instead of chasing weekly drops. Every piece is designed to sit next to the last one without going out of date — so the twenty styles in the catalogue today are still the twenty you'll want next year.</p>
      <a href="about.html" class="btn" style="margin-top:24px;width:fit-content">Read the full approach</a>
    </div>
    <div class="editorial__num">
      <div><b>92%</b><span>Natural fibre across the line</span></div>
      <div><b>4</b><span>Seasonal drops, not fifty-two</span></div>
      <div><b>0</b><span>Styles discontinued without notice</span></div>
    </div>
  </section>

  <section class="sec sec--tight">
    <div class="wrap">
      <div class="sechd rv"><h2>Built to<br>a standard</h2></div>
      <div class="values rv rv--stagger">
        <div class="value" style="--i:0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 7.5 13.5 2 9h7z"/></svg><h4>Natural fibre first</h4><p>Wool, cotton and cashmere before synthetics — every fabric is listed on the product page, no guessing.</p></div>
        <div class="value" style="--i:1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg><h4>Free 15-day returns</h4><p>Try it at home. Unworn returns are picked up free, anywhere we deliver.</p></div>
        <div class="value" style="--i:2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg><h4>Worldwide dispatch</h4><p>Same catalogue, same price logic, shipped to over forty countries from a single warehouse.</p></div>
        <div class="value" style="--i:3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><h4>Made to outlast</h4><p>Heavier-than-usual gauges and fabric weights, so the fifth wash looks like the first.</p></div>
      </div>
    </div>
  </section>

  <div class="tmarq"><div class="tmarq__track">
    ${'<span>Excellent <b>fit</b>, no returns needed</span><span>Delivered to <b>Berlin</b> in four days</span><span>The coat earns <b>every rupee</b></span><span>Finally, basics that <b>hold shape</b></span>'.repeat(2)}
  </div></div>

  <section class="news">
    <div class="wrap news__in">
      <h2>Join the<br>next drop.</h2>
      <form id="newsForm">
        <input type="email" id="newsEmail" placeholder="you@email.com" required>
        <button type="submit">Notify me →</button>
      </form>
    </div>
  </section>`;
}
function collCard(cat,label,desc){
  const cnt=PRODUCTS.filter(p=>p.cat===cat).length;
  const rep=PRODUCTS.find(p=>p.cat===cat);
  return `<a href="shop.html?cat=${cat}" class="coll">
    <div class="coll__art">${art(rep.type)}</div>
    <div class="coll__grad"></div>
    <div class="coll__body">
      <span class="coord">${cnt} styles</span>
      <h3>${label}</h3>
      <span class="coll__desc">${desc}</span>
      <span class="coll__link">Browse ${label.toLowerCase()} <span class="arr">→</span></span>
    </div>
  </a>`;
}

/* ============================================================
   8 · VIEW: SHOP
   ============================================================ */
function filteredProducts(){
  let list=PRODUCTS.slice();
  if(S.filters.cats.length)list=list.filter(p=>S.filters.cats.includes(p.cat));
  list=list.filter(p=>p.price<=S.filters.max);
  if(S.filters.sort==='price-asc')list.sort((a,b)=>a.price-b.price);
  else if(S.filters.sort==='price-desc')list.sort((a,b)=>b.price-a.price);
  else if(S.filters.sort==='new')list=[...list.filter(p=>p.tag==='New'),...list.filter(p=>p.tag!=='New')];
  return list;
}
function viewShop(q){
  if(q&&q.cat)S.filters.cats=[q.cat];
  return `
  <div class="pagehead">
    <div class="wrap">
      <span class="eyebrow">The Catalogue</span>
      <h1>Shop all</h1>
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Shop</span></div>
    </div>
  </div>
  <div class="wrap">
    <div class="shop">
      <aside class="filters" id="filtersAside">
        <button class="btn btn--sm mfilter" id="filtersClose" style="align-self:flex-end">Close ✕</button>
        <div class="fgroup">
          <h5>Category</h5>
          ${CATS.map(([k,label])=>`<label><input type="checkbox" value="${k}" class="fcat" ${S.filters.cats.includes(k)?'checked':''}>${label}<span class="cnt">${PRODUCTS.filter(p=>p.cat===k).length}</span></label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Price</h5>
          <div class="pricebar">
            <input type="range" id="priceRange" min="1500" max="18000" step="500" value="${S.filters.max}">
            <output id="priceOut">Up to ${rs(S.filters.max)}</output>
          </div>
        </div>
        <button class="btn btn--sm" id="clearFilters">Clear filters</button>
      </aside>
      <div class="shop__main">
        <div class="shop__bar">
          <button class="btn btn--sm mfilter" id="openFilters">Filters</button>
          <span class="shop__count" id="shopCount"></span>
          <select class="sortsel" id="sortSel">
            <option value="feat" ${S.filters.sort==='feat'?'selected':''}>Featured</option>
            <option value="new" ${S.filters.sort==='new'?'selected':''}>Newest</option>
            <option value="price-asc" ${S.filters.sort==='price-asc'?'selected':''}>Price: low to high</option>
            <option value="price-desc" ${S.filters.sort==='price-desc'?'selected':''}>Price: high to low</option>
          </select>
        </div>
        <div id="shopGrid"></div>
      </div>
    </div>
  </div>`;
}
function renderShopGrid(){
  const list=filteredProducts();
  $('#shopCount').textContent=`${list.length} style${list.length===1?'':'s'}`;
  const g=$('#shopGrid');
  g.innerHTML=grid(list);
  wireCards(g);
}
function wireShop(){
  renderShopGrid();
  $$('.fcat').forEach(cb=>cb.onchange=()=>{
    S.filters.cats=$$('.fcat').filter(x=>x.checked).map(x=>x.value);
    renderShopGrid();
  });
  $('#priceRange').oninput=e=>{
    S.filters.max=+e.target.value;
    $('#priceOut').textContent='Up to '+rs(S.filters.max);
    renderShopGrid();
  };
  $('#sortSel').onchange=e=>{S.filters.sort=e.target.value;renderShopGrid()};
  $('#clearFilters').onclick=()=>{S.filters={cats:[],max:18000,sort:'feat'};$('#app').innerHTML=viewShop({});wireShop()};
  $('#openFilters').onclick=()=>$('#filtersAside').classList.add('open');
  $('#filtersClose').onclick=()=>$('#filtersAside').classList.remove('open');
}

/* ============================================================
   9 · VIEW: PRODUCT
   ============================================================ */
function viewProduct(id){
  const p=byId(id);
  if(!p)return view404();
  S.pd={id:p.id,size:null,colour:p.colors[0],qty:1};
  const related=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  return `
  <div class="wrap" style="padding-top:20px">
    <div class="crumbs"><a href="#/">Home</a><span>/</span><a href="shop.html?cat=${p.cat}">${CATS.find(c=>c[0]===p.cat)[1]}</a><span>/</span><span>${p.name}</span></div>
  </div>
  <div class="pd">
    <div class="pd__gallery">
      <div class="pd__main" id="pdMain">${art(p.type)}</div>
      <div class="pd__thumbs">
        ${[0,1,2,3].map(i=>`<button class="${i===0?'on':''}" data-thumb="${i}">${art(p.type)}</button>`).join('')}
      </div>
    </div>
    <div class="pd__info">
      <span class="coord">${p.id} · ${p.tag||'In collection'}</span>
      <h1>${p.name}</h1>
      <div class="pd__price">${p.compareAt?`<s>${rs(p.compareAt)}</s>`:''}${rs(p.price)}</div>
      <p class="pd__desc">${p.desc}</p>

      <div class="pd__row">
        <h5>Colour — <span id="colourLabel">${C[p.colors[0]].name}</span></h5>
        <div class="swatches">${p.colors.map(c=>`<span class="swatch ${c===p.colors[0]?'on':''}" data-c="${c}" style="background:${C[c].hex}"></span>`).join('')}</div>
      </div>

      <div class="pd__row">
        <h5>Size <a href="#" id="sizeOpen" style="color:var(--gold)">Size guide</a></h5>
        <div class="sizes">${p.sizes.map(s=>`<button data-s="${s}">${s}</button>`).join('')}</div>
      </div>

      <div class="pd__row">
        <h5>Quantity</h5>
        <div class="qty"><button id="pdDec">−</button><span id="pdQty">1</span><button id="pdInc">+</button></div>
      </div>

      <div class="pd__acts">
        <button class="btn btn--solid" id="pdAdd">Add to bag</button>
        <button class="iconwrap" id="pdWish" aria-label="Save">
          <svg viewBox="0 0 24 24" fill="${S.wish.includes(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4 6 4c2.2 0 3.8 1.2 6 3.6C14.2 5.2 15.8 4 18 4c4 0 5.6 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>
      <p class="err" id="pdErr">Pick a size before adding to bag.</p>

      <div class="accordion">
        <div class="acc-item open">
          <button>Fabric &amp; fit <span class="plus">+</span></button>
          <div class="acc-body"><div class="spec2">
            <div><span>Fabric</span>${p.fabric}</div>
            <div><span>Fit</span>${p.fit}</div>
          </div></div>
        </div>
        <div class="acc-item">
          <button>Shipping &amp; returns <span class="plus">+</span></button>
          <div class="acc-body"><p>Dispatched in 1–2 days. Free shipping over ${rs(FREE_AT)}, otherwise ₹79 flat. Free 15-day returns on unworn items with tags attached.</p></div>
        </div>
        <div class="acc-item">
          <button>Care <span class="plus">+</span></button>
          <div class="acc-body"><ul><li>Cold hand wash or dry clean</li><li>Do not tumble dry</li><li>Cool iron, inside out</li></ul></div>
        </div>
      </div>
    </div>
  </div>

  <section class="sec">
    <div class="wrap">
      <div class="sechd rv"><h2>Pairs<br>well with</h2></div>
      <div class="rv">${grid(related)}</div>
    </div>
  </section>`;
}
function wireProduct(id){
  const p=byId(id);
  if(!p)return;
  const root=$('#app');
  $$('[data-c]',root).forEach(sw=>sw.onclick=()=>{
    S.pd.colour=sw.dataset.c;
    $$('[data-c]',root).forEach(x=>x.classList.remove('on'));sw.classList.add('on');
    $('#colourLabel').textContent=C[sw.dataset.c].name;
  });
  $$('[data-s]',root).forEach(b=>b.onclick=()=>{
    S.pd.size=b.dataset.s;
    $$('[data-s]',root).forEach(x=>x.classList.remove('on'));b.classList.add('on');
    $('#pdErr').classList.remove('show');
  });
  $$('[data-thumb]',root).forEach(t=>t.onclick=()=>{$$('[data-thumb]',root).forEach(x=>x.classList.remove('on'));t.classList.add('on')});
  $('#pdInc').onclick=()=>{S.pd.qty++;$('#pdQty').textContent=S.pd.qty};
  $('#pdDec').onclick=()=>{S.pd.qty=Math.max(1,S.pd.qty-1);$('#pdQty').textContent=S.pd.qty};
  $('#sizeOpen').onclick=e=>{e.preventDefault();openModal('#sizeModal')};
  $('#pdAdd').onclick=()=>{
    if(!S.pd.size){$('#pdErr').classList.add('show');return}
    addToCart(p.id,S.pd.size,S.pd.colour,S.pd.qty);
  };
  $('#pdWish').onclick=()=>{
    S.wish=S.wish.includes(p.id)?S.wish.filter(x=>x!==p.id):[...S.wish,p.id];
    badges();drawWish();
    $('#pdWish svg').setAttribute('fill',S.wish.includes(p.id)?'currentColor':'none');
    toast(S.wish.includes(p.id)?'Saved to wishlist':'Removed from wishlist');
  };
  $$('.acc-item button',root).forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
  wireCards(root);
}

/* ============================================================
   10 · VIEW: ABOUT
   ============================================================ */
function viewAbout(){
  return `
  <div class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Our Approach</span>
      <h1>About<br>Urban Planet</h1>
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>About</span></div>
    </div>
  </div>
  <section class="sec sec--tight">
    <div class="wrap">
      <div class="editorial__txt rv" style="padding:0;max-width:70ch">
        <p style="font-size:17px;color:var(--paper-dim)">Urban Planet started with a short list: things worth owning shouldn't need replacing every year. We design a small, considered wardrobe — cut from natural fibre, priced to be worn hard, and catalogued the way a cartographer catalogues a map: by coordinate, not by hype cycle.</p>
        <p style="font-size:17px;color:var(--paper-dim);margin-top:18px">No fifty-two drops a year. Four seasons, twenty core styles, and a warehouse that ships the same catalogue to a flat in Amritsar and a studio in Berlin.</p>
      </div>
    </div>
  </section>
  <section class="sec--tight">
    <div class="wrap"><div class="stat-strip rv">
      <div><b>2021</b><span>Founded</span></div>
      <div><b>20</b><span>Core styles</span></div>
      <div><b>40+</b><span>Countries</span></div>
      <div><b>92%</b><span>Natural fibre</span></div>
    </div></div>
  </section>
  <section class="sec">
    <div class="wrap">
      <div class="sechd rv"><h2>How we<br>got here</h2></div>
      <div class="timeline rv">
        <div class="tl-item"><b>2021</b><div><h4>First run, one style</h4><p>A single wool overcoat, cut in three sizes, sold out of a single storeroom in Amritsar.</p></div></div>
        <div class="tl-item"><b>2022</b><div><h4>Knitwear &amp; denim added</h4><p>Merino knitwear and a raw selvedge jean joined the coat — the four-category structure we still use today.</p></div></div>
        <div class="tl-item"><b>2023</b><div><h4>First international order</h4><p>A single package to Lisbon became a standing shipping lane. Twelve more countries followed within the year.</p></div></div>
        <div class="tl-item"><b>2025</b><div><h4>Twenty styles, no more, no less</h4><p>We capped the catalogue on purpose — every new piece now has to earn a spot by replacing something, not adding to it.</p></div></div>
      </div>
    </div>
  </section>
  <section class="sec sec--tight">
    <div class="wrap">
      <div class="sechd rv"><h2>What we<br>hold to</h2></div>
      <div class="values rv rv--stagger">
        <div class="value" style="--i:0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 7.5 13.5 2 9h7z"/></svg><h4>Fabric over logo</h4><p>The weight and fibre of a fabric is printed on the tag before the brand name is.</p></div>
        <div class="value" style="--i:1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6l9-3 9 3-9 3-9-3z"/><path d="M3 6v9l9 3 9-3V6"/></svg><h4>One warehouse, one price list</h4><p>The same catalogue and the same logic ships everywhere — no region-locked drops.</p></div>
        <div class="value" style="--i:2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 000 18M3 12h18"/></svg><h4>Small collection, restocked</h4><p>We'd rather restock a bestseller than launch something new to fill a calendar slot.</p></div>
        <div class="value" style="--i:3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/></svg><h4>Plain answers</h4><p>Every product page lists the actual fabric composition — no "premium blend" language.</p></div>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   11 · VIEW: CONTACT
   ============================================================ */
function viewContact(){
  return `
  <div class="pagehead">
    <div class="wrap">
      <span class="eyebrow">Get in touch</span>
      <h1>Contact</h1>
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Contact</span></div>
    </div>
  </div>
  <div class="contact-grid">
    <div class="contact-form">
      <h3 style="font-size:26px;margin-bottom:20px">Send a message</h3>
      <form id="contactForm">
        <div class="two">
          <div class="field"><label>Name</label><input id="ctName" required></div>
          <div class="field"><label>Email</label><input id="ctEmail" type="email" required></div>
        </div>
        <div class="field"><label>Subject</label>
          <select id="ctSubject"><option>Order enquiry</option><option>Returns &amp; exchanges</option><option>Wholesale</option><option>Something else</option></select>
        </div>
        <div class="field"><label>Message</label><textarea id="ctMsg" rows="5" required></textarea></div>
        <p class="err" id="ctErr">Please fill in every field with a valid email.</p>
        <button class="btn btn--solid" type="submit" style="margin-top:8px">Send message</button>
      </form>
    </div>
    <div class="contact-locs">
      <h3 style="font-size:26px;margin-bottom:20px">Find us</h3>
      <div class="loc-card">
        <h4>Amritsar — Flagship &amp; warehouse</h4>
        <p>12 Lawrence Road, Amritsar, Punjab 143001<br>Open Mon–Sat, 11am–8pm</p>
        <span class="coord">31.63°N, 74.87°E</span>
      </div>
      <div class="loc-card">
        <h4>Customer care</h4>
        <p>care@urbanplanet.example<br>+91 98765 43210 · Mon–Sat, 10am–7pm IST</p>
      </div>
      <div class="loc-card">
        <h4>Wholesale &amp; stockists</h4>
        <p>wholesale@urbanplanet.example<br>We reply to stockist enquiries within three working days.</p>
      </div>
      <div class="faq">
        <h3 style="font-size:20px;margin-bottom:10px">Before you write in</h3>
        <div class="acc-item open"><button>How long does delivery take? <span class="plus">+</span></button><div class="acc-body"><p>2–6 days within India, 6–14 days for international orders depending on destination.</p></div></div>
        <div class="acc-item"><button>Can I return a worn item? <span class="plus">+</span></button><div class="acc-body"><p>Returns are accepted unworn with tags attached, within 15 days of delivery.</p></div></div>
        <div class="acc-item"><button>Do you restock sold-out sizes? <span class="plus">+</span></button><div class="acc-body"><p>Core sizes are restocked every 4–6 weeks. Limited pieces, like the shearling bomber, are not.</p></div></div>
      </div>
    </div>
  </div>`;
}
function view404(){
  return `<div class="wrap sec" style="text-align:center"><span class="eyebrow">404</span><h1 style="margin-top:14px">Off the map</h1><p style="color:var(--paper-dim);margin-top:12px">That page doesn't exist. <a href="#/" style="color:var(--gold)">Back home →</a></p></div>`;
}

/* ============================================================
   12 · AFTER-ROUTE WIRING
   ============================================================ */
function afterRoute(path,q){
  const app=$('#app');
  if(path==='/'){
    initGlobe($('#globeCanvas'));
    $('#newsForm').onsubmit=e=>{e.preventDefault();toast("You're on the drop list ✦");$('#newsEmail').value=''};
  } else if(path==='/shop'){
    wireShop();
  } else if(path.startsWith('/product/')){
    wireProduct(path.split('/')[2]);
  } else if(path==='/contact'){
    $$('.acc-item button',app).forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
    $('#contactForm').onsubmit=e=>{
      e.preventDefault();
      const ok=$('#ctName').value.trim()&&/^[^@]+@[^@]+\.[^@]+$/.test($('#ctEmail').value)&&$('#ctMsg').value.trim();
      if(!ok){$('#ctErr').classList.add('show');return}
      $('#ctErr').classList.remove('show');
      toast('Message sent — we will reply within 2 working days');
      e.target.reset();
    };
  }
  wireCards(app);
}

/* ============================================================
   13 · CART / WISHLIST
   ============================================================ */
function addToCart(id,size,colour,qty){
  const ex=S.cart.find(l=>l.id===id&&l.size===size&&l.colour===colour);
  if(ex)ex.qty+=qty; else S.cart.push({id,size,colour,qty});saveState();
  badges();drawCart();openDrawer('#cartDrawer');
  toast(byId(id).name+' added to bag');
}
function totals(){
  const sub=S.cart.reduce((s,l)=>s+byId(l.id).price*l.qty,0);
  let disc=0,ship=sub>=FREE_AT?0:79;
  if(S.coupon){const c=COUPONS[S.coupon];
    if(sub>=c.min){if(c.type==='pct')disc=Math.round(sub*c.v/100);if(c.type==='ship')ship=0}}
  return {sub,disc,ship,grand:Math.max(0,sub-disc+ship)};
}
function drawCart(){
  const body=$('#cartBody'),foot=$('#cartFoot');
  if(!S.cart.length){
    body.innerHTML=`<div class="empty-cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 8z"/><path d="M8 8V6a4 4 0 1 1 8 0v2"/></svg>
      <p>Your bag is empty.</p>
      <button class="btn btn--solid" data-close>Keep browsing</button>
    </div>`;
    foot.innerHTML='';return;
  }
  body.innerHTML=S.cart.map((l,i)=>{
    const p=byId(l.id);
    return `<div class="line">
      <div class="line__art">${art(p.type)}</div>
      <div class="line__in">
        <h4>${p.name}</h4>
        <div class="line__meta">${l.colour?C[l.colour].name+' · ':''}${l.size}</div>
        <div class="line__acts">
          <div class="stepper"><button data-dec="${i}">−</button><span>${l.qty}</span><button data-inc="${i}">+</button></div>
          <span class="linex">${rs(p.price*l.qty)}</span>
        </div>
        <button class="rm" data-rm="${i}" style="margin-top:8px">Remove</button>
      </div>
    </div>`;
  }).join('');
  const t=totals();
  foot.innerHTML=`
    <div class="coupon"><input id="couponIn" placeholder="Coupon: WELCOME10" value="${S.coupon||''}"><button class="btn btn--sm" id="couponBtn">Apply</button></div>
    <ul class="totals">
      <li><span>Subtotal</span><span class="mono">${rs(t.sub)}</span></li>
      ${t.disc?`<li><span>Discount</span><em>− ${rs(t.disc)}</em></li>`:''}
      <li><span>Delivery</span><span class="mono">${t.ship?rs(t.ship):'Free'}</span></li>
      <li class="big"><span>Total</span><span>${rs(t.grand)}</span></li>
    </ul>
    <button class="btn btn--solid btn--full" id="checkoutBtn" style="margin-top:16px">Checkout</button>`;
  $$('[data-inc]').forEach(b=>b.onclick=()=>{S.cart[+b.dataset.inc].qty++;saveState();badges();drawCart()});
  $$('[data-dec]').forEach(b=>b.onclick=()=>{const l=S.cart[+b.dataset.dec];l.qty=Math.max(1,l.qty-1);saveState();badges();drawCart()});
  $$('[data-rm]').forEach(b=>b.onclick=()=>{S.cart.splice(+b.dataset.rm,1);saveState();badges();drawCart();toast('Removed from bag')});
  $('#couponBtn').onclick=()=>{
    const v=$('#couponIn').value.trim().toUpperCase();
    if(COUPONS[v]){S.coupon=v;toast('Coupon applied')} else {S.coupon=null;toast('Invalid coupon code')}
    drawCart();
  };
  $('#checkoutBtn').onclick=()=>{closeAll();S.co=1;paintCO();openModal('#coModal')};
}
function drawWish(){
  const body=$('#wishBody');
  if(!S.wish.length){
    body.innerHTML=`<div class="empty-cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4 6 4c2.2 0 3.8 1.2 6 3.6C14.2 5.2 15.8 4 18 4c4 0 5.6 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>
      <p>Nothing saved yet.</p>
      <button class="btn btn--solid" data-close>Keep browsing</button>
    </div>`;return;
  }
  body.innerHTML=S.wish.map(id=>{
    const p=byId(id);
    return `<div class="line">
      <div class="line__art">${art(p.type)}</div>
      <div class="line__in">
        <h4>${p.name}</h4>
        <div class="line__meta">${rs(p.price)}</div>
        <div class="line__acts">
          <button class="btn btn--sm" data-qv="${p.id}">Quick view</button>
          <button class="rm" data-unwish="${p.id}">Remove</button>
        </div>
      </div>
    </div>`;
  }).join('');
  $$('[data-qv]',body).forEach(b=>b.onclick=()=>openQuickView(b.dataset.qv));
  $$('[data-unwish]',body).forEach(b=>b.onclick=()=>{S.wish=S.wish.filter(x=>x!==b.dataset.unwish);badges();drawWish();toast('Removed from wishlist')});
}

/* ============================================================
   14 · QUICK VIEW
   ============================================================ */
const qvState={id:null,size:null,colour:null,qty:1};
function openQuickView(id){
  const p=byId(id);
  qvState.id=id;qvState.size=null;qvState.colour=p.colors[0];qvState.qty=1;
  paintQV();openModal('#qvModal');
}
function paintQV(){
  const p=byId(qvState.id);
  $('#qvBody').innerHTML=`
    <div class="qv__grid">
      <div class="qv__art">${art(p.type)}</div>
      <div>
        <span class="coord">${p.id} · ${p.tag||'In collection'}</span>
        <h2 style="font-size:28px;margin-top:10px">${p.name}</h2>
        <div class="pd__price" style="margin-top:8px">${p.compareAt?`<s>${rs(p.compareAt)}</s>`:''}${rs(p.price)}</div>
        <p style="color:var(--paper-dim);font-size:14px;margin-top:14px">${p.desc}</p>
        <div class="pd__row">
          <h5>Colour — ${C[qvState.colour].name}</h5>
          <div class="swatches">${p.colors.map(c=>`<span class="swatch ${c===qvState.colour?'on':''}" data-c="${c}" style="background:${C[c].hex}"></span>`).join('')}</div>
        </div>
        <div class="pd__row">
          <h5>Size</h5>
          <div class="sizes">${p.sizes.map(s=>`<button class="${s===qvState.size?'on':''}" data-s="${s}">${s}</button>`).join('')}</div>
        </div>
        <div class="pd__row">
          <h5>Quantity</h5>
          <div class="qty"><button id="qDec">−</button><span>${qvState.qty}</span><button id="qInc">+</button></div>
        </div>
        <ul class="spec">
          <li><span>Fabric</span><b>${p.fabric}</b></li>
          <li><span>Fit</span><b>${p.fit}</b></li>
          <li><span>Delivery</span><b>2–6 days</b></li>
        </ul>
        <div class="qv__acts">
          <button class="btn btn--solid" id="qvAdd">Add to bag · ${rs(p.price*qvState.qty)}</button>
          <a href="#/product/${p.id}" class="btn" data-close>Full details</a>
        </div>
        <p class="err" id="qvErr">Pick a size first.</p>
      </div>
    </div>`;
  $$('#qvBody [data-c]').forEach(b=>b.onclick=()=>{qvState.colour=b.dataset.c;paintQV()});
  $$('#qvBody [data-s]').forEach(b=>b.onclick=()=>{qvState.size=b.dataset.s;paintQV()});
  $('#qInc').onclick=()=>{qvState.qty++;paintQV()};
  $('#qDec').onclick=()=>{qvState.qty=Math.max(1,qvState.qty-1);paintQV()};
  $('#qvAdd').onclick=()=>{
    if(!qvState.size){$('#qvErr').classList.add('show');return}
    closeAll();addToCart(qvState.id,qvState.size,qvState.colour,qvState.qty);
  };
}

/* ============================================================
   15 · CHECKOUT
   ============================================================ */
function paintCO(){
  const t=totals();const step=S.co;
  const bar=`<div class="steps">
    <div class="${step>1?'done':'on'}">1 · Address</div>
    <div class="${step===2?'on':step>2?'done':''}">2 · Payment</div>
    <div class="${step===3?'on':''}">3 · Done</div></div>`;
  if(step===1){
    $('#coBody').innerHTML=bar+`
      <h2 style="font-size:26px;margin-bottom:6px">Where to?</h2>
      <p style="font-size:14px;color:var(--paper-dim);margin-bottom:18px">We send tracking by email, so double-check the address before continuing.</p>
      <div class="two"><div class="field"><label>Full name</label><input id="cName" placeholder="Jordan Smith"></div>
      <div class="field"><label>Phone</label><input id="cPhone" placeholder="98765 43210" inputmode="numeric"></div></div>
      <div class="field"><label>Address</label><textarea id="cAddr" rows="2" placeholder="House, street, landmark"></textarea></div>
      <div class="two"><div class="field"><label>City</label><input id="cCity" placeholder="Amritsar"></div>
      <div class="field"><label>PIN code</label><input id="cPin" placeholder="143001" inputmode="numeric" maxlength="6"></div></div>
      <p class="err" id="e1">Fill in name, a 10-digit number, address and a 6-digit PIN.</p>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn" data-close>Keep shopping</button>
        <button class="btn btn--solid" style="flex:1" id="toPay">Continue · ${rs(t.grand)}</button>
      </div>`;
    $('#toPay').onclick=()=>{
      const ok=$('#cName').value.trim()&&/^\d{10}$/.test($('#cPhone').value.replace(/\s/g,''))&&$('#cAddr').value.trim()&&/^\d{6}$/.test($('#cPin').value);
      if(!ok){$('#e1').classList.add('show');return}
      S.co=2;paintCO();
    };
  }
  if(step===2){
    $('#coBody').innerHTML=bar+`
      <h2 style="font-size:26px;margin-bottom:6px">How you're paying</h2>
      <p style="font-size:14px;color:var(--paper-dim);margin-bottom:18px">This is a demo store — no money moves and no card details are stored.</p>
      <div class="pay">
        <label><input type="radio" name="pay" value="UPI" checked> UPI · GPay, PhonePe, Paytm</label>
        <label><input type="radio" name="pay" value="Card"> Debit or credit card</label>
        <label><input type="radio" name="pay" value="Netbanking"> Net banking</label>
        <label><input type="radio" name="pay" value="COD"> Cash on delivery <span class="mono" style="margin-left:auto;font-size:11px">+₹0</span></label>
      </div>
      <ul class="totals" style="margin-top:20px">
        <li><span>Subtotal</span><span class="mono">${rs(t.sub)}</span></li>
        ${t.disc?`<li><span>Coupon ${S.coupon}</span><em>− ${rs(t.disc)}</em></li>`:''}
        <li><span>Delivery</span><span class="mono">${t.ship?rs(t.ship):'Free'}</span></li>
        <li class="big"><span>Pay now</span><span>${rs(t.grand)}</span></li>
      </ul>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn" id="back1">Back</button>
        <button class="btn btn--gold" style="flex:1" id="place">Place order</button>
      </div>`;
    $('#back1').onclick=()=>{S.co=1;paintCO()};
    $('#place').onclick=()=>{
      S.orderNo='UP'+Math.floor(100000+Math.random()*899999);
      S.paid=document.querySelector('input[name=pay]:checked').value;
      S.total=t.grand;S.co=3;paintCO();
    };
  }
  if(step===3){
    const d=new Date();d.setDate(d.getDate()+4);
    const eta=d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
    $('#coBody').innerHTML=bar+`
      <div class="done-wrap">
        <div class="big">✦</div>
        <h2 style="font-size:30px;margin:12px 0 8px">Order placed</h2>
        <p style="color:var(--paper-dim);font-size:15px">Order <b class="mono">${S.orderNo}</b> · paying by ${S.paid}</p>
        <p style="margin-top:14px;font-size:15px">Arriving by <b>${eta}</b>. Tracking lands in your inbox once it leaves the warehouse.</p>
        <p class="mono" style="font-size:11px;opacity:.6;margin-top:16px">Amount ${rs(S.total)} · demo order, nothing was charged</p>
        <button class="btn btn--solid btn--full" style="margin-top:22px" id="finish">Back to shopping</button>
      </div>`;
    $('#finish').onclick=()=>{S.cart=[];saveState();S.coupon=null;S.co=1;badges();drawCart();closeAll();toast('Thanks! Bag cleared.')};
  }
}

/* ============================================================
   16 · OVERLAY PLUMBING
   ============================================================ */
const STACK=[];
function openOverlay(sel){
  const el=$(sel);
  if(!STACK.includes(sel))STACK.push(sel);
  el.style.zIndex=95+STACK.length;
  el.classList.add('on');
  $('#scrim').style.zIndex=94+STACK.length;
  $('#scrim').classList.add('on');
  document.body.classList.add('locked');
}
function closeTop(){
  const sel=STACK.pop();
  if(sel)$(sel).classList.remove('on');
  if(STACK.length){$('#scrim').style.zIndex=94+STACK.length}
  else{$('#scrim').classList.remove('on');document.body.classList.remove('locked')}
}
function openDrawer(sel){closeAll();openOverlay(sel)}
function openModal(sel){openOverlay(sel)}
function closeAll(){
  while(STACK.length)closeTop();
  $$('.drawer,.modal').forEach(e=>e.classList.remove('on'));
  $('#scrim').classList.remove('on');document.body.classList.remove('locked');
  $('#mmenu').classList.remove('open');
}
$('#scrim').onclick=closeTop;
document.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeTop()});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if($('#mmenu').classList.contains('open')){closeAll();return}
  closeTop();
});

$('#wishBtn').onclick=()=>{drawWish();openDrawer('#wishDrawer')};
$('#sizeLinkFtr').onclick=e=>{e.preventDefault();openModal('#sizeModal')};
$('#burger').onclick=()=>{$('#mmenu').classList.add('open');document.body.classList.add('locked')};
$('#mclose').onclick=closeAll;
$$('#mmenu a').forEach(a=>a.onclick=closeAll);

/* ============================================================
   17 · SEARCH
   ============================================================ */
$('#searchBtn').onclick=()=>{openModal('#searchModal');setTimeout(()=>$('#qBig').focus(),150)};
$('#qBig').oninput=e=>{
  const v=e.target.value.toLowerCase();
  const hits=v?PRODUCTS.filter(p=>(p.name+' '+p.cat+' '+p.fabric+' '+p.desc+' '+p.id).toLowerCase().includes(v)).slice(0,6):[];
  $('#qResults').innerHTML=v?(hits.length?hits.map(p=>`
    <button class="line" style="width:100%;text-align:left" data-qvgo="${p.id}">
      <div class="line__art">${art(p.type)}</div>
      <div class="line__in"><h4>${p.name}</h4><div class="line__meta">${p.cat} · ${rs(p.price)}</div></div>
    </button>`).join(''):`<p class="mono" style="font-size:12px;opacity:.6;padding:14px 4px">No match for "${e.target.value}". Try "jacket", "denim" or a SKU like UP-005.</p>`):'';
  $$('[data-qvgo]').forEach(b=>b.onclick=()=>{closeAll();location.hash='#/product/'+b.dataset.qvgo});
};

/* ============================================================
   18 · TICKER
   ============================================================ */
(function(){
  const items=['Free shipping over '+rs(FREE_AT),'New drop — Issue No. 004 live now','Shipping to 40+ countries','15-day free returns','Carbon-conscious delivery'];
  const html=items.map(t=>`<span>${t}</span>`).join('').repeat(2);
  $('#tickerTrack').innerHTML=html;
})();

/* ============================================================
   19 · BOOT
   ============================================================ */
router();
badges();
