import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, DollarSign, CheckSquare, TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  {
    title: "Active Jobs",
    value: "24",
    change: "+3 from last month",
    icon: Briefcase,
    trend: "up" as const,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Outstanding Invoices",
    value: "$48,250",
    change: "12 pending payments",
    icon: DollarSign,
    trend: "neutral" as const,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    title: "Upcoming Tasks",
    value: "18",
    change: "Due this week",
    icon: CheckSquare,
    trend: "up" as const,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Revenue (MTD)",
    value: "$124,500",
    change: "+12% from last month",
    icon: TrendingUp,
    trend: "up" as const,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

const trendIcons = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: Minus,
}

const trendColors = {
  up: "text-chart-2",
  down: "text-destructive",
  neutral: "text-muted-foreground",
}

export function KpiCards() {
  return (
    <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 sm:gap-6 w-full">
      {kpis.map((kpi) => {
        const TrendIcon = trendIcons[kpi.trend]
        return (
          <Card
            key={kpi.title}
            className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0 sm:space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide sm:text-sm">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{kpi.value}</p>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <TrendIcon className={cn("h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5", trendColors[kpi.trend])} strokeWidth={2.5} />
                    <span className="text-muted-foreground truncate">{kpi.change}</span>
                  </div>
                </div>
                <div className={cn("rounded-xl p-2.5 shrink-0 transition-transform group-hover:scale-110 sm:p-3", kpi.bgColor)}>
                  <kpi.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", kpi.color)} strokeWidth={2} />
                </div>
              </div>
            </CardContent>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer pointer-events-none" />
          </Card>
        )
      })}
    </div>
  )
}
