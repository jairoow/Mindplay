import { NavLink } from "react-router-dom";

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  tests: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  games: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="11" rx="4" />
      <path d="M8 12h.01M8 12H8m0 0v0M16 11.5h.01M13.5 13h.01" />
    </svg>
  ),
  couple: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="15" cy="9" r="3.2" />
      <path d="M4 20c0-3 2.5-5 5-5s5 2 5 5" />
      <path d="M10 20c0-3 2.5-5 5-5s5 2 5 5" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { to: "/", label: "Inicio", end: true, icon: "home" },
  { to: "/tests", label: "Tests", icon: "tests" },
  { to: "/juegos", label: "Juegos", icon: "games" },
  { to: "/pareja", label: "Pareja", icon: "couple" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación inferior">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `bottom-nav__item${isActive ? " active" : ""}`}
        >
          {ICONS[item.icon]}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
