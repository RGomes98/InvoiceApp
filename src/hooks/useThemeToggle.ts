import { useThemeContext } from './useThemeContext';

export const useThemeToggle = () => {
  const { activeTheme, setActiveTheme } = useThemeContext();

  const handleThemeToggle = () => {
    const theme = activeTheme === 'light' ? 'dark' : 'light';

    setActiveTheme(theme);
    window.localStorage.setItem('currentTheme', theme);
  };

  return { handleThemeToggle };
};
