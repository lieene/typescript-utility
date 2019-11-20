import { arrayExpression } from "@babel/types";
import { start } from "repl";

// File: index.ts                                                                  //
// Project: lieene.@lieene/ts-utility                                              //
// Created Date: Mon Nov 11 2019                                                   //
// Author: Lieene Guo                                                              //
// MIT License                                                                     //
// Copyright (c) 2019 Lieene@ShadeRealm                                            //


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
  return obj.test !== undefined && obj.exec !== undefined;
}
export function NotRegX<T>(obj: RegExp | T): obj is T
{
  return !IsRegExp(obj);
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
{ Object.defineProperty(o, p, { get, set }); }

export enum NoIntersection { Before, After }
export class Range
{
  constructor(start: number, length: number);
  constructor(startEnd: [number, number]);
  constructor(start: number | [number, number], length: number = 0)
  {
    [start, length] = IsNumber(start) ? [start, length] : [start[0], start[1] - start[0]];
    if (start < 0 || length < 0) { throw new Error('index out off range'); }
    this.start = start >>> 0;
    this.length = length >>> 0;
  }
  readonly start: number;
  readonly length: number;
  get end(): number { return this.start + this.length; }

  intersection(other: Range): Range | NoIntersection
  {
    if (this.start >= other.end) { return NoIntersection.After; }
    if (this.end <= other.start) { return NoIntersection.Before; }
    else { return new Range([Math.max(this.start, other.start), Math.min(this.end, other.end)]); }
  }

  union(other: Range): Range { return new Range([Math.min(this.start, other.start), Math.max(this.end, other.end)]); }

  isEqual(other: Range): boolean { return this.start === other.start && this.end === other.end; }

  isEmpty(): boolean { return this.length === 0; }

  isPositive(): boolean { return this.start >= 0; }

  shrinkStart(count: number): Range | undefined
  {
    count = count >>> 0;
    let end = this.end;
    let start = this.start + count;
    if (start > end) { return undefined; }
    return new Range([start, end]);
  }

  shrinkEnd(count: number): Range | undefined
  {
    count = count >>> 0;
    let start = this.start;
    let end = this.end - count;
    if (end < start) { return undefined; }
    return new Range([this.start, end]);
  }

  shift(count: number): Range { return new Range(this.start + count, this.end + count); }

  contains(index: number): boolean { return index >= this.start && index < this.end; }

  toString(): string { return `[${this.length}:${this.start},${this.end})`; }
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

export type ArrayElemType<A extends any> = A extends Array<infer T> ? T : never;
export type UnionTupleType<A extends any[]> = A extends Array<infer T> ? T extends object ? T : object : object;
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

export interface PropertyInfo<T> extends TypedPropertyDescriptor<T>
{
  key: PropertyKey;
}
export type ObjectProperties<T extends object> =
  { [P in keyof T]: TypedPropertyDescriptor<T[P]> } &
  Map<PropertyKey, PropertyDescriptor>;

export function GetHirachyProperties<T extends object>(O: T, prop?: ObjectProperties<T>): ObjectProperties<T>
{
  if (prop === undefined) { prop = new Map<PropertyKey, PropertyDescriptor>() as ObjectProperties<T>; }
  let props = prop;

  if (typeof O !== 'object') { return props; }
  Object.getOwnPropertySymbols(O).forEach(s => { if (!props.has(s)) { props.set(s, Object.getOwnPropertyDescriptor(O, s)!); } });
  Object.getOwnPropertyNames(O).forEach(n => { if (n !== "constructor" && !props.has(n)) { props.set(n, Object.getOwnPropertyDescriptor(O, n)!); } });
  let pp = Object.getPrototypeOf(O);
  if (pp !== Object.prototype) { GetHirachyProperties(pp, props); }
  return props;
}

export enum AssignFilter
{
  extend,
  alter,
  override,
}

export function assign<U extends object, T extends object>(target: U, source: T): Extend<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.extend): Extend<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.alter): Alter<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter.override): Override<U, T>;
export function assign<U extends object, T extends object>(target: U, source: T, filter: AssignFilter = AssignFilter.extend): any
{
  let srcProps = GetHirachyProperties(source);
  let tarProps = GetHirachyProperties(target);
  if (filter === AssignFilter.extend) { srcProps.forEach((v, k) => { if (!tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else if (filter === AssignFilter.alter) { srcProps.forEach((v, k) => { if (tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else { srcProps.forEach((v, k) => { v.configurable = true; Object.defineProperty(target, k, v); }); }
  return target;
}
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.extend): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.alter): AlterLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter.override): OverrideLike<U, T, V>;

export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.extend): ExtendLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.alter): AlterLike<U, T, V>;
export function pickAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, pick: V, filter: AssignFilter.override): OverrideLike<U, T, V>;

export function pickAssign<U extends object, T extends object, V extends object>(target: U, source: T, pick: V, filter: AssignFilter = AssignFilter.extend): any
{
  let srcProps = GetHirachyProperties(source);
  let tarProps = GetHirachyProperties(target);
  let ppick: Array<PropertyKey>;
  if (!IsArray(pick))
  {
    ppick = [];
    let pkProps = GetHirachyProperties(pick);
    pkProps.forEach((v, k) => ppick.push(k));
  }
  else { ppick = pick; }

  if (filter === AssignFilter.extend) { srcProps.forEach((v, k) => { if (ppick.indexOf(k) >= 0 && !tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else if (filter === AssignFilter.alter) { srcProps.forEach((v, k) => { if (ppick.indexOf(k) >= 0 && tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else { srcProps.forEach((v, k) => { if (ppick.indexOf(k) >= 0) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  return target;
}

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.extend): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.alter): AlterOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter.override): OverrideOver<U, T, V>;

export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.extend): ExtendOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.alter): AlterOver<U, T, V>;
export function omitAssign<U extends object, T extends object, V extends Array<PropertyKey>>(target: U, source: T, omit: V, filter: AssignFilter.override): OverrideOver<U, T, V>;

export function omitAssign<U extends object, T extends object, V extends object>(target: U, source: T, omit: V, filter: AssignFilter = AssignFilter.extend): any
{
  let srcProps = GetHirachyProperties(source);
  let tarProps = GetHirachyProperties(target);
  let oomit: Array<PropertyKey>;
  if (!IsArray(omit))
  {
    oomit = [];
    let pkProps = GetHirachyProperties(omit);
    pkProps.forEach((v, k) => oomit.push(k));
  }
  else { oomit = omit; }

  if (filter === AssignFilter.extend) { srcProps.forEach((v, k) => { if (oomit.indexOf(k) < 0 && !tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else if (filter === AssignFilter.alter) { srcProps.forEach((v, k) => { if (oomit.indexOf(k) < 0 && tarProps.has(k)) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
  else { srcProps.forEach((v, k) => { if (oomit.indexOf(k) < 0) { v.configurable = true; Object.defineProperty(target, k, v); } }); }
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

    binarySearch(val: T): T extends number ? number : never;
    binarySearch(val: T, compare: (a: T, b: T) => number): number;

    pushOrdered(val: T): T extends number ? number : never;
    pushOrdered(val: T, compare: (a: T, b: T) => number): number;
  }
  interface ReadonlyArray<T>
  {
    readonly first: T | undefined;
    readonly last: T | undefined;
    readonly peek: T | undefined;
    segment(start: number, length: number): Array<T>;
  }
}

function binarySearch(this: Array<number>, val: number): number;
function binarySearch<T>(this: Array<T>, val: T, compare: (a: T, b: T) => number): number;
function binarySearch(this: Array<any>, val: any, compare?: (a: any, b: any) => number): number
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
function pushOrdered(this: Array<number>, val: number): number;
function pushOrdered<T>(this: Array<T>, val: T, compare: (a: T, b: T) => number): number;
function pushOrdered(this: Array<any>, val: any, compare?: (a: any, b: any) => number): number
{
  if (this.length === 0) { this.push(val); return 0; }
  let pos = IsNumber(val) ? this.binarySearch(val) : this.binarySearch(val, compare!);
  if (pos >= 0) { pos++; this.insert(pos, val); return pos; }
  else { pos = ~pos; this.insert(pos, val); return pos; }
}


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
  Array.prototype.pushOrdered = pushOrdered;
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



