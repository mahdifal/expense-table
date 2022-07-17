describe("expense app", () => {
  it("app is run", () => {
    cy.visit("http://localhost:3000").wait(1000);
  });

  it("change options", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1500);
    const getOptions = cy.get('[data-testid="expense-option"]');
    getOptions
      .select(["Project Name"])
      .should("have.value", "project_name")
      .wait(1500);

    getOptions
      .select(["Departments"])
      .should("have.value", "departments")
      .wait(1500);

    getOptions
      .select(["Member Name"])
      .should("have.value", "member_name")
      .wait(1500);

    getOptions.select(["Date"]).should("have.value", "date").wait(1500);
    getOptions.select(["choose option"]).should("have.value", "").wait(1500);
  });

  it("click on sort button", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(1) > .sort-button").click().wait(500);
    cy.get(":nth-child(2) > .sort-button").click().wait(500);
    cy.get(":nth-child(3) > .sort-button").click().wait(500);
    cy.get(":nth-child(4) > .sort-button").click().wait(500);
    cy.get(":nth-child(5) > .sort-button").click().wait(500);
  });
});
