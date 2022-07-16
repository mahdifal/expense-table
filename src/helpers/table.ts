import { TypeValue, SortKeys } from "types";

export const renderDropdownTable = (
  optionName: string,
  values: TypeValue | undefined
) => {
  const uniqueNames = [
    ...new Set(
      // @ts-ignore
      values?.data?.map((item) => item[optionName])
    ),
  ];

  const result = uniqueNames.map((unique) => {
    const amount = values?.data
      // @ts-ignore
      .filter((item) => item[optionName] === unique)
      .map((item) => Number(item?.amount?.replace(/[^0-9-]+/g, "")))
      .reduce((item, curr) => item + curr, 0);

    return {
      name: [unique],
      amount: amount,
    };
  });

  const final = result
    .map((item) => item.amount)
    .reduce((item, curr) => item! + curr!, 0);

  return { result, final };
};

export const optionHeader = (type: string) => {
  let result;
  switch (type) {
    case "project_name":
      result = "Project Name";
      break;
    case "departments":
      result = "Departments";
      break;
    case "date":
      result = "Date";
      break;
    case "member_name":
      result = "Member Name";
      break;
    default:
      result = null;
      break;
  }
  return result;
};

export const sortData = ({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: TypeValue | undefined;
  sortKey: SortKeys;
  reverse: boolean;
}) => {
  if (!sortKey) return tableData;

  const sortedData = tableData?.data?.sort((a, b) => {
    return a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1;
  });

  if (reverse) {
    return sortedData!.reverse();
  }

  return sortedData;
};
