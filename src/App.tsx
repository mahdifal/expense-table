import * as React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SortableTable from "components/SortableTable"
import ExpensesTable from "components/ExpensesTable"
import ExpenseOption from "components/ExpenseOption"
import { useOption } from "store/OptionContext"

const App: React.FC = () => {
  const { option } = useOption()
  return (
    <Container className='mt-5'>
      <ExpenseOption />
      <Row>
        <Col>{!option ? <SortableTable /> : <ExpensesTable />}</Col>
      </Row>
    </Container>
  )
}

export default App
