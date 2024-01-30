import type { ReactNode, SetStateAction, Dispatch } from 'react';
import { createContext, useState } from 'react';

type ThemeOptions = 'light' | 'dark';

type ThemeContext = {
  activeTheme: ThemeOptions;
  setActiveTheme: Dispatch<SetStateAction<ThemeOptions>>;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<ThemeOptions>('light');

  return <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>{children}</ThemeContext.Provider>;
};
