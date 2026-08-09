/**
 * Motor de cálculo de resultados, agnóstico al contenido de cada test.
 * Un test define `resultLogic` y sus preguntas llevan pesos por opción;
 * este módulo solo interpreta esos datos, nunca contiene texto de ningún test.
 *
 * Estrategias soportadas:
 *
 * - "weighted": cada opción puede sumar puntos a) a una o varias keys de
 *   `test.results` (`option.weight`, decide qué resultado gana) y b) a una
 *   o varias dimensiones medibles (`option.dimensions`, ej. disciplina,
 *   empatía...). Las dimensiones se normalizan a 0-100 en función del máximo
 *   posible en ese test, así que las estadísticas del resultado son reales,
 *   no números fijos. Cada resultado declara `statKeys` (qué dimensiones
 *   mostrar) y opcionalmente `fallbackStats` (valores de referencia para
 *   cuando se visita la URL de resultado sin haber hecho el test).
 *
 * - "category": cada opción pertenece a una única categoría (`option.category`,
 *   un string). Gana la categoría elegida más veces. Pensado para tests más
 *   simples que no necesitan combinar dimensiones.
 *
 * - "index": cada opción aporta un valor numérico 0-100 (`option.value`).
 *   Se promedia y el resultado final es ese número, que se ubica dentro de
 *   un tramo (`test.results[i].min/max`). Usada por tests tipo "índice"
 *   (ej. mentalidad financiera).
 */

function computeDimensionMax(test) {
  const max = {};
  test.questions.forEach((question) => {
    const perQuestionMax = {};
    question.options.forEach((option) => {
      if (!option.dimensions) return;
      Object.entries(option.dimensions).forEach(([key, value]) => {
        perQuestionMax[key] = Math.max(perQuestionMax[key] || 0, value);
      });
    });
    Object.entries(perQuestionMax).forEach(([key, value]) => {
      max[key] = (max[key] || 0) + value;
    });
  });
  return max;
}

function calculateWeighted(test, selections) {
  const archetypeTotals = {};
  const dimensionTotals = {};

  test.questions.forEach((question) => {
    const option = question.options.find((o) => o.id === selections[question.id]);
    if (!option) return;

    if (option.weight) {
      Object.entries(option.weight).forEach(([key, value]) => {
        archetypeTotals[key] = (archetypeTotals[key] || 0) + value;
      });
    }
    if (option.dimensions) {
      Object.entries(option.dimensions).forEach(([key, value]) => {
        dimensionTotals[key] = (dimensionTotals[key] || 0) + value;
      });
    }
  });

  let winnerKey = test.results[0]?.key;
  let winnerScore = -Infinity;
  Object.entries(archetypeTotals).forEach(([key, score]) => {
    if (score > winnerScore) {
      winnerScore = score;
      winnerKey = key;
    }
  });

  const dimensionMax = computeDimensionMax(test);
  const dimensionPercent = {};
  Object.keys(dimensionMax).forEach((key) => {
    dimensionPercent[key] = dimensionMax[key]
      ? Math.max(0, Math.min(100, Math.round(((dimensionTotals[key] || 0) / dimensionMax[key]) * 100)))
      : 0;
  });

  const winnerResult = test.results.find((r) => r.key === winnerKey);
  const statValues = winnerResult?.statKeys ? winnerResult.statKeys.map((key) => dimensionPercent[key] ?? 0) : null;

  return { resultKey: winnerKey, statValues };
}

function calculateCategory(test, selections) {
  const counts = {};

  test.questions.forEach((question) => {
    const option = question.options.find((o) => o.id === selections[question.id]);
    if (!option || !option.category) return;
    counts[option.category] = (counts[option.category] || 0) + 1;
  });

  let winnerKey = test.results[0]?.key;
  let winnerCount = -Infinity;
  Object.entries(counts).forEach(([key, count]) => {
    if (count > winnerCount) {
      winnerCount = count;
      winnerKey = key;
    }
  });

  return { resultKey: winnerKey, statValues: null };
}

function calculateIndex(test, selections) {
  let sum = 0;
  let count = 0;

  test.questions.forEach((question) => {
    const option = question.options.find((o) => o.id === selections[question.id]);
    if (!option || typeof option.value !== "number") return;
    sum += option.value;
    count += 1;
  });

  const score = count ? Math.round(sum / count) : 50;
  return { resultKey: String(score), statValues: null };
}

const STRATEGIES = {
  weighted: calculateWeighted,
  category: calculateCategory,
  index: calculateIndex,
};

/**
 * Punto de entrada único: calcula el resultado de un test ya respondido.
 * Devuelve { resultKey, statValues }. `statValues` (si existe) son los
 * valores reales, en el mismo orden que `statKeys` del resultado ganador,
 * listos para codificarse en la URL de resultado.
 */
export function calculateResult(test, selections) {
  const strategy = STRATEGIES[test.resultLogic] || calculateWeighted;
  return strategy(test, selections);
}

/** Codifica los valores de estadísticas para meterlos en la URL como ?s=92,74,22 */
export function encodeStatValues(values) {
  return Array.isArray(values) && values.length ? values.join(",") : "";
}

/** Decodifica el parámetro ?s=... de vuelta a un array de números, o null si no es válido */
export function decodeStatValues(param) {
  if (!param) return null;
  const values = param.split(",").map(Number);
  return values.every((n) => Number.isFinite(n)) ? values : null;
}

/**
 * Reconstruye un resultado a partir de su key, tal y como viene en la URL
 * (/resultado/:testSlug/:resultKey). No depende del estado del navegador:
 * si se pasan `statValues` (decodificados de ?s=...) se muestran las
 * estadísticas reales de esa sesión; si no, se usa `fallbackStats` del
 * resultado (para cuando se abre la URL directamente, ej. un enlace viejo).
 */
export function resolveResult(test, key, statValues) {
  if (!test) return null;

  if (test.resultLogic === "index") {
    const score = Math.max(0, Math.min(100, Number(key)));
    if (Number.isNaN(score)) return null;
    const band =
      test.results.find((r) => score >= r.min && score <= r.max) || test.results[test.results.length - 1];
    return { ...band, key, matchPercent: score, disclaimer: band.disclaimer || test.disclaimer };
  }

  const base = test.results.find((r) => r.key === key);
  if (!base) return null;

  let stats = base.stats || [];
  if (base.statKeys) {
    if (Array.isArray(statValues) && statValues.length === base.statKeys.length) {
      stats = base.statKeys.map((k, i) => ({ label: test.dimensionLabels?.[k] || k, value: statValues[i] }));
    } else if (base.fallbackStats) {
      stats = base.statKeys.map((k) => ({ label: test.dimensionLabels?.[k] || k, value: base.fallbackStats[k] ?? 50 }));
    }
  }

  const matchPercent = base.matchPercent ?? (stats.length ? Math.round(stats.reduce((sum, s) => sum + s.value, 0) / stats.length) : 100);

  return { ...base, stats, matchPercent, disclaimer: base.disclaimer || test.disclaimer };
}
