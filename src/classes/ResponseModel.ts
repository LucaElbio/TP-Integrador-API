export class ResponseModel<T> {
    message: string;
    errorDetail?: unknown;
    data?: T;

    constructor(message: string, errorDetail?: unknown, data?: T) {
        this.message = message;
        this.errorDetail = errorDetail;
        this.data = data;
    }
}
