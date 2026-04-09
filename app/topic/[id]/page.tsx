'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import {
  BookOpen, Clock, CheckCircle2, ExternalLink, Star,
  Play, FileText, PlayCircle, Code2, Tag
} from 'lucide-react'
import { topics } from '../../../src/data/topics'
import { resources, problems } from '../../../src/data/problems'
import './TopicDetail.css'

const PROGRESS_STATES = ['Not Started', 'Learning', 'Practiced', 'Revised', 'Mastered']

const resourceIcons: Record<string, any> = {
  video: PlayCircle,
  article: FileText,
  editorial: Code2,
  revision: BookOpen,
}

const resourceColors: Record<string, string> = {
  video: 'error',
  article: 'primary',
  editorial: 'warning',
  revision: 'secondary',
}

const platformColors: Record<string, string> = {
  LeetCode: 'warning',
  Codeforces: 'error',
  YouTube: 'error',
}

export default function TopicDetail() {
  const router = useRouter()
  // Mock data fetching for now
  const topic = topics.find(t => t.id === 'arrays')!
  const topicResources = (resources as any).arrays || []
  const topicProblems = (problems as any).arrays || {}

  const [progressState, setProgressState] = useState('Learning')
  const [notes, setNotes] = useState('')

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar title="Topic Detail" subtitle="Arrays" />
        <div className="page-content">

          {/* HEADER */}
          <div className="td-header">
            <div className="td-header-left">
              <div className="td-breadcrumb">
                <span onClick={() => router.push('/roadmap')}>Roadmap</span>
                <span>/</span>
                <span className="active">Arrays</span>
              </div>
              <h1 className="td-title">Arrays</h1>
              <div className="td-meta">
                <div className="badge badge-secondary">Beginner</div>
                <div className="td-meta-item"><Clock size={13} /> {topic.estimatedTime}</div>
                <div className="td-meta-item"><BookOpen size={13} /> 7 subtopics</div>
              </div>
              <div className="td-progress-row">
                <div className="progress-track" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${topic.progress}%` }} />
                </div>
                <span className="td-pct">{topic.progress}% complete</span>
              </div>
            </div>
            <div className="td-header-right">
              <button className="btn btn-primary btn-lg" onClick={() => router.push('/daily-plan')}>
                <Play size={16} /> Continue Learning
              </button>
              <button className="btn btn-secondary" onClick={() => router.push('/daily-plan')}>
                Add to Today's Plan
              </button>
            </div>
          </div>

          <div className="td-body">
            <div className="td-main">

              {/* WHY IT MATTERS */}
              <div className="card td-why">
                <h2>Why Arrays Matter</h2>
                <p>
                  Arrays are the foundation of almost every algorithm you'll encounter in interviews. 
                  Prefix sums, sliding window, two pointers, and Kadane's algorithm — all built on array fundamentals.
                  Over <strong>30% of placement test problems</strong> are array-based.
                </p>
                <div className="td-why-chips">
                  <div className="tag">🏢 Asked in FAANG</div>
                  <div className="tag">📊 High Interview Frequency</div>
                  <div className="tag">🔗 Foundation for DP</div>
                  <div className="tag">⚡ Essential for Competitive</div>
                </div>
              </div>

              {/* PREREQUISITES */}
              <div className="td-section-title">Prerequisites</div>
              <div className="td-prereqs">
                {['Loops & Iteration', 'Indexing', 'Basic Syntax', 'Time Complexity Basics'].map(p => (
                  <div key={p} className="tag"><CheckCircle2 size={12} style={{ color: 'var(--secondary)' }} /> {p}</div>
                ))}
              </div>

              {/* SUBTOPICS */}
              <div className="td-section-title">Subtopics</div>
              <div className="subtopics-grid">
                {topic.subtopics?.map((sub: any, i: number) => (
                  <div key={i} className={`subtopic-card ${sub.done ? 'done' : ''}`}>
                    <div className="subtopic-check">
                      {sub.done
                        ? <CheckCircle2 size={16} className="subtopic-done-icon" />
                        : <div className="subtopic-empty-check" />
                      }
                    </div>
                    <span className="subtopic-name">{sub.name}</span>
                    {!sub.done && <div className="badge badge-muted">Pending</div>}
                  </div>
                ))}
              </div>

              {/* BEST RESOURCES */}
              <div className="td-section-title">Best Resources</div>
              <div className="resources-grid">
                {topicResources.map((res: any) => {
                  const Icon = resourceIcons[res.type] || BookOpen
                  const color = resourceColors[res.type] || 'primary'
                  return (
                    <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                      <div className="rc-top">
                        <div className={`rc-type-icon icon-${color}`}>
                          <Icon size={16} />
                        </div>
                        <div className={`badge badge-${color}`}>{res.label}</div>
                      </div>
                      <h3 className="rc-title">{res.title}</h3>
                      <div className="rc-meta">
                        <span className="rc-platform">{res.platform}</span>
                        <span className="rc-duration">{res.duration}</span>
                      </div>
                      <div className="rc-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill={i < Math.floor(res.rating) ? 'var(--warning)' : 'none'} stroke="var(--warning)" />
                        ))}
                        <span>{res.rating}</span>
                      </div>
                      <div className="rc-link-hint">
                        Open resource <ExternalLink size={12} />
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* CURATED PROBLEMS */}
              <div className="td-section-title">Curated Problem Path</div>
              {[
                { key: 'warmup', label: '🔥 Warm-up', color: 'secondary', desc: 'Build confidence and basic pattern recognition' },
                { key: 'core', label: '🎯 Core Patterns', color: 'primary', desc: 'The patterns actually asked in interviews' },
                { key: 'interview', label: '💼 Interview Level', color: 'warning', desc: 'Exact difficulty of placement tests' },
                { key: 'competitive', label: '🏆 Competitive Stretch', color: 'error', desc: 'For those going beyond — contest problems' },
              ].map(({ key, label, color, desc }) => (
                <div key={key} className="problem-section">
                  <div className="ps-header">
                    <div>
                      <div className={`badge badge-${color}`}>{label}</div>
                      <p className="ps-desc">{desc}</p>
                    </div>
                  </div>
                  <div className="problem-list">
                    {(topicProblems[key] || []).map((prob: any) => (
                      <a key={prob.id} href={prob.url} target="_blank" rel="noopener noreferrer" className="problem-card">
                        <div className="pb-left">
                          <div className={`pb-platform badge badge-${platformColors[prob.platform] || 'muted'}`}>
                            {prob.platform}
                          </div>
                          <span className="pb-name">{prob.name}</span>
                        </div>
                        <div className="pb-right">
                          <div className="pb-tags">
                            {prob.tags.map((tag: any) => (
                              <div key={tag} className={`tag pb-tag ${tag === 'Must Solve' ? 'must-solve' : ''}`}>
                                <Tag size={9} /> {tag}
                              </div>
                            ))}
                          </div>
                          <div className={`pb-difficulty badge badge-${prob.difficulty === 'Easy' ? 'secondary' : prob.difficulty === 'Medium' ? 'warning' : 'error'}`}>
                            {prob.difficulty}
                          </div>
                          <ExternalLink size={13} className="pb-link-icon" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SIDEBAR */}
            <div className="td-sidebar">

              {/* Progress Tracker */}
              <div className="card td-progress-card">
                <div className="td-section-title" style={{ marginTop: 0 }}>Your Progress</div>
                <div className="progress-states">
                  {PROGRESS_STATES.map((state, i) => (
                    <div
                      key={state}
                      className={`ps-state ${progressState === state ? 'active' : ''} ${PROGRESS_STATES.indexOf(progressState) > i ? 'past' : ''}`}
                      onClick={() => setProgressState(state)}
                    >
                      <div className="ps-dot" />
                      <span>{state}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="card">
                <div className="td-section-title" style={{ marginTop: 0 }}>My Notes</div>
                <textarea
                  className="td-notes"
                  placeholder="Jot down key insights, patterns, or things to remember..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={6}
                />
                <button className="btn btn-secondary btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
                  Save Notes
                </button>
              </div>

              {/* Quick Stats */}
              <div className="card">
                <div className="td-section-title" style={{ marginTop: 0 }}>Topic Stats</div>
                <div className="td-quick-stats">
                  <div className="td-qs-item">
                    <span className="td-qs-label">Problems Done</span>
                    <span className="td-qs-value">3 / 10</span>
                  </div>
                  <div className="td-qs-item">
                    <span className="td-qs-label">Resources Viewed</span>
                    <span className="td-qs-value">2 / 4</span>
                  </div>
                  <div className="td-qs-item">
                    <span className="td-qs-label">Last Revised</span>
                    <span className="td-qs-value">2 days ago</span>
                  </div>
                  <div className="td-qs-item">
                    <span className="td-qs-label">Confidence</span>
                    <span className="td-qs-value td-qs-secondary">Medium</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
