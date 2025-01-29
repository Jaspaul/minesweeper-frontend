export function gameStatus(game: { status: string }) {
  if (game.status === "W") {
    return "😎";
  } else if (game.status === "L") {
    return "😵";
  }

  return "🙂";
}
