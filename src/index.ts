//-----------------------------------------------------------------------------------
// File: index.ts                                                                  //
// Project: lieene.@lieene/ts-utility                                              //
// Created Date: Mon Nov 11 2019                                                   //
// Author: Lieene Guo                                                              //
// -----                                                                           //
// Last Modified: Mon Nov 11 2019                                                  //
// Modified By: Lieene Guo                                                         //
// -----                                                                           //
// MIT License                                                                     //
//                                                                                 //
// Copyright (c) 2019 Lieene@ShadeRealm                                            //
//                                                                                 //
// Permission is hereby granted, free of charge, to any person obtaining a copy of //
// this software and associated documentation files (the "Software"), to deal in   //
// the Software without restriction, including without limitation the rights to    //
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies   //
// of the Software, and to permit persons to whom the Software is furnished to do  //
// so, subject to the following conditions:                                        //
//                                                                                 //
// The above copyright notice and this permission notice shall be included in all  //
// copies or substantial portions of the Software.                                 //
//                                                                                 //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR      //
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,        //
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE     //
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER          //
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,   //
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE   //
// SOFTWARE.                                                                       //
//                                                                                 //
// -----                                                                           //
// HISTORY:                                                                        //
// Date      	By	Comments                                                       //
// ----------	---	----------------------------------------------------------     //
//-----------------------------------------------------------------------------------

import { types as T } from 'util';
import { strictEqual, notStrictEqual, deepStrictEqual, notDeepStrictEqual } from 'assert';

export const Uny: any = undefined as any;
export const Any: any = {} as any;

export function Defined<T>(obj: T | undefined): obj is T {
  return obj !== undefined;
}
export function NotDefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function Null<T>(obj: T | null): obj is T {
  return obj !== null;
}
export function NotNull(obj: any): obj is null {
  return obj === null;
}

export function Valiad<T>(obj: T | undefined | null): obj is T {
  return obj !== null && obj !== undefined;
}
export function Invaliad(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function ValiadOrDefault<T>(obj: T | undefined | null, defaultValue: T): T {
  return obj === null || obj === undefined ? defaultValue : obj;
}

export function IsRegExp(obj: any): obj is RegExp {
  return T.isRegExp(obj);
}
export function NotRegX<T>(obj: RegExp | T): obj is T {
  return !T.isRegExp(obj);
}

export function IsNumber(obj: any): obj is number {
  return typeof obj === 'number';
}
export function NotNumber<T>(obj: number | T): obj is T {
  return typeof obj !== 'number';
}

export function IsString(obj: any): obj is string {
  return typeof obj === 'string';
}
export function NotString<T>(obj: string | T): obj is T {
  return typeof obj !== 'string';
}

export function IsBoolean(obj: any): obj is boolean {
  return typeof obj === 'boolean';
}
export function NotBoolean<T>(obj: boolean | T): obj is T {
  return typeof obj !== 'boolean';
}

export function IsBigint(obj: any): obj is bigint {
  return typeof obj === 'bigint';
}
export function NotBigint<T>(obj: bigint | T): obj is T {
  return typeof obj !== 'bigint';
}

export function IsObject(obj: any): obj is object {
  return typeof obj === 'object';
}
export function NotObject<T>(obj: object | T): obj is T {
  return typeof obj !== 'object';
}

export function IsSymbol(obj: any): obj is symbol {
  return typeof obj === 'symbol';
}
export function NotSymbol<T>(obj: symbol | T): obj is T {
  return typeof obj !== 'symbol';
}

export function IsFunction(obj: any): obj is (...args: any) => any {
  return typeof obj === 'function';
}
export function NotFunction<T>(obj: any): obj is T {
  return typeof obj !== 'function';
}

export function IsArray(obj: any): obj is Array<any> {
  return Array.isArray(obj);
}
export function NotArray<T>(obj: Array<any> | T): obj is T {
  return !Array.isArray(obj);
}

export function IsArrayOf<T>(array: any, isT: (obj: any) => obj is T): array is Array<T> {
  if (Array.isArray(array)) {
    if (array.length === 0) {
      return false;
    } else {
      return isT(array[0]);
    }
  } else {
    return false;
  }
}

// export function Swap(pair: [any, any]) { return [pair[]] }
// export function SwapElem(container: Array<any>, a: number, b: number)
// { let temp = container[a]; container[a] = container[b]; container[b] = temp; }

export function DefAccessor(o: any, p: PropertyKey, get?: () => any, set?: (v: any) => void) {
  Object.defineProperty(o, p, { get, set });
}

export interface Range {
  start: number;
  length: number;
  end: number;
  contains(index: number): boolean;
}
interface InternalRange extends Range {
  _len: number;
}
function contains(this: Range, index: number): boolean {
  return index >= this.start && index < this.end;
}
function getLen(this: InternalRange): number {
  return this._len;
}
function setLen(this: InternalRange, len: number): void {
  this._len = Math.max(len, 0);
}
function getEnd(this: InternalRange): number {
  return this.start + this.length;
}
function setEnd(this: InternalRange, end: number): void {
  end = end >>> 0;
  if (end < this.start) {
    throw new Error('index out off range');
  }
  this.length = end - this.start;
}

export function StartLen(start: number, length: number): Range {
  start = start >>> 0;
  length = length >>> 0;
  if (start < 0 || length < 0) {
    throw new Error('index out off range');
  }
  let rg: InternalRange = { contains, start, _len: length } as any;
  DefAccessor(rg, 'end', getEnd, setEnd);
  DefAccessor(rg, 'length', getLen, setLen);
  return rg;
}

export function StartEnd(start: number, end: number): Range {
  start = start >>> 0;
  end = end >>> 0;
  if (start < 0 || end < start) {
    throw new Error('index out off range');
  }
  let rg: Range = { contains, start, _len: end - start } as any;
  DefAccessor(rg, 'end', getEnd, setEnd);
  DefAccessor(rg, 'length', getLen, setLen);
  return rg;
}

// let x = StartEnd(1, 5);
// console.log(x.start);
// console.log(x.end);
// console.log(x.length);
// console.log('==========');
// x.end = 3;
// console.log(x.start);
// console.log(x.end);
// console.log(x.length);
// console.log('==========');
// x.length = 10;
// console.log(x.start);
// console.log(x.end);
// console.log(x.length);
// console.log('==========');
// x.start=6;
// console.log(x.start);
// console.log(x.end);
// console.log(x.length);

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!);
    });
  });
}

