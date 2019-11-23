export const textToBuffer = (input: string) => {
  return Buffer.alloc(20, input, 'utf-8')
}

export const numberToBuffer = (input: number) => {
  const buffer = Buffer.alloc(8)

  for (let i = buffer.length - 1; i >= 0; i -= 1) {
    buffer[i] = input & 0xff
    input >>= 8
  }

  return buffer
}
