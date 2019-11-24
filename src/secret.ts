import crypto from 'crypto'
import { bufferToBase32 } from './base32'

export const generate = async (length: number = 32): Promise<string> =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(length, (err, buf) => {
      // istanbul ignore if
      if (err) {
        return reject(err)
      }

      resolve(bufferToBase32(buf).slice(0, length))
    })
  )

export const areOtpEqual = (left: string, right: string) =>
  crypto.timingSafeEqual(
    Buffer.from(left, 'utf-8'),
    Buffer.from(right, 'utf-8')
  )
