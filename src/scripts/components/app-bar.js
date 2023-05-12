class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="app-bar">
    <div class="menu">
      <button id="hamburgerButton">☰</button>
    </div>
    <div class="brand">
      <h1>Restaurant</h1>
    </div>
    <nav id="Drawer" class="navigation">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#/favorite">Favorite</a></li>
        <li>
          <a href="https://www.instagram.com/fandi.16_/">About Us</a>
        </li>
      </ul>
    </nav>
  </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
