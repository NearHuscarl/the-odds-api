'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import TheOddsAPI, { Sport, Region, Market } from '../src/index';
import * as type from './match';
import { sportResult, oddResult } from './results';

chai.use(chaiAsPromised);
const expect = chai.expect;
const apiKey = 'YOUR_API_KEY';
const theOddsAPI = new TheOddsAPI(apiKey);
const api = {
	requestsRemaining: 100,
	requestsUsed: 300,
};

describe('TheOddsAPI', function() {

	beforeEach('setup sandbox', function () {
		this.sandbox = sinon.createSandbox();
	});

	afterEach('restore sandbox', function () {
		this.sandbox.restore();
	});

	describe('theOddsAPI.getSports', function () {
		it('Get sport results', function () {
			const _request = this.sandbox.stub(theOddsAPI, '_request');
	
			_request
				.withArgs('https://api.the-odds-api.com/v3/sports?apiKey=YOUR_API_KEY&all=0')
				.resolves({ result: sportResult.data, header: api });
	
			expect(theOddsAPI.getSports()).to.eventually.eql({ data: sportResult.data });
		});
	});
	
	describe('theOddsAPI.getOdds', function () {
		it('Get odds results with parameters', function () {
			const _request = this.sandbox.stub(theOddsAPI, '_request');
	
			_request
				.withArgs('https://api.the-odds-api.com/v3/odds?apiKey=YOUR_API_KEY&sport=soccer_epl&region=uk&mkt=h2h')
				.resolves({ result: oddResult.data, header: api });
	
			const params = {
				sport: Sport.soccer_epl,
				region: Region.uk,
				mkt: Market.h2h,
			};
	
			expect(theOddsAPI.getOdds(params, false)).to.eventually.be.eql({ data: oddResult.data });
		});
	});
	
	
	describe('theOddsAPI.getSports', function () {
		it('Get results with or without additional header data', function () {
			const _request = this.sandbox.stub(theOddsAPI, '_request');
			const resultWithHeader = { data: oddResult.data, api };
			const resultWithoutHeader = { data: oddResult.data };
	
			_request
				.withArgs('https://api.the-odds-api.com/v3/sports?apiKey=YOUR_API_KEY&all=1')
				.resolves({ result: oddResult.data, header: api });
	
			expect(theOddsAPI.getSports({ all: true }, true)).to.eventually.be.eql(resultWithHeader);
			expect(theOddsAPI.getSports({ all: true }, false)).to.eventually.be.eql(resultWithoutHeader);
		});
	});
});
