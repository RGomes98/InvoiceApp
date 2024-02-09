export const getFutureDate = (date: Date, days: number) => {
  return new Date(date.setDate(date.getDate() + days));
};
