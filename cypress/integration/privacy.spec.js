beforeEach(function(){
    cy.visit('src/privacy.html')
})
Cypress._.times(5,function(){
it.only('testa a pagina de politica de privacidade', function(){
    cy.contains('Talking')
})
})