'use client'

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function Progressbar() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Progress value={progress} className="fixed top-0 left-0 w-full h-2 z-50" />
  )
}
