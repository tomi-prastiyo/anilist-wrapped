import { CardBox } from "@/presentation/components/ui/CardBox";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

interface DailyActivityProps {
  activity: {
    episodePerDay: number;
    chapterPerDay: number;
    activityPerDay: number;
  };
}

export function WrappedDailyActivity({ activity }: DailyActivityProps) {
  if (!activity) return null;

  return (
    <CardBox className='w-[257.75px] h-[267.45px] px-6.25 py-5.75 flex flex-col gap-4.75'>
      <SectionHeader
        title='Daily Activity'
        dotColor='bg-white'
        titleColor='text-text-secondary'
      />

      {[
        ["Episode / Day", activity.episodePerDay],
        ["Chapter / Day", activity.chapterPerDay],
        ["Activity / Day", activity.activityPerDay],
      ].map(([label, value]) => (
        <div key={label} className='flex justify-between items-center'>
          <span className='text-[14px] font-semibold text-text-muted'>
            {label}
          </span>
          <span className='text-[16px] font-bold text-text-primary'>
            {value}
          </span>
        </div>
      ))}
    </CardBox>
  );
}
