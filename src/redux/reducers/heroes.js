import {
  HEROES_LOADING,
  HEROES_LOAD_SUCCEED,
  HEROES_LOAD_FAILED,
  ADD_HERO,
  EDIT_HERO,
  DELETE_HERO
} from "../actions/heroes.js";

const initialState = {
  loadingState: "",
  error: null,
  items: []
};

export const heroesReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case HEROES_LOADING:
      return { ...state, loadingState: "loading" };
    case HEROES_LOAD_SUCCEED:
      return { ...state, loadingState: "succeed", items: payload };
    case HEROES_LOAD_FAILED:
      return {
        ...state,
        loadingState: "failed",
        error: payload,
        items: []
      };
    case ADD_HERO:
      return {
        ...state,
        items: [...state.items, payload]
      };
    case EDIT_HERO:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === payload._id ? payload : item
        )
      };
    case DELETE_HERO:
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id !== payload._id)
      };

    default:
      return state;
  }
};
