
import {ThemeProvider, useTheme} from "../shared_components/Theme";
import ThemeToggleButton from "../shared_components/ThemeToggleButton";
import CustomThemeToggleButton from "../shared_components/ThemeToggleButton copy";
import Appbar from "../shared_components/Appbar";
import SettingsTab from "../components/SettingsTab";

import './App.css'
import { useState } from "react";
import { Box } from "@mui/material";
import ColorPicker from "../components/ColorPicker";

function App() {
  const {toggleTheme, setCustomBackColor} = useTheme();
  const [setBar, openSetBar] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider>
        <Appbar openSettings={() => {openSetBar(!setBar);}}></Appbar>

        <Box sx={{width:'30%', float:"right"}}>
            <SettingsTab openSetBar={setBar} ></SettingsTab>
          </Box>

      </ThemeProvider>
    </>
  )
}

export default App
