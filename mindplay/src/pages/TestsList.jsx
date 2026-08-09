import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Card from "../components/ui/Card.jsx";
import { TESTS } from "../data/tests/index.js";

export default function TestsList() {
  return (
    <PageContainer>
      <Seo title="Tests" description="Explora todos los tests de personalidad de MindPlay." />
      <div className="container">
        <div className="list-page__head">
          <h1 className="list-page__title">Tests</h1>
          <p className="list-page__subtitle">Elige uno y descubre tu resultado en menos de 2 minutos.</p>
        </div>
        <div className="card-grid list-page__grid">
          {TESTS.map((t) => (
            <Card key={t.slug} title={t.title} meta={t.category} icon={t.icon} to={`/tests/${t.slug}`} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
