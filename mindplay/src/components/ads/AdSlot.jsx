import { ADS_CONFIG } from "../../config/ads.js";

const SIZE_CLASS = {
  banner: "ad-slot--banner",
  inline: "ad-slot--inline",
  square: "ad-slot--square",
};

/**
 * Hueco publicitario reutilizable, sin proveedor conectado todavía.
 * placement: identificador de la posición (ver config/ads.js -> AD_PLACEMENTS)
 * size: "banner" | "inline" | "square"
 *
 * Si ADS_CONFIG.ADS_ENABLED es false, no se renderiza nada salvo que
 * SHOW_PLACEHOLDERS esté activo (útil en desarrollo para ver el hueco reservado).
 */
export default function AdSlot({ placement, size = "banner" }) {
  if (!ADS_CONFIG.ADS_ENABLED) {
    if (!ADS_CONFIG.SHOW_PLACEHOLDERS) return null;
    return (
      <div className={`ad-slot ${SIZE_CLASS[size] ?? SIZE_CLASS.banner}`} data-placement={placement} data-size={size}>
        Espacio publicitario · {placement}
      </div>
    );
  }

  // Cuando ADS_ENABLED sea true, aquí se montará el proveedor real
  // (ej. inyección de script, componente del SDK, etc.) según `placement`/`size`.
  return <div className={`ad-slot ${SIZE_CLASS[size] ?? SIZE_CLASS.banner}`} data-placement={placement} data-size={size} />;
}
