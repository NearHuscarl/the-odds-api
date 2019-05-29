# The Odds API

![npm (scoped)](https://img.shields.io/npm/v/the-odds-api.svg)
![NPM](https://img.shields.io/npm/l/the-odds-api.svg)

[![npm badge][npm-badge-png]][package-url]

## Installation

```bash
$ npm install the-odds-api
```

Get the API key (free) from the [host website]

## Import

```js
import TheOddsAPI, { Market, Region, Sport } from 'the-odds-api';
const theOddsAPI = new TheOddsAPI(YOUR_API_KEY);
```

## Usages

See [documentation] for more information about paramters

### Get header data

You can attach additional data from the API header response by adding `true` in the last argument in every methods below to get some meta info like remaining requests

```js
theOddsAPI.getOdds({
    sport: 'soccer_epl',
}, true).then((data) => {
    console.log(data);
});
```

<details>
  <summary>Result</summary>

```json
{
    "data": [...],
    "api": {
        "requestsRemaining": 499,
        "requestsUsed": 1
    }
}
```
</details>

### Get sports

```js
theOddsAPI.getSports().then((data) => {
    console.log(JSON.stringify(data, null, 4));
});
```

<details>
  <summary>Result</summary>

```json
{
    "data": [
        {
            "key": "americanfootball_ncaaf",
            "active": true,
            "group": "American Football",
            "details": "US College Football",
            "title": "NCAAF"
        },
        {
            "key": "americanfootball_nfl",
            "active": true,
            "group": "American Football",
            "details": "US Football",
            "title": "NFL"
        },
        {
            "key": "aussierules_afl",
            "active": true,
            "group": "Aussie Rules",
            "details": "Aussie Football",
            "title": "AFL"
        },
        ...
    ]
}
```
</details>

### Get odds

```js
theOddsAPI.getOdds({
    mkt: Market.h2h,
    region: Region.au,
    sport: 'americanfootball_nfl',
}).then((data) => {
    console.log(JSON.stringify(data, null, 4));
});
```

<details>
  <summary>Result</summary>

```json
{
    "data": [
        {
            "sport_key": "americanfootball_nfl",
            "sport_nice": "NFL",
            "teams": [
                "Chicago Bears",
                "Green Bay Packers"
            ],
            "commence_time": 1567729200,
            "home_team": "Chicago Bears",
            "sites": [
                {
                    "site_key": "unibet",
                    "site_nice": "Unibet",
                    "last_update": 1559096349,
                    "odds": {
                        "h2h": [
                            1.55,
                            2.5
                        ]
                    }
                },
                {
                    "site_key": "sportsbet",
                    "site_nice": "SportsBet",
                    "last_update": 1559096605,
                    "odds": {
                        "h2h": [
                            1.56,
                            2.49
                        ]
                    }
                },
                {
                    "site_key": "neds",
                    "site_nice": "Neds",
                    "last_update": 1559096589,
                    "odds": {
                        "h2h": [
                            1.52,
                            2.6
                        ]
                    }
                },
                {
                    "site_key": "tab",
                    "site_nice": "TAB",
                    "last_update": 1559096371,
                    "odds": {
                        "h2h": [
                            1.52,
                            2.55
                        ]
                    }
                },
                {
                    "site_key": "ladbrokes",
                    "site_nice": "Ladbrokes",
                    "last_update": 1559096514,
                    "odds": {
                        "h2h": [
                            1.5,
                            2.6
                        ]
                    }
                }
            ],
            "sites_count": 5
        },
        ...
    ]
}
```
</details>

## Testing
```bash
$ npm test
```

## License

**[Mit License]**

[package-url]: https://www.npmjs.com/package/the-odds-api
[host website]: https://the-odds-api.com/
[documentation]: https://the-odds-api.com/liveapi/guides/v3/
[MIT License]: ./LICENSE.md
[npm-badge-png]: https://nodei.co/npm/the-odds-api.png?downloads=true&stars=true