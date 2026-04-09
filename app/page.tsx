'use client'

import { useRouter } from 'next/navigation'
import {
  Zap, Map, BookOpen, BarChart2, CalendarDays,
  Code2, ArrowRight, CheckCircle2, Sparkles,
  ChevronRight, Users, Trophy, Target
} from 'lucide-react'
import './page.css'

const features = [
  {
    icon: Map,
    title: 'Structured DSA Roadmap',
    desc: 'A carefully ordered sequence of topics — no more guessing what to learn next.',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Curated Best Resources',
    desc: 'Only the highest-rated videos, articles, and editorials. Zero noise.',
    color: 'secondary',
  },
  {
    icon: Code2,
    title: 'Handpicked Problem Sets',
    desc: 'Codeforces, LeetCode, and editorial-linked problems organized by pattern.',
    color: 'warning',
  },
  {
    icon: BarChart2,
    title: 'Progress Tracking',
    desc: 'Visual dashboards, streaks, weak area detection, and revision queues.',
    color: 'primary',
  },
  {
    icon: CalendarDays,
    title: 'AI Daily Study Planner',
    desc: 'Tell it how much time you have. Get a precise plan built around your weaknesses.',
    color: 'secondary',
  },
]

const roadmapNodes = [
  { name: 'Arrays', status: 'completed', pos: 0 },
  { name: 'Strings', status: 'completed', pos: 1 },
  { name: 'Recursion', status: 'in-progress', pos: 2 },
  { name: 'Binary Search', status: 'next', pos: 3 },
  { name: 'Linked List', status: 'locked', pos: 4 },
  { name: 'Stack', status: 'locked', pos: 5 },
  { name: 'Trees', status: 'locked', pos: 6 },
  { name: 'Graphs', status: 'locked', pos: 7 },
  { name: 'DP', status: 'locked', pos: 8 },
]

const stats = [
  { icon: Users, value: '12,000+', label: 'Students Using DSA Atlas' },
  { icon: BookOpen, value: '200+', label: 'Curated Resources' },
  { icon: Code2, value: '500+', label: 'Handpicked Problems' },
  { icon: Trophy, value: '93%', label: 'Placement Success Rate' },
]

