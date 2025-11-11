"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const jobs = [
  {
    id: "1",
    name: "Downtown Office Renovation",
    client: "Acme Corp",
    status: "In Progress",
    value: "$125,000",
    startDate: "2024-01-15",
    completion: 65,
  },
  {
    id: "2",
    name: "Residential Complex - Phase 2",
    client: "Green Valley Homes",
    status: "Planning",
    value: "$450,000",
    startDate: "2024-02-01",
    completion: 15,
  },
  {
    id: "3",
    name: "Warehouse Expansion",
    client: "LogiTech Inc",
    status: "In Progress",
    value: "$280,000",
    startDate: "2023-12-10",
    completion: 85,
  },
  {
    id: "4",
    name: "School Cafeteria Remodel",
    client: "City School District",
    status: "Completed",
    value: "$95,000",
    startDate: "2023-11-01",
    completion: 100,
  },
  {
    id: "5",
    name: "Medical Center Addition",
    client: "HealthFirst Medical",
    status: "In Progress",
    value: "$650,000",
    startDate: "2024-01-20",
    completion: 45,
  },
]

const statusConfig = {
  "In Progress": {
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    dot: "bg-chart-1",
  },
  Planning: {
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    dot: "bg-chart-3",
  },
  Completed: {
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    dot: "bg-chart-2",
  },
  "On Hold": {
    className: "bg-muted text-muted-foreground border-muted",
    dot: "bg-muted-foreground",
  },
}

interface JobsTableProps {
  onSelectJob: (jobId: string) => void
  searchQuery?: string
}

export function JobsTable({ onSelectJob, searchQuery = "" }: JobsTableProps) {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const filteredJobs = jobs.filter(
    (job) =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (job: (typeof jobs)[0]) => {
    console.log("[v0] Edit job:", job.id)
    toast({
      title: "Edit Job",
      description: `Editing ${job.name}...`,
    })
  }

  const handleDelete = (job: (typeof jobs)[0]) => {
    console.log("[v0] Delete job:", job.id)
    toast({
      title: "Delete Job",
      description: `Are you sure you want to delete ${job.name}?`,
      variant: "destructive",
    })
  }

  const handleViewAll = () => {
    console.log("[v0] View all jobs clicked")
    toast({
      title: "All Jobs",
      description: "Opening full jobs list...",
    })
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">Active Jobs</CardTitle>
            <p className="text-xs text-muted-foreground mt-1 sm:text-sm">
              {searchQuery
                ? `Found ${filteredJobs.length} matching jobs`
                : "Manage and track your construction projects"}
            </p>
          </div>
          <Button onClick={handleViewAll} className="rounded-xl shadow-lg shadow-primary/20 h-9 text-sm sm:h-10">
            <span className="hidden sm:inline">View All</span>
            <ArrowUpRight className="h-4 w-4 sm:ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="hidden md:block relative overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
              <TableRow className="border-b border-border/50 hover:bg-transparent">
                <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider lg:px-8">
                  Job Name
                </TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider">Client</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                  Value
                </TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider hidden xl:table-cell">
                  Start Date
                </TableHead>
                <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider">Progress</TableHead>
                <TableHead className="h-12 w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job, index) => {
                const config = statusConfig[job.status as keyof typeof statusConfig]
                return (
                  <TableRow
                    key={job.id}
                    className={cn(
                      "group transition-colors hover:bg-muted/30 border-b border-border/30",
                      index === filteredJobs.length - 1 && "border-b-0",
                    )}
                  >
                    <TableCell className="px-6 py-4 lg:px-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary">
                            {job.name
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-balance truncate">{job.name}</p>
                          <p className="text-xs text-muted-foreground">ID: #{job.id.padStart(4, "0")}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium truncate">{job.client}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("font-medium gap-1.5 px-2.5 py-0.5 text-xs lg:px-3 lg:py-1", config.className)}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                        <span className="hidden lg:inline">{job.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="font-semibold tabular-nums">{job.value}</p>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <p className="text-muted-foreground tabular-nums">{job.startDate}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[100px] lg:gap-3 lg:min-w-[140px]">
                        <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              job.completion >= 80 ? "bg-chart-2" : job.completion >= 40 ? "bg-chart-1" : "bg-chart-3",
                            )}
                            style={{ width: `${job.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold tabular-nums min-w-[36px] lg:text-sm lg:min-w-[42px]">
                          {job.completion}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => onSelectJob(job.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(job)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(job)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden divide-y divide-border/30">
          {filteredJobs.map((job) => {
            const config = statusConfig[job.status as keyof typeof statusConfig]
            return (
              <div key={job.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {job.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-balance truncate">{job.name}</p>
                      <p className="text-xs text-muted-foreground">{job.client}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onSelectJob(job.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(job)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(job)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={cn("font-medium gap-1.5 px-2.5 py-0.5 text-xs", config.className)}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                    {job.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm font-semibold">{job.value}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        job.completion >= 80 ? "bg-chart-2" : job.completion >= 40 ? "bg-chart-1" : "bg-chart-3",
                      )}
                      style={{ width: `${job.completion}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{job.completion}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
