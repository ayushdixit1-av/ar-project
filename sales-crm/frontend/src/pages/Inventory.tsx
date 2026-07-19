import { useEffect, useState } from "react";
import { api } from "../api";
import { Plus, Search, AlertTriangle, Edit2, Trash2, X, Package as PackageIcon } from "lucide-react";

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [tab, setTab] = useState<"all" | "low">("all");

  const load = () => { api.products.list().then(setProducts); api.products.lowStock().then(setLowStock); };
  useEffect(() => { load(); }, []);

  const filtered = (tab === "all" ? products : lowStock).filter((p: any) => JSON.stringify(p).toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    modal === "new" ? await api.products.create(form) : await api.products.update(form.id, form);
    setModal(null); setForm({}); load();
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete product?")) return; await api.products.delete(id); load(); };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-gray-500 mt-1">{products.length} products &middot; {lowStock.length} low stock alerts</p>
        </div>
        <button onClick={() => { setForm({}); setModal("new"); }} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Product</button>
      </div>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button onClick={() => setTab("all")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "all" ? "bg-brand-600 text-white" : "text-gray-400 hover:bg-gray-800"}`}>
          All Products ({products.length})
        </button>
        <button onClick={() => setTab("low")} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${tab === "low" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"}`}>
          <AlertTriangle size={14} /> Low Stock ({lowStock.length})
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input pl-10" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p: any) => (
          <div key={p.id} className={`card hover:border-brand-500 transition-all ${(p.stock || 0) <= (p.minStock || 10) ? "border-red-500/40" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <PackageIcon size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.sku || "N/A"}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setForm(p); setModal("edit"); }} className="p-1.5 hover:bg-gray-700 rounded-lg"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-700 rounded-lg text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Price</span><span className="font-medium">₹{(p.price || 0).toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Stock</span>
                <span className={`font-medium ${(p.stock || 0) <= (p.minStock || 10) ? "text-red-400" : "text-green-400"}`}>{p.stock || 0} units</span>
              </div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Category</span><span className="text-gray-300">{p.category || "-"}</span></div>
              {(p.stock || 0) <= (p.minStock || 10) && (
                <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg text-xs text-red-400">
                  <AlertTriangle size={14} /> Low stock alert — reorder at {p.minStock || 10} units
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-gray-500 py-8">No products found</p>}

      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{modal === "new" ? "Add" : "Edit"} Product</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-sm text-gray-400">Name</label><input className="input mt-1" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-400">SKU</label><input className="input mt-1" value={form.sku || ""} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></div>
                <div><label className="text-sm text-gray-400">Category</label><input className="input mt-1" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-400">Price (₹)</label><input type="number" className="input mt-1" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required /></div>
                <div><label className="text-sm text-gray-400">Stock</label><input type="number" className="input mt-1" value={form.stock || ""} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
              </div>
              <div><label className="text-sm text-gray-400">Min Stock (alert threshold)</label><input type="number" className="input mt-1" value={form.minStock || ""} onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })} /></div>
              <button type="submit" className="btn-primary w-full">{modal === "new" ? "Create Product" : "Update Product"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
