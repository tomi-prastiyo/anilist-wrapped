interface InsightCardProps {
  title?: string;
  insights: string[];
}

export function InsightCard({
  title = "Your Anime Personality",
  insights,
}: InsightCardProps) {
  return (
    <div
      className='
        relative rounded-2xl p-6
        bg-gradient-to-br from-pink-500/10 to-indigo-500/10
        border border-pink-400/20
        shadow-[0_0_40px_-12px_rgba(236,72,153,0.5)]
      '
    >
      <p className='text-xs tracking-widest text-pink-400 mb-3'>
        {title.toUpperCase()}
      </p>

      <div className='space-y-2'>
        {insights.map((text, i) => (
          <p key={i} className='text-slate-100 text-sm leading-relaxed'>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
