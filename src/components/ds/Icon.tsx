import { icons, type LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  name: string
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons]
  if (!LucideIcon) return null
  return <LucideIcon size={size} {...rest} />
}
