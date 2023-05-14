import CONFIG from '../../globals/config';

const createrestaurantsDetailTemplate = (restaurant) => `
  <h2 class="restaurants__name">${restaurant.name}</h2>
  <img class="restaurants__image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>Description</h4>
    <p>${restaurant.description}</p>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Menu Makanan</h4>
    <ul>
      ${restaurant.menus.foods.map((foods) => `<li>${foods.name}</li>`).join('')}
    </ul>
    <h4>Menu Minuman</h4>
    <ul>
      ${restaurant.menus.drinks.map((drinks) => `<li>${drinks.name}</li>`).join('')}
    </ul>
    <h4>Customer Reviews</h4>
    ${restaurant.customerReviews.map((review) => `
      <div class="review">
        <p class="review__name">${review.name}</p>
        <p class="review__date">${review.date}</p>
        <p class="review__text">${review.review}</p>
      </div>
    `).join('')}
  </div>
`;

const createrestaurantsItemTemplate = (restaurants) => `
      <div class="card">
          <img class="card_thumb" src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" title="${restaurants.name}">
          <div class="kota">${restaurants.city}</div>
          <div class="card_content">
              <p class="card_rating">
                  Rating : 
                  <a href="#" class="card_rating_number">${restaurants.rating}</a>
              </p>
              <h1 class="card_title"><a href="/#/detail/${restaurants.id}">${restaurants.name}</a></h1>
              <div class="card_desc">${restaurants.description.slice(0, 150)}...</div>
          </div>
      </div>
`;
const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
export {
  createrestaurantsItemTemplate,
  createrestaurantsDetailTemplate,
  createLikedButtonTemplate,
  createLikeButtonTemplate,
};
