// File: index.ts                                                                  //
// Project: lieene.@lieene/ts-utility                                              //
// Created Date: Mon Nov 11 2019                                                   //
// Author: Lieene Guo                                                              //
// MIT License                                                                     //
// Copyright (c) 2019 Lieene@ShadeRealm                                            //

import { types as T } from 'util';
import { strictEqual, notStrictEqual, deepStrictEqual, notDeepStrictEqual } from 'assert';
import { type } from 'os';

export const Uny: any = undefined as any;
export const Any: any = {} as any;

export function Defined<T>(obj: T | undefined): obj is T
{
  return obj !== undefined;
}
export function NotDefined(obj: any): obj is undefined
{
  return obj === undefined;
}

export function Null<T>(obj: T | null): obj is T
{
  return obj !== null;
}
export function NotNull(obj: any): obj is null
{
  return obj === null;
}

export function Valiad<T>(obj: T | undefined | null): obj is T
{
  return obj !== null && obj !== undefined;
}
export function Invaliad(obj: any): obj is null | undefined
{
  return obj === null || obj === undefined;
}

export function ValiadOrDefault<T>(obj: T | undefined | null, defaultValue: T): T
{
  return obj === null || obj === undefined ? defaultValue : obj;
}

export function IsRegExp(obj: any): obj is RegExp
{
  return T.isRegExp(obj);
}
export function NotRegX<T>(obj: RegExp | T): obj is T
{
  return !T.isRegExp(obj);
}

export function IsNumber(obj: any): obj is number
{
  return typeof obj === 'number';
}
export function NotNumber<T>(obj: number | T): obj is T
{
  return typeof obj !== 'number';
}

export function IsString(obj: any): obj is string
{
  return typeof obj === 'string';
}
export function NotString<T>(obj: string | T): obj is T
{
  return typeof obj !== 'string';
}

export function IsBoolean(obj: any): obj is boolean
{
  return typeof obj === 'boolean';
}
export function NotBoolean<T>(obj: boolean | T): obj is T
{
  return typeof obj !== 'boolean';
}

export function IsBigint(obj: any): obj is bigint
{
  return typeof obj === 'bigint';
}
export function NotBigint<T>(obj: bigint | T): obj is T
{
  return typeof obj !== 'bigint';
}

export function IsObject(obj: any): obj is object
{
  return typeof obj === 'object';
}
export function NotObject<T>(obj: object | T): obj is T
{
  return typeof obj !== 'object';
}

export function IsSymbol(obj: any): obj is symbol
{
  return typeof obj === 'symbol';
}
export function NotSymbol<T>(obj: symbol | T): obj is T
{
  return typeof obj !== 'symbol';
}

export function IsFunction(obj: any): obj is (...args: any) => any
{
  return typeof obj === 'function';
}
export function NotFunction<T>(obj: any): obj is T
{
  return typeof obj !== 'function';
}

export function IsArray(obj: any): obj is Array<any>
{
  return Array.isArray(obj);
}
export function NotArray<T>(obj: Array<any> | T): obj is T
{
  return !Array.isArray(obj);
}

export function IsArrayOf<T>(array: any, isT: (obj: any) => obj is T): array is Array<T>
{
  if (Array.isArray(array))
  {
    if (array.length === 0)
    {
      return false;
    } else
    {
      return isT(array[0]);
    }
  } else
  {
    return false;
  }
}

export function DefAccessor(o: any, p: PropertyKey, get?: () => any, set?: (v: any) => void)
{
  Object.defineProperty(o, p, { get, set });
}

export interface Range
{
  start: number;
  length: number;
  end: number;
  contains(index: number): boolean;
}
interface InternalRange extends Range
{
  _len: number;
}
function contains(this: Range, index: number): boolean
{
  return index >= this.start && index < this.end;
}
function getLen(this: InternalRange): number
{
  return this._len;
}
function setLen(this: InternalRange, len: number): void
{
  this._len = Math.max(len, 0);
}
function getEnd(this: InternalRange): number
{
  return this.start + this.length;
}
function setEnd(this: InternalRange, end: number): void
{
  end = end >>> 0;
  if (end < this.start)
  {
    throw new Error('index out off range');
  }
  this.length = end - this.start;
}

