'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockContacts, mockCompanies, mockDeals, searchContacts, searchCompanies } from '@/lib/mock-data';
import { ChatMessage, Contact, Company, Deal } from '@/types';
import { cn, formatCurrency, getInitials, getTypeColor, getStageColor } from '@/lib/utils';
import {
  Send,
  User,
  Building2,
  Briefcase,
  Loader2,
  ChevronRight,
} from 'lucide-react';

const QUICK_ACTIONS = [
  "What's in my pipeline?",
  'Show active buyers',
  'Watchlist companies',
  'Deals closing soon',
];

interface SearchResult {
  type: 'contacts' | 'companies' | 'deals';
  items?: Contact[] | Company[] | Deal[];
}

export default function CommandCenter() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, searchResults]);

  const processQuery = (query: string): { response: string; results: SearchResult | null } => {
    const q = query.toLowerCase();

    if (q.includes('pipeline') || (q.includes('deals') && q.includes('active'))) {
      const activeDeals = mockDeals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage));
      const pipelineValue = activeDeals.reduce((sum, d) => sum + (d.amount || 0), 0);
      return {
        response: `You have **${activeDeals.length} active deals** worth **${formatCurrency(pipelineValue)}** in your pipeline.`,
        results: { type: 'deals', items: activeDeals }
      };
    }

    if (q.includes('buyer')) {
      const buyers = mockContacts.filter(c => c.type === 'buyer' && c.status === 'active');
      return {
        response: `Found **${buyers.length} active buyers** in your network.`,
        results: { type: 'contacts', items: buyers }
      };
    }

    if (q.includes('seller')) {
      const sellers = mockContacts.filter(c => c.type === 'seller');
      return {
        response: `Found **${sellers.length} sellers** in your CRM.`,
        results: { type: 'contacts', items: sellers }
      };
    }

    if (q.includes('watchlist')) {
      const companies = mockCompanies.filter(c => c.watchlist);
      return {
        response: `You're watching **${companies.length} companies**.`,
        results: { type: 'companies', items: companies }
      };
    }

    if (q.includes('closing') || q.includes('due diligence')) {
      const deals = mockDeals.filter(d => ['Due Diligence', 'Closing'].includes(d.stage));
      const value = deals.reduce((sum, d) => sum + (d.amount || 0), 0);
      return {
        response: `**${deals.length} deals** are in late stages (${formatCurrency(value)} total).`,
        results: { type: 'deals', items: deals }
      };
    }

    for (const company of mockCompanies) {
      if (q.includes(company.name.toLowerCase())) {
        const contacts = mockContacts.filter(c => c.company === company.name);
        const deals = mockDeals.filter(d => d.company === company.name);
        return {
          response: `**${company.name}** — ${company.stage || 'Unknown stage'}, valued at ${company.valuation || 'N/A'}. You have ${contacts.length} contacts and ${deals.length} active deals.`,
          results: contacts.length > 0 ? { type: 'contacts', items: contacts } : null
        };
      }
    }

    const contactResults = searchContacts(query);
    if (contactResults.length > 0) {
      return {
        response: `Found **${contactResults.length}** matching contacts.`,
        results: { type: 'contacts', items: contactResults }
      };
    }

    const companyResults = searchCompanies(query);
    if (companyResults.length > 0) {
      return {
        response: `Found **${companyResults.length}** matching companies.`,
        results: { type: 'companies', items: companyResults }
      };
    }

    return {
      response: "I can help you look up contacts, companies, deals, your pipeline, and more. Try asking about your active buyers, watchlist, or search for a specific company.",
      results: null
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSearchResults(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const { response, results } = processQuery(userMessage.content);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => {
      const form = document.querySelector('form');
      form?.dispatchEvent(new Event('submit', { bubbles: true }));
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {messages.length === 0 ? (
        /* Empty State - Large Centered Chat */
        <div className="h-screen flex flex-col items-center justify-center px-8">
          <Image
            src="/logo.png"
            alt="Next Round"
            width={240}
            height={60}
            className="h-10 w-auto mb-10"
          />
          <h2 className="text-3xl font-semibold text-slate-800 mb-3">How can I help you today?</h2>
          <p className="text-lg text-slate-500 text-center max-w-lg mb-10">
            Search your CRM, look up contacts, view deals, or get insights.
          </p>

          {/* Large Chat Input */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-8">
            <div className="flex items-center bg-white rounded-2xl border border-slate-200 shadow-lg px-6 py-5 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your deals, contacts, or companies..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-slate-700 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={cn(
                  'p-3 rounded-xl transition-all ml-4',
                  input.trim() && !isLoading
                    ? 'bg-brand-600 text-white hover:bg-brand-700'
                    : 'bg-slate-100 text-slate-400'
                )}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action)}
                className="px-5 py-2.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Chat Mode */
        <div className="h-screen flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-8">
            <div className="max-w-3xl mx-auto px-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-4',
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      message.role === 'assistant'
                        ? 'bg-brand-100'
                        : 'bg-slate-100'
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <span className="text-brand-600 font-bold text-sm">NR</span>
                    ) : (
                      <User className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-5 py-4',
                      message.role === 'assistant'
                        ? 'bg-slate-50'
                        : 'bg-brand-600 text-white'
                    )}
                  >
                    <p className="text-base" dangerouslySetInnerHTML={{
                      __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <span className="text-brand-600 font-bold text-sm">NR</span>
                  </div>
                  <div className="bg-slate-50 rounded-2xl px-5 py-4">
                    <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
                  </div>
                </div>
              )}

              {/* Clickable Results */}
              {searchResults && searchResults.items && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {searchResults.type === 'contacts' && (
                    <ContactResults contacts={searchResults.items as Contact[]} />
                  )}
                  {searchResults.type === 'companies' && (
                    <CompanyResults companies={searchResults.items as Company[]} />
                  )}
                  {searchResults.type === 'deals' && (
                    <DealResults deals={searchResults.items as Deal[]} />
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input - Bottom */}
          <div className="border-t border-slate-200 bg-white p-6">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex items-center bg-white rounded-xl border border-slate-200 px-5 py-4 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  className="flex-1 bg-transparent border-none outline-none text-base text-slate-700 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'p-2.5 rounded-lg transition-all ml-3',
                    input.trim() && !isLoading
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-slate-200 text-slate-400'
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactResults({ contacts }: { contacts: Contact[] }) {
  return (
    <div>
      {contacts.slice(0, 5).map((contact) => (
        <Link
          key={contact.id}
          href={`/hubspot?tab=contacts&id=${contact.id}`}
          className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                contact.type === 'buyer' ? 'bg-blue-100 text-blue-700' :
                contact.type === 'seller' ? 'bg-green-100 text-green-700' :
                'bg-purple-100 text-purple-700'
              )}>
                {getInitials(contact.firstName, contact.lastName)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{contact.firstName} {contact.lastName}</p>
                <p className="text-xs text-slate-500">{contact.title} · {contact.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded', getTypeColor(contact.type))}>
                {contact.type}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>
          <div className="pl-[52px] mt-1.5 flex items-center gap-4 text-xs text-slate-500">
            <span>{contact.email}</span>
            {contact.phone && <span>{contact.phone}</span>}
          </div>
        </Link>
      ))}
      {contacts.length > 5 && (
        <Link href="/hubspot?tab=contacts" className="block p-3 text-center text-sm text-brand-600 hover:bg-slate-50 font-medium">
          View all {contacts.length} contacts →
        </Link>
      )}
    </div>
  );
}

function CompanyResults({ companies }: { companies: Company[] }) {
  return (
    <div>
      {companies.slice(0, 5).map((company) => (
        <Link
          key={company.id}
          href={`/hubspot?tab=companies&id=${company.id}`}
          className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{company.name}</p>
                <p className="text-xs text-slate-500">{company.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {company.stage && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-600">
                  {company.stage}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>
          <div className="pl-[52px] mt-1.5 flex items-center gap-4 text-xs text-slate-500">
            <span className="font-medium text-slate-700">{company.valuation}</span>
            {company.domain && <span>{company.domain}</span>}
            {company.description && <span className="truncate max-w-xs">{company.description}</span>}
          </div>
        </Link>
      ))}
      {companies.length > 5 && (
        <Link href="/hubspot?tab=companies" className="block p-3 text-center text-sm text-brand-600 hover:bg-slate-50 font-medium">
          View all {companies.length} companies →
        </Link>
      )}
    </div>
  );
}

function DealResults({ deals }: { deals: Deal[] }) {
  return (
    <div>
      {deals.slice(0, 5).map((deal) => (
        <Link
          key={deal.id}
          href={`/hubspot?tab=deals&id=${deal.id}`}
          className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{deal.name}</p>
                <p className="text-xs text-slate-500">{deal.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{deal.amount ? formatCurrency(deal.amount) : '—'}</p>
                <span className={cn('text-xs px-1.5 py-0.5 rounded', getStageColor(deal.stage))}>{deal.stage}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
          </div>
          <div className="pl-[52px] mt-1.5 flex items-center gap-4 text-xs text-slate-500">
            <span className={cn('px-1.5 py-0.5 rounded', deal.type === 'buy' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600')}>
              {deal.type}
            </span>
            {deal.shareClass && <span>Class {deal.shareClass}</span>}
            {deal.pricePerShare && <span>${deal.pricePerShare.toFixed(2)}/share</span>}
          </div>
        </Link>
      ))}
      {deals.length > 5 && (
        <Link href="/hubspot?tab=deals" className="block p-3 text-center text-sm text-brand-600 hover:bg-slate-50 font-medium">
          View all {deals.length} deals →
        </Link>
      )}
    </div>
  );
}
