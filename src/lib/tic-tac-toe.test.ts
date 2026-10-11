/// <reference types="bun" />

import { expect, test } from "bun:test"

import { type Board, isFull, pickMove, winner } from "./tic-tac-toe"

const b = (s: string): Board => Array.from({ length: s.length }, (_, i) => (s[i] === "X" || s[i] === "O" ? s[i] : null))

test("winner and draw detection", () => {
  expect(winner(b("XXX......"))).toBe("X")
  expect(winner(b("O..O..O.."))).toBe("O")
  expect(winner(b("XOXOXOOXO"))).toBeNull()
  expect(isFull(b("XOXOXOOXO"))).toBe(true)
})

test("mascot wins first, then blocks, then takes centre", () => {
  expect(pickMove(b("OO.XX...."))).toBe(2)
  expect(pickMove(b("XX......."))).toBe(2)
  expect(pickMove(b("X........"))).toBe(4)
  expect(pickMove(b("....X...."), () => 0)).toBe(0)
})
