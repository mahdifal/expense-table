import React from "react";
import Papa, { ParseResult } from "papaparse";

export type Data = {
  project_name: string;
  departments: string;
  amount: string;
  date: string;
  member_name: string;
};

export type TypeValue = {
  data: {
    project_name: string;
    departments: string;
    amount: string;
    date: string;
    member_name: string;
  }[];
};

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
