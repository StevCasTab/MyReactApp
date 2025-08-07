import { useTheme } from "../shared_components/Theme";
import { Box, Divider, Grow, Paper, Typography } from "@mui/material";
import Setting from "../components/Setting";
import { useEffect, useState } from "react";

interface SettingsTabProps {
  openSetBar: boolean;

}

const SettingsTab: React.FC<SettingsTabProps> = ({ openSetBar }) => {
  const {theme, toggleTheme, setBackColor, setTextColor, currentBgC, currentTxtC, lastTheme} = useTheme();
  const [currentTheme, setCurrentTheme] = useState<boolean>(lastTheme === 'dark');
  
  useEffect(() => {
    if(theme !== 'custom')
      {
        setCurrentTheme(theme === 'dark');
      }
  }, [theme]);

  return (
    <Grow
      in={openSetBar}
      timeout="auto"
      style={{ overflow: "hidden", border: "1px solid black"}}
    >
      <Paper
        sx={{
          backgroundColor: "var(--set-color)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          maxHeight: "100vh",
        }}
        elevation={3}
      >
         <Box sx={{ backgroundColor: currentTheme ? "#121212" : "#6fb2f5", opacity:0.8 , width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              color: "var(--text-color)"
            }}
            gutterBottom
          >
            Settings
          </Typography>
          {/* <Divider
            sx={{ borderColor: "black", border: "1px solid black" }}
          ></Divider> */}
        </Box>
        
        <Divider
            sx={{ borderColor: "black", border: "1px solid black" }}
          ></Divider>


        <Setting variant="Color" label="Custom Background" stringFunc={setBackColor} stringVal={currentBgC}></Setting>
        <Setting variant="Color" label="Custom Font Colour" stringFunc={setTextColor} stringVal={currentTxtC}></Setting>
        <Setting variant="Switch" label="Dark Theme" boolFunc={toggleTheme} boolVal={currentTheme}></Setting>
      </Paper>
    </Grow>
  );
};

export default SettingsTab;
