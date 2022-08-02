/// <reference types="cypress"/>

describe("Login", () => {
  it("should login and redirect to /articles", () => {
    cy.visit('http://localhost:3000/admin/login')

    cy.get('input[name="username"]').type("user1");

    cy.get('input[name="password"]').type("password");

    cy.get('form').submit({timeout: 1000})

    cy.url().should('eq', "http://localhost:3000/articles");
  })
});

export {};
