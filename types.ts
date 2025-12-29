
export enum ComplaintStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

export enum PriorityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum Department {
  PUBLIC_WORKS = 'Public Works',
  SANITATION = 'Sanitation',
  UTILITIES = 'Utilities (Water/Electric)',
  SECURITY = 'Security & Police',
  HEALTH = 'Public Health',
  ROADS = 'Roads & Transport',
  OTHER = 'General Administration'
}

export interface PriorityMetrics {
  urgency: number;
  impact: number;
  finalScore: number;
  level: PriorityLevel;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  priorityMetrics: PriorityMetrics;
  department: Department;
  citizenName: string;
  citizenId: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolutionTimeHours?: number; // Calculated field for resolved items
  tags: string[];
  summary: string;
  location: string;
  actionPlan: string[];
  citizenMessage: string;
}

export interface AIAnalysisResult {
  title: string;
  category: Department;
  summary: string;
  location: string;
  priorityMetrics: PriorityMetrics;
  actionPlan: string[];
  citizenMessage: string;
}
