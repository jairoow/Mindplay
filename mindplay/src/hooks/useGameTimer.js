import { useCallback, useRef, useState } from "react";

/**
 * Cronómetro simple en milisegundos para minijuegos que miden tiempo de reacción
 * o duración de una prueba. No depende de ningún juego concreto.
 */
export function useGameTimer() {
  const startRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);

  const start = useCallback(() => {
    startRef.current = performance.now();
  }, []);

  const stop = useCallback(() => {
    if (startRef.current == null) return 0;
    const ms = Math.round(performance.now() - startRef.current);
    setElapsed(ms);
    startRef.current = null;
    return ms;
  }, []);

  const reset = useCallback(() => {
    startRef.current = null;
    setElapsed(0);
  }, []);

  return { start, stop, reset, elapsed };
}
