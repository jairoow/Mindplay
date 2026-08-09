export default function Badge({ children, active, onClick }) {
  const className = `badge${active ? " active" : ""}`;
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className={className}>{children}</span>;
}
