const assert = require('assert');

Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked Restaurant', ({I}) => {
  I.seeElement('#query');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada Restaurant untuk ditampilkan', '.Restaurant-item__not__found');
} );
Scenario('liking one Restaurant', async ({I}) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.Restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement( '.card_title a' );
  const firstRestaurant = locate('.card_title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.Restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.card_title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});