export const validateSecret = (secret: Buffer) => {
  if (!Buffer.isBuffer(secret)) {
    throw new Error('Expected `secret` to be of type `Buffer`')
  }

  if (!secret.length) {
    throw new Error('Expected `secret` to have a minimum length of 1')
  }
}

export const validateDigits = (digits: number) => {
  if (typeof digits !== 'number') {
    throw new Error('Expected `digits` to be of type `number`')
  }

  if (digits < 0 || !Number.isSafeInteger(digits)) {
    throw new Error('Expected `digits` to be a valid integer')
  }
}

export const validateCounter = (counter: number) => {
  if (typeof counter !== 'number') {
    throw new Error('Expected `counter` to be of type `number`')
  }

  if (counter < 0 || !Number.isSafeInteger(counter)) {
    throw new Error('Expected `counter` to be a valid integer')
  }
}

export const validateInterval = (interval: number) => {
  if (typeof interval !== 'number') {
    throw new Error('Expected `interval` to be of type `number`')
  }

  if (interval < 0 || !Number.isSafeInteger(interval)) {
    throw new Error('Expected `interval` to be a valid integer')
  }
}

export const validateTime = (time: number) => {
  if (typeof time !== 'number') {
    throw new Error('Expected `time` to be of type `number`')
  }

  if (time < 0) {
    throw new Error('Expected `time` to be a valid integer')
  }
}

export const validateHmacAlgorithm = (hmacAlgorithm: string) => {
  if (!['sha1', 'sha256', 'sha512'].includes(hmacAlgorithm)) {
    throw new Error(
      'Expected `hmacAlgorithm` to be either `sha1`, `sha256` or `sha512`'
    )
  }
}
