import { z } from "astro/zod"

async function fetchJson<T extends z.ZodType>(url: string, schema: T, signal?: AbortSignal): Promise<z.infer<T>> {
  const res = await fetch(url, signal ? { signal } : undefined)
  if (!res.ok) throw new Error(`${new URL(url).hostname} responded ${String(res.status)}`)
  return schema.parse(await res.json())
}

const dexscreener = z.object({ pairs: z.array(z.object({ priceUsd: z.string() })).nullable() })

/** USD price of a BSC token from the first DexScreener pair, or null when it has no pairs. */
export async function fetchDexPrice(address: string, signal?: AbortSignal) {
  const { pairs } = await fetchJson(`https://api.dexscreener.com/latest/dex/tokens/${address}`, dexscreener, signal)
  const price = Number.parseFloat(pairs?.[0]?.priceUsd ?? "")
  return Number.isFinite(price) ? price : null
}

const simplePrice = z.record(z.string(), z.object({ usd: z.number() }))

export const fetchMajorPrices = (ids: readonly string[], signal?: AbortSignal) =>
  fetchJson(
    `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids.join(","))}&vs_currencies=usd`,
    simplePrice,
    signal
  )

const contractCoin = z.object({ market_data: z.object({ current_price: z.object({ usd: z.number() }) }) })

export async function fetchContractPrice(contract: string, signal?: AbortSignal) {
  const coin = await fetchJson(
    `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${encodeURIComponent(contract)}`,
    contractCoin,
    signal
  )
  return coin.market_data.current_price.usd
}

/** Price display that stays readable from BTC down to sub-cent tokens. */
export function formatUsd(n: number | null | undefined) {
  if (n === null || n === undefined || Number.isNaN(n)) return "-"
  if (n >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  if (n >= 0.000001) return n.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 })
  return n.toExponential(6)
}
