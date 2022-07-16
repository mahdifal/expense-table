import React, { useState, useId, MouseEventHandler, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import useReadCSV, { Data, TypeValue } from "./hooks/useReadCSV";

type SortKeys = keyof Data;

type SortOrder = "ascn" | "desc";

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

function App() {
  const values = useReadCSV();
  const [sortKey, setSortKey] = useState<SortKeys>("project_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "project_name", label: "Project Name" },
    { key: "departments", label: "Departments" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "member_name", label: "Member Name" },
  ];

  const dropdownItems: { [name: string]: string }[] = [
    { key: "", label: "choose option" },
    { key: "project_name", label: "Project Name" },
    { key: "departments", label: "Departments" },
    { key: "date", label: "Date" },
    { key: "member_name", label: "Member Name" },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: TypeValue | undefined;
    sortKey: SortKeys;
    reverse: boolean;
  }) {
    if (!sortKey) return tableData;

    const sortedData = values?.data?.sort((a, b) => {
      return a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1;
    });

    if (reverse) {
      return sortedData!.reverse();
    }

    return sortedData;
  }

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: values,
        sortKey,
        reverse: sortOrder === "desc",
      }),

    [sortData, sortKey, sortOrder, values]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  const id = useId();

  const dataSorted = sortedData() as [];

  const [option, setOption] = useState<string>("");

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  function renderDropdownTable(optionName: string) {
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
        .map((item) => Number(item.amount.replace(/[^0-9\-]+/g, "")))
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
  }

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  const optionHeader = (type: string) => {
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

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="d-flex justify-content-end">
          <p className="mt-2">Total Expanses by: </p>
        </Col>
        <Col className="mb-4">
          <Form.Select
            aria-label="Calculate Expense By"
            onChange={handleDropdownChange}
          >
            {dropdownItems?.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          {!option ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {headers?.map((row) => {
                    return (
                      <td key={row.key} className="font-bold">
                        {row.label}{" "}
                        <SortButton
                          columnKey={row.key}
                          onClick={() => changeSort(row.key)}
                          {...{
                            sortOrder,
                            sortKey,
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {dataSorted?.map((row: Data, index: number) => {
                  return (
                    <tr key={`${id}-${index}`}>
                      <td>{row.departments}</td>
                      <td>{row.project_name}</td>
                      <td>{row.amount}</td>
                      <td>{row.date}</td>
                      <td>{row.member_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td className="font-bold">{optionHeader(option)}</td>
                  <td className="font-bold">Amount</td>
                </tr>
              </thead>
              <tbody>
                {renderDropdownTable(option)?.result?.map((item, index) => {
                  return (
                    <tr key={`${id}-${index}`}>
                      <td>{item.name}</td>
                      <td>{formatter.format(item.amount as number)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="font-bold">
                    {formatter.format(
                      renderDropdownTable(option)?.final as number
                    )}
                  </td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
