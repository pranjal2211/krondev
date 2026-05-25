import FadeIn from "../components/FadeIn"
import { skills } from "../data/skills"

function Skills() {
  return (
    <section id="skills" className="mb-20">
      <FadeIn direction="up">
        <h2 className="text-xs font-mono text-foreground uppercase tracking-widest mb-6">
          Stack
        </h2>
      </FadeIn>

      <FadeIn direction="up" delay={100}>
        <div className=" font-mono flex flex-wrap gap-2">
          {skills.flatMap(g => g.items).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full font-monotext-sm border border-white/10 text-muted hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}

export default Skills