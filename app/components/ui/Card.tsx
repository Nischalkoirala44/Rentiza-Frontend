
import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`card bg-base-100 shadow-xl ${className}`}>{children}</div>
}

export const CardBody = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`card-body ${className}`}>{children}</div>
}
