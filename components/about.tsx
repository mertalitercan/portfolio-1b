"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 py-8">
              <p className="text-lg mb-4">
                I'm a passionate full-stack developer with expertise in building modern web applications. With a strong
                foundation in both frontend and backend technologies, I create seamless, user-focused experiences that
                solve real-world problems.
              </p>
              <p className="text-lg mb-4">
                My approach combines clean code principles with innovative solutions, ensuring applications are not only
                functional but also maintainable and scalable.
              </p>
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2.5 mb-0">
                  <Badge
                    variant="outline"
                    className="text-sm px-3 py-[3px] border-2 border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400 transition-all duration-200"
                  >
                    Problem Solver
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm px-3 py-[3px] border-2 border-green-400/50 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400 transition-all duration-200"
                  >
                    Clean Code Advocate
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm py-[3px] px-3 border-2 border-purple-400/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400 transition-all duration-200"
                  >
                    Performance Optimizer
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm py-[3px] px-3 border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400 transition-all duration-200"
                  >
                    UX Enthusiast
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm py-[3px] px-3 border-2 border-teal-400/50 bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 hover:border-teal-400 transition-all duration-200"
                  >
                    Innovation Driven
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
