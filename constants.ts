
import { Complaint, ComplaintStatus, PriorityLevel, Department } from './types';

export const DUMMY_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-IND-8821',
    title: 'Water Pipe Burst near Brigade Road',
    description: 'A main water pipe broke right outside the Metro Station. Lots of water is flooding the road and making it hard for people to walk.',
    status: ComplaintStatus.IN_PROGRESS,
    priority: PriorityLevel.CRITICAL,
    priorityMetrics: { urgency: 10, impact: 9, finalScore: 9.6, level: PriorityLevel.CRITICAL },
    department: Department.UTILITIES,
    citizenName: 'Aditya Rao',
    citizenId: 'CIT-123',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Bangalore', 'Water', 'Flood'],
    summary: 'Major water leak causing problems for travelers near the station.',
    location: 'Brigade Road Metro, Bangalore',
    actionPlan: ['Turn off main water valve', 'Send repair team immediately', 'Tell Metro security about the flood'],
    citizenMessage: 'Our repair team is already on Brigade Road. We expect it to be fixed by tonight.'
  },
  {
    id: 'CMP-IND-4412',
    title: 'Garbage Dumped on Marine Drive Walkway',
    description: 'Someone left a lot of construction waste on the seaside walking path.',
    status: ComplaintStatus.RESOLVED,
    priority: PriorityLevel.MEDIUM,
    priorityMetrics: { urgency: 4, impact: 6, finalScore: 4.8, level: PriorityLevel.MEDIUM },
    department: Department.SANITATION,
    citizenName: 'Sanya Malhotra',
    citizenId: 'CIT-456',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    resolvedAt: new Date(Date.now() - 86400000).toISOString(),
    resolutionTimeHours: 18,
    tags: ['Mumbai', 'Waste', 'Cleanliness'],
    summary: 'Waste cleared from the popular walking path.',
    location: 'Marine Drive Promenade, Mumbai',
    actionPlan: ['Clear waste using a truck', 'Clean the path', 'Check cameras to see who dumped it'],
    citizenMessage: 'The waste has been cleared. The path is clean and safe to use again.'
  },
  {
    id: 'CMP-IND-1022',
    title: 'Street Lights are Off in Salt Lake',
    description: 'The lights are not working on the main road. It is very dark and unsafe for people coming home from work.',
    status: ComplaintStatus.PENDING,
    priority: PriorityLevel.HIGH,
    priorityMetrics: { urgency: 7, impact: 8, finalScore: 7.4, level: PriorityLevel.HIGH },
    department: Department.UTILITIES,
    citizenName: 'Rohan Gupta',
    citizenId: 'CIT-123',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    tags: ['Kolkata', 'Safety', 'Lights'],
    summary: 'Main road is dark because street lights failed.',
    location: 'Sector V, Salt Lake, Kolkata',
    actionPlan: ['Find where the fuse broke', 'Check underground wires', 'Change the light bulbs'],
    citizenMessage: 'We know about the dark street. An electrician will fix it within 12 hours.'
  }
];

export const STATUS_COLORS = {
  [ComplaintStatus.PENDING]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  [ComplaintStatus.UNDER_REVIEW]: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  [ComplaintStatus.IN_PROGRESS]: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  [ComplaintStatus.RESOLVED]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  [ComplaintStatus.REJECTED]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const PRIORITY_COLORS = {
  [PriorityLevel.LOW]: 'bg-slate-800 text-slate-400',
  [PriorityLevel.MEDIUM]: 'bg-blue-900/40 text-blue-300',
  [PriorityLevel.HIGH]: 'bg-orange-900/40 text-orange-300',
  [PriorityLevel.CRITICAL]: 'bg-rose-600 text-white font-bold animate-pulse shadow-lg shadow-rose-900/20',
};
