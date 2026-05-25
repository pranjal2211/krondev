import { useState } from "react"
import FadeIn from "../components/FadeIn"
import StaggerContainer from "../components/StaggerContainer"

const socials = [
  { label: "GitHub", url: "https://github.com/pranjal2211" },
  { label: "LinkedIn", url: "https://linkedin.com/in/pranjals22" },
  { label: "Twitter", url: "https://twitter.com/Pranjal2223" },
]
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)

  try {
    const response = await fetch("https://formspree.io/f/xnjrgbae", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    } else {
      alert("Something went wrong. Please try again.")
    }
  } catch (error) {
    alert("Network error. Please try again.")
  } finally {
    setLoading(false)
  }
}
  return (
    <section id="contact" className="mb-20">
      <FadeIn direction="up">
        <h2 className="text-xs font-mono text-foreground uppercase tracking-widest mb-6">
          Contact
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <p className="text-foreground font-mono text-sm leading-relaxed mb-10 max-w-md">
          I'm currently open to new opportunities. Whether you have a project
          in mind or just want to say hi — my inbox is always open.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left — Form */}
        <FadeIn direction="up" delay={150}>
          {submitted ? (
            <div className="py-8">
              <p className="text-4xl mb-4">✅</p>
              <h3 className="text-foreground font-semibold mb-2">Message sent!</h3>
              <p className="text-foreground/60 text-sm mb-4">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary text-sm underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-foreground text-xs font-mono uppercase tracking-wider block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full font-mono bg-foreground border-b border-white/10 py-2 text-foreground text-sm placeholder:text-muted/90 focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>

              <div>
                <label className="text-foreground text-xs font-mono uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full font-mono bg-foreground border-b border-white/10 py-2 text-foreground text-sm placeholder:text-muted/90 focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>

              <div>
                <label className="text-foreground text-xs font-mono uppercase tracking-wider block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full font-mono bg-foreground border-b border-white/10 py-2 text-foreground text-sm placeholder:text-muted/90 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-fit px-6 py-2 border border-primary text-primary text-sm font-mono rounded-lg hover:bg-primary/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </FadeIn>

        {/* Right — Socials and email */}
        <FadeIn direction="up" delay={200}>
          <div className="flex flex-col gap-8">

            <div>
              <p className="text-foreground text-xs font-mono uppercase tracking-wider mb-3">
                Direct Email
              </p>
            <a  
                href="mailto:pranjal.221299@email.com"
                className="text-foreground hover:text-primary transition-colors duration-200 font-mono"
              >
                pranjal.221299@gmail.com
              </a>
            </div>

            <div>
              <p className="text-foreground text-xs font-mono uppercase tracking-wider mb-3">
                Find Me On
              </p>
              <div className="flex flex-col gap-2 font-mono">
                {socials.map((social) => (
                 <a 
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/60 text-sm hover:text-primary transition-colors duration-200 group w-fit"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  )
}

export default Contact