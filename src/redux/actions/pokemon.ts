import API from '../../services/api';

// Redux
import {Dispatch} from 'redux';

const {getPokemonData, getPokemons} = API;

// default Error Messages
const noData = 'No Data received by api';
const badResponse = 'Error: bad API response';
const networkError =
  'Error: Could not retrive pokemons info for the moment, please try again later.';

/**
 * @description Types
 */

interface baseData {
  name: string;
  url: string;
}

interface abilityObject {
  ability: baseData;
  is_hidden: boolean;
  slot: number;
}

interface gameIndices {
  game_index: number;
  version: baseData;
}

interface PokemonData {
  abilities: abilityObject[];
  base_experience: number;
  forms: baseData;
  game_indices: gameIndices[];
}

interface requestDataAction {
  type: typeof REQUEST_DATA;
}

interface requestPokemonsDataSuccessAction {
  type: typeof REQUEST_POKEMONS_DATA_SUCCESS;
  payload: baseData[];
  offset: number;
}

interface requestPokemonsDetailDataSuccesssAction {
  type: typeof REQUEST_POKEMONS_DETAIL_DATA_SUCCESS;
  payload: PokemonData[];
}

interface requestDataFailureAction {
  type: typeof REQUEST_DATA_FAILURE;
  errorMsg: string;
}

export type PokemonActionTypes =
  | requestDataAction
  | requestPokemonsDataSuccessAction
  | requestPokemonsDetailDataSuccesssAction
  | requestDataFailureAction;

export const REQUEST_DATA = 'REQUEST_DATA';
export const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE';
export const REQUEST_POKEMONS_DATA_SUCCESS = 'REQUEST_POKEMONS_DATA_SUCCESS';
export const REQUEST_POKEMONS_DETAIL_DATA_SUCCESS =
  'REQUEST_POKEMONS_DETAIL_DATA_SUCCESS';

export const requestData = () => ({type: REQUEST_DATA});
export const requestDataFailure = (errorMsg: string) => ({
  type: REQUEST_DATA_FAILURE,
  errorMsg,
});
export const requestPokemonsDataSuccess = (
  payload: baseData[],
  offset: number,
) => ({
  type: REQUEST_POKEMONS_DATA_SUCCESS,
  payload,
  offset,
});
export const requestPokemonsDetailDataSuccess = (payload: PokemonData[]) => ({
  type: REQUEST_POKEMONS_DETAIL_DATA_SUCCESS,
  payload,
});

/**
 * @description Checks sample of api response to review if it is as expected
 * @param {object} payload containing api response
 */
const validateApiResponse = (payload: PokemonData) => {
  const {abilities, forms, base_experience, game_indices} = payload || {};
  if (
    abilities !== undefined &&
    forms !== undefined &&
    base_experience !== undefined &&
    game_indices !== undefined
  ) {
    return false;
  }
  return true;
};

/**
 * @description PokeApi returns too much info from pokemons that is never used this function clears payload from unused data
 */
const getPokemonsOnlyUsableData = (payload: PokemonData[]) =>
  payload.map((data: PokemonData) => ({
    abilities: data.abilities,
    forms: data.forms,
    base_experience: data.base_experience,
    game_indices: data.game_indices,
  }));

/**
 * @description Calls api to retrieve pokemons data
 */
export const getPokemonsByOffsetAction = (offset: number) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(requestData());
    const response = await getPokemons(offset);
    if (response && response.data) {
      const {results} = response.data || {};
      if (response && results.length === 0) {
        dispatch(requestDataFailure(noData));
        return;
      }
      dispatch(requestPokemonsDataSuccess(results, offset));
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    console.log('error', error);
    dispatch(requestDataFailure(networkError));
  }
};

/**
 * @description Calls api to retrieve pokemon detailed data
 */
export const getPokemonDetailByIdAction = (id: number) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(requestData());
    const response = await getPokemonData(id);
    if (response && response.data) {
      const samplePayload = response.data.length ? response.data[0] : {};
      if (validateApiResponse(samplePayload)) {
        dispatch(requestDataFailure(badResponse));
        return;
      }
      dispatch(requestPokemonsDetailDataSuccess(response.data));
    } else {
      dispatch(requestDataFailure(badResponse));
    }
  } catch (error) {
    dispatch(requestDataFailure(networkError));
  }
};
