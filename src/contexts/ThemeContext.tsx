import React, { createContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../styles/colors';
import { radius } from '../styles/radius';
import { spacing } from '../styles/spacing';
import { Theme } from '../styles/theme';

type ThemeType = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  themeName: ThemeType;
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const themeName: ThemeType = deviceColorScheme === 'dark' ? 'dark' : 'light';

  const currentTheme: Theme = {
    colors: themeName === 'light' ? lightColors : darkColors,
    radius,
    spacing,
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

