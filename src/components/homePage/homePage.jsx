import React from "react";
import { Slider } from "@mui/material";
import { Stack } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const HomePage = ({value, onChange}) => {


    return (
    <div>
        <div>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Gender"
                            onChange={onChange}
                            >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                </FormControl>
            </Box>
        </div> 

        <div>
            <Box component="form" sx={{ minWidth: 200 }} noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <TextField id="outlined-basic" label="" variant="outlined"></TextField>
                </FormControl>
            </Box>
        </div>

        <div>
            <Box sx={{ minWidth: 200 }} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Relationship"
                            onChange={onChange}
                            >
                            <MenuItem value={'father'}>Father</MenuItem>
                            <MenuItem value={'mother'}>Mother</MenuItem>
                            <MenuItem value={'brother'}>Brother</MenuItem>
                            <MenuItem value={'sister'}>Sister</MenuItem>
                            <MenuItem value={'spouse'}>Spouse</MenuItem>
                            <MenuItem value={'friend'}>Friend</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                </FormControl>
            </Box>
        </div>

        <div>
            <Box sx={{ minWidth: 200 }} >
                <FormControl fullWidth>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <p>$0</p>
                        <Slider aria-label="Volume" value={value} onChange={onChange} />
                        <p>$1000</p>
                    </Stack>
                </FormControl>
            </Box>
        </div>

        <div>
            <Box component="form" sx={{ minWidth: 200 }} noValidate autoComplete="off">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <TextField id="outlined-basic" label="" variant="outlined"></TextField>
                </FormControl>
            </Box>
        </div>

        <div>
            <Box sx={{ width: 300, minWidth: 200, borderRadius: 20}} >
                <FormControl fullWidth>
                    <Button variant="contained">Confirm</Button>
                </FormControl>
            </Box>
        </div>
    </div>
    );
};

export default HomePage;