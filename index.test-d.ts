import {
  Append,
  Concat,
  Drop,
  Equal,
  Flat,
  HasTail,
  Head,
  Join,
  Last,
  Length,
  Prepend,
  Replace,
  Reverse,
  Split,
  Tail,
  check,
} from './index';
import { assertType, describe, it } from 'vitest';

const Pass = 1;
const Fail = 0;

const wrappedAssertType = <A, B>(param: Parameters<typeof check<A, B>>[0]) =>
  assertType<typeof param>;

describe(`Common Util Test`, () => {
  it(`Equal`, () => {
    wrappedAssertType<Equal<1, 1>, 1>(Pass);
    wrappedAssertType<Equal<1, 2>, 0>(Pass);
  });
});

describe(`Array Util Test`, () => {
  it(`Head`, () => {
    wrappedAssertType<Head<[2, 3, 4]>, 1>(Fail);
    wrappedAssertType<Head<[2, 3, 4]>, 2>(Pass);
    wrappedAssertType<Head<[]>, undefined>(Pass);
  });
  it(`Length`, () => {
    wrappedAssertType<Length<[1, 2, 3]>, 3>(Pass);
    wrappedAssertType<Length<'123'>, 3>(Pass);
  });
  it(`HasTail`, () => {
    wrappedAssertType<HasTail<[1, 2, 3]>, true>(Pass);
    wrappedAssertType<HasTail<[]>, false>(Pass);
  });
  it(`Drop`, () => {
    wrappedAssertType<Drop<1, [1, 2, 3]>, [2, 3]>(Pass);
    wrappedAssertType<Drop<1, [1]>, []>(Pass);
    wrappedAssertType<Drop<1, []>, []>(Pass);
  });
  it(`Tail`, () => {
    wrappedAssertType<Tail<[1, 2, 3]>, [2, 3]>(Pass);
    wrappedAssertType<Tail<[1]>, []>(Pass);
    wrappedAssertType<Tail<[]>, []>(Pass);
  });
  it(`Last`, () => {
    wrappedAssertType<Last<[1, 2, 3]>, 3>(Pass);
    wrappedAssertType<Last<[1]>, 1>(Pass);
    wrappedAssertType<Last<[]>, undefined>(Pass);
  });
  it(`Reverse`, () => {
    wrappedAssertType<Reverse<[1, 2, 3, 4, 5, 6]>, [6, 5, 4, 3, 2, 1]>(Pass);
  });
  it(`Concat`, () => {
    wrappedAssertType<Concat<[1, 2, 3], [4, 5, 6]>, [1, 2, 3, 4, 5, 6]>(Pass);
  });
  it(`Append`, () => {
    wrappedAssertType<Append<[1, 2, 3], 4>, [1, 2, 3, 4]>(Pass);
  });
});

describe(`[String]`, () => {
  it(`Join`, () => {
    wrappedAssertType<Join<[1, 2, 3, 4, 5], ','>, '1,2,3,4,5'>(Pass);
    wrappedAssertType<Join<[1], ','>, '1'>(Pass);
    wrappedAssertType<Join<[], ','>, ''>(Pass);
  });
  it(`Replace`, () => {
    wrappedAssertType<Replace<'abcdefg', 'c', 'z'>, 'abzdefg'>(Pass);
  });
  it(`Split`, () => {
    wrappedAssertType<Split<'ab,cde,fg', ','>, ['ab', 'cde', 'fg']>(Pass);
  });
  it(`Flat`, () => {
    wrappedAssertType<Flat<[1, 2, 3, [4]], 1>, 1 | 2 | 3 | 4>(Pass);
    wrappedAssertType<Flat<[1, 2, 3, [[4]]], 1>, 1 | 2 | 3 | [4]>(Pass);
    wrappedAssertType<Flat<[1, 2, 3, [[4]]], 2>, 1 | 2 | 3 | 4>(Pass);
    wrappedAssertType<Flat<[1, 2, [3, [4]]], 1>, 1 | 2 | 3 | [4]>(Pass);
    wrappedAssertType<Flat<[1, 2, [3, [4]]], 2>, 1 | 2 | 3 | 4>(Pass);
  });
});