export function StartLen(start: number, length: number): Range
{
  start = start >>> 0;
  length = length >>> 0;
  if (start < 0 || length < 0)
  {
    throw new Error('index out off range');
  }
  let rg: InternalRange = { contains, start, _len: length } as any;
  DefAccessor(rg, 'end', getEnd, setEnd);
  DefAccessor(rg, 'length', getLen, setLen);
  return rg;
}

export function StartEnd(start: number, end: number): Range
{
  start = start >>> 0;
  end = end >>> 0;
  if (start < 0 || end < start)
  {
    throw new Error('index out off range');
  }
  let rg: Range = { contains, start, _len: end - start } as any;
  DefAccessor(rg, 'end', getEnd, setEnd);
  DefAccessor(rg, 'length', getLen, setLen);
  return rg;
}

export function applyMixins(derivedCtor: any, baseCtors: any[])
{
  baseCtors.forEach(baseCtor =>
  {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name =>
    {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!);
    });
  });
}

export function asLiterals<T extends PropertyKey>(arr: T[]): T[] { return arr; }
export type MapLiteralArray<TL extends Array<any>, TP> = { [K in TL[number]]: TP };


export type ItrType<T> = T extends { [Symbol.iterator]: infer U } ? U : never;
export type Omit2<T, K extends keyof any> = T extends { [Symbol.iterator]: infer U } ? { [Symbol.iterator]: U } & Omit<T, K> : Omit<T, K>;
export type ExcludeO<T extends object, U extends object> =
  U extends { [Symbol.iterator]: any } ? Omit<T, keyof U> :
  T extends { [Symbol.iterator]: infer IT } ? { [Symbol.iterator]: IT } & Omit<T, keyof U> : Omit<T, keyof U>;

export type ExtractO<T extends object, U extends object> =
  U extends { [Symbol.iterator]: any } ? T extends { [Symbol.iterator]: infer IT } ?
  { [Symbol.iterator]: IT } & Pick<T, Extract<keyof T, keyof U>> :
  Pick<T, Extract<keyof T, keyof U>> : Pick<T, Extract<keyof T, keyof U>>;

export type Merg<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type MergO<U extends object> = (U extends object ? (k: U) => void : object) extends (k: infer T) => void ?
  (T extends object ? T : object) : object;


export type UnionTupleType<A extends any[]> = A extends { [n: number]: infer T } ? T extends object ? T : object : object;
export type MergTupleType<A extends any[]> = MergO<UnionTupleType<A>>;

export type Alter<T extends object, U extends object> = ExcludeO<T, U> & ExtractO<U, T>;
export type Extend<T extends object, U extends object> = T & ExcludeO<U, T>;
export type Override<T extends object, U extends object> = ExcludeO<T, U> & U;

export type AlterOver<T extends object, U extends object, X extends object> = Alter<T, ExcludeO<U, X>>;
export type ExtendOver<T extends object, U extends object, X extends object> = Extend<T, ExcludeO<U, X>>;
export type OverrideOver<T extends object, U extends object, X extends object> = Override<T, ExcludeO<U, X>>;

export type AlterLike<T extends object, U extends object, X extends object> = Alter<T, ExtractO<U, X>>;
export type ExtendLike<T extends object, U extends object, X extends object> = Extend<T, ExtractO<U, X>>;
export type OverrideLike<T extends object, U extends object, X extends object> = Override<T, ExtractO<U, X>>;

export enum AssignFilter
{
  exclude,
  extract,
  override,
}

export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.exclude): Extend<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.extract): Alter<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.override): Override<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter): any
{
  if (filter === AssignFilter.exclude)
  {
    for (const key in source)
    {
      if (!target.hasOwnProperty(key))
      {
        (target as any)[key] = source[key];
      }
    }
  } else if (filter === AssignFilter.extract)
  {
    for (const key in source)
    {
      if (target.hasOwnProperty(key))
      {
        (target as any)[key] = source[key];
      }
    }
  } else
  {
    Object.assign(target, source);
  }
  return target;
}
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.exclude): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.extract): AlterLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.override): OverrideLike<U, T, V>;

