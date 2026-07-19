import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, ShoppingCart, Package, IndianRupee, TrendingUp, AlertTriangle, Clock, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#6366f1", "#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#ef4444"];

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.analytics.dashboard(), api.activities.list()]).then(([d, a]) => { setData(d); setActivities(a); }).finally(() => setLoading(false));
  }, []);

  const seedData = async () => {
    await api.seed();
    window.location.reload();
  };

  if (loading) return <div className="flex items-center justify-center h-96"><div className="text-gray-500 text-lg">Loading dashboard...</div></div>;
  if (!data) return <div className="text-center py-20"><p className="text-gray-500 mb-4">No data yet. Seed demo data to get started.</p><button onClick={seedData} className="btn-primary">Load Demo Data</button></div>;

  const stats = [
    { icon: Users, label: "Leads", value: data.totalLeads, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Users, label: "Customers", value: data.totalCustomers, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: ShoppingCart, label: "Orders", value: data.totalOrders, color: "text-green-400", bg: "bg-green-500/10" },
    { icon: IndianRupee, label: "Revenue", value: `₹${(data.totalRevenue / 1000).toFixed(0)}K`, color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: TrendingUp, label: "Collected", value: `₹${(data.totalCollected / 1000).toFixed(0)}K`, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Clock, label: "Outstanding", value: `₹${(data.outstanding / 1000).toFixed(0)}K`, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { icon: Package, label: "Products", value: data.totalProducts, color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: AlertTriangle, label: "Low Stock", value: data.lowStockProducts, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  const pipelineData = [
    { name: "Leads", count: data.totalLeads },
    { name: "Customers", count: data.totalCustomers },
    { name: "Orders", count: data.totalOrders },
    { name: "Low Stock", count: data.lowStockProducts },
  ];

  const statusData = [
    { name: "Paid", value: data.totalCollected },
    { name: "Outstanding", value: data.outstanding },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Business overview at a glance</p>
        </div>
        <button onClick={seedData} className="btn-secondary text-sm">Load Demo Data</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="card hover:border-brand-500 transition-all group cursor-default">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-brand-400" /> Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.monthlyRevenue}>
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-400" /> Payment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Recent Orders</h3>
          {data.recentOrders.length === 0 ? <p className="text-gray-500 text-sm">No orders yet</p> : (
            <div className="space-y-3">
              {data.recentOrders.map((o: any) => (
                <div key={o.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{o.orderNumber}</p>
                    <p className="text-xs text-gray-500">₹{(o.totalAmount || 0).toLocaleString()}</p>
                  </div>
                  <span className={`badge ${o.status === "delivered" ? "bg-green-500/20 text-green-400" : o.status === "shipped" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          {activities.length === 0 ? <p className="text-gray-500 text-sm">No activity yet</p> : (
            <div className="space-y-3">
              {activities.slice(0, 5).map((a: any) => (
                <div key={a.id} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">{a.description}</p>
                    <p className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Add Lead", path: "/crm", icon: Users },
            { label: "New Order", path: "/orders", icon: ShoppingCart },
            { label: "Create Invoice", path: "/invoices", icon: BarChart3 },
            { label: "Check Stock", path: "/inventory", icon: Package },
          ].map((a, i) => (
            <button key={i} onClick={() => navigate(a.path)} className="flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all hover:border-brand-500 border border-gray-700">
              <a.icon size={16} className="text-brand-400" /> {a.label} <ArrowUpRight size={14} className="ml-auto text-gray-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
