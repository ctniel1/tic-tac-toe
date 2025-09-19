export function generateWinningCombinations(size = 3) {
  const combinations = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const combo = [];
    for (let col = 0; col < size; col++) {
      combo.push({ row, col });
    }
    combinations.push(combo);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const combo = [];
    for (let row = 0; row < size; row++) {
      combo.push({ row, col });
    }
    combinations.push(combo);
  }

  // Diagonal (top-left to bottom-right)
  const diag1 = [];
  for (let i = 0; i < size; i++) {
    diag1.push({ row: i, col: i });
  }
  combinations.push(diag1);

  // Diagonal (top-right to bottom-left)
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag2.push({ row: i, col: size - 1 - i });
  }
  combinations.push(diag2);

  return combinations;
}

// Usage:
export const winningCombinations = generateWinningCombinations(3);
