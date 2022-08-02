/// <reference types="cypress"/>

describe("Create an article", () => {
  it("should create an article and navigate to that article detail page", () => {
    cy.setCookie('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY1OTI1MDE0MiwiZXhwIjoxNjYxODQyMTQyfQ.IDwI_R_FB-lDV_2y1rx3Wlqq-nNmNduqDNxYIQSsRxU')

    cy.visit("http://localhost:3000/admin/article");

    const text = "Deserunt in reprehenderit velit enim excepteur ipsum.";

    cy.get('input[name="title"]').type(text);

    cy.get("input[type=file]").selectFile("public/logo.png", { force: true });

    cy.get('textarea[name="perex"]').type(text);

    cy.get('textarea[name="content"]').type(text);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/article");

    cy.get("p").contains(text);

    cy.get("p").contains(text);
  });
});

export {};
