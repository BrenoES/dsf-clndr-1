import { get } from "./baseAPI";
const urlBase = 'https://mystique-v2-americanas.juno.b2w.io/autocomplete?source=nanook&';

export function getProduct<T>(productTerm: string) {
    return get<T>(urlBase, { content: productTerm })
}