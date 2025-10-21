"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const MainBreathingLight = () => (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -z-10"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )

  const ArtisticLights = () => {
    const lights = Array.from({ length: 24 }, (_, i) => {
      const getColorByIndex = (index: number) => {
        const remainder = index % 10 // Using 10 for exact percentages
        if (remainder < 3) return "bg-white/30" // 30% white
        if (remainder < 6) return "bg-red-200/25" // 30% red
        if (remainder < 9) return "bg-pink-200/25" // 30% light pink (matches white and red)
        return "bg-gray-200/20" // 10% light gray
      }

      const color = getColorByIndex(i)
      const randomSize = Math.random() * 200 + 50 // Random size between 50px and 250px

      const baseDuration = 5 + randomSize / 50 // Larger lights take longer (5-9 seconds)
      const animationDuration = baseDuration + Math.random() * 2 // Add some randomness

      const shapes = [
        "rounded-full", // circle
        "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]", // organic blob 1
        "rounded-[40%_60%_70%_30%/40%_70%_30%_60%]", // organic blob 2
        "rounded-[30%_70%_40%_60%/70%_30%_60%_40%]", // organic blob 3
        "rounded-[50%_50%_50%_50%/60%_40%_60%_40%]", // oval vertical
        "rounded-[50%_50%_50%_50%/40%_60%_40%_60%]", // oval horizontal
        "rounded-[70%_30%_50%_50%/30%_70%_50%_50%]", // irregular 1
        "rounded-[50%_50%_30%_70%/50%_50%_70%_30%]", // irregular 2
      ]
      const positions = [
        "top-[10%] left-[15%]",
        "top-[25%] right-[20%]",
        "bottom-[30%] left-[10%]",
        "top-[60%] right-[15%]",
        "bottom-[15%] right-[30%]",
        "top-[40%] left-[25%]",
        "bottom-[45%] right-[40%]",
        "top-[15%] left-[60%]",
        "bottom-[20%] left-[45%]",
        "top-[70%] right-[25%]",
        "bottom-[60%] left-[70%]",
        "top-[35%] right-[60%]",
        "top-[5%] left-[40%]",
        "bottom-[10%] right-[10%]",
        "top-[80%] left-[20%]",
        "bottom-[35%] right-[55%]",
        "top-[50%] left-[5%]",
        "bottom-[25%] left-[80%]",
        "top-[20%] right-[45%]",
        "bottom-[50%] right-[5%]",
        "top-[65%] left-[50%]",
        "bottom-[40%] left-[35%]",
        "top-[30%] right-[35%]",
        "bottom-[65%] right-[70%]",
      ]

      return (
        <motion.div
          key={i}
          className={`absolute ${color} ${shapes[i % 8]} ${positions[i % 24]} blur-2xl`}
          style={{
            width: `${randomSize}px`,
            height: `${randomSize}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0.9, 0],
          }}
          transition={{
            duration: animationDuration,
            delay: Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 8 + 3, // More balanced repeat timing
            ease: "easeInOut",
          }}
        />
      )
    })
    return <>{lights}</>
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
        <MainBreathingLight />
        <ArtisticLights />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-primary mx-0 my-0 tracking-normal gap-0">Mertali  Tercan</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Building robust web applications from front to back
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="min-w-40"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-40 bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8"
      >
        <Button variant="ghost" size="icon" onClick={scrollToAbout} className="relative">
          <div className="flex flex-col items-center space-y-1">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5 text-primary mx-0 my-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
            <span className="text-xs text-muted-foreground">Explore</span>
          </div>
        </Button>
      </motion.div>
    </section>
  )
}
