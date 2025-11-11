"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, MoreVertical, Download, Send, DollarSign, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const estimates = [
  {
    id: "EST-2024-001",
    client: "Mitchell Developments",
    project: "Commercial Renovation",
    amount: "$125,000",
    status: "Sent",
    date: "Jan 15, 2024",
    validUntil: "Feb 15, 2024",
  },
  {
    id: "EST-2024-002",
    client: "Chen Properties",
    project: "Residential Addition",
    amount: "$85,000",
    status: "Draft",
    date: "Jan 18, 2024",
    validUntil: "Feb 18, 2024",
  },
  {
    id: "EST-2024-003",
    client: "Davis Real Estate",
    project: "Kitchen Remodel",
    amount: "$45,000",
    status: "Accepted",
    date: "Jan 10, 2024",
    validUntil: "Feb 10, 2024",
  },
  {
    id: "EST-2024-004",
    client: "Torres Construction Group",
    project: "Multi-Unit Development",
    amount: "$210,000",
    status: "Sent",
    date: "Jan 20, 2024",
    validUntil: "Feb 20, 2024",
  },
  {
    id: "EST-2024-005",
    client: "Green Building Corp",
    project: "Office Build-Out",
    amount: "$95,000",
    status: "Rejected",
    date: "Jan 8, 2024",
    validUntil: "Feb 8, 2024",
  },
]

const statusColors = {
  Draft: "bg-muted text-muted-foreground hover:bg-muted",
  Sent: "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20",
  Accepted: "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20",
  Rejected: "bg-destructive/10 text-destructive hover:bg-destructive/20",
}

export function EstimatesView() {
  const { toast } = useToast()
  const [estimatesData, setEstimatesData] = useState(estimates)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const handleDownload = (estimateId: string) => {
    toast({
      title: "Downloading PDF",
      description: `${estimateId} is being downloaded`,
    })
  }

  const handleSend = (estimateId: string) => {
    setEstimatesData(estimatesData.map((est) => (est.id === estimateId ? { ...est, status: "Sent" } : est)))
    toast({
      title: "Estimate Sent",
      description: `${estimateId} has been sent to the client`,
    })
  }

  const handleDuplicate = (estimate: any) => {
    const newEstimate = {
      ...estimate,
      id: `EST-2024-${String(estimatesData.length + 1).padStart(3, "0")}`,
      status: "Draft",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }
    setEstimatesData([newEstimate, ...estimatesData])
    toast({
      title: "Estimate Duplicated",
      description: `Created ${newEstimate.id} from ${estimate.id}`,
    })
  }

  const handleAddEstimate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newEstimate = {
      id: `EST-2024-${String(estimatesData.length + 1).padStart(3, "0")}`,
      client: formData.get("client") as string,
      project: formData.get("project") as string,
      amount: formData.get("amount") as string,
      status: "Draft",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      validUntil: formData.get("validUntil") as string,
    }
    setEstimatesData([newEstimate, ...estimatesData])
    setIsAddDialogOpen(false)
    toast({
      title: "Estimate Created",
      description: `${newEstimate.id} has been created`,
    })
  }

  const handleDeleteEstimate = () => {
    setEstimatesData(estimatesData.filter((est) => est.id !== selectedEstimate.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Estimate Deleted",
      description: `${selectedEstimate.id} has been deleted`,
    })
  }

  const filteredEstimates = estimatesData.filter((est) => {
    const matchesStatus = filterStatus === "All" || est.status === filterStatus
    const matchesSearch =
      est.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalValue = filteredEstimates.reduce((sum, est) => sum + Number.parseFloat(est.amount.replace(/[$,]/g, "")), 0)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 w-full">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-primary/10 shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Estimates</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{estimatesData.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-chart-2/10 shrink-0">
                  <DollarSign className="h-4 w-4 text-chart-2" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Value</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">${(totalValue / 1000).toFixed(0)}k</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-chart-1/10 shrink-0">
                  <Send className="h-4 w-4 text-chart-1" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Sent</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{estimatesData.filter((e) => e.status === "Sent").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-chart-2/10 shrink-0">
                  <FileText className="h-4 w-4 text-chart-2" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Accepted</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{estimatesData.filter((e) => e.status === "Accepted").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estimates Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-border/50 flex-wrap gap-4">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold">Recent Estimates</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Manage your project estimates and quotes</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
            <Input
              placeholder="Search estimates..."
              className="w-full sm:w-48 max-w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-2 sm:gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-28 sm:w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">New Estimate</span>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-semibold">Estimate ID</TableHead>
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold">Project</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Valid Until</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id} className="border-border/50">
                  <TableCell className="font-mono font-semibold">{estimate.id}</TableCell>
                  <TableCell className="font-medium">{estimate.client}</TableCell>
                  <TableCell>{estimate.project}</TableCell>
                  <TableCell className="font-semibold text-primary">{estimate.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[estimate.status as keyof typeof statusColors]}>
                      {estimate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{estimate.date}</TableCell>
                  <TableCell className="text-muted-foreground">{estimate.validUntil}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast({ title: "View Details", description: `Opening ${estimate.id}` })}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(estimate.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSend(estimate.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Client
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(estimate)}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedEstimate(estimate)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border/30">
            {filteredEstimates.map((estimate) => (
              <div key={estimate.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono font-semibold text-sm mb-1">{estimate.id}</p>
                    <p className="font-medium text-sm truncate">{estimate.client}</p>
                    <p className="text-xs text-muted-foreground truncate">{estimate.project}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => toast({ title: "View Details", description: `Opening ${estimate.id}` })}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(estimate.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSend(estimate.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Send to Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(estimate)}>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedEstimate(estimate)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge className={statusColors[estimate.status as keyof typeof statusColors]}>
                    {estimate.status}
                  </Badge>
                  <span className="text-base font-semibold text-primary">{estimate.amount}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created: {estimate.date}</span>
                  <span>Valid: {estimate.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Estimate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleAddEstimate}>
            <DialogHeader>
              <DialogTitle>Create New Estimate</DialogTitle>
              <DialogDescription>Enter the details for the new estimate.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client Name</Label>
                <Input id="client" name="client" placeholder="Client Company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project Name</Label>
                <Input id="project" name="project" placeholder="Project Description" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" name="amount" placeholder="$50,000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input id="validUntil" name="validUntil" type="date" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Estimate</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Estimate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedEstimate?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEstimate}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
