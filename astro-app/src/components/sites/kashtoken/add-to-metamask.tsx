import { Button } from "@/components/ui/button"
import { toast, Toaster } from "@/components/ui/toast"
import { site } from "@/data/site"

interface Eip1193Provider {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider
  }
}

const TOKEN_IMAGE =
  "https://aqua-fancy-rhinoceros-998.mypinata.cloud/ipfs/bafkreigawn4hbehcyaxaey6gvewjse6bxdodnzx2zpz7wuvofpdvbdt5hq"

async function addKash() {
  const { ethereum } = window
  if (!ethereum) {
    toast.add({ type: "error", title: "MetaMask not detected", description: "Please use a Web3 browser." })
    return
  }
  try {
    await ethereum.request({
      method: "wallet_watchAsset",
      params: { type: "ERC20", options: { address: site.contract, symbol: "KASH", decimals: 18, image: TOKEN_IMAGE } },
    })
  } catch (error) {
    console.error(error)
    toast.add({ type: "error", title: "Connection failed", description: "Make sure MetaMask is unlocked." })
  }
}

export default function AddToMetamask() {
  return (
    <>
      <Button
        size="lg"
        className="h-12 w-full bg-[#f6851b] text-base font-bold text-white hover:bg-[#e27613]"
        onClick={() => {
          void addKash()
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" className="size-6" />
        Add $KASH to Wallet
      </Button>
      <Toaster />
    </>
  )
}
