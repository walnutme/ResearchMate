import { useNavigate } from "react-router";
import svgPaths from "./svg-y3mdzww9kg";

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
        <p className="leading-[27px]">새 과제 시작하기</p>
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

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col h-[22px] items-start left-[71.06px] pb-[20px] px-[8px] right-[218.06px] top-[37.25px]" data-name="Margin">
      <div className="bg-[#0075de] h-[2px] relative shrink-0 w-full" data-name="Horizontal Divider" />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[22px] items-start left-[204px] pb-[20px] px-[8px] right-[85.12px] top-[37.25px]" data-name="Margin">
      <div className="bg-[#d9d9d9] h-[2px] relative shrink-0 w-full" data-name="Horizontal Divider" />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_682)" id="SVG">
          <path d={svgPaths.p1c665200} fill="var(--fill-0, #0075DE)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_682">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-black w-[47.207px]">
        <p className="leading-[16.5px]">기본 정보</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[24px] top-1/2" data-name="Container">
      <Svg />
      <Margin2 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_674)" id="SVG">
          <path d={svgPaths.p1c665200} fill="var(--fill-0, #D9D9D9)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_674">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] w-[47.207px]">
        <p className="leading-[16.5px]">세부 설정</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[156.94px] top-1/2" data-name="Container">
      <Svg1 />
      <Margin3 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_674)" id="SVG">
          <path d={svgPaths.p1c665200} fill="var(--fill-0, #D9D9D9)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_674">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0" data-name="Margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] w-[61.321px]">
        <p className="leading-[16.5px]">확인 및 시작</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[289.88px] top-1/2" data-name="Container">
      <Svg2 />
      <Margin4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[96.5px] relative shrink-0 w-full" data-name="Container">
      <Margin />
      <Margin1 />
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-full">
        <p className="leading-[19.5px]">과제 유형</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[42px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#d9d9d9] col-1 justify-self-stretch relative rounded-[11px] row-1 self-start shrink-0" data-name="Assignment Type">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[11px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[6px] py-[8px] relative size-full">
            <div className="bg-[#d9d9d9] h-[26px] opacity-80 relative shrink-0 w-[24px]" data-name="Icon">
              <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#d9d9d9] col-2 justify-self-stretch relative rounded-[11px] row-1 self-start shrink-0" data-name="Assignment Type">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[11px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[6px] py-[8px] relative size-full">
            <div className="bg-[#d9d9d9] h-[26px] opacity-80 relative shrink-0 w-[24px]" data-name="Icon">
              <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#d9d9d9] col-1 justify-self-stretch relative rounded-[11px] row-2 self-start shrink-0" data-name="Assignment Type">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[11px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[6px] py-[8px] relative size-full">
            <div className="bg-[#d9d9d9] h-[26px] opacity-80 relative shrink-0 w-[24px]" data-name="Icon">
              <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#d9d9d9] col-2 justify-self-stretch relative rounded-[11px] row-2 self-start shrink-0" data-name="Assignment Type">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[11px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[6px] py-[8px] relative size-full">
            <div className="bg-[#d9d9d9] h-[26px] opacity-80 relative shrink-0 w-[24px]" data-name="Icon">
              <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f8f9fa] h-[149px] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Label />
        <Container5 />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-full">
        <p className="leading-[19.5px]">과제 기본 정보</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">과제 주제</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-auto pb-[2px] relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-full">
        <p className="leading-[normal]">현대 영미문학 연구보고서</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[6px] py-[12px] relative size-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_664)" id="SVG">
          <path d={svgPaths.p15e836c0} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_664">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-[29.55%] content-stretch flex flex-col items-start right-[12px] top-[29.55%]" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">전공 분야</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">학업 수준</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch relative row-0 self-start shrink-0" data-name="Container">
      <Container15 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-0 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-full">
        <p className="leading-[18px]">.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch relative row-0 self-start shrink-0" data-name="Container">
      <Container17 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[68px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container16 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">인용 양식</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Label1 />
        <Container6 />
        <Container11 />
        <Container13 />
        <Container18 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans:Bold','Noto_Sans_KR:Bold','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-black w-full">
        <p className="leading-[19.5px]">마감일∙목표 분량</p>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_658)" id="SVG">
          <path d={svgPaths.p2f560300} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_658">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[36.112px]">
        <p className="leading-[18px]">마감일</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg4 />
      <Container22 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container21 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-auto relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-full">
        <p className="leading-[normal]">2026.06.10</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[6px] py-[13px] relative size-full">
          <Container24 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#ddd] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_655)" id="SVG">
          <path clipRule="evenodd" d={svgPaths.p797e900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_655">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bottom-[27.27%] content-stretch flex flex-col items-start right-[12px] top-[27.27%]" data-name="Container">
      <Svg5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container25 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin5 />
      <Container23 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_677)" id="SVG">
          <path d={svgPaths.p303ea000} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p2d6f5b00} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p19de2a80} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_1_677">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[51.5px]">
        <p className="leading-[18px]">목표 분량</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg6 />
      <Container29 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container28 />
    </div>
  );
}

