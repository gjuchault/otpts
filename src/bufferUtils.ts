export const textToBuffer = (input: string) => {
  return Buffer.alloc(20, input, 'utf-8')
}

export const numberToBuffer = (input: number) => {
  const buffer = Buffer.alloc(8)

  buffer.writeIntBE(input, 0, 8)

  return buffer
}
