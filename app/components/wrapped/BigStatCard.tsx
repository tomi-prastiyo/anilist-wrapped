interface BigStatCardProps {
  title: string;
  value: number;
  unit: string;
  color: "fuchsia" | "orange";
}

export function BigStatCard({ title, value, unit, color }: BigStatCardProps) {
  const colorClass =
    color === "fuchsia"
      ? "bg-gradient-to-br from-fuchsia-600 to-pink-600"
      : "bg-gradient-to-br from-orange-500 to-amber-500";

  return (
    <div
      className={`${colorClass} rounded-2xl p-6 shadow-lg transform transition hover:scale-[1.02]`}
    >
      <p className='text-xs font-bold tracking-wider text-white/80 uppercase mb-2'>
        {title}
      </p>
      <h3 className='text-6xl font-extrabold text-white'>{value}</h3>
      <p className='text-white/90 font-semibold mt-1'>{unit}</p>
    </div>
  );
}
