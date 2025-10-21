"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Clock, User } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  read: boolean
}

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
    setMessages(savedMessages)
  }, [])

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    setMessages(updatedMessages)
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages))
  }

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId)
    setMessages(updatedMessages)
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages))
  }

  const unreadCount = messages.filter((msg) => !msg.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        {unreadCount > 0 && <Badge variant="destructive">{unreadCount} unread</Badge>}
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`${!message.read ? "border-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                    </div>
                    {!message.read && <Badge variant="destructive">New</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(message.timestamp).toLocaleDateString()}{" "}
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {message.email}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 whitespace-pre-wrap">{message.message}</p>
                <div className="flex gap-2">
                  {!message.read && (
                    <Button variant="outline" size="sm" onClick={() => markAsRead(message.id)}>
                      Mark as Read
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => deleteMessage(message.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
