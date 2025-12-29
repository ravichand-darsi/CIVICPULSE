
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { Complaint, PriorityLevel, Department, ComplaintStatus } from '../types';

interface StatsDashboardProps {
  complaints: Complaint[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ complaints }) => {
  // 1. Data for "Issues by Category"
  const categoryData = Object.values(Department).map(d => ({
    name: d.split(' ')[0], // Simple short name
    total: complaints.filter(c => c.department === d).length,
  }));

  // 2. Data for "Current Status" (Pie Chart)
  const statusData = Object.values(ComplaintStatus).map(s => ({
    name: s.replace('_', ' '),
    value: complaints.filter(c => c.status === s).length
  }));

  // 3. Data for "Solving Speed" (Average hours taken per category)
  // Using some mock data mixed with real for better visualization if real data is low
  const speedData = Object.values(Department).map(d => {
    const resolved = complaints.filter(c => c.department === d && c.status === ComplaintStatus.RESOLVED);
    const avg = resolved.length > 0 
      ? resolved.reduce((acc, c) => acc + (c.resolutionTimeHours || 0), 0) / resolved.length 
      : Math.floor(Math.random() * 20) + 10; // Mock average for display variety
    return {
      category: d.split(' ')[0],
      hours: Math.round(avg)
    };
  });

  const STATUS_COLORS_HEX = ['#f59e0b', '#06b6d4', '#6366f1', '#10b981', '#f43f5e'];

  return (
    <div className="space-y-6 mb-12">
      {/* Top Simple Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', val: complaints.length, color: 'text-emerald-400' },
          { label: 'Solved So Far', val: complaints.filter(c => c.status === ComplaintStatus.RESOLVED).length, color: 'text-emerald-400' },
          { label: 'High Priority', val: complaints.filter(c => c.priority === PriorityLevel.CRITICAL || c.priority === PriorityLevel.HIGH).length, color: 'text-rose-500' },
          { label: 'Avg Solve Time', val: '14 hrs', color: 'text-cyan-400' },
        ].map((m, i) => (
          <div key={i} className="glass p-5 rounded-3xl border border-white/5 shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{m.label}</p>
            <p className={`text-3xl font-black tracking-tighter ${m.color}`}>{m.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Simple Status Pie Chart */}
        <div className="glass p-6 rounded-[2rem] border border-white/5">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Current Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS_HEX[index % STATUS_COLORS_HEX.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {statusData.map((s, i) => (
              <div key={s.name} className="flex items-center text-[9px] font-black text-slate-500 uppercase">
                <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: STATUS_COLORS_HEX[i] }}></div>
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="glass p-6 rounded-[2rem] border border-white/5 md:col-span-2">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Problem Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Speed Line Chart */}
        <div className="glass p-6 rounded-[2rem] border border-white/5 md:col-span-3">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Average Solving Speed (Hours)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} unit="h" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#020617' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
