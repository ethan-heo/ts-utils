/**
 * @description 배열의 첫번째 인자를 가져온다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 1/5
 *
 */
export type Head<T extends any[]> = T extends [infer A, ...any[]] ? A : undefined;

/**
 * @description A, B가 같은지 확인한다. 같으면 1을 반환 다르면 0을 반환한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 2/5
 */
export type Equal<A, B> = A extends B ? (B extends A ? 1 : 0) : 0;

/**
 * @description 타입 유틸리티의 결과를 확인하기 위한 함수. Equal<A, B>의 결과가 1과 같다는 결과와 입력값의 타입이 동일하면 에러가 발생하지 않고 동일하지 않다면 에러가 발생한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 2/5
 * @param params
 */
export declare function check<A, B>(params: Equal<Equal<A, B>, 1>): void;

/**
 * @description 배열의 길이를 반환한다. 문자열은 빈문자열이면 P의 length를 반환하도록 만들고 그렇지 않으면 P에 아이템을 추가하고 첫번째(F), 나머지 문자열(L)로 나눈다음 L을 Length 함수로 재귀시켜 P의 값에 아이템을 계속 추가하게 만든다. 그리고 L이 빈문자가 되면 P의 개수를 반환하도록 한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Length<T extends any[] | string, P extends any[] = []> = T extends string
  ? T extends `${T[0]}${infer L}`
    ? Length<L, Append<P, any>>
    : P['length']
  : T['length'];

/**
 * @description 배열의 아이템 유무를 확인한다
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type HasTail<T extends any[]> = Length<T> extends 0 ? false : true;

/**
 * @description 배열의 첫번째 인자를 제외한 나머지 인자를 반환한다
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Tail<T extends any[]> = T extends [any, ...infer A] ? A : [];

/**
 * @description 배열의 마지막 인자를 반환한다
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Last<T extends any[]> = T extends [...any[], infer A] ? A : undefined;

/**
 * @description 배열의 첫번쨰 인자에 값을 추가한다
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Prepend<T extends any[], E> = [E, ...T];

/**
 * @description 배열의 앞 순서부터 주어진 개수만큼 요소를 제거한다. 재귀를 사용하여 T 인자에는 앞 순서부터 하나씩 빼고 P 인자에는 앞 순서에 하나씩 추가하여 N과 P의 길이가 동일할 때 T를 반환한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Drop<N extends number, T extends any[], P extends any[] = []> = {
  0: T;
  1: Drop<N, Tail<T>, Prepend<P, any>>;
}[Length<P> extends N ? 0 : 1];

/**
 * @description 배열 요소의 순서를 반대로 변경한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Reverse<T extends any[], P extends any[] = []> = {
  0: P;
  1: Reverse<Tail<T>, Prepend<P, Head<T>>>;
}[Length<T> extends 0 ? 0 : 1];

/**
 * @description A, B 배열을 입력된 순서대로 머지한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Concat<A extends any[], B extends any[]> = [...A, ...B];

/**
 * @description A 배열에 B를 맨 뒤에 추가한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 3/5
 */
export type Append<A extends any[], B extends any> = Concat<A, [B]>;

/**
 * @description T배열의 요소 사이에 S 문자열을 추가한 문자열을 반환한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 4/5
 */
export type Join<T extends any[], S extends string> = Length<T> extends 0
  ? ''
  : Length<T> extends 1
  ? `${T[0]}`
  : `${T[0]}${S}${Join<Tail<T>, S>}`;

/**
 * @description T 문자열에서 A가 포함된 문자열이 있으면 B로 교체한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 4/5
 */
export type Replace<
  T extends string,
  A extends string,
  B extends string
> = T extends `${infer P1}${A}${infer P2}` ? Replace<`${P1}${B}${P2}`, A, B> : T;

/**
 * @description T 문자열에서 S 문자열 기준으로 요소를 나눈 배열을 반환한다.
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 4/5
 */
export type Split<
  T extends string,
  S extends string,
  E extends any[] = []
> = T extends `${infer A}${S}${infer B}` ? Split<B, S, Append<E, A>> : Append<E, T>;

/**
 * @description T 배열의 인자를 P의 숫자만큼 Flat한 배열로 변환하여 반환한다. *배열 요소에 다른 형식의 값을 넣었을 때 확인이 안됨.*
 * @see https://www.youtube.com/@mduniv 마플개발대학 타입 잘 다루기 4/5
 */
export type Flat<T, P extends number = 1> = {
  0: T;
  1: T extends Array<infer A> ? Flat<A, [-1, 0, 1, 2, 3, 4, 5, 6, 7][P]> : T;
}[P extends -1 ? 0 : 1];
