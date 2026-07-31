interface MaskIconProps {
  filled?: boolean
}

export function MaskIcon({ filled = true }: MaskIconProps) {
  return <span className={`mask-icon ${filled ? 'is-filled' : ''}`} aria-hidden="true"><i /><b /></span>
}