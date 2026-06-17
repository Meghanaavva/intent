import React from 'react';
import { Cpu, Server, Radio, Database, ShieldAlert, ArrowUpRight } from 'lucide-react';

/**
 * StatsCards Component
 * Renders real-time telemetry metrics mapping edge node cluster distribution weights.
 * * @param {Object} metrics - Data injection mapping container pipeline usage
 */
export default function StatsCards({ metrics }) {
  
  // High-fidelity programmatic backup defaults for mock visual testing pipelines
  const liveStats = [
    {
      label: "TOTAL_TUNNEL_PIPELINES",
      value: metrics?.totalTunnels ?? "2,841",
      delta: "+14.2%",
      desc: "Concurrent concurrent room links",
      icon: <Server className="h-4 w-4 text-cyan-400" />,
      color: "border-cyan-500/20"
    },
    {
      label: "CLUSTER_THROUGHPUT",
      value: metrics?.throughput ?? "148.6 Mb/s",
      delta: "OPTIMAL",
      desc: "Data multiplexing velocities",
      icon: <Cpu className="h-4 w-4 text-emerald-400" />,
      color: "border-emerald-500/20"
    },
    {
      label: "ACTIVE_BROADCAST_VECTORS",
      value: metrics?.activeBroadcasts ?? "612",
      delta: "-4.1%",
      desc: "Intent index storage arrays",
      icon: <Radio className="h-4 w-4 text-blue-400" />,
      color: "border-blue-500/20"
    },
    {
      label: "VOLATILE_CACHE_CAPACITY",
      value: metrics?.cacheUsage ?? "34.2 GB",
      delta: "22% CAP",
      desc: "Transient client state buffers",
      icon: <Database className="h-4 w-4 text-amber-400" />,
      color: "border-amber-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {liveStats.map((stat, idx) => (
        <div 
          key={idx}
          className={`border ${stat.color} bg-[#0E1524]/40 rounded-2xl p-4 flex flex-col justify-between shadow-xl group hover:border-gray-700 transition-all duration-200 relative overflow-hidden`}
        >
          {/* Top Metadata Description Label Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <span className="font-mono text-[9px] font-black text-gray-500 uppercase tracking-widest block">
                {stat.label}
              </span>
              <p className="font-mono text-xl font-bold text-white tracking-tight mt-1">
                {stat.value}
              </p>
            </div>
            
            {/* Visual Hardware Icon Matrix Container */}
            <div className="h-8 w-8 rounded-xl bg-gray-950 border border-gray-900 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
              {stat.icon}
            </div>
          </div>

          {/* Underlay Operational Progress Ticker Triage */}
          <div className="mt-4 pt-3 border-t border-gray-900/60 flex items-center justify-between text-[10px] font-mono">
            <span className="text-gray-500 font-sans tracking-tight truncate max-w-[70%]">
              {stat.desc}
            </span>
            
            {/* Contextual Operational Tag */}
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5 ${
              stat.delta.includes('-') 
                ? 'bg-red-950/40 border border-red-900/40 text-red-400' 
                : stat.delta === 'OPTIMAL'
                  ? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-400'
                  : 'bg-cyan-950/40 border border-cyan-900/40 text-cyan-400'
            }`}>
              {stat.delta !== 'OPTIMAL' && !stat.delta.includes('CAP') && <ArrowUpRight className="h-2.5 w-2.5 stroke-[3]" />}
              {stat.delta}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
}