'use client'

import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import {
  TrendingUp, CheckCircle2, AlertTriangle,
  Flame, Target, Calendar, Award, ChevronRight, BookOpen
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts'
import './Progress.css'

/* ---- MOCK DATA ---- */
const weeklyActivity = [
  { day: 'Mon', problems: 4, minutes: 45 },
  { day: 'Tue', problems: 7, minutes: 90 },
  { day: 'Wed', problems: 3, minutes: 60 },
  { day: 'Thu', problems: 9, minutes: 120 },
  { day: 'Fri', problems: 5, minutes: 75 },
  { day: 'Sat', problems: 12, minutes: 150 },
  { day: 'Sun', problems: 6, minutes: 80 },
]

const confidenceData = [
  { topic: 'Arrays', score: 72 },
  { topic: 'Recursion', score: 45 },
  { topic: 'Strings', score: 60 },
  { topic: 'Sorting', score: 55 },
  { topic: 'Bin. Search', score: 38 },
  { topic: 'Complexity', score: 90 },
]

const radarData = [
  { subject: 'Arrays', A: 72 },
  { subject: 'Strings', A: 60 },
  { subject: 'Recursion', A: 45 },
  { subject: 'Sorting', A: 55 },
  { subject: 'Bin. Search', A: 38 },
  { subject: 'Complexity', A: 90 },
]

const heatmapData = (() => {
  const data = []
  const now = new Date(2026, 3, 9)
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const count = Math.random() > 0.35 ? Math.floor(Math.random() * 5) : 0
    data.push({ date: d.toDateString(), count })
  }
  return data
})()

const completedTopics = [
  { name: 'Time & Space Complexity', date: 'Mar 15', problems: 8 },
  { name: 'Arrays (Basics)', date: 'Mar 22', problems: 15 },
  { name: 'Prefix Sum', date: 'Apr 1', problems: 10 },
]

