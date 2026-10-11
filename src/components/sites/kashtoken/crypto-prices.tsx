import { useQueries } from "@tanstack/react-query"

import logo from "@/assets/kashtoken/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { site } from "@/data/site"
import { fetchContractPrice, fetchMajorPrices, formatUsd } from "@/lib/market"

import { QueryProvider } from "./query-provider"

const majors = [
  { id: "bitcoin", name: "Bitcoin", code: "BTC", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { id: "ethereum", name: "Ethereum", code: "ETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { id: "binancecoin", name: "Binance Coin", code: "BNB", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
  { id: "tether", name: "Tether", code: "USDT", logo: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { id: "solana", name: "Solana", code: "SOL", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
] as const

function Prices() {
  const [majorPrices, kash] = useQueries({
    queries: [
      {
        queryKey: ["majors"],
        queryFn: ({ signal }) => fetchMajorPrices(majors.map((m) => m.id), signal),
      },
      {
        queryKey: ["kash-contract-price"],
        queryFn: ({ signal }) => fetchContractPrice(site.contract, signal),
      },
    ],
  })
  const updatedAt = Math.max(majorPrices.dataUpdatedAt, kash.dataUpdatedAt)
  const rows = [
    ...majors.map((m) => ({ ...m, price: majorPrices.data?.[m.id]?.usd })),
    { id: "kash", name: "KASH", code: "KASH", logo: logo.src, price: kash.data },
  ]
  const status =
    majorPrices.isError && kash.isError
      ? "Update failed"
      : updatedAt > 0
        ? `Updated: ${new Date(updatedAt).toLocaleTimeString()}`
        : "Loading prices…"

  return (
    <Card className="dark not-prose mx-auto my-6 w-full max-w-3xl font-inter">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Live Prices — Major Cryptos + KASH</CardTitle>
          <CardDescription>{status}</CardDescription>
        </div>
        <Badge variant="secondary">Live</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarImage src={r.logo} alt={`${r.code} logo`} />
                      <AvatarFallback>{r.code.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{r.name}</div>
                      <div className="text-xs font-bold text-cyan-300">{r.code}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-extrabold text-emerald-300">
                  ${formatUsd(r.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground">
          Prices update every 30 seconds. KASH price is fetched from CoinGecko contract endpoint (Binance Smart Chain).
        </p>
      </CardContent>
    </Card>
  )
}

export default function CryptoPrices() {
  return (
    <QueryProvider>
      <Prices />
    </QueryProvider>
  )
}
