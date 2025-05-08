import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#232837',
    card: '#2c3144',
    text: '#ffffff',
    border: '#232837',
    primary: '#3ec6ff',
  },
};

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f6fa',
    card: '#fff',
    text: '#232837',
    border: '#e0e0e0',
    primary: '#3ec6ff',
  },
};

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? MyDarkTheme : MyLightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 