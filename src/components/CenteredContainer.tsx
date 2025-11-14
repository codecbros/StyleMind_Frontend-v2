interface CenteredContainerProps {
  children: React.ReactNode;
  className?: string;
}

function CenteredContainer({
  children,
  className = '',
}: CenteredContainerProps) {
  const baseClasses = 'w-full lg:w-3/4 2xl:w-3/5 flex justify-center mx-auto';
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return <div className={combinedClasses}>{children}</div>;
}

export default CenteredContainer;
