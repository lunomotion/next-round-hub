import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-brand-600 bg-brand-50',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          {change && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                change.type === 'increase' && 'text-green-600',
                change.type === 'decrease' && 'text-red-600',
                change.type === 'neutral' && 'text-slate-500'
              )}
            >
              {change.type === 'increase' && '+'}
              {change.type === 'decrease' && '-'}
              {change.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
