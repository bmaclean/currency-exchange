import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item';

/**
 * CurrencyDrawerItem is a single currency item in the lefthand drawer,
 * containing the currency symbol and most recent rate.
 * @customElement
 * @polymer
 */
class CurrencyDrawerItem extends PolymerElement {
	static get template() {
		return html`
            <style>
                :host {
					display: grid;
					background-color: inherit;
                }
                paper-item-body {
					color: #cfd8dc;
					display: grid;
					grid-template-columns: 50% 50%;
				}
				.currency {
					font-size: 22px;
					font-weight: bold;
					margin-left: 8px;
				}
				.value {
					font-size: 22px;
					text-align: end;
				}
            </style>
            <paper-item>
				<paper-item-body>
					<div class="currency">[[rate.symbol]]</div>
					<div class="value">[[rate.value]]</div>
				</paper-item-body>
			</paper-item>
        `;
	}

	static get is() {
		return 'currency-drawer-item';
	}

	static get properties() {
		return {
			/**
             * The rate for this drawer item with symbol and value props.
             */
			rate: {
				type: Object,
				reflectToAttribute: true,
			},
		};
	}
}

window.customElements.define(CurrencyDrawerItem.is, CurrencyDrawerItem);
