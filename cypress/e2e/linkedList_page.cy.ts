import { Selectors, Colors } from "../../src/constants/cypress-constants";
import { HEAD, TAIL } from "../../src/constants/element-captions";

describe("The LinkedList Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkList"]').click();
    cy.url().should("include", "/list");
  });

  it("add button is disabled", () => {
    cy.get(Selectors.formValue).within(() => {
      cy.get(Selectors.inputValue).should("be.empty");
      cy.get(Selectors.addButtonHead).should("be.disabled");
      cy.get(Selectors.addButtonTail).should("be.disabled");
    });

    cy.get('[data-cy="formIndex"]').within(() => {
      cy.get(Selectors.inputIndex).should("be.empty");
      cy.get(Selectors.addButtonIndex).should("be.disabled");
      cy.get(Selectors.deleteButtonIndex).should("be.disabled");
    });
  });

  describe("with data", () => {
    it("initial data", () => {
      cy.get(Selectors.circle).then(($circle) => {
        cy.wrap($circle).should("have.length.within", 4, 6);
        cy.wrap($circle).first().find(Selectors.head).should("have.text", HEAD);
        cy.wrap($circle).last().find(Selectors.tail).should("have.text", TAIL);
      });
    });

    it("add in head", () => {
      cy.get(Selectors.inputValue).type("42");
      cy.get(Selectors.addButtonHead).should("be.enabled").click();

      cy.get(Selectors.state)
        .eq(0)
        .should("have.css", "border-color", Colors.changed);
      cy.get(Selectors.letter).eq(0).should("have.text", "42");
      cy.get(Selectors.state)
        .eq(0)
        .should("have.css", "border-color", Colors.modified);
      cy.get(Selectors.letter).eq(0).should("have.text", "42");
      cy.get(Selectors.state)
        .eq(0)
        .should("have.css", "border-color", Colors.default);
    });

    it("add in tail", () => {
      cy.get(Selectors.inputValue).type("42");
      cy.get(Selectors.addButtonTail).should("be.enabled").click();

      const smallCircleIndex = -2;

      cy.get(Selectors.state)
        .eq(smallCircleIndex)
        .should("have.css", "border-color", Colors.changed)
        .find(Selectors.letter)
        .should("have.text", "42");

      cy.get(Selectors.letter).last().should("have.text", "42");
      cy.get(Selectors.state)
        .last()
        .should("have.css", "border-color", Colors.modified);
      cy.get(Selectors.state)
        .last()
        .should("have.css", "border-color", Colors.default);
    });

    it("add by index", () => {
      const inputIndex = 4;
      cy.get(Selectors.inputValue).type("42");
      cy.get(Selectors.inputIndex).type(`${inputIndex}`);

      cy.get(Selectors.circle)
        .eq(0)
        .find(Selectors.bigCircle)
        .find(Selectors.head)
        .should("have.text", HEAD);

      cy.get(Selectors.addButtonIndex).should("be.enabled").click();

      for (let i = 0; i < inputIndex; i++) {
        cy.get(Selectors.circle)
          .eq(i)
          .within(() => {
            cy.get(Selectors.smallCircle)
              .find(Selectors.state)
              .should("have.css", "border-color", Colors.changed);
            cy.get(Selectors.bigCircle)
              .find(Selectors.state)
              .last()
              .should("have.css", "border-color", Colors.default);
          });
      }

      cy.get(Selectors.circle)
        .eq(inputIndex)
        .find(Selectors.bigCircle)
        .find(Selectors.state)
        .should("have.css", "border-color", Colors.modified);

      cy.get(Selectors.circle)
        .last()
        .find(Selectors.tail)
        .should("have.text", TAIL);
    });

    it("delete from head", () => {
      cy.get(Selectors.circle)
        .first()
        .then(($circle) => {
          const firstNumber = $circle.find(Selectors.letter).text();
          cy.get('[data-cy="deleteButtonHead"]').should("be.enabled").click();
          cy.wrap($circle)
            .find(Selectors.smallCircle)
            .should("have.text", firstNumber);

          cy.wrap($circle)
            .find(Selectors.bigCircle)
            .find(Selectors.letter)
            .first()
            .should("have.text", "");

          cy.wrap($circle)
            .find(Selectors.smallCircle)
            .find(Selectors.state)
            .should("have.css", "border-color", Colors.changed);
        });

      cy.get(Selectors.smallCircle).should("not.exist");

      cy.get(Selectors.circle).first().find(Selectors.head).should("exist");
    });

    it("delete from tail", () => {
      cy.get(Selectors.circle)
        .last()
        .then(($circle) => {
          const lastNumber = $circle.find(Selectors.letter).text();
          cy.get('[data-cy="deleteButtonTail"]').should("be.enabled").click();
          cy.wrap($circle)
            .find(Selectors.letter)
            .first()
            .should("have.text", "");
          cy.wrap($circle)
            .find(Selectors.smallCircle)
            .should("have.text", lastNumber);
          cy.wrap($circle)
            .find(Selectors.smallCircle)
            .find(Selectors.state)
            .should("have.css", "border-color", Colors.changed);
        });

      cy.get(Selectors.smallCircle).should("not.exist");

      cy.get(Selectors.circle).last().find(Selectors.tail).should("exist");
    });

    it("delete by index", () => {
      const inputIndex = 3;
      cy.get(Selectors.inputIndex).type(`${inputIndex}`);

      cy.get(Selectors.circle).then(($circle) => {
        const deleteNumber = $circle
          .eq(inputIndex)
          .find(Selectors.letter)
          .text();

        cy.get(Selectors.deleteButtonIndex).should("be.enabled").click();

        for (let i = 0; i < inputIndex; i++) {
          cy.wrap($circle)
            .eq(i)
            .find(Selectors.state)
            .should("have.css", "border-color", Colors.changed);
        }

        cy.wrap($circle)
          .eq(inputIndex)
          .within(() => {
            cy.get(Selectors.smallCircle)
              .find(Selectors.letter)
              .should("have.text", deleteNumber);
            cy.get(Selectors.smallCircle)
              .find(Selectors.state)
              .should("have.css", "border-color", Colors.changed);

            cy.get(Selectors.bigCircle)
              .find(Selectors.state)
              .should("have.css", "border-color", Colors.default)
              .find(Selectors.letter)
              .first()
              .should("have.text", "");
          });

        cy.get(Selectors.smallCircle).should("not.exist");
        cy.get(Selectors.circle).last().find(Selectors.tail).should("exist");
      });
    });
  });
});
