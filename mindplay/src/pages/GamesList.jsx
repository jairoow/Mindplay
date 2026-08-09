import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Card from "../components/ui/Card.jsx";
import { GAMES } from "../data/games/index.js";

export default function GamesList() {
  return (
    <PageContainer>
      <Seo title="Juegos" description="Pon a prueba tus reflejos, memoria y lógica con los minijuegos de MindPlay." />
      <div className="container">
        <div className="list-page__head">
          <h1 className="list-page__title">Juegos</h1>
          <p className="list-page__subtitle">Retos rápidos para medir tus habilidades.</p>
        </div>
        <div className="card-grid list-page__grid">
          {GAMES.map((g) => (
            <Card key={g.slug} title={g.title} meta={g.category} icon={g.icon} to={`/juegos/${g.slug}`} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
