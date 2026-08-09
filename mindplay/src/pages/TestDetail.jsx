import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Button from "../components/ui/Button.jsx";
import AdSlot from "../components/ads/AdSlot.jsx";
import QuizEngine from "../components/quiz/QuizEngine.jsx";
import { AD_PLACEMENTS } from "../config/ads.js";
import { getTestBySlug } from "../data/tests/index.js";

export default function TestDetail() {
  const { slug } = useParams();
  const test = getTestBySlug(slug);
  const [started, setStarted] = useState(false);

  if (!test) return <Navigate to="/tests" replace />;

  return (
    <PageContainer>
      <Seo title={test.title} description={test.intro} />
      <div className="container">
        {!started ? (
          <div className="detail-intro">
            <div className="detail-intro__icon" aria-hidden="true">
              {test.icon}
            </div>
            <div className="eyebrow">{test.category}</div>
            <h1 className="detail-intro__title">{test.title}</h1>
            <p className="detail-intro__text">{test.intro}</p>
            <Button variant="accent" onClick={() => setStarted(true)}>
              Empezar test
            </Button>

            <div className="ad-section">
              <AdSlot placement={AD_PLACEMENTS.TEST_BETWEEN} size="banner" />
            </div>
          </div>
        ) : (
          <QuizEngine test={test} />
        )}
      </div>
    </PageContainer>
  );
}
