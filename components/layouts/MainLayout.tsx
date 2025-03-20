const MainLayout = ({
  header,
  body,
  aside,
}: {
  header: React.ReactNode;
  body: React.ReactNode;
  aside: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <header className="mb-1 w-full">{header}</header>
      <div className="flex gap-2">
        <div className="w-screen max-w-[540px] flex-1">{body}</div>
        <aside className="hidden w-[200px] lg:block">{aside}</aside>
      </div>
    </div>
  );
};

export default MainLayout;
