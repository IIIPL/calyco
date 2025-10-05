import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaLink } from 'react-icons/fa';

const ShareButtons = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    alert('Link copied to clipboard!');
  };

  const buttons = [
    { name: 'Facebook', icon: FaFacebookF, href: shareLinks.facebook, color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: FaTwitter, href: shareLinks.twitter, color: 'hover:bg-sky-500' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: shareLinks.linkedin, color: 'hover:bg-blue-700' },
    { name: 'WhatsApp', icon: FaWhatsapp, href: shareLinks.whatsapp, color: 'hover:bg-green-500' },
    { name: 'Email', icon: FaEnvelope, href: shareLinks.email, color: 'hover:bg-gray-600' }
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-gray-700">Share:</span>

      {buttons.map((button) => (
        <a
          key={button.name}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 ${button.color} hover:text-white transition-colors duration-200`}
          aria-label={`Share on ${button.name}`}
        >
          <button.icon className="w-4 h-4" />
        </a>
      ))}

      <button
        onClick={copyToClipboard}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200"
        aria-label="Copy link"
      >
        <FaLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ShareButtons;
