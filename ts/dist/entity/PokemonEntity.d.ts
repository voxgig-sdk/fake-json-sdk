import { FakeJsonEntityBase } from '../FakeJsonEntityBase';
import type { FakeJsonSDK } from '../FakeJsonSDK';
import type { Control } from '../types';
import type { Pokemon, PokemonListMatch } from '../FakeJsonTypes';
declare class PokemonEntity extends FakeJsonEntityBase<Pokemon> {
    constructor(client: FakeJsonSDK, entopts: any);
    make(this: PokemonEntity): PokemonEntity;
    list(this: any, reqmatch?: PokemonListMatch, ctrl?: Control): Promise<PokemonEntity[]>;
}
export { PokemonEntity };
