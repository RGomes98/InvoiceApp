export const formatNumberInput = (input: string, field: string) => {
  if (field === 'quantity') return input.replace(/\D/g, '');
  return input.replace(/[^0-9.]/g, '');
};
