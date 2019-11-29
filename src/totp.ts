import { buildHotp } from './hotp'
import { generateUri, GenerateTotpUriParameters } from './generateUri'
import {
  validateSecret,
  validateInterval,
  validateDigits,
  validateTime,
  validateHmacAlgorithm
} from './validate'
import { areOtpEqual } from './secret'
import { base32Encode } from './bufferUtils'

export interface BuiltTotpParameters {
  secret: Buffer
  interval?: number
  digits?: number
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
}

export const buildTotp = ({
  secret,
  interval = 30,
  digits = 6,
  hmacAlgorithm = 'sha1'
}: BuiltTotpParameters) => {
  validateSecret(secret)
  validateInterval(interval)
  validateDigits(digits)
  validateHmacAlgorithm(hmacAlgorithm)

  const hotp = buildHotp({
    secret,
    digits,
    hmacAlgorithm
  })

  const generate = (time: number = Date.now() / 1000) => {
    validateTime(time)

    const counter = Math.floor(time / interval)

    return hotp.generate(counter)
  }

  const verify = (input: string, time: number = Date.now() / 1000) =>
    areOtpEqual(generate(time), input)

  const uri = ({
    label,
    issuer
  }: Pick<GenerateTotpUriParameters, 'label' | 'issuer'>) =>
    generateUri({
      type: 'totp',
      secret: base32Encode(secret),
      label,
      issuer,
      hmacAlgorithm,
      digits,
      interval
    })

  return {
    generate,
    verify,
    uri
  }
}
