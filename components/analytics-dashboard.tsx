"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { getAnalytics } from "@/lib/analytics-client"
import { Eye, Download, Activity } from "lucide-react"

type AnalyticsData = {
  totalViews: number
  sectionViews: { path: string; views: number }[]
  dailyVisitors: { day: string; count: number }[]
  resumeDownloads?: number
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getAnalytics()
        const resumeDownloads = Number.parseInt(localStorage.getItem("resumeDownloads") || "0")
        setAnalytics({ ...data, resumeDownloads })
      } catch (error) {
        console.error("Failed to fetch analytics", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    // Refresh data every 60 seconds
    const interval = setInterval(fetchAnalytics, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const CustomTooltip = ({ active, payload, label, coordinate }: any) => {
    if (active && payload && payload.length && coordinate) {
      return (
        <div
          className="bg-background border border-border rounded-lg p-3 shadow-lg pointer-events-none z-50"
          style={{
            position: "absolute",
            left: coordinate.x + 10,
            top: coordinate.y - 10,
            transform: "translate(0, -100%)",
          }}
        >
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            {payload[0].dataKey === "views" ? "Views" : "Visitors"}: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Portfolio Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                      <h3 className="text-2xl font-bold">{analytics?.totalViews || 0}</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Resume Downloads</p>
                      <h3 className="text-2xl font-bold">{analytics?.resumeDownloads || 0}</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Visitors</p>
                      <h3 className="text-2xl font-bold">
                        {analytics?.dailyVisitors[analytics.dailyVisitors.length - 1]?.count || 0}
                      </h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visitors">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    analytics?.dailyVisitors?.map((item) => ({
                      name: formatDate(item.day),
                      visitors: Number(item.count),
                    })) || []
                  }
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.1)", radius: 4 }} />
                  <Bar
                    dataKey="visitors"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    stroke="hsl(var(--primary))"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
