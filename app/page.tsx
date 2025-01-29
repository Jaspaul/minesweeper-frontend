"use client";

export default function Page() {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async function createGame(event: any) {
    event.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/minesweeper/`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_name: event.target.player_name.value,
          rows: event.target.rows.value,
          columns: event.target.columns.value,
          bomb_count: event.target.bomb_count.value,
        }),
      },
    );

    const data = await res.json();

    if (res.status !== 200) {
      alert(data.error);
      return;
    }

    window.location.href = `/${data.id}`;
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form className="w-full max-w-sm" onSubmit={createGame}>
          <div className="mb-4">
            <label>Player Name</label>
            <input
              type="text"
              id="player_name"
              className="rounded w-full py-2 px-3 text-black"
              placeholder="Enter player name"
              required
            />
          </div>

          <div className="mb-4">
            <label>Rows (2 - 80)</label>
            <input
              type="number"
              id="rows"
              min="2"
              max="80"
              className="rounded w-full py-2 px-3 text-black"
              placeholder="Enter rows"
              required
            />
          </div>

          <div className="mb-4">
            <label>Columns (2 - 80)</label>
            <input
              type="number"
              id="columns"
              min="2"
              max="80"
              className="rounded w-full py-2 px-3 text-black"
              placeholder="Enter columns"
              required
            />
          </div>

          <div className="mb-8">
            <label>Bomb Count</label>
            <input
              type="number"
              id="bomb_count"
              className="rounded w-full py-2 px-3 text-black"
              placeholder="Enter count"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="rounded bg-blue-500 w-full font-bold py-2 px-4"
            >
              Create Game
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
