interface StatCardProps {
  value: number;
  label: string;
  color: "fuchsia" | "orange";
  border?: boolean;
}

export function StatCard({ value, label, color, border }: StatCardProps) {
  const colorClass =
    color === "fuchsia"
      ? "bg-gradient-to-br from-fuchsia-600 to-pink-600"
      : "bg-gradient-to-br from-orange-500 to-amber-500";
  const borderClass = border
    ? color === "fuchsia"
      ? "border-fuchsia-500/30"
      : "border-orange-500/30"
    : "";

  return (
    <div
      className={`${colorClass} rounded-2xl p-3 shadow-lg ${
        border ? `border ${borderClass}` : ""
      }`}
    >
      <div className='text-xl font-bold text-white'>{value}</div>
      <div className='text-[10px] text-white/90 uppercase mt-1'>{label}</div>
    </div>
  );
}
