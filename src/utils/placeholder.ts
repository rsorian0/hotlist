const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60">
  <rect width="80" height="60" fill="#0b0f14"/>
  <g stroke="#263142" fill="none">
    <!-- body -->
    <path d="M8 36 L8 42 Q8 46 12 46 L68 46 Q72 46 72 42 L72 36 L60 36 L52 22 L28 22 L20 36 Z" fill="#161b22" stroke-width="1.5"/>
    <!-- roof -->
    <path d="M28 22 L32 14 L48 14 L52 22" fill="#0d1117" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- windows -->
    <path d="M30 22 L33 15 L47 15 L50 22 Z" fill="#0f1a2e" stroke="#1e2d42" stroke-width="1"/>
    <!-- wheels -->
    <circle cx="22" cy="46" r="7" fill="#0b0f14" stroke="#30363d" stroke-width="2"/>
    <circle cx="58" cy="46" r="7" fill="#0b0f14" stroke="#30363d" stroke-width="2"/>
    <circle cx="22" cy="46" r="3" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <circle cx="58" cy="46" r="3" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <!-- headlights -->
    <rect x="68" y="34" width="3" height="5" rx="1" fill="#ffd600" opacity=".4"/>
    <rect x="9" y="34" width="3" height="5" rx="1" fill="#e03030" opacity=".4"/>
  </g>
</svg>`

export const CAR_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
