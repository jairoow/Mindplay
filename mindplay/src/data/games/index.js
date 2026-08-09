import { reactionTimeGame } from "./reaction-time.js";

/**
 * Registro central de juegos. Añadir un juego nuevo consiste en:
 * 1) crear su archivo de datos (metadatos) en data/games
 * 2) crear su componente de lógica en engines/gameLogic
 * 3) registrar ambos aquí y en engines/gameLogic/index.js
 */
export const GAMES = [reactionTimeGame];

export function getGameBySlug(slug) {
  return GAMES.find((g) => g.slug === slug);
}
