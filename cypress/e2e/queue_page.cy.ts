describe("The Stack Page", () => {
  let colorChanged, colorDefault;

  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="linkQueue"]').click();
    cy.url().should("include", "/queue");

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
      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').should("be.enabled");
        cy.get('[data-cy="addButton"]').click();
        cy.get('[data-cy="head"]').eq(0).should("have.text", `head`);
        cy.get('[data-cy="tail"]').eq(i).should("have.text", `tail`);
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get('[data-cy="letter"]').eq(i).should("have.text", `${i}`);

        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("delete", () => {
      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="addButton"]').should("be.disabled");
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').should("be.enabled").click();
      }

      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="deleteButton"]').click();
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorChanged);
        cy.get('[data-cy="letter"]').eq(i).should("have.text", "");
        if (i < 6) {
          cy.get('[data-cy="head"]')
            .eq(i + 1)
            .should("have.text", `head`);
          cy.get('[data-cy="tail"]').eq(6).should("have.text", `tail`);
        } else {
          cy.get('[data-cy="head"]').eq(6).should("have.text", ``);
          cy.get('[data-cy="tail"]').eq(6).should("have.text", ``);
        }
        cy.get('[data-cy="state"]')
          .eq(i)
          .should("have.css", "border-color")
          .should("equal", colorDefault);
      }
    });

    it("clear", () => {
      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="addButton"]').should("be.disabled");
        cy.get('[data-cy="input"]').type(`${i}`);
        cy.get('[data-cy="addButton"]').should("be.enabled").click();
      }

      cy.get('[data-cy="clearButton"]').click();

      for (let i = 0; i < 7; i++) {
        cy.get('[data-cy="letter"]').eq(i).should("have.text", "");
      }
    });
  });
});
