const axios = require('axios');
const httpsProxyAgent = require('https-proxy-agent');

let config = {};

if (process.env.LOCAL_NETWORK === 'subti') {
	config = {
		baseURL: 'https://api.github.com',
		httpsAgent: new httpsProxyAgent('http://172.18.16.1:3128')
	};
} else {
	config = {
		baseURL: 'https://api.github.com'
	};
}

const api = axios.create(config);

module.exports = api;