export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.exclude): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.extract): AlterLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.override): OverrideLike<U, T, V>;

export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter): any
{
  for (const key in source)
  {
    if (filter !== AssignFilter.override)
    {
      if (filter === AssignFilter.exclude && target.hasOwnProperty(key))
      {
        continue;
      }
      if (filter === AssignFilter.extract && !target.hasOwnProperty(key))
      {
        continue;
      }
    }
    if (IsArray(pick) ? pick.indexOf(key) >= 0 : pick.hasOwnProperty(key))
    {
      (target as any)[key] = source[key];
    }
  }
  return target;
}

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.exclude): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.extract): AlterOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.override): OverrideOver<U, T, V>;

export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.exclude): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.extract): AlterOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.override): OverrideOver<U, T, V>;

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter): any
{
  for (const key in source)
  {
    if (filter !== AssignFilter.override)
    {
      if (filter === AssignFilter.exclude && target.hasOwnProperty(key))
      {
        continue;
      }
      if (filter === AssignFilter.extract && !target.hasOwnProperty(key))
      {
        continue;
      }
    }
    if (IsArray(omit) ? omit.indexOf(key) < 0 : !omit.hasOwnProperty(key))
    {
      (target as any)[key] = source[key];
    }
  }
  return target;
}

export type PropNullAble<T> = { [P in keyof T]: T[P] | null };
export type PropUndefineAble<T> = { [P in keyof T]: T[P] | undefined };

function first<T>(this: Array<T>): T | undefined
{
  return this.length === 0 ? undefined : this[0];
}

function last<T>(this: Array<T>): T | undefined
{
  return this.length === 0 ? undefined : this[this.length - 1];
}

function shiftMany<T>(this: Array<T>, count: number = 1): Array<T>
{
  return this.splice(0, count);
}

function popMany<T>(this: Array<T>, count: number = 1): Array<T>
{
  return this.splice(this.length - count);
}

function insert<T>(this: Array<T>, pos: number, ...items: Array<T>): number
{
  this.splice(pos, 0, ...items);
  return items.length;
}

function segment<T>(this: Array<T>, start: number, length: number): Array<T>
{
  return this.slice(start, start + length);
}

declare global
{
  interface Array<T>
  {
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
  interface ReadonlyArray<T>
  {
    readonly first: T | undefined;
    readonly last: T | undefined;
    readonly peek: T | undefined;
    segment(start: number, length: number): Array<T>;
  }
}

export function binarySearch(this: Array<number>, val: number): number;
export function binarySearch<T>(this: Array<T>, val: T, compare: (a: T, b: T) => number): number;
export function binarySearch(this: Array<any>, val: any, compare?: (a: any, b: any) => number): number
{
  let lo = 0;
  let hi = this.length - 1;
  while (lo <= hi)
  {
    let i = lo + ((hi - lo) >> 1);
    let c = compare === undefined ? this[i] - val : compare(this[i], val);
    if (c === 0)
    {
      return i;
    }
    if (c < 0)
    {
      lo = i + 1;
    } else
    {
      hi = i - 1;
    }
  }
  return ~lo;
}

// let a=[1,10,99];
// let r = binarySearch.call(a,101,undefined as any);
// console.log(r);
// console.log(~r);
if (!Object.prototype.hasOwnProperty('first'))
{
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
}

const recursive = Symbol();
export function IsDeeper<T>(obj: T | DeepArray<T>): obj is DeepArray<T>
{
  return (obj as DeepArray<T>)[recursive]() === 0;
}

class DeepArray<T> extends Array<T | DeepArray<T>> {
  [recursive]()
  {
    return 0;
  }
}

export function* EachLine(text: string): IterableIterator<string>
{
  const regex = /^.*/gm;
  regex.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null)
  {
    if (m.index === regex.lastIndex)
    {
      regex.lastIndex++;
    }
    yield m[0];
  }
}

export function Lines(text: string): string[]
{
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
