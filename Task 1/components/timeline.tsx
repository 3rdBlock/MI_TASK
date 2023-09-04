"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TimelineControls from "./timecontrols";
import Track from "./track";
import TimeIndicators from "./timeindicators";

const Timeline: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  const mainClip = {
    start: 3, // 3:00
    duration: 4, // 4 hours duration
    title: "Main Clip",
  };

  const distinctClips = [
    { start: 1, duration: 2, title: "Clip 1" },
    { start: 6, duration: 1, title: "Clip 2" },
    { start: 9, duration: 3, title: "Clip 3" },
    { start: 15, duration: 2, title: "Clip 4" },
    { start: 20, duration: 1, title: "Clip 5" },
  ];

  // Shuffle and distribute clips among tracks.
  const tracks = [[], [], []];
  distinctClips
    .sort(() => Math.random() - 0.5)
    .forEach((clip, index) => {
      tracks[index % 3].push(clip);
    });
  tracks[Math.floor(Math.random() * 3)].push(mainClip);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const containerWidth = 2400 * zoom;
  const dragConstraints = {
    left: -(containerWidth - window.innerWidth),
    right: 0,
  };

  return (
    <div className="relative ">
      <TimelineControls
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
      <div className="border-t-2 border-b-2 mt-4 overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          style={{ width: `${containerWidth}px` }}
          className="cursor-pointer relative"
        >
          {tracks.map((trackClips, trackIdx) => (
            <Track key={trackIdx} clips={trackClips} zoom={zoom} />
          ))}
          <TimeIndicators zoom={zoom} />
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;
