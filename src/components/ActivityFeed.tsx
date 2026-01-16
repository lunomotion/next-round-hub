'use client';

import { Activity } from '@/types';
import { cn, formatRelativeTime } from '@/lib/utils';
import { Mail, Phone, Calendar, FileText, TrendingUp, ArrowRight } from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const activityIcons = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  note: FileText,
  deal_update: TrendingUp,
};

const activityColors = {
  email: 'bg-blue-50 text-blue-600',
  call: 'bg-green-50 text-green-600',
  meeting: 'bg-purple-50 text-purple-600',
  note: 'bg-yellow-50 text-yellow-700',
  deal_update: 'bg-emerald-50 text-emerald-600',
};

export default function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-slate-200', className)}>
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        <button className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
          View all
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          return (
            <div
              key={activity.id}
              className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg', colorClass)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{activity.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{activity.entityName}</span>
                    <span>·</span>
                    <span>{formatRelativeTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
