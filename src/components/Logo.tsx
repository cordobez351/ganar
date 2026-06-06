interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 28, className = '' }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="ganar"
      width={size}
      height={size}
      className={className}
    />
  )
}
