"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Building2, Bell, Shield, Users, Mail, Phone, MapPin, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function SettingsView() {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@constructionpro.com",
    phone: "(555) 123-4567",
  })

  const [companyData, setCompanyData] = useState({
    name: "Construction Pro LLC",
    address: "456 Commerce St, Seattle, WA 98101",
    taxId: "12-3456789",
    license: "CON-2024-12345",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    leads: true,
    invoices: true,
    tasks: true,
  })

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile settings have been updated successfully",
    })
  }

  const handleSaveCompany = () => {
    toast({
      title: "Company Settings Saved",
      description: "Company information has been updated successfully",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Saved",
      description: "Your notification preferences have been updated",
    })
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    })
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Section */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Company Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-chart-1/10">
              <Building2 className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage your company information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={companyData.name}
              onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / EIN</Label>
            <Input
              id="taxId"
              value={companyData.taxId}
              onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              value={companyData.license}
              onChange={(e) => setCompanyData({ ...companyData, license: e.target.value })}
            />
          </div>
          <Button onClick={handleSaveCompany} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-chart-4/10">
              <Bell className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you receive</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about your jobs</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Lead Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when new leads come in</p>
            </div>
            <Switch
              checked={notifications.leads}
              onCheckedChange={(checked) => setNotifications({ ...notifications, leads: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Invoice Reminders</Label>
              <p className="text-sm text-muted-foreground">Reminders for overdue invoices</p>
            </div>
            <Switch
              checked={notifications.invoices}
              onCheckedChange={(checked) => setNotifications({ ...notifications, invoices: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Task Deadlines</Label>
              <p className="text-sm text-muted-foreground">Alerts for upcoming task deadlines</p>
            </div>
            <Switch
              checked={notifications.tasks}
              onCheckedChange={(checked) => setNotifications({ ...notifications, tasks: checked })}
            />
          </div>
          <Button onClick={handleSaveNotifications} className="gap-2">
            <Save className="h-4 w-4" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Team Management */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-chart-2/10">
              <Users className="h-5 w-5 text-chart-2" />
            </div>
            <div className="flex-1">
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and permissions</CardDescription>
            </div>
            <Button size="sm">Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "John Doe", role: "Admin", email: "john@constructionpro.com" },
            { name: "Jane Smith", role: "Manager", email: "jane@constructionpro.com" },
            { name: "Mike Johnson", role: "Member", email: "mike@constructionpro.com" },
          ].map((member) => (
            <div
              key={member.email}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {member.role}
                </span>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-destructive/10">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" name="currentPassword" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" name="newPassword" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  toast({ title: "2FA Enabled", description: "Two-factor authentication has been enabled" })
                }
              >
                Enable
              </Button>
            </div>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
