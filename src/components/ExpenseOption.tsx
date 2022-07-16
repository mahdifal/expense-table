import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { dropdownItems } from "constant/";
import { useOption } from "store/OptionContext";

const ExpenseOption: React.FC = () => {
  const { setOption } = useOption();

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption!(e.target.value);
  };
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }} className="d-flex justify-content-end">
        <p className="mt-2" data-testid="total-expense">
          Total Expanses by:{" "}
        </p>
      </Col>
      <Col className="mb-4">
        <Form.Select
          aria-label="Calculate Expense By"
          onChange={handleDropdownChange}
          data-testid="expense-option"
        >
          {dropdownItems?.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ExpenseOption;
