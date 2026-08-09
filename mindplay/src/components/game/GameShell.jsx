import { useState } from "react";
import Button from "../ui/Button.jsx";
import GameResult from "./GameResult.jsx";

/**
 * Envoltorio común para todos los minijuegos: intro con instrucciones,
 * fase de juego (delegada al minijuego concreto vía `renderGame`) y resultado.
 *
 * `renderGame` recibe `{ finish }`, donde finish(scoreValue, scoreLabel, meta?)
 * cierra la partida. `meta` es opcional (ej. { isNewRecord, recordLabel }).
 *
 * `attempt` fuerza el remontado del componente de juego en cada intento
 * (vía `key`), para que su propio estado interno (temporizadores, fases...)
 * arranque siempre limpio al pulsar "Volver a intentar".
 */
export default function GameShell({ game, renderGame, nextTo, nextLabel }) {
  const [phase, setPhase] = useState("intro"); // intro | playing | result
  const [score, setScore] = useState(null);
  const [attempt, setAttempt] = useState(0);

  function finish(scoreValue, scoreLabel, meta) {
    setScore({ value: scoreValue, label: scoreLabel, meta });
    setPhase("result");
  }

  function retry() {
    setScore(null);
    setAttempt((n) => n + 1);
    setPhase("playing");
  }

  return (
    <div className="game-shell">
      {phase === "intro" && (
        <div className="game-shell__intro">
          <div className="eyebrow">{game.category}</div>
          <h1 className="game-shell__title">{game.title}</h1>
          <p className="game-shell__instructions">{game.instructions}</p>
          <Button variant="accent" onClick={() => setPhase("playing")}>
            Empezar
          </Button>
        </div>
      )}

      {phase === "playing" && <div key={attempt}>{renderGame({ finish })}</div>}

      {phase === "result" && score && (
        <GameResult
          scoreValue={score.value}
          scoreLabel={score.label}
          meta={score.meta}
          onRetry={retry}
          nextTo={nextTo}
          nextLabel={nextLabel}
        />
      )}
    </div>
  );
}
