import React from 'react';

const ColorInfoHeader = ({ name, ralCode, colorFamily, mood, downloadHref }) => (
  <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-4">
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{name}</h1>
      {ralCode && (
        <p className="mt-2 text-sm uppercase tracking-wide text-gray-500">
          Color Code: {ralCode}
        </p>
      )}
    </div>

    {mood && (
      <p className="text-lg text-gray-700 leading-relaxed">{mood}</p>
    )}

    {colorFamily && (
      <div>
        <h2 className="text-sm uppercase tracking-wide text-gray-500">Color Family</h2>
        <p className="text-base font-medium text-gray-900 mt-1">{colorFamily}</p>
      </div>
    )}

    {downloadHref && (
      <a
        href={downloadHref}
        className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 hover:border-gray-400 transition"
      >
        Download digital dollop of {name}
      </a>
    )}
  </div>
);

export default ColorInfoHeader;
