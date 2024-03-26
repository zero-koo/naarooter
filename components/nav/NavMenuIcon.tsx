export function NavMenuIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-md flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100/10 font-semibold">
      {children}
    </div>
  );
}
