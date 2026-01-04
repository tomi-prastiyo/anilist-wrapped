interface TopTagsProps {
  tags: string[];
}

export function TopTags({ tags }: TopTagsProps) {
  return (
    <div className='bg-[#151f2e] rounded-2xl p-5'>
      <div className='flex items-center gap-2 mb-4'>
        <div className='w-1 h-4 bg-white rounded-full'></div>
        <h4 className='text-sm font-bold text-gray-200'>Top Tag</h4>
      </div>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className='px-4 py-2 bg-[#0B1622] rounded-lg text-xs text-gray-300 border border-gray-700'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
