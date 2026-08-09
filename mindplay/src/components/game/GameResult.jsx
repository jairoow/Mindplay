import Button from "../ui/Button.jsx";
import AdSlot from "../ads/AdSlot.jsx";
import { AD_PLACEMENTS } from "../../config/ads.js";

export default function GameResult({ scoreLabel, scoreValue, meta, onRetry, nextTo, nextLabel = "Probar otro juego" }) {
  return (
    <div className="game-result">
      {meta?.isNewRecord ? (
        <div className="game-result__badge">🏆 Nuevo récord personal</div>
      ) : (
        <div className="eyebrow">Resultado</div>
      )}
      <div className="game-result__score">{scoreValue}</div>
      <div className="game-result__label">{scoreLabel}</div>
      {meta?.recordLabel && !meta.isNewRecord && <div className="game-result__record">Tu récord: {meta.recordLabel}</div>}

      <div className="game-result__ad">
        <AdSlot placement={AD_PLACEMENTS.GAME_RESULT} size="inline" />
      </div>

      <div className="game-result__actions">
        <Button variant="secondary" onClick={onRetry}>
          Volver a intentar
        </Button>
        {nextTo && (
          <Button variant="accent" to={nextTo}>
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
