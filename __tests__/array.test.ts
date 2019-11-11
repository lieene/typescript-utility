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
