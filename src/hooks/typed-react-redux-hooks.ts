import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { ApplicationState } from "~/redux/root-reducer";
import store from "~/redux/root-reducer";

export type ApplicationDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<ApplicationDispatch>();

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;