export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'Europe/London' }).format(
    new Date(date)
  );
};
