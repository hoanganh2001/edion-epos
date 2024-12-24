import { IPager } from "./IPager";

export class ISearch implements IPager {
    offset: number;
    limit: number;
    sorted_by: string;
    sorted_order: 'asc' | 'desc' | '';
}