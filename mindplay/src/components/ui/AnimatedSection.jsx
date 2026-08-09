import { useEffect, useRef, useState } from "react";

/**
 * Envuelve una sección y le añade una entrada suave (fade + slide) al entrar en viewport.
 * Usa IntersectionObserver + CSS puro (sin librerías de animación).
 */
export default function AnimatedSection({ children, className = "", as: Tag = "section", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`animated-section${visible ? " in-view" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
