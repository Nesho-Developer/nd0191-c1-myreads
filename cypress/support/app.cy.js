Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
beforeEach(() => {
  cy.log("I run before every test in every spec file!!!!!!");
});
