// Add your real experience here
const experiences = [
  {
    id: 1,
    company: "Apex Byte",
    role: "Frontend Developer",
    period: "2024 — 2025",
    type: "Internship",
    description: "Built a task management web app using React and Tailwind CSS, implementing features like drag-and-drop task organization, real-time updates with WebSockets, and responsive design for seamless use across devices.",
    tags: ["React", "Tailwind", "Javascript", "Git"],
  },
  {
    id: 2,
    company: "CyberCure Technologies",
    role: "Junior Developer",
    period: "2025 — 2025",
    type: "Internship",
    description: "Built a React based Expense Tracker with dynamic real-time UI updates and integrated it with REST APIs for seamless data management.",
    tags: ["React", "JavaScript", "REST API", "Git"],
  },
]

function Experience() {
  return (
    <section id="experience" className="mb-20 bg">
      <h2 className="text-xs font-mono text-foreground uppercase tracking-widest mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative pl-4 border-l border-white/10 hover:border-primary/50 transition-colors duration-300"
          >
            {/* Dot on the timeline line */}
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-surface bg-muted group-hover:bg-primary group-hover:border-primary transition-colors duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <div>
                <h3 className="text-foreground font-mono">{exp.role}</h3>
                <p className="text-primary text-sm font-mono">{exp.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-foreground text-xs font-mono">{exp.period}</p>
                <p className="text-foreground/60 text-xs font-mono">{exp.type}</p>
              </div>
            </div>

            <p className="text-foreground font-mono text-sm leading-relaxed mb-3">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono text-primary/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience