import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, Restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._Restaurant = Restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._Restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const Restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!Restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._Restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._Restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
