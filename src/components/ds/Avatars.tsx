interface AvatarsProps {
  people?: string[]
}

export function Avatars({ people = ['M', 'J', 'R'] }: AvatarsProps) {
  return (
    <div style={{ display: 'flex', flexShrink: 0 }}>
      {people.map((p, i) => (
        <span key={i} style={{
          width: 16, height: 16, borderRadius: '50%', background: 'var(--surface-2)',
          border: '1.5px solid var(--surface)', marginLeft: i ? -5 : 0, fontSize: 7,
          fontWeight: 700, display: 'grid', placeItems: 'center', color: 'var(--muted)',
        }}>{p}</span>
      ))}
    </div>
  )
}
