// eslint-disable import/extensions
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './currency-chart';

/**
 * @customElement
 * @polymer
 */
class CurrencyAppContent extends PolymerElement {
	static get template() {
		return html`
      <style>
          :host {
		  }
      </style>
      <currency-chart currencies="[[currencies]]" />
    `;
	}

	static get is() {
		return 'currency-app-content';
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

window.customElements.define(CurrencyAppContent.is, CurrencyAppContent);
