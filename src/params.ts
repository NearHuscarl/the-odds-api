import Market from "./market";
import Region from "./region";
import Sport from "./sport";

export interface SportParams {
    all?: boolean | number,
}

export interface OddParams {
    sport: Sport,
    region: Region,
    mkt?: Market,
}