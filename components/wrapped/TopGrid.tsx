interface TopGridItem {
  media: {
    id?: number;
    title: {
      romaji: string;
    };
    coverImage: {
      large: string;
    };
  };
}

interface TopGridProps {
  items: TopGridItem[];
}

export function TopGrid({ items }: TopGridProps) {
  if (!items || items.length === 0) {
    return <div className='text-xs text-slate-500'>No data available</div>;
  }

  return (
    <div className='grid grid-cols-5 gap-4'>
      {items.map((item, idx) => (
        <div
          key={item.media?.id ?? idx}
          className='flex flex-col items-center text-center'
        >
          <img
            src={item.media.coverImage.large}
            className='w-24 h-36 rounded-xl object-cover 
  border border-white/10 shadow-md'
          />

          <p
            className='
              mt-2
              text-xs text-slate-200
              max-w-[96px]
              truncate
            '
            title={item.media.title.romaji}
          >
            {item.media.title.romaji}
          </p>
        </div>
      ))}
    </div>
  );
}
