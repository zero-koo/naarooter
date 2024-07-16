import CommunityLabel from './CommunityLabel';

type CommunityHeaderProps = {
  title: string;
  href?: string;
};

const CommunityHeader = ({ title, href }: CommunityHeaderProps) => {
  return (
    <div className="p-2">
      <CommunityLabel label={title} href={href} size="md" />
    </div>
  );
};

export default CommunityHeader;
