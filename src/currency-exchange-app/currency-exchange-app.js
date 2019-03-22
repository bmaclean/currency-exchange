import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import moment from 'moment';
import '@polymer/paper-item';
import '@polymer/app-layout/app-layout.js';
import './currency-chart';
import './currency-drawer-item';

/**
 * @customElement
 * @polymer
 */
class CurrencyExchangeApp extends PolymerElement {
	static get template() {
		return html`
            <style>
                :host {
					background-color: #37474f;
					display: grid;
					height: 100vh;
					overflow: hidden;
				}
				app-drawer-layout {
					--app-drawer-width: 350px;
				}
                app-drawer {
					--app-drawer-width: 350px;
					--app-drawer-content-container: {
						background-color: #263238;
					};
					background-color: #263238;
                    box-shadow: 5px 0 5px black;
                    grid-template-rows: auto;
                    overflow: scroll;
				}
				currency-chart {
					height: 100%;
					width: 100%;
				}
                paper-item {
                    border: 1px;
				}
				.drawerTitle {
					grid-column: col-start / span 12;
					color: #e91e63;
					text-align: end;
					position: sticky;
				}
				.content {
					height: 100%;
				}
            </style>
            <app-drawer-layout>
				<app-drawer
                    id="currency-sidebar"
                    class="leftpanel"
                    name="currency-sidebar"
                    slot="drawer"
                >
				<paper-item class="drawerTitle">
					<paper-item-body>
						<div>
							<h1>Current Rates</h1>
						</div>
					</paper-item-body>
				</paper-item>
                <template is="dom-repeat" items="[[currencyList]]">
					<currency-drawer-item rate=[[item]] />
                </template>
				</app-drawer>
				<div class="content">
					<currency-chart currencies="[[currencyData]]" />
				</div>
            </app-drawer-layout>
        `;
	}

	static get is() {
		return 'currency-exchange-app';
	}

	static get properties() {
		return {
			/**
             * Base currency used to determine currency exchange rates.
             */
			baseCurrency: {
				type: String,
				value() {
					return 'CAD';
				},
			},
			/**
             * List of currencies and their current values.
             */
			currencyList: Array,
			/**
             * List of currencies' historical values. Defaults to values over the last week.
             */
			currencyData: Array,
		};
	}

	ready() {
		super.ready();
		this.setCurrencyData();
	}

	setCurrencyData() {
		fetch(this._buildCurrencyURL()).then(
			(response) => {
				if (response.status !== 200) {
					// eslint-disable-next-line no-console
					console.warn(`Fetching currencies failed with status ${response.status}`);
					return;
				}
				response.json().then((data) => {
					// const rates = this._standardizeRates(data.rates);
					this.currencyList = this._getMostRecentRates(data.rates);
					this.currencyData = this._formatRatesForGraph(data.rates);
				});
			// eslint-disable-next-line comma-dangle
			}
		).catch((err) => {
			// eslint-disable-next-line no-console
			console.error(`Fetching currencies failed with error ${err}`);
		});
	}

	_standardizeRates(rates) {
		return Object.entries(rates).map(([key, value]) => (
			{
				symbol: key,
				value: value.toFixed(2),
			}
		)).sort(this._compareCurrencySymbols)
	}

	_getMostRecentRates(rates) {
		const recent = Object.keys(rates).reduce((max, curr) => curr > max ? curr : max);
		return this._standardizeRates(rates[recent]);
	}

	_formatRatesForGraph(rates) {
		for (const date of Object.keys(rates)) {
			rates[date] = this._standardizeRates(rates[date])
		}
		return rates
	}
	
	_buildCurrencyURL() {
		const url = new URL('https://api.exchangeratesapi.io/history')
		const end_at = this._getCurrentDate();
		const start_at = this._getBoundaryDate(end_at);
		const symbols = `AUD,CAD,USD,GBP,JPY,EUR,HKD,THB,DKK,ZAR,CNY,INR`;
		url.search = new URLSearchParams({
			start_at,
			end_at,
			base: this.baseCurrency,
			symbols,
		})
		return url;
	}

	_getCurrentDate() {
		return moment().format('YYYY-MM-DD');
	}

	_getBoundaryDate(currentDate) {
		return moment(currentDate).subtract(14, 'd').format('YYYY-MM-DD');
	}

	_compareCurrencySymbols(a, b) {
		return a.symbol.localeCompare(b.symbol);
	}
}

window.customElements.define(CurrencyExchangeApp.is, CurrencyExchangeApp);
