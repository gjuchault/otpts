import test from 'ava'
import { generateSecret } from '../src'

test('generateSecret()', async (t) => {
  t.is((await generateSecret(8)).length, 8)
  t.is((await generateSecret(10)).length, 10)
})