function Container27() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch relative row-0 self-start shrink-0" data-name="Container">
      <Margin6 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-0 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-full">
        <p className="leading-[18px]">.</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch pb-[4px] relative row-0 self-start shrink-0" data-name="Container">
      <Container31 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container30 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2d947900} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[51.5px]">
        <p className="leading-[18px]">현재 상태</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Svg7 />
      <Container35 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container34 />
    </div>
  );
}

function Container33() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch relative row-0 self-start shrink-0" data-name="Container">
      <Margin7 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-0 relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black w-full">
        <p className="leading-[18px]">.</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="col-0 content-stretch flex flex-col gap-[5.5px] items-start justify-self-stretch pb-[4px] relative row-0 self-start shrink-0" data-name="Container">
      <Container37 />
      <div className="bg-[#d9d9d9] relative rounded-[9px] shrink-0 w-full" data-name="Drop Down_small">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9px]" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center p-[12px] relative size-full">
            <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
                <path d={svgPaths.p12011c00} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container36 />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8f9fa] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <Label2 />
        <Container20 />
        <Container26 />
        <Container32 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[9.38%]" data-name="Group">
      <div className="absolute inset-[-3.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.25 17.25">
          <g id="Group">
            <path d={svgPaths.p13b15a00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
            <g id="Mask group">
              <mask height="3" id="mask0_1_667" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="3" x="7" y="3">
                <g id="Group_2">
                  <path d={svgPaths.p13977480} fill="var(--fill-0, white)" id="Vector_2" />
                </g>
              </mask>
              <g mask="url(#mask0_1_667)">
                <path d={svgPaths.p13977480} fill="var(--fill-0, black)" id="Vector_3" stroke="var(--stroke-0, black)" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[11px] w-full">
          <p className="leading-[16.5px] mb-0">입력하신 정보를 바탕으로 맞춤형 작성 플랜과 매일 수행할 미션을</p>
          <p className="leading-[16.5px]">자동으로 생성해 드립니다.</p>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] h-[963px] items-start relative shrink-0 w-[343px]" data-name="Main">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <div className="bg-[#d9d9d9] relative rounded-[11px] shrink-0 w-full" data-name="Info">
        <div className="content-stretch flex items-start pb-[4px] pl-[12px] pr-[350px] pt-[5px] relative size-full">
          <div className="relative shrink-0 size-[20px]" data-name="quill:info">
            <Group />
          </div>
        </div>
      </div>
      <Container38 />
    </div>
  );
}

function Button1() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate("/init2")}
      className="bg-[#0075de] content-stretch flex h-[56px] items-center justify-center relative rounded-[9999px] shrink-0 w-full cursor-pointer border-0" 
      data-name="Button"
    >
      <div className="absolute bg-[rgba(255,255,255,0)] h-[56px] left-0 right-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-white w-[184.314px]">
        <p className="leading-[25.5px]">맞춤형 작성 플랜 만들기</p>
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
    <div className="bg-white content-stretch flex flex-col items-center pb-[128px] relative size-full" data-name="init1">
      <Header />
      <Container1 />
      <Main />
      <BackgroundHorizontalBorder />
    </div>
  );
}