'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import {
  Sparkles, Clock, Target, Zap, RefreshCw,
  CheckCircle2, Info
} from 'lucide-react'
import './DailyPlan.css'

const timeOptions = [
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
]

const goalOptions = ['Placements', 'Beginner DSA', 'Interview Prep', 'Contest Improvement']
const energyOptions = [
  { label: 'Low 😴', value: 'low' },
  { label: 'Medium 💪', value: 'medium' },
  { label: 'High 🔥', value: 'high' },
]

const plans: Record<number, any[]> = {
  30: [
    { emoji: '🔁', task: 'Quick revise Binary Search edges', time: '15 min', tag: 'Weak Area', reason: 'Low accuracy on 3 recent problems' },
    { emoji: '⚡', task: 'Solve 2 easy array problems', time: '15 min', tag: 'Practice', reason: 'Momentum building' },
  ],
  60: [
    { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', tag: 'Weak Area', reason: 'Failed boundary problems twice' },
    { emoji: '📝', task: 'Solve 2 Prefix Sum problems', time: '25 min', tag: 'Core Pattern', reason: 'Next in your roadmap' },
    { emoji: '⚡', task: 'Quick weak area drill', time: '15 min', tag: 'Revision', reason: 'Spaced repetition due today' },
  ],
  120: [
    { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', tag: 'Weak Area', reason: 'Failed boundary problems twice' },
    { emoji: '📝', task: 'Solve 3 Prefix Sum problems', time: '35 min', tag: 'Core Pattern', reason: 'Next pattern in Arrays roadmap' },
    { emoji: '🎥', task: 'Watch Sliding Window video', time: '25 min', tag: 'Next Topic', reason: 'Introduces next Arrays subtopic' },
    { emoji: '⚡', task: 'Retry weak questions', time: '40 min', tag: 'Revision', reason: '3 problems from revision queue' },
  ],
  180: [
    { emoji: '🔁', task: 'Deep revise Binary Search', time: '30 min', tag: 'Weak Area', reason: 'Failed boundary problems twice' },
    { emoji: '📝', task: 'Solve 5 Array core problems', time: '50 min', tag: 'Core Pattern', reason: 'Arrays roadmap — core patterns' },
    { emoji: '🎓', task: 'Learn Sliding Window in depth', time: '45 min', tag: 'Next Topic', reason: 'Prerequisite for 2-pointer problems' },
    { emoji: '⚡', task: 'Retry 3 weak area problems', time: '35 min', tag: 'Revision', reason: 'Spaced repetition queue' },
    { emoji: '🏁', task: 'Timed 20-min contest set', time: '20 min', tag: 'Contest Prep', reason: 'Contest Improvement goal activated' },
  ],
}

const tagColors: Record<string, string> = {
  'Weak Area': 'error',
  'Core Pattern': 'primary',
  'Next Topic': 'secondary',
  'Revision': 'warning',
  'Practice': 'muted',
  'Contest Prep': 'error',
}

export default function DailyPlan() {
  const router = useRouter()
  const [selectedTime, setSelectedTime] = useState(120)
  const [selectedGoal, setSelectedGoal] = useState('Placements')
  const [selectedEnergy, setSelectedEnergy] = useState('medium')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const handleGenerate = () => {
    setLoading(true)
    setGenerated(false)
    setCompletedTasks([])
    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
    }, 1400)
  }

  const toggleTask = (i: number) => {
    setCompletedTasks(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const currentPlan = plans[selectedTime] || plans[120]
  const totalTime = currentPlan.reduce((sum, t) => {
    const mins = parseInt(t.time)
    return sum + mins
  }, 0)

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar title="Daily Plan" subtitle="AI-powered personalized study schedule" />
        <div className="page-content">

          <div className="dp-layout">

            {/* INPUT PANEL */}
            <div className="dp-input-panel card">
              <div className="dp-panel-title">
                <Sparkles size={18} className="dp-sparkle" />
                Configure Your Plan
              </div>

              {/* Time */}
              <div className="dp-input-group">
                <label className="dp-label"><Clock size={14} /> Available Time</label>
                <div className="dp-chips">
                  {timeOptions.map(opt => (
                    <button
                      key={opt.value}
                      className={`dp-chip ${selectedTime === opt.value ? 'active' : ''}`}
                      onClick={() => { setSelectedTime(opt.value); setGenerated(false); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="dp-input-group">
                <label className="dp-label"><Target size={14} /> Your Goal</label>
                <div className="dp-chips dp-chips-col">
                  {goalOptions.map(g => (
                    <button
                      key={g}
                      className={`dp-chip ${selectedGoal === g ? 'active' : ''}`}
                      onClick={() => { setSelectedGoal(g); setGenerated(false); }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div className="dp-input-group">
                <label className="dp-label"><Zap size={14} /> Energy Level</label>
                <div className="dp-chips">
                  {energyOptions.map(e => (
                    <button
                      key={e.value}
                      className={`dp-chip ${selectedEnergy === e.value ? 'active' : ''}`}
                      onClick={() => { setSelectedEnergy(e.value); setGenerated(false); }}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`dp-generate-btn ${loading ? 'loading' : ''}`}
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <><RefreshCw size={16} className="spin" /> Generating your plan...</>
                ) : (
                  <><Sparkles size={16} /> Generate Today's Plan</>
                )}
              </button>

              {/* Why section */}
              {generated && (
                <div className="dp-why-section">
                  <div className="dp-why-title"><Info size={14} /> Why these tasks?</div>
                  <div className="dp-why-list">
                    <div className="dp-why-item">
                      <div className="dp-why-dot red" />
                      <span>Binary Search has 2 recent failed problems</span>
                    </div>
                    <div className="dp-why-item">
                      <div className="dp-why-dot purple" />
                      <span>Prefix Sum is next in your Arrays roadmap</span>
                    </div>
                    <div className="dp-why-item">
                      <div className="dp-why-dot yellow" />
                      <span>3 topics due for spaced revision today</span>
                    </div>
                    <div className="dp-why-item">
                      <div className="dp-why-dot green" />
                      <span>Sliding Window builds on completed subtopics</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative */}
              {generated && (
                <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  onClick={() => { setGenerated(false); setTimeout(() => setGenerated(true), 800); setCompletedTasks([]); }}>
                  <RefreshCw size={13} /> Generate Alternative Plan
                </button>
              )}
            </div>

            {/* OUTPUT PANEL */}
            <div className="dp-output">
              {!generated && !loading && (
                <div className="dp-empty">
                  <div className="dp-empty-icon"><Sparkles size={40} /></div>
                  <h3>Your Plan Awaits</h3>
                  <p>Configure your available time, goal, and energy level — then hit Generate to get your personalized study plan.</p>
                </div>
              )}

              {loading && (
               <div className="dp-loading">
                  <div className="dp-loading-spinner" />
                  <p>Analyzing your weak areas, revision queue, and roadmap progress...</p>
                </div>
              )}

              {generated && !loading && (
                <div className="dp-plan-output">
                  <div className="dp-output-header">
                    <div>
                      <h2>Today's Study Plan</h2>
                      <p>{selectedGoal} • {timeOptions.find(t => t.value === selectedTime)?.label} • {selectedEnergy.charAt(0).toUpperCase() + selectedEnergy.slice(1)} energy</p>
                    </div>
                    <div className="dp-output-meta">
                      <div className="badge badge-primary">{currentPlan.length} tasks</div>
                      <div className="badge badge-secondary">{totalTime} min total</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="dp-timeline">
                    {currentPlan.map((task, i) => (
                      <div key={i} className={`dp-timeline-item ${completedTasks.includes(i) ? 'done' : ''}`}>
                        <div className="dp-tl-left">
                          <div className="dp-tl-step">
                            {completedTasks.includes(i)
                              ? <CheckCircle2 size={20} className="dp-done-icon" />
                              : <span>{i + 1}</span>
                            }
                          </div>
                          {i < currentPlan.length - 1 && <div className="dp-tl-line" />}
                        </div>
                        <div className="dp-tl-card" onClick={() => toggleTask(i)}>
                          <div className="dp-tl-card-top">
                            <span className="dp-tl-emoji">{task.emoji}</span>
                            <div className="dp-tl-info">
                              <span className="dp-tl-name">{task.task}</span>
                              <span className="dp-tl-reason">{task.reason}</span>
                            </div>
                            <div className="dp-tl-right">
                              <div className={`badge badge-${tagColors[task.tag] || 'muted'}`}>{task.tag}</div>
                              <div className="dp-tl-time"><Clock size={12} />{task.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="dp-session-progress">
                    <div className="dp-sp-label">
                      <span>Session Progress</span>
                      <span>{completedTasks.length} / {currentPlan.length} completed</span>
                    </div>
                    <div className="progress-track" style={{ height: 8 }}>
                      <div className="progress-fill" style={{ width: `${(completedTasks.length / currentPlan.length) * 100}%` }} />
                    </div>
                  </div>

                  {completedTasks.length === currentPlan.length && (
                    <div className="dp-complete-banner">
                      🎉 You completed today's plan! Great work, Aarav. Streak extended to 13 days.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
