/* eslint-disable no-undef */
describe('React sovellus', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });

  it('Sisäänkirjautuminen toimii', function () {
    cy.contains('Login');
    cy.contains('Käyttäjätunnus');
    cy.get('#loginName').type('Taisto');
    cy.contains('Salasana');
    cy.get('#loginPass').type('Taisto');
    cy.get('#lähetä').click();
    cy.contains('Tervetuloa Taisto!').should('be.visible');
  });

});