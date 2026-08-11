import * as React from "react"
import { cn } from "@/lib/utils"
export const Select = ({children,value,onValueChange,...props}: {children:React.ReactNode,value?:string,onValueChange?:(v:string)=>void,[k:string]:any}) => (
  <div className="relative">{children}</div>
)
export const SelectTrigger = React.forwardRef<HTMLButtonElement,React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({className,children,...props},ref) => (
    <button ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",className)} {...props}>{children}</button>
  )
)
SelectTrigger.displayName="SelectTrigger"
export const SelectValue = ({placeholder}:{placeholder?:string}) => <span className="text-muted-foreground">{placeholder||""}</span>
export const SelectContent = ({children,className,...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative z-50 min-w-[8rem] rounded-md border bg-popover shadow-md",className)} {...props}>{children}</div>
)
export const SelectItem = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>&{value:string}>(
  ({className,children,...props},ref) => (
    <div ref={ref} className={cn("relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent",className)} {...props}>{children}</div>
  )
)
SelectItem.displayName="SelectItem"
export const SelectGroup = ({children}: {children:React.ReactNode}) => <div>{children}</div>
export const SelectLabel = ({children}: {children:React.ReactNode}) => <div className="px-2 py-1.5 text-xs font-semibold">{children}</div>
