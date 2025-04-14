type OAuthButtonProps = React.PropsWithChildren<{
  icon: React.ReactNode;
  siteName: string;
}>;

const OAuthButton = ({ icon, siteName }: OAuthButtonProps) => {
  return (
    <button
      type="submit"
      className="border-foreground/50 flex h-12 w-full items-center justify-center gap-10 rounded-lg border px-10"
    >
      {icon}
      <div className="flex items-center justify-center">
        <span className="mr-2 inline-flex w-14 justify-between text-sm font-bold">
          {siteName.split('').map((s, index) => (
            <span key={index}>{s}</span>
          ))}
        </span>
        <span className="text-xs opacity-70">로 계속하기</span>
      </div>
    </button>
  );
};

export default OAuthButton;
