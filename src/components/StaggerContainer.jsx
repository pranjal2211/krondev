import FadeIn from "./FadeIn"

// Wraps a list of items and automatically staggers their animations
// Each child appears STAGGER_DELAY ms after the previous one
function StaggerContainer({
  children,
  staggerDelay = 100,
  direction = "up",
  className = "",
}) {
  // React.Children.map lets us iterate over children like an array
  // We inject a delay prop into each FadeIn based on its index
  const items = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {items.map((child, index) => (
        <FadeIn
          key={index}
          delay={index * staggerDelay}
          direction={direction}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

export default StaggerContainer