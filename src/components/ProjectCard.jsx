// This component receives one project object as a prop
// and renders a single card — it has no idea about the others
function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, githubUrl } = project

  return (
    <div className="group bg-surface rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col">

      {/* Top row — folder icon and links */}
      <div className="flex items-center justify-between mb-6">
        {/* Folder icon using unicode */}
        <span className="text-primary text-3xl">⬡</span>

        <div className="flex gap-4">
          {/* GitHub link */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted font-mono hover:text-foreground transition-colors duration-200"
            aria-label="GitHub repository"
          >
            {/* Simple text link — you can replace with an SVG icon later */}
            GitHub ↗
          </a>

          {/* Live site link */}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted font-mono hover:text-foreground transition-colors duration-200"
            aria-label="Live project"
          >
            Live ↗
          </a>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-foreground font-mono text-xl mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description — grows to fill available space, pushing tags to bottom */}
      <p className="text-muted font-mono leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-primary font-mono text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}

export default ProjectCard