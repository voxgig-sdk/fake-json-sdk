import { FakeJsonEntityBase } from '../FakeJsonEntityBase';
import type { FakeJsonSDK } from '../FakeJsonSDK';
import type { Control } from '../types';
import type { Currency, CurrencyListMatch } from '../FakeJsonTypes';
declare class CurrencyEntity extends FakeJsonEntityBase<Currency> {
    constructor(client: FakeJsonSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    list(this: any, reqmatch?: CurrencyListMatch, ctrl?: Control): Promise<CurrencyEntity[]>;
}
export { CurrencyEntity };
