/**
 * Configuración global de publicidad.
 * Mientras `ADS_ENABLED` sea false, AdSlot no renderiza nada (ni el placeholder),
 * de forma que la sección de anuncios se puede activar en un único punto
 * cuando llegue el momento de conectar un proveedor real.
 *
 * `SHOW_PLACEHOLDERS` permite ver el hueco reservado durante el desarrollo
 * sin activar anuncios reales.
 */
export const ADS_CONFIG = {
  ADS_ENABLED: false,
  SHOW_PLACEHOLDERS: true,
};

export const AD_PLACEMENTS = {
  HOME_MID: "home-mid",
  TEST_BETWEEN: "test-between",
  TEST_RESULT: "test-result",
  GAME_BETWEEN: "game-between",
  GAME_RESULT: "game-result",
};
