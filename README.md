# otpts

One-Time Password generator

otpts is a library to create one-time passwords (OTP). Currently, two algorithms are implemented: HOTP and TOPT.

HOTP stands for HMAC-Based One-Time Password Algorithm. It's defined in the [RFC 4226](https://tools.ietf.org/html/rfc4226).
TOTP stands for Time-Based One-Time Password Algorithm. It's defined in the [RFC 6238](https://tools.ietf.org/html/rfc6238).

OTP algorithms are mostly used for MFA (Multi-factor authentication) as codes sent to the user (SMS, mail, etc.), or generated through a custom application.
Although you can use HOTP and TOTP for both usage, HOTP is regularly use for sending codes and TOTP used for generation.

## HOTP

```ts
import { buildHotp } from 'otpts'

const hotp = buildHotp({ secret: 'someSecret' })

// This will generate a one-time password for a counter to 0
const otp = hotp.generate(0)

// This will compare (using crypto time safe equal) user input to a specific counter value
// you can think of it as a `hotp.generate(0) === userInput`, time-attack safe
hotp.verify(otp, 0)
```

Signature:
```ts
buildHotp({
  secret,
  digits
}: {
  // The secret in common
  secret: string
  // Digits to generate (6 by default)
  digits?: number,
  // HMAC algorithm ('sha1' by default)
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
}) => {
  // Generate the value for a given UNIX timestamp
  generate: (date?: number) => string,
  // Verify a user input for a given UNIX timestamp
  verify: (input: string, date?: number) => boolean
}
```

## TOTP

```ts
import { buildTotp } from 'otpts'

const totp = buildTotp({ secret: 'someSecret' })

// This will generate a one-time password for the first 30 seconds after the
// UNIX timestamp 0 (1970-01-01 - 00:00:00)
totp.generate(0)

// This will generate a one-time password for the current 30 seconds interval
totp.generate()

// It is equivalent to
totp.generate(Date.now() / 1000)

// This will generate a one-time password for a counter to 0
const otp = totp.generate()

// This will compare (using crypto time safe equal) user input to a specific counter value
// you can think of it as a `totp.generate() === userInput`, time-attack safe
totp.verify(otp) // true

setTimeout(() => totp.verify(otp), 30 * 1000) // false
```

Signature:
```ts
buildTotp({
  secret,
  interval,
  digits
}: {
  // The secret in common
  secret: string
  // Interval between each new code (30sec by default)
  interval?: number
  // Digits to generate (6 by default)
  digits?: number,
  // HMAC algorithm ('sha1' by default)
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
}) => {
  // Generate the value for a given index
  generate: (counter?: number) => string,
  // Verify a user input for a given index
  verify: (input: string, counter?: number) => boolean
}
```

## Utils

### `generateSecret`

This function will generate a random string using the `crypto` native module. This secret will be exchanged between the two sides so they can generate tokens in an offline way (you should do that in a secure way — HTTPS, etc.).

```ts
import { buildTotp, generateSecret } from 'otpts'

const secret = await generateSecret()

// send secret through QRCode
// save secret in database

const totp = buildTotp({ secret })
```
