"use client"

import { Button } from "@/components/ui/button"

const emojis = [
  { emoji: "😄", label: "haha" },
  { emoji: "👍", label: "like" },
  { emoji: "❤️", label: "love" },
  { emoji: "😢", label: "sad" },
  { emoji: "😮", label: "wow" },
  { emoji: "😡", label: "angry" },
  { emoji: "🎉", label: "celebrate" },
  { emoji: "🤔", label: "thinking" },
]

interface EmojiPickerProps {
  selectedEmoji: string
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ selectedEmoji, onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {emojis.map(({ emoji, label }) => (
        <Button
          key={emoji}
          variant={selectedEmoji === emoji ? "default" : "outline"}
          size="lg"
          onClick={() => onEmojiSelect(emoji)}
          className={`h-12 text-xl ${
            selectedEmoji === emoji
              ? "bg-blue-600 hover:bg-blue-700 border-blue-600"
              : "hover:bg-blue-50 hover:border-blue-300"
          }`}
          aria-label={`Select ${label} emoji`}
        >
          {emoji}
        </Button>
      ))}
    </div>
  )
}
