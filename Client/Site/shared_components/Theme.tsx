import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
//Context Tructure
interface ThemeContextType {
  theme: string;
  setCustomBackColor: (color: string) => void;
  setCustomTextColor: (color: string) => void;
  toggleTheme: () => void;
  customBgC: string;
}

//Context includes Default Values
export const Theme = createContext<ThemeContextType>({
  theme: "light",
  setCustomBackColor: () => {},
  setCustomTextColor: () => {},
  toggleTheme: () => {},
  customBgC: "",
});

//children prop is defined as a ReactNode
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  //Returns localstorage value
  const [theme, setTheme] = useState<"light" | "dark" | "custom">(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "custom") {
      return "custom";
    } else {
      return savedTheme === "dark" ? "dark" : "light";
    }
  });

  //Update value in localstorage when theme is updated
  useEffect(() => {
    if (theme === "custom" && customBgC) {
      document.documentElement.style.setProperty("--bg-color", customBgC);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const [customBgC, setCustomBgC] = useState<string>(
    localStorage.getItem("customBgC") ?? theme === "light"
      ? "#ffffff"
      : "#121212"
  );
  const [customTxtC, setCustomTxtC] = useState<string>(
    localStorage.getItem("customTxtC") ?? "var(--text-color)"
  );

  const setCustomBackColor = (color: string) => {
    if ((customBgC === color || color === "") && theme === "custom") {
      toggleTheme();
    } else {
      setTheme("custom");
      document.documentElement.style.setProperty("--bg-color", color);
      setCustomBgC(color);
    }
  };

  const setCustomTextColor = (color: string) => {
    if (color === "") {
      setTheme("light");
    } else {
      setCustomTxtC(color);
    }
  };

  //callback function to set the theme
  const toggleTheme = () => {
    if (theme === "custom") {
      setTheme("light");
      setCustomBgC("");
      setCustomTxtC("");
      document.documentElement.style.setProperty("--bg-color", "");
    } else {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  const muiPaletteMode: "light" | "dark" | undefined =
    theme === "light" ? "light" : theme === "dark" ? "dark" : undefined;

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: muiPaletteMode,
          ...(muiPaletteMode === "light"
            ? {
                primary: {
                  main: "#1976d2", // blue for light theme
                },
                background: {
                  default: "#121212",
                },
              }
            : muiPaletteMode === "dark"
            ? {
                primary: {
                  main: "#90caf9", // lighter blue for dark theme
                },
                background: {
                  default: "black",
                },
              }
            : {
                primary: {
                  main: "#1976d2", // blue for light theme
                },
                background: {
                  default: "#121212",
                },
              }),
        },
      }),
    [theme]
  );

  //Return Theme Provider with values and function to toggle between them
  return (
    <Theme.Provider
      value={{
        theme,
        toggleTheme,
        setCustomBackColor,
        setCustomTextColor,
        customBgC,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </Theme.Provider>
  );
};

//Custom hook to reduce repetition of useContext
export const useTheme = () => useContext(Theme);
