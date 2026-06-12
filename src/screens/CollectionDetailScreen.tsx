import { ArrowLeft } from 'lucide-react'
import type { Serie, OwnershipMap } from '../types'
import { ClubListRow, DsEmptyState } from '../components/ds'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'

type Props = {
  serie: Serie
  checks: OwnershipMap
  onItemClick: (key: string) => void
  onToggle: (key: string, owned: boolean) => void
  onBack: () => void
}

export default function CollectionDetailScreen({ serie, checks, onItemClick, onToggle, onBack }: Props) {
  const sorted = smartSortItems(serie.items || [])
  const owned = sorted.filter((it) => !!checks[`${serie.nome}__${it.n ?? ''}`]?.owned).length
  const pct = sorted.length > 0 ? Math.round((owned / sorted.length) * 100) : 0

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 0 var(--s10)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
        padding: 'var(--s3) var(--s4)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button
          type="button"
          onClick={onBack}
          style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text)', flexShrink: 0 }}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{serie.nome}</div>
          <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 1 }}>{owned} de {sorted.length} itens · {pct}%</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--surface-2)' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', transition: 'width .6s ease' }} />
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <div style={{ padding: 'var(--s4)' }}>
          <DsEmptyState icon="PackageOpen" title="Série vazia" subtitle="Nenhuma peça nesta série." />
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', margin: 'var(--s3)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {sorted.map((it) => {
            const key = `${serie.nome}__${it.n ?? ''}`
            const isOwned = !!checks[key]?.owned
            const line = effectiveLine(it)
            const clubCount = Math.floor(Math.random() * 500 + 50)
            return (
              <ClubListRow
                key={key}
                item={{ ...it, line }}
                owned={isOwned}
                clubCount={clubCount}
                onClick={() => onItemClick(key)}
                onToggle={() => onToggle(key, !isOwned)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
