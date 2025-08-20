import React from 'react';

const SEO = ({ title, description, ogType = 'website' }) => {
  React.useEffect(() => {
    if (title) document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDesc) metaDesc.setAttribute('content', description);
      else {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        m.setAttribute('content', description);
        document.head.appendChild(m);
      }
    }
    const ogTypeTag = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogTypeTag.setAttribute('property', 'og:type');
    ogTypeTag.setAttribute('content', ogType);
    if (!ogTypeTag.parentNode) document.head.appendChild(ogTypeTag);
  }, [title, description, ogType]);

  return null;
};

export default SEO;


