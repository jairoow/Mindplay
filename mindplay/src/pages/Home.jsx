import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import AnimatedSection from "../components/ui/AnimatedSection.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import AdSlot from "../components/ads/AdSlot.jsx";
import Recommendations from "../components/recommendations/Recommendations.jsx";
import { AD_PLACEMENTS } from "../config/ads.js";
import { TESTS } from "../data/tests/index.js";
import { GAMES } from "../data/games/index.js";

const CATEGORIES = ["Personalidad", "Reflejos"];

export default function Home() {
  return (
    <PageContainer>
      <Seo title="Inicio" description="Descubre tu mente jugando: tests de personalidad y minijuegos rápidos y reveladores." />
      <div className="container">
        <section className="hero">
          <div className="eyebrow hero__eyebrow">Bienvenido a MindPlay</div>
          <h1 className="hero__title">¿Qué dice tu forma de pensar sobre ti?</h1>
          <p className="hero__subtitle">
            Descubre tu personalidad, pon a prueba tus reflejos y descubre qué encaja contigo.
          </p>
          <div className="hero__actions">
            <Button variant="accent" to="/tests">
              Empezar ahora
            </Button>
            <Button variant="secondary" to="/juegos">
              Explorar juegos
            </Button>
          </div>
          <div className="hero__stat-row">
            <div>
              <div className="hero__stat-number">{TESTS.length}+</div>
              <div className="hero__stat-label">Tests</div>
            </div>
            <div>
              <div className="hero__stat-number">{GAMES.length}+</div>
              <div className="hero__stat-label">Minijuegos</div>
            </div>
            <div>
              <div className="hero__stat-number">2 min</div>
              <div className="hero__stat-label">Por sesión</div>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <h2 className="section-title">🧠 Tests</h2>
          <div className="card-row">
            {TESTS.map((t) => (
              <Card key={t.slug} title={t.title} meta={t.category} icon={t.icon} to={`/tests/${t.slug}`} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="section-title">🎮 Juegos</h2>
          <div className="card-row">
            {GAMES.map((g) => (
              <Card key={g.slug} title={g.title} meta={g.category} icon={g.icon} to={`/juegos/${g.slug}`} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="ad-section">
          <AdSlot placement={AD_PLACEMENTS.HOME_MID} size="banner" />
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="section-title">Categorías</h2>
          <div className="badge-row">
            {CATEGORIES.map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Recommendations title="Ya que estás aquí…" limit={3} />
        </AnimatedSection>

        <AnimatedSection>
          <div className="continue-cta">
            <h2 className="continue-cta__title">¿Listo para descubrir algo nuevo sobre ti?</h2>
            <Button variant="accent" to="/tests">
              Hacer un test ahora
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </PageContainer>
  );
}
