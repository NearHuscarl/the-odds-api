'use strict';

import fetch from 'node-fetch';
import querystring, { ParsedUrlQueryInput } from 'querystring';
import {
    SportParams,
    OddParams
} from './params';
import {
    SportResult,
    OddResult,
} from './results';

let API_KEY = '';

class TheOddsAPI {
    baseUrl: string;

    constructor(apiKey: string) {
        API_KEY = apiKey;
        this.baseUrl = 'https://api.the-odds-api.com';
    }

    _request(url: string) {
        return fetch(url)
            .then((result: Response | any) => {
                return Promise.all([result, result.json()]);
            })
            .then((result) => {
                const [data, json] = result;
                return {
                    result: json.data,
                    header: {
                        requestsRemaining: Number(data.headers.get('x-requests-remaining')),
                        requestsUsed: Number(data.headers.get('x-requests-used')),
                    }
                };
            })
    }

    _getResult(endpoint: string, options: object, headerData: boolean): Promise<any> {
        const url = this.baseUrl + endpoint;
        const queryInput: ParsedUrlQueryInput | {} = { apiKey: API_KEY, ...options };
        const query = querystring.stringify(queryInput);
        const urlWithQuery = `${url}?${query}`;

        return this._request(urlWithQuery)
            .then((data) => {
                const result: { [key: string]: {} } = { data: data.result };
                if (headerData) {
                    result.api = data.header;
                }
                return result;
            });
    }

    getSports(params: SportParams | null = null, headerData = false): Promise<SportResult> {
        // Since the only parameter (all) is optional the params can be omitted entirely
        if (!params) params = {};
        params.all = params.all ? 1 : 0;
        return this._getResult('/v3/sports', params, headerData);
    }

    getOdds(params: OddParams, headerData = false): Promise<OddResult> {
        return this._getResult('/v3/odds', params, headerData);
    }
}

export default TheOddsAPI;

export { default as Market } from "./market";
export { default as Region } from "./region";
export { default as Sport } from "./sport";