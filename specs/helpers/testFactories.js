import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
    
const createLikeButtonPresenterWithRestaurant = async (Restaurant) => {
    await LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector( '#likeButtonContainer' ),
        FavoriteRestaurant: FavoriteRestaurantIdb,
        Restaurant,
    });
};
    
export { createLikeButtonPresenterWithRestaurant };