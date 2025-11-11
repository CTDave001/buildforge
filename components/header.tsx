"use client"

import { Search, Moon, Sun, Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/hooks/use-theme"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onMobileMenuClick?: () => void
}

export function Header({ searchQuery, onSearchChange, onMobileMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()

  const handleNotificationClick = () => {
    console.log("[v0] Notifications clicked")
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    })
  }

  const handleProfileClick = () => {
    console.log("[v0] Profile clicked")
    toast({
      title: "Profile",
      description: "Opening your profile settings...",
    })
  }

  const handleLogout = () => {
    console.log("[v0] Logout clicked")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <header className="flex h-[73px] items-center justify-between border-b border-border bg-card/50 px-4 backdrop-blur-sm sm:px-6 lg:px-8 w-full max-w-full shrink-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMobileMenuClick}
        className="lg:hidden h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground mr-2"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none sm:left-4 sm:h-5 sm:w-5" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              console.log("[v0] Search query:", e.target.value)
              onSearchChange(e.target.value)
            }}
            className="h-10 pl-9 pr-4 text-sm rounded-xl border-border/50 bg-background/50 backdrop-blur-sm sm:h-11 sm:pl-12 sm:text-base w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNotificationClick}
          className="relative h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground hidden sm:flex"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-accent text-accent-foreground">
            3
          </Badge>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 shrink-0 rounded-xl text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="ml-2 h-8 w-px bg-border hidden sm:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-xl">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Preferences", description: "Opening preferences..." })}>
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
