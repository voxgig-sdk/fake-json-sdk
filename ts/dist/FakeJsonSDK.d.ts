import { BookEntity } from './entity/BookEntity';
import { CurrencyEntity } from './entity/CurrencyEntity';
import { PersonEntity } from './entity/PersonEntity';
import { PokemonEntity } from './entity/PokemonEntity';
export type * from './FakeJsonTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FakeJsonEntityBase } from './FakeJsonEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FakeJsonSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Book(entopts?: Record<string, any>): BookEntity;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    Person(entopts?: Record<string, any>): PersonEntity;
    Pokemon(entopts?: Record<string, any>): PokemonEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FakeJsonSDK;
    tester(testopts?: any, sdkopts?: any): FakeJsonSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FakeJsonSDK;
export { stdutil, config, BaseFeature, FakeJsonEntityBase, FakeJsonSDK, SDK, };
