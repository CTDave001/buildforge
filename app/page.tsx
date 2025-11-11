"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KpiCards } from "@/components/kpi-cards"
import { JobsTable } from "@/components/jobs-table"
import { JobDrawer } from "@/components/job-drawer"
import { LeadsView } from "@/components/leads-view"
import { EstimatesView } from "@/components/estimates-view"
import { InvoicesView } from "@/components/invoices-view"
import { SettingsView } from "@/components/settings-view"

export default function DashboardPage() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState("Jobs")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view)
          setMobileSidebarOpen(false) // Close sidebar on mobile after navigation
        }}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={setMobileSidebarOpen}
      />
      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMobileMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} // Added mobile menu toggle
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden webkit-overflow-scrolling-touch">
          <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8 w-full min-h-full">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">{activeView}</h1>
              <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                {activeView === "Jobs" && "Overview of your construction projects and activities"}
                {activeView === "Leads" && "Manage and track potential clients and opportunities"}
                {activeView === "Estimates" && "Create and manage project estimates and quotes"}
                {activeView === "Invoices" && "Track billing and payment status"}
                {activeView === "Settings" && "Configure your account and preferences"}
              </p>
            </div>
            {activeView === "Jobs" && (
              <>
                <KpiCards />
                <JobsTable onSelectJob={setSelectedJobId} searchQuery={searchQuery} />
              </>
            )}
            {activeView === "Leads" && <LeadsView />}
            {activeView === "Estimates" && <EstimatesView />}
            {activeView === "Invoices" && <InvoicesView />}
            {activeView === "Settings" && <SettingsView />}
          </div>
        </main>
      </div>
      <JobDrawer jobId={selectedJobId} onClose={() => setSelectedJobId(null)} />
    </div>
  )
}
