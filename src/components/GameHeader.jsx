export default function GameHeader({score, moves, setNewGame}) {
  return (
    <header className="game-header">
      <h1>🎮 Memory Card Game</h1>
      <div className="stats">
        <div className="stat-item">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
            <span className="stat-label">Movies:</span>
            <span className="stat-value">{moves}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={() => setNewGame()}>🔄 New Game</button>
    </header>
  )
}