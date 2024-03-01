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
  Modal,
} from "@mui/material";
import jsonData from "../../../sample.json";
import DropzoneAreaExample from "../dropZone/dropZone";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "../../../utilities/firebaseUtils";
import { getDatabase, ref, set, onValue } from "firebase/database";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

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

  try {
    const res = await axios.post("https://www.giftguru.fun/gemini", inputData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const text = res.data.text;
    let tags = text
      .split("\n")
      .map((item) => `${genderValue} ${item.substring(item.indexOf(". ") + 2)}`)
      .join(", ");
    if (moreInfo) {
      tags += `, ${moreInfo}`;
    }
    console.log(tags);
    return tags;
  } catch (err) {
    console.error(err);
  }
};

const getRecommendationRequests = async (tags, minPrice, maxPrice) => {
  // try {
  //   const res = await axios.post("https://www.giftguru.fun/recommendation", {
  //     tags,
  //     minPrice,
  //     maxPrice,
  //   });
  //   return res.data.result;
  // } catch (err) {
  //   console.error(err);
  // }
  return jsonData.result;
};

const HomePage = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useAuthState();

  const [recipients, setRecipients] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [isAddingNewPerson, setIsAddingNewPerson] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState("nobody");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "add-new") {
      setIsAddingNewPerson(true);
      setSelectedRecipient("nobody");
    } else {
      setNewPerson(value);
      setIsAddingNewPerson(false);
      setSelectedRecipient(value || "nobody");
    }
  };

  const [images, setImages] = React.useState([]);
  const handleImagesChange = (newFiles) => {
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const [sliderValue, setSliderValue] = React.useState([10, 150]);
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGeneratePlan = async () => {
    if (images.length === 0 || genderValue === "") {
      setIsModalOpen(true);
      return;
    }
    setLoading(true);
    const tags = await getGeminiRequests(
      images,
      sliderValue,
      ageValue,
      relationshipValue,
      genderValue,
      moreInfo
    );
    const recommendations = await getRecommendationRequests(
      tags,
      sliderValue[0],
      sliderValue[1]
    );

    setLoading(false);
    navigate("/recommendations", {
      state: {
        recommendation: recommendations,
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const Loader = () => {
    const [isTop, setIsTop] = useState(true);
    useEffect(() => {
      const interval = setInterval(() => {
        setIsTop((prevIsTop) => !prevIsTop);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={overlayStyle}>
        <div style={loaderStyle}>
          {isTop ? (
            <HourglassTopIcon className="rotate-icon" fontSize="large" />
          ) : (
            <HourglassBottomIcon className="rotate-icon" fontSize="large" />
          )}
        </div>
      </div>
    );
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const loaderStyle = {
    textAlign: "center",
    backgroundColor: "#FFF",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
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
      <div className="container">
        <Header />
        <Container maxWidth="sm" sx={{ marginTop: "55px" }}>
          <Box sx={{ minWidth: 200 }}>
            {/* <FormControl fullWidth>
              <Typography variant="body2" gutterBottom sx={{ margin: "0" }}>
                Image Inputs <span style={{ color: "red" }}>*</span>
              </Typography>
            </FormControl> */}

            <FormControl fullWidth sx={{ my: 2 }}>
              <DropzoneAreaExample
                handleImagesChange={handleImagesChange}
              ></DropzoneAreaExample>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Detail Information
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1, textAlign: "center" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ textAlign: "center" }}
              ></InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                label="Enter Detail Information"
                multiline
                minRows={1}
                maxRows={5}
                variant="outlined"
                value={moreInfo}
                onChange={(event) => setMoreInfo(event.target.value)}
                placeholder="Enter Detail Information"
                sx={{
                  width: "100%",
                  margin: "0 auto",
                }}
              />
            </FormControl>

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
                Recipient Gender <span style={{ color: "red" }}>*</span>
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
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
                Recipient age Range
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
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
                Relationship with Recipient
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
                Price Range <span style={{ color: "red" }}>*</span>
              </Typography>
            </FormControl>

            <Stack
              spacing={2}
              direction="row"
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
            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ color: "red" }}
                >
                  Warning
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {genderValue !== ""
                    ? `Please upload at least one image to get recommendations.`
                    : `Please pick a gender first.`}
                </Typography>
              </Box>
            </Modal>
            {loading && <Loader sx={{ mb: 2 }} />}
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default HomePage;
