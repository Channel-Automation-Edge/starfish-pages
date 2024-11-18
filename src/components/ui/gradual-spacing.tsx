"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  highlightText?: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export default function GradualSpacing({
  text,
  highlightText = "",
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  return (
    <div className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => {
  const startIndex = text.indexOf(highlightText);
  const endIndex = startIndex + highlightText.length;
  const isHighlighted = i >= startIndex && i < endIndex;
          return (
            <motion.h1
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={framerProps}
              transition={{ duration, delay: i * delayMultiple }}
              className={cn(
                "drop-shadow-sm",
                className,
                isHighlighted && "text-accent" // Apply accent color
              )}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.h1>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
