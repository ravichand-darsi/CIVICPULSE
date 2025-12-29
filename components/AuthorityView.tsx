
import React, { useState } from 'react';
import { Complaint, ComplaintStatus, Department } from '../types';
import ComplaintCard from './ComplaintCard';
import StatsDashboard from './StatsDashboard';

const AuthorityView: React.FC<{ complaints: Complaint[]; onStatusUpdate: (id: string, s: ComplaintStatus) => void }> = ({ complaints, onStatusUpdate }) => {
  const [filter, setFilter] = useState<Department | 'ALL'>('ALL');
  const filtered = complaints.filter(c => filter === 'ALL' || c.department === filter);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-50 tracking-tighter leading-none mb-4">DASHBOARD</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Manage citizen reports and track solving speed.</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl border border-white/5 flex items-center space-x-6">
           <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Grid</span>
           </div>
           <select value={filter} onChange={(e) => setFilter(e.target.value as any)} 
             className="bg-transparent text-[10px] font-black text-slate-200 uppercase tracking-widest border-none focus:ring-0 outline-none cursor-pointer">
             <option value="ALL">Show All Categories</option>
             {Object.values(Department).map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
           </select>
        </div>
      </div>

      <StatsDashboard complaints={complaints} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(c => <ComplaintCard key={c.id} complaint={c} isAdmin onStatusChange={onStatusUpdate} />)}
      </div>
    </div>
  );
};

export default AuthorityView;
