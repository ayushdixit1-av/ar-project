const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;
const JWT_SECRET = "sales-crm-secret-key-2024";
const DB_DIR = path.join(__dirname, "storage");

app.use(cors());
app.use(express.json());

// ============ STORAGE HELPERS ============
function ensureStorage() {
  const dirs = ["leads", "customers", "companies", "products", "orders", "invoices", "payments", "shipments", "users", "quotations", "warehouses", "activities"];
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  dirs.forEach((d) => {
    const dir = path.join(DB_DIR, d);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
  const usersFile = path.join(DB_DIR, "users", "index.json");
  if (!fs.existsSync(usersFile)) {
    const hash = bcrypt.hashSync("admin123", 10);
    writeJSON(usersFile, [
      { id: "1", name: "Admin", email: "admin@crm.com", password: hash, role: "admin", createdAt: new Date().toISOString() },
      { id: "2", name: "Sales Manager", email: "manager@crm.com", password: hash, role: "sales_manager", createdAt: new Date().toISOString() },
      { id: "3", name: "Sales Exec", email: "exec@crm.com", password: hash, role: "sales_executive", createdAt: new Date().toISOString() },
      { id: "4", name: "Warehouse", email: "warehouse@crm.com", password: hash, role: "warehouse", createdAt: new Date().toISOString() },
      { id: "5", name: "Finance", email: "finance@crm.com", password: hash, role: "finance", createdAt: new Date().toISOString() },
      { id: "6", name: "Support", email: "support@crm.com", password: hash, role: "support", createdAt: new Date().toISOString() },
    ]);
  }
  ["leads", "customers", "companies", "products", "orders", "invoices", "payments", "shipments", "quotations", "warehouses", "activities"].forEach((d) => {
    const f = path.join(DB_DIR, d, "index.json");
    if (!fs.existsSync(f)) writeJSON(f, []);
  });
}

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf-8")); } catch { return []; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getItem(collection, id) {
  return readJSON(path.join(DB_DIR, collection, "index.json")).find((i) => i.id === id);
}

function getAll(collection) {
  return readJSON(path.join(DB_DIR, collection, "index.json"));
}

function saveAll(collection, data) {
  writeJSON(path.join(DB_DIR, collection, "index.json"), data);
}

function createItem(collection, item) {
  const items = getAll(collection);
  item.id = uuidv4();
  item.createdAt = new Date().toISOString();
  item.updatedAt = new Date().toISOString();
  items.push(item);
  saveAll(collection, items);
  return item;
}

function updateItem(collection, id, updates) {
  const items = getAll(collection);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
  saveAll(collection, items);
  return items[idx];
}

function deleteItem(collection, id) {
  const items = getAll(collection);
  const filtered = items.filter((i) => i.id !== id);
  saveAll(collection, filtered);
  return filtered.length < items.length;
}

// ============ AUTH MIDDLEWARE ============
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ============ AUTH ROUTES ============
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = getAll("users");
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get("/api/auth/me", auth, (req, res) => {
  const user = getItem("users", req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password, ...safe } = user;
  res.json(safe);
});

// ============ LEADS ============
app.get("/api/leads", auth, (req, res) => res.json(getAll("leads")));
app.get("/api/leads/:id", auth, (req, res) => {
  const lead = getItem("leads", req.params.id);
  lead ? res.json(lead) : res.status(404).json({ error: "Not found" });
});
app.post("/api/leads", auth, (req, res) => res.json(createItem("leads", req.body)));
app.put("/api/leads/:id", auth, (req, res) => {
  const lead = updateItem("leads", req.params.id, req.body);
  lead ? res.json(lead) : res.status(404).json({ error: "Not found" });
});
app.delete("/api/leads/:id", auth, (req, res) => {
  deleteItem("leads", req.params.id) ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});
app.post("/api/leads/:id/convert", auth, (req, res) => {
  const lead = getItem("leads", req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  const customer = createItem("customers", { name: lead.name, email: lead.email, phone: lead.phone, company: lead.company, source: "converted_lead", leadId: lead.id });
  updateItem("leads", lead.id, { status: "converted", customerId: customer.id });
  createItem("activities", { type: "lead_converted", entityId: lead.id, description: `Lead ${lead.name} converted to customer`, userId: req.user.id });
  res.json(customer);
});

// ============ CUSTOMERS ============
app.get("/api/customers", auth, (req, res) => res.json(getAll("customers")));
app.get("/api/customers/:id", auth, (req, res) => {
  const c = getItem("customers", req.params.id);
  c ? res.json(c) : res.status(404).json({ error: "Not found" });
});
app.post("/api/customers", auth, (req, res) => res.json(createItem("customers", req.body)));
app.put("/api/customers/:id", auth, (req, res) => {
  const c = updateItem("customers", req.params.id, req.body);
  c ? res.json(c) : res.status(404).json({ error: "Not found" });
});
app.delete("/api/customers/:id", auth, (req, res) => {
  deleteItem("customers", req.params.id) ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

// ============ COMPANIES ============
app.get("/api/companies", auth, (req, res) => res.json(getAll("companies")));
app.post("/api/companies", auth, (req, res) => res.json(createItem("companies", req.body)));
app.put("/api/companies/:id", auth, (req, res) => {
  const c = updateItem("companies", req.params.id, req.body);
  c ? res.json(c) : res.status(404).json({ error: "Not found" });
});
app.delete("/api/companies/:id", auth, (req, res) => {
  deleteItem("companies", req.params.id) ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

// ============ PRODUCTS / INVENTORY ============
app.get("/api/products", auth, (req, res) => res.json(getAll("products")));
app.get("/api/products/:id", auth, (req, res) => {
  const p = getItem("products", req.params.id);
  p ? res.json(p) : res.status(404).json({ error: "Not found" });
});
app.post("/api/products", auth, (req, res) => res.json(createItem("products", req.body)));
app.put("/api/products/:id", auth, (req, res) => {
  const p = updateItem("products", req.params.id, req.body);
  p ? res.json(p) : res.status(404).json({ error: "Not found" });
});
app.delete("/api/products/:id", auth, (req, res) => {
  deleteItem("products", req.params.id) ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});
app.get("/api/inventory/low-stock", auth, (req, res) => {
  const products = getAll("products");
  res.json(products.filter((p) => (p.stock || 0) <= (p.minStock || 10)));
});

// ============ QUOTATIONS ============
app.get("/api/quotations", auth, (req, res) => res.json(getAll("quotations")));
app.post("/api/quotations", auth, (req, res) => {
  const q = createItem("quotations", { ...req.body, status: "draft", quotationNumber: "QT-" + Date.now().toString(36).toUpperCase() });
  res.json(q);
});
app.put("/api/quotations/:id", auth, (req, res) => {
  const q = updateItem("quotations", req.params.id, req.body);
  q ? res.json(q) : res.status(404).json({ error: "Not found" });
});
app.post("/api/quotations/:id/approve", auth, (req, res) => {
  const q = updateItem("quotations", req.params.id, { status: "approved" });
  q ? res.json(q) : res.status(404).json({ error: "Not found" });
});

// ============ ORDERS ============
app.get("/api/orders", auth, (req, res) => res.json(getAll("orders")));
app.get("/api/orders/:id", auth, (req, res) => {
  const o = getItem("orders", req.params.id);
  o ? res.json(o) : res.status(404).json({ error: "Not found" });
});
app.post("/api/orders", auth, (req, res) => {
  const order = createItem("orders", { ...req.body, status: "confirmed", orderNumber: "ORD-" + Date.now().toString(36).toUpperCase() });
  if (req.body.items) {
    req.body.items.forEach((item) => {
      const product = getItem("products", item.productId);
      if (product) {
        updateItem("products", item.productId, { stock: (product.stock || 0) - (item.quantity || 0) });
      }
    });
  }
  createItem("activities", { type: "order_created", entityId: order.id, description: `Order ${order.orderNumber} created`, userId: req.user.id });
  res.json(order);
});
app.put("/api/orders/:id", auth, (req, res) => {
  const o = updateItem("orders", req.params.id, req.body);
  o ? res.json(o) : res.status(404).json({ error: "Not found" });
});
app.post("/api/orders/:id/confirm", auth, (req, res) => {
  const o = updateItem("orders", req.params.id, { status: "confirmed" });
  o ? res.json(o) : res.status(404).json({ error: "Not found" });
});

// ============ INVOICES ============
app.get("/api/invoices", auth, (req, res) => res.json(getAll("invoices")));
app.get("/api/invoices/:id", auth, (req, res) => {
  const inv = getItem("invoices", req.params.id);
  inv ? res.json(inv) : res.status(404).json({ error: "Not found" });
});
app.post("/api/invoices", auth, (req, res) => {
  const inv = createItem("invoices", { ...req.body, status: "pending", invoiceNumber: "INV-" + Date.now().toString(36).toUpperCase() });
  res.json(inv);
});
app.put("/api/invoices/:id", auth, (req, res) => {
  const inv = updateItem("invoices", req.params.id, req.body);
  inv ? res.json(inv) : res.status(404).json({ error: "Not found" });
});
app.post("/api/invoices/:id/pay", auth, (req, res) => {
  const inv = getItem("invoices", req.params.id);
  if (!inv) return res.status(404).json({ error: "Not found" });
  const amount = req.body.amount || inv.totalAmount;
  const payment = createItem("payments", { invoiceId: inv.id, customerId: inv.customerId, amount, method: req.body.method || "bank_transfer", status: "completed", reference: "PAY-" + Date.now().toString(36).toUpperCase() });
  const newPaid = (inv.paidAmount || 0) + amount;
  updateItem("invoices", inv.id, { paidAmount: newPaid, status: newPaid >= inv.totalAmount ? "paid" : "partial" });
  res.json(payment);
});

// ============ PAYMENTS ============
app.get("/api/payments", auth, (req, res) => res.json(getAll("payments")));
app.get("/api/payments/:id", auth, (req, res) => {
  const p = getItem("payments", req.params.id);
  p ? res.json(p) : res.status(404).json({ error: "Not found" });
});

// ============ SHIPMENTS ============
app.get("/api/shipments", auth, (req, res) => res.json(getAll("shipments")));
app.post("/api/shipments", auth, (req, res) => {
  const s = createItem("shipments", { ...req.body, status: "pending", trackingNumber: "TRK-" + Date.now().toString(36).toUpperCase() });
  res.json(s);
});
app.put("/api/shipments/:id", auth, (req, res) => {
  const s = updateItem("shipments", req.params.id, req.body);
  s ? res.json(s) : res.status(404).json({ error: "Not found" });
});

// ============ WAREHOUSES ============
app.get("/api/warehouses", auth, (req, res) => res.json(getAll("warehouses")));
app.post("/api/warehouses", auth, (req, res) => res.json(createItem("warehouses", req.body)));

// ============ ACTIVITIES ============
app.get("/api/activities", auth, (req, res) => {
  const activities = getAll("activities");
  res.json(activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 50));
});

// ============ ANALYTICS ============
app.get("/api/analytics/dashboard", auth, (req, res) => {
  const leads = getAll("leads");
  const customers = getAll("customers");
  const orders = getAll("orders");
  const invoices = getAll("invoices");
  const payments = getAll("payments");
  const products = getAll("products");
  const revenue = invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
  const collected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const outstanding = revenue - collected;
  res.json({
    totalLeads: leads.length,
    totalCustomers: customers.length,
    totalOrders: orders.length,
    totalProducts: products.length,
    totalRevenue: revenue,
    totalCollected: collected,
    outstanding,
    pendingOrders: orders.filter((o) => o.status === "confirmed").length,
    lowStockProducts: products.filter((p) => (p.stock || 0) <= (p.minStock || 10)).length,
    recentOrders: orders.slice(-5).reverse(),
    monthlyRevenue: [
      { month: "Jan", amount: revenue * 0.1 }, { month: "Feb", amount: revenue * 0.12 },
      { month: "Mar", amount: revenue * 0.15 }, { month: "Apr", amount: revenue * 0.08 },
      { month: "May", amount: revenue * 0.18 }, { month: "Jun", amount: revenue * 0.22 },
    ],
  });
});

// ============ SEED DATA ============
app.post("/api/seed", auth, (req, res) => {
  const names = ["Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Gupta", "Vikram Singh", "Anjali Mehta", "Rajesh Verma", "Pooja Nair", "Arjun Reddy", "Meera Joshi"];
  const companies = ["TechCorp", "InnovateLabs", "DataFlow", "CloudNine", "SmartSolutions", "GreenTech", "FinEdge", "MediCare", "BuildRight", "AutoDrive"];
  const products = [
    { name: "Enterprise License", price: 49999, stock: 100, minStock: 10, category: "Software", sku: "SW-001" },
    { name: "Cloud Storage 1TB", price: 9999, stock: 500, minStock: 50, category: "Service", sku: "SV-001" },
    { name: "API Access Pack", price: 19999, stock: 200, minStock: 20, category: "Software", sku: "SW-002" },
    { name: "Support Plan Pro", price: 14999, stock: 300, minStock: 30, category: "Service", sku: "SV-002" },
    { name: "Analytics Dashboard", price: 24999, stock: 8, minStock: 10, category: "Software", sku: "SW-003" },
    { name: "Mobile App License", price: 7999, stock: 150, minStock: 15, category: "Software", sku: "SW-004" },
    { name: "Integration Module", price: 34999, stock: 60, minStock: 10, category: "Software", sku: "SW-005" },
    { name: "Training Program", price: 29999, stock: 5, minStock: 5, category: "Service", sku: "SV-003" },
  ];

  const createdProducts = products.map((p) => createItem("products", p));
  companies.forEach((c) => createItem("companies", { name: c, industry: "Technology", website: `https://${c.toLowerCase()}.com` }));

  const statuses = ["new", "contacted", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"];
  names.forEach((n, i) => {
    const lead = createItem("leads", { name: n, email: `${n.toLowerCase().replace(" ", ".")}@email.com`, phone: `+91-${9000000000 + i}`, company: companies[i], status: statuses[i % statuses.length], source: ["website", "referral", "cold_call", "social"][i % 4], value: Math.floor(Math.random() * 500000) + 50000 });
    if (i < 5) {
      const cust = createItem("customers", { name: n, email: lead.email, phone: lead.phone, company: companies[i], source: "converted_lead", leadId: lead.id });
      const orderItems = [{ productId: createdProducts[i % createdProducts.length].id, quantity: Math.floor(Math.random() * 5) + 1, price: createdProducts[i % createdProducts.length].price }];
      const total = orderItems.reduce((s, it) => s + it.price * it.quantity, 0);
      const order = createItem("orders", { customerId: cust.id, items: orderItems, totalAmount: total, status: ["confirmed", "shipped", "delivered"][i % 3], orderNumber: `ORD-SEED${i}` });
      const inv = createItem("invoices", { orderId: order.id, customerId: cust.id, items: orderItems, totalAmount: total, paidAmount: i < 3 ? total : total * 0.5, status: i < 3 ? "paid" : "partial", invoiceNumber: `INV-SEED${i}` });
      if (i < 3) createItem("payments", { invoiceId: inv.id, customerId: cust.id, amount: total, method: ["bank_transfer", "upi", "card"][i], status: "completed" });
      if (i > 1) createItem("shipments", { orderId: order.id, customerId: cust.id, status: ["in_transit", "delivered", "pending"][i % 3], courier: "BlueDart", address: `Address for ${n}` });
    }
  });

  res.json({ message: "Seed data created", counts: { products: createdProducts.length, companies: 10, leads: 10, customers: 5 } });
});

// ============ START ============
ensureStorage();
app.listen(PORT, () => {
  console.log(`Sales CRM Backend running at http://localhost:${PORT}`);
  console.log("Default login: admin@crm.com / admin123");
});
