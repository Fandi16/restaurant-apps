import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
    
const createLikeButtonPresenterWithRestaurant = async (Restaurant) => {
    await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    Restaurant,
    });
};
    
export { createLikeButtonPresenterWithRestaurant };