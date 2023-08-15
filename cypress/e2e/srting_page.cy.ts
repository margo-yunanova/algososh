import { Colors, Selectors } from "../../src/constants/cypress-constants";

describe("The String Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkString"]').click();
    cy.url().should("include", "/recursion");
  });

  it("button is disabled", () => {
    cy.get(Selectors.formValue).within(() => {
      cy.get(Selectors.inputValue)
        .should("be.empty")
        .get(Selectors.button)
        .should("be.disabled");
    });
  });

  it("string is reversed", () => {
    const colorsMap = {
      d: Colors.default,
      m: Colors.modified,
      c: Colors.changed,
    };
    const words = ["привет", "тривеп", "теиврп", "тевирп"];
    const color = ["dddddd", "cddddc", "mcddcm", "mmmmmm"];

    cy.get(Selectors.inputValue).should("be.empty").type(words[0]);
    cy.get(Selectors.button).click();

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        cy.get(Selectors.letter).eq(j).should("have.text", words[i][j]);
        cy.get(Selectors.state)
          .eq(j)
          .should("have.css", "border-color")
          .should("equal", colorsMap[color[i][j]]);
      }
    }
  });
});
