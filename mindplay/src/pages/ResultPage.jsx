import { useParams, useSearchParams, Navigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Button from "../components/ui/Button.jsx";
import AdSlot from "../components/ads/AdSlot.jsx";
import ResultCard from "../components/quiz/ResultCard.jsx";
import Recommendations from "../components/recommendations/Recommendations.jsx";
import { AD_PLACEMENTS } from "../config/ads.js";
import { getTestBySlug, getResultByKey, TESTS } from "../data/tests/index.js";
import { GAMES } from "../data/games/index.js";
import { decodeStatValues } from "../engines/scoring.js";

/**
 * Página de resultado compartible: /resultado/:testSlug/:resultKey?s=...
 * Se reconstruye por completo a partir de la URL (sin estado ni servidor):
 * el testSlug localiza el test, el resultKey localiza el resultado dentro
 * de él (o el tramo correspondiente, en tests tipo "index"), y el parámetro
 * ?s= —si existe— trae las estadísticas reales calculadas en ese intento.
 */
export default function ResultPage() {
  const { testSlug, resultKey } = useParams();
  const [searchParams] = useSearchParams();
  const test = getTestBySlug(testSlug);
  const statValues = decodeStatValues(searchParams.get("s"));
  const result = getResultByKey(test, resultKey, statValues);

  if (!test || !result) return <Navigate to="/tests" replace />;

  // Recomendación contextual: la que trae el propio resultado si existe,
  // si no, otro test, y en último caso el primer juego disponible.
  const recommended = result.recommendedSlug
    ? result.recommendedSlug
    : (() => {
        const otherTest = TESTS.find((t) => t.slug !== test.slug);
        if (otherTest) return { type: "test", slug: otherTest.slug };
        const firstGame = GAMES[0];
        return firstGame ? { type: "game", slug: firstGame.slug } : null;
      })();

  const recommendedContent = recommended
    ? recommended.type === "test"
      ? TESTS.find((t) => t.slug === recommended.slug)
      : GAMES.find((g) => g.slug === recommended.slug)
    : null;

  const continueCtaTitle =
    result.nextStepText ||
    (recommended?.type === "game" ? "¿Ponemos a prueba algo más de ti?" : "¿Quieres descubrir otra parte de tu personalidad?");

  function handleShare() {
    const url = window.location.href;
    const shareText = `Me ha salido ${result.title.toUpperCase()} en MindPlay. ¿Qué te sale a ti?`;
    if (navigator.share) {
      navigator.share({ title: `${result.title} — MindPlay`, text: shareText, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <PageContainer>
      <Seo title={`${result.title} · ${test.title}`} description={result.description} />
      <div className="container">
        <ResultCard result={result} />

        <div className="result-actions">
          <Button variant="accent" onClick={handleShare}>
            Compartir mi resultado
          </Button>
          <Button variant="secondary" to="/tests">
            Hacer otro test
          </Button>
        </div>

        <AdSlot placement={AD_PLACEMENTS.TEST_RESULT} size="banner" />

        {recommendedContent && (
          <div className="continue-cta">
            <h2 className="continue-cta__title">{continueCtaTitle}</h2>
            <Button
              variant="accent"
              to={recommended.type === "test" ? `/tests/${recommendedContent.slug}` : `/juegos/${recommendedContent.slug}`}
            >
              {recommended.type === "test" ? `Probar “${recommendedContent.title}”` : `Jugar a “${recommendedContent.title}”`}
            </Button>
          </div>
        )}

        <Recommendations excludeType="test" excludeSlug={test.slug} />
      </div>
    </PageContainer>
  );
}
