describe('Auth Form Test', () => {
    it('Visits the Dashboard', () => {
        cy.visit('http://localhost:3000')

        cy.get('nav')
            .contains('Sign Up', { matchCase: false })
            .should('have.attr', 'href', '/signup')

        // cy.get('form').contains('form', 'Login', { matchCase: false }).should('be.visible')

        // cy.get('label').contains('Login Name', { matchCase: false }).should('be.visible')
        // cy.get('label').contains('Password', { matchCase: false }).should('be.visible')

        // const inputName = cy.get("input[name='name']")
        // inputName.should('be.visible')

        const inputPassword = cy.get("input[name='password']")
        inputPassword.should('be.visible')
        inputPassword.should('have.attr', 'type', 'password')

        cy.get("img[alt='eye blocked']").should('be.visible')
        cy.get("img[alt='eye blocked']").click()
        cy.get("input[name='password']").should('have.attr', 'type', 'text')

        const inputSubmit = cy.get("input[type='submit']")
        inputSubmit.should('be.visible')

        // тест заполнения формы - начало
        inputSubmit.click()
        cy.get('#root').find('div').contains('name is a required').should('be.visible')

        inputPassword.type('testPassword').should('have.text', 'testPassword')
        inputSubmit.click()
        cy.get('#root').find('div').contains('name is a required').should('be.visible')
        inputPassword.clear()

        cy.get("input[name='name']").type('testUser').should('have.text', 'testUser')
        inputSubmit.click()
        cy.get('#root').find('div').contains('password must be').should('be.visible')

        inputPassword.type('123').should('have.text', '123')
        inputSubmit.click()
        cy.get('#root').find('div').contains('password must be').should('be.visible')

        inputPassword.type('testPassword')
        inputSubmit.click()
        // здесь мы должны получить ответ от сервера
        cy.get('#root').find('div').contains('login error', { matchCase: false }).should('be.visible')
        // тест заполнения формы - конец

        cy.get('form').contains('form', 'Login', { matchCase: false }).within(() => {
            cy.contains('Forgot password', { matchCase: false })
                .should('have.attr', 'href', '/restore')
        })
    })

    it('Sign up Form', () => {
        cy.visit('http://localhost:3000')

        cy.get('nav')
            .contains('sign up', { matchCase: false })
            .should('have.attr', 'href', '/signup')
            .click()                                // переходим на страницу с регистрацией
        cy.url().should('include', '/signup')

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')

        // cy.get('form').contains('form', 'Signup', { matchCase: false }).should('be.visible')

        // cy.get('label').contains('Login Name', { matchCase: false }).should('be.visible')
        // cy.get('label').contains('Email', { matchCase: false }).should('be.visible')
        // cy.get('label').contains('Password', { matchCase: false }).should('be.visible')

        const inputName = cy.get("input[name='name']")
        inputName.should('be.visible')
        const inputEmail = cy.get("input[name='email']")
        inputEmail.should('be.visible')

        cy.get("input[name='password']").should('have.attr', 'type', 'password')
        cy.get("img[alt='eye blocked']").should('be.visible')
        cy.get("img[alt='eye blocked']").click()
        cy.get("input[name='password']").should('have.attr', 'type', 'text')

        const inputSubmit = cy.get("input[type='submit']")
        inputSubmit.should('be.visible')

        // тест заполнения формы - начало
        inputSubmit.click()
        cy.get('#root').find('div').contains('name is a required').should('be.visible')

        inputName.type('testUser')
        inputSubmit.click()
        cy.get('#root').find('div').contains('email is a required').should('be.visible')

        inputEmail.type('mail')
        inputSubmit.click()
        cy.get('#root').find('div').contains('email must be').should('be.visible')
        inputEmail.type('@')
        inputSubmit.click()
        cy.get('#root').find('div').contains('email must be').should('be.visible')
        inputEmail.type('mail')
        inputSubmit.click()
        cy.get('#root').find('div').contains('email must be').should('be.visible')
        inputEmail.type('.com')
        inputSubmit.click()
        cy.get('#root').find('div').contains('password must be').should('be.visible')

        cy.get("input[name='password']").type('123')
        inputSubmit.click()
        cy.get('#root').find('div').contains('password must be').should('be.visible')
        // тест заполнения формы - конец

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')
            .click()    // возвращаемся на страницу входа
    })

    it('Forgot password Form', () => {

        cy.get('form').contains('form', 'Login', { matchCase: false }).within(() => {
            cy.contains('Forgot password', { matchCase: false })
                .should('have.attr', 'href', '/restore')
                .click() // переходим на страницу с отправкой ссылки на изменение пароля
        })
        cy.url().should('include', '/restore')

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')

        cy.get('form').contains('form', 'Restore', { matchCase: false }).should('be.visible')

        cy.get('label').contains('Email', { matchCase: false }).should('be.visible')

        const inputEmail = cy.get("input[name='email']")
        inputEmail.should('be.visible')

        const inputSubmit = cy.get("input[type='submit']")
        inputSubmit.should('be.visible')

        // тест заполнения формы - начало
        inputSubmit.click()
        cy.get('#root').find('div').contains('email is a required').should('be.visible')

        inputEmail.type('mail')
        inputSubmit.click()
        cy.get('#root').find('div').contains('email must be').should('be.visible')
        inputEmail.clear()

        inputEmail.type('mail@mail.com')
        inputSubmit.click()
        cy.get('#root').find('div').contains('reset password link', { matchCase: false }).should('be.visible')
        // тест заполнения формы - конец

        cy.get('nav')
            .contains('Login', { matchCase: false })
            .should('have.attr', 'href', '/login')
            .click()    // возвращаемся на страницу входа
    })

})
