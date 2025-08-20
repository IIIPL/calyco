import React, { useState } from 'react';
import SEO from '../components/SEO';

const GovernmentPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Government — Calyco"
        description="Tender readiness, compliance downloads, and GeM messaging."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Government & Tenders</h1>
      <p className="text-gray-600 mt-2">GeM-ready messaging, compliance documentation, and institutional supply.</p>

      <div className="mt-8 rounded-2xl border border-[#e5e0d8] p-6 bg-white">
        <h2 className="font-semibold text-[#342347]">Compliance Downloads</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white" href="#">GST Certificate // TODO:</a>
          <a className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white" href="#">MSDS // TODO:</a>
          <a className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white" href="#">ISO // TODO:</a>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e5e0d8] p-6 bg-white">
        <h2 className="font-semibold text-[#342347]">Sectors</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Schools','Hospitals','Rail & Infra','Housing'].map(s => (
            <div key={s} className="p-3 rounded-xl bg-[#F0C85A]/20 text-[#342347] border border-[#F0C85A]/30 text-center">{s}</div>
          ))}
        </div>
      </div>

      <button onClick={() => setOpen(true)} className="mt-8 px-6 py-3 rounded-xl bg-[#493657] text-white font-semibold hover:bg-[#5a4067]">Request Compliance Pack</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-[#342347] text-lg">Compliance Pack</h3>
            <p className="text-sm text-gray-600 mt-2">Enter your email and we will send the documents. // TODO: wire EmailJS</p>
            <input type="email" placeholder="email@org.in" className="mt-4 w-full px-3 py-2 rounded-lg border border-gray-300" />
            <div className="mt-4 flex gap-2 justify-end">
              <button className="px-4 py-2 rounded-lg border" onClick={() => setOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-[#F0C85A] text-[#342347] font-semibold">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentPage;


