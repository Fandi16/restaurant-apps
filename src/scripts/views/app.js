import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    content, menu, drawer, main,
  }) {
    this._content = content;
    this._menu = menu;
    this._drawer = drawer;
    this._main = main;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
