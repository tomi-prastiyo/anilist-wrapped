interface TopTag {
  name: string;
}

interface TopTagsProps {
  tags: TopTag[];
}

export function TopTags({ tags }: TopTagsProps) {
  if (!tags || tags.length === 0) {
    return <div className='text-xs text-slate-500'>No tags available</div>;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <span
          key={tag.name}
          className='
            px-2.5 py-1
            text-xs font-medium
            rounded-full
            bg-pink-500/10
            text-pink-400
            border border-pink-400/20
          '
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
