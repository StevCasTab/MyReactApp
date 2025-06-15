import { Box, InputBase, Switch } from "@mui/material";
import { useEffect, useState } from "react";
interface SettingProp {
  disableSet?: boolean;
  variant: "Switch" | "Text" | "Number" | "Color" | "Button";
  label: string;
  buttonLabel?: string;
  boolVal?: boolean;
  stringVal?: string;
  numbVal?: number;
  func?: () => void;
  boolFunc?: (bVal: boolean) => void;
  stringFunc?: (sVal: string) => void;
  numbFunc?: (nVal: number) => void;
  disabledFunc?: () => void;
}

const Setting: React.FC<SettingProp> = ({
  disableSet,
  variant,
  label,
  buttonLabel,
  boolVal,
  stringVal,
  numbVal,
  func,
  boolFunc,
  stringFunc,
  numbFunc,
  disabledFunc,
}) => {
  const [stringValue, setStringValue] = useState<string>("");
  const [boolValue, setBooleanValue] = useState<boolean>(false);
  const [numbValue, setNumberValue] = useState<number>(0);

   useEffect(() => {
  setStringValue(stringVal ?? '');
}, [stringVal]);

useEffect(() => {
  setBooleanValue(boolVal ?? false);
}, [boolVal]);

useEffect(() => {
  setNumberValue(numbVal ?? 0);
}, [numbVal]);

  function setNewString(newVal: string) {
    // setStringValue(newVal);
    if (stringFunc) {
      stringFunc(newVal);
    }
  }

  function setNewbool(newVal: boolean) {
    // console.log(newVal);
    // setBooleanValue(newVal);
    if (boolFunc) {
      boolFunc(newVal);
    }
  }

  function setNewNumb(newVal: number) {
    // setNumberValue(newVal);
    if (numbFunc) {
      numbFunc(newVal);
    }
  }

  const renderVariant = () => {
    switch (variant) {
      case "Switch":
        return (
          <Switch checked={boolValue} onChange={(e) => {
              setNewbool(e.target.checked);
          }}></Switch>
        );
        // if (disableSet) {
        //   return (
        //     <Button
        //       onClick={() => {
        //         if (disableSet) {
        //           disableSet = !disableSet;
        //           if (disabledFunc) {
        //             disabledFunc();
        //           }
        //         }
        //       }}
        //     >
        //       <Switch
        //         checked={boolValue}
        //         disabled={disableSet}
        //       ></Switch>
        //     </Button>
        //   );
        // }
        // else{
        //     return(
        //     <Switch
        //         checked={boolValue}
        //         onChange={(e) => {
        //           setNewbool(e.target.checked);
        //         }}
        //         disabled={disableSet}
        //       ></Switch>
        //     );
        // };
      case "Text":
        return (
          <InputBase
            type="text"
            value={stringValue}
            onChange={(e) => setNewString(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 2 }}
            disabled={disableSet}
          />
        );
      case "Number":
        return (
          <InputBase
            type="number"
            value={numbValue}
            onChange={(e) => setNewNumb(Number(e.target.value))}
            sx={{ backgroundColor: "white", width: "10%", borderRadius: 2 }}
            inputProps={{ style: { textAlign: "center" } }}
            disabled={disableSet}
          />
        );
      case "Color":
        return (
          <InputBase
            type="color"
            value={stringValue}
            onChange={(e) => setNewString(e.target.value)}
            sx={{
              width: "50px",
              height: "30px",
              "& input": {
                width: "100%",
                height: "100%",
                padding: 0,
                border: "none",
                cursor: "pointer",
              },
            }}
            disabled={disableSet}
          />
        );
      case "Button":
        // <Input type="button" onClick={func} title={buttonLabel} sx={{width:100, height:100}}/>
        return <button onClick={func}>{buttonLabel}</button>;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          pt: 1,
          gap: 1,
          minHeight: 0,
          flexWrap: "nowrap", //prevent wrapping
        }}
      >
        <label
          style={{
            marginRight: "0.5rem",
            color: "var(--text-color)",
            fontWeight: "bold",
            flexShrink: 1, //Allow shrinking if needed
            minWidth: 0, //Prevent flex item overflow
            whiteSpace: "nowrap", //Prevent label from wrapping
          }}
        >
          {label}
        </label>
        {renderVariant()}
      </Box>
    </>
  );
};

export default Setting;
