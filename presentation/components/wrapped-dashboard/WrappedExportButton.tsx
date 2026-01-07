"use client";

import { Button } from "@mui/material";

interface WrappedExportButtonProps {
  onClick: () => void;
}

export const WrappedExportButton = ({ onClick }: WrappedExportButtonProps) => {
  return (
    <div className='flex justify-end w-full mt-4'>
      <Button
        onClick={onClick}
        variant='contained'
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: "1.25rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #EC4899, #F472B6)",
          color: "#fff",
          textTransform: "none",
          boxShadow: "0 4px 12px rgba(236,72,153,0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(90deg, #F472B6, #EC4899)",
            boxShadow: "0 6px 18px rgba(236,72,153,0.4)",
          },
        }}
      >
        Export Image
      </Button>
    </div>
  );
};
