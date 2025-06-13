import { useTheme } from "../shared_components/Theme";
import ColorPicker from "../components/ColorPicker";

function SettingsPage() {
  const {toggleTheme, setCustomBackColor} = useTheme();

  return (
    <div style={{ padding: "2rem" }}>
      <ColorPicker func={setCustomBackColor}></ColorPicker>
      <button onClick={toggleTheme}>Reset Colors</button>
    </div>
  );
}

export default SettingsPage;
