"use client";

interface WrappedExportButtonProps {
  onClick: () => void;
}

export const WrappedExportButton = ({ onClick }: WrappedExportButtonProps) => {
  return (
    <div className='flex justify-end w-full mt-4'>
      <button
        onClick={onClick}
        className='px-6 py-3 rounded-[1.25rem] font-bold text-white text-sm
          bg-gradient-to-r from-accent to-accent-light
          shadow-[0_4px_12px_rgba(236,72,153,0.3)]
          hover:from-accent-light hover:to-accent
          hover:shadow-[0_6px_18px_rgba(236,72,153,0.4)]
          transition-all duration-300 cursor-pointer'
      >
        Export Image
      </button>
    </div>
  );
};
