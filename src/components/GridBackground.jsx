import { useEffect, useRef } from "react"

// How many sparks travel at once — increase for more activity
const SPARK_COUNT = 12
// Must match the grid size in your CSS
const GRID_SIZE = 45

function GridBackground() {
  // useRef gives us a persistent reference to the canvas DOM element
  // without causing re-renders when it changes
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationId // stores the requestAnimationFrame id so we can cancel it

    // Make canvas fill the full window
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Create a single spark object
    // Each spark snaps to a grid line and travels along it
    function createSpark() {
      // Randomly decide if this spark travels horizontally or vertically
      const horizontal = Math.random() > 0.5

      if (horizontal) {
        // Snap y to a grid line
        const gridY = Math.floor(Math.random() * (canvas.height / GRID_SIZE))
        return {
          x: Math.random() * canvas.width,
          y: gridY * GRID_SIZE,
          dx: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 2),
          dy: 0,
          horizontal: true,
          trail: [], // stores previous positions for the glowing tail
          life: 1,   // opacity — fades out as spark ages
          speed: 1.5 + Math.random() * 2,
        }
      } else {
        // Snap x to a grid line
        const gridX = Math.floor(Math.random() * (canvas.width / GRID_SIZE))
        return {
          x: gridX * GRID_SIZE,
          y: Math.random() * canvas.height,
          dx: 0,
          dy: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 2),
          horizontal: false,
          trail: [],
          life: 1,
          speed: 1.5 + Math.random() * 2,
        }
      }
    }

    // Initialize all sparks
    let sparks = Array.from({ length: SPARK_COUNT }, createSpark)

    function draw() {
      // Clear the canvas each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparks.forEach((spark, index) => {
        // Save current position to trail before moving
        spark.trail.push({ x: spark.x, y: spark.y })

        // Keep trail length to 12 points max — older ones get dropped
        if (spark.trail.length > 12) {
          spark.trail.shift() // removes the oldest point
        }

        // Move the spark
        spark.x += spark.dx
        spark.y += spark.dy

        // At every grid intersection, randomly decide to turn
        const onVerticalLine = Math.abs(spark.x % GRID_SIZE) < 2
        const onHorizontalLine = Math.abs(spark.y % GRID_SIZE) < 2

        if (spark.horizontal && onVerticalLine && Math.random() < 0.08) {
          // Turn vertical
          spark.dy = (Math.random() > 0.5 ? 1 : -1) * spark.speed
          spark.dx = 0
          spark.horizontal = false
          // Snap to the grid line exactly
          spark.x = Math.round(spark.x / GRID_SIZE) * GRID_SIZE
        } else if (!spark.horizontal && onHorizontalLine && Math.random() < 0.08) {
          // Turn horizontal
          spark.dx = (Math.random() > 0.5 ? 1 : -1) * spark.speed
          spark.dy = 0
          spark.horizontal = true
          spark.y = Math.round(spark.y / GRID_SIZE) * GRID_SIZE
        }

        // Fade out near edges
        const margin = 80
        const distToEdge = Math.min(
          spark.x, spark.y,
          canvas.width - spark.x,
          canvas.height - spark.y
        )
        spark.life = Math.min(1, distToEdge / margin)

        // Draw the trail
        // Each trail point is slightly smaller and more transparent than the last
        spark.trail.forEach((point, i) => {
          const progress = i / spark.trail.length  // 0 = oldest, 1 = newest
          const alpha = progress * spark.life * 0.8
          const radius = progress * 2.5

          ctx.beginPath()
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)

          // Glow effect — layered circles with decreasing opacity
          ctx.fillStyle = `rgba(108, 99, 255, ${alpha})`
          ctx.fill()
        })

        // Draw the spark head — bright glowing dot
        const gradient = ctx.createRadialGradient(
          spark.x, spark.y, 0,
          spark.x, spark.y, 6
        )
        gradient.addColorStop(0, `rgba(200, 195, 255, ${spark.life})`)
        gradient.addColorStop(0.4, `rgba(108, 99, 255, ${spark.life * 0.8})`)
        gradient.addColorStop(1, `rgba(108, 99, 255, 0)`)

        ctx.beginPath()
        ctx.arc(spark.x, spark.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Reset spark if it goes off screen
        if (
          spark.x < -20 || spark.x > canvas.width + 20 ||
          spark.y < -20 || spark.y > canvas.height + 20
        ) {
          sparks[index] = createSpark()
        }
      })

      // Schedule the next frame
      animationId = requestAnimationFrame(draw)
    }

    // Start the loop
    draw()

    // Cleanup when component unmounts
    // Without this, the animation keeps running in memory even after navigation
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, []) // empty array = run once on mount



  
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* CSS grid layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
  linear-gradient(var(--color-border) 1px, transparent 1px),
  linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
`,
backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          animation: "gridPulse 4s ease-in-out infinite",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(108, 99, 255, 0.06) 0%, transparent 70%)",          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(15, 15, 15, 0.8) 100%)",
        }}
      />

      {/* Canvas layer — sparks draw here */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  )
}

export default GridBackground