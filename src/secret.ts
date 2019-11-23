import crypto from 'crypto'

export const generate = async (length: number = 16): Promise<string> =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(length, (err, buf) => {
      if (err) {
        return reject(err)
      }

      resolve(buf.toString('hex').slice(0, length))
    })
  )

export const areOtpEqual = (left: string, right: string) =>
  crypto.timingSafeEqual(
    Buffer.from(left, 'utf-8'),
    Buffer.from(right, 'utf-8')
  )
