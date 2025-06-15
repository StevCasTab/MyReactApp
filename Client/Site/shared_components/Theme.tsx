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
  toggleTheme: (boolVal: boolean) => void;
  customBgC: string;
  customTxtC: string;
}

//Context includes Default Values
export const Theme = createContext<ThemeContextType>({
  theme: "light",
  setCustomBackColor: () => {},
  setCustomTextColor: () => {},
  toggleTheme: () => {},
  customBgC: "",
  customTxtC: ""
});

//children prop is defined as a ReactNode
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  //Returns localstorage value
  const [theme, setTheme] = useState<"light" | "dark" | "custom">(() => {
    const savedTheme = localStorage.getItem("theme");
    console.log('loading from storage');
    if (savedTheme === "custom") {
      return "custom";
    } else {
      return savedTheme === "dark" ? "dark" : "light";
    }
  });

  const [lasttheme, setLastTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark" ? "dark" : "light";
  });


  //Update value in localstorage when theme is updated
  useEffect(() => {
    if (theme === "custom" && customBgC) {
      document.documentElement.style.setProperty("--bg-color", customBgC);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);

      if(theme === 'light' || theme === 'dark')
        {
          setLastTheme(theme);
        }
    }
  }, [theme]);

  const [customBgC, setCustomBgC] = useState<string>(
    localStorage.getItem("customBgC") ?? theme === "light"
      ? "#ffffff"
      : "#121212"
  );
  const [customTxtC, setCustomTxtC] = useState<string>(
    localStorage.getItem("customTxtC") ?? theme === "light"
      ? "#121212"
      : "#ffffff"
  );

  const setCustomBackColor = (color: string) => {
    if (color === "" && theme === "custom") {
      setCustomBgC("");
    } else {
      setTheme("custom");
      document.documentElement.style.setProperty("--bg-color", color);
      setCustomBgC(color);
    }
  };

  const setCustomTextColor = (color : string) => {
    if (color === "" && theme === "custom") {
      setCustomTxtC("");
    } else {
      setTheme("custom");
      document.documentElement.style.setProperty("--text-color", color);
      setCustomTxtC(color);
    }
  };

  //callback function to set the theme
  // const toggleTheme = (boolVal?: boolean) => {
  //   if (theme === "custom") {
  //     if(boolVal === true)
  //       {
  //           setTheme("dark");
  //       }else{
  //     setTheme("light");
  //       }
  //     setCustomBgC("");
  //     setCustomTxtC("");
  //     document.documentElement.style.setProperty("--bg-color", "");
  //   } else {
  //     setTheme((prev) => (prev === "light" ? "dark" : "light"));
  //   }
  // };

  const toggleTheme = (boolVal? : boolean) =>
  {
    console.log('Theme - ' + boolVal);

    const targetTheme = boolVal !== undefined ? (boolVal ? "dark" : "light") : undefined;
    const isCustom = theme === "custom";
    const nextTheme = lasttheme === "light" ? "dark" : "light";
    const newTextColor = (isCustom ? lasttheme : targetTheme ?? nextTheme) === "dark" ? "#ffffff" : "#121212";

    console.log('To set - ' + (targetTheme ?? nextTheme));

    setCustomTextColor(newTextColor);
    setCustomBackColor('');
    document.documentElement.style.setProperty("--bg-color", '');
    document.documentElement.style.setProperty("--text-color", '');

    if(isCustom || targetTheme === undefined)
      {
        setTheme(nextTheme);
      }
      else{
        setTheme(targetTheme);
      }
  }

  const muiPaletteMode: "light" | "dark" = lasttheme === 'light' ? 'light' : 'dark';


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
            : {
                primary: {
                  main: "#90caf9", // lighter blue for dark theme
                },
                background: {
                  default: "black",
                },
              }
            ),
        },
      }),
    [muiPaletteMode]
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
        customTxtC,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </Theme.Provider>
  );
};

//Custom hook to reduce repetition of useContext
export const useTheme = () => useContext(Theme);
