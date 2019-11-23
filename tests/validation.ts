import test from 'ava'
import * as validate from '../src/validate'

test('validateSecret()', t => {
  const validateSecret = validate.validateSecret as any

  t.notThrows(() => validateSecret('hello'))
  t.throws(() => validateSecret(1))
  t.throws(() => validateSecret(''))
})

test('validateDigits()', t => {
  const validateDigits = validate.validateDigits as any

  t.notThrows(() => validateDigits(10))
  t.throws(() => validateDigits('foo'))
  t.throws(() => validateDigits(Number.POSITIVE_INFINITY))
  t.throws(() => validateDigits(-1))
})

test('validateCounter()', t => {
  const validateCounter = validate.validateCounter as any

  t.notThrows(() => validateCounter(10))
  t.throws(() => validateCounter('foo'))
  t.throws(() => validateCounter(Number.POSITIVE_INFINITY))
  t.throws(() => validateCounter(-1))
})

test('validateInterval()', t => {
  const validateInterval = validate.validateInterval as any

  t.notThrows(() => validateInterval(10))
  t.throws(() => validateInterval('foo'))
  t.throws(() => validateInterval(Number.POSITIVE_INFINITY))
  t.throws(() => validateInterval(-1))
})

test('validateTime()', t => {
  const validateTime = validate.validateTime as any

  t.notThrows(() => validateTime(10))
  t.throws(() => validateTime('foo'))
  t.throws(() => validateTime(-1))
})

test('validateHmacAlgorithm()', t => {
  const validateHmacAlgorithm = validate.validateHmacAlgorithm as any

  t.notThrows(() => validateHmacAlgorithm('sha1'))
  t.throws(() => validateHmacAlgorithm('foo'))
})
