import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

/**
 * @description Creates an Axios Instance
 * @param baseURL Default api uri used if not given
 */
const create = (baseURL: string = API_URL) => {
  const api = axios.create({
    baseURL,
    timeout: 25000,
  });

  /**
   * @description Requests Pokemons Data
   * @param {number} offset position for pagination
   */
  const getPokemons = (offset: number) =>
    api.get(`/pokemon?offset=${offset}&limit=30'`);

  /**
   * @description Requests Pokemon detailed Data
   * @param {number} id Pokemon id
   */
  const getPokemonData = (id: number) => api.get(`/pokemon/${id}`);

  return {
    getPokemons,
    getPokemonData,
  };
};

const API = create();

export default API;
