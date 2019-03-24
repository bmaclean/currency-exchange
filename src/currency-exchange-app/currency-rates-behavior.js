import moment from 'moment';

/** 
 * CurrencyRatesBehavior provides all the functionality to process currency 
 * rate data coming from the Currency Exchange API (https://exchangeratesapi.io/).
 * 
 * @polymerBehavior */
const CurrencyRatesBehavior = {
		
	/**
	 * standardizeRates receives raw rate data and standardizes its format to be:
	 * [
	 *    {
	 *         symbol: 'SYM',
	 * 				 value:   1.00,
	 *    },
	 * ]
	 * @param {Object} rates - The unformatted and unsorted rate data for a single date.
	 */
	standardizeRates: function(rates) {
		return Object.entries(rates).map(([key, value]) => (
			{
				symbol: key,
				value: value.toFixed(2),
			}
		)).sort(this._compareCurrencySymbols)
	},

	/**
	 * getMostRecentRates receives the initial response from the Currency Exchange API
	 * and returns the set of rates from the most recent date available.
	 * @param {Object} rates - The raw rates for all dates returned from the API.
	 */
	getMostRecentRates: function(rates) {
		const recent = Object.keys(rates).reduce((max, curr) => curr > max ? curr : max);
		return this.standardizeRates(rates[recent]);
	},

	/**
	 * formatRatesForGraph receives the initial response from the Currency Exchange 
	 * API and returns the same data in a format readable by Google Charts.
	 * @param {Object} rates - The raw rates for all dates returned from the API.
	 */
	formatRatesForGraph: function(rates) {
		const dates = Object.keys(rates).sort();
		const sortedRates = {};
		Object.keys(rates).sort().forEach(date => sortedRates[date] = {});
		Object.keys(rates).forEach(rate => Object.keys(rates[rate]).sort().forEach(key => 
			sortedRates[rate][key] = rates[rate][key]
		));
		const symbols = ["Date", ...Object.keys(Object.values(sortedRates)[0])];
		const values = dates.map(date => [new Date(date), ...Object.values(sortedRates[date])]);
		return [symbols, ...values]
	},

	/**
	 * Get today's date.
	 */
	getCurrentDate: function() {
		return moment().format('YYYY-MM-DD');
	},

	/**
	 * Get the date one year from a provided date.
	 * @param {String} currentDate - today's date
	 */
	getBoundaryDate: function(currentDate) {
		return moment(currentDate).subtract(1, 'y').format('YYYY-MM-DD');
	},

	/**
	 * Return 1 (truthy) if a is alphabetically before b, 0 (falsy) otherwise.
	 */
	_compareCurrencySymbols: function(a, b) {
		return a.symbol.localeCompare(b.symbol);
    },
}

export default CurrencyRatesBehavior;
