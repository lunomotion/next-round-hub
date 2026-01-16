'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  MessageSquare,
  Database,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: MessageSquare },
  { name: 'HubSpot', href: '/hubspot', icon: Database },
];

// Logo components
function HubSpotLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.198 2.198 0 0017.235.836h-.066a2.198 2.198 0 00-2.198 2.198v.066c0 .907.55 1.685 1.334 2.02v2.777a6.167 6.167 0 00-2.851 1.47l-7.57-5.891a2.568 2.568 0 00.078-.618 2.58 2.58 0 10-2.58 2.58c.39 0 .76-.087 1.092-.243l7.453 5.8a6.167 6.167 0 00-.376 2.123c0 .782.145 1.53.41 2.218l-2.335 2.335a1.932 1.932 0 00-.567-.088 1.958 1.958 0 101.958 1.958c0-.201-.032-.394-.088-.576l2.296-2.296a6.192 6.192 0 103.343-12.775zm-.995 9.633a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666z" fill="#FF7A59"/>
    </svg>
  );
}

function GmailLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
    </svg>
  );
}

function ApolloLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-.384 0-.749-.176-1.009-.46l-3.432-4.559-3.432 4.559c-.26.284-.625.46-1.009.46-.775 0-1.364-.65-1.364-1.364 0-.316.108-.631.324-.885L10.327 12 6.52 7.808a1.364 1.364 0 011.039-2.249c.384 0 .749.176 1.009.46L12 10.578l3.432-4.559c.26-.284.625-.46 1.009-.46.775 0 1.364.65 1.364 1.364 0 .316-.108.631-.324.885L13.673 12l3.807 4.192c.216.254.324.569.324.885 0 .714-.589 1.364-1.364 1.364z" fill="#6366F1"/>
    </svg>
  );
}

function MailchimpLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.469 14.066c-.083-.039-.347-.148-.652-.148-.193 0-.378.036-.552.107-.104.043-.348.17-.499.479-.097-.147-.224-.27-.398-.356a1.154 1.154 0 00-.527-.125c-.23 0-.431.055-.598.164-.088.057-.163.125-.227.2l-.023-.286h-.617l.003.05.048.61.047.617.048.617.048.617.048.617h.658l-.038-.48-.04-.502-.036-.456a.855.855 0 01.165-.186c.094-.075.213-.113.358-.113.168 0 .295.049.38.147.084.098.126.243.126.434l.003.073.048.617.048.617h.658l-.038-.48-.04-.502-.036-.456a.855.855 0 01.165-.186c.094-.075.213-.113.358-.113.168 0 .295.049.38.147.084.098.126.243.126.434v.073l.048.617.048.617h.658l-.038-.617-.048-.617-.048-.617-.048-.617v-.073a1.052 1.052 0 00-.146-.568 1.016 1.016 0 00-.413-.362zm-15.13 2.12c.42 0 .762-.342.762-.762s-.342-.762-.762-.762-.762.341-.762.761c0 .42.341.762.762.762zm.001-1.196c.24 0 .434.194.434.434s-.195.434-.434.434a.434.434 0 110-.868zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.894 15.94c-.176.594-.522 1.06-.99 1.38-.47.32-1.04.48-1.71.48-.38 0-.77-.05-1.17-.16-.4-.11-.79-.28-1.17-.51l-.22-.13c-.13.17-.32.31-.55.41-.28.12-.58.18-.9.18-.08 0-.17 0-.27-.01-.58-.05-1.01-.32-1.17-.49-.05.06-.1.11-.16.16-.31.24-.73.36-1.26.36-.37 0-.7-.06-.98-.17-.28-.11-.5-.27-.66-.46-.16-.19-.24-.42-.24-.68 0-.23.06-.43.19-.6.13-.17.3-.29.53-.36-.05-.03-.1-.07-.14-.12-.15-.16-.23-.37-.23-.63 0-.26.08-.49.25-.68.17-.19.39-.29.68-.29.22 0 .43.07.62.21l.02-.06c.08-.26.24-.47.48-.63.24-.16.51-.24.82-.24.16 0 .34.02.55.07l.01-.02c.12-.25.29-.44.5-.59.21-.15.44-.22.69-.22.38 0 .68.12.88.37.2.25.3.6.3 1.05 0 .35-.07.66-.21.92-.14.26-.33.46-.57.6.24.13.43.31.56.54.13.23.2.51.2.83 0 .36-.09.68-.27.95-.18.27-.43.49-.76.65.27.14.58.26.91.36.33.1.66.15.99.15.53 0 .97-.12 1.31-.35.34-.23.57-.56.7-.99.05-.16.08-.35.1-.55.02-.2.03-.44.03-.71v-.02c0-.42-.03-.8-.1-1.15-.07-.35-.18-.66-.32-.93-.14-.27-.32-.51-.53-.72-.21-.21-.45-.38-.72-.53a3.48 3.48 0 00-1.76-.45c-.51 0-.99.08-1.44.25-.45.17-.85.42-1.19.75-.34.33-.6.73-.8 1.2-.2.47-.29 1-.29 1.59v.02c0 .01 0 .02 0 .04l-.64-.05c0-.02 0-.04 0-.06v-.03c0-.7.12-1.33.35-1.88.23-.55.55-1.02.96-1.4.41-.38.9-.67 1.47-.87.57-.2 1.19-.3 1.86-.3.76 0 1.42.13 1.97.38.55.25 1.01.59 1.37.99.36.4.63.86.8 1.37.17.51.26 1.04.26 1.58v.02c0 .31-.02.6-.05.86-.03.26-.08.5-.15.71z" fill="#FFE01B"/>
    </svg>
  );
}

const connectionLogos: Record<string, React.FC<{ className?: string }>> = {
  hubspot: HubSpotLogo,
  gmail: GmailLogo,
  apollo: ApolloLogo,
  mailchimp: MailchimpLogo,
};

interface Connection {
  id: string;
  name: string;
  connected: boolean;
}

const initialConnections: Connection[] = [
  { id: 'hubspot', name: 'HubSpot', connected: true },
  { id: 'gmail', name: 'Gmail', connected: false },
  { id: 'apollo', name: 'Apollo', connected: false },
  { id: 'mailchimp', name: 'Mailchimp', connected: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [connections, setConnections] = useState(initialConnections);

  const toggleConnection = (id: string) => {
    setConnections(conns =>
      conns.map(c => c.id === id ? { ...c, connected: !c.connected } : c)
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-100">
        <Image
          src="/logo.png"
          alt="Next Round Capital Partners"
          width={180}
          height={40}
          className="h-7 w-auto"
          priority
        />
      </div>

      {/* Main Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-brand-600' : 'text-slate-400'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Connections */}
      <div className="px-3 py-3 border-t border-slate-100">
        <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Connections
        </p>
        <div className="space-y-1">
          {connections.map((conn) => {
            const LogoComponent = connectionLogos[conn.id];
            return (
              <div
                key={conn.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LogoComponent className="w-4 h-4" />
                  <span className={cn(
                    'text-sm',
                    conn.connected ? 'text-slate-700' : 'text-slate-400'
                  )}>
                    {conn.name}
                  </span>
                </div>
                {/* Toggle Switch */}
                <button
                  onClick={() => toggleConnection(conn.id)}
                  className={cn(
                    'relative w-8 h-[18px] rounded-full transition-colors',
                    conn.connected ? 'bg-brand-600' : 'bg-slate-200'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-white rounded-full shadow-sm transition-transform',
                      conn.connected && 'translate-x-[14px]'
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings */}
      <div className="px-3 py-3 border-t border-slate-100">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
