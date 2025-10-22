# Hotlist – Ambiente de Dev rápido

Este pacote foi ajustado para que o **dev** rode em `/` e o **build** publique em `/hotlist/` (GitHub Pages).

## Rodar no dev
```bash
npm install
npm run dev
# abra: http://localhost:5173/
```

## Build e publicação (gera em `docs/`)
```bash
npm run build
```

### O que foi alterado
- `vite.config.ts`: `base` dinâmico (dev = `/`, build = `/hotlist/`).
- `src/main.tsx`: `BrowserRouter` com `basename` dinâmico.
- `index.html` (raiz): carrega `src/main.tsx` (sem assets de build).

_Gerado em 2025-10-22T11:22:35_
