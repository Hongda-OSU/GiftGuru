import React from "react";
<<<<<<< HEAD
import "./homePage.css";
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
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
=======
import './homePage.css';
import { 
    Slider, 
    Stack, 
    Select, 
    InputLabel, 
    MenuItem, 
    FormControl, 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Typography, 
    Container 
} from "@mui/material";

>>>>>>> 34a9128181aca18822089703b14ae79299cfb548
import DropzoneAreaExample from "../dropZone/dropZone";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";

<<<<<<< HEAD
const HomePage = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
        <Header />
      <div>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <Typography variant="h4" gutterBottom>
              GiftGuru
            </Typography>
          </FormControl>
        </Box>
      </div>

      <div>
        <DropzoneAreaExample></DropzoneAreaExample>
      </div>

      <div>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <Typography variant="body2" gutterBottom>
              Recipient gender
            </Typography>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Gender"
              onChange={onChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <Typography variant="body2" gutterBottom>
            Recipient age range
          </Typography>
        </FormControl>
      </Box>

      <div>
        <Box
          component="form"
          sx={{ minWidth: 200 }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select age range
            </InputLabel>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
            ></TextField>
          </FormControl>
        </Box>
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <Typography variant="body2" gutterBottom>
            Relationship with recipient
          </Typography>
        </FormControl>
      </Box>

      <div>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select relationship
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Relationship"
              onChange={onChange}
            >
              <MenuItem value={"father"}>Father</MenuItem>
              <MenuItem value={"mother"}>Mother</MenuItem>
              <MenuItem value={"brother"}>Brother</MenuItem>
              <MenuItem value={"sister"}>Sister</MenuItem>
              <MenuItem value={"spouse"}>Spouse</MenuItem>
              <MenuItem value={"friend"}>Friend</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <Typography variant="body2" gutterBottom>
            Price range
          </Typography>
        </FormControl>
      </Box>

      <div>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <p>$0</p>
              <Slider aria-label="Volume" value={value} onChange={onChange} />
              <p>$1000</p>
            </Stack>
          </FormControl>
        </Box>
      </div>

      <div>
        <Box
          component="form"
          sx={{ minWidth: 200 }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Enter Additional Information
            </InputLabel>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
            ></TextField>
          </FormControl>
        </Box>
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <Typography variant="body2" gutterBottom>
            Any other information
          </Typography>
        </FormControl>
      </Box>

      <div>
        <Box sx={{ minWidth: 200, borderRadius: 20 }}>
          <FormControl fullWidth>
            <Button variant="contained">Confirm</Button>
          </FormControl>
        </Box>
      </div>

      <BottomNavbar />
    </Box>
  );
=======
const HomePage = ({value, onChange}) => {


    return (
    <div >
        <Container maxWidth='sm'>

            <Box sx={{ minWidth: 200}}>
                <FormControl fullWidth>
                    <Typography variant="h4" gutterBottom>
                        GiftGuru
                    </Typography>
                </FormControl>

                <FormControl fullWidth>
                    <DropzoneAreaExample></DropzoneAreaExample>
                </FormControl>

                <FormControl fullWidth>
                    <Typography variant="body2" gutterBottom>
                        Recipient gender
                    </Typography>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select gender</InputLabel>
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
  

                <FormControl fullWidth>
                    <Typography variant="body2" gutterBottom>
                        Recipient age range
                    </Typography>
                </FormControl>
    
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select age range</InputLabel>
                        <TextField id="outlined-basic" label="" variant="outlined"></TextField>
                </FormControl>
     
                <FormControl fullWidth>
                    <Typography variant="body2" gutterBottom>
                        Relationship with recipient
                    </Typography>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select relationship</InputLabel>
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

                <FormControl fullWidth>
                    <Typography variant="body2" gutterBottom>
                        Price range
                    </Typography>
                </FormControl>

                    <Stack spacing={2} direction="row" sx={{ mb: 1}} alignItems="center">
                        <p>$0</p>
                        <Slider aria-label="Volume" value={value} onChange={onChange} valueLabelDisplay="on" min={0} max={1000} />
                        <p>$1000</p>
                    </Stack>


                <FormControl fullWidth>
                    <Typography variant="body2" gutterBottom>
                        Any other information
                    </Typography>
                </FormControl>

                <FormControl>
                    <InputLabel id="demo-simple-select-label">Enter Additional Information</InputLabel>
                    <TextField id="outlined-basic" label="" variant="outlined"></TextField>
                </FormControl>

                <FormControl>
                    <Button variant="contained">Confirm</Button>

                </FormControl>
            </Box>
        </Container>
    </div>
    );
>>>>>>> 34a9128181aca18822089703b14ae79299cfb548
};

export default HomePage;
