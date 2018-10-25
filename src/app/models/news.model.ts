export class News {
    private _id: string;
    private _title: string;
    private _body: string;
    private _date: Date;
    private _archived: boolean;

    constructor(
        id: string = '',
        title: string = '',
        body: string = '',
        date: Date = new Date(),
        archived: boolean = false
    ) {
        this._title = title;
        this._body = body;
        this._date = date;
        this._archived = archived;
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get body(): string {
        return this._body;
    }

    set body(body: string) {
        this._body = body;
    }

    get date(): Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
    }

    get arhived(): boolean {
        return this._archived;
    }

    set archived(archived: boolean) {
        this._archived = archived;
    }
}
