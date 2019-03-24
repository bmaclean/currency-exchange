import moment from 'moment';

/** @polymerBehavior */
const CurrencyRatesBehavior = {
    
	standardizeRates: function(rates) {
		return Object.entries(rates).map(([key, value]) => (
			{
				symbol: key,
				value: value.toFixed(2),
			}
		)).sort(this._compareCurrencySymbols)
	},

	getMostRecentRates: function(rates) {
		const recent = Object.keys(rates).reduce((max, curr) => curr > max ? curr : max);
		return this.standardizeRates(rates[recent]);
	},

	formatRatesForGraph: function(rates) {
		const dates = Object.keys(rates);
		const sortedRates = {};
		Object.keys(rates).sort().forEach(date => sortedRates[date] = {});
		Object.keys(rates).forEach(rate => Object.keys(rates[rate]).sort().forEach(key => 
			sortedRates[rate][key] = rates[rate][key]
		));
		const symbols = ["Date", ...Object.keys(Object.values(sortedRates)[0])];
		const values = dates.map(date => [date, ...Object.values(sortedRates[date])]);
		return [symbols, ...values]
	},

	getCurrentDate: function() {
		return moment().format('YYYY-MM-DD');
	},

	getBoundaryDate: function(currentDate) {
		return moment(currentDate).subtract(1, 'y').format('YYYY-MM-DD');
	},

	_compareCurrencySymbols: function(a, b) {
		return a.symbol.localeCompare(b.symbol);
    },
}

export default CurrencyRatesBehavior;
