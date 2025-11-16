import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { Space } from "@alfalab/core-components/space";

import React from "react";
import {
  initGame,
  selectedColorsSelector,
} from "~/redux/modules/app";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { Chip } from "~/components/chip";
import { NumberInput } from "~/components/number-input";

import styles from "./enter-page.module.css";

export function EnterPage() {
  const dispatch = useAppDispatch();

  const chips = useAppSelector(selectedColorsSelector);

  const handleStart = () => {
    dispatch(initGame());
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.root}>
        <Space useCssGaps={false} direction="horizontal" align={"center"}>
          {chips.map((_, index) => (
            <Chip key={index} index={index} />
          ))}
        </Space>

        <NumberInput />
        <Gap size="s" />
        <Button view="primary" block={true} onClick={handleStart}>
          Start
        </Button>
      </div>
    </div>
  );
}
