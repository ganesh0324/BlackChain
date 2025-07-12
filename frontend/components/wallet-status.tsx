"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"

export function WalletStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [address] = useState("0x1234567890abcdef1234567890abcdef12345678")

  const handleConnect = () => {
    // Placeholder for wallet connection
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handleConnect} size="sm" className="bg-blue-600 hover:bg-blue-700">
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  )
}
