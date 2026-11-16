export function BrazilFlag() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#009b3a" />
      <path d="M10 3.2 17.2 10 10 16.8 2.8 10Z" fill="#fedf00" />
      <circle cx="10" cy="10" r="3.6" fill="#002776" />
      <path d="M6.6 9.3c2.2-.5 4.7-.1 6.7 1.1" stroke="#fff" strokeWidth=".7" fill="none" />
    </svg>
  );
}

export function UKFlag() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <defs>
        <clipPath id="uk-clip">
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#uk-clip)">
        <rect width="20" height="20" fill="#012169" />
        <path d="M0 0 20 20M20 0 0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0 20 20M20 0 0 20" stroke="#c8102e" strokeWidth="1.4" />
        <path d="M10 0v20M0 10h20" stroke="#fff" strokeWidth="6" />
        <path d="M10 0v20M0 10h20" stroke="#c8102e" strokeWidth="3.4" />
      </g>
    </svg>
  );
}
