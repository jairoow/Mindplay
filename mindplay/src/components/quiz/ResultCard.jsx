import { RevealRing } from "../ui/ProgressBar.jsx";

/**
 * Presenta visualmente un resultado ya calculado (título, descripción, estadísticas
 * y, opcionalmente, fortalezas / debilidades / secciones a medida / lista de películas
 * / aviso legal). No depende de las respuestas concretas: todo lo que necesita vive
 * en `result`, por eso el resultado es 100% reconstruible desde la URL
 * /resultado/:test/:key.
 */
export default function ResultCard({ result }) {
  return (
    <div className="result-hero">
      <div className="eyebrow result-hero__eyebrow">Tu resultado</div>
      <h1 className="result-hero__title">{result.title}</h1>

      <div className="result-hero__ring">
        <RevealRing value={result.matchPercent ?? 100} size={140} />
      </div>

      <p className="result-hero__description">{result.description}</p>

      {(result.strengths?.length > 0 || result.weaknesses?.length > 0) && (
        <div className="result-traits">
          {result.strengths?.length > 0 && (
            <div className="result-traits__col">
              <h3 className="result-traits__title">Fortalezas</h3>
              <ul className="result-traits__list result-traits__list--positive">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {result.weaknesses?.length > 0 && (
            <div className="result-traits__col">
              <h3 className="result-traits__title">{result.weaknessesLabel || "A tener en cuenta"}</h3>
              <ul className="result-traits__list result-traits__list--caution">
                {result.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result.sections?.length > 0 && (
        <div className="result-sections">
          {result.sections.map((section) => (
            <div className="result-section" key={section.heading}>
              <h3 className="result-section__heading">{section.heading}</h3>
              <p className="result-section__text">{section.text}</p>
            </div>
          ))}
        </div>
      )}

      {result.movieList?.length > 0 && (
        <div className="result-section">
          <h3 className="result-section__heading">Te podrían gustar</h3>
          <ul className="result-movie-list">
            {result.movieList.map((movie) => (
              <li key={movie}>{movie}</li>
            ))}
          </ul>
        </div>
      )}

      {result.stats?.length > 0 && (
        <div className="result-stats">
          {result.stats.map((stat) => (
            <div className="result-stat" key={stat.label}>
              <div className="result-stat__row">
                <span>{stat.label}</span>
                <span className="result-stat__value">{stat.value}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar__fill" style={{ width: `${stat.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {result.disclaimer && <p className="result-disclaimer">{result.disclaimer}</p>}
    </div>
  );
}
