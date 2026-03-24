import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    secondaryBackground: string;
    text: string;
    secondaryText: string;
  };
  darkMode: boolean;
};

type ThemeContextType = {
  theme: Theme;
  toggleDarkMode: () => void;
};

const lightTheme: Theme = {
  colors: {
    primary: "#03bccd",   // Tailwind blue-600
    secondary: "#FBBF24", // Tailwind yellow-400
    background: "#383F73",
    secondaryBackground: "#ffffff",
    text: "#00B16A",    
    secondaryText: "#ffffff",    
  },
  darkMode: false,
};

const darkTheme: Theme = {
  colors: {
    primary: "#03bccd",   // Tailwind blue-500
    secondary: "#FCD34D", // Tailwind yellow-300
    background: "#383F73", // Tailwind gray-800
    secondaryBackground: "#ffffff", // Tailwind gray-800
    text: "#00B16A", 
     secondaryText: "#ffffff",
  },
  darkMode: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleDarkMode = () => {
    setTheme((prev) => (prev.darkMode ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
