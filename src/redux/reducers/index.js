import { combineReducers } from "redux";
import { heroesReduser as heroes } from "./heroes";

const rootReduser = combineReducers({
  heroes
});

export default rootReduser;
