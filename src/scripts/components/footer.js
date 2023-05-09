class Jumbotran extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <footer>
        <p>
        Copyright © 2023 - Restaurant Apps
        <a href="#" rel="noreferrer">Explore</a>
        </p>
    </footer>
    `;
  }
}

customElements.define('footer-element', Jumbotran);
