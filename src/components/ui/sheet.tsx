import * as React from "react"
import { cn } from "@/lib/utils"
type SheetCtx = {open:boolean,setOpen:(v:boolean)=>void}
const Ctx = React.createContext<SheetCtx>({open:false,setOpen:()=>{}})
export const Sheet = ({open,onOpenChange,children}:{open?:boolean,onOpenChange?:(v:boolean)=>void,children:React.ReactNode}) => {
  const [internal,setInternal]=React.useState(false)
  const isOpen=open??internal
  const setOpen=(v:boolean)=>{setInternal(v);onOpenChange?.(v)}
  return <Ctx.Provider value={{open:isOpen,setOpen}}>{children}</Ctx.Provider>
}
export const SheetTrigger = ({asChild,children,...props}:{asChild?:boolean,children:React.ReactNode,[k:string]:any}) => {
  const {setOpen}=React.useContext(Ctx)
  return <span onClick={()=>setOpen(true)} style={{cursor:"pointer"}}>{children}</span>
}
export const SheetContent = ({className,children,side="right",...props}:React.HTMLAttributes<HTMLDivElement>&{side?:string}) => {
  const {open,setOpen}=React.useContext(Ctx)
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={()=>setOpen(false)}/>
      <div className={cn("fixed z-50 bg-background p-6 shadow-lg",side==="right"?"right-0 top-0 h-full w-3/4 max-w-sm":"left-0 top-0 h-full w-3/4 max-w-sm",className)} {...props}>
        <button className="absolute right-4 top-4 text-muted-foreground" onClick={()=>setOpen(false)}>✕</button>
        {children}
      </div>
    </div>
  )
}
export const SheetHeader = ({className,...props}:React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2",className)} {...props}/>
)
export const SheetTitle = ({className,...props}:React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold",className)} {...props}/>
)
export const SheetDescription = ({className,...props}:React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground",className)} {...props}/>
)
