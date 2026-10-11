import { Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { allocations, totalSupply } from "@/data/tokenomics"

const config = Object.fromEntries(
  allocations.map((a) => [a.key, { label: `${a.category} — ${String(a.percent)}%`, color: a.color }])
) satisfies ChartConfig

const data = allocations.map((a) => ({ key: a.key, tokens: a.tokens, fill: `var(--color-${a.key})` }))

export default function TokenomicsChart() {
  return (
    <Card className="dark not-prose mx-auto my-6 w-full max-w-3xl font-inter">
      <CardHeader>
        <CardTitle className="text-cyan-300">KASH Tokenomics</CardTitle>
        <CardDescription>{totalSupply.toLocaleString("en-US")} Fixed Supply • Binance Smart Chain</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[360px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel />} />
            <Pie data={data} dataKey="tokens" nameKey="key" innerRadius="55%" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent nameKey="key" className="flex-wrap" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
