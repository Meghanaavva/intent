import React from 'react';
import { useIntentStore } from '../../store/intentStore';
import { useUiStore } from '../../store/uiStore';
import { Trash2, Radio, User, Layers, Clock, ShieldAlert } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';

/**
 * IntentsList Component (Admin Monitor)
 * Provides deep administrative structural visibility over the global volatile cache pool.
 * Empowers immediate, forced memory scrubbing of active intent payloads.
 */
export default function IntentsList() {
  const { intents, removeIntent } = useIntentStore();
  const { setToast } = useUiStore();

  const handleForceScrubPayload = async (intentId) => {
    if (!intentId) return;
    
    try {
      // Execute global store cache deletion query sequence
      await removeIntent(intentId);
      setToast(`BROADCAST_NODE [${intentId.slice(-8).toUpperCase()}] PURGED FROM ACTIVE HEAP.`);
    } catch (err) {
      setToast("Failed to isolate and scrub active cluster payload node.");
    }
  };

  return (
    <div className="w-full bg-[#0E1524]/20 border border-gray-900 rounded-2xl p-5 space-y-6 select-none shadow-2xl">
      
      {/* Component Metric Title Segment */}
      <div className="flex items-center justify-between border-b border-gray-900 pb-4">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
          <h3 className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase">
            LIVE BROADCAST MATRIX REGISTRY
          </h3>
        </div>
        <div className="font-mono text-[10px] text-gray-500 font-bold bg-gray-950 px-2.5 py-1 border border-gray-900 rounded-lg">
          ACTIVE_HEAPS: {intents.length} PACKETS
        </div>
      </div>

      {/* Main Structural Matrix Stream Container */}
      {intents.length === 0 ? (
        <div className="py-12 border border-dashed border-gray-900 bg-gray-950/20 rounded-xl text-center space-y-2">
          <ShieldAlert className="h-6 w-6 text-gray-700 mx-auto" />
          <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            Transient storage pools are currently vacant. Zero payload tracks register.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-900 rounded-xl bg-gray-950/20">
          <table className="w-full font-mono text-xs text-left border-collapse">
            
            {/* Table Matrix System Headers */}
            <thead className="bg-[#070C15] text-gray-500 text-[10px] uppercase border-b border-gray-900 tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">NODE_ID</th>
                <th className="p-3.5 font-bold">AUTHOR_HANDLE</th>
                <th className="p-3.5 font-bold">VECTOR_CAT</th>
                <th className="p-3.5 font-bold hidden md:table-cell">DATA_PAYLOAD_STRING</th>
                <th className="p-3.5 text-right font-bold">TERMINATION</th>
              </tr>
            </thead>

            {/* Table Dynamic Content Rows */}
            <tbody className="divide-y divide-gray-900/60">
              {intents.map((intent) => {
                const intentId = intent._id || intent.id;
                
                return (
                  <tr 
                    key={intentId} 
                    className="hover:bg-[#0E1524]/30 transition-colors group text-gray-300"
                  >
                    {/* Node Signature Hash Cell */}
                    <td className="p-3.5 font-bold text-cyan-500 text-[11px] whitespace-nowrap">
                      {intentId?.slice(-8).toUpperCase() || 'V_NODE'}
                    </td>

                    {/* Node Originator Avatar Handle Identity Cell */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Avatar seed={intent.author || 'Anon'} size="xs" />
                        <span className="truncate max-w-[110px] text-gray-400 font-bold" title={intent.author}>
                          {intent.author}
                        </span>
                      </div>
                    </td>

                    {/* Operational Vector Target Classification Cell */}
                    <td className="p-3.5 whitespace-nowrap">
                      <Badge className="px-1.5 py-0 rounded text-[9px] font-bold">
                        {intent.category || 'CHAT'}
                      </Badge>
                    </td>

                    {/* Raw Text Extract Dialogue Content Segment */}
                    <td className="p-3.5 text-gray-400 max-w-xs truncate font-sans hidden md:table-cell" title={intent.content}>
                      {intent.content}
                    </td>

                    {/* Force Administrative Purge Action Trigger Cell */}
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Button
                        variant="secondary"
                        onClick={() => handleForceScrubPayload(intentId)}
                        className="p-1.5 border-gray-800 hover:border-red-500/30 hover:bg-red-950/20 text-gray-500 hover:text-red-400 rounded-lg inline-flex items-center justify-center transition-all duration-150 active:scale-95 group-hover:border-gray-800"
                        title="Force-evict payload structural footprint from network registers"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

      {/* Internal Security Verification Checklist Guard */}
      <div className="text-center font-mono text-[9px] text-gray-600 uppercase tracking-widest pt-1">
        [ SYSTEM OVERRIDE TERMINALS COMMIT FORCED CACHE FLUSHING MODES DIRECTLY RUNTIME ]
      </div>

    </div>
  );
}
