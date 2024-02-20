import { ASC, DESC, NONE, ASSET_CLASS, PRICE, TICKER } from "../../utils/constants";

export type sortDirection = typeof ASC | typeof DESC | typeof NONE;
export type ColumnName = typeof ASSET_CLASS | typeof PRICE | typeof TICKER;
export type SortingOrder = typeof ASC | typeof DESC;