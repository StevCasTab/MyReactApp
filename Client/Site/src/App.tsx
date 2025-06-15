
import {ThemeProvider} from "../shared_components/Theme";
import Appbar from "../shared_components/Appbar";
import SettingsTab from "../components/SettingsTab";

import './App.css'
import { useState } from "react";
import { Box } from "@mui/material";

function App() {
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
