describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("can switch between days of the week", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
