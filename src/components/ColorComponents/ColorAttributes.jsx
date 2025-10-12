import React from 'react';

const displayValue = (value) => (value && String(value).trim() ? value : '—');

const ColorAttributes = ({ attributes }) => {
  if (!attributes) {
    return null;
  }

  const {
    tone,
    sheen,
    collection,
    layer,
    undertone,
    lightReflectance,
    interiorUse,
    exteriorUse,
    mood,
    contractor,
    designer,
  } = attributes;

  const suitability = [
    { label: 'Contractors', enabled: !!contractor },
    { label: 'Designers', enabled: !!designer },
  ].filter((item) => item.enabled);

  return (
    <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
      <h3 className="text-sm uppercase tracking-wide text-gray-500">Color Details</h3>

      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div>
          <dt className="text-gray-500">Tone</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(tone)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Sheen</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(sheen)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Collection</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(collection)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Layer</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(layer)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Undertone</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(undertone)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Light Reflectance</dt>
          <dd className="mt-1 text-base font-medium text-gray-900">{displayValue(lightReflectance)}</dd>
        </div>
      </dl>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="text-xs uppercase tracking-wide text-gray-500">Interior Use</h4>
          <p className="mt-2 text-base font-medium text-gray-900 leading-relaxed">
            {displayValue(interiorUse)}
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wide text-gray-500">Exterior Use</h4>
          <p className="mt-2 text-base font-medium text-gray-900 leading-relaxed">
            {displayValue(exteriorUse)}
          </p>
        </div>
      </div>

      {mood && (
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-wide text-gray-500">Mood</h4>
          <p className="mt-2 text-base font-medium text-gray-900 leading-relaxed">{mood}</p>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-xs uppercase tracking-wide text-gray-500">Suitable for</h4>
        <div className="mt-3 flex flex-wrap gap-3">
          {suitability.length > 0 ? (
            suitability.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {item.label}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">General use</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorAttributes;
