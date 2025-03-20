import CommunityLabel from './CommunityLabel';

type CommunityHeaderViewProps = {
  title: string;
  href?: string;
  right?: React.ReactNode;
};

const CommunityHeaderView = ({
  title,
  href,
  right,
}: CommunityHeaderViewProps) => {
  return (
    <div className="flex items-center p-2 md:px-0">
      <CommunityLabel label={title} href={href} size="md" />
      <div className="ml-auto">{right}</div>
    </div>
  );
};

export default CommunityHeaderView;
