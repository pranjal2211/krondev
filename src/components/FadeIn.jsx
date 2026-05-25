import useInView from "../hooks/useInView"

// direction: where the element slides in FROM
// delay: stagger offset in milliseconds — used for lists
function FadeIn({
  children,
  direction = "up",    // "up" | "down" | "left" | "right" | "none"
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = "",
}) {
  const { ref, inView } = useInView(threshold)

  // Starting transform based on direction
  // Element begins offset and slides to its natural position
  const directionMap = {
    up:    "translateY(30px)",
    down:  "translateY(-30px)",
    left:  "translateX(30px)",
    right: "translateX(-30px)",
    none:  "translate(0)",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : directionMap[direction],
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        // willChange hints to the browser to prepare GPU compositing
        // improves animation performance significantly
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn