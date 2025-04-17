import CommonSidebarDescription from '../CommonSidebarDescription';

const MainLayout = ({
  header,
  body,
  aside,
}: {
  header?: React.ReactNode;
  body: React.ReactNode;
  aside?: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-col">
      {header && <header className="mb-1 w-full">{header}</header>}
      <div className="flex flex-1 gap-2">
        <div className="flex w-screen max-w-[540px] flex-1 flex-col">
          {body}
        </div>
        <aside className="hidden w-[200px] lg:block">
          {aside ?? <CommonSidebarDescription />}
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
