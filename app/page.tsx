"use client";

import { useState } from "react";
import { WrappedDashboard } from "@/presentation/pages/WrappedDashboard";
import { AniListRepositoryImpl } from "@/infrastructure/anilist/AniListRepositoryImpl";
import { getWrappedData } from "@/application/wrapped/GetWrappedData";

import {
  TextField,
  MenuItem,
  Button,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { WrappedResult } from "@/domain/entities/WrappedResult";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [username, setUsername] = useState("PdBear");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [data, setData] = useState<WrappedResult>();
  const [loading, setLoading] = useState(false);

  const years = [];
  for (let y = 2024; y <= currentYear; y++) years.push(y);

  const generate = async () => {
    if (!username) return alert("Please enter the AniList username");
    setLoading(true);
    try {
      const repo = new AniListRepositoryImpl();
      const d = await getWrappedData(repo, username, selectedYear);
      setData(d);
      setDisplayYear(selectedYear);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AniList data. Make sure the username is correct.");
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: pink[500] },
      background: { default: "#0B0B15", paper: "#1C1C27" },
      text: { primary: "#FFFFFF" },
    },
    typography: {
      button: {
        textTransform: "none",
        fontWeight: "bold",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className='relative min-h-screen flex flex-col items-center p-10 bg-linear-to-b from-[#0B0B15] to-[#1C1C27]'>
        {/* Input & Year Select */}
        <Box className='w-full max-w-md mb-5 space-y-6 z-10'>
          <TextField
            label='AniList Username'
            variant='outlined'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.25rem",
                backgroundColor: "#1C1C27",
                color: "#fff",
                "& fieldset": { borderColor: "#31313B" },
                "&:hover fieldset": { borderColor: pink[500] },
                "&.Mui-focused fieldset": { borderColor: pink[500] },
                boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
              },
              "& .MuiInputLabel-root": { color: "#CBD5E1" },
              "& .MuiInputLabel-root.Mui-focused": { color: pink[500] },
            }}
          />
        </Box>

        <Box className='w-full max-w-md mb-5 space-y-6 z-10'>
          <TextField
            select
            label='Select Year'
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1.25rem",
                backgroundColor: "#1C1C27",
                color: "#fff",
                "& fieldset": { borderColor: "#31313B" },
                "&:hover fieldset": { borderColor: pink[500] },
                "&.Mui-focused fieldset": { borderColor: pink[500] },
                boxShadow: "0 0 8px rgba(236, 72, 153, 0.3)",
              },
              "& .MuiInputLabel-root": { color: "#CBD5E1" },
              "& .MuiInputLabel-root.Mui-focused": { color: pink[500] },
            }}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box className='w-full max-w-md mb-5 space-y-6 z-10'>
          <Button
            variant='contained'
            color='primary'
            onClick={generate}
            disabled={loading}
            fullWidth
            sx={{
              py: 1.75,
              fontSize: "1rem",
              borderRadius: "1.5rem",
              background: "linear-gradient(90deg, #EC4899, #F472B6)",
              "&:hover": {
                background: "linear-gradient(90deg, #F472B6, #EC4899)",
              },
              boxShadow: "0 0 12px #EC4899, 0 0 24px #F472B6",
            }}
          >
            {loading ? "Generating..." : "Generate Wrapped"}
          </Button>
        </Box>

        {/* Dashboard */}
        <Box className={`w-full flex justify-center relative`}>
          {data && <WrappedDashboard data={data} year={displayYear} />}

          {/* Fullscreen Loading Overlay */}
          {loading && (
            <Box className='absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50'>
              <svg
                className='animate-spin h-12 w-12 text-pink-400 mb-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                ></path>
              </svg>
              <span className='text-white font-bold text-lg'>
                Loading Wrapped Data...
              </span>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
