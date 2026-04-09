'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { Lock, CheckCircle2, Clock, ChevronRight, Filter } from 'lucide-react'
import { topics } from '../../src/data/topics'
import './Roadmap.css'

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Placement Prep', 'Revision']

const phaseGroups = [
  { label: 'Foundation', color: 'secondary', topics: ['complexity', 'arrays', 'strings', 'recursion', 'sorting'] },
  { label: 'Core Patterns', color: 'primary', topics: ['binary-search', 'linked-list', 'stack', 'queue', 'hashing'] },
  { label: 'Advanced Structures', color: 'warning', topics: ['trees', 'bst', 'heaps'] },
  { label: 'Algorithms', color: 'error', topics: ['graphs', 'greedy', 'backtracking', 'dp'] },
  { label: 'Placement Prep', color: 'primary', topics: ['tries', 'bit-manipulation'] },
]

function statusIcon(status: string) {
  if (status === 'completed') return <CheckCircle2 size={15} className="rm-status-icon done" />
  if (status === 'in-progress') return <div className="rm-pulse-dot" />
  if (status === 'locked') return <Lock size={13} className="rm-status-icon locked" />
  return null
}

export default function Roadmap() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')

  const topicMap: Record<string, any> = {}
  topics.forEach(t => { topicMap[t.id] = t })

  const filterFn = (t: any) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Revision') return t.status === 'completed'
    return t.phase === activeFilter || t.difficulty === activeFilter
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar title="Roadmap" subtitle="Your structured DSA learning path" />
        <div className="page-content">

          {/* Filters */}
          <div className="rm-filters">
            <Filter size={15} className="rm-filter-icon" />
            {filters.map(f => (
              <button
                key={f}
                className={`rm-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Progress Overview */}
          <div className="rm-progress-banner">
            <div className="rm-pb-text">
              <span className="rm-pb-title">Overall Progress</span>
              <span className="rm-pb-sub">3 of 19 topics completed</span>
            </div>
            <div className="rm-pb-bar-wrap">
              <div className="progress-track" style={{ flex: 1, height: 8 }}>
                <div className="progress-fill" style={{ width: '16%' }} />
              </div>
              <span className="rm-pb-pct">16%</span>
            </div>
          </div>

          {/* Phase Groups */}
          {phaseGroups.map((group, gi) => {
            const groupTopics = group.topics
              .map(id => topicMap[id])
              .filter(Boolean)
              .filter(filterFn)

            if (groupTopics.length === 0) return null

            return (
              <div key={gi} className="rm-group">
                <div className="rm-group-header">
                  <div className={`rm-group-badge badge-${group.color}`}>{group.label}</div>
                  <div className="rm-group-divider" />
                  <span className="rm-group-count">{groupTopics.length} topics</span>
                </div>

                <div className="rm-topic-row">
                  {groupTopics.map((topic, ti) => (
                    <div key={topic.id} className="rm-topic-node-wrap">
                      <div
                        className={`rm-topic-card rm-status-${topic.status}`}
                        onClick={() => topic.status !== 'locked' && router.push(`/topic/${topic.id}`)}
                      >
                        <div className="rm-card-top">
                          <span className="rm-card-order">{String(ti + 1).padStart(2, '0')}</span>
                          {statusIcon(topic.status)}
                        </div>
                        <h3 className="rm-card-name">{topic.name}</h3>
                        <div className="rm-card-meta">
                          <div className={`badge badge-${topic.difficulty === 'Beginner' ? 'secondary' : topic.difficulty === 'Intermediate' ? 'primary' : 'warning'}`}>
                            {topic.difficulty}
                          </div>
                          <div className="rm-card-time">
                            <Clock size={11} /> {topic.estimatedTime}
                          </div>
                        </div>
                        {topic.status === 'in-progress' && (
                          <div className="rm-card-progress">
                            <div className="progress-track">
                              <div className="progress-fill" style={{ width: `${topic.progress}%` }} />
                            </div>
                            <span className="rm-card-pct">{topic.progress}%</span>
                          </div>
                        )}
                        {topic.status !== 'locked' && (
                          <button className="rm-card-btn">
                            {topic.status === 'completed' ? 'Review' : topic.status === 'in-progress' ? 'Continue' : 'Start'}
                            <ChevronRight size={13} />
                          </button>
                        )}
                        {topic.status === 'locked' && (
                          <div className="rm-locked-msg">
                            <Lock size={12} /> Complete previous topics
                          </div>
                        )}
                      </div>
                      {ti < groupTopics.length - 1 && (
                        <div className="rm-connector">
                          <div className="rm-connector-line" />
                          <ChevronRight size={14} className="rm-connector-arrow" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
