import type React from "react"

interface AlertProps {
  type?: "info" | "success" | "warning" | "error"
  children: React.ReactNode
  className?: string
}

export const Alert = ({ type = "info", children, className = "" }: AlertProps) => {
  const typeClasses = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
  }

  return <div className={`alert ${typeClasses[type]} ${className}`}>{children}</div>
}
