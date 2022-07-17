import * as React from "react"
import Table from "react-bootstrap/Table"
import { formatCurrency } from "utils/common"
import useReadCSV from "hooks/useReadCSV"
import { useOption } from "store/OptionContext"
import { renderDropdownTable, optionHeader } from "helpers/table"

const ExpensesTable: React.FC = () => {
  const values = useReadCSV()
  const { option } = useOption()

  const id = React.useId()

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td className='font-bold'>{optionHeader(option)}</td>
          <td className='font-bold'>Amount</td>
        </tr>
      </thead>
      <tbody>
        {renderDropdownTable(option, values)?.result?.map((item, index) => {
          return (
            <tr key={`${id}-${index}`}>
              <td>{item.name}</td>
              <td>{formatCurrency.format(item.amount as number)}</td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className='font-bold'>Total</td>
          <td className='font-bold'>
            {formatCurrency.format(renderDropdownTable(option, values)?.final as number)}
          </td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default ExpensesTable
