import Box from './ui/Box';

const CommonSidebarDescription = () => {
  return (
    <Box className="relative rounded-md p-3 text-xs" bordered>
      <ul className="space-y-2">
        <li>
          🪐 <b>Nuts Planet</b>은 바쁜 일상 속 잠깐의 여유를 위한 공간입니다
        </li>
        <li>
          🥜 땅콩과 같이 가볍고 부담 없이 즐길 수 있는 소소한 재미와 대화를
          나눠보세요
        </li>
        <li>💬 건전한 토론과 공감, 그리고 유쾌한 유희를 추구합니다</li>
        <li>
          📝 MBTI 기반 설문, 🆚 이상형 월드컵 등 재밌는 콘텐츠들도 같이 즐길 수
          있어요
        </li>
      </ul>
    </Box>
  );
};

export default CommonSidebarDescription;
