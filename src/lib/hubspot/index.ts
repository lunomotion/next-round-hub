// HubSpot Read-Only Service Layer
// This module provides read-only access to HubSpot CRM data

import hubspotClient, {
  isHubSpotConfigured,
  CONTACT_PROPERTIES,
  COMPANY_PROPERTIES,
  DEAL_PROPERTIES,
  DEAL_STAGES,
  HubSpotContact,
  HubSpotCompany,
  HubSpotDeal,
} from './client';
import { Contact, Company, Deal } from '@/types';

// ============================================
// CONTACTS (Read-Only)
// ============================================

function transformContact(hs: HubSpotContact): Contact {
  const p = hs.properties;
  return {
    id: hs.id,
    firstName: p.firstname || '',
    lastName: p.lastname || '',
    email: p.email || '',
    phone: p.phone,
    company: p.company,
    title: p.jobtitle,
    type: (p.contact_type as Contact['type']) || 'unknown',
    status: mapLeadStatus(p.hs_lead_status),
    interests: p.investment_interests?.split(',').map(s => s.trim()).filter(Boolean),
    lastActivity: p.notes_last_updated,
    createdAt: p.createdate || new Date().toISOString(),
  };
}

function mapLeadStatus(status?: string): Contact['status'] {
  switch (status?.toLowerCase()) {
    case 'new': case 'open': case 'in progress': return 'active';
    case 'qualified': return 'qualified';
    case 'unqualified': return 'unqualified';
    default: return 'inactive';
  }
}

