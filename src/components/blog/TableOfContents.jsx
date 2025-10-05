import React, { useState, useEffect } from 'react';

const TableOfContents = ({ sections }) => {
  const [activeId, setActiveId] = useState('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
        Table of Contents
      </h3>

      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`text-left text-sm transition-colors duration-200 hover:text-yellow-600 ${
                activeId === section.id
                  ? 'text-yellow-600 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
