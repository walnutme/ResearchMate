import svgPaths from "./svg-8cpq41p5wo";

function Frame2() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[46px] items-center justify-center ml-[148px] mt-0 relative row-1 w-[26px]">
      <div className="bg-[#d9d9d9] h-[26px] relative shrink-0 w-full">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center w-[45px]">
        <p className="leading-[normal]">커뮤니티</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[46px] items-center justify-center ml-0 mt-0 relative row-1 w-[26px]">
      <div className="bg-[#d9d9d9] h-[26px] relative shrink-0 w-full" data-name="Icon">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="leading-[normal]">홈</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[46px] items-center justify-center ml-[74px] mt-0 relative row-1 w-[26px]">
      <div className="bg-[#d9d9d9] h-[26px] relative shrink-0 w-full" data-name="Icon">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="leading-[normal]">자료</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[46px] items-center justify-center ml-[222px] mt-0 relative row-1 w-[26px]">
      <div className="bg-[#d9d9d9] h-[26px] relative shrink-0 w-full" data-name="Icon">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="leading-[normal]">리뷰</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[46px] items-center justify-center ml-[296px] mt-0 relative row-1 w-[26px]">
      <div className="bg-[#d9d9d9] h-[26px] relative shrink-0 w-full" data-name="Icon">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center w-full">
        <p className="leading-[normal]">마이</p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame2 />
      <Frame />
      <Frame1 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-start left-0 right-0 z-[3]" data-name="Footer">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-[#d9d9d9] h-[65px] relative rounded-tl-[11px] rounded-tr-[11px] shrink-0 w-full" data-name="Navigation Bar">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center pb-px pt-[8px] px-[45px] relative size-full">
            <Group5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function GameIconsOpenBook() {
  return (
    <div className="relative size-[29px]" data-name="game-icons:open-book">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
        <g id="game-icons:open-book">
          <path d={svgPaths.p1514a000} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex items-center justify-center ml-0 mt-0 relative row-1 size-[29px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <GameIconsOpenBook />
        </div>
      </div>
      <div className="[word-break:break-word] col-1 flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[26.873px] justify-center ml-[36px] mt-[1.06px] not-italic relative row-1 text-[17px] text-black w-[151.316px]">
        <p className="leading-[normal]">Research Mate</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black w-full">
        <p className="leading-[30px]">안녕하세요, 연구자님!</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[21px]">오늘도 멋진 연구를 응원합니다.</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[20px] py-[24px] relative size-full">
        <Heading />
        <Container />
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,117,222,0.1)] content-stretch flex items-start px-[8px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0075de] text-[12px] w-[75.458px]">
        <p className="leading-[18px]">진행중인 연구</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[7.75px] items-start relative shrink-0" data-name="Container">
      <Overlay />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-black w-[201.327px]">
        <p className="leading-[25.5px]">현대 영미문학 연구 보고서</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black w-[35.467px]">
        <p className="leading-[22.5px]">D-14</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <BackgroundBorder />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[68.737px]">
        <p className="leading-[19.5px]">현재 진행률</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#002fff] text-[16px] tracking-[-0.8125px] whitespace-nowrap">
        <p className="leading-[24px]">35%</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#d9d9d9] h-[12px] relative rounded-[9999px] shrink-0 w-full" data-name="Background+Border">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#002fff] inset-[1px_64.9%_1px_0.34%] rounded-[9999px]" data-name="Background" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[4px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <BackgroundBorder1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_803)" id="SVG">
          <path d={svgPaths.pcf97600} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15385" />
          <path d={svgPaths.p2a7c7b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15385" />
        </g>
        <defs>
          <clipPath id="clip0_1_803">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-[141.721px]">
        <p className="leading-[19.5px]">보증금 20,000원 유지 중</p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex gap-[12px] items-center pt-[16px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Svg />
      <Container7 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-[#f8f9fa] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Section">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Container1 />
        <Container3 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function SectionMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section:margin">
      <div className="content-stretch flex flex-col items-start pb-[32px] px-[20px] relative size-full">
        <Section1 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black w-[100.176px]">
        <p className="leading-[27px]">오늘의 할 일</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[90.441px]">
        <p className="leading-[19.5px]">3개 중 1개 완료</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-w-px relative" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#666] text-[15px] top-[10.5px] w-[91.843px]">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[22.5px] line-through">논문 1편 선정</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.pee48500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <div className="relative shrink-0 size-[24px]" data-name="Check">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" fill="var(--fill-0, #D9D9D9)" id="Ellipse 12" r="11.5" stroke="var(--stroke-0, black)" />
            </svg>
            <div className="absolute aspect-[24/24] left-[6.9%] right-[10.34%] top-[3px]" data-name="material-symbols:check">
              <div className="absolute bottom-1/4 left-[16.04%] right-[16.04%] top-[24.9%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4897 9.95172">
                  <path d={svgPaths.p3bdc6300} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <Container11 />
          <Svg1 />
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_793)" id="SVG">
          <path d={svgPaths.p1e55a980} fill="var(--fill-0, #D9D9D9)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="1.04348" />
        </g>
        <defs>
          <clipPath id="clip0_1_793">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-w-px relative" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] left-0 not-italic text-[15px] text-black top-[10.5px] w-[190.178px]">
        <p className="leading-[22.5px]">논문 1편 핵심 주장 정리하기</p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.pee48500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Svg2 />
          <Container12 />
          <Svg3 />
        </div>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_793)" id="SVG">
          <path d={svgPaths.p1e55a980} fill="var(--fill-0, #D9D9D9)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="1.04348" />
        </g>
        <defs>
          <clipPath id="clip0_1_793">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-w-px relative" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] left-0 not-italic text-[15px] text-black top-[10.5px] w-[218.27px]">
        <p className="leading-[22.5px]">논문 1편 APA 형식으로 정리하기</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.pee48500} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Svg4 />
          <Container13 />
          <Svg5 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder2 />
      <BackgroundBorderShadow />
      <BackgroundBorder3 />
    </div>
  );
}

