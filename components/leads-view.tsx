"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Phone, Mail, MapPin, MoreVertical, UserPlus, TrendingUp, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const leads = [
  {
    id: "1",
    name: "Sarah Mitchell",
    company: "Mitchell Developments",
    email: "sarah@mitchelldev.com",
    phone: "(555) 123-4567",
    location: "Seattle, WA",
    status: "Hot",
    value: "$125,000",
    source: "Referral",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Robert Chen",
    company: "Chen Properties",
    email: "robert@chenprops.com",
    phone: "(555) 234-5678",
    location: "Portland, OR",
    status: "Warm",
    value: "$85,000",
    source: "Website",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Emily Davis",
    company: "Davis Real Estate",
    email: "emily@davisre.com",
    phone: "(555) 345-6789",
    location: "Tacoma, WA",
    status: "Cold",
    value: "$45,000",
    source: "Cold Call",
    lastContact: "3 weeks ago",
  },
  {
    id: "4",
    name: "Michael Torres",
    company: "Torres Construction Group",
    email: "michael@torrescg.com",
    phone: "(555) 456-7890",
    location: "Bellevue, WA",
    status: "Hot",
    value: "$210,000",
    source: "LinkedIn",
    lastContact: "Yesterday",
  },
]

const statusColors = {
  Hot: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  Warm: "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
  Cold: "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20",
}

export function LeadsView() {
  const { toast } = useToast()
  const [leadsData, setLeadsData] = useState(leads)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const handleContact = (leadName: string) => {
    toast({
      title: "Contact Lead",
      description: `Initiating contact with ${leadName}`,
    })
  }

  const handleConvert = (leadId: string, leadName: string) => {
    setLeadsData(leadsData.filter((lead) => lead.id !== leadId))
    toast({
      title: "Lead Converted",
      description: `${leadName} has been converted to an active job`,
    })
  }

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newLead = {
      id: String(leadsData.length + 1),
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      value: formData.get("value") as string,
      source: formData.get("source") as string,
      lastContact: "Just now",
    }
    setLeadsData([...leadsData, newLead])
    setIsAddDialogOpen(false)
    toast({
      title: "Lead Added",
      description: `${newLead.name} has been added to your pipeline`,
    })
  }

  const handleEditLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLeadsData(
      leadsData.map((lead) =>
        lead.id === selectedLead.id
          ? {
              ...lead,
              name: formData.get("name") as string,
              company: formData.get("company") as string,
              email: formData.get("email") as string,
              phone: formData.get("phone") as string,
              location: formData.get("location") as string,
              status: formData.get("status") as string,
              value: formData.get("value") as string,
              source: formData.get("source") as string,
            }
          : lead,
      ),
    )
    setIsEditDialogOpen(false)
    toast({
      title: "Lead Updated",
      description: `${selectedLead.name}'s information has been updated`,
    })
  }

  const handleDeleteLead = () => {
    setLeadsData(leadsData.filter((lead) => lead.id !== selectedLead.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Lead Deleted",
      description: `${selectedLead.name} has been removed from your pipeline`,
    })
  }

  const filteredLeads = leadsData.filter((lead) => {
    const matchesStatus = filterStatus === "All" || lead.status === filterStatus
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 w-full">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Leads</p>
              <p className="text-2xl sm:text-3xl font-bold">{leads.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Active pipeline</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">Pipeline Value</p>
              <p className="text-2xl sm:text-3xl font-bold">$465,000</p>
              <p className="text-xs sm:text-sm text-chart-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                +18% this month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">Hot Leads</p>
              <p className="text-2xl sm:text-3xl font-bold">2</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Require immediate follow-up</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Grid */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl sm:text-2xl font-bold">Pipeline</h2>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
          <Input
            placeholder="Search leads..."
            className="w-full sm:w-64 max-w-full"
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
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2 whitespace-nowrap" onClick={() => setIsAddDialogOpen(true)}>
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Lead</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 w-full">
        {filteredLeads.map((lead) => (
          <Card
            key={lead.id}
            className="group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all"
          >
            <CardHeader className="pb-4 p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">{lead.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{lead.company}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleContact(lead.name)}>Contact Lead</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleConvert(lead.id, lead.name)}>
                      Convert to Job
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedLead(lead)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedLead(lead)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      Delete Lead
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between gap-2">
                <Badge className={statusColors[lead.status as keyof typeof statusColors]}>{lead.status}</Badge>
                <span className="text-base sm:text-lg font-bold text-primary">{lead.value}</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{lead.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t gap-2">
                <span className="text-xs text-muted-foreground truncate">Last contact: {lead.lastContact}</span>
                <Badge variant="outline" className="text-xs shrink-0">
                  {lead.source}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleAddLead}>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Enter the details for the new lead.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="ABC Corp" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="(555) 123-4567" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Est. Value</Label>
                  <Input id="value" name="value" placeholder="$50,000" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Seattle, WA" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="Warm" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select name="source" defaultValue="Website" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Cold Call">Cold Call</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Lead</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditLead}>
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
              <DialogDescription>Update the lead information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={selectedLead?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input id="edit-company" name="company" defaultValue={selectedLead?.company} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" name="email" type="email" defaultValue={selectedLead?.email} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" name="phone" defaultValue={selectedLead?.phone} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-value">Est. Value</Label>
                  <Input id="edit-value" name="value" defaultValue={selectedLead?.value} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input id="edit-location" name="location" defaultValue={selectedLead?.location} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="status" defaultValue={selectedLead?.status} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-source">Source</Label>
                  <Select name="source" defaultValue={selectedLead?.source} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Cold Call">Cold Call</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedLead?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLead}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
