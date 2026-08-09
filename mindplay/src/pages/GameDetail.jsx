import { useParams, Navigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import AdSlot from "../components/ads/AdSlot.jsx";
import GameShell from "../components/game/GameShell.jsx";
import { AD_PLACEMENTS } from "../config/ads.js";
import { getGameBySlug, GAMES } from "../data/games/index.js";
import { GAME_COMPONENTS } from "../engines/gameLogic/index.js";
import Recommendations from "../components/recommendations/Recommendations.jsx";

export default function GameDetail() {
  const { slug } = useParams();
  const game = getGameBySlug(slug);

  if (!game) return <Navigate to="/juegos" replace />;

  const GameComponent = GAME_COMPONENTS[game.slug];
  const otherGame = GAMES.find((g) => g.slug !== game.slug);

  return (
    <PageContainer>
      <Seo title={game.title} description={game.instructions} />
      <div className="container">
        <GameShell
          game={game}
          nextTo={otherGame ? `/juegos/${otherGame.slug}` : undefined}
          renderGame={({ finish }) =>
            GameComponent ? (
              <GameComponent finish={finish} />
            ) : (
              <p>Este minijuego estará disponible próximamente.</p>
            )
          }
        />

        <div className="ad-section">
          <AdSlot placement={AD_PLACEMENTS.GAME_BETWEEN} size="banner" />
        </div>

        <Recommendations excludeType="game" excludeSlug={game.slug} />
      </div>
    </PageContainer>
  );
}
