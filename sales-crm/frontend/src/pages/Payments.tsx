import { useEffect, useState } from "react";
import { api } from "../api";
import { CreditCard, IndianRupee } from "lucide-react";

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => { api.payments.list().then(setPayments); api.customers.list().then(setCustomers); }, []);

  const getCustomer = (id: string) => customers.find((c: any) => c.id === id);
  const total = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0);

  const methodBadge = (m: string) => {
    const c: Record<string, string> = { bank_transfer: "bg-blue-500/20 text-blue-400", upi: "bg-purple-500/20 text-purple-400", card: "bg-pink-500/20 text-pink-400", cash: "bg-green-500/20 text-green-400", cheque: "bg-yellow-500/20 text-yellow-400" };
    return <span className={`badge ${c[m] || "bg-gray-500/20 text-gray-400"}`}>{m?.replace("_", " ")}</span>;
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-500 mt-1">{payments.length} payments &middot; Total collected: ₹{total.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center"><IndianRupee size={20} className="text-green-400" /></div>
            <div><p className="text-2xl font-bold">₹{total.toLocaleString()}</p><p className="text-xs text-gray-500">Total Collected</p></div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><CreditCard size={20} className="text-blue-400" /></div>
            <div><p className="text-2xl font-bold">{payments.length}</p><p className="text-xs text-gray-500">Total Transactions</p></div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><CreditCard size={20} className="text-purple-400" /></div>
            <div><p className="text-2xl font-bold">{payments.length > 0 ? `₹${Math.round(total / payments.length).toLocaleString()}` : "₹0"}</p><p className="text-xs text-gray-500">Average Payment</p></div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-500">
              <th className="p-3">Reference</th>
              <th className="p-3 hidden md:table-cell">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3 hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p: any) => (
              <tr key={p.id} className="table-row">
                <td className="p-3 font-medium">{p.reference}</td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{getCustomer(p.customerId)?.name || "-"}</td>
                <td className="p-3 font-medium text-green-400">₹{(p.amount || 0).toLocaleString()}</td>
                <td className="p-3">{methodBadge(p.method)}</td>
                <td className="p-3"><span className={`badge ${p.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{p.status}</span></td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p className="text-center text-gray-500 py-8">No payments recorded yet</p>}
      </div>
    </div>
  );
}
