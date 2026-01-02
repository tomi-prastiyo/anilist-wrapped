export default function AnalyticsSection({ data }: any) {
  const maxMonth = Math.max(...data.monthly);

  return (
    <div className='space-y-10'>
      {/* MONTHLY */}
      <div>
        <Title>MONTHLY COMPLETION</Title>
        <div className='space-y-3'>
          {data.monthly.map((v: number, i: number) => (
            <div key={i} className='flex items-center gap-4'>
              <span className='w-10 text-xs text-slate-400'>
                {monthLabel(i)}
              </span>

              <div className='flex-1 h-3 bg-white/10 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-pink-500'
                  style={{
                    width: `${(v / maxMonth) * 100 || 0}%`,
                  }}
                />
              </div>

              <span className='w-8 text-xs text-slate-300'>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GENRE */}
      <div>
        <Title>GENRE DISTRIBUTION</Title>
        <div className='space-y-3'>
          {data.genres.map(([name, count]: any) => {
            const percent = (count / data.stats.completed) * 100;

            return (
              <div key={name}>
                <div className='flex justify-between text-xs mb-1'>
                  <span>{name}</span>
                  <span className='text-slate-400'>{percent.toFixed(1)}%</span>
                </div>

                <div className='h-2 bg-white/10 rounded-full'>
                  <div
                    className='h-full bg-pink-400 rounded-full'
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STYLE */}
      <div>
        <Title>WATCHING STYLE</Title>
        <div className='grid grid-cols-3 gap-4'>
          <Metric label='Anime / Month' value={data.stats.avgAnimePerMonth} />
          <Metric
            label='Episodes / Anime'
            value={data.stats.avgEpisodePerAnime}
          />
          <Metric label='Style' value={data.stats.bingeScore} text />
        </div>
      </div>
    </div>
  );
}

function Title({ children }: any) {
  return (
    <p className='text-sm tracking-widest text-slate-400 mb-4'>{children}</p>
  );
}

function Metric({ label, value, text }: any) {
  return (
    <div className='bg-white/5 border border-white/10 rounded-2xl p-5'>
      <p className='text-xs text-slate-400'>{label}</p>
      <p
        className={`mt-2 font-black ${
          text ? "text-xl" : "text-4xl"
        } text-pink-400`}
      >
        {value}
      </p>
    </div>
  );
}

function monthLabel(i: number) {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i];
}
