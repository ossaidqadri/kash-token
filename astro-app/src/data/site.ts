const contract = "0x70042ddE5cF55E866049026eB3d3Ca86eA77f3bb"

export const site = {
  name: "KASH",
  url: "https://www.kashtoken.com",
  description: "FINANCIAL FREEDOM. DRIVEN BY 0% FEES*. INSPIRED BY YOU.",
  contract,
  bscscan: `https://bscscan.com/token/${contract}`,
  socials: [
    { label: "Telegram", href: "https://t.me/Kashtokencom" },
    { label: "Twitter", href: "https://x.com/theKASHtoken" },
    { label: "Discord", href: "https://discord.gg/EYXPythQjS" },
  ],
} as const
