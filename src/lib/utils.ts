export const getNextFriday = (date: Date = new Date()): string => {
  const daysUntilFriday = (5 - date.getDay() + 7) % 7;
  const nextFriday = new Date(
    date.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000
  );
  return nextFriday.toISOString().slice(0, 10);
};
