import "../src";
import * as L from "../src";
test("type map Test", () =>
{
    //Pick<T, Exclude<keyof T, keyof U>> & Pick<U, Extract<keyof T, keyof U>>;
    interface AA { a: number; b: number; c: number;[Symbol.iterator](): IterableIterator<number>; }
    interface BB { a: string; b: string; }
    type CC = L.Alter<AA, BB>;
    let a: AA = L.Any;
    let b: BB = L.Any;
    let c: CC = L.Any;

    interface T { a: number;[Symbol.iterator](): IterableIterator<number>; }
    type NoA = Omit<T, 'a'>;
    let na: NoA = {};

    const lta = L.asLiterals(['a', 1, 'c', Symbol.iterator]);
    type lt = typeof lta;
    type X = L.MapLiteralArray<typeof lta, string>;
});
