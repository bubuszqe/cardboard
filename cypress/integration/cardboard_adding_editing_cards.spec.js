describe('Cardboard adding and editing content', () => {
  beforeEach(() => {
    cy.intercept('GET', '/cards', { fixture: 'cards.json' })
    cy.visit('/')
  })

  it('successfully adds new card when clicking on Add more cards', () => {
    cy.intercept('POST', '/cards', {}).as('postCard')

    cy.contains('Add more cards').click()

    cy.wait('@postCard').its('request.url').should('include', '/cards')
  })

  it('successfully saves updated card content after blurring edited card', () => {
    const updatedCardContent = {
      content: 'This is super, extra!',
    }

    cy.intercept('PUT', '/cards/**', {
      statusCode: 201,
      body: updatedCardContent,
    }).as('editCard')

    cy.intercept('GET', '/cards', [
      { ...updatedCardContent, id: 1, createdAt: '' },
    ])

    cy.contains('Click to start noting').click()

    cy.focused().type(updatedCardContent.content).blur()

    cy.wait('@editCard').its('request.url').should('include', '/cards')

    cy.contains(updatedCardContent.content)
  })
})
