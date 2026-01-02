export function SectionCard({
  title,
  children,
  colSpan = "col-span-3",
}: {
  title: string;
  children: React.ReactNode;
  colSpan?: string;
}) {
  return (
    <div
      className={`${colSpan} rounded-2xl bg-[#121A2A] border border-white/5 p-5`}
    >
      <p className='text-sm text-slate-400 mb-4 tracking-wide'>
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
}
