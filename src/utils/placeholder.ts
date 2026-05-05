const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#161b22"/>
  <rect x="16" y="18" width="32" height="26" rx="3" fill="none" stroke="#30363d" stroke-width="1.5"/>
  <circle cx="24" cy="26" r="2.5" fill="#30363d"/>
  <path d="M16 36 L24 28 L30 34 L36 29 L48 40" fill="none" stroke="#30363d" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`

export const CAR_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
