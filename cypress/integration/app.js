/* global cy */

import { describe, it } from 'vitest'

describe('Tic-tac-toe Game', () => {
  it('Page should be opened', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.contains('TIC-TAC-TOE')
    cy.contains('Χ')
  })
})
