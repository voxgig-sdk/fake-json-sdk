import { FakeJsonEntityBase } from '../FakeJsonEntityBase';
import type { FakeJsonSDK } from '../FakeJsonSDK';
import type { Control } from '../types';
import type { Book, BookLoadMatch, BookListMatch, BookCreateData, BookUpdateData, BookRemoveMatch } from '../FakeJsonTypes';
declare class BookEntity extends FakeJsonEntityBase<Book> {
    constructor(client: FakeJsonSDK, entopts: any);
    make(this: BookEntity): BookEntity;
    load(this: any, reqmatch?: BookLoadMatch, ctrl?: Control): Promise<BookEntity>;
    list(this: any, reqmatch?: BookListMatch, ctrl?: Control): Promise<BookEntity[]>;
    create(this: any, reqdata?: BookCreateData, ctrl?: Control): Promise<BookEntity>;
    update(this: any, reqdata?: BookUpdateData, ctrl?: Control): Promise<BookEntity>;
    remove(this: any, reqmatch?: BookRemoveMatch, ctrl?: Control): Promise<BookEntity>;
}
export { BookEntity };
