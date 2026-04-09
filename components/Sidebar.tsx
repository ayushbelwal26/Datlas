'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Map, BookOpen, CalendarDays,
  TrendingUp, Bookmark, Settings, Zap
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/topic/arrays', icon: BookOpen, label: 'Topics' },
  { to: '/daily-plan', icon: CalendarDays, label: 'Daily Plan' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/dashboard#bookmarks', icon: Bookmark, label: 'Bookmarks' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => router.push('/')}>
        <div className="sidebar-logo-icon">
          <Zap size={18} />
        </div>
        <span className="sidebar-logo-text">DSA <span>Atlas</span></span>
      </div>

      {/* User Quick Info */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">A</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Aarav Shah</div>
          <div className="sidebar-user-phase">Placement Prep</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Navigation</div>
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = pathname.startsWith(to)
          return (
            <Link
              key={to}
              href={to}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-streak-card">
          <div className="streak-flame">🔥</div>
          <div>
            <div className="streak-count">12 day streak</div>
            <div className="streak-sub">Keep it going!</div>
          </div>
        </div>

        <Link href="/dashboard" className="sidebar-nav-item">
          <Settings size={17} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  )
}
