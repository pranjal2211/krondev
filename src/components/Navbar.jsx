import { useState, useEffect } from "react"

// The links array lives outside the component — it never changes,
// so there's no reason to recreate it on every render
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

function Navbar() {
  // menuOpen tracks whether the mobile menu is visible
  // false = closed, true = open
  const [menuOpen, setMenuOpen] = useState(false)

  // scrolled tracks whether the user has scrolled past 50px
  // we use this to add a background to the navbar
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // This function runs every time the user scrolls
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    // Attach the listener when the component mounts
    window.addEventListener("scroll", handleScroll)

    // Cleanup: remove the listener when the component unmounts
    // Without this you'd leak memory on every re-render
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // empty array = run this effect only once, on mount

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-primary backdrop-blur-sm shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Name — links back to top */}
        <a href="#" className="text-foreground font-mono text-xl font-mono">
          Pranjal<span className="text-primary text-foreground">.dev</span>
        </a>

        {/* Desktop nav links — hidden on mobile, flex on md+ screens */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-muted hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — only visible on mobile */}
        <button
          className="md:hidden bg-primary text-foreground flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {/* Three lines that make up the hamburger icon */}
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {/* This whole block only renders when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden bg-primary/90 backdrop-blur-sm px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors duration-200 block"
                  onClick={() => setMenuOpen(false)} // close menu on link click
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar