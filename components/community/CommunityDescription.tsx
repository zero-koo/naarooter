import Box from '../ui/Box';
import { Label } from '../ui/Label';

type CommunityDescriptionProps = {
  name: string;
  description: string;
  topics: string[];
  numUsers: number;
  children?: React.ReactNode;
};

const CommnunityDescription = ({
  name,
  description,
  topics,
  numUsers,
  children,
}: CommunityDescriptionProps) => {
  return (
    <Box className="relative rounded-md p-3 text-xs" bordered>
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
      <div className="mb-2 whitespace-pre-wrap">
        {description || '커뮤니티 설명'}
      </div>
      <div className="text-xxs text-foreground-dim flex items-center gap-0.5">
        <span>회원: {numUsers}</span>
      </div>
      {children}
    </Box>
  );
};

export default CommnunityDescription;
