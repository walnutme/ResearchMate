import React from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../../context/AppStateContext';
import { FolderKanban, Plus, ChevronDown } from 'lucide-react';

export default function ProjectSwitcher() {
  const navigate = useNavigate();
  const { state, projects, changeProject } = useAppState();

  const handleCreateNew = () => {
    navigate('/setup');
  };

  if (!projects || projects.length === 0) {
    return (
      <button
        onClick={handleCreateNew}
        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shadow-indigo-100 hover:shadow-indigo-200 cursor-pointer"
      >
        <Plus className="size-3.5" />
        새 과제 만들기
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 select-none">
      <div className="relative inline-flex items-center">
        <FolderKanban className="absolute left-3.5 size-4 text-indigo-500 pointer-events-none" />
        <select
          value={state.project?.id || ''}
          onChange={(e) => changeProject(e.target.value)}
          className="pl-10 pr-9 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none min-w-[200px]"
        >
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.topic} ({proj.type === 'thesis' ? '논문' : proj.type === 'report' ? '레포트' : '연구보고서'})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 size-3.5 text-slate-400 pointer-events-none" />
      </div>

      <button
        onClick={handleCreateNew}
        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200/50 hover:border-indigo-100 transition-all cursor-pointer"
      >
        <Plus className="size-3.5" />
        새 과제 만들기
      </button>
    </div>
  );
}
