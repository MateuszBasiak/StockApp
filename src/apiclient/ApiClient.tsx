interface ApiClient{
    URL: string;
    KEY: string;
}

type TimeInterval = '1min' | '5min' | '15min' | '30min' | '60min';

class ApiClient{
	constructor(){
		this.URL = 'https:/www.alphavantage.co/query?function=';
		this.KEY = 'T1BIXPW1BAAMVXNG';
	}

	async getListedCompanies(){
		return fetch(this.URL+'LISTING_STATUS&apikey='+this.KEY);
	}

	async getCompanyInfo(symbol: string){
		return fetch(this.URL+'OVERVIEW&symbol='+symbol+'&apikey='+this.KEY);
	}

	async getTodaysStocks(symbol: string, interval: TimeInterval){
		return fetch(this.URL+'TIME_SERIES_INTRADAY&symbol='+symbol+'&interval='+interval+'&apikey='+this.KEY);
	}

	async getDailyStocks(symbol: string){
		return fetch(this.URL+'TIME_SERIES_DAILY^symbol='+symbol+'&outputsize=compact&apikey='+this.KEY);
	}
}

export default ApiClient;