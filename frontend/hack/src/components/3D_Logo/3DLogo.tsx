import * as React from "react";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
} from "react-particle-image";
import "./3DLogo.css";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "white",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 30,
  friction: () => 0.3,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 30);
};

export default function App() {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <div className="box">
    <ParticleImage
      src={"/football_img.png"}
      width={400}
      height={400}
      scale={0.8}
      entropy={40}
      maxParticles={8000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="transparent"
    />
    </div>
  );
}
