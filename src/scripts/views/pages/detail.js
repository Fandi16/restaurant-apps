import UrlParser from '../../routes/url-parser';
import restaurantSource from '../../data/restaurants-sorce';
import { createrestaurantsDetailTemplate } from '../templates/template-creator';

const DetailRestaurant = {
  async render() {
    return `
        <div id="detailRestaurant" class="detailRestaurant"></div>
        <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await restaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detailRestaurant');
    restaurantContainer.innerHTML = createrestaurantsDetailTemplate(restaurant);
  },
};

export default DetailRestaurant;
