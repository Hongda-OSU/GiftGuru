import { useRef, useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Gift from "./gift";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraShake } from "@react-three/drei";
import {
  signInWithGoogle,
  signInWithEmailPassword,
  useAuthState,
  uploadImage,
  signUpWithEmailPassword,
  useDbAdd,
} from "../../../utilities/firebaseUtils";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "./loginPage.less";

const LoginPage = () => {
  const maleAvatarUrl =
    "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgcurly-hair-man.png";
  const femaleAvatarUrl =
    "https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imglong-hair-woman.png";

  const loginRef = useRef(null);
  const splashRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSpalsh = () => {
    splashRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(maleAvatarUrl);
  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpGender, setSignUpGender] = useState("Male");

  const handleGenderChange = (event) => {
    setSignUpGender(event.target.value);
    event.target.value === "Male"
      ? setAvatarUrl(maleAvatarUrl)
      : setAvatarUrl(femaleAvatarUrl);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const [user] = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector(".bg");
      const bg2 = document.querySelector(".bg-2");
      if (bg) {
        const scrollY = window.scrollY;
        const parallaxShift = scrollY * 0.3;
        bg.style.transform = `translateY(-${parallaxShift}px)`;
      }
      if (bg2) {
        const scrollY = window.scrollY;
        const parallaxShift = scrollY * 0.3;
        bg2.style.transform = `translateY(-${parallaxShift}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const onGoSignUpClick = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  const onBackLoginClick = () => {
    setIsSignUp(false);
    setIsLogin(true);
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleAvatarUpload = async (event) => {
    const image = event.target.files[0];
    try {
      const url = await uploadImage(image);
      setUserAvatarUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const [addData, result] = useDbAdd("/users/");

  const onSignUpButtonClicked = async () => {
    if (!signUpPhoneNumber || !signUpPassword || !signUpEmail) {
      alert("missing info for signup");
      return;
    }
    if (signUpPassword.length < 6) {
      alert("Password need contain 6 characters");
      return;
    }
    try {
      const userCredential = await signUpWithEmailPassword(
        signUpEmail,
        signUpPassword
      );

      const userData = {
        SignUpEmail: signUpEmail,
        Gender: signUpGender,
        SignUpPhoneNumber: signUpPhoneNumber,
        ProfileImage: userAvatarUrl || avatarUrl,
        SignUpPassword: signUpPassword,
      };
      console.log(userCredential.uid);
      addData(userCredential.uid, userData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div ref={splashRef} className="splash">
        <div className="one">
          <div></div>
        </div>
        <div className="two">
          <motion.h2
            className="splash-title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span>
              GIFT&nbsp;&nbsp;&nbsp;
              <br />
              &nbsp;&nbsp;&nbsp;GURU
            </span>
          </motion.h2>
        </div>
        <div className="three">
          <Canvas
            className="canvas"
            onClick={scrollToLogin}
            dpr={[1, 2]}
            camera={{ fov: 75, position: [-10, 8, 15] }}
          >
            <Suspense fallback={null}>
              <ambientLight />
              <Gift
                position={[0, 5, 0]}
                isHovered={isHovered}
                onHover={setIsHovered}
              />
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
              {!isHovered && (
                <CameraShake
                  maxPitch={0.15}
                  maxRoll={0.1}
                  maxYaw={0.1}
                  pitchFrequency={0.8}
                  rollFrequency={0.8}
                  yawFrequency={0.8}
                />
              )}
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="temp"></div>
      <div className="login" ref={loginRef}>
        <img
          className={`bg ${isLogin ? "bg-appear" : "bg-disappear"}`}
          src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgDRIP_20.png"
        />
        <img
          className={`bg bg-2 ${isSignUp ? "bg-appear" : "bg-disappear"}`}
          src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgPoly%20characters%2017.png"
        />
        {isLogin && (
          <motion.div
            className="glass-login"
            initial={{ y: 700, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 75 }}
          >
            <div className="title">
              <img
                className="icon"
                src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgAvatar-UI-Unicorn-V2.svg"
              />
              <span>GiftGuru:</span>
            </div>
            <div className="slogan">
              <span>
                AI-Powered Gifting Made Personal
                <span className="wave">&nbsp;💖</span>
              </span>
            </div>
            <div className="login-container">
              <div className="email-container">
                <FormControl className="email-form">
                  <OutlinedInput
                    className="email-input"
                    type={"text"}
                    value={email}
                    placeholder={"Email or phone number"}
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <AccountCircleIcon
                            sx={{ color: "rgba(36,133,255, 0.7)" }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="password-container">
                <FormControl className="password-form">
                  <OutlinedInput
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder={"Enter Password"}
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff
                              sx={{ color: "rgba(211,47,47, 0.7)" }}
                            />
                          ) : (
                            <Visibility
                              sx={{ color: "rgba(36,133,255, 0.7)" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="other-container">
              <FormControlLabel
                control={<Switch defaultChecked className="switch" />}
                label="Remember me"
              />
            </div>
            <div className="login-button-container">
              <Button
                variant="contained"
                className="login-button"
                onClick={() => signInWithEmailPassword(email, password)}
                sx={{ width: "300px" }}
              >
                Login
              </Button>
            </div>
            <div className="bottom-line-container">
              <span className="bottom-line" />
              <span className="continue">Or continue with</span>
              <span className="bottom-line" />
            </div>
            <div className="google-signin-container">
              <Button
                variant="contained"
                className="google-sign-in-button"
                onClick={signInWithGoogle}
              >
                <img src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgGoogle.svg" />
              </Button>
            </div>
            <div className="sign-up-container">
              <span>Dont have an account?&nbsp;</span>
              <span className="sign-up" onClick={onGoSignUpClick}>
                Sign up now
              </span>
            </div>
            <div className="arrow-container" onClick={() => scrollToSpalsh()}>
              <div className="scroll-arrow"></div>
              <div className="scroll-arrow"></div>
              <div className="scroll-arrow"></div>
            </div>
          </motion.div>
        )}
        {isSignUp && (
          <motion.div
            className="glass-signup"
            initial={{ y: 700, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 75 }}
          >
            <div className="title">
              <img
                className="icon"
                src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgAvatar-UI-Unicorn-V2.svg"
              />
              <span>Create an Account</span>
            </div>
            <div className="slogan-2-container">
              <span className="slogan-2">
                -- Join GiftGuru: Start Gifting Smarter
                <span className="wave">&nbsp;🎁</span>
              </span>
            </div>
            <div className="profile-image-container">
              <input
                type="file"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
                ref={hiddenFileInput}
              />
              {userAvatarUrl && (
                <img
                  src={userAvatarUrl}
                  className="user-profile-image"
                  onClick={handleClick}
                />
              )}
              {!userAvatarUrl && (
                <img
                  src={avatarUrl}
                  className="profile-image"
                  onClick={handleClick}
                />
              )}
            </div>
            <div className="signup-container">
              <div className="signup-email-container">
                <FormControl className="signup-email-form">
                  <TextField
                    className="signup-email-input"
                    type="text"
                    value={signUpEmail}
                    label="Enter your email"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <AccountCircleIcon
                              sx={{ color: "rgba(36,133,255, 0.7)" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="signup-phone-container">
                <FormControl className="signup-phone-form">
                  <TextField
                    className="signup-phone-input"
                    type="text"
                    value={signUpPhoneNumber}
                    label="Enter your phone number"
                    onChange={(e) => setSignUpPhoneNumber(e.target.value)}
                    variant="outlined"
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <PhoneAndroidIcon
                              sx={{ color: "rgba(36,133,255, 0.7)" }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="signup-password-container">
                <FormControl className="signup-password-form">
                  <TextField
                    className="signup-password-input"
                    type={showPassword ? "text" : "password"}
                    value={signUpPassword}
                    label="Enter your password"
                    variant="outlined"
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff
                                sx={{ color: "rgba(211,47,47, 0.7)" }}
                              />
                            ) : (
                              <Visibility
                                sx={{ color: "rgba(36,133,255, 0.7)" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="signup-gender-container">
              <FormControl component="fieldset" className="gender">
                <RadioGroup
                  row
                  aria-label="gender"
                  value={signUpGender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="signup-button-container">
              <Button
                variant="contained"
                className="signup-button"
                sx={{ width: "300px" }}
                onClick={onSignUpButtonClicked}
              >
                Sign Up
              </Button>
            </div>
            <div className="back-login-container">
              <span>Already have an account?&nbsp;</span>
              <span className="back-login" onClick={onBackLoginClick}>
                Login
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
