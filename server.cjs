const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

// =====================================================
//  PERSISTENT DATABASE ENGINE (JSON File Database)
// =====================================================
const DB_FILE = path.join(__dirname, 'data', 'db.json');

function initDb() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ orders: [], users: [] }, null, 2), 'utf8');
  }
}

function getDb() {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { orders: [], users: [] };
  }
}

function saveDb(data) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Auto sync generated assets to public folder
try {
  const srcDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\99a90ff1-734a-4ea9-9dc3-7ba01e5658cd';
  const destDir = path.join(__dirname, 'public');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  const mappings = {
    'red_zari_saree_1784734703223.png': 'red_zari_saree.png',
    'blue_pink_saree_1784734719966.png': 'blue_pink_saree.png',
    'green_net_saree_1784734735390.png': 'green_net_saree.png',
    'yellow_bridal_saree_1784734751559.png': 'yellow_bridal_saree.png',
    'orange_anarkali_kurti_1784736058178.png': 'orange_anarkali_kurti.png',
    'green_bandhani_kurti_1784736076854.png': 'green_bandhani_kurti.png',
    'black_butterfly_kurti_1784736098588.png': 'black_butterfly_kurti.png',
    'blue_lace_kurti_1784736119149.png': 'blue_lace_kurti.png',
    'indigo_kurti_1784736143224.png': 'indigo_kurti.png',
    'pink_bandhani_dupatta_1784777250904.png': 'pink_bandhani_dupatta.png',
    'patola_silk_dupatta_1784777330321.png': 'patola_silk_dupatta.png',
    'phulkari_dupatta_1784777377227.png': 'phulkari_dupatta.png',
    'yellow_patola_dupatta_1784777481098.png': 'yellow_patola_dupatta.png',
    'kalamkari_dupatta_1784777506496.png': 'kalamkari_dupatta.png',
    'blue_cargo_jeans_1784778800020.png': 'blue_cargo_jeans.png',
    'light_skinny_jeans_1784778820876.png': 'light_skinny_jeans.png',
    'dark_wide_jeans_1784778842126.png': 'dark_wide_jeans.png',
    'ring_seam_jeans_1784778864202.png': 'ring_seam_jeans.png',
    'brown_cargo_jeans_1784778883284.png': 'brown_cargo_jeans.png',
    'orange_smile_tshirt_1784779369935.png': 'orange_smile_tshirt.png',
    'brown_hearts_tshirt_1784779418631.png': 'brown_hearts_tshirt.png',
    'gothic_anime_tshirt_1784779446549.png': 'gothic_anime_tshirt.png',
    'media__1784779227016.png': 'crow_y2k_tshirt.png',
    'media__1784779254713.png': 'cross_wings_tshirt.png',
    'media__1784786622969.jpg': 'hero_bg.jpg'
  };

  for (const [srcName, destName] of Object.entries(mappings)) {
    const sPath = path.join(srcDir, srcName);
    const dPath = path.join(destDir, destName);
    if (fs.existsSync(sPath)) {
      fs.copyFileSync(sPath, dPath);
    }
  }
} catch (e) {
  console.log('Copy sync note:', e.message);
}

const brainHeroPath = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\99a90ff1-734a-4ea9-9dc3-7ba01e5658cd\\media__1784786622969.jpg';
try {
  if (fs.existsSync(brainHeroPath)) {
    const pubHero = path.join(__dirname, 'public', 'hero_bg.jpg');
    fs.copyFileSync(brainHeroPath, pubHero);
  }
} catch(e) {}

// Helper to parse JSON request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  let reqUrl = req.url === '/' || req.url === '/index.html' ? '/index.html' : req.url;

  // =====================================================
  //  REST API ENDPOINTS & DATABASE OPERATIONS
  // =====================================================

  // GET /api/orders -> Return all customer orders for Admin Panel
  if (req.method === 'GET' && reqUrl === '/api/orders') {
    const db = getDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, orders: db.orders || [] }));
    return;
  }

  // POST /api/orders -> Place new customer order (Database Save)
  if (req.method === 'POST' && reqUrl === '/api/orders') {
    const payload = await parseRequestBody(req);
    const db = getDb();
    if (!db.orders) db.orders = [];

    const orderId = payload.orderId || ('SHR' + Date.now().toString().slice(-8).toUpperCase());
    const newOrder = {
      orderId: orderId,
      name: payload.name || 'Anonymous Customer',
      phone: payload.phone || '',
      email: payload.email || '',
      address: payload.address || '',
      city: payload.city || '',
      state: payload.state || '',
      pin: payload.pin || '',
      items: payload.items || [],
      total: payload.total || 0,
      paymentMethod: payload.paymentMethod || 'cod',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    db.orders.unshift(newOrder);
    saveDb(db);

    console.log(`\n📦 NEW DATABASE ORDER CREATED: ${orderId} by ${newOrder.name} ($${newOrder.total})`);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, orderId: orderId, order: newOrder }));
    return;
  }

  // PUT /api/orders/:id/status -> Update status of an order in database
  if (req.method === 'PUT' && reqUrl.startsWith('/api/orders/')) {
    const parts = reqUrl.split('/');
    const targetOrderId = parts[3];
    const payload = await parseRequestBody(req);
    const db = getDb();
    const order = (db.orders || []).find(o => o.orderId === targetOrderId);

    if (order) {
      order.status = payload.status || order.status;
      saveDb(db);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Status updated', order }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Order not found' }));
    }
    return;
  }

  // POST /api/auth/register -> User Signup Database save
  if (req.method === 'POST' && reqUrl === '/api/auth/register') {
    const payload = await parseRequestBody(req);
    const db = getDb();
    if (!db.users) db.users = [];

    const existing = db.users.find(u => u.email.toLowerCase() === (payload.email || '').toLowerCase());
    if (existing) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Email is already registered' }));
      return;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: payload.name || 'User',
      email: payload.email,
      password: payload.password,
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDb(db);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, user: { name: newUser.name, email: newUser.email } }));
    return;
  }

  // POST /api/auth/login -> User Login Database Auth
  if (req.method === 'POST' && reqUrl === '/api/auth/login') {
    const payload = await parseRequestBody(req);
    const db = getDb();
    const user = (db.users || []).find(u =>
      u.email.toLowerCase() === (payload.email || '').toLowerCase() &&
      u.password === payload.password
    );

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: { name: user.name, email: user.email } }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Invalid email or password' }));
    }
    return;
  }

  // Handle hero_bg.jpg direct fallback
  if (reqUrl.includes('hero_bg.jpg')) {
    if (fs.existsSync(brainHeroPath)) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      fs.createReadStream(brainHeroPath).pipe(res);
      return;
    }
  }

  // Clean URL to prevent directory traversal
  let safeUrl = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safeUrl);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n🎉 Shree Server & Database Engine active on port ${PORT}!`);
  console.log(`👉 Main Website: http://localhost:${PORT}`);
  console.log(`👑 Store Admin Panel: http://localhost:${PORT}/admin.html\n`);
});
