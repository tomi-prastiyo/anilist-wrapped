"use client";

import { User } from "@/presentation/models/User";

interface HeaderProps {
  user: User;
  year: number;
}

export const WrappedHeader = ({ user, year }: HeaderProps) => {
  return (
    <header className='relative w-full h-90 rounded-t-2xl overflow-hidden'>
      {/* BACKGROUND BANNER */}
      <div className='absolute left-0 -top-0.75 w-[1151.28px] h-[288.69px]'>
        <div
          className='absolute inset-0 bg-cover bg-center rounded-t-2xl'
          style={{
            backgroundImage: `url(${user.banner})`,
          }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/0 to-dashboard-deep' />
        <div className='absolute inset-x-0 -bottom-16 h-32 bg-dashboard-deep/80 blur-3xl' />
      </div>

      {/* CONTENT */}
      <div className='relative z-10 max-w-260 h-50 mx-auto flex justify-between items-center mt-32 px-6'>
        {/* LEFT */}
        <div className='flex flex-col gap-6 w-66.5'>
          <div className='relative h-41'>
            <h1 className='absolute top-0 left-0 text-text-primary font-black text-[96px] leading-20.5 tracking-[-2.4px]'>
              YOUR
            </h1>
            <h1 className='absolute top-20.5 left-0 font-black text-[96px] leading-20.5 tracking-[-2.4px] bg-linear-to-r from-[#C27AFF] via-[#FB64B6] to-[#00D3F2] bg-clip-text text-transparent'>
              {year}
            </h1>
          </div>
          <p className='text-purple-light text-[18px] font-semibold leading-3'>
            AniList Wrapped
          </p>
        </div>

        {/* RIGHT */}
        <div className='flex items-end gap-4.5'>
          <div className='flex flex-col gap-2.5 text-right'>
            <h2 className='text-text-secondary font-bold text-[30px] tracking-[-2.4px] leading-8'>
              {user.name}
            </h2>
            <p className='text-purple-light text-[14.7px] font-semibold leading-2.5'>
              Member since {user.memberSince}
            </p>
          </div>
          <div className='w-44.75 h-44.75 rounded-full overflow-hidden border-[3.2px] border-[#14141F] shadow-lg'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt='User Avatar'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </header>
  );
};
