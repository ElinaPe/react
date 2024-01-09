import cy from 'cypress'


describe('React sovellus', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });

  it('Sisäänkirjautuminen', function () {
    cy.contains('Login');
    cy.contains('Käyttäjätunnus');
    cy.get('#loginName').type('Taisto');
    cy.contains('Salasana');
    cy.get('#loginPass').type('Taisto');
    cy.contains('Login').click();
    cy.contains('Tervetuloa Taisto!').should('be.visible');
  });
});

  

  // it('Sivu avautuu ja näyttää datarivejä', function () {
  //     cy.visit('https://localhost:3000/api/products')
  //     cy.contains('Products')
  //     cy.contains('Add new')
  //     cy.contains('Chai')
  // })

//   it('Lisäys formi aukeaa ja lisäys toimii oikein', function () {

//     cy.contains('Lisää kurssi').click()
//     cy.contains('Tallenna')
//     cy.contains('Piilota lomake')

//     cy.get('#nimiInput').type('e2eTestikurssi')
//     cy.get('#laajuusInput').type(101)
//     cy.get('#tallennusNappi').click()
//     cy.contains('Lisätty uusi kurssi: e2eTestikurssi')
//     cy.get('h4').last().contains(101)
// })

// it('Kurssin poistaminen onnistuu', function () {
//     cy.get('h4').last().children().click()
//     cy.contains('Poisto tehty')
//     cy.get('h4').last().should('not.contain', 'e2eTestikurssi')
// })

