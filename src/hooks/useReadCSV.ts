import React from "react";
import Papa, { ParseResult } from "papaparse";
import { TypeValue, Data } from "types";

const useReadCSV = () => {
  const [values, setValues] = React.useState<TypeValue | undefined>();

  const getCSV = () => {
    Papa.parse("/expanses.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<Data>) => {
        setValues(results);
      },
    });
  };

  React.useEffect(() => {
    getCSV();
  }, []);

  return values;
};

export default useReadCSV;
