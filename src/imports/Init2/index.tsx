import { useNavigate } from "react-router";
import svgPaths from "./svg-cjpyc50c3h";

function Img() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="Img">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 20">
        <g id="Img">
          <path d={svgPaths.p5d8a900} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Img />
    </div>
  );
}

function Button() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="content-stretch flex items-center justify-center relative shrink-0 size-[44px] cursor-pointer border-0 bg-transparent p-0" 
      data-name="Button"
    >
      <Container />
    </button>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center w-[136.126px]">
        <p className="leading-[27px]">맞춤형 작성 플랜</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Heading 1:margin">
      <div className="content-stretch flex flex-col items-start pr-[44px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <Button />
          <Heading1Margin />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[189.488px]">
        <p className="leading-[24px]">현대 영미문학 연구 보고서</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] tracking-[0.0352px] whitespace-nowrap">
        <p className="leading-[18px]">영어영문학 | APA | 5000자</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[189.488px]" data-name="Container">
      <Heading1 />
      <Container3 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex flex-col items-start px-[12px] py-[6px] relative rounded-[5px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[5px]" />
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
      <BackgroundBorder1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_715)" id="SVG">
          <path d={svgPaths.p1e885c80} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_715">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black tracking-[0.0117px] whitespace-nowrap">
        <p className="leading-[18px]">마감: 2026.06.10</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="col-0 content-stretch flex gap-[8px] h-[18px] items-center justify-self-stretch relative row-0 shrink-0" data-name="Container">
      <Svg />
      <Container5 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_709)" id="SVG">
          <path d={svgPaths.p28afea00} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[82.148px]">
        <p className="leading-[18px]">상태: 자료 정리</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="col-0 content-stretch flex gap-[8px] h-[18px] items-center justify-self-stretch relative row-0 shrink-0" data-name="Container">
      <Svg1 />
      <Container7 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="gap-y-[12px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[27px] pt-[8px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Container4 />
      <Container6 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Container1 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[18px] top-1/2" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_701)" id="SVG">
          <path d={svgPaths.p3896100} fill="var(--fill-0, #0075DE)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_701">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 3">
      <Svg2 />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] left-[26px] not-italic text-[15px] text-black top-[calc(50%-0.75px)] w-[64.27px]">
        <p className="leading-[22.5px]">추천 결과</p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_718)" id="SVG">
          <path clipRule="evenodd" d={svgPaths.p16e2b000} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_718">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black tracking-[-0.1523px] whitespace-nowrap">
        <p className="leading-[18px]">시작일: 2026.05.27</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-white bottom-[44px] content-stretch flex gap-[8px] items-center left-0 px-[12px] py-[8px] rounded-[11px] top-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <Svg3 />
      <Container9 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_704)" id="SVG">
          <path d={svgPaths.p11934b80} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.pd714100} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p1a9a5000} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_1_704">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[54.841px]">
        <p className="leading-[18px]">강도: 보통</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="absolute bg-white bottom-[44px] content-stretch flex gap-[8px] items-center left-[160.73px] px-[12px] py-[8px] rounded-[11px] top-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <Svg4 />
      <Container10 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p328da980} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[49.494px]">
        <p className="leading-[18px]">플랜: 2주</p>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex gap-[8px] items-center left-0 px-[12px] py-[8px] rounded-[11px] top-[44px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <Svg5 />
      <Container11 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder3 />
      <BackgroundBorder4 />
      <BackgroundBorder5 />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[20px] pt-[21px] px-[20px] relative size-full">
        <Heading2 />
        <Container8 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black w-full">
          <p className="leading-[22.5px]">상세 작성 플랜</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[30.882px]">
        <p className="leading-[18px]">1주차</p>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[41px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container16 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder6 />
      <div className="bg-[rgba(0,0,0,0.1)] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0075de] text-[13px] w-[143.132px]">
        <p className="leading-[19.5px]">1단계: 자료 및 출처 정리</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[132.333px]">
        <p className="leading-[15px]">논문 3편 읽기, 핵심 주장 정리</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[143.132px]" data-name="Container">
      <Heading4 />
      <Container19 />
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[5px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black w-[52.945px]">
        <p className="leading-[15px]">데일리 미션</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <BackgroundBorder7 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M2.5332e-07 8H16" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.340426" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Svg6 />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[8px] items-start p-[16px] relative rounded-[11px] shrink-0 w-[319px]" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <Container17 />
      <Container20 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-[143.132px]">
        <p className="leading-[19.5px]">2단계: 주장 및 근거 구성</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[114.088px]">
        <p className="leading-[15px]">핵심 주장, 예상 반론 정리</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[143.132px]" data-name="Container">
      <Heading5 />
      <Container23 />
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[5px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black w-[52.945px]">
        <p className="leading-[15px]">데일리 미션</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <BackgroundBorder8 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M2.5332e-07 8H16" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.340426" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Svg7 />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[8px] items-start p-[16px] relative rounded-[11px] shrink-0 w-[319px]" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <Container21 />
      <Container24 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-end min-w-px relative self-stretch" data-name="Container">
      <Container15 />
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pl-[8px] relative size-full">
          <div className="absolute bg-black bottom-[16px] left-[22px] top-[16px] w-px" data-name="Vertical Divider" />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[30.882px]">
        <p className="leading-[18px]">2주차</p>
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[41px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="bg-[rgba(0,0,0,0.1)] h-px relative shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="opacity-60 relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[16px] items-start pl-[8px] relative size-full">
        <BackgroundBorder9 />
        <Container27 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container13 />
      <Container25 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_695)" id="SVG">
          <path d={svgPaths.p2288c440} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_695">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackgroundBorder11() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[4px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg8 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[48.75px] relative shrink-0 w-[273px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[10px] text-black top-[23.75px] w-[269.45px]">
        <p className="leading-[16.25px] mb-0">입력하신 정보를 바탕으로 데일리 미션과 리뷰 시작점을 자동</p>
        <p className="leading-[16.25px] mb-0">추천했습니다. 플랜 수락 후에도 세부 일정 조정이 가능합니</p>
        <p className="leading-[16.25px]">다.</p>
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[11px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <div className="content-stretch flex gap-[12px] items-start pb-[16px] pt-[17px] px-[16px] relative size-full">
        <BackgroundBorder11 />
        <Container28 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black w-full">
          <p className="leading-[22.5px]">추천 피드백 / 커뮤니티</p>
        </div>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[98.203px]">
        <p className="leading-[18px]">추천 Peer Review</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[9px] w-[141.13px]">
        <p className="leading-[13.5px]">학부생 그룹 ∙ 동료 피드백 받아보기</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[141.13px]" data-name="Container">
      <Heading7 />
      <Container31 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_692)" id="SVG">
          <path d="M-2.08616e-07 10H20" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.425532" />
        </g>
        <defs>
          <clipPath id="clip0_1_692">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[11px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container30 />
          <Svg9 />
        </div>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-[75.458px]">
        <p className="leading-[18px]">추천 커뮤니티</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[9px] w-[141.13px]">
        <p className="leading-[13.5px]">영어영문학 연구 모임 ∙ 질문 나누기</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[141.13px]" data-name="Container">
      <Heading8 />
      <Container33 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_692)" id="SVG">
          <path d="M-2.08616e-07 10H20" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.425532" />
        </g>
        <defs>
          <clipPath id="clip0_1_692">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[11px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[11px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Container32 />
          <Svg10 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <BackgroundBorder12 />
      <BackgroundBorder13 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[23px] items-start pb-[128px] pt-[24px] px-[16px] relative size-full">
        <BackgroundBorder />
        <BackgroundBorder2 />
        <Container12 />
        <BackgroundBorder10 />
        <Container29 />
      </div>
    </div>
  );
}

function Button1() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate("/home")}
      className="bg-[#0075de] content-stretch flex h-[56px] items-center justify-center relative rounded-[9999px] shrink-0 w-full cursor-pointer border-0" 
      data-name="Button"
    >
      <div className="absolute bg-[rgba(255,255,255,0)] h-[56px] left-0 right-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-white w-[162.577px]">
        <p className="leading-[25.5px]">이 플랜으로 시작하기</p>
      </div>
    </button>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-start left-0 p-[16px] right-0" data-name="Background+HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

export default function Init() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="init2">
      <Header />
      <Main />
      <BackgroundHorizontalBorder />
    </div>
  );
}