import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
//Context Tructure
interface ThemeContextType {
  theme: string;
  lastTheme: string;
  setBackColor: (color: string) => void;
  setTextColor: (color: string) => void;
  toggleTheme: (boolVal: boolean) => void;
  currentBgC: string;
  currentTxtC: string;
}

//Context includes Default Values
export const Theme = createContext<ThemeContextType>({
  theme: "light",
  lastTheme: "light",
  setBackColor: () => {},
  setTextColor: () => {},
  toggleTheme: () => {},
  currentBgC: "",
  currentTxtC: "",
});

//children prop is defined as a ReactNode
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  //Returns localstorage value
  const [theme, setTheme] = useState<"light" | "dark" | "custom">(() => {
    const savedTheme = localStorage.getItem("theme"); //Check if a theme was saved in local storage
    if (savedTheme === "custom") {
      //If the saved theme was custom
      return "custom"; //Set the current theme to 'custom'
    } else {
      return savedTheme === "dark" ? "dark" : "light"; //If the theme was not saved as custom, set it to reflect the light/dark themes
    }
    // localStorage.setItem("theme", "light");
    // return "light";
  });

  //To remember last theme that was chosen to track last theme before choosing a custom theme
  const [lastTheme, setLastTheme] = useState<"light" | "dark">(() => {
    const savedLastTheme = localStorage.getItem("lastTheme");

    if (savedLastTheme) {
      //If a last theme was found saved in local storage
      return savedLastTheme === "light" ? "light" : "dark"; //Set the current theme to reflect the saved theme
    } else {
      return "light"; //If no theme was found saved in storage, revert to light theme by default
    }
  });

  //Update value in localstorage when theme is updated
  useEffect(() => {

    //If the theme was set to custom
    if (theme === "custom") {

      //Set the theme in storage to 'Custom'
      localStorage.setItem("theme", "custom");

    } else {
      //set the data theme to either light or dark.
      document.documentElement.setAttribute("data-theme", theme);

      //Save the theme in storage to Light or Dark
      localStorage.setItem("theme", theme); 
    }
  }, [theme]);

  //Current Background Colour
  const [currentBgC, setBgC] = useState<string>(() => {
    //Retrieve a custom background colour saved in storage
    const savedColour = localStorage.getItem("customBgC"); 
    
    //If a custom colour was found
    if (savedColour) {
      //Set the property (--bg-color) to the custom colour. Setting the property overrides the css within the spreadsheet.
      document.documentElement.style.setProperty("--bg-color", savedColour); 
    }

    //Return the custom saved colour if present, and return the default background colours if no custom colour was found.
    return savedColour == null 
      ? theme === "dark"
        ? "#121212"
        : "#ffffff"
      : savedColour;
  });

  //Current Text Colour
  const [currentTxtC, setTxtC] = useState<string>(() => {
    const savedColour = localStorage.getItem("customTxtC"); //Retrieve a custom text colour saved in storage
    if (savedColour) {
      //If a custom colour was found
      document.documentElement.style.setProperty("--text-color", savedColour); //Set the property (--text-color) to the custom colour. Setting the property this way overrides the css within the spreadsheet.
    }
    return savedColour == null //Return the custom saved colour, if present, and return the default text colours if no custom colour was found.
      ? theme === "dark"
        ? "#ffffff"
        : "#121212"
      : savedColour;
  });

  //Function to set background colour
  const setBackColor = (color: string) => {
    const storedBackColour = localStorage.getItem("customBgC");

    if (storedBackColour !== color) { //If the colour does not match a saved colour in storage
      setBgC(color); //Set the constant to the colour retrieved

      const isCustomColor = color !== "" && color !== "#ffffff" && color !== "#121212"; //Check to see if the colour is empty or a default colour

      if(isCustomColor) //If the color is a custom one
        {
          document.documentElement.style.setProperty("--bg-color", color); //Set (--bg-color) css property to the colour 
          localStorage.setItem("customBgC", color); //Save the new colour to storage
        }
        else{
          document.documentElement.style.setProperty("--bg-color", ""); //Set (--bg-color) css property to empty. As setting the property overrides any css values within the spreadsheet
          localStorage.removeItem("customBgC"); //Remove the saved colour within storage if one exists
        }
    }
  };

  //Constant to set the current text colour
  const setTextColor = (color: string) => {

    const storageColor = localStorage.getItem("customTxtC");

    if(storageColor !== color)
      {
        setTxtC(color);

        const isCustomColor = color !== "" && color !== "#ffffff" && color !== "#121212"; //Check to see if the colour is empty or a default colour

      if(isCustomColor) //If the color is a custom one
        {
          document.documentElement.style.setProperty("--text-color", color); //Set (--text-color) css property to the colour 
          localStorage.setItem("customTxtC", color); //Save the new colour to storage
        }
        else{
          document.documentElement.style.setProperty("--text-color", ""); //Set (--text-color) css property to empty. As setting the property overrides any css values within the spreadsheet
          localStorage.removeItem("customTxtC"); //Remove the saved colour within storage if one exists
        }
      }
  };

  //Constant to switch between Dark/Light themes
  const toggleTheme = () => {

    //Retrieve the next theme 
    const nextTheme = lastTheme === "light" ? "dark" : "light";

    //Retrieve the text colour for the next theme
    const newTextColor = nextTheme === "dark" ? "#ffffff" : "#121212";

    //Set the current theme to the new one
    setTheme(nextTheme);

    //Set the background colour to reflect the new theme
    setBackColor(nextTheme === "dark" ? "#121212" : "#ffffff");

    //Set the Text colour to reflect the new theme
    setTextColor(newTextColor);

    //Set the last theme to the new one to track the last theme selected (Light/Dark)
    setLastTheme(nextTheme);

    //Save the last theme in storage
    localStorage.setItem("lastTheme", nextTheme);

    //Save the current theme in storage
    localStorage.setItem("theme", nextTheme);
  };


  //Palette Mode to change colours for MUI components
  const muiPaletteMode: "light" | "dark" = theme === "light" ? "light" : "dark";

  //Creates a theme for MUI components to use
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: muiPaletteMode,
          ...(muiPaletteMode === "light" //Light Theme
            ? {
                primary: {
                  main: "#1976d2", // blue for light theme
                },
                background: {
                  default: "#121212",
                },
              }
            : {                          //Dark Theme
                primary: {
                  main: "#2e2d2dff", // lighter blue for dark theme
                },
                background: {
                  default: "#121212",
                },
              }),
        },
        // components: {
        //   MuiDataGrid: {

        //   }
        // }
      }),
    [muiPaletteMode]
  );

  //Return Theme Provider with values and function to toggle between them
  return (
    <Theme.Provider
      value={{
        theme,
        lastTheme,
        toggleTheme,
        setBackColor,
        setTextColor,
        currentBgC,
        currentTxtC,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </Theme.Provider>
  );
};

//Custom hook to reduce repetition of useContext
export const useTheme = () => useContext(Theme);
