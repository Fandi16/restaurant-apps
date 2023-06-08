class Jumbotran extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <picture>
    <source media="(max-width: 600px)" srcset="../public/images/heros/hero-image_2.jpg">
     </picture>
     <div class="Jumbotran">
        <div class="element">
            <h1>Restaurant App</h1>
        </div>
    </div>
    `;
  }
}

customElements.define('jumbotran-element', Jumbotran);
