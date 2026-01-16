'use client';

import { useState } from 'react';
import { mockContacts, mockCompanies, mockDeals, searchContacts, searchCompanies, searchDeals } from '@/lib/mock-data';
import { Contact, Company, Deal } from '@/types';
import { cn, formatCurrency, getInitials, getTypeColor, getStageColor, formatDate } from '@/lib/utils';
import {
  Search,
  Users,
  Building2,
  Briefcase,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Star,
  X,
} from 'lucide-react';

type Tab = 'contacts' | 'companies' | 'deals';
type ContactFilter = 'all' | 'buyer' | 'seller' | 'advisor';
type DealFilter = 'all' | 'active' | 'closing';

export default function HubSpotPage() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Contact | Company | Deal | null>(null);
  const [contactFilter, setContactFilter] = useState<ContactFilter>('all');
  const [dealFilter, setDealFilter] = useState<DealFilter>('all');
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  const getFilteredItems = () => {
    let items: Contact[] | Company[] | Deal[];

    if (activeTab === 'contacts') {
      items = searchQuery ? searchContacts(searchQuery) : mockContacts;
      if (contactFilter !== 'all') {
        items = (items as Contact[]).filter(c => c.type === contactFilter);
      }
    } else if (activeTab === 'companies') {
      items = searchQuery ? searchCompanies(searchQuery) : mockCompanies;
      if (watchlistOnly) {
        items = (items as Company[]).filter(c => c.watchlist);
      }
    } else {
      items = searchQuery ? searchDeals(searchQuery) : mockDeals;
      if (dealFilter === 'active') {
        items = (items as Deal[]).filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage));
      } else if (dealFilter === 'closing') {
        items = (items as Deal[]).filter(d => ['Due Diligence', 'Closing'].includes(d.stage));
      }
    }
    return items;
  };

  const items = getFilteredItems();

  return (
    <div className="px-8 py-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg font-semibold text-slate-800">HubSpot</h1>
          <a
            href="https://app.hubspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 transition-colors"
          >
            Open in HubSpot
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tabs & Search Row */}
        <div className="flex items-center gap-6 mb-5 pb-4 border-b border-slate-100">
          {/* Tabs */}
          <div className="flex gap-1">
            {[
              { id: 'contacts', label: 'Contacts', icon: Users },
              { id: 'companies', label: 'Companies', icon: Building2 },
              { id: 'deals', label: 'Deals', icon: Briefcase },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as Tab); setSelectedItem(null); }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  activeTab === tab.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {activeTab === 'contacts' && (
              <>
                {(['all', 'buyer', 'seller', 'advisor'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setContactFilter(f)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full transition-all',
                      contactFilter === f
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
                  </button>
                ))}
              </>
            )}

            {activeTab === 'companies' && (
              <button
                onClick={() => setWatchlistOnly(!watchlistOnly)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all',
                  watchlistOnly
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <Star className={cn('w-3 h-3', watchlistOnly && 'fill-white')} />
                Watchlist
              </button>
            )}

            {activeTab === 'deals' && (
              <>
                {(['all', 'active', 'closing'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setDealFilter(f)}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full transition-all',
                      dealFilter === f
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Closing'}
                  </button>
                ))}
              </>
            )}
          </div>

          <span className="text-xs text-slate-400 ml-auto">
            {items.length} result{items.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Data Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          {activeTab === 'contacts' && (
            <ContactTable contacts={items as Contact[]} onSelect={setSelectedItem} />
          )}
          {activeTab === 'companies' && (
            <CompanyTable companies={items as Company[]} onSelect={setSelectedItem} />
          )}
          {activeTab === 'deals' && (
            <DealTable deals={items as Deal[]} onSelect={setSelectedItem} />
          )}
        </div>

      {/* Detail Panel */}
      {selectedItem && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-slate-200 z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Details</span>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            {activeTab === 'contacts' && <ContactDetail contact={selectedItem as Contact} />}
            {activeTab === 'companies' && <CompanyDetail company={selectedItem as Company} />}
            {activeTab === 'deals' && <DealDetail deal={selectedItem as Deal} />}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactTable({ contacts, onSelect }: { contacts: Contact[]; onSelect: (c: Contact) => void }) {
  if (contacts.length === 0) {
    return <div className="p-8 text-center text-slate-400">No contacts found</div>;
  }
  return (
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Name</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Email</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Company</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">List</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Type</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {contacts.map((contact) => (
          <tr
            key={contact.id}
            onClick={() => onSelect(contact)}
            className="hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                  contact.type === 'buyer' ? 'bg-blue-100 text-blue-700' :
                  contact.type === 'seller' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                )}>
                  {getInitials(contact.firstName, contact.lastName)}
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800">{contact.firstName} {contact.lastName}</span>
                  <p className="text-xs text-slate-500">{contact.title}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{contact.email}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{contact.company}</td>
            <td className="px-4 py-3">
              {contact.list && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-indigo-50 text-indigo-600">
                  {contact.list}
                </span>
              )}
            </td>
            <td className="px-4 py-3">
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded', getTypeColor(contact.type))}>
                {contact.type}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CompanyTable({ companies, onSelect }: { companies: Company[]; onSelect: (c: Company) => void }) {
  if (companies.length === 0) {
    return <div className="p-8 text-center text-slate-400">No companies found</div>;
  }
  return (
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Company</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Domain</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Industry</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Stage</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Valuation</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Contacts</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {companies.map((company) => (
          <tr
            key={company.id}
            onClick={() => onSelect(company)}
            className="hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">{company.name}</span>
                {company.watchlist && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-slate-500">{company.domain || '—'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{company.industry}</td>
            <td className="px-4 py-3">
              {company.stage && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-600">
                  {company.stage}
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-sm font-medium text-slate-700">{company.valuation || '—'}</td>
            <td className="px-4 py-3 text-sm text-slate-600">{company.contactCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DealTable({ deals, onSelect }: { deals: Deal[]; onSelect: (d: Deal) => void }) {
  if (deals.length === 0) {
    return <div className="p-8 text-center text-slate-400">No deals found</div>;
  }
  return (
    <table className="w-full">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Deal</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Company</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Type</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Stage</th>
          <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Share Class</th>
          <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Value</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {deals.map((deal) => (
          <tr
            key={deal.id}
            onClick={() => onSelect(deal)}
            className="hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <td className="px-4 py-3">
              <span className="text-sm font-medium text-slate-800">{deal.name}</span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{deal.company}</td>
            <td className="px-4 py-3">
              <span className={cn(
                'px-2 py-0.5 text-xs font-medium rounded',
                deal.type === 'buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              )}>
                {deal.type}
              </span>
            </td>
            <td className="px-4 py-3">
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded', getStageColor(deal.stage))}>
                {deal.stage}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{deal.shareClass || '—'}</td>
            <td className="px-4 py-3 text-right text-sm font-medium text-slate-700">
              {deal.amount ? formatCurrency(deal.amount) : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ContactDetail({ contact }: { contact: Contact }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          'w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold',
          contact.type === 'buyer' ? 'bg-blue-100 text-blue-700' :
          contact.type === 'seller' ? 'bg-green-100 text-green-700' :
          'bg-purple-100 text-purple-700'
        )}>
          {getInitials(contact.firstName, contact.lastName)}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{contact.firstName} {contact.lastName}</h3>
          <p className="text-sm text-slate-500">{contact.title}</p>
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-slate-400" />
          <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">{contact.email}</a>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{contact.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">{contact.company}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <span className={cn('px-2 py-1 text-xs font-medium rounded', getTypeColor(contact.type))}>{contact.type}</span>
        <span className={cn('px-2 py-1 text-xs font-medium rounded', contact.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500')}>{contact.status}</span>
      </div>

      {contact.interests && contact.interests.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 uppercase mb-2">Interests</p>
          <div className="flex flex-wrap gap-1">
            {contact.interests.map((interest, idx) => (
              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{interest}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompanyDetail({ company }: { company: Company }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold text-slate-800">{company.name}</h3>
        {company.watchlist && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
      </div>

      <p className="text-sm text-slate-500 mb-4">{company.industry}</p>

      {company.description && (
        <p className="text-sm text-slate-600 mb-4">{company.description}</p>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-base font-semibold text-slate-800">{company.valuation || '—'}</p>
          <p className="text-xs text-slate-500">Valuation</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-base font-semibold text-slate-800">{company.stage || '—'}</p>
          <p className="text-xs text-slate-500">Stage</p>
        </div>
      </div>

      {company.domain && (
        <div className="flex items-center gap-2 text-sm pt-4 border-t border-slate-100">
          <Globe className="w-4 h-4 text-slate-400" />
          <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">{company.domain}</a>
        </div>
      )}
    </div>
  );
}

function DealDetail({ deal }: { deal: Deal }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-800 mb-1">{deal.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{deal.company}</p>

      <div className="flex gap-2 mb-4">
        <span className={cn('px-2 py-1 text-xs font-medium rounded', getStageColor(deal.stage))}>{deal.stage}</span>
        <span className={cn('px-2 py-1 text-xs font-medium rounded', deal.type === 'buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700')}>{deal.type}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-base font-semibold text-slate-800">{deal.amount ? formatCurrency(deal.amount) : '—'}</p>
          <p className="text-xs text-slate-500">Value</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-base font-semibold text-slate-800">{deal.pricePerShare ? `$${deal.pricePerShare.toFixed(2)}` : '—'}</p>
          <p className="text-xs text-slate-500">Price/Share</p>
        </div>
      </div>

      {deal.shareClass && (
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-500 uppercase mb-1">Share Class</p>
          <p className="text-sm text-slate-700">{deal.shareClass}</p>
        </div>
      )}

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-500 uppercase mb-1">Created</p>
        <p className="text-sm text-slate-700">{formatDate(deal.createdAt)}</p>
      </div>
    </div>
  );
}
