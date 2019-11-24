import test from 'ava'
import { generateSecret, areOtpEqual } from '../src'

test('generateSecret()', async t => {
  t.is((await generateSecret()).length, 32)
  t.is((await generateSecret(8)).length, 8)
})

test('areOtpEqual()', t => {
  t.is(areOtpEqual('foo', 'foo'), true)
  t.is(areOtpEqual('foo', 'bar'), false)
})
