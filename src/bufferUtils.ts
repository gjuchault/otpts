export const numberToBuffer = (input: number) => {
  const buffer = Buffer.alloc(8)

  for (let i = buffer.length - 1; i >= 0; i -= 1) {
    buffer[i] = input & 0xff
    input >>= 8
  }

  return buffer
}

const base32CharacterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

export const base32Decode = (rawInput: string): Buffer => {
  const input = rawInput.toUpperCase().replace(/=+$/, '')

  const output = Buffer.alloc(((input.length * 5) / 8) | 0)

  let bits = 0
  let value = 0
  let index = 0

  for (let i = 0; i < input.length; i++) {
    const characterCode = base32CharacterSet.indexOf(input[i])
    if (characterCode === -1)
      throw new TypeError(
        `Character is not part of base 32 charset: ${input[i]}`
      )

    value = (value << 5) | characterCode
    bits += 5

    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255
      bits -= 8
    }
  }

  return output
}

export const base32Encode = (input: Buffer): string => {
  const view = new Uint8Array(input)

  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < view.length; i++) {
    value = (value << 8) | view[i]
    bits += 8

    while (bits >= 5) {
      output += base32CharacterSet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += base32CharacterSet[(value << (5 - bits)) & 31]
  }

  return output
}
