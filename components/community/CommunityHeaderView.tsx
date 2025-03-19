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
    <div className="flex items-center p-2">
      <CommunityLabel label={title} href={href} size="md" />
      {right}
    </div>
  );
};

export default CommunityHeaderView;
