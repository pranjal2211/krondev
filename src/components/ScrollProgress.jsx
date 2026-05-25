import { useState, useEffect } from "react"

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      // Avoid division by zero on short pages
      if (docHeight === 0) return

      // progress as a percentage from 0 to 100
      const percent = (scrollTop / docHeight) * 100
      setProgress(percent)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // passive: true tells the browser this listener won't call preventDefault
    // allows the browser to scroll without waiting for JS — much smoother

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-white/5">
      <div
        className="h-full bg-primary transition-none"
        style={{ width: `${progress}%` }}
        // transition-none is intentional — we don't want easing here
        // the bar should track scroll position exactly, not lag behind
      />
    </div>
  )
}

export default ScrollProgress