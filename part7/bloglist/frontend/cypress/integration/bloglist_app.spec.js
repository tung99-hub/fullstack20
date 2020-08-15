describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'tung',
      name: 'Tung',
      password: '123456'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('tung')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Tung logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('unknown')
      cy.get('#password').type('unknown')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Tung logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tung', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('Myself')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#submit-blog').click()

      cy.contains('test blog')
      cy.contains('Myself')
    })

    it('User can like a blog', function() {
      cy.createBlog({ title: 'test blog', author: 'Myself', url: 'http://localhost:3000' })

      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('#likes').contains('1')
    })

    it('User who created the blog can delete it', function() {
      cy.createBlog({ title: 'test blog', author: 'Myself', url: 'http://localhost:3000' })

      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'test blog Myself')
    })

    it('Blogs are ordered by likes', function() {
      cy.createBlog({ title: 'first blog', author: 'A', url: 'http', likes: 10 })
      cy.createBlog({ title: 'second blog', author: 'B', url: 'https', likes: 100 })
      cy.createBlog({ title: 'third blog', author: 'C', url: 'httpss', likes: 1000 })

      cy.get('.blog').then(($blogs) => {
        const likes = $blogs.map(blog => blog.likes)
        const likes_sorted = likes.sort((a, b) => b.likes - a.likes)
        const isEqualArray = (a, b) => {
          if (a.length !== b.length) {
            return false
          }
          else {
            for (var i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) {
                return false
              }
            }
          }
          return true
        }
        cy.wrap(isEqualArray(likes, likes_sorted)).should('eq', true)
      })
    })
  })


})

// cy.request('POST', 'http://localhost:3001/api/login', {
//   username: 'tung',
//   password: '123456'
// }).then(({ body }) => {
//   localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
//   cy.visit('http://localhost:3000')
// })