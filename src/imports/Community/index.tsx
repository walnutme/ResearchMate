import svgPaths from "./svg-20s2h7briv";
import imgContainer from "./f578f9c2a181ef669150341163e63e6e9da01878.png";
import imgContainer1 from "./410c340aa057242400c608368f918307cdd72438.png";
import imgContainer2 from "./359be7a338ac935c80de9224e3ff8d639a23d2da.png";
import imgContainer3 from "./ec901f1c0d6bdc3abb3b7f2578c96a444ee001e2.png";

function Background() {
  return (
    <div className="bg-black content-stretch flex flex-col items-start px-[16px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white w-[26.163px]">
        <p className="leading-[19.5px]">전체</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start px-[16px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[39.122px]">
        <p className="leading-[19.5px]">인문학</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start px-[16px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[52.162px]">
        <p className="leading-[19.5px]">사회과학</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start px-[16px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[52.162px]">
        <p className="leading-[19.5px]">자연과학</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-0 overflow-auto p-[16px] right-0 top-[105.5px]" data-name="Container">
      <Background />
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[40px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-[56.175px]">
        <p className="leading-[21px]">김연구원</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[126.888px]">
        <p className="leading-[18px]">10분 전 · 현대 영미문학</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[126.888px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[3.5px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 13.5">
        <g clipPath="url(#clip0_1_856)" id="SVG">
          <path d={svgPaths.p3c64c80} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_856">
            <rect fill="white" height="13.5" width="3.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start p-[8px] relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container8 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4.7px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-full">
        <p className="leading-[24px] mb-0">현대 영미문학 연구보고서 피드백 부탁드</p>
        <p className="leading-[24px]">립니다</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.7px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">포스트모더니즘 관점에서 바라본 버지니아 울프</p>
        <p className="leading-[22.75px] mb-0">의 서술 기법에 대해 분석 중입니다. 특히 의식</p>
        <p className="leading-[22.75px]">의...</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p92f2e70} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[16.098px]">
        <p className="leading-[19.5px]">24</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg1 />
      <Container12 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_859)" id="SVG">
          <path d={svgPaths.p2352c700} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_859">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[7.411px]">
        <p className="leading-[19.5px]">8</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg2 />
      <Container14 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container11 />
      <Container13 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_846)" id="SVG">
          <path d={svgPaths.p3b742100} id="Vector" stroke="var(--stroke-0, #002FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.03846" />
          <path d={svgPaths.p681f080} id="Vector_2" stroke="var(--stroke-0, #002FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.03846" />
        </g>
        <defs>
          <clipPath id="clip0_1_846">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#002fff] text-[12px] w-[63.538px]">
        <p className="leading-[18px]">리뷰 대기중</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg3 />
      <Container16 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Container10 />
      <Container15 />
    </div>
  );
}

function Article() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Article">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[7.3px] items-start p-[20px] relative size-full">
        <Container1 />
        <Heading1 />
        <Container9 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer1} />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[40px]" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-[42.131px]">
        <p className="leading-[21px]">박철수</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[132.123px]">
        <p className="leading-[18px]">1시간 전 · 빅데이터 분석</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[132.123px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container19 />
      <Container21 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[3.5px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 13.5">
        <g clipPath="url(#clip0_1_856)" id="SVG">
          <path d={svgPaths.p3c64c80} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_856">
            <rect fill="white" height="13.5" width="3.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start p-[8px] relative shrink-0" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container24 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4.7px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-full">
        <p className="leading-[24px]">R 언어를 이용한 상관분석 질문입니다</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">다중공선성 문제를 해결하기 위해 VIF 지수를 확</p>
        <p className="leading-[22.75px] mb-0">인하고 있는데, 특정 변수의 지수가 10을 넘어</p>
        <p className="leading-[22.75px]">가...</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer2} />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col h-[177.4px] items-start justify-center overflow-clip py-[8.7px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container27 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p92f2e70} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[14.651px]">
        <p className="leading-[19.5px]">15</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg5 />
      <Container30 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_859)" id="SVG">
          <path d={svgPaths.p2352c700} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_859">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[14.651px]">
        <p className="leading-[19.5px]">12</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg6 />
      <Container32 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container29 />
      <Container31 />
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex items-center pt-[16px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Container28 />
    </div>
  );
}

function Article1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Article">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[7.3px] items-start p-[20px] relative size-full">
        <Container17 />
        <Heading2 />
        <Container25 />
        <Container26 />
        <HorizontalBorder1 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer3} />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[40px]" data-name="Container">
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black w-[42.131px]">
        <p className="leading-[21px]">이영희</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[116.852px]">
        <p className="leading-[18px]">3시간 전 · 교육심리학</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[116.852px]" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container35 />
      <Container37 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[3.5px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 13.5">
        <g clipPath="url(#clip0_1_856)" id="SVG">
          <path d={svgPaths.p3c64c80} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_856">
            <rect fill="white" height="13.5" width="3.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start p-[8px] relative shrink-0" data-name="Container">
      <Svg7 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container40 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4.6px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-full">
        <p className="leading-[24px]">비대면 수업의 학습 효율 연구 결과 공유</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8.6px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[22.75px] mb-0">초등학생을 대상으로 한 6개월간의 추적 관찰 결</p>
        <p className="leading-[22.75px]">과입니다. 상위권 학생들과 하위권 학생들 사이...</p>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p92f2e70} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[16.279px]">
        <p className="leading-[19.5px]">42</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg8 />
      <Container44 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_859)" id="SVG">
          <path d={svgPaths.p2352c700} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_859">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[13px] w-[7.411px]">
        <p className="leading-[19.5px]">5</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <Svg9 />
      <Container46 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container43 />
      <Container45 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ff3b30] text-[12px] w-[51.5px]">
        <p className="leading-[18px]">검증 완료</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Check">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" fill="var(--fill-0, #FF3B30)" id="Ellipse 12" r="8.5" stroke="var(--stroke-0, black)" />
        </svg>
        <div className="absolute aspect-[24/24] left-[6.9%] right-[10.34%] top-[3px]" data-name="material-symbols:check">
          <div className="absolute bottom-1/4 left-[16.04%] right-[16.04%] top-[24.9%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1172 7.46379">
              <path d={svgPaths.p1c661100} fill="var(--fill-0, #FF3B30)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Container48 />
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[16px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Container42 />
      <Container47 />
    </div>
  );
}

