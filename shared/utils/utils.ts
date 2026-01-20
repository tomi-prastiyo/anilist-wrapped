export function getYearRange(year: number) {
  const start = Math.floor(
    new Date(Date.UTC(year, 0, 1, 0, 0, 0)).getTime() / 1000,
  );

  const end = Math.floor(
    new Date(Date.UTC(year, 11, 31, 23, 59, 59)).getTime() / 1000,
  );

  return {
    start,
    end,
  };
}
