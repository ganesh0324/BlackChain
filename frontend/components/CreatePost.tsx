"use client"

import { useState } from "react"

interface CreatePostProps {
  onPost: (emoji: string) => void
  loading: boolean
}

const emojis = ["😄", "👍", "❤️", "😢", "😮", "😡", "🎉", "🤔"]

export function CreatePost({ onPost, loading }: CreatePostProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("")

  const handlePost = () => {
    if (selectedEmoji) {
      onPost(selectedEmoji)
      setSelectedEmoji("")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Share Your Status</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">How are you feeling?</label>
        <div className="grid grid-cols-4 gap-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                selectedEmoji === emoji ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handlePost}
        disabled={!selectedEmoji || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Posting..." : "Post Status"}
      </button>
    </div>
  )
}
