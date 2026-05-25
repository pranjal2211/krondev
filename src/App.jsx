import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Skills from "./sections/skills"
import Experience from "./sections/Experience"
import Sidebar from "./components/Sidebar"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"
import Footer from "./components/Footer"
import GridBackground from './components/GridBackground'
import ScrollProgress from "./components/ScrollProgress"
function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay before revealing content
    // gives the browser time to paint the background first
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <GridBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:flex lg:gap-16 lg:items-start">

        {/* Sidebar fades in first */}
        <aside
          className="lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:flex-shrink-0 py-16 flex flex-col justify-between"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <Sidebar />
        </aside>

        {/* Content follows slightly after */}
        <main
          className="flex-1 py-16"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 700ms ease 200ms, transform 700ms ease 200ms",
          }}
        >
          <main
            className="flex-1 py-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms ease 200ms, transform 700ms ease 200ms",
            }}
          >
            {/* Frosted glass layer behind all content */}
            <div className="relative">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
                <Footer />
              </div>
            </div>
          </main>
          </main>
      </div>
    </div>
  )
}

export default App