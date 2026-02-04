import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import image from "../assets/val.png";
import bg from "../assets/bg.jpg";
import song from "../assets/John-Legend-–-All-Of-Me.mp3";

export default function Valentine() {
  const [yes, setYes] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  // Autoplay the song muted on page load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Unmute on first interaction
  const handleUnmute = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.4;
    }
  };

  // Handle YES click
  const handleYesClick = () => {
    handleUnmute();
    setYes(true);

    // Start countdown after YES click
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/love"); // route to Love.tsx
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Confetti */}
      {yes && <Confetti />}

      {/* Background Music */}
      <audio ref={audioRef} src={song} autoPlay loop muted />

      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl text-center max-w-sm z-10">
        <img src={image} alt="Love" className="rounded-2xl mb-4" />

        {!yes ? (
          <>
            {/* Sweet intro */}
            <div className="space-y-4 animate__animated animate__fadeInUp">
              <p
                className="text-sm font-medium text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] animate__animated animate__fadeIn"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                From the moment you came into my life, everything became
                softer, warmer… and brighter.
              </p>

              <h1
                className="text-3xl font-bold text-pink-600"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                Bukola Adaratan
              </h1>

              <h2
                className="text-xl text-gray-800 font-[Playfair_Display]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Will you be my Valentine
                <span className="inline-block ml-2 text-pink-500">
                  <i className="ri-heart-fill"></i>
                </span>
              </h2>
            </div>

            {/* Buttons */}
            <div className="flex gap-6 justify-center mt-6">
              {/* YES Button */}
              <button
                onClick={handleYesClick}
                className="
                  px-8 py-3
                  rounded-full
                  bg-gradient-to-r from-pink-500 to-rose-500
                  text-white text-lg font-semibold
                  shadow-lg shadow-pink-300/50
                  flex items-center gap-2
                  transition-all duration-300
                  hover:scale-110 hover:shadow-xl
                  active:scale-95
                "
              >
                <i className="ri-heart-2-fill text-xl"></i>
                Yes, my love
              </button>

              {/* NO Button */}
              <button
                onClick={() => {
                  handleUnmute();
                  setShowPopup(true);
                }}
                className="
                  px-8 py-3
                  rounded-full
                  bg-white
                  text-gray-500 text-lg font-medium
                  border border-gray-300
                  shadow-md
                  flex items-center gap-2
                  transition-all duration-300
                  hover:scale-105 hover:text-gray-600
                  active:scale-95
                "
              >
                <i className="ri-close-circle-line text-xl"></i>
                No
              </button>
            </div>
          </>
        ) : (
          <div className="animate__animated animate__fadeIn">
            <h1 className="text-3xl font-bold text-pink-600">Yaaay!!! 🎉💘</h1>
            <p className="mt-3 text-lg">
              Best decision ever 😘 I love you ❤️
            </p>
          </div>
        )}
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <h1 className="text-6xl font-bold text-white animate__animated animate__bounce">
            {countdown}
          </h1>
        </div>
      )}

      {/* Funny NO Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-2xl text-center shadow-xl animate__animated animate__zoomIn">
            <h2 className="text-xl font-bold text-pink-600">😌 Nope!</h2>
            <p className="mt-2">LETITO IYA, You can’t say NO to love 💕</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-full"
            >
              Okay 😘
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
