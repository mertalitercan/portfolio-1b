"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Experience = {
  company: string
  position: string
  period: string
  description: string
  technologies: string[]
  responsibilities: string[]
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      company: "TechInnovate Solutions",
      position: "Senior Full-Stack Developer",
      period: "Jan 2022 - Present",
      description: "Leading development of enterprise SaaS platforms for financial services clients.",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      responsibilities: [
        "Architected and implemented scalable microservices architecture",
        "Led a team of 5 developers using Agile methodologies",
        "Optimized application performance, reducing load times by 40%",
        "Implemented CI/CD pipelines with GitHub Actions and AWS",
        "Collaborated with UX designers to create intuitive user interfaces",
      ],
    },
    {
      company: "DataFlow Systems",
      position: "Full-Stack Developer",
      period: "Mar 2020 - Dec 2021",
      description: "Developed data visualization and analytics platforms for business intelligence.",
      technologies: ["React", "Express.js", "MongoDB", "D3.js", "GraphQL", "Docker"],
      responsibilities: [
        "Built responsive dashboards with real-time data visualization",
        "Developed RESTful and GraphQL APIs for data retrieval and manipulation",
        "Implemented authentication and authorization systems",
        "Optimized database queries for large datasets",
        "Participated in code reviews and mentored junior developers",
      ],
    },
    {
      company: "WebSphere Innovations",
      position: "Frontend Developer",
      period: "Jun 2018 - Feb 2020",
      description: "Created interactive web applications for e-commerce and media clients.",
      technologies: ["React", "Redux", "JavaScript", "SASS", "Webpack", "Jest"],
      responsibilities: [
        "Developed responsive and accessible user interfaces",
        "Implemented state management with Redux and Context API",
        "Created reusable component libraries",
        "Wrote unit and integration tests with Jest and React Testing Library",
        "Collaborated with backend developers to integrate APIs",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey building real-world applications
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-xl">{exp.position}</CardTitle>
                    <Badge variant="outline" className="md:ml-auto w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <div className="text-lg font-medium text-primary">{exp.company}</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
