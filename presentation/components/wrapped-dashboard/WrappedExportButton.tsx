export const WrappedExportButton = ({ onClick }: { onClick: () => void }) => (
  <div className='flex justify-end'>
    <button
      onClick={onClick}
      className='px-4 py-2 rounded-xl font-bold text-white flex items-center justify-center gap-2
                 bg-gradient-to-r from-pink-500 to-pink-400 
                 hover:from-pink-600 hover:to-pink-500
                 transition-shadow shadow-md hover:shadow-lg'
    >
      Export Image
    </button>
  </div>
);
