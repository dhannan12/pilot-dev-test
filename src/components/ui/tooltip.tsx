import * as React from "react"
import { cn } from "@/lib/utils"
export const TooltipProvider = ({children}: {children:React.ReactNode,delayDuration?:number}) => <>{children}</>
type TipCtx = {open:boolean,setOpen:(v:boolean)=>void}
const Ctx = React.createContext<TipCtx>({open:false,setOpen:()=>{}})
export const Tooltip = ({children}: {children:React.ReactNode,open?:boolean,defaultOpen?:boolean,onOpenChange?:(v:boolean)=>void}) => {
  const [open,setOpen]=React.useState(false)
  return <Ctx.Provider value={{open,setOpen}}><div className="relative inline-block">{children}</div></Ctx.Provider>
}
export const TooltipTrigger = ({asChild,children,...props}: {asChild?:boolean,children:React.ReactNode,[k:string]:any}) => {
  const {setOpen}=React.useContext(Ctx)
  return <span onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} {...props}>{children}</span>
}
export const TooltipContent = ({className,children,...props}: React.HTMLAttributes<HTMLDivElement>&{sideOffset?:number}) => {
  const {open}=React.useContext(Ctx)
  if(!open) return null
  return <div className={cn("absolute z-50 bottom-full mb-1 left-1/2 -translate-x-1/2 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow",className)} {...props}>{children}</div>
}
