import test from 'ava';

import { buildTotp } from '../src';

test('totp()', (t) => {
  const input = {
    secret: '12345678901234567890'
  }

  const totp = buildTotp(input)

  const totpCustomInterval = buildTotp({
    ...input,
    interval: 60,
    digits: 8
  })

  t.is(totp(59), '287082')
  t.is(totpCustomInterval(100), '94287082')
  t.is(totp(1111111109), '081804')
  t.is(totp(1111111111), '050471')
  t.is(totp(1234567890), '005924')
  t.is(totp(2000000000), '279037')
  t.is(totp(20000000000), '353130')
})
