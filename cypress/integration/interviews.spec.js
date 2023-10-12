describe("Interviews", () => {
  beforeEach(() => {
    cy.visit("/api/debug/reset");
  });

  it("should book an interview", () => {
    // In case API requests haven't fully loaded, set an alias to wait on (as per mentor call with Gary J)
    cy.intercept("/api/appointments").as("appointments");
    cy.visit("/");
    cy.wait("@appointments");
    cy.contains("Monday");

    // Find the + button and click it
    cy.get("img.appointment__add-button").first().click();

    // Fill out the form
    cy.get(".appointment__create-input").type("JT Smith");
    cy.get(".interviewers__item").first().click();
    cy.get("button").contains("Save").click();

    // The appointment is rendered
    cy.get("main").contains("JT Smith");
  });

  it("should edit an interview", () => {
    // In case API requests haven't fully loaded, set an alias to wait on (as per mentor call with Gary J)
    cy.intercept("/api/appointments").as("appointments");
    cy.visit("/");
    cy.wait("@appointments");
    cy.contains("Monday");

    // // Hover over the interview card to get the buttons to show
    // cy.get("main .appointment__card").first().focus();

    // Clicks the edit button for the existing appointment (force the click since technically the button isn't visible without hovering over the card)
    cy.get("img.appointment__actions-button").first().click({ force: true });

    // Changes the name and interviewer
    cy.get("input.appointment__create-input")
      .first()
      .clear()
      .type("Jack Smith");
    cy.get(".interviewers__item").last().click();

    // Clicks the save button
    cy.get("button").contains("Save").click();

    // Sees the edit to the appointment
    cy.get("main").contains("Jack Smith");
  });

  it("cancels an existing interview", () => {
    // In case API requests haven't fully loaded, set an alias to wait on (as per mentor call with Gary J)
    cy.intercept("/api/appointments").as("appointments");
    cy.visit("/");
    cy.wait("@appointments");
    cy.contains("Monday");

    // Clicks the delete button for the existing appointment
    cy.get("main")
      .contains("JT Smith")
      .get("img.appointment__actions-button")
      .last()
      .click({ force: true });

    // Clicks the confirm button
    cy.get("button").contains("Confirm").click();

    // Sees the edit to the appointment
    cy.get("main").should("not.contain.text", "JT Smith");
  });
});
