'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import * as type from './match';
import { sportResult, oddResult } from './results';
import TheOddsAPI, { Sport, Region, Market } from '../src';

chai.use(chaiAsPromised);

const expect = chai.expect;
const proxy = proxyquire.noCallThru();

const API_KEY = 'YOUR_API_KEY';
const mockHeader = {
	requestsRemaining: 100,
	requestsUsed: 300,
};

function mockResponse(body: any = {}) {
    return {
        json: () => body,
        headers: {
            get: (name: string) => {
                switch (name) {
                    case 'Content-type':
                        return 'application/json';
                    case 'x-requests-remaining':
                        return mockHeader.requestsRemaining;
                    case 'x-requests-used':
                        return mockHeader.requestsUsed;
                    default:
                        return '';
                }
            }
        }
    }
};

describe('TheOddsAPI', function() {

	let sandbox: sinon.SinonSandbox;
	let TheOddsAPI: any;
	let theOddsAPI: TheOddsAPI;
	let fetchStub: sinon.SinonStub<any[], any>;

    before('before', function () {
        sandbox = sinon.createSandbox();
        fetchStub = sandbox.stub();

        TheOddsAPI = proxy('../src/index', {
            'node-fetch': fetchStub
        }).default;

        theOddsAPI = new TheOddsAPI(API_KEY);
    });

	beforeEach('setup sandbox', function () {
		sandbox = sinon.createSandbox();
	});

	afterEach('restore sandbox', function () {
		sandbox.restore();
	});

	describe('theOddsAPI.getSports', function () {
		it('Should get sport results', function () {
			fetchStub
				.withArgs('https://api.the-odds-api.com/v3/sports?apiKey=YOUR_API_KEY&all=1')
				.resolves(mockResponse(sportResult))
				.withArgs('https://api.the-odds-api.com/v3/sports?apiKey=YOUR_API_KEY&all=0')
				.resolves(mockResponse(sportResult));
				
			const resultWithHeader = { data: sportResult.data, api: mockHeader };
			const resultWithoutHeader = { data: sportResult.data };
	
			expect(theOddsAPI.getSports()).to.eventually.eql(resultWithoutHeader);
			expect(theOddsAPI.getSports({ all: true }, true)).to.eventually.be.eql(resultWithHeader);
		});
	});
	
	describe('theOddsAPI.getOdds', function () {
		it('Should get odds results', function () {
			fetchStub
				.withArgs('https://api.the-odds-api.com/v3/odds?apiKey=YOUR_API_KEY&sport=soccer_epl&region=uk&mkt=h2h')
				.resolves(mockResponse(oddResult))
	
			const params = {
				sport: Sport.soccer_epl,
				region: Region.uk,
				mkt: Market.h2h,
			};
			const resultWithHeader = { data: oddResult.data, api: mockHeader };
			const resultWithoutHeader = { data: oddResult.data };
	
			expect(theOddsAPI.getOdds(params)).to.eventually.be.eql(resultWithoutHeader);
			expect(theOddsAPI.getOdds(params, true)).to.eventually.be.eql(resultWithHeader);
		});
	});
});
