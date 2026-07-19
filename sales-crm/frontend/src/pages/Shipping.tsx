import { useEffect, useState } from "react";
import { api } from "../api";
import { Truck as TruckIcon, Package as PackageIcon, CheckCircle, Clock, MapPin } from "lucide-react";

export default function Shipping() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => { api.shipments.list().then(setShipments); api.customers.list().then(setCustomers); }, []);

  const getCustomer = (id: string) => customers.find((c: any) => c.id === id);

  const statusIcon = (s: string) => {
    switch (s) {
      case "delivered": return <CheckCircle size={18} className="text-green-400" />;
      case "in_transit": return <TruckIcon size={18} className="text-blue-400" />;
      default: return <Clock size={18} className="text-yellow-400" />;
    }
  };

  const statusBadge = (s: string) => {
    const c: Record<string, string> = { delivered: "bg-green-500/20 text-green-400", in_transit: "bg-blue-500/20 text-blue-400", pending: "bg-yellow-500/20 text-yellow-400", cancelled: "bg-red-500/20 text-red-400" };
    return <span className={`badge ${c[s] || c.pending}`}>{s?.replace("_", " ")}</span>;
  };

  const updateStatus = async (id: string, status: string) => { await api.shipments.update(id, { status }); api.shipments.list().then(setShipments); };

  const stats = {
    total: shipments.length,
    delivered: shipments.filter((s) => s.status === "delivered").length,
    inTransit: shipments.filter((s) => s.status === "in_transit").length,
    pending: shipments.filter((s) => s.status === "pending").length,
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipping</h1>
        <p className="text-gray-500 mt-1">Track deliveries and manage shipments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Shipments", value: stats.total, icon: PackageIcon, color: "text-gray-400", bg: "bg-gray-500/10" },
          { label: "In Transit", value: stats.inTransit, icon: TruckIcon, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Delivered", value: stats.delivered, icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((s, i) => (
          <div key={i} className="card">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}><s.icon size={20} className={s.color} /></div>
              <div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {shipments.map((s: any) => (
          <div key={s.id} className="card flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              {statusIcon(s.status)}
              <div>
                <p className="font-semibold">{s.trackingNumber}</p>
                <p className="text-sm text-gray-400">{getCustomer(s.customerId)?.name || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><TruckIcon size={14} /> {s.courier || "—"}</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {s.address || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              {statusBadge(s.status)}
              <select className="select w-auto text-xs py-1" value={s.status} onChange={(e) => updateStatus(s.id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
        {shipments.length === 0 && (
          <div className="card text-center py-12">
            <TruckIcon size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No shipments yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
