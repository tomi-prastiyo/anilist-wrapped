export function TopTags({ tags }: { tags: any[] }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((t) => (
        <span
          key={t.name}
          className='text-xs px-2 py-1 rounded-full bg-pink-500/10 text-pink-400'
        >
          {t.name}
        </span>
      ))}
    </div>
  );
}
