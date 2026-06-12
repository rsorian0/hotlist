export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s2) var(--s3)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', background: 'var(--surface-2)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 8, width: 48, background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', animation: 'pulse 2s infinite' }} />
        <div style={{ height: 12, width: 144, background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', animation: 'pulse 2s infinite' }} />
      </div>
    </div>
  )
}

export function SkeletonGroup({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 'var(--s2)' }}>
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  )
}

export function SkeletonGridCard() {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div style={{ aspectRatio: '1', background: 'var(--surface-2)', animation: 'pulse 2s infinite' }} />
      <div style={{ padding: '7px 8px 9px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 10, width: '80%', background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', animation: 'pulse 2s infinite' }} />
        <div style={{ height: 8, width: '60%', background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', animation: 'pulse 2s infinite' }} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div style={{ padding: 'var(--s3)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s2)' }}>
        {Array.from({ length: count }).map((_, i) => <SkeletonGridCard key={i} />)}
      </div>
    </div>
  )
}
