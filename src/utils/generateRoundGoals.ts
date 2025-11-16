import { GOAL_PAIRS } from "~/constants/goals";

export function generateRoundGoals(count: number = 4): string[] {
  const shuffledPairs = [...GOAL_PAIRS].sort(() => Math.random() - 0.5); 
  const selectedPairs = shuffledPairs.slice(0, count);

  return selectedPairs.map(([goalA, goalB]) => {
    return Math.random() < 0.5 ? goalA : goalB;
  });
}
