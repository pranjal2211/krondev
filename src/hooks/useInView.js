import { useEffect, useRef, useState } from "react"

// threshold: how much of the element must be visible before triggering (0-1)
// triggerOnce: if true, animation only plays once — won't reset on scroll back up
function useInView(threshold = 0.15, triggerOnce = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // If triggerOnce, stop watching after first trigger
          // saves memory and CPU — no point watching something that already animated
          if (triggerOnce) observer.unobserve(element)
        } else {
          if (!triggerOnce) setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return { ref, inView }
}

export default useInView