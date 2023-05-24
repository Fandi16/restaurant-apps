import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
	document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
	beforeEach(async () => {
		addLikeButtonContainer();
		await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
	});

	afterEach(async () => {
		await FavoriteRestaurantIdb.deleteRestaurant(1);
	});

	it('should display unlike widget when the Restaurant has been liked', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="unlike this Restaurant"]')).toBeTruthy();
	});

	it('should not display like widget when the Restaurant has been liked', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="like this Restaurant"]')).toBeFalsy();
	});

	it('should be able to remove liked Restaurant from the list', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		document.querySelector('[aria-label="unlike this Restaurant"]').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});

	it('should not throw error if the unliked Restaurant is not in the list', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		await FavoriteRestaurantIdb.deleteRestaurant(1);
		document.querySelector('[aria-label="unlike this Restaurant"]').dispatchEvent(new Event('click'));
		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});
});
