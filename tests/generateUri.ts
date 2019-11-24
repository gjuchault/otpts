import test from 'ava'
import { generateUri } from '../src'

test('generateUri()', t => {
  t.is(
    generateUri({
      type: 'hotp',
      label: 'Github',
      secret: '12345678901234567890'
    }),
    'otpauth://hotp/Github?secret=12345678901234567890'
  )

  t.is(
    generateUri({
      type: 'hotp',
      label: 'Github',
      secret: '12345678901234567890',
      digits: 8
    }),
    'otpauth://hotp/Github?secret=12345678901234567890&digits=8'
  )

  t.is(
    generateUri({
      type: 'hotp',
      label: 'Github',
      secret: '12345678901234567890',
      hmacAlgorithm: 'sha256'
    }),
    'otpauth://hotp/Github?secret=12345678901234567890&algorithm=sha256'
  )

  t.is(
    generateUri({
      type: 'hotp',
      label: 'Github',
      secret: '12345678901234567890',
      initialCounter: 5
    }),
    'otpauth://hotp/Github?secret=12345678901234567890&counter=5'
  )

  t.is(
    generateUri({
      type: 'hotp',
      label: 'Github',
      secret: '12345678901234567890',
      issuer: 'otpts'
    }),
    'otpauth://hotp/Github?secret=12345678901234567890&issuer=otpts'
  )

  t.is(
    generateUri({
      type: 'totp',
      label: 'Github',
      secret: '12345678901234567890'
    }),
    'otpauth://totp/Github?secret=12345678901234567890'
  )

  t.is(
    generateUri({
      type: 'totp',
      label: 'Github',
      secret: '12345678901234567890',
      interval: 60
    }),
    'otpauth://totp/Github?secret=12345678901234567890&period=60'
  )
})
