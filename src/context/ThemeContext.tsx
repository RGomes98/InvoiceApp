import type { ReactNode, SetStateAction, Dispatch } from 'react';
import type { Theme } from '../lib/schemas/theme.schema';
import { validateTheme } from '../helpers/validateTheme';
import { createContext, useState } from 'react';

type ThemeContext = {
  activeTheme: Theme;
  setActiveTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

const currentTheme = validateTheme();

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<Theme>(currentTheme || 'light');

  return <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>{children}</ThemeContext.Provider>;
};
