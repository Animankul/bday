import { useEffect, useState } from "react";
import "./App.css";

// ---- LEVEL QUESTIONS ----
const LEVELS = [
  {
    title: "🩺 Level 1: Doctor Basics",
    questions: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        answer: "Mitochondria",
      },
      {
        question: "BMS full form?",
        options: [
          "Bachelor of Management Studies",
          "Basic Medical Science",
          "Biological Medical Studies",
          "Banking & Management Service",
        ],
        answer: "Basic Medical Science",
      },
    ],
  },
  {
    title: "😂 Level 2: Bollywood & Comedy",
    questions: [
      {
        question: "In Hera Pheri, what was Baburao’s favorite dialogue?",
        options: [
          "Ye Babu Rao ka style hai! 😎",
          "Zindagi mein tension lene ka nahi… sirf dene ka! 🤣",
          "Utha le re deva!",
          "Aisa kaam mat karna jo Babu Rao ke list mein ho 📝",
        ],
        answer: "Ye Babu Rao ka style hai! 😎",
      },
      {
        question: "In TMKOC, what is Pinku’s parents' occupation?",
        options: ["Teacher", "Businessman", "Secret Agent 🕵️", "Doctor"],
        answer: "Secret Agent 🕵️",
      },
    ],
  },
  {
    title: "🤝 Level 3: About Us",
    questions: [
      {
        question: "Since which class are we friends?",
        options: ["5th", "2nd", "10th", "12th"],
        answer: "2nd",
      },
      {
        question: "Rikshwa Kaka name?",
        options: ["Ramesh", "Hemant", "Suresh", "Ganesh"],
        answer: "Hemant",
      },
    ],
  },
  {
    title: "🚲 Level 4: More Personal",
    questions: [
      { question: "My cycle colour?", options: ["Red", "Blue", "Black", "Yellow"], answer: "Red" },
      { question: "My 10th percentage?", options: ["80", "74", "65", "90"], answer: "74" },
    ],
  },
];

// 📸 Auto photo list
const totalImages = 10;
const photos = Array.from({ length: totalImages }, (_, i) => `/photos/${i + 1}.jpg`);

// Rotating names for final screen
const names = ["Ashu", "Ashwin", "Anshil", "Ansh", "Doctor Saab 😂"];

