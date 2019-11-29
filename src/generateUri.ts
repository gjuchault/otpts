import { URLSearchParams } from 'url'

export type GenerateHotpUriParameters = {
  type: 'hotp'
  secret: string
  label: string
  issuer?: string
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
  digits?: number
  initialCounter?: number
}

export type GenerateTotpUriParameters = {
  type: 'totp'
  secret: string
  label: string
  issuer?: string
  hmacAlgorithm?: 'sha1' | 'sha256' | 'sha512'
  digits?: number
  interval?: number
}

type GenerateUriParameters =
  | GenerateHotpUriParameters
  | GenerateTotpUriParameters

export const generateUri = (parameters: GenerateUriParameters) => {
  const uri = `otpauth://${parameters.type}/${parameters.label}`
  const params = new URLSearchParams()

  params.set('secret', parameters.secret)

  if (parameters.issuer) {
    params.set('issuer', parameters.issuer)
  }

  if (parameters.hmacAlgorithm) {
    params.set('algorithm', parameters.hmacAlgorithm)
  }

  if (parameters.digits) {
    params.set('digits', String(parameters.digits))
  }

  if (parameters.type === 'hotp') {
    if (parameters.initialCounter) {
      params.set('counter', String(parameters.initialCounter))
    }
  }

  if (parameters.type === 'totp') {
    if (parameters.interval) {
      params.set('period', String(parameters.interval))
    }
  }

  return `${uri}?${params.toString()}`
}
