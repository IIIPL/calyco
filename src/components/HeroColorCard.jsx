// src/components/HeroColorCard.jsx
import Swatch from "./Swatch";

export default function HeroColorCard({ color, comboColors=[], onPickCombo }) {
  if (!color) return null;
  return (
    <div className="group rounded-3xl p-6 bg-white/80 backdrop-blur shadow-xl border border-black/5 flex flex-col items-center hover:shadow-2xl transition">
      <div className="relative mb-4">
        <div className="absolute -inset-2 rounded-full bg-black/5 blur-lg opacity-0 group-hover:opacity-100 transition" />
        <Swatch hex={color.hex} size={140} className="ring-1 ring-black/10" title={color.name}/>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#493657]">{color.name}</h3>
        <p className="text-sm text-[#493657]/70 mt-1">{color.color_family}</p>
      </div>
      {!!comboColors.length && (
        <div className="flex items-center gap-2 mt-5">
          {comboColors.slice(0,4).map((c) => (
            <Swatch key={c.name} hex={c.hex} size={28} title={c.name} onClick={() => onPickCombo?.(c)} />
          ))}
        </div>
      )}
    </div>
  );
}
