"use client"

import { X, Calendar, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface JobDrawerProps {
  jobId: string | null
  onClose: () => void
}

const jobDetails = {
  "1": {
    name: "Downtown Office Renovation",
    client: "Acme Corp",
    status: "In Progress",
    value: "$125,000",
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    completion: 65,
    location: "123 Main St, Downtown",
    description:
      "Complete renovation of 5,000 sq ft office space including new flooring, lighting, HVAC upgrades, and modern interior design.",
    team: ["John Smith (PM)", "Sarah Johnson (Lead)", "Mike Davis (Electrician)"],
    milestones: [
      { name: "Demolition", status: "Completed", date: "2024-01-20" },
      { name: "Electrical Work", status: "In Progress", date: "2024-02-15" },
      { name: "Flooring Installation", status: "Pending", date: "2024-03-10" },
      { name: "Final Inspection", status: "Pending", date: "2024-04-25" },
    ],
  },
}

export function JobDrawer({ jobId, onClose }: JobDrawerProps) {
  if (!jobId) return null

  const job = jobDetails[jobId as keyof typeof jobDetails]
  if (!job) return null

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-full max-w-md border-l border-border bg-card shadow-lg transition-transform duration-300",
          jobId ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-lg font-semibold">Job Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-balance">{job.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{job.client}</p>
              <Badge className="mt-2 bg-chart-1 text-primary-foreground">{job.status}</Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Project Value</p>
                  <p className="text-lg font-semibold">{job.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-sm text-muted-foreground">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Team Members</h4>
              <div className="space-y-2">
                {job.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {member.charAt(0)}
                    </div>
                    <span className="text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Milestones</h4>
              <div className="space-y-3">
                {job.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        milestone.status === "Completed"
                          ? "bg-chart-2 text-foreground"
                          : milestone.status === "In Progress"
                            ? "bg-chart-1 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Overall Progress</h4>
              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${job.completion}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{job.completion}% Complete</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border p-6">
            <Button className="w-full">Edit Job Details</Button>
          </div>
        </div>
      </aside>
    </>
  )
}
