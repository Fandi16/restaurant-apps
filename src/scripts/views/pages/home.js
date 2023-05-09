import restaurantSource from '../../data/restaurants-sorce';
import { createrestaurantsItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="content-header">
      <article class="headline">
        <h1 tabindex="4" class="explore">Explore Restaurant</h1>
      </article>
    </section>
    <section id="content-list" class="content-list"></section>
      `;
  },

  async afterRender() {
    const restaurants = await restaurantSource.listRestaurant();
    const restaurantContainer = document.querySelector('#content-list');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createrestaurantsItemTemplate(restaurant);
    });
  },
};

export default Home;
