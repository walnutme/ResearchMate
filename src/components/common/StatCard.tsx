import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  color = 'indigo',
  trend
}: StatCardProps) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100/30',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100/30',
    amber: 'bg-amber-50 text-amber-600 border-amber-100/30',
    rose: 'bg-rose-50 text-rose-600 border-rose-100/30',
    violet: 'bg-violet-50 text-violet-600 border-violet-100/30',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/50 transition-all select-none">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1.5 tracking-tight">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          <Icon className="size-5" />
        </div>
      </div>
      
      {description && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate">{description}</span>
          {trend && (
            <span className={`font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
