/* eslint-env node, jest */
import { Client } from '../src'

describe('Client', () => {
  let authlessClient: Client | null = null

  describe('new', () => {
    test('returns authlessClient instance', () => {
      authlessClient = new Client({
        uri: 'http://example.com:4000',
        retries: 1,
      })
      expect(authlessClient).toBeInstanceOf(Client)
    })
  })
})
