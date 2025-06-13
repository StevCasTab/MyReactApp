import { useTheme } from "../shared_components/Theme";
import ColorPicker from "./ColorPicker";
import { Box, Collapse, Divider, Grow, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface SettingsTabProps {
  openSetBar: boolean;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ openSetBar }) => {
  const { toggleTheme, setCustomBackColor, customBgC } = useTheme();

  return (
    <Grow
      in={openSetBar}
      timeout="auto"
      style={{ overflow: "hidden", border: "1px solid red" }}
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
        <Box sx={{ backgroundColor: "var(--setbar-color)" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
            }}
            gutterBottom
          >
            Settings
          </Typography>
          <Divider
            sx={{ borderColor: "black", border: "1px solid black" }}
          ></Divider>
        </Box>
        <ColorPicker
          func={(color: string) => {
            setCustomBackColor(color);
          }}
          currentColor={customBgC}
          label="Custom Background"
        ></ColorPicker>
      </Paper>
    </Grow>
  );
};

export default SettingsTab;
