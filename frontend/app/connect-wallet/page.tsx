"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Shield, Zap } from "lucide-react"

export default function ConnectWalletPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Connect Wallet</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 max-w-2xl mx-auto">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Connect Your SUI Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Connect your SUI wallet to start posting statuses and interacting with the blockchain.
            </p>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">Secure Connection</h3>
                  <p className="text-sm text-muted-foreground">Your wallet connection is encrypted and secure</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium">Fast Transactions</h3>
                  <p className="text-sm text-muted-foreground">Post statuses instantly on the SUI blockchain</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Wallet className="h-4 w-4 mr-2" />
              Connect SUI Wallet
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By connecting your wallet, you agree to our terms of service and privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
