// Client-side analytics using localStorage
export type PageView = {
  path: string
  timestamp: number
  referrer: string
  userAgent: string
}

export type AnalyticsData = {
  totalViews: number
  pathViews: Record<string, number>
  dailyVisitors: Record<string, string[]>
}

const ANALYTICS_KEY = "portfolio_analytics"

function getAnalyticsData(): AnalyticsData {
  if (typeof window === "undefined") {
    return { totalViews: 0, pathViews: {}, dailyVisitors: {} }
  }

  const data = localStorage.getItem(ANALYTICS_KEY)
  if (!data) {
    return { totalViews: 0, pathViews: {}, dailyVisitors: {} }
  }

  try {
    return JSON.parse(data)
  } catch {
    return { totalViews: 0, pathViews: {}, dailyVisitors: {} }
  }
}

function saveAnalyticsData(data: AnalyticsData) {
  if (typeof window === "undefined") return
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
}

export async function trackPageView(data: PageView) {
  try {
    const analytics = getAnalyticsData()

    // Increment total views
    analytics.totalViews += 1

    // Increment path-specific views
    analytics.pathViews[data.path] = (analytics.pathViews[data.path] || 0) + 1

    // Track unique visitors by day
    const today = new Date().toISOString().split("T")[0]
    if (!analytics.dailyVisitors[today]) {
      analytics.dailyVisitors[today] = []
    }
    if (!analytics.dailyVisitors[today].includes(data.userAgent)) {
      analytics.dailyVisitors[today].push(data.userAgent)
    }

    saveAnalyticsData(analytics)
    return { success: true }
  } catch (error) {
    console.error("Error tracking page view:", error)
    return { success: false, error }
  }
}

export async function getAnalytics() {
  try {
    const analytics = getAnalyticsData()

    // Get views for each section
    const sections = ["", "about", "skills", "projects", "experience", "contact"]
    const sectionViews = sections.map((section) => {
      const path = section ? `/${section}` : "/"
      const views = analytics.pathViews[path] || 0
      return { path: section || "home", views }
    })

    // Get visitor counts for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    })

    const dailyVisitors = last7Days
      .map((day) => {
        const visitors = analytics.dailyVisitors[day] || []
        return { day, count: visitors.length }
      })
      .reverse()

    return {
      totalViews: analytics.totalViews,
      sectionViews,
      dailyVisitors,
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return {
      totalViews: 0,
      sectionViews: [],
      dailyVisitors: [],
    }
  }
}
