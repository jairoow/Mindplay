export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/**
 * RevealRing — elemento visual de firma de MindPlay.
 * Anillo circular animado usado para mostrar porcentajes/estadísticas en resultados.
 */
export function RevealRing({ value = 0, label, size = 128 }) {
  const stroke = 8;
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="reveal-ring" style={{ "--ring-size": `${size}px` }}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle className="track" cx={size / 2} cy={size / 2} r={radius} />
        <circle
          className="value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="reveal-ring__label">{label ?? `${Math.round(value)}%`}</span>
    </div>
  );
}
