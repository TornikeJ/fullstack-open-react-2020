import React, { createContext, useContext, useReducer } from "react";
// import { Patient } from "../types";

import { Action } from "./reducer";
import { PatientsEntry } from '../types/Patients';

export type State = {
  patients: { [id: string]: PatientsEntry };
  patient: { [id: string]: PatientsEntry };
};

const initialState: State = {
  patients: {},
  patient:{}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
