import { useState, useEffect } from "react";
import "./App.css";

function Ranking({ onClose }) {
  const [rankings, setRankings] = useState({});
  const [selectedPhase, setSelectedPhase] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("folcloreRankings");
    if (saved) setRankings(JSON.parse(saved));
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || seconds === Infinity) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentRankings = Object.entries(rankings)
    .filter(([key]) => key.includes(`-fase${selectedPhase}`))
    .map(([key, time]) => ({ name: key.split("-")[0], time }))
    .sort((a, b) => a.time - b.time)
    .slice(0, 10);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="ranking-modal" onClick={onClose}>
      <div className="ranking-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>🏆 RANKING DA FLORESTA 🏆</h2>

        <div className="phase-selector">
          {[1, 2, 3, 4, 5].map((phase) => (
            <button
              key={phase}
              className={`phase-btn ${
                selectedPhase === phase ? "active" : ""
              }`}
              onClick={() => setSelectedPhase(phase)}
            >
              Fase {phase}
            </button>
          ))}
        </div>

        <div className="ranking-table">
          <div className="ranking-header">
            <span className="col-position">Posição</span>
            <span className="col-name">Jogador</span>
            <span className="col-time">Tempo</span>
          </div>

          {currentRankings.length > 0 ? (
            currentRankings.map((player, index) => (
              <div
                key={index}
                className={`ranking-row ${
                  index < 3 ? `top-${index + 1}` : ""
                }`}
              >
                <span className="col-position">
                  {getMedal(index)}
                </span>
                <span className="col-name">
                  {player.name}
                </span>
                <span className="col-time">
                  {formatTime(player.time)}
                </span>
              </div>
            ))
          ) : (
            <div className="no-rankings">
              <p>Nenhum ranking ainda para esta fase.</p>
              <p>Jogue e seja o primeiro!</p>
            </div>
          )}
        </div>

        <div className="ranking-footer">
          <p>🌿 Apenas os 10 melhores tempos são exibidos 🌿</p>
        </div>
      </div>
    </div>
  );
}

export default Ranking;