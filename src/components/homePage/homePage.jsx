import React from "react";
import "./homePage.css";
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
  Container,
  Divider,
} from "@mui/material";

import DropzoneAreaExample from "../dropZone/dropZone";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import { useState } from "react";


const HomePage = ({ value, onChange }) => {

  const [sliderValue, setSliderValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {

    setSliderValue(newValue);
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: "100%",
        paddingBottom: "60px",
      }}
    >
      <Header />
      <div>
        <Container
          maxWidth="sm"
          style={{ marginTop: "70px", marginBottom: "70px" }}
        >
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <DropzoneAreaExample></DropzoneAreaExample>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                OPTIONAL INPUTS
              </Typography>
            </FormControl>

            <Divider sx={{ my: 1 }} />

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Recipient gender
              </Typography>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select gender
              </InputLabel>
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

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Recipient age range
              </Typography>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="age-range-select-label">
                Select age range
              </InputLabel>
              <Select
                labelId="age-range-select-label"
                id="age-range-select"
                value={value} // Ensure this is managed in state to reflect the current selection
                label="Age Range"
                onChange={onChange}
              >
                <MenuItem value={"under 18"}>Under 18</MenuItem>
                <MenuItem value={"18-24"}>18~24</MenuItem>
                <MenuItem value={"25-30"}>25~30</MenuItem>
                <MenuItem value={"31-40"}>31~40</MenuItem>
                <MenuItem value={"41-50"}>41~50</MenuItem>
                <MenuItem value={"51-60"}>51~60</MenuItem>
                <MenuItem value={">60"}>Over 60</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Relationship with recipient
              </Typography>
            </FormControl>

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

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Price range
              </Typography>
            </FormControl>

            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <p>$0</p>
              <Slider
                aria-label="Volume"
                value={sliderValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  "& .MuiSlider-thumb": {
                    color: "#007580",
                  },
                  "& .MuiSlider-track": {
                    color: "#007580",
                  },
                  "& .MuiSlider-rail": {
                    color: "#007580",
                  },
                }}
              />
              <p>$1000</p>
            </Stack>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Any other information
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ textAlign: "center", mb: 2 }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ textAlign: "center" }}
              ></InputLabel>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="Enter Additional Information"
                sx={{
                  height: "50px",
                  width: "100%",
                  margin: "0 auto",
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: 50,
                  width: "100%",
                  background: "linear-gradient(45deg, #00b859, #007580)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    filter: "brightness(1.1)",
                  },
                }}
              >
                Get Recommendations
              </Button>
            </FormControl>
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default HomePage;
