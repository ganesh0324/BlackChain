import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import type { Status } from "@/lib/types"

interface StatusCardProps {
  status: Status
}

export function StatusCard({ status }: StatusCardProps) {
  return (
    <Card className="rounded-none border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{status.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant = "secondary" className="font-mono text-xs">
                {status.userAddress.slice(0, 8)}...{status.userAddress.slice(-6)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Status update on SUI blockchainn!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
