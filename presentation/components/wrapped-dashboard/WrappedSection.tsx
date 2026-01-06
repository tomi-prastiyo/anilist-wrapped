interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const WrappedSection = ({ title, children }: SectionProps) => (
  <div className='card-bg rounded-2xl p-5 space-y-4'>
    <div className='flex items-center gap-2 mb-2'>
      <div className='w-1 h-4 bg-white rounded-full'></div>
      <h4 className='text-sm font-bold text-gray-200'>{title}</h4>
    </div>
    {children}
  </div>
);
