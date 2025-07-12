"use client"

import { Home, User, Wallet } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "status", label: "My Status", icon: User },
    { id: "wallet", label: "Connect Wallet", icon: Wallet },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SUI</span>
          </div>
          <div>
            <div className="font-semibold">SUI Social</div>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                currentPage === item.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
