import { Selectors } from "../../src/constants/cypress-constants";

describe("The Fibonacci Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkFibonacci"]').click();
    cy.url().should("include", "/fibonacci");
  });

  it("button is disabled", () => {
    cy.get(Selectors.formValue).within(() => {
      cy.get(Selectors.inputValue)
        .should("be.empty")
        .get(Selectors.button)
        .should("be.disabled");
      cy.get(Selectors.inputValue).type("20");
      cy.get(Selectors.button).should("be.disabled");
      cy.get(Selectors.inputValue).clear();
    });
  });

  it("fibonacci is rendered", () => {
    cy.get(Selectors.inputValue).should("be.empty").type("3");
    cy.get(Selectors.button).click();
    cy.get(Selectors.letter).should("have.length", 4);
    cy.get(Selectors.letter).eq(0).should("have.text", "1");
    cy.get(Selectors.letter).eq(1).should("have.text", "1");
    cy.get(Selectors.letter).eq(2).should("have.text", "2");
    cy.get(Selectors.letter).eq(3).should("have.text", "3");
  });
});