export function asLiterals<T extends PropertyKey>(arr: T[]): T[] {
  return arr;
}
export type LiteralType<TL extends Array<any>, TP> = { [K in TL[number]]: TP };

export type Merg<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type MergO<U extends object> = (U extends object ? (k: U) => void : never) extends (k: infer I) => void ? (I extends object ? I : object) : object;

export type Extend<T extends object, U extends object> = T & Omit<MergO<U>, keyof T>;
export type Override<T extends object, U extends object> = Omit<T, keyof MergO<U>> & MergO<U>;

export type ExtendOver<T extends object, U extends object, X extends object> = T & Omit<MergO<U>, keyof X>;
export type OverrideOver<T extends object, U extends object, X extends object> = Omit<T, keyof Omit<MergO<U>, keyof X>> & Omit<MergO<U>, keyof X>;

// type a = { a: string, b: string, c: string };
// type b = { c: number, d: number, e: number };
// type c = MergO<a | b>;
// type c2 = Extend<a, b>;
// type c3 = Override<a, b>;
// let cc: c = Uny;
// let cc2: c2 = Uny;
// let cc3: c3 = Uny;
// cc.c = Uny; cc2.c = 's'; cc3.c = 1;

export enum AssignFilter {
  exclude,
  extract,
  override,
}
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.exclude): T & U;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.extract): U;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.override): T & U;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter): U | (T & U) {
  if (filter === AssignFilter.exclude) {
    for (const key in source) {
      if (!target.hasOwnProperty(key)) {
        (target as any)[key] = source[key];
      }
    }
  } else if (filter === AssignFilter.extract) {
    for (const key in source) {
      if (target.hasOwnProperty(key)) {
        (target as any)[key] = source[key];
      }
    }
  } else {
    Object.assign(target, source);
  }
  return target;
}
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.exclude): T & U;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.extract): U;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.override): T & U;

export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.exclude): T & U;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.extract): U;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.override): T & U;

export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter): any {
  for (const key in source) {
    if (filter !== AssignFilter.override) {
      if (filter === AssignFilter.exclude && target.hasOwnProperty(key)) {
        continue;
      }
      if (filter === AssignFilter.extract && !target.hasOwnProperty(key)) {
        continue;
      }
    }
    if (IsArray(pick) ? pick.indexOf(key) >= 0 : pick.hasOwnProperty(key)) {
      (target as any)[key] = source[key];
    }
  }
  return target;
}

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.exclude): T & U;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.extract): U;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.override): T & U;

