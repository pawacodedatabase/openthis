import { useEffect, useState } from "react";
import memoriesVideo from "../assets/vid.mp4"; // your video
import bg from "../assets/bg.jpg"; // soft pastel/bokeh background

export default function Love() {
  const [showWords, setShowWords] = useState(false);
  const [review, setReview] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Animate words
  useEffect(() => {
    const timer = setTimeout(() => setShowWords(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sweetWords = [
    "You make my heart skip a beat",
    "Every memory with you is magical",
    "I love you more every day",
    "Forever and always, my love",
  ];

  const handleSend = async () => {
    if (!review) return;
    setSending(true);

    const botToken = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
    const chatId = "6837437455";
    const message = encodeURIComponent(`💌 Valentine Review:\n${review}`);

    try {
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`
      );
      setSent(true);
      setReview("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white opacity-50 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Glassmorphic video card */}
      <div className="relative w-11/12 md:w-2/3 lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/20 backdrop-blur-xl">
        <video
          src={memoriesVideo}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />

        {/* Overlay sweet words */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 pointer-events-none px-4 text-center">
          {showWords &&
            sweetWords.map((word, idx) => (
              <p
                key={idx}
                className="text-white text-3xl md:text-4xl font-[Playfair_Display] drop-shadow-lg animate__animated animate__fadeInUp"
                style={{
                  animationDelay: `${idx * 2}s`,
                  textShadow:
                    "0 0 8px #ff9ac1, 0 0 16px #ff9ac1, 0 0 24px #ff9ac1",
                }}
              >
                {word}
              </p>
            ))}
        </div>
      </div>

      {/* Input field at bottom */}
      <div className="absolute bottom-10 w-full flex flex-col items-center gap-3 px-4 md:px-0">
        {!sent ? (
          <>
            <input
              type="text"
              placeholder="Write me a sweet note..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full md:w-1/2 p-4 rounded-3xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 text-center shadow-lg font-[Dancing_Script] placeholder-pink-300"
            />
            <button
              onClick={handleSend}
              disabled={sending}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold hover:scale-105 transition shadow-lg"
            >
              {sending ? "Sending..." : "Send ❤️"}
            </button>
          </>
        ) : (
          <p className="text-white text-lg font-medium animate__animated animate__fadeIn">
            Your love note has been sent! 😘
          </p>
        )}
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-30px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.5; }
          }
          .animate-float {
            animation-name: float;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
