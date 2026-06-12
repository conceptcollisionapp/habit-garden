import React, { useState, useEffect } from 'react'
import Garden from './components/Garden.jsx'
import AddHabitModal from './components/AddHabitModal.jsx'
import HabitDetail from './components/HabitDetail.jsx'

const PLANT_TYPES = ['rose', 'sunflower', 'fern', 'lavender']

function getToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function getDaysDiff(date1, date2) {
  const [y1,m1,d1] = date1.split('-').map(Number)
  const [y2,m2,d2] = date2.split('-').map(Number)
  return Math.floor((Date.UTC(y1,m1-1,d1) - Date.UTC(y2,m2-1,d2)) / 86400000)
}

function getHabitState(habit) {
  if (!habit.lastCompleted) return { effectiveStreak: 0, stage: 1, isWilting: false, daysMissed: 0 }
  const today = getToday()
  const diff = getDaysDiff(today, habit.lastCompleted)
  const isWilting = diff >= 3
  const effectiveStreak = isWilting ? 0 : habit.streak
  const stage = isWilting ? 1 : (effectiveStreak >= 30 ? 5 : effectiveStreak >= 14 ? 4 : effectiveStreak >= 7 ? 3 : effectiveStreak >= 3 ? 2 : 1)
  return { effectiveStreak, stage, isWilting, daysMissed: Math.max(0, diff-1) }
}

function getGardenHealth(habits) {
  if (!habits.length) return 100
  const total = habits.reduce((sum, h) => sum + Math.min(getHabitState(h).effectiveStreak / 30, 1), 0)
  return Math.round((total / habits.length) * 100)
}

export default function App() {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('habitGarden')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    localStorage.setItem('habitGarden', JSON.stringify(habits))
  }, [habits])

  const addHabit = (name, plantType) => {
    const newHabit = {
      id: crypto.randomUUID(), name, plantType,
      streak: 0, longestStreak: 0,
      lastCompleted: null, createdAt: getToday()
    }
    setHabits([...habits, newHabit])
    setShowModal(false)
  }

  const completeHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id !== id) return h
      const today = getToday()
      if (h.lastCompleted === today) return h
      if (h.lastCompleted && getDaysDiff(today, h.lastCompleted) < 0) return h
      const diff = h.lastCompleted ? getDaysDiff(today, h.lastCompleted) : 1
      const newStreak = diff >= 3 ? 1 : (diff === 1 ? h.streak + 1 : 1)
      return {
        ...h,
        streak: newStreak,
        longestStreak: Math.max(h.longestStreak, newStreak),
        lastCompleted: today
      }
    }))
  }

  const selectedHabit = habits.find(h => h.id === selectedId) || null
  const health = getGardenHealth(habits)

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-1px' }}>Habit Garden</h1>
          <p style={{ color: '#94a3b8', marginTop: '4px' }}>Grow your habits. Watch them bloom.</p>
        </div>
        <div className="glass glow" style={{ padding: '16px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>GARDEN HEALTH</div>
          <div style={{ fontSize: '42px', fontWeight: 700, color: '#67e8f9' }}>{health}%</div>
        </div>
      </header>

      <Garden habits={habits} onComplete={completeHabit} onSelect={setSelectedId} getHabitState={getHabitState} />
      <button onClick={() => setShowModal(true)} className="glass glow" style={{ marginTop: '40px', padding: '16px 32px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', border: 'none', color: '#e0e7ff' }}>+ Add New Habit</button>

      {showModal && <AddHabitModal onAdd={addHabit} onClose={() => setShowModal(false)} plantTypes={PLANT_TYPES} />}
      {selectedHabit && <HabitDetail habit={selectedHabit} onClose={() => setSelectedId(null)} onComplete={completeHabit} getHabitState={getHabitState} getToday={getToday} />}
    </div>
  )
}
