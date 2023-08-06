describe("The Fibonacci Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkFibonacci"]').click();
    cy.url().should("include", "/fibonacci");
  });

  it("button is disabled", () => {
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]')
        .should("be.empty")
        .get('[data-cy="button"]')
        .should("be.disabled");
      cy.get('[data-cy="input"]').type("20");
      cy.get('[data-cy="button"]').should("be.disabled");
      cy.get('[data-cy="input"]').clear();
    });
  });

  it("fibonacci is rendered", () => {
    cy.get('[data-cy="input"]').should("be.empty").type("3");
    cy.get('[data-cy="button"]').click();
    cy.get('[data-cy="letter"]').should("have.length", 4);
    cy.get('[data-cy="letter"]').eq(0).should("have.text", "1");
    cy.get('[data-cy="letter"]').eq(1).should("have.text", "1");
    cy.get('[data-cy="letter"]').eq(2).should("have.text", "2");
    cy.get('[data-cy="letter"]').eq(3).should("have.text", "3");
  });
});
