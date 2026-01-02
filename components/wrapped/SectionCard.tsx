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
      className={`${colSpan} relative rounded-2xl 
      bg-gradient-to-br from-[#121a2b]/80 to-[#0b1220]/80
      border border-white/10 p-5
      backdrop-blur-md shadow-[0_0_40px_-15px_rgba(236,72,153,0.35)]`}
    >
      <p className='text-xs tracking-widest text-pink-400 mb-4'>
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
}
