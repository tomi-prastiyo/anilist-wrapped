import { UserWrappedData } from "@/types/wrapped.types";

interface HeaderProps {
  user: Pick<
    UserWrappedData,
    "username" | "memberSince" | "avatarUrl" | "bannerUrl"
  >;
}

export function Header({ user }: HeaderProps) {
  return (
    <div className='relative'>
      <header
        className='w-full h-96 relative bg-cover bg-center'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #0b1622 100%), url(${user.bannerUrl})`,
        }}
      >
        <div className='relative z-10 flex flex-col justify-between h-full p-6 md:p-10 max-w-7xl mx-auto'>
          <div>
            <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight'>
              YOUR <br />
              <span className='bg-gradient-to-r from-[#3db4f2] to-[#c063ff] bg-clip-text text-transparent'>
                2024
              </span>
            </h1>
            <p className='text-gray-300 text-lg mt-2 font-medium'>
              AniList Wrapped
            </p>
          </div>
        </div>

        <div className='absolute right-6 md:right-10 bottom-0 translate-y-1/2 flex items-center gap-3 md:gap-4'>
          <div className='text-right hidden md:block'>
            <h2 className='text-2xl font-bold text-white'>{user.username}</h2>
            <p className='text-sm text-gray-400'>
              Member since {user.memberSince}
            </p>
          </div>
          <div className='w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#1A2130] overflow-hidden shadow-lg'>
            <img
              src={user.avatarUrl}
              alt='User Avatar'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </header>

      <div className='h-12 md:h-16'></div>
    </div>
  );
}
