import crypto from 'crypto'

import { numberToBuffer, textToBuffer } from './bufferUtils'
import { truncate } from './truncate'
import {
  validateSecret,
  validateDigits,
  validateCounter,
  validateHmacAlgorithm
} from './validate'
import { areOtpEqual } from './secret'

type BuildHotpParameters = {
  secret: string
  digits?: number
  hmacAlgorithm?: string
}

export const buildHotp = ({
  secret,
  digits = 6,
  hmacAlgorithm = 'sha1'
}: BuildHotpParameters) => {
  validateSecret(secret)
  validateDigits(digits)
  validateHmacAlgorithm(hmacAlgorithm)

  const secretBuffer = textToBuffer(secret)

  const generate = (counter: number = 0) => {
    validateCounter(counter)

    const counterBuffer = numberToBuffer(counter)

    const hash = crypto
      .createHmac(hmacAlgorithm, secretBuffer)
      .update(counterBuffer)
      .digest()

    const truncated = truncate(hash)

    const hotp = truncated % Math.pow(10, digits)

    return String(hotp).padStart(digits, '0')
  }

  const verify = (input: string, counter: number = 0) =>
    areOtpEqual(generate(counter), input)

  return {
    generate,
    verify
  }
}
