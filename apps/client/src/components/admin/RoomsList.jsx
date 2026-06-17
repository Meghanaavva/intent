import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useUiStore } from '../../store/uiStore';
import { Server, Users, Layers, ShieldAlert, Radio, PowerOff } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

/**
 * RoomsList Component (Admin Monitor)
 * Tracks, assesses, and forces terminations on live concurrency session channels
 * running across the application backend architecture instance.
 */
export default function RoomsList() {
  const socket = useSocket();
  const { setToast } = useUiStore();
  const [activeRooms, setActiveRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hook into continuous administration data transmission sync lines
  useEffect(() => {
    if (!socket) return;

    // Trigger immediate demand request querying active room allocations
    socket.emit('admin:fetch:rooms');

    const handleRoomsTelemetryUpdate = (roomsPayload) => {
      setActiveRooms(roomsPayload || []);
      setIsLoading(false);
    };

    const handleForceTerminationAck = ({ roomId }) => {
      setActiveRooms(prev => prev.filter(room => room.id !== roomId));
      setToast(`TUNNEL_ROOM [${roomId.slice(-12).toUpperCase()}] MANUALLY DISSOLVED.`);
    };

    socket.on('admin:rooms:data', handleRoomsTelemetryUpdate);
    socket.on('admin:room:terminated:ack', handleForceTerminationAck);

    // Establish a baseline poll loop ensuring registry metrics stay fresh
    const telemetryPoll = setInterval(() => {
      socket.emit('admin:fetch:rooms');
    }, 5000);

  return () => {
      socket.off('admin:rooms:data', handleRoomsTelemetryUpdate);
      socket.off('admin:room:terminated:ack', handleForceTerminationAck);
      clearInterval(telemetryPoll);
    };
  }, [socket, setToast]);

  const handleForcedTunnelTeardown = (roomId) => {
    if (!socket || !roomId) return;
    
    // Command backend cluster matrix to strip sockets out of targeted channel room
    socket.emit('admin:terminate:room', { roomId });
  };

  return (
    <div className="w-full bg-[#0E1524]/20 border border-gray-900 rounded-2xl p-5 space-y-6 select-none shadow-2xl">
      
      {/* Structural Metric Header Title */}
      <div className="flex items-center justify-between border-b border-gray-900 pb-4">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-emerald-400 animate-pulse" />
          <h3 className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase">
            CONCURRENT TUNNEL SOCKET REGISTRY
          </h3>
        </div>
        <div className="font-mono text-[10px] text-gray-500 font-bold bg-gray-950 px-2.5 py-1 border border-gray-900 rounded-lg">
          ACTIVE_LOOPS: {activeRooms.length} INSTANCES
        </div>
      </div>

      {/* Main Structural Matrix Stream Content Box */}
      {isLoading ? (
        <div className="py-12 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest animate-pulse">
          &gt; QUERYING CENTRAL SOCKET TELEMETRY POOLS...
        </div>
      ) : activeRooms.length === 0 ? (
        <div className="py-12 border border-dashed border-gray-900 bg-gray-950/20 rounded-xl text-center space-y-2">
          <ShieldAlert className="h-6 w-6 text-gray-700 mx-auto" />
          <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
            Zero active connection channels matched. Core message loop grids vacant.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-900 rounded-xl bg-gray-950/20">
          <table className="w-full font-mono text-xs text-left border-collapse">
            
            {/* System Grid Headers */}
            <thead className="bg-[#070C15] text-gray-500 text-[10px] uppercase border-b border-gray-900 tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">TUNNEL_ROOM_ID</th>
                <th className="p-3.5 font-bold">NODE_ALLOCATION</th>
                <th className="p-3.5 font-bold">CONTEXT_VECTOR</th>
                <th className="p-3.5 font-bold hidden md:table-cell">UPTIME_FRAME</th>
                <th className="p-3.5 text-right font-bold">SEVERANCE</th>
              </tr>
            </thead>

            {/* Dynamic Content Rows */}
            <tbody className="divide-y divide-gray-900/60">
              {activeRooms.map((room) => (
                <tr 
                  key={room.id} 
                  className="hover:bg-[#0E1524]/30 transition-colors group text-gray-300"
                >
                  {/* Isolated Room ID Metric Token Cell */}
                  <td className="p-3.5 font-bold text-cyan-500 text-[11px] whitespace-nowrap">
                    {room.id?.slice(-12).toUpperCase() || 'VOLATILE_LOOP'}
                  </td>

                  {/* Connected Clients Counters Cell */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Users className="h-3.5 w-3.5 text-gray-600" />
                      <span className="font-bold">{room.clientCount || 0} / 2</span>
                      <span className="text-[9px] text-gray-600">NODES</span>
                    </div>
                  </td>

                  {/* Room Category Classification Variant Cell */}
                  <td className="p-3.5 whitespace-nowrap">
                    <Badge className="px-1.5 py-0 rounded text-[9px] font-bold">
                      {room.category || 'CHAT'}
                    </Badge>
                  </td>

                  {/* Computed Duration Lifespan Tracker String Cell */}
                  <td className="p-3.5 text-gray-500 text-[10px] hidden md:table-cell whitespace-nowrap">
                    {room.uptimeString || '00:00:00'}
                  </td>

                  {/* Administrative Drop Socket Core Override Trigger Button */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <Button
                      variant="secondary"
                      onClick={() => handleForcedTunnelTeardown(room.id)}
                      className="p-1.5 border-gray-800 hover:border-red-500/30 hover:bg-red-950/20 text-gray-500 hover:text-red-400 rounded-lg inline-flex items-center justify-center transition-all duration-150 active:scale-95 group-hover:border-gray-800"
                      title="Forcibly drop socket pipelines and dissolve room footprint context"
                    >
                      <PowerOff className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Compliance Verification Footer Line */}
      <div className="text-center font-mono text-[9px] text-gray-600 uppercase tracking-widest pt-1">
        [ ADMIN TEARDOWN SIGNALS DEPLOY TERMINATION PACKETS TO CHANNELS ENFORCED IMMEDIATELY ]
      </div>

    </div>
  );
}