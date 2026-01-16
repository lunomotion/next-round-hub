// Core HubSpot-aligned types for Next Round Capital

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  type: 'buyer' | 'seller' | 'both' | 'unknown';
  status: 'active' | 'inactive' | 'qualified' | 'unqualified';
  list?: string; // e.g., 'Priority Buyers', 'Tech Founders', 'LPs'
  interests?: string[]; // e.g., ['Fintech', 'AI', 'Late Stage']
  notes?: string;
  lastActivity?: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  stage?: 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D+' | 'Pre-IPO' | 'Public';
  valuation?: string;
  lastFunding?: string;
  description?: string;
  logoUrl?: string;
  employees?: string;
  location?: string;
  watchlist: boolean;
  contactCount: number;
  dealCount: number;
  recentNews?: NewsEvent[];
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  companyId: string;
  stage: DealStage;
  amount?: number;
  shareClass?: string;
  pricePerShare?: number;
  type: 'buy' | 'sell';
  seller?: { id: string; name: string };
  buyer?: { id: string; name: string };
  createdAt: string;
  closedAt?: string;
  probability?: number;
  notes?: string;
}

export type DealStage =
  | 'New Inquiry'
  | 'Verification'
  | 'Pricing'
  | 'Marketing'
  | 'Negotiation'
  | 'Due Diligence'
  | 'Closing'
  | 'Closed Won'
  | 'Closed Lost';

export interface NewsEvent {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  type: 'funding' | 'ipo' | 'tender' | 'acquisition' | 'layoffs' | 'other';
  date: string;
  source: string;
  url?: string;
}

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'deal_update';
  description: string;
  entityType: 'contact' | 'company' | 'deal';
  entityId: string;
  entityName: string;
  timestamp: string;
  user?: string;
}

export interface DashboardStats {
  totalContacts: number;
  activeDeals: number;
  dealsPipeline: number;
  monthlyVolume: number;
  watchlistCompanies: number;
  recentActivities: Activity[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: ChatAction[];
}

export interface ChatAction {
  type: 'view_contact' | 'view_company' | 'view_deal' | 'create_deal' | 'send_email';
  label: string;
  entityId?: string;
}
