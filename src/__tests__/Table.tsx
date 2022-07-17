import { render, screen } from "@testing-library/react"
import SortableTable from "components/SortableTable"

test("render SortableTable without error", () => {
  render(<SortableTable />)
  expect(screen.getByRole("table")).toBeInTheDocument()
})

test("render Sortable Table tr and td", () => {
  render(<SortableTable />)

  const table = screen.getByRole("table")
  expect(table).toHaveClass("table-striped")

  const thead = screen.getAllByRole("cell")
  expect(thead).toHaveLength(5)

  const tbody = screen.getAllByRole("rowgroup")
  expect(tbody).toHaveLength(2)
})
