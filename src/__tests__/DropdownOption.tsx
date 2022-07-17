import { render, screen } from "@testing-library/react"
import ExpenseOption from "components/ExpenseOption"

test("runs componet without errors", () => {
  render(<ExpenseOption />)
  expect(screen.getByTestId("expense-option")).toBeInTheDocument()
})

test("user can change the value of dropdown", () => {
  render(<ExpenseOption />)

  expect(screen.getByTestId("total-expense")).toBeInTheDocument()

  expect(screen.getByRole("option", { name: "choose option" }).selected).toBe(true)
  expect(screen.getAllByRole("option").length).toBe(5)
})
