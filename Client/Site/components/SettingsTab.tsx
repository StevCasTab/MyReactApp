import { useTheme } from "../shared_components/Theme";
import { Box, Divider, Grow, Paper, Typography } from "@mui/material";
import Setting from "../components/Setting";
import { useEffect, useState } from "react";

interface SettingsTabProps {
  openSetBar: boolean;

}

const SettingsTab: React.FC<SettingsTabProps> = ({ openSetBar }) => {
  const {theme, toggleTheme, setCustomBackColor, setCustomTextColor, customBgC, customTxtC} = useTheme();
  const [currentTheme, setCurrentTheme] = useState<boolean>();
  const customBgColor = theme === 'light' ? '#ffffff' : theme === 'dark' ? '#121212' : customBgC;
  const customTxtColor = theme === 'light' ? '#121212' : theme === 'dark' ? '#ffffff' : customTxtC;
  
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
         <Box sx={{ backgroundColor: currentTheme ? "#121212" : "#6fb2f5", opacity:0.8 }}>
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
          <Divider
            sx={{ borderColor: "black", border: "1px solid black" }}
          ></Divider>
        </Box>

        <Setting variant="Color" label="Custom Background" stringFunc={setCustomBackColor} stringVal={customBgColor}></Setting>
        <Setting variant="Color" label="Custom Font Colour" stringFunc={setCustomTextColor} stringVal={customTxtColor}></Setting>
        <Setting variant="Switch" label="Dark Theme" boolFunc={toggleTheme} boolVal={currentTheme}></Setting>
      </Paper>
    </Grow>
  );
};

export default SettingsTab;
