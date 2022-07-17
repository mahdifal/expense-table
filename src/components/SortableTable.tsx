import * as React from "react"
import Table from "react-bootstrap/Table"
import { headers } from "constant/"
import useReadCSV from "hooks/useReadCSV"
import { Data, SortOrder, SortKeys } from "types"
import { sortData } from "helpers/table"

const SortButton = ({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder
  columnKey: SortKeys
  sortKey: SortKeys
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc" ? "sort-button sort-reverse" : "sort-button"
      }`}
    >
      ▲
    </button>
  )
}

const SortableTable: React.FC = () => {
  const values = useReadCSV()
  const [sortKey, setSortKey] = React.useState<SortKeys>("project_name")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ascn")

  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: values,
        sortKey,
        reverse: sortOrder === "desc",
      }),

    [sortKey, sortOrder, values],
  )

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn")

    setSortKey(key)
  }

  const id = React.useId()

  const dataSorted = sortedData() as []
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers?.map((row) => {
            return (
              <td key={row.key} className='font-bold'>
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
            )
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
          )
        })}
      </tbody>
    </Table>
  )
}

export default SortableTable
