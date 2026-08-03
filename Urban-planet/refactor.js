const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'urban-planet-1.html');
const html = fs.readFileSync(srcPath, 'utf8');

// 1. Extract CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/g;
let styles = '';
let match;
while ((match = styleRegex.exec(html)) !== null) {
  styles += match[1] + '\n';
}

// Apply new theme
styles = styles.replace(/--bg:#0A0A0C;/g, '--bg:#F9F9F7;')
               .replace(/--bg-2:#111114;/g, '--bg-2:#FFFFFF;')
               .replace(/--surface:#17171B;/g, '--surface:#EFEFEA;')
               .replace(/--surface-2:#1D1D22;/g, '--surface-2:#E5E5E0;')
               .replace(/--line:rgba\(237,234,227,\.14\);/g, '--line:rgba(0,0,0,.1);')
               .replace(/--line-strong:rgba\(237,234,227,\.28\);/g, '--line-strong:rgba(0,0,0,.2);')
               .replace(/--paper:#EDEAE3;/g, '--paper:#111111;')
               .replace(/--paper-dim:rgba\(237,234,227,\.62\);/g, '--paper-dim:rgba(17,17,17,.65);')
               .replace(/--paper-faint:rgba\(237,234,227,\.38\);/g, '--paper-faint:rgba(17,17,17,.4);')
               .replace(/--gold:#C9A227;/g, '--gold:#000000;')
               .replace(/--gold-soft:#E8C468;/g, '--gold-soft:#333333;');

// Minor CSS fixes for the new theme
styles = styles.replace(/background:rgba\(10,10,12,\.86\)/g, 'background:rgba(249,249,247,.86)')
               .replace(/background:linear-gradient\(0deg,rgba\(10,10,12,\.92\),rgba\(10,10,12,\.1\)/g, 'background:linear-gradient(0deg,rgba(249,249,247,.92),rgba(249,249,247,.1)')
               .replace(/background:rgba\(10,10,12,\.5\)/g, 'background:rgba(249,249,247,.5)')
               .replace(/background:rgba\(10,10,12,\.7\)/g, 'background:rgba(0,0,0,.3)'); // scrim

if (!fs.existsSync(path.join(__dirname, 'css'))) fs.mkdirSync(path.join(__dirname, 'css'));
fs.writeFileSync(path.join(__dirname, 'css', 'style.css'), styles);


// 2. Extract JS
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
  if (!match[0].includes('three.min.js')) {
    scripts.push(match[1]);
  }
}
let js = scripts.join('\n');

// Make state persistent
js = js.replace(/cart:\[\],/g, "cart:JSON.parse(localStorage.getItem('up_cart')||'[]'),")
       .replace(/wish:\[\],/g, "wish:JSON.parse(localStorage.getItem('up_wish')||'[]'),");

const saveStateFn = `
function saveState(){
  localStorage.setItem('up_cart',JSON.stringify(S.cart));
  localStorage.setItem('up_wish',JSON.stringify(S.wish));
}
`;
js = js.replace('const S={', saveStateFn + 'const S={');

// Inject saveState() after state changes
js = js.replace(/S\.wish=S\.wish\.includes\((.*?)\)\?S\.wish\.filter\((.*?)\):\[\.\.\.S\.wish,(.*?)\\];/g, (m) => m + 'saveState();')
       .replace(/ex\.qty\+=qty; else S\.cart\.push\(\{id,size,colour,qty\}\);/g, "ex.qty+=qty; else S.cart.push({id,size,colour,qty});saveState();")
       .replace(/S\.cart\[\+b\.dataset\.inc\]\.qty\+\+;/g, "S.cart[+b.dataset.inc].qty++;saveState();")
       .replace(/l\.qty=Math\.max\(1,l\.qty-1\);/g, "l.qty=Math.max(1,l.qty-1);saveState();")
       .replace(/S\.cart\.splice\(\+b\.dataset\.rm,1\);/g, "S.cart.splice(+b.dataset.rm,1);saveState();")
       .replace(/S\.cart=\[\];/g, "S.cart=[];saveState();");

// Fix routing to use separate files for cart, checkout, contact
js = js.replace(/<a href="#\/contact"/g, '<a href="contact.html"')
       .replace(/data-route="\/contact"/g, '')
       .replace(/<button class="iconbtn" id="cartBtn"/g, '<a href="cart.html" class="iconbtn" id="cartBtn"')
       .replace(/<\/button>\s*<button class="iconbtn burger"/g, '</a><button class="iconbtn burger"')
       .replace(/\$\('#cartBtn'\)\.onclick=\(\)=>{drawCart\(\);openDrawer\('#cartDrawer'\)};/g, '');

if (!fs.existsSync(path.join(__dirname, 'js'))) fs.mkdirSync(path.join(__dirname, 'js'));
fs.writeFileSync(path.join(__dirname, 'js', 'app.js'), js);


// 3. Extract HTML Boilerplate
let bodyContent = html.substring(html.indexOf('<body>') + 6, html.indexOf('</body>'));
// Remove inline styles and scripts
bodyContent = bodyContent.replace(/<style>[\s\S]*?<\/style>/g, '');
bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '');
// Change cart button to link
bodyContent = bodyContent.replace(/<button class="iconbtn" id="cartBtn"/g, '<a href="cart.html" class="iconbtn" id="cartBtn"')
                         .replace(/<\/button>\s*<button class="iconbtn burger"/g, '</a>\n      <button class="iconbtn burger"');

const headContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Urban Planet</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
`;

const footContent = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="js/app.js"></script>
</body>
</html>
`;

// Replace contact links in the body to point to contact.html
bodyContent = bodyContent.replace(/href="#\/contact"/g, 'href="contact.html"');

fs.writeFileSync(path.join(__dirname, 'index.html'), headContent + bodyContent + footContent);

// 4. Generate contact.html, cart.html, checkout.html

const contactPage = headContent + bodyContent + `
<script>
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = viewContact();
  afterRoute('/contact', {});
});
</script>
` + footContent;
fs.writeFileSync(path.join(__dirname, 'contact.html'), contactPage);

const cartPage = headContent + bodyContent + `
<script>
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = \`
  <div class="pagehead"><div class="wrap"><h1>Your Bag</h1></div></div>
  <div class="wrap" style="max-width:800px; padding-block:48px;" id="cartPageBody"></div>
  \`;
  
  // Override drawCart to render in our new page layout instead of the drawer
  const origDrawCart = drawCart;
  drawCart = function() {
    const body = document.getElementById('cartPageBody');
    if (!body) return origDrawCart();
    if(!S.cart.length){
      body.innerHTML = '<div class="empty-cart"><p>Your bag is empty.</p><a href="index.html" class="btn btn--solid">Keep browsing</a></div>';
      return;
    }
    const t = totals();
    let html = S.cart.map((l,i)=>{
      const p=byId(l.id);
      return \`<div class="line">
        <div class="line__art">\${art(p.type)}</div>
        <div class="line__in">
          <h4>\${p.name}</h4>
          <div class="line__meta">\${l.colour?C[l.colour].name+' · ':''}\${l.size}</div>
          <div class="line__acts">
            <div class="stepper"><button data-dec="\${i}">−</button><span>\${l.qty}</span><button data-inc="\${i}">+</button></div>
            <span class="linex">\${rs(p.price*l.qty)}</span>
          </div>
          <button class="rm" data-rm="\${i}" style="margin-top:8px">Remove</button>
        </div>
      </div>\`;
    }).join('');
    
    html += \`<div style="margin-top:40px; border-top:1px solid var(--line); padding-top:20px;">
      <ul class="totals">
        <li><span>Subtotal</span><span class="mono">\${rs(t.sub)}</span></li>
        \${t.disc?\`<li><span>Discount</span><em>− \${rs(t.disc)}</em></li>\`:\`\`}
        <li><span>Delivery</span><span class="mono">\${t.ship?rs(t.ship):'Free'}</span></li>
        <li class="big"><span>Total</span><span>\${rs(t.grand)}</span></li>
      </ul>
      <a href="checkout.html" class="btn btn--solid btn--full" style="margin-top:16px; text-align:center; display:block;">Checkout</a>
    </div>\`;
    body.innerHTML = html;
    
    document.querySelectorAll('#cartPageBody [data-inc]').forEach(b=>b.onclick=()=>{S.cart[+b.dataset.inc].qty++;saveState();badges();drawCart()});
    document.querySelectorAll('#cartPageBody [data-dec]').forEach(b=>b.onclick=()=>{const l=S.cart[+b.dataset.dec];l.qty=Math.max(1,l.qty-1);saveState();badges();drawCart()});
    document.querySelectorAll('#cartPageBody [data-rm]').forEach(b=>b.onclick=()=>{S.cart.splice(+b.dataset.rm,1);saveState();badges();drawCart();toast('Removed from bag')});
  };
  
  drawCart();
});
</script>
` + footContent;
fs.writeFileSync(path.join(__dirname, 'cart.html'), cartPage);

const checkoutPage = headContent + bodyContent + `
<script>
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = \`
  <div class="pagehead"><div class="wrap"><h1>Checkout</h1></div></div>
  <div class="wrap" style="max-width:600px; padding-block:48px;" id="coBodyPage"></div>
  \`;
  
  // Override paintCO to render in our new page layout instead of modal
  const origPaintCO = paintCO;
  paintCO = function() {
    const body = document.getElementById('coBodyPage');
    if (!body) return origPaintCO();
    
    const t=totals();const step=S.co;
    const bar=\`<div class="steps">
      <div class="\${step>1?'done':'on'}">1 · Address</div>
      <div class="\${step===2?'on':step>2?'done':''}">2 · Payment</div>
      <div class="\${step===3?'on':''}">3 · Done</div></div>\`;
    if(step===1){
      body.innerHTML=bar+\`
        <h2 style="font-size:26px;margin-bottom:6px">Where to?</h2>
        <div class="two"><div class="field"><label>Full name</label><input id="cName" placeholder="Jordan Smith"></div>
        <div class="field"><label>Phone</label><input id="cPhone" placeholder="98765 43210" inputmode="numeric"></div></div>
        <div class="field"><label>Address</label><textarea id="cAddr" rows="2" placeholder="House, street, landmark"></textarea></div>
        <div class="two"><div class="field"><label>City</label><input id="cCity" placeholder="Amritsar"></div>
        <div class="field"><label>PIN code</label><input id="cPin" placeholder="143001" inputmode="numeric" maxlength="6"></div></div>
        <p class="err" id="e1">Fill in name, a 10-digit number, address and a 6-digit PIN.</p>
        <div style="display:flex;gap:10px;margin-top:16px">
          <a href="cart.html" class="btn">Back to bag</a>
          <button class="btn btn--solid" style="flex:1" id="toPay">Continue · \${rs(t.grand)}</button>
        </div>\`;
      document.getElementById('toPay').onclick=()=>{
        const ok=document.getElementById('cName').value.trim()&&/^\\d{10}$/.test(document.getElementById('cPhone').value.replace(/\\s/g,''))&&document.getElementById('cAddr').value.trim()&&/^\\d{6}$/.test(document.getElementById('cPin').value);
        if(!ok){document.getElementById('e1').classList.add('show');return}
        S.co=2;paintCO();
      };
    }
    if(step===2){
      body.innerHTML=bar+\`
        <h2 style="font-size:26px;margin-bottom:6px">Payment</h2>
        <div class="pay">
          <label><input type="radio" name="pay" value="UPI" checked> UPI</label>
          <label><input type="radio" name="pay" value="Card"> Card</label>
          <label><input type="radio" name="pay" value="COD"> COD</label>
        </div>
        <ul class="totals" style="margin-top:20px">
          <li class="big"><span>Pay now</span><span>\${rs(t.grand)}</span></li>
        </ul>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn" id="back1">Back</button>
          <button class="btn btn--gold" style="flex:1" id="place">Place order</button>
        </div>\`;
      document.getElementById('back1').onclick=()=>{S.co=1;paintCO()};
      document.getElementById('place').onclick=()=>{
        S.orderNo='UP'+Math.floor(100000+Math.random()*899999);
        S.paid=document.querySelector('input[name=pay]:checked').value;
        S.total=t.grand;S.co=3;paintCO();
      };
    }
    if(step===3){
      body.innerHTML=bar+\`
        <div class="done-wrap">
          <div class="big">✦</div>
          <h2 style="font-size:30px;margin:12px 0 8px">Order placed</h2>
          <p>Order <b class="mono">\${S.orderNo}</b> · paying by \${S.paid}</p>
          <a href="index.html" class="btn btn--solid btn--full" style="margin-top:22px" id="finish">Back home</a>
        </div>\`;
      document.getElementById('finish').onclick=()=>{S.cart=[];saveState();S.co=1;badges();};
    }
  };
  
  S.co=1;
  paintCO();
});
</script>
` + footContent;
fs.writeFileSync(path.join(__dirname, 'checkout.html'), checkoutPage);

console.log('Refactoring complete!');