function App() {
  const [screen, setScreen] = useState("start"); // start | quiz | transition | story | slideshow
  const [level, setLevel] = useState(0);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("");
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [currentName, setCurrentName] = useState(0);
  const [bgm, setBgm] = useState(null);

  // Play background music during quiz
  useEffect(() => {
    if (screen === "quiz") {
      const audio = new Audio("/bgm.mp3");
      audio.loop = true;
      audio.play();
      setBgm(audio);
    } else {
      if (bgm) {
        bgm.pause();
        setBgm(null);
      }
    }
  }, [screen]);

  // Story music effect
  useEffect(() => {
    if (screen === "story") {
      const storySong = new Audio("/dosti.mp3");
      storySong.loop = true;
      storySong.play();
      setBgm(storySong);
    } else {
      if (bgm) {
        bgm.pause();
        setBgm(null);
      }
    }
  }, [screen]);

  // Handle next question
  const handleNext = () => {
    if (selected === LEVELS[level].questions[step].answer) {
      setScore(score + 1);
      setWrong(false);
      setSelected("");
      if (step + 1 < LEVELS[level].questions.length) {
        setStep(step + 1);
      } else {
        if (level + 1 < LEVELS.length) {
          setScreen("transition");
        } else {
          setScreen("story");
        }
      }
    } else {
      setWrong(true);
    }
  };

  // Slideshow effect
  useEffect(() => {
    let interval;
    if (screen === "slideshow") {
      interval = setInterval(() => {
        setCurrentPhoto((prev) => (prev + 1) % photos.length);
      }, 4000); // slower
      const bdaySong = new Audio("/rashke.mp3");
      bdaySong.loop = true;
      bdaySong.play();
      setBgm(bdaySong);
    }
    return () => clearInterval(interval);
  }, [screen]);

  // Rotating names
  useEffect(() => {
    let interval;
    if (screen === "slideshow") {
      interval = setInterval(() => {
        setCurrentName((prev) => (prev + 1) % names.length);
      }, 3000); // slower
    }
    return () => clearInterval(interval);
  }, [screen]);

  // Confetti
  const triggerConfetti = () => {
    let pieces = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setConfetti(pieces);
  };

  return (
    <div className="App">
      {/* ---- Opening Screen ---- */}
      {screen === "start" && (
        <div className="start-screen">
          <h1><b>Hi Ashu, my Jigri Dost ❤️</b></h1>
          <p><b>Let’s play one crazy birthday quiz 🎉</b></p>
          <img src="/ashu.png" alt="Ashu" />
          <button onClick={() => setScreen("quiz")}>Start 🚀</button>
        </div>
      )}

      {/* ---- Quiz Screen ---- */}
      {screen === "quiz" && (
        <div className="quiz">
          <h2>{LEVELS[level].title}</h2>
          <h3><b>{LEVELS[level].questions[step].question}</b></h3>
          <div className="options">
            {LEVELS[level].questions[step].options.map((opt, i) => (
              <button
                key={i}
                className={`option 
                  ${selected === opt ? "selected" : ""} 
                  ${wrong && selected === opt ? "wrong" : ""}`}
                onClick={() => setSelected(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button className="next" onClick={handleNext} disabled={!selected}>
            {level === LEVELS.length - 1 && step === LEVELS[level].questions.length - 1
              ? "Finish 🎉"
              : wrong
              ? "Try Again 🔄"
              : "Next ➡️"}
          </button>
          <div className="score">Score: {score}</div>
        </div>
      )}

      {/* ---- Transition Screen ---- */}
      {screen === "transition" && (
        <div className="transition">
          <h1>🔥 Level {level + 1} Complete!</h1>
          <p><b>Get ready for the next madness 🤯</b></p>
          <button
            onClick={() => {
              setLevel(level + 1);
              setStep(0);
              setScreen("quiz");
            }}
          >
            Continue ➡️
          </button>
        </div>
      )}

      {/* ---- Story Screen ---- */}
     {/* ---- Story Screen ---- */}
{screen === "story" && (
  <div className="story">
    <h2 className="story-title">📖 Our Story</h2>
    <div className="story-lines">
      <p className="line">We first met in <b>2nd Std</b> as bench partners.</p>
      <p className="line">Honestly, I didn’t like you 😂 because I wanted to sit with a girl...</p>
      <p className="line">...and <b>YOU</b> came instead.</p>
      <p className="line">Later, you started hating me too 😅</p>
      <p className="line">But slowly, we became inseparable friends ❤️</p>
      <p className="line">Now it’s been <b>15 years</b> of crazy friendship 🙌</p>
      <p className="line">From fights ➡️ to jokes ➡️ to memories... the best journey ever 💙</p>
    </div>
    <button
      className="bday-btn"
      onClick={() => {
        setScreen("slideshow");
        triggerConfetti();
      }}
    >
      🎂 Happy Birthday 🎂
    </button>
  </div>
)}


      {/* ---- Slideshow Screen ---- */}
      {screen === "slideshow" && (
        <div className="slideshow">
          <h1 className="birthday-text">🎉 Happy Birthday {names[currentName]} 🎉</h1>
          <img
            src={photos[currentPhoto]}
            alt="memories"
            className="slideshow-photo"
          />
          {/* Confetti */}
          {confetti.map((c) => (
            <div
              key={c.id}
              style={{
                position: "fixed",
                top: "-10px",
                left: `${c.left}%`,
                width: "12px",
                height: "12px",
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: "50%",
                animation: `fall 3s linear ${c.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Confetti animation */}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
