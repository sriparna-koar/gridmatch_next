

// import React, { useState, useEffect } from 'react';

// const GRID_SIZE = 3;
// const MAX_CHOICES = 3;
// const NUM_GRIDS = 3;

// const GamePage = () => {
//   const [grids, setGrids] = useState(generateGrids());
//   const [choicesLeft, setChoicesLeft] = useState(MAX_CHOICES);
//   const [result, setResult] = useState('');
//   const [revealGiftsFlag, setRevealGiftsFlag] = useState(false);
//   const [score, setScore] = useState(0);
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [country, setCountry] = useState('');
//   const [otherPlayers, setOtherPlayers] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('/api/players');
//         if (!response.ok) {
//           throw new Error('Failed to fetch player information');
//         }
//         const players = await response.json();
//         setOtherPlayers(players);
//       } catch (error) {
//         console.error('Error fetching player information:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   function generateGrids() {
//     return Array.from({ length: NUM_GRIDS }, () =>
//       Array.from({ length: GRID_SIZE }, () =>
//         Array.from({ length: GRID_SIZE }, () => {
//           const hasGift = Math.random() < 0.5;
//           const hasTrap = Math.random() < 0.2;
//           return { gift: hasGift, trap: hasTrap, revealed: false };
//         })
//       )
//     );
//   }

//   const selectCell = (gridIndex, row, col) => {
//     if (choicesLeft === 0) return;

//     const updatedGrids = [...grids];
//     const cell = updatedGrids[gridIndex][row][col];

//     if (!cell.revealed) {
//       cell.revealed = true;
//       setChoicesLeft(choicesLeft - 1);

//       if (cell.gift) {
//         const points = choicesLeft * 10;
//         setScore(score + points);
//         setResult('gift');
//       } else if (cell.trap) {
//         const penalty = 20;
//         setScore(score - penalty);
//         setResult('trap');
//       } else if (choicesLeft === 1) {
//         setResult('no-gift');
//       }

//       setGrids(updatedGrids);
//     }
//   };

//   const restartGame = () => {
//     setGrids(generateGrids());
//     setChoicesLeft(MAX_CHOICES);
//     setResult('');
//     setRevealGiftsFlag(false);
//     setScore(0);
//   };

//   const revealGifts = () => {
//     const updatedGrids = grids.map(grid =>
//       grid.map(row =>
//         row.map(cell => ({
//           ...cell,
//           revealed: cell.gift ? true : cell.revealed,
//         }))
//       )
//     );
//     setGrids(updatedGrids);
//     setRevealGiftsFlag(true);
//   };

//   const savePlayerInfo = async () => {
//     try {
//       const response = await fetch('/api/players', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           age,
//           country,
//           score,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to save player information');
//       }
//     } catch (error) {
//       console.error('Error saving player information:', error);
//     }
//   };

//   return (
//     <div className="game-container">
    
//       <h1>Gift Grid Game</h1>

//       <p>Remaining choices: {choicesLeft}</p>
//       <p>Score: {score}</p>
//       {result && (
//         <div>
//           {result === 'gift' ? (
//             <div>
//               <p>You found a gift! 🎁</p>
//               {choicesLeft >= 2 ? <p>Very good!</p> : null}
//             </div>
//           ) : (
//             <p>Sorry, no gift here. You lose.</p>
//           )}
//           <button onClick={revealGifts}>Reveal Gifts</button>
//           <button onClick={restartGame}>Restart</button>
//           <div>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Age"
//               value={age}
//               onChange={e => setAge(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               value={country}
//               onChange={e => setCountry(e.target.value)}
//             />
//             <button onClick={savePlayerInfo}>Save Player Info</button>
//           </div>
//           {name && age && country && (
//             <div>
//               <p>Name: {name}</p>
//               <p>Age: {age}</p>
//               <p>Country: {country}</p>
//               <p>Score: {score}</p>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="grids-container">
//         {grids.map((grid, gridIndex) => (
//           <div key={gridIndex} className="grid">
//             <h2>Grid {gridIndex + 1}</h2>
//             <div className="grid-content">
//               {grid.map((row, rowIndex) =>
//                 row.map((cell, colIndex) => (
//                   <div
//                     key={`${rowIndex}-${colIndex}`}
//                     className="cell"
//                     onClick={() => selectCell(gridIndex, rowIndex, colIndex)}
//                   >
//                     {cell.revealed ? (cell.gift ? '🎁' : '') : ''}
//                   </div>
//                 ))
//               )}
              