export async function fetchContacts(limit = 100): Promise<Contact[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    const response = await hubspotClient.crm.contacts.basicApi.getPage(limit, undefined, CONTACT_PROPERTIES);
    return response.results.map(transformContact);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function fetchContactById(id: string): Promise<Contact | null> {
  if (!isHubSpotConfigured()) return null;
  try {
    const response = await hubspotClient.crm.contacts.basicApi.getById(id, CONTACT_PROPERTIES);
    return transformContact(response);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

export async function searchContacts(query: string): Promise<Contact[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (hubspotClient.crm.contacts.searchApi.doSearch as any)({
      filterGroups: [
        { filters: [{ propertyName: 'email', operator: 'CONTAINS_TOKEN', value: query }] },
        { filters: [{ propertyName: 'firstname', operator: 'CONTAINS_TOKEN', value: query }] },
        { filters: [{ propertyName: 'lastname', operator: 'CONTAINS_TOKEN', value: query }] },
        { filters: [{ propertyName: 'company', operator: 'CONTAINS_TOKEN', value: query }] },
      ],
      properties: CONTACT_PROPERTIES,
      limit: 50,
      after: '0',
      sorts: [],
    });
    return response.results.map(transformContact);
  } catch (error) {
    console.error('Error searching contacts:', error);
    return [];
  }
}

// ============================================
// COMPANIES (Read-Only)
// ============================================

function transformCompany(hs: HubSpotCompany): Company {
  const p = hs.properties;
  return {
    id: hs.id,
    name: p.name || '',
    domain: p.domain,
    industry: p.industry,
    stage: mapCompanyStage(p.company_stage),
    valuation: p.valuation,
    lastFunding: p.last_funding,
    description: p.description,
    employees: p.numberofemployees,
    location: [p.city, p.state, p.country].filter(Boolean).join(', ') || undefined,
    watchlist: p.on_watchlist === 'true',
    contactCount: 0,
    dealCount: 0,
  };
}

function mapCompanyStage(stage?: string): Company['stage'] {
  if (!stage) return undefined;
  const map: Record<string, Company['stage']> = {
    'seed': 'Seed', 'series_a': 'Series A', 'series_b': 'Series B',
    'series_c': 'Series C', 'series_d': 'Series D+', 'pre_ipo': 'Pre-IPO', 'public': 'Public',
  };
  return map[stage.toLowerCase()] || undefined;
}

export async function fetchCompanies(limit = 100): Promise<Company[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    const response = await hubspotClient.crm.companies.basicApi.getPage(limit, undefined, COMPANY_PROPERTIES);
    return response.results.map(transformCompany);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}

export async function fetchCompanyById(id: string): Promise<Company | null> {
  if (!isHubSpotConfigured()) return null;
  try {
    const response = await hubspotClient.crm.companies.basicApi.getById(id, COMPANY_PROPERTIES);
    return transformCompany(response);
  } catch (error) {
    console.error('Error fetching company:', error);
    return null;
  }
}

export async function searchCompanies(query: string): Promise<Company[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (hubspotClient.crm.companies.searchApi.doSearch as any)({
      filterGroups: [
        { filters: [{ propertyName: 'name', operator: 'CONTAINS_TOKEN', value: query }] },
        { filters: [{ propertyName: 'industry', operator: 'CONTAINS_TOKEN', value: query }] },
      ],
      properties: COMPANY_PROPERTIES,
      limit: 50,
      after: '0',
      sorts: [],
    });
    return response.results.map(transformCompany);
  } catch (error) {
    console.error('Error searching companies:', error);
    return [];
  }
}

export async function fetchWatchlistCompanies(): Promise<Company[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (hubspotClient.crm.companies.searchApi.doSearch as any)({
      filterGroups: [{ filters: [{ propertyName: 'on_watchlist', operator: 'EQ', value: 'true' }] }],
      properties: COMPANY_PROPERTIES,
      limit: 100,
      after: '0',
      sorts: [],
    });
    return response.results.map(transformCompany);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
}

// ============================================
// DEALS (Read-Only)
// ============================================

function transformDeal(hs: HubSpotDeal): Deal {
  const p = hs.properties;
  return {
    id: hs.id,
    name: p.dealname || '',
    company: p.company_name || '',
    companyId: '',
    stage: mapDealStage(p.dealstage),
    amount: p.amount ? parseFloat(p.amount) : undefined,
    shareClass: p.share_class,
    pricePerShare: p.price_per_share ? parseFloat(p.price_per_share) : undefined,
    type: (p.deal_type as Deal['type']) || 'sell',
    createdAt: p.createdate || new Date().toISOString(),
    closedAt: p.closedate,
  };
}

function mapDealStage(stage?: string): Deal['stage'] {
  if (!stage) return 'New Inquiry';
  return DEAL_STAGES[stage.toLowerCase()] as Deal['stage'] || 'New Inquiry';
}

export async function fetchDeals(limit = 100): Promise<Deal[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    const response = await hubspotClient.crm.deals.basicApi.getPage(limit, undefined, DEAL_PROPERTIES);
    return response.results.map(transformDeal);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
}

export async function fetchDealById(id: string): Promise<Deal | null> {
  if (!isHubSpotConfigured()) return null;
  try {
    const response = await hubspotClient.crm.deals.basicApi.getById(id, DEAL_PROPERTIES);
    return transformDeal(response);
  } catch (error) {
    console.error('Error fetching deal:', error);
    return null;
  }
}

export async function searchDeals(query: string): Promise<Deal[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (hubspotClient.crm.deals.searchApi.doSearch as any)({
      filterGroups: [
        { filters: [{ propertyName: 'dealname', operator: 'CONTAINS_TOKEN', value: query }] },
      ],
      properties: DEAL_PROPERTIES,
      limit: 50,
      after: '0',
      sorts: [],
    });
    return response.results.map(transformDeal);
  } catch (error) {
    console.error('Error searching deals:', error);
    return [];
  }
}

export async function fetchDealsByStage(stage: string): Promise<Deal[]> {
  if (!isHubSpotConfigured()) return [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (hubspotClient.crm.deals.searchApi.doSearch as any)({
      filterGroups: [{ filters: [{ propertyName: 'dealstage', operator: 'EQ', value: stage }] }],
      properties: DEAL_PROPERTIES,
      limit: 100,
      after: '0',
      sorts: [],
    });
    return response.results.map(transformDeal);
  } catch (error) {
    console.error('Error fetching deals by stage:', error);
    return [];
  }
}

// ============================================
// UTILITY
// ============================================

export { isHubSpotConfigured };
