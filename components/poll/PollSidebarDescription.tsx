import Box from '../ui/Box';

const PollSidebarDescription = () => {
  return (
    <Box className="relative rounded-md p-3 text-xs" bordered>
      <h2 className="jus mb-2 flex items-center gap-1 text-sm">
        <span className="mr-1 font-semibold">설문조사</span>
        <span className="font-serif">
          <span className="text-xxs mr-0.5 italic">feat.</span>
          <span className="text-xs">MBTI</span>
        </span>
      </h2>
      <ul className="space-y-2">
        <li>
          <div className="mb-0.5">🎯 진실된 답변이 재미를 더합니다</div>
          <div className="text-foreground-dim text-xxs">
            설문을 보다 재미있고 의미 있게 즐기기 위해서는 솔직한 답변이 가장
            중요해요. 마음속 첫 번째 생각을 믿고 선택해보세요!
          </div>
        </li>
        <li>
          <div className="mb-0.5">🧩 MBTI를 입력하고 시작해보세요</div>
          <div className="text-foreground-dim text-xxs">
            본인의 MBTI를 알고 있다면, 설문 참여 전 입력해 주세요. 성격유형에
            따른 결과 해석이 더욱 흥미로워질 거예요!
          </div>
        </li>
        <li>
          <div className="mb-0.5">🎉 공식적인 설문조사가 아닙니다</div>
          <div className="text-foreground-dim text-xxs">
            순수하게 즐거움과 자기이해를 위한 콘텐츠입니다. 결과에 너무
            진지해지기보다는 가볍게 즐겨주세요 :)
          </div>
        </li>
      </ul>
    </Box>
  );
};

export default PollSidebarDescription;
