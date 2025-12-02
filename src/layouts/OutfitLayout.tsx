type LayoutWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function OutfitLayout({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6 md:px-8">
      <div className={`${className} max-w-7xl mx-auto`}>{children}</div>
    </div>
  );
}
