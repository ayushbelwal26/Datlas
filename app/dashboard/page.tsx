'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import {
  Flame, Target, ArrowRight, Sparkles, CheckCircle2,
  Clock, BookOpen, Code2, RefreshCw, AlertTriangle,
  TrendingUp, ChevronRight, Play
} from 'lucide-react'
import { topics, weakAreas, revisionQueue } from '../../src/data/topics'
import './Dashboard.css'

const timeOptions = ['30 min', '1 hr', '2 hrs', '3 hrs']

const mockPlansByTime: Record<string, any[]> = {
  '30 min': [
    { emoji: '🔁', task: 'Quick revise Binary Search', time: '15 min', tag: 'Weak Area' },
    { emoji: '⚡', task: 'Solve 2 easy problems', time: '15 min', tag: 'Practice' },
  ],
  '1 hr': [
    { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', tag: 'Weak Area' },
    { emoji: '📝', task: 'Solve 2 Prefix Sum problems', time: '25 min', tag: 'Core Pattern' },
    { emoji: '⚡', task: 'Retry weak area questions', time: '15 min', tag: 'Revision' },
  ],
  '2 hrs': [
    { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', tag: 'Weak Area' },
    { emoji: '📝', task: 'Solve 3 Prefix Sum problems', time: '35 min', tag: 'Core Pattern' },
    { emoji: '🎥', task: 'Watch Sliding Window resource', time: '25 min', tag: 'Next Topic' },
    { emoji: '⚡', task: 'Retry weak area questions', time: '40 min', tag: 'Revision' },
  ],
  '3 hrs': [
    { emoji: '🔁', task: 'Revise Binary Search', time: '25 min', tag: 'Weak Area' },
    { emoji: '📝', task: 'Solve 5 Array problems', time: '45 min', tag: 'Core Pattern' },
    { emoji: '🎓', task: 'Learn Sliding Window in depth', time: '50 min', tag: 'Next Topic' },
    { emoji: '⚡', task: 'Retry 3 weak area questions', time: '40 min', tag: 'Revision' },
    { emoji: '🏁', task: 'Mock 20-min timed set', time: '20 min', tag: 'Contest Prep' },
  ],
}

const statCards = [
  { icon: CheckCircle2, label: 'Topics Completed', value: '3', sub: 'of 19 topics', color: 'secondary' },
  { icon: Code2, label: 'Problems Attempted', value: '47', sub: 'this week', color: 'primary' },
  { icon: RefreshCw, label: 'Revision Due', value: '3', sub: 'topics pending', color: 'warning' },
  { icon: AlertTriangle, label: 'Weak Areas', value: '3', sub: 'need attention', color: 'error' },
]

export default function Dashboard() {
  const router = useRouter()
  const [selectedTime, setSelectedTime] = useState('2 hrs')
  const [planGenerated, setPlanGenerated] = useState(true)
  const [generating, setGenerating] = useState(false)

  const inProgress = topics.filter(t => t.status === 'in-progress')

  const handleGenerate = () => {
    setGenerating(true)
    setPlanGenerated(false)
    setTimeout(() => {
      setGenerating(false)
      setPlanGenerated(true)
    }, 1200)
  }

  const plan = mockPlansByTime[selectedTime] || mockPlansByTime['2 hrs']

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar title="Dashboard" subtitle="Wednesday, Apr 9 — Day 12 of your streak" />
        <div className="page-content">

          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-left">
              <div className="welcome-avatar">A</div>
              <div>
                <h2 className="welcome-name">Welcome back, Aarav 👋</h2>
                <p className="welcome-phase">Placement Prep Phase</p>
              </div>
            </div>
            <div className="welcome-stats">
              <div className="ws-item">
                <Flame size={18} className="ws-icon flame" />
                <div>
                  <div className="ws-value">12</div>
                  <div className="ws-label">Day Streak</div>
                </div>
              </div>
              <div className="ws-divider" />
              <div className="ws-item">
                <Target size={18} className="ws-icon primary" />
                <div>
                  <div className="ws-value">3 / 19</div>
                  <div className="ws-label">Topics Done</div>
                </div>
              </div>
              <div className="ws-divider" />
              <div className="ws-item">
                <TrendingUp size={18} className="ws-icon secondary" />
                <div>
                  <div className="ws-value">68%</div>
                  <div className="ws-label">Weekly Goal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="dash-grid">

            {/* TODAY'S PLAN — Hero Widget */}
            <div className="todays-plan-card">
              <div className="tp-header">
                <div>
                  <div className="tp-badge">
                    <Sparkles size={13} />
                    <span>AI Daily Plan</span>
                  </div>
                  <h2 className="tp-title">Today's Plan</h2>
                </div>
                <div className="tp-time-selector">
                  {timeOptions.map(t => (
                    <button
                      key={t}
                      className={`tp-time-btn ${selectedTime === t ? 'active' : ''}`}
                      onClick={() => { setSelectedTime(t); setPlanGenerated(false); }}
                    >
                      <Clock size={12} /> {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`tp-generate-btn ${generating ? 'loading' : ''}`}
                onClick={handleGenerate}
              >
                {generating ? (
                  <><RefreshCw size={16} className="spin" /> Generating your plan...</>
                ) : (
                  <><Sparkles size={16} /> Generate Plan for {selectedTime}</>
                )}
              </button>

              {planGenerated && !generating && (
                <div className="tp-plan-list">
                  {plan.map((item, i) => (
                    <div key={i} className="tp-task" style={{ animationDelay: `${i * 60}ms` }}>
                      <div className="tp-task-emoji">{item.emoji}</div>
                      <div className="tp-task-info">
                        <span className="tp-task-name">{item.task}</span>
                        <span className={`tp-task-tag tag-${item.tag.toLowerCase().replace(' ', '-')}`}>{item.tag}</span>
                      </div>
                      <div className="tp-task-time">
                        <Clock size={12} /> {item.time}
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={() => router.push('/daily-plan')}>
                    View Full Plan <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* STAT CARDS */}
            <div className="dash-stats">
              {statCards.map(({ icon: Icon, label, value, sub, color }) => (
                <div key={label} className="dash-stat-card">
                  <div className={`dash-stat-icon icon-${color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="dash-stat-value">{value}</div>
                  <div className="dash-stat-label">{label}</div>
                  <div className="dash-stat-sub">{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="section-header" style={{ marginTop: 32 }}>
            <div>
              <div className="section-title">Continue Learning</div>
              <div className="section-subtitle">Pick up where you left off</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => router.push('/roadmap')}>
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="continue-grid">
            {inProgress.map(topic => (
              <div key={topic.id} className="continue-card" onClick={() => router.push(`/topic/${topic.id}`)}>
                <div className="cc-header">
                  <div className="cc-icon">
                    <BookOpen size={18} />
                  </div>
                  <div className={`badge badge-${topic.difficulty === 'Beginner' ? 'secondary' : 'warning'}`}>
                    {topic.difficulty}
                  </div>
                </div>
                <h3 className="cc-name">{topic.name}</h3>
                {topic.currentSubtopic && (
                  <p className="cc-subtopic">Currently: {topic.currentSubtopic}</p>
                )}
                <div className="cc-progress-row">
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${topic.progress}%` }} />
                  </div>
                  <span className="cc-pct">{topic.progress}%</span>
                </div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                  <Play size={13} /> Continue
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Row: Weak Areas + Revision Queue */}
          <div className="dash-bottom-row">

            {/* Weak Areas */}
            <div className="card">
              <div className="section-header" style={{ marginBottom: 16 }}>
                <div>
                  <div className="section-title">⚠️ Weak Areas</div>
                  <div className="section-subtitle">Focus here to improve</div>
                </div>
              </div>
              <div className="weak-list">
                {weakAreas.map(area => (
                  <div key={area.id} className="weak-item">
                    <div className={`weak-indicator weak-${area.level}`} />
                    <div className="weak-info">
                      <div className="weak-name">{area.name}</div>
                      <div className="weak-reason">{area.reason}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push(`/topic/${area.id}`)}>
                      Practice <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Revision Queue */}
            <div className="card">
              <div className="section-header" style={{ marginBottom: 16 }}>
                <div>
                  <div className="section-title">🔁 Revision Queue</div>
                  <div className="section-subtitle">Spaced repetition schedule</div>
                </div>
              </div>
              <div className="revision-list">
                {revisionQueue.map((item, i) => (
                  <div key={i} className="revision-item">
                    <div className={`rev-badge ${item.priority === 'high' ? 'badge-error' : item.priority === 'medium' ? 'badge-warning' : 'badge-muted'} badge`}>
                      {item.dueIn}
                    </div>
                    <span className="rev-name">{item.name}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push(`/topic/${item.id}`)}>
                      Revise <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
