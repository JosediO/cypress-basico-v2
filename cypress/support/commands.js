Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    const LongText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste'
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#open-text-area').type(LongText)
        cy.get('button[type="submit"]').click()
})