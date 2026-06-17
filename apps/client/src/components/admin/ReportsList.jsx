import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Trash2, Clock, Shield, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';

/**
 * ReportsList Component
 * Controls policy exception moderation workflows within the administration console interface.
 * Wipes targeted items permanently from the short-lived network layer pool when validated.
 */
export default function ReportsList() {
  // Mock internal reports allocation ledger mimicking temporary database cache streams
  const [reports, setReports] = useState([
    {
      id: "REP-9081",
      targetId: "INT-4491",
      reporter: "Node_82fa",
      offender: "Node_0012",
      reason: "EXPLICIT_COMMERCIAL_SPAM",
      content: "Buy premium crypto matrix access codes right now via unsecured link token arrays. Instant yield metrics!",
      timestamp: "14:22:05",
      status: "PENDING"
    },
    {
      id: "REP-9082",
      targetId: "INT-8812",
      reporter: "Node_c11d",
      offender: "Node_77b3",
      reason: "TARGETED_HARASSMENT",
      content: "Targeting cluster array sectors to flood Node_0012 instance pipelines with continuous memory overflows.",
      timestamp: "15:04:12",
      status: "PENDING"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('PENDING');

  const handleResolveReport = (reportId, actionType) => {
    setReports(prevReports => 
      prevReports.map(rep => {
        if (rep.id === reportId) {
          return { ...rep, status: actionType === 'DISMISS' ? 'DISMISSED' : 'ENFORCED' };
        }
        return rep;
      })
    );
  };

  const filteredReports = reports.filter(rep => rep.status === filterStatus);

  return (
    <div className="w-full bg-[#0E1524]/20 border border-gray-900 rounded-2xl p-5 space-y-6 select-none shadow-2xl">
      
      {/* Moderation Interface Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />
          <h3 className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase">
            POLICY INTEGRITY COMPLIANCE QUEUE
          </h3>
        </div>

        {/* Pipeline Filter Options */}
        <div className="flex bg-gray-950/80 p-1 border border-gray-900 rounded-xl gap-0.5">
          {['PENDING', 'ENFORCED', 'DISMISSED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wide transition-all ${
                filterStatus === status
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold'
                  : 'text-gray-500 border border-transparent hover:text-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Exception Records Stream Wrapper Layout */}
      {filteredReports.length === 0 ? (
        <div className="py-12 border border-dashed border-gray-900 bg-gray-950/20 rounded-xl text-center space-y-2">
          <CheckCircle className="h-6 w-6 text-emerald-500/40 mx-auto" />
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            No active policy violations intercepted in this buffer vector.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="border border-gray-900 bg-gray-950/40 rounded-xl p-4 flex flex-col space-y-4 hover:border-gray-800 transition-colors"
            >
              {/* Header Context Metrics Information Matrix Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-900/40 pb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge className="bg-red-950/30 border-red-900/40 text-red-400 font-bold text-[9px] px-1.5 py-0.5">
                    {report.reason}
                  </Badge>
                  <span className="font-mono text-[10px] text-gray-400 font-bold">
                    ID: {report.id}
                  </span>
                  <span className="font-mono text-[9px] text-gray-600 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    TS // {report.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-[9px] text-gray-500">
                  <div>REPORTER: <span className="text-gray-400 font-bold">{report.reporter}</span></div>
                  <div>TARGET_NODE: <span className="text-red-400 font-bold">{report.offender}</span></div>
                </div>
              </div>

              {/* Suspended Offending String Content Panel Container */}
              <div className="p-3.5 bg-gray-950/80 border border-gray-900 rounded-xl font-sans text-xs text-gray-300 leading-relaxed break-words">
                <div className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mb-1.5 select-none">
                  [ INTERCEPTED DATA FRAME CONTENT ]
                </div>
                "{report.content}"
              </div>

              {/* Interactive Enforcement Dashboard Toolbar Section */}
              {report.status === 'PENDING' && (
                <div className="flex items-center justify-between pt-1 select-none">
                  <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
                    TARGET_REF_HASH: {report.targetId}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleResolveReport(report.id, 'DISMISS')}
                      className="py-1 px-3 text-[10px] border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900 rounded-lg flex items-center gap-1"
                    >
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>Dismiss Alert</span>
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => handleResolveReport(report.id, 'ENFORCE')}
                      className="py-1 px-3 text-[10px] bg-red-600 text-black font-bold hover:bg-red-500 rounded-lg flex items-center gap-1 border-transparent"
                    >
                      <Trash2 className="h-3 w-3 text-black stroke-[2.5]" />
                      <span>Scrub Node</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Fallback Display if Already Handled or Cleared */}
              {report.status !== 'PENDING' && (
                <div className="font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5 pt-1">
                  <Shield className={`h-3 w-3 ${report.status === 'ENFORCED' ? 'text-red-500' : 'text-emerald-500'}`} />
                  <span className={report.status === 'ENFORCED' ? 'text-red-400/80 font-bold' : 'text-emerald-400/80 font-bold'}>
                    RESOLUTION ARCHIVED // ACTION = [{report.status}]
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
