export const WrappedExportButton = ({ onClick }: { onClick: () => void }) => (
  <div className='flex justify-end'>
    <button
      onClick={onClick}
      className='px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600'
    >
      Export Image
    </button>
  </div>
);
