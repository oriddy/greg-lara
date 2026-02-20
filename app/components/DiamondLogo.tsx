"use client";
import { motion } from "framer-motion";

export default function DiamondLogo({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="90"
      height="110"
      viewBox="0 0 90 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer diamond border */}
      <motion.path
        d="M45 4 L86 35 L45 106 L4 35 Z"
        stroke="#4dc8e8"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeInOut" }}
      />
      {/* Inner top triangle accent */}
      <motion.path
        d="M45 4 L86 35 L4 35 Z"
        stroke="#4dc8e8"
        strokeWidth="1.5"
        fill="rgba(77,200,232,0.06)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.8 }}
      />
      {/* Inner G-like mark */}
      <motion.path
        d="M33 42 L45 28 L57 42 L45 70 Z"
        stroke="#4dc8e8"
        strokeWidth="1.5"
        fill="rgba(77,200,232,0.12)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: delay + 1 }}
      />
      {/* Center dot glow */}
      <motion.circle
        cx="45"
        cy="49"
        r="3"
        fill="#4dc8e8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.6], scale: 1 }}
        transition={{ duration: 1, delay: delay + 1.2 }}
      />
      {/* Glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
}
