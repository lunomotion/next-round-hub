import { Contact, Company, Deal, Activity, DashboardStats } from '@/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@sequoia.com',
    phone: '+1 (415) 555-0101',
    company: 'Sequoia Capital',
    title: 'Partner',
    type: 'buyer',
    status: 'active',
    list: 'Priority Buyers',
    interests: ['AI', 'Fintech', 'Enterprise SaaS'],
    notes: 'Looking for late-stage AI companies. Budget $10-50M per deal.',
    lastActivity: '2025-01-15T10:30:00Z',
    createdAt: '2024-06-15T08:00:00Z',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'swilliams@stripe.com',
    phone: '+1 (415) 555-0102',
    company: 'Stripe',
    title: 'Senior Engineer',
    type: 'seller',
    status: 'qualified',
    list: 'Active Sellers',
    interests: [],
    notes: 'Vested employee. Has 50K shares. Looking to sell 25K.',
    lastActivity: '2025-01-14T15:45:00Z',
    createdAt: '2024-09-20T12:00:00Z',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Park',
    email: 'david@accel.com',
    phone: '+1 (650) 555-0103',
    company: 'Accel',
    title: 'Principal',
    type: 'buyer',
    status: 'active',
    list: 'Priority Buyers',
    interests: ['Fintech', 'Crypto', 'Consumer'],
    notes: 'Very active buyer. Quick decision maker. Prefers warm intros.',
    lastActivity: '2025-01-13T09:15:00Z',
    createdAt: '2024-03-10T10:30:00Z',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@openai.com',
    phone: '+1 (415) 555-0104',
    company: 'OpenAI',
    title: 'Product Manager',
    type: 'seller',
    status: 'active',
    list: 'Active Sellers',
    interests: [],
    notes: 'Post-tender. Has about $2M in vested shares. Motivated seller.',
    lastActivity: '2025-01-12T14:20:00Z',
    createdAt: '2024-11-05T16:00:00Z',
  },
  {
    id: '5',
    firstName: 'James',
    lastName: 'Thompson',
    email: 'jthompson@tiger.com',
    phone: '+1 (212) 555-0105',
    company: 'Tiger Global',
    title: 'Managing Director',
    type: 'buyer',
    status: 'active',
    list: 'Priority Buyers',
    interests: ['AI', 'Late Stage', 'Pre-IPO'],
    notes: 'Large ticket sizes. $25M minimum. Fast mover on hot deals.',
    lastActivity: '2025-01-11T11:00:00Z',
    createdAt: '2024-01-20T09:00:00Z',
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lwang@databricks.com',
    phone: '+1 (415) 555-0106',
    company: 'Databricks',
    title: 'Engineering Manager',
    type: 'seller',
    status: 'qualified',
    list: 'New Leads',
    interests: [],
    notes: '4 years tenure. Fully vested. Looking to diversify.',
    lastActivity: '2025-01-10T16:30:00Z',
    createdAt: '2024-08-12T11:15:00Z',
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Kim',
    email: 'rkim@a16z.com',
    phone: '+1 (650) 555-0107',
    company: 'a16z',
    title: 'Partner',
    type: 'both',
    status: 'active',
    list: 'Priority Buyers',
    interests: ['AI', 'Crypto', 'Gaming', 'Consumer'],
    notes: 'Both buyer and seller. Portfolio exits. Interested in SpaceX.',
    lastActivity: '2025-01-09T13:45:00Z',
    createdAt: '2023-11-08T14:30:00Z',
  },
  {
    id: '8',
    firstName: 'Amanda',
    lastName: 'Foster',
    email: 'afoster@spacex.com',
    phone: '+1 (310) 555-0108',
    company: 'SpaceX',
    title: 'Director of Operations',
    type: 'seller',
    status: 'active',
    list: 'Active Sellers',
    interests: [],
    notes: '6 years at SpaceX. Large block. Waiting for tender announcement.',
    lastActivity: '2025-01-08T10:00:00Z',
    createdAt: '2024-04-22T08:45:00Z',
  },
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Stripe',
    domain: 'stripe.com',
    industry: 'Fintech',
    stage: 'Pre-IPO',
    valuation: '$50B',
    lastFunding: 'Series I - $6.5B (2023)',
    description: 'Financial infrastructure platform for the internet.',
    employees: '8,000+',
    location: 'San Francisco, CA',
    watchlist: true,
    contactCount: 12,
    dealCount: 3,
    recentNews: [
      { id: 'n1', companyId: '1', companyName: 'Stripe', title: 'Stripe processes $1T annually', type: 'other', date: '2025-01-10', source: 'TechCrunch' }
    ],
  },
  {
    id: '2',
    name: 'OpenAI',
    domain: 'openai.com',
    industry: 'AI',
    stage: 'Series D+',
    valuation: '$157B',
    lastFunding: 'Series D - $6.6B (2024)',
    description: 'AI research and deployment company.',
    employees: '3,000+',
    location: 'San Francisco, CA',
    watchlist: true,
    contactCount: 8,
    dealCount: 5,
    recentNews: [
      { id: 'n2', companyId: '2', companyName: 'OpenAI', title: 'OpenAI launches GPT-5', type: 'other', date: '2025-01-08', source: 'Bloomberg' }
    ],
  },
  {
    id: '3',
    name: 'SpaceX',
    domain: 'spacex.com',
    industry: 'Aerospace',
    stage: 'Pre-IPO',
    valuation: '$210B',
    lastFunding: 'Series N - $750M (2024)',
    description: 'Space transportation and satellite internet.',
    employees: '13,000+',
    location: 'Hawthorne, CA',
    watchlist: true,
    contactCount: 6,
    dealCount: 2,
    recentNews: [
      { id: 'n3', companyId: '3', companyName: 'SpaceX', title: 'SpaceX announces tender offer at $210B', type: 'tender', date: '2025-01-12', source: 'Reuters' }
    ],
  },
  {
    id: '4',
    name: 'Databricks',
    domain: 'databricks.com',
    industry: 'Data & Analytics',
    stage: 'Pre-IPO',
    valuation: '$43B',
    lastFunding: 'Series I - $500M (2023)',
    description: 'Unified analytics platform.',
    employees: '6,000+',
    location: 'San Francisco, CA',
    watchlist: true,
    contactCount: 4,
    dealCount: 1,
  },
  {
    id: '5',
    name: 'Anthropic',
    domain: 'anthropic.com',
    industry: 'AI',
    stage: 'Series D+',
    valuation: '$61B',
    lastFunding: 'Series E - $2B (2024)',
    description: 'AI safety and research company. Makers of Claude.',
    employees: '1,000+',
    location: 'San Francisco, CA',
    watchlist: true,
    contactCount: 3,
    dealCount: 2,
  },
  {
    id: '6',
    name: 'Canva',
    domain: 'canva.com',
    industry: 'Design Software',
    stage: 'Pre-IPO',
    valuation: '$26B',
    lastFunding: 'Series F - $200M (2021)',
    description: 'Online design and visual communication platform.',
    employees: '4,000+',
    location: 'Sydney, Australia',
    watchlist: false,
    contactCount: 2,
    dealCount: 0,
  },
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Stripe Series I Block',
    company: 'Stripe',
    companyId: '1',
    stage: 'Marketing',
    amount: 5000000,
    shareClass: 'Common',
    pricePerShare: 28.50,
    type: 'sell',
    seller: { id: '2', name: 'Sarah Williams' },
    createdAt: '2025-01-10T08:00:00Z',
    probability: 60,
    notes: 'Clean cap table. Direct from employee. Price firm.',
  },
  {
    id: '2',
    name: 'OpenAI Employee Block',
    company: 'OpenAI',
    companyId: '2',
    stage: 'Negotiation',
    amount: 2000000,
    shareClass: 'Common',
    pricePerShare: 142.00,
    type: 'sell',
    seller: { id: '4', name: 'Emily Rodriguez' },
    buyer: { id: '5', name: 'James Thompson' },
    createdAt: '2025-01-05T14:00:00Z',
    probability: 75,
    notes: 'Tiger interested. Negotiating final price.',
  },
  {
    id: '3',
    name: 'SpaceX Secondary',
    company: 'SpaceX',
    companyId: '3',
    stage: 'Due Diligence',
    amount: 10000000,
    shareClass: 'Common',
    pricePerShare: 108.00,
    type: 'sell',
    seller: { id: '8', name: 'Amanda Foster' },
    buyer: { id: '7', name: 'Robert Kim' },
    createdAt: '2025-01-02T10:00:00Z',
    probability: 85,
    notes: 'Large block. a16z doing DD. Expected close in 2 weeks.',
  },
  {
    id: '4',
    name: 'Databricks RSU Sale',
    company: 'Databricks',
    companyId: '4',
    stage: 'Verification',
    amount: 1500000,
    shareClass: 'Common',
    pricePerShare: 75.00,
    type: 'sell',
    seller: { id: '6', name: 'Lisa Wang' },
    createdAt: '2025-01-12T09:00:00Z',
    probability: 40,
    notes: 'Verifying vesting schedule and share count.',
  },
  {
    id: '5',
    name: 'Anthropic Block Purchase',
    company: 'Anthropic',
    companyId: '5',
    stage: 'Pricing',
    amount: 8000000,
    shareClass: 'Preferred',
    pricePerShare: 200.00,
    type: 'buy',
    buyer: { id: '1', name: 'Michael Chen' },
    createdAt: '2025-01-08T11:00:00Z',
    probability: 50,
    notes: 'Sequoia looking to add to position. Finding sellers.',
  },
  {
    id: '6',
    name: 'Stripe Employee Lot',
    company: 'Stripe',
    companyId: '1',
    stage: 'New Inquiry',
    amount: 750000,
    type: 'sell',
    createdAt: '2025-01-14T16:00:00Z',
    probability: 20,
    notes: 'Inbound inquiry. Need to verify employment.',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'deal_update',
    description: 'SpaceX Secondary moved to Due Diligence',
    entityType: 'deal',
    entityId: '3',
    entityName: 'SpaceX Secondary',
    timestamp: '2025-01-15T14:30:00Z',
    user: 'Ken Smythe',
  },
  {
    id: '2',
    type: 'email',
    description: 'Sent teaser to Tiger Global for OpenAI block',
    entityType: 'contact',
    entityId: '5',
    entityName: 'James Thompson',
    timestamp: '2025-01-15T11:00:00Z',
    user: 'Ken Smythe',
  },
  {
    id: '3',
    type: 'call',
    description: 'Pricing discussion with Sequoia',
    entityType: 'contact',
    entityId: '1',
    entityName: 'Michael Chen',
    timestamp: '2025-01-14T16:45:00Z',
    user: 'Ken Smythe',
  },
  {
    id: '4',
    type: 'note',
    description: 'Verified Sarah Williams employment at Stripe via LinkedIn',
    entityType: 'contact',
    entityId: '2',
    entityName: 'Sarah Williams',
    timestamp: '2025-01-14T10:20:00Z',
    user: 'Ken Smythe',
  },
  {
    id: '5',
    type: 'meeting',
    description: 'Initial meeting with new seller - Databricks RSUs',
    entityType: 'contact',
    entityId: '6',
    entityName: 'Lisa Wang',
    timestamp: '2025-01-13T14:00:00Z',
    user: 'Ken Smythe',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalContacts: 247,
  activeDeals: 12,
  dealsPipeline: 45200000,
  monthlyVolume: 18500000,
  watchlistCompanies: 24,
  recentActivities: mockActivities,
};

