import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item';
import '@polymer/app-layout/app-layout.js';
import 'moment/moment.js';
import './currency-app-content';
import './currency-exchange-layout';

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
                }
                app-drawer {
                --app-drawer-width: 350px;
                grid-template-rows: auto;
                border: 1px;
                box-shadow: 5px 0 5px grey;
                overflow: scroll;
                }
                paper-item {
                border: 1px;
                }
            </style>
            <app-drawer-layout>
                <app-drawer
                id="currency-sidebar"
                class="leftpanel"
                name="currency-sidebar"
                slot="drawer"
                >
                <template is="dom-repeat" items="[[currencyList]]">
                <paper-item>
                    <paper-item-body two-line>
                    <div>[[item.currency]]</div>
                    <div secondary>[[item.value]]</div>
                    </paper-item-body>
                </paper-item>
                </template>
                </app-drawer>
                <currency-app-content currencies="[[currencies]]" />
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
       * List of currencies' historical value data.
       */
			currencies: Array,
		};
	}

	ready() {
		super.ready();
		this.setCurrencies();
	}

	setCurrencies() {
		fetch(this._buildURI()).then(
			(response) => {
				if (response.status !== 200) {
					// eslint-disable-next-line no-console
					console.warn(`Fetching currencies failed with status ${response.status}`);
					return;
				}
				response.json().then((data) => {
					console.log(this._formatRates(data.rates))
					this.currencyList = this._formatRates(data.rates);
					this.currencies = this._formatRates(data.rates);
				});
			}
		).catch((err) => {
			// eslint-disable-next-line no-console
			console.error(`Fetching currencies failed with error ${err}`);
		});
	}

	_formatRates(rates) {
		return Object.entries(rates).map(([key, value]) => ({ currency: key, value }));
	}

	_buildURI() {
		const currentDate = this._getCurrentDate();
		const boundaryDate = this._getBoundaryDate(currentDate);
		console.log(`https://api.exchangeratesapi.io/history?
    start_at=${boundaryDate}&end_at=${currentDate}&base=${this.baseCurrency}`)
		return `https://api.exchangeratesapi.io/history?start_at=${boundaryDate}&end_at=${currentDate}&base=${this.baseCurrency}`;
	}

	_getCurrentDate() {
		return moment().format('YYYY-MM-DD');
	}

	_getBoundaryDate(currentDate) {
		return moment(currentDate).subtract(14, 'd').format('YYYY-MM-DD');
	}
}

window.customElements.define(CurrencyExchangeApp.is, CurrencyExchangeApp);
