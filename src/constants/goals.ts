import birdsInField from "~/assets/images/birds-in-field.png";
import birdsInForest from "~/assets/images/birds-in-forest.png";
import birdsInWater from "~/assets/images/birds-in-water.png";
import bowlsWithEggs from "~/assets/images/bowls-with-eggs.png";
import eggsInBowls from "~/assets/images/eggs-in-bowls.png";
import eggsInField from "~/assets/images/eggs-in-field.png";
import eggsInForest from "~/assets/images/eggs-in-forest.png";
import eggsInGroundNests from "~/assets/images/eggs-in-ground-nests.png";
import eggsInHollows from "~/assets/images/eggs-in-hollows.png";
import eggsInPlates from "~/assets/images/eggs-in-plates.png";
import eggsInWater from "~/assets/images/eggs-in-water.png";
import eggsSets from "~/assets/images/eggs-sets.png";
import groundNestsWithEggs from "~/assets/images/ground-nests-with-eggs.png";
import hollowsWithEggs from "~/assets/images/hollows-with-eggs.png";
import platesWithEggs from "~/assets/images/plates-with-eggs.png";
import totalBirds from "~/assets/images/total-birds.png";

export const enum GOAL {
  BIRDS_IN_FOREST = "Птицы в лесу",
  EGGS_IN_FOREST = "Яйца в лесу",

  BOWLS_WITH_EGGS = "Чаши с яйцами",
  EGGS_IN_BOWLS = "Яйца в чашах",

  HOLLOWS_WITH_EGGS = "Дупла с яйцами",
  EGGS_IN_HOLLOWS = "Яйца в дуплах",

  BIRDS_IN_FIELD = "Птицы в поле",
  EGGS_IN_FIELD = "Яйца в поле",

  EGGS_SETS = "Наборы яиц",
  TOTAL_BIRDS = "Всего птиц",

  PLATES_WITH_EGGS = "Платформа с яйцами (гнездо голубя)",
  EGGS_IN_PLATES = "Яйца в платформе (гнездо голубя)",

  EGGS_IN_GROUND_NESTS = "Яйца в наземном гнезде",
  GROUND_NESTS_WITH_EGGS = "Наземные гнезда с яйцами",

  BIRDS_IN_WATER = "Птицы в воде",
  EGGS_IN_WATER = "Яйца в воде",
}

export const GOAL_IMAGES = {
  [GOAL.BIRDS_IN_FOREST]: birdsInForest,
  [GOAL.EGGS_IN_FOREST]: eggsInForest,

  [GOAL.BOWLS_WITH_EGGS]: bowlsWithEggs,
  [GOAL.EGGS_IN_BOWLS]: eggsInBowls,

  [GOAL.HOLLOWS_WITH_EGGS]: hollowsWithEggs,
  [GOAL.EGGS_IN_HOLLOWS]: eggsInHollows,

  [GOAL.BIRDS_IN_FIELD]: birdsInField,
  [GOAL.EGGS_IN_FIELD]: eggsInField,

  [GOAL.EGGS_SETS]: eggsSets,
  [GOAL.TOTAL_BIRDS]: totalBirds,

  [GOAL.PLATES_WITH_EGGS]: platesWithEggs,
  [GOAL.EGGS_IN_PLATES]: eggsInPlates,

  [GOAL.EGGS_IN_GROUND_NESTS]: eggsInGroundNests,
  [GOAL.GROUND_NESTS_WITH_EGGS]: groundNestsWithEggs,

  [GOAL.BIRDS_IN_WATER]: birdsInWater,
  [GOAL.EGGS_IN_WATER]: eggsInWater,
} as const;

export const GOAL_PAIRS: [string, string][] = [
  [GOAL.BIRDS_IN_FOREST, GOAL.EGGS_IN_FOREST],
  [GOAL.BOWLS_WITH_EGGS, GOAL.EGGS_IN_BOWLS],
  [GOAL.HOLLOWS_WITH_EGGS, GOAL.EGGS_IN_HOLLOWS],
  [GOAL.BIRDS_IN_FIELD, GOAL.EGGS_IN_FIELD],
  [GOAL.EGGS_SETS, GOAL.TOTAL_BIRDS],
  [GOAL.PLATES_WITH_EGGS, GOAL.EGGS_IN_PLATES],
  [GOAL.EGGS_IN_GROUND_NESTS, GOAL.GROUND_NESTS_WITH_EGGS],
  [GOAL.BIRDS_IN_WATER, GOAL.EGGS_IN_WATER],
];

export const CONFRONT_MARKS = [
  [4, 1, 0, 0],
  [5, 2, 1, 0],
  [6, 3, 2, 0],
  [7, 4, 3, 0],
];
