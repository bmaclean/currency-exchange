import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/app-layout/app-layout.js';
import './currency-exchange-layout';
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
        app-drawer {
          --app-drawer-width: 350px;
          grid-template-rows: auto;
          border: 1px;
          box-shadow: 5px 0 5px grey;
        }
      </style>
      <app-drawer-layout onclick="{{reportCurrency}}">
        <app-drawer
          id="currency-sidebar"
          class="leftpanel"
          name="currency-sidebar"
          slot="drawer"
        >
        <template is="dom-repeat" items="[[currencies]]">
          <paper-item>[[item.value]]</paper-item>
        </template>
        </app-drawer>
        <currency-app-content />
      </app-drawer-layout>
    `;
  }

  static get is() {
    return 'currency-exchange-app';
  }

  static get properties() {
    return {
      currencies: Array,
    };
  }

  ready() {
    super.ready();
    this.setCurrencies();
  }

  setCurrencies() {
    return fetch('https://api.exchangeratesapi.io/latest').then(
      (response) => {
        if (response.status !== 200) {
          // eslint-disable-next-line no-console
          console.warn(`Fetching currencies failed with status ${response.status}`);
          return;
        }
        response.json().then((data) => {
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
}

window.customElements.define(CurrencyExchangeApp.is, CurrencyExchangeApp);
