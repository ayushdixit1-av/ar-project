import { useEffect, useState } from "react";
import { api } from "../api";
import { Plus, FileText, CheckCircle, X, Eye } from "lucide-react";

export default function Sales() {
  const [tab, setTab] = useState<"quotations" | "orders">("quotations");
  const [quotations, setQuotations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const [form, setForm] = useState<any>({ items: [{ productId: "", quantity: 1, price: 0 }] });
  const [detail, setDetail] = useState<any>(null);

  const load = () => { api.quotations.list().then(setQuotations); api.orders.list().then(setOrders); api.customers.list().then(setCustomers); api.products.list().then(setProducts); };
  useEffect(() => { load(); }, []);

  const addItem = () => setForm({ ...form, items: [...form.items, { productId: "", quantity: 1, price: 0 }] });
  const removeItem = (i: number) => setForm({ ...form, items: form.items.filter((_: any, idx: number) => idx !== i) });
  const updateItem = (i: number, field: string, value: any) => {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: field === "productId" ? value : Number(value) };
    if (field === "productId") { const p = products.find((p: any) => p.id === value); if (p) items[i].price = p.price; }
    setForm({ ...form, items });
  };

  const total = (form.items || []).reduce((s: number, it: any) => s + (it.price || 0) * (it.quantity || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "quotations") { await api.quotations.create({ ...form, totalAmount: total }); }
    else { await api.orders.create({ ...form, totalAmount: total }); }
    setModal(null); setForm({ items: [{ productId: "", quantity: 1, price: 0 }] }); load();
  };

  const approveQuotation = async (id: string) => { await api.quotations.approve(id); load(); };

  const statusBadge = (s: string) => {
    const c: Record<string, string> = { draft: "bg-gray-500/20 text-gray-400", approved: "bg-green-500/20 text-green-400", confirmed: "bg-blue-500/20 text-blue-400", shipped: "bg-purple-500/20 text-purple-400", delivered: "bg-emerald-500/20 text-emerald-400", cancelled: "bg-red-500/20 text-red-400", pending: "bg-yellow-500/20 text-yellow-400" };
    return <span className={`badge ${c[s] || c.draft}`}>{s}</span>;
  };

  const currentList = tab === "quotations" ? quotations : orders;

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Sales</h1>
        <button onClick={() => { setForm({ items: [{ productId: "", quantity: 1, price: 0 }], customerId: "" }); setModal("new"); }} className="btn-primary flex items-center gap-2"><Plus size={16} /> New {tab === "quotations" ? "Quotation" : "Order"}</button>
      </div>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {(["quotations", "orders"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-brand-600 text-white" : "text-gray-400 hover:bg-gray-800"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)} ({t === "quotations" ? quotations.length : orders.length})
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-500">
              <th className="p-3">{tab === "quotations" ? "Quote #" : "Order #"}</th>
              <th className="p-3 hidden md:table-cell">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 hidden md:table-cell">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map((item: any) => (
              <tr key={item.id} className="table-row">
                <td className="p-3 font-medium">{item.quotationNumber || item.orderNumber}</td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{customers.find((c: any) => c.id === item.customerId)?.name || "-"}</td>
                <td className="p-3 font-medium">₹{(item.totalAmount || 0).toLocaleString()}</td>
                <td className="p-3">{statusBadge(item.status)}</td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setDetail(item)} className="p-1.5 hover:bg-gray-700 rounded-lg"><Eye size={15} /></button>
                    {tab === "quotations" && item.status === "draft" && (
                      <button onClick={() => approveQuotation(item.id)} className="p-1.5 hover:bg-green-700 rounded-lg text-green-400"><CheckCircle size={15} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentList.length === 0 && <p className="text-center text-gray-500 py-8">No {tab} found</p>}
      </div>

      {/* DETAIL MODAL */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{detail.quotationNumber || detail.orderNumber}</h2>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between py-1 border-b border-gray-800"><span className="text-gray-500">Status</span>{statusBadge(detail.status)}</div>
              <div className="flex justify-between py-1 border-b border-gray-800"><span className="text-gray-500">Total</span><span>₹{(detail.totalAmount || 0).toLocaleString()}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-800"><span className="text-gray-500">Created</span><span>{new Date(detail.createdAt).toLocaleString()}</span></div>
            </div>
            {detail.items && detail.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                {detail.items.map((it: any, i: number) => (
                  <div key={i} className="flex justify-between p-2 bg-gray-800/50 rounded mb-1 text-sm">
                    <span>{products.find((p: any) => p.id === it.productId)?.name || "Product"}</span>
                    <span className="text-gray-400">Qty: {it.quantity} × ₹{(it.price || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New {tab === "quotations" ? "Quotation" : "Order"}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Customer</label>
                <select className="select mt-1" value={form.customerId || ""} onChange={(e) => setForm({ ...form, customerId: e.target.value })} required>
                  <option value="">Select customer</option>
                  {customers.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Items</label>
                  <button type="button" onClick={addItem} className="text-xs text-brand-400 hover:text-brand-300">+ Add Item</button>
                </div>
                {form.items.map((it: any, i: number) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <select className="select flex-1" value={it.productId} onChange={(e) => updateItem(i, "productId", e.target.value)} required>
                      <option value="">Product</option>
                      {products.map((p: any) => <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString()})</option>)}
                    </select>
                    <input type="number" className="input w-20" value={it.quantity} onChange={(e) => updateItem(i, "quantity", e.target.value)} min={1} />
                    {form.items.length > 1 && <button type="button" onClick={() => removeItem(i)} className="text-red-400 px-2">✕</button>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between p-3 bg-gray-800 rounded-lg font-semibold">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
              <button type="submit" className="btn-primary w-full">Create {tab === "quotations" ? "Quotation" : "Order"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
