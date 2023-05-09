import CONFIG from '../../globals/config';

const createrestaurantsDetailTemplate = (restaurants) => `
  <h2 class="restaurants__name">${restaurants.name}</h2>
  <img class="restaurants__image" src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" />
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>Description</h4>
    <p>${restaurants.description}</p>
    <h4>Address</h4>
    <p>${restaurants.address}</p>
    <h4>City</h4>
    <p>${restaurants.city}</p>
    <h4>Menu Makanan</h4>
    <ul>
      ${restaurants.menus.foods.map((foods) => `<li>${foods.name}</li>`).join('')}
    </ul>
    <h4>Menu Minuman</h4>
    <ul>
      ${restaurants.menus.foods.map((drinks) => `<li>${drinks.name}</li>`).join('')}
    </ul>
    <h4>Customer Reviews</h4>
    ${restaurants.customerReviews.map((review) => `
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
 eslint-disable-next-line max-len
           <img class="card_thumb" src="${restaurants.pictureId}" alt="${restaurants.name}" title="${restaurants.name}">
           <div class="kota">${restaurants.city}</div>
           <div class="card_content">
             <p class="card_rating">
                  Rating :
                   <a href="#" class="card_rating_number">${restaurants.rating}</a>
               </p>
               <h1 class="card_title"><a href="#">${restaurants.name}</a></h1>
               <div class="card_desc">${restaurants.description.slice(0, 150)}...</div>
          </div>
     </div>
`;
export {
  createrestaurantsItemTemplate,
  createrestaurantsDetailTemplate,
};
