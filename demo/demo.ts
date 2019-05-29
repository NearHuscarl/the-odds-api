import fs from 'fs';
import dotenv from 'dotenv';
import TheOddsAPI, { Market, Region, Sport } from '../src/index';

dotenv.config();

if (!process.env.YOUR_API_KEY) {
	throw new Error('No API Key specified. Please create an environment variable named YOUR_API_KEY by following guide in README.md');
}

const theOddsAPI = new TheOddsAPI(process.env.YOUR_API_KEY);

theOddsAPI.getSports().then((data) => {
    console.log(JSON.stringify(data, null, 4));
});

// theOddsAPI.getOdds({
// 	mkt: Market.h2h,
// 	region: Region.au,
// 	sport: Sport.americanfootball_nfl,
// }).then((data) => {
// 	console.log(JSON.stringify(data, null, 4));
// });