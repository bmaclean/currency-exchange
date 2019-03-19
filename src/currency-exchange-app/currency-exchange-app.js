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
      <app-drawer-layout>
        <app-drawer
          id="currency-sidebar"
          class="leftpanel"
          name="currency-sidebar"
          slot="drawer"
        >
        <paper-item>cunt</paper-item>
        <paper-item>fuck</paper-item>
        <paper-item>you</paper-item>
        <paper-item>cunt</paper-item>
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
    };
  }
}

window.customElements.define(CurrencyExchangeApp.is, CurrencyExchangeApp);
