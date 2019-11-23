export const truncate = (hash: Buffer) => {
  const offset = hash[19] & 0xf
  return (
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff)
  )
}
