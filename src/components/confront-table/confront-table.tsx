import React, { CSSProperties } from "react";
import { Table } from "@alfalab/core-components/table";
import { Typography } from "@alfalab/core-components/typography";

import {
  confrontTableDataSelector,
  goalsSelector,
  updateConfrontTableData,
} from "~/redux/modules/app";
import {
  useAppDispatch,
  useAppSelector,
} from "~/hooks/typed-react-redux-hooks";
import { Chip } from "~/components/chip";

import styles from "./confront-table.module.css";
import { Gap } from "@alfalab/core-components/gap";

export function ConfrontTable() {
  const dispatch = useAppDispatch();

  const goals = useAppSelector(goalsSelector);
  const confrontTableData = useAppSelector(confrontTableDataSelector);

  const goalCellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    minBlockSize: "100%",
  };

  return (
    <div
      style={{
        padding: "40px 40px 0 40px",
      }}
    >
      <Typography.Title view="large" tag="h2">
        Цели раундов
      </Typography.Title>
      <Gap size={24} direction="vertical" />
      <Table compactHorizontal={true}>
        <Table.THead>
          <Table.THeadCell textAlign="center" title=""></Table.THeadCell>

          <Table.THeadCell textAlign="center" title="1-е место">
            1-е место
          </Table.THeadCell>
          <Table.THeadCell textAlign="center" title="2-е место">
            2-е место
          </Table.THeadCell>
          <Table.THeadCell textAlign="center" title="3-е место">
            3-е место
          </Table.THeadCell>
          <Table.THeadCell textAlign="center" title="0">
            0
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {goals.map((goal, roundIndex) => (
            <Table.TRow key={roundIndex}>
              <Table.TCell>
                <Typography.Text
                  view="primary-small"
                  tag="div"
                  style={goalCellStyle}
                >
                  {goal}
                </Typography.Text>
              </Table.TCell>

              {
                confrontTableData[roundIndex].map(
                  (confrontTableDataRow, placeIndex) => {
                    return (
                      <Table.TCell key={"place-" + placeIndex}>
                        <div className={styles.cell}>
                          {confrontTableDataRow.map(
                            (confrontTableData, chipIndex) => {
                              return (
                                <Chip
                                  key={"player-" + chipIndex}
                                  index={confrontTableData.chipIndex}
                                  defaultColor={confrontTableData.color}
                                  defaultHandleClick={() => {
                                    dispatch(
                                      updateConfrontTableData({
                                        roundIndex,
                                        placeIndex,
                                        chipIndex,
                                      })
                                    );
                                  }}
                                  maxSize={25}
                                  muted={!confrontTableData.isActive}
                                />
                              );
                            }
                          )}
                        </div>
                      </Table.TCell>
                    );
                  }
                ) as any
              }
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
    </div>
  );
}
