import { useRef, useState, Suspense } from "react";
import Gift from "./gift";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraShake } from "@react-three/drei";
import "./loginPage.less";

const LoginPage = () => {
  const loginRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="splash">
        <div className="one">
          <div></div>
        </div>
        <div className="two">
          <h2 className="title">
            <span>
              GIFT&nbsp;&nbsp;&nbsp;
              <br />
              &nbsp;&nbsp;&nbsp;GURU
            </span>
          </h2>
        </div>
        <div className="three">
          <Canvas
            className="canvas"
            onClick={scrollToLogin}
            dpr={[1, 2]}
            camera={{ fov: 75, position: [-10, 4, 20] }}
          >
            <Suspense fallback={null}>
              <ambientLight />
              <Gift
                position={[0, 0, 0]}
                isHovered={isHovered}
                onHover={setIsHovered}
              />
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
              {!isHovered && (
                <CameraShake
                  maxPitch={0.05}
                  maxRoll={0.05}
                  maxYaw={0.03}
                  pitchFrequency={0.8}
                  rollFrequency={0.8}
                  yawFrequency={0.8}
                />
              )}
            </Suspense>
          </Canvas>
          <div className="click-me" style={{ opacity: isHovered ? 1 : 0 }}>
            <span>CLICK</span>
            <span>&nbsp;&nbsp;ME!</span>
          </div>
        </div>
      </div>
      <div className="login" ref={loginRef}></div>
    </>
  );
};

export default LoginPage;
