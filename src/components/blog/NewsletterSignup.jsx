import React, { useState } from 'react';

const NewsletterSignup = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gdprConsent) {
      alert('Please accept the privacy policy to subscribe.');
      return;
    }

    setStatus('loading');

    // Simulate API call - replace with your actual newsletter service
    setTimeout(() => {
      console.log('Newsletter signup:', email);
      setStatus('success');
      setEmail('');
      setGdprConsent(false);

      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  if (variant === 'inline') {
    return (
      <div className="my-12 p-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get Color Inspiration Weekly
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Expert tips, new colors, and exclusive offers delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
              />
              <span>
                I agree to receive marketing emails and accept the{' '}
                <a href="/policies/privacy" className="text-yellow-700 hover:underline">
                  privacy policy
                </a>
              </span>
            </label>

            {status === 'success' && (
              <p className="text-sm text-green-600 font-medium">
                ✓ Successfully subscribed! Check your inbox.
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Default footer variant
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Color Inspiration Weekly
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Expert tips, new colors, and exclusive offers
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          <label className="flex items-start justify-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
            />
            <span>
              I agree to receive marketing emails and accept the{' '}
              <a href="/policies/privacy" className="text-yellow-700 hover:underline">
                privacy policy
              </a>
            </span>
          </label>

          {status === 'success' && (
            <p className="text-sm text-green-600 font-medium">
              ✓ Successfully subscribed! Check your inbox.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
