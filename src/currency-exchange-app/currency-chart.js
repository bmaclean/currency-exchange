// eslint-disable import/extensions
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@google-web-components/google-chart';

/**
 * @customElement
 * @polymer
 */
class CurrencyChart extends PolymerElement {
	static get template() {
		return html`
        <style>
            google-chart {
                width: 400px;
            }
        </style>
      <google-chart type="line" data='[["Date", "Currency"], ["Mar 17", 122.3], ["Mar 13", 433.3]]'></google-chart>
    `;
	}

	static get is() {
		return 'currency-chart';
	}

	static get properties() {
		return {
			currencies: {
				type: Array,
				reflectToAttribute: true,
			},
		};
	}
}

window.customElements.define(CurrencyChart.is, CurrencyChart);
