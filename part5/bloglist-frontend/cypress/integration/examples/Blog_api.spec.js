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

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('test5')
        cy.get('#password').type('test')
        cy.get('#submitLogin').click()
        cy.contains('test logged in')
      })
  
      it('A blog can be liked', function() {
        cy.contains('new note').click()
        cy.get('#title').type('Angular test')
        cy.get('#author').type('Anonymous')
        cy.get('#url').type('angular.com')
        cy.get('#createBlog').click()
        cy.contains('show').click()
        cy.contains('Like').click()
      })
    })

    
    describe.only('User can delete blog that he/she created', function() {
      beforeEach(function() {
        cy.get('#username').type('test5')
        cy.get('#password').type('test')
        cy.get('#submitLogin').click()
        cy.contains('test logged in')
      })
  
      it('A blog can be deleted', function() {
        cy.contains('new note').click()
        cy.get('#title').type('Delete Angular test')
        cy.get('#author').type('Anonymous')
        cy.get('#url').type('angular.com')
        cy.get('#createBlog').click()
        cy.contains('show').click()
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true);
      })

      it('A blog can not be deleted', function() {
        cy.contains('logout').click()
        cy.get('#username').type('test4')
        cy.get('#password').type('test')
        cy.get('#submitLogin').click()
        cy.contains('show').click()
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true);
      })
    })
  })