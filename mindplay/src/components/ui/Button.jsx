import { Link } from "react-router-dom";

/**
 * Botón reutilizable. Si recibe `to`, renderiza un Link; si no, un <button>.
 * variant: "primary" | "accent" | "secondary" | "ghost"
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size,
  block,
  type = "button",
  ...rest
}) {
  const className = [
    "btn",
    `btn--${variant}`,
    size === "sm" ? "btn--sm" : "",
    block ? "btn--block" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
