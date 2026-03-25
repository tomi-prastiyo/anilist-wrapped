interface CardBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBox({ children, className = "" }: CardBoxProps) {
  return (
    <div
      className={`bg-card border border-card-border rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
