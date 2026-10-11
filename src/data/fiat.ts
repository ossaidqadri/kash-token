/** Static reference rates, units of currency per 1 USD. */
export const fiatTargets = [
  { name: "USA", code: "USD", iso: "US", rate: 1 },
  { name: "Pakistan", code: "PKR", iso: "PK", rate: 279 },
  { name: "UK", code: "GBP", iso: "GB", rate: 0.79 },
  { name: "Eurozone", code: "EUR", iso: "EU", rate: 0.92 },
  { name: "UAE", code: "AED", iso: "AE", rate: 3.67 },
  { name: "Japan", code: "JPY", iso: "JP", rate: 151.2 },
  { name: "Brazil", code: "BRL", iso: "BR", rate: 5.05 },
  { name: "Indonesia", code: "IDR", iso: "ID", rate: 15700 },
  { name: "Vietnam", code: "VND", iso: "VN", rate: 24800 },
  { name: "Philippines", code: "PHP", iso: "PH", rate: 56.1 },
] as const

export const flagUrl = (iso: string) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso}.svg`
