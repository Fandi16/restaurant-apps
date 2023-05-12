import API_ENDPOINT from '../globals/api-endpoin';

class restaurantSource {
  static async listRestaurans() {
    const response = await fetch(API_ENDPOINT.DAFTAR);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default restaurantSource;
