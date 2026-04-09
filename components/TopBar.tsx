'use client'

import { Bell, Search } from 'lucide-react'
import './TopBar.css'

export default function TopBar({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {title && <h1 className="topbar-title">{title}</h1>}
        {subtitle && <span className="topbar-subtitle">{subtitle}</span>}
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search topics, problems..." />
          <div className="search-shortcut">⌘K</div>
        </div>

        <button className="topbar-btn notifications active">
          <Bell size={18} />
          <span className="notif-badge" />
        </button>
        <div className="topbar-avatar">A</div>
      </div>
    </header>
  )
}
