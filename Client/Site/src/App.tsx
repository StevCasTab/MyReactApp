
import Appbar from "../shared_components/Appbar";
import SettingsTab from "../components/SettingsTab";
import { useTheme as UseMuiTheme} from "@mui/material/styles";
import { useTheme } from "../shared_components/Theme";

import { ClientInfoModel } from "../Models/ClientInfoModel";

import "./App.css";
import { useEffect, useState } from "react";
import { Box} from "@mui/material";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { MoonLoader } from "react-spinners";
import axios, { type AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "http://localhost:5063",
});


function App() {
  const muiTheme = UseMuiTheme();
  const {lastTheme} = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [setBar, openSetBar] = useState<boolean>(false);
  const [clients, setClients] = useState<ClientInfoModel[]>([]);
  const [transitionClassName, setTransitionClassName] = useState<string>("");

  useEffect(() => {
    if (loading == false) {
      setTransitionClassName("disappearLoader");
      console.log(transitionClassName);
      console.log(clients.length);
    }
  }, [loading]);

  useEffect(() => {
    // const retrieveClients : AxiosResponse = await client.get('/api/Clients');
    const fetchData = async () => {
      const data: AxiosResponse = await client.get("/api/Clients");
      const foundClients: ClientInfoModel[] = data.data;
      setClients(foundClients);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  // if (loading) {
  //   return (
  //     <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
  //       <MoonLoader color={"#702020ff"}></MoonLoader>
  //     </div>
  //   );
  // } else {

  const dataGridColumns: GridColDef[] = [
    { field: "clientId", headerName: "Client Id", flex: 1 , sortable: true},
    { field: "firstName", headerName: "First Name", flex: 1 , sortable: true},
    { field: "lastName", headerName: "Last Name", flex: 1 , sortable: true},
    { field: "email", headerName: "Email", flex: 1 , sortable: true},
    { field: "age", headerName: "Age", flex: 1 , sortable: true},
    { field: "locality", headerName: "Locality", flex: 1 , sortable: true},
    { field: "country", headerName: "Country", flex: 1 , sortable: true},
  ];

  const dataGridRows: GridRowsProp = clients.map((client) => ({
    id: Number(client.clientId),
    clientId: Number(client.clientId),
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    age: Number(client.age),
    locality: client.locality,
    country: client.country,
  }));


  return (
    <>
        {/*LOADER*/}
        <div
          className={transitionClassName}
          style={{
            backgroundColor: lastTheme == 'light' ? '#ffffff' :  muiTheme.palette.primary.main,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 20,
          }}
        >
          <MoonLoader color={"var(--text-color)"}></MoonLoader>
        </div>

        {/*PAGE*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Box sx={{ position: "absolute", width: "100%" }}>
            <Appbar
              openSettings={() => {
                openSetBar(!setBar);
              }}
            ></Appbar>

            {setBar && (
              <Box
                sx={{
                  width: "30%",
                  maxWidth: "400px",
                  position: "absolute",
                  right: 0,
                }}
              >
                <SettingsTab openSetBar={setBar}></SettingsTab>
              </Box>
            )}
          </Box>

          {/*CONTENT*/}
          <Box sx={{width: "100%", height: "100%", justifyContent:"center", alignItems:"center", display:"flex", zIndex: -20, marginTop: "2%"}}>
            {/*Sorting Feature does not work yet. Will attempt to explore why in the future*/}
            <DataGrid
              key="client-grid"
              sx={{
                boxShadow: 4,
                maxWidth: "80%",
                maxHeight: "80%",
                color: "var(--text-color)",
                backgroundColor: "var(--bg-color)",
                "& .MuiDataGrid-columnHeader": { backgroundColor: muiTheme.palette.primary.main},
                "& .MuiDataGrid-columnHeaderTitle" : {fontWeight: "bold"}
              }}
              columns={dataGridColumns}
              rows={dataGridRows}
              sortingOrder={['asc','desc']}
              disableColumnSorting={false}
            ></DataGrid>
          </Box>
        </Box>
    </>
  );
}
// }

export default App;
