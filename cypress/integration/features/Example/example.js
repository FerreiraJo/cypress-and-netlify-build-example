import { Given } from "cypress-cucumber-preprocessor/steps";


Given(`I open the page`, () => {
  cy.visit('/');
});

Then(`I see {string} in the button`, (text) => {
  cy.get('.title').contains(text)
});
