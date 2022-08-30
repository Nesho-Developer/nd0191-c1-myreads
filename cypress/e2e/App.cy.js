/// <reference types="cypress" />

describe("test the App page", () => {
  before(() => {
    cy.clearLocalStorage();
  });
  beforeEach(() => {
    // cy.intercept("GET", "https://reactnd-books-api.udacity.com/books", {
    //   statusCode: 200,
    //   fixture: "book.json",
    // });
  });
  it("successflly load", () => {
    cy.visit("/");
    // cy.wait(3000);
    cy.intercept("https://reactnd-books-api.udacity.com/books").as("books");
    cy.wait("@books");
  });
  it("check books in page", () => {
    cy.get("h2").should("have.length", 3);
    cy.get("select").should("have.length", 7);
    cy.get(".currentReading ol li").should("have.length", 2);
    cy.get(".wantToRead ol li").should("have.length", 2);
    cy.get(".read ol li").should("have.length", 3);
  });
  it("goto search page", () => {
    cy.contains("Add a book").scrollIntoView().should("be.visible").click();
    cy.location("pathname").should("match", /\/search$/);
  });
  it("check input feild", () => {
    cy.get("input")
      .should("have.length", 1)
      .and("have.attr", "placeholder")
      .and("eq", "Search by title, author, or ISBN");
  });
  it("able to type in the input ", () => {
    cy.get("input").type("xxxxx");
    cy.wait(1000);
    cy.get("p").should(
      "have.text",
      "Search by title, author, or ISBN to view more books."
    );
  });
  it("type predefined book name", () => {
    cy.get("input").clear().type("react");
    cy.get("select").its("length").should("be.gte", 1);
    cy.get("select").first().select("currentlyReading");
    // cy.viewport(1280, 720);
    // cy.screenshot("list");
  });
  it("back to home page", () => {
    cy.contains("Close").click();
    cy.wait(2000);
    cy.location("pathname").should("match", /\/$/);
  });
  it("count each shelf's books", () => {
    cy.get(".currentReading ol li").should("have.length", 3);
  });

  it("open book details page ", () => {
    cy.get(".currentReading ol li").first().click();
    cy.location("pathname").should("match", /\/books\/nggnmAEACAAJ$/);
  });
});
