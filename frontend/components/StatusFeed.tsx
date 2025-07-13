import { formatDistanceToNow } from "date-fns"
import type { Status } from "@/lib/types"
import { StatusCard } from "./status-card"

interface StatusFeedProps {
  statuses: Status[]
}

export function StatusFeed({ statuses }: StatusFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {statuses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No statuses yet. Be the first to share!</div>
        ) : (
          statuses.map((status) => (
            <StatusCard status={status}/>
          ))
        )}
      </div>
    </div>
  )
}
