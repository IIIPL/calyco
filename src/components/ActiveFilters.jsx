import React from 'react';
export default function ActiveFilters({ selected, price, onRemove, onClearAll }) {
    const chips = [];
    Object.entries(selected).forEach(([g, vals]) => (vals||[]).forEach(v => chips.push({ g, v })));
    const hasPrice = Number.isFinite(price?.min) && Number.isFinite(price?.max);
    return (
        <div className="flex flex-wrap items-center gap-2 my-4">
        {chips.map(({g,v}) => (
            <button key={`${g}-${v}`} className="px-3 py-1 bg-[#f0e9dc] text-[#493657] rounded-full text-sm hover:bg-[#e9dfcc]"
            onClick={() => onRemove(g, v)}>{g}: {v} ×</button>
        ))}
        {hasPrice && <span className="px-3 py-1 bg-[#f0e9dc] text-[#493657] rounded-full text-sm">Price: {price.min}–{price.max}</span>}
        {(chips.length||hasPrice) ? <button className="ml-2 underline text-[#493657]" onClick={onClearAll}>Clear All</button> : null}
        </div>
    );
}
