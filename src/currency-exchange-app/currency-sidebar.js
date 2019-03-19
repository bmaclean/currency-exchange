// eslint-disable import/extensions
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/app-layout/app-layout.js';

/**
 * @customElement
 * @polymer
 */
class CurrencySidebar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: grid;
          margin-top: 0px;
          margin-left: 0px;
          width: 500px;
        }
        .currency-container {
          width: 400px;
          grid-template-rows: auto;
          border: 1px;
          box-shadow: 5px 0 10px grey;
        }
        .currency-item {
          height: 40px;
          grid-template-columns: 20% 80%;
        }
      </style>
      <app-drawer id="drawer" persistent position="left">
        <template is="dom-repeat" items="{{currencies}}">
          <div class="currency-item">
          <div><span>{{item.code}}</span></div>
          <div><span>{{item.balance}}</span></div>
          <div>
        </template>
      </app-drawer>
    `;
  }

  static get is() {
    return 'currency-sidebar';
  }

  static get properties() {
    return {
      currencies: {
        type: Array,
        value() {
          return [
            {
              code: 'CAD',
              balance: 23.34,
            },
            {
              code: 'CHF',
              balance: 0.00,
            },
            {
              code: 'GBP',
              balance: 3.33,
            },
            {
              code: 'SEK',
              balance: 11.43,
            },
            {
              code: 'EUR',
              balance: 2.00,
            },
            {
              code: 'USD',
              balance: 443.00,
            },
          ];
        },
      },
    };
  }
}

window.customElements.define(CurrencySidebar.is, CurrencySidebar);