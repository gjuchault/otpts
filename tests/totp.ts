import test from 'ava'

import { buildTotp } from '../src'

test('totp()', t => {
  const input = {
    secret: '12345678901234567890'
  }

  const totp = buildTotp(input)

  const totpCustomInterval = buildTotp({
    ...input,
    interval: 60,
    digits: 8,
  })

  const totpCustomAlgorithm = buildTotp({
    ...input,
    hmacAlgorithm: 'sha256'
  })

  t.is(totp.generate(59), '287082')
  t.is(totp.generate(1111111109), '081804')
  t.is(totp.generate(1111111111), '050471')
  t.is(totp.generate(1234567890), '005924')
  t.is(totp.generate(2000000000), '279037')
  t.is(totp.generate(20000000000), '353130')
  t.is(totpCustomInterval.generate(100), '94287082')
  t.is(totpCustomAlgorithm.generate(100), '553149')

  t.is(totp.verify('287082', 59), true)
  t.is(totp.verify('287083', 59), false)
})
