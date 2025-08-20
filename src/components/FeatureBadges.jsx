import React from 'react';

const FeatureBadges = ({ items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((it) => (
        <span key={it} className="px-3 py-1 rounded-full text-xs bg-[#F0C85A]/20 text-[#493657] border border-[#F0C85A]/40">{it}</span>
      ))}
    </div>
  );
};

export default FeatureBadges;


