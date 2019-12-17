import parseCurrency from './parseCurrency';

test('keep anything less than 1000 the same', () => {
  expect(parseCurrency(0)).toEqual('0');
  expect(parseCurrency(1)).toEqual('1');
  expect(parseCurrency(10)).toEqual('10');
  expect(parseCurrency(100)).toEqual('100');
  expect(parseCurrency(999)).toEqual('999');
});

test('add appropriate spaces to anything >= 1000', () => {
  expect(parseCurrency(1000)).toEqual('1 000');
  expect(parseCurrency(10000)).toEqual('10 000');
  expect(parseCurrency(100000)).toEqual('100 000');
  expect(parseCurrency(1000000)).toEqual('1 000 000');
});

test('should work with strings as input', () => {
  expect(parseCurrency('100')).toEqual('100');
  expect(parseCurrency('999')).toEqual('999');
  expect(parseCurrency('1000')).toEqual('1 000');
  expect(parseCurrency('10000')).toEqual('10 000');
});