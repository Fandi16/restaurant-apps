import FavoriteRestaurantSearchPresenter from '/xampp/htdocs/Dicoding/front end expert/restaurant-apps/src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurant', () => {
  let presenter;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
        <div id="Restaurant-search-container">
            <input id="query" type="text">
            <div class="Restaurant-result-container">
                <ul class="Restaurant">
                </ul>
            </div>
        </div>
        `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurant');
    presenter = new FavoriteRestaurantSearchPresenter({FavoriteRestaurant: FavoriteRestaurantIdb,});
  };
    beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchRestaurant('film a');

    expect(presenter.latestQuery).toEqual('film a');
  });

  it('should ask the model to search for Restaurant', () => {
    searchRestaurant('film a');
    expect( FavoriteRestaurantIdb.searchRestaurant ).toHaveBeenCalledWith( 'film a' );
  } );
  
  it('should show the found Restaurant', () => {
    presenter._showFoundRestaurant( [ { id: 1 } ] );
    expect(document.querySelectorAll('.Restaurant').length).toEqual(1);

    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    expect(document.querySelectorAll('.Restaurant').length).toEqual(2);
  });

  it('should show the title of the found Restaurant', () => {
    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.Restaurant__title').item(0).textContent)
      .toEqual('Satu');
  });

  it('should show the title of the found Restaurant', () => {
    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.Restaurant__title').item(0).textContent)
      .toEqual('Satu');

    presenter._showFoundRestaurant(
      [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
    );

    const RestaurantTitles = document.querySelectorAll('.Restaurant__title');
    expect(RestaurantTitles.item(0).textContent).toEqual('Satu');
    expect(RestaurantTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found Restaurant without title', () => {
    presenter._showFoundRestaurant([{ id: 1 }]);

    expect(document.querySelectorAll('.Restaurant__title').item(0).textContent)
      .toEqual('-');
  }
);

});