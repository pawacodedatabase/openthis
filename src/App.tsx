import React, { useRef, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "animate.css";
import Love from "./components/love.js";

import Valentine from "./components/home";
import song from "./assets/John-Legend-–-All-Of-Me.mp3";

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Try autoplay when the app loads
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // start softly
      audioRef.current.play().catch(() => {
        // will play on first click if blocked
      });
    }
  }, []);

  return (
    <Router>
      {/* Global background music */}
      <audio ref={audioRef} src={song} loop />

      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Valentine />} />
          <Route path="/love" element={<Love />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
