import { useTheme } from "./Theme"

const CustomThemeToggleButton = () => 
    {
        const {setCustomBackColor} = useTheme();

        return (<button onClick={() => setCustomBackColor("#075700")}>Toggle Custom Theme</button>);
    };

    export default CustomThemeToggleButton;