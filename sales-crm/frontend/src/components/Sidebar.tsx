import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, ShoppingCart, Package, Truck, CreditCard, FileText, BarChart3, LogOut, Menu, X, Boxes, Target } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/crm", icon: Target, label: "CRM" },
  { to: "/sales", icon: ShoppingCart, label: "Sales" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/orders", icon: Boxes, label: "Orders" },
  { to: "/invoices", icon: FileText, label: "Invoices" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/shipping", icon: Truck, label: "Shipping" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 p-2 rounded-lg">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-40 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-brand-400">SalesFlow</h1>
          <p className="text-xs text-gray-500 mt-1">Business Management</p>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive ? "bg-brand-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
              <l.icon size={18} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold">{user?.name?.[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm px-2 py-2 w-full rounded-lg hover:bg-gray-800 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
