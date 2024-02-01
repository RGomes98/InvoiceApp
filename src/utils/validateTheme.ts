import { themeSchema } from '../lib/schemas/theme.schema';

export const validateTheme = () => {
  const currentTheme = localStorage.getItem('currentTheme');
  const validTheme = themeSchema.safeParse(currentTheme);

  if (!validTheme.success) return localStorage.setItem('currentTheme', 'light');
  return validTheme.data;
};
