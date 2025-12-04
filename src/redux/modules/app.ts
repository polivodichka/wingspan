import { colors } from "@alfalab/core-components/typography/colors";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { COLOR } from "~/constants/colors";
import { CONFRONT_MARKS } from "~/constants/goals";
import { SELECTED_COLORS_KEY } from "~/constants/localstorage";
import { generateRoundGoals } from "~/utils/generateRoundGoals";

export type AppState = {
  allColors: COLOR[];
  selectedColors: COLOR[];
  goals: string[];
  confrontTableData: PlacedChip[][][];
  confrontTableMarks: ConfrontTableMarkType[][];
  results: {
    birds: ResultRow;
    bonusCards: ResultRow;
    rounds: ResultRow;
    eggs: ResultRow;
    food: ResultRow;
    extraCards: ResultRow;
    total: ResultRow;
  };
  isGameActive: boolean;
};

export interface PlacedChip {
  chipIndex: number;
  color: COLOR;
  isActive: boolean;
}

type ConfrontTableMarkType = {
  mark: number;
  chipIndex: number;
} | null;

type ResultRow = {
  title: string;
  values: number[];
};
export const initialState: AppState = {
  allColors: Object.values(COLOR),
  selectedColors: [COLOR.YELLOW, COLOR.RED],
  goals: [],
  confrontTableData: [
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
    [[], [], [], []],
  ],
  confrontTableMarks: [],
  results: {
    birds: {
      title: "",
      values: [],
    },
    bonusCards: {
      title: "",
      values: [],
    },
    rounds: {
      title: "",
      values: [],
    },
    eggs: {
      title: "",
      values: [],
    },
    food: {
      title: "",
      values: [],
    },
    extraCards: {
      title: "",
      values: [],
    },
    total: {
      title: "",
      values: [],
    },
  },
  isGameActive: false,
};

const NUM_OF_PLACES = 4;
const NUM_OF_ROUNDS = 4;

const resetConfrontTableDataFunction = (state: AppState) => {
  state.confrontTableData = Array(NUM_OF_ROUNDS).fill(
    Array(NUM_OF_PLACES).fill(
      state.selectedColors.map((color, index) => ({
        color,
        chipIndex: index,
        isActive: false,
      }))
    )
  );
};

const resetResultsArray = (
  state: AppState,
  key?: keyof AppState["results"]
) => {
  if (key) {
    state.results[key].values = Array(state.selectedColors.length).fill(0);
    return;
  }

  state.results = {
    birds: {
      title: "Птицы",
      values: Array(state.selectedColors.length).fill(0),
    },
    bonusCards: {
      title: "Карты бонусов",
      values: Array(state.selectedColors.length).fill(0),
    },
    rounds: {
      title: "Цели раундов",
      values: Array(state.selectedColors.length).fill(0),
    },
    eggs: { title: "Яйца", values: Array(state.selectedColors.length).fill(0) },
    food: { title: "Еда", values: Array(state.selectedColors.length).fill(0) },
    extraCards: {
      title: "Доп. карты",
      values: Array(state.selectedColors.length).fill(0),
    },
    total: {
      title: "Итого",
      values: Array(state.selectedColors.length).fill(0),
    },
  };
};

