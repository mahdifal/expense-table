import React from "react";
import { OptionContextType } from "types";

const defaultState = {
  option: "",
};

export const OptionContext =
  React.createContext<OptionContextType>(defaultState);
export const useOption = () => React.useContext(OptionContext);
