import { useEffect, useRef, useState } from "react";
import { useGameTimer } from "../../hooks/useGameTimer.js";
import { saveRecordIfBetter } from "../../utils/records.js";

const GAME_SLUG = "tiempo-de-reaccion";

/**
 * Lógica interactiva del juego "Tiempo de reacción".
 * Recibe `finish(scoreValue, scoreLabel, meta)` desde GameShell para cerrar la partida.
 */
export default function ReactionTimeGame({ finish }) {
  const [state, setState] = useState("waiting"); // waiting | go | early
  const timeoutRef = useRef(null);
  const timer = useGameTimer();

  useEffect(() => {
    const delay = 1200 + Math.random() * 2200;
    timeoutRef.current = setTimeout(() => {
      setState("go");
      timer.start();
    }, delay);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTap() {
    if (state === "waiting") {
      clearTimeout(timeoutRef.current);
      setState("early");
      return;
    }
    if (state === "go") {
      const ms = timer.stop();
      const { record, isNewRecord } = saveRecordIfBetter(GAME_SLUG, ms, "lowerIsBetter");
      finish(`${ms} ms`, "Tu tiempo de reacción", { isNewRecord, recordLabel: `${record} ms` });
    }
  }

  function handleRetryEarly() {
    setState("waiting");
    const delay = 1200 + Math.random() * 2200;
    timeoutRef.current = setTimeout(() => {
      setState("go");
      timer.start();
    }, delay);
  }

  const label = state === "waiting" ? "Espera…" : state === "go" ? "¡Ahora!" : "Demasiado pronto";

  return (
    <div className="game-shell__stage">
      <button
        type="button"
        className={`reaction-pad reaction-pad--${state === "go" ? "go" : state === "early" ? "early" : "wait"}`}
        onClick={state === "early" ? handleRetryEarly : handleTap}
        aria-live="polite"
      >
        {state === "early" ? "Toca para reintentar" : label}
      </button>
    </div>
  );
}
