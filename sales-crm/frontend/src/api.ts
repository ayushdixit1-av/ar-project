const BASE = "/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function request(url: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${url}`, { ...options, headers: { ...getHeaders(), ...options.headers } });
  if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/login"; throw new Error("Unauthorized"); }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  auth: {
    login: (email: string, password: string) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
    me: () => request("/auth/me"),
  },
  leads: {
    list: () => request("/leads"),
    get: (id: string) => request(`/leads/${id}`),
    create: (data: any) => request("/leads", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/leads/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => request(`/leads/${id}`, { method: "DELETE" }),
    convert: (id: string) => request(`/leads/${id}/convert`, { method: "POST" }),
  },
  customers: {
    list: () => request("/customers"),
    get: (id: string) => request(`/customers/${id}`),
    create: (data: any) => request("/customers", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => request(`/customers/${id}`, { method: "DELETE" }),
  },
  companies: {
    list: () => request("/companies"),
    create: (data: any) => request("/companies", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/companies/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => request(`/companies/${id}`, { method: "DELETE" }),
  },
  products: {
    list: () => request("/products"),
    get: (id: string) => request(`/products/${id}`),
    create: (data: any) => request("/products", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) => request(`/products/${id}`, { method: "DELETE" }),
    lowStock: () => request("/inventory/low-stock"),
  },
  quotations: {
    list: () => request("/quotations"),
    create: (data: any) => request("/quotations", { method: "POST", body: JSON.stringify(data) }),
    approve: (id: string) => request(`/quotations/${id}/approve`, { method: "POST" }),
  },
  orders: {
    list: () => request("/orders"),
    get: (id: string) => request(`/orders/${id}`),
    create: (data: any) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/orders/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },
  invoices: {
    list: () => request("/invoices"),
    get: (id: string) => request(`/invoices/${id}`),
    create: (data: any) => request("/invoices", { method: "POST", body: JSON.stringify(data) }),
    pay: (id: string, data: any) => request(`/invoices/${id}/pay`, { method: "POST", body: JSON.stringify(data) }),
  },
  payments: {
    list: () => request("/payments"),
  },
  shipments: {
    list: () => request("/shipments"),
    create: (data: any) => request("/shipments", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/shipments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  },
  warehouses: {
    list: () => request("/warehouses"),
    create: (data: any) => request("/warehouses", { method: "POST", body: JSON.stringify(data) }),
  },
  activities: {
    list: () => request("/activities"),
  },
  analytics: {
    dashboard: () => request("/analytics/dashboard"),
  },
  seed: () => request("/seed", { method: "POST" }),
};
