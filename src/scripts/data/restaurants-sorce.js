import API_ENDPOINT from '../globals/api-endpoin';

class restaurantSource {
  static async listrestaurans() {
    const response = await fetch(API_ENDPOINT.DAFTAR);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailrestauran(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default restaurantSource;
