// src/components/CategoryTile.jsx
import { Link } from "react-router-dom";

export default function CategoryTile({ title, subtitle, to, icon, badges=[] }) {
  const Icon = icon;
  return (
    <Link to={to} className="group rounded-3xl p-6 bg-white shadow-lg border border-black/5 hover:shadow-2xl transition block">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-[#F0C85A]/20 text-[#493657]">
          <Icon size={28}/>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#493657]">{title}</h3>
          <p className="text-[#493657]/70 text-sm">{subtitle}</p>
        </div>
      </div>
      {!!badges.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span key={b.label} className="px-2.5 py-1 rounded-full bg-[#493657]/5 text-[#493657] text-xs border border-[#493657]/10">
              {b.label}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
