import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const GovernmentPage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const modalRef = useRef(null);
  const firstFocusRef = useRef(null);
  const titleId = 'compliance-modal-title';

  // Escape key + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    setTimeout(() => firstFocusRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSend = () => {
    // Redirect to contact page — compliance pack requests are handled by the sales team
    setOpen(false);
    window.location.href = '/contact';
  };

  return (
    <div className="pt-20 px-6 md:px-12 max-w-7xl mx-auto pb-20">
      <SEO
        title="Government & Tenders | Calyco"
        description="Calyco supplies paints and coatings for government institutions, tenders, and GeM procurement. Compliance documentation available on request."
        url="https://calycopaints.com/government"
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Government & Tenders</h1>
      <p className="text-gray-600 mt-2">GeM-ready supply, compliance documentation, and institutional pricing.</p>

      <div className="mt-8 rounded-2xl border border-[#e5e0d8] p-6 bg-white">
        <h2 className="font-semibold text-[#342347] text-lg">Compliance Documents</h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          GST Certificate, MSDS, and ISO documents are available upon request for verified institutional buyers.
        </p>
        <Link
          to="/contact"
          className="inline-block px-5 py-2.5 rounded-xl bg-[#493657] text-white text-sm font-semibold hover:bg-[#5a4067] transition-colors"
        >
          Request Documents
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e5e0d8] p-6 bg-white">
        <h2 className="font-semibold text-[#342347] text-lg">Sectors We Serve</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Schools', 'Hospitals', 'Rail & Infra', 'Housing'].map(s => (
            <div key={s} className="p-3 rounded-xl bg-[#F0C85A]/20 text-[#342347] border border-[#F0C85A]/30 text-center font-medium text-sm">{s}</div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-8 px-6 py-3 rounded-xl bg-[#493657] text-white font-semibold hover:bg-[#5a4067] transition-colors"
      >
        Request Compliance Pack
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          aria-hidden="false"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 id={titleId} className="font-semibold text-[#342347] text-lg">Request Compliance Pack</h3>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email and our sales team will send the compliance documents within 1 business day.
            </p>
            <label htmlFor="compliance-email" className="block text-sm font-medium text-[#342347] mt-4 mb-1">
              Official email address
            </label>
            <input
              ref={firstFocusRef}
              id="compliance-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="yourname@organization.in"
              autoComplete="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#493657]"
            />
            <div className="mt-4 flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#F0C85A] text-[#342347] font-semibold hover:bg-[#e6bb4a] transition-colors"
                onClick={handleSend}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentPage;
