import * as React from "react"
import { cn } from "@/lib/utils"
type DialogCtx = {open:boolean,setOpen:(v:boolean)=>void}
const Ctx = React.createContext<DialogCtx>({open:false,setOpen:()=>{}})
export const Dialog = ({open,onOpenChange,children}:{open?:boolean,onOpenChange?:(v:boolean)=>void,children:React.ReactNode}) => {
  const [internal,setInternal]=React.useState(false)
  const isOpen = open??internal
  const setOpen = (v:boolean)=>{setInternal(v);onOpenChange?.(v)}
  return <Ctx.Provider value={{open:isOpen,setOpen}}>{children}</Ctx.Provider>
}
export const DialogTrigger = ({asChild,children,...props}: {asChild?:boolean,children:React.ReactNode,[k:string]:any}) => {
  const {setOpen}=React.useContext(Ctx)
  return <span onClick={()=>setOpen(true)} style={{cursor:"pointer"}}>{children}</span>
}
export const DialogContent = ({className,children,...props}: React.HTMLAttributes<HTMLDivElement>) => {
  const {open,setOpen}=React.useContext(Ctx)
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={()=>setOpen(false)}/>
      <div className={cn("relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg",className)} {...props}>
        <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={()=>setOpen(false)}>✕</button>
        {children}
      </div>
    </div>
  )
}
export const DialogHeader = ({className,...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left",className)} {...props}/>
)
export const DialogTitle = ({className,...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold",className)} {...props}/>
)
export const DialogDescription = ({className,...props}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground",className)} {...props}/>
)
export const DialogFooter = ({className,...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",className)} {...props}/>
)
