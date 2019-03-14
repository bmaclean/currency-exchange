import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './my-wallet.js';

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
      <my-wallet
        id="mywallet"
        class="leftpanel"
        name="my-wallet"
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
