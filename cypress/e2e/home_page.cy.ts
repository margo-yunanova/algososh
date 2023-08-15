describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get('[data-cy="linkString"]').click();
    cy.url().should("include", "/recursion");
    cy.get('[data-cy="returnButton"]').click();
    cy.url().should("include", "/");
    cy.get('[data-cy="linkFibonacci"]').click();
    cy.url().should("include", "/fibonacci");
    cy.get('[data-cy="returnButton"]').click();
    cy.get('[data-cy="linkSorting"]').click();
    cy.url().should("include", "/sorting");
    cy.get('[data-cy="returnButton"]').click();
    cy.get('[data-cy="linkStack"]').click();
    cy.url().should("include", "/stack");
    cy.get('[data-cy="returnButton"]').click();
    cy.get('[data-cy="linkQueue"]').click();
    cy.url().should("include", "/queue");
    cy.get('[data-cy="returnButton"]').click();
    cy.get('[data-cy="linkList"]').click();
    cy.url().should("include", "/list");
    cy.get('[data-cy="returnButton"]').click();
  });
});
