import test from 'ava'
import { generate, areOtpEqual } from '../src/secret'

test('generate()', async t => {
  // buffer to base32 = 8/5 ratio
  t.is((await generate()).length, 32)
  t.is((await generate(8)).length, 13)
})

test('areOtpEqual()', t => {
  t.is(areOtpEqual('foo', 'foo'), true)
  t.is(areOtpEqual('foo', 'bar'), false)
})
