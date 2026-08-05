const fs = require('fs');
const path = require('path');

const dir = 'd:\\Prince\\projects\\clothes\\urban-planet-1';
const filesToUpdate = ['index.html', 'cart.html', 'checkout.html', 'contact.html'];

filesToUpdate.forEach(file => {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  // 1. Update logo
  content = content.replace(/<b>Urban Planet<\/b>/g, '<b>URBAN PLANET</b>');
  
  // 2. Update routing
  content = content.replace(/href="#\/shop"/g, 'href="shop.html"');
  content = content.replace(/href="#\/shop\?cat=([^"]+)"/g, 'href="shop.html?cat=$1"');
  content = content.replace(/href="#\/about"/g, 'href="about.html"');
  
  // In index.html, update the router initialization
  if (file === 'index.html') {
    if (!content.includes("window.addEventListener('DOMContentLoaded'")) {
      content = content.replace('<script src="js/app.js"></script>', '<script src="js/app.js"></script>\n<script>\nwindow.addEventListener(\'DOMContentLoaded\', () => {\n  router();\n});\n</script>');
    }
  }
  
  fs.writeFileSync(p, content);
});

// Create shop.html and about.html based on contact.html structure
const contactHtml = fs.readFileSync(path.join(dir, 'contact.html'), 'utf8');

// For shop.html
let shopHtml = contactHtml.replace(/document\.getElementById\('app'\)\.innerHTML = viewContact\(\);\n\s*afterRoute\('\/contact', \{\}\);/, 
  "const searchParams = new URLSearchParams(window.location.search);\n  const q = {};\n  for(const [key, value] of searchParams.entries()) { q[key] = value; }\n  document.getElementById('app').innerHTML = viewShop(q);\n  afterRoute('/shop', q);");
shopHtml = shopHtml.replace(/<title>Urban Planet<\/title>/, '<title>Shop - URBAN PLANET</title>');
fs.writeFileSync(path.join(dir, 'shop.html'), shopHtml);

// For about.html
let aboutHtml = contactHtml.replace(/document\.getElementById\('app'\)\.innerHTML = viewContact\(\);\n\s*afterRoute\('\/contact', \{\}\);/, 
  "document.getElementById('app').innerHTML = viewAbout();\n  afterRoute('/about', {});");
aboutHtml = aboutHtml.replace(/<title>Urban Planet<\/title>/, '<title>About - URBAN PLANET</title>');
fs.writeFileSync(path.join(dir, 'about.html'), aboutHtml);

// Update js/app.js
const appJsPath = path.join(dir, 'js', 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Replace routing links in JS templates
appJsContent = appJsContent.replace(/href="#\/shop"/g, 'href="shop.html"');
appJsContent = appJsContent.replace(/href="#\/shop\?cat=([^"]+)"/g, 'href="shop.html?cat=$1"');
appJsContent = appJsContent.replace(/href="#\/about"/g, 'href="about.html"');

// Remove router() from the end
appJsContent = appJsContent.replace(/router\(\);\nbadges\(\);/, 'badges();');

fs.writeFileSync(appJsPath, appJsContent);

console.log('Done modifying files.');
