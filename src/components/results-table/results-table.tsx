import React, { CSSProperties, useState } from "react";
import { Table } from "@alfalab/core-components/table";
import { Typography } from "@alfalab/core-components/typography";

import {
  chipsNumSelector,
  confrontTableMarksSelector,
  resultsSelector,
  goalsSelector,
  selectedColorsSelector,
  updateResultTableData,
} from "~/redux/modules/app";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { Chip } from "~/components/chip";
import { NumberInput } from "@alfalab/core-components/number-input";
import styles from "./results-table.module.css";
import { Gap } from "@alfalab/core-components/gap";

export function ResultsTable() {
  const dispatch = useAppDispatch();

  const selectedColors = useAppSelector(selectedColorsSelector);
  const confrontTableResults = useAppSelector(resultsSelector);

  const titleCellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    minBlockSize: "100%",
  };

  const chipStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minBlockSize: "100%",
  };

  return (
    <div style={{ padding: "0 40px 0 40px" }}>
      <Typography.Title view="large" tag="h2">
        Результаты
      </Typography.Title>
      <Gap size={24} direction="vertical" />
      <Table stickyHeader={true}>
        <Table.THead>
          {selectedColors.map((color, index) => (
            <Table.THeadCell key={color}>
              <div style={chipStyle}>
                <Chip
                  index={index}
                  defaultColor={color}
                  maxSize={35}
                  blocked={true}
                />
              </div>
            </Table.THeadCell>
          ))}
        </Table.THead>
        <Table.TBody>
          {Object.entries(confrontTableResults).map(
            ([key, { title, values }]) => {
              if (key === "total") return;
              return (
                <Table.TRow>
                  {key !== "rounds"
                    ? values?.map((value, chipIndex) => (
                        <Table.TCell key={chipIndex}>
                          <Typography.Text
                            view="tagline"
                            tag="div"
                            color="disabled"
                          >
                            {title}
                          </Typography.Text>
                          <NumberInput
                            className={styles.inputWrapper}
                            value={value}
                            onChange={(_, { value }) => {
                              dispatch(
                                updateResultTableData({
                                  key,
                                  value: value ?? 0,
                                  chipIndex,
                                })
                              );
                            }}
                            step={1}
                            min={0}
                            block={true}
                            size={48}
                            fractionLength={0}
                          />
                        </Table.TCell>
                      ))
                    : values?.map((result) => (
                        <Table.TCell>
                          <Typography.Text
                            view="tagline"
                            tag="div"
                            color="disabled"
                          >
                            {title}
                          </Typography.Text>
                          <Typography.Text view="primary-small" tag="div">
                            {result}
                          </Typography.Text>
                        </Table.TCell>
                      ))}
                </Table.TRow>
              );
            }
          )}
        </Table.TBody>
      </Table>
      
      <Gap size={24} direction="vertical" />
      <Typography.Title view="large" tag="h2">
        {confrontTableResults.total.title}
      </Typography.Title>
      <Gap size={24} direction="vertical" />
      <Table>
        <Table.THead>
          {selectedColors.map((color, index) => (
            <Table.THeadCell textAlign="center" key={color}>
              <div style={chipStyle}>
                <Chip
                  index={index}
                  defaultColor={color}
                  maxSize={35}
                  blocked={true}
                />
              </div>
            </Table.THeadCell>
          ))}
        </Table.THead>
        <Table.TBody>
          <Table.TRow>
            {confrontTableResults.total.values?.map((result) => (
              <Table.TCell>
                <Typography.Text view="primary-small" tag="div">
                  {result}
                </Typography.Text>
              </Table.TCell>
            ))}
          </Table.TRow>
        </Table.TBody>
      </Table>
      <Gap size={24} direction="vertical" />
    </div>
  );
}
