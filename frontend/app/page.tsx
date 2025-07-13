"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { CreatePost } from "@/components/CreatePost"
import { StatusFeed } from "@/components/StatusFeed"
import { WalletButton } from "@/components/WalletButton"
import { Status } from "@/lib/types"
import { useRecentStatuses } from "@/hooks/useRecentStatuses"
import { TESTNET_BLACKCHAIN_PACKAGE_ID } from "@/lib/networkConfig"
import { useCurrentAccount } from "@mysten/dapp-kit"

const mockStatuses: Status[] = [
  {
    id: "1",
    emoji: "😄",
    userAddress: "0x1234567890abcdef",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    emoji: "❤️",
    userAddress: "0xabcdef1234567890",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
]

export default function HomePage() {
  const {statuses, loading} = useRecentStatuses(TESTNET_BLACKCHAIN_PACKAGE_ID);
  const [currentPage, setCurrentPage] = useState("home")

  const handleNewPost = async (emoji: string) => {
    console.log("Post done successfully with emoji: ", emoji);
    // alert("Status posted successfully!")
  }
  const userAddress = useCurrentAccount()?.address;
  const myStatuses = statuses.filter((s) => s.userAddress === userAddress)

  return (
    <div className="flex h-screen">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {currentPage === "home" ? "Home Feed" : currentPage === "status" ? "My Status" : "Connect Wallet"}
            </h1>
            <WalletButton />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {currentPage === "home" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <CreatePost onPost={handleNewPost} loading={loading} />
              <StatusFeed statuses={statuses} />
            </div>
          )}

          {currentPage === "status" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Your Recent Activity</h2>
                {myStatuses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No statuses yet</p>
                ) : (
                  <StatusFeed statuses={myStatuses} />
                )}
              </div>
            </div>
          )}

          {currentPage === "wallet" && (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Connect Your SUI Wallet</h2>
                <p className="text-gray-600 mb-6">Connect your wallet to start posting on the SUI blockchain.</p>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700">
                  Connect SUI Wallet
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
