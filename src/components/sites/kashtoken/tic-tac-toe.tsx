import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type Board, isFull, pickMove, winner } from "@/lib/tic-tac-toe"

const emptyBoard: Board = Array.from({ length: 9 }, () => null)

function statusText(won: ReturnType<typeof winner>, over: boolean, mascotTurn: boolean) {
  if (won === "X") return "You win! 🎉"
  if (won === "O") return "Mascot wins! 🐻"
  if (over) return "It's a draw!"
  return mascotTurn ? "Mascot's turn" : "Your turn"
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const won = winner(board)
  const over = won !== null || isFull(board)
  const mascotTurn = !over && board.filter(Boolean).length % 2 === 1

  useEffect(() => {
    if (!mascotTurn) return
    const id = setTimeout(() => {
      setBoard((b) => {
        const move = pickMove(b)
        return move === undefined ? b : b.with(move, "O")
      })
    }, 500)
    return () => {
      clearTimeout(id)
    }
  }, [mascotTurn])

  return (
    <Card className="dark mx-auto w-full max-w-sm bg-linear-to-b from-[#0d1b2a] to-[#1b263b] text-center">
      <CardHeader>
        <CardTitle className="text-2xl uppercase">KASH Tic Tac Toe</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2">
        {board.map((mark, i) => (
          <Button
            key={i}
            variant="secondary"
            className="aspect-square h-auto text-3xl font-bold"
            disabled={over || mascotTurn || mark !== null}
            aria-label={`Cell ${String(i + 1)}${mark ? `, ${mark}` : ""}`}
            onClick={() => {
              setBoard((b) => b.with(i, "X"))
            }}
          >
            {mark}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <p role="status">{statusText(won, over, mascotTurn)}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setBoard(emptyBoard)
          }}
        >
          Reset Game
        </Button>
      </CardFooter>
    </Card>
  )
}
