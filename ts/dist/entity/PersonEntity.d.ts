import { FakeJsonEntityBase } from '../FakeJsonEntityBase';
import type { FakeJsonSDK } from '../FakeJsonSDK';
import type { Control } from '../types';
import type { Person, PersonListMatch } from '../FakeJsonTypes';
declare class PersonEntity extends FakeJsonEntityBase<Person> {
    constructor(client: FakeJsonSDK, entopts: any);
    make(this: PersonEntity): PersonEntity;
    list(this: any, reqmatch?: PersonListMatch, ctrl?: Control): Promise<PersonEntity[]>;
}
export { PersonEntity };