const inProgressTopics = [
  { name: 'Arrays (Advanced)', progress: 65, subtopic: 'Two Pointers' },
  { name: 'Recursion', progress: 30, subtopic: 'Recursive Tree Thinking' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--elevated)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '10px 14px', fontSize: 13,
      }}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Progress() {
  const router = useRouter()

  const heatCols = []
  for (let i = 0; i < heatmapData.length; i += 7) {
    heatCols.push(heatmapData.slice(i, i + 7))
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar title="Progress" subtitle="Track your long-term DSA growth" />
        <div className="page-content">

          {/* TOP STAT ROW */}
          <div className="pg-stat-row">
            {[
              { icon: CheckCircle2, label: 'Topics Completed', value: '3', color: 'secondary' },
              { icon: Target, label: 'Problems Solved', value: '47', color: 'primary' },
              { icon: Flame, label: 'Day Streak', value: '12', color: 'warning' },
              { icon: Calendar, label: 'Days Active', value: '31', color: 'secondary' },
              { icon: Award, label: 'Mastery Level', value: 'Beginner+', color: 'primary' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="pg-stat-card">
                <div className={`pg-stat-icon icon-${color}`}><Icon size={18} /></div>
                <div className="pg-stat-value">{value}</div>
                <div className="pg-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* CHARTS ROW */}
          <div className="pg-charts-row">
            {/* Weekly Activity */}
            <div className="card pg-chart-card">
              <div className="section-header">
                <div>
                  <div className="section-title">Weekly Activity</div>
                  <div className="section-subtitle">Problems solved per day</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weeklyActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProbs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="problems"
                    name="Problems"
                    stroke="#7C5CFF"
                    strokeWidth={2.5}
                    fill="url(#colorProbs)"
                    dot={{ fill: '#7C5CFF', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#7C5CFF' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Radar */}
            <div className="card pg-chart-card">
              <div className="section-header">
                <div>
                  <div className="section-title">Skill Confidence</div>
                  <div className="section-subtitle">Self-assessed topic mastery</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar
                    name="Confidence"
                    dataKey="A"
                    stroke="#3DD9B4"
                    fill="#3DD9B4"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* HEATMAP */}
          <div className="card pg-heatmap-card">
            <div className="section-header">
              <div>
                <div className="section-title">Consistency Heatmap</div>
                <div className="section-subtitle">Problems solved — last 90 days</div>
              </div>
              <div className="pg-heatmap-legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(lvl => (
                  <div key={lvl} className={`hm-legend-cell hm-${lvl}`} />
                ))}
                <span>More</span>
              </div>
            </div>
            <div className="pg-heatmap">
              {heatCols.map((col, ci) => (
                <div key={ci} className="hm-col">
                  {col.map((cell, ri) => (
                    <div
                      key={ri}
                      className={`hm-cell hm-${Math.min(cell.count, 4)}`}
                      title={`${cell.date}: ${cell.count} problems`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CONFIDENCE BY TOPIC */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="section-header">
              <div>
                <div className="section-title">Confidence by Topic</div>
                <div className="section-subtitle">Based on problem accuracy and self-assessment</div>
              </div>
            </div>
            <div className="pg-confidence-list">
              {confidenceData.map(({ topic, score }) => (
                <div key={topic} className="pg-conf-row">
                  <span className="pg-conf-topic">{topic}</span>
                  <div className="pg-conf-bar-wrap">
                    <div className="progress-track" style={{ flex: 1 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${score}%`,
                          background: score >= 70
                            ? 'linear-gradient(90deg, var(--secondary), #2AC49E)'
                            : score >= 50
                            ? 'linear-gradient(90deg, var(--primary), #5B3FDE)'
                            : 'linear-gradient(90deg, var(--error), #E05555)',
                        }}
                      />
                    </div>
                    <span className={`pg-conf-score ${score >= 70 ? 'high' : score >= 50 ? 'mid' : 'low'}`}>
                      {score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="pg-bottom-row">

            {/* Completed Topics */}
            <div className="card">
              <div className="section-header">
                <div>
                  <div className="section-title">✅ Completed Topics</div>
                  <div className="section-subtitle">3 topics mastered so far</div>
                </div>
              </div>
              <div className="pg-topic-list">
                {completedTopics.map((t, i) => (
                  <div key={i} className="pg-topic-row completed">
                    <CheckCircle2 size={16} className="ptl-icon-done" />
                    <div className="pg-topic-info">
                      <span className="pg-topic-name">{t.name}</span>
                      <span className="pg-topic-meta">Completed {t.date} · {t.problems} problems solved</span>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push('/topic/arrays')}>
                      Review <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="card">
              <div className="section-header">
                <div>
                  <div className="section-title">📘 In Progress</div>
                  <div className="section-subtitle">Currently active topics</div>
                </div>
              </div>
              <div className="pg-topic-list">
                {inProgressTopics.map((t, i) => (
                  <div key={i} className="pg-topic-row">
                    <BookOpen size={16} className="ptl-icon-progress" />
                    <div className="pg-topic-info">
                      <span className="pg-topic-name">{t.name}</span>
                      <span className="pg-topic-meta">Currently: {t.subtopic}</span>
                      <div className="pg-topic-prog">
                        <div className="progress-track" style={{ flex: 1 }}>
                          <div className="progress-fill" style={{ width: `${t.progress}%` }} />
                        </div>
                        <span className="pg-topic-pct">{t.progress}%</span>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => router.push('/topic/arrays')}>
                      Continue <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            <div className="card">
              <div className="section-header">
                <div>
                  <div className="section-title">⚠️ Weak Areas</div>
                  <div className="section-subtitle">Needs focused practice</div>
                </div>
              </div>
              <div className="pg-topic-list">
                {[
                  { name: 'Binary Search', score: 38, detail: 'Boundary conditions — 3 wrong' },
                  { name: 'Sliding Window', score: 50, detail: 'Variable window confused' },
                  { name: 'Recursion', score: 45, detail: 'Stack overflow on tree problems' },
                ].map((t, i) => (
                  <div key={i} className="pg-topic-row weak">
                    <AlertTriangle size={16} className="ptl-icon-weak" />
                    <div className="pg-topic-info">
                      <span className="pg-topic-name">{t.name}</span>
                      <span className="pg-topic-meta">{t.detail}</span>
                    </div>
                    <div className="pg-conf-score low">{t.score}%</div>
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
