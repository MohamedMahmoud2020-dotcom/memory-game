import GameHeader from './components/GameHeader.jsx'
import Card from './components/Card.jsx'
import { useGameLogic } from './hooks/useGameLogic.js';
const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  
  const {cards, gameStatic, handleCardClick, setNewGame} = useGameLogic(cardValues);
  
  return (
    <div className="app">
      <GameHeader score={gameStatic.score} moves={gameStatic.moves} setNewGame={setNewGame}/>
      <div className='cards-grid'>
        {cards.map((value, index) => (
          <Card key={index} card={value} onClick={handleCardClick}/>
        ))}
      </div>
    </div>
  )
}

export default App
