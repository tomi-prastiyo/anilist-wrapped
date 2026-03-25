interface SectionHeaderProps {
  title: string;
  dotColor?: string;
  titleColor?: string;
}

export function SectionHeader({
  title,
  dotColor = "bg-purple-accent",
  titleColor = "text-purple-muted",
}: SectionHeaderProps) {
  return (
    <div className='flex items-center gap-2.5'>
      <div className={`w-1 h-4 rounded-full ${dotColor}`} />
      <h4 className={`text-[14px] font-bold ${titleColor}`}>{title}</h4>
    </div>
  );
}
