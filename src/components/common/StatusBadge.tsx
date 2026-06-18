import React from 'react';
import { BookOpen, FileText, CheckCircle2, AlertTriangle, HelpCircle, Users, Check } from 'lucide-react';

interface StatusBadgeProps {
  type: 'mission-type' | 'mission-status' | 'trust-tag' | 'completeness';
  value: string;
}

export default function StatusBadge({ type, value }: StatusBadgeProps) {
  if (type === 'mission-type') {
    // value: reading, writing, organizing, revision, feedback
    const config: Record<string, { label: string; style: string; icon: any }> = {
      reading: { label: '읽기', style: 'bg-blue-50 text-blue-700 border-blue-100', icon: BookOpen },
      writing: { label: '쓰기', style: 'bg-indigo-50 text-indigo-700 border-indigo-100', icon: FileText },
      organizing: { label: '정리', style: 'bg-violet-50 text-violet-700 border-violet-100', icon: CheckCircle2 },
      revision: { label: '수정', style: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: Check },
      feedback: { label: '피드백', style: 'bg-amber-50 text-amber-700 border-amber-100', icon: Users },
    };
    const item = config[value] || { label: value, style: 'bg-slate-50 text-slate-700 border-slate-100', icon: HelpCircle };
    const Icon = item.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${item.style}`}>
        <Icon className="size-3 shrink-0" />
        {item.label}
      </span>
    );
  }

  if (type === 'mission-status') {
    // value: pending, inProgress, readyToComplete, completed, delayed
    const config: Record<string, { label: string; style: string }> = {
      pending: { label: '진행 대기', style: 'bg-slate-100 text-slate-600 border-slate-200' },
      inProgress: { label: '작성 중', style: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold' },
      readyToComplete: { label: '완료 가능', style: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold shadow-sm animate-pulse' },
      completed: { label: '완료됨', style: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      delayed: { label: '밀림 (벌금)', style: 'bg-rose-50 text-rose-600 border-rose-200 font-semibold' },
    };
    const item = config[value] || { label: value, style: 'bg-slate-50 text-slate-500 border-slate-200' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium border ${item.style}`}>
        {item.label}
      </span>
    );
  }

  if (type === 'trust-tag') {
    // value: evidence-backed, experience-based, needs-verification
    const config: Record<string, { label: string; style: string; icon: any }> = {
      'evidence-backed': { label: '근거 확실', style: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
      'experience-based': { label: '경험 기반', style: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Users },
      'needs-verification': { label: '추가 확인 필요', style: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle },
    };
    const item = config[value] || { label: '검토 중', style: 'bg-slate-50 text-slate-500 border-slate-200', icon: HelpCircle };
    const Icon = item.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${item.style}`}>
        <Icon className="size-3.5 shrink-0" />
        {item.label}
      </span>
    );
  }

  if (type === 'completeness') {
    // value: number as string
    const score = Number(value) || 0;
    let style = 'bg-rose-50 text-rose-700 border-rose-100';
    let label = `불완전 (${score}%)`;

    if (score >= 100) {
      style = 'bg-emerald-50 text-emerald-700 border-emerald-100';
      label = '정보 완벽';
    } else if (score >= 50) {
      style = 'bg-amber-50 text-amber-700 border-amber-100';
      label = `보완 필요 (${score}%)`;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style}`}>
        {label}
      </span>
    );
  }

  return null;
}
