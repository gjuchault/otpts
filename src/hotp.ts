import crypto from 'crypto'

import { numberToBuffer, base32Encode } from './bufferUtils'
import { truncate } from './truncate'
import { generateUri, GenerateHotpUriParameters } from './generateUri'
import {
  validateSecret,
  validateDigits,
  validateCounter,
  validateHmacAlgorithm
} from './validate'
import { areOtpEqual } from './secret'

type BuildHotpParameters = {
  secret: Buffer
  digits?: number
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
}

export const buildHotp = ({
  secret,
  digits = 6,
  hmacAlgorithm = 'sha1'
}: BuildHotpParameters) => {
  validateSecret(secret)
  validateDigits(digits)
  validateHmacAlgorithm(hmacAlgorithm)

  const generate = (counter: number = 0) => {
    validateCounter(counter)

    const counterBuffer = numberToBuffer(counter)

    const hash = crypto
      .createHmac(hmacAlgorithm, secret)
      .update(counterBuffer)
      .digest()

    const truncated = truncate(hash)

    const hotp = truncated % Math.pow(10, digits)

    return String(hotp).padStart(digits, '0')
  }

  const verify = (input: string, counter: number = 0) =>
    areOtpEqual(generate(counter), input)

  const uri = ({
    label,
    issuer
  }: Pick<GenerateHotpUriParameters, 'label' | 'issuer'>) =>
    generateUri({
      type: 'hotp',
      secret: base32Encode(secret),
      label,
      issuer,
      hmacAlgorithm,
      digits,
      initialCounter: 0
    })

  return {
    generate,
    verify,
    uri
  }
}
