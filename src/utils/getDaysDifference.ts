export const getDaysDifference = (createdAt: Date, paymentDue: Date) => {
  const differenceInTime = createdAt.getTime() - paymentDue.getTime();
  return Math.abs(Math.round(differenceInTime / (1000 * 3600 * 24)));
};
