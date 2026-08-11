import * as React from "react"
import { cn } from "@/lib/utils"
export const Alert = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>&{variant?:"default"|"destructive"}>(
  ({className,variant="default",...props},ref) => (
    <div ref={ref} role="alert"
      className={cn("relative w-full rounded-lg border p-4 text-sm",
        variant==="destructive"?"border-destructive/50 text-destructive":"border-border text-foreground",
        className)} {...props}/>
  )
)
Alert.displayName="Alert"
export const AlertDescription = React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
  ({className,...props},ref) => <div ref={ref} className={cn("text-sm",className)} {...props}/>
)
AlertDescription.displayName="AlertDescription"
export const AlertTitle = React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLHeadingElement>>(
  ({className,...props},ref) => <h5 ref={ref} className={cn("font-medium mb-1",className)} {...props}/>
)
AlertTitle.displayName="AlertTitle"
