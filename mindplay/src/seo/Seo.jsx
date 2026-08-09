import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "MindPlay";
const DEFAULT_DESCRIPTION =
  "Tests de personalidad y minijuegos rápidos, divertidos y sorprendentemente reveladores.";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Componente sin render: actualiza <title>, meta tags básicos (description, og:*)
 * y el <link rel="canonical"> al montar cada página. Suficiente para SEO básico
 * sin dependencias externas. El canonical usa la ruta sin query string, para que
 * distintas variantes de una misma página de resultado (?s=...) apunten todas
 * a la misma URL canónica.
 */
export default function Seo({ title, description = DEFAULT_DESCRIPTION }) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Descubre tu mente jugando`;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    if (typeof window !== "undefined") {
      setCanonical(`${window.location.origin}${location.pathname}`);
    }
  }, [title, description, location.pathname]);

  return null;
}
