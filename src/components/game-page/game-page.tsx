import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { Space } from "@alfalab/core-components/space";
import { Table } from "@alfalab/core-components/table";
import { Typography } from "@alfalab/core-components/typography";
import { Amount } from "@alfalab/core-components/amount";

import React, { useState } from "react";
import {
  confrontTableDataSelector,
  initGame,
  goalsSelector,
  selectedColorsSelector,
  setIsGameActive,
} from "~/redux/modules/app";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { Chip } from "~/components/chip";
import { NumberInput } from "~/components/number-input";
import { BIRDS } from "~/constants/birds";
import { ConfrontTable } from "../confront-table/confront-table";
import { ResultsTable } from "../results-table";
import styles from "./game-page.module.css";

type PlaceType = {
  chipIndex: number;
  place: number;
};

export function GamePage() {
  const dispatch = useAppDispatch();

  const goals = useAppSelector(goalsSelector);
  const confrontTableData = useAppSelector(confrontTableDataSelector);
  const selectedColors = useAppSelector(selectedColorsSelector);

  return (
    <div className={styles.wrapper}>
      <div className={styles.resultsWrapper}>
        <div className={styles.resultsTable}>
          <div className={styles.results}>
            <ConfrontTable />
          </div>
        </div>
      </div>
      <div className={styles.resultsWrapper}>
        <div className={styles.resultsTable}>
          <div className={styles.results}>
            <ResultsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
