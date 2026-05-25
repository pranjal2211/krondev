import { useState, useEffect } from "react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { label: "GitHub", url: "https://github.com/pranjal2211" },
  { label: "LinkedIn", url: "https://linkedin.com/in/pranjals22" },
  { label: "Twitter", url: "https://twitter.com/Pranjal2223" },
]


function Sidebar() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section is more than 50% visible, mark it active
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

 
  return (
    <div className="flex flex-col gap-10">

      {/* Identity */}
      <div>
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 mb-6 overflow-hidden">
          <img
            src="/pfp1.webp"
            alt="Pranjal"
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if photo not loaded yet
              e.target.style.display = "none"
            }}
          />
        </div>

        {/* Name */}
        <h1 className="text-2xl font-mono text-foreground mb-1">
          Pranjal
        </h1>

        {/* Role */}
        <p className="text-foreground    font-mono text-sm mb-4">
           Developer
        </p>

        {/* Tagline */}
        <p className="text-muted font-mono text-sm leading-relaxed">
          Building clean, fast web experiences.
          Small details matter.
        </p>
      </div>

      <div className="flex flex-col gap-2 font-mono">
        {[
            { label: "Noida, India" },
            { label: "Open to opportunities" },
            { label: "B.Tech in Computer Science" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="text-sm">{item.icon}</span>
            <span className="text-muted text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <nav>
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              
               <a href={link.href}
                className={`flex items-center gap-3 py-1.5 text-sm font-mono transition-all duration-200 group ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {/* Active indicator line */}
                <span className={`h-px transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "w-8 bg-primary"
                    : "w-4 bg-muted group-hover:w-6 group-hover:bg-white"
                }`} />
                {link.label}
              </a>
            </li>
        ))}
        </ul>
      </nav>

      {/* Socials */}
      <div className="flex items-center gap-4 font-mono">
        {socials.map((s) => (
          
          <a  key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-8 h-8 rounded-lg bg-dark border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-primary/50 transition-all duration-200 text-xs font-mono"
          >
            {s.icon}
          </a>
        ))}

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 rounded-lg bg-dark border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? "☀" : "☾"}
        </button>
      </div>

      {/* Resume */}
        <a
        href="/pranjalresume.pdf"
        download
        className="inline-flex items-center gap-2 text-sm text-primary border border-primary/40 rounded-lg px-4 py-2 hover:bg-primary/10 transition-colors duration-200 w-fit font-mono"
      >
        Resume ↓
      </a>

    </div>
  )
}

export default Sidebar