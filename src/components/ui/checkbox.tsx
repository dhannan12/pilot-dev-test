import * as React from "react"
import { cn } from "@/lib/utils"
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({className,...props},ref) => (
    <input type="checkbox" ref={ref}
      className={cn("h-4 w-4 rounded border border-primary text-primary cursor-pointer",className)}
      {...props}/>
  )
)
Checkbox.displayName="Checkbox"