export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.exclude): T & U;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.extract): U;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.override): T & U;

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter): any {
  for (const key in source) {
    if (filter !== AssignFilter.override) {
      if (filter === AssignFilter.exclude && target.hasOwnProperty(key)) {
        continue;
      }
      if (filter === AssignFilter.extract && !target.hasOwnProperty(key)) {
        continue;
      }
    }
    if (IsArray(omit) ? omit.indexOf(key) < 0 : !omit.hasOwnProperty(key)) {
      (target as any)[key] = source[key];
    }
  }
  return target;
}

export type PropNullAble<T> = { [P in keyof T]: T[P] | null };
export type PropUndefineAble<T> = { [P in keyof T]: T[P] | undefined };

function first<T>(this: Array<T>): T | undefined {
  return this.length === 0 ? undefined : this[0];
}

function last<T>(this: Array<T>): T | undefined {
  return this.length === 0 ? undefined : this[this.length - 1];
}

function shiftMany<T>(this: Array<T>, count: number = 1): Array<T> {
  return this.splice(0, count);
}

function popMany<T>(this: Array<T>, count: number = 1): Array<T> {
  return this.splice(this.length - count);
}

function insert<T>(this: Array<T>, pos: number, ...items: Array<T>): number {
  this.splice(pos, 0, ...items);
  return items.length;
}

function segment<T>(this: Array<T>, start: number, length: number): Array<T> {
  return this.slice(start, start + length);
}

declare global {
  interface Array<T> {
    readonly first: T | undefined;
    readonly last: T | undefined;
    readonly peek: T | undefined;
    shiftMany(count?: number): Array<T>;
    popMany(count?: number): Array<T>;

    pushFront(...items: Array<T>): number;
    popFront(): T | undefined;
    popFrontMany(count?: number): Array<T>;

    enQueue(...items: Array<T>): number;
    deQueue(): T | undefined;
    deQueueMany(count?: number): Array<T>;
    insert(pos: number, ...items: Array<T>): number;
    segment(start: number, length: number): Array<T>;
    binarySearch(val: T, compare?: (a: T, b: T) => number): number;
  }
  interface ReadonlyArray<T> {
    readonly first: T | undefined;
    readonly last: T | undefined;
    readonly peek: T | undefined;
    segment(start: number, length: number): Array<T>;
  }
}

export function binarySearch(this: Array<number>, val: number): number;
export function binarySearch<T>(this: Array<T>, val: T, compare: (a: T, b: T) => number): number;
export function binarySearch(this: Array<any>, val: any, compare?: (a: any, b: any) => number): number {
  let lo = 0;
  let hi = this.length - 1;
  while (lo <= hi) {
    let i = lo + ((hi - lo) >> 1);
    let c = compare === undefined ? this[i] - val : compare(this[i], val);
    if (c === 0) {
      return i;
    }
    if (c < 0) {
      lo = i + 1;
    } else {
      hi = i - 1;
    }
  }
  return ~lo;
}

// let a=[1,10,99];
// let r = binarySearch.call(a,101,undefined as any);
// console.log(r);
// console.log(~r);

Object.defineProperty(Array.prototype, 'first', { get: first });
Object.defineProperty(Array.prototype, 'last', { get: last });
Object.defineProperty(Array.prototype, 'peek', { get: last });

Array.prototype.shiftMany = shiftMany;
Array.prototype.popMany = popMany;

Array.prototype.enQueue = Array.prototype.unshift;
Array.prototype.deQueue = Array.prototype.pop;
Array.prototype.deQueueMany = popMany;
Array.prototype.pushFront = Array.prototype.unshift;
Array.prototype.popFront = Array.prototype.shift;
Array.prototype.popFrontMany = shiftMany;
Array.prototype.insert = insert;
Array.prototype.segment = segment;
Array.prototype.binarySearch = binarySearch;

const recursive = Symbol();
export function IsDeeper<T>(obj: T | DeepArray<T>): obj is DeepArray<T> {
  return (obj as DeepArray<T>)[recursive]() === 0;
}

class DeepArray<T> extends Array<T | DeepArray<T>> {
  [recursive]() {
    return 0;
  }
}

export function* EachLine(text: string): IterableIterator<string> {
  const regex = /^.*/gm;
  regex.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    yield m[0];
  }
}

export function Lines(text: string): string[] {
  return text.split(/\r\n\|\n/);
}

export let equalVal = strictEqual;
export let notEqualVal = notStrictEqual;
export let deepEqualVal = deepStrictEqual;
export let notDeepEqualVal = notDeepStrictEqual;

// function func(this: any): string
// { return (this === undefined ? "" : this.a.toString()) + ((func as any).texts as string[]).join('.'); }
// (func as any).texts = ['1st', '2nd'];

// class XXX { a: number = 1; }
// let xxx = new XXX();
// console.log(func());
// xxx.toString = func;
// console.log(xxx.toString());
