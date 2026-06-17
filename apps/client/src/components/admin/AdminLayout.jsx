import React from 'react';
import { ShieldCheck, Terminal, Server, Cpu, Database, LogOut } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

/**
 * AdminLayout Component
 * Isolates global system metric monitoring dashboards, deployment telemetry boards, 
 * and persistent container runtime configurations.
 * * @param {React.ReactNode} children - Core configuration panels or graphs injected downstream
 */
export default function AdminLayout({ children }) {
  const { setAppOpen } = useUiStore();

  const sidebarLinks = [
    { icon: <Cpu className="h-4 w-4" />, name: "SYSTEM_METRICS", desc: "Core cluster node monitoring" },
    { icon: <Server className="h-4 w-4" />, name: "TUNNEL_MATRIX", desc: "Active socket channel pools" },
    { icon: <Database className="h-4 w-4" />, name: "VOLATILE_CACHE", desc: "Transient memory degradation logs" },
  ];

  return (
    <div className="min-h-screen bg-darkBg text-gray-100 flex flex-col font-mono selection:bg-cyan-500 selection:text-black">
      
      {/* Top Console Boundary Navigation Bar */}
      <header className="h-14 border-b border-gray-900 bg-[#070C15] px-4 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
            <Terminal className="h-4 w-4 stroke-[2]" />
          </div>
          <span className="text-xs font-black tracking-widest text-gray-200 uppercase">
            INTENT // SYSTEM OVERRIDE CONSOLE
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-bold tracking-normal animate-pulse">
            ROOT_AUTH
          </span>
        </div>

        <button 
          onClick={() => setAppOpen(false)}
          className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-red-400 transition-colors py-1 px-2 border border-transparent hover:border-gray-900 rounded-lg"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">EXIT_CONSOLE</span>
        </button>
      </header>

      {/* Main Structural Frame Dashboard Chassis */}
      <div className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto min-h-0">
        
        {/* Left Diagnostics Routing Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-900/80 p-4 shrink-0 select-none space-y-6">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2">
              Diagnostic Layers
            </h3>
            
            <div className="space-y-1">
              {sidebarLinks.map((link, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${
                    idx === 0 
                      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-bold' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-950/40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{link.icon}</div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs tracking-wider uppercase">{link.name}</span>
                    <span className="text-[9px] text-gray-600 tracking-tight font-sans mt-0.5 truncate leading-tight">
                      {link.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Card Indicator */}
          <div className="p-3 rounded-xl bg-gray-950/40 border border-gray-900 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>CLUSTER CORE SECURE</span>
            </div>
            <p className="font-sans text-[11px] leading-relaxed text-gray-500">
              Microservices balancing pools are adjusting dynamically across transient edge nodes. Ready for memory sweep execution.
            </p>
          </div>
        </aside>

        {/* Dynamic Injected Config Panels Main Slot Viewport */}
        <main className="flex-grow p-4 md:p-6 overflow-y-auto min-h-0">
          <div className="space-y-6 max-w-4xl animate-fadeIn">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
