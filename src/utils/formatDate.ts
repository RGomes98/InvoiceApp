export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'Europe/London' }).format(
    new Date(date)
  );
};

export const formatToDateTime = (date: Date) => {
  const [day, month, year] = Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/London',
  })
    .format(new Date(date))
    .split('/');

  return [year, month, day].join('-');
};
