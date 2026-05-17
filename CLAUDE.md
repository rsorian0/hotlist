# CLAUDE.md — Hotlist: Diecast Club

> Documento de referência técnica para LLMs e novos colaboradores. Atualizado em 2026-05-17.
> Última auditoria: 2026-05-17 — todas as classes `zinc-*` foram substituídas por `neutral-*`; imports de `React.FC` substituídos por `LucideIcon` / `FC` explícito.

---

## Visão geral do projeto

**Hotlist** é um PWA (Progressive Web App) React para colecionadores de diecast (principalmente Hot Wheels). Permite cadastrar coleções de séries, marcar peças como possuídas, consultar preços no Mercado Livre, escanear códigos de barras e sincronizar dados via Firebase Firestore. É uma aplicação de uso pessoal/clube, hospedada no GitHub Pages.

**URL de produção:** Hospedada via GitHub Pages (build em `/docs`).

---

## Stack técnica (versões exatas)

| Dependência | Versão |
|---|---|
| React | 18.2.0 |
| TypeScript | 5.4.5 |
| Vite | 7.1.11 |
| vite-plugin-pwa | 1.2.0 |
| Tailwind CSS | 3.4.19 |
| Firebase | 10.12.0 |
| react-router-dom | 6.23.0 |
| @radix-ui/* | várias ^1.x |
| lucide-react | 1.16.0 |
| @zxing/browser | 0.2.0 (leitor de barcode) |
| class-variance-authority | 0.7.1 |
| clsx + tailwind-merge | 2.1.1 + 3.6.0 |
| sonner | 2.0.7 (instalado mas não usado — o toast é customizado) |

**Node/npm:** Sem versão fixada no `package.json`; use Node 20+.

---

## Estrutura de arquivos comentada

```
hotlist/
├── docs/                  # Build de produção (GitHub Pages serve daqui)
├── public/                # Assets estáticos (logo, ícones PWA)
│   ├── logo-black.svg
│   └── icons/             # icon-192.png, icon-512.png
├── src/
│   ├── App.tsx            # Raiz: orquestra todos os hooks e views
│   ├── main.tsx           # Entry: registra SW + React.createRoot
│   ├── types.ts           # Todos os tipos globais (Serie, Ownership, etc.)
│   ├── vite-env.d.ts      # VITE_ env vars typing
│   ├── styles/
│   │   └── global.css     # CSS global (tokens, reset, shadcn theme via CSS vars)
│   ├── hooks/
│   │   ├── useAuth.ts         # Auth Google (popup / redirect)
│   │   ├── useHotlist.ts      # Estado principal (series + checks + sync)
│   │   ├── useTheme.ts        # light/dark toggle + localStorage persist
│   │   ├── useModal.ts        # Galeria de fotos (keyboard nav)
│   │   ├── useToast.ts        # Toast simples (1.6 s)
│   │   ├── useInstallPrompt.ts # PWA install banner
│   │   └── useBarcodeScanner.ts # ZXing barcode reader
│   ├── components/
│   │   ├── Header.tsx         # Search + avatar + theme toggle
│   │   ├── Sidebar.tsx        # Nav lateral (desktop)
│   │   ├── BottomNav.tsx      # Nav inferior (mobile)
│   │   ├── SeriesList.tsx     # View "Lista" — lista de SeriesGroup
│   │   ├── SeriesGroup.tsx    # Grupo colapsável de uma série
│   │   ├── ItemRow.tsx        # Linha de um item na lista
│   │   ├── GridView.tsx       # View "Grade" — grid de thumbnails
│   │   ├── Stats.tsx          # View "Stats" — métricas e gráficos
│   │   ├── Skeleton.tsx       # Placeholders de loading
│   │   ├── ItemDetail.tsx     # Sheet de detalhes/edição de um item
│   │   ├── AddItemSheet.tsx   # Sheet bottom para adicionar peça
│   │   ├── Modal.tsx          # Lightbox de galeria de fotos
│   │   ├── Toast.tsx          # Notificação flutuante
│   │   ├── EmptyState.tsx     # Estado vazio / sem resultados
│   │   ├── LoginScreen.tsx    # Tela de login Google
│   │   ├── BarcodeScannerModal.tsx # Scanner de câmera (ZXing)
│   │   ├── Editor/
│   │   │   ├── Editor.tsx         # Sheet de gerenciamento (tabs)
│   │   │   ├── CollectionsTab.tsx # Criar/excluir coleções
│   │   │   └── BackupTab.tsx      # Exportar/importar JSON
│   │   └── ui/                # Componentes shadcn/ui (não editar diretamente)
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       └── sheet.tsx
│   ├── lib/
│   │   ├── firebase.ts    # Init Firebase (com persistência offline Firestore)
│   │   ├── storage.ts     # localStorage helpers (load/save) + chaves
│   │   ├── catalog.ts     # Funções Firestore para catálogo comunitário + ML price
│   │   └── utils.ts       # cn() (clsx + twMerge)
│   └── utils/
│       ├── io.ts          # exportJSON, validateImport, mergeSeries
│       ├── line.ts        # LINES[], lineMeta(), effectiveLine()
│       ├── normalize.ts   # normalizeState() para diff Firestore
│       ├── ownership.ts   # toOwnership, isMeaningful, pruneEmpty
│       ├── placeholder.ts # SVG placeholder inline para imagens ausentes
│       ├── rarity.ts      # rarityColorFromName, isTH, isSuperTH (legado)
│       ├── share.ts       # buildShareText, shareChecklist (WhatsApp)
│       ├── sort.ts        # smartSortItems (por linha + número)
│       └── url.ts         # isUrl()
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
├── BRAND.md               # Identidade visual e diretrizes de marca
└── README-DEV.md          # Como rodar em dev
```

---

## Arquitetura de dados (Firestore schema)

### Coleção `users/{uid}/app/hotlist`
Documento único por usuário. Campo `state`:

```typescript
{
  state: {
    series: Array<{
      nome: string          // Nome da coleção (e.g., "HW Art Cars 2024")
      items: Array<{
        n?: string | number // Código de referência (e.g., "FYF84", "132/250")
        barcode?: string    // Código de barras da cartela
        modelo?: string     // Nome do modelo (e.g., "DMC DeLorean")
        img?: string        // URL da imagem
        line?: Line         // Categoria da linha
      }>
    }>
    checks: Record<string, {  // Chave: "{serie.nome}__{item.n || ''}"
      owned: boolean
      qty?: number
      paidPrice?: number
      marketPrice?: number
      packaging?: 'carded' | 'loose'
      acquiredAt?: string   // ISO date
      source?: string
      notes?: string
      wishlist?: boolean
      condition?: string
    }>
  }
  updatedAt: Timestamp
}
```

### Coleção `catalog/{n}` (catálogo comunitário)
```typescript
{
  n: string             // código de referência (document ID)
  modelo: string
  line?: Line
  img?: string
  count: number         // quantas vezes foi contribuído
  marketPrice?: number  // mediana ML
  priceMin?: number
  priceMax?: number
  priceCount?: number
  priceUpdatedAt?: string // ISO date
  priceSource?: string  // 'Mercado Livre' | 'community'
  updatedAt: Timestamp
}
```

### Chaves de localStorage
```typescript
LS_SERIES = 'hw_series_v1'   // Serie[]
LS_CHECKS = 'hw_checklist_v3' // Record<string, Ownership>
LS_TAB    = 'hw_ui_tab_v7'   // 'tab-colecoes' | 'tab-backup'
```
Chave `theme` (string `'light' | 'dark'`) e `catalogSynced_v1` (flag `'1'`) também em localStorage.

---

## State management — como funciona

O app **não usa Redux nem Context API**. O estado vive em `useHotlist` (hook central) e é propagado via props.

### Fluxo de dados:

```
localStorage ──► useHotlist (useState) ──► App.tsx props drilling
                      │
                      ├─► persistSeries/persistChecks (save to LS + setState)
                      │
                      └─► scheduleSync (debounce 600ms) ──► Firestore setDoc
```

### Bootstrap e sync ao logar:

1. `getDoc` busca estado remoto
2. `mergeSeries` mescla local + remoto (local tem precedência nos checks)
3. `onSnapshot` fica ouvindo — ignora writes próprios via `lastPushed.current`
4. Contribui ao catálogo comunitário (uma vez por dispositivo, flag `catalogSynced_v1`)

### Chave de item
Formato: `"${serie.nome}__${item.n || ''}"` — usada como chave em `checks`, como `detailKey` e para operações de CRUD. **Crítico:** se `serie.nome` ou `item.n` mudar, a chave muda e o ownership precisa ser migrado (feito em `moveItemToSerie` e `updateItemMetaByKey`).

---

## Tema e design system (light/dark, neutral palette, Tailwind)

### Paleta principal: `neutral`
O projeto usa **exclusivamente `neutral-*`**. A migração de `zinc` para `neutral` foi concluída — não use `zinc-*` em nenhum novo código. Em light mode os valores são idênticos; em dark mode, `zinc` e `neutral` diferem levemente.

### Padrão de classes dark mode
```tsx
// Correto — neutral em ambos os modos
className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"

// Problemático — zinc sem dark variant (funde com fundo em dark)
className="text-zinc-800"  // ← sem dark:text-neutral-*
```

### CSS vars (shadcn/ui theme — `global.css`)
O shadcn usa variáveis CSS HSL definidas em `:root` e `.dark`. Não edite `global.css` para ajustes pontuais de componentes — use classes Tailwind diretamente nos componentes.

### Dark mode via classe
`tailwind.config.js` usa `darkMode: ["class"]`. O `useTheme` adiciona/remove a classe `dark` em `document.documentElement`.

### Tokens customizados (`global.css`)
O CSS também define `--bg`, `--surface`, `--border`, `--text`, `--muted` etc. para o CSS legado. Os componentes React usam **exclusivamente Tailwind**; essas variáveis são apenas para estilos globais/legado.

---

## Componentes principais — responsabilidade de cada um

| Componente | Responsabilidade |
|---|---|
| `App.tsx` | Orquestra toda a aplicação: instancia hooks, define estado de UI (activeTab, detailKey, filter), faz prop drilling |
| `Header` | Barra superior sticky: input de busca, botão de instalação PWA, toggle de tema, dropdown de usuário |
| `Sidebar` | Nav lateral visível apenas em `md:` (≥768px): tabs de navegação + card de usuário |
| `BottomNav` | Nav inferior fixo visível apenas em mobile (`md:hidden`): 4 tabs |
| `SeriesList` | View "Lista": renderiza `SeriesGroup` para cada série; detecta "sem resultados" antes de renderizar |
| `SeriesGroup` | Grupo colapsável de uma série: mostra contador owned/total, filtra por texto e linha |
| `ItemRow` | Linha de um item: thumbnail lazy com IntersectionObserver, badge de linha, indicador owned |
| `GridView` | View "Grade": grid responsivo de cards com lazy loading e overlay de não-owned |
| `Stats` | View "Stats": ring chart de completude, barras de valorização, top 5, distribuição por linha |
| `Skeleton` | Placeholders animados para loading state: `SkeletonRow`, `SkeletonGroup`, `SkeletonGrid` |
| `ItemDetail` | Sheet lateral de detalhes: edição inline de todos os campos + busca de preço ML + scanner |
| `AddItemSheet` | Sheet bottom para adicionar peça: autocomplete do catálogo, busca por código, scanner |
| `Modal` | Lightbox de galeria: navegação por teclado (←/→/Esc) e clique fora |
| `Toast` | Notificação flutuante centrada, auto-dismiss em 1.6s |
| `EmptyState` | Estado vazio: diferencia "coleção vazia" de "sem resultados para filtro" |
| `LoginScreen` | Tela de autenticação: botão Google, sem rota (condicional em App.tsx) |
| `BarcodeScannerModal` | Modal de câmera via ZXing: lazy loaded, prefere câmera traseira |
| `Editor` | Sheet de gerenciamento com 2 abas (Coleções / Backup); persiste aba ativa em LS |
| `CollectionsTab` | Criar e excluir coleções |
| `BackupTab` | Exportar JSON e importar com modo mesclar/substituir |

---

## Hooks — o que cada hook faz e como usar

### `useAuth`
```typescript
const { user, loading, signIn, signOut } = useAuth()
```
- Escuta `onAuthStateChanged`; gerencia popup vs redirect (standalone PWA usa redirect)
- `loading: true` até primeira resposta do Firebase
- Chama `getRedirectResult` no mount para capturar resultado de redirect

### `useHotlist(user)`
```typescript
const {
  series, checks, syncing,
  addSerie, addItemQuick, deleteSerie,
  updateItemMetaByKey, removeItemByKey,
  moveItemToSerie, setOwnership, importData,
} = useHotlist(user)
```
- Estado principal do app. Persiste em localStorage e sincroniza com Firestore
- `syncing: true` até bootstrap Firestore completar (para mostrar skeletons)
- Todas as mutações: 1) salvam em LS, 2) atualizam state, 3) schedulam sync (debounce 600ms)
- Usa `useRef` para `series` e `checks` para evitar closures stale nos callbacks

### `useTheme`
```typescript
const { theme, toggle } = useTheme()
// theme: 'light' | 'dark'
```
- Inicializa de localStorage; fallback para `prefers-color-scheme`
- Aplica/remove classe `dark` em `document.documentElement`

### `useModal`
```typescript
const { open, index, feed, openModal, closeModal, next, prev } = useModal()
// openModal(feedIndex: number, feed: ModalFeedItem[])
```
- Gerencia lightbox de galeria; navegação por teclado quando aberto

### `useToast`
```typescript
const { message, toast } = useToast()
// toast('mensagem') → aparece por 1.6s
```
- Auto-dismiss com timer. Chamadas repetidas reiniciam o timer.

### `useInstallPrompt`
```typescript
const { canInstall, install } = useInstallPrompt()
```
- Captura evento `beforeinstallprompt`; `canInstall` é true quando disponível e não instalado

### `useBarcodeScanner(onResult)`
```typescript
const { state, error, start, stop } = useBarcodeScanner(onResult)
// state: 'idle' | 'starting' | 'scanning' | 'error'
// start(videoElement) → inicia câmera
```
- Usa `@zxing/browser`; prefere câmera traseira; lazy loaded via `React.lazy`

---

## Utilitários — o que cada util faz

### `utils/line.ts`
- `LINES: LineMeta[]` — array de todas as linhas com label, cor, badge
- `lineMeta(line)` → retorna metadados de uma linha (incluindo linhas legado como `premium-car-culture`)
- `effectiveLine(item)` → detecta linha por `item.line` ou por regex no nome do modelo (TH/STH)

### `utils/sort.ts`
- `smartSortItems(arr)` → ordena por prioridade de linha (RLC > Premium > Silver > Outra > STH > TH > Mainline) depois por número numérico do item (suporta "132/250")
- `parseN(n)` → parse inteligente de números de referência

### `utils/ownership.ts`
- `toOwnership(v)` → normaliza boolean legado ou Ownership
- `migrateOwnershipMap(raw)` → migra mapa antigo (boolean) para novo formato
- `isMeaningful(o)` → true se ownership tem algum dado além de `{owned: false}`
- `pruneEmpty(map)` → remove entradas sem dados

### `utils/io.ts`
- `exportJSON(series, checks)` → gera e baixa arquivo `.json`
- `validateImport(data)` → type guard + validação estrutural
- `mergeSeries(existing, incoming)` → merge sem duplicatas (por `n|modelo`)

### `utils/normalize.ts`
- `normalizeState({series, checks})` → ordena séries e checks deterministicamente para comparação de diff com Firestore
- `stableJSON(v)` → `JSON.stringify` simples (as entradas já estão ordenadas)

### `utils/rarity.ts`
- Funções legado (`rarityColorFromName`, `isTH`, `isSuperTH`) — **não remover** pois podem existir referências antigas, mas prefira `lineMeta(effectiveLine(item))`

### `utils/share.ts`
- `shareChecklist(series, checks, filter)` → usa Web Share API ou fallback WhatsApp

### `utils/placeholder.ts`
- `CAR_PLACEHOLDER` → SVG inline base64 (ícone de imagem genérico cinza escuro)

### `utils/url.ts`
- `isUrl(u)` → valida se string é URL http/https válida

### `lib/catalog.ts`
- `contributeToCatalog(item)` → envia item ao catálogo comunitário Firestore
- `searchCatalog(q)` → busca por prefixo no Firestore (mínimo 2 chars)
- `getCatalogEntry(n)` → busca entrada exata por código
- `getCatalogPrice(n)` → busca preço armazenado
- `fetchMLPrice(n, modelo)` → busca preço no Mercado Livre e salva no catálogo
- `contributeMarketPrice(n, modelo, price)` → usuário contribui preço manualmente

### `lib/storage.ts`
- `load<T>(key, default)` e `save(key, value)` — wrappers try/catch para localStorage

### `lib/firebase.ts`
- Inicializa Firebase com `getApps().length` guard (evita dupla inicialização em HMR)
- Usa `persistentLocalCache` com `persistentSingleTabManager` para offline support
- Exporta `auth` e `db`

---

## Como adicionar uma nova feature (passo a passo)

### Exemplo: Adicionar campo "condição" ao item (já existe no tipo, falta UI)

1. **Verificar o tipo** — `src/types.ts`: `Ownership.condition?: string` já existe
2. **Adicionar campo na UI** — `ItemDetail.tsx`: adicionar `<Input>` para `draft.condition` usando o padrão `update({ condition: value })`
3. **Verificar `isMeaningful`** — `utils/ownership.ts`: já inclui `!!o.condition` ✓
4. **Verificar `normalizeState`** — `utils/normalize.ts`: a função `defined()` remove `undefined`, então campos não definidos são ignorados automaticamente ✓
5. **Verificar migração** — `migrateOwnershipMap` usa `{ ...v }` spread, então novos campos são preservados automaticamente ✓

### Exemplo: Adicionar nova view/tab

1. **Adicionar ao tipo `ActiveTab`** em `App.tsx`
2. **Adicionar ao array `TABS`** em `Sidebar.tsx` e `BottomNav.tsx`
3. **Adicionar condicional** em `App.tsx` no `<main>`
4. **Criar componente** em `src/components/`
5. **Adicionar ao `showFab`** em `App.tsx` se necessário

### Exemplo: Adicionar nova linha (Line type)

1. **`src/types.ts`**: adicionar ao union `Line`
2. **`src/utils/line.ts`**: adicionar entrada em `LINES[]` com `value`, `label`, `short`, `color`, `badgeBg`
3. **`src/utils/sort.ts`**: adicionar ao `LINE_ORDER` com prioridade

---

## Padrões estabelecidos

### Dark mode pattern
Sempre adicionar variante dark explícita para cada classe de cor:
```tsx
// Padrão correto
className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800"

// Para backgrounds de superfície
"bg-neutral-50 dark:bg-neutral-800"   // card secundário
"bg-white dark:bg-neutral-900"         // card primário
"bg-neutral-100 dark:bg-neutral-950"   // background da página
```

### Skeleton pattern
Componentes com loading exibem `<SkeletonGroup>` ou `<SkeletonGrid>` quando `syncing === true` e `series.length === 0`. Após dados chegarem, renderiza normalmente. Não há suspense para o estado principal.

### Sheet pattern (Radix UI)
Sheets usam `hideClose` prop customizada, `side="right"` (desktop) ou `side="bottom"` (mobile) e sempre incluem:
- `paddingBottom: 'env(safe-area-inset-bottom)'` para iPhones com notch
- Estrutura: header fixo + `flex-1 overflow-y-auto` + footer fixo

### Lazy loading de imagens (ItemRow)
Imagens usam `IntersectionObserver` manual com `data-src` para lazy load real:
```tsx
img.src = img.dataset.src || ''
delete img.dataset.src
```

### Chave de item
A chave `${serie.nome}__${item.n || ''}` é o identificador canônico. Mudanças em `nome` ou `n` exigem migração de keys em `checks`.

### Contribuição ao catálogo
Sempre que um item com `n` e `modelo` é criado/atualizado e o usuário está logado, chama `contributeToCatalog(item)` de forma não-bloqueante (`.catch(() => {})`).

---

## Bugs conhecidos / limitações

### 1. `useHotlist` — race condition no bootstrap
`getDoc` e `onSnapshot` podem processar na mesma ordem se Firestore responde rapidamente. O `onSnapshot` tem guarda `hasPendingWrites` e `remoteStr === lastPushed.current`, mas há uma janela onde o snapshot pode sobrescrever mudanças locais feitas antes do `unsub` ser atribuído. **Impacto:** baixo na prática.

### 2. `ItemDetail` — draft state ao reabrir
O `useEffect` reseta `draft` ao mudar `ownership`, mas se o componente for aberto com item diferente antes do efeito rodar, pode exibir dados do item anterior por um frame. **Impacto:** visual apenas.

### 3. `searchCatalog` — busca case-sensitive com prefixo capitalizado
A busca faz `q.charAt(0).toUpperCase() + q.slice(1)` — só encontra modelos cujo nome começa com maiúscula. Se o usuário digitar "dmC delorean", não encontra. **Workaround:** o usuário deve capitalizar a primeira letra.

### 4. `useToast` — sem fila
Múltiplos toasts simultâneos: o segundo substitui o primeiro e reinicia o timer. Se chamado em sequência rápida, apenas o último aparece.

### 5. Offline — criação de itens
A persistência Firestore offline funciona, mas o catálogo (`contributeToCatalog`) faz requests diretos sem retry. Falhas silenciosas (`.catch(() => {})`) significam que contribuições offline são perdidas.

### 6. `BarcodeScannerModal` — deps ESLint ignoradas
O `useEffect` tem `// eslint-disable-line react-hooks/exhaustive-deps` pois `start` e `stop` são funções estáveis mas o linter não consegue verificar. Dependência de `open` é intencional.

### 7. `global.css` — estilos legados
O arquivo tem ~700 linhas de CSS com classes legadas (`.panel`, `.sheet`, `.detail-body`, etc.) que não são mais usadas pelos componentes React (todos usam shadcn/Tailwind). Esses estilos não têm efeito mas aumentam o bundle CSS.

### 8. `rarity.ts` — parcialmente duplicado
`utils/rarity.ts` (`isTH`, `isSuperTH`) duplica lógica de `effectiveLine` em `utils/line.ts`. Usar sempre `effectiveLine` + `lineMeta`. O arquivo não é importado em nenhum componente atual.

### 9. Dependências não utilizadas em `package.json`
`react-router-dom` (^6.23.0) e `sonner` (^2.0.7) estão listadas mas não são importadas em nenhum arquivo do projeto. São seguras para remover.

---

## Deploy (GitHub Pages, build para `docs/`)

### Variáveis de ambiente necessárias
Criar `.env.local` na raiz:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Build
```bash
npm run build
# Gera: docs/ (HTML + assets + SW)
```

### Deploy
```bash
git add docs/
git commit -m "build: update production"
git push
# GitHub Pages serve a branch main a partir de /docs
```

### PWA / Service Worker
- `vite-plugin-pwa` com `registerType: 'autoUpdate'`
- `main.tsx` ouve `controllerchange` e faz `window.location.reload()` ao atualizar SW
- Workbox cacheia JS/CSS/HTML/PNG; Firestore usa `NetworkFirst`; avatares Google usam `CacheFirst`

### Domínio autorizado no Firebase
Para cada domínio onde o app é acessado, adicionar em **Firebase Console → Authentication → Settings → Authorized domains**.

---

## Sistema de preços Mercado Livre

Implementado em `src/lib/catalog.ts`.

### Fluxo ao abrir `ItemDetail`
1. `getCatalogPrice(n)` → busca preço em `catalog/{n}` no Firestore
2. Se preço existe e **não está stale** (< 7 dias): exibe imediatamente
3. Se preço existe e **está stale**: exibe imediatamente + dispara re-fetch em background
4. Se **não existe preço**: chama `fetchMLPrice` de imediato (mostra spinner)

### `fetchMLPrice(n, modelo)`
```
GET https://api.mercadolibre.com/sites/MLB/search?q=hot+wheels+{n}&limit=20
```
- Filtra resultados fora da faixa R$ 8–600
- Se < 2 resultados, faz fallback buscando por `modelo`
- Calcula mediana, mín, máx dos preços filtrados
- Salva em `catalog/{n}` no Firestore (`priceSource: 'Mercado Livre'`)
- TTL: 7 dias (`PRICE_TTL_DAYS = 7`)

### Contribuição de preço pela comunidade
Quando o usuário preenche "Valor de mercado" e sai do campo, `contributeMarketPrice` salva em `catalog/{n}` com `priceSource: 'community'`.

---

## Regras de segurança Firestore recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Dados do usuário: só o próprio usuário
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // Catálogo: qualquer autenticado pode ler/escrever
    match /catalog/{n} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```
