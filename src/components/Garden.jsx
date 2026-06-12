import React from 'react'
import PlantSVG from './PlantSVG.jsx'

export default function Garden({ habits, onComplete, onSelect, getHabitState }) {
  return (
    <div className="glass" style={{ padding: '40px', display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', minHeight: '320px' }}>
      {habits.length === 0 && <div style={{ color: '#64748b', alignSelf: 'center' }}>Your garden is empty. Add your first habit!</div>}
      {habits.map(habit => {
        const state = getHabitState(habit)
        return (
          <div key={habit.id} style={{ textAlign: 'center' }}>
            <div 
              className={`plant-container ${state.isWilting ? 'wilted' : ''}`}
              onClick={() => onSelect(habit.id)}
              style={{ cursor: 'pointer' }}
            >
              <PlantSVG type={habit.plantType} stage={state.stage} isWilting={state.isWilting} />
            </div>
            <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600 }}>{habit.name}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{state.effectiveStreak} day streak</div>
            <button 
              onClick={(e) => { e.stopPropagation(); onComplete(habit.id) }}
              className="glass"
              style={{ marginTop: '8px', padding: '6px 14px', fontSize: '12px', border: 'none', color: '#e0e7ff', cursor: 'pointer' }}
            >
              Water
            </button>
          </div>
        )
      })}
    </div>
  )
}
