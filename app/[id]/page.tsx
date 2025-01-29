"use client";

import { gameStatus } from "@/utilities";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [game, setGame]: [any, Dispatch<SetStateAction<null>>] = useState(null);
  const [error, setError] = useState(null);

  async function loadGame() {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/minesweeper/${id}`,
    );
    const data = await res.json();

    if (res.status !== 200) {
      setError(data.error);
      return;
    }

    setGame(data);
  }

  async function toggleFlag(row: number, column: number) {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/minesweeper/${id}/toggle-flag`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, column }),
      },
    );
    const data = await res.json();

    if (res.status !== 200) {
      setError(data.error);
      return;
    }

    setGame(data);
  }

  async function clickCell(row: number, column: number) {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/minesweeper/${id}/click`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, column }),
      },
    );
    const data = await res.json();

    if (res.status !== 200) {
      setError(data.error);
      return;
    }

    setGame(data);
  }

  useEffect(() => {
    loadGame();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!game && !error)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );

  if (!game)
    return (
      <div className="flex items-center justify-center h-screen">
        Failed loading the game, try again later!
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-4xl mb-4">{gameStatus(game)}</h1>

          <div className="flex justify-center items-center">
            <table className="border border-white">
              <tbody>
                {game.board.map((rows: [], x: number) => (
                  <tr key={x}>
                    {rows.map((image: string, y) => (
                      <td
                        className="border border-white"
                        key={y}
                        onClick={() => {
                          clickCell(x, y);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          toggleFlag(x, y);
                        }}
                      >
                        <Image
                          alt={`${image}`}
                          width={16}
                          height={16}
                          src={`/images/${image}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h1 className="text-center text-2xl mt-4">
            @{game.player_name} (
            {
              game.board
                .flat()
                .filter((i: string) => i === "square-flagged.png").length
            }{" "}
            of {game.bomb_count} 💣&apos;s flagged)
          </h1>
        </div>
      </div>
    </>
  );
}
