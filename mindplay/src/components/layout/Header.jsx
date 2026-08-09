import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/tests", label: "Tests" },
  { to: "/juegos", label: "Juegos" },
  { to: "/pareja", label: "Pareja" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand" aria-label="MindPlay — inicio">
          <span className="brand__mark" aria-hidden="true" />
          MindPlay
        </NavLink>
        <nav className="site-header__nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
