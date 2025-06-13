
import {ThemeProvider} from "../shared_components/Theme";
import ThemeToggleButton from "../shared_components/ThemeToggleButton";
import CustomThemeToggleButton from "../shared_components/ThemeToggleButton copy";
import Appbar from "../shared_components/Appbar";
import SettingsPage from "../Pages/SettingsPage";

import './App.css'

function App() {
    
  return (
    <>
      <ThemeProvider>
        <Appbar></Appbar>
        {/* <ThemeToggleButton></ThemeToggleButton>
        <CustomThemeToggleButton></CustomThemeToggleButton> */}
        <SettingsPage></SettingsPage>
      </ThemeProvider>
    </>
  )
}

export default App
