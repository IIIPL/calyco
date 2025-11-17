import React from 'react';

const LinkButton = ({ href, label }) => {
  // Don't render disabled buttons at all
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 rounded-lg text-sm border bg-white text-[#342347] hover:bg-gray-50 border-gray-300"
    >
      {label}
    </a>
  );
};

const DownloadCard = ({ docs = {} }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <LinkButton href={docs.tds} label="TDS" />
      <LinkButton href={docs.sds} label="SDS" />
      <LinkButton href={docs.warranty} label="Warranty" />
    </div>
  );
};

export default DownloadCard;


