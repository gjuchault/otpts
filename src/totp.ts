import { buildHotp } from './hotp'
import {
  validateSecret,
  validateInterval,
  validateDigits,
  validateTime
} from './validate'

export interface BuiltTotpParameters {
  secret: string
  interval?: number
  digits?: number
}

export const buildTotp = ({
  secret,
  interval = 30,
  digits = 6
}: BuiltTotpParameters) => {
  validateSecret(secret)
  validateInterval(interval)
  validateDigits(digits)

  const hotp = buildHotp({
    secret,
    digits
  })

  return (time: number = Date.now() / 1000) => {
    validateTime(time)

    const counter = Math.floor(time / interval)

    return hotp(counter)
  }
}
