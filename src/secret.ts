import crypto from 'crypto'
import { base32Encode } from './bufferUtils'

export const generate = async (length: number = 20): Promise<string> =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(length, (err, buf) => {
      // istanbul ignore if
      if (err) {
        return reject(err)
      }

      resolve(base32Encode(buf.slice(0, length)).toString())
    })
  )

export const areOtpEqual = (left: string, right: string) =>
  crypto.timingSafeEqual(
    Buffer.from(left, 'utf-8'),
    Buffer.from(right, 'utf-8')
  )
