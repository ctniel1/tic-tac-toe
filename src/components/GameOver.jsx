export default function GameOver({winner, onRestart}) {
  return (
    <div id="game-over">
      {winner !== 'draw' ? (
        <h2>{`${winner} has won the game!`}</h2>
      ) : (
        <h2>It's a draw!</h2>
      )}
      <button onClick={onRestart}>Restart Game</button>
    </div>
  )
}