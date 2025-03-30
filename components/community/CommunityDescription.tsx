import Box from '../ui/Box';
import { Label } from '../ui/Label';

type CommunityDescriptionProps = {
  name: string;
  description: string;
  topics: string[];
  numUsers: number;
};

const CommnunityDescription = ({
  name,
  description,
  topics,
  numUsers,
}: CommunityDescriptionProps) => {
  return (
    <Box className="rounded p-3 text-xs" bordered>
      <div className="mb-2 text-sm font-semibold">
        {name || '커뮤니티 이름'}
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {topics.map((topic, index) => (
          <Label key={index} size="xs">
            {topic}
          </Label>
        ))}
      </div>
      <div className="mb-2">{description || '커뮤니티 설명'}</div>
      <div className="flex items-center gap-0.5 text-xxs text-primary-content/60">
        <span>회원: {numUsers}</span>
      </div>
    </Box>
  );
};

export default CommnunityDescription;
