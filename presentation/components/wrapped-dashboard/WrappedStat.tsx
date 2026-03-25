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
    className='relative w-full aspect-square max-w-64.5 rounded-3xl shadow-xl'
  >
    <div className='absolute left-8.75 top-8.25 w-45 flex flex-col gap-2.25'>
      <p className='text-[12px] font-bold tracking-[1px] uppercase text-purple-accent'>
        {title}
      </p>
      <h3 className='text-[96px] font-black leading-24 text-text-primary'>
        {value}
      </h3>
      {subtitle && (
        <p className='text-[24px] font-black leading-9 text-white/60'>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);
