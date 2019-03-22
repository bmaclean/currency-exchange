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
			:host {
			}
			google-chart {
				height: 100%;
				width: 90%;
			}
			.title {
				position: fixed;
				height: 67px;
				color: #8bc34a;
				text-align: start;
				position: sticky;
			}
		</style>
		<paper-item class="title">
			<paper-item-body>
				<div>
					<h1>Historical Rates</h1>
				</div>
			</paper-item-body>
		</paper-item>
		<google-chart 
			type="line" 
			options=[[graphOptions]]
			data='[["Date", "Currency"], ["Mar 17", 122.3], ["Mar 13", 433.3]]'>
		</google-chart>
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
			graphOptions: {
				type: Object,
				value() {
					return {
						backgroundColor: '#37474f',
						width: '1200',
						height: '600',
						chartArea: {
						},
					};
				},
			},
		};
	}
}

window.customElements.define(CurrencyChart.is, CurrencyChart);
