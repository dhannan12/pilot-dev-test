import * as React from "react"
import { cn } from "@/lib/utils"
export const ScrollArea = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
  ({className,children,...props},ref) => (
    <div ref={ref} className={cn("relative overflow-hidden",className)} {...props}>
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  )
)
ScrollArea.displayName="ScrollArea"
export const ScrollBar = ({className,...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex touch-none select-none transition-colors",className)} {...props}/>
)
