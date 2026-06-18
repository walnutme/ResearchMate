import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  Trophy, 
  Wallet, 
  Flame, 
  User as UserIcon, 
  ShoppingBag, 
  ArrowRightLeft, 
  CheckCircle,
  Coins,
  ShieldAlert
} from 'lucide-react';

export default function Profile() {
  const { state, buyItem, refundDeposit } = useAppState();
  
  // Point Shop Items
  const shopItems = [
    {
      id: 'priority_matching',
      name: '피어 리뷰 우선 매칭권',
      description: '내 초안이 업로드되면 분야별 피어 그룹 검토자에게 최우선으로 매칭되어 피드백을 빠르게 받습니다.',
      points: 200,
      icon: Trophy,
    },
    {
      id: 'ai_deep_audit',
      name: 'AI 2차 상세 문맥 정밀 검사',
      description: '논리 구조의 도약과 학술 단락 간의 모호성을 정교하게 파악하는 심층 분석 모듈을 실행합니다.',
      points: 400,
      icon: Coins,
    },
    {
      id: 'penalty_shield',
      name: '보증금 삭감 페널티 1회 면제권',
      description: '미션 일정 지연이 불가피한 날에 사용하면 보증금 차감 및 연속 streak 초기화를 방지해 줍니다.',
      points: 600,
      icon: ShieldAlert,
    }
  ];

  const handlePurchase = (itemId: string, pointsCost: number) => {
    if (state.points < pointsCost) {
      alert('보유 포인트가 부족하여 구매할 수 없습니다.');
      return;
    }
    buyItem(itemId, pointsCost);
    alert('아이템 구매가 완료되었습니다! 내 보관함에 추가되었습니다.');
  };

  const handleRefund = () => {
    if (state.deposit <= 0) {
      alert('환급 가능한 보증금 잔액이 없습니다.');
      return;
    }
    const confirm = window.confirm(`현재 남은 보증금 ${state.deposit.toLocaleString()}원을 등록하신 계좌로 환급 신청하시겠습니까? 완료 시 잔액은 0원으로 리셋됩니다.`);
    if (confirm) {
      refundDeposit();
      alert('보증금 환급 신청이 완료되었습니다! 영업일 기준 1~3일 이내 지정된 연구비/개인 계좌로 전액 입금됩니다.');
    }
  };

  const handleResetLocalData = () => {
    const confirm = window.confirm("경고: 모든 로컬 데이터가 완전히 삭제되고 초기 상태로 되돌아갑니다. 계속하시겠습니까?");
    if (confirm) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('researchMate_') || key.startsWith('research_mate_'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      window.location.href = '/';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">리워드 및 프로필</h2>
        <p className="text-sm text-slate-500 font-medium">내 연구 활동 지표와 누적 성과 포인트를 활용한 학업 부스터 상점입니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Profile Summary */}
        <div className="space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-extrabold text-xl shrink-0">
                {state.user?.name[0]}
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-800 text-lg truncate">{state.user?.name}</h3>
                <span className="text-xs text-slate-400 font-bold">
                  {state.user?.level === 'undergrad' ? '학부생' : state.user?.level === 'undergrad_researcher' ? '학부 연구생' : '대학원생'}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400 font-bold">소속 전공</span>
                <span className="font-bold text-slate-700">{state.user?.major}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400 font-bold">주 작성 언어</span>
                <span className="font-bold text-slate-700 uppercase">{state.user?.language === 'ko' ? '한국어' : state.user?.language === 'en' ? '영어' : '한국어/영어'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400 font-bold">진행 과제 유형</span>
                <span className="font-bold text-slate-700 uppercase">
                  {state.project ? (
                    state.project.type === 'thesis' ? '개인 논문' : 
                    state.project.type === 'report' ? '레포트' : 
                    state.project.type === 'research_paper' ? '연구보고서' : '팀플 보고서'
                  ) : '등록된 과제 없음'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/50 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-indigo-950 font-bold flex items-center gap-1">
                <Flame className="size-4 text-orange-500 fill-orange-500" />
                현재 연속 미션 streak
              </span>
              <span className="text-indigo-600 font-extrabold">{state.streak}일 연속 완료</span>
            </div>
          </div>

          {/* Deposit Refund Simulator */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Wallet className="size-4.5 text-indigo-600" />
              보증금 정산 관리
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">초기 설정 보증금</span>
                <span className="font-bold text-slate-700">{(state.project?.deposit || 0).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">일정 지연 누적 벌금</span>
                <span className="font-bold text-rose-500">
                  -{Math.max(0, (state.project?.deposit || 0) - state.deposit).toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-slate-50">
                <span className="text-slate-800 font-bold">환급 가능 현재 잔액</span>
                <span className="font-extrabold text-indigo-600 text-sm">
                  {state.deposit.toLocaleString()}원
                </span>
              </div>
            </div>

            <button
              onClick={handleRefund}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer text-center"
            >
              보증금 전액 환급 신청하기
            </button>
          </div>

          {/* Developer Reset Tool */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-rose-800 text-sm flex items-center gap-1.5">
              <ShieldAlert className="size-4.5 text-rose-600" />
              데이터 및 환경 초기화
            </h3>
            <p className="text-slate-500 text-[11px] leading-normal font-medium">
              개발 중 데이터가 꼬이거나 초기 빈 상태를 테스트하고 싶을 때 로컬 데이터를 전체 삭제하고 리셋할 수 있습니다.
            </p>
            <button
              onClick={handleResetLocalData}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer text-center"
            >
              로컬 데이터 전체 초기화
            </button>
          </div>

        </div>

        {/* Right: Point Shop & Inventory (Col 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Point Meter */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AVAILABLE POINTS</span>
              <div className="flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {state.points.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-slate-500">P</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <CheckCircle className="size-4 shrink-0" />
              <span>미션 완료 및 피어 피드백 수정을 통해 포인트를 무제한 공급받으세요!</span>
            </div>
          </div>

          {/* Point Shop Items */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
              <ShoppingBag className="size-4.5 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-sm">학업 부스터 아이템 상점</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shopItems.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                          <Icon className="size-4" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.name}</h4>
                      </div>
                      <p className="text-slate-500 text-xs leading-normal font-medium">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePurchase(item.id, item.points)}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      {item.points} P에 구매하기
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Purchased Items Inventory */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">구매한 아이템 보관함</h3>
            
            {state.inventory.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {state.inventory.map((itemId, idx) => {
                  const details = shopItems.find(i => i.id === itemId) || { name: itemId };
                  return (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl"
                    >
                      <CheckCircle className="size-3.5" />
                      {details.name} (소지 중)
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">현재 구매해서 소지 중인 아이템이 없습니다. 포인트로 부스터를 장착해 보세요.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
