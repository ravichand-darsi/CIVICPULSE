
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'citizen' | 'authority';
  onToggleUser: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userType, onToggleUser }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
      <header className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2.5 rounded-2xl shadow-xl shadow-emerald-500/20">
                <svg className="w-7 h-7 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Civic<span className="text-emerald-400">Pulse</span>
                </h1>
                <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em] mt-1">AI Action Engine</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={onToggleUser}
                className="hidden md:flex px-6 py-2.5 text-xs font-black text-emerald-400 bg-emerald-400/10 rounded-xl hover:bg-emerald-400/20 border border-emerald-400/20 transition-all uppercase tracking-widest active:scale-95"
              >
                Switch to {userType === 'citizen' ? 'Authority' : 'Citizen'}
              </button>
              <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1">Authenticated</p>
                  <p className="text-sm font-black text-slate-200 uppercase">{userType}</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center shadow-lg">
                  <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${userType}`} alt="User" className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
               <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
            </div>
            <span className="font-black text-slate-200 uppercase text-sm tracking-tighter">CivicPulse <span className="text-emerald-500">2.5</span></span>
          </div>
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Digital India • AI Command Center
          </div>
          <div className="flex space-x-8 text-slate-500 text-xs font-black uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Compliance</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Nodes</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
