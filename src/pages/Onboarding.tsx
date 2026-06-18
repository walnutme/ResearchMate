import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { User } from '../types';
import { BookOpen, User as UserIcon, GraduationCap, Globe, ChevronRight } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { onboardUser } = useAppState();

  const [name, setName] = useState('');
  const [level, setLevel] = useState<User['level']>('undergrad');
  const [major, setMajor] = useState('인문학');
  const [language, setLanguage] = useState<User['language']>('ko');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert('이름을 입력해 주세요.');

    onboardUser({
      name: name.trim(),
      level,
      major,
      language
    });
    navigate('/setup');
  };

  const majors = [
    '인문학',
    '사회과학',
    '국제학',
    '자연과학',
    '공학',
    '예술/디자인',
    '기타'
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center gap-2 items-center">
          <div className="bg-indigo-600 text-white p-2 rounded-xl">
            <BookOpen className="size-6" />
          </div>
          <span className="font-bold text-2xl text-slate-900">Research Mate</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          연구 파트너 시작하기
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          간단한 정보 입력만으로 맞춤형 데일리 미션 플랜을 준비합니다.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-100 rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Researcher Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <UserIcon className="size-4 text-indigo-500" />
                사용자 이름 (연구자명)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="예: 김연구"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-800 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <GraduationCap className="size-4 text-indigo-500" />
                현재 학업 수준
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'undergrad', label: '학부생' },
                  { id: 'undergrad_researcher', label: '학부 연구생' },
                  { id: 'grad', label: '대학원생' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLevel(item.id as User['level'])}
                    className={`py-3 px-4 border rounded-xl font-medium text-sm transition-all text-center cursor-pointer ${
                      level === item.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm shadow-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Research Field / Major */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <BookOpen className="size-4 text-indigo-500" />
                연구/전공 분야
              </label>
              <div className="flex flex-wrap gap-2">
                {majors.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMajor(m)}
                    className={`py-2 px-4 border rounded-full font-medium text-xs transition-all cursor-pointer ${
                      major === m
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Writing Language */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <Globe className="size-4 text-indigo-500" />
                작성 언어
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'ko', label: '한국어' },
                  { id: 'en', label: '영어' },
                  { id: 'both', label: '한국어 + 영어' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLanguage(item.id as User['language'])}
                    className={`py-3 px-4 border rounded-xl font-medium text-sm transition-all text-center cursor-pointer ${
                      language === item.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm shadow-indigo-100'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                다음 단계로 이동
                <ChevronRight className="size-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