function Article2() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 w-full" data-name="Article">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[7.4px] items-start p-[20px] relative size-full">
        <Container33 />
        <Heading3 />
        <Container41 />
        <HorizontalBorder2 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 pb-[32px] px-[16px] right-0 top-[169px]" data-name="Main">
      <Article />
      <Article1 />
      <Article2 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_850)" id="SVG">
          <path d={svgPaths.p27f69f00} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_850">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#002fff] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] top-0" data-name="Overlay+Shadow" />
      <Svg10 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bottom-[80px] content-stretch flex flex-col items-start right-[20px]" data-name="Container">
      <Background1 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="h-[17.2px] relative shrink-0 w-[22.5px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 17.2">
        <g id="SVG">
          <path d={svgPaths.p3ff35700} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg11 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-[80.125px]">
        <p className="leading-[30px]">커뮤니티</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container52 />
      <Heading />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_836)" id="SVG">
          <path d={svgPaths.p216a8a00} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_836">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.5px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 20">
        <g clipPath="url(#clip0_1_833)" id="SVG">
          <path d={svgPaths.p38bde880} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_833">
            <rect fill="white" height="20" width="17.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg13 />
      <div className="absolute bg-[#ff3b30] right-[-2px] rounded-[9999px] size-[8px] top-[-2px]" data-name="Background+Border">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Svg12 />
      <Container54 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <Container51 />
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] pt-[11px] relative shrink-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[15px] w-[30.188px]">
        <p className="leading-[22.5px]">전체</p>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] pt-[11px] relative shrink-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#002fff] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#002fff] text-[15px] w-[49.324px]">
        <p className="leading-[22.5px]">내 분야</p>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] pt-[11px] relative shrink-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[15px] w-[64.27px]">
        <p className="leading-[22.5px]">리뷰 요청</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Container">
      <HorizontalBorder4 />
      <HorizontalBorder5 />
      <HorizontalBorder6 />
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] relative size-full">
        <Container55 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Header">
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <Container50 />
      <HorizontalBorder3 />
    </div>
  );
}

export default function Community() {
  return (
    <div className="bg-white relative size-full" data-name="Community">
      <Container />
      <Main />
      <Container49 />
      <Header />
    </div>
  );
}