function Section2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[20px] relative size-full">
        <Container8 />
        <Container10 />
      </div>
    </div>
  );
}

function SectionMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Section:margin">
      <Section2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[125.536px]">
        <p className="leading-[24px]">이번 주 진행 현황</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] w-[58.241px]">
        <p className="leading-[16.5px]">자세히 보기</p>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="SVG">
          <path d={svgPaths.p2f4655f0} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Container16 />
      <Svg6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container15 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">월</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0075de] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">완료</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container19 />
      <div className="relative shrink-0 size-[26px]" data-name="Check">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
          <circle cx="13" cy="13" fill="var(--fill-0, #D9D9D9)" id="Ellipse 12" r="12.5" stroke="var(--stroke-0, black)" />
        </svg>
        <div className="absolute aspect-[24/24] left-[6.9%] right-[10.34%] top-[3px]" data-name="material-symbols:check">
          <div className="absolute bottom-1/4 left-[16.04%] right-[16.04%] top-[24.9%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6138 10.781">
              <path d={svgPaths.p1f648d80} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">화</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0075de] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">완료</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container22 />
      <div className="relative shrink-0 size-[26px]" data-name="Check">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
          <circle cx="13" cy="13" fill="var(--fill-0, #D9D9D9)" id="Ellipse 12" r="12.5" stroke="var(--stroke-0, black)" />
        </svg>
        <div className="absolute aspect-[24/24] left-[6.9%] right-[10.34%] top-[3px]" data-name="material-symbols:check">
          <div className="absolute bottom-1/4 left-[16.04%] right-[16.04%] top-[24.9%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6138 10.781">
              <path d={svgPaths.p1f648d80} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">수</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[9.42%_9.41%_0.78%_9.41%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1069 23.3492">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pc92a600} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">예정</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container25 />
      <div className="relative shrink-0 size-[26px]" data-name="mingcute:circle-dash-line">
        <Group />
      </div>
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">목</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[9.42%_9.41%_0.78%_9.41%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1069 23.3492">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pc92a600} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">예정</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container28 />
      <div className="relative shrink-0 size-[26px]" data-name="mingcute:circle-dash-line">
        <Group1 />
      </div>
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">금</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[9.42%_9.41%_0.78%_9.41%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1069 23.3492">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pc92a600} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">예정</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container31 />
      <div className="relative shrink-0 size-[26px]" data-name="mingcute:circle-dash-line">
        <Group2 />
      </div>
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">토</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[9.42%_9.41%_0.78%_9.41%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1069 23.3492">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pc92a600} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">예정</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container34 />
      <div className="relative shrink-0 size-[26px]" data-name="mingcute:circle-dash-line">
        <Group3 />
      </div>
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] tracking-[5.5px] whitespace-nowrap">
        <p className="leading-[16.5px]">일</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[9.42%_9.41%_0.78%_9.41%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1069 23.3492">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pc92a600} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.125px]">
        <p className="leading-[15px]">예정</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container37 />
      <div className="relative shrink-0 size-[26px]" data-name="mingcute:circle-dash-line">
        <Group4 />
      </div>
      <Container38 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[4px] relative size-full">
          <Container18 />
          <Container21 />
          <Container24 />
          <Container27 />
          <Container30 />
          <Container33 />
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[16px] shrink-0 w-full" data-name="Section">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[20px] relative size-full">
        <Container14 />
        <Container17 />
      </div>
    </div>
  );
}

function SectionMargin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section:margin">
      <div className="content-stretch flex flex-col items-start pb-[32px] px-[20px] relative size-full">
        <Section3 />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_807)" id="SVG">
          <path d={svgPaths.p2ef04500} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_807">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-full">
        <p className="leading-[19.5px]">보증금 알림</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] w-full">
        <p className="leading-[16.5px]">오늘 미션을 수행하지 않으면 보증금이 차감돼요.</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[16px] relative size-full">
          <Svg7 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[20px] relative size-full">
        <OverlayBorder />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[96px] relative shrink-0 w-full z-[1]" data-name="Main">
      <Section />
      <SectionMargin />
      <SectionMargin1 />
      <SectionMargin2 />
      <Section4 />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative size-full" data-name="home">
      <div className="bg-[#d9d9d9] relative shrink-0 w-full z-[2]" data-name="Title">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[8px] py-[12px] relative size-full">
            <Group6 />
            <div className="relative shrink-0 size-[27px]" data-name="mdi:bell-outline">
              <div className="absolute inset-[8.33%_12.5%_4.17%_12.5%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.25 23.625">
                  <path d={svgPaths.p35d52e00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Main />
    </div>
  );
}