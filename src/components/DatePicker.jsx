import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const inputCls = 'w-full rounded-xl border border-[#0F1221]/12 bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent transition-shadow';

const DatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState({ top: 0, left: 0, width: 0 });
  const btnRef  = useRef(null);
  const wrapRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => {
    const base = value ? new Date(`${value}T00:00:00`) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const openCalendar = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 6, left: r.left + window.scrollX, width: r.width });
    }
    setOpen(o => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const selected = value ? new Date(`${value}T00:00:00`) : null;

  const pick = (day) => {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    setOpen(false);
  };

  const firstVisibleDay = atCurrentMonth ? today.getDate() : 1;
  const adjustedOffset  = new Date(year, month, firstVisibleDay).getDay();

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        type="button"
        onClick={openCalendar}
        className={`${inputCls} text-left flex items-center justify-between gap-2 ${value ? '' : 'text-[#0F1221]/30'}`}
      >
        <span>{value ? fmtDate(value) : 'Select visit date'}</span>
        <Calendar className="w-4 h-4 flex-shrink-0 text-[#0F1221]/35" />
      </button>

      {open && createPortal(
        <div
          ref={wrapRef}
          style={{ position: 'absolute', top: pos.top, left: pos.left, width: Math.max(pos.width, 280), zIndex: 9999 }}
          className="bg-white rounded-2xl border border-[#0F1221]/8 shadow-[0_8px_30px_rgba(15,18,33,0.12)] p-4"
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#0F1221]">{MONTHS[month]} {year}</p>
            <div className="flex gap-1">
              <button type="button" onClick={() => setView(new Date(year, month - 1, 1))}
                disabled={atCurrentMonth} aria-label="Previous month"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${atCurrentMonth ? 'text-[#0F1221]/15 cursor-not-allowed' : 'text-[#0F1221]/55 hover:bg-[#493657]/8 hover:text-[#493657]'}`}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => setView(new Date(year, month + 1, 1))}
                aria-label="Next month"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#0F1221]/55 hover:bg-[#493657]/8 hover:text-[#493657] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-center text-[10px] font-bold uppercase tracking-wide text-[#0F1221]/30 py-1">{w}</span>
            ))}
          </div>

          {/* Days — past dates hidden, only show from today onward */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: adjustedOffset }).map((_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: daysInMonth - firstVisibleDay + 1 }, (_, i) => firstVisibleDay + i).map((day) => {
              const date = new Date(year, month, day);
              const isSelected = selected && date.getTime() === selected.getTime();
              const isToday    = date.getTime() === today.getTime();
              return (
                <button key={day} type="button" onClick={() => pick(day)}
                  className={`mx-auto w-9 h-9 rounded-full text-[13px] flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#493657] text-white font-bold shadow-[0_3px_10px_rgba(73,54,87,0.35)]'
                      : isToday
                        ? 'font-bold text-[#493657] ring-1 ring-[#F0C85A] hover:bg-[#493657]/8'
                        : 'text-[#0F1221]/75 font-medium hover:bg-[#493657]/8 hover:text-[#493657]'
                  }`}>
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-3 pt-3 border-t border-[#0F1221]/6 text-[11px] text-[#0F1221]/70 font-light">
            Visits available all days, 9 AM – 7 PM
          </p>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DatePicker;
export { fmtDate };
