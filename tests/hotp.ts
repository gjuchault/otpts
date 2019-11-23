import test from 'ava'

import { buildHotp } from '../src'

test('hotp()', t => {
  const input = {
    secret: '12345678901234567890'
  }

  const { generate, verify } = buildHotp(input)

  t.is(generate(), '755224')
  t.is(generate(0), '755224')
  t.is(generate(1), '287082')
  t.is(generate(2), '359152')
  t.is(generate(3), '969429')
  t.is(generate(4), '338314')
  t.is(generate(5), '254676')
  t.is(generate(6), '287922')
  t.is(generate(7), '162583')
  t.is(generate(8), '399871')
  t.is(generate(9), '520489')

  t.is(verify('755224', 0), true)
  t.is(verify('755224'), true)
  t.is(verify('755225', 0), false)
})
