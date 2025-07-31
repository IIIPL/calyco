import { Link } from 'react-router-dom';

export const Button = ({ to, children, onClick, type = "button", disabled = false }) => {
    const handleClick = (e) => {
        if (onClick) onClick(e);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const baseClass = `text-sm md:text-base text-[#493657] rounded-full bg-gradient-to-r from-[#f3de79] to-[#a57f24] text-black font-semibold px-6 py-3 shadow-md hover:shadow-lg active:scale-95 transition-transform duration-300 self-start hover:scale-110  `;
    const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "";

    if (to) {
        return (
            <Link
                to={to}
                onClick={handleClick}
                className={`${baseClass} ${disabledClass}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`${baseClass} ${disabledClass}`}
        >
            {children}
        </button>
    );
};
