import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    'New Inquiry': 'bg-slate-100 text-slate-700',
    'Verification': 'bg-yellow-100 text-yellow-700',
    'Pricing': 'bg-blue-100 text-blue-700',
    'Marketing': 'bg-purple-100 text-purple-700',
    'Negotiation': 'bg-orange-100 text-orange-700',
    'Due Diligence': 'bg-cyan-100 text-cyan-700',
    'Closing': 'bg-emerald-100 text-emerald-700',
    'Closed Won': 'bg-green-100 text-green-700',
    'Closed Lost': 'bg-red-100 text-red-700',
  };
  return colors[stage] || 'bg-gray-100 text-gray-700';
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    'buyer': 'bg-blue-100 text-blue-700',
    'seller': 'bg-green-100 text-green-700',
    'both': 'bg-purple-100 text-purple-700',
    'unknown': 'bg-gray-100 text-gray-700',
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'active': 'bg-green-100 text-green-700',
    'inactive': 'bg-gray-100 text-gray-700',
    'qualified': 'bg-blue-100 text-blue-700',
    'unqualified': 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}
