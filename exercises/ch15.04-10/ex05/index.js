export class InlineCircle extends HTMLElement {
  static get observedAttributes() { return ['size', 'border-color']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const size = Number(this.getAttribute('size')) || 32;
    const color = this.getAttribute('border-color') || '#333';
    const r = size / 2;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
          vertical-align: middle;
        }
      </style>
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <circle cx="${r}" cy="${r}" r="${r - 2}" stroke="${color}" stroke-width="2" fill="white" />
      </svg>
    `;
  }
}
