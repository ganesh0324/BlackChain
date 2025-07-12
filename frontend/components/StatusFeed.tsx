import { formatDistanceToNow } from "date-fns"
import type { Status } from "@/app/page"

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
            <div key={status.id} className="p-4 flex items-start gap-3">
              <div className="text-2xl">{status.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                    {status.userAddress.slice(0, 8)}...{status.userAddress.slice(-6)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Status update on SUI blockchain</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
