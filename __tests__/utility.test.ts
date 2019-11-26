import "../src";
import * as L from "../src";

test("Array ext Test", () =>
{
    const array: Array<number> = [];
    expect(array.first).toBeUndefined();
    expect(array.last).toBeUndefined();
    expect(array.peek).toBeUndefined();
    expect(array.enQueue(1, 2, 3, 10, 15)).toBe(5);
    expect(array.pushOrdered(30, (a, b) => a - b)).toBe(5);
    expect(array).toEqual<Array<number>>([1, 2, 3, 10, 15, 30]);
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

    expect(L.FillNumber([], 3, 1)).toEqual<Array<number>>([1, 2, 3]);
    expect(L.FillNumber([], -3, 1, 0.5)).toEqual<Array<number>>([1, 0.5, 0]);
    expect(L.FillNumber([], 3, 1, -0.5)).toEqual<Array<number>>([1, 0.5, 0]);
    expect(L.FillNumber([], -2.3, 1, -0.5)).toEqual<Array<number>>([1, 1.5]);

});

test("Range test", () =>
{
    let r00 = new L.Range(0, 1);
    let r24 = new L.Range(2, 3);
    let r22 = new L.Range([2, 3]);
    let r23 = new L.Range([2, 4]);
    let a3 = new L.Range(3, 0);
    let r33 = new L.Range(3, 1);
    let r34 = new L.Range(3, 2);
    let a4 = new L.Range(4, 0);
    let r44 = new L.Range(4, 1);
    let r47 = new L.Range(4, 4);
    let r55 = new L.Range(5, 1);
    let r57 = new L.Range(5, 3);
    let r59 = new L.Range(5, 5);
    let r67 = new L.Range(6, 2);
    let r89 = new L.Range(8, 2);
    expect(r24.start).toBe(2);
    expect(r24.end).toBe(5);
    expect(r24.length).toBe(3);
    expect(r22.start).toBe(2);
    expect(r22.end).toBe(3);
    expect(r22.length).toBe(1);
    expect(r24.Compare(r22)).toBe(L.Range.Relation.Contains);
    expect(r22.Compare(r24)).toBe(L.Range.Relation.ContainedBy);
    expect(a3.Compare(4)).toBe(L.Range.Relation.Before);
    expect(a3.Compare(3)).toBe(L.Range.Relation.RightBefore);
    expect(a3.Compare(2)).toBe(L.Range.Relation.RightAfter);
    expect(a3.Compare(1)).toBe(L.Range.Relation.After);

    expect(r33.Compare(5)).toBe(L.Range.Relation.Before);
    expect(r33.Compare(4)).toBe(L.Range.Relation.RightBefore);
    expect(r33.Compare(3)).toBe(L.Range.Relation.Equals);
    expect(r33.Compare(2)).toBe(L.Range.Relation.RightAfter);
    expect(r33.Compare(1)).toBe(L.Range.Relation.After);

    expect(r34.Compare(6)).toBe(L.Range.Relation.Before);
    expect(r34.Compare(5)).toBe(L.Range.Relation.RightBefore);
    expect(r34.Compare(4)).toBe(L.Range.Relation.Contains);
    expect(r34.Compare(3)).toBe(L.Range.Relation.Contains);
    expect(r34.Compare(2)).toBe(L.Range.Relation.RightAfter);
    expect(r34.Compare(1)).toBe(L.Range.Relation.After);

    expect(r34.Compare(r00)).toBe(L.Range.Relation.After);
    expect(r34.Compare(r22)).toBe(L.Range.Relation.RightAfter);
    expect(r22.Compare(r34)).toBe(L.Range.Relation.RightBefore);
    expect(r47.Compare(r33)).toBe(L.Range.Relation.RightAfter);
    expect(r33.Compare(r47)).toBe(L.Range.Relation.RightBefore);
    expect(r34.Compare(r23)).toBe(L.Range.Relation.OverlapEndOf);
    expect(r23.Compare(r34)).toBe(L.Range.Relation.OverlapFrontOf);
    expect(r34.Compare(r33)).toBe(L.Range.Relation.Contains);
    expect(r34.Compare(r34)).toBe(L.Range.Relation.Equals);
    expect(r33.Compare(r33)).toBe(L.Range.Relation.Equals);
    expect(a3.Compare(a3)).toBe(L.Range.Relation.Equals);
    expect(r33.Compare(r34)).toBe(L.Range.Relation.ContainedBy);
    expect(r34.Compare(r57)).toBe(L.Range.Relation.RightBefore);
    expect(r34.Compare(r67)).toBe(L.Range.Relation.Before);

    expect(L.Range.IsRange(r24)).toBe(true);
    expect(L.Range.IsRange(1)).toBe(false);
    expect(L.Range.IsRange({ start: 2, len: 3, end: 5 })).toBe(false);

    expect(r47.intersection(r57)).toEqual(r57);
    expect(r47.intersection(r59)).toEqual(r57);
    expect(r23.intersection(r59, "relation")).toBe(L.Range.Relation.Before);
    expect(r59.intersection(r23, "relation")).toBe(L.Range.Relation.After);
    expect(r23.intersection(r47)).toEqual(a4);
    expect(r33.intersection(r57)).toEqual(a4);
    expect(r33.intersection(r00)).toEqual(a3);


    expect(a3.union(a4)).toEqual(r33);
    expect(a3.union(a4, "relation")).toBe(L.Range.Relation.Before);
    expect(r34.union(r47, "fill")).toEqual(new L.Range([3, 8]));
    expect(r34.union(r47)).toEqual(new L.Range([3, 8]));

    expect(a3.diffFrom(a4)).toEqual(a3);
    expect(r34.diffFrom(r47)).toEqual(r33);
    expect(r47.diffFrom(r57)).toEqual(r44);
    expect(r59.diffFrom(r67)).toEqual([r55, r89]);

    expect(a3.startAnchor).toBe(a3);
    expect(a3.endAnchor).toBe(a3);
    expect(r33.startAnchor).toEqual(a3);
    expect(r33.endAnchor).toEqual(a4);
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
    let r = new L.Range(0, 10);
    let x: L.Range = L.Any;
    L.assign(x, r);
    console.log(x.length);
    const aa: symbol = Symbol("AA");
    class AA
    {
        get [aa](): number { return 10; }
        get nn(): number { return 1; }
        ss: string = "some";
        ff(): number { return 9; }
    }
    class CC extends AA
    {
        xx: number = 1;
        ff(): number { return 99; }
    }
    let cc = new CC();
    let pp = L.GetHirachyProperties(cc);
    let oo = {};
    L.assign(oo, cc);
    console.log(oo);
    L.assign(oo, { ff: ((): string => "ss") }, L.AssignFilter.alter);
    console.log((oo as any).ff());
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