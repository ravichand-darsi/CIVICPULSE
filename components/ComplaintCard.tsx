
import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants';

interface ComplaintCardProps {
  complaint: Complaint;
  onStatusChange?: (id: string, newStatus: ComplaintStatus) => void;
  isAdmin?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onStatusChange, isAdmin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const date = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const handleViewRoute = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(complaint.location)}&travelmode=driving`;
          window.open(url, '_blank');
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // If we can't get location, just open maps with destination
          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(complaint.location)}`;
          window.open(url, '_blank');
          setIsGettingLocation(false);
        }
      );
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(complaint.location)}`;
      window.open(url, '_blank');
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="glass rounded-[2rem] overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group">
      {/* Top color bar for priority */}
      <div className={`h-1.5 w-full ${complaint.priority === 'Critical' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-transparent'}`}></div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${PRIORITY_COLORS[complaint.priority]}`}>
              {complaint.priority} Priority
            </span>
            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-lg ${STATUS_COLORS[complaint.status]}`}>
              {complaint.status.replace('_', ' ')}
            </span>
          </div>
          <span className="text-[10px] font-black text-slate-600 tracking-tighter bg-white/5 px-2 py-1 rounded-lg">REF_{complaint.id.split('-').pop()}</span>
        </div>

        <h3 className="text-xl font-black text-slate-50 leading-tight mb-3 group-hover:text-emerald-400 transition-colors">
          {complaint.title}
        </h3>
        
        <button 
          onClick={handleViewRoute}
          title="Click to see route from your location"
          className="flex items-center text-xs text-emerald-400 font-black mb-6 bg-emerald-400/5 border border-emerald-400/10 px-4 py-2 rounded-2xl w-fit hover:bg-emerald-400/20 transition-all active:scale-95 group/route"
        >
          <svg className={`w-4 h-4 mr-2 transition-transform ${isGettingLocation ? 'animate-spin' : 'group-hover/route:translate-y-[-2px]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="border-b border-transparent group-hover/route:border-emerald-400/50">
            {isGettingLocation ? 'Finding your location...' : complaint.location}
          </span>
          <svg className="w-3 h-3 ml-2 opacity-0 group-hover/route:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>

        {/* Time to solve info */}
        {complaint.status === ComplaintStatus.RESOLVED && complaint.resolutionTimeHours && (
          <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center">
             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Solved In</p>
                <p className="text-sm font-black text-emerald-400 uppercase leading-none">{complaint.resolutionTimeHours} Hours</p>
             </div>
          </div>
        )}

        <div className="mb-6 p-5 bg-slate-900/50 rounded-2xl border border-white/5">
           <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
             "{complaint.summary}"
           </p>
        </div>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
          {complaint.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-3 border border-white/5">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
            </div>
            {complaint.department.split(' ')[0]}
          </div>
          <div className="flex items-center text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] justify-end">
            {date}
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ml-3 border border-white/5">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-8 border-t border-white/5 space-y-8 animate-in fade-in slide-in-from-top-6 duration-700">
            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Urgency Assessment</h4>
              <div className="flex items-center space-x-8">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">
                    <span>Danger Level</span>
                    <span>{complaint.priorityMetrics.urgency}/10</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `${complaint.priorityMetrics.urgency * 10}%` }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">
                    <span>Public Impact</span>
                    <span>{complaint.priorityMetrics.impact}/10</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]" style={{ width: `${complaint.priorityMetrics.impact * 10}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Next Steps to Fix</h4>
              <div className="grid grid-cols-1 gap-3">
                {complaint.actionPlan.map((step, i) => (
                  <div key={i} className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/5 group/step hover:bg-white/10 transition-colors">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black mr-4 flex-shrink-0 group-hover/step:scale-110 transition-transform">{i+1}</span>
                    <p className="text-xs text-slate-300 font-bold tracking-wide leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/80 to-slate-950 p-6 rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">Message for You</h4>
              <p className="text-xs text-emerald-50/90 leading-relaxed font-bold italic tracking-wide">
                "{complaint.citizenMessage}"
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
          {isAdmin && onStatusChange ? (
            <div className="relative">
              <select 
                className="appearance-none text-[10px] bg-slate-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 py-3 pl-5 pr-12 font-black text-slate-200 uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-all outline-none"
                value={complaint.status}
                onChange={(e) => onStatusChange(complaint.id, e.target.value as ComplaintStatus)}
              >
                {Object.values(ComplaintStatus).map(s => (
                  <option key={s} value={s} className="bg-slate-900">{s.replace('_', ' ')}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          ) : (
            <div />
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-6 py-3 bg-slate-50 text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all duration-300 shadow-2xl active:scale-95"
          >
            {isExpanded ? 'Show Less' : 'View Full Details'} 
            <svg className={`w-3.5 h-3.5 ml-3 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
