import { NextRequest, NextResponse } from 'next/server';
import { fetchDeals, searchDeals, fetchDealsByStage, isHubSpotConfigured } from '@/lib/hubspot';
import { mockDeals, searchDeals as searchMockDeals } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const stage = searchParams.get('stage');
  const limit = parseInt(searchParams.get('limit') || '100');

  // Use mock data if HubSpot not configured
  if (!isHubSpotConfigured()) {
    let deals = mockDeals;
    if (query) deals = searchMockDeals(query);
    if (stage) deals = deals.filter(d => d.stage === stage);
    return NextResponse.json({ data: deals, source: 'mock' });
  }

  try {
    let deals;
    if (stage) {
      deals = await fetchDealsByStage(stage);
    } else if (query) {
      deals = await searchDeals(query);
    } else {
      deals = await fetchDeals(limit);
    }

    return NextResponse.json({ data: deals, source: 'hubspot' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}
