import { ThemeContext, type FontSize, type Theme } from '@/hooks/useTheme';
import { useCallback, useMemo, useState, type ReactNode } from 'react';







interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const changeFontSize = useCallback((size: FontSize) => {
    setFontSize(size);
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, fontSize, changeFontSize }),
    [theme, toggleTheme, fontSize, changeFontSize]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}