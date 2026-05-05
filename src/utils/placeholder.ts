// viewBox quadrado para funcionar bem no thumb 64×64 e no grid card 1:1
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <!-- background -->
  <rect width="80" height="80" fill="#0b0f14"/>

  <!-- ground strip -->
  <rect x="0" y="66" width="80" height="14" fill="#0d1117"/>

  <!-- car shadow -->
  <ellipse cx="40" cy="67" rx="29" ry="2.5" fill="#000" opacity=".55"/>

  <!-- ── CARROCERIA ── -->
  <!-- corpo principal -->
  <path d="M5 44 L5 35 Q6 30 12 27 L23 21 L27 15 L53 15 L57 21 L68 27 Q74 30 75 35 L75 44 Z"
        fill="#161b22" stroke="#30363d" stroke-width="1.5" stroke-linejoin="round"/>

  <!-- shoulder line / listra accent -->
  <path d="M12 27 L23 21 L57 21 L68 27"
        fill="none" stroke="#1f6feb" stroke-width="2" stroke-linecap="round" opacity=".65"/>

  <!-- vidro -->
  <path d="M27 15 L24 23 L56 23 L53 15 Z"
        fill="#0c1828" stroke="#1e2d42" stroke-width="1"/>

  <!-- divisor de vidro -->
  <line x1="40" y1="15" x2="40" y2="23" stroke="#1e2d42" stroke-width="1"/>

  <!-- aro de janela highlight -->
  <path d="M27 15 L24 23" stroke="#263142" stroke-width="0.8" opacity=".6"/>
  <path d="M53 15 L56 23" stroke="#263142" stroke-width="0.8" opacity=".6"/>

  <!-- recorte do arco de roda esquerdo -->
  <ellipse cx="21" cy="44" rx="11" ry="6" fill="#0b0f14"/>
  <!-- recorte do arco de roda direito -->
  <ellipse cx="59" cy="44" rx="11" ry="6" fill="#0b0f14"/>

  <!-- soleira / detalhe inferior -->
  <rect x="31" y="42" width="18" height="2" rx="1" fill="#21262d"/>

  <!-- ── RODAS ── -->
  <!-- pneu esquerdo -->
  <circle cx="21" cy="57" r="11" fill="#0d1117" stroke="#30363d" stroke-width="2.5"/>
  <!-- aro esquerdo -->
  <circle cx="21" cy="57" r="6.5" fill="#1c2128" stroke="#656d76" stroke-width="1.2"/>
  <!-- spokes esquerdo (5 raios) -->
  <line x1="21" y1="50.5" x2="21" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="26.7" y1="53.1" x2="21" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="24.4" y1="59.9" x2="21" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="17.6" y1="59.9" x2="21" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="15.3" y1="53.1" x2="21" y2="57" stroke="#8b949e" stroke-width="1"/>
  <!-- cubo esquerdo -->
  <circle cx="21" cy="57" r="2" fill="#8b949e"/>

  <!-- pneu direito -->
  <circle cx="59" cy="57" r="11" fill="#0d1117" stroke="#30363d" stroke-width="2.5"/>
  <!-- aro direito -->
  <circle cx="59" cy="57" r="6.5" fill="#1c2128" stroke="#656d76" stroke-width="1.2"/>
  <!-- spokes direito (5 raios) -->
  <line x1="59" y1="50.5" x2="59" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="64.7" y1="53.1" x2="59" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="62.4" y1="59.9" x2="59" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="55.6" y1="59.9" x2="59" y2="57" stroke="#8b949e" stroke-width="1"/>
  <line x1="53.3" y1="53.1" x2="59" y2="57" stroke="#8b949e" stroke-width="1"/>
  <!-- cubo direito -->
  <circle cx="59" cy="57" r="2" fill="#8b949e"/>

  <!-- ── FARÓIS ── -->
  <!-- farol dianteiro (direito = frente) -->
  <rect x="71" y="31" width="4" height="7" rx="1.5" fill="#1f6feb" opacity=".9"/>
  <rect x="71" y="31" width="4" height="7" rx="1.5" fill="#1f6feb" filter="url(#glow)" opacity=".4"/>

  <!-- lanterna traseira (esquerdo = traseira) -->
  <rect x="5" y="31" width="4" height="7" rx="1.5" fill="#dc2626" opacity=".7"/>

  <!-- definição de glow (farol) -->
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
</svg>`

export const CAR_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
