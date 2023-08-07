describe("The String Page", () => {
  let colorChanged, colorDefault, colorModified;

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkString"]').click();
    cy.url().should("include", "/recursion");

    colorDefault = "rgb(0, 50, 255)";
    colorModified = "rgb(127, 224, 81)";
    colorChanged = "rgb(210, 82, 225)";
  });

  it("button is disabled", () => {
    cy.get('[data-cy="form"]').within(() => {
      cy.get('[data-cy="input"]')
        .should("be.empty")
        .get('[data-cy="button"]')
        .should("be.disabled");
    });
  });

  it("string is reversed", () => {
    const words = ["привет", "тривеп", "теиврп", "тевирп"];

    cy.get('[data-cy="input"]').should("be.empty").type(words[0]);
    cy.get('[data-cy="button"]').click();

    for (const word of words) {
      for (let i = 0; i < word.length; i++) {
        cy.get('[data-cy="letter"]').eq(i).should("have.text", word[i]);
      }
    }
  });

  it("color", () => {
    cy.get('[data-cy="input"]').should("be.empty").type("привет");
    cy.get('[data-cy="button"]').click();

    for (let i = 0; i < "привет".length; i++) {
      cy.get('[data-cy="state"]')
        .eq(i)
        .should("have.css", "border-color")
        .should("equal", colorDefault);
    }

    cy.get('[data-cy="state"]')
      .eq(0)
      .should("have.css", "border-color")
      .should("equal", colorChanged);

    for (let i = 1; i < 5; i++) {
      cy.get('[data-cy="state"]')
        .eq(i)
        .should("have.css", "border-color")
        .should("equal", colorDefault);
    }

    cy.get('[data-cy="state"]')
      .eq(5)
      .should("have.css", "border-color")
      .should("equal", colorChanged);

    cy.get('[data-cy="state"]')
      .eq(0)
      .should("have.css", "border-color")
      .should("equal", colorModified);

    cy.get('[data-cy="state"]')
      .eq(1)
      .should("have.css", "border-color")
      .should("equal", colorChanged);

    for (let i = 2; i < 4; i++) {
      cy.get('[data-cy="state"]')
        .eq(i)
        .should("have.css", "border-color")
        .should("equal", colorDefault);
    }

    cy.get('[data-cy="state"]')
      .eq(4)
      .should("have.css", "border-color")
      .should("equal", colorChanged);

    cy.get('[data-cy="state"]')
      .eq(5)
      .should("have.css", "border-color")
      .should("equal", colorModified);

    for (let i = 0; i < 6; i++) {
      if (i === 2 || i === 3) {
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
      } else {
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorModified);
      }
    }

    for (let i = 0; i < "привет".length; i++) {
      cy.get('[data-cy="state"]')
        .eq(i)
        .should("have.css", "border-color")
        .should("equal", colorModified);
    }
  });
});
