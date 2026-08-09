import { Link } from "react-router-dom";

/**
 * Tarjeta táctil reutilizable para previews de tests/juegos.
 * props: title, meta (string), icon (emoji/nodo), to (ruta), variant ("row" | "grid")
 */
export default function Card({ title, meta, icon = "✦", to }) {
  const content = (
    <>
      <div className="card__media" aria-hidden="true">
        <span>{icon}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {meta && <span className="card__meta">{meta}</span>}
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="card card--tappable">
        {content}
      </Link>
    );
  }

  return <div className="card">{content}</div>;
}
