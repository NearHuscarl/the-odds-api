import Market from "./market";
import Region from "./region";
import Sport from "./sport";

export interface SportParams {
    sport?: Sport | string,
    region?: Region,
    mkt?: Market,
}