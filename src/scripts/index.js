import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/app-bar';
import './components/jumbotran';
import './components/footer';
import App from './views/app';

const hamburgerButtonElement = document.querySelector('#hamburgerButton');
const drawerElement = document.querySelector('#Drawer');
const mainElement = document.querySelector('.menu');

hamburgerButtonElement.addEventListener('click', (event) => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

mainElement.addEventListener('click', (event) => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});

const app = new App({

});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
