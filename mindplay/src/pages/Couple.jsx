import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Button from "../components/ui/Button.jsx";

/**
 * Sección "Pareja" — placeholder de navegación.
 * El contenido específico (tests de pareja, etc.) se añadirá más adelante;
 * por ahora enlaza a los tests ya disponibles para no dejar la sección vacía.
 */
export default function Couple() {
  return (
    <PageContainer>
      <Seo title="Pareja" description="Tests sobre el amor y las relaciones, muy pronto en MindPlay." />
      <div className="container placeholder-page">
        <h1 className="placeholder-page__title">Pareja</h1>
        <p className="placeholder-page__text">
          Estamos preparando tests dedicados a relaciones y compatibilidad. Mientras tanto, prueba nuestros tests de personalidad.
        </p>
        <div style={{ marginTop: "var(--sp-7)" }}>
          <Button variant="accent" to="/tests">
            Ver tests disponibles
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
