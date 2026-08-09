import { personalityTest } from "./personality.js";
import { resolveResult } from "../../engines/scoring.js";

/**
 * Registro central de tests. Añadir un test nuevo consiste en:
 * 1) crear su archivo de datos siguiendo el esquema de personality.js
 * 2) importarlo y añadirlo aquí.
 * Ningún componente necesita cambios para soportar un test nuevo.
 *
 * (Los tests de pareja, dinero, películas y defecto se añadirán en próximas
 * fases; de momento solo se registra el test de personalidad, ya terminado.)
 */
export const TESTS = [personalityTest];

export function getTestBySlug(slug) {
  return TESTS.find((t) => t.slug === slug);
}

export function getResultByKey(test, key, statValues) {
  return resolveResult(test, key, statValues);
}
