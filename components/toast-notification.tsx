"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface ToastNotificationProps {
  show: boolean
  message: string
  duration?: number
  onClose: () => void
}

export default function ToastNotification({ show, message, duration = 3000, onClose }: ToastNotificationProps) {
  const [progress, setProgress] = useState(100)

  const memoizedOnClose = useCallback(onClose, [onClose])

  useEffect(() => {
    if (show) {
      setProgress(100)
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100)
          if (newProgress <= 0) {
            clearInterval(interval)
            setTimeout(() => memoizedOnClose(), 0)
            return 0
          }
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [show, duration, memoizedOnClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 1.2,
            duration: 0.8,
          }}
          className="fixed bottom-6 left-6 z-50 bg-green-500/20 backdrop-blur-md border-2 border-green-400 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-300" />
          <span className="font-medium text-green-100">{message}</span>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-700/30 overflow-hidden rounded-b-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-300"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
