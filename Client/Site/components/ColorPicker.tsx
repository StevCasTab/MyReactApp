import { Box, Stack } from '@mui/material';
import React, {useState, useEffect} from 'react';

interface ColorPickerProp {
    func: (color: string) => void;
    label: string;
    currentColor?: string;
}

//Do not use in a component that is rendered on a condition. Value will be reset.
//Use visibility: true/false
const ColorPicker: React.FC<ColorPickerProp> = ({func, label, currentColor}) => 
    {
        const [color, setColor ] = useState(currentColor ?? '');

        useEffect(() => {
                func(color);
        }, [color]);

        return(
            <Box sx={{padding: '1rem', display:"flex", alignItems:"center",justifyContent:"center",alignContent:'center',justifyItems:"center", gap:1, minHeight:0}}>
                <label htmlFor="color-input" style={{marginRight: '0.5rem', color:"var(--text-color)", fontWeight:"bold"}}>
                    {label}
                </label>
                <input type="color" id="color-input" value={color} onChange={(e) => setColor(e.target.value)} style={{width: '50px', height: '30px', border: 'none', cursor: 'pointer', borderColor:'border'}} ></input>
            </Box>
        );
    };


    export default ColorPicker;