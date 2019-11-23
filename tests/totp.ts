import test from 'ava';

import { buildTotp } from '../src';

test('totp()', (t) => {
  const input = {
    secret: '12345678901234567890'
  }

  const hotp = buildTotp(input)

  const hotpCustomInterval = buildTotp({
    ...input,
    interval: 60,
    digits: 8
  })

  t.is(hotp(59), '287082')
  t.is(hotpCustomInterval(100), '94287082')
  t.is(hotp(1111111109), '081804')
  t.is(hotp(1111111111), '050471')
  t.is(hotp(1234567890), '005924')
  t.is(hotp(2000000000), '279037')
  t.is(hotp(20000000000), '353130')
})
