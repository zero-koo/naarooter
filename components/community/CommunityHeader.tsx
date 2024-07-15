import CommunityLabel from './CommunityLabel';

type CommunityHeaderProps = {
  title: string;
};

const CommunityHeader = ({ title }: CommunityHeaderProps) => {
  return (
    <div className="p-2">
      <CommunityLabel label={title} size="md" />
    </div>
  );
};

export default CommunityHeader;
