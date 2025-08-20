import React from 'react';

const LinkButton = ({ href, label }) => {
  const disabled = !href;
  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`px-3 py-2 rounded-lg text-sm border ${disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#342347] hover:bg-gray-50 border-gray-300'}`}
      aria-disabled={disabled}
    >
      {label}{disabled ? ' // TODO:' : ''}
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


