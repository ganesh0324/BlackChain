"use client"

import { useState, useEffect } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { StatusCard } from "@/components/status-card"
import { WalletStatus } from "@/components/wallet-status"
import { suiApi, type Status } from "@/lib/sui-api"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyStatusPage() {
  const [myStatuses, setMyStatuses] = useState<Status[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadMyStatuses()
  }, [])

  const loadMyStatuses = async () => {
    try {
      setLoading(true)
      const data = await suiApi.getMyStatuses()
      setMyStatuses(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your statuses",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">My Status</h1>
        </div>
        <div className="ml-auto">
          <WalletStatus />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : myStatuses.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">You haven't posted any statuses yet.</p>
            ) : (
              <div className="space-y-4">
                {myStatuses.map((status) => (
                  <StatusCard key={status.id} status={status} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
