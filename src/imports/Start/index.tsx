import { useNavigate } from "react-router";
import svgPaths from "./svg-rlhwd4959j";

function Svg() {
  return (
    <div className="h-[70px] relative shrink-0 w-[97px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 70">
        <g clipPath="url(#clip0_1_624)" id="SVG">
          <path d={svgPaths.p206fb400} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_624">
            <rect fill="white" height="70" width="97" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[105px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[129px] items-start pb-[24px] relative shrink-0 w-[105px]" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-black text-center tracking-[-1.875px] whitespace-nowrap">
        <p className="leading-[37.5px]">Research Mate</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[280px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[25px] text-black text-center w-[231.95px]">
        <p className="leading-[34.38px] mb-0">조금씩 완성해나가는</p>
        <p className="leading-[34.38px]">나의 연구 과제물</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Margin1 />
      <Heading1Margin />
      <Container2 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0" data-name="Margin">
      <Container />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[28px] relative shrink-0 w-[24.5px]" data-name="Img">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5 28">
        <g id="Img">
          <path d={svgPaths.p24288472} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Img />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[75px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-black w-[89.87px]">
        <p className="leading-[25.5px]">데일리 미션</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">매일 해야 할 과제를 제시</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[133.35000610351562px] relative shrink-0 w-[133.35px]" data-name="Container">
      <Container6 />
      <Margin3 />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[24px] relative size-full">
          <BackgroundBorder />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[35px]" data-name="Img">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 28">
        <g id="Img">
          <path d={svgPaths.p29c24d00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Img1 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex h-[75px] items-center justify-center relative rounded-[9999px] shrink-0 w-[67.05px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-black w-[106.897px]">
        <p className="leading-[25.5px]">질문 커뮤니티</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px] mb-0">같은 분야 사용자에게 질문하고 팁</p>
        <p className="leading-[18px]">공유</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[185.9499969482422px] relative shrink-0 w-[185.95px]" data-name="Container">
      <Container10 />
      <Margin4 />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[24px] relative size-full">
          <BackgroundBorder1 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Img2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[31.5px]" data-name="Img">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5 28.0031">
        <g id="Img">
          <path d={svgPaths.p6831000} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Img2 />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[75px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-black tracking-[-0.1162px] whitespace-nowrap">
        <p className="leading-[25.5px]">Peer Review</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-full">
        <p className="leading-[18px]">좋은 피드백으로 완성도 향상</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[154.02999877929688px] relative shrink-0 w-[154.03px]" data-name="Container">
      <Container14 />
      <Margin5 />
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[24px] relative size-full">
          <BackgroundBorder2 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Button() {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate("/init1")}
      className="bg-[#0075de] content-stretch flex h-[56px] items-center justify-center relative rounded-[9999px] shrink-0 w-full cursor-pointer border-0" 
      data-name="Button"
    >
      <div className="absolute bg-[rgba(255,255,255,0)] h-[56px] left-0 right-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-white w-[68.106px]">
        <p className="leading-[25.5px]">시작하기</p>
      </div>
    </button>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

export default function Start() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-between pb-[8px] pt-[16px] px-[24px] relative size-full" data-name="start">
      <Margin />
      <Margin2 />
      <Container16 />
    </div>
  );
}
