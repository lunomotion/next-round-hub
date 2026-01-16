import { Client } from '@hubspot/api-client';

// Initialize HubSpot client (read-only access)
// Set HUBSPOT_ACCESS_TOKEN in .env.local
const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN || '',
});

export default hubspotClient;

// Check if HubSpot is configured
export function isHubSpotConfigured(): boolean {
  return !!process.env.HUBSPOT_ACCESS_TOKEN;
}

// Type definitions for HubSpot responses
export interface HubSpotContact {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    jobtitle?: string;
    hs_lead_status?: string;
    lifecyclestage?: string;
    notes_last_updated?: string;
    createdate?: string;
    lastmodifieddate?: string;
    // Custom properties for Next Round Capital
    contact_type?: string;
    investment_interests?: string;
    notes_content?: string;
  };
}

export interface HubSpotCompany {
  id: string;
  properties: {
    name?: string;
    domain?: string;
    industry?: string;
    description?: string;
    numberofemployees?: string;
    city?: string;
    state?: string;
    country?: string;
    annualrevenue?: string;
    createdate?: string;
    lastmodifieddate?: string;
    company_stage?: string;
    valuation?: string;
    last_funding?: string;
    on_watchlist?: string;
  };
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname?: string;
    amount?: string;
    dealstage?: string;
    pipeline?: string;
    closedate?: string;
    createdate?: string;
    hs_lastmodifieddate?: string;
    deal_type?: string;
    share_class?: string;
    price_per_share?: string;
    company_name?: string;
  };
}

// Properties to fetch (read-only)
export const CONTACT_PROPERTIES = [
  'email', 'firstname', 'lastname', 'phone', 'company', 'jobtitle',
  'hs_lead_status', 'lifecyclestage', 'notes_last_updated',
  'createdate', 'lastmodifieddate', 'contact_type', 'investment_interests',
];

export const COMPANY_PROPERTIES = [
  'name', 'domain', 'industry', 'description', 'numberofemployees',
  'city', 'state', 'country', 'annualrevenue', 'createdate',
  'lastmodifieddate', 'company_stage', 'valuation', 'last_funding', 'on_watchlist',
];

export const DEAL_PROPERTIES = [
  'dealname', 'amount', 'dealstage', 'pipeline', 'closedate',
  'createdate', 'hs_lastmodifieddate', 'deal_type', 'share_class',
  'price_per_share', 'company_name',
];

// Deal stage mappings
export const DEAL_STAGES: Record<string, string> = {
  'new_inquiry': 'New Inquiry',
  'verification': 'Verification',
  'pricing': 'Pricing',
  'marketing': 'Marketing',
  'negotiation': 'Negotiation',
  'due_diligence': 'Due Diligence',
  'closing': 'Closing',
  'closedwon': 'Closed Won',
  'closedlost': 'Closed Lost',
};
