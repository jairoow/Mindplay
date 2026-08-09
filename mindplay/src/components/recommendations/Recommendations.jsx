import Card from "../ui/Card.jsx";
import { TESTS } from "../../data/tests/index.js";
import { GAMES } from "../../data/games/index.js";

/**
 * "Puede que también te guste" — combina tests y juegos (excluyendo el actual)
 * para fomentar el recorrido Test → Resultado → Otro test → Juego → ...
 * excludeType/excludeSlug identifican el contenido que se está viendo ahora mismo.
 */
export default function Recommendations({ excludeType, excludeSlug, limit = 3, title = "Puede que también te guste" }) {
  const pool = [
    ...TESTS.map((t) => ({ type: "test", slug: t.slug, title: t.title, category: t.category, icon: t.icon })),
    ...GAMES.map((g) => ({ type: "game", slug: g.slug, title: g.title, category: g.category, icon: g.icon })),
  ].filter((item) => !(item.type === excludeType && item.slug === excludeSlug));

  const items = pool.slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section className="recommendations">
      <h2 className="section-title">{title}</h2>
      <div className="card-row">
        {items.map((item) => (
          <Card
            key={`${item.type}-${item.slug}`}
            title={item.title}
            meta={item.category}
            icon={item.icon}
            to={item.type === "test" ? `/tests/${item.slug}` : `/juegos/${item.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
