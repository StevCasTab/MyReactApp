import React, {useState, useEffect} from 'react';

interface ColorPickerProp {
    func: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProp> = ({func}) => 
    {
        const [color, setColor ] = useState('#ffffff');

        useEffect(() => {
            func(color);
        }, [color]);

        return(
            <div style={{padding: '1rem'}}>
                <label htmlFor="color-input" style={{marginRight: '0.5rem'}}>
                    Input Custom Background Color
                </label>
                <input type="color" id="color-input" value={color} onChange={(e) => setColor(e.target.value)} style={{width: '50px', height: '30px', border: 'none', cursor: 'pointer'}}></input>
            </div>
        );
    };


    export default ColorPicker;