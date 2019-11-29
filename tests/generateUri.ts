import test from 'ava'
import { buildHotp, buildTotp, base32Decode } from '../src'

test('generateUri()', t => {
  t.is(
    buildHotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP')
    }).uri({
      label: 'john@doe.com'
    }),
    'otpauth://hotp/john@doe.com?secret=JBSWY3DPEHPK3PXP&algorithm=sha1&digits=6'
  )

  t.is(
    buildHotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP'),
      digits: 8
    }).uri({
      label: 'john@doe.com'
    }),
    'otpauth://hotp/john@doe.com?secret=JBSWY3DPEHPK3PXP&algorithm=sha1&digits=8'
  )

  t.is(
    buildHotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP'),
      hmacAlgorithm: 'sha256'
    }).uri({
      label: 'john@doe.com'
    }),
    'otpauth://hotp/john@doe.com?secret=JBSWY3DPEHPK3PXP&algorithm=sha256&digits=6'
  )

  t.is(
    buildHotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP')
    }).uri({
      label: 'john@doe.com',
      issuer: 'otpts'
    }),
    'otpauth://hotp/john@doe.com?secret=JBSWY3DPEHPK3PXP&issuer=otpts&algorithm=sha1&digits=6'
  )

  t.is(
    buildTotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP')
    }).uri({
      label: 'john@doe.com'
    }),
    'otpauth://totp/john@doe.com?secret=JBSWY3DPEHPK3PXP&algorithm=sha1&digits=6&period=30'
  )

  t.is(
    buildTotp({
      secret: base32Decode('JBSWY3DPEHPK3PXP'),
      interval: 60
    }).uri({
      label: 'john@doe.com'
    }),
    'otpauth://totp/john@doe.com?secret=JBSWY3DPEHPK3PXP&algorithm=sha1&digits=6&period=60'
  )
})
