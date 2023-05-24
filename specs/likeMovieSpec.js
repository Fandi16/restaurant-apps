import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });
  it( 'should show the like button when the Restaurant has not been liked before', async () =>
  {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
  
    expect( document.querySelector( '[aria-label="like this Restaurant"]' ) ).toBeTruthy();
  });
  it('should not show the unlike button when the Restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant( { id: 1 } )
    
    expect(document.querySelector('[aria-label="unlike this Restaurant"]')).toBeFalsy();
  });
  it('should be able to like the Restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant( { id: 1 } )
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const Restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(Restaurant).toEqual({ id: 1 });
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });
  it('should not add a Restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })
    
    await FavoriteRestaurantIdb.putRestaurant( { id: 1 } );
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a Restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant( { id: 1 } )
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
  });
