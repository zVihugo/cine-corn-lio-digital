import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gold: "border-primary/30 bg-primary/20 text-primary",
        cinema: "border-accent/30 bg-accent/20 text-accent",
        dubbed: "border-primary/30 bg-primary/20 text-primary font-medium",
        subtitled: "border-accent/30 bg-accent/20 text-accent font-medium",
        tech3d: "border-cyan-500/30 bg-cyan-500/20 text-cyan-400 font-medium",
        tech2d: "border-muted-foreground/30 bg-muted text-muted-foreground font-medium",
        ageL: "bg-green-600 text-white border-transparent",
        age10: "bg-blue-600 text-white border-transparent",
        age12: "bg-yellow-500 text-black border-transparent",
        age14: "bg-orange-500 text-white border-transparent",
        age16: "bg-red-500 text-white border-transparent",
        age18: "bg-black text-white border-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
