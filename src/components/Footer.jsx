const socials = [
  { label: "GitHub", url: "https://github.com/pranjal2211" },
  { label: "LinkedIn", url: "https://linkedin.com/in/pranjals22" },
  { label: "Twitter", url: "https://twitter.com/Pranjal2223" },
]

function Footer() {
  const year = new Date().getFullYear() // always shows current year automatically

  return (
    <footer className=" border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left — name and tagline */}
          <div className="text-center md:text-left">
            <p className="text-muted font-mono text-sm mt-1">
              Designed & Built 
            </p>
            <p className="text-foreground font-mono font-mono">
              pranjal<span className="text-primary">.</span>
            </p>
          </div>

          {/* Center — social links */}
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted font-mono hover:text-primary transition-colors duration-200 text-sm"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Right — copyright */}
          <p className="text-muted font-mono text-sm">
            © {year} All rights reserved.
          </p>

        </div>

        {/* Back to top button */}
        <div className="text-center mt-8 flex justify-center">
          <a
            href="#"
            className="text-muted font-mono hover:text-primary transition-colors duration-200 text-sm inline-flex items-center gap-2"
          >
            Back to top ↑
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer