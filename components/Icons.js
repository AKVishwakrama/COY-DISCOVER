// Small inline SVG icons (no icon library needed).
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const HomeIcon = () => (<svg {...base}><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></svg>);
export const SparkIcon = () => (<svg {...base}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z" /></svg>);
export const CloseIcon = () => (<svg {...base} strokeWidth={2.4}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const HeartIcon = ({ filled }) => (<svg {...base} fill={filled ? 'currentColor' : 'none'} strokeWidth={2}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>);
export const LockIcon = () => (<svg {...base} width={13} height={13} strokeWidth={2.2}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
export const PinIcon = () => (<svg {...base} width={14} height={14}><path d="M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></svg>);
export const EnvelopeIcon = () => (
  <svg viewBox="0 0 120 90" width="120" height="90" fill="none" aria-hidden>
    <rect x="6" y="14" width="108" height="68" rx="10" stroke="currentColor" strokeWidth="2.5" />
    <path d="M10 22l50 34 50-34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="60" cy="56" r="11" fill="var(--wax)" />
    <path d="M60 62s-6-3.4-6-7.4a3.2 3.2 0 0 1 6-1.6 3.2 3.2 0 0 1 6 1.6c0 4-6 7.4-6 7.4z" fill="#fff" />
  </svg>
);
