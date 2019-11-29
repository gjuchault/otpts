import test from 'ava'
import { numberToBuffer, base32Decode, base32Encode } from '../src/bufferUtils'

test('numberToBuffer()', (t) => {
  t.deepEqual(
    numberToBuffer(0),
    Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
  )

  t.deepEqual(
    numberToBuffer(1337133713371337),
    Buffer.from([0xff, 0xff, 0xff, 0xff, 0xb4, 0x00, 0xb0, 0xc9])
  )
})

test('base32Decode()', (t) => {
  t.deepEqual(
    base32Decode('JBSWY3DPEHPK3PXP'),
    Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x21, 0xde, 0xad, 0xbe, 0xef])
  )

  t.throws(() => base32Decode('110y$$$'))
})

test('base32Encode()', (t) => {
  t.deepEqual(
    base32Encode(Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x21, 0xde, 0xad, 0xbe, 0xef])),
    'JBSWY3DPEHPK3PXP'
  )
})
