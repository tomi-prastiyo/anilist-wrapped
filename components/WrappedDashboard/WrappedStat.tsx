interface StatProps {
  title: string;
  value: string | number;
  subtitle?: string;
  gradient: string;
}

export const WrappedStat = ({
  title,
  value,
  subtitle = "",
  gradient,
}: StatProps) => (
  <div
    style={{ background: gradient }}
    className='rounded-2xl p-6 shadow-xl transform transition hover:scale-105 flex flex-col justify-center items-start h-full'
  >
    <p className='text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2 text-left'>
      {title}
    </p>
    <h3 className='text-5xl font-extrabold text-white leading-none text-left'>
      {value}
    </h3>
    {subtitle && (
      <p className='text-white/90 font-semibold text-sm mt-1 text-left'>
        {subtitle}
      </p>
    )}
  </div>
);
