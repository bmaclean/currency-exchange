import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import moment from 'moment';
import '@polymer/paper-item';
import '@polymer/app-layout/app-layout.js';
import './currency-app-content';
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
					display: grid;
					background-color: #37474f;
					margin: -10px;
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
                    border: 1px;
                    box-shadow: 5px 0 5px black;
                    grid-template-rows: auto;
                    overflow: scroll;
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
					<currency-app-content currencies="[[currencyData]]" />
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
		fetch(this._buildCurrencyURI()).then(
			(response) => {
				if (response.status !== 200) {
					// eslint-disable-next-line no-console
					console.warn(`Fetching currencies failed with status ${response.status}`);
					return;
				}
				response.json().then((data) => {
					this.currencyList = this._getCurrentRates(data.rates);
					this.currencyData = this._formatRatesForGraph(data.rates);
				});
			// eslint-disable-next-line comma-dangle
			}
		).catch((err) => {
			// eslint-disable-next-line no-console
			console.error(`Fetching currencies failed with error ${err}`);
		});
	}

	_getCurrentRates(rates) {
		const current = moment().subtract(1, 'days');
		const currentRates = rates[current.format('YYYY-MM-DD')];
		return Object.entries(currentRates).map(([key, value]) => (
			{
				symbol: key,
				value: value.toFixed(2),
			}
		)).sort(this._compareCurrencySymbols);
	}

	_formatRatesForGraph(rates) {
		return Object.entries(rates).map(([key, value]) => ({ currency: key, value }));
	}

	_buildCurrencyURI() {
		const currentDate = this._getCurrentDate();
		const boundaryDate = this._getBoundaryDate(currentDate);
		return `https://api.exchangeratesapi.io/history?start_at=${boundaryDate}&end_at=${currentDate}&base=${this.baseCurrency}`;
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
