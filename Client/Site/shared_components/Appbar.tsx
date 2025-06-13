import {AppBar, Toolbar, Typography} from '@mui/material';

const Appbar = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                    My React App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;