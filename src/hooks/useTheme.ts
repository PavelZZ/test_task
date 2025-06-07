import { createContext, useContext } from "react";
export type Theme = 'light' | 'dark';

export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  changeFontSize: (size: FontSize) => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}