const CROCKFORD = '0123456789abcdefghjkmnpqrtuvwxyz'

// https://github.com/LinusU/base32-encode
export const bufferToBase32 = (buffer: Buffer) => {
  var view = new Uint8Array(buffer)
  var length = buffer.byteLength
  var bits = 0
  var value = 0
  var output = ''

  for (var i = 0; i < length; i++) {
    value = (value << 8) | view[i]
    bits += 8

    while (bits >= 5) {
      output += CROCKFORD[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += CROCKFORD[(value << (5 - bits)) & 31]
  }

  return output
}
