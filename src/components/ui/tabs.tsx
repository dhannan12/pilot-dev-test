import * as React from "react"
import { cn } from "@/lib/utils"
type TabsCtx = {value:string,onValueChange:(v:string)=>void}
const Ctx = React.createContext<TabsCtx>({value:"",onValueChange:()=>{}})
export const Tabs = ({value,defaultValue="",onValueChange,children,className,...props}:{value?:string,defaultValue?:string,onValueChange?:(v:string)=>void,children:React.ReactNode,className?:string,[k:string]:any}) => {
  const [internal,setInternal]=React.useState(defaultValue)
  const current=value??internal
  const set=(v:string)=>{setInternal(v);onValueChange?.(v)}
  return <Ctx.Provider value={{value:current,onValueChange:set}}><div className={className} {...props}>{children}</div></Ctx.Provider>
}
export const TabsList = ({className,...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1",className)} {...props}/>
)
export const TabsTrigger = ({value,className,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>&{value:string}) => {
  const ctx=React.useContext(Ctx)
  return <button className={cn("inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-all rounded-sm",ctx.value===value?"bg-background shadow":"text-muted-foreground",className)} onClick={()=>ctx.onValueChange(value)} {...props}/>
}
export const TabsContent = ({value,className,...props}: React.HTMLAttributes<HTMLDivElement>&{value:string}) => {
  const {value:current}=React.useContext(Ctx)
  if(current!==value) return null
  return <div className={cn("mt-2",className)} {...props}/>
}
