"use client";
import { useState, useEffect } from "react";
import Light from "./components/Light";

export default function Home() {
  const [phase, setPhase] = useState("stopped"); 
  const [activeLights, setActiveLights] = useState(0);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const totalLights = 5;
  const delay = 1000;

  useEffect(() => {
    let timer;

    if (phase === "countdown") {
      if (activeLights < totalLights) {
        timer = setTimeout(() => {
          setActiveLights((prev) => prev + 1);
        }, delay);
      } else {
        // 1 s troca para GO
        timer = setTimeout(() => {
          setPhase("go");
        }, delay);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, activeLights]);

  const startRace = () => {
    setPhase("countdown");
    setActiveLights(0);
    setWinner(null);
  };

  const handlePlayerClick = (player) => {
    if (phase === "go" && !winner) {
      setWinner(player);
      setPhase("finished");

      // Atualiza placar
      setScores((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Jogo de Reflexo</h1>

      {/* Luzes */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from({ length: totalLights }).map((_, i) => (
          <Light
            key={i}
            isOn={phase === "countdown" && i < activeLights}
            color="red"
          />
        ))}
      </div>

      {/* Mensagens */}
      {phase === "go" && !winner && (
        <h1 style={{ color: "green", marginTop: "20px", fontSize: "3rem" }}>
          GO!
        </h1>
      )}
      {winner && (
        <h1 style={{ color: "blue", marginTop: "20px", fontSize: "2.5rem" }}>
          {winner === "player1" ? "Jogador 1 venceu!" : "Jogador 2 venceu!"}
        </h1>
      )}

      {/* Botões dos jogadores */}
      <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
          onClick={() => handlePlayerClick("player1")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#ff4747",
            color: "white",
            cursor: "pointer",
          }}
        >
          Jogador 1
        </button>

        <button
          onClick={() => handlePlayerClick("player2")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4747ff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Jogador 2
        </button>
      </div>

      {/* Placar */}
      <div style={{ marginTop: "40px", fontSize: "1.5rem" }}>
        <p>Placar:</p>
        <p>Jogador 1: {scores.player1}</p>
        <p>Jogador 2: {scores.player2}</p>
      </div>

      {/* Botão para reiniciar */}
      <button
        onClick={startRace}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "1.2rem",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer",
        }}
      >
        Iniciar Corrida
      </button>
    </div>
  );
}
 