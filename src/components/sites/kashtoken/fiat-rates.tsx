import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import logo from "@/assets/kashtoken/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fiatTargets, flagUrl } from "@/data/fiat"
import { fetchDexPrice } from "@/lib/market"

import { QueryProvider } from "./query-provider"

// Carried over from the original widget: this is not the contract shown on the home page.
const PRICE_TOKEN = "0xb1532e77e741db97e3580016a1a9bb163239f120"
const FALLBACK_PRICE = 0.000001212

function Calculator() {
  const { data } = useQuery({
    queryKey: ["dex-price", PRICE_TOKEN],
    queryFn: ({ signal }) => fetchDexPrice(PRICE_TOKEN, signal),
  })
  const price = data ?? FALLBACK_PRICE
  const [amount, setAmount] = useState(1)
  const [index, setIndex] = useState(0)
  const [toFiat, setToFiat] = useState(false)
  const target = fiatTargets[index] ?? fiatTargets[0]

  const fiatValue = amount * price * target.rate
  const result = toFiat
    ? `${fiatValue.toLocaleString(undefined, { maximumFractionDigits: fiatValue < 1 ? 4 : 2 })} ${target.code}`
    : `${Math.round(amount / target.rate / price).toLocaleString()} $KASH`

  return (
    <Card className="dark mx-auto w-full max-w-md font-inter">
      <CardHeader className="flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={logo.src} alt="KASH" />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-xs font-semibold">$KASH LIVE PRICE</div>
            <div className="font-bold text-emerald-400">
              {data === undefined ? "Loading..." : `$${price.toLocaleString(undefined, { minimumFractionDigits: 8 })}`}
            </div>
          </div>
        </div>
        <Badge variant="secondary">BSC</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase">
              {toFiat ? "$KASH to Currency" : "Currency to $KASH"}
            </span>
            <Button
              size="xs"
              onClick={() => {
                setToFiat((v) => !v)
              }}
            >
              ⇄ SWITCH
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              value={amount}
              aria-label="Amount"
              onChange={(e) => {
                setAmount(e.currentTarget.valueAsNumber || 0)
              }}
            />
            <NativeSelect
              value={index}
              aria-label="Currency"
              onChange={(e) => {
                setIndex(Number(e.currentTarget.value))
              }}
            >
              {fiatTargets.map((c, i) => (
                <NativeSelectOption key={c.code} value={i}>
                  {c.code}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="border-t border-dashed pt-3 text-center text-xl font-extrabold text-amber-400">{result}</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">$KASH Exchange</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fiatTargets.map((c) => (
              <TableRow key={c.code}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={flagUrl(c.iso)} alt="" className="w-5 rounded-xs" loading="lazy" />
                    <span className="font-bold">{c.name}</span>
                    <span className="text-xs font-semibold text-cyan-400">{c.code}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  <span className="mr-2 text-muted-foreground">1 {c.code}</span>
                  <span className="font-bold">{Math.round(1 / c.rate / price).toLocaleString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function FiatRates() {
  return (
    <QueryProvider>
      <Calculator />
    </QueryProvider>
  )
}
