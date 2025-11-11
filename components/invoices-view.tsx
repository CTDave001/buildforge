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
import { Receipt, MoreVertical, Download, Send, AlertCircle, CheckCircle, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const invoices = [
  {
    id: "INV-2024-101",
    client: "Mitchell Developments",
    project: "Commercial Renovation",
    amount: "$125,000",
    paid: "$125,000",
    status: "Paid",
    dueDate: "Jan 30, 2024",
    issueDate: "Jan 15, 2024",
  },
  {
    id: "INV-2024-102",
    client: "Chen Properties",
    project: "Residential Addition",
    amount: "$85,000",
    paid: "$42,500",
    status: "Partial",
    dueDate: "Feb 5, 2024",
    issueDate: "Jan 18, 2024",
  },
  {
    id: "INV-2024-103",
    client: "Davis Real Estate",
    project: "Kitchen Remodel",
    amount: "$45,000",
    paid: "$0",
    status: "Overdue",
    dueDate: "Jan 25, 2024",
    issueDate: "Jan 10, 2024",
  },
  {
    id: "INV-2024-104",
    client: "Torres Construction Group",
    project: "Multi-Unit Development",
    amount: "$210,000",
    paid: "$0",
    status: "Pending",
    dueDate: "Feb 15, 2024",
    issueDate: "Jan 20, 2024",
  },
  {
    id: "INV-2024-105",
    client: "Green Building Corp",
    project: "Office Build-Out",
    amount: "$95,000",
    paid: "$95,000",
    status: "Paid",
    dueDate: "Feb 1, 2024",
    issueDate: "Jan 12, 2024",
  },
]

const statusConfig = {
  Paid: { color: "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20", icon: CheckCircle },
  Partial: { color: "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20", icon: AlertCircle },
  Pending: { color: "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20", icon: AlertCircle },
  Overdue: { color: "bg-destructive/10 text-destructive hover:bg-destructive/20", icon: AlertCircle },
}

export function InvoicesView() {
  const { toast } = useToast()
  const [invoicesData, setInvoicesData] = useState(invoices)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const handleDownload = (invoiceId: string) => {
    toast({
      title: "Downloading PDF",
      description: `${invoiceId} is being downloaded`,
    })
  }

  const handleSendReminder = (invoiceId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent for ${invoiceId}`,
    })
  }

  const handleRecordPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const paymentAmount = formData.get("amount") as string
    const totalAmount = Number.parseFloat(selectedInvoice.amount.replace(/[$,]/g, ""))
    const currentPaid = Number.parseFloat(selectedInvoice.paid.replace(/[$,]/g, ""))
    const newPaid = currentPaid + Number.parseFloat(paymentAmount.replace(/[$,]/g, ""))

    let newStatus = "Partial"
    if (newPaid >= totalAmount) {
      newStatus = "Paid"
    }

    setInvoicesData(
      invoicesData.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              paid: `$${newPaid.toLocaleString()}`,
              status: newStatus,
            }
          : inv,
      ),
    )
    setIsPaymentDialogOpen(false)
    toast({
      title: "Payment Recorded",
      description: `${paymentAmount} recorded for ${selectedInvoice.id}`,
    })
  }

  const handleAddInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newInvoice = {
      id: `INV-2024-${100 + invoicesData.length + 1}`,
      client: formData.get("client") as string,
      project: formData.get("project") as string,
      amount: formData.get("amount") as string,
      paid: "$0",
      status: "Pending",
      issueDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dueDate: formData.get("dueDate") as string,
    }
    setInvoicesData([newInvoice, ...invoicesData])
    setIsAddDialogOpen(false)
    toast({
      title: "Invoice Created",
      description: `${newInvoice.id} has been created`,
    })
  }

  const handleDeleteInvoice = () => {
    setInvoicesData(invoicesData.filter((inv) => inv.id !== selectedInvoice.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Invoice Deleted",
      description: `${selectedInvoice.id} has been deleted`,
    })
  }

  const filteredInvoices = invoicesData.filter((inv) => {
    const matchesStatus = filterStatus === "All" || inv.status === filterStatus
    const matchesSearch =
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + Number.parseFloat(inv.amount.replace(/[$,]/g, "")), 0)
  const totalPaid = filteredInvoices.reduce((sum, inv) => sum + Number.parseFloat(inv.paid.replace(/[$,]/g, "")), 0)
  const outstanding = totalAmount - totalPaid

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 w-full">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-primary/10 shrink-0">
                  <Receipt className="h-4 w-4 text-primary" strokeWidth={2} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Invoiced</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">${(totalAmount / 1000).toFixed(0)}k</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-chart-2/10 shrink-0">
                  <CheckCircle className="h-4 w-4 text-chart-2" strokeWidth={2} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Paid</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-chart-2">${(totalPaid / 1000).toFixed(0)}k</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-chart-4/10 shrink-0">
                  <AlertCircle className="h-4 w-4 text-chart-4" strokeWidth={2} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Outstanding</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-chart-4">${(outstanding / 1000).toFixed(0)}k</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-destructive/10 shrink-0">
                  <AlertCircle className="h-4 w-4 text-destructive" strokeWidth={2} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Overdue</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-destructive">
                {invoicesData.filter((i) => i.status === "Overdue").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-border/50 flex-wrap gap-4">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold">All Invoices</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Track and manage billing and payments</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
            <Input
              placeholder="Search invoices..."
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
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2 rounded-lg sm:rounded-xl h-9 sm:h-10 px-3 sm:px-4" onClick={() => setIsAddDialogOpen(true)}>
                <Receipt className="h-4 w-4" strokeWidth={2} />
                <span className="hidden sm:inline">New Invoice</span>
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
                <TableHead className="font-semibold">Invoice ID</TableHead>
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold">Project</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Paid</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Issue Date</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon
                return (
                  <TableRow key={invoice.id} className="border-border/50">
                    <TableCell className="font-mono font-semibold">{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell className="font-semibold">{invoice.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.paid}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.issueDate}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toast({ title: "View Invoice", description: `Opening ${invoice.id}` })}
                          >
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(invoice.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendReminder(invoice.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setIsPaymentDialogOpen(true)
                            }}
                          >
                            Record Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
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

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border/30">
            {filteredInvoices.map((invoice) => {
              const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon
              return (
                <div key={invoice.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono font-semibold text-sm mb-1">{invoice.id}</p>
                      <p className="font-medium text-sm truncate">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{invoice.project}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast({ title: "View Invoice", description: `Opening ${invoice.id}` })}
                        >
                          View Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(invoice.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendReminder(invoice.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setIsPaymentDialogOpen(true)
                          }}
                        >
                          Record Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-semibold">{invoice.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Paid</p>
                      <p className="font-medium text-muted-foreground">{invoice.paid}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {invoice.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Issued: {invoice.issueDate}</span>
                    <span>Due: {invoice.dueDate}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Invoice Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleAddInvoice}>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Enter the details for the new invoice.</DialogDescription>
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Invoice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <form onSubmit={handleRecordPayment}>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>Record a payment for {selectedInvoice?.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Invoice Amount</Label>
                <p className="text-2xl font-bold">{selectedInvoice?.amount}</p>
              </div>
              <div className="space-y-2">
                <Label>Already Paid</Label>
                <p className="text-lg text-muted-foreground">{selectedInvoice?.paid}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input id="amount" name="amount" placeholder="$25,000" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Record Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedInvoice?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteInvoice}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
