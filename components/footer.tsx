import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-2">Mertali Tercan</h3>
            <p className="text-gray-400 text-sm">{"CS @ "}</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">contact@example.com</span>
            </a>

            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-400 text-sm">© 2024 Mertali Tercan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
