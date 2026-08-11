import * as React from "react"
import { cn } from "@/lib/utils"
type MenuCtx = {open:boolean,setOpen:(v:boolean)=>void}
const Ctx = React.createContext<MenuCtx>({open:false,setOpen:()=>{}})
export const DropdownMenu = ({children}:{children:React.ReactNode}) => {
  const [open,setOpen]=React.useState(false)
  return <Ctx.Provider value={{open,setOpen}}><div className="relative inline-block">{children}</div></Ctx.Provider>
}
export const DropdownMenuTrigger = ({asChild,children,...props}:{asChild?:boolean,children:React.ReactNode,[k:string]:any}) => {
  const {setOpen,open}=React.useContext(Ctx)
  return <span onClick={()=>setOpen(!open)} style={{cursor:"pointer"}} {...props}>{children}</span>
}
export const DropdownMenuContent = ({className,children,...props}:React.HTMLAttributes<HTMLDivElement>&{align?:string,sideOffset?:number}) => {
  const {open,setOpen}=React.useContext(Ctx)
  if(!open) return null
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={()=>setOpen(false)}/>
      <div className={cn("absolute right-0 z-50 min-w-[8rem] rounded-md border bg-popover p-1 shadow-md",className)} {...props}>{children}</div>
    </>
  )
}
export const DropdownMenuItem = ({className,inset,...props}:React.HTMLAttributes<HTMLDivElement>&{inset?:boolean}) => (
  <div className={cn("relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent",inset&&"pl-8",className)} {...props}/>
)
export const DropdownMenuLabel = ({className,...props}:React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold",className)} {...props}/>
)
export const DropdownMenuSeparator = ({className,...props}:React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("-mx-1 my-1 h-px bg-muted",className)} {...props}/>
)
export const DropdownMenuShortcut = ({className,...props}:React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60",className)} {...props}/>
)