const updateTotal = (state: AppState, index: number) => {
  state.results.total.values[index] =
    state.results.birds.values[index] +
    state.results.bonusCards.values[index] +
    state.results.rounds.values[index] +
    state.results.eggs.values[index] +
    state.results.food.values[index] +
    state.results.extraCards.values[index];
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeChipColor: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const currentColor = state.selectedColors[index];

      const availableColors = state.allColors.filter(
        (color) =>
          !state.selectedColors.includes(color) || color === currentColor
      );

      const currentIdx = availableColors.indexOf(currentColor);
      const nextColor =
        availableColors[(currentIdx + 1) % availableColors.length];

      state.selectedColors[index] = nextColor;
    },
    setChipCount: (state, { payload: count }: PayloadAction<number>) => {
      if (count < state.selectedColors.length) {
        state.selectedColors = state.selectedColors.slice(0, count);
      } else {
        const usedColors = new Set(state.selectedColors);
        const availableColors = state.allColors.filter(
          (c) => !usedColors.has(c)
        );
        const toAdd = availableColors.slice(
          0,
          count - state.selectedColors.length
        );
        state.selectedColors = [...state.selectedColors, ...toAdd];
      }
    },
    initGame: (state) => {
      state.goals = generateRoundGoals();
      resetResultsArray(state);

      state.isGameActive = true;
      resetConfrontTableDataFunction(state);

      localStorage.setItem(
        SELECTED_COLORS_KEY,
        JSON.stringify(state.selectedColors)
      );
    },
    initSelectedColors: (state) => {
      const savedColors = localStorage.getItem(SELECTED_COLORS_KEY);
      if (savedColors) {
        state.selectedColors = JSON.parse(savedColors);
      }
    },
    setIsGameActive: (state, { payload }: PayloadAction<boolean>) => {
      state.isGameActive = payload;

      resetConfrontTableDataFunction(state);
    },
    resetConfrontTableData: (state) => {
      resetConfrontTableDataFunction(state);
    },

    updateConfrontTableData: (
      state,
      action: PayloadAction<{
        roundIndex: number;
        placeIndex: number;
        chipIndex: number;
      }>
    ) => {
      const { roundIndex, placeIndex, chipIndex } = action.payload;
      const round = state.confrontTableData[roundIndex];
      round.forEach((place) => {
        const chip = place[chipIndex];
        if (chip?.isActive) {
          chip.isActive = false;
        }
      });

      state.confrontTableData[roundIndex][placeIndex][chipIndex].isActive =
        true;

      // update Results
      const results = state.confrontTableData[roundIndex].reduce(
        (acc, confrontTableDataRow, placeIndex) => {
          confrontTableDataRow.forEach((confrontTableData, chipIndex) => {
            if (confrontTableData.isActive) {
              acc.push({
                mark: CONFRONT_MARKS[roundIndex][placeIndex],
                chipIndex,
              });
            }
          });
          return acc;
        },
        [] as ConfrontTableMarkType[]
      );

      state.confrontTableMarks[roundIndex] = results;

      resetResultsArray(state, "rounds");
      state.confrontTableMarks?.forEach((marks) => {
        marks?.forEach((value) => {
          if (!value) return;

          const { mark, chipIndex } = value;

          if (value) {
            state.results.rounds.values[chipIndex] += mark;
          }
        });
      });
      updateTotal(state, chipIndex);
    },

    updateResultTableData: (
      state,
      action: PayloadAction<{ key: string; value: number; chipIndex: number }>
    ) => {
      const { key, value, chipIndex } = action.payload;
      state.results[key].values[chipIndex] = value;

      updateTotal(state, chipIndex);
    },
  },
  selectors: {
    selectedColorsSelector: ({ selectedColors }: AppState) => selectedColors,
    availableColorsSelector: ({ allColors, selectedColors }: AppState) =>
      allColors.filter((color) => !selectedColors.includes(color)),
    isGameActiveSelector: ({ isGameActive }: AppState) => isGameActive,
    goalsSelector: ({ goals }: AppState) => goals,
    confrontTableDataSelector: ({ confrontTableData }: AppState) =>
      confrontTableData,
    confrontTableMarksSelector: ({ confrontTableMarks }: AppState) =>
      confrontTableMarks,
    resultsSelector: ({ results }: AppState) => results,
    chipsNumSelector: ({ selectedColors }: AppState) => selectedColors.length,
  },
});

export const {
  selectedColorsSelector,
  availableColorsSelector,
  isGameActiveSelector,
  goalsSelector,
  confrontTableDataSelector,
  confrontTableMarksSelector,
  resultsSelector,
  chipsNumSelector,
} = appSlice.selectors;
export const {
  changeChipColor,
  setChipCount,
  initGame,
  initSelectedColors,
  setIsGameActive,
  resetConfrontTableData,
  updateConfrontTableData,
  updateResultTableData,
} = appSlice.actions;

export default appSlice.reducer;
