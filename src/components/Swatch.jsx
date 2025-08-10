// src/components/Swatch.jsx
export default function Swatch({ hex, size=48, className="", onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-full shadow-sm border border-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      style={{ width: size, height: size, backgroundColor: hex }}
    />
  );
}
