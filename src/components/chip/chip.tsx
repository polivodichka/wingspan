import React, { FC } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { changeChipColor, selectedColorsSelector } from "~/redux/modules/app";

import styles from "./chip.module.css";
import { COLOR, CSS_COLORS } from "~/constants/colors";
import { BIRDS } from "~/constants/birds";

type ChipProps = {
  index: number;
  defaultColor?: COLOR;
  defaultHandleClick?: () => void;
  maxSize?: number;
  muted?: boolean;
  blocked?: boolean;
};
export const Chip: FC<ChipProps> = ({
  index,
  defaultColor,
  defaultHandleClick,
  maxSize = 50,
  muted = false,
  blocked = false,
}) => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector(selectedColorsSelector);
  const color = selectedColors[index];

  const handleClick = () => {
    dispatch(changeChipColor(index));
  };

  const Bird = BIRDS[index];

  return (
    <div
      className={styles.chip}
      style={{
        color: defaultColor ? CSS_COLORS[defaultColor] : CSS_COLORS[color],
        inlineSize: `${maxSize}px`,
        blockSize: `${maxSize}px`,
        opacity: muted ? 0.2 : 1,
      }}
      onClick={!blocked ? defaultHandleClick ?? handleClick : undefined}
    >
      <Bird />
    </div>
  );
};
