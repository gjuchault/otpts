import { buildHotp } from './hotp'
import {
  validateSecret,
  validateInterval,
  validateDigits,
  validateTime,
  validateHmacAlgorithm
} from './validate'
import { areOtpEqual } from './secret'

export interface BuiltTotpParameters {
  secret: string
  interval?: number
  digits?: number
  hmacAlgorithm?: string
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

  return {
    generate,
    verify
  }
}
