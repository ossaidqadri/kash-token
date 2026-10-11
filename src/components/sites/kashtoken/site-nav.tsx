import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { NavNode } from "@/lib/nav"

function Branch({ nodes, depth = 0 }: { nodes: NavNode[]; depth?: number }) {
  return (
    <ul className={depth > 0 ? "ml-3 border-l pl-2" : undefined}>
      {nodes.map((node) => (
        <li key={node.href}>
          <NavigationMenuLink href={node.href} className={depth === 0 ? "font-bold" : undefined}>
            {node.title}
          </NavigationMenuLink>
          {node.children.length > 0 && <Branch nodes={node.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

export default function SiteNav({ tree }: { tree: NavNode }) {
  return (
    <>
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="order-first md:hidden" aria-label="Open navigation" />}>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{tree.title}</SheetTitle>
          </SheetHeader>
          <nav className="overflow-y-auto p-4 pt-0" aria-label="Site">
            <NavigationMenu className="max-w-none">
              <Branch nodes={[tree, ...tree.children]} />
            </NavigationMenu>
          </nav>
        </SheetContent>
      </Sheet>

      <NavigationMenu align="end" className="ml-auto hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-14 rounded-none border-b-[5px] border-white bg-transparent text-base font-bold text-white hover:bg-white/10 focus:bg-white/10 data-popup-open:bg-white/10">
              {tree.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Branch nodes={[tree, ...tree.children]} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
