import 'regenerator-runtime';
import '../styles/main.css';
import './components/app-bar';
import './components/jumbotran';
import './components/footer';
import filter from 'lodash.filter';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import CONFIG from './globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const hamburgerButtonElement = document.querySelector('#hamburgerButton');
const drawerElement = document.querySelector('#Drawer');
const mainElement = document.querySelector('.menu');
const skipLink = document.querySelector('.skip-link');
const mainContent = document.querySelector('#mainContent');

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  mainContent.scrollIntoView({ behavior: 'smooth' });
  skipLink.blur();
});

hamburgerButtonElement.addEventListener('click', (event) => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

mainElement.addEventListener('click', (event) => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
import('lodash.filter')
  .then((module) => module.default)
  .then(filterContacts)
  .catch((error) => alert(error));

const filterContacts = (filter) => {
  filter(contacts, contactType.value === 'all' ? {} : { type: contactType.value })
    .forEach(renderContact);
};
