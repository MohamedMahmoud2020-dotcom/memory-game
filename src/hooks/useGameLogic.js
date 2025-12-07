import { useEffect, useState } from "react";
export const useGameLogic = (cardValues) => {
  
      const [cards, setCards] = useState([]);
      const [cardsFlipped, setCardsFlipped] = useState([]);
      const [gameStatic, setGameStatic] = useState({
        score: 0,
        moves: 0,
      });
    
    
    
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
    
      const intializeGame = () => {
        const shuffledCards = shuffleArray(cardValues);
        const finalCards = shuffledCards.map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false }))
        setCards(finalCards);
      }
    
    
    
      useEffect(() => {
        intializeGame();
      }, []);
    
    
    function handleCardClick(index) {
      const clickedCard = cards[index];
    
      // Ignore already flipped or matched cards
      if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
      // 1. Increment moves
      setGameStatic(prev => ({ ...prev, moves: prev.moves + 1 }));
    
      // 2. Flip the clicked card
      setCards(prevCards =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );
    
      // 3. Add the card to flipped list
      setCardsFlipped(prev => {
        const newFlipped = [...prev, clickedCard];
    
        if (newFlipped.length === 2) {
          const [first, second] = newFlipped;
    
          if (first.value === second.value) {
            // MATCH: mark both as matched
            setCards(prevCards =>
              prevCards.map(card =>
                card.id === first.id || card.id === second.id
                  ? { ...card, isMatched: true }
                  : card
              )
            );
    
            // Increment score by 1 per pair
            setGameStatic(prev => ({ ...prev, score: (prev.score + 1 / 2)}));
          } else {
            // NO MATCH: flip them back after a short delay
            setTimeout(() => {
              setCards(prevCards =>
                prevCards.map(card =>
                  card.id === first.id || card.id === second.id
                    ? { ...card, isFlipped: false }
                    : card
                )
              );
            }, 800); // adjust delay as needed
          }
    
          return []; // reset flipped cards after checking
        }
    
        return newFlipped; // keep 1 flipped card if only one selected
      });
    }
    function setNewGame() {
      setGameStatic({
        score: 0,
        moves: 0,
      });
      setCardsFlipped([]);
      intializeGame();
    }

    return {cards, gameStatic, handleCardClick, setNewGame};
  
};  