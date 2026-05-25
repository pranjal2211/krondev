import { useState, useEffect } from "react"

// The titles that will cycle through the typing animation
const titles = [
  "Frontend ",
  "Backend ",
  "Cloud & DevOps ",
]

function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentTitle = titles[titleIndex]

    // Set a timer — runs every 100ms when typing, 50ms when deleting
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Add one character
        setDisplayText(currentTitle.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)

        // If we've typed the full word, pause then start deleting
        if (charIndex === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Remove one character
        setDisplayText(currentTitle.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)

        // If fully deleted, move to next title
        if (charIndex === 0) {
          setIsDeleting(false)
          setTitleIndex(i => (i + 1) % titles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    // Cleanup the timer on every re-render to avoid stacking timers
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, titleIndex])

  return (
    <section
      id="hero"
      className="min-h-screen bg-primary flex items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">

        {/* Greeting */}
        <p className="text-foreground font-mono mb-4 text-lg">
          Hi, my name is
        </p>

        {/* Your name — make this big and bold */}
        <h1 className="text-5xl md:text-7xl font-mono text-foreground   mb-4">
          Pranjal Singh
        </h1>

        {/* Typing animation */}
        {/* The pipe character acts as a blinking cursor */}
        <h2 className="text-2xl md:text-4xl font-mono text-muted mb-6 h-20">
          {displayText}
          <span className="animate-pulse text-primary">|</span>
        </h2>

        {/* Tagline */}
        <p className="text-muted text-lg max-w-xl mx-auto mb-10 font-mono">
          I build.
          <br />
          Currently looking for new opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
          <a
            href="#projects"
            className="px-8 py-3 bg-surface text-foreground font-mono rounded-lg hover:bg-surface/80 transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-secondary text-foreground font-mono rounded-lg hover:bg-secondary/10 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>

      </div>
    </section>
  )
}

export default Hero