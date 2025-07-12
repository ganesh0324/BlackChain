"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmojiPicker } from "@/components/emoji-picker"

interface CreatePostProps {
  onPost: (emoji: string) => Promise<void>
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = async () => {
    if (!selectedEmoji) return

    try {
      setIsPosting(true)
      await onPost(selectedEmoji)
      setSelectedEmoji("")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Share Your Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
          <EmojiPicker selectedEmoji={selectedEmoji} onEmojiSelect={setSelectedEmoji} />
        </div>
        <Button
          onClick={handlePost}
          disabled={!selectedEmoji || isPosting}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isPosting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Posting...
            </>
          ) : (
            "Post Status"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
