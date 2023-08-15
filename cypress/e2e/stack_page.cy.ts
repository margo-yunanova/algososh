import { Selectors } from "../../src/constants/cypress-constants";

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
    cy.get(Selectors.formValue).within(() => {
      cy.get(Selectors.inputValue)
        .should("be.empty")
        .get(Selectors.button)
        .should("be.disabled");
    });
  });

  describe("with data", () => {
    it("add", () => {
      for (let i = 0; i < 4; i++) {
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).click();
        cy.get(Selectors.head).eq(i).should("have.text", `top`);
        cy.get(Selectors.letter).eq(i).should("have.text", `${i}`);
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("delete", () => {
      for (let i = 0; i < 4; i++) {
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).click();
      }
      for (let i = 3; i >= 0; i--) {
        cy.get(Selectors.deleteButton).click();
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get(Selectors.head)
          .eq(i - 1)
          .should("have.text", `top`);
      }
    });

    it("clear", () => {
      for (let i = 0; i < 4; i++) {
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).click();
      }

      cy.get(Selectors.clearButton).click();
      cy.get(Selectors.letter).should("not.exist");
    });
  });
});
