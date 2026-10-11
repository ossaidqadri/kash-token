export type Mark = "X" | "O"
export type Board = readonly (Mark | null)[]

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
] as const

export function winner(board: Board): Mark | null {
  for (const [a, b, c] of LINES) {
    const mark = board[a]
    if (mark && mark === board[b] && mark === board[c]) return mark
  }
  return null
}

export const isFull = (board: Board) => board.every((cell) => cell !== null)

/** The empty cell that would give `mark` three in a row, if any. */
function completing(board: Board, mark: Mark) {
  for (const line of LINES) {
    if (line.filter((i) => board[i] === mark).length !== 2) continue
    const empty = line.find((i) => board[i] === null)
    if (empty !== undefined) return empty
  }
  return undefined
}

/** Mascot (O) move: win, else block, else centre, else random. */
export function pickMove(board: Board, rng: () => number = Math.random) {
  const forced = completing(board, "O") ?? completing(board, "X")
  if (forced !== undefined) return forced
  if (board[4] === null) return 4
  const empty = board.flatMap((cell, i) => (cell === null ? [i] : []))
  return empty[Math.floor(rng() * empty.length)]
}
