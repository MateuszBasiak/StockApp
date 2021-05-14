import { ICompany } from '../components/Primitives';

interface ApiClient{
    URL: string;
    KEY: string;
}

type TimeInterval = '1min' | '5min' | '15min' | '30min' | '60min';

class ApiClient{
	constructor(){
		this.URL = 'https:/www.alphavantage.co/query?';
		this.KEY = 'T1BIXPW1BAAMVXNG';
	}

	decodeCompanies(string: string) {
		const lines = string.split('\n');
		const res: Array<ICompany> = [];
		lines.slice(1).forEach(line => {
			const tmp = line.split(',');
			if(tmp.length > 2 && tmp[1].length > 0){
				res.push({
					symbol: tmp[0],
					name: tmp[1],
					exchange: tmp[2],
					...tmp
				});
			}
		
		});
		return res;
	}

	async getListedCompanies(){
		return fetch(this.URL+`function=LISTING_STATUS&apikey=${this.KEY}`).then(response => response.text()).then(response => this.decodeCompanies(response));
	}

	async getCompanyInfo(symbol: string){
		return fetch(this.URL+`function=OVERVIEW&symbol=${symbol}&apikey=${this.KEY}`).then(response => response.json());
	}

	async getTodaysStocks(symbol: string, interval: TimeInterval){
		return fetch(this.URL+`function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.KEY}`).then(response => response.json());
	}
}

export default ApiClient;