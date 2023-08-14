import { Selectors } from "../../src/constants/cypress-constants";
import { HEAD, TAIL } from "../../src/constants/element-captions";

describe("The Stack Page", () => {
  const colorDefault = "rgb(0, 50, 255)";
  const colorChanged = "rgb(210, 82, 225)";

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkQueue"]').click();
    cy.url().should("include", "/queue");
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
      for (let i = 0; i < 7; i++) {
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).should("be.enabled");
        cy.get(Selectors.button).click();
        cy.get(Selectors.head).eq(0).should("have.text", HEAD);
        cy.get(Selectors.tail).eq(i).should("have.text", TAIL);
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get(Selectors.letter).eq(i).should("have.text", `${i}`);

        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("delete", () => {
      for (let i = 0; i < 7; i++) {
        cy.get(Selectors.button).should("be.disabled");
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).should("be.enabled").click();
      }

      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="deleteButton"]').click();
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get(Selectors.letter).eq(i).should("have.text", "");
        if (i < 6) {
          cy.get(Selectors.head)
            .eq(i + 1)
            .should("have.text", `head`);
          cy.get(Selectors.tail).eq(6).should("have.text", TAIL);
        } else {
          cy.get(Selectors.head).eq(6).should("have.text", ``);
          cy.get(Selectors.tail).eq(6).should("have.text", ``);
        }
        cy.get(Selectors.state)
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("clear", () => {
      for (let i = 0; i < 7; i++) {
        cy.get(Selectors.button).should("be.disabled");
        cy.get(Selectors.inputValue).type(`${i}`);
        cy.get(Selectors.button).should("be.enabled").click();
      }

      cy.get('[data-cy="clearButton"]').click();

      for (let i = 0; i < 7; i++) {
        cy.get(Selectors.letter).eq(i).should("have.text", "");
      }
    });
  });
});
