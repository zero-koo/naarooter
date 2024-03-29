function NavSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 mt-4 w-full px-3 text-left text-xs opacity-50">
      {children}
    </div>
  );
}

export default NavSubtitle;
