/**
 * Récords personales guardados en localStorage (sin backend, sin cuenta).
 * Base de "Mi MindPlay": por ahora solo guarda el mejor resultado por juego.
 */
const PREFIX = "mindplay:record:";

export function getRecord(gameSlug) {
  try {
    const raw = localStorage.getItem(PREFIX + gameSlug);
    return raw !== null ? Number(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Guarda `value` como récord si mejora al anterior.
 * mode: "lowerIsBetter" (ej. tiempo de reacción) | "higherIsBetter" (ej. puntuación)
 * Devuelve { record, isNewRecord }.
 */
export function saveRecordIfBetter(gameSlug, value, mode = "lowerIsBetter") {
  const current = getRecord(gameSlug);
  const isBetter = current === null || (mode === "lowerIsBetter" ? value < current : value > current);

  if (!isBetter) {
    return { record: current, isNewRecord: false };
  }

  try {
    localStorage.setItem(PREFIX + gameSlug, String(value));
  } catch {
    // localStorage no disponible (modo privado, cuotas, etc.): seguimos sin romper el juego
  }
  return { record: value, isNewRecord: true };
}
