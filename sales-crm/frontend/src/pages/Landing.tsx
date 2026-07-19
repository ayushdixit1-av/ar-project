import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Line, Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Shield, BarChart3, Users, Package, CreditCard, Truck, FileText, ShoppingCart, Zap, Target, Boxes, Search } from "lucide-react";
import * as THREE from "three";

let scrollProgress = 0;

const MODULES = [
  { label: "CRM", icon: "👥", color: "#3b82f6" },
  { label: "Sales", icon: "💰", color: "#22c55e" },
  { label: "Analytics", icon: "📊", color: "#a855f7" },
  { label: "Inventory", icon: "📦", color: "#f97316" },
  { label: "Orders", icon: "🛒", color: "#06b6d4" },
  { label: "Invoices", icon: "🧾", color: "#eab308" },
  { label: "Payments", icon: "💳", color: "#ec4899" },
  { label: "Shipping", icon: "🚚", color: "#14b8a6" },
];

function HoloPanel({ position, rotation, label, icon, color, index }: {
  position: [number, number, number]; rotation: [number, number, number];
  label: string; icon: string; color: string; index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const float = Math.sin(t * 0.8 + index * 0.8) * 0.05;
    groupRef.current.position.y = position[1] + float;
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 1.2 + index) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Panel background */}
      <mesh>
        <planeGeometry args={[1.6, 1.0]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Panel border */}
      <mesh>
        <planeGeometry args={[1.64, 1.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner panel */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[1.56, 0.96]} />
        <meshBasicMaterial color="#0a0a1a" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <planeGeometry args={[2.0, 1.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      {/* Label text */}
      <Text position={[0, 0.12, 0.01]} fontSize={0.15} color={color} anchorX="center" anchorY="middle" fontWeight="bold">
        {icon}
      </Text>
      <Text position={[0, -0.18, 0.01]} fontSize={0.12} color="#e2e8f0" anchorX="center" anchorY="middle">
        {label}
      </Text>
      {/* Corner accents */}
      {[[-0.75, 0.45], [0.75, 0.45], [-0.75, -0.45], [0.75, -0.45]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.005]}>
          <circleGeometry args={[0.02, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function RotatingDashboard() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const panelPositions = useMemo(() => {
    return MODULES.map((_, i) => {
      const angle = (i / MODULES.length) * Math.PI * 2;
      const radius = 2.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.3;
      const rotY = -angle + Math.PI;
      return { position: [x, y, z] as [number, number, number], rotation: [0, rotY, 0] as [number, number, number] };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scrollRot = scrollProgress * Math.PI * 2;
    groupRef.current.rotation.y = t * 0.12 + scrollRot;
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.15;

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.08 + 0.3;
      ringRef.current.rotation.z = t * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.06 + 0.5;
      ring2Ref.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {MODULES.map((mod, i) => (
        <HoloPanel
          key={i}
          position={panelPositions[i].position}
          rotation={panelPositions[i].rotation}
          label={mod.label}
          icon={mod.icon}
          color={mod.color}
          index={i}
        />
      ))}

      {/* Center core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.5} transparent opacity={0.6} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.0, 0.008, 8, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.005, 8, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} />
      </mesh>

      {/* Connection lines from center to each panel */}
      {panelPositions.map((pp, i) => (
        <Line key={i} points={[[0, 0, 0], pp.position]} color={MODULES[i].color} lineWidth={0.4} transparent opacity={0.08} />
      ))}

      {/* Floating data particles around the ring */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const r = 3.4 + Math.sin(i * 7) * 0.3;
        return (
          <mesh key={`p-${i}`} position={[Math.cos(angle) * r, Math.sin(angle * 3) * 0.5, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function BackgroundParticles() {
  const count = 600;
  const positions = useMemo(() => { const p = new Float32Array(count * 3); for (let i = 0; i < count * 3; i++) p[i] = (Math.random() - 0.5) * 20; return p; }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => { if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * 0.015; } });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#6366f1" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#a78bfa" />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#818cf8" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#22d3ee" />
      <RotatingDashboard />
      <BackgroundParticles />
      <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={0.4} />
    </>
  );
}

const features = [
  { icon: Users, title: "CRM", desc: "Manage leads, customers & pipelines", color: "from-blue-500 to-cyan-500" },
  { icon: BarChart3, title: "Analytics", desc: "Real-time business intelligence", color: "from-purple-500 to-pink-500" },
  { icon: ShoppingCart, title: "Sales", desc: "Quotes, orders & negotiations", color: "from-green-500 to-emerald-500" },
  { icon: Package, title: "Inventory", desc: "Stock management & alerts", color: "from-orange-500 to-red-500" },
  { icon: Truck, title: "Shipping", desc: "Track deliveries & couriers", color: "from-cyan-500 to-blue-500" },
  { icon: CreditCard, title: "Payments", desc: "Track & reconcile payments", color: "from-pink-500 to-rose-500" },
  { icon: FileText, title: "Invoicing", desc: "GST invoices & credit notes", color: "from-yellow-500 to-orange-500" },
  { icon: Shield, title: "Roles", desc: "Admin, Sales, Finance & more", color: "from-indigo-500 to-violet-500" },
];

const pipeline = [
  "Website Lead", "Sales Assignment", "Customer Contact", "Quotation", "Negotiation", "Order Confirmed", "Invoice Generated", "Payment Tracking", "Inventory Update", "Shipping", "Delivered", "Support",
];

export default function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      scrollProgress = Math.min(1, y / (typeof window !== "undefined" ? window.innerHeight : 1000));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-950 text-white overflow-x-hidden">

      {/* ========== HERO — Split Layout ========== */}
      <section className="relative h-screen flex items-center overflow-hidden">

        {/* LEFT — 3D Rotating Dashboard */}
        <div className="absolute inset-0 lg:w-1/2 lg:relative lg:inset-auto z-0 h-full">
          <Canvas camera={{ position: [0, 0.5, 6.5], fov: 50 }} style={{ background: "transparent" }}>
            <Scene />
          </Canvas>
        </div>

        {/* RIGHT — Branding & CTA */}
        <div className="relative z-10 lg:w-1/2 lg:pl-8 flex flex-col justify-center px-6 lg:px-12 py-12"
          style={{ opacity: Math.max(0, 1 - scrollY / 600) }}>

          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-600/15 border border-brand-500/25 rounded-full text-brand-300 text-sm font-medium">
              <Zap size={14} className="text-brand-400" /> AI-Powered Business Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-2 leading-[1.1]"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            <span className="bg-gradient-to-r from-white via-brand-200 to-brand-400 bg-clip-text text-transparent">Sales</span>
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">Flow</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-2 max-w-lg leading-relaxed"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
            The complete <span className="text-white font-medium">Sales CRM + Order Management</span> + Business Management System
          </p>

          <div className="flex flex-wrap gap-2 mb-6 text-xs text-gray-500"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}>
            {["CRM", "Sales", "Inventory", "Shipping", "Payments", "Invoicing", "Analytics", "Roles"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-gray-800/60 border border-gray-700/50 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <button onClick={() => navigate("/login")} className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 rounded-xl font-semibold text-base transition-all hover:scale-105 animate-glow">
              Get Started Free
            </button>
            <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-3.5 border border-gray-700 hover:border-brand-500 rounded-xl font-semibold text-base transition-all hover:scale-105 flex items-center gap-2">
              Explore Features <ArrowDown size={18} />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-gray-600">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 99.9% Uptime</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 6 User Roles</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> AI Analytics</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce" style={{ opacity: Math.max(0, 1 - scrollY / 200) }}>
          <ArrowDown size={24} className="text-gray-500" />
        </div>
      </section>

      {/* ========== PIPELINE FLOW ========== */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Complete Sales Lifecycle</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">From first website visit to delivered product — every step tracked and automated</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {pipeline.map((step, i) => (
              <div key={i} className="relative group">
                <div className="card text-center py-6 transition-all duration-500 hover:border-brand-500 hover:scale-105 cursor-default"
                  style={{ opacity: Math.min(1, Math.max(0, (scrollY - 400 + i * 60) / 200)) }}>
                  <div className="w-10 h-10 rounded-full bg-brand-600/20 flex items-center justify-center mx-auto mb-3 text-brand-400 font-bold text-sm">{i + 1}</div>
                  <p className="text-xs font-medium text-gray-300">{step}</p>
                </div>
                {i < pipeline.length - 1 && i % 6 !== 5 && <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-brand-600/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">All-in-One Modules</h2>
          <p className="text-gray-400 text-center mb-16">Everything your business needs in a single platform</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card group hover:border-brand-500 transition-all duration-300 hover:scale-105 cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARCHITECTURE ========== */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Built for Scale</h2>
          <p className="text-gray-400 mb-12">Enterprise-grade architecture with modern tech stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "React + TypeScript", sub: "Frontend" },
              { label: "Three.js 3D", sub: "Visual Experience" },
              { label: "Node.js + Express", sub: "Backend API" },
              { label: "JWT Auth", sub: "Security" },
              { label: "REST API", sub: "Architecture" },
              { label: "JSON Storage", sub: "Database" },
              { label: "Real-time Analytics", sub: "Business Intel" },
              { label: "Role-Based Access", sub: "6 User Roles" },
            ].map((t, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-800 bg-gray-900 hover:border-brand-500 transition-all">
                <p className="font-semibold text-sm">{t.label}</p>
                <p className="text-xs text-gray-500 mt-1">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-400 text-lg mb-8">Start managing your entire sales lifecycle with AI-powered insights</p>
          <button onClick={() => navigate("/login")} className="px-10 py-4 bg-brand-600 hover:bg-brand-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 animate-glow">
            Launch SalesFlow
          </button>
          <p className="text-xs text-gray-600 mt-6">Demo: admin@crm.com / admin123</p>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 px-4 text-center text-gray-600 text-sm">
        SalesFlow CRM — AI-Powered Business Management Platform
      </footer>
    </div>
  );
}
