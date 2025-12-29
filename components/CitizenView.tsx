
import React, { useState } from 'react';
import { Complaint, ComplaintStatus, PriorityLevel, Department } from '../types';
import ComplaintCard from './ComplaintCard';
import { analyzeComplaint } from '../services/geminiService';

interface CitizenViewProps {
  complaints: Complaint[];
  addComplaint: (complaint: Complaint) => void;
}

const CitizenView: React.FC<CitizenViewProps> = ({ complaints, addComplaint }) => {
  const [isFiling, setIsFiling] = useState(false);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !title) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const intelligence = await analyzeComplaint(description);
      const newComplaint: Complaint = {
        id: `CMP-IND-${Math.floor(Math.random() * 9000 + 1000)}`,
        title: intelligence.title || title,
        description,
        status: ComplaintStatus.PENDING,
        priority: intelligence.priorityMetrics.level,
        priorityMetrics: intelligence.priorityMetrics,
        department: intelligence.category,
        citizenName: 'Aditya Mehta',
        citizenId: 'CIT-ME',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [intelligence.category.toLowerCase(), 'report'],
        summary: intelligence.summary,
        location: intelligence.location,
        actionPlan: intelligence.actionPlan,
        citizenMessage: intelligence.citizenMessage
      };
      addComplaint(newComplaint);
      setIsFiling(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError("We are having trouble connecting. Please wait a few seconds and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-50 tracking-tighter leading-none mb-4">MY REPORTS</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Track your requests and help improve your city.</p>
        </div>
        <button 
          onClick={() => setIsFiling(!isFiling)}
          className={`inline-flex items-center justify-center px-8 py-4 text-xs font-black rounded-2xl transition-all uppercase tracking-widest shadow-2xl active:scale-95 ${isFiling ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'}`}
        >
          {isFiling ? 'Cancel Reporting' : 'Report New Problem'}
        </button>
      </div>

      {isFiling && (
        <div className="glass border-2 border-emerald-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in slide-in-from-top-12 duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] ml-2">Problem Subject</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Garbage pile-up on MG Road"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] ml-2">What's the issue?</label>
              <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Please tell us exactly what is happening and where. Our system will automatically find the location and department for you..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600 font-bold" />
            </div>
            {error && <div className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl text-[10px] font-black uppercase border border-rose-500/20">{error}</div>}
            <button disabled={isAnalyzing} className="w-full py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black rounded-2xl hover:scale-[1.01] transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50 uppercase tracking-widest text-sm">
              {isAnalyzing ? 'Analyzing your report...' : 'Submit Report'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {complaints.filter(c => c.citizenId === 'CIT-ME' || c.citizenId === 'CIT-123').map(complaint => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
        {complaints.filter(c => c.citizenId === 'CIT-ME' || c.citizenId === 'CIT-123').length === 0 && !isFiling && (
          <div className="col-span-full py-20 text-center glass rounded-[3rem] border border-dashed border-white/10">
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">You haven't reported any issues yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenView;
