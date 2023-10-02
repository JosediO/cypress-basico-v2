//// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('src/index.html')
    })
    it('verifica o título da aplicação', function() {
       
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const LongText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste'
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#open-text-area').type(LongText)
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible',)
    })
    it('exibe mensagem de error o formulário com erro de formatação email',function(){
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('Teste@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible',)
    })
    it('campo de telefone vazio sem preenchimento numerico',function(){
        cy.get('#phone')
        .type('Walmyr')
        .should('have.value','')

    })
    it('exibe mensagem de erro quando o campo de telefone se torna obrigatorio mas não é preenchido.',function(){
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('Teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible',)
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('Teste').should('have.value','Teste').clear().should('have.value','')
        cy.get('#lastName').type('Teste').should('have.value','Teste').clear().should('have.value','')
        cy.get('#email').type('Teste@teste.com').should('have.value','Teste@teste.com').clear().should('have.value','')
        cy.get('#phone').type('12345678').should('have.value','12345678').clear().should('have.value','')
    })
    it('Envia o formulario sem os campos preenchidos',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Envia formulario com sucesso usando comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('Verifica a seleção "Youtube" por texto', function(){
        cy.get('#product').select('YouTube')
            .should('have.value','youtube')
    
    })
    it('Verifica a seleção "Mentoria" por texto', function(){
        cy.get('#product').select('Mentoria')
            .should('have.value','mentoria')
    
    })
    it('Verifica a seleção "Blog" por indice', function(){
        cy.get('#product').select(1)
            .should('have.value','blog')
    })
    it('Verifica a seleção "Youtube" para o texto', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
    })
    it('Verificar cada marcação do radio',function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('Marca ambos checkboxes e desmarca o último',function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.be.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona os arquivos simulando drag-drop',function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.be.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo da pasta fixtures para qual um foi dada o alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it('Acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
}) 