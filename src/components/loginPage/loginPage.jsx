import { useRef, useState } from "react";
import { Model } from "./giftBox";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./loginPage.less";

const LoginPage = () => {
  const loginRef = useRef(null);
  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="splash">
        <div className="one"></div>
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
            shadows
            camera={{ fov: 75, position: [-10, 4, 20] }}
          >
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.3}
              penumbra={1}
              castShadow
            />
            <Model position={[0, 0, 0]} />
            <Environment preset="apartment" />
          </Canvas>
        </div>
      </div>
      <div className="login" ref={loginRef}></div>
    </>
  );
};

export default LoginPage;
