import axios from "axios";
import { API_HOST } from "../../config";
import { history } from "../../history";

export const HEROES_LOADING = "HEROES_LOADING";
export const HEROES_LOAD_SUCCEED = "HEROES_LOAD_SUCCEED";
export const HEROES_LOAD_FAILED = "HEROES_LOAD_FAILED";
export const ADD_HERO = "ADD_HERO";
export const EDIT_HERO = "EDIT_HERO";
export const DELETE_HERO = "DELETE_HERO";

export const heroesLoadStart = () => ({ type: HEROES_LOADING });

export const heroesLoadSucceed = payload => ({
  type: HEROES_LOAD_SUCCEED,
  payload
});

export const heroesLoadFailed = error => ({
  type: HEROES_LOAD_FAILED,
  payload: error
});

export const addHero = payload => ({
  type: ADD_HERO,
  payload
});

export const editHero = payload => ({
  type: EDIT_HERO,
  payload
});

export const removeHero = payload => ({
  type: DELETE_HERO,
  payload
});

export const getHeroes = () => dispatch => {
  dispatch(heroesLoadStart());
  axios
    .get(`${API_HOST}/heroes`)
    .then(({ data }) => dispatch(heroesLoadSucceed(data)))
    .catch(error => dispatch(heroesLoadFailed(error)));
};

export const postHero = payload => dispatch => {
  axios
    .post(`${API_HOST}/heroes`, payload)
    .then(({ data }) => {
      dispatch(addHero(data));
      history.push("/");
    })
    .catch(({ response }) => {
      console.error(response);
      if (response.status === 422) {
        alert("Choose another Nickname");
      } else {
        alert("Oops, something went wrong!!!!!");
      }
    });
};

export const putHero = payload => dispatch => {
  axios
    .put(`${API_HOST}/heroes`, payload)
    .then(({ data }) => {
      dispatch(editHero(data));
      history.push("/");
    })
    .catch(({ response }) => {
      console.error(response);
      if (response.status === 422) {
        alert("Choose another Nickname");
      } else {
        alert("Oops, something went wrong!!!!!");
      }
    });
};

export const deleteHero = _id => dispatch => {
  axios
    .delete(`${API_HOST}/heroes`, { data: { _id } })
    .then(() => {
      dispatch(removeHero({ _id }));
    })
    .catch(({ response }) => {
      console.error(response);
      alert("Oops, something went wrong!!!!!");
    });
};
