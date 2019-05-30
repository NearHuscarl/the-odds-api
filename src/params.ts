import Market from "./market";
import Region from "./region";
import Sport from "./sport";

export interface SportParams {
    all?: boolean | number,
}

export interface OddParams {
    sport: Sport | string,
    region: Region,
    mkt?: Market,
}