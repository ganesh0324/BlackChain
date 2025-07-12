export interface Status {
  id: string
  emoji: string
  userAddress: string
  timestamp: string
}

// Mock data for demonstration
const mockStatuses: Status[] = [
  {
    id: "1",
    emoji: "😄",
    userAddress: "0x1234567890abcdef1234567890abcdef12345678",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "2",
    emoji: "❤️",
    userAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    id: "3",
    emoji: "🎉",
    userAddress: "0x9876543210fedcba9876543210fedcba98765432",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
]

const currentUserAddress = "0x1234567890abcdef1234567890abcdef12345678"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const suiApi = {
  async getStatuses(): Promise<Status[]> {
    await delay(1000) // Simulate network delay

    // Simulate occasional API failure
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch statuses")
    }

    return [...mockStatuses].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },

  async getMyStatuses(): Promise<Status[]> {
    await delay(800)

    return mockStatuses
      .filter((status) => status.userAddress === currentUserAddress)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },

  async createStatus(emoji: string): Promise<Status> {
    await delay(1500) // Simulate blockchain transaction time

    // Simulate occasional posting failure
    if (Math.random() < 0.15) {
      throw new Error("Failed to post status to blockchain")
    }

    const newStatus: Status = {
      id: Date.now().toString(),
      emoji,
      userAddress: currentUserAddress,
      timestamp: new Date().toISOString(),
    }

    // Add to mock data
    mockStatuses.unshift(newStatus)

    return newStatus
  },
}
