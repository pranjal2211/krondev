// 
import FadeIn from "../components/FadeIn"

const stats = [
  { label: "Years Learning", value: "2+" },
  { label: "Projects Built", value: "10+" },
  { label: "Cups of Coffee", value: "∞" },
  { label: "Bugs Fixed", value: "99%" },
]

function About() {
  return (
    <section id="about" className="mb-20">
      <FadeIn direction="up">
        <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-6">
          About
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <div className="space-y-4 mb-10">
          <p className="text-foreground font-mono leading-relaxed">
            I'm a frontend developer based in {"Noida"}
            <span className="text-primary"></span>, passionate about
            building beautiful, accessible web experiences. I care deeply about
            the small details that make interfaces feel polished.
          </p>
          <p className="text-muted font-mono leading-relaxed">
            When I'm not coding, you'll find me gulping down cans of Diet Coke. I'm currently
            open to new opportunities and interesting projects.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn direction="up" delay={200}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 hover:border-primary/40"
              style={{
                background: "var(--color-stat-bg)",
                border: "1px solid var(--color-stat-border)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <p className="text-2xl font-mono text-primary mb-1">{stat.value}</p>
              <p className="text-muted text-xs font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={300}>
        <a
          href="/pranjalresume.pdf"
          download
          className="inline-flex items-center gap-2 text-sm text-primary font-mono hover:underline underline-offset-4 transition-all duration-200"
        >
          Download Resume ↓
        </a>
      </FadeIn>
    </section>
  )
}

export default About