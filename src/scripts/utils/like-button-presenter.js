import { createlikeRestauranButtonTemplate, createUnlikeRestauranButtonTemplate } from '../views/templates/template-creator';

const  LikeButtonPresenter = {
  async init({ likeButtonContainer, FavoriteRestaurant,Restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._Restaurant = Restaurant;
    this._favoriteRestaurant = FavoriteRestaurant;

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
    const Restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!Restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createlikeRestauranButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._Restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestauranButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._Restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
