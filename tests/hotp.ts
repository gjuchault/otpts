import test from 'ava';

import { buildHotp } from '../src';

test('hotp()', (t) => {
  const input = {
    secret: '12345678901234567890'
  }

  const hotp = buildHotp(input)

  t.is(hotp(), '755224')
  t.is(hotp(0), '755224')
  t.is(hotp(1), '287082')
  t.is(hotp(2), '359152')
  t.is(hotp(3), '969429')
  t.is(hotp(4), '338314')
  t.is(hotp(5), '254676')
  t.is(hotp(6), '287922')
  t.is(hotp(7), '162583')
  t.is(hotp(8), '399871')
  t.is(hotp(9), '520489')
})
