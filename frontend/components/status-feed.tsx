import { StatusCard } from "@/components/status-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Status } from "@/lib/sui-api"

interface StatusFeedProps {
  statuses: Status[]
  loading: boolean
}

export function StatusFeed({ statuses, loading }: StatusFeedProps) {
  if (loading) {
    return (
      <Card className="rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statuses.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No statuses yet. Be the first to share!</p>
        ) : (
          statuses.map((status) => <StatusCard key={status.id} status={status} />)
        )}
      </CardContent>
    </Card>
  )
}
