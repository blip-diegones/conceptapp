import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldGroup({ className, ...props }) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function Field({ className, orientation = "vertical", ...props }) {
  return (
    <div
      data-slot="field"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-1.5" : "flex-row items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }) {
  return (
    <Label
      data-slot="field-label"
      className={cn("text-xs font-semibold tracking-wider", className)}
      {...props}
    />
  )
}

function FieldError({ className, children, ...props }) {
  if (!children) return null
  return (
    <span
      data-slot="field-error"
      className={cn("text-xs text-destructive text-rose-500 font-medium", className)}
      {...props}
    >
      {children}
    </span>
  )
}

function FieldSeparator({ className, children, ...props }) {
  return (
    <div
      data-slot="field-separator"
      className={cn("relative my-2 flex items-center justify-center text-xs uppercase", className)}
      {...props}
    >
      <Separator className="absolute inset-0 m-auto" />
      {children && (
        <span
          data-slot="field-separator-content"
          className="relative bg-card px-2 text-muted-foreground"
        >
          {children}
        </span>
      )}
    </div>
  )
}

export {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldSeparator,
}
