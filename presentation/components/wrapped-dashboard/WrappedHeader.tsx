"use client";

import { User } from "@/presentation/models/User";
import Image from "next/image";

interface HeaderProps {
  user: User;
  year: number;
}

export const WrappedHeader = ({ user, year }: HeaderProps) => (
  <header
    className='w-full h-96 relative bg-cover bg-center flex items-end rounded-t-2xl'
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #0b1622 100%), url(${user.banner})`,
    }}
  >
    <div className='relative z-10 flex justify-between items-end w-full max-w-7xl mx-auto p-6 md:p-10'>
      <div>
        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight'>
          YOUR <br />
          <span className='bg-linear-to-r from-[#3db4f2] to-[#c063ff] bg-clip-text text-transparent'>
            {year}
          </span>
        </h1>
        <p className='text-gray-300 text-lg mt-2 font-medium'>
          AniList Wrapped
        </p>
      </div>
    </div>

    <div className='absolute right-6 md:right-10 bottom-0 translate-y-1/2 flex items-center gap-3 md:gap-4'>
      <div className='text-right hidden md:block'>
        <h2 className='text-2xl font-bold text-white'>{user.name}</h2>
        <p className='text-sm text-gray-400'>Member since {user.memberSince}</p>
      </div>
      <div className='relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-[#1A2130] shadow-lg'>
        <Image
          src={user.avatar}
          alt='User Avatar'
          fill
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  </header>
);
