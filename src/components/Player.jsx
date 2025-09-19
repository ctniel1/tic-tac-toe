import { useState } from 'react'

export default function Player({name, symbol, isActive}) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(name)

  const handleBtnClick = () => {
    setIsEditing((wasEditing) => !wasEditing)
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
            placeholder='Enter player name'
          />
        ) : (
          <>
            <span className="player-name">{playerName}</span>
          </>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleBtnClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  )
}