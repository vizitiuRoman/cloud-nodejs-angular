import { KeyValue } from './key-value.interface';

export interface Error extends ErrorEvent {
    httpCode: number;
    name: string;
    errors: ErrorData[];
}

interface ErrorData {
    target: {};
    property: string;
    constraints: KeyValue<string>;
}
