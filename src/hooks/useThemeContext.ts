import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) throw new Error('Use the Theme context within its provider.');
  return themeContext;
};
