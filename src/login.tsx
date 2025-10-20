import './login.css';
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { LoadScript } from '@react-google-maps/api';

function Login () {
    const {ready,value,suggestions: { status, data },setValue,clearSuggestions,} = usePlacesAutocomplete({ debounce: 300 });
    const options = data.map(({ description }) => description);

    return(
        <LoadScript googleMapsApiKey={api_key_places} libraries={['places']}>
        <div className="mainContainer">
            <div className="submitArea">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Nom i Cognoms" variant="outlined" />
                    <TextField id="outlined-basic" label="DNI" variant="outlined" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Autocomplete
                            freeSolo
                            disabled={!ready}
                            options={options}
                            inputValue={value}
                            onInputChange={(e, newVal) => setValue(newVal)}
                            onChange={async (e, val) => {
                                clearSuggestions();
                                const results = await getGeocode({ address: val });
                                const { lat, lng } = await getLatLng(results[0]);
                                console.log("Coordenadas:", lat, lng);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Direcció" variant="outlined" />
                            )}
                            />
                    
                </Box>

            </div>
        </div>
        </LoadScript>
    )
}
export default Login;