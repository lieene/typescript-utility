import "../src";
import * as L from "../src";

test("Array ext Test", () =>
{
    const array: Array<number> = [];
    expect(array.first).toBeUndefined();
    expect(array.last).toBeUndefined();
    expect(array.peek).toBeUndefined();
    expect(array.enQueue(1, 2, 3, 10, 15, 30)).toBe(6);
    expect(array.binarySearch(4)).toBe(~3);
    expect(array.binarySearch(3)).toBe(2);
    expect(array.binarySearch(0)).toBe(~0);
    expect(array.binarySearch(31)).toBe(~6);
    expect(array.first).toBe(1);
    expect(array.last).toBe(30);
    expect(array.peek).toBe(30);
    expect(array.deQueue()).toBe(30);
    expect(array.peek).toBe(15);
    expect(array.shiftMany(3)).toEqual<Array<number>>([1, 2, 3]);
    expect(array).toEqual<Array<number>>([10, 15]);
});


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

test("assign test", () =>
{
    let r = L.StartLen(0, 10);
    let x: L.Range = L.Any;
    L.assign(x, r);
    console.log(x.length);

    class AA
    {
        get nn(): number { return 1; }
        ss: string = "some";
    }
    class CC extends AA
    {
        xx: number = 1;
    }
    let cc = new CC();
    let pp = L.GetProperties(cc);
    console.log(pp.join("\r\n"));
    let ng = CC.prototype.nn;
    // interface BB
    // {
    //     readonly nn: number;
    //     ss: string;
    // }
    // let b: BB = L.Any;
    // b.ss = "BB";
    // Object.defineProperty(b, "nn", Object.getOwnPropertyDescriptor(AA.prototype, 'nn')!);
    // let c = Object.getOwnPropertyDescriptors(b);
    // for (const key in c)
    // {
    //     console.log(key);
    //     console.log(c[key]);
    // }

    // let a = new AA();
    // let d = Object.getOwnPropertyDescriptors(a);
    // for (const key in d)
    // {
    //     console.log(key);
    //     console.log(d[key]);
    // }
});
