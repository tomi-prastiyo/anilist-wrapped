import AnalyticsSection from "./AnalyticsSection";

export default function WrappedCanvas({ data, year }: any) {
  return (
    <div
      id='wrapped'
      className='w-[1080px] h-[1920px]
      bg-gradient-to-b from-[#0B1220] to-[#05070D]
      p-20 flex flex-col gap-14 rounded-3xl'
    >
      {/* HEADER */}
      <div>
        <p className='text-sm tracking-widest text-pink-400'>ANILIST WRAPPED</p>
        <h1 className='text-6xl font-black mt-2'>{year}</h1>

        <div className='flex items-center gap-4 mt-6'>
          <img
            src={data.user.avatar.large}
            className='w-20 h-20 rounded-full border-2 border-pink-500'
          />
          <div>
            <p className='text-xl font-semibold'>{data.user.name}</p>
            <p className='text-sm text-slate-400'>Your anime journey</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className='grid grid-cols-3 gap-6'>
        <Stat label='Episodes Watched' value={data.stats.episodes} />
        <Stat label='Anime Completed' value={data.stats.completed} />
        <Stat label='Mean Score' value={data.stats.meanScore.toFixed(1)} />
      </div>

      {/* TOP ANIME */}
      <div>
        <p className='text-sm tracking-widest text-slate-400 mb-4'>TOP ANIME</p>
        <div className='flex gap-6'>
          {data.topAnime.map((a: any, i: number) => (
            <div key={i}>
              <img
                src={a.media.coverImage.large}
                className='w-56 h-80 object-cover rounded-2xl'
              />
              <p className='mt-2 font-semibold max-w-[220px]'>
                {a.media.title.romaji}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYTICS */}
      <AnalyticsSection data={data} />
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className='bg-white/5 border border-white/10 rounded-2xl p-6'>
      <p className='text-xs text-slate-400'>{label}</p>
      <p className='text-5xl font-black text-pink-400 mt-2'>{value}</p>
    </div>
  );
}
