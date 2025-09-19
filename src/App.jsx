import React, { useState } from "react"

import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { winningCombinations } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
  gameTurns.forEach(turn => {
    const {row, col} = turn.square
    gameBoard[row][col] = turn.player
  })
  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0) {
    currentPlayer = gameTurns[0].player === 'X' ? 'O' : 'X'
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players, gameTurns) {
  let winner = null;
  winningCombinations.forEach(combination => {
    const symbols = combination.map(({row, col}) => gameBoard[row][col])
    if (symbols.every(symbol => symbol === 'X')) {
      winner = players.X
    } else if (symbols.every(symbol => symbol === 'O')) {
      winner = players.O
    }
  })

  if (gameTurns.length === 9 && !winner) {
    winner = 'draw'
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players, gameTurns)
  
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [ {square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  const handleRestartGame = () => {
    setGameTurns([])
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player name={players.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {winner && <GameOver winner={winner} onRestart={handleRestartGame} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
