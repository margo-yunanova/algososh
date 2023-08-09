describe("The String Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkString"]').click();
    cy.url().should("include", "/recursion");
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
    const colors = {
      d: "rgb(0, 50, 255)",
      m: "rgb(127, 224, 81)",
      c: "rgb(210, 82, 225)",
    };
    const words = ["привет", "тривеп", "теиврп", "тевирп"];
    const colorsCod = ["dddddd", "cddddc", "mcddcm", "mmmmmm"];

    cy.get('[data-cy="input"]').should("be.empty").type(words[0]);
    cy.get('[data-cy="button"]').click();

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        cy.get('[data-cy="letter"]').eq(j).should("have.text", words[i][j]);
        cy.get('[data-cy="state"]')
          .eq(j)
          .should("have.css", "border-color")
          .should("equal", colors[colorsCod[i][j]]);
      }
    }

    // it("color", () => {
    // const colorDefault = "rgb(0, 50, 255)";
    // const colorModified = "rgb(127, 224, 81)";
    // const colorChanged = "rgb(210, 82, 225)";
    //   cy.get('[data-cy="input"]').should("be.empty").type("привет");
    //   cy.get('[data-cy="button"]').click();

    //   for (let i = 0; i < "привет".length; i++) {
    //     cy.get('[data-cy="state"]')
    //       .eq(i)
    //       .should("have.css", "border-color")
    //       .should("equal", colorDefault);
    //   }

    //   cy.get('[data-cy="state"]')
    //     .eq(0)
    //     .should("have.css", "border-color")
    //     .should("equal", colorChanged);

    //   for (let i = 1; i < 5; i++) {
    //     cy.get('[data-cy="state"]')
    //       .eq(i)
    //       .should("have.css", "border-color")
    //       .should("equal", colorDefault);
    //   }

    //   cy.get('[data-cy="state"]')
    //     .eq(5)
    //     .should("have.css", "border-color")
    //     .should("equal", colorChanged);

    //   cy.get('[data-cy="state"]')
    //     .eq(0)
    //     .should("have.css", "border-color")
    //     .should("equal", colorModified);

    //   cy.get('[data-cy="state"]')
    //     .eq(1)
    //     .should("have.css", "border-color")
    //     .should("equal", colorChanged);

    //   for (let i = 2; i < 4; i++) {
    //     cy.get('[data-cy="state"]')
    //       .eq(i)
    //       .should("have.css", "border-color")
    //       .should("equal", colorDefault);
    //   }

    //   cy.get('[data-cy="state"]')
    //     .eq(4)
    //     .should("have.css", "border-color")
    //     .should("equal", colorChanged);

    //   cy.get('[data-cy="state"]')
    //     .eq(5)
    //     .should("have.css", "border-color")
    //     .should("equal", colorModified);

    //   for (let i = 0; i < 6; i++) {
    //     const color = i === 2 || i === 3 ? colorChanged : colorModified;
    //     cy.get('[data-cy="state"]')
    //       .eq(i)
    //       .should("have.css", "border-color")
    //       .should("equal", color);
    //   }

    //   for (let i = 0; i < "привет".length; i++) {
    //     cy.get('[data-cy="state"]')
    //       .eq(i)
    //       .should("have.css", "border-color")
    //       .should("equal", colorModified);
    //   }
  });
});
