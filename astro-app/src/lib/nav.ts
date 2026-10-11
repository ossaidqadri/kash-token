import { getCollection } from "astro:content"

export interface NavNode {
  title: string
  href: string
  children: NavNode[]
}

export const pageHref = (id: string) => (id === "home" ? "/" : `/home/${id}`)

/** Builds the site tree from collection ids: `token/audit` is a child of `token`, which is a child of `home`. */
export async function getNavTree(): Promise<NavNode> {
  const entries = (await getCollection("pages")).toSorted((a, b) => a.data.order - b.data.order)
  const nodes = new Map<string, NavNode>(
    entries.map((e) => [e.id, { title: e.data.title, href: pageHref(e.id), children: [] }])
  )
  const root = nodes.get("home")
  if (!root) throw new Error("pages collection needs a `home` entry")
  for (const { id } of entries) {
    if (id === "home") continue
    const parent = id.includes("/") ? nodes.get(id.slice(0, id.lastIndexOf("/"))) : root
    const node = nodes.get(id)
    if (node) parent?.children.push(node)
  }
  return root
}
