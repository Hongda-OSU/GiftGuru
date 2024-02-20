import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Typography,
  Container,
  Divider,
} from "@mui/material";

import DropzoneAreaExample from "../dropZone/dropZone";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "../../../utilities/firebaseUtils";
import { getDatabase, ref, set, onValue } from "firebase/database";

const getGeminiRequests = async (
  images,
  sliderValue,
  ageValue,
  relationshipValue,
  genderValue,
  moreInfo
) => {
  const inputData = new FormData();
  images.forEach((img) => {
    inputData.append("images", img);
  });
  inputData.append("sliderValue", sliderValue);
  inputData.append("ageValue", ageValue);
  inputData.append("relationshipValue", relationshipValue);
  inputData.append("genderValue", genderValue);
  inputData.append("moreInfo", moreInfo);
  // const res = await axios.post("http://localhost:3001/gemini", inputData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  const res = await axios.post("https://www.giftguru.fun/gemini", inputData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const text = res.data.text;
  return text.split(":");
};

const HomePage = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useAuthState();

  const [recipients, setRecipients] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [isAddingNewPerson, setIsAddingNewPerson] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const handleSelectChange = (event) => {
    if (event.target.value === "add-new") {
      setIsAddingNewPerson(true);
      setSelectedRecipient("");
    } else {
      setNewPerson(event.target.value);
      setIsAddingNewPerson(false);
      setSelectedRecipient(event.target.value);
    }
  };

  const [images, setImages] = React.useState([]);
  const handleImagesChange = (newFiles) => {
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const [sliderValue, setSliderValue] = React.useState([30, 100]);
  const handleSliderChange = (event, newValue) => {
    if (newValue[1] - newValue[0] >= 10) {
      setSliderValue(newValue);
    }
  };

  const [ageValue, setAgeValue] = React.useState("");
  const handleAgeChange = (event) => {
    setAgeValue(event.target.value);
  };

  const [relationshipValue, setRelationshipValue] = React.useState("");
  const handleRelationshipChange = (event) => {
    setRelationshipValue(event.target.value);
  };

  const [genderValue, setGenderValue] = useState("");
  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
  };

  const [moreInfo, setMoreInfo] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const handleGeneratePlan = async () => {
    setLoading(true);
    const response = await getGeminiRequests(
      images,
      sliderValue,
      ageValue,
      relationshipValue,
      genderValue,
      moreInfo
    );
    setLoading(false);
    navigate("/recommendations", {
      state: {
        recommendation: response,
        sliderValue,
        ageValue,
        relationshipValue,
        genderValue,
        moreInfo,
        images,
        apiKey,
        selectedRecipient,
      },
    });
  };

  const Loader = () => {
    const [text, setText] = useState("");
    useEffect(() => {
      const interval = setInterval(() => {
        setText((prevText) => {
          return prevText.length === 3 ? "" : prevText + ".";
        });
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return <h4>Recommendation is loading, please wait{text}</h4>;
  };

  const setAllStatesFromLocation = (state) => {
    setSliderValue(state.sliderValue);
    setAgeValue(state.ageValue);
    setRelationshipValue(state.relationshipValue);
    setGenderValue(state.genderValue);
    setMoreInfo(state.moreInfo);
    setImages(state.images);
    setApiKey(state.apiKey);
    setSelectedRecipient(state.selectedRecipient);
  };

  useEffect(() => {
    if (user) {
      const recipientsRef = ref(getDatabase(), `recipients/${user.uid}`);
      onValue(recipientsRef, (snapshot) => {
        const data = snapshot.val();
        setRecipients(data || []);
      });
    }
  }, [user]);

  const handleAddPerson = async () => {
    const recipientsRef = ref(getDatabase(), `recipients/${user.uid}`);
    if (!newPerson || recipients.includes(newPerson)) {
      console.error("Invalid person name or already exists");
      return;
    }
    try {
      setSelectedRecipient(newPerson);
      await set(recipientsRef, [...recipients, newPerson]);
      onValue(
        recipientsRef,
        (snapshot) => {
          const updatedRecipients = snapshot.val() || [];
          setRecipients(updatedRecipients);
        },
        {
          onlyOnce: true,
        }
      );
    } catch (error) {
      console.error("Firebase update failed: ", error);
    }
  };

  useEffect(() => {
    if (location.state) {
      setAllStatesFromLocation(location.state);
    }
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        width: "100%",
        paddingBottom: "60px",
      }}
    >
      <Header />
      <div>
        <Container maxWidth="sm" style={{ marginTop: "65px" }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <DropzoneAreaExample
                handleImagesChange={handleImagesChange}
              ></DropzoneAreaExample>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                OPTIONAL INPUTS
              </Typography>
            </FormControl>

            <Divider sx={{ my: 1 }} />

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Recipient Name
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel id="recipients-select-label">
                Recipient Name
              </InputLabel>
              <Select
                labelId="recipients-select-label"
                id="recipients-select"
                value={isAddingNewPerson ? "add-new" : selectedRecipient}
                label="Recipient Name"
                onChange={handleSelectChange}
              >
                {recipients.map((recipient, index) => (
                  <MenuItem key={index} value={recipient}>
                    {recipient}
                  </MenuItem>
                ))}
                <MenuItem value="add-new">Add New Recipient</MenuItem>
              </Select>
            </FormControl>

            {isAddingNewPerson && (
              <>
                <TextField
                  fullWidth
                  label="New Recipient's Name"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddPerson}
                  sx={{
                    mb: 2,
                    borderRadius: 50,
                    background: "linear-gradient(45deg, #00b859, #007580)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      filter: "brightness(1.1)",
                    },
                  }}
                >
                  Add New Recipient
                </Button>
              </>
            )}

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Recipient gender
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Select gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genderValue}
                label="Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Recipient age range
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="age-range-select-label">
                Select age range
              </InputLabel>
              <Select
                labelId="age-range-select-label"
                id="age-range-select"
                value={ageValue}
                label="Age Range"
                onChange={handleAgeChange}
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

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Relationship with recipient
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Select relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={relationshipValue}
                label="Relationship"
                onChange={handleRelationshipChange}
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
              sx={{ mb: 2 }}
              alignItems="center"
            >
              <p>$0</p>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={10}
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

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Any other information
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ textAlign: "center" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ textAlign: "center" }}
              ></InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                label="Enter Additional Information"
                multiline
                minRows={1}
                maxRows={5}
                variant="outlined"
                value={moreInfo}
                onChange={(event) => setMoreInfo(event.target.value)}
                placeholder="Enter Additional Information"
                sx={{
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
                mb: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={handleGeneratePlan}
                sx={{
                  borderRadius: 50,
                  width: "100%",
                  marginTop: "20px",
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

            {loading && <Loader sx={{ mb: 2 }} />}
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default HomePage;