//             </div>
//           </div>
//         ))}
        
//       </div>
//       <div>
//         <h2>Other Players</h2>
//         <ul>
//           {otherPlayers.map((player, index) => (
//             <li key={index}>
//               <p>Name: {player.name}</p>
//               <p>Age: {player.age}</p>
//               <p>Country: {player.country}</p>
//               <p>Score: {player.score}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default GamePage;
import React, { useState, useEffect } from 'react';

const GRID_SIZE = 3;
const MAX_CHOICES = 3;
const NUM_GRIDS = 3;

const Game = () => {
  const [grids, setGrids] = useState(generateGrids());
  const [choicesLeft, setChoicesLeft] = useState(MAX_CHOICES);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Failed to fetch player information');
        }
        const players = await response.json();
        setOtherPlayers(players);
      } catch (error) {
        console.error('Error fetching player information:', error);
      }
    }

    fetchData();
  }, []);

  function generateGrids() {
    return Array.from({ length: NUM_GRIDS }, () =>
      Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => {
          const hasGift = Math.random() < 0.5;
          const hasTrap = Math.random() < 0.2;
          return { gift: hasGift, trap: hasTrap, revealed: false };
        })
      )
    );
  }

  const selectCell = (gridIndex, row, col) => {
    if (choicesLeft === 0) return;

    const updatedGrids = [...grids];
    const cell = updatedGrids[gridIndex][row][col];

    if (!cell.revealed) {
      cell.revealed = true;
      setChoicesLeft(choicesLeft - 1);

      if (cell.gift) {
        const points = choicesLeft * 10;
        setScore(score + points);
        setResult('gift');
      } else if (cell.trap) {
        const penalty = 20;
        setScore(score - penalty);
        setResult('trap');
      } else if (choicesLeft === 1) {
        setResult('no-gift');
      }

      setGrids(updatedGrids);
    }
  };

  const restartGame = () => {
    setGrids(generateGrids());
    setChoicesLeft(MAX_CHOICES);
    setResult('');
    setScore(0);
    setName('');
    setAge('');
    setCountry('');
  };

  const revealGifts = () => {
    const updatedGrids = grids.map(grid =>
      grid.map(row =>
        row.map(cell => ({
          ...cell,
          revealed: cell.gift ? true : cell.revealed,
        }))
      )
    );
    setGrids(updatedGrids);
  };

  const savePlayerInfo = async () => {
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          country,
          score,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save player information');
      }
    } catch (error) {
      console.error('Error saving player information:', error);
    }
  };

  return (
    <div className="game-container">
      <h1>Gift Grid Game</h1>
      <div className="game-info">
        <p>Remaining choices: {choicesLeft}</p>
        <p>Score: {score}</p>
      </div>
      {result && (
        <div className="result-container">
          {result === 'gift' ? (
            <div>
              <p>You found a gift! 🎁</p>
              {choicesLeft >= 2 && <p>Very good!</p>}
            </div>
          ) : (
            <p>Sorry, no gift here. You lose.</p>
          )}
          <div className="buttons-container">
            <button onClick={revealGifts}>Reveal Gifts</button>
            <button onClick={restartGame}>Restart</button>
          </div>
          <div className="player-info-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button onClick={savePlayerInfo}>Save Player Info</button>
            {name && age && country && (
              <div className="player-details">
                <p>Name: {name}</p>
                <p>Age: {age}</p>
                <p>Country: {country}</p>
                <p>Score: {score}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="grids-container">
        {grids.map((grid, gridIndex) => (
          <div key={gridIndex} className="grid">
            <h2>Grid {gridIndex + 1}</h2>
            <div className="grid-content">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`cell ${cell.revealed ? 'revealed' : ''}`}
                    onClick={() => selectCell(gridIndex, rowIndex, colIndex)}
                  >
                    {cell.revealed ? (cell.gift ? '🎁' : '') : ''}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="other-players-container">
        <h2>Other Players</h2>
        <ul>
          {otherPlayers.map((player, index) => (
            <li key={index} className="player-item">
              <p>Name: {player.name}</p>
              <p>Age: {player.age}</p>
              <p>Country: {player.country}</p>
              <p>Score: {player.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
