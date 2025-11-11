"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Briefcase, Users, FileText, Receipt, Settings, ChevronLeft, ChevronRight, Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Briefcase, label: "Jobs", href: "#" },
  { icon: Users, label: "Leads", href: "#" },
  { icon: FileText, label: "Estimates", href: "#" },
  { icon: Receipt, label: "Invoices", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  mobileOpen?: boolean
  onMobileToggle?: (open: boolean) => void
}

export function Sidebar({ activeView, onViewChange, mobileOpen = false, onMobileToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => onMobileToggle?.(false)}
        />
      )}

      <aside
        className={cn(
          "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 z-50",
          "fixed inset-y-0 left-0 lg:relative",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-[72px]" : "w-72",
        )}
      >
        <div className="flex h-[60px] sm:h-[73px] items-center justify-between border-b border-sidebar-border px-4 sm:px-5">
          {!collapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary shadow-lg shadow-primary/20">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" strokeWidth={2} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base font-bold tracking-tight text-sidebar-foreground truncate">BuildForge</span>
                <span className="text-xs text-muted-foreground truncate">Construction CRM</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Building2 className="h-6 w-6 text-primary-foreground" strokeWidth={2} />
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMobileToggle?.(false)}
              className="lg:hidden h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </Button>
          )}
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                console.log("[v0] Navigation clicked:", item.label)
                onViewChange(item.label)
              }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 sm:py-3 text-sm font-medium transition-all duration-200",
                activeView === item.label
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              aria-label={item.label}
            >
              <item.icon
                className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110")}
                strokeWidth={2}
                aria-hidden="true"
              />
              {!collapsed && <span className="text-balance">{item.label}</span>}
            </button>
          ))}
        </nav>
        {collapsed && (
          <div className="border-t border-sidebar-border p-3 hidden lg:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(false)}
              className="h-10 w-full text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}
