export function TopGrid({ items }: { items: any[] }) {
  return (
    <div className='flex gap-3'>
      {items.map((i, idx) => (
        <div key={idx} className='text-center'>
          <img
            src={i.media.coverImage.large}
            className='w-24 h-36 rounded-xl object-cover'
          />
          <p className='text-xs mt-1 max-w-[96px] truncate'>
            {i.media.title.romaji}
          </p>
        </div>
      ))}
    </div>
  );
}
