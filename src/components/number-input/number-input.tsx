import React from "react";
import { NumberInput as CoreNumberInput } from "@alfalab/core-components/number-input";
import styles from "./number-input.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { selectedColorsSelector, setChipCount } from "~/redux/modules/app";

export const NumberInput = () => {
  const dispatch = useAppDispatch();
  const chipsNumber = useAppSelector(selectedColorsSelector).length;

  const handleChange = (_, payload) => {
    dispatch(setChipCount(payload.value));
  };

  return (
    <CoreNumberInput
      value={chipsNumber}
      onChange={handleChange}
      step={1}
      min={1}
      max={5}
      block={true}
      disableUserInput={true}
      labelView={"outer"}
      size={48}
      className={styles.inputWrapper}
    />
  );
};
