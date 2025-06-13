import { useTheme } from "./Theme"

const ThemeToggleButton = () => 
    {
        const {toggleTheme} = useTheme();

        return (<button onClick={toggleTheme}>Toggle Theme</button>);
    };

    export default ThemeToggleButton;