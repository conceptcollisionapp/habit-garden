import React from 'react'

export default function PlantSVG({ type, stage, isWilting }) {
  const color = isWilting ? '#64748b' : (type === 'rose' ? '#f472b6' : type === 'sunflower' ? '#fbbf24' : type === 'fern' ? '#4ade80' : '#a78bfa')
  const potColor = '#475569'
  const swayClass = !isWilting ? 'sway' : ''

  const getPlant = () => {
    const s = stage
    if (type === 'rose') {
      return (
        <g>
          <rect x="47" y="95" width="6" height="35" fill="#166534" className={swayClass} />
          {s >= 2 && <ellipse cx="50" cy="85" rx="8" ry="14" fill={color} className={swayClass} />}
          {s >= 3 && <ellipse cx="50" cy="72" rx="10" ry="10" fill={color} className={swayClass} />}
          {s >= 4 && <circle cx="50" cy="65" r="7" fill="#f9a8d4" className={swayClass} />}
          {s >= 5 && <circle cx="50" cy="58" r="5" fill="#fda4af" className="bloom-anim" />}
        </g>
      )
    }
    if (type === 'sunflower') {
      return (
        <g>
          <rect x="47" y="95" width="6" height="35" fill="#166534" className={swayClass} />
          {s >= 2 && <ellipse cx="50" cy="82" rx="9" ry="12" fill="#4ade80" className={swayClass} />}
          {s >= 3 && <circle cx="50" cy="70" r="11" fill={color} className={swayClass} />}
          {s >= 4 && <circle cx="50" cy="70" r="6" fill="#fef08c" className={swayClass} />}
          {s >= 5 && <circle cx="50" cy="70" r="4" fill="#fefce8" className="bloom-anim" />}
        </g>
      )
    }
    if (type === 'fern') {
      return (
        <g>
          <rect x="47" y="95" width="6" height="35" fill="#166534" className={swayClass} />
          {s >= 2 && <path d="M50 90 Q35 75 50 60" stroke={color} strokeWidth="4" fill="none" className={swayClass} />}
          {s >= 3 && <path d="M50 85 Q65 70 50 55" stroke={color} strokeWidth="4" fill="none" className={swayClass} />}
          {s >= 4 && <path d="M50 78 Q30 60 50 45" stroke={color} strokeWidth="3" fill="none" className={swayClass} />}
          {s >= 5 && <circle cx="50" cy="42" r="4" fill="#86efac" className="bloom-anim" />}
        </g>
      )
    }
    // lavender
    return (
      <g>
        <rect x="47" y="95" width="6" height="35" fill="#166534" className={swayClass} />
        {s >= 2 && <ellipse cx="50" cy="80" rx="5" ry="18" fill={color} className={swayClass} />}
        {s >= 3 && <ellipse cx="50" cy="68" rx="6" ry="14" fill={color} className={swayClass} />}
        {s >= 4 && <ellipse cx="50" cy="55" rx="7" ry="12" fill={color} className={swayClass} />}
        {s >= 5 && <ellipse cx="50" cy="45" rx="5" ry="8" fill="#c026d3" className="bloom-anim" />}
      </g>
    )
  }

  return (
    <svg width="100" height="130" viewBox="0 0 100 130">
      <rect x="30" y="110" width="40" height="18" rx="3" fill={potColor} />
      <rect x="35" y="105" width="30" height="8" fill="#334155" />
      {getPlant()}
    </svg>
  )
}
