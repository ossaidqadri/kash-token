export const totalSupply = 10_000_000_000

export const allocations = [
  { key: "foundation", category: "KASH Foundation", tokens: 3_000_000_000, percent: 30, purpose: "Strategic capital for KASH 1 & KASH 2 development and adoption incentives", color: "#2dd4bf", badge: "bg-linear-to-r from-teal-400 to-cyan-400 text-teal-950" },
  { key: "community", category: "Community & Marketplace", tokens: 3_000_000_000, percent: 30, purpose: "Airdrops, user rewards, and ecosystem incentives", color: "#34d399", badge: "bg-linear-to-r from-emerald-400 to-emerald-500 text-emerald-950" },
  { key: "liquidity", category: "Liquidity Pools", tokens: 2_000_000_000, percent: 20, purpose: "Initial deployment across DEXs for market stability", color: "#f59e0b", badge: "bg-linear-to-r from-amber-500 to-amber-400 text-amber-950" },
  { key: "team", category: "Team & Advisors", tokens: 1_000_000_000, percent: 10, purpose: "Compensation and long‑term project alignment", color: "#fb7185", badge: "bg-linear-to-r from-rose-400 to-rose-500 text-rose-950" },
  { key: "partners", category: "Strategic Partnerships", tokens: 1_000_000_000, percent: 10, purpose: "Key integrations and CEX listings", color: "#a78bfa", badge: "bg-linear-to-r from-violet-400 to-violet-500 text-violet-950" },
] as const

export const formatTokens = (n: number) => `${n.toLocaleString("en-US")} KASH`