export default function Landing() {
  const router = useRouter()

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="land-nav">
        <div className="land-nav-inner">
          <div className="land-logo" onClick={() => router.push('/')}>
            <div className="land-logo-icon"><Zap size={16} /></div>
            <span>DSA <strong>Atlas</strong></span>
          </div>
          <div className="land-nav-links">
            <button className="btn btn-ghost" onClick={() => router.push('/roadmap')}>Roadmap</button>
            <button className="btn btn-ghost" onClick={() => router.push('/dashboard')}>Dashboard</button>
            <button className="btn btn-secondary btn-sm" onClick={() => router.push('/login')}>Sign In</button>
            <button className="btn btn-primary btn-sm" onClick={() => router.push('/signup')}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="land-hero">
        <div className="land-hero-bg" />
        <div className="land-hero-content">
          <div className="land-hero-badge animate-fade-up">
            <Sparkles size={13} />
            <span>AI-powered DSA learning planner</span>
          </div>
          <h1 className="land-hero-title animate-fade-up" style={{ animationDelay: '80ms' }}>
            Stop searching for DSA<br />
            resources. <span className="text-gradient">Start following</span><br />
            a system.
          </h1>
          <p className="land-hero-sub animate-fade-up" style={{ animationDelay: '160ms' }}>
            One roadmap. Best resources. Best problems.<br />
            Personalized daily plans.
          </p>
          <div className="land-hero-ctas animate-fade-up" style={{ animationDelay: '240ms' }}>
            <button className="btn btn-primary btn-lg" onClick={() => router.push('/signup')}>
              Start Learning <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => router.push('/roadmap')}>
              View Roadmap
            </button>
          </div>
          <div className="land-hero-trust animate-fade-up" style={{ animationDelay: '320ms' }}>
            <div className="trust-avatars">
              {['A', 'R', 'S', 'K', 'P'].map((l, i) => (
                <div key={i} className="trust-av" style={{ marginLeft: i === 0 ? 0 : -10 }}>{l}</div>
              ))}
            </div>
            <span>Trusted by <strong>12,000+</strong> students preparing for placements</span>
          </div>
        </div>

        {/* Hero Visual — Mock Dashboard Card */}
        <div className="land-hero-visual animate-float">
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="hero-card-dot green" />
              <div className="hero-card-dot yellow" />
              <div className="hero-card-dot red" />
              <span className="hero-card-title">Today's Plan • 2 hours</span>
            </div>
            <div className="hero-card-tasks">
              {[
                { icon: '🔁', task: 'Revise Binary Search', time: '20 min', done: true },
                { icon: '🧩', task: 'Solve 3 Prefix Sum problems', time: '35 min', done: true },
                { icon: '🎥', task: 'Watch Sliding Window resource', time: '25 min', done: false },
                { icon: '⚡', task: 'Retry weak area questions', time: '40 min', done: false },
              ].map((t, i) => (
                <div key={i} className={`hero-task ${t.done ? 'done' : ''}`}>
                  <span className="hero-task-icon">{t.icon}</span>
                  <div className="hero-task-info">
                    <span className="hero-task-name">{t.task}</span>
                    <span className="hero-task-time">{t.time}</span>
                  </div>
                  {t.done && <CheckCircle2 size={15} className="hero-task-check" />}
                </div>
              ))}
            </div>
            <div className="hero-card-progress">
              <span>Daily progress</span>
              <span>2 / 4 done</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="land-stats">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="stat-item">
            <div className="stat-icon"><Icon size={20} /></div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="land-section">
        <div className="land-section-inner">
          <div className="land-section-header">
            <div className="badge badge-primary">Features</div>
            <h2>Everything you need to master DSA</h2>
            <p>Built for serious students. Not a course. Not a grind platform. A system.</p>
          </div>
          <div className="features-grid">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className={`feature-card feature-${color}`}>
                <div className={`feature-icon-wrap feature-icon-${color}`}>
                  <Icon size={20} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="land-section land-how">
        <div className="land-section-inner">
          <div className="land-section-header">
            <div className="badge badge-secondary">How It Works</div>
            <h2>From zero to interview-ready in 3 steps</h2>
          </div>
          <div className="how-steps">
            {[
              {
                num: '01',
                title: 'Pick Your Goal',
                desc: 'Are you a beginner, aiming for placements, or improving your contest rating? Set your goal and DSA Atlas tunes your roadmap.',
                icon: Target,
              },
              {
                num: '02',
                title: 'Follow Your Roadmap',
                desc: 'A structured sequence of topics with the best resources, curated problems, and editorial links — in the exact order to learn them.',
                icon: Map,
              },
              {
                num: '03',
                title: 'Get Your Daily Plan',
                desc: 'Tell the AI planner how much time you have. It generates a precision daily schedule based on your weak areas and roadmap progress.',
                icon: CalendarDays,
              },
            ].map((step, i) => (
              <div key={i} className="how-step">
                <div className="how-step-num">{step.num}</div>
                <div className="how-step-icon"><step.icon size={22} /></div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < 2 && <div className="how-step-arrow"><ArrowRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Planner Preview */}
      <section className="land-section land-ai">
        <div className="land-section-inner land-ai-inner">
          <div className="land-ai-text">
            <div className="badge badge-primary">AI Daily Planner</div>
            <h2>Your personal DSA<br />coach, every day</h2>
            <p>Just tell it how much time you have. DSA Atlas analyzes your weak areas, revision queue, and roadmap state to generate your optimal daily plan.</p>
            <ul className="land-ai-list">
              {[
                'Adapts to your available time',
                'Prioritizes weak areas automatically',
                'Schedules spaced revision intelligently',
                'Links directly to problems and resources',
              ].map(item => (
                <li key={item}><CheckCircle2 size={16} /> {item}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => router.push('/signup')}>
              Try AI Planner <ArrowRight size={16} />
            </button>
          </div>
          <div className="land-ai-card">
            <div className="ai-input-row">
              <span className="ai-label">⏱ Time available today</span>
              <div className="ai-time-chips">
                {['30 min', '1 hr', '2 hrs', '3 hrs'].map(t => (
                  <button key={t} className={`ai-chip ${t === '2 hrs' ? 'active' : ''}`}>{t}</button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Sparkles size={16} /> Generate Today's Plan
            </button>
            <div className="ai-divider"><span>Generated Plan</span></div>
            <div className="ai-tasks">
              {[
                { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', tag: 'Weak Area' },
                { emoji: '📝', task: 'Solve 3 Prefix Sum problems', time: '35 min', tag: 'Core Pattern' },
                { emoji: '🎓', task: 'Learn Sliding Window', time: '45 min', tag: 'Next Topic' },
                { emoji: '⚡', task: 'Retry weak questions', time: '20 min', tag: 'Revision' },
              ].map((t, i) => (
                <div key={i} className="ai-task-row">
                  <span className="ai-task-emoji">{t.emoji}</span>
                  <div className="ai-task-info">
                    <span className="ai-task-name">{t.task}</span>
                    <span className="ai-task-tag">{t.tag}</span>
                  </div>
                  <span className="ai-task-time">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="land-section">
        <div className="land-section-inner">
          <div className="land-section-header">
            <div className="badge badge-muted">Roadmap Preview</div>
            <h2>A structured path from basics to mastery</h2>
            <p>Every topic is ordered. Every resource is curated. Every problem is handpicked.</p>
          </div>
          <div className="roadmap-preview">
            {roadmapNodes.map((node, i) => (
              <div key={i} className={`rp-node rp-${node.status}`}>
                <div className="rp-dot" />
                <span>{node.name}</span>
                {node.status === 'completed' && <CheckCircle2 size={13} />}
                {node.status === 'in-progress' && <div className="rp-pulse" />}
              </div>
            ))}
          </div>
          <div className="rp-legend">
            {[
              { color: 'var(--secondary)', label: 'Completed' },
              { color: 'var(--primary)', label: 'In Progress' },
              { color: 'var(--warning)', label: 'Up Next' },
              { color: 'var(--border)', label: 'Locked' },
            ].map(({ color, label }) => (
              <div key={label} className="rp-legend-item">
                <div className="rp-legend-dot" style={{ background: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-secondary" onClick={() => router.push('/roadmap')}>
              View Full Roadmap <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="land-cta-banner">
        <div className="cta-banner-glow" />
        <h2>Start learning DSA the right way</h2>
        <p>Join thousands of students who follow a system — not random YouTube playlists.</p>
        <button className="btn btn-primary btn-lg" onClick={() => router.push('/signup')}>
          Open Dashboard <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="land-footer">
        <div className="land-footer-inner">
          <div className="land-logo">
            <div className="land-logo-icon"><Zap size={14} /></div>
            <span>DSA <strong>Atlas</strong></span>
          </div>
          <div className="footer-links">
            {['Roadmap', 'Dashboard', 'Daily Plan', 'Progress'].map(l => (
              <span key={l} onClick={() => router.push(l === 'Roadmap' ? '/roadmap' : l === 'Dashboard' ? '/dashboard' : l === 'Daily Plan' ? '/daily-plan' : '/progress')}>
                {l}
              </span>
            ))}
          </div>
          <div className="footer-copy">© 2026 DSA Atlas. Built for serious learners.</div>
        </div>
      </footer>
    </div>
  )
}
