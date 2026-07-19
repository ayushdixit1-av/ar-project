import { useEffect, useState } from "react";
import { api } from "../api";
import { Plus, Eye, X, CreditCard, FileText } from "lucide-react";

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<any>({});
  const [detail, setDetail] = useState<any>(null);
  const [payModal, setPayModal] = useState<any>(null);
  const [payAmount, setPayAmount] = useState(0);

  const load = () => { api.invoices.list().then(setInvoices); api.customers.list().then(setCustomers); api.orders.list().then(setOrders); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find((o: any) => o.id === form.orderId);
    await api.invoices.create({ ...form, totalAmount: order?.totalAmount || 0, paidAmount: 0 });
    setModal(false); setForm({}); load();
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.invoices.pay(payModal.id, { amount: payAmount, method: form.method || "bank_transfer" });
    setPayModal(null); load();
  };

  const getCustomer = (id: string) => customers.find((c: any) => c.id === id);

  const statusBadge = (s: string) => {
    const c: Record<string, string> = { paid: "bg-green-500/20 text-green-400", pending: "bg-yellow-500/20 text-yellow-400", partial: "bg-orange-500/20 text-orange-400", overdue: "bg-red-500/20 text-red-400" };
    return <span className={`badge ${c[s] || c.pending}`}>{s}</span>;
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <button onClick={() => { setForm({}); setModal(true); }} className="btn-primary flex items-center gap-2"><Plus size={16} /> Create Invoice</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-500">
              <th className="p-3">Invoice #</th>
              <th className="p-3 hidden md:table-cell">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv: any) => (
              <tr key={inv.id} className="table-row">
                <td className="p-3 font-medium">{inv.invoiceNumber}</td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{getCustomer(inv.customerId)?.name || "-"}</td>
                <td className="p-3">₹{(inv.totalAmount || 0).toLocaleString()}</td>
                <td className="p-3 text-green-400">₹{(inv.paidAmount || 0).toLocaleString()}</td>
                <td className="p-3">{statusBadge(inv.status)}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setDetail(inv)} className="p-1.5 hover:bg-gray-700 rounded-lg"><Eye size={15} /></button>
                    {inv.status !== "paid" && (
                      <button onClick={() => { setPayModal(inv); setPayAmount((inv.totalAmount || 0) - (inv.paidAmount || 0)); }} className="p-1.5 hover:bg-green-700 rounded-lg text-green-400"><CreditCard size={15} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && <p className="text-center text-gray-500 py-8">No invoices yet</p>}
      </div>

      {detail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2"><FileText size={20} className="text-brand-400" /><h2 className="text-xl font-bold">{detail.invoiceNumber}</h2></div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-1 border-b border-gray-800 text-sm"><span className="text-gray-500">Customer</span><span>{getCustomer(detail.customerId)?.name || "-"}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-800 text-sm"><span className="text-gray-500">Status</span>{statusBadge(detail.status)}</div>
              <div className="flex justify-between py-1 border-b border-gray-800 text-sm"><span className="text-gray-500">Total Amount</span><span className="font-semibold">₹{(detail.totalAmount || 0).toLocaleString()}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-800 text-sm"><span className="text-gray-500">Paid</span><span className="text-green-400">₹{(detail.paidAmount || 0).toLocaleString()}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-800 text-sm"><span className="text-gray-500">Outstanding</span><span className="text-red-400">₹{((detail.totalAmount || 0) - (detail.paidAmount || 0)).toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Invoice</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
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
                <label className="text-sm text-gray-400">Order</label>
                <select className="select mt-1" value={form.orderId || ""} onChange={(e) => setForm({ ...form, orderId: e.target.value })} required>
                  <option value="">Select order</option>
                  {orders.map((o: any) => <option key={o.id} value={o.id}>{o.orderNumber} — ₹{(o.totalAmount || 0).toLocaleString()}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">Create Invoice</button>
            </form>
          </div>
        </div>
      )}

      {payModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPayModal(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Record Payment</h2>
              <button onClick={() => setPayModal(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <p className="text-sm text-gray-400 mb-4">Invoice: {payModal.invoiceNumber} — Outstanding: ₹{((payModal.totalAmount || 0) - (payModal.paidAmount || 0)).toLocaleString()}</p>
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Amount (₹)</label>
                <input type="number" className="input mt-1" value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))} required min={1} />
              </div>
              <div>
                <label className="text-sm text-gray-400">Payment Method</label>
                <select className="select mt-1" value={form.method || "bank_transfer"} onChange={(e) => setForm({ ...form, method: e.target.value })}>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">Record Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
