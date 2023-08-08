describe("The Stack Page", () => {
  let colorChanged, colorDefault;

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkStack"]').click();
    cy.url().should("include", "/stack");

    colorDefault = "rgb(0, 50, 255)";
    colorChanged = "rgb(210, 82, 225)";
  });

  it("add button is disabled", () => {
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]')
        .should("be.empty")
        .get('[data-cy="addButton"]')
        .should("be.disabled");
    });
  });

  describe("with data", () => {
    it("add", () => {
      for (let i = 0; i < 4; i++) {
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').click();
        cy.get('[data-cy="head"]').eq(i).should("have.text", `top`);
        cy.get('[data-cy="letter"]').eq(i).should("have.text", `${i}`);
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("delete", () => {
      for (let i = 0; i < 4; i++) {
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').click();
      }
      for (let i = 3; i >= 0; i--) {
        cy.get('[data-cy="deleteButton"]').click();
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get('[data-cy="head"]')
          .eq(i - 1)
          .should("have.text", `top`);
      }
    });

    it("clear", () => {
      for (let i = 0; i < 4; i++) {
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').click();
      }

      cy.get('[data-cy="clearButton"]').click();
      cy.get('[data-cy="letter"]').should("not.exist");
    });
  });
});
