describe('Blog app', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('test5')
        cy.get('#password').type('test')
        cy.get('#submitLogin').click()
        cy.contains('test logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('test5')
        cy.get('#password').type('test5')
        cy.get('#submitLogin').click()
        cy.contains('Wrong credentials')
      })
    })
  })