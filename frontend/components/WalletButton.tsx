// import { useState } from "react"
// import { Wallet } from "lucide-react"

// export function WalletButton() {
//   const [isConnected, setIsConnected] = useState(false)
//   const address = "0x1234567890abcdef"

//   if (isConnected) {
//     return (
//       <div className="flex items-center gap-2">
//         <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
//           {address.slice(0, 6)}...{address.slice(-4)}
//         </span>
//         <button onClick={() => setIsConnected(false)} className="text-sm text-gray-600 hover:text-gray-800">
//           Disconnect
//         </button>
//       </div>
//     )
//   }

//   return (
//     <button
//       onClick={() => setIsConnected(true)}
//       className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     >
//       <Wallet className="w-4 h-4" />
//       Connect Wallet
//     </button>
//   )
// }


import { ConnectButton } from '@mysten/dapp-kit';
export function WalletButton() {
	return <ConnectButton />;
}