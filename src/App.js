import Dice from "./Dice";
import React from "react";
import "./styles.css";

export default function App() {
  function getNumber() {
    return {
      value: Math.ceil(Math.random() * 6),
      change: true,
      id: 1
    };
  }

  function getDiceNumber() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({ ...getNumber(), id: i });
    }
    return arr;
  }

  function handleRoll() {
    if (!gameOver) {
      setDice((prevDice) =>
        prevDice.map((dice, idx) => {
          return dice.change ? { ...getNumber(), id: idx } : dice;
        })
      );
    } else {
      setGameOver(false);
      setDice(getDiceNumber());
    }
  }

  function diceClick(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id === id ? { ...dice, change: !dice.change } : dice;
      })
    );
  }

  const [dice, setDice] = React.useState(getDiceNumber());

  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const finalState = dice.every((dice) => !dice.change);
    const firstDiceVal = dice[0].value;
    const allDiceVal = dice.every((dice) => dice.value === firstDiceVal);
    if (finalState && allDiceVal) {
      setGameOver(true);
    }
  }, [dice]);

  const diceArray = dice.map((item) => {
    return (
      <Dice
        value={item.value}
        key={item.id}
        change={item.change}
        clickFn={() => diceClick(item.id)}
      ></Dice>
    );
  });

  return (
    <main>
      {gameOver && <h3 className="congrats">Congrats you won</h3>}
      <h2 className="title">Tenzies</h2>
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--array">{diceArray}</div>
      <button className="roll" onClick={handleRoll}>
        {gameOver ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
