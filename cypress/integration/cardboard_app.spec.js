describe('Cardboard app', () => {
  it('successfully loads application and fetches cards', () => {
    cy.intercept('GET', '/cards', { fixture: 'cards.json' })

    cy.visit('/')
  })
})