// Helper to search/filter data
export function searchContacts(query: string): Contact[] {
  const q = query.toLowerCase();
  return mockContacts.filter(c =>
    c.firstName.toLowerCase().includes(q) ||
    c.lastName.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.company?.toLowerCase().includes(q) ||
    c.interests?.some(i => i.toLowerCase().includes(q))
  );
}

export function searchCompanies(query: string): Company[] {
  const q = query.toLowerCase();
  return mockCompanies.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.industry?.toLowerCase().includes(q) ||
    c.stage?.toLowerCase().includes(q)
  );
}

export function searchDeals(query: string): Deal[] {
  const q = query.toLowerCase();
  return mockDeals.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.company.toLowerCase().includes(q) ||
    d.stage.toLowerCase().includes(q)
  );
}

export function getContactById(id: string): Contact | undefined {
  return mockContacts.find(c => c.id === id);
}

export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(c => c.id === id);
}

export function getDealById(id: string): Deal | undefined {
  return mockDeals.find(d => d.id === id);
}

export function getDealsByStage(): Record<string, Deal[]> {
  const stages = ['New Inquiry', 'Verification', 'Pricing', 'Marketing', 'Negotiation', 'Due Diligence', 'Closing', 'Closed Won', 'Closed Lost'];
  const result: Record<string, Deal[]> = {};
  stages.forEach(stage => {
    result[stage] = mockDeals.filter(d => d.stage === stage);
  });
  return result;
}
