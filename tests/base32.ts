import test from 'ava'

import { bufferToBase32 } from '../src/base32'

test('bufferToBase32()', t => {
  t.is(
    bufferToBase32(Buffer.from('hello world', 'ascii')),
    'd1jprv3f41vpywkccg'
  )
})
