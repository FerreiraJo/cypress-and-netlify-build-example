import { Given } from "cypress-cucumber-preprocessor/steps";

const url = Cypress.config("baseUrl")

Given(`I open the page`, () => {
  cy.visit(url);
});

Then(`I see {string} in the button`, (text) => {
  cy.get('.title').contains(text)
});
