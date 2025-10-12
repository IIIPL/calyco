import React from 'react';

const PRODUCT_TYPE_OPTIONS = [
  {
    value: 'Interior Latex Paint',
    title: 'Interior Latex Paint',
    description: 'Premium interior paint for walls & ceilings',
  },
  {
    value: 'Exterior Latex Paint',
    title: 'Exterior Latex Paint',
    description: 'Weather-resistant exterior coating',
  },
  {
    value: 'Waterproofing Sealer',
    title: 'Waterproofing Sealer',
    description: 'Multi-surface protection & sealing',
  },
];

const ProductTypeSelector = ({ selectedType, onChange }) => (
  <div className="p-6 md:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
    <h3 className="text-sm uppercase tracking-wide text-gray-500">Choose Product Type</h3>
    <div className="mt-5 space-y-3">
      {PRODUCT_TYPE_OPTIONS.map((option) => {
        const isSelected = option.value === selectedType;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${
              isSelected
                ? 'border-gray-900 bg-gray-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              name="product-type"
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="mt-1 h-4 w-4"
            />
            <span>
              <span className="block text-base font-semibold text-gray-900">{option.title}</span>
              <span className="mt-1 block text-sm text-gray-600">{option.description}</span>
            </span>
          </label>
        );
      })}
    </div>
  </div>
);

export default ProductTypeSelector;
