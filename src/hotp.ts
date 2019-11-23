import crypto from 'crypto'

import { numberToBuffer, textToBuffer } from './bufferUtils'
import { truncate } from './truncate'
import { validateSecret, validateDigits, validateCounter } from './validate'

type BuildHotpParameters = {
  secret: string
  digits?: number
}

export const buildHotp = ({ secret, digits = 6 }: BuildHotpParameters) => {
  validateSecret(secret)
  validateDigits(digits)

  const secretBuffer = textToBuffer(secret)

  return (counter: number = 0) => {
    validateCounter(counter)

    const counterBuffer = numberToBuffer(counter)

    const hash = crypto
      .createHmac('sha1', secretBuffer)
      .update(counterBuffer)
      .digest()

    const truncated = truncate(hash)

    const hotp = truncated % Math.pow(10, digits)

    return String(hotp).padStart(digits, '0')
  }
}
