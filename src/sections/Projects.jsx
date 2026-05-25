import FadeIn from "../components/FadeIn"
import StaggerContainer from "../components/StaggerContainer"
import { projects } from "../data/projects"

function Projects() {
  return (
    <section id="projects" className="mb-20">
      <FadeIn direction="up">
        <h2 className="text-xs font-mono text-foreground uppercase tracking-widest mb-6">
          Projects
        </h2>
      </FadeIn>

      <StaggerContainer staggerDelay={120} direction="up" className="flex flex-col divide-y divide-white/5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group py-5 hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <div className="flex gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-mono hover:text-primary text-xs transition-colors duration-200"
                >
                  GitHub ↗
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-mono hover:text-primary text-xs transition-colors duration-200"
                >
                  Live ↗
                </a>
              </div>
            </div>

            <p className="text-foreground font-mono text-sm leading-relaxed mb-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </StaggerContainer>
    </section>
  )
}

export default Projects