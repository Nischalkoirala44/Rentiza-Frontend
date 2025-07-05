import type React from "react"

interface DividerProps {
  children?: React.ReactNode
  className?: string
}

export const Divider = ({ children, className = "" }: DividerProps) => {
  return <div className={`divider ${className}`}>{children}</div>
}

