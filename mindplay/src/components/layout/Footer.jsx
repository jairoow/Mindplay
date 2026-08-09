export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>© {new Date().getFullYear()} MindPlay</span>
        <div className="site-footer__links">
          <a href="/tests">Tests</a>
          <a href="/juegos">Juegos</a>
          <a href="/pareja">Pareja</a>
        </div>
      </div>
    </footer>
  );
}
