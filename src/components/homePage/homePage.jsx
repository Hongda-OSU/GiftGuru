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
  Hidden,
} from "@mui/material";

import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import MyUploader from "../dropZone/uploader";

const HomePage = ({ value, onChange }) => {
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
            <FormControl fullWidth sx={{height: 120, paddingBottom: 1, overflow: 'hidden'}}>
              <MyUploader className="dropzone"></MyUploader>
            </FormControl>

            <FormControl fullWidth sx={{}}>
              <Typography variant="body2" gutterBottom>
                OPTIONAL INPUTS
                <br></br>
                <hr></hr>
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
              <InputLabel id="demo-simple-select-label">
                Select age range
              </InputLabel>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
              ></TextField>
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
                value={value}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
              />
              <p>$1000</p>
            </Stack>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Any other information
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{paddingBottom: 2}}>
              <InputLabel id="demo-simple-select-label">
                Enter Additional Information
              </InputLabel>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
              ></TextField>
            </FormControl>

            <FormControl fullWidth>
              <Button variant="contained">Confirm</Button>
            </FormControl>
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default HomePage;
