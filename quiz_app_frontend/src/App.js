 // PUBLIC_INTERFACE
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import staffanPhoto from "./assets/20250701_185306_Patty_and_Matt_WED.JPG";
import { QUIZ_QUESTIONS, getRandomMixedQuestions } from "./quizData";

// Color palette and constants (for easy reference/change)
const COLORS = {
  primary: "#1227ca",
  secondary: "#f9f7f1",
  accent: "#ffdd00",
  text: "#222",
  white: "#fff",
};
const FLAGS = [
  { src: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    alt: "U.S.A flag" },
  { src: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
    alt: "Swedish flag" },
];



// Welcome Screen with persistent leaderboard display
function WelcomeScreen({ onStart, userName, setUserName, leaderboardData }) {
  const [touched, setTouched] = useState(false);
  const isValid = userName.trim().length > 1;
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.score - a.score);

  return (
    <div className="screen welcome-screen" aria-labelledby="quizTitle">
      <FlagBanner position="top" />
      <h1 id="quizTitle" className="quiz-title">
        🎉 Staffan Johnsson's 80th Birthday Quiz! 🎉
      </h1>
      <div className="photo-container" aria-label="Photo of Staffan Johnsson celebrating with family" style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <img
          className="staffan-photo-img"
          src={staffanPhoto}
          alt="Staffan Johnsson celebrating his 80th birthday with Patty and Matt"
          style={{
            display: "block",
            width: "280px",
            height: "280px",
            margin: "0 auto",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "30% 40%",
            background: "#fff",
            boxShadow: "0 6px 40px #22338818"
          }}
          draggable={false}
        />
      </div>
      <form
        className="name-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) onStart();
        }}
        autoComplete="off"
      >
        <label htmlFor="username" className="input-label">
          Enter your first name:
        </label>
        <input
          id="username"
          type="text"
          value={userName}
          className="name-input"
          onChange={(e) => setUserName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Your first name"
          aria-required="true"
          aria-invalid={!isValid && touched}
        />
        <div
          className="input-error"
          aria-live="polite"
          style={{ visibility: !isValid && touched ? "visible" : "hidden" }}
        >
          Please enter your name (at least 2 letters).
        </div>
        <button
          className="btn start-btn"
          type="submit"
          disabled={!isValid}
          aria-disabled={!isValid}
        >
          Start Quiz
        </button>
      </form>
      
      {/* Persistent Leaderboard Display */}
      <div className="welcome-leaderboard">
        <h3 className="welcome-leaderboard-title">🏆 Leaderboard</h3>
        <div className="welcome-leaderboard-content">
          {sortedLeaderboard.length === 0 ? (
            <p className="empty-leaderboard">Be the first to play!</p>
          ) : (
            <table className="welcome-leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.slice(0, 5).map((row, idx) => (
                  <tr key={row.name + row.score + idx}>
                    <td>{idx + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {sortedLeaderboard.length > 5 && (
            <p className="leaderboard-more">
              ...and {sortedLeaderboard.length - 5} more players
            </p>
          )}
        </div>
      </div>
      
      <FlagBanner position="bottom" />
    </div>
  );
}

// Quiz Screen
function QuizScreen({
  questions,
  userName,
  current,
  total,
  onAnswer,
  selected,
  onNext,
  allowNext,
  showScore,
  score,
}) {
  const currQ = questions[current];
  return (
    <div className="screen quiz-screen">
      <FlagBanner position="top" />
      <div className="quiz-header">
        <h2>
          Good luck, {userName}! <span role="img" aria-label="clap">👏</span>
        </h2>
        <div className="quiz-progress">
          Question {current + 1} / {total}
        </div>
      </div>
      <div className="question-block">
        <div className="question-text">{currQ.question}</div>
        <ul className="choices-list">
          {currQ.choices.map((choice, i) => (
            <li key={i}>
              <button
                className={`choice-btn ${
                  selected === i
                    ? selected === currQ.answer
                      ? "correct"
                      : "incorrect"
                    : selected != null && i === currQ.answer
                    ? "correct"
                    : ""
                }`}
                disabled={selected != null}
                onClick={() => onAnswer(i)}
                aria-pressed={selected === i}
                tabIndex={0}
              >
                {choice}
              </button>
            </li>
          ))}
        </ul>
        <div className="quiz-footer">
          <button
            className="btn next-btn"
            disabled={!allowNext}
            onClick={onNext}
            aria-disabled={!allowNext}
          >
            {current + 1 === total ? "Finish" : "Next"}
          </button>
        </div>
        {showScore && (
          <div className="score-preview" aria-live="polite">
            Current score: <span className="score-value">{score}</span>
          </div>
        )}
      </div>
      <FlagBanner position="bottom" />
    </div>
  );
}

// Result Screen
function ResultScreen({
  userName,
  score,
  total,
  onRestart,
  onViewLeaderboard,
}) {
  useConfetti();

  return (
    <div className="screen result-screen">
      <FlagBanner position="top" />
      <div className="result-content">
        <Celebration />
        <h2>
          🎊 Congratulations, {userName}! 🎊
        </h2>
        <div className="final-score">
          You scored{" "}
          <span className="score-value-result">
            {score} / {total}
          </span>
        </div>
        <div className="celebratory-msg">
          Well done on taking the quiz celebrating Staffan's 80th!
        </div>
        <div className="result-actions">
          <button className="btn play-again" onClick={onRestart}>
            Play Again
          </button>
          <button className="btn leaderboard-btn" onClick={onViewLeaderboard}>
            View Leaderboard
          </button>
        </div>
      </div>
      <FlagBanner position="bottom" />
      <ConfettiCanvas run />
    </div>
  );
}

// Leaderboard Screen
function LeaderboardScreen({ data, onRestart }) {
  const sorted = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="screen leaderboard-screen">
      <FlagBanner position="top" />
      <div className="leaderboard-content">
        <h2 className="leaderboard-title">🏆 Leaderboard</h2>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={3} className="empty-leaderboard">
                  Be the first to play!
                </td>
              </tr>
            ) : (
              sorted.map((row, idx) => (
                <tr key={row.name + row.score + idx}>
                  <td>{idx + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="leaderboard-actions">
          <button className="btn play-again" onClick={onRestart}>
            Play a New Game
          </button>
        </div>
      </div>
      <FlagBanner position="bottom" />
    </div>
  );
}

// Minor Components/Helpers

function FlagBanner({ position }) {
  // top/bottom
  return (
    <div className={`flag-banner banner-${position}`}>
      <img
        className="flag-img"
        src={FLAGS[0].src}
        alt={FLAGS[0].alt}
        width={36}
        height={22}
        loading="lazy"
      />
      <span className="flag-space" />
      <img
        className="flag-img"
        src={FLAGS[1].src}
        alt={FLAGS[1].alt}
        width={36}
        height={22}
        loading="lazy"
      />
    </div>
  );
}

function Celebration() {
  return (
    <div className="celebration-emoji" aria-hidden="true">
      <span role="img" aria-label="confetti">🎉</span> <span role="img" aria-label="balloon">🎈</span>{" "}
      <span role="img" aria-label="swedish">🇸🇪</span> <span role="img" aria-label="usa">🇺🇸</span>
    </div>
  );
}

// Simple Confetti Canvas animation for finish screen
function ConfettiCanvas({ run }) {
  // Only renders when run=true, renders a canvas with falling confetti
  const ref = useRef(null);

  useEffect(() => {
    if (!run || !ref.current) return;
    let animationFrame, timeout;
    const colors = [COLORS.accent, COLORS.primary, "#f44336", "#30c97e", "#ffd700"];
    const confetti = Array.from({ length: 48 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -100,
      r: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      d: Math.random() * 0.9 + 0.5,
    }));

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += c.d * 4 + Math.random() * 2;
        c.x += Math.sin(c.y / 20) * 2;
        if (c.y > canvas.height) c.y = Math.random() * -24;
      });
      animationFrame = requestAnimationFrame(draw);
    }
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.clientHeight, 400);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
    timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2200);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    // eslint-disable-next-line
  }, [run]);

  return (
    <canvas
      ref={ref}
      className="confetti-canvas"
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 30,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

// Confetti side effect hook for accessibility announcement (optionally)
function useConfetti() {
  // This could be extended to trigger sound/accessibility feedback
}

// LocalStorage leaderboard
function getLeaderboard() {
  try {
    const data = JSON.parse(window.localStorage.getItem("staffan_leaderboard") || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
function setLeaderboard(lb) {
  window.localStorage.setItem("staffan_leaderboard", JSON.stringify(lb));
}

// Top App Controller
function App() {
  // Screen State: 'welcome', 'quiz', 'result', 'leaderboard'
  const [screen, setScreen] = useState("welcome");
  const [userName, setUserName] = useState("");
  const [shuffledQ, setShuffledQ] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  // On initial mount, clear selection
  useEffect(() => {
    setSelected(null);
  }, [currIdx]);

  // Start quiz: get mixed questions from all categories including Staffan Personal questions
  function startQuiz() {
    // Get 7 questions from all categories (now includes Staffan Personal questions)
    const mixedQuestions = getRandomMixedQuestions(7);
    
    setShuffledQ(mixedQuestions);
    setScore(0);
    setCurrIdx(0);
    setSelected(null);
    setScreen("quiz");
  }

  // Next question or end
  function handleNext() {
    if (currIdx + 1 === shuffledQ.length) {
      // Save result to leaderboard
      const lb = getLeaderboard();
      lb.push({ name: userName.trim(), score });
      setLeaderboard(lb);
      setScreen("result");
    } else {
      setCurrIdx(currIdx + 1);
      setSelected(null);
    }
  }

  function handleAnswer(idx) {
    setSelected(idx);
    if (shuffledQ[currIdx].answer === idx) setScore((s) => s + 1);
  }

  // To restart
  function playAgain() {
    setScreen("welcome");
  }

  // To leaderboard
  function onViewLeaderboard() {
    setScreen("leaderboard");
  }

  // Back to quiz from leaderboard
  function onFromLeaderboard() {
    setScreen("welcome");
    setUserName("");
  }

  // Main render logic
  if (screen === "welcome")
    return (
      <WelcomeScreen
        onStart={startQuiz}
        userName={userName}
        setUserName={setUserName}
        leaderboardData={getLeaderboard()}
      />
    );

  if (screen === "quiz")
    return (
      <QuizScreen
        questions={shuffledQ.length ? shuffledQ : QUIZ_QUESTIONS}
        userName={userName || "Friend"}
        current={currIdx}
        total={(shuffledQ.length || 7)}
        onAnswer={handleAnswer}
        selected={selected}
        onNext={handleNext}
        allowNext={selected !== null}
        showScore={true}
        score={score}
      />
    );

  if (screen === "result")
    return (
      <ResultScreen
        userName={userName || "Friend"}
        score={score}
        total={shuffledQ.length || 7}
        onRestart={playAgain}
        onViewLeaderboard={onViewLeaderboard}
      />
    );

  if (screen === "leaderboard")
    return (
      <LeaderboardScreen
        data={getLeaderboard()}
        onRestart={onFromLeaderboard}
      />
    );

  // fallback
  return <div />;
}

export default App;
