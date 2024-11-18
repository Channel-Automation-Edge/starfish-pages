"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "./ui/particles";
 
export function HeroParticle() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#ffffff");
  }, [theme]);

  return (
    <div className="relative flex h-[750px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-transparent md:shadow-xl">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
