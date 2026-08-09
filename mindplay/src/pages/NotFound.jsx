import PageContainer from "../components/layout/PageContainer.jsx";
import Seo from "../seo/Seo.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <PageContainer>
      <Seo title="Página no encontrada" />
      <div className="container not-found">
        <h1 className="not-found__title">No hemos encontrado esta página</h1>
        <Button variant="accent" to="/">
          Volver al inicio
        </Button>
      </div>
    </PageContainer>
  );
}
