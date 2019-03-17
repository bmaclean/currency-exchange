import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './currency-sidebar.js';

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
      </style>
      <currency-sidebar
        id="currency-sidebar"
        class="leftpanel"
        name="currency-sidebar"
      />
    `;
  }

  static get is() {
    return 'currency-exchange-app';
  }

  static get properties() {
    return {
    };
  }
}

window.customElements.define(CurrencyExchangeApp.is, CurrencyExchangeApp);
