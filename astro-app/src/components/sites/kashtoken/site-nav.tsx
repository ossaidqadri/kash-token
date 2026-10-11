import { MenuIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
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

const rowLink = buttonVariants({ variant: "ghost", className: "w-full justify-start" })

function MobileNav({ tree }: { tree: NavNode }) {
  return (
    <nav aria-label="Site" className="overflow-y-auto p-4 pt-0">
      <a href={tree.href} className={rowLink}>
        {tree.title}
      </a>
      <Accordion>
        {tree.children.map((group) =>
          group.children.length === 0 ? (
            <a key={group.href} href={group.href} className={rowLink}>
              {group.title}
            </a>
          ) : (
            <AccordionItem key={group.href} value={group.href}>
              <AccordionTrigger>{group.title}</AccordionTrigger>
              <AccordionContent>
                {[group, ...group.children].map((page) => (
                  <a key={page.href} href={page.href} className={rowLink}>
                    {page.title}
                  </a>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </nav>
  )
}

function DesktopNav({ tree }: { tree: NavNode }) {
  return (
    <NavigationMenu align="end" className="ml-auto hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-14 rounded-none border-b-[5px] border-white bg-transparent text-base font-bold text-white hover:bg-white/10 focus:bg-white/10 data-open:bg-white/10 data-open:hover:bg-white/15 data-popup-open:bg-white/10 data-popup-open:hover:bg-white/15">
            {tree.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[min(56rem,90vw)] grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] items-start gap-2">
              {[{ ...tree, children: [] }, ...tree.children].map((page) => (
                <li key={page.href}>
                  <NavigationMenuLink href={page.href} className="font-bold">
                    {page.title}
                  </NavigationMenuLink>
                  {page.children.length > 0 && (
                    <ul className="ml-3 border-l pl-2">
                      {page.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink href={child.href}>{child.title}</NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default function SiteNav({ tree }: { tree: NavNode }) {
  return (
    <>
      <Sheet>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="order-first md:hidden" aria-label="Open navigation" />}
        >
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{tree.title}</SheetTitle>
          </SheetHeader>
          <MobileNav tree={tree} />
        </SheetContent>
      </Sheet>
      <DesktopNav tree={tree} />
    </>
  )
}
