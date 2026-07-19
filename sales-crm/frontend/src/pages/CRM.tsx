import { useEffect, useState } from "react";
import { api } from "../api";
import { Plus, Search, ArrowRightLeft, Trash2, X, Eye, Edit2 } from "lucide-react";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400", contacted: "bg-cyan-500/20 text-cyan-400", qualified: "bg-purple-500/20 text-purple-400",
  proposal: "bg-yellow-500/20 text-yellow-400", negotiation: "bg-orange-500/20 text-orange-400",
  closed_won: "bg-green-500/20 text-green-400", closed_lost: "bg-red-500/20 text-red-400", converted: "bg-emerald-500/20 text-emerald-400",
};

export default function CRM() {
  const [tab, setTab] = useState<"leads" | "customers" | "companies">("leads");
  const [leads, setLeads] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [detail, setDetail] = useState<any>(null);

  const load = () => { api.leads.list().then(setLeads); api.customers.list().then(setCustomers); api.companies.list().then(setCompanies); };
  useEffect(() => { load(); }, []);

  const filtered = (tab === "leads" ? leads : tab === "customers" ? customers : companies).filter((i: any) =>
    JSON.stringify(i).toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "leads") { modal === "new" ? await api.leads.create(form) : await api.leads.update(detail.id, form); }
    else if (tab === "customers") { modal === "new" ? await api.customers.create(form) : await api.customers.update(detail.id, form); }
    else { modal === "new" ? await api.companies.create(form) : await api.companies.update(detail.id, form); }
    setModal(null); setForm({}); load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    if (tab === "leads") await api.leads.delete(id);
    else if (tab === "customers") await api.customers.delete(id);
    else await api.companies.delete(id);
    load(); setDetail(null);
  };

  const convertLead = async (id: string) => { await api.leads.convert(id); load(); alert("Lead converted to customer!"); };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">CRM</h1>
        <button onClick={() => { setForm({}); setModal("new"); }} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add {tab.slice(0, -1)}</button>
      </div>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {(["leads", "customers", "companies"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-brand-600 text-white" : "text-gray-400 hover:bg-gray-800"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)} ({t === "leads" ? leads.length : t === "customers" ? customers.length : companies.length})
          </button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="input pl-10" />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-500">
              <th className="p-3">Name</th>
              <th className="p-3 hidden md:table-cell">Email</th>
              <th className="p-3 hidden lg:table-cell">Phone</th>
              <th className="p-3 hidden lg:table-cell">{tab === "companies" ? "Industry" : "Company"}</th>
              {tab === "leads" && <th className="p-3">Status</th>}
              {tab === "leads" && <th className="p-3 hidden md:table-cell">Value</th>}
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item: any) => (
              <tr key={item.id} className="table-row">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-400 hidden md:table-cell">{item.email}</td>
                <td className="p-3 text-gray-400 hidden lg:table-cell">{item.phone || "-"}</td>
                <td className="p-3 text-gray-400 hidden lg:table-cell">{item.company || item.industry || "-"}</td>
                {tab === "leads" && <td className="p-3"><span className={`badge ${statusColors[item.status] || "bg-gray-500/20 text-gray-400"}`}>{item.status?.replace("_", " ")}</span></td>}
                {tab === "leads" && <td className="p-3 text-gray-400 hidden md:table-cell">₹{(item.value || 0).toLocaleString()}</td>}
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setDetail(item); }} className="p-1.5 hover:bg-gray-700 rounded-lg transition-all"><Eye size={15} /></button>
                    <button onClick={() => { setDetail(item); setForm(item); setModal("edit"); }} className="p-1.5 hover:bg-gray-700 rounded-lg transition-all"><Edit2 size={15} /></button>
                    {tab === "leads" && item.status !== "converted" && (
                      <button onClick={() => convertLead(item.id)} className="p-1.5 hover:bg-green-700 rounded-lg transition-all text-green-400" title="Convert to Customer"><ArrowRightLeft size={15} /></button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-700 rounded-lg transition-all text-red-400"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8">No {tab} found</p>}
      </div>

      {/* DETAIL MODAL */}
      {detail && !modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{detail.name}</h2>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-2 text-sm">
              {Object.entries(detail).filter(([k]) => !["id", "createdAt", "updatedAt"].includes(k)).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-gray-200">{typeof v === "object" ? JSON.stringify(v) : String(v || "-")}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => { setForm(detail); setModal("edit"); }} className="btn-primary flex-1">Edit</button>
              <button onClick={() => handleDelete(detail.id)} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full animate-slideIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{modal === "new" ? "Add" : "Edit"} {tab.slice(0, -1)}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-sm text-gray-400">Name</label><input className="input mt-1" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><label className="text-sm text-gray-400">Email</label><input type="email" className="input mt-1" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><label className="text-sm text-gray-400">Phone</label><input className="input mt-1" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div><label className="text-sm text-gray-400">{tab === "companies" ? "Industry" : "Company"}</label><input className="input mt-1" value={tab === "companies" ? (form.industry || "") : (form.company || "")} onChange={(e) => setForm({ ...form, [tab === "companies" ? "industry" : "company"]: e.target.value })} /></div>
              {tab === "leads" && (
                <>
                  <div><label className="text-sm text-gray-400">Status</label>
                    <select className="select mt-1" value={form.status || "new"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      {["new", "contacted", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </div>
                  <div><label className="text-sm text-gray-400">Value (₹)</label><input type="number" className="input mt-1" value={form.value || ""} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} /></div>
                  <div><label className="text-sm text-gray-400">Source</label>
                    <select className="select mt-1" value={form.source || "website"} onChange={(e) => setForm({ ...form, source: e.target.value })}>
                      {["website", "referral", "cold_call", "social", "advertisement"].map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </div>
                </>
              )}
              <button type="submit" className="btn-primary w-full">{modal === "new" ? "Create" : "Update"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
