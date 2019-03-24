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
					<h1>Trends</h1>
				</div>
			</paper-item-body>
		</paper-item>
		<google-chart 
			type="line" 
			options=[[graphOptions]]
			data='[[currencies]]'>
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
				notify: true,
				reflectToAttribute: true,
				value() {
					return {
						backgroundColor: '#37474f',
						width: window.innerWidth * .7,
						height: window.innerWidth * .5,
						dataOpacity: 0.5,
						chartArea: {
							top: 25
						},
						legend: { 
							textStyle: {
								color: '#cfd8dc', 
								fontSize: 16
							}
						},
						hAxis: {
							// title: 'Date',
							maxTextLines: 1,
							titleTextStyle: {
								color: '#cfd8dc'
							},
							textStyle: {
								color: '#cfd8dc',
							},
						},
						vAxis: {
							// title: 'Currency Value',
							titleTextStyle: {
								color: '#cfd8dc'
							},
							textStyle: {
								color: '#cfd8dc',
							},
						}
					};
				},
			},
		};
	}

	ready() {
		super.ready();
		window.addEventListener('resize', this._resize.bind(this))
	}

	_resize() {
		this.graphOptions.width = window.innerWidth * 0.7;
		this.graphOptions.height = window.innerWidth * 0.5;
		this.notifyPath('graphOptions.width');
		this.notifyPath('graphOptions.height');
	}
}

window.customElements.define(CurrencyChart.is, CurrencyChart);
