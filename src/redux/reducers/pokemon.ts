import {
  REQUEST_DATA,
  REQUEST_DATA_FAILURE,
  REQUEST_POKEMONS_DATA_SUCCESS,
  REQUEST_POKEMONS_DETAIL_DATA_SUCCESS,
  PokemonActionTypes,
} from '../actions/pokemon';

const initialState = {
  error: null,
  errorMsg: null,
  fetching: null,
  episode_id: null,
  show_id: null,
  offset: 0,
  pokemons: [],
  pokemon: null,
};

export default function pokemons(
  state = initialState,
  action: PokemonActionTypes,
) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        fetching: true,
        error: null,
        errorMsg: null,
      };
    case REQUEST_DATA_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    case REQUEST_POKEMONS_DATA_SUCCESS:
      return {
        ...state,
        pokemons:
          action.offset > state.offset
            ? [...state.pokemons, ...action.payload]
            : action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
        offset: action.offset || 0,
      };
    case REQUEST_POKEMONS_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        pokemon: action.payload,
        fetching: false,
        error: null,
        errorMsg: null,
      };
    default:
      return state;
  }
}
