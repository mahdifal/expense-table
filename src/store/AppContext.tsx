import * as React from "react";
import { OptionContext } from "./OptionContext";

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [option, setOption] = React.useState<string>("");

  return (
    <OptionContext.Provider value={{ option, setOption }}>
      {children}
    </OptionContext.Provider>
  );
};

export default AppContext;
