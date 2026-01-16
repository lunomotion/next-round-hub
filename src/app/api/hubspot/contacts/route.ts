import { NextRequest, NextResponse } from 'next/server';
import { fetchContacts, searchContacts, isHubSpotConfigured } from '@/lib/hubspot';
import { mockContacts, searchContacts as searchMockContacts } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '100');

  // Use mock data if HubSpot not configured
  if (!isHubSpotConfigured()) {
    const contacts = query ? searchMockContacts(query) : mockContacts;
    return NextResponse.json({ data: contacts, source: 'mock' });
  }

  try {
    const contacts = query
      ? await searchContacts(query)
      : await fetchContacts(limit);

    return NextResponse.json({ data: contacts, source: 'hubspot' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
