import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("X's Turn");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handlePress = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(`${winner} Wins!`);
    } else if (newBoard.every(cell => cell)) {
      setStatus("It's a Draw!");
    } else {
      setIsXTurn(!isXTurn);
      setStatus(`${!isXTurn ? 'X' : 'O'}'s Turn`);
    }
  };

  const calculateWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setStatus("X's Turn");
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {board.map((_, i) => renderSquare(i))}
      </View>
      <Button title="Restart Game" onPress={resetGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  square: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  squareText: {
    fontSize: 36,
  },
});
