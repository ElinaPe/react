/* eslint-disable no-undef */
describe('React sovellus', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });
  //Näköjään joka testin kohdalla tulee myös kirjautua erikseen sisään, niin kirjotan nyt 
  //aika paljon yhteen pötköön

  it('Product listaus, lisäysformin näkyvyys ja tuotteen lisäys', function () { 
    cy.contains('Käyttäjätunnus');
    cy.get('#loginName').type('Taisto');
    cy.contains('Salasana');
    cy.get('#loginPass').type('Taisto');
    cy.get('#lähetä').click();
    cy.contains('Tervetuloa Taisto!').should('be.visible');
    cy.visit('http://localhost:3000/products'); //Product sivuille
    cy.contains('Products'); //Product -sivun oikea näkymä
    cy.contains('Add new');
    cy.contains('Chai').click(); //Tuotteen lisätiedon näkymä
    cy.contains('Id');
    cy.contains('1');
    cy.contains('Delete');
    cy.contains('Edit');
    cy.contains('Add new').click(); //uuden tuotteen form auki
    cy.contains('Product add');
    cy.contains('Product Name'); 
    cy.contains('Supplier Id');
    cy.contains('Category Id');
    cy.contains('Quantity Per Unit');
    cy.contains('Unit Price');
    cy.contains('Units In Stock');
    cy.contains('Units On Order');
    cy.contains('Reorder Level');
    cy.contains('Discontinued');
    cy.get('#lähetä');
    cy.get('#takaisin');
    cy.get('#productName').type('Testi') //Uuden tuotteen luonti
    cy.get('#supplierID').type('1')
    cy.get('#categoryID').type('2')
    cy.get('#quantity').type('13')
    cy.get('#unitPrice').type('5')
    cy.get('#unitsInStock').type('21')
    cy.get('#UnitsOnOrder').type('2')
    cy.get('#reorderLevel').type('1')
    cy.get('#discontinued').click()
    cy.get('#lähetä').click();
    cy.contains('Hienosti onnistui lisäys: Testi').should('be.visible');
  });

  it('Tuotteen muokkaus ja poisto', function () { 
    cy.get('#loginName').type('Taisto');
    cy.contains('Salasana');
    cy.get('#loginPass').type('Taisto');
    cy.get('#lähetä').click();
    cy.contains('Tervetuloa Taisto!').should('be.visible');
    cy.visit('http://localhost:3000/products'); //Product sivuille
    cy.get('p').last().contains('Testi').click();
    cy.get('#editProduct').click(); //Muokkaustila auki
    cy.get('#supplierID').clear() //Parin kohdan muutokset
    cy.get('#supplierID').type(5)
    cy.get('#unitsInStock').clear()
    cy.get('#unitsInStock').type(19)
    cy.get('.discontinued').click()
    cy.get('#lähetä').click();
    cy.contains('Hienosti onnistui muokkaus: Testi').should('be.visible');
    cy.get('p').last().contains('Testi').click(); //Uudelleen sama tuote auki
    cy.get('#deleteProduct').click();
    cy.contains('Poisto onnistui tuotteelle Testi').should('be.visible');
  });

 
});