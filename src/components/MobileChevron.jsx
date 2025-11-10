const MobileChevron = ({ open = false, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-4 h-4 text-[#493657] transition-transform duration-200 ${open ? "rotate-90" : ""} ${className}`}
    aria-hidden="true"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export default MobileChevron;
