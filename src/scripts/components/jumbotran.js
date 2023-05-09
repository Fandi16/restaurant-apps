class Jumbotran extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <div class="Jumbotran">
        <div class="element">
            <h1>Restaurant App</h1>
        </div>
    </div>
    `;
  }
}

customElements.define('jumbotran-element', Jumbotran);
