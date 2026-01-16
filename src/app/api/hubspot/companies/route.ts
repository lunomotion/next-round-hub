import { NextRequest, NextResponse } from 'next/server';
import { fetchCompanies, searchCompanies, fetchWatchlistCompanies, isHubSpotConfigured } from '@/lib/hubspot';
import { mockCompanies, searchCompanies as searchMockCompanies } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const watchlist = searchParams.get('watchlist') === 'true';
  const limit = parseInt(searchParams.get('limit') || '100');

  // Use mock data if HubSpot not configured
  if (!isHubSpotConfigured()) {
    let companies = mockCompanies;
    if (query) companies = searchMockCompanies(query);
    if (watchlist) companies = companies.filter(c => c.watchlist);
    return NextResponse.json({ data: companies, source: 'mock' });
  }

  try {
    let companies;
    if (watchlist) {
      companies = await fetchWatchlistCompanies();
    } else if (query) {
      companies = await searchCompanies(query);
    } else {
      companies = await fetchCompanies(limit);
    }

    return NextResponse.json({ data: companies, source: 'hubspot' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}
