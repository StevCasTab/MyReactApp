import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


interface AppbarProps{
    openSettings: () => void;
}

const Appbar: React.FC<AppbarProps> = ({openSettings}) => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow:1, color:"var(--text-color)", fontWeight:"bold"}}>
                    My React App
                </Typography>
                <IconButton onClick={openSettings}>
                    <SettingsIcon style={{color:"white", cursor:"pointer"}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